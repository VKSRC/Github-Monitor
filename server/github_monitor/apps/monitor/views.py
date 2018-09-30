from rest_framework.viewsets import ModelViewSet
from .models.leakage import Leakage
from .models.token import Token
from .models.task import Task
from .serializers.leakage_serializers import LeakageSerializer
from .serializers.token_serializers import TokenSerializer
from .serializers.task_serializers import TaskSerializer


class LeakageViewSet(ModelViewSet):
    queryset = Leakage.objects.order_by('-id')
    serializer_class = LeakageSerializer
    http_method_names = ('get', 'put')


class TokenViewSet(ModelViewSet):
    queryset = Token.objects.order_by('-id')
    serializer_class = TokenSerializer


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.order_by('-id')
    serializer_class = TaskSerializer
