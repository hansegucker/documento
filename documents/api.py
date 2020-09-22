from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from documents.models import Document
from documents.serializers import DocumentSerializer


class DocumentViewSet(ModelViewSet):
    queryset = Document.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DocumentSerializer
