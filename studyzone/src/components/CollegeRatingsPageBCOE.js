import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRatings, submitRating } from "../firebase";
import { useAuth } from "../AuthContext";
import "../styles/Pages.css"; // Make sure this includes .class-card

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ 
          color: i < rating ? "#0047ab" : "#d4d4d4",
          fontSize: "20px",
          marginRight: "2px"
        }}>
          ★
        </span>
      ))}
    </div>
  );
};

const CollegeRatingsPageBCOE = () => {
  const collegeId = "BCOE";
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
    <div style={{ 
      padding: "2rem", 
      position: "relative",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh"
    }}>
      <div style={{
        backgroundColor: "#0047ab",
        padding: "1.5rem",
        borderRadius: "8px",
        color: "white",
        marginBottom: "2rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Link 
          to={`/${collegeId.toLowerCase()}`}
          style={{
            position: "absolute",
            left: 24,
            backgroundColor: "white",
            color: "#0047ab",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            fontWeight: "600",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
          }}
        >
          <span style={{ fontSize: "1.1rem", marginRight: "0.3rem" }}>←</span> Back to Hub
        </Link>
        <h1 style={{ 
          textAlign: "center", 
          margin: 0,
          fontSize: "2.2rem",
          fontWeight: "600"
        }}>
          All Class Ratings in {collegeId}
        </h1>
        <button
          style={{ 
            position: "absolute",
            right: 24,
            backgroundColor: "white",
            color: "#0047ab",
            border: "none",
            borderRadius: "6px",
            padding: "0.6rem 1.2rem",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            transition: "all 0.2s ease"
          }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Rating"}
        </button>
      </div>

      {showForm && (
        <div style={{ 
          margin: "0 auto 2rem auto", 
          backgroundColor: "white",
          border: "1px solid #e1e4e8",
          borderRadius: "8px",
          padding: "1.5rem",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}>
          <h3 style={{ 
            color: "#0047ab", 
            marginTop: 0, 
            marginBottom: "1.5rem",
            borderBottom: "2px solid #0047ab",
            paddingBottom: "0.5rem"
          }}>
            Submit a New Rating
          </h3>
          
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              color: "#333",
              fontWeight: "500"
            }}>
              Class Code (e.g. CS180):
            </label>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              style={{ 
                width: "100%",
                padding: "0.6rem",
                border: "1px solid #cfd7e6",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
              placeholder="Enter class code"
            />
          </div>
          
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              color: "#333",
              fontWeight: "500"
            }}>
              Rating (1–5):
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <input
                type="range"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ 
                  flexGrow: 1
                }}
              />
              <span style={{ 
                fontWeight: "bold", 
                color: "#0047ab",
                minWidth: "30px",
                textAlign: "center"
              }}>
                {rating}/5
              </span>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <StarRating rating={rating} />
            </div>
          </div>
          
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              color: "#333",
              fontWeight: "500"
            }}>
              Comment (optional):
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              style={{ 
                width: "100%",
                padding: "0.6rem",
                border: "1px solid #cfd7e6",
                borderRadius: "4px",
                fontSize: "1rem",
                fontFamily: "inherit"
              }}
              placeholder="Share your experience with this class..."
            />
          </div>
          
          <button 
            onClick={handleSubmit} 
            style={{
              backgroundColor: "#0047ab",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease"
            }}
          >
            Submit Rating
          </button>
        </div>
      )}

      {Object.keys(groupedRatings).length === 0 ? (
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
          margin: "2rem auto",
          maxWidth: "800px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <p style={{ fontSize: "1.1rem", color: "#666" }}>No ratings yet. Be the first to add one!</p>
        </div>
      ) : (
        Object.entries(groupedRatings).map(([classCode, ratings]) => (
          <div 
            key={classCode} 
            style={{ 
              marginBottom: "2rem",
              backgroundColor: "white", 
              borderRadius: "8px",
              overflow: "hidden",
              maxWidth: "800px",
              margin: "0 auto 2rem auto",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
            }}
          >
            <div style={{ 
              backgroundColor: "#0047ab",
              color: "white",
              padding: "0.8rem 1.5rem",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px"
            }}>
              <h2 style={{ margin: 0, fontSize: "1.5rem" }}>{classCode}</h2>
            </div>
            
            <table style={{
              width: "100%",
              tableLayout: "fixed",
              borderCollapse: "collapse"
            }}>
              <thead>
                <tr style={{ backgroundColor: "#f0f4ff" }}>
                  <th style={{
                    width: "20%",
                    padding: "1rem",
                    borderBottom: "1px solid #e1e4e8",
                    textAlign: "center",
                    color: "#0047ab"
                  }}>Rating</th>
                  <th style={{
                    width: "80%",
                    padding: "1rem",
                    borderBottom: "1px solid #e1e4e8",
                    textAlign: "left",
                    color: "#0047ab"
                  }}>Comment</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((r, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                    <td style={{
                      padding: "1rem",
                      borderBottom: "1px solid #e1e4e8",
                      textAlign: "center"
                    }}>
                      <div style={{ fontWeight: "bold", color: "#0047ab", marginBottom: "0.4rem" }}>
                        {r.rating}/5
                      </div>
                      <StarRating rating={r.rating} />
                    </td>
                    <td style={{
                      padding: "1rem",
                      borderBottom: "1px solid #e1e4e8",
                      color: "#333"
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

export default CollegeRatingsPageBCOE;
