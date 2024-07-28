"""
URL configuration for tasks app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (TaskViewSet, RegisterView, LoginView, LogoutView)


router = DefaultRouter()
router.register('tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register', RegisterView.as_view(), name='auth_register'),
    path('auth/login', LoginView.as_view(), name='auth_login'),
    path('auth/logout', LogoutView.as_view(), name='auth_logout'),
]
