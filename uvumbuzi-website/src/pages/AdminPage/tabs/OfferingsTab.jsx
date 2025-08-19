// src/pages/AdminPage/tabs/OfferingsTab.jsx
import React, { useState, useEffect } from 'react';
import './OfferingsTab.css';
import { db } from '../../../firebase';
import { collection, query, onSnapshot, orderBy, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const OfferingsTab = () => {
    const [offerings, setOfferings] = useState([]);

    useEffect(() => {
        const offeringsQuery = query(collection(db, 'offerings'), orderBy('createdAt', 'desc'));
        const unsubscribeOfferings = onSnapshot(offeringsQuery, (snapshot) => {
            setOfferings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubscribeOfferings();
        };
    }, []);

    const handleApproveOffering = async (id) => {
        const offeringRef = doc(db, 'offerings', id);
        await updateDoc(offeringRef, { status: 'approved' });
    };

    const handleDenyOffering = async (id) => {
        const offeringRef = doc(db, 'offerings', id);
        await updateDoc(offeringRef, { status: 'denied' });
    };

    const handleDeleteOffering = async (id) => {
        await deleteDoc(doc(db, 'offerings', id));
    };

    return (
        <div className="offerings-tab">
            <h3>Offerings Management</h3>
            <p>Review, approve, or deny new service offerings from community members.</p>
            <ul className="offerings-list">
                {offerings.length > 0 ? (
                    offerings.map(offering => (
                        <li key={offering.id} className={`offering-item status-${offering.status}`}>
                            <p>{offering.title} - Ksh {offering.wage} {offering.wageType}</p>
                            <span className={`status-badge ${offering.status}`}>{offering.status}</span>
                            <div className="offering-actions">
                                {offering.status === 'pending' && (
                                    <>
                                        <button className="btn approve-btn" onClick={() => handleApproveOffering(offering.id)}><i className="fas fa-check"></i> Approve</button>
                                        <button className="btn deny-btn" onClick={() => handleDenyOffering(offering.id)}><i className="fas fa-times"></i> Deny</button>
                                    </>
                                )}
                                <button className="btn delete-btn" onClick={() => handleDeleteOffering(offering.id)}><i className="fas fa-trash-alt"></i> Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="offerings-list-placeholder">No offerings found.</li>
                )}
            </ul>
        </div>
    );
};

export default OfferingsTab;