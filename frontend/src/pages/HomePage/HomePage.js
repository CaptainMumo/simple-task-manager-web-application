// src/pages/HomePage/HomePage.js
import React, { useState, useEffect } from 'react';
import TaskList from '../../components/TaskList';
import TaskModal from '../../components/TaskModal';
import { getTasks, patchTask, deleteTask } from '../../api';
import { useModal } from '../../context/ModalContext';
import { Button, Spinner } from 'react-bootstrap';
import CustomModal from '../../components/Modal/CustomModal';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

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
    const { openTaskModal, showTaskModal, closeTaskModal } = useModal();
    const [tasks, setTasks] = useState([]);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const timeOut = 2000;

    // Fetch tasks from the server
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await getTasks();
            sortTasks(data);
            setTasks(data);
        } catch (error) {
            setModalTitle('Error fetching tasks');
            setModalMessage('An error occurred while fetching tasks. Please try again later.');
            setIsError(true);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = () => {
        setCurrentTask(null);
        openTaskModal();
    };

    const handleTaskCreatedorUpdated = () => {
        fetchTasks();
        // Delay a little before closing modal
        setTimeout(() => {
            closeTaskModal();
            setCurrentTask(null);
        }, timeOut);
    };

    const handleTaskModalClose = () => {
        closeTaskModal();
        setCurrentTask(null);
    };

    const handleMarkComplete = async (taskId) => {
        setLoading(true);
        try {
            const task = tasks.find((task) => task.id === taskId);
            const completed = !task.completed;
            const patchedTask = await patchTask(taskId, { completed });
            const updatedTasks = (prevTasks) => prevTasks.map((t) => (t.id === taskId ? patchedTask : t));
            setTasks(sortTasks(updatedTasks(tasks)));
            setModalTitle('Success');
            setModalMessage('Task updated successfully!');
            setIsError(false);
        } catch (error) {
            setModalTitle('Error');
            setModalMessage('Error marking task as complete.');
            setIsError(true);
            console.error('Error marking task as complete:', error);
        } finally {
            setLoading(false);
            setShowMessageModal(true);
        }
    };

    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find(task => task.id === taskId);
        setCurrentTask(taskToEdit);
        openTaskModal();
    };

    const handleDeleteTask = (taskId) => {
        setTaskIdToDelete(taskId);
        setShowConfirmDeleteModal(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            await deleteTask(taskIdToDelete);
            const updatedTasks = (prevTasks) => prevTasks.filter((task) => task.id !== taskIdToDelete);
            setTasks(sortTasks(updatedTasks(tasks)));
            setModalTitle('Success');
            setModalMessage('Task deleted successfully!');
            setIsError(false);
        } catch (error) {
            setModalTitle('Error');
            setModalMessage('Error deleting task.');
            setIsError(true);
            console.error('Error deleting task:', error);
        } finally {
            setLoading(false);
            setShowConfirmDeleteModal(false);
            setShowMessageModal(true);
        }
    };

    return (
        <div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Spinner animation="border" size="lg" />
                </div>
            ) : (
                <TaskList
                    tasks={tasks}
                    handleAddTask={handleAddTask}
                    handleMarkComplete={handleMarkComplete}
                    handleEditTask={handleEditTask}
                    handleDeleteTask={handleDeleteTask}
                />
            )}

            <TaskModal
                show={showTaskModal}
                onHide={handleTaskModalClose}
                onTaskCreatedOrUpdated={handleTaskCreatedorUpdated}
                task={currentTask}
                timeOut={timeOut}
            />
            <CustomModal
                show={showMessageModal}
                onHide={() => setShowMessageModal(false)}
                title={modalTitle}
                body={
                    <div className='text-center align-items-center justify-content-center d-flex'>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="lg" />
                                <div className="mt-2">Please wait...</div>
                            </>
                        ) : isError ? (
                            <div>
                                <MdCancel size={48} color="red" />
                                <div className="text-danger">{modalMessage}</div>
                            </div>
                        ) : (
                            <div>
                                <MdCheckCircle size={48} color="green" />
                                <div className="text-success">{modalMessage}</div>
                            </div>
                        )}
                    </div>
                }
                autoClose={!isError}
                autoCloseTime={timeOut}
            />

            <CustomModal
                show={showConfirmDeleteModal}
                onHide={() => setShowConfirmDeleteModal(false)}
                title="Confirm Delete"
                body="Are you sure you want to delete this task?"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setShowConfirmDeleteModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                    </>
                }
            />
        </div>
    );
};

export default HomePage;
