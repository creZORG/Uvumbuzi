// src/pages/AdminPage/tabs/OverviewTab.jsx
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import './OverviewTab.css'; // New CSS for this tab

const OverviewTab = ({ offeringsCount, projectsCount, coursesCount, accountsCount }) => {
    const { currentUser } = useAuth();
    const userEmail = currentUser?.email || 'Admin';

    return (
        <div className="admin-content">
            <h3>Overview</h3>
            <p>Welcome, {userEmail}! Here's a quick look at your website's key metrics.</p>
            <div className="overview-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-container">
                        <i className="fas fa-briefcase"></i>
                    </div>
                    <div>
                        <h4>Offerings Pending</h4>
                        <p className="stat-number">{offeringsCount}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-container">
                        <i className="fas fa-project-diagram"></i>
                    </div>
                    <div>
                        <h4>Total Projects</h4>
                        <p className="stat-number">{projectsCount}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-container">
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div>
                        <h4>Total Courses</h4>
                        <p className="stat-number">{coursesCount}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-container">
                        <i className="fas fa-users"></i>
                    </div>
                    <div>
                        <h4>Total Accounts</h4>
                        <p className="stat-number">{accountsCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;