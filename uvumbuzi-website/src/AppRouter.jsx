// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import EducationPage from './pages/EducationPage';
import AutomationProjectCourse from './pages/AutomationProjectCourse';
import PaymentIntegrationCourse from './pages/PaymentIntegrationCourse';
import EthicalHackingCourse from './pages/EthicalHackingCourse';
import OpportunitiesPage from './pages/OpportunitiesPage';
import GalleryPage from './pages/GalleryPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import DonatePage from './pages/DonatePage'; // New import
import VolunteerPage from './pages/VolunteerPage'; // New import
import ContactPage from './pages/ContactPage'; // New import
import BlogPage from './pages/BlogPage'; // New import
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import ErrorBoundary from './components/ErrorBoundary';

const AppRouter = () => {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <Navbar />
                    <main>
                        <ErrorBoundary>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/auth" element={<AuthPage />} />
                                <Route path="/projects" element={<ProjectsPage />} />
                                <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
                                <Route path="/education" element={<EducationPage />} />
                                <Route path="/education/automation" element={<AutomationProjectCourse />} />
                                <Route path="/education/payment-integration" element={<PaymentIntegrationCourse />} />
                                <Route path="/education/ethical-hacking" element={<EthicalHackingCourse />} />
                                <Route path="/opportunities" element={<OpportunitiesPage />} />
                                <Route path="/gallery" element={<GalleryPage />} />
                                <Route path="/get-involved" element={<GetInvolvedPage />} />
                                <Route path="/donate" element={<DonatePage />} /> {/* New route */}
                                <Route path="/volunteer" element={<VolunteerPage />} /> {/* New route */}
                                <Route path="/contact" element={<ContactPage />} /> {/* New route */}
                                <Route path="/blog" element={<BlogPage />} /> {/* New route */}
                                <Route path="/admin" element={<AdminPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </ErrorBoundary>
                    </main>
                    <Footer />
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
};

export default AppRouter;