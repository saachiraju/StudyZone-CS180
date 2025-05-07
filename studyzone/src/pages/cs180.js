import React from 'react';
import '../styles/Pages.css'; 

export default function CS180() {
  return (
    <div className="page">
      <h1>CS 180 – Introduction to Software Engineering</h1>

      <section>
        <h2>Class ranking</h2>
        <p>⭐ 4.3 / 5 (87 votes)</p>
      </section>

      <section>
        <h2>Description</h2>
        <p>A study of software engineering techniques for the development, maintenance, and evolution of large software systems. Topics include requirements and specification; system design and implementation; debugging, testing, and quality assurance; reengineering; project management; software process; tools; and environments.</p>
      </section>

      <section>
        <h2>Important Information</h2>
        <p> 4 Units, Lecture, 3 hours; laboratory, 2 hours; individual study, 1 hour. Prerequisite(s): CS 100. 
        </p>
      </section>

      <section>
        <h2>Discord</h2>
        <a href="https://discord.gg/your‑cs180‑invite" target="_blank" rel="noopener noreferrer">
          Join the CS180 server
        </a>
      </section>
    </div>
  );
}