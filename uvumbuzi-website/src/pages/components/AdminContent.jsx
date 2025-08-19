// src/pages/AdminPage/components/AdminContent.jsx
import React from 'react';
import './AdminContent.css';

const AdminContent = ({ children, setIsSidebarOpen }) => {
    return (
        <div className="admin-main-content">
            <header className="admin-content-header">
                <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
                    <i className="fas fa-bars"></i>
                </button>
                <h2>Dashboard</h2>
            </header>
            <div className="admin-content-body">
                {children}
            </div>
        </div>
    );
};

export default AdminContent;