from rest_framework import serializers
from django.utils import timezone
from ..models.leakage import Leakage


class LeakageSerializer(serializers.HyperlinkedModelSerializer):
    last_modified = serializers.SerializerMethodField()
    add_time = serializers.SerializerMethodField()

    class Meta:
        model = Leakage
        fields = (
            'id',
            'keyword',
            'sha',
            'fragment',
            'html_url',
            'last_modified',
            'file_name',
            'repo_name',
            'repo_url',
            'user_avatar',
            'user_name',
            'user_url',
            'status',
            'add_time'
        )
        read_only_fields = (
            'id', 'sha', 'keyword', 'fragment', 'html_url', 'last_modified',
            'file_name', 'repo_name', 'repo_url', 'user_avatar',
            'user_name', 'user_url', 'add_time'
        )

    def get_last_modified(self, obj):
        return timezone.localtime(obj.last_modified).strftime('%Y-%m-%d %H:%M:%S') if obj.last_modified else ''

    def get_add_time(self, obj):
        return timezone.localtime(obj.add_time).strftime('%Y-%m-%d %H:%M:%S') if obj.last_modified else ''
