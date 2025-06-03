'use client';

import Image from 'next/image';
import { useRef } from 'react';
const flashcards = [
  {
    title: 'Learn',
    bgColor: 'bg-sky-300',
    image: '/grades.avif',
    alt: 'Learn flashcard',
  },
  {
    title: 'Study Guides',
    bgColor: 'bg-pink-300',
    image: '/pintura.avif',
    alt: 'Study Guides flashcard',
  },
  {
    title: 'Flashcards',
    bgColor: 'bg-indigo-700',
    image: '/greek.avif',
    alt: 'Flashcards',
  },
  {
    title: 'Practice Tests',
    bgColor: 'bg-orange-300',
    image: '/superior.avif',
    alt: 'Practice Tests',
  },
];

// export const FlashcardCarousel = () => {
//   return (
//     <section className="bg-gray-50 py-12">
//       <div className="max-w-screen-lg mx-auto overflow-x-auto no-scrollbar">
//         <div className="flex justify-center gap-6 px-6 w-max">
//           {flashcards.map((card, index) => (
//             <div
//               key={index}
//               className={`${card.bgColor} flex-shrink-0 w-80 h-[28rem] rounded-3xl shadow-xl p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105`}
//             >
//               <h2 className="font-bold text-2xl text-black mb-4">{card.title}</h2>
//               <div className="bg-white rounded-xl overflow-hidden w-full h-64 flex items-center justify-center">
//                 <Image
//                   src={card.image}
//                   alt={card.alt}
//                   width={220}
//                   height={220}
//                   className="object-contain"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
export const FlashcardCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction:string) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 320; // Adjust this for how far you want to scroll
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white py-12 relative">
      <div className="max-w-screen-lg mx-auto px-6 relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
          aria-label="Scroll Left"
        >
          ←
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar w-full"
        >
          {flashcards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} flex-shrink-0 w-80 h-[28rem] rounded-3xl shadow-xl p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105`}
            >
              <h2 className="font-bold text-2xl text-black mb-4">{card.title}</h2>
              <div className="bg-white rounded-xl overflow-hidden w-full h-64 flex items-center justify-center">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={220}
                  height={220}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
          aria-label="Scroll Right"
        >
          →
        </button>
      </div>
    </section>
  );
};