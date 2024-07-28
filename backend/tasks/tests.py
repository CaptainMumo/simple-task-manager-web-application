from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from .models import Task
from rest_framework_simplejwt.tokens import RefreshToken

class UserAuthTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('auth_register')
        self.login_url = reverse('token_obtain_pair')
        self.refresh_url = reverse('token_refresh')
        self.logout_url = reverse('auth_logout')
        self.user_data = {
            'username': 'testuser',
            'password': 'password123'
        }

    def test_user_registration(self):
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        User.objects.create_user(**self.user_data)
        response = self.client.post(self.login_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_token_refresh(self):
        User.objects.create_user(**self.user_data)
        login_response = self.client.post(self.login_url, self.user_data)
        refresh_token = login_response.data['refresh']
        response = self.client.post(self.refresh_url, {'refresh': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_logout(self):
        User.objects.create_user(**self.user_data)
        login_response = self.client.post(self.login_url, self.user_data)
        token = login_response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        refresh_token = login_response.data['refresh']
        response = self.client.post(self.logout_url, {'refresh': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)


class TaskTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('auth_register')
        self.login_url = reverse('token_obtain_pair')
        self.user_data = {
            'username': 'testuser',
            'password': 'password123'
        }
        self.user = User.objects.create_user(**self.user_data)
        self.login_response = self.client.post(self.login_url, self.user_data)
        self.access_token = self.login_response.data['access']
        self.tasks_url = reverse('task-list')
        self.task_data = {
            'title': 'Test Task',
            'description': 'Test Description'
        }

    def test_create_task(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.post(self.tasks_url, self.task_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], self.task_data['title'])

    def test_get_tasks(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        self.client.post(self.tasks_url, self.task_data)
        response = self.client.get(self.tasks_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_specific_task(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        create_response = self.client.post(self.tasks_url, self.task_data)
        task_id = create_response.data['id']
        response = self.client.get(reverse('task-detail', args=[task_id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.task_data['title'])

    def test_update_task(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        create_response = self.client.post(self.tasks_url, self.task_data)
        task_id = create_response.data['id']
        updated_data = {'title': 'Updated Task', 'description': 'Updated Description'}
        response = self.client.put(reverse('task-detail', args=[task_id]), updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], updated_data['title'])

    def test_delete_task(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        create_response = self.client.post(self.tasks_url, self.task_data)
        task_id = create_response.data['id']
        response = self.client.delete(reverse('task-detail', args=[task_id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_unauthorized_task_access(self):
        task_id = 10000
        response = self.client.get(reverse('task-detail', args=[task_id]))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_forbidden_task_access(self):
        another_user = User.objects.create_user(username='anotheruser', password='password123')
        another_user_token = RefreshToken.for_user(another_user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {another_user_token}')
        create_response = self.client.post(self.tasks_url, self.task_data)
        task_id = create_response.data['id']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get(reverse('task-detail', args=[task_id]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
