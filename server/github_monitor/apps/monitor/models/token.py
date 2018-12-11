from django.db import models
from django.conf import settings


class Token(models.Model):
    value = models.CharField(max_length=40, null=False, blank=False)

    def save(self, *args, **kwargs):
        rs_key = 'token:%s' % self.value
        settings.RS.hset(rs_key, 'reset', '')
        return super(Token, self).save(*args, **kwargs)
