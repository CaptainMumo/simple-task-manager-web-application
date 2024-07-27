"""
Tasks app tests.

These tests use the Django test client to make API requests to the tasks app.

To run these tests:

    python manage.py test
"""
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Task

class TaskAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')

        self.task_data = {
            'title': 'Test Task',
            'description': 'Test Task Description'
        }

        self.invalid_task_data = {
            'title': '',
            'description': ''
        }

        self.task = Task.objects.create(title='Existing Task', description='Existing Task Description', user=self.user)

    def test_create_task(self):
        response = self.client.post('/tasks/', self.task_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], self.task_data['title'])
        self.assertEqual(response.data['description'], self.task_data['description'])
        self.assertEqual(response.data['user'], self.user.id)

    def test_create_task_with_invalid_data(self):
        response = self.client.post('/tasks/', self.invalid_task_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_task(self):
        response = self.client.get(f'/tasks/{self.task.id}/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.task.title)
        self.assertEqual(response.data['description'], self.task.description)
        self.assertEqual(response.data['user'], self.user.id)

    def test_update_task(self):
        updated_data = {
            'title': 'Updated Task',
            'description': 'Updated Task Description',
            'completed': True
        }
        response = self.client.put(f'/tasks/{self.task.id}/', updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], updated_data['title'])
        self.assertEqual(response.data['description'], updated_data['description'])
        self.assertEqual(response.data['completed'], updated_data['completed'])

    def test_partial_update_task(self):
        partial_data = {
            'completed': True
        }
        response = self.client.patch(f'/tasks/{self.task.id}/', partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['completed'], partial_data['completed'])

    def test_delete_task(self):
        response = self.client.delete(f'/tasks/{self.task.id}/', format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Task.objects.filter(id=self.task.id).exists())

    def test_unauthorized_access(self):
        self.client.logout()
        response = self.client.get('/tasks/', format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_task_with_incorrect_credentials(self):
        self.client.logout()
        self.client.login(username='wronguser', password='wrongpassword')
        response = self.client.post('/tasks/', self.task_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self):
        self.client.logout()
