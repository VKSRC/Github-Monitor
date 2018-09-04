from django.db import models


class Leakage(models.Model):
    project_name = models.CharField(max_length=100)
    project_url = models.TextField()
    file_name = models.TextField()
    file_url = models.TextField()
    language = models.CharField(max_length=20)
    code = models.TextField()
    account = models.CharField(max_length=100)
    account_avatar = models.TextField()
    account_url = models.TextField()
    status = models.IntegerField()
    add_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
    handle_time = models.DateTimeField()

    class Meta:
        db_table = "Leakage"
        ordering = ("add_time", )
