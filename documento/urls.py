"""documento URL Configuration"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from documents import endpoints

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(endpoints)),
    path("api/auth/", include("knox.urls")),
    url(r"^", TemplateView.as_view(template_name="index.html")),
]
