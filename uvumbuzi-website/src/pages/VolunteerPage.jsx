// src/pages/VolunteerPage.jsx
import React from 'react';
import './VolunteerPage.css';

const VolunteerPage = () => {
    return (
        <section className="volunteer-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Become a Volunteer</h1>
                    <p className="page-subtitle">Your skills can make a difference. Join us in empowering our community!</p>
                </div>

                <div className="volunteer-content">
                    <div className="volunteer-form-container">
                        <h3>Tell Us About Yourself</h3>
                        <p>Fill out the form below, and we'll get in touch with you about how you can help.</p>
                        <form className="volunteer-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="skills">What skills can you offer?</label>
                                <textarea id="skills" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit Application</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VolunteerPage;