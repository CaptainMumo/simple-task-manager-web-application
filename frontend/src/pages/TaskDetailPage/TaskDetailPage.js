// src/pages/TaskDetailPage/TaskDetailPage.js
import React from 'react';
import TaskDetail from '../../components/TaskDetail';
import { useModal } from '../../context/ModalContext';
import NewTask from '../../components/NewTask';

// Mock task data
const task = {
    id: 1,
    title: 'Sample Task',
    description: 'This is a sample task description.',
    completed: true,
};

// Mock handlers
const handleMarkComplete = (taskId) => {
    console.log('Mark complete', taskId);
    task.completed = !task.completed;
};

const handleEditTask = (updatedTask) => {
    console.log('Edit task', updatedTask);
};

const handleDeleteTask = (taskId) => {
    console.log('Delete task', taskId);
};

const TaskDetailPage = () => {

    const { openNewTaskModal, showNewTaskModal, closeNewTaskModal } = useModal();

    return (
        <div>
            <TaskDetail
                task={task}
                handleMarkComplete={handleMarkComplete}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
            />
            <NewTask
                show={showNewTaskModal}
                onHide={closeNewTaskModal}
                onTaskCreated={() => {setTimeout(() => {closeNewTaskModal();}, 2000);}}
            />
        </div>
    );
};

export default TaskDetailPage;
