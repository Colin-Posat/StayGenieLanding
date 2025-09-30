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
  if (!post) return notFound()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-sky-50 to-rose-50">
      {/* Decorative glows - adjusted for mobile */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-cyan-300/30 blur-3xl sm:-right-20 sm:-top-20 sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl sm:-left-20 sm:-bottom-20 sm:h-96 sm:w-96" />

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <article>
          {/* Header - optimized spacing for mobile */}
          <header className="mb-10 text-center sm:mb-16">
            <h1 className="mb-3 px-2 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:mb-4 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mx-auto mb-3 max-w-3xl px-2 text-base text-gray-600 sm:text-lg lg:text-xl">
              {post.intro}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <MarkerIcon className="h-4 w-4 text-cyan-400" />
              <span className="capitalize">{post.city.replace(/-/g, ' ')}</span>
            </div>
          </header>

          {/* Hotels - adjusted spacing for mobile */}
          <section className="mb-8 space-y-6 sm:mb-12 sm:space-y-8 lg:space-y-10">
            {post.hotels.map((hotel: any, index: number) => (
              <HotelCard key={index} index={index} hotel={hotel} />
            ))}
          </section>
        </article>

        {/* Footer */}
        <footer className="border-t border-gray-200/60 py-8 text-center sm:py-10">
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
  // Check if image is a URL or local path
  const isExternalUrl = hotel.image.startsWith('http://') || hotel.image.startsWith('https://')
  
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-cyan-200/30 bg-white/60 shadow-sm backdrop-blur transition hover:shadow-lg sm:rounded-3xl">
      <div className="flex flex-col md:flex-row">
        {/* Image - better aspect ratio on mobile */}
        <div className="relative h-52 w-full sm:h-64 md:h-auto md:w-2/5 md:min-h-[300px]">
          {isExternalUrl ? (
            <Image 
              src={hotel.image} 
              alt={hotel.name} 
              width={800}
              height={600}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <Image 
              src={hotel.image} 
              alt={hotel.name} 
              fill
              className="object-cover"
            />
          )}
          <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
            #{index + 1}
          </div>
        </div>

        {/* Info - improved mobile padding and text sizes */}
        <div className="p-5 sm:p-6 md:w-3/5 lg:p-8">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl">
            {hotel.name}
          </h2>

          <div className="mb-4 rounded-lg border-l-4 border-cyan-300/80 bg-cyan-50/60 p-3 sm:mb-5 sm:rounded-xl sm:p-4">
            <p className="flex items-start gap-2 text-sm font-semibold text-cyan-600 sm:text-base">
              <SparkleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
              <span>{hotel.highlight}</span>
            </p>
          </div>

          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            {hotel.description}
          </p>
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