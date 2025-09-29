"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Head from "next/head"

export default function Home() {
  const [email, setEmail] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  const searchExamples = [
    "Beachfront resorts in Maldives with private pools",
    "Boutique hotels in Paris with Eiffel Tower views",
    "Mountain lodges in Swiss Alps with spa amenities",
    "Luxury villas in Tuscany with wine tastings",
    "Safari camps in Kenya with guided game drives"
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 60
    const currentText = searchExamples[loopNum % searchExamples.length]
    
    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      } else {
        setTypedText(
          isDeleting 
            ? currentText.substring(0, typedText.length - 1)
            : currentText.substring(0, typedText.length + 1)
        )
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [typedText, isDeleting, loopNum, searchExamples])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setShowModal(true)
      console.log("Email submitted:", email)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEmail("")
  }

  return (
    <>
      <Head>
        <meta name="agd-partner-manual-verification" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Head>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(29, 249, 255, 0.4);
          }
          50% { 
            box-shadow: 0 0 0 8px rgba(29, 249, 255, 0);
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .cursor-blink::after {
          content: '|';
          animation: blink 1s infinite;
          color: #1df9ff;
          margin-left: 2px;
        }
        
        .gradient-bg {
          background: linear-gradient(-45deg, #f8fafc, #ffffff, #f1f5f9, #ffffff);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        @media (max-width: 640px) {
          .cursor-blink::after {
            margin-left: 1px;
          }
        }
      `}</style>
      
      <div className="min-h-screen gradient-bg relative overflow-hidden">
        {/* Navigation Bar */}
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'glass-effect border-b border-white/60 shadow-lg' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight">
                    <span className="text-black">Stay</span>
                    <span style={{ color: '#1df9ff' }}>Genie</span>
                  </span>
                  <img 
                    src="/images/staygenielogo.png" 
                    alt="StayGenie Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 -ml-1"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const svg = e.currentTarget.nextElementSibling as HTMLElement;
                      if (svg) svg.classList.remove('hidden');
                    }}
                  />
                  <svg 
                    className="w-8 h-8 sm:w-10 sm:h-10 hidden" 
                    viewBox="0 0 100 100" 
                    fill="none"
                  >
                    <path d="M30 25 L50 15 L70 25 L70 45 L50 55 L30 45 Z" fill="#1df9ff" opacity="0.8"/>
                    <path d="M30 45 L50 35 L70 45 L70 65 L50 75 L30 65 Z" fill="#00d4e6" opacity="0.6"/>
                    <rect x="48" y="60" width="4" height="25" fill="#00d4e6" rx="2"/>
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-6">
                <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors hidden md:block text-sm">
                  About
                </button>
                <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors hidden md:block text-sm">
                  Features
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 font-semibold rounded-lg sm:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-white text-sm sm:text-base"
                  style={{ 
                    backgroundColor: '#1df9ff',
                    boxShadow: '0 4px 6px -1px rgba(29, 249, 255, 0.2), 0 2px 4px -1px rgba(29, 249, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00d4e6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1df9ff'}
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Decorative Elements - Adjusted for mobile */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(29, 249, 255, 0.05)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(29, 249, 255, 0.05)' }} />

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeInUp">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 max-w-md w-full mx-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <div className="text-center">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
                  style={{ 
                    background: 'linear-gradient(to bottom right, #1df9ff, #00d4e6)',
                    boxShadow: '0 10px 15px -3px rgba(29, 249, 255, 0.3), 0 4px 6px -2px rgba(29, 249, 255, 0.2)'
                  }}
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">Welcome aboard!</h3>
                <p className="text-gray-600 mb-6 sm:mb-10 leading-relaxed text-base sm:text-lg">
                  You&apos;ll be the first to know when StayGenie launches.
                </p>
                <button
                  onClick={closeModal}
                  className="w-full py-3 sm:py-4 text-white transition-all duration-300 font-semibold rounded-xl sm:rounded-2xl shadow-lg text-base sm:text-lg"
                  style={{ 
                    background: 'linear-gradient(to right, #1df9ff, #00d4e6)',
                    boxShadow: '0 10px 15px -3px rgba(29, 249, 255, 0.3), 0 4px 6px -2px rgba(29, 249, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #00d4e6, #1df9ff)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(29, 249, 255, 0.4), 0 10px 10px -5px rgba(29, 249, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #1df9ff, #00d4e6)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(29, 249, 255, 0.3), 0 4px 6px -2px rgba(29, 249, 255, 0.2)';
                  }}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center pt-20 sm:pt-24 animate-fadeInUp">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight px-2">
              Describe your perfect stay
            </h2>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto font-light leading-relaxed px-4">
              AI that understands exactly what you&apos;re looking for
            </p>

            {/* Typing Demo - Mobile Optimized */}
            <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
              <div 
                className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 shadow-xl pointer-events-none"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(12px)',
                  borderColor: '#1df9ff',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div 
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shadow-lg" 
                    style={{
                      backgroundColor: '#1df9ff',
                      animation: 'pulse-glow 2s infinite'
                    }} 
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Example Search</span>
                </div>
                <div className="text-sm sm:text-base md:text-lg text-left text-gray-900 font-medium cursor-blink min-h-[24px] sm:min-h-[28px] select-none break-words">
                  {typedText}
                </div>
              </div>
            </div>

          </div>


          {/* Waitlist CTA - Mobile Optimized */}
          <div className="max-w-lg mx-auto mb-16 sm:mb-24 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/60 shadow-2xl">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">
                  Join the Waitlist
                </h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light px-2">
                  Be among the first to experience the future of hotel search
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="relative group">
                  <div 
                    className="bg-white rounded-xl sm:rounded-2xl border-2 transition-all duration-300 shadow-sm"
                    style={{
                      borderColor: email ? '#1df9ff' : '#E5E7EB'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#1df9ff'}
                  >
                    <div className="flex items-center px-4 sm:px-5 py-3 sm:py-4">
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 transition-colors flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{ color: email ? '#1df9ff' : '#9CA3AF' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-transparent placeholder-gray-400 focus:outline-none text-gray-900 text-base sm:text-lg"
                        style={{ caretColor: '#1df9ff' }}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 sm:py-4 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform active:scale-[0.98] shadow-lg text-base sm:text-lg"
                  style={{ 
                    background: 'linear-gradient(to right, #1df9ff, #00d4e6)',
                    boxShadow: '0 10px 15px -3px rgba(29, 249, 255, 0.3), 0 4px 6px -2px rgba(29, 249, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #00d4e6, #1df9ff)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(29, 249, 255, 0.4), 0 10px 10px -5px rgba(29, 249, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #1df9ff, #00d4e6)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(29, 249, 255, 0.3), 0 4px 6px -2px rgba(29, 249, 255, 0.2)';
                  }}
                >
                  Get Early Access →
                </button>
              </form>
              
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#1df9ff' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>No spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#1df9ff' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Early access</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#1df9ff' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Free forever</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center border-t border-gray-200/50 pt-8 sm:pt-12 pb-6 sm:pb-8 px-4">
            <p className="text-gray-500 text-sm sm:text-base mb-2 font-light">
              Making hotel search magical
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">© 2025 StayGenie. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  )
}