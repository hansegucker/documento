"""documento URL Configuration"""
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

from documents import endpoints, views

urlpatterns = (
    static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + [
        path("admin/", admin.site.urls),
        path("labels/<int:pk>.pdf", views.barcode_label, name="barcode_label"),
        path("api/", include(endpoints)),
        path("api/auth/", include("knox.urls")),
        url(r"^", TemplateView.as_view(template_name="index.html")),
    ]
)
