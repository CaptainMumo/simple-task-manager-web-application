"""
Tasks app views.
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import IsOwner
from .models import Task
from .serializers import (TaskSerializer, UserSerializer, RegisterSerializer)


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
        Set the permission classes based on the action.

        If the action is 'create', the permission class is IsAuthenticated.
        Otherwise, the permission class is IsAuthenticated and IsOwner.
        """
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated, IsOwner]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        """
        Set the user field of the task to the authenticated user.
        """
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        Filter tasks by the authenticated user.
        """
        return self.queryset.filter(user=self.request.user)
    

class RegisterView(generics.CreateAPIView):
    """
    View for registering a new user.
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Create a new user and log them in.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        }, status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    """
    View for logging out the user.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Log out the user and blacklist their refresh token.
        """
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
