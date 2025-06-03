'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/dependencies/AuthContext';
import { collection, query, where, getDocs, orderBy, getFirestore } from 'firebase/firestore';
import app from '@/dependencies/firebase';
import '@/styles/Pages.css';

interface SavedQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  explanation: string;
}

interface SavedTest {
  id: string;
  questions: SavedQuestion[];
  userAnswers: Record<number, string>;
  score: number;
  difficulty: string;
  questionCount: number;
  customInstructions?: string;
  fileName: string;
  completedAt: any;
  createdAt: any;
}

function SavedQuizzes() {
  const { currentUser } = useAuth();
  const [savedTests, setSavedTests] = useState<SavedTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<SavedTest | null>(null);

  useEffect(() => {
    if (currentUser) {
      fetchSavedTests();
    }
  }, [currentUser]);

  const fetchSavedTests = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const db = getFirestore(app);
      const q = query(
        collection(db, 'savedTests'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const tests: SavedTest[] = [];
      
      querySnapshot.forEach((doc) => {
        tests.push({
          id: doc.id,
          ...doc.data()
        } as SavedTest);
      });
      
      setSavedTests(tests);
    } catch (error) {
      console.error('Error fetching saved tests:', error);
      setError('Failed to load saved quizzes');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };

  if (!currentUser) {
    return (
      <div className="page-container">
        <div className="header-banner">
          <h1 className="page-title">Saved Quizzes</h1>
          <p className="page-subtitle">Please log in to view your saved quizzes</p>
        </div>
      </div>
    );
  }

  if (selectedTest) {
    return (
      <div className="page-container">
        <div className="header-banner">
          <h1 className="page-title">Quiz Details</h1>
          <p className="page-subtitle">
            Score: {selectedTest.score}% | {selectedTest.fileName}
          </p>
        </div>

        <div className="page-content">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '2px solid #87ceeb',
              marginBottom: '20px'
            }}>
              <button
                onClick={() => setSelectedTest(null)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4682b4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                ← Back to Saved Quizzes
              </button>

              <h3 style={{ color: '#4682b4', marginBottom: '15px' }}>Quiz Summary</h3>
              <div style={{ color: '#666', marginBottom: '20px' }}>
                <p><strong>File:</strong> {selectedTest.fileName}</p>
                <p><strong>Difficulty:</strong> {selectedTest.difficulty}</p>
                <p><strong>Questions:</strong> {selectedTest.questionCount}</p>
                <p><strong>Score:</strong> {selectedTest.score}%</p>
                <p><strong>Completed:</strong> {formatDate(selectedTest.completedAt)}</p>
                {selectedTest.customInstructions && (
                  <p><strong>Focus:</strong> {selectedTest.customInstructions}</p>
                )}
              </div>
            </div>

            {selectedTest.questions.map((question, index) => (
              <div key={index} style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '2px solid #87ceeb',
                marginBottom: '20px'
              }}>
                <h4 style={{ color: '#4682b4', marginBottom: '15px' }}>
                  Question {index + 1}: {question.question}
                </h4>
                
                <div style={{ marginBottom: '15px' }}>
                  {Object.entries(question.options).map(([letter, option]) => {
                    const isCorrect = letter === question.correctAnswer;
                    const isUserAnswer = letter === selectedTest.userAnswers[index];
                    
                    return (
                      <div 
                        key={letter}
                        style={{
                          padding: '10px',
                          marginBottom: '8px',
                          borderRadius: '6px',
                          backgroundColor: isCorrect ? '#d4edda' : isUserAnswer ? '#f8d7da' : '#f8f9fa',
                          border: isCorrect ? '1px solid #c3e6cb' : isUserAnswer ? '1px solid #f5c6cb' : '1px solid #e9ecef'
                        }}
                      >
                        <strong>{letter}:</strong> {option}
                        {isCorrect && <span style={{ color: '#155724', marginLeft: '10px' }}>✓ Correct</span>}
                        {isUserAnswer && !isCorrect && <span style={{ color: '#721c24', marginLeft: '10px' }}>✗ Your answer</span>}
                      </div>
                    );
                  })}
                </div>

                <div style={{ 
                  backgroundColor: '#e7f3ff', 
                  padding: '15px', 
                  borderRadius: '6px',
                  border: '1px solid #bee5eb'
                }}>
                  <strong style={{ color: '#4682b4' }}>Explanation:</strong>
                  <p style={{ color: '#666', margin: '5px 0 0 0' }}>{question.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="header-banner">
        <h1 className="page-title">Saved Quizzes</h1>
        <p className="page-subtitle">Review your completed practice tests</p>
      </div>

      <div className="page-content">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '12px', 
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '2px solid #87ceeb'
            }}>
              <p style={{ color: '#4682b4', fontSize: '18px' }}>Loading saved quizzes...</p>
            </div>
          ) : error ? (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '12px', 
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '2px solid #f8d7da'
            }}>
              <p style={{ color: '#721c24', fontSize: '18px' }}>{error}</p>
            </div>
          ) : savedTests.length === 0 ? (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '12px', 
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '2px solid #87ceeb'
            }}>
              <p style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>
                No saved quizzes yet!
              </p>
              <p style={{ color: '#666' }}>
                Complete a practice test and save it to see it here.
              </p>
            </div>
          ) : (
            savedTests.map((test) => (
              <div
                key={test.id}
                style={{ 
                  backgroundColor: 'white', 
                  padding: '25px', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #87ceeb',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onClick={() => setSelectedTest(test)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h3 style={{ color: '#4682b4', margin: 0, fontSize: '20px' }}>
                    {test.fileName}
                  </h3>
                  <div style={{
                    padding: '8px 16px',
                    backgroundColor: test.score >= 80 ? '#d4edda' : test.score >= 60 ? '#fff3cd' : '#f8d7da',
                    border: test.score >= 80 ? '1px solid #c3e6cb' : test.score >= 60 ? '1px solid #ffeaa7' : '1px solid #f5c6cb',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: test.score >= 80 ? '#155724' : test.score >= 60 ? '#856404' : '#721c24'
                  }}>
                    {test.score}%
                  </div>
                </div>
                
                <div style={{ color: '#666', marginBottom: '10px' }}>
                  <p style={{ margin: '5px 0' }}>
                    <strong>Difficulty:</strong> {test.difficulty} | 
                    <strong> Questions:</strong> {test.questionCount} | 
                    <strong> Completed:</strong> {formatDate(test.completedAt)}
                  </p>
                  {test.customInstructions && (
                    <p style={{ margin: '5px 0', fontStyle: 'italic' }}>
                      Focus: {test.customInstructions}
                    </p>
                  )}
                </div>
                
                <div style={{ color: '#4682b4', fontSize: '14px', fontWeight: '500' }}>
                  Click to review answers and explanations →
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedQuizzes; 