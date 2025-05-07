import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css';

function UserProfile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!currentUser) return null;

  // Get the first letter of the user's name for the avatar
  const userInitial = currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : '?';

  return (
    <div className="user-profile" ref={dropdownRef}>
      <div className="avatar" onClick={toggleDropdown}>
        {userInitial}
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="user-info">
            <p className="user-name">{currentUser.displayName}</p>
            <p className="user-email">{currentUser.email}</p>
          </div>
          <div className="dropdown-divider"></div>
          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile; 