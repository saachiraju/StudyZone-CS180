import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/dependencies/AuthContext';
import {twMerge} from "tailwind-merge";
import { DM_Sans } from "next/font/google";
export const metadata = {
  title: 'Vercel Blob Starter',
  description: 'A simple Next.js app with Vercel Blob for image uploads',
}
const dmSans = DM_Sans({ subsets: ["latin"] });
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={twMerge(dmSans.className, "antialiased bg-[#EAEEFE]")}>
        <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  )
}
