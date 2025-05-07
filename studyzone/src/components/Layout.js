import React from 'react';
import UserProfile from './UserProfile';

function Layout({ children }) {
  return (
    <div className="layout">
      <UserProfile />
      {children}
    </div>
  );
}

export default Layout; 