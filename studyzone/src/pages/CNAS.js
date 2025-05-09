import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Pages.css';

function CNAS() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCollegeChange = (e) => {
    const selectedCollege = e.target.value;
    if (selectedCollege) {
      navigate(`/${selectedCollege.toLowerCase()}`);
    }
  };

  const groupedClasses = {
    Biology: ["BIOL100", "BIOL102", "BIOL107", "BIOL005A", "BIOL005B", "BIOL005C"],
    Chemistry: ["CHEM001", "CHEM001A", "CHEM001B", "CHEM001C", "CHEM112", "CHEM112A", "CHEM112B"],
    Mathematics: ["MATH009A", "MATH009B", "MATH009C", "MATH010A", "MATH010B", "MATH046"],
    Physics: ["PHYS002A", "PHYS002B", "PHYS002C", "PHYS040A", "PHYS040B", "PHYS040C"],
    Statistics: ["STAT155", "STAT160", "STAT170"],
    EnvironmentalSciences: ["ENSC001", "ENSC100", "ENSC130"],
    Biochemistry: ["BCH001", "BCH110A", "BCH110B"],
    Neuroscience: ["CBNS101", "CBNS106", "CBNS120"],
    Microbiology: ["MIC100", "PLPA120"],
    EarthSciences: ["GEO001", "GEO002", "GEO100"],
    Entomology: ["ENT001", "ENT100", "ENT120"],
    Nematology: ["NEM100", "NEM120", "NEM130"],
    Botany: ["BPSC001", "BPSC100", "BPSC135"]
  };

  return (
    <div className="page-container">
      <div className="college-selector">
        <select onChange={handleCollegeChange} value="CNAS" className="college-dropdown">
          <option value="" disabled>Select College</option>
          <option value="BCOE">Bourns College of Engineering</option>
          <option value="CNAS">College of Natural & Agricultural Sciences</option>
        </select>
      </div>

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
        {/* Search and Button Section (Stacked Layout) */}
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

          <Link
            to="/college/CNAS/ratings"
            className="class-card"
            style={{ maxWidth: "fit-content" }}
          >
            View All CNAS Class Ratings
          </Link>
        </div>

        {Object.entries(groupedClasses).map(([department, classes]) => {
          const filtered = classes.filter(course =>
            course.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filtered.length === 0) return null;

          return (
            <div key={department} className="mb-6">
              <h2 style={{ fontWeight: "bold", margin: "20px 0 10px" }}>{department}</h2>
              <div className="class-grid">
                {filtered.map((course) => (
                  <Link to={`/classpages/cnas/${course}`} key={course} className="class-card">
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

