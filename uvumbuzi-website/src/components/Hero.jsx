// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
    const statsRef = useRef(null);
    const [statsAnimated, setStatsAnimated] = useState(false);

    const animateValue = (id, start, end, duration) => {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateValue('stat1', 0, 15, 2000);
                    animateValue('stat2', 0, 5200, 2000);
                    animateValue('stat3', 0, 8, 2000);
                    animateValue('stat4', 0, 120, 2000);
                    setStatsAnimated(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, [statsAnimated]);

    return (
        <section id="hero" className="hero">
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
                    <a href="#get-involved" className="btn btn-primary">
                        <i className="fas fa-hands-helping"></i> Get Involved
                    </a>
                    <a href="#projects" className="btn btn-secondary">
                        <i className="fas fa-project-diagram"></i> Our Projects
                    </a>
                </div>
                <div ref={statsRef} className="stats-container">
                    <div className="stat-box">
                        <div id="stat1" className="stat-number">0</div>
                        <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-box">
                        <div id="stat2" className="stat-number">0</div>
                        <div className="stat-label">Lives Impacted</div>
                    </div>
                    <div className="stat-box">
                        <div id="stat3" className="stat-number">0</div>
                        <div className="stat-label">Communities Served</div>
                    </div>
                    <div className="stat-box">
                        <div id="stat4" className="stat-number">0</div>
                        <div className="stat-label">Trained Youth</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;