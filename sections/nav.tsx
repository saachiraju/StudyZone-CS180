"use client";

import React from 'react';
import '@/styles/nav.css';
import { useAuth } from '@/dependencies/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation'
function Nav() {
  // const { currentUser } = useAuth();
  // const navigate = useNavigate();

  // const navigateToBCOE = () => {
  //   navigate('/bcoe');
  // };

  // const navigateToCNAS = () => {
  //   navigate('/cnas');
  // };
  const router = useRouter()

  return (
    <div className="nav-container">  
        <div className="nav-content">
          <p className="welcome-message">Welcome</p>
          <p>Select a college to find study resources:</p>
          
          <div className="button-container">
          <button className="college-button bcoe-button" onClick={() => router.push('/bcoe')}>
              BCOE
            </button>
            <button className="college-button cnas-button" onClick={() => router.push('/cnas')}>
              CNAS
            </button>
          </div>
        </div>
      
    </div>
  );
}

export default Nav; 

