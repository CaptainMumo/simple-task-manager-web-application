"""
Custom Permissions for Tasks app.
"""
from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of an object to read, update or delete it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
    