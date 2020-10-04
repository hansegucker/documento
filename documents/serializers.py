from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from documents.models import Document


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class DocumentSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = ("id", "name", "added_at", "is_in_progress")


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")
