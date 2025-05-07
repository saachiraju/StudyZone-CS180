import React, { useEffect, useState } from "react";
import { getRatings } from "../firebase";

export default function BCOERatings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      const data = await getRatings("BCOE"); // Gets all BCOE ratings
      setRatings(data);
    };

    fetchRatings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Class Ratings in BCOE</h1>
      {ratings.length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Class</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating, index) => (
              <tr key={index}>
                <td>{rating.classCode}</td>
                <td>{rating.rating}</td>
                <td>{rating.comment || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
