import Image from 'next/image'
import Link from 'next/link'
import ExpandingArrow from '@/components/expanding-arrow'
import Uploader from '@/components/uploader'
import { Toaster } from '@/components/toaster'

export default function Home() {
  const imageUrl = 'https://xzth7tov0hhmtg0y.public.blob.vercel-storage.com/6A91D331-5C35-41B6-A9FB-567007DDE0A2-rXgfp4xEuMwWJ8faabvZ5Dr6rk2aCx.jpeg';

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Toaster />
      <Link
        href="https://vercel.com/templates/next.js/blob-starter"
        className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>Deploy your own to Vercel</p>
        <ExpandingArrow />
      </Link>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        StudyZone Demo
      </h1>
      
      {/* Show the Blob image here */}
      <div className="mt-10">
      <Link
        href={imageUrl}>
        <Image
          src={imageUrl}
          alt="Uploaded Blob"
          width={600}
          height={200}
          className="rounded shadow-lg"
        />
        </Link>
      </div>
    </main>
  );
}
