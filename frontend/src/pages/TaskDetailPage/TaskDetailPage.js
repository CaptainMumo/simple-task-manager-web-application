// src/pages/TaskDetailPage/TaskDetailPage.js
import React, { useEffect, useState } from 'react';
import TaskDetail from '../../components/TaskDetail';
import { useModal } from '../../context/ModalContext';
import TaskModal from '../../components/TaskModal';
import { useParams } from 'react-router-dom';
import { getTask, deleteTask, patchTask } from '../../api';
import CustomModal from '../../components/Modal/CustomModal';
import { Button, Spinner } from 'react-bootstrap';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

const TaskDetailPage = () => {
    const { id: taskId } = useParams();
    const { openTaskModal, showTaskModal, closeTaskModal } = useModal();

    const [task, setTask] = useState(null);
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const timeOut = 2000;

    useEffect(() => {
        setLoading(true);
        const fetchTaskData = async () => {
            try {
                const data = await getTask(taskId);
                setTask(data);
            } catch (error) {
                setModalTitle('Ooopps!');
                setModalMessage(
                    <>
                        <p>Task Not Found</p>
                        <Button onClick={() => window.history.back()}>Go Back Home</Button>
                    </>
                );
                setIsError(true);
                setShowMessageModal(true);
            } finally {
                setLoading(false);
            }
        };
        fetchTaskData();
    }, [taskId]);

    const handleMarkComplete = async () => {
        setLoading(true);
        try {
            const patchedTask = await patchTask(task.id, { completed: !task.completed });
            setTask(patchedTask);
            setModalTitle('Success');
            setModalMessage('Task updated successfully!');
            setIsError(false);
        } catch (error) {
            setModalTitle('Error');
            setModalMessage('Marking task as complete failed. Please try again later.');
            setIsError(true);
        } finally {
            setLoading(false);
            setShowMessageModal(true);
        }
    };

    const handleEditTask = () => {
        setTaskToUpdate(task);
        openTaskModal();
    };

    const handleTaskUpdated = (updatedTask) => {
        if (taskToUpdate) {
            setTask(updatedTask);
        }
        setTimeout(() => {
            closeTaskModal();
            setTaskToUpdate(null);
        }, timeOut);     
    };

    const handleTaskModalClose = () => {
        closeTaskModal();
        setTaskToUpdate(null);
    };

    const handleDeleteTask = () => {
        setShowConfirmDeleteModal(true);
    };

    const confirmDelete = async () => {
        setShowConfirmDeleteModal(false);
        setLoading(true);
        try {
            await deleteTask(task.id);
            setTask(null);
            setModalTitle('Success');
            setModalMessage('Task deleted successfully!');
            setIsError(false);
            // Go back to the previous page
            setTimeout(() => {
                window.history.back();
            }, timeOut);
        } catch (error) {
            setModalTitle('Error');
            setModalMessage('Deleting task failed. Please try again later.');
            setIsError(true);
        } finally {
            setLoading(false);
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
                task && (
                    <TaskDetail
                        task={task}
                        onMarkComplete={handleMarkComplete}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                    />
                )
            )}
            <TaskModal
                show={showTaskModal}
                onHide={handleTaskModalClose}
                onTaskCreatedOrUpdated={handleTaskUpdated}
                task={taskToUpdate}
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
                        {loading ? <Spinner animation="border" size="sm" /> : <Button variant="secondary" onClick={() => setShowConfirmDeleteModal(false)}>Cancel</Button>}
                        {loading ? <Spinner animation="border" size="sm" /> : <Button variant="danger" onClick={confirmDelete}>Delete</Button>}
                    </>
                }
            />
        </div>
    );
};

export default TaskDetailPage;
