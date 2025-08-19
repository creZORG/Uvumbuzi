// src/pages/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import './GalleryPage.css';

const GalleryPage = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const galleryQuery = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(galleryQuery, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGalleryItems(items);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching gallery items: ", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <section className="gallery-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Gallery</h1>
                    <p className="page-subtitle">A visual showcase of our community's work and moments.</p>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading gallery...</p>
                    </div>
                ) : (
                    <div className="gallery-grid">
                        {galleryItems.length > 0 ? (
                            galleryItems.map(item => (
                                <div key={item.id} className="gallery-item">
                                    <img src={item.imageUrl} alt={item.description} className="gallery-image" />
                                    <div className="gallery-overlay">
                                        <p className="gallery-description">{item.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-items-message">No gallery items found. Check back later!</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default GalleryPage;