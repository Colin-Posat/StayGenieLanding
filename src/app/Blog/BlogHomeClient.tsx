'use client'

import React from "react"
import { useState, useEffect } from "react"
import Image from 'next/image'
import Link from 'next/link'

// ============================================================================
// INLINE STYLES
// ============================================================================
const inlineStyles = `
  :root {
    --background: #FFFFFF;
    --foreground: oklch(0.25 0.02 50);
    --card: #FFFFFF;
    --card-foreground: oklch(0.25 0.02 50);
    --muted: oklch(0.96 0.01 85);
    --muted-foreground: oklch(0.5 0.02 50);
    --accent: oklch(0.87 0.17 195);
    --accent-foreground: oklch(0.15 0.02 195);
    --border: oklch(0.92 0.01 85);
    --radius: 1.25rem;
  }

  * {
    border-color: var(--border);
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out;
  }

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
    }
    33% {
      transform: translate(30px, -30px);
    }
    66% {
      transform: translate(-20px, 20px);
    }
  }

  .animate-float {
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float-slow {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(20px, 20px);
    }
  }

  .animate-float-slow {
    animation: float-slow 15s ease-in-out infinite;
  }
`

// Utility function for className merging
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ")
}

// ============================================================================
// BUTTON COMPONENT
// ============================================================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "lg"
  children: React.ReactNode
}

function Button({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2"
  
  const variantStyles = {
    default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
    outline: "border-2 bg-transparent hover:bg-[var(--muted)]"
  }
  
  const sizeStyles = {
    default: "h-9 px-4 py-2",
    lg: "h-14 px-8 text-base"
  }
  
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

// ============================================================================
// HEADER COMPONENT
// ============================================================================
function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled ? "shadow-lg" : ""
      )}
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: scrolled ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight -mr-1 sm:-mr-1.5">
              <span className="text-gray-900">Stay</span>
              <span style={{ color: "#1df9ff" }}>Genie</span>
            </span>
            <Image
              src="/images/staygenielogo.png"
              alt="StayGenie Logo"
              width={32}
              height={32}
              className="inline-block w-[28px] h-[28px] sm:w-[32px] sm:h-[32px]"
            />
          </a>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors"
            >
              Home
            </a>
            <a
              href="/Blog"
              className="text-gray-600 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors"
            >
              Blog
            </a>
            <Button 
              className="rounded-full px-4 sm:px-6 font-medium text-xs sm:text-sm h-8 sm:h-10" 
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
              onClick={() => window.open('https://apps.apple.com/us/app/staygenie-ai-hotel-finder/id6754895816', '_blank')}
            >
              Download App
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden py-0">
      {/* Enhanced turquoise bubble background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large bubbles */}
        <div 
          className="absolute top-10 left-[5%] w-64 h-64 rounded-full animate-float" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.08)',
            filter: 'blur(60px)',
          }} 
        />
        <div 
          className="absolute top-16 right-[8%] w-48 h-48 rounded-full animate-float-slow" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.12)',
            filter: 'blur(50px)',
            animationDelay: '2s'
          }} 
        />
        
        {/* Subtle wave pattern */}
        <svg 
          className="absolute bottom-0 left-0 right-0 w-full h-24" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ color: 'rgba(29, 249, 255, 0.06)' }}
        >
          <path 
            fill="currentColor" 
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Headline */}
        <div className="max-w-3xl mx-auto mb-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight animate-fade-in-up" style={{ color: 'var(--foreground)', lineHeight: '1.2' }}>
            <span className="block whitespace-nowrap" style={{ marginBottom: '0.1rem' }}>Curated hotel guides</span>
            <span className="relative inline-block whitespace-nowrap">
              <span style={{ color: '#1df9ff' }}>for every city</span>
              <svg className="absolute -bottom-1 left-0 right-0 w-full h-2 md:h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" stroke="#1df9ff" strokeWidth="3" fill="none" opacity="0.4" />
              </svg>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-base md:text-lg max-w-2xl mx-auto animate-fade-in-up leading-relaxed text-balance" style={{ color: 'var(--muted-foreground)', animationDelay: '100ms' }}>
          Discover the perfect hotel for any occasion. Handpicked by Colin, founder of StayGenie.
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// CITY CARD COMPONENT
// ============================================================================
interface CityCardProps {
  city: string
  count: number
  index: number
}

function CityCard({ city, count, index }: CityCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cityName = city.replace(/-/g, ' ')

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <Link
      href={`/Blog/${city}`}
      className="group relative block"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease-out',
      }}
    >
      <div
        className="relative p-8 rounded-3xl border-2 transition-all duration-300 hover:scale-[1.02]"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.boxShadow = '0 20px 40px color-mix(in srgb, var(--accent) 10%, transparent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* City name */}
        <h3 className="text-2xl font-semibold mb-2 group-hover:text-[#1df9ff] transition-colors capitalize" style={{ color: 'var(--foreground)' }}>
          {cityName}
        </h3>
        
        {/* Guide count */}
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {count} {count === 1 ? 'guide' : 'guides'} available
        </p>

        {/* Arrow icon */}
        <div className="absolute top-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}>
          <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

// ============================================================================
// FOOTER COMPONENT
// ============================================================================
function Footer() {
  return (
    <footer className="py-16 px-6 border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gray-900">Stay</span>
              <span style={{ color: '#1df9ff' }}>Genie</span>
            </span>
            <Image
              src="/images/staygenielogo.png"
              alt="StayGenie Logo"
              width={38}
              height={38}
              className="inline-block w-[38px] h-[38px]"
            />
          </div>

          <nav className="flex items-center gap-8">
            <a
              href="/support"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Support
            </a>
            <a
              href="/privacy-policy"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Terms of Service
            </a>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            &copy; {new Date().getFullYear()} StayGenie · Making hotel search magical
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN BLOG HOME CLIENT COMPONENT
// ============================================================================
interface CityWithCount {
  city: string
  count: number
}

interface BlogHomeClientProps {
  cities: CityWithCount[]
}

export function BlogHomeClient({ cities }: BlogHomeClientProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCities = cities.filter(({ city }) =>
    city.replace(/-/g, ' ').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      <main className="min-h-screen pt-16 sm:pt-20" style={{ backgroundColor: 'var(--background)' }}>
        <Header />
        <HeroSection />
        
        {/* Content Section */}
        <section className="py-0 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" 
                  style={{ color: 'var(--muted-foreground)' }}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-gray-900 placeholder-gray-400 transition-all focus:outline-none"
                  style={{
                    borderColor: 'var(--border)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.boxShadow = '0 0 0 4px color-mix(in srgb, var(--accent) 10%, transparent)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
              
              {filteredCities.length > 0 && (
                <p className="mt-4 text-sm text-center" style={{ color: 'var(--muted-foreground)' }}>
                  {filteredCities.length} {filteredCities.length === 1 ? 'city' : 'cities'} found
                </p>
              )}
            </div>

            {/* Cities Grid */}
            {filteredCities.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCities.map(({ city, count }, index) => (
                  <CityCard key={city} city={city} count={count} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--muted) 50%, transparent)' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--muted-foreground)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    {searchTerm ? `No cities found matching "${searchTerm}"` : 'No guides available yet'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    {searchTerm ? 'Try adjusting your search' : 'Check back soon for new destinations'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}