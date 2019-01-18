import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        username = os.environ.get('INIT_ADMIN_USERNAME')
        password = os.environ.get('INIT_ADMIN_PASSWORD')
        print('Create administrator for {}'.format(username))
        User.objects.all().delete()
        User.objects.create_superuser(username=username, email=None, password=password)
