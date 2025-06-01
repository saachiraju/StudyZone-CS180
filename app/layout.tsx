import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/dependencies/AuthContext';
import { UserAvatar } from '@/components/UserAvatar';

export const metadata = {
  title: 'Vercel Blob Starter',
  description: 'A simple Next.js app with Vercel Blob for image uploads',
}

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
      <body className={inter.variable}>
        <AuthProvider>
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* User Avatar - Top Right Corner */}
            <div style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1000
            }}>
              <UserAvatar />
            </div>
            
            {/* Main Content */}
            {children}
          </div>
        </AuthProvider>
        </body>
    </html>
  )
}
