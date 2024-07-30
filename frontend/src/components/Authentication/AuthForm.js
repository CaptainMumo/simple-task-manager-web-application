// src/components/Authentication/AuthForm.js
import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs, Form, Button, Spinner } from 'react-bootstrap';
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import { registerUser, loginUser } from '../../api';
import CustomModal from '../Modal';
import './AuthForm.css';

const AuthForm = () => {
    const [key, setKey] = useState('signin');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    
    useEffect(() => {
        const passwordValidationRules = [
            { rule: (pwd) => pwd.length >= 8 && pwd.length <= 20, message: 'Password must be 8-20 characters long' },
            { rule: (pwd) => /[A-Z]/.test(pwd) && /[a-z]/.test(pwd), message: 'Password must have MiXeD cAsE letters' },
            { rule: (pwd) => /\d/.test(pwd), message: 'Password must have at least one number [0-9]' },
            { rule: (pwd) => /[!@#$%^&*(),.?":{}|<>`'/]/.test(pwd), message: 'Password must have at least one special character' },
        ];
        const validatePassword = (pwd) => {
            const errors = passwordValidationRules
                .filter((rule) => !rule.rule(pwd))
                .map((rule) => rule.message);
            setPasswordErrors(errors);
            setIsPasswordValid(errors.length === 0);
        };
        validatePassword(password);
    }, [password]);


    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setIsPasswordMatch(password.length > 0 && password === e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        setMessage('');
        setTitle('');
        setIsError(false);
        try {
            await loginUser(username, password);
            setTitle('Hoooray!');
            setMessage('Redirecting to homepage...');
            // Redirect to homepage
            setTimeout(() => window.location.href = '/', 3000);
        } catch (error) {
            setTitle('Login failed');
            const errorMessage = error.response?.data?.username 
                                    || error.response?.data?.password 
                                    || error.response?.data?.detail 
                                    || 'An error occurred during login';
            setMessage(errorMessage);
            setIsError(true);
            console.error('Error logging in:', error.response?.data?.detail || error);
        } finally {
            setLoading(false); // Reset loading state
            setShowMessageModal(true);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        setMessage('');
        setTitle('');
        setIsError(false);
        if (password !== confirmPassword) {
            setTitle('Registration failed');
            setIsError(true);
            setMessage('Passwords do not match');
            setLoading(false); // Reset loading state
            //setShowMessageModal(true);
            return;
        }
        try {
            await registerUser(username, password);
            setTitle('Registration successful');
            setMessage('Logging you in...');
            await handleLogin(e);
        } catch (error) {
            setTitle('Registration failed');
            const errorMessage = error.response?.data?.username
                || error.response?.data?.password
                || error.response?.data?.detail
                || 'An error occurred during registration';
            setMessage(errorMessage);
            setIsError(true);
        } finally {
            setLoading(false); // Reset loading state
            setShowMessageModal(true);
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
                            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
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
                                    isInvalid={passwordErrors.length > 0}
                                    isValid={isPasswordValid}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul className="list-unstyled">
                                        {passwordErrors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPassword}
                                    isInvalid={confirmPassword.length > 0 && !isPasswordMatch}
                                    isValid={(confirmPassword.length > 0 && isPasswordMatch)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Passwords do not match
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100" disabled={loading || !isPasswordValid || !isPasswordMatch}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                            </Button>
                        </Form>
                        <p className="mt-3 text-center text-muted small">
                            Already have an account? <Button variant="link" size="sm" className="text-decoration-none m-0 p-0" onClick={() => setKey('signin')}>Sign In</Button>
                        </p>
                    </Tab>
                </Tabs>
            </div>
            <CustomModal
                show={showMessageModal}
                onHide={() => setShowMessageModal(false)}
                title={title}
                body={
                    <div className='text-center align-items-center justify-content-center d-flex'>
                        {loading ? (
                            <>
                                <div>
                                    <Spinner animation="border" size="lg" />
                                    <div className="mt-2">Please wait...</div>
                                </div>
                            </>
                        ) : isError ? (
                            <div>
                                <MdCancel size={48} color="red" />
                                <div className="text-danger">{message}</div>
                            </div>
                        ) : (
                            <div>
                                <MdCheckCircle size={48} color="green" />
                                <div className="text-success">{message}</div>
                            </div>
                        )}
                    </div>
                }
                autoClose={!isError}
                autoCloseTime={3000}
            />
        </Container>
    );
};

export default AuthForm;
