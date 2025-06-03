'use client';

import React, { useEffect, useState } from 'react';
import { getRatings } from '@/dependencies/firebase';

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ 
          color: i < rating ? "#ffd700" : "#d4d4d4",
          fontSize: "16px",
          marginRight: "2px"
        }}>
          ★
        </span>
      ))}
      <span style={{ 
        marginLeft: "8px", 
        fontSize: "14px", 
        color: "#666",
        fontWeight: "600" 
      }}>
        {rating}/5
      </span>
    </div>
  );
};

interface Review {
  classCode: string;
  rating: number;
  comment?: string;
  userId: string;
  timestamp?: any;
}

interface ClassReviewsProps {
  collegeId: string;
  classCode: string;
}

const ClassReviews: React.FC<ClassReviewsProps> = ({ collegeId, classCode }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const allRatings = await getRatings(collegeId);
        
        // Filter reviews for this specific class
        const classReviews = allRatings.filter(
          rating => rating.classCode.toUpperCase() === classCode.toUpperCase()
        );
        
        setReviews(classReviews);
        
        // Calculate average rating
        if (classReviews.length > 0) {
          const sum = classReviews.reduce((acc, review) => acc + review.rating, 0);
          setAverageRating(Math.round((sum / classReviews.length) * 10) / 10);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [collegeId, classCode]);

  if (loading) {
    return (
      <div className="section">
        <h3 className="section-heading">📝 Class Reviews</h3>
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#666'
        }}>
          Loading reviews...
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <h3 className="section-heading">📝 Class Reviews ({reviews.length})</h3>
      
      {reviews.length > 0 && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #e9ecef'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px'
          }}>
            <span style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#2c5282'
            }}>
              Overall Rating:
            </span>
            <StarRating rating={Math.round(averageRating)} />
            <span style={{
              fontSize: '16px',
              color: '#666'
            }}>
              ({averageRating} out of 5)
            </span>
          </div>
        </div>
      )}
      
      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '10px',
        border: '1px solid #e1e4e8',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        {reviews.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666'
          }}>
            <p style={{ marginBottom: '10px', fontSize: '16px' }}>
              No reviews yet for {classCode}
            </p>
            <p style={{ fontSize: '14px' }}>
              Be the first to rate this class!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  padding: '15px',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  backgroundColor: '#f8f9fa',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e3f2fd';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <StarRating rating={review.rating} />
                  <span style={{
                    fontSize: '12px',
                    color: '#999',
                    fontStyle: 'italic'
                  }}>
                    Student Review
                  </span>
                </div>
                
                {review.comment && (
                  <p style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: '1.4',
                    color: '#333'
                  }}>
                    "{review.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassReviews; 