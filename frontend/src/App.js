// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TaskDetailPage from './pages/TaskDetailPage';
import AuthPage from './pages/AuthPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <ModalProvider>
            <Router>
                <div className='d-flex flex-column min-vh-100'>
                    <Navigation />
                    <div className='flex-grow-1'>
                        <Routes>
                            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                            <Route path="/login" element={<AuthPage />} />
                            <Route path="/tasks/:id" element={<PrivateRoute><TaskDetailPage /></PrivateRoute>} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ModalProvider>
    );
}

export default App;
