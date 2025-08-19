// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userLearningProgress, setUserLearningProgress] = useState({}); // New state
    const [loading, setLoading] = useState(true);

    const saveUserToFirestore = async (user) => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                role: 'user', // Default role for new signups
                createdAt: new Date()
            };
            await setDoc(userRef, userData);
            return { role: userData.role, progress: {} };
        } else {
            return { role: userSnap.data().role, progress: userSnap.data().learningProgress || {} };
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const { role, progress } = await saveUserToFirestore(result.user);
        setUserRole(role);
        setUserLearningProgress(progress);
        setCurrentUser(result.user);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { role, progress } = await saveUserToFirestore(user);
                setUserRole(role);
                setUserLearningProgress(progress);
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
                setUserRole(null);
                setUserLearningProgress({});
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = () => signOut(auth);

    const value = {
        currentUser,
        userRole,
        userLearningProgress,
        loading,
        logout,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);