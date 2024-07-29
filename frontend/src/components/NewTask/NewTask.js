// src/components/NewTask/NewTask.js
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { MdCheckCircle, MdCancel } from 'react-icons/md'; // Import icons
import CustomModal from '../Modal/CustomModal';
import { createTask } from '../../api';
import './NewTask.css'; // Import custom CSS

const NewTask = ({ show, onHide, onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleCreateTask = async () => {
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const response = await createTask(title, description);
            setMessage('Task created successfully');
            setTimeout(() => {
                setMessage('');
            }, 2000);
            onTaskCreated(response.data);
        } catch (err) {
            console.error(err);
            setError('Task creation failed! Try again!');
            setTimeout(() => {
                setError('');
            }, 2000);
        } finally {
            setTitle('');
            setDescription('');
            setLoading(false);
        }
    };

    const renderStatus = () => {
        if (loading) {
            return (
                <div className="status-overlay">
                    <div className="status-content">
                        <Spinner animation="border" variant="primary" size="lg" />
                        <div className="status-message">Creating...</div>
                    </div>
                </div>
            );
        } else if (message) {
            return (
                <div className="status-overlay">
                    <div className="status-content">
                        <MdCheckCircle size={48} color="green" />
                        <div className="status-message">{message}</div>
                    </div>
                </div>
            );
        } else if (error) {
            return (
                <div className="status-overlay">
                    <div className="status-content">
                        <MdCancel size={48} color="red" />
                        <div className="status-message">{error}</div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <CustomModal
            show={show}
            onHide={onHide}
            title="Create New Task"
            body={
                <div className="modal-body-container">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Task Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                isInvalid={title.length > 254}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                placeholder="Task Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {renderStatus()}
                    </Form>
                </div>
            }
            footer={
                <>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateTask} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Task'}
                    </Button>
                </>
            }
        />
    );
};

export default NewTask;
