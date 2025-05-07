
import { Link, useParams } from 'react-router-dom';

function ClassPageBCOE() {
  const { courseId } = useParams();

  const bcoeCourseResources = {

    CS010A: {
      description:
        'Intro to CS for Science, Engineering & Mathematics I: fundamental C++ programming concepts.'
    },
    CS010B: {
      description:
        'Intro to CS II: object‑oriented programming, basic data structures, and algorithm analysis in C++.'
    },
    CS030: {
      description:
        'Programming in Python: problem solving, scripting, and data handling for engineers.'
    },
    CS153: {
      description:
        'Operating Systems: processes, threads, scheduling, memory management, file systems, and concurrency.'
    },
    CS180: {
      description:
        'Software Engineering: requirements, architecture, design patterns, testing, and project management.'
    },

  
    EE100A: {
      description:
        'Electronic Circuits I: diodes, BJTs, MOSFETs, biasing, and small‑signal analysis.'
    },
    EE100B: {
      description:
        'Electronic Circuits II: frequency response, feedback, differential and operational amplifier design.'
    },
    EE110A: {
      description:
        'Signals and Systems I: convolution, continuous‑time Fourier series and transforms, Laplace domain.'
    },
    EE132: {
      description:
        'Digital Logic Design: combinational and sequential circuits, finite‑state machines, and Verilog basics.'
    },


    ME010: {
      description:
        'Statics: forces, moments, free‑body diagrams, and equilibrium of rigid bodies.'
    },
    ME018: {
      description:
        'Dynamics: kinematics and kinetics of particles and rigid bodies; energy and momentum methods.'
    },
    ME104: {
      description:
        'Thermodynamics: properties of pure substances, 1st and 2nd laws, power and refrigeration cycles.'
    },


    CHE100: {
      description:
        'Chemical Process Principles: material and energy balances, phase equilibrium, recycle and bypass streams.'
    },
    ENVE110: {
      description:
        'Introduction to Air Pollution: sources, atmospheric dispersion, measurement, and control technologies.'
    },


    BIME050: {
      description:
        'Introduction to Bioengineering: quantitative physiology, biomedical sensors, and device design.'
    },
    BIME110: {
      description:
        'Cellular Bioengineering: transport phenomena, reaction kinetics, and cell‑signaling models.'
    },


    ENGR001: {
      description:
        'Freshman Engineering Seminar: overview of disciplines, career paths, and professional skills.'
    },
    ENGR154: {
      description:
        'Engineering Ethics and Professionalism: ethical theory, codes of conduct, and case studies.'
    }
  };

  const course = bcoeCourseResources[courseId];

  return (
    <div className="page-container course-layout">
      <h2 className="course-title">{courseId} Resource Page</h2>

      {course ? (
        <>
          <p className="course-description">{course.description}</p>


          <div className="section">
            <h3 className="section-heading">⭐ Rate My Course</h3>
            <Link to={`/rate/${courseId}`} className="blue-button">
              Rate This Course
            </Link>
          </div>


          <div className="section">
            <h3 className="section-heading">💬 Join This Quarter’s Discord</h3>
            <a
              href="https://discord.com/invite/your-server-id"
              target="_blank"
              rel="noopener noreferrer"
              className="blue-button"
            >
              Join This Quarter's Discord
            </a>
          </div>


          <div className="section">
            <h3 className="section-heading">📚 Course Resources</h3>
            {course.syllabus ? (
              <a
                href={course.syllabus}
                target="_blank"
                rel="noopener noreferrer"
                className="blue-button"
              >
                View Syllabus (PDF)
              </a>
            ) : (
              <p>No resources added yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>No detailed resources available for this course yet.</p>
      )}
    </div>
  );
}

export default ClassPageBCOE;
