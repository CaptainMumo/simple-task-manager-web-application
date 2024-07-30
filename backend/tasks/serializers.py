"""
Tasks app serializers.
"""
from django.contrib.auth.models import User
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
        read_only_fields = ("id", "user")


class UserSerializer(serializers.ModelSerializer):
    """
    User serializer class for returning and updating user details in the API.
    """

    class Meta:
        """
        Serializer Meta class.
        """
        model = User
        fields = ("id", "username")


class RegisterSerializer(serializers.ModelSerializer):
    """
    Register serializer class.
    """

    class Meta:
        """
        Serializer Meta class.
        """
        model = User
        fields = ("username", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )
        return user
    
