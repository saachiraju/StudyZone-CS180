import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/dependencies/AuthContext';
import {twMerge} from "tailwind-merge";
import { DM_Sans } from "next/font/google";
import { Header } from '@/sections/Header';

export const metadata = {
  title: 'StudyZone',
  description: 'Study',
}
const dmSans = DM_Sans({ subsets: ["latin"] });
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(dmSans.className, "antialiased bg-[#EAEEFE]")}>
        <AuthProvider>
          {/* <Header/> */}
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Main Content */}
            {children}
          </div>
        </AuthProvider>
        </body>
    </html>
  );
}


