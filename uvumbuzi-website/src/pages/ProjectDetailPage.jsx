// src/pages/ProjectDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const docRef = doc(db, 'projects', projectId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProject({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setProject(null);
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                setProject(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <div className="project-detail-page loading-state">
                <div className="spinner"></div>
                <p>Loading project details...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-detail-page not-found">
                <h2>Project Not Found</h2>
                <p>The project you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <section className="project-detail-page">
            <div className="container">
                <div className="project-detail-header">
                    <h1 className="project-detail-title">{project.title}</h1>
                    <span className={`project-status status-${project.status.toLowerCase()}`}>{project.status}</span>
                </div>
                <div className="project-detail-image-container">
                    <img src={project.image} alt={project.title} className="project-detail-image" />
                </div>
                <div className="project-detail-content">
                    <p className="project-detail-description">{project.description}</p>
                    {/* Add more details here if needed */}
                </div>
            </div>
        </section>
    );
};

export default ProjectDetailPage;