"""
Tasks app views.
"""
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
from .permissions import IsOwner
from .models import Task
from .serializers import (TaskSerializer, UserSerializer, RegisterSerializer, LoginSerializer)


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Task instances.

    GET /tasks/ - Retrieve all tasks.
    POST /tasks/ - Create a new task.
    GET /tasks/<id>/ - Retrieve a specific task.
    PATCH /tasks/<id>/ - Update a task.
    DELETE /tasks/<id>/ - Delete a task.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated, IsOwner]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        """
        Set the user who created the task.
        """
        serializer.save(user=self.request.user)


class RegisterView(generics.CreateAPIView):
    """
    View for registering a new user.
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Create a new user with encrypted password and return it.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "message": "User Created Successfully.  Now perform Login to get your token",
            },
            status=status.HTTP_201_CREATED,
        )
    

class LoginView(generics.GenericAPIView):
    """
    View for logging in a user.
    """
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Validate and authenticate the user.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, _ = Token.objects.get_or_create(user=user)
        login(request, user)
        return Response(
            {
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token.key,
            }
        )
    

class LogoutView(generics.GenericAPIView):
    """
    View for logging out a user.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Log out the user and return a success message.
        """
        request.user.auth_token.delete()
        logout(request)
        return Response(status=status.HTTP_205_RESET_CONTENT)
