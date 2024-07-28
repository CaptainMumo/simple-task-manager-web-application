"""
Custom permissions for tasks app.
"""
from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of an object to read, update and edit it.
    """

    def has_object_permission(self, request, view, obj):
        """
        Check if the object owner matches the request user.
        """
        return obj.user == request.user
    