from rest_framework import serializers
from django.utils import timezone
from ..models.task import Task


class TaskSerializer(serializers.ModelSerializer):
    keywords = serializers.CharField(required=True, label='关键词', help_text='多个关键词换行分隔')
    name = serializers.CharField(max_length=50, required=True, allow_null=False, allow_blank=False, label=u'任务名称')
    pages = serializers.IntegerField(default=5, allow_null=False, label='爬取页数', help_text='默认为5')
    interval = serializers.IntegerField(default=60, allow_null=False, label='爬取间隔(分钟)', help_text='默认为60')
    start_time = serializers.SerializerMethodField()
    finished_time = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = (
            'id', 'name', 'keywords', 'pages', 'interval', 'status', 'start_time', 'finished_time'
        )
        read_only_fields = (
            'id', 'status', 'start_time', 'finished_time'
        )

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError(u'请输入任务名称')
        if Task.objects.filter(name=value).count():
            raise serializers.ValidationError(u'任务名称已存在')
        return value

    def get_start_time(self, obj):
        return timezone.localtime(obj.start_time).strftime('%Y-%m-%d %H:%M:%S') if obj.start_time else ''

    def get_finished_time(self, obj):
        return timezone.localtime(obj.finished_time).strftime('%Y-%m-%d %H:%M:%S') if obj.finished_time else ''
