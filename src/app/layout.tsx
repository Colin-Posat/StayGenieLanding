// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "StayGenie - AI Hotel Finder",
  description:
    "Find your perfect hotel in seconds with AI-powered search. Just describe what you want in plain English. Download now on iOS - free forever.",
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
    title: "StayGenie - AI Hotel Finder",
    description: "Find your perfect hotel in seconds with AI-powered search. Available now on iOS.",
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
        {/* Google Analytics */}
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

        {/* Extra meta tags */}
        <meta name="agd-partner-manual-verification" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1df9ff" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "StayGenie",
              "alternateName": "Stay Genie",
              "url": "https://www.staygenie.app",
              "logo": "https://www.staygenie.app/images/staygenielogo.png",
              "sameAs": [
                "https://instagram.com/staygenieapp",
                "https://www.staygenie.app"
              ]
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Page content - no navbar wrapper needed since Header is in page.tsx */}
        {children}

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
}