'use client';

import Image from 'next/image';

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

export const FlashcardCarousel = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-screen-lg mx-auto overflow-x-auto no-scrollbar">
        <div className="flex justify-center gap-6 px-6 w-max">
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
      </div>
    </section>
  );
};
