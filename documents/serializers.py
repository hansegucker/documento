from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.urls import reverse

from documents.models import Category, Document, PrintJob
from rest_framework import serializers
from rest_framework.serializers import (HyperlinkedModelSerializer,
                                        ModelSerializer)


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class CategorySerializer(HyperlinkedModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), required=False
    )

    class Meta:
        model = Category
        fields = ("id", "url", "parent", "name")
        depth = 1


class DocumentSerializer(HyperlinkedModelSerializer):
    barcode = serializers.SerializerMethodField()
    barcode_label = serializers.SerializerMethodField()
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), required=False
    )

    def get_barcode_label(self, obj):
        return reverse("barcode_label", args=[obj.pk])

    def get_barcode(self, obj):
        return obj.barcode

    class Meta:
        model = Document
        fields = (
            "id",
            "url",
            "category",
            "name",
            "barcode",
            "added_at",
            "is_in_progress",
            "file",
            "barcode_label",
        )


class PrintJobSerializer(ModelSerializer):
    document = DocumentSerializer()

    class Meta:
        model = PrintJob
        fields = ("id", "report", "document", "is_printed", "printed_at")
        depth = 1


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")
