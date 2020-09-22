from django.urls import path, include
from rest_framework import routers

from .api import DocumentViewSet

router = routers.DefaultRouter()
router.register("documents", DocumentViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
