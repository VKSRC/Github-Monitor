from rest_framework import serializers
from ..models.task import Task


class TaskSerializer(serializers.ModelSerializer):
    keywords = serializers.CharField(required=True, label=u'关键词', help_text='多个关键词换行分隔')

    class Meta:
        model = Task
        fields = (
            'id', 'keywords', 'pages', 'interval', 'status', 'start_time', 'finished_time'
        )
        read_only_fields = (
            'id', 'status', 'start_time', 'finished_time'
        )