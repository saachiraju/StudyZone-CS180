import Image from 'next/image'
import Link from 'next/link'
import ExpandingArrow from '@/components/expanding-arrow'
import Uploader from '@/components/uploader'
import { Toaster } from '@/components/toaster'
import './styles.css';

export default function Home() {
  const imageUrl = 'https://xzth7tov0hhmtg0y.public.blob.vercel-storage.com/6A91D331-5C35-41B6-A9FB-567007DDE0A2-rXgfp4xEuMwWJ8faabvZ5Dr6rk2aCx.jpeg';
  const imageUrl2 = 'https://xzth7tov0hhmtg0y.public.blob.vercel-storage.com/cooldog-6srcfvSDox1lHr6uetF4MMF1IWEbMq.jpg';
  const imageUrl3 = 'https://xzth7tov0hhmtg0y.public.blob.vercel-storage.com/gelding-bay-coat-UV6UjSVrEw33WZI8i8t5YxC4yxiI1M.webp';
  const imageUrl4 = 'https://xzth7tov0hhmtg0y.public.blob.vercel-storage.com/IMG_5355-ncDQ0PLW3u98EGFqR00GXpoWjEIMZB.jpeg'
  const imageUrl5 = 'https://xzth7tov0hhmtg0y.public.blob.vercel-storage.com/IMG_3889-GsY8JhKotBS2t9SG7cB9RMxc8cHznv.jpeg';
  const imageUrl6 = 'https://xzth7tov0hhmtg0y.public.blob.vercel-storage.com/nrealgif-tk9ZDX4fes9pniwbeKPBoEFQgcMJ0o.gif';
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        StudyZone Demo
      </h1>
      <div className="boxcontainer">
      <div className="boxmodule">
      <Link
        href={imageUrl}>
        <Image
          src={imageUrl}
          alt="Uploaded Blob"
          width={100}
          height={100}
          className="image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        </Link>
      </div>

      <div className="boxmodule">
      <Link
        href={imageUrl2}>
        <Image
          src={imageUrl2}
          alt="Uploaded Blob"
          width={100}
          height={100}
          className="image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        </Link>
      </div>
      <div className="boxmodule">
      <Link
        href={imageUrl4}>
        <Image
          src={imageUrl4}
          alt="Uploaded Blob"
          width={100}
          height={100}
          className="image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        </Link>
      </div>
      <div className="boxmodule">
      <Link
        href={imageUrl3}>
        <Image
          src={imageUrl3}
          alt="Uploaded Blob"
          width={100}
          height={100}
          className="image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        </Link>
      </div>
      <div className="boxmodule">
      <Link
        href={imageUrl5}>
        <Image
          src={imageUrl5}
          alt="Uploaded Blob"
          width={100}
          height={100}
          className="image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        </Link>
      </div>
      <div className="boxmodule">
      <Link
        href={imageUrl6}>
        <Image
          src={imageUrl6}
          alt="Uploaded Blob"
          width={100}
          height={100}
          className="image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        </Link>
      </div>
      <div className="boxmodule">
      <Link
        href={imageUrl2}>
        <Image
          src={imageUrl2}
          alt="Uploaded Blob"
          width={100}
          height={100}
          className="image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        </Link>
      </div>
      <div className="boxmodule">
      <Link
        href={imageUrl2}>
        <Image
          src={imageUrl2}
          alt="Uploaded Blob"
          width={100}
          height={100}
          className="image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        </Link>
      </div>

      </div>
      
    </main>
  );
}
