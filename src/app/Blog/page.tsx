// src/app/Blog/page.tsx
import Link from 'next/link'
import { getAllCities, getCityPosts } from '@/lib/blog'

export const dynamic = 'force-static'

/**
 * Cleaned Blog Home
 * - Extracted UI pieces into small components
 * - Removed inline styles in favor of Tailwind utilities
 * - Better empty states & semantics
 * - Consistent gradient/bg and cards to match Home
 */
export default function BlogHomePage() {
  const cities = getAllCities()

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-cyan-50 via-sky-50 to-rose-50">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="mx-auto mb-4 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
            Hotel Travel Guides
          </h1>
          <p className="mx-auto max-w-2xl px-4 text-lg text-gray-600 sm:text-xl">
            Discover the best hotels for every occasion in cities around the world
          </p>
        </header>

        {/* Cities Grid */}
        <section className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {cities.map((city) => (
            <CityCard key={city} city={city} count={getCityPosts(city).length} />
          ))}

          {cities.length === 0 && (
            <div className="col-span-full rounded-3xl border-2 border-cyan-200/40 bg-white/60 p-12 text-center text-gray-500 backdrop-blur">
              <p className="text-xl">No guides available yet.</p>
              <p className="mt-2 text-sm">Add entries to <code className="rounded bg-gray-100 px-1 py-0.5">content/blog-posts.json</code> to get started.</p>
            </div>
          )}
        </section>

        {/* Latest Guides */}
        {cities.length > 0 && (
          <section className="mb-20">
            <h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-gray-900">
              Latest Guides
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              {cities
                .slice(0, 3)
                .flatMap((city) => getCityPosts(city).slice(0, 2).map((post) => (
                  <GuideItem key={`${city}-${post.slug}`} city={city} post={post} />
                )))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-gray-200/60 py-10 text-center">
          <p className="mb-2 text-sm text-gray-500">Making hotel search magical</p>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} StayGenie. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

/** ---------------------- Components ---------------------- */
function CityCard({ city, count }: { city: string; count: number }) {
  return (
    <Link
      href={`/Blog/${city}`}
      className="group block rounded-3xl border-2 border-cyan-200/30 bg-white/60 p-8 shadow-sm backdrop-blur transition hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100/60 text-cyan-500">
          <PinIcon className="h-6 w-6" />
        </div>
      </div>
      <h2 className="mb-2 capitalize text-xl font-bold text-gray-900 transition-colors group-hover:text-gray-700">
        {city.replace(/-/g, ' ')}
      </h2>
      <p className="mb-3 text-gray-600">
        {count} {count === 1 ? 'guide' : 'guides'} available
      </p>
      <p className="inline-flex items-center gap-1 font-semibold text-cyan-500 transition-transform group-hover:translate-x-1">
        Explore guides <ArrowIcon className="h-4 w-4" />
      </p>
    </Link>
  )
}

function GuideItem({ city, post }: { city: string; post: { slug: string; title: string; intro: string; hotels: unknown[] } }) {
  return (
    <Link
      href={`/Blog/${city}/${post.slug}`}
      className="block rounded-2xl border-2 border-cyan-200/30 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:shadow-lg"
    >
      <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors hover:text-gray-700">
        {post.title}
      </h3>
      <p className="mb-3 text-gray-600">{post.intro}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <MarkerIcon className="h-4 w-4 text-cyan-400" />
          <span className="capitalize">{city.replace(/-/g, ' ')}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <HotelIcon className="h-4 w-4 text-cyan-400" />
          <span>{post.hotels?.length ?? 0} hotels</span>
        </span>
      </div>
    </Link>
  )
}

/** ---------------------- Icons (inline, no deps) ---------------------- */
function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  )
}
function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
function MarkerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  )
}
function HotelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  )
}
