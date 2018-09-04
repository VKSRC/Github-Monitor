from rest_framework.viewsets import ModelViewSet
from github_monitor.apps.leakage.models import Leakage
from github_monitor.apps.leakage.serializers import LeakageSerializer


class LeakageViewSet(ModelViewSet):
    queryset = Leakage.objects.all()
    serializer_class = LeakageSerializer
