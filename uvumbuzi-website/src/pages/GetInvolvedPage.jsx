// src/pages/GetInvolvedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './GetInvolvedPage.css';

const GetInvolvedPage = () => {
    return (
        <section className="get-involved-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Get Involved</h1>
                    <p className="page-subtitle">Your support helps us build a brighter future for the community.</p>
                </div>

                <div className="involved-grid">
                    <div className="involved-card">
                        <div className="card-icon">
                            <i className="fas fa-hand-holding-heart"></i>
                        </div>
                        <h3>Donate</h3>
                        <p>Your financial contribution directly supports our projects, from digital literacy programs to installing community Wi-Fi hotspots.</p>
                        <Link to="/donate" className="involved-btn">Donate Now</Link>
                    </div>
                    
                    <div className="involved-card">
                        <div className="card-icon">
                            <i className="fas fa-users-cog"></i>
                        </div>
                        <h3>Volunteer</h3>
                        <p>Contribute your skills and time to make a tangible impact. We need volunteers for teaching, mentorship, and on-the-ground support.</p>
                        <Link to="/volunteer" className="involved-btn">Become a Volunteer</Link>
                    </div>
                    
                    <div className="involved-card">
                        <div className="card-icon">
                            <i className="fas fa-handshake"></i>
                        </div>
                        <h3>Partner</h3>
                        <p>Join forces with us! We partner with organizations and businesses that share our vision for a connected and empowered community.</p>
                        <Link to="/contact" className="involved-btn">Partner With Us</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetInvolvedPage;