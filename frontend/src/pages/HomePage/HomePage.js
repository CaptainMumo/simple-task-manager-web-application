// src/pages/HomePage/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../../components/TaskList';
import { getTasks, patchTask, deleteTask } from '../../api';


const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    // Fetch tasks from the server
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);


    const handleAddTask = () => {
        // Logic to add a new task
    };

    const handleMarkComplete = async (taskId) => {
        try {
            const task = tasks.find((task) => task.id === taskId);
            const completed = !task.completed;
            const updatedTask = await patchTask(taskId, { completed });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? updatedTask : task
                )
            );
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
        </div>
    );
};

export default HomePage;
