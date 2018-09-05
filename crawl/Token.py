#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>

import random
from github import Github
from django.conf import settings

# 调试的时候直接运行无django环境遍历 所以需要设置
# 命令执行 PYTHONPATH=. python crawl/Token.py
import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "github_monitor.settings")
django.setup()


class Token:

    def __init__(self):
        self.tokens = []
        self.g = ''

        # 如果没有配置GITHUB_TOKEN则直接终止程序
        if not settings.GITHUB_TOKEN:
            print('No token configured')
            exit(0)

        self.tokens = settings.GITHUB_TOKEN

    # 获取可用的token（Search Rate Limit 等于30的token）
    def get_available_token(self):
        available_tokens = []

        for single_token in self.tokens:
            self.g = Github(login_or_token=single_token)
            rate_limit = self.g.get_rate_limit()
            if rate_limit.search.remaining == 30:
                available_tokens.append(single_token)

        return random.choice(available_tokens)
