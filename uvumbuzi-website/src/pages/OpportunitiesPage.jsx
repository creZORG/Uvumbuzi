// src/pages/OpportunitiesPage.jsx
import React, { useState, useEffect } from 'react';
import './OpportunitiesPage.css';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, where, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';

const OpportunitiesPage = () => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('view');
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [offeringToDelete, setOfferingToDelete] = useState(null);
    const [contactInfo, setContactInfo] = useState({});

    // Data states
    const [approvedOfferings, setApprovedOfferings] = useState([]);
    const [myOfferings, setMyOfferings] = useState(true);

    // Form Wizard State
    const [formStep, setFormStep] = useState(1);
    
    // Form data states
    const [serviceTitle, setServiceTitle] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [serviceWage, setServiceWage] = useState('');
    const [wageType, setWageType] = useState('per-day');
    const [serviceLocation, setServiceLocation] = useState('');
    const [serviceContact, setServiceContact] = useState('');

    // Fetch approved offerings for the public view
    useEffect(() => {
        const approvedQuery = query(
            collection(db, 'offerings'),
            where('status', '==', 'approved'),
            orderBy('createdAt', 'desc')
        );
        const unsubscribe = onSnapshot(approvedQuery, (snapshot) => {
            setApprovedOfferings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, []);

    // Fetch user's offerings for their private dashboard
    useEffect(() => {
        if (currentUser) {
            const myOfferingsQuery = query(
                collection(db, 'offerings'),
                where('userId', '==', currentUser.uid),
                orderBy('createdAt', 'desc')
            );
            const unsubscribe = onSnapshot(myOfferingsQuery, (snapshot) => {
                setMyOfferings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });
            return unsubscribe;
        }
    }, [currentUser]);

    const handlePostService = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'offerings'), {
                userId: currentUser.uid,
                userName: currentUser.displayName || currentUser.email,
                userPhotoUrl: currentUser.photoURL,
                title: serviceTitle,
                wage: serviceWage,
                wageType: wageType,
                location: serviceLocation,
                contact: serviceContact,
                description: serviceDescription,
                photoUrl: photoUrl,
                status: 'pending',
                createdAt: serverTimestamp()
            });

            alert("Your service has been submitted for admin approval.");

            setFormStep(1);
            setServiceTitle('');
            setServiceDescription('');
            setPhotoUrl('');
            setServiceWage('');
            setWageType('per-day');
            setServiceLocation('');
            setServiceContact('');
            setIsPostModalOpen(false);

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to submit your service. Please try again.");
        }
    };
    
    const handleDeleteOffering = async (id) => {
        try {
            const offeringRef = doc(db, 'offerings', id);
            await updateDoc(offeringRef, { status: 'deleted' });
            alert("Your offering has been deleted successfully.");
            setIsConfirmModalOpen(false);
            setOfferingToDelete(null);
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Failed to delete the offering. Please try again.");
        }
    };

    const confirmDelete = (offeringId) => {
        setOfferingToDelete(offeringId);
        setIsConfirmModalOpen(true);
    };

    const showContactModal = (offering) => {
        setContactInfo({ name: offering.userName, contact: offering.contact });
        setIsContactModalOpen(true);
    };

    const renderFormStep = () => {
        switch (formStep) {
            case 1:
                return (
                    <div className="form-step">
                        <p className="modal-description">Step 1 of 3: Provide a title and description for your service.</p>
                        <div className="form-group">
                            <label htmlFor="service-title">Service Title</label>
                            <input type="text" id="service-title" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="service-description">Qualifications & Description</label>
                            <textarea id="service-description" value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => setIsPostModalOpen(false)}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => setFormStep(2)}>Next</button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <p className="modal-description">Step 2 of 3: Set your wage and contact information.</p>
                        <div className="form-group">
                            <label htmlFor="service-wage">Wage</label>
                            <div className="wage-input-group">
                                <input type="text" id="service-wage" value={serviceWage} onChange={(e) => setServiceWage(e.target.value)} placeholder="e.g., 1500" required />
                                <select value={wageType} onChange={(e) => setWageType(e.target.value)}>
                                    <option value="per-hour">Per Hour</option>
                                    <option value="per-day">Per Day</option>
                                    <option value="per-week">Per Week</option>
                                    <option value="per-month">Per Month</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="service-location">Location</label>
                            <input type="text" id="service-location" value={serviceLocation} onChange={(e) => setServiceLocation(e.target.value)} placeholder="e.g., Nakuru CBD" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="service-contact">Contact Information</label>
                            <input type="text" id="service-contact" value={serviceContact} onChange={(e) => setServiceContact(e.target.value)} placeholder="e.g., +2547XXXXXXXX" required />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => setFormStep(1)}>Back</button>
                            <button type="button" className="btn btn-primary" onClick={() => setFormStep(3)}>Next</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="form-step">
                        <p className="modal-description">Step 3 of 3: Add a photo and finalize your submission.</p>
                        <div className="form-group">
                            <label htmlFor="service-photo">Photo URL (or File Upload Placeholder)</label>
                            <input type="text" id="service-photo" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Enter an image URL" required />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => setFormStep(2)}>Back</button>
                            <button type="submit" className="btn btn-primary">Submit for Review</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="opportunities-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Community Jobs</h1>
                    <p className="page-subtitle">Find or offer services within our network.</p>
                </div>
                
                {currentUser && (
                    <div className="opportunities-tabs">
                        <button 
                            className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('view')}
                        >
                            <i className="fas fa-search"></i> View Offerings
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('manage')}
                        >
                            <i className="fas fa-briefcase"></i> My Offerings
                        </button>
                    </div>
                )}
                
                {activeTab === 'view' && (
                    <div className="tab-content">
                        <div className="members-grid">
                            {approvedOfferings.length > 0 ? (
                                approvedOfferings.map(offering => (
                                    <div key={offering.id} className="member-card">
                                        <img src={offering.photoUrl || 'https://via.placeholder.com/150?text=Service'} alt={offering.title} className="member-photo" />
                                        <div className="member-info">
                                            <h3>{offering.title}</h3>
                                            <p className="job-title">{offering.userName}</p>
                                            <p className="wage">Ksh {offering.wage} {offering.wageType}</p>
                                            <p className="description-card">{offering.description}</p>
                                            <p className="location"><i className="fas fa-map-marker-alt"></i> {offering.location}</p>
                                            <button className="hire-button" onClick={() => showContactModal(offering)}>Show Contact</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-services-message">No approved offerings found.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'manage' && (
                    <div className="tab-content">
                        {currentUser ? (
                            <>
                                <div className="post-job-section">
                                    <button className="btn btn-primary" onClick={() => setIsPostModalOpen(true)}>
                                        <i className="fas fa-plus-circle"></i> Post Your Service
                                    </button>
                                </div>
                                <div className="my-offerings-section">
                                    <h3>My Offerings</h3>
                                    <ul className="offerings-list">
                                        {myOfferings.length > 0 ? (
                                            myOfferings.map(offering => (
                                                <li key={offering.id} className={`offering-item status-${offering.status}`}>
                                                    <div className="offering-info">
                                                        <h4>{offering.title}</h4>
                                                        <p>Wage: Ksh {offering.wage} {offering.wageType}</p>
                                                        <span className={`status-badge status-${offering.status}`}>{offering.status}</span>
                                                    </div>
                                                    <div className="offering-actions">
                                                        {offering.status !== 'deleted' && (
                                                            <button className="btn delete-btn" onClick={() => confirmDelete(offering.id)}>
                                                                <i className="fas fa-trash-alt"></i> Delete
                                                            </button>
                                                        )}
                                                        {offering.status === 'deleted' && (
                                                            <p className="deleted-status-text">Deleted</p>
                                                        )}
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="no-offerings-message">You have not posted any services yet.</li>
                                        )}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <div className="post-job-section">
                                <p>You must be logged in to manage your services.</p>
                                <Link to="/auth" className="btn btn-primary">Login to Manage</Link>
                            </div>
                        )}
                    </div>
                )}
                
                {/* Modal for posting a new service */}
                <Modal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} title="Post Your Service">
                    <form onSubmit={handlePostService}>
                        {renderFormStep()}
                    </form>
                </Modal>

                {/* Confirmation Modal for Deleting */}
                <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Deletion">
                    <div className="confirm-modal-content">
                        <p>Are you sure you want to delete this offering? It will be marked as deleted and no longer visible to others.</p>
                        <div className="confirm-modal-actions">
                            <button className="btn btn-secondary" onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary delete-confirm-btn" onClick={() => handleDeleteOffering(offeringToDelete)}>Confirm</button>
                        </div>
                    </div>
                </Modal>

                {/* Show Contact Information Modal */}
                <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Contact Information">
                    <div className="contact-info-content">
                        <p>Contact <strong>{contactInfo.name}</strong> for this service:</p>
                        <a href={`tel:${contactInfo.contact}`} className="contact-link">
                            <i className="fas fa-phone"></i> {contactInfo.contact}
                        </a>
                    </div>
                </Modal>
            </div>
        </section>
    );
};

export default OpportunitiesPage;