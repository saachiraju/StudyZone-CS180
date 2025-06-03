"use client";

//import React from 'react';
import '@/styles/nav.css';
import { useAuth } from '@/dependencies/AuthContext';
//import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation'

function Nav() {
  // const { currentUser } = useAuth();
  // const navigate = useNavigate();

  // const navigateToBCOE = () => {
  //   navigate('/bcoe');
  // };

  // const navigateToCNAS = () => {
  //   navigate('/cnas');
  // };
  const router = useRouter()

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #87ceeb 0%, #b0e0e6 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      position: "relative"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
        pointerEvents: "none"
      }} />

      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        padding: "3rem 2.5rem",
        boxShadow: "0 20px 60px rgba(70, 130, 180, 0.3)",
        border: "2px solid rgba(255, 215, 0, 0.3)",
        backdropFilter: "blur(10px)",
        textAlign: "center",
        maxWidth: "600px",
        width: "100%",
        position: "relative",
        zIndex: 1
      }}>
        {/* UC Riverside Logo/Branding */}
        <div style={{
          marginBottom: "2rem"
        }}>
          <div style={{
            fontSize: "3rem",
            fontWeight: "700",
            background: "linear-gradient(135deg, #4682b4 0%, #5f9ea0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
            fontFamily: "'Georgia', serif"
          }}>
            StudyZone
          </div>
          <div style={{
            fontSize: "1.1rem",
            color: "#666",
            fontWeight: "500"
          }}>
            University of California, Riverside
          </div>
        </div>

        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#2c5282",
          marginBottom: "1rem",
          fontFamily: "'Georgia', serif"
        }}>
          Welcome
        </h1>

        <p style={{
          fontSize: "1.2rem",
          color: "#666",
          marginBottom: "3rem",
          fontWeight: "500"
        }}>
          Select a college to find study resources:
        </p>

        <div style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {/* BCOE Button */}
          <button
            onClick={() => router.push('/bcoe')}
            style={{
              background: "linear-gradient(135deg, #4682b4 0%, #5f9ea0 100%)",
              color: "white",
              border: "none",
              borderRadius: "15px",
              padding: "1.5rem 2.5rem",
              fontSize: "1.3rem",
              fontWeight: "700",
              cursor: "pointer",
              minWidth: "200px",
              boxShadow: "0 8px 25px rgba(70, 130, 180, 0.4)",
              transition: "all 0.3s ease",
              fontFamily: "'Georgia', serif",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)";
              e.currentTarget.style.color = "#2c5282";
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(255, 215, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #4682b4 0%, #5f9ea0 100%)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(70, 130, 180, 0.4)";
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>🏗️</div>
            <div>BCOE</div>
            <div style={{
              fontSize: "0.9rem",
              fontWeight: "500",
              opacity: "0.9",
              marginTop: "0.3rem"
            }}>
              Engineering
            </div>
          </button>

          {/* CNAS Button */}
          <button
            onClick={() => router.push('/cnas')}
            style={{
              background: "linear-gradient(135deg, #228b22 0%, #32cd32 100%)",
              color: "white",
              border: "none",
              borderRadius: "15px",
              padding: "1.5rem 2.5rem",
              fontSize: "1.3rem",
              fontWeight: "700",
              cursor: "pointer",
              minWidth: "200px",
              boxShadow: "0 8px 25px rgba(34, 139, 34, 0.4)",
              transition: "all 0.3s ease",
              fontFamily: "'Georgia', serif",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)";
              e.currentTarget.style.color = "#2c5282";
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(255, 215, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #228b22 0%, #32cd32 100%)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(34, 139, 34, 0.4)";
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>🔬</div>
            <div>CNAS</div>
            <div style={{
              fontSize: "0.9rem",
              fontWeight: "500",
              opacity: "0.9",
              marginTop: "0.3rem"
            }}>
              Natural Sciences
            </div>
          </button>
        </div>

        {/* Additional Info */}
        <div style={{
          marginTop: "3rem",
          padding: "1.5rem",
          background: "linear-gradient(135deg, rgba(135, 206, 235, 0.1) 0%, rgba(176, 224, 230, 0.1) 100%)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 215, 0, 0.2)"
        }}>
          <div style={{
            fontSize: "1rem",
            color: "#4682b4",
            fontWeight: "600",
            marginBottom: "0.5rem"
          }}>
            🎓 Access Resources For:
          </div>
          <div style={{
            fontSize: "0.9rem",
            color: "#666",
            lineHeight: "1.6"
          }}>
            Class materials, study guides, practice tests, ratings & reviews, and discussion forums
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav; 

