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
  const cityName = city.replace(/-/g, ' ')

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <header className="mb-8 border-b border-gray-200 pb-6">
          <Link 
            href="/Blog"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to all cities
          </Link>
          <h1 className="mb-2 text-3xl font-bold capitalize text-gray-900">
            {cityName}
          </h1>
          <p className="text-gray-600">
            {posts.length} {posts.length === 1 ? 'guide' : 'guides'} available
          </p>
        </header>

        {/* Posts List */}
        {posts.length > 0 ? (
          <ul className="mb-8 divide-y divide-gray-200 border-t border-b border-gray-200">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/Blog/${city}/${post.slug}`}
                  className="block py-4 transition hover:bg-gray-50"
                >
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="mb-2 text-sm text-gray-600">{post.intro}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>
                      {post.hotels.length} {post.hotels.length === 1 ? 'hotel' : 'hotels'}
                    </span>
                    <span>→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <p>No guides found for {cityName}.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} StayGenie. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

/** Icons */
function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}