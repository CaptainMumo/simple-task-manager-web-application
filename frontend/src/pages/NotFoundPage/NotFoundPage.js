// src/pages/NotFoundPage/NotFoundPage.js
import { MagnifyingGlass } from 'phosphor-react';
import { Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Redirect to home page after 2 seconds
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }, [navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {loading ? (
                <div >
                    <Spinner animation="border" size="lg" />
                </div>
            ) : (
                <div>
                    <MagnifyingGlass size={48} />
                    <h2>Page Not Found</h2>
                    <p>Redirecting to the homepage...</p>
                </div>
            )}
        </div>


    );
};

export default NotFound;