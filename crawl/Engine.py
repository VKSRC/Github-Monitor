#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>
import time
from github import Github
from github.GithubException import RateLimitExceededException

# 搜索页每页显示数量
per_page = 50
# 默认搜索页数
default_page = 4


class Engine:

    def __init__(self, token):
        self.token = token
        self.g = Github(login_or_token=self.token, per_page=per_page)
        self.keyword = ''

        self.full_name = ''
        self.user = ''
        self.sha = ''
        self.url = ''
        self.code = ''

    def process_pages(self, pages_content):
        pass

    def search(self, keyword):
        self.keyword = keyword

        rate_limit = self.g.get_rate_limit()
        search_rate_limit = rate_limit.search.remaining

        if search_rate_limit <= 0:
            print("Fatal error: rate_limit is not available. rule: {} search_rate_limit: {}".format(self.keyword, search_rate_limit))
            exit(0)

        # 搜索代码
        resource = self.g.search_code(self.keyword, sort="indexed", order="desc")

        total = resource.totalCount
        print("keyword: {} searched by {} item.".format(self.keyword, total))

        # 计算要读取多少页的数据
        if total < per_page:
            pages = 1
        else:
            pages = default_page

        for page in range(pages):
            try:
                pages_content = resource.get_page(page)
            except RateLimitExceededException:
                print("Search Ratelimit not enough, Program sleep 1 minutes")
                time.sleep(60)

                print("It is now being retried....")
                pages_content = resource.get_page(page)

            # 处理获取到的数据
            self.process_pages(pages_content)



