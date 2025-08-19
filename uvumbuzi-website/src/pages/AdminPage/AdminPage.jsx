// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy, where, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import AdminSidebar from './AdminPage/components/AdminSidebar';
import AdminContent from './AdminPage/components/AdminContent';
import OverviewTab from './AdminPage/tabs/OverviewTab';
import ProjectsTab from './AdminPage/tabs/ProjectsTab';
import EducationTab from './AdminPage/tabs/EducationTab';
import OfferingsTab from './AdminPage/tabs/OfferingsTab'; // Corrected import

const AdminPage = () => {
    const { userRole, loading, logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const [projects, setProjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [offerings, setOfferings] = useState([]);
    const [totalAccounts, setTotalAccounts] = useState(0);

    const [newProject, setNewProject] = useState({ title: '', status: 'Ongoing', image: '', description: '' });
    const [newCourse, setNewCourse] = useState({ title: '', category: '', description: '' });
    
    useEffect(() => {
        if (!loading && userRole !== 'admin') {
            navigate('/auth');
        }
    }, [loading, userRole, navigate]);

    useEffect(() => {
        if (userRole === 'admin') {
            const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
            const unsubscribeProjects = onSnapshot(projectsQuery, (snapshot) => {
                setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });

            const coursesQuery = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
            const unsubscribeCourses = onSnapshot(coursesQuery, (snapshot) => {
                setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });
            
            const offeringsQuery = query(collection(db, 'offerings'), where('status', '==', 'pending'));
            const unsubscribeOfferings = onSnapshot(offeringsQuery, (snapshot) => {
                setOfferings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });
            
            const fetchTotalAccounts = async () => {
                const querySnapshot = await getDocs(collection(db, "users"));
                setTotalAccounts(querySnapshot.size);
            };
            fetchTotalAccounts();

            return () => {
                unsubscribeProjects();
                unsubscribeCourses();
                unsubscribeOfferings();
            };
        }
    }, [userRole]);
    
    const handleAddProject = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'projects'), {
            ...newProject,
            createdAt: serverTimestamp()
        });
        setNewProject({ title: '', status: 'Ongoing', image: '', description: '' });
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'courses'), {
            ...newCourse,
            createdAt: serverTimestamp()
        });
        setNewCourse({ title: '', category: '', description: '' });
    };

    const handleApproveOffering = async (id) => {
        const offeringRef = doc(db, 'offerings', id);
        await updateDoc(offeringRef, { status: 'approved' });
    };

    const handleDeleteItem = async (collectionName, id) => {
        await deleteDoc(doc(db, collectionName, id));
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner"></div>
                <p>Verifying admin privileges...</p>
            </div>
        );
    }

    if (userRole !== 'admin') {
        return (
            <div className="admin-access-denied">
                <h2>Access Denied</h2>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <OverviewTab
                        offeringsCount={offerings.length}
                        projectsCount={projects.length}
                        coursesCount={courses.length}
                        accountsCount={totalAccounts}
                    />
                );
            case 'offerings':
                return (
                    <OfferingsTab 
                        offerings={offerings}
                        handleApproveOffering={handleApproveOffering}
                        handleDeleteItem={handleDeleteItem}
                    />
                );
            case 'projects':
                return (
                    <div className="admin-content">
                        <h3>Projects Management</h3>
                        <p>Add, edit, or delete projects to be displayed on the website.</p>
                        <form className="add-form" onSubmit={handleAddProject}>
                            <input type="text" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
                            <input type="text" placeholder="Image URL" value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })} required />
                            <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} required></textarea>
                            <select value={newProject.status} onChange={e => setNewProject({ ...newProject, status: e.target.value })}>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Upcoming">Upcoming</option>
                            </select>
                            <button type="submit" className="btn btn-primary add-new-btn"><i className="fas fa-plus"></i> Add New Project</button>
                        </form>
                        <ul className="management-list">
                            {projects.length > 0 ? (
                                projects.map(project => (
                                    <li key={project.id} className="management-item">
                                        <p>{project.title} <span className={`status-badge ${project.status.toLowerCase()}`}>{project.status}</span></p>
                                        <div className="item-actions">
                                            <button className="btn delete-btn" onClick={() => handleDeleteItem('projects', project.id)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="management-list-placeholder">No projects found.</li>
                            )}
                        </ul>
                    </div>
                );
            case 'education':
                return (
                    <div className="admin-content">
                        <h3>Education Management</h3>
                        <p>Manage courses and educational content for the Learning Hub.</p>
                        <form className="add-form" onSubmit={handleAddCourse}>
                            <input type="text" placeholder="Course Title" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} required />
                            <input type="text" placeholder="Category" value={newCourse.category} onChange={e => setNewCourse({ ...newCourse, category: e.target.value })} required />
                            <textarea placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} required></textarea>
                            <button type="submit" className="btn btn-primary add-new-btn"><i className="fas fa-plus"></i> Add New Course</button>
                        </form>
                        <ul className="management-list">
                            {courses.length > 0 ? (
                                courses.map(course => (
                                    <li key={course.id} className="management-item">
                                        <p>{course.title} - {course.category}</p>
                                        <div className="item-actions">
                                            <button className="btn delete-btn" onClick={() => handleDeleteItem('courses', course.id)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="management-list-placeholder">No courses found.</li>
                            )}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    const adminName = currentUser?.displayName || currentUser?.email.split('@')[0];

    return (
        <section className="admin-page">
            <div className={`admin-sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header-desktop">
                    <h3>Uvumbuzi Admin</h3>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}>
                                <i className="fas fa-tachometer-alt"></i> Overview
                            </button>
                        </li>
                        <li>
                            <button className={`nav-link ${activeTab === 'offerings' ? 'active' : ''}`} onClick={() => { setActiveTab('offerings'); setIsSidebarOpen(false); }}>
                                <i className="fas fa-briefcase"></i> Offerings
                            </button>
                        </li>
                        <li>
                            <button className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => { setActiveTab('projects'); setIsSidebarOpen(false); }}>
                                <i className="fas fa-project-diagram"></i> Projects
                            </button>
                        </li>
                        <li>
                            <button className={`nav-link ${activeTab === 'education' ? 'active' : ''}`} onClick={() => { setActiveTab('education'); setIsSidebarOpen(false); }}>
                                <i className="fas fa-graduation-cap"></i> Education
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={() => { handleLogout(); setIsSidebarOpen(false); }} className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </aside>
            <div className="admin-main-content">
                <header className="admin-content-header">
                    <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="topbar-info">
                        <h2>Admin Dashboard</h2>
                        <span className="admin-name">Welcome, {adminName}</span>
                    </div>
                </header>
                <div className="admin-content-body">
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};

export default AdminPage;