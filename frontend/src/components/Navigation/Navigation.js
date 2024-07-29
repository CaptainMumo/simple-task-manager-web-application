// src/components/Navigation/Navigation.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { ClipboardText, House, SignIn, SignOut, Plus } from 'phosphor-react';
import { LinkContainer } from 'react-router-bootstrap';
import { logoutUser } from '../../api';
import { useModal } from '../../context/ModalContext';

const Navigation = () => {
    const { openNewTaskModal } = useModal();

    // Check if user is logged in
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;

    // Handle logout
    const handleLogout = async () => {
        await logoutUser();
        window.location.reload();
    }

    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">
                    <ClipboardText size={32} />
                    <span className="ms-2">Task Manager</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {isLoggedIn ? (
                            <>
                                <LinkContainer to="/">
                                    <Nav.Link className="d-flex align-items-center">
                                        <House size={24} />
                                        <span className="ms-1">Home</span>
                                    </Nav.Link>
                                </LinkContainer>
                                
                                <Button variant="primary" className="bg-transparent border-0" onClick={openNewTaskModal}>
                                    <Nav.Link className="d-flex align-items-center">
                                        <Plus size={24} />
                                        <span className="ms-1">Add Task</span>
                                    </Nav.Link>
                                </Button>

                                <Button variant="danger" className="bg-transparent border-0" onClick={handleLogout}>
                                    <Nav.Link className="d-flex align-items-center">
                                        <SignOut size={24} />
                                        <span className="ms-1">Logout</span>
                                    </Nav.Link>
                                </Button>
                            </>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link className="d-flex align-items-center border border-primary rounded-pill ms-2 p-2">
                                    <span className="me-1">Sign In/Sign Up</span>
                                    <SignIn size={24} />
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
