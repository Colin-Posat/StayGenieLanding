// app/Blog/[city]/[slug]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllCities, getCityPosts, getPost } from '@/lib/blog'

export const dynamic = 'force-static'

export function generateStaticParams() {
  const params: { city: string; slug: string }[] = []
  for (const city of getAllCities()) {
    for (const post of getCityPosts(city)) {
      params.push({ city, slug: post.slug })
    }
  }
  return params
}

export default function BlogPostPage({ params }: { params: { city: string; slug: string } }) {
  const post = getPost(params.city, params.slug)
  if (!post) return notFound() // ✅ clearer than returning null

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-sky-50 to-rose-50">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <article>
          {/* Header */}
          <header className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
              {post.title}
            </h1>
            <p className="mx-auto mb-3 max-w-3xl text-lg text-gray-600 sm:text-xl">{post.intro}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <MarkerIcon className="h-4 w-4 text-cyan-400" />
              <span className="capitalize">{post.city.replace(/-/g, ' ')}</span>
            </div>
          </header>

          {/* Hotels */}
          <section className="mb-12 space-y-8 sm:space-y-10">
            {post.hotels.map((hotel: any, index: number) => (
              <HotelCard key={index} index={index} hotel={hotel} />
            ))}
          </section>
        </article>

        {/* Footer */}
        <footer className="border-t border-gray-200/60 py-10 text-center">
          <p className="mb-2 text-sm text-gray-500">Making hotel search magical</p>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} StayGenie. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

function HotelCard({
  index,
  hotel,
}: {
  index: number
  hotel: { image: string; name: string; highlight: string; description: string }
}) {
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-cyan-200/30 bg-white/60 shadow-sm backdrop-blur transition hover:shadow-lg">
      <div className="md:flex">
        {/* Image */}
        <div className="relative h-64 min-h-[300px] md:h-auto md:w-2/5">
          <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
          <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
            #{index + 1}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-3/5 p-6 sm:p-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{hotel.name}</h2>

          <div className="mb-5 rounded-xl border-l-4 border-cyan-300/80 bg-cyan-50/60 p-4">
            <p className="flex items-start gap-2 text-base font-semibold text-cyan-600">
              <SparkleIcon className="mt-0.5 h-5 w-5" />
              <span>{hotel.highlight}</span>
            </p>
          </div>

          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{hotel.description}</p>
        </div>
      </div>
    </div>
  )
}

/** Icons */
function MarkerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  )
}
function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5L12 3z" />
    </svg>
  )
}
