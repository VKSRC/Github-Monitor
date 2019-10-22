from django.db import models


class Task(models.Model):
    statusItemChoices = (
        (0, '等待中'),
        (1, '运行中'),
        (2, '完成')
    )
    matchMethodChoices = (
        (0, '模糊匹配'),
        (1, '精确匹配'),
        (2, '单词匹配')
    )

    name = models.CharField(
        max_length=50, null=False, blank=False, verbose_name=u'任务名'
    )
    keywords = models.TextField(null=False, blank=False, verbose_name='关键词')
    match_method = models.IntegerField(choices=matchMethodChoices, default=0)
    pages = models.IntegerField(default=5, null=False, verbose_name='爬取页数')
    interval = models.IntegerField(default=60, null=False, verbose_name='爬取间隔(分钟)')
    ignore_org = models.TextField(null=True, default='', verbose_name='忽略指定组织或账号下的代码')
    ignore_repo = models.TextField(null=True, default='', verbose_name='忽略某类仓库下的代码, 如 github.io')
    status = models.IntegerField(choices=statusItemChoices, default=0)
    start_time = models.DateTimeField(null=True)
    finished_time = models.DateTimeField(null=True)
    mail = models.TextField(null=True, default='', verbose_name='通知邮箱列表')
