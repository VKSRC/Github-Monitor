from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from .models.leakage import Leakage
from .models.token import Token
from .models.task import Task
from .serializers.leakage_serializers import LeakageSerializer
from .serializers.token_serializers import TokenSerializer
from .serializers.task_serializers import TaskSerializer


class LeakageViewSet(ModelViewSet):
    model = Leakage
    queryset = Leakage.objects
    filter_fields = ('status', )
    http_method_names = ('get', 'put', 'options')
    serializer_class = LeakageSerializer

    def get_queryset(self):
        querysets = Leakage.objects.order_by('-last_modified')
        task_id = self.request.GET.get('task_id', '')
        if task_id:
            querysets = querysets.filter(task__id=task_id)
        return querysets

    @action(methods=['PUT'], detail=True, url_path='ignore_repository', url_name='ignore_repository')
    def ignore_repo(self, request, pk):
        try:
            leak = Leakage.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response('记录不存在', status=status.HTTP_400_BAD_REQUEST)
        Leakage.objects.filter(repo_url=leak.repo_url, status=0).update(status=2)
        return Response('仓库加白成功', status=status.HTTP_200_OK)


class TokenViewSet(ModelViewSet):
    queryset = Token.objects.order_by('-id')
    serializer_class = TokenSerializer


class TaskViewSet(ModelViewSet):
    model = Task
    queryset = Task.objects.order_by('-id')
    serializer_class = TaskSerializer

    @action(methods=['GET'], detail=False, url_path='get_basics', url_name='get_basic_task_info')
    def get_basic_task_info(self, request, format=None):
        return Response(Task.objects.values('id', 'name').order_by('-id'))

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.status != 1:
            return super(TaskViewSet, self).destroy(request, *args, **kwargs)
        else:
            return Response('正在执行的任务不允许删除', status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    def get(self, request, format=None):
        username = request.user.username
        return Response({"username": username})
