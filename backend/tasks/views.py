"""
Tasks app views.
"""
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
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
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    

class RegisterView(generics.GenericAPIView):
    """
    View for registering a new user.

    POST /register/ - Register a new user.
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })


class LoginView(generics.GenericAPIView):
    """
    View for logging in a user.

    POST /login/ - Login a user.
    """
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]


    def post(self, request, *args, **kwargs):
        """
        Validate and login a user.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })
    

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(generics.GenericAPIView):
    """
    View for logging out a user.

    POST /logout/ - Logout a user.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Logout user using Django's logout function.
        """
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
