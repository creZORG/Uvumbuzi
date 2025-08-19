// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <h1>404</h1>
                <p>Oops! The page you are looking for could not be found.</p>
                <Link to="/" className="btn btn-primary">Go to Homepage</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;