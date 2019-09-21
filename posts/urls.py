from rest_framework import routers
from django.urls import path 
from .api import PostViewSet

router = routers.DefaultRouter()

router.register('' ,PostViewSet ,basename='posts')

urlpatterns = router.urls
