import React from 'react';
import '../styles/Pages.css';
import { Link } from 'react-router-dom';

function BCOE() {
  return (
    <div className="page-container">
      <h1>Bourns College of Engineering</h1>
      <div className="page-content">
        <p>Welcome to the BCOE study resources page.</p>
        <p>Here you'll find resources for engineering students.</p>

        {/* Always-visible button to go to class ratings */}
        <Link to="/college/BCOE/ratings">
          <button style={{ marginTop: "1rem" }}>
            View All BCOE Class Ratings
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BCOE;
