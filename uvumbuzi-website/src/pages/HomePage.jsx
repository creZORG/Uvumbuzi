// src/pages/HomePage.jsx
import React from 'react';
import './HomePage.css'; // Importing the CSS file for this component

// HomePage component
const HomePage = () => {
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section id="hero" className="hero-section">
                <div className="hero-video-container">
                    <video autoPlay muted loop className="hero-video">
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-group-of-people-celebrating-close-up-3183-large.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="video-overlay"></div>
                </div>
                <div className="hero-content">
                    <h1 className="hero-title">Building Smart Villages For The Unconnected</h1>
                    <p className="hero-subtitle">
                        Uvumbuzi Community Network is bridging the digital divide in Nakuru County by providing access to technology, digital literacy training, and innovative solutions for sustainable development.
                    </p>
                    <div className="hero-buttons">
                        <a href="/get-involved" className="btn btn-primary">
                            Get Involved
                        </a>
                        <a href="/projects" className="btn btn-secondary">
                            Our Projects
                        </a>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section id="what-we-do" className="what-we-do-section">
                <div className="container">
                    <h2 className="section-title">What We Do</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-laptop-code"></i>
                            </div>
                            <h3>Digital Literacy</h3>
                            <p>We provide essential digital skills training to youth and adults to prepare them for the digital economy.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-wifi"></i>
                            </div>
                            <h3>Connectivity</h3>
                            <p>We install community Wi-Fi hotspots and improve internet access in underserved areas of Nakuru County.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-lightbulb"></i>
                            </div>
                            <h3>Innovation Hub</h3>
                            <p>We develop tech solutions for local challenges in agriculture, education, and healthcare.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-hands-helping"></i>
                            </div>
                            <h3>Community Empowerment</h3>
                            <p>We create sustainable opportunities through skills development, mentorship, and community engagement.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;