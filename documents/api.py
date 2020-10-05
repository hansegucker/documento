from knox.models import AuthToken
from rest_framework import permissions
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from documents.models import Document
from documents.serializers import (
    DocumentSerializer,
    LoginUserSerializer,
    UserSerializer,
)


class DocumentViewSet(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    queryset = Document.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DocumentSerializer


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
