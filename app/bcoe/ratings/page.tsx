'use client';

import { Header } from '@/sections/Header';
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getRatings, submitRating, deleteRating } from "../../../dependencies/firebase";
import { useAuth } from "../../../dependencies/AuthContext";

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
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

const classOptions = {
  "Computer Science": ['CS010A', 'CS010B', 'CS010C', 'CS030', 'CS061', 'CS100', 'CS141', 'CS153', 'CS161', 'CS166', 'CS171', 'CS180'],
  "Electrical Engineering": [
    'EE100A', 'EE100B', 'EE110A', 'EE110B', 'EE120A', 'EE120B',
    'EE132', 'EE141', 'EE144', 'EE175A'
  ],
  "Mechanical Engineering": [
    'ME010', 'ME018', 'ME104', 'ME114', 'ME118', 'ME132'
  ],
  "Chemical & Environmental Engineering": [
    'CHE100', 'CHE110A', 'CHE110B', 'CHE120A', 'CHE120B',
    'ENVE100', 'ENVE110', 'ENVE130'
  ],
  "Bioengineering": ['BIME050', 'BIME110', 'BIME116', 'BIME120'],
  "General Engineering": ['ENGR001', 'ENGR154']
};


const CollegeRatingsPage = () => {
  const { collegeId: paramCollegeId } = useParams<{ collegeId: string }>();
  const collegeId = paramCollegeId || "bcoe"; // default to "bcoe"
  const { currentUser, loading } = useAuth();

  if (!collegeId) {
    return <div>Loading college information...</div>;
  }

  type Rating = {
    id?: string;
    classCode: string;
    rating: number;
    comment?: string;
    userId?: string;
  };
  
  const [groupedRatings, setGroupedRatings] = useState<Record<string, Rating[]>>({});
  
  const [showForm, setShowForm] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  // Content filtering function
  const containsInappropriateContent = (text: string): boolean => {
    const inappropriateWords = [
      'bad word', // Demo case
      'damn', 'hell', 'crap', 'stupid', 'idiot', 'dumb', 'suck', 'sucks',
      'hate', 'awful', 'terrible', 'worst', 'garbage', 'trash', 'shit',
      'fuck', 'bitch', 'ass', 'asshole', 'bastard', 'piss', 'penis',
      'vagina', 'sex', 'sexy', 'porn', 'nude', 'naked'
    ];
    
    const lowerText = text.toLowerCase();
    return inappropriateWords.some(word => lowerText.includes(word));
  };

  // Calculate average rating for a class
  const calculateAverageRating = (ratings: Rating[]): number => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return Math.round((sum / ratings.length) * 10) / 10; // Round to 1 decimal place
  };

  const fetchData = async () => {
    const all = await getRatings(collegeId);
    const grouped: Record<string, Rating[]> = {};
    all.forEach(rating => {
      if (!grouped[rating.classCode]) {
        grouped[rating.classCode] = [];
      }
      grouped[rating.classCode].push(rating);
    });
    setGroupedRatings(grouped);
  };

  useEffect(() => {
    if (!collegeId) return; // early exit if no collegeId
  
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

    if (containsInappropriateContent(comment)) {
      alert("Your comment contains inappropriate content. Please revise your comment.");
      return;
    }

    await submitRating(collegeId, classCode.toUpperCase(), currentUser.uid, rating, comment);
    setClassCode("");
    setRating(3);
    setComment("");
    setShowForm(false);
    await fetchData(); // refresh list
  };

  const handleDelete = async (ratingId: string) => {
    if (!currentUser) {
      alert("Please log in to delete ratings.");
      return;
    }

    if (confirm("Are you sure you want to delete this rating?")) {
      try {
        await deleteRating(ratingId);
        await fetchData(); // refresh list
      } catch (error) {
        console.error("Error deleting rating:", error);
        alert("Failed to delete rating. Please try again.");
      }
    }
  };

  return (
    <div style={{
      padding: "2rem",
      position: "relative",
      background: "linear-gradient(135deg, #87ceeb 0%, #b0e0e6 100%)",
      minHeight: "100vh"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #4682b4 0%, #5f9ea0 100%)",
        padding: "1.5rem",
        borderRadius: "12px",
        color: "white",
        marginBottom: "2rem",
        boxShadow: "0 8px 32px rgba(70, 130, 180, 0.3)",
        border: "2px solid rgba(255, 215, 0, 0.3)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Link
          href={`/${collegeId.toLowerCase()}`}
          style={{
            position: "absolute",
            left: 24,
            background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
            color: "#2c5282",
            border: "2px solid transparent",
            borderRadius: "8px",
            padding: "0.6rem 1.2rem",
            fontSize: "0.9rem",
            fontWeight: "600",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #87ceeb 0%, #b0e0e6 100%)";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "#ffd700";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)";
            e.currentTarget.style.color = "#2c5282";
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span style={{ fontSize: "1.1rem", marginRight: "0.3rem" }}>←</span> Back to Hub
        </Link>
        <h1 style={{
          textAlign: "center",
          margin: 0,
          fontSize: "2.2rem",
          fontWeight: "600",
          fontFamily: "'Georgia', serif"
        }}>
          All Class Ratings in {collegeId.toUpperCase()}
        </h1>
        <button
          style={{
            position: "absolute",
            right: 24,
            background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
            color: "#2c5282",
            border: "2px solid transparent",
            borderRadius: "8px",
            padding: "0.6rem 1.2rem",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
            transition: "all 0.3s ease"
          }}
          onClick={() => setShowForm(!showForm)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #87ceeb 0%, #b0e0e6 100%)";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "#ffd700";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)";
            e.currentTarget.style.color = "#2c5282";
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {showForm ? "Cancel" : "Add Rating"}
        </button>
      </div>

      {showForm && (
        <div style={{
          margin: "0 auto 2rem auto",
          background: "rgba(255, 255, 255, 0.95)",
          border: "2px solid rgba(255, 215, 0, 0.3)",
          borderRadius: "12px",
          padding: "1.5rem",
          maxWidth: "500px",
          boxShadow: "0 8px 32px rgba(70, 130, 180, 0.3)",
          backdropFilter: "blur(10px)"
        }}>
          <h3 style={{
            color: "#2c5282",
            marginTop: 0,
            marginBottom: "1.5rem",
            borderBottom: "2px solid #ffd700",
            paddingBottom: "0.5rem",
            fontFamily: "'Georgia', serif",
            fontWeight: "600"
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
            <select
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              style={{ 
                width: "100%",
                padding: "0.6rem",
                border: "1px solid #cfd7e6",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
            >
              <option value="">Select a class code</option>
              {Object.entries(classOptions).map(([category, codes]) => (
                <optgroup key={category} label={category}>
                  {codes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
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
                }} />
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
              maxLength={500}
              rows={3}
              style={{
                width: "100%",
                padding: "0.6rem",
                border: "1px solid #cfd7e6",
                borderRadius: "4px",
                fontSize: "1rem",
                fontFamily: "inherit"
              }}
              placeholder="Share your experience with this class..." />
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
              <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
                {classCode} ({calculateAverageRating(ratings)}/5)
              </h2>
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
                      color: "#333",
                      position: "relative"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          {currentUser && r.userId === currentUser.uid && (
                            <div style={{
                              background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
                              color: "#2c5282",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "12px",
                              marginBottom: "0.5rem",
                              display: "inline-block",
                              boxShadow: "0 2px 8px rgba(255, 215, 0, 0.3)"
                            }}>
                              Your Review
                            </div>
                          )}
                          <div>{r.comment || "—"}</div>
                        </div>
                        {currentUser && r.userId === currentUser.uid && r.id && (
                          <button
                            onClick={() => handleDelete(r.id!)}
                            style={{
                              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              padding: "0.4rem 0.8rem",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                              cursor: "pointer",
                              marginLeft: "1rem",
                              boxShadow: "0 2px 8px rgba(255, 107, 107, 0.3)",
                              transition: "all 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "linear-gradient(135deg, #ff5252 0%, #d32f2f 100%)";
                              e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)";
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
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