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
  let courseId = "CS010B";
  useEffect(() => {
    fetch(`/api/blobs?folder=${courseId}`) // calling your serverless function
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.urls.map((url: string, i: number) => ({
          label: url.substring(56, url.lastIndexOf('.') - 31).replaceAll('%', " ").replaceAll('-', ' ').replace(courseId + "/", ''),
          url,
        }));
        setImages(parsed);
      })
      .catch((err) => console.error('Failed to load blob links:', err));
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        {courseId} Resources
      </h1>
    {images.length === 0 ? (
      <p className="text-gray-500 text-lg">No resources available.</p>
    ) : (
      <div className="boxcontainer">
        {images.map((img, index) => {
          const fileExtension = img.url.split('.').pop()?.toLowerCase() || '';

    const fallbackImage =
    fileExtension === 'pdf'
    ? '/pdf-icon.png'
    : fileExtension === 'ppt' || fileExtension === 'pptx'
    ? '/ppt-icon.png'
    : fileExtension === 'docx' || fileExtension === 'doc'
    ? '/doc-icon.png'
    : fileExtension === 'txt'
    ? '/txt-icon.png'
    : img.url;

    return (
      <div key={index} className="boxmodule">
        <div className="label">{img.label}</div>
        <Link href={img.url} target="_blank">
          <Image
            src={fallbackImage}
            alt={img.label || 'File'}
            width={100}
            height={80}
            className="image"
            style={{
              objectFit: 'cover',
              width: fileExtension === 'pdf' || fileExtension === 'ppt' || fileExtension === 'docx' || fileExtension === 'txt' || fileExtension === 'pptx' || fileExtension === 'docx'
                ? '80%'
                : '100%',
              height: fileExtension === 'pdf' || fileExtension === 'ppt' || fileExtension === 'docx' || fileExtension === 'txt' || fileExtension === 'pptx' || fileExtension === 'docx'
                ? '80%'
                : '85%',

              margin: '0 auto',
            }}
          />
        </Link>
      </div>
    );
  })}
</div>
    )}

<a href="https://www.flaticon.com/free-icons/doc" title="doc icons">Doc icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/pdf" title="pdf icons">Pdf icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/txt" title="txt icons">Txt icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ppt" title="ppt icons">Ppt icons created by Freepik - Flaticon</a>
    </main>
  );
}
