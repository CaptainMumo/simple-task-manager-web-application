// src/components/TaskDetail/TaskDetail.js
import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { Pencil, Trash } from 'phosphor-react';

const TaskDetail = ({ task, handleMarkComplete, handleEditTask, handleDeleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setEditedTask({ ...task });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        handleEditTask(editedTask);
        setIsEditing(false);
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <Row>
                <Col>
                    {isEditing ? (
                        <Form.Control
                            type="text"
                            name="title"
                            value={editedTask.title}
                            onChange={handleChange}
                            className="mb-3"
                        />
                    ) : (
                        <h1>{task.title}</h1>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    {isEditing ? (
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={editedTask.description}
                            onChange={handleChange}
                            rows={3}
                            className="mb-3"
                        />
                    ) : (
                        <p>{task.description}</p>
                    )}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Check
                        type="checkbox"
                        label="Completed"
                        checked={task.completed}
                        disabled={!isEditing}
                        onChange={(e) => setEditedTask((prev) => ({ ...prev, completed: e.target.checked }))}
                    />
                </Col>
            </Row>
            {!isEditing && (
                <Row className="mb-3">
                    <Col>
                        <Button
                            variant={task.completed ? 'warning' : 'success'}
                            className="w-100"
                            onClick={() => handleMarkComplete(task.id)}
                        >
                            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                        </Button>
                    </Col>
                </Row>
            )}
            <Row>
                <Col>
                    {isEditing ? (
                        <div className="d-flex">
                            <Button variant="secondary" className="w-50 me-1" onClick={toggleEdit}>
                                Cancel
                            </Button>
                            <Button variant="primary" className="w-50" onClick={handleUpdate}>
                                Update
                            </Button>
                        </div>
                    ) : (
                        <div className="d-flex">
                            <Button variant="primary" className="w-50 me-1" onClick={toggleEdit}>
                                <Pencil size={24} className="me-2" /> Edit
                            </Button>
                            <Button variant="danger" className="w-50" onClick={() => handleDeleteTask(task.id)}>
                                <Trash size={24} className="me-2" /> Delete
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TaskDetail;
