import { useParams } from 'react-router-dom';

function CourseChatPage() {
  const { courseId } = useParams();

  return (
    <div className="page-container" style={{ padding: "40px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", color: "#003366" }}>
        Live Chat for {courseId}
      </h1>
      <p>This is where the live messaging interface will go.</p>
      <p>Coming soon 🚧</p>
    </div>
  );
}

export default CourseChatPage;
