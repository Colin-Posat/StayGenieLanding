// src/app/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from 'next/image';

// Add custom animations via style tag
const customStyles = `
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 10s ease-in-out infinite;
    animation-delay: 2s;
  }
  
  .animate-float-slow {
    animation: float-slow 12s ease-in-out infinite;
    animation-delay: 4s;
  }
  
  .animate-shimmer {
    animation: shimmer 3s ease-in-out infinite;
  }
  
  .animation-delay-300 {
    animation-delay: 300ms;
  }
  
  .animation-delay-700 {
    animation-delay: 700ms;
  }
`;

/**
 * Sleek and polished StayGenie landing page
 */
export default function Home() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "StayGenie - Hotel Search That Actually Gets You";
  }, []);

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const ok = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
    if (!ok) {
      alert("Please enter a valid email address.");
      return;
    }
    setShowModal(true);
    console.log("Email submitted:", email);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 sm:p-10 shadow-2xl border border-gray-100">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1df9ff] text-gray-900">
              <CheckIcon className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-center text-2xl font-bold text-gray-900">
              Welcome aboard!
            </h3>
            <p className="mb-8 text-center text-gray-600">
              You&apos;ll be the first to know when StayGenie launches.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                setEmail("");
              }}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#1df9ff] px-6 py-3 font-semibold text-gray-900 transition hover:bg-[#5dfbff] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#1df9ff] focus:ring-offset-2"
            >
              Got it!
            </button>
          </div>
        </Modal>
      )}

      <main className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24">
          <div className="mb-6 flex items-center justify-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight -mr-4 sm:-mr-8">
              <span className="text-gray-900">Stay</span>
              <span className="bg-gradient-to-r from-[#1df9ff] via-[#5dfbff] to-[#00d4e6] bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">Genie</span>
            </h1>
            <Image 
              src="/images/staygenielogo.png" 
              alt="StayGenie Logo" 
              width={140} 
              height={140} 
              className="inline-block w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 drop-shadow-[0_0_15px_rgba(29,249,255,0.3)] -mt-3 sm:-mt-4 lg:-mt-5"
            />
          </div>
          
          <p className="mx-auto mb-12 max-w-2xl text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed px-4">
            The hotel search app that actually gets you. 
            <br className="hidden sm:block" />
            Just describe what you want in plain English.
          </p>

          {/* Typing Demo */}
                      <div className="mx-auto w-full max-w-3xl px-4">
            <div className="rounded-2xl border-2 border-[#1df9ff]/30 bg-gray-50 p-4 sm:p-5 relative overflow-hidden group">
              {/* Magical sparkle effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#1df9ff] rounded-full animate-ping" />
                <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-[#5dfbff] rounded-full animate-ping animation-delay-300" />
                <div className="absolute top-1/2 right-12 w-1 h-1 bg-[#00d4e6] rounded-full animate-ping animation-delay-700" />
              </div>
              <div className="min-h-[32px] flex items-center text-left text-sm sm:text-base font-medium text-gray-900 relative z-10">
                <TypingText
                  items={[
                    "Beachfront resorts in Maldives with private pools",
                    "Boutique hotels in Paris with Eiffel Tower views",
                    "Mountain lodges in Swiss Alps with spa amenities",
                    "Luxury villas in Tuscany with wine tastings",
                    "Safari camps in Kenya with guided game drives",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto mb-24 grid max-w-5xl gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
          <FeatureCard
            title="Instant Results"
            desc="Natural language search that understands exactly what you mean."
          >
            <BoltIcon className="h-5 w-5" />
          </FeatureCard>

          <FeatureCard
            title="Perfect Matches"
            desc="AI learns your preferences to deliver personalized recommendations."
          >
            <BadgeCheckIcon className="h-5 w-5" />
          </FeatureCard>

          <FeatureCard
            title="Always Free"
            desc="No hidden fees, no premium tiers. StayGenie is free forever."
          >
            <CoinIcon className="h-5 w-5" />
          </FeatureCard>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="mx-auto mb-24 max-w-xl px-4">
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 sm:p-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Join the waitlist
              </h2>
              <p className="text-lg text-gray-600">Get notified when we launch</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <label className="group flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-[#1df9ff]">
                <span className="text-gray-400 group-focus-within:text-[#1df9ff] flex-shrink-0">
                  <AtIcon className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-base text-gray-900 placeholder-gray-400 outline-none min-w-0"
                  aria-label="Email address"
                  required
                />
              </label>

              <button
                type="submit"
                disabled={!email}
                className="w-full rounded-xl bg-[#1df9ff] px-6 py-3.5 text-base font-semibold text-gray-900 transition-all duration-300 enabled:hover:bg-[#5dfbff] enabled:hover:shadow-[0_0_30px_rgba(29,249,255,0.4)] enabled:active:scale-[0.98] disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#1df9ff] focus:ring-offset-2"
              >
                Secure your spot →
              </button>
            </form>

            <ul className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
              <li className="flex flex-col items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-[#1df9ff]" />
                <span className="font-medium">No spam ever</span>
              </li>
              <li className="flex flex-col items-center gap-2">
                <ClockIcon className="h-5 w-5 text-[#1df9ff]" />
                <span className="font-medium">Early access</span>
              </li>
              <li className="flex flex-col items-center gap-2">
                <InfinityIcon className="h-5 w-5 text-[#1df9ff]" />
                <span className="font-medium">Free forever</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-10 text-center">
          <p className="mb-1 text-sm text-gray-600">Making hotel search magical</p>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} StayGenie. All rights reserved.</p>
        </footer>
      </main>
    </div>
    </>
  );
}

/** ---------------------- TypingText ---------------------- */
function TypingText({ items, pause = 2000, typeMs = 50, deleteMs = 30 }: {
  items: string[];
  pause?: number;
  typeMs?: number;
  deleteMs?: number;
}) {
  const texts = useMemo(() => items.filter(Boolean), [items]);
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const current = texts[idx % texts.length] ?? "";

    const clearExisting = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    if (phase === "typing") {
      if (display.length < current.length) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1));
        }, typeMs);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          setPhase("pausing");
        }, 10);
      }
    } else if (phase === "pausing") {
      timeoutRef.current = window.setTimeout(() => {
        setPhase("deleting");
      }, pause);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplay(display.slice(0, -1));
        }, deleteMs);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          setIdx((i) => (i + 1) % texts.length);
          setPhase("typing");
        }, 100);
      }
    }

    return () => clearExisting();
  }, [texts, idx, display, phase, pause, typeMs, deleteMs]);

  return (
    <span className="inline-block">
      {display}
      <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-[#1df9ff] align-middle" aria-hidden />
    </span>
  );
}

/** ---------------------- Modal ---------------------- */
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/** ---------------------- FeatureCard ---------------------- */
function FeatureCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <article className="rounded-xl border border-[#1df9ff]/30 bg-gradient-to-br from-[#1df9ff]/5 via-white to-[#5dfbff]/5 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(29,249,255,0.15)] hover:border-[#1df9ff]/50 hover:-translate-y-1 group">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1df9ff] to-[#00d4e6] text-white shadow-sm group-hover:shadow-[0_0_20px_rgba(29,249,255,0.4)] transition-shadow duration-300">
        {children}
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </article>
  );
}

/** ---------------------- Icons ---------------------- */
function BoltIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function BadgeCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
function CoinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.657 3.134 3 7 3s7-1.343 7-3V6" />
      <path d="M5 12v6c0 1.657 3.134 3 7 3s7-1.343 7-3v-6" />
    </svg>
  );
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
function AtIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9" />
    </svg>
  );
}
function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 3l7 4v5c0 5-3 8-7 9-4-1-7-4-7-9V7l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
function InfinityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M7 12c2-3 4-3 6 0s4 3 6 0" />
      <path d="M7 12c-2 3-4 3-6 0s-4-3-6 0" transform="translate(12 0) scale(-1 1)" />
    </svg>
  );
}