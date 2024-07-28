"""
Tasks app serializers.
"""
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
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
        user = User.objects.create_user(validated_data["username"], None, validated_data["password"])
        return user
    

class LoginSerializer(serializers.Serializer):
    """
    Login serializer class.
    """
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        """
        Validate the username and password.
        Returns the validated user, or raises a ValidationError.
        """
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials.")
    
    def create(self, validated_data):
        """
        This method is not needed for authentication, but it must be implemented
        to satisfy the abstract method requirements. 
        """
        raise NotImplementedError("Create method is not implemented for LoginSerializer")

    def update(self, instance, validated_data):
        """
        This method is not needed for authentication, but it must be implemented
        to satisfy the abstract method requirements.
        """
        raise NotImplementedError("Update method is not implemented for LoginSerializer")
