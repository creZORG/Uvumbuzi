// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy, where, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

const AdminPage = () => {
    const { userRole, loading, logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // States for data management
    const [projects, setProjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [offerings, setOfferings] = useState([]);
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [gallery, setGallery] = useState([]);
    const [team, setTeam] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]); // New state for blog posts
    const [messages, setMessages] = useState([]); // New state for contact messages

    // States for forms
    const [newProject, setNewProject] = useState({ title: '', status: 'Ongoing', image: '', description: '' });
    const [newCourse, setNewCourse] = useState({ title: '', category: '', description: '', resourceType: 'text', content: '', url: '' });
    const [newGalleryItem, setNewGalleryItem] = useState({ imageUrl: '', description: '' });
    const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', bio: '', photoUrl: '' });
    const [newBlogPost, setNewBlogPost] = useState({ title: '', image: '', excerpt: '', content: '' }); // New state for blog form

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
            
            const galleryQuery = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
            const unsubscribeGallery = onSnapshot(galleryQuery, (snapshot) => {
                setGallery(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });

            const teamQuery = query(collection(db, 'team'), orderBy('name', 'asc'));
            const unsubscribeTeam = onSnapshot(teamQuery, (snapshot) => {
                setTeam(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });

            const blogQuery = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
            const unsubscribeBlog = onSnapshot(blogQuery, (snapshot) => {
                setBlogPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });

            const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
                unsubscribeGallery();
                unsubscribeTeam();
                unsubscribeBlog();
                unsubscribeMessages();
            };
        }
    }, [userRole]);
    
    // Handle form submissions
    const handleAddProject = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'projects'), { ...newProject, createdAt: serverTimestamp() });
        setNewProject({ title: '', status: 'Ongoing', image: '', description: '' });
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'courses'), { ...newCourse, createdAt: serverTimestamp() });
        setNewCourse({ title: '', category: '', description: '', resourceType: 'text', content: '', url: '' });
    };

    const handleAddGalleryItem = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'gallery'), { ...newGalleryItem, createdAt: serverTimestamp() });
        setNewGalleryItem({ imageUrl: '', description: '' });
    };

    const handleAddTeamMember = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'team'), { ...newTeamMember, createdAt: serverTimestamp() });
        setNewTeamMember({ name: '', role: '', bio: '', photoUrl: '' });
    };
    
    const handleAddBlogPost = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'blog'), { ...newBlogPost, createdAt: serverTimestamp() });
        setNewBlogPost({ title: '', image: '', excerpt: '', content: '' });
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
                    <div className="admin-content">
                        <h3>Overview</h3>
                        <p>Welcome to the Uvumbuzi Admin Dashboard. Here you can manage all aspects of the website's dynamic content.</p>
                        <div className="overview-stats">
                            <div className="stat-card">
                                <h4>Offerings Pending</h4>
                                <p className="stat-number">{offerings.length}</p>
                            </div>
                            <div className="stat-card">
                                <h4>Total Projects</h4>
                                <p className="stat-number">{projects.length}</p>
                            </div>
                            <div className="stat-card">
                                <h4>Total Courses</h4>
                                <p className="stat-number">{courses.length}</p>
                            </div>
                            <div className="stat-card">
                                <h4>Total Accounts</h4>
                                <p className="stat-number">{totalAccounts}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'offerings':
                return (
                    <div className="admin-content">
                        <h3>Offerings Management</h3>
                        <p>Review and approve new service offerings from community members.</p>
                        <ul className="offerings-list">
                            {offerings.length > 0 ? (
                                offerings.map(offering => (
                                    <li key={offering.id} className="offering-item">
                                        <p>{offering.title} - Ksh {offering.wage} {offering.wageType}</p>
                                        <div className="offering-actions">
                                            <button className="btn approve-btn" onClick={() => handleApproveOffering(offering.id)}><i className="fas fa-check"></i> Approve</button>
                                            <button className="btn delete-btn" onClick={() => handleDeleteItem('offerings', offering.id)}><i className="fas fa-trash-alt"></i> Delete</button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="offerings-list-placeholder">No offerings pending approval.</li>
                            )}
                        </ul>
                    </div>
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
                            <select value={newCourse.category} onChange={e => setNewCourse({ ...newCourse, category: e.target.value })} required>
                                <option value="">Select a Category</option>
                                <option value="Automation">Automation</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Other">Other</option>
                            </select>
                            <select value={newCourse.resourceType} onChange={e => setNewCourse({ ...newCourse, resourceType: e.target.value })} required>
                                <option value="text">Text (Markdown)</option>
                                <option value="video">Video</option>
                                <option value="pdf">PDF</option>
                            </select>
                            <textarea placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} required></textarea>
                            {newCourse.resourceType === 'text' && (
                                <textarea placeholder="Text Content (Markdown)" value={newCourse.content} onChange={e => setNewCourse({ ...newCourse, content: e.target.value })} required></textarea>
                            )}
                            {(newCourse.resourceType === 'video' || newCourse.resourceType === 'pdf') && (
                                <div className="form-group input-type-options">
                                    <label>
                                        <input type="radio" name="inputMethod" value="file" checked={newCourse.inputMethod === 'file'} onChange={() => setNewCourse({ ...newCourse, inputMethod: 'file' })} /> File
                                    </label>
                                    <label>
                                        <input type="radio" name="inputMethod" value="url" checked={newCourse.inputMethod === 'url'} onChange={() => setNewCourse({ ...newCourse, inputMethod: 'url' })} /> URL
                                    </label>
                                </div>
                            )}
                            {newCourse.resourceType !== 'text' && newCourse.inputMethod === 'file' && (
                                <input type="file" onChange={e => setNewCourse({ ...newCourse, file: e.target.files[0] })} />
                            )}
                            {newCourse.resourceType !== 'text' && newCourse.inputMethod === 'url' && (
                                <input type="url" placeholder="URL" value={newCourse.url} onChange={e => setNewCourse({ ...newCourse, url: e.target.value })} required />
                            )}
                            <button type="submit" className="btn btn-primary add-new-btn"><i className="fas fa-plus"></i> Add New Course</button>
                        </form>
                        <ul className="management-list">
                            {courses.length > 0 ? (
                                courses.map(course => (
                                    <li key={course.id} className="management-item">
                                        <p>{course.title} - {course.category} <span className="status-badge" style={{ backgroundColor: '#2196f3' }}>{course.resourceType}</span></p>
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
            case 'gallery':
                return (
                    <div className="admin-content">
                        <h3>Gallery Management</h3>
                        <p>Upload new images and descriptions for the website's gallery.</p>
                        <form className="add-form" onSubmit={handleAddGalleryItem}>
                            <input type="url" placeholder="Image URL" value={newGalleryItem.imageUrl} onChange={e => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })} required />
                            <textarea placeholder="Description" value={newGalleryItem.description} onChange={e => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })} required></textarea>
                            <button type="submit" className="btn btn-primary add-new-btn"><i className="fas fa-plus"></i> Add Image</button>
                        </form>
                        <ul className="management-list">
                            {gallery.length > 0 ? (
                                gallery.map(item => (
                                    <li key={item.id} className="management-item">
                                        <p>{item.description}</p>
                                        <div className="item-actions">
                                            <button className="btn delete-btn" onClick={() => handleDeleteItem('gallery', item.id)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="management-list-placeholder">No gallery items found.</li>
                            )}
                        </ul>
                    </div>
                );
            case 'team':
                return (
                    <div className="admin-content">
                        <h3>Team Management</h3>
                        <p>Add, edit, or delete team members for the About Us page.</p>
                        <form className="add-form" onSubmit={handleAddTeamMember}>
                            <input type="text" placeholder="Name" value={newTeamMember.name} onChange={e => setNewTeamMember({ ...newTeamMember, name: e.target.value })} required />
                            <input type="text" placeholder="Role" value={newTeamMember.role} onChange={e => setNewTeamMember({ ...newTeamMember, role: e.target.value })} required />
                            <textarea placeholder="Bio" value={newTeamMember.bio} onChange={e => setNewTeamMember({ ...newTeamMember, bio: e.target.value })} required></textarea>
                            <input type="url" placeholder="Photo URL" value={newTeamMember.photoUrl} onChange={e => setNewTeamMember({ ...newTeamMember, photoUrl: e.target.value })} required />
                            <button type="submit" className="btn btn-primary add-new-btn"><i className="fas fa-plus"></i> Add Member</button>
                        </form>
                        <ul className="management-list">
                            {team.length > 0 ? (
                                team.map(member => (
                                    <li key={member.id} className="management-item">
                                        <p>{member.name} - {member.role}</p>
                                        <div className="item-actions">
                                            <button className="btn delete-btn" onClick={() => handleDeleteItem('team', member.id)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="management-list-placeholder">No team members found.</li>
                            )}
                        </ul>
                    </div>
                );
            case 'blog':
                return (
                    <div className="admin-content">
                        <h3>Blog Management</h3>
                        <p>Create and manage blog posts for your website.</p>
                        <form className="add-form" onSubmit={handleAddBlogPost}>
                            <input type="text" placeholder="Title" value={newBlogPost.title} onChange={e => setNewBlogPost({ ...newBlogPost, title: e.target.value })} required />
                            <input type="url" placeholder="Image URL" value={newBlogPost.image} onChange={e => setNewBlogPost({ ...newBlogPost, image: e.target.value })} required />
                            <textarea placeholder="Excerpt" value={newBlogPost.excerpt} onChange={e => setNewBlogPost({ ...newBlogPost, excerpt: e.target.value })} required></textarea>
                            <textarea placeholder="Content (Markdown)" value={newBlogPost.content} onChange={e => setNewBlogPost({ ...newBlogPost, content: e.target.value })} required></textarea>
                            <button type="submit" className="btn btn-primary add-new-btn"><i className="fas fa-plus"></i> Add Post</button>
                        </form>
                        <ul className="management-list">
                            {blogPosts.length > 0 ? (
                                blogPosts.map(post => (
                                    <li key={post.id} className="management-item">
                                        <p>{post.title}</p>
                                        <div className="item-actions">
                                            <button className="btn delete-btn" onClick={() => handleDeleteItem('blog', post.id)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="management-list-placeholder">No blog posts found.</li>
                            )}
                        </ul>
                    </div>
                );
            case 'messages':
                return (
                    <div className="admin-content">
                        <h3>Messages</h3>
                        <p>Messages submitted through the contact form.</p>
                        <ul className="management-list">
                            {messages.length > 0 ? (
                                messages.map(message => (
                                    <li key={message.id} className="management-item message-item">
                                        <p><strong>From:</strong> {message.name} ({message.email})</p>
                                        <p><strong>Subject:</strong> {message.subject}</p>
                                        <p>{message.message}</p>
                                        <div className="item-actions">
                                            <button className="btn delete-btn" onClick={() => handleDeleteItem('messages', message.id)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="management-list-placeholder">No messages found.</li>
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
                        <li>
                            <button className={`nav-link ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => { setActiveTab('gallery'); setIsSidebarOpen(false); }}>
                                <i className="fas fa-image"></i> Gallery
                            </button>
                        </li>
                        <li>
                            <button className={`nav-link ${activeTab === 'team' ? 'active' : ''}`} onClick={() => { setActiveTab('team'); setIsSidebarOpen(false); }}>
                                <i className="fas fa-users"></i> Team
                            </button>
                        </li>
                        <li>
                            <button className={`nav-link ${activeTab === 'blog' ? 'active' : ''}`} onClick={() => { setActiveTab('blog'); setIsSidebarOpen(false); }}>
                                <i className="fas fa-blog"></i> Blog
                            </button>
                        </li>
                        <li>
                            <button className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => { setActiveTab('messages'); setIsSidebarOpen(false); }}>
                                <i className="fas fa-envelope"></i> Messages
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