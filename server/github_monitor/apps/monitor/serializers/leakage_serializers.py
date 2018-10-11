from rest_framework import serializers
from ..models.leakage import Leakage


class LeakageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Leakage
        fields = (
            'id',
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
            'id', 'sha', 'content', 'fragment', 'html_url', 'last_modified',
            'file_name', 'repo_name', 'repo_url', 'user_avatar',
            'user_name', 'user_url', 'add_time'
        )
