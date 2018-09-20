#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import redis
import dateutil.parser
from django.utils import timezone
from django.db import connection
from threading import Thread
from github import Github
from github.GithubException import RateLimitExceededException
# 调试时去掉下面的注释、命令行执行 PYTHONPATH=. venv/bin/python github_monitor/apps/monitor/processors.py
# import django, os
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "github_monitor.settings")
# django.setup()
from github_monitor.apps.monitor.models.task import Task
from github_monitor.apps.monitor.models.leakage import Leakage

RS = redis.Redis()
# 默认搜索页数
per_page = 50


class TaskProcessor(object):

    def __init__(self, task):
        self.task = task
        self.thread_pool = list()

    @staticmethod
    def get_available_token():
        for key in RS.keys():
            key = key.decode()
            if key.startswith('token'):
                reset = RS.hget(key, 'reset').decode()
                if not reset or int(reset) < timezone.now().timestamp():
                    return key.split(':')[1]
        return None

    def _new_session(self, _keyword):
        # 返回一个可用token所创建的git session
        while True:
            token = self.get_available_token()
            if token:
                g = Github(login_or_token=token, per_page=per_page)
                return g.search_code(_keyword, sort='indexed', order='desc')
            time.sleep(0.5)

    def search_by_keyword_thread(self, keyword):
        while True:
            try:
                session = self._new_session(keyword)
                total = session.totalCount
                break
            except RateLimitExceededException:
                continue
        if total < per_page:
            pages = 1
        else:
            pages = self.task.pages
        # 搜索代码
        page = 0
        while page < pages:
            try:
                page_content = session.get_page(page)
                page += 1
            except RateLimitExceededException:
                session = self._new_session(keyword)
                continue
            self.process_pages(page_content)

    @staticmethod
    def process_pages(_contents):
        for _file in _contents:
            if Leakage.objects.filter(sha=_file.sha):
                continue
            repo = _file.repository
            data = {
                'sha': _file.sha,
                'content': _file.decoded_content,
                'html_url': _file.html_url,
                'last_modified': dateutil.parser.parse(_file.last_modified),
                'file_name': _file.name,
                'repo_name': repo.name,
                'repo_url': repo.html_url,
                'user_avatar': repo.owner.avatar_url,
                'user_name': repo.owner.login,
                'user_url': repo.owner.html_url
            }
            Leakage(**data).save()

    def process(self):
        self.task.status = 1
        self.task.start_time = timezone.now()
        self.task.save()
        keyword_list = self.task.keywords.split('\n')
        for keyword in keyword_list:
            _thread = Thread(target=self.search_by_keyword_thread, args=(keyword, ))
            _thread.start()
            self.thread_pool.append(_thread)
        while self.thread_pool:
            for i in range(len(self.thread_pool) - 1, -1, -1):
                if not self.thread_pool[i].isAlive():
                    self.thread_pool.pop(i)
        connection.close()
        self.task.status = 2
        self.task.finished_time = timezone.now()
        self.task.save()


if __name__ == '__main__':
    t = Task.objects.get(id=1)
    cp = TaskProcessor(t)
    cp.process()