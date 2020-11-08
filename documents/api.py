from django.utils import timezone

from documents.models import Category, Document, PrintJob
from documents.serializers import (CategorySerializer, DocumentSerializer,
                                   LoginUserSerializer, PrintJobSerializer,
                                   UserSerializer)
from knox.models import AuthToken
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer


class DocumentViewSet(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    queryset = Document.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DocumentSerializer

    @action(methods=["post"], detail=True)
    def print_report(self, request, pk=None):
        document = self.get_object()
        job = document.print_report(request.data.get("report", "barcode_label"))

        serialized = PrintJobSerializer(job, context={'request': request})

        return Response(serialized.data)


class PrintJobViewSet(ModelViewSet):
    queryset = PrintJob.objects.filter(is_printed=False)
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PrintJobSerializer

    @action(methods=["post"], detail=True)
    def mark_as_printed(self, request, pk=None):
        job = self.get_object()
        job.is_printed = True
        job.printed_at = timezone.now()
        job.save()

        serialized = PrintJobSerializer(job, context={'request': request})

        return Response(serialized.data)


class LoginAPI(GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class UserAPI(RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
