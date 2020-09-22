from rest_framework.serializers import ModelSerializer

from documents.models import Document


class DocumentSerializer (ModelSerializer):
    class Meta:
        model = Document
        fields = ("id", "name", "added_at", "is_in_progress")