// src/pages/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import './BlogPage.css';

const BlogPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const blogQuery = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(blogQuery, (snapshot) => {
            const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBlogPosts(posts);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching blog posts: ", error);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <section className="blog-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Blog</h1>
                    <p className="page-subtitle">Stay up-to-date with our latest news and community stories.</p>
                </div>
                
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Fetching blog posts...</p>
                    </div>
                ) : (
                    <div className="blog-posts-grid">
                        {blogPosts.length > 0 ? (
                            blogPosts.map(post => (
                                <div key={post.id} className="blog-card">
                                    <img src={post.image} alt={post.title} className="blog-card-image" />
                                    <div className="blog-card-content">
                                        <h3>{post.title}</h3>
                                        <p className="blog-card-date">{new Date(post.createdAt.toDate()).toLocaleDateString()}</p>
                                        <p className="blog-card-excerpt">{post.excerpt}</p>
                                        <Link to={`/blog/${post.id}`} className="read-more-btn">Read More <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-posts-message">No blog posts found. Check back later!</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogPage;