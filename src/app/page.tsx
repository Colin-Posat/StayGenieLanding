// src/app/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Refined StayGenie landing page with improved spacing and professional formatting
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
      {/* Refined decorative elements */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[600px] w-[600px] rounded-full bg-cyan-300/8 blur-3xl" />

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 text-white shadow-lg">
              <CheckIcon className="h-10 w-10" />
            </div>
            <h3 className="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome aboard!
            </h3>
            <p className="mb-8 text-center text-lg text-gray-600">
              You'll be the first to know when StayGenie launches.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                setEmail("");
              }}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg transition hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-cyan-200"
            >
              Got it!
            </button>
          </div>
        </Modal>
      )}

      <main className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Hero Section - Refined Spacing */}
        <section className="flex flex-col items-center justify-center text-center pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28">
          <div className="mb-8 flex items-center justify-center">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tight -mr-6 sm:-mr-10">
              <span className="text-gray-900">Stay</span>
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                Genie
              </span>
            </h1>
            <img 
              src="/images/staygenielogo.png" 
              alt="StayGenie Logo" 
              width={160} 
              height={160} 
              className="inline-block w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 drop-shadow-2xl"
            />
          </div>
          
          <p className="mx-auto mb-16 max-w-3xl text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light leading-relaxed px-4">
            The hotel search app that actually gets you. 
            <br className="hidden sm:block" />
             Just describe what you want in plain English.
          </p>

          {/* Refined Typing Demo */}
          <div className="mx-auto w-full max-w-4xl px-4">
            <div className="rounded-3xl border border-cyan-200/50 bg-white/80 p-8 sm:p-10 shadow-xl backdrop-blur-sm">
              <div className="min-h-[60px] flex items-center text-left text-lg sm:text-xl lg:text-2xl font-medium text-gray-800">
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

        {/* Features - Refined Grid */}
        <section className="mx-auto mb-32 grid max-w-6xl gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
          <FeatureCard
            title="Instant Results"
            desc="Natural language search that understands exactly what you mean."
          >
            <BoltIcon className="h-6 w-6" />
          </FeatureCard>

          <FeatureCard
            title="Perfect Matches"
            desc="AI learns your preferences to deliver personalized recommendations."
          >
            <BadgeCheckIcon className="h-6 w-6" />
          </FeatureCard>

          <FeatureCard
            title="Always Free"
            desc="No hidden fees, no premium tiers. StayGenie is free forever."
          >
            <CoinIcon className="h-6 w-6" />
          </FeatureCard>
        </section>

        {/* Waitlist - Refined Spacing */}
        <section id="waitlist" className="mx-auto mb-32 max-w-2xl px-4">
          <div className="rounded-3xl border border-cyan-200/40 bg-white/80 p-10 sm:p-12 shadow-2xl backdrop-blur-sm">
            <div className="mb-10 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Join the waitlist
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">Get notified when we launch</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <label className="group flex items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white px-6 py-5 shadow-sm transition focus-within:border-cyan-400 focus-within:shadow-md">
                <span className="text-gray-400 group-focus-within:text-cyan-500 flex-shrink-0">
                  <AtIcon className="h-6 w-6" />
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-lg text-gray-900 placeholder-gray-400 outline-none min-w-0"
                  aria-label="Email address"
                  required
                />
              </label>

              <button
                type="submit"
                disabled={!email}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-5 text-lg font-semibold text-white shadow-lg transition enabled:hover:shadow-xl enabled:hover:scale-[1.02] enabled:active:scale-[0.98] disabled:opacity-50 disabled:grayscale focus:outline-none focus:ring-4 focus:ring-cyan-200"
              >
                Secure your spot →
              </button>
            </form>

            <ul className="mt-10 grid grid-cols-3 gap-6 text-center text-sm text-gray-600">
              <li className="flex flex-col items-center gap-3">
                <ShieldCheckIcon className="h-6 w-6 text-cyan-400" />
                <span className="font-medium">No spam ever</span>
              </li>
              <li className="flex flex-col items-center gap-3">
                <ClockIcon className="h-6 w-6 text-cyan-400" />
                <span className="font-medium">Early access</span>
              </li>
              <li className="flex flex-col items-center gap-3">
                <InfinityIcon className="h-6 w-6 text-cyan-400" />
                <span className="font-medium">Free forever</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer - Refined */}
        <footer className="border-t border-gray-200/50 py-12 text-center">
          <p className="mb-2 text-base text-gray-600 font-medium">Making hotel search magical</p>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} StayGenie. All rights reserved.</p>
        </footer>
      </main>
    </div>
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
      <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-cyan-500 align-middle" aria-hidden />
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
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-md"
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
    <article className="rounded-3xl border border-cyan-200/30 bg-white/70 p-8 shadow-md backdrop-blur-sm transition hover:shadow-xl hover:scale-[1.02]">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-500">
        {children}
      </div>
      <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-base text-gray-600 leading-relaxed">{desc}</p>
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