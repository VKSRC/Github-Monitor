import time
from django.core.management.base import BaseCommand
from django.db import close_old_connections
from django.db.models import Q
from django.conf import settings
from multiprocessing import Process
from github_monitor.apps.monitor.models.token import Token
from github_monitor.apps.monitor.models.task import Task
from github_monitor.apps.monitor.processors import TaskProcessor


class Command(BaseCommand):

    task_dict = dict()
    INTERVAL = 5
    RS = settings.RS

    def handle(self, *args, **options):

        def _process(_processor):
            _processor.process()

        while True:
            close_old_connections()
            for token in Token.objects.all():
                key = 'token:%s' % token.value
                if not self.RS.exists(key):
                    self.RS.hset(key, 'reset', '')

            for task in Task.objects.filter(~Q(id__in=self.task_dict)):
                processor = TaskProcessor(task)
                p = Process(target=_process, args=(processor, ))
                p.start()
                self.task_dict[task.id] = p

            # 对于已删除的任务, 将其进程终止掉
            task_dict_copy = self.task_dict.copy()
            for task_id in task_dict_copy:
                close_old_connections()
                if not Task.objects.filter(id=task_id).count():
                    # task be deleted
                    print('terminate')
                    self.task_dict[task_id].terminate()
                    self.task_dict.pop(task_id)

            time.sleep(self.INTERVAL)
