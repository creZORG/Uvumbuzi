// src/components/About.jsx
import React from 'react';
import './About.css';

const About = () => {
    // You would fetch Mission, Vision, and Team data from a database (Firebase) here.
    const mission = "To empower communities through diversity of technologies and internet/intranet for socioeconomic growth in education,health,environment and entreprenuership";
    const vision = "Be a community hub offering a variety of local based tech solutions to stimulate growth through education and connecting the unconnected.";
    const teamMembers = [
        {
            name: "Oscar Wanjala",
            role: "Founder & Director",
            bio: "A passionate advocate for digital literacy and community empowerment, Oscar founded Uvumbuzi to bridge the technology gap in Nakuru County.",
            photo: "https://via.placeholder.com/150?text=Oscar" // Replace with a real image URL
        },
        {
            name: "Jane Mwangi",
            role: "Programs Manager",
            bio: "With a background in community development, Jane oversees all our projects, ensuring they meet the needs of the communities we serve.",
            photo: "https://via.placeholder.com/150?text=Jane" // Replace with a real image URL
        },
    ];

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
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-member-card">
                                <img src={member.photo} alt={member.name} className="team-member-photo" />
                                <h4>{member.name}</h4>
                                <p className="team-member-role">{member.role}</p>
                                <p className="team-member-bio">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;