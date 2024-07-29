// src/components/TaskList/TaskList.js
import React from 'react';
import { Button, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CheckCircle, Trash, Pencil, PlusCircle } from 'phosphor-react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, handleAddTask, handleMarkComplete, handleEditTask, handleDeleteTask }) => {
    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Row className="w-50 mb-3">
                <Col>
                    <Button
                        variant="outline-primary"
                        className="w-100 d-flex align-items-center justify-content-center"
                        style={{ border: '2px dashed', height: '3rem' }}
                        onClick={handleAddTask}
                    >
                        <PlusCircle size={24} className="me-2" />
                        Add New Task
                    </Button>
                </Col>
            </Row>
            {tasks.length === 0 ? (
                <Row className="w-50 mb-3">
                    <Col>
                        <div className="w-100 d-flex align-items-center justify-content-center" style={{ border: '1px solid grey', height: '3rem', borderRadius: '0.5rem', backgroundColor: '#f8f9fa' }}>
                            No tasks. You're all clear. Add some and get rolling!
                        </div>
                    </Col>
                </Row>
            ) : (
                tasks.map((task, index) => (
                    <Row key={index} className="w-50 mb-3">
                        <Col>
                            <div className="d-flex align-items-center justify-content-between p-2" style={{ border: '1px solid grey', borderRadius: '0.5rem', backgroundColor: '#ffffff' }}>
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip id={`tooltip-complete-${index}`}>
                                            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                                        </Tooltip>
                                    }
                                >
                                    <CheckCircle
                                        size={24}
                                        className={`me-2 ${task.completed ? 'text-success' : 'text-secondary'}`}
                                        onClick={() => handleMarkComplete(task.id)}
                                    />
                                </OverlayTrigger>
                                <div className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through' : 'text-decoration-none'}`} >
                                    <Link to={`/tasks/${task.id}`} className='text-decoration-none text-black'>
                                        {task.title}
                                    </Link>
                                </div>
                                <div className="d-flex">
                                    <OverlayTrigger
                                        overlay={<Tooltip id={`tooltip-edit-${index}`}>Edit Task</Tooltip>}
                                    >
                                        <Pencil
                                            size={24}
                                            className="me-2 text-primary"
                                            onClick={() => handleEditTask(task.id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        overlay={<Tooltip id={`tooltip-delete-${index}`}>Delete Task</Tooltip>}
                                    >
                                        <Trash
                                            size={24}
                                            className="text-danger"
                                            onClick={() => handleDeleteTask(task.id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </Col>
                    </Row>
                ))
            )}
        </Container>
    );
};

export default TaskList;