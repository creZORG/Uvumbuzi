// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = ({ isUserLoggedIn }) => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="https://i.ibb.co/zTvCJstX/1747739483902.jpg" alt="Uvumbuzi Logo" />
                    <p>Empowering sub-urban communities through innovative ICT solutions and sustainable development initiatives in Nakuru County and beyond.</p>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/profile.php?id=61573783907060" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </div>
                </div>
                
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/projects">Our Projects</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/donate">Donate</a></li>
                        <li><a href="/volunteer">Volunteer</a></li>
                        <li><a href="/blog">Blog</a></li>
                    </ul>
                </div>
                
                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p><i className="fas fa-map-marker-alt"></i> Kivumbini Ward, Nakuru County, Kenya</p>
                    <p><i className="fas fa-envelope"></i> info@uvumbuzi.org</p>
                    <p><i className="fas fa-phone"></i> +254 719 620 162</p>
                    <p><i className="fas fa-clock"></i> Mon-Fri: 8:00 AM - 5:00 PM</p>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2025 Uvumbuzi Community Network. All rights reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
                <p className="credit">Created by Mark</p>
            </div>
        </footer>
    );
};

export default Footer;