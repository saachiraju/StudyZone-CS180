import React from 'react';
import './Homepage.css';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuth } from './AuthContext';

function Homepage() {
  const { currentUser } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="homepage-container">
      <h1>Welcome to StudyZone</h1>
      {currentUser ? (
        <div>
          <p>Hello, {currentUser.displayName}</p>
          <button className="login-button" onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button className="login-button" onClick={handleGoogleSignIn}>Log In with Google</button>
      )}
    </div>
  );
}

export default Homepage; 