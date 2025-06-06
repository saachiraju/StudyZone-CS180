'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '@/styles/Pages.css';

function BCOE() {
  const [searchTerm, setSearchTerm] = useState('');

  const groupedClasses: Record<string, string[]> = {
    'Computer Science': [
      'CS010A', 'CS010B', 'CS010C', 'CS030', 'CS061', 'CS100',
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
    'Bioengineering': ['BIME050', 'BIME110', 'BIME116', 'BIME120'],
    'General Engineering': ['ENGR001', 'ENGR154'],
    
  };

  return (
    <div className="page-container">
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

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>

            <Link
              href="/bcoe/ratings"
              className="class-card"
              style={{ maxWidth: "fit-content" ,  textAlign: "center"}}
            >
             ⭐ View All BCOE Class Ratings
            </Link>

          <Link
            href="/board"
            className="class-card"
            style={{
              backgroundColor: "#0047ab",
              color: "white",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              fontWeight: "600",
              display: "inline-block",
              textDecoration: "none",
              marginBottom: "1rem"
            }}
          >
            📚 Visit the Discussion Board
          </Link>
          </div>
        </div>

        {Object.entries(groupedClasses).map(([department, classes]) => {
          const filtered = classes.filter((course) =>
            course.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filtered.length === 0) return null;

          return (
            <div key={department} className="mb-6">
              <h2 className="department-heading" style={{ fontWeight: 'bold', margin: '20px 0 10px' }}>
                {department}
              </h2>

              <div className="class-grid">
                {filtered.map((course) => (
                  <Link
                    key={course}
                    href={`/classpages/bcoe/${course}`}
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