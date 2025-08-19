// src/pages/AboutPage.jsx
import React, { useState, useEffect } from 'react';
import './AboutPage.css';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const AboutPage = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Hardcoded static data for Mission and Vision
    const mission = "To empower communities through diversity of technologies and internet/intranet for socioeconomic growth in education,health,environment and entreprenuership";
    const vision = "Be a community hub offering a variety of local based tech solutions to stimulate growth through education and connecting the unconnected.";
    
    // Fetch team members from Firestore
    useEffect(() => {
        const teamQuery = query(collection(db, 'team'), orderBy('name', 'asc'));
        const unsubscribe = onSnapshot(teamQuery, (snapshot) => {
            const members = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTeamMembers(members);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching team members: ", error);
            setLoading(false);
        });
        
        return unsubscribe;
    }, []);

    return (
        <section id="about-page" className="about-page">
            <div className="container">
                <div className="about-header">
                    <h1 className="about-title">Our Story</h1>
                    <p className="about-subtitle">Empowering communities, one byte at a time.</p>
                </div>

                <div className="mission-vision-section">
                    <div className="card">
                        <h3>Our Mission</h3>
                        <p>{mission}</p>
                    </div>
                    <div className="card">
                        <h3>Our Vision</h3>
                        <p>{vision}</p>
                    </div>
                </div>

                <div className="team-section">
                    <h2 className="section-heading">Meet the Team</h2>
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading team members...</p>
                        </div>
                    ) : (
                        <div className="team-grid">
                            {teamMembers.length > 0 ? (
                                teamMembers.map(member => (
                                    <div key={member.id} className="team-member-card">
                                        <img src={member.photoUrl} alt={member.name} className="team-member-photo" />
                                        <h4>{member.name}</h4>
                                        <p className="team-member-role">{member.role}</p>
                                        <p className="team-member-bio">{member.bio}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="no-items-message">No team members found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AboutPage;