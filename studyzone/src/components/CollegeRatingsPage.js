import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRatings, submitRating } from "../firebase";
import { useAuth } from "../AuthContext";

const CollegeRatingsPage = () => {
  const { collegeId } = useParams();
  const { currentUser, loading } = useAuth();

  const [groupedRatings, setGroupedRatings] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  const fetchData = async () => {
    const all = await getRatings(collegeId, null);
    const grouped = {};
    all.forEach(rating => {
      if (!grouped[rating.classCode]) {
        grouped[rating.classCode] = [];
      }
      grouped[rating.classCode].push(rating);
    });
    setGroupedRatings(grouped);
  };

  useEffect(() => {
    fetchData();
  }, [collegeId]);

  const handleSubmit = async () => {
    if (loading) {
      alert("Checking login status, please wait...");
      return;
    }

    if (!currentUser) {
      alert("Please log in to submit a rating.");
      return;
    }

    if (!classCode || rating < 1 || rating > 5) {
      alert("Please enter a valid class code and rating (1–5)");
      return;
    }

    await submitRating(collegeId, classCode.toUpperCase(), currentUser.uid, rating, comment);
    setClassCode("");
    setRating(3);
    setComment("");
    setShowForm(false);
    await fetchData(); // refresh list
  };

  return (
    <div style={{ padding: "2rem", position: "relative" }}>
      <h1>All Class Ratings in {collegeId}</h1>

      <button
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          padding: "0.5rem 1rem"
        }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add Rating"}
      </button>

      {showForm && (
        <div style={{ margin: "1rem 0", border: "1px solid #ccc", padding: "1rem", maxWidth: "400px" }}>
          <h3>Submit a New Rating</h3>
          <label>
            Class Code (e.g. CS180):<br />
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              style={{ width: "100%" }}
            />
          </label>
          <br /><br />
          <label>
            Rating (1–5):<br />
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>
          <br /><br />
          <label>
            Comment (optional):<br />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              style={{ width: "100%" }}
            />
          </label>
          <br /><br />
          <button onClick={handleSubmit}>Submit Rating</button>
        </div>
      )}

      {Object.keys(groupedRatings).length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        Object.entries(groupedRatings).map(([classCode, ratings]) => (
          <div key={classCode} style={{ marginBottom: "2rem" }}>
            <h2>{classCode}</h2>
            <table style={{
              width: "100%",
              tableLayout: "fixed",
              borderCollapse: "collapse",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "1rem",
              fontFamily: "Arial, sans-serif"
            }}>
              <thead>
                <tr style={{ backgroundColor: "#f4f4f4" }}>
                  <th style={{
                    width: "20%",
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center"
                  }}>Rating</th>
                  <th style={{
                    width: "80%",
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left"
                  }}>Comment</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((r, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                    <td style={{
                      padding: "12px",
                      borderBottom: "1px solid #eee",
                      textAlign: "center",
                      fontWeight: "bold"
                    }}>
                      {r.rating}/5
                    </td>
                    <td style={{
                      padding: "12px",
                      borderBottom: "1px solid #eee"
                    }}>
                      {r.comment || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default CollegeRatingsPage;
