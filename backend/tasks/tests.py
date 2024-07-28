"""
Tasks app tests.
"""
from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Task


class UserAuthTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('auth_register')
        self.login_url = reverse('auth_login')
        self.logout_url = reverse('auth_logout')
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword',
        }

    def test_user_registration(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        User.objects.create_user(**self.user_data)
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_user_logout(self):
        user = User.objects.create_user(**self.user_data)
        token = Token.objects.create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)
    

class TaskTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        self.user = User.objects.create_user(**self.user_data)
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.task_url = reverse('task-list')
        self.task_data = {'title': 'Test Task', 'description': 'Test Description'}

    def test_create_task(self):
        response = self.client.post(self.task_url, self.task_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], self.task_data['title'])

    def test_get_tasks(self):
        Task.objects.create(user=self.user, **self.task_data)
        response = self.client.get(self.task_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_task(self):
        task = Task.objects.create(user=self.user, **self.task_data)
        update_data = {'title': 'Updated Task'}
        response = self.client.patch(reverse('task-detail', args=[task.id]), update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], update_data['title'])

    def test_delete_task(self):
        task = Task.objects.create(user=self.user, **self.task_data)
        response = self.client.delete(reverse('task-detail', args=[task.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class UnauthorizedTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.task_url = reverse('task-list')
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        self.user = User.objects.create_user(**self.user_data)
        self.task_data = {'title': 'Test Task', 'description': 'Test Description'}

    def test_unauthorized_create_task(self):
        response = self.client.post(self.task_url, self.task_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthorized_get_tasks(self):
        response = self.client.get(self.task_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthorized_update_task(self):
        task = Task.objects.create(user=self.user, **self.task_data)
        update_data = {'title': 'Updated Task'}
        response = self.client.patch(reverse('task-detail', args=[task.id]), update_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthorized_delete_task(self):
        task = Task.objects.create(user=self.user, **self.task_data)
        response = self.client.delete(reverse('task-detail', args=[task.id]))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
