// src/pages/AdminPage/tabs/EducationTab.jsx
import React from 'react';
// Import Firestore and Storage functions

const EducationTab = () => {
    // Fetch and display courses from Firestore here

    return (
        <div className="admin-content">
            <h3>Education Management</h3>
            <p>Manage courses and educational content for the Learning Hub.</p>
            <button className="btn btn-primary add-new-btn"><i className="fas fa-plus"></i> Add New Course</button>
            <ul className="management-list">
                {/* Dynamically map and display courses here */}
                <li className="management-list-placeholder">No courses found.</li>
            </ul>
        </div>
    );
};

export default EducationTab;