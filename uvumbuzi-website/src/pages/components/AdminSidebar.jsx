// src/pages/AdminPage/components/AdminSidebar.jsx
import React from 'react';
import './AdminSidebar.css';
import { useAuth } from '../../../context/AuthContext';

const AdminSidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
    const { logout } = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <>
            <div className={`admin-sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Uvumbuzi Admin</h3>
                    <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                                <i className="fas fa-tachometer-alt"></i> Overview
                            </button>
                        </li>
                        <li>
                            <button className={`nav-link ${activeTab === 'offerings' ? 'active' : ''}`} onClick={() => setActiveTab('offerings')}>
                                <i className="fas fa-briefcase"></i> Offerings
                            </button>
                        </li>
                        <li>
                            <button className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
                                <i className="fas fa-project-diagram"></i> Projects
                            </button>
                        </li>
                        <li>
                            <button className={`nav-link ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
                                <i className="fas fa-graduation-cap"></i> Education
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;