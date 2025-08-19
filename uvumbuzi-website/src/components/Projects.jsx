// src/components/Projects.jsx
import React from 'react';
import './Projects.css';

const Projects = () => {
    return (
        <section id="projects" className="projects-showcase">
            <div className="section-title">
                <h2>Featured Projects</h2>
            </div>
            <div className="showcase-grid">
                <div className="showcase-card">
                    <div className="showcase-image">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqI1IuTEGQvkH2A73mkFPPz7oJ2evtaJiJwQ&s" alt="Digital Literacy Program" />
                    </div>
                    <div className="showcase-content">
                        <h3>Digital Literacy Drive</h3>
                        <p>Training youth and adults in computer skills, coding, and online safety across 8 villages in Nakuru County.</p>
                        <a className="showcase-btn" href="/projects">View Project <i className="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div className="showcase-card">
                    <div className="showcase-image">
                        <img src="https://i.ibb.co/35PYmMPY/IMG-20250520-WA0081-2.jpg" alt="Kids learning coding" />
                    </div>
                    <div className="showcase-content">
                        <h3>Kids in Tech</h3>
                        <p>Introducing children to coding and digital creativity through fun, interactive workshops that build future-ready skills from an early age.</p>
                        <a className="showcase-btn" href="/projects">View Project <i className="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <div className="view-all">
                <a className="btn btn-secondary" href="/projects">
                    <i className="fas fa-project-diagram"></i> View All Projects
                </a>
            </div>
        </section>
    );
};

export default Projects;