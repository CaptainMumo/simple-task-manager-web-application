// src/components/Navigation/Navigation.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { ClipboardText, House, SignIn, Plus } from 'phosphor-react';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
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
            <LinkContainer to="/">
              <Nav.Link className="d-flex align-items-center">
                <House size={24} />
                <span className="ms-1">Home</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add-task">
              <Nav.Link className="d-flex align-items-center">
                <Plus size={24} />
                <span className="ms-1">Add Task</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="d-flex align-items-center border border-primary rounded-pill ms-2 p-2">
                <span className="me-1">Sign In</span>
                <SignIn size={24} />
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
