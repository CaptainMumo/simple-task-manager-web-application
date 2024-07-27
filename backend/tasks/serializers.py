"""
Tasks app serializers.
"""
from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    """
    Task serializer class.
    """

    class Meta:
        """
        Serializer Meta class.
        """
        model = Task
        fields = "__all__"
