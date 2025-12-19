// src/app/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from 'next/image';

const customStyles = `
html {
    scroll-behavior: smooth;
  }
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 3s ease-in-out infinite;
  }
  
  .animate-gradient-shift {
    animation: gradient-shift 8s ease infinite;
  }
`;

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
      {/* Grid pattern background */}
<div className="absolute inset-0 bg-white pointer-events-none" />
<div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
<div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />


<div className="absolute bottom-40 left-20 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-float pointer-events-none" 
     style={{ animationDelay: '4s' }} />
        {/* Success Modal */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1df9ff] text-white">
                <CheckIcon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-center text-2xl font-semibold text-gray-900">
                You&apos;re on the list!
              </h3>
              <p className="mb-8 text-center text-gray-600">
                We&apos;ll notify you the moment StayGenie goes live.
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEmail("");
                }}
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#1df9ff] px-6 py-3 font-medium text-white transition-all hover:bg-[#00d4e6] active:scale-[0.98]"
              >
                Perfect!
              </button>
            </div>
          </Modal>
        )}

        <main className="relative">
          {/* Hero Section */}
          <section className="mx-auto max-w-4xl px-6 pt-20 pb-32 sm:pt-32 sm:pb-40">
            <div className="text-center space-y-8">
              {/* Logo + Title */}
              <div className="flex items-center justify-center gap--3">
                <h1 className="text-6xl sm:text-7xl font-bold tracking-tight">
                  <span className="text-gray-900">Stay</span>
                  <span className="bg-gradient-to-r from-[#1df9ff] to-[#00d4e6] bg-clip-text text-transparent">Genie</span>
                </h1>
                <Image 
                  src="/images/staygenielogo.png" 
                  alt="StayGenie Logo" 
                  width={120} 
                  height={120} 
                  className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-lg -ml-6"
                />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 max-w-2xl mx-auto leading-tight">
                Hotel search that actually gets you
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Skip the endless filters. Just tell us what you&apos;re looking for in plain English, and watch the magic happen.
              </p>

              {/* Search Demo */}
              <div className="max-w-2xl mx-auto pt-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 text-left">
                    <MagicWandIcon className="h-6 w-6 text-[#1df9ff] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-h-[28px] text-lg text-gray-700">
                      <TypingText
                        items={[
                          "Beachfront resorts in Maldives with private pools",
                          "Boutique hotels in Paris near the Louvre",
                          "Mountain lodges in Swiss Alps with spa amenities",
                          "Luxury villas in Tuscany with wine tastings",
                          "Safari camps in Kenya with guided game drives",
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-4">
                <a
                href="#waitlist"
  onClick={(e) => {
    e.preventDefault();
    const element = document.getElementById('waitlist');
    if (element) {
      const offset = 80; // Adjust this number (pixels from top)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }}
  className="inline-flex items-center justify-center rounded-xl bg-[#1df9ff] px-8 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-[#00d4e6] hover:shadow-md active:scale-[0.98]"
>
  Join the Waitlist
  <ArrowRightIcon className="ml-2 h-5 w-5" />
</a>

                <a
  href="#how-it-works"
  onClick={(e) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      const offset = 80; // Adjust this number (pixels from top)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }}
  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-3.5 font-semibold text-gray-900 transition-all hover:border-gray-400 hover:shadow-sm active:scale-[0.98]"
>
  See How It Works
</a>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="bg-gray-50 py-24">
  <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
                  Three steps to your dream stay
                </h2>
                <p className="text-lg text-gray-600">
                  Finding the perfect hotel has never been this simple
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <StepCard
                  number="1"
                  title="Describe Your Vision"
                  description="Tell us what you're looking for in your own words. Romantic getaway? Family adventure? We understand it all."
                  icon={<ChatIcon className="h-7 w-7" />}
                />

                <StepCard
                  number="2"
                  title="Get Smart Matches"
                  description="Our AI instantly finds hotels that match your vibe, budget, and needs. No filters, no hassle."
                  icon={<SparklesIcon className="h-7 w-7" />}
                />

                <StepCard
                  number="3"
                  title="Book With Confidence"
                  description="Browse stunning options with all the details you need. Book directly with our trusted partners."
                  icon={<HeartIcon className="h-7 w-7" />}
                />
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-24">
  <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
                  Why travelers love StayGenie
                </h2>
                <p className="text-lg text-gray-600">
                  The hotel search experience you&apos;ve always wished existed
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                  title="Lightning Fast"
                  desc="Get instant results without waiting. Our AI processes your request in milliseconds."
                  icon={<BoltIcon className="h-6 w-6" />}
                />

                <FeatureCard
                  title="Natural Language"
                  desc="Just type naturally like you're texting a friend who happens to be a travel expert."
                  icon={<MessageIcon className="h-6 w-6" />}
                />

                <FeatureCard
                  title="Perfect Matches"
                  desc="Our AI learns what you love and gets smarter with every search you make."
                  icon={<BadgeCheckIcon className="h-6 w-6" />}
                />

                <FeatureCard
                  title="Transparent Pricing"
                  desc="Real prices, honest reviews, and transparent booking. No bait-and-switch, ever."
                  icon={<EyeIcon className="h-6 w-6" />}
                />

                <FeatureCard
                  title="Always Free"
                  desc="No subscriptions, no premium tiers, no paywalls. Great hotel search for everyone."
                  icon={<CoinIcon className="h-6 w-6" />}
                />

                <FeatureCard
                  title="Privacy First"
                  desc="Your searches are yours alone. We never sell your data or share your preferences."
                  icon={<LockIcon className="h-6 w-6" />}
                />
              </div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="bg-gray-50 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <div className="rounded-2xl bg-white border border-gray-200 p-10 sm:p-14 text-center">
                <div className="mb-6 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-6 w-6 text-[#1df9ff]" />
                  ))}
                </div>
                <blockquote className="text-xl sm:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
                  &ldquo;Finally, a hotel search that doesn&apos;t make me want to throw my laptop out the window. This is how booking should work.&rdquo;
                </blockquote>
                <p className="text-gray-600">
                  <span className="font-semibold">Sarah M.</span> · Beta Tester
                </p>
              </div>
            </div>
          </section>

          {/* Waitlist */}
          <section id="waitlist" className="py-24">
            <div className="mx-auto max-w-xl px-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-10 sm:p-12 shadow-sm">
                <div className="mb-10 text-center">
                  <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
                    Be first in line
                  </h2>
                  <p className="text-lg text-gray-600">
                    Join thousands waiting for the hotel search that changes everything
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <label className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3.5 transition-all focus-within:border-[#1df9ff] focus-within:ring-2 focus-within:ring-[#1df9ff]/20">
                    <AtIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none"
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={!email}
                    className="w-full rounded-xl bg-[#1df9ff] px-6 py-3.5 font-semibold text-white transition-all enabled:hover:bg-[#00d4e6] enabled:active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Secure Your Spot →
                  </button>
                </form>

                <div className="mt-10 grid grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1df9ff]/10">
                      <ShieldCheckIcon className="h-5 w-5 text-[#1df9ff]" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">No spam</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1df9ff]/10">
                      <ClockIcon className="h-5 w-5 text-[#1df9ff]" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Early access</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1df9ff]/10">
                      <InfinityIcon className="h-5 w-5 text-[#1df9ff]" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Free forever</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-gray-50 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                  Questions? We&apos;ve got answers
                </h2>
              </div>

              <div className="space-y-3">
                <FAQItem
                  question="When will StayGenie launch?"
                  answer="We're putting the finishing touches on the experience right now. Waitlist members will get early access before our public launch in early 2025."
                />
                <FAQItem
                  question="How is this different from other booking sites?"
                  answer="Traditional sites make you wrestle with dozens of filters. StayGenie lets you describe what you want naturally. Our AI understands context, preferences, and nuance—not just keywords."
                />
                <FAQItem
                  question="Will it really be free forever?"
                  answer="Yes! We make money through affiliate partnerships with hotels and booking platforms, so we never need to charge you. No premium tiers, no hidden fees."
                />
                <FAQItem
                  question="What if I don't like the recommendations?"
                  answer="Just refine your search with more details or different wording. The AI gets smarter with every interaction and learns what resonates with you."
                />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-200 py-12 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} StayGenie · Making hotel search magical ✨
            </p>
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
      <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-[#1df9ff] align-middle" />
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

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/** ---------------------- StepCard ---------------------- */
function StepCard({ number, title, description, icon }: { 
  number: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) {
  return (
    <article className="relative rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:shadow-md hover:border-[#1df9ff]/30">
      <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1df9ff] text-white font-semibold shadow-sm">
        {number}
      </div>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1df9ff]/10 text-[#1df9ff]">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </article>
  );
}

/** ---------------------- FeatureCard ---------------------- */
function FeatureCard({ title, desc, icon }: { 
  title: string; 
  desc: string; 
  icon: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md hover:border-[#1df9ff]/30">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#1df9ff] text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </article>
  );
}

/** ---------------------- FAQItem ---------------------- */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-gray-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
      >
        <span className="font-semibold text-gray-900">
          {question}
        </span>
        <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

/** ---------------------- Icons ---------------------- */
function BoltIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function BadgeCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function CoinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.657 3.134 3 7 3s7-1.343 7-3V6" />
      <path d="M5 12v6c0 1.657 3.134 3 7 3s7-1.343 7-3v-6" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function AtIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9" />
    </svg>
  );
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l7 4v5c0 5-3 8-7 9-4-1-7-4-7-9V7l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function InfinityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5z" transform="translate(-5 7) scale(0.7)" />
      <path d="M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5z" transform="translate(5 7) scale(0.7)" />
      <path d="M8.5 12h7" />
    </svg>
  );
}

function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M19 3l.5 2.5L22 6l-2.5.5L19 9l-.5-2.5L16 6l2.5-.5L19 3z" />
      <path d="M19 15l.5 2.5L22 18l-2.5.5L19 21l-.5-2.5L16 18l2.5-.5L19 15z" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function MagicWandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8l1.4 1.4M17.8 6.2l1.4-1.4M3 21l9-9M12.2 6.2L11 5" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}