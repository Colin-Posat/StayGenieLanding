// src/app/support/page.tsx
"use client";

import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const mailtoLink = `mailto:support@staygenie.app?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    setShowModal(true);
    
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">


      {/* Success Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1df9ff] text-white">
              <CheckIcon className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-center text-2xl font-semibold text-gray-900">
              Message sent!
            </h3>
            <p className="mb-8 text-center text-gray-600">
              Your email client should open. We'll get back to you soon.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full rounded-xl bg-[#1df9ff] px-6 py-3 font-medium text-white transition-all hover:bg-[#00d4e6] active:scale-[0.98]"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How can we help?
          </h1>
          <p className="text-lg text-gray-600">
            Get in touch with our support team
          </p>
        </div>

        {/* Quick Contact Info */}
        <div className="mb-12 rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1df9ff] text-white">
                <EmailIcon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Email us directly</div>
                <a 
                  href="mailto:support@staygenie.app"
                  className="text-lg font-semibold text-[#1df9ff] hover:text-[#00d4e6]"
                >
                  support@staygenie.app
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Send us a message
          </h2>
          <p className="text-gray-600 mb-8">
            Fill out the form below and we'll open your email client
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all focus:border-[#1df9ff] focus:ring-2 focus:ring-[#1df9ff]/20"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all focus:border-[#1df9ff] focus:ring-2 focus:ring-[#1df9ff]/20"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all focus:border-[#1df9ff] focus:ring-2 focus:ring-[#1df9ff]/20"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all focus:border-[#1df9ff] focus:ring-2 focus:ring-[#1df9ff]/20 resize-none"
                placeholder="Tell us what you need help with..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#1df9ff] px-6 py-3.5 font-semibold text-white transition-all hover:bg-[#00d4e6] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <SendIcon className="h-5 w-5" />
              Send Message
            </button>
          </form>
        </div>

        
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 text-center space-y-3">
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          <Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
        </div>
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} StayGenie · Making hotel search magical
        </p>
      </footer>
    </div>
  );
}

// Icons
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function EmailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}