// src/app/page.tsx
"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import Image from 'next/image'
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Mic,
  MessageSquare,
  CheckCircle,
  Plane,
  Umbrella,
  Camera,
  Zap,
  MessageCircle,
  Brain,
  Shield,
  Gift,
  Lock,
  Star,
  Quote,
  Check,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  Palmtree
} from "lucide-react"

// ============================================================================
// INLINE STYLES
// ============================================================================
const inlineStyles = `
  :root {
    --background: #FFFFFF;
    --foreground: oklch(0.25 0.02 50);
    --card: #FFFFFF;
    --card-foreground: oklch(0.25 0.02 50);
    --popover: #FFFFFF;
    --popover-foreground: oklch(0.25 0.02 50);
    --primary: oklch(0.25 0.02 50);
    --primary-foreground: #FFFFFF;
    --secondary: oklch(0.95 0.02 85);
    --secondary-foreground: oklch(0.25 0.02 50);
    --muted: oklch(0.96 0.01 85);
    --muted-foreground: oklch(0.5 0.02 50);
    --accent: oklch(0.87 0.17 195);
    --accent-foreground: oklch(0.15 0.02 195);
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.577 0.245 27.325);
    --border: oklch(0.92 0.01 85);
    --input: oklch(0.95 0.02 85);
    --ring: oklch(0.75 0.15 195);
    --chart-1: oklch(0.75 0.15 195);
    --chart-2: oklch(0.7 0.12 60);
    --chart-3: oklch(0.65 0.15 30);
    --chart-4: oklch(0.6 0.1 145);
    --chart-5: oklch(0.8 0.08 85);
    --radius: 1.25rem;
  }

  .dark {
    --background: oklch(0.15 0.02 50);
    --foreground: oklch(0.95 0.01 85);
    --card: oklch(0.2 0.02 50);
    --card-foreground: oklch(0.95 0.01 85);
    --popover: oklch(0.2 0.02 50);
    --popover-foreground: oklch(0.95 0.01 85);
    --primary: oklch(0.95 0.01 85);
    --primary-foreground: oklch(0.15 0.02 50);
    --secondary: oklch(0.25 0.02 50);
    --secondary-foreground: oklch(0.95 0.01 85);
    --muted: oklch(0.25 0.02 50);
    --muted-foreground: oklch(0.6 0.02 50);
    --accent: oklch(0.87 0.17 195);
    --accent-foreground: oklch(0.15 0.02 195);
    --destructive: oklch(0.396 0.141 25.723);
    --destructive-foreground: oklch(0.637 0.237 25.331);
    --border: oklch(0.3 0.02 50);
    --input: oklch(0.25 0.02 50);
    --ring: oklch(0.75 0.15 195);
    --chart-1: oklch(0.75 0.15 195);
    --chart-2: oklch(0.7 0.12 60);
    --chart-3: oklch(0.65 0.15 30);
    --chart-4: oklch(0.6 0.1 145);
    --chart-5: oklch(0.8 0.08 85);
  }

  * {
    border-color: var(--border);
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
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

  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  .animate-bounce {
    animation: bounce 1s infinite;
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

  @keyframes fade-text {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    10% {
      opacity: 1;
      transform: translateY(0);
    }
    90% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  .animate-fade-text {
    animation: fade-text 4s ease-in-out infinite;
  }

  .text-balance {
    text-wrap: balance;
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
  width={32}  // Changed from 10
  height={32}  // Changed from 10
  className=" ml-2 inline-block w-[18px] h-[18px] sm:w-[25px] sm:h-[25px]"
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
// HERO COMPONENT
// ============================================================================
const exampleQueries = [
  "Cozy beachfront bungalow in Bali with sunrise yoga...",
  "Pet-friendly loft in Brooklyn with rooftop access...",
  "Luxury treehouse resort in Costa Rica with spa...",
  "Historic riad in Marrakech with traditional hammam...",
  "Romantic cliffside cave hotel in Santorini at sunset...",
  "Family villa in Tuscany with cooking classes and pool...",
]

function Hero() {
  const [queryIndex, setQueryIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQueryIndex((prev) => (prev + 1) % exampleQueries.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-0">
      {/* Enhanced turquoise bubble background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large bubbles */}
        <div 
          className="absolute top-20 left-[5%] w-96 h-96 rounded-full animate-float" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.08)',
            filter: 'blur(60px)',
          }} 
        />
        <div 
          className="absolute top-32 right-[8%] w-80 h-80 rounded-full animate-float-slow" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.12)',
            filter: 'blur(50px)',
            animationDelay: '2s'
          }} 
        />
        <div 
          className="absolute bottom-40 left-[15%] w-72 h-72 rounded-full animate-float" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.1)',
            filter: 'blur(55px)',
            animationDelay: '4s'
          }} 
        />
        <div 
          className="absolute top-1/2 right-[20%] w-64 h-64 rounded-full animate-float-slow" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.09)',
            filter: 'blur(45px)',
            animationDelay: '1s'
          }} 
        />
        
        {/* Medium bubbles */}
        <div 
          className="absolute top-1/3 left-[25%] w-48 h-48 rounded-full animate-float" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.15)',
            filter: 'blur(40px)',
            animationDelay: '3s'
          }} 
        />
        <div 
          className="absolute bottom-1/3 right-[10%] w-56 h-56 rounded-full animate-float-slow" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.11)',
            filter: 'blur(48px)',
            animationDelay: '5s'
          }} 
        />
        <div 
          className="absolute top-2/3 left-[40%] w-44 h-44 rounded-full animate-float" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.13)',
            filter: 'blur(42px)',
            animationDelay: '2.5s'
          }} 
        />
        
        {/* Small accent bubbles */}
        <div 
          className="absolute top-1/4 right-[30%] w-32 h-32 rounded-full animate-bounce" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.18)',
            filter: 'blur(30px)',
            animationDuration: '3s'
          }} 
        />
        <div 
          className="absolute bottom-1/4 left-[35%] w-36 h-36 rounded-full animate-bounce" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.14)',
            filter: 'blur(35px)',
            animationDuration: '4s',
            animationDelay: '1s'
          }} 
        />
        <div 
          className="absolute top-1/2 left-[60%] w-28 h-28 rounded-full animate-bounce" 
          style={{ 
            backgroundColor: 'rgba(29, 249, 255, 0.16)',
            filter: 'blur(32px)',
            animationDuration: '3.5s',
            animationDelay: '0.5s'
          }} 
        />
        
        {/* Subtle wave pattern */}
        <svg 
          className="absolute bottom-0 left-0 right-0 w-full h-64" 
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <div className="max-w-3xl mx-auto mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight animate-fade-in-up" style={{ color: 'var(--foreground)', fontSize: 'clamp(2.25rem, 6.5vw, 5rem)', lineHeight: '1.2' }}>
            <span className="block whitespace-nowrap" style={{ marginBottom: '0.1rem' }}>Hotel search that</span>
            <span className="relative inline-block whitespace-nowrap">
              <span style={{ color: '#1df9ff' }}>actually gets you</span>
              <svg className="absolute -bottom-2 left-0 right-0 w-full h-3 md:h-4" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" stroke="#1df9ff" strokeWidth="3" fill="none" opacity="0.4" />
              </svg>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-in-up leading-relaxed text-balance" style={{ color: 'var(--muted-foreground)', animationDelay: '100ms' }}>
          Skip the endless filters. Just tell us what you&apos;re looking for in
          plain English, and watch the magic happen.
        </p>

        {/* App-style search input preview */}
        <div className="max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="rounded-3xl border-2 p-5 shadow-lg" style={{ borderColor: '#1df9ff', backgroundColor: 'var(--card)', boxShadow: '0 10px 40px rgba(29, 249, 255, 0.1)' }}>
            <div className="flex items-start gap-3 mb-8 min-h-[3.5rem]">
              <Sparkles className="w-5 h-5 mt-1 shrink-0" style={{ color: 'color-mix(in srgb, var(--muted-foreground) 50%, transparent)' }} />
              <div className="text-left text-lg flex-1 relative" style={{ height: '3.5rem' }}>
                {exampleQueries.map((query, index) => (
                  <span
                    key={index}
                    className="absolute top-0 left-0 w-full"
                    style={{
                      color: 'var(--muted-foreground)',
                      opacity: queryIndex === index ? 1 : 0,
                      transform: queryIndex === index ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                    }}
                  >
                    {query}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ color: 'var(--muted-foreground)' }}>
                <Mic className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Button
            size="lg"
            className="rounded-full px-8 h-14 text-base font-medium group shadow-lg"
            style={{ backgroundColor: '#1df9ff', color: '#111827', boxShadow: '0 10px 40px rgba(29, 249, 255, 0.2)' }}
            onClick={() => window.open('https://apps.apple.com/us/app/staygenie-ai-hotel-finder/id6754895816', '_blank')}
          >
            Download Now - It's Free
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// HOW IT WORKS COMPONENT
// ============================================================================
const steps = [
  {
    number: "01",
    icon: MessageSquare,
    emoji: Plane,
    title: "Describe Your Dream Stay",
    description:
      "Tell us what you're looking for in your own words. Romantic getaway? Family adventure? Beach vibes? We understand it all.",
    color: "var(--accent)",
  },
  {
    number: "02",
    icon: Sparkles,
    emoji: Umbrella,
    title: "AI Works Its Magic",
    description:
      "Our AI instantly finds hotels that match your vibe, budget, and needs. No filters, no hassle - just perfect matches.",
    color: "var(--chart-2)",
  },
  {
    number: "03",
    icon: CheckCircle,
    emoji: Camera,
    title: "Book with Confidence",
    description:
      "Browse stunning options with all the details you need. Book directly with our trusted partners and start packing!",
    color: "var(--chart-4)",
  },
]

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number(entry.target.getAttribute("data-step"))
            setActiveStep(stepIndex)
          }
        })
      },
      { threshold: 0.5 }
    )

    const steps = sectionRef.current?.querySelectorAll("[data-step]")
    steps?.forEach((step) => observer.observe(step))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full" style={{ color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}>
            How it Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mt-6 tracking-tight text-balance" style={{ color: 'var(--foreground)' }}>
            Finding the perfect hotel
            <br className="hidden md:block" /> has never been this simple
          </h2>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              data-step={index}
              className="group relative p-8 rounded-3xl border-2 transition-all duration-500"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: activeStep === index ? 'var(--accent)' : 'var(--border)',
                transform: activeStep === index ? 'scale(1.02)' : 'scale(1)',
                boxShadow: activeStep === index ? '0 20px 40px color-mix(in srgb, var(--accent) 10%, transparent)' : 'none',
              }}
            >
              {/* Step number badge */}
              <div className="absolute -top-4 left-8 px-4 py-1 rounded-full text-sm font-bold text-white" style={{ backgroundColor: step.color }}>
                Step {step.number}
              </div>

              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mt-2 transition-all duration-500"
                style={{
                  backgroundColor: activeStep === index ? step.color : 'var(--muted)',
                  color: activeStep === index ? 'white' : 'var(--muted-foreground)',
                }}
              >
                <step.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                {step.title}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {step.description}
              </p>

              {/* Decorative travel icon */}
              <step.emoji 
                className="absolute bottom-6 right-6 w-8 h-8 transition-all duration-500"
                style={{ color: activeStep === index ? 'color-mix(in srgb, var(--accent) 40%, transparent)' : 'color-mix(in srgb, var(--muted) 20%, transparent)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURES COMPONENT
// ============================================================================
const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant results without waiting. Our AI processes your request in milliseconds.",
    color: "var(--accent)",
    bgColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
  },
  {
    icon: MessageCircle,
    title: "Natural Language",
    description: "Just type naturally like you're texting a friend who happens to be a travel expert.",
    color: "var(--chart-2)",
    bgColor: "color-mix(in srgb, var(--chart-2) 10%, transparent)",
  },
  {
    icon: Brain,
    title: "Smart Learning",
    description: "Our AI learns what you love and gets smarter with every search you make.",
    color: "var(--chart-4)",
    bgColor: "color-mix(in srgb, var(--chart-4) 10%, transparent)",
  },
  {
    icon: Shield,
    title: "100% Transparent",
    description: "Real prices, honest reviews, and transparent booking. No bait-and-switch, ever.",
    color: "var(--chart-3)",
    bgColor: "color-mix(in srgb, var(--chart-3) 10%, transparent)",
  },
  {
    icon: Gift,
    title: "Always Free",
    description: "No subscriptions, no premium tiers, no paywalls. Great hotel search for everyone.",
    color: "var(--accent)",
    bgColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your searches are yours alone. We never sell your data or share your preferences.",
    color: "var(--chart-2)",
    bgColor: "color-mix(in srgb, var(--chart-2) 10%, transparent)",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative p-8 rounded-3xl border-2 transition-all duration-700"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: feature.bgColor }}
      >
        <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
      </div>

      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
        {feature.title}
      </h3>
      <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {feature.description}
      </p>
    </div>
  )
}

function Features() {
  return (
    <section id="features" className="py-32 px-6" style={{ backgroundColor: 'color-mix(in srgb, var(--muted) 30%, transparent)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full" style={{ color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}>
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mt-6 tracking-tight text-balance" style={{ color: 'var(--foreground)' }}>
            The hotel search experience
            <br className="hidden md:block" /> you&apos;ve always dreamed of
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TESTIMONIAL COMPONENT
// ============================================================================
function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Decorative quote marks */}
        <Quote
          className="absolute -top-4 -left-4 w-24 h-24 transition-all duration-1000 rotate-180"
          style={{
            color: 'color-mix(in srgb, var(--accent) 20%, transparent)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-32px)',
          }}
        />

        <div
          className="relative text-center rounded-3xl p-10 md:p-16 transition-all duration-1000"
          style={{
            backgroundColor: 'var(--card)',
            borderWidth: '2px',
            borderColor: 'var(--border)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6" style={{ fill: 'var(--accent)', color: 'var(--accent)' }} />
            ))}
          </div>

          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed mb-10 text-balance" style={{ color: 'var(--foreground)' }}>
            &ldquo;Finally, a hotel search app that doesn&apos;t make me want to throw my
            phone out the window. I found the perfect hotel in under a minute!&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }}>
              <span className="text-xl font-semibold" style={{ color: 'var(--accent)' }}>S</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>Sarah M.</p>
              <p style={{ color: 'var(--muted-foreground)' }}>StayGenie User</p>
            </div>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div
          className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full blur-3xl transition-all duration-1000"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.5)',
            transitionDelay: '300ms',
          }}
        />
        <div
          className="absolute -top-8 -left-8 w-32 h-32 rounded-full blur-3xl transition-all duration-1000"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--chart-2) 10%, transparent)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.5)',
            transitionDelay: '500ms',
          }}
        />
      </div>
    </section>
  )
}

// ============================================================================
// CTA COMPONENT
// ============================================================================
function CTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden" style={{ backgroundColor: 'var(--accent)' }}>
          {/* Decorative wave */}
          <svg 
            className="absolute bottom-0 left-0 right-0 w-full h-32" 
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none"
            style={{ color: 'color-mix(in srgb, var(--accent-foreground) 5%, transparent)' }}
          >
            <path 
              fill="currentColor" 
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          
          {/* Floating palm tree */}
          <Palmtree className="absolute top-8 right-8 w-16 h-16" style={{ color: 'color-mix(in srgb, var(--accent-foreground) 10%, transparent)' }} />

          <div className="relative p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight mb-4 text-balance" style={{ color: 'var(--accent-foreground)' }}>
              Start finding your perfect stay today
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto text-balance" style={{ color: 'color-mix(in srgb, var(--accent-foreground) 80%, transparent)' }}>
              Download StayGenie now and experience the future of hotel booking. 
              Free forever, no signup required.
            </p>

            <Button
              size="lg"
              className="rounded-full px-10 h-16 text-lg font-medium group shadow-2xl"
              style={{ backgroundColor: 'var(--accent-foreground)', color: 'var(--accent)' }}
              onClick={() => window.open('https://apps.apple.com/us/app/staygenie-ai-hotel-finder/id6754895816', '_blank')}
            >
              Download on the App Store
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              <div
                className="flex items-center gap-2"
                style={{ color: 'color-mix(in srgb, var(--accent-foreground) 80%, transparent)' }}
              >
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Available now on iOS</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: 'color-mix(in srgb, var(--accent-foreground) 80%, transparent)' }}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">No signup required</span>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: 'color-mix(in srgb, var(--accent-foreground) 80%, transparent)' }}
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-medium">Free forever</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FAQ COMPONENT
// ============================================================================
const faqs = [
  {
    question: "Is StayGenie available now?",
    answer:
      "Yes! StayGenie is live and available for download on the App Store. Download it now and start finding your perfect hotel stays with AI-powered search.",
  },
  {
    question: "How is this different from other booking sites?",
    answer:
      "Unlike traditional booking sites that rely on endless filters and checkboxes, StayGenie uses advanced AI to understand natural language. Just describe what you want in plain English, and we'll find the perfect match. No more scrolling through hundreds of irrelevant results.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes! StayGenie is completely free to use with no subscriptions or hidden fees. We earn a small commission from our booking partners when you book through us, which allows us to keep the app free for everyone.",
  },
  {
    question: "What if I don't like the recommendations?",
    answer:
      "Our AI learns from your feedback. Simply tell it what you didn't like about a suggestion, and it will refine future results. The more you use StayGenie, the better it understands your preferences.",
  },
]

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div 
      className="border-2 rounded-2xl transition-all duration-300 overflow-hidden"
      style={{
        borderColor: isOpen ? 'var(--accent)' : 'var(--border)',
        backgroundColor: isOpen ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : 'var(--card)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-6 text-left group"
      >
        <span className="text-lg font-medium pr-8" style={{ color: 'var(--foreground)' }}>
          {faq.question}
        </span>
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
          style={{
            backgroundColor: isOpen ? 'var(--accent)' : 'var(--muted)',
            color: isOpen ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-32 px-6" style={{ backgroundColor: 'color-mix(in srgb, var(--muted) 30%, transparent)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full" style={{ color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}>
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mt-6 tracking-tight" style={{ color: 'var(--foreground)' }}>
            Got questions?
          </h2>
          <p className="text-lg mt-4" style={{ color: 'var(--muted-foreground)' }}>We&apos;ve got answers for you</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
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
  width={32}  // Changed from 10
  height={32}  // Changed from 10
  className=" mr-2 inline-block w-[18px] h-[18px] sm:w-[25px] sm:h-[25px]"
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
// MAIN LANDING PAGE COMPONENT
// ============================================================================
export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      <main className="min-h-screen pt-16 sm:pt-20" style={{ backgroundColor: 'var(--background)' }}>
        <Header />
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonial />
        <CTA />
        <FAQ />
        <Footer />
      </main>
    </>
  )
}