// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import './ContactPage.css';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addDoc(collection(db, 'messages'), {
                name,
                email,
                subject,
                message,
                createdAt: serverTimestamp(),
            });
            alert("Your message has been sent successfully!");
            // Reset form fields
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error("Error sending message: ", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Contact Us</h1>
                    <p className="page-subtitle">We'd love to hear from you. Get in touch with our team for any inquiries or support.</p>
                </div>
                
                <div className="contact-grid">
                    <div className="contact-info">
                        <h3>Our Details</h3>
                        <div className="info-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Location</h4>
                                <p>Kivumbini Ward, Nakuru County, Kenya</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h4>Email</h4>
                                <p>info@uvumbuzi.org</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-phone"></i>
                            <div>
                                <h4>Phone</h4>
                                <p>+254 719 620 162</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-clock"></i>
                            <div>
                                <h4>Working Hours</h4>
                                <p>Mon-Fri: 8:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="contact-form-container">
                        <h3>Send Us a Message</h3>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? <div className="spinner-small"></div> : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;