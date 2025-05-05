"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './styles.css';

type ImageEntry = {
  label: string;
  url: string;
};

export default function Home() {
  const [images, setImages] = useState<ImageEntry[]>([]);

  useEffect(() => {
    fetch('/api/blobs') // calling your serverless function
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.urls.map((url: string, i: number) => ({
          label: `Image ${i + 1}`,
          url,
        }));
        setImages(parsed);
      })
      .catch((err) => console.error('Failed to load blob links:', err));
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        StudyZone Demo
      </h1>

      <div className="boxcontainer">
        {images.map((img, index) => (
          <div key={index} className="boxmodule">
            {img.label}
            <Link href={img.url}>
              <Image
                src={img.url}
                alt={img.label}
                width={100}
                height={80}
                className="image"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '85%',
                }}
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
