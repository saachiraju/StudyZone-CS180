'use client';

import React, { useState } from 'react';
import { useAuth } from '@/dependencies/AuthContext';
import '@/styles/Pages.css';

interface Question {
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

interface TestResult {
  questions: Question[];
  originalText: string;
}

function PracticeTests() {
  const { currentUser } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [customInstructions, setCustomInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const difficulties = ['Easy', 'Medium', 'Hard', 'Mixed'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setUploadedFile(file);
      setError(null);
    }
  };

  const handleGenerateTest = async () => {
    if (!uploadedFile) {
      setError('Please upload a PDF file');
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('difficulty', selectedDifficulty || 'Mixed');
      formData.append('questionCount', questionCount.toString());
      formData.append('customInstructions', customInstructions);
      formData.append('topics', JSON.stringify([])); // Empty topics array

      const response = await fetch('/api/generate-test', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate test');
      }

      setGeneratedTest(result);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowResults(false);

    } catch (error) {
      console.error('Error generating test:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate test');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmitTest = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!generatedTest) return 0;
    let correct = 0;
    generatedTest.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / generatedTest.questions.length) * 100);
  };

  if (generatedTest && !showResults) {
    const currentQuestion = generatedTest.questions[currentQuestionIndex];
    return (
      <div className="page-container">
        <div className="header-banner">
          <h1 className="page-title">Practice Test</h1>
          <p className="page-subtitle">
            Question {currentQuestionIndex + 1} of {generatedTest.questions.length}
          </p>
        </div>

        <div className="page-content">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '2px solid #87ceeb'
            }}>
              <h3 style={{ color: '#4682b4', marginBottom: '25px', fontSize: '20px' }}>
                {currentQuestion.question}
              </h3>

              <div style={{ marginBottom: '30px' }}>
                {Object.entries(currentQuestion.options).map(([letter, option]) => (
                  <label 
                    key={letter}
                    style={{ 
                      display: 'block',
                      marginBottom: '15px',
                      padding: '15px',
                      backgroundColor: userAnswers[currentQuestionIndex] === letter ? '#b0e0e6' : '#f8f9fa',
                      border: userAnswers[currentQuestionIndex] === letter ? '2px solid #ffd700' : '1px solid #e9ecef',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={letter}
                      checked={userAnswers[currentQuestionIndex] === letter}
                      onChange={() => handleAnswerSelect(currentQuestionIndex, letter)}
                      style={{ marginRight: '10px' }}
                    />
                    <strong>{letter}:</strong> {option}
                  </label>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: currentQuestionIndex === 0 ? '#ccc' : '#4682b4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Previous
                </button>

                <span style={{ color: '#4682b4', fontWeight: 'bold' }}>
                  {currentQuestionIndex + 1} / {generatedTest.questions.length}
                </span>

                {currentQuestionIndex === generatedTest.questions.length - 1 ? (
                  <button
                    onClick={handleSubmitTest}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#ffd700',
                      color: '#4682b4',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.min(generatedTest.questions.length - 1, currentQuestionIndex + 1))}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#4682b4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults && generatedTest) {
    const score = calculateScore();
    return (
      <div className="page-container">
        <div className="header-banner">
          <h1 className="page-title">Test Results</h1>
          <p className="page-subtitle">
            Your Score: {score}%
          </p>
        </div>

        <div className="page-content">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '30px', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '2px solid #87ceeb',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#4682b4', marginBottom: '20px' }}>
                Test Summary
              </h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                You answered {Object.values(userAnswers).filter((answer, index) => 
                  answer === generatedTest.questions[index]?.correctAnswer
                ).length} out of {generatedTest.questions.length} questions correctly.
              </p>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setGeneratedTest(null);
                    setUserAnswers({});
                    setShowResults(false);
                    setCurrentQuestionIndex(0);
                  }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#4682b4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Generate New Test
                </button>

                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    setShowResults(false);
                  }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#ffd700',
                    color: '#4682b4',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Retake Test
                </button>
              </div>
            </div>

            {generatedTest.questions.map((question, index) => (
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
                    const isUserAnswer = letter === userAnswers[index];
                    
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
        <h1 className="page-title">AI-Powered Practice Test Generator</h1>
        <p className="page-subtitle">
          Upload your study materials and generate customized practice tests with AI
        </p>
      </div>

      <div className="page-content">
        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            color: '#721c24',
            maxWidth: '800px',
            margin: '0 auto 20px auto'
          }}>
            {error}
          </div>
        )}

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Single Column - Simplified Configuration */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '40px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '2px solid #87ceeb'
          }}>
            <h2 style={{ 
              color: '#4682b4', 
              marginBottom: '30px', 
              fontSize: '28px', 
              fontWeight: 'bold',
              borderBottom: '2px solid #ffd700',
              paddingBottom: '15px',
              textAlign: 'center'
            }}>
              Generate Practice Test
            </h2>

            {/* File Upload */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                color: '#4682b4', 
                fontWeight: '600',
                fontSize: '18px'
              }}>
                📄 Upload PDF Document *
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #87ceeb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  color: '#4682b4'
                }}
              />
              {uploadedFile && (
                <p style={{ color: '#4682b4', fontSize: '14px', marginTop: '10px' }}>
                  ✅ Selected: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Difficulty Selection */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                color: '#4682b4', 
                fontWeight: '600',
                fontSize: '18px'
              }}>
                🎯 Difficulty Level
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #87ceeb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  color: '#4682b4'
                }}
              >
                <option value="">Mixed (Default)</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            {/* Question Count */}
            <div style={{ marginBottom: '40px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                color: '#4682b4', 
                fontWeight: '600',
                fontSize: '18px'
              }}>
                📊 Number of Questions: {questionCount}
              </label>
              <input
                type="range"
                min="5"
                max="25"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  accentColor: '#ffd700'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4682b4', marginTop: '8px' }}>
                <span>5</span>
                <span>25</span>
              </div>
            </div>

            {/* Custom Instructions */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                color: '#4682b4', 
                fontWeight: '600',
                fontSize: '18px'
              }}>
                💡 Custom Instructions (Optional)
              </label>
              <textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Enter specific instructions for your practice test. Examples:
• Focus on chapter 3 concepts
• Include more questions about memory management
• Emphasize practical applications
• Create questions about specific algorithms
• Focus on theoretical concepts only"
                rows={4}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #87ceeb',
                  borderRadius: '10px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  color: '#4682b4',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
              <p style={{ 
                fontSize: '14px', 
                color: '#666', 
                marginTop: '8px',
                fontStyle: 'italic'
              }}>
                💡 Pro tip: Be specific about topics, concepts, or question types you want to focus on
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateTest}
              disabled={!uploadedFile || isGenerating}
              style={{
                width: '100%',
                padding: '20px',
                backgroundColor: (!uploadedFile || isGenerating) ? '#ccc' : '#4682b4',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: (!uploadedFile || isGenerating) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                if (uploadedFile && !isGenerating) {
                  e.currentTarget.style.backgroundColor = '#ffd700';
                  e.currentTarget.style.color = '#4682b4';
                }
              }}
              onMouseOut={(e) => {
                if (uploadedFile && !isGenerating) {
                  e.currentTarget.style.backgroundColor = '#4682b4';
                  e.currentTarget.style.color = 'white';
                }
              }}
            >
              {isGenerating ? '🤖 Generating Test...' : '🚀 Generate AI Practice Test'}
            </button>

            {/* Instructions */}
            <div style={{ 
              marginTop: '30px',
              padding: '25px',
              backgroundColor: '#e7f3ff',
              borderRadius: '10px',
              border: '1px solid #bee5eb'
            }}>
              <h4 style={{ color: '#4682b4', marginBottom: '15px', fontSize: '18px' }}>📖 How it works:</h4>
              <ol style={{ color: '#666', fontSize: '16px', paddingLeft: '20px', lineHeight: '1.6' }}>
                <li>Upload a PDF of your study material (lecture notes, textbook, etc.)</li>
                <li>Choose your preferred difficulty level (optional)</li>
                <li>Set the number of questions you want</li>
                <li>AI will analyze your PDF and generate relevant questions</li>
                <li>Take the practice test and get instant feedback with explanations</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeTests; 