#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import time
import redis
import logging
import dateutil.parser
from django.utils import timezone
from django.db import connection, close_old_connections
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings
from threading import Thread
from github import Github
from github import GithubException
# 调试时去掉下面的注释、命令行执行 PYTHONPATH=. venv/bin/python github_monitor/apps/monitor/processors.py
# import django, os
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "github_monitor.settings")
# django.setup()
from github_monitor.apps.monitor.models.task import Task
from github_monitor.apps.monitor.models.leakage import Leakage

logger = logging.getLogger(__name__)
RS = redis.Redis()
# 默认搜索页数
per_page = 50


class TaskProcessor(object):

    def __init__(self, task):
        self.task = task
        self.email_results = []
        self.thread_pool = list()

    @staticmethod
    def get_available_token():
        for key in RS.keys():
            key = key.decode()
            if key.startswith('token'):
                reset = RS.hget(key, 'reset').decode()
                if not reset or float(reset) < timezone.now().timestamp():
                    return key.split(':')[1]
        return None

    def _new_session(self):
        # 返回一个可用token所创建的git session
        while True:
            token = self.get_available_token()
            if token:
                return Github(login_or_token=token, per_page=per_page), token
            time.sleep(0.5)

    def _reset_token(self, session, token):
        rate_limit = session.get_rate_limit()
        reset_time = rate_limit.search.reset.timestamp()
        RS.hset('token:%s' % token, 'reset', reset_time)
        return self._new_session()

    def search_by_keyword_thread(self, keyword):
        session, _token = self._new_session()
        while True:
            try:
                response = session.search_code(keyword, sort='indexed', order='desc', highlight=True)
                # github api支持最多搜索1000条记录
                total = min(response.totalCount, 1000)
                break
            except GithubException as e:
                if 'abuse-rate-limits' in e.data.get('documentation_url'):
                    session, _token = self._reset_token(session, _token)
                else:
                    logger.exception(e)
                continue
        # E.G. total = 50，max_page = 1; total = 51, max_page = 2
        # 需要搜索的页数为max_page和task.page中最小的值
        max_page = (total // per_page) if (not total % per_page) else (total // per_page + 1)
        pages = min(max_page, self.task.pages) if self.task.pages else max_page
        # 搜索代码
        page = 0
        while page < pages:
            try:
                page_content = response.get_page(page)
                page += 1
            except GithubException as e:
                if 'abuse-rate-limits' in e.data.get('documentation_url'):
                    session, _token = self._reset_token(session, _token)
                else:
                    logger.exception(e)
                continue
            self.process_pages(page_content, keyword)
        close_old_connections()

    def process_pages(self, _contents, _keyword):

        def get_data(github_file):
            github_file.update()
            repo = github_file.repository
            return {
                'task': self.task,
                'keyword': _keyword,
                'sha': github_file.sha,
                'fragment': format_fragments(github_file.text_matches),
                'html_url': github_file.html_url,
                'last_modified': dateutil.parser.parse(github_file.last_modified) if github_file.last_modified else None,
                'file_name': github_file.name,
                'repo_name': repo.name,
                'repo_url': repo.html_url,
                'user_avatar': repo.owner.avatar_url,
                'user_name': repo.owner.login,
                'user_url': repo.owner.html_url
            }

        def format_fragments(_text_matches):
            return ''.join([f['fragment'] for f in _text_matches])
            # fragments = ''
            # for match in _text_matches:
            #     join_em_fragment = ''
            #     start = 0
            #     fragment = match.get('fragment', '')
            #     match_infos = match.get('matches', [])
            #     for _info in match_infos:
            #         indices = _info.get('indices')
            #         text = _info.get('text')
            #         join_em_fragment += fragment[start:indices[0]] + '<em>' + text + '</em>'
            #         start = indices[1]
            #     join_em_fragment += fragment[start:]
            #     fragments += join_em_fragment
            # return fragments

        for _file in _contents:

            # 如果是`*.github.io`博客类型的仓库则跳过
            repo = _file.repository
            if repo.name.endswith(".github.io"):
                continue

            exists_leakages = Leakage.objects.filter(sha=_file.sha)
            if exists_leakages:
                if exists_leakages.filter(status=1):
                    update_data = get_data(_file)
                    self.email_results.append(update_data)
                    update_data.update({'status': 0, 'add_time': timezone.now()})
                    exists_leakages.filter(status=1).update(**update_data)
            else:
                data = get_data(_file)
                self.email_results.append(data)
                Leakage(**data).save()

    def render_email_html(self):
        template_file = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), 'templates', 'mail.html'
        )
        return render_to_string(template_file, {
            'results': self.email_results,
            'task': self.task
        })

    def send_email(self):
        if self.task.mail and self.email_results:
            email = EmailMessage(
                '[GITHUB安全监控]发现新的泄露信息',
                self.render_email_html(),
                settings.SECURITY_EMAIL,
                self.task.mail.split(';'),
            )
            email.content_subtype = "html"
            email.send()

    def process(self):
        while True:
            connection.close()
            self.email_results = []
            self.task.status = 1
            self.task.start_time = timezone.now()
            self.task.save()
            keyword_list = self.task.keywords.split('\n')
            for keyword in keyword_list:
                _thread = Thread(target=self.search_by_keyword_thread, args=(keyword, ))
                _thread.start()
                self.thread_pool.append(_thread)
            for th in self.thread_pool:
                th.join()
            connection.close()
            self.task.status = 2
            self.task.finished_time = timezone.now()
            self.task.save()
            self.send_email()
            # sleep一个周期的时间
            time.sleep(60 * self.task.interval)


if __name__ == '__main__':
    t = Task.objects.get(id=5)
    cp = TaskProcessor(t)
    cp.process()