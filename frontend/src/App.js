// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TaskDetailPage from './pages/TaskDetailPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <div className='d-flex flex-column min-vh-100'>
                <Navigation />
                <div className='flex-grow-1'>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/task/:id" element={<TaskDetailPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>

    );
}

export default App;
