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

// Deep link generation function matching the working URL format
const DEEP_LINK_BASE_URL = 'https://staygenie.nuitee.link'

function generateHotelDeepLink(
  hotelId: string,
  hotelName: string,
  tags?: string[],
  isRefundable?: boolean,
  checkInDate?: Date,
  checkOutDate?: Date,
  adults: number = 2,
  children: number = 0,
  placeId?: string
): string {
  // CRITICAL: Must use the actual hotel system ID (like 'lp6fa17'), not a slug
  let url = `${DEEP_LINK_BASE_URL}/hotels/${hotelId}`
  const params = new URLSearchParams()

  // Add check-in/check-out dates
  if (checkInDate) {
    params.append('checkin', checkInDate.toISOString().split('T')[0])
  }
  if (checkOutDate) {
    params.append('checkout', checkOutDate.toISOString().split('T')[0])
  }

  // Add occupancy (encoded as base64)
  const occupancy = [{ adults, children: children > 0 ? [children] : [] }]
  try {
    const occupanciesString = btoa(JSON.stringify(occupancy))
    params.append('occupancies', occupanciesString)
  } catch (error) {
    console.warn('Failed to encode occupancy:', error)
  }

  // Add refundable/cancellation if needed
  if (isRefundable || tags?.includes('Free Cancellation')) {
    params.append('needFreeCancellation', '1')
  }

  // Handle other tags
  if (tags?.includes('All Inclusive')) {
    params.append('needAllInclusive', '1')
  }
  if (tags?.includes('Breakfast Included')) {
    params.append('needBreakfast', '1')
  }

  // Add standard parameters that appear in working links
  params.append('language', 'en')
  params.append('currency', 'USD')
  params.append('source', 'direct')
  params.append('rooms', '1')
  params.append('adults', adults.toString())
  params.append('children', children.toString())

  const queryString = params.toString()
  return queryString ? `${url}?${queryString}` : url
}

export default function BlogPostPage({ params }: { params: { city: string; slug: string } }) {
  const post = getPost(params.city, params.slug)
  if (!post) return notFound()

  return (
    <div className="min-h-screen bg-[#fefdfb]">
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-lg max-w-none">
          {/* Header Section */}
          <header className="mb-12 border-b border-neutral-200 pb-8">
            <h1 className="mb-3 font-serif text-3xl leading-snug text-neutral-800 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mb-4 text-lg leading-relaxed text-neutral-600">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <time>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
          </header>

          {/* Hotels List */}
          <div className="space-y-12">
            {post.hotels.map((hotel, index: number) => (
              <HotelCard key={index} index={index} hotel={{ ...hotel, price: hotel.price !== undefined ? hotel.price.toString() : undefined }} city={params.city} />
            ))}
          </div>
        </article>

        {/* Footer */}
        <footer className="mt-16 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-500">
            Thanks for reading! I hope this helps with your trip planning. 
            <span className="ml-1"></span>
          </p>
        </footer>
      </main>
    </div>
  )
}

interface HotelCardProps {
  index: number;
  hotel: {
    image: string;
    name: string;
    highlight: string;
    description: string;
    price?: string;
    rating?: number;
    location?: string;
    id?: string;
    tags?: string[];
    placeId?: string;
    isRefundable?: boolean;
  };
  city: string;
}

function HotelCard({ index, hotel, city }: HotelCardProps) {
  const isExternalUrl = hotel.image.startsWith('http://') || hotel.image.startsWith('https://')
  
  // Generate deep link for this hotel using the actual hotel ID
  const hotelDeepLink = hotel.id 
    ? generateHotelDeepLink(
        hotel.id, // Use the actual system hotel ID
        hotel.name,
        hotel.tags,
        hotel.isRefundable,
        undefined, // checkInDate - defaults to 30 days from now
        undefined, // checkOutDate - defaults to 33 days from now
        2, // adults
        0, // children
        hotel.placeId
      )
    : `${DEEP_LINK_BASE_URL}` // Fallback if no ID

  return (
    <article className="group">
      {/* Number Badge */}
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
          {index + 1}
        </span>
        <h2 className="font-serif text-2xl font-semibold text-neutral-900">{hotel.name}</h2>
      </div>

      {/* Location */}
      {hotel.location && (
        <p className="mb-4 flex items-center gap-1.5 text-sm text-neutral-600">
          <MarkerIcon className="h-4 w-4" />
          {hotel.location}
        </p>
      )}

     {/* Image - Now clickable with deep link */}
      <a 
        href={hotelDeepLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mb-5 block cursor-pointer overflow-hidden rounded-lg"
      >
        {isExternalUrl ? (
          <Image 
            src={hotel.image} 
            alt={hotel.name} 
            width={800}
            height={500}
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
            unoptimized
            style={{ maxHeight: '280px', objectFit: 'cover' }}
          />
        ) : (
          <div className="relative aspect-[16/9] w-full" style={{ maxHeight: '280px' }}>
            <Image 
              src={hotel.image} 
              alt={hotel.name} 
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Rating Badge */}
        {hotel.rating && (
          <div className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <StarIcon className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-sm font-medium text-neutral-800">{hotel.rating}</span>
            </div>
          </div>
        )}

        {/* Price Badge */}
        {hotel.price && (
          <div className="absolute bottom-3 right-3 rounded-md bg-neutral-900/90 px-3 py-2 backdrop-blur-sm">
            <div className="text-right">
              <div className="text-xs font-medium text-white/80">Starting at</div>
              <div className="text-lg font-bold text-white">{hotel.price}</div>
            </div>
          </div>
        )}
      </a>

      {/* Personal Note - Merged Highlight & Description */}
      <div className="mb-4 border-l-4 border-neutral-300 bg-neutral-50 py-3 pl-4 pr-3">
        <p className="text-base leading-relaxed text-neutral-700">
          <span className="font-semibold">{hotel.highlight}</span> {hotel.description}
        </p>
      </div>

      {/* Price & CTA - Now using deep link */}
      <div className="flex items-center justify-between gap-4">
        <a
          href={hotelDeepLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-7 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg hover:scale-[1.03]"
        >
          View Details
          <ArrowIcon className="h-5 w-5" />
        </a>
      </div>
    </article>
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

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}