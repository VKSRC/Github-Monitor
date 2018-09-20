from rest_framework import routers
from .views import TaskViewSet, TokenViewSet, LeakageViewSet

app_name = 'monitor'
router = routers.DefaultRouter()
router.register(r'token', TokenViewSet)
router.register(r'result', LeakageViewSet)
router.register(r'task', TaskViewSet)
urlpatterns = router.urls
