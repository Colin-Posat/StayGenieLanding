"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Home() {
  const [email, setEmail] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          @keyframes fadeInUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          
          @keyframes floatFast {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          @keyframes floatGentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          
          @keyframes modalFadeIn {
            from { 
              opacity: 0; 
              transform: scale(0.9); 
            }
            to { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-float-slow {
            animation: floatSlow 4s ease-in-out infinite;
          }
          
          .animate-float-fast {
            animation: floatFast 2.5s ease-in-out infinite;
          }
          
          .animate-float-gentle {
            animation: floatGentle 3.5s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse 2s ease-in-out infinite;
          }
          
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
          
          .animate-modal {
            animation: modalFadeIn 0.3s ease-out forwards;
          }
          
          .shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
          }
          
          .gradient-border {
            position: relative;
            background: white;
            border-radius: 12px;
          }
          
          .gradient-border::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(45deg, #000, #333, #000);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
          }
          
          .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
          
          .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .feature-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          }
          
          .feature-card:hover .feature-icon {
            transform: scale(1.1);
          }
          
          .feature-icon {
            transition: transform 0.3s ease;
          }
          
          .typing-animation {
            border-right: 2px solid #000;
            animation: blink 1s infinite;
          }
          
          @keyframes blink {
            0%, 50% { border-color: #000; }
            51%, 100% { border-color: transparent; }
          }
          
          .star {
            position: absolute;
            pointer-events: none;
            z-index: 50;
            opacity: 0.7;
          }
          
          .star-1 { 
            top: 8%; 
            left: 2%; 
            width: 40px; 
            height: 40px; 
            animation-delay: 0s;
          }
          
          .star-2 { 
            top: 18%; 
            right: 3%; 
            width: 32px; 
            height: 32px; 
            animation-delay: 0.5s;
          }
          
          .star-3 { 
            top: 32%; 
            left: 3%; 
            width: 48px; 
            height: 48px; 
            animation-delay: 1s;
          }
          
          .star-4 { 
            top: 42%; 
            right: 2%; 
            width: 36px; 
            height: 36px; 
            animation-delay: 1.5s;
          }
          
          .star-5 { 
            top: 58%; 
            left: 4%; 
            width: 44px; 
            height: 44px; 
            animation-delay: 2s;
          }
          
          .star-6 { 
            top: 72%; 
            right: 4%; 
            width: 38px; 
            height: 38px; 
            animation-delay: 2.5s;
          }
          
          .star-7 { 
            top: 88%; 
            left: 6%; 
            width: 34px; 
            height: 34px; 
            animation-delay: 3s;
          }
          
          .star-8 { 
            top: 12%; 
            left: 92%; 
            width: 28px; 
            height: 28px; 
            animation-delay: 0.8s;
          }
          
          .star-9 { 
            top: 28%; 
            right: 95%; 
            width: 36px; 
            height: 36px; 
            animation-delay: 1.3s;
          }
          
          .star-10 { 
            top: 52%; 
            right: 96%; 
            width: 32px; 
            height: 32px; 
            animation-delay: 1.8s;
          }
          
          .star-11 { 
            top: 68%; 
            left: 95%; 
            width: 40px; 
            height: 40px; 
            animation-delay: 2.3s;
          }
          
          .star-12 { 
            top: 92%; 
            right: 6%; 
            width: 36px; 
            height: 36px; 
            animation-delay: 2.8s;
          }
        `}
      </style>
      
      <div className={`min-h-screen bg-white text-black overflow-hidden relative ${isScrolled ? 'scrolled' : ''}`}>
        {/* Animated Stars */}
        <Image src="/star.png" alt="Decorative star" width={40} height={40} className="star star-1 animate-float-slow animate-twinkle" />
        <Image src="/star.png" alt="Decorative star" width={32} height={32} className="star star-2 animate-float-fast" />
        <Image src="/star.png" alt="Decorative star" width={48} height={48} className="star star-3 animate-float-gentle animate-twinkle" />
        <Image src="/star.png" alt="Decorative star" width={36} height={36} className="star star-4 animate-float" />
        <Image src="/star.png" alt="Decorative star" width={44} height={44} className="star star-5 animate-float-slow" />
        <Image src="/star.png" alt="Decorative star" width={38} height={38} className="star star-6 animate-float-fast animate-twinkle" />
        <Image src="/star.png" alt="Decorative star" width={34} height={34} className="star star-7 animate-float-gentle" />
        <Image src="/star.png" alt="Decorative star" width={28} height={28} className="star star-8 animate-float animate-twinkle" />
        <Image src="/star.png" alt="Decorative star" width={36} height={36} className="star star-9 animate-float-slow" />
        <Image src="/star.png" alt="Decorative star" width={32} height={32} className="star star-10 animate-float-fast" />
        <Image src="/star.png" alt="Decorative star" width={40} height={40} className="star star-11 animate-float-gentle animate-twinkle" />
        <Image src="/star.png" alt="Decorative star" width={36} height={36} className="star star-12 animate-float" />

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto animate-modal shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Welcome to the family! ✨</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Thanks for joining our waitlist! We&apos;ll notify you the moment StayGenie is ready to make your hotel search magical.
                </p>
                <button
                  onClick={closeModal}
                  className="w-full h-12 bg-black text-white hover:bg-gray-800 transition-all duration-300 font-semibold rounded-xl"
                >
                  Perfect, thanks!
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-8 pt-24 relative z-10">
          {/* Hero Section */}
          <div className="text-center max-w-6xl mx-auto mb-20">
            {/* Main brand */}
            <div className="mb-12 animate-fadeInUp">
              <div className="flex items-center justify-center mb-6">
                <Image src="/images/staygenie.png" alt="Staygenie Logo" width={96} height={96} className="w-16 h-16 md:w-24 md:h-24 mr-6 animate-float" />
                <div>
                  <h1 className="text-5xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-600 bg-clip-text">
                    StayGenie
                  </h1>
                  <div className="w-32 h-1 bg-gradient-to-r from-black to-gray-400 mx-auto mt-4 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Hero message */}
            <div className="mb-12 space-y-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl md:text-4xl font-light text-gray-800 leading-relaxed">
                Your <span className="font-semibold italic">Magical</span> Hotel Search Assistant
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Just tell us what you want in plain English, and we&apos;ll find the perfect stay for you. 
                <span className="block mt-2 font-medium">No endless filters. No headaches. Just magic.</span>
              </p>
            </div>

{/* Waitlist Section */}
<div className="max-w-2xl mx-auto mb-20 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
  <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-black/20 transition-all duration-500 transform hover:scale-[1.02]">
    <div className="text-center mb-8">
      <h3 className="text-3xl font-bold mb-3 text-black bg-gradient-to-r from-black to-gray-700 bg-clip-text">
        Be First to Experience the Future of Travel
      </h3>
      <p className="text-gray-600 text-lg leading-relaxed">
        Get instant access the moment we launch, plus exclusive perks reserved for our founding members. 
       
      </p>
    </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="bg-white rounded-xl border-2 border-gray-200 focus-within:border-black transition-all duration-300">
                    <div className="flex items-center">
                      <div className="pl-4 pr-3 py-4">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 py-4 pr-4 placeholder-gray-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-black/20"
                >
                  Join Waitlist →
                </button>
              </form>
              
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                  No spam
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                  Early access
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                  Free forever
                </div>
              </div>
            </div>
          </div>


{/* App Preview Section */}
<div className="mb-20 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <h3 className="text-2xl md:text-3xl font-semibold mb-12 text-gray-800">See StayGenie in Action</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Search & Results */}
                <div className="text-center feature-card">
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6 hover-lift">
                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-center">
                      <Image src="/images/search-screenshot.png" alt="StayGenie search and results" width={400} height={300} className="max-w-full h-auto rounded-xl" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">🔍 Smart Search</h4>
                  <p className="text-gray-600 text-sm">Tell us what you want in plain English and get perfect matches instantly</p>
                </div>

                {/* AI Refine */}
                <div className="text-center feature-card">
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6 hover-lift">
                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-center">
                      <Image src="/images/refine-screenshot.png" alt="AI refine suggestions" width={400} height={300} className="max-w-full h-auto rounded-xl" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">🎯 AI Refine</h4>
                  <p className="text-gray-600 text-sm">Get smart suggestions to narrow down your perfect stay</p>
                </div>

                {/* Favorites & Trips */}
                <div className="text-center feature-card">
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6 hover-lift">
                    <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-center">
                      <Image src="/images/favorites-screenshot.png" alt="Favorites organized into trips" width={400} height={300} className="max-w-full h-auto rounded-xl" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">❤️ Smart Trips</h4>
                  <p className="text-gray-600 text-sm">Your favorite hotels automatically organized into intuitive trips</p>
                </div>
              </div>
            </div>

            {/* Coming Soon Badge */}
            <div className="mb-12 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <div className="inline-flex items-center px-8 py-4 border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-300 font-semibold tracking-wide uppercase text-sm rounded-full cursor-pointer hover-lift">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse-slow"></div>
                Coming Soon
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center border-t border-gray-100 pt-12">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Image src="/images/staygenie.png" alt="Staygenie Logo" width={32} height={32} className="w-8 h-8 mr-3" />
                <span className="font-semibold text-lg">StayGenie</span>
              </div>
              <p className="text-gray-500 max-w-md mx-auto">
                Making hotel search magical, one wish at a time.
              </p>
            </div>
            <p className="text-gray-400 text-sm">© 2025 StayGenie. All rights reserved.</p>
          </footer>
        </div>
      </div>
      
    </>
  )
}