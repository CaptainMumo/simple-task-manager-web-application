// src/pages/HomePage/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../../components/TaskList';
import NewTask from '../../components/NewTask/';
import { getTasks, patchTask, deleteTask } from '../../api';
import { useModal } from '../../context/ModalContext';

const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
        if (a.completed && !b.completed) {
            return 1;
        } else if (!a.completed && b.completed) {
            return -1;
        } else {
            return 0;
        }
    });
}
const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const { openNewTaskModal, showNewTaskModal, closeNewTaskModal } = useModal();
    const navigate = useNavigate();

    // Fetch tasks from the server
    useEffect(() => {
        fetchTasks();
    }, []);


    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            sortTasks(data);
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };


    const handleAddTask = () => {
        // Logic to add a new task
        openNewTaskModal();
    };

    const handleTaskCreated = (newTask) => {     
        fetchTasks();  
        // Delay a little before closing modal
        setTimeout(() => {
            closeNewTaskModal();
        }, 2000);
    }

    const handleMarkComplete = async (taskId) => {
        try {
            const task = tasks.find((task) => task.id === taskId);
            const completed = !task.completed;
            const updatedTask = await patchTask(taskId, { completed });
            fetchTasks();
        } catch (error) {
            console.error('Error marking task as complete:', error);
        }
    };

    const handleEditTask = (taskId) => {
        // Logic to edit a task
        navigate(`/tasks/${taskId}`);
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(taskId);
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    return (
        <div>
            <TaskList
                tasks={tasks}
                handleAddTask={handleAddTask}
                handleMarkComplete={handleMarkComplete}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
            />
            <NewTask
                show={showNewTaskModal}
                onHide={closeNewTaskModal}
                onTaskCreated={handleTaskCreated}
            />
        </div>
    );
};

export default HomePage;
