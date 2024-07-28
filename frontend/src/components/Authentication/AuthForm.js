// src/components/Authentication/AuthForm.js
import React, { useState } from 'react';
import { Container, Tab, Tabs, Form, Button } from 'react-bootstrap';
import './AuthForm.css';

const AuthForm = () => {
  const [key, setKey] = useState('signin');

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="auth-container p-4 bg-light rounded">
        <Tabs
          id="auth-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 custom-tabs" // Apply custom class for additional styling
        >
          <Tab eventKey="signin" title="Sign In">
            <h3 className="text-center">Sign In</h3>
            <p className="text-center text-muted">Enter your details below to sign in</p>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>
            </Form>
            <p className="mt-3 text-center text-muted small">
              Don't have an account? <Button variant="link" size="sm" className="text-decoration-none m-0 p-0" onClick={() => setKey('signup')}>Sign Up</Button>
            </p>
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <h3 className="text-center">Sign Up</h3>
            <p className="text-center text-muted">Enter your details below to sign up</p>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
                <Form.Text className="text-muted small">
                  Your password must be 8-20 characters long.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </Form>
            <p className="mt-3 text-center text-muted small">
              Already have an account? <Button variant="link" size="sm" className="text-decoration-none m-0 p-0" onClick={() => setKey('signin')}>Sign In</Button>
            </p>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default AuthForm;
