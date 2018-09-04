from rest_framework import serializers
from github_monitor.apps.leakage.models import Leakage


class LeakageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Leakage
        fields = (
            'id',
            'project_name',
            'project_url',
            'file_name',
            'file_url',
            'language',
            'code',
            'account',
            'account_avatar',
            'account_url',
            'status',
            'add_time',
            'update_time',
            'handle_time',
            'url',
        )
