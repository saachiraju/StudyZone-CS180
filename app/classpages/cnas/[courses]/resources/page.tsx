'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './styles.css';
import UploaderComponent from '@/components/uploader';
import { Toaster } from '@/components/toaster';
import { useParams } from 'next/navigation';

type ImageEntry = {
  label: string;
  url: string;
};

export default function Home() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const params = useParams();
  const courseId = params?.courses?.toString();

  useEffect(() => {
    if (!courseId) return;
    fetch(`/api/blobs?folder=${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.urls && Array.isArray(data.urls)) {
          const parsed = data.urls.map((url: string) => ({
            label: url.substring(56, url.lastIndexOf('.') - 31)
              .replaceAll('%', ' ')
              .replaceAll('-', ' ')
              .replace(courseId + '/', ''),
            url,
          }));
          setImages(parsed);
        } else {
          console.warn('No URLs found in response:', data);
          setImages([]);
        }
      })
      .catch((err) => {
        console.error('Failed to load blob links:', err);
        setImages([]);
      });
  }, [courseId]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Toaster />
      
      {/* Back Button */}
      <Link 
        href="/cnas"
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: '#4682b4',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 15px rgba(70, 130, 180, 0.3)',
          transition: 'all 0.3s ease',
          border: '2px solid transparent',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)';
          e.currentTarget.style.color = '#2c5282';
          e.currentTarget.style.borderColor = '#4682b4';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#4682b4';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span style={{ fontSize: '16px' }}>←</span> Back to CNAS
      </Link>

      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        {courseId} Resources
      </h1>

      <div className="boxcontainer">
        <div className="uploader-container">
          {courseId && <UploaderComponent folder={courseId} />}
        </div>

        {images.length === 0 ? (
          <p className="text-gray-500 text-lg">No resources available.</p>
        ) : (
          images.map((img, index) => {
            const ext = img.url.split('.').pop()?.toLowerCase() || '';
            const fallbackImage =
              ext === 'pdf'
                ? '/pdf-icon.png'
                : ['ppt', 'pptx'].includes(ext)
                ? '/ppt-icon.png'
                : ['doc', 'docx'].includes(ext)
                ? '/doc-icon.png'
                : ext === 'txt'
                ? '/txt-icon.png'
                : ext === 'ipynb'
                ? '/ipynb-icon.png'
                : ext === 'cpp'
                ? '/cpp-icon.png'
                : ext === 'cs'
                ? '/cs-icon.png'
                : ext === 'css'
                ? '/css-icon.png'
                : ext === 'py'
                ? '/py-icon.png'
                : ext === 'java'
                ? '/java-icon.png'
                : ext === 'js'
                ? '/js-icon.png'
                : ext === 'ts'
                ? '/ts-icon.png'
                : ext === 'tsx'
                ? '/ts-icon.png'
                : ext === 'html'
                ? '/html-icon.png'
                : img.url;

            return (
              <div key={index} className="boxmodule">
                <div className="label">{img.label}</div>
                <Link href={img.url} target="_blank">
                  <Image
                    src={fallbackImage}
                    alt={img.label}
                    width={100}
                    height={80}
                    className="image"
                    style={{
                      objectFit: 'cover',
                      width: ['pdf', 'ppt', 'pptx', 'docx', 'doc', 'txt', 'ipynb', 'cpp', 'cs', 'css', 'py', 'java', 'js', 'ts', 'html', 'tsx'].includes(ext)
                        ? '80%'
                        : '100%',
                      height: ['pdf', 'ppt', 'pptx', 'docx', 'doc', 'txt', 'ipynb', 'cpp', 'cs', 'css', 'py', 'java', 'js', 'ts', 'html', 'tsx'].includes(ext)
                        ? '80%'
                        : '85%',
                      margin: '0 auto',
                    }}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>

      <div className="text-xs text-gray-500 mt-4 space-x-2">
        <a href="https://www.flaticon.com/free-icons/doc" title="doc icons">
          Doc icons
        </a>
        <a href="https://www.flaticon.com/free-icons/pdf" title="pdf icons">
          Pdf icons
        </a>
        <a href="https://www.flaticon.com/free-icons/txt" title="txt icons">
          Txt icons
        </a>
        <a href="https://www.flaticon.com/free-icons/ppt" title="ppt icons">
          Ppt icons
        </a>
        <a href="https://www.flaticon.com/free-icons/ipynb" title="ipynb icons">
          Ipynb icons
        </a>
        <a href="https://www.flaticon.com/free-icons/c-" title="c++ icons">
          C++ icons
        </a>
        <a href="https://www.flaticon.com/free-icons/c-" title="c++ icons">
          C++ icons
        </a>
        <a href="https://www.flaticon.com/free-icons/css" title="css icons">
          Css icons
        </a>
        <a href="https://www.flaticon.com/free-icons/python" title="python icons">
          Python icons
        </a>
        <a href="https://www.flaticon.com/free-icons/java-script" title="java script icons">
          Java icons
        </a>
        <a href="https://www.flaticon.com/free-icons/javascript" title="javascript icons">
          Javascript icons
        </a>
        <a href="https://www.flaticon.com/free-icons/typescript" title="typescript icons">
          Typescript icons
        </a>
        <a href="https://www.flaticon.com/free-icons/html" title="html icons">
          Html icons
        </a>
      </div>
    </main>
  );
}
