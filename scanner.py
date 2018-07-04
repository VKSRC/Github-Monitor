#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>

import sys
import re
import logging
import requests
import datetime
from lxml import html
from utils import utc2local
from sqlalchemy.exc import DataError
from models import db, Leakage, Keywords, WhiteList


GITHUB_USERNAME = 'yuzesheji@qq.com'
GITHUB_PASSWORD = 'wxs497inmdratg'

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('Github-Monitor')


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
        'login': GITHUB_USERNAME,
        'password': GITHUB_PASSWORD
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
    search_response = session.get(search_url).text
    tree = html.document_fromstring(search_response)
    page_count = tree.xpath('//*[@id="code_search_results"]/div[2]/div/a[last()-1]')[0].text
    if len(page_count) > 0:
        return int(page_count)
    else:
        return int(1)


def crawl():
    session = create_session()
    keywords = get_keywords() if get_keywords() != 0 else None

    if len(keywords) == 0:
        logger.critical('Keywords are None')
        sys.exit()

    for keyword in keywords:
        page_count = get_page_count(keyword, session)
        logger.info('Crawl keyword:{}, Page count:{}'.format(keyword, page_count))

        for page in range(1, page_count+1):
            search_url = 'https://github.com/search?o=desc&q={}&s=indexed&type=Code&p={}'.format(keyword, page)
            search_response = session.get(search_url).text
            tree = html.document_fromstring(search_response)
            nodes = tree.xpath('//*[@id="code_search_results"]/div[1]/div[*]')
            for node in nodes:
                node_index = nodes.index(node) + 1
                leakage = dict()
                project_full_name = node.xpath('//*[@id="code_search_results"]/div[1]/div[{}]/div[1]/a[1]'.format(
                    node_index
                ))[0].text
                leakage['project_name'] = project_full_name.split('/')[1]

                leakage['file_name'] = node.xpath('//*[@id="code_search_results"]/div[1]/div[{}]/div[1]/a[2]'.format(
                    node_index
                ))[0].attrib['title']

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

                leakage['account'] = project_full_name.split('/')[0]

                leakage['account_avatar'] = node.xpath('//*[@id="code_search_results"]/div[1]/div[{}]/a[1]/img'.format(
                    node_index
                ))[0].attrib['src']

                # 判断是否已经入库, 如果真, 则更新`update_datetime`字段。
                rs = Leakage.query\
                    .filter_by(file_name=leakage['file_name'], project_name=leakage['project_name']).all()
                if rs:
                    for l in rs:
                        l.update_time = datetime.datetime.now()
                        db.session.commit()
                    continue

                # 判断是否在白名单, 如果真, 则跳过
                rs = WhiteList.query.filter_by(name=leakage['file_name']).all()
                if rs:
                    continue

                leakage_db = Leakage(**leakage)
                db.session.add(leakage_db)
                try:
                    db.session.commit()
                except DataError as e:
                    logger.warning(e)
                    db.session.rollback()


crawl()
