import { Link, useParams } from 'react-router-dom';

function ClassPageBCOE() {
  const { courseId } = useParams();

  const bcoeCourseResources = {
    CS010A: {
      description:
        'Intro to CS for Science, Engineering & Mathematics I: Covers problem solving through structured programming of algorithms on computers using the C++ object-oriented language. Includes variables, expressions, input/output (I/O), branches, loops, functions, parameters, arrays, strings, file I/O, and classes. Also covers software design, testing, and debugging.'
    },
    CS010B: {
      description:
        'Intro to CS for Science, Engineering & Mathematics II: Covers structured and object-oriented programming in C++. Emphasizes good programming principles and development of substantial programs. Topics include recursion, pointers, linked lists, abstract data types, and libraries.'
    },
    CS010C: {
      description:
        'Intro to CS III: Topics include basic data structures such as arrays, lists, stacks, and queues. Covers dictionaries (including binary search trees and hashing) and priority queues (heaps). Offers an introductory analysis of algorithms, sorting algorithms, and object-oriented programming including abstract data types, inheritance, and polymorphism. Explores solving complex problems through structured software development.'
    },
    CS061: {
      description:
      'Machine Organization and Assembly Language Programming: An introduction to computer organization. Topics include number representation, combinational and sequential logic, computer instructions, memory organization, addressing modes, interrupt, input/output (I/O), assembly language programming, assemblers, and linkers.'
    },
    CS150: {
      description: 'Automata and Formal Languages: A study of formal languages. Includes regular and context-free languages; computational models for generating these languages such as finite-state automata, pushdown automata, regular expressions, and context-free grammars; mathematical properties of the languages and models; and equivalence between the models. Also introduces Turing machines and decidability.'
        
    },
    CS152: {
      description:
        'Compiler Design: Covers the fundamentals of compiler design. Includes lexical analysis, parsing, semantic analysis, compile-time memory organization, run-time memory organization, code generation, and compiler portability issues.'
    },
    CS153: {
      description:
        'Design of Operating Systems: Covers the principles and practice of operating system design. Includes concurrency, memory management, file systems, protection, security, command languages, scheduling, and system performance.'
    },
    CS180: {
      description:
        'Introduction to Software Engineering: A study of software engineering techniques for the development, maintenance, and evolution of large software systems. Topics include requirements and specification; system design and implementation; debugging, testing, and quality assurance; reengineering; project management; software process; tools; and environments.'
    },

  
    EE120A: {
      description:
        'Logic Design: Covers design of digital systems. Includes Boolean algebra; combinational and sequential logic design; design and use of arithmetic logic units, carry-lookahead adders, multiplexors, decoders, comparators, multipliers, flip-flops, registers, and simple memories; state-machine design; and basic register-transfer level design. Uses hardware description languages, synthesis tools, programmable logic, and significant hardware prototyping. Cross-listed with CS 120A.'
    },
    EE144: {
      description:
        'Foundations of Robotics: Provides foundational knowledge on analysis, control, and programming of robots. Considers configuration space; rigid body motion; forward, inverse, and velocity kinematics; dynamics; trajectory planning; robot motion control; localization and mapping; and robot ethics. Integrates hands-on labs to program robots in simulation and experimentally by reading and interpreting sensor data.'
    },
    EE110A: {
      description:
        'Covers basic signals and types of systems, linear time-invariant (LTI) systems, Fourier analysis, frequency response, and Laplace transforms for LTI systems. Includes laboratory experiments with signals, transforms, harmonic generation, linear digital filtering, and sampling/aliasing.'
    },

    BIEN168: {
      description:
        'Bioengineering Analysis and Modeling: Topics include biomedical data handling; linear and nonlinear fitting of biological data; iterative solutions to nonlinear and transcendental biomedical problems; stochastic and deterministic models of biology; system level modeling of physiology; and basics of bioinformatic techniques.'
    },
    BIEN140A: {
      description:
        'Biomaterials: Covers the principles of materials science and engineering with attention given to topics in bioengineering. Explores atomic structures, hard treatment, fundamentals of corrosion, manufacturing processes, and characterization of materials. Cross-listed with CEE 140A.'
    },


    ENGR001: {
      description:
        'Computer Science: Provides freshmen with involvement in professional development activities. Activities to be performed are program-specific, and may include projects, industry overviews and interactions, involvement with professional societies and clubs, team building, career guidance, and coverage of ethics and lifelong learning issues. E. Bioengineering; F. Chemical Engineering; G. Computer Engineering; I. Computer Science; J. Electrical Engineering; K. Environmental Engineering; M. Computer Science with Business Applications.'
    },
    ENGR180W: {
      description:
        'Technical Communications: Develops oral, written, and graphical communication skills. Includes preparing and critiquing reports, proposals, instructions, and business correspondence. Emphasizes professional and ethical responsibilities and the need to stay current on technology and its global impact on economics, society, and the environment.'
    }
  };

  const course = bcoeCourseResources[courseId];

  return (
    <div className="page-container course-layout">
      <h2 className="course-title">{courseId} Resource Page</h2>

      {course ? (
        <>
          <p className="course-description">{course.description}</p>


          <div className="section">
            <h3 className="section-heading">⭐ Rate My Course</h3>
            <Link to="/college/BCOE/ratings" className="blue-button">
              Rate This Course
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
              Join This Quarter's Discord
            </a>
          </div>


          <div className="section">
            <h3 className="section-heading">📚 Course Resources</h3>
            {course.syllabus ? (
              <a
                href={course.syllabus}
                target="_blank"
                rel="noopener noreferrer"
                className="blue-button"
              >
                View Syllabus (PDF)
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
