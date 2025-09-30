// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="agd-partner-manual-verification" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: 'linear-gradient(-45deg, #f8fafc, #ffffff, #f1f5f9, #ffffff)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite',
          minHeight: '100vh'
        }}
      >
        <nav 
          className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b shadow-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderColor: 'rgba(255, 255, 255, 0.6)'
          }}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo - Mobile Optimized */}
              <Link href="/" className="flex items-center">
                <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight -mr-1 sm:-mr-1.5">
                  <span className="text-gray-900">Stay</span>
                  <span style={{ color: '#1df9ff' }}>Genie</span>
                </span>
                <Image 
                  src="/images/staygenielogo.png" 
                  alt="StayGenie Logo" 
                  width={32} 
                  height={32} 
                  className="inline-block w-[32px] h-[32px] sm:w-[38px] sm:h-[38px]"
                />
              </Link>

              {/* Navigation - Mobile Optimized */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/Blog" 
                  className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors"
                >
                  Blog
                </Link>

              </div>
            </div>
          </div>
        </nav>
        <div className="pt-16 sm:pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}