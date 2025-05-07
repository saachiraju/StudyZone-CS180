import { useParams } from 'react-router-dom';

function RateCoursePage() {
  const { courseId } = useParams();

  return (
    <div className="page-container">
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "#003366" }}>
          Rate {courseId}
        </h1>
        <p> dont take this course, drop out{courseId}.</p>
      </div>
    </div>
  );
}

export default RateCoursePage;