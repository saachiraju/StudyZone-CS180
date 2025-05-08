import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Pages.css';

function BCOE() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleCollegeChange = (e) => {
    const selectedCollege = e.target.value;
    if (selectedCollege) {
      navigate(`/${selectedCollege.toLowerCase()}`);
    }
  };

  const groupedClasses = {
    'Computer Science': [
      'CS010A', 'CS010B', 'CS030', 'CS061', 'CS100',
      'CS141', 'CS153', 'CS161', 'CS166', 'CS171', 'CS180'
    ],
    'Electrical Engineering': [
      'EE100A', 'EE100B', 'EE110A', 'EE110B', 'EE120A', 'EE120B',
      'EE132', 'EE141', 'EE144', 'EE175A'
    ],
    'Mechanical Engineering': [
      'ME010', 'ME018', 'ME104', 'ME114', 'ME118', 'ME132'
    ],
    'Chemical & Environmental Engineering': [
      'CHE100', 'CHE110A', 'CHE110B', 'CHE120A', 'CHE120B',
      'ENVE100', 'ENVE110', 'ENVE130'
    ],
    Bioengineering: ['BIME050', 'BIME110', 'BIME116', 'BIME120'],
    'General Engineering': ['ENGR001', 'ENGR154']
  };

  return (
    <div className="page-container">
      <div className="college-selector">
        <select onChange={handleCollegeChange} value="BCOE" className="college-dropdown">
          <option value="" disabled>Select College</option>
          <option value="BCOE">Bourns College of Engineering</option>
          <option value="CNAS">College of Natural & Agricultural Sciences</option>
        </select>
      </div>
      
      <div className="header-banner">
        <img
          src="/bcoe-logo.png"
          alt="UC Riverside BCOE Logo"
          className="cnas-logo"
        />
        <h1 className="page-title">Bourns College of Engineering</h1>
        <p className="page-subtitle">
          Your one‑stop hub for BCOE study resources.
        </p>
      </div>
  
      <div className="page-content">
        <p>Welcome to the BCOE study resources page.</p>
        <p>Here you'll find resources for engineering students.</p>

        {/* Search and Button Section (Stacked Layout) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Search classes (e.g., CS153)"
            className="class-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              maxWidth: "400px"
            }}
          />

          <Link
            to="/college/BCOE/ratings"
            className="class-card"
            style={{ maxWidth: "fit-content" }}
          >
            View All BCOE Class Ratings
          </Link>
        </div>

        {Object.entries(groupedClasses).map(([department, classes]) => {
          const filtered = classes.filter((course) =>
            course.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filtered.length === 0) return null;

          return (
            <div key={department} className="mb-6">
              <h2 style={{ fontWeight: 'bold', margin: '20px 0 10px' }}>
                {department}
              </h2>

              <div className="class-grid">
                {filtered.map((course) => (
                  <Link
                    key={course}
                    to={`/classpages/bcoe/${course}`}
                    className="class-card"
                  >
                    {course}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BCOE;
