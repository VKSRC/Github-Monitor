import time
import redis
from django.core.management.base import BaseCommand
from django.db.models import Q
from multiprocessing import Process
from github_monitor.apps.monitor.models.token import Token
from github_monitor.apps.monitor.models.task import Task
from github_monitor.apps.monitor.processors import TaskProcessor
from django.db import close_old_connections


class Command(BaseCommand):

    task_id_list = []
    INTERVAL = 5
    RS = redis.Redis()

    def handle(self, *args, **options):

        def _process(_processor):
            _processor.process()

        while True:
            close_old_connections()
            for token in Token.objects.all():
                key = 'token:%s' % token.value
                if not self.RS.exists(key):
                    self.RS.hset(key, 'reset', '')

            for task in Task.objects.filter(~Q(id__in=self.task_id_list)):
                processor = TaskProcessor(task)
                p = Process(target=_process, args=(processor, ))
                p.start()
                self.task_id_list.append(task.id)

            time.sleep(self.INTERVAL)
