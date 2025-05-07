import React from 'react';
import './Nav.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const navigateToBCOE = () => {
    navigate('/bcoe');
  };

  const navigateToCNAS = () => {
    navigate('/cnas');
  };

  return (
    <div className="nav-container">
      <h1>StudyZone Navigation</h1>
      {currentUser && (
        <div className="nav-content">
          <p className="welcome-message">Welcome, {currentUser.displayName}!</p>
          <p>Select a college to find study resources:</p>
          
          <div className="button-container">
            <button className="college-button bcoe-button" onClick={navigateToBCOE}>
              BCOE
            </button>
            <button className="college-button cnas-button" onClick={navigateToCNAS}>
              CNAS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav; 


