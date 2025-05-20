import React, { useEffect, useState } from "react";
import { submitRating, getRatings } from "../firebase";

const ClassRatings = ({ collegeId, classCode, userId }) => {
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [ratingsList, setRatingsList] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      const data = await getRatings(collegeId, classCode);
      setRatingsList(data);
    };
    fetchRatings();
  }, [collegeId, classCode]);

  const handleSubmit = async () => {
    if (!rating || rating < 1 || rating > 5) return alert("Rating must be between 1 and 5");
    await submitRating(collegeId, classCode, userId, rating, comment);
    setComment("");
    setRating(3);
    const updatedRatings = await getRatings(collegeId, classCode);
    setRatingsList(updatedRatings);
  };

  const average = ratingsList.length
    ? (ratingsList.reduce((sum, r) => sum + r.rating, 0) / ratingsList.length).toFixed(1)
    : "No ratings yet";

  return (
    <div style={{ padding: "1rem", maxWidth: "600px" }}>
      <h2>Rate This Class</h2>
      <p><strong>Average Rating:</strong> {average} / 5</p>

      <label>
        Rating (1-5):&nbsp;
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </label>
      <br /><br />
      <label>
        Comment:
        <br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your experience..."
          rows="3"
          style={{ width: "100%" }}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit Rating</button>

      <h3 style={{ marginTop: "2rem" }}>What others are saying:</h3>
      <ul>
        {ratingsList.map((r, i) => (
          <li key={i}>
            <strong>{r.rating}/5</strong> – {r.comment || "No comment"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassRatings;
