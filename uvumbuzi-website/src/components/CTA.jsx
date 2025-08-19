// src/components/CTA.jsx
import React from 'react';
import './CTA.css';

const CTA = () => {
    return (
        <section className="cta-section" id="get-involved">
            <div className="cta-container">
                <h2>Join Our Movement</h2>
                <p>Whether through volunteering, donating, or partnering, your support helps us bridge the digital divide and create opportunities in sub-urban communities.</p>
                <div className="cta-buttons">
                    <a href="#" className="btn btn-primary">
                        <i className="fas fa-hand-holding-heart"></i> Donate Now
                    </a>
                    <a href="/contact" className="btn btn-secondary">
                        <i className="fas fa-envelope"></i> Contact Us
                    </a>
                    <a href="/volunteer" className="btn btn-secondary">
                        <i className="fas fa-user-plus"></i> Volunteer
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;