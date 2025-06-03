'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/dependencies/firebase'; // adjust path
//import { useRouter } from 'next/navigation';

import { useAuth } from '@/dependencies/AuthContext';
import { UserAvatar } from '@/components/UserAvatar';

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
      <div className="w-full flex justify-between items-center py-3 pl-4 pr-0 relative">

        {/* Left */}
        <div className="flex items-center gap-6">
          <span className="text-lg font-semibold text-white">
            <Link href={`/`} className="home-button">
              StudyZone
            </Link>
            </span>

          <div className="flex items-center gap-4 text-sm">
            {/* Subjects Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSubjectsOpen(!subjectsOpen)}
                className="flex items-center gap-1 hover:underline"
              >
                Colleges <ChevronDown className="w-4 h-4" />
              </button>

              {subjectsOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2 z-50">
                  <a href="/bcoe" className="block px-4 py-2 hover:bg-gray-100">BCOE</a>
                  <a href="/cnas" className="block px-4 py-2 hover:bg-gray-100">CNAS</a>
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
                  <a href="/practice-tests" className="block px-4 py-2 hover:bg-gray-100">Practice Tests</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right - User Authentication Section */}
        <div className="flex items-center">
          {currentUser ? (
            // Show welcome message and user avatar when logged in
            <div className="flex items-center gap-3 pr-4">
              <span className="text-white text-sm font-medium">
                Welcome, {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
              </span>
              <UserAvatar />
            </div>
          ) : (
            // Show only "Log in" button when not logged in
            <div className="flex items-center pr-4">
              <button 
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition text-sm font-medium" 
                onClick={handleGoogleSignIn}
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};