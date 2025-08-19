// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import './ProjectsPage.css';

// Static fallback data
const staticProjects = [
    { id: 'static-1', title: 'Digital Literacy Drive', description: 'Training youth and adults in computer skills, coding, and online safety across 8 villages in Nakuru County.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqI1IuTEGQvkH2A73mkFPPz7oJ2evtaJiJwQ&s', status: 'Ongoing' },
    { id: 'static-2', title: 'Kids in Tech', description: 'Introducing children to coding and digital creativity through fun, interactive workshops that build future-ready skills from an early age.', image: 'https://i.ibb.co/35PYmMPY/IMG-20250520-WA0081-2.jpg', status: 'Completed' },
];

const ProjectsPage = () => {
    const [dynamicProjects, setDynamicProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(projectsQuery, (snapshot) => {
            const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDynamicProjects(projects);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching projects: ", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const projectsToDisplay = dynamicProjects.length > 0 ? dynamicProjects : staticProjects;

    return (
        <section className="projects-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Our Projects</h1>
                    <p className="page-subtitle">A showcase of our work and impact in empowering the community.</p>
                </div>
                
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Fetching projects...</p>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projectsToDisplay.map(project => (
                            <div key={project.id} className={`project-card status-${project.status.toLowerCase()}`}>
                                <div className="project-image-container">
                                    <img src={project.image} alt={project.title} className="project-image" />
                                    <span className={`project-status`}>{project.status}</span>
                                </div>
                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="project-meta">
                                        <Link to={`/projects/${project.id}`} className="project-view-btn">View Project <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsPage;