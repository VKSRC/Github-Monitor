from django.db import models
from .task import Task


class Leakage(models.Model):
    statusChoiceItem = (
        (0, '未处理'),
        (1, '已处理'),
        (2, '白名单')
    )
    task = models.ForeignKey(Task, null=True, on_delete=models.SET_NULL)
    keyword = models.CharField(max_length=256, null=True, default='')
    sha = models.CharField(max_length=40, null=True)
    fragment = models.TextField(null=False, default='')
    html_url = models.CharField(max_length=512, null=True)
    last_modified = models.DateTimeField(null=True)
    file_name = models.CharField(max_length=512, null=True)
    repo_name = models.CharField(max_length=512, null=True)
    repo_url = models.CharField(max_length=512, null=True)
    user_avatar = models.CharField(max_length=256, null=True)
    user_name = models.CharField(max_length=256, null=True)
    user_url = models.CharField(max_length=256, null=True)
    status = models.IntegerField(choices=statusChoiceItem, default=0)
    add_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "Leakage"
        ordering = ("add_time", )
