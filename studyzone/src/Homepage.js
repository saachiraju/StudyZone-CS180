import React, { useEffect } from 'react';
import './Homepage.css';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Nav page if user is already logged in
    if (currentUser) {
      navigate('/nav');
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Navigation happens automatically in the useEffect hook after auth state changes
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="homepage-container">
      <h1>Welcome to StudyZone</h1>
      <button className="login-button" onClick={handleGoogleSignIn}>
        Log In with Google
      </button>
    </div>
  );
}

export default Homepage; 