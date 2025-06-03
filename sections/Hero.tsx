'use client';

import { useAuth } from '@/dependencies/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/dependencies/firebase';
type HeroProps = {
  handleGoogleSignIn?: () => void;
};

export const Hero = ({ handleGoogleSignIn }: HeroProps) => {
  const { currentUser } = useAuth();

  const defaultGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in:", user);
    } catch (err) {
      console.error("Google Sign-in error:", err);
    }
  };

  return (
  <section
    className="relative py-20 px-6 text-black overflow-hidden"
  >
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-110"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')`,
      }}
    ></div>

    {/* Overlay to soften blur */}
    <div className="absolute inset-0 bg-white/80"></div>
      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Master Your Subjects with <span className="text-blue-600">StudyZone</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Access personalized study tools, upload your notes, and learn more efficiently—all in one place.
        </p>

        {currentUser ? (
          <div className="flex justify-center">
            <a href="/nav" className="bg-black text-white px-8 py-4 rounded-md text-2xl font-bold hover:bg-gray-800 transition transform hover:scale-105 shadow-lg">
              Go to Dashboard
            </a>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleGoogleSignIn ?? defaultGoogleSignIn}
              className="bg-black text-white px-8 py-4 rounded-md text-xl font-semibold hover:bg-gray-800 transition transform hover:scale-105 shadow-lg flex items-center gap-3"
            >
              {/* Google SVG Icon */}
              Get Started
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
// export const Hero = () => {
//   const { currentUser } = useAuth();

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       console.log("User signed in:", user);
//     } catch (err) {
//       console.error("Google Sign-in error:", err);
//     }
//   };

//   return (
//     <section className="bg-white text-black py-20 px-6">
//       <div className="max-w-6xl mx-auto text-center">
//         <h1 className="text-4xl md:text-6xl font-bold mb-6">
//           Master Your Subjects with <span className="text-blue-600">StudyZone</span>
//         </h1>
//         <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//           Access personalized study tools, upload your notes, and learn more efficiently—all in one place.
//         </p>

//         {currentUser ? (
//           // Show only "Go to Dashboard" when user is logged in
//           <div className="flex justify-center">
//             <a
//               href="/nav"    
//               className="bg-black text-white px-8 py-4 rounded-md text-2xl font-bold hover:bg-gray-800 transition transform hover:scale-105 shadow-lg"
//             >
//               Go to Dashboard
//             </a>
//           </div>
//         ) : (
//           // Show only "Get Started" with Google login when user is not logged in
//           <div className="flex justify-center">
//             <button
//               onClick={handleGoogleSignIn}
//               className="bg-black text-white px-8 py-4 rounded-md text-xl font-semibold hover:bg-gray-800 transition transform hover:scale-105 shadow-lg flex items-center gap-3"
//             >
//               <svg className="w-6 h-6" viewBox="0 0 24 24">
//                 <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//               Get Started
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };
  