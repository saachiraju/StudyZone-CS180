'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import ClassReviews from '@/components/ClassReviews';

function ClassPageBCOE() {
  const params = useParams();
  //console.log(params)
  const courseId = params?.courses?.toString();
  //console.log(courseId)
  //console.log(courseId)
  const bcoeCourseResources: Record<string, { description: string; syllabus?: string }> = {
    CS010A: {
      description:
        'Intro to CS for Science, Engineering & Mathematics I: fundamental C++ programming concepts.',
    },
    CS010B: {
      description:
        'Intro to CS II: object‑oriented programming, basic data structures, and algorithm analysis in C++.',
    },
    CS010C: {
      description:
      'Fuad Jamour',
    },
    CS030: {
      description:
        'Programming in Python: problem solving, scripting, and data handling for engineers.',
    },
    CS061: {
      description:
        'Programming in Math: problem creating, scripting, and data handling for freshmen.',
    },
    CS153: {
      description:
        'Operating Systems: processes, threads, scheduling, memory management, file systems, and concurrency.',
    },
    CS180: {
      description:
        'Software Engineering: requirements, architecture, design patterns, testing, and project management.',
    },
    EE100A: {
      description:
        'Electronic Circuits I: diodes, BJTs, MOSFETs, biasing, and small‑signal analysis.',
    },
    EE100B: {
      description:
        'Electronic Circuits II: frequency response, feedback, differential and operational amplifier design.',
    },
    EE110A: {
      description:
        'Signals and Systems I: convolution, continuous‑time Fourier series and transforms, Laplace domain.',
    },
    EE132: {
      description:
        'Digital Logic Design: combinational and sequential circuits, finite‑state machines, and Verilog basics.',
    },
    ME010: {
      description:
        'Statics: forces, moments, free‑body diagrams, and equilibrium of rigid bodies.',
    },
    ME018: {
      description:
        'Dynamics: kinematics and kinetics of particles and rigid bodies; energy and momentum methods.',
    },
    ME104: {
      description:
        'Thermodynamics: properties of pure substances, 1st and 2nd laws, power and refrigeration cycles.',
    },
    CHE100: {
      description:
        'Chemical Process Principles: material and energy balances, phase equilibrium, recycle and bypass streams.',
    },
    ENVE110: {
      description:
        'Introduction to Air Pollution: sources, atmospheric dispersion, measurement, and control technologies.',
    },
    BIME050: {
      description:
        'Introduction to Bioengineering: quantitative physiology, biomedical sensors, and device design.',
    },
    BIME110: {
      description:
        'Cellular Bioengineering: transport phenomena, reaction kinetics, and cell‑signaling models.',
    },
    ENGR001: {
      description:
        'Freshman Engineering Seminar: overview of disciplines, career paths, and professional skills.',
    },
    ENGR154: {
      description:
        'Engineering Ethics and Professionalism: ethical theory, codes of conduct, and case studies.',
    },
  };

  const course = courseId ? bcoeCourseResources[courseId] : null;

  return (
    <>
    <div className="page-container course-layout" style={{ position: 'relative' }}>
      {/* Back Button */}
      <Link 
        href="/bcoe"
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: '#4682b4',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 15px rgba(70, 130, 180, 0.3)',
          transition: 'all 0.3s ease',
          border: '2px solid transparent',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)';
          e.currentTarget.style.color = '#2c5282';
          e.currentTarget.style.borderColor = '#4682b4';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#4682b4';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span style={{ fontSize: '16px' }}>←</span> Back to BCOE
      </Link>

      <h2 className="course-title">{courseId} Class Page</h2>

      {course ? (
        <>
          <p className="course-description">{course.description}</p>

          <div className="section">
            <h3 className="section-heading">⭐ Rate My Course</h3>
            <Link href={`/bcoe/ratings`} className="blue-button">
              Rate This Course
            </Link>
          </div>

          {/* Add Class Reviews Section */}
          {courseId && <ClassReviews collegeId="bcoe" classCode={courseId} />}

          <div className="section">
            <h3 className="section-heading">💬 Join This Quarter's Discord</h3>
            <a
              href="https://discord.com/invite/your-server-id"
              target="_blank"
              rel="noopener noreferrer"
              className="blue-button"
            >
              Join This Quarter's Discord
            </a>
          </div>

          <div className="section">
            <h3 className="section-heading">📚 Course Resources</h3>
            <Link href={`/classpages/bcoe/${courseId}/resources`} className="blue-button">
              View Course Resources
            </Link>
          </div>
        </>
      ) : (
        <p>No detailed resources available for this course yet.</p>
      )}
    </div>
    </>
  );
}

export default ClassPageBCOE;
