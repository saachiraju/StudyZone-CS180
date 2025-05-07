import React from 'react';
import './Nav.css';
import { useAuth } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="nav-container">
      <h1>StudyZone Navigation</h1>
      {currentUser && (
        <div>
          <p>Welcome, {currentUser.displayName}!</p>
          <p>You are now logged in.</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default Nav; 


