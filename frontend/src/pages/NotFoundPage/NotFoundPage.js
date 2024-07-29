// src/pages/NotFoundPage/NotFoundPage.js
import { MagnifyingGlass } from 'phosphor-react';
import { Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Change loading state after 1 second
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        // Redirect to home page after 3 seconds
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {loading ? (
                <div >
                    <Spinner animation="border" size="lg" />
                </div>
            ) : (
                <div>
                    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                        <MagnifyingGlass size={48} color='red' />
                        <h2>Page Not Found</h2>
                        <p>Sending you home...</p>
                    </div>

                </div>
            )}
        </div>


    );
};

export default NotFound;