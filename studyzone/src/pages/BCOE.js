
BCOE.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

function BCOE() {
  const [searchTerm, setSearchTerm] = useState('');

  const groupedClasses = {
    'Computer Science': [
      'CS010A',
      'CS010B',
      'CS030',
      'CS061',
      'CS100',
      'CS141',
      'CS153',
      'CS161',
      'CS166',
      'CS171',
      'CS180'
    ],
    'Electrical Engineering': [
      'EE100A',
      'EE100B',
      'EE110A',
      'EE110B',
      'EE120A',
      'EE120B',
      'EE132',
      'EE141',
      'EE144',
      'EE175A'
    ],
    'Mechanical Engineering': [
      'ME010',
      'ME018',
      'ME104',
      'ME114',
      'ME118',
      'ME132'
    ],
    'Chemical & Environmental Engineering': [
      'CHE100',
      'CHE110A',
      'CHE110B',
      'CHE120A',
      'CHE120B',
      'ENVE100',
      'ENVE110',
      'ENVE130'
    ],
    Bioengineering: ['BIME050', 'BIME110', 'BIME116', 'BIME120'],
    'General Engineering': ['ENGR001', 'ENGR154']
  };

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

export default BCOE;