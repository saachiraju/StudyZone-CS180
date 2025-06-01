'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/dependencies/firebase';
import { useAuth } from '@/dependencies/AuthContext';

export const UserAvatar = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      // Redirect to homepage after successful logout
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!currentUser) {
    return null;
  }

  // Get first letter of email
  const firstLetter = currentUser.email?.charAt(0).toUpperCase() || 'U';
  const displayName = currentUser.displayName || currentUser.email || 'User';

  return (
    <div className="user-avatar-container" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="user-avatar-button"
        aria-label="User menu"
      >
        <span className="user-avatar-letter">{firstLetter}</span>
      </button>

      {isOpen && (
        <div className="user-avatar-dropdown">
          <div className="user-avatar-info">
            <div className="user-avatar-large">
              <span className="user-avatar-letter-large">{firstLetter}</span>
            </div>
            <div className="user-info">
              <p className="user-name">{displayName}</p>
              <p className="user-email">{currentUser.email}</p>
            </div>
          </div>
          <div className="user-avatar-divider"></div>
          <button
            onClick={handleLogout}
            className="user-avatar-logout"
          >
            Sign out
          </button>
        </div>
      )}

      <style jsx>{`
        .user-avatar-container {
          position: relative;
          display: inline-block;
        }

        .user-avatar-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #87ceeb;
          background-color: #87ceeb;
          color: white;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(135, 206, 235, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar-button:hover {
          background-color: #6bb6ff;
          border-color: #6bb6ff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(135, 206, 235, 0.4);
        }

        .user-avatar-letter {
          font-size: 16px;
          font-weight: 600;
        }

        .user-avatar-dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          width: 280px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          overflow: hidden;
        }

        .user-avatar-info {
          padding: 20px;
          text-align: center;
        }

        .user-avatar-large {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #87ceeb;
          color: white;
          font-size: 24px;
          font-weight: 600;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          margin: 0 auto 15px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #f0f9ff;
          box-shadow: 0 4px 12px rgba(135, 206, 235, 0.2);
        }

        .user-avatar-letter-large {
          font-size: 24px;
          font-weight: 600;
        }

        .user-info {
          margin-top: 10px;
        }

        .user-name {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 5px 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .user-email {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          word-break: break-word;
        }

        .user-avatar-divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 0;
        }

        .user-avatar-logout {
          width: 100%;
          padding: 15px 20px;
          border: none;
          background-color: white;
          color: #374151;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 0;
          text-align: center;
        }

        .user-avatar-logout:hover {
          background-color: #f9fafb;
          color: #1f2937;
        }
      `}</style>
    </div>
  );
}; 