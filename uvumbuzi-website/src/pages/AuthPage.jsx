// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser, signInWithGoogle } = useAuth();

    const saveUserToFirestore = async (user) => {
        const userRef = doc(db, 'users', user.uid);
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            role: 'user', // Default role for new signups
            createdAt: new Date()
        };
        await setDoc(userRef, userData, { merge: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await saveUserToFirestore(userCredential.user);
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (currentUser) {
        return (
            <div className="auth-container logged-in">
                <div className="auth-card">
                    <h2>You are already logged in!</h2>
                    <p>Welcome, {currentUser.displayName || currentUser.email}. You can go back to the homepage or log out to sign in as a different user.</p>
                    <div className="auth-actions">
                        <Link to="/" className="btn btn-secondary">Go to Home</Link>
                        <button className="btn btn-primary" onClick={() => auth.signOut()}>Log Out</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <button 
                    onClick={handleGoogleSignIn} 
                    className="google-btn"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="spinner-small"></div>
                    ) : (
                        <>
                            <i className="fab fa-google"></i> Login with Google
                        </>
                    )}
                </button>
                <div className="or-divider">
                    <span>OR</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn btn-primary form-submit-btn" disabled={isLoading}>
                        {isLoading ? <div className="spinner-small"></div> : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>
                <p className="toggle-auth">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign up' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;