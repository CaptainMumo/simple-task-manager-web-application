// src/components/TaskDetail/TaskDetail.js
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Pencil, Trash } from 'phosphor-react';

const TaskDetail = ({ task, onMarkComplete, onEditTask, onDeleteTask }) => {
    const handleDelete = () => {
        onDeleteTask(task.id);
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <Row>
                <Col>
                    <h1>{task.title}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{task.description}</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Check
                        type="checkbox"
                        label="Completed"
                        checked={task.completed}
                        disabled
                        variant="success"
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Button
                        variant={task.completed ? 'warning' : 'success'}
                        className="w-100"
                        onClick={onMarkComplete}
                    >
                        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="d-flex">
                        <Button variant="primary" className="w-50 me-1" onClick={onEditTask}>
                            <Pencil size={24} className="me-2" /> Edit
                        </Button>
                        <Button variant="danger" className="w-50" onClick={handleDelete}>
                            <Trash size={24} className="me-2" /> Delete
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default TaskDetail;
