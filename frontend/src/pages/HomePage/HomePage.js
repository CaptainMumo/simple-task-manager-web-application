// src/pages/HomePage/HomePage.js
import React, { useState } from 'react';
import TaskList from '../../components/TaskList';

const HomePage = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Sample Task 1', completed: false },
        { id: 2, title: 'Sample Task 2', completed: true },
    ]);

    const handleAddTask = () => {
        // Logic to add a new task
    };

    const handleMarkComplete = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleEditTask = (taskId) => {
        // Logic to edit a task
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
