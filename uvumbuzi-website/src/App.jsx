// src/App.jsx
import React, { useState } from 'react';
import './index.css'; // Import the global styles
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
    // We'll manage a state for user login here, but won't use it until Firebase is integrated.
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    return (
        <div className="App">
            <Navbar isUserLoggedIn={isUserLoggedIn} />
            <main>
                <Hero />
                <About />
                <Projects />
                <Testimonials />
                <CTA />
            </main>
            <Footer isUserLoggedIn={isUserLoggedIn} />
        </div>
    );
}

export default App;