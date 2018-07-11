#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>

import os
import sys
import re
import pytz
import logging
import requests
import datetime
import smtplib
import configparser
from lxml import html
from email.mime.text import MIMEText
from email.header import Header
from celery import Celery
from celery.schedules import crontab
from utils import utc2local
from sqlalchemy.exc import DataError
from models import db, Leakage, Keywords, WhiteList


base_path = os.path.split(os.path.realpath(__file__))[0]
conf_path = '{}/config.ini'.format(base_path)


def get_conf(section, option):
    config = configparser.ConfigParser()
    config.read(conf_path)
    return config.get(section=section, option=option)


celery_app = Celery('Github-Monitor', broker=get_conf('Celery', 'BROKER_URL'))
celery_app.conf.timezone = get_conf('Common', 'TIMEZONE')

celery_app.conf.beat_schedule = {
    'github-scanner': {
        'task': 'scanner.crawl',
        'schedule': crontab(hour="*/4")
    }
}


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('Github-Monitor')
TIMEZONE = pytz.timezone(get_conf('Common', 'TIMEZONE'))


# 登录Github并返回session
def create_session():
    session = requests.session()
    login_page_resp = session.get('https://github.com/login').text
    authenticity_token = re.findall(r'<input\stype="hidden"\sname="authenticity_token"\svalue="(.*?)"\s/>',
                                    login_page_resp)[0]

    post_data = {
        'commit': 'Sign in',
        'utf8': '✓',
        'authenticity_token': authenticity_token,
        'login': get_conf('Github', 'USERNAME'),
        'password': get_conf('Github', 'PASSWORD')
    }
    login_result_page = session.post('https://github.com/session', data=post_data).text
    match_result = re.findall(r'Signed\sin\sas\s<strong class="css-truncate-target">(.*?)</strong>',
                              login_result_page)
    if len(match_result) <= 0:
        logger.critical('Github Login fail')
        sys.exit()
    return session


def get_keywords():
    db_keywords = Keywords.query.all()
    keywords = []
    for row in db_keywords:
        keywords.append(row.name)
    return keywords


def get_page_count(keyword, session):
    search_url = 'https://github.com/search?o=desc&q={}&s=indexed&type=Code'.format(keyword)
    try:
        search_response = session.get(search_url).text
    except requests.exceptions.ChunkedEncodingError:
        return int(1)
    except requests.exceptions.ConnectionError:
        return int(1)
    tree = html.document_fromstring(search_response)
    page_count = tree.xpath('//*[@id="code_search_results"]/div[2]/div/a[last()-1]')[0].text
    if len(page_count) > 0:
        return int(page_count)
    else:
        return int(1)


def get_code_count(keyword, session):
    search_url = 'https://github.com/search?o=desc&q={}&s=indexed&type=Code'.format(keyword)
    try:
        search_response = session.get(search_url).text
    except requests.exceptions.ChunkedEncodingError:
        return int(0)
    except requests.exceptions.ConnectionError:
        return int(0)
    tree = html.document_fromstring(search_response)
    code_count = tree.xpath('//*[@id="js-pjax-container"]/div/div/div[2]/div/div[1]/h3')[0].text
    return code_count.strip()


def send_email(subject, content):
    receivers = ['18758225035@163.com']
    sender = get_conf('Email', 'USERNAME')
    message = MIMEText(content, _subtype='html', _charset='utf-8')
    message['From'] = Header('Github-Monitor <{}>'.format(get_conf('Email', 'USERNAME')), 'utf-8')
    message['To'] = Header(','.join(receivers), 'utf-8')
    message['Subject'] = Header(subject, 'utf-8')

    server = smtplib.SMTP(get_conf('Email', 'SERVER'), get_conf('Email', 'PORT'))
    if get_conf('Email', 'PORT') in ['465', '587']:
        server.starttls()
    server.login(get_conf('Email', 'USERNAME'), get_conf('Email', 'PASSWORD'))
    server.sendmail(sender, receivers, message.as_string())
    server.quit()


@celery_app.task
def crawl():
    session = create_session()
    keywords = get_keywords() if get_keywords() != 0 else None
    notice = False

    if len(keywords) == 0:
        logger.critical('Keywords are None')
        sys.exit()

    if Leakage.query.all():
        notice = True

    for keyword in keywords:
        page_count = get_page_count(keyword, session)
        logger.info('Crawl keyword:{}, Page count:{}'.format(keyword, page_count))

        code_count = get_code_count(keyword, session)
        logger.info('Total: {}'.format(code_count))

        for page in range(1, page_count+1):
            search_url = 'https://github.com/search?o=desc&q={}&s=indexed&type=Code&p={}'.format(keyword, page)

            try:
                search_response = session.get(search_url).text
            except requests.exceptions.ConnectionError:
                continue

            tree = html.document_fromstring(search_response)
            nodes = tree.xpath('//*[@id="code_search_results"]/div[1]/div[*]')
            for node in nodes:
                node_index = nodes.index(node) + 1
                leakage = dict()
                project_full_name_node = node.xpath('//*[@id="code_search_results"]/div[1]/div[{}]/div[1]/a[1]'.format(
                    node_index
                ))[0]
                leakage['project_name'] = project_full_name_node.text.split('/')[1]
                leakage['project_url'] = 'https://github.com' + str(project_full_name_node.attrib['href'])

                leakage['file_name'] = node.xpath('//*[@id="code_search_results"]/div[1]/div[{}]/div[1]/a[2]'.format(
                    node_index
                ))[0].attrib['title']
                leakage['file_url'] = 'https://github.com'\
                    + str(node.xpath('//*[@id="code_search_results"]/div[1]/div[{}]/div[1]/a[2]'.format(
                        node_index
                    ))[0].attrib['href'])

                leakage['language'] = node.xpath('//*[@id="code_search_results"]/div[1]/div[{}]/span[1]'.format(
                    node_index
                ))
                if len(leakage['language']) > 0:
                    leakage['language'] = leakage['language'][0].text.strip()
                else:
                    leakage['language'] = None

                code = node.xpath('//*[@id="code_search_results"]/div[1]/div[{}]/div[2]/table'.format(
                    node_index
                ))[0]
                leakage['code'] = html.tostring(code)

                leakage['add_time'] = node.xpath(
                    '//*[@id="code_search_results"]/div[1]/div[{}]/div[1]/div/span[2]/relative-time'.format(
                        node_index
                    ))[0].attrib['datetime']
                leakage['add_time'] = utc2local(leakage['add_time'])

                leakage['account'] = project_full_name_node.text.split('/')[0]

                leakage['account_avatar'] = node.xpath('//*[@id="code_search_results"]/div[1]/div[{}]/a[1]/img'.format(
                    node_index
                ))[0].attrib['src']
                leakage['account_url'] = 'https://github.com/{}'.format(leakage['account'])

                raw_link = leakage['file_url'].replace("https://github.com", "https://raw.githubusercontent.com")\
                    .replace("/blob", "")
                raw_code = session.get(raw_link).text

                # 判断是否已经入库, 如果真, 则更新`update_datetime`字段。
                rs = Leakage.query\
                    .filter_by(
                        file_name=leakage['file_name'],
                        project_name=leakage['project_name'],
                        code=leakage['code'])\
                    .all()
                if rs:
                    for l in rs:
                        l.update_time = datetime.datetime.now(TIMEZONE)
                        db.session.commit()
                    continue

                # 判断是否在白名单, 如果真, 则跳过
                rs = WhiteList.query.filter_by(name=leakage['file_name']).all()
                if rs:
                    continue

                # 发送邮件提醒
                content = '''
                <h3>关键词</h3> 
                <p>{keyword}</p>
                <h3>所在项目</h3> 
                <p><a href="{project_url}" target="_blank">{account}/{project_name}</a></p>
                <h3>代码地址</h3>
                <p><a href="{link}" target="_blank">{link}</a></p>
                <h3>部分相关代码</h3>
                <pre><code style="background-color: #f6f8f6;white-space: pre;">{code}</code></pre>
                '''
                if notice:
                    send_email('[Github-Monitor] 监控提醒', content.format(
                        keyword=keyword,
                        account=leakage['account'],
                        project_url=leakage['project_url'],
                        project_name=leakage['project_name'],
                        link=leakage['file_url'],
                        code=raw_code[:1000],
                    ))

                leakage_db = Leakage(**leakage)
                db.session.add(leakage_db)
                try:
                    db.session.commit()
                except DataError as e:
                    logger.warning(e)
                    db.session.rollback()

    logger.info("done")

