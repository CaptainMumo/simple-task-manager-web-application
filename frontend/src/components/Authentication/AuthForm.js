// src/components/Authentication/AuthForm.js
import React, { useState } from 'react';
import { Container, Tab, Tabs, Form, Button } from 'react-bootstrap';
import { registerUser, loginUser } from '../../api';
import './AuthForm.css';


const AuthForm = () => {
    const [key, setKey] = useState('signin');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(username, password);
            alert('Login successful');
            // TODO: Display success message

            // Redirect to homepage
            window.location.href = '/';
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await registerUser(username, password);
            alert('Registration successful');    
            // TODO: Display success message
            
            // Login after registration
            handleLogin(e);
        } catch (error) {
            console.error('Registration failed:', error);
            setError('An error occurred during registration');
        }
    };


    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="auth-container p-4 bg-light rounded">
                <Tabs
                    id="auth-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 custom-tabs"
                >
                    <Tab eventKey="signin" title="Sign In">
                        <h3 className="text-center">Sign In</h3>
                        <p className="text-center text-muted">Sign In to manage your tasks!</p>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {error && <p className="text-danger mt-2">{error}</p>}
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
                        <Form onSubmit={handleRegister}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Form.Text className="text-muted small">
                                    Your password must be 8-20 characters long.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {error && <p className="text-danger mt-2">{error}</p>}
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
