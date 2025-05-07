
BCOE.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';  

export default function BCOE() {
  return (
    <div className="page-center">

      <div className="card">
        <h1 className="page-title">Bourns College of Engineering</h1>

        <p>Welcome to the BCOE study resources page.</p>
        <p>Here you'll find resources for engineering students.</p>

        <h2>Classes</h2>
        <ul className="class-list">
          <li>
            <Link to="/bcoe/cs180">CS180 – Software Engineering</Link>
          </li>
          <li>
            <Link to="/bcoe/cs153">CS153 – Operating Systems</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}