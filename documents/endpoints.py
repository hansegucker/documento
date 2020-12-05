from django.urls import include, path

from rest_framework import routers

from .api import (CategoryViewSet, DocumentViewSet, LoginAPI, PrintJobViewSet,
                  UserAPI)

router = routers.DefaultRouter()
router.register("categories", CategoryViewSet)
router.register("documents", DocumentViewSet)
router.register("print_jobs", PrintJobViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/user/", UserAPI.as_view()),
]
