'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '@/styles/Pages.css';
import PostBoard from '@/app/board/page';

function CNAS() {
  const [searchTerm, setSearchTerm] = useState('');

  const groupedClasses: Record<string, string[]> = {
    Biology: ['BIOL100', 'BIOL102', 'BIOL107', 'BIOL005A', 'BIOL005B', 'BIOL005C'],
    Chemistry: ['CHEM001', 'CHEM001A', 'CHEM001B', 'CHEM001C', 'CHEM112', 'CHEM112A', 'CHEM112B'],
    Mathematics: ['MATH009A', 'MATH009B', 'MATH009C', 'MATH010A', 'MATH010B', 'MATH046'],
    Physics: ['PHYS002A', 'PHYS002B', 'PHYS002C', 'PHYS040A', 'PHYS040B', 'PHYS040C'],
    Statistics: ['STAT155', 'STAT160', 'STAT170'],
    EnvironmentalSciences: ['ENSC001', 'ENSC100', 'ENSC130'],
    Biochemistry: ['BCH001', 'BCH110A', 'BCH110B'],
    Neuroscience: ['CBNS101', 'CBNS106', 'CBNS120'],
    Microbiology: ['MIC100', 'PLPA120'],
    EarthSciences: ['GEO001', 'GEO002', 'GEO100'],
    Entomology: ['ENT001', 'ENT100', 'ENT120'],
    Nematology: ['NEM100', 'NEM120', 'NEM130'],
    Botany: ['BPSC001', 'BPSC100', 'BPSC135'],
    
  };

  return (
    <div className="page-container">
      <div className="header-banner">
        <img
          src="/cnas-logo.png"
          alt="UC Riverside CNAS Logo"
          className="cnas-logo"
        />
        <h1 className="page-title">College of Natural & Agricultural Sciences</h1>
        <p className="page-subtitle">Your one-stop hub for CNAS study resources.</p>
      </div>

      <div className="page-content">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Search classes (e.g., CHEM001)"
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
    href="/cnas/ratings"
    className="class-card"
    style={{
      maxWidth: "fit-content",
      textAlign: "center"
    }}
  >
   ⭐ View All CNAS Class Ratings
  </Link>

  <Link
    href="/board"
    className="class-card"
    style={{
      maxWidth: 'fit-content',
      padding: '0.75rem 1.25rem',
      borderRadius: '8px',
      background: 'linear-gradient(to right, #4A90E2, #50E3C2)',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}
  >
    📚 Visit the Discussion Board
  </Link>
</div>


</div>



        {Object.entries(groupedClasses).map(([department, classes]) => {
          const filtered = classes.filter(course =>
            course.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filtered.length === 0) return null;

          return (
            <div key={department} className="mb-6">
              <h2 className="department-heading" style={{ fontWeight: "bold", margin: "20px 0 10px" }}>{department}</h2>
              <div className="class-grid">
                {filtered.map((course) => (
                  <Link
                    key={course}
                    href={`/classpages/cnas/${course}`}
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

export default CNAS;
