from django.db import models


class Task(models.Model):
    statusItemChoices = (
        (0, '等待中'),
        (1, '运行中'),
        (2, '完成')
    )
    name = models.CharField(
        max_length=50, null=False, blank=False, verbose_name=u'任务名'
    )
    keywords = models.TextField(null=False, blank=False, verbose_name='关键词')
    pages = models.IntegerField(default=5, null=False, verbose_name='爬取页数')
    interval = models.IntegerField(default=60, null=False, verbose_name='爬取间隔(分钟)')
    status = models.IntegerField(choices=statusItemChoices, default=0)
    start_time = models.DateTimeField(null=True)
    finished_time = models.DateTimeField(null=True)
