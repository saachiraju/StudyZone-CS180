'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

function ClassPageCNAS() {
  const params = useParams();
  const courseId = params?.courses?.toString();


  const cnasCourseResources: Record<string, { description: string; syllabus?: string }> = {
    // Biology
    BIOL100: { description: "Introduction to Biology: Covers cell structure, genetics, evolution, and basic physiology." },
    BIOL102: { description: "Principles of Ecology and Evolution: Focuses on ecosystems, biodiversity, and evolutionary theory." },
    BIOL107: { description: "Molecular Biology: Gene expression, regulation, and biotechnology applications." },
    BIOL005A: { description: "Intro to Cell and Molecular Biology." },
    BIOL005B: { description: "Organismal Biology: Focuses on structure and function of plants and animals." },
    BIOL005C: { description: "Ecology and Evolution: Studies natural selection and biodiversity." },

    // Chemistry
    CHEM001: { description: "General Chemistry: Atomic structure, stoichiometry, and bonding." },
    CHEM001A: { description: "General Chemistry I: Introduction to chemical principles." },
    CHEM001B: { description: "General Chemistry II: Thermodynamics and kinetics." },
    CHEM001C: { description: "General Chemistry III: Equilibria and electrochemistry." },
    CHEM112: { description: "Organic Chemistry II: Synthesis and reaction mechanisms." },
    CHEM112A: { description: "Organic Chemistry IA: Fundamentals of structure and bonding." },
    CHEM112B: { description: "Organic Chemistry IB: Reaction types and synthesis." },

    // Math
    MATH009A: { description: "Calculus I: Limits, derivatives, and applications." },
    MATH009B: { description: "Calculus II: Integration techniques and applications." },
    MATH009C: { description: "Calculus III: Sequences, series, and multivariable intro." },
    MATH010A: { description: "Calculus of Several Variables I." },
    MATH010B: { description: "Calculus of Several Variables II." },
    MATH046: { description: "Linear Algebra and Differential Equations." },

    // Physics
    PHYS002A: { description: "General Physics I: Mechanics and thermodynamics." },
    PHYS002B: { description: "General Physics II: Electricity and magnetism." },
    PHYS002C: { description: "General Physics III: Waves, optics, and modern physics." },
    PHYS040A: { description: "Physics for Scientists and Engineers I." },
    PHYS040B: { description: "Physics for Scientists and Engineers II." },
    PHYS040C: { description: "Physics for Scientists and Engineers III." },

    // Statistics
    STAT155: { description: "Statistics for the Life Sciences: Inference and regression." },
    STAT160: { description: "Statistical Computing and Data Analysis." },
    STAT170: { description: "Statistical Inference: Theory and practice." },

    // Environmental Sciences
    ENSC001: { description: "Intro to Environmental Science: Human-environment interactions." },
    ENSC100: { description: "Environmental Analysis: Quantitative tools and techniques." },
    ENSC130: { description: "Environmental Toxicology: Pollutants and ecological impacts." },

    // Biochemistry
    BCH001: { description: "Intro to Biochemistry: Biomolecules and metabolism." },
    BCH110A: { description: "Biochemistry I: Protein structure and enzymology." },
    BCH110B: { description: "Biochemistry II: Metabolic pathways and regulation." },

    // Neuroscience
    CBNS101: { description: "Neuroscience I: Neural systems and function." },
    CBNS106: { description: "Neurobiology: Neural signaling and sensory systems." },
    CBNS120: { description: "Cell Biology: Organelles, signaling, and structure." },

    // Microbiology & Plant Pathology
    MIC100: { description: "General Microbiology: Microbial physiology and genetics." },
    PLPA120: { description: "Plant Pathology: Diseases, diagnostics, and management." },

    // Earth Sciences
    GEO001: { description: "Physical Geology: Earth materials, structures, and processes." },
    GEO002: { description: "Historical Geology: Earth's history and fossil records." },
    GEO100: { description: "Mineralogy: Crystal structures and mineral identification." },

    // Entomology
    ENT001: { description: "General Entomology: Insect classification and ecology." },
    ENT100: { description: "Insect Biology: Physiology, development, and adaptation." },
    ENT120: { description: "Medical Entomology: Insect vectors and disease." },

    // Nematology
    NEM100: { description: "General Nematology: Biology and control of nematodes." },
    NEM120: { description: "Nematode Ecology: Interactions with plants and environment." },
    NEM130: { description: "Nematode Management: Strategies in agriculture." },

    // Botany
    BPSC001: { description: "Plant Biology: Growth, reproduction, and physiology." },
    BPSC100: { description: "Plant Physiology: Water relations, photosynthesis, and hormones." },
    BPSC135: { description: "Plant Genetics: Inheritance and genetic engineering." }
  };

  const course = courseId ? cnasCourseResources[courseId] : null;

  return (
    <div className="page-container course-layout" style={{ position: 'relative' }}>
      {/* Back Button */}
      <Link 
        href="/cnas"
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
        <span style={{ fontSize: '16px' }}>←</span> Back to CNAS
      </Link>

      <h2 className="course-title">{courseId} Resource Page</h2>
      {course ? (
        <>
          <p className="course-description">{course.description}</p>

          <div className="section">
            <h3 className="section-heading">⭐ Rate My Course</h3>
            <Link href={`/cnas/ratings`} className="blue-button">
              Rate This Course
            </Link>
          </div>

          <div className="section">
            <h3 className="section-heading">💬 Class Live Chat</h3>
            <Link href={`/chat/${courseId}`} className="blue-button">
              Open Class Chat
            </Link>
          </div>

          <div className="section">
            <h3 className="section-heading">💬 Join This Quarter's Discord</h3>
            <a
              href="https://discord.com/invite/your-server-id"
              target="_blank"
              rel="noopener noreferrer"
              className="blue-button"
            >
              Join Discord
            </a>
          </div>

          <div className="section">
            <h3 className="section-heading">📚 Course Resources</h3>
            <Link href={`/classpages/cnas/${courseId}/resources`} className="blue-button">
              View Course Resources
            </Link>
          </div>
        </>
      ) : (
        <p>No detailed resources available for this course yet.</p>
      )}
    </div>
  );
}

export default ClassPageCNAS;
