// src/pages/DonatePage.jsx
import React from 'react';
import './DonatePage.css';

const DonatePage = () => {
    return (
        <section className="donate-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Support Our Mission</h1>
                    <p className="page-subtitle">Your generous contribution helps us continue our work in empowering the community through technology.</p>
                </div>
                
                <div className="donate-options-grid">
                    <div className="donate-card">
                        <div className="card-icon"><i className="fab fa-paypal"></i></div>
                        <h3>Donate with PayPal</h3>
                        <p>A fast and secure way to donate using your PayPal account or a credit card.</p>
                        <a href="#" className="donate-btn-link">Donate with PayPal</a>
                    </div>
                    <div className="donate-card">
                        <div className="card-icon"><i className="fas fa-mobile-alt"></i></div>
                        <h3>M-Pesa Paybill</h3>
                        <p>For our local supporters, you can donate directly using our M-Pesa Paybill number.</p>
                        <div className="paybill-info">
                            <p><strong>Paybill No:</strong> 247247</p>
                            <p><strong>Account No:</strong> UvumbuziCN</p>
                        </div>
                    </div>
                    <div className="donate-card">
                        <div className="card-icon"><i className="fas fa-piggy-bank"></i></div>
                        <h3>M-Changa</h3>
                        <p>Easily donate to our specific campaigns and track our fundraising progress on M-Changa.</p>
                        <a href="#" className="donate-btn-link">Donate via M-Changa</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonatePage;