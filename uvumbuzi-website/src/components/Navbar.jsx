// src/components/Navbar.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import Modal from './Modal';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const { currentUser, userRole, logout, userLearningProgress } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileModalOpen(false);
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const navLinks = [
        { path: "/about", label: "About Us", icon: "fas fa-users" },
        { path: "/projects", label: "Our Projects", icon: "fas fa-project-diagram" },
        { path: "/opportunities", label: "Opportunities", icon: "fas fa-briefcase" },
        { path: "/education", label: "Education", icon: "fas fa-graduation-cap" },
        { path: "/gallery", label: "Gallery", icon: "fas fa-image" }, // New Gallery link
    ];

    if (userRole === 'admin') {
        navLinks.push({ path: "/admin", label: "Admin", icon: "fas fa-user-shield" });
    }

    const NavItems = ({ isMobile = false }) => (
        <>
            {navLinks.map((link, index) => (
                <li key={index}>
                    <Link 
                        to={link.path} 
                        className="nav-item" 
                        onClick={() => { if (isMobile) setIsMobileMenuOpen(false); }}
                    >
                        <i className={link.icon}></i>
                        {link.label}
                    </Link>
                </li>
            ))}
        </>
    );

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="logo">
                <img src="https://i.ibb.co/zTvCJstX/1747739483902.jpg" alt="Uvumbuzi Logo" />
                <span className="logo-text">Uvumbuzi <span>Network</span></span>
            </Link>
            
            <ul className="nav-links">
                <NavItems />
                {currentUser ? (
                    <li>
                        <button className="nav-icon-button" onClick={() => setIsProfileModalOpen(true)}>
                            <i className="fas fa-user-circle"></i>
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to="/auth" className="nav-button login-button">
                            <i className="fas fa-sign-in-alt"></i> Login
                        </Link>
                    </li>
                )}
                <li>
                    <button onClick={toggleTheme} className="theme-toggle-button">
                        <i className={theme === 'dark' ? "fas fa-sun" : "fas fa-moon"}></i>
                    </button>
                </li>
            </ul>

            <div className="mobile-actions">
                {currentUser ? (
                    <button className="nav-icon-button" onClick={() => setIsProfileModalOpen(true)}>
                        <i className="fas fa-user-circle"></i>
                    </button>
                ) : (
                    <Link to="/auth" className="nav-icon-button">
                        <i className="fas fa-sign-in-alt"></i>
                    </Link>
                )}
                <button onClick={toggleTheme} className="theme-toggle-button">
                    <i className={theme === 'dark' ? "fas fa-sun" : "fas fa-moon"}></i>
                </button>
                <button className="hamburger" onClick={() => setIsMobileMenuOpen(true)}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>

            <Modal isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} title="Menu">
                <ul className="mobile-nav-items">
                    <NavItems isMobile={true} />
                    {currentUser && (
                         <li>
                            <button className="nav-button logout-button" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </li>
                    )}
                </ul>
            </Modal>
            
            <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="User Profile">
                {currentUser ? (
                    <div className="user-profile-content">
                        <div className="profile-header">
                            <i className="fas fa-user-circle profile-icon"></i>
                            <div className="profile-info">
                                <h3>{currentUser.displayName || currentUser.email}</h3>
                                <p>Role: {userRole}</p>
                            </div>
                        </div>
                        <div className="profile-details">
                            <h4>Learning Progress</h4>
                            {userLearningProgress.lastViewedCourse ? (
                                <div>
                                    <p><strong>Last Viewed Course:</strong> <Link to={`/education/${userLearningProgress.lastViewedCourse}`} onClick={() => setIsProfileModalOpen(false)} className="course-link">{userLearningProgress.lastViewedTitle}</Link></p>
                                    <p><strong>Total Courses Started:</strong> {Object.keys(userLearningProgress.courses || {}).length}</p>
                                </div>
                            ) : (
                                <p>You have not started any courses yet.</p>
                            )}
                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <div className="not-logged-in-message">
                        <p>You are not logged in. Please log in to view your profile.</p>
                        <Link to="/auth" onClick={() => setIsProfileModalOpen(false)} className="btn btn-primary">Go to Login</Link>
                    </div>
                )}
            </Modal>
        </nav>
    );
};

export default Navbar;