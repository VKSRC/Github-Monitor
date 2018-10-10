from rest_framework.viewsets import ModelViewSet
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
    http_method_names = ('get', 'put')
    serializer_class = LeakageSerializer

    def get_queryset(self):
        querysets = Leakage.objects.order_by('-id')
        task_id = self.request.GET.get('task_id', '')
        if task_id:
            querysets = querysets.filter(task__id=task_id)
        return querysets


class TokenViewSet(ModelViewSet):
    queryset = Token.objects.order_by('-id')
    serializer_class = TokenSerializer


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.order_by('-id')
    serializer_class = TaskSerializer
