'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/dependencies/firebase'; // adjust path
//import { useRouter } from 'next/navigation';

import { useAuth } from '@/dependencies/AuthContext';

export const Header = () => {
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const { currentUser } = useAuth();
  //const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in:", user);
      // Redirect to dashboard or homepage
      //router.push('/');
    } catch (err) {
      console.error("Google Sign-in error:");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black text-white text-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 relative">

        {/* Left */}
        <div className="flex items-center gap-6">
          <span className="text-lg font-semibold text-white">StudyHub</span>

          <div className="flex items-center gap-4 text-sm">
            {/* Subjects Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSubjectsOpen(!subjectsOpen)}
                className="flex items-center gap-1 hover:underline"
              >
                Subjects <ChevronDown className="w-4 h-4" />
              </button>

              {subjectsOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2 z-50">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Math</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Science</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">History</a>
                </div>
              )}
            </div>

            {/* Study Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex items-center gap-1 hover:underline"
              >
                Study Tools <ChevronDown className="w-4 h-4" />
              </button>

              {toolsOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Flashcards</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Quizzes</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">Practice Tests</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <header>
          {currentUser ? (
            <p>Welcome, {currentUser.displayName}</p>
          ) : (
            <p>Please sign in</p>
          )}
      </header>
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="hover:underline">Login</a>
          <button className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition" onClick={handleGoogleSignIn}>
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};