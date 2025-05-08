import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

function CNAS() {
  const [searchTerm, setSearchTerm] = useState("");

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
        <input
          type="text"
          placeholder="Search classes (e.g., CHEM001)"
          className="class-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* View All CNAS Class Ratings Button */}
        <div style={{ marginTop: "1rem" }}>
          <Link to="/college/CNAS/ratings">
            <button className="class-card">
              View All CNAS Class Ratings
            </button>
          </Link>
        </div>
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
        <p>Welcome to the CNAS study resources page.</p>
        <p>Here you'll find resources for science and agricultural students.</p>


        <input
          type="text"
          placeholder="Search classes (e.g., CHEM001)"
          className="class-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
                  <Link to={`/classpages/${course}`} key={course} className="class-card">
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
