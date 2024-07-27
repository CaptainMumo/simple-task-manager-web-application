"""
Tasks app views.
"""
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    Task viewset class.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
