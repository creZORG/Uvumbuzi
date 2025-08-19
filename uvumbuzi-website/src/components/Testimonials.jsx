// src/components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonialsData = [
    {
        text: "The digital skills I learned through Uvumbuzi helped me start an online business. I now earn three times what I made before and can work from home while caring for my children.",
        author: "Mary Wanjiku",
        role: "Digital Literacy Graduate",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmrbfd7xcsb994ZcBfKs7lb-lVB1i_vkYb6Q&s"
    },
    {
        text: "Before the Wi-Fi hotspots, my students had to walk 10km to access the internet for research. Now they can learn digital skills right in our village, and our school's performance has improved dramatically.",
        author: "James Mwangi",
        role: "School Principal",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDu3cGxC1JziVTPMHlLDIKqteChYsUgaKqvw&s"
    },
    {
        text: "The Innovation Hub gave me space, equipment, and mentorship to develop my agri-tech app. With their support, I've secured funding and created jobs for 5 other young people in our community.",
        author: "Sarah Atieno",
        role: "Youth Entrepreneur",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf8NhXXUWUTdRXCm2HrKl0D96DGMxUel8MiTgQA38pxQ&s"
    }
];

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonialsData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="testimonials">
            <div className="section-title">
                <h2>Community Voices</h2>
            </div>
            <div className="testimonial-slider">
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className={`testimonial ${index === currentSlide ? 'active' : ''}`}>
                        <div className="testimonial-text">
                            {testimonial.text}
                        </div>
                        <div className="testimonial-author">
                            <div className="author-avatar">
                                <img src={testimonial.avatar} alt={testimonial.author} />
                            </div>
                            <div className="author-info">
                                <h5>{testimonial.author}</h5>
                                <p>{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="testimonial-nav">
                    {testimonialsData.map((_, index) => (
                        <div
                            key={index}
                            className={`testimonial-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;