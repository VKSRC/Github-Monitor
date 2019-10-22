from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.utils import timezone
from ..models.task import Task


class TaskSerializer(serializers.ModelSerializer):
    keywords = serializers.CharField(required=True, label='关键词', help_text='多个关键词换行分隔')
    match_method = serializers.IntegerField(default=0, label='匹配模式')
    name = serializers.CharField(required=True, max_length=50, validators=[UniqueValidator(queryset=Task.objects.all())], label=u'任务名称')
    pages = serializers.IntegerField(default=5, allow_null=False, label='爬取页数', help_text='默认为5, 0为搜索全部')
    ignore_org = serializers.CharField(required=False, allow_null=True, allow_blank=True, label='忽略用户')
    ignore_repo = serializers.CharField(required=False, allow_null=True, allow_blank=True, label='忽略仓库')
    interval = serializers.IntegerField(default=60, allow_null=False, label='爬取间隔(分钟)', help_text='默认为60')
    mail = serializers.CharField(
        required=False, allow_null=True, allow_blank=True, label='通知邮箱', help_text='多个邮箱分号分隔'
    )
    start_time = serializers.SerializerMethodField()
    finished_time = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = (
            'id', 'status', 'start_time', 'finished_time'
        )

    def get_start_time(self, obj):
        return timezone.localtime(obj.start_time).strftime('%Y-%m-%d %H:%M:%S') if obj.start_time else ''

    def get_finished_time(self, obj):
        return timezone.localtime(obj.finished_time).strftime('%Y-%m-%d %H:%M:%S') if obj.finished_time else ''
