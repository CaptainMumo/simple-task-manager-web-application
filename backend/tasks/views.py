"""
Tasks app views.
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer


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
