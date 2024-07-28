"""
Tasks app serializers.
"""
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
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
        read_only_fields = ["user"]


class UserSerializer(serializers.ModelSerializer):
    """
    User serializer class.
    """

    class Meta:
        """
        Serializer Meta class.
        """
        model = User
        fields = ["id", "username"]


class RegisterSerializer(serializers.ModelSerializer):
    """
    Register serializer class.
    """

    class Meta:
        """
        Serializer Meta class.
        """
        model = User
        fields = ["username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """
        Create a new user with encrypted password and return it.
        """
        user = User.objects.create_user(
            validated_data["username"], password=validated_data["password"]
        )

        return user
    

class LoginSerializer(serializers.Serializer):
    """
    Login serializer class.
    """
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        """
        Validate and authenticate the user.
        """
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")    
    

    def create(self, validated_data):
        """
        Implementing to adhere to abstract method requirements.
        """
        pass

    def update(self, instance, validated_data):
        """
        Implementing to adhere to abstract method requirements.
        """
        pass

