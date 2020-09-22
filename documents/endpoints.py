from django.urls import path, include
from rest_framework import routers

from .api import DocumentViewSet, LoginAPI, UserAPI

router = routers.DefaultRouter()
router.register("documents", DocumentViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/user/", UserAPI.as_view()),
]
