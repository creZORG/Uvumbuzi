// src/pages/EducationPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import './EducationPage.css';

// Static fallback data for preview
const staticCourses = [
    { id: 'automation', title: 'Automation', icon: 'fas fa-robot', description: 'A preview of our Automation course.', category: 'Automation', resourceType: 'Text' },
    { id: 'ethical-hacking', title: 'Ethical Hacking', icon: 'fas fa-shield-alt', description: 'A preview of our Cybersecurity course.', category: 'Cybersecurity', resourceType: 'Text' },
    { id: 'web-development', title: 'Web Development', icon: 'fas fa-code', description: 'A preview of our Web Dev course.', category: 'Web Development', resourceType: 'Text' },
    { id: 'payment-integration', title: 'Daraja API Integration', icon: 'fas fa-credit-card', description: 'A preview of our M-Pesa course.', category: 'Web Development', resourceType: 'Text' },
];

const EducationPage = () => {
    const [dynamicCourses, setDynamicCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ category: 'All', resourceType: 'All' });
    const [categories, setCategories] = useState(['All']);

    useEffect(() => {
        const coursesQuery = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(coursesQuery, (snapshot) => {
            const fetchedCourses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDynamicCourses(fetchedCourses);

            const uniqueCategories = [...new Set(fetchedCourses.map(course => course.category))];
            setCategories(['All', ...uniqueCategories]);

            setLoading(false);
        }, (error) => {
            console.error("Error fetching courses: ", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const coursesToDisplay = dynamicCourses.length > 0 ? dynamicCourses : staticCourses;
    
    const filteredCourses = coursesToDisplay.filter(course => {
        const categoryMatch = filters.category === 'All' || course.category === filters.category;
        const resourceTypeMatch = filters.resourceType === 'All' || course.resourceType === filters.resourceType;
        return categoryMatch && resourceTypeMatch;
    });

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    return (
        <section className="education-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Learning Hub</h1>
                    <p className="page-subtitle">Expand your skills with our curated courses in technology and innovation.</p>
                </div>
                
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Fetching available courses...</p>
                    </div>
                ) : (
                    <div className="education-main-content">
                        <div className="filter-bar">
                            <div className="filter-group">
                                <h4>Categories:</h4>
                                {categories.map(cat => (
                                    <button 
                                        key={cat} 
                                        className={`filter-btn ${filters.category === cat ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('category', cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="filter-group">
                                <h4>Resource Type:</h4>
                                {['All', 'Video', 'PDF', 'Text'].map(type => (
                                    <button 
                                        key={type} 
                                        className={`filter-btn ${filters.resourceType === type ? 'active' : ''}`}
                                        onClick={() => handleFilterChange('resourceType', type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="course-list-container">
                            <div className="courses-grid">
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map(course => (
                                        <Link to={`/education/${course.id}`} key={course.id} className="course-card">
                                            <div className="course-icon-container">
                                                <i className={course.icon}></i>
                                            </div>
                                            <div className="course-content">
                                                <h3>{course.title}</h3>
                                                <p>{course.description}</p>
                                                <div className="course-tags">
                                                    <span className="course-tag category">{course.category}</span>
                                                    <span className="course-tag resource">{course.resourceType}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="no-courses-message">No courses found matching your filters.</p>
                                )}
                            </div>
                            {dynamicCourses.length === 0 && (
                                <div className="static-message">
                                    <p>This is a preview of what's to come. More courses will be added by our admin team soon!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EducationPage;