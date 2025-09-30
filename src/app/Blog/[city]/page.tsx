// app/Blog/[city]/page.tsx
import Link from 'next/link'
import { getAllCities, getCityPosts } from '@/lib/blog'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAllCities().map((city) => ({ city }))
}

export default function CityPage({ params }: { params: { city: string } }) {
  const { city } = params
  const posts = getCityPosts(city)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-sky-50 to-rose-50">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-gray-900 capitalize sm:text-6xl">
            {city.replace(/-/g, ' ')} Hotel Guides
          </h1>
          <p className="text-lg text-gray-600 sm:text-xl">
            Discover the perfect stay for every occasion
          </p>
        </header>

        {/* Posts */}
        <section className="mb-20 grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/Blog/${city}/${post.slug}`} // ✅ use real slug
              className="block rounded-3xl border-2 border-cyan-200/30 bg-white/60 p-8 shadow-sm backdrop-blur transition hover:shadow-lg"
            >
              <div className="mb-3 flex items-start gap-4">
                <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-100/60 text-cyan-500">
                  <HomeIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="mb-2 truncate text-2xl font-bold text-gray-900 transition-colors hover:text-gray-700">
                    {post.title}
                  </h2>
                </div>
              </div>
              <p className="text-gray-600">{post.intro}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 font-semibold text-cyan-500">
                View {post.hotels.length} {post.hotels.length === 1 ? 'hotel' : 'hotels'} <ArrowIcon className="h-4 w-4" />
              </p>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="rounded-3xl border-2 border-cyan-200/40 bg-white/60 p-12 text-center text-gray-500 backdrop-blur">
              <p className="text-xl">No guides found for {city.replace(/-/g, ' ')}.</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200/60 py-10 text-center">
          <p className="mb-2 text-sm text-gray-500">Making hotel search magical</p>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} StayGenie. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

/** Icons */
function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0 7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
