import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Function } from "@/sections/Function"
import Uploader from "@/components/uploader";
import { FlashcardCarousel } from "@/sections/Flashcards";
export default function Home() {
  return (
    <>
    <Hero />  
    <FlashcardCarousel/>
    {/* <Uploader/> */}
    {/* <Function/> */}
 
  </>
  );
}



// "use client";

// import Link from 'next/link'
// import Uploader from '@/components/uploader'
// import { useState } from 'react';
// import { ChevronDown } from 'lucide-react';
// export default function Home() {

//   const [subjectsOpen, setSubjectsOpen] = useState(false);
//   const [toolsOpen, setToolsOpen] = useState(false);
//   return (
//     <>
//     {/* // <main className="relative flex min-h-screen flex-col items-center justify-center bg-black"> */}
//       <header className="sticky top-0 z-50 bg-black text-white text-xl">
//         <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 relative">

//         {/* Left */}
//         <div className="flex items-center gap-6">
//           <span className="text-lg font-semibold text-white">StudyHub</span>

//           <div className="flex items-center gap-4 text-sm">
//             {/* Subjects Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setSubjectsOpen(!subjectsOpen)}
//                 className="flex items-center gap-1 hover:underline"
//               >
//                 Subjects <ChevronDown className="w-4 h-4" />
//               </button>

//               {subjectsOpen && (
//                 <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2 z-50">
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">Math</a>
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">Science</a>
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">History</a>
//                 </div>
//               )}
//             </div>

//             {/* Study Tools Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setToolsOpen(!toolsOpen)}
//                 className="flex items-center gap-1 hover:underline"
//               >
//                 Study Tools <ChevronDown className="w-4 h-4" />
//               </button>

//               {toolsOpen && (
//                 <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">Flashcards</a>
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">Quizzes</a>
//                   <a href="#" className="block px-4 py-2 hover:bg-gray-100">Practice Tests</a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-4 text-sm">
//           <a href="#" className="hover:underline">Login</a>
//           <a href="#" className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition">
//             Sign Up
//           </a>
//         </div>
//       </div>
//     </header>

//     <section className="bg-white text-black py-20 px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             Master Your Subjects with <span className="text-blue-600">StudyZone</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//             Access personalized study tools, upload your notes, and learn more efficiently—all in one place.
//           </p>
  
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <a
//               href="#"   
//               className="bg-black text-white px-6  py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition"
//             >
//               Get Started
//             </a>
//             <a
//               href="#" 
//               className="border border-black text-black px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition"
//             >
//               Learn More
//             </a>
//           </div>
//         </div>
//       </section>

//       <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
//         <Uploader />
//       </div>
//       <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
//         <Link
//           href="https://vercel.com/blob"
//           className="font-medium underline underline-offset-4 hover:text-black transition-colors"
//         >
//           Vercel Blob
//         </Link>{' '}
//         demo. Built with{' '}
//         <Link
//           href="https://nextjs.org/docs"
//           className="font-medium underline underline-offset-4 hover:text-black transition-colors"
//         >
//           Next.js App Router
//         </Link>
//         .
//       </p>
//     {/* //</main> */}
//     </>
//   );
// }
