"""
Tasks app serializers.
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    """
    Task serializer class.
    """

    class Meta:
        """
        Task Serializer Meta class.
        """
        model = Task
        fields = '__all__'
        read_only_fields = ['user']


class UserSerializer(serializers.ModelSerializer):
    """
    User serializer class.
    """

    class Meta:
        """
        User Serializer Meta class.

        Configure the fields to be used in the User serialization process.
        """
        model = User
        fields = ('id', 'username')
    

class RegisterSerializer(serializers.ModelSerializer):
    """
    User Registration serializer class.
    """

    class Meta:
        """
        Register Serializer Meta class.

        Configure the fields to be used in the User registration process.
        """
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class LoginSerializer(serializers.Serializer):
    """
    Login serializer class.
    """
    username = serializers.CharField()
    password = serializers.CharField()


    def validate(self, attrs):
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
    

    def create(self, validated_data):
        pass


    def update(self, instance, validated_data):
        pass


