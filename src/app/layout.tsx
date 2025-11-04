// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Proper SEO & favicon metadata for Google
export const metadata = {
  metadataBase: new URL("https://www.staygenie.app"),
  title: "StayGenie - Hotel Search That Actually Gets You",
  description:
    "AI learns your preferences to deliver personalized hotel recommendations. Always free. Always smart.",
  themeColor: "#1df9ff",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "StayGenie - Hotel Search That Actually Gets You",
    description: "Discover AI-powered hotel matches tailored to your vibe.",
    url: "https://www.staygenie.app",
    siteName: "StayGenie",
    images: [
      {
        url: "/images/staygenielogo.png",
        width: 512,
        height: 512,
        alt: "StayGenie Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (Global site tag) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3C4PDTEN4G"
        />
        <Script id="ga-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3C4PDTEN4G');
          `}
        </Script>

        {/* Extra meta tags for browser + Google favicon detection */}
        <meta name="agd-partner-manual-verification" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1df9ff" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background:
            "linear-gradient(-45deg, #f8fafc, #ffffff, #f1f5f9, #ffffff)",
          backgroundSize: "400% 400%",
          animation: "gradient-shift 15s ease infinite",
          minHeight: "100vh",
        }}
      >
        <nav
          className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderColor: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight -mr-1 sm:-mr-1.5">
                  <span className="text-gray-900">Stay</span>
                  <span style={{ color: "#1df9ff" }}>Genie</span>
                </span>
                <Image
                  src="/images/staygenielogo.png"
                  alt="StayGenie Logo"
                  width={32}
                  height={32}
                  className="inline-block w-[32px] h-[32px] sm:w-[38px] sm:h-[38px]"
                />
              </Link>

              {/* Navigation */}
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

        {/* Page content */}
        <div className="pt-16 sm:pt-20">{children}</div>

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
}