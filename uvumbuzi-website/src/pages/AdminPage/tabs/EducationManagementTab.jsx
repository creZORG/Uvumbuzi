// src/pages/AdminPage/tabs/EducationManagementTab.jsx
import React, { useState, useEffect } from 'react';
import './EducationManagementTab.css';
import { db, storage } from '../../../firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Modal from '../../../components/Modal';

const EducationManagementTab = () => {
    const [courses, setCourses] = useState([]);
    const [formStep, setFormStep] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form data states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [resourceType, setResourceType] = useState('text');
    const [inputType, setInputType] = useState('file');
    const [content, setContent] = useState('');
    const [fileToUpload, setFileToUpload] = useState(null);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const coursesQuery = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
        const unsubscribeCourses = onSnapshot(coursesQuery, (snapshot) => {
            setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return unsubscribeCourses;
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFileToUpload(e.target.files[0]);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setUploading(true);
        let finalUrl = '';

        if (resourceType !== 'text') {
            if (inputType === 'file' && fileToUpload) {
                const storageRef = ref(storage, `courses/${fileToUpload.name}-${new Date().getTime()}`);
                try {
                    const snapshot = await uploadBytes(storageRef, fileToUpload);
                    finalUrl = await getDownloadURL(snapshot.ref);
                } catch (error) {
                    setUploading(false);
                    console.error("Error uploading file: ", error);
                    alert("Failed to upload file. Please check your storage rules and try again.");
                    return;
                }
            } else if (inputType === 'url' && url) {
                finalUrl = url;
            } else {
                setUploading(false);
                alert("Please provide a file or a URL.");
                return;
            }
        }

        try {
            await addDoc(collection(db, 'courses'), {
                title,
                description,
                category,
                resourceType,
                content: resourceType === 'text' ? content : '',
                url: finalUrl,
                views: 0,
                completions: 0,
                createdAt: serverTimestamp()
            });

            alert("Course added successfully.");
            setTitle('');
            setDescription('');
            setCategory('');
            setResourceType('text');
            setInputType('file');
            setContent('');
            setFileToUpload(null);
            setUrl('');
            setFormStep(1);
            setIsFormOpen(false);
        } catch (error) {
            console.error("Error adding course: ", error);
            alert("Failed to add course. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await deleteDoc(doc(db, 'courses', id));
                alert("Course deleted successfully.");
            } catch (error) {
                console.error("Error deleting course: ", error);
                alert("Failed to delete course. Please try again.");
            }
        }
    };

    const renderFormStep = () => {
        switch (formStep) {
            case 1:
                return (
                    <div className="form-step">
                        <h4>Step 1: Resource Details</h4>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <option value="">Select a Category</option>
                                <option value="Automation">Automation</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Resource Type</label>
                            <select value={resourceType} onChange={(e) => setResourceType(e.target.value)} required>
                                <option value="text">Text (Markdown)</option>
                                <option value="video">Video</option>
                                <option value="pdf">PDF</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => setFormStep(2)}>Next</button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <h4>Step 2: Content</h4>
                        {resourceType === 'text' ? (
                            <div className="form-group">
                                <label>Text Content (Markdown)</label>
                                <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                            </div>
                        ) : (
                            <>
                                <div className="form-group input-type-options">
                                    <label>Choose Input Method:</label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="inputType"
                                            value="file"
                                            checked={inputType === 'file'}
                                            onChange={() => setInputType('file')}
                                        /> File Upload
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="inputType"
                                            value="url"
                                            checked={inputType === 'url'}
                                            onChange={() => setInputType('url')}
                                        /> URL
                                    </label>
                                </div>
                                {inputType === 'file' ? (
                                    <div className="form-group">
                                        <label>{resourceType === 'video' ? 'Video File' : 'PDF File'}</label>
                                        <input type="file" onChange={handleFileChange} required />
                                        {uploading && <div className="loading-state">Uploading...</div>}
                                    </div>
                                ) : (
                                    <div className="form-group">
                                        <label>URL</label>
                                        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
                                    </div>
                                )}
                            </>
                        )}
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => setFormStep(1)}>Back</button>
                            <button type="submit" className="btn btn-primary" disabled={uploading}>
                                {uploading ? <div className="spinner-small"></div> : 'Add Course'}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="education-management-tab">
            <h3>Education Management</h3>
            <p>Manage courses and educational content for the Learning Hub.</p>
            <div className="tab-actions">
                <button className="btn btn-primary add-new-btn" onClick={() => { setIsFormOpen(true); setFormStep(1); }}>
                    <i className="fas fa-plus"></i> Add New Course
                </button>
            </div>
            
            <table className="course-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Views</th>
                        <th>Completions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.title}</td>
                                <td>{course.category}</td>
                                <td><span className="resource-type-badge">{course.resourceType}</span></td>
                                <td>{course.views}</td>
                                <td>{course.completions}</td>
                                <td className="action-buttons">
                                    <button className="btn delete-btn" onClick={() => handleDeleteCourse(course.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="management-list-placeholder">No courses found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Add New Course">
                <form onSubmit={handleAddCourse}>
                    {renderFormStep()}
                </form>
            </Modal>
        </div>
    );
};

export default EducationManagementTab;