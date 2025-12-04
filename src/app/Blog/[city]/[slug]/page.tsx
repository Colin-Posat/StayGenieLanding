// app/Blog/[city]/[slug]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllCities, getCityPosts, getPost } from '@/lib/blog'
import { TrackableLink } from './TrackableLink'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const params: { city: string; slug: string }[] = []
  for (const city of getAllCities()) {
    for (const post of getCityPosts(city)) {
      params.push({ city, slug: post.slug })
    }
  }
  return params
}

const EXPEDIA_SITE_ID = "1";
const EXPEDIA_CAMREF = "1011l5hwiD";
const EXPEDIA_CREATIVE_REF = "1100l68075";
const EXPEDIA_AD_REF = "PZY3wKCo4x";

// Removed slugify() because unused

function applyTieredDiscount(price: string): string {
  const match = price.match(/^\s*([^\d.,-]*)\s*([\d.,-]+)/);
  if (!match) return price;

  const prefix = match[1] ?? "";
  const numeric = (match[2] ?? "").replace(/,/g, "");
  const base = parseFloat(numeric);
  if (isNaN(base)) return price;

  let multiplier = 1;
  if (base < 200) multiplier = 0.8;
  else if (base <= 700) multiplier = 0.7;
  else multiplier = 0.62;

  const discounted = base * multiplier;

  const consumedLen = match[0].length;
  const suffix = price.slice(consumedLen).trim();

  const formatted = discounted.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });

  return `${prefix}${formatted}${suffix ? ` ${suffix}` : ""}`;
}

function generateExpediaDeepLink(
  hotelName: string,
  city?: string
): string {
  const expediaUrl = new URL("https://www.expedia.com/Hotel-Search");

  expediaUrl.searchParams.set("destination", hotelName);
  expediaUrl.searchParams.set("hotelName", hotelName);
  expediaUrl.searchParams.set("sort", "RECOMMENDED");

  const affiliateUrl = new URL("https://expedia.com/affiliate");
  affiliateUrl.searchParams.set("siteid", EXPEDIA_SITE_ID);
  affiliateUrl.searchParams.set("landingPage", expediaUrl.toString());
  affiliateUrl.searchParams.set("camref", EXPEDIA_CAMREF);
  affiliateUrl.searchParams.set("creativeref", EXPEDIA_CREATIVE_REF);
  affiliateUrl.searchParams.set("adref", EXPEDIA_AD_REF);

  return affiliateUrl.toString();
}

/** Metadata */
export async function generateMetadata(
  { params }: { params: Promise<{ city: string; slug: string }> }
): Promise<Metadata> {
  const { city, slug } = await params
  const post = getPost(city, slug)

  if (!post) {
    return {
      title: 'Post not found – StayGenie',
      description: 'This page could not be found.',
    }
  }

  const cityName = city.charAt(0).toUpperCase() + city.slice(1)

  const catchyTitle = post.title.includes(cityName)
    ? `${post.title} | Best ${cityName} Hotels & Deals`
    : `${post.title} in ${cityName} | Best Hotels & Deals`

  const description = post.excerpt
    ? `${post.excerpt} Compare top-rated stays, find good prices, and pick the right area to stay in ${cityName}.`
    : `Find the best hotels and deals in ${cityName}. Handpicked stays, areas worth booking, and where you actually want to sleep.`

  const ogImage = post.hotels?.[0]?.image ?? '/default-og.jpg'

  return {
    title: catchyTitle,
    description,
    openGraph: {
      title: catchyTitle,
      description,
      url: `https://staygenie.app/Blog/${city}/${slug}`,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: catchyTitle,
      description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ city: string; slug: string }>
}) {
  const { city, slug } = await params

  const post = getPost(city, slug)
  if (!post) return notFound()

  return (
    <div className="min-h-screen bg-[#fefdfb]">
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-lg max-w-none">
          <header className="mb-12 border-b border-neutral-200 pb-8">
            <h1 className="mb-3 font-serif text-3xl leading-snug text-neutral-800 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mb-4 text-lg leading-relaxed text-neutral-600">
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="space-y-12">
            {post.hotels.map((hotel, index: number) => (
              <HotelCard
                key={index}
                index={index}
                hotel={{
                  ...hotel,
                  price:
                    hotel.price !== undefined
                      ? hotel.price.toString()
                      : undefined,
                }}
                city={city}
              />
            ))}
          </div>
        </article>

        <footer className="mt-16 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-500">
            Thanks for reading! I hope this helps with your trip planning.
          </p>
        </footer>
      </main>
    </div>
  )
}

interface HotelCardProps {
  index: number
  hotel: {
    image: string
    name: string
    highlight: string
    description: string
    price?: string
    rating?: number
    location?: string
    id?: string
    tags?: string[]
    placeId?: string
    isRefundable?: boolean
  }
  city: string
}

function HotelCard({ index, hotel, city }: HotelCardProps) {
  const isExternalUrl =
    hotel.image.startsWith('http://') || hotel.image.startsWith('https://')

  const hotelDeepLink = generateExpediaDeepLink(
    hotel.name,
    city
  )

  const shouldPriorityLoad = index < 2

  return (
    <article className="group">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
          {index + 1}
        </span>
        <h2 className="font-serif text-2xl font-semibold text-neutral-900">
          {hotel.name}
        </h2>
      </div>

      {hotel.location && (
        <p className="mb-4 flex items-center gap-1.5 text-sm text-neutral-600">
          <MarkerIcon className="h-4 w-4" />
          {hotel.location}
        </p>
      )}

      <TrackableLink
        href={hotelDeepLink}
        hotelName={hotel.name}
        city={city}
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
            loading={shouldPriorityLoad ? 'eager' : 'lazy'}
            priority={shouldPriorityLoad}
            style={{ maxHeight: '280px', objectFit: 'cover' }}
          />
        ) : (
          <div
            className="relative aspect-[16/9] w-full"
            style={{ maxHeight: '280px' }}
          >
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading={shouldPriorityLoad ? 'eager' : 'lazy'}
              priority={shouldPriorityLoad}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </div>
        )}

        {hotel.rating && (
          <div className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <StarIcon className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-sm font-medium text-neutral-800">
                {hotel.rating}
              </span>
            </div>
          </div>
        )}

        {hotel.price && (
          <div className="absolute bottom-3 right-3 rounded-md bg-neutral-900/90 px-3 py-2 backdrop-blur-sm">
            <div className="text-right">
              <div className="text-xs font-medium text-white/80">
                Starting at
              </div>
              <div className="text-lg font-bold text-white">
                {applyTieredDiscount(hotel.price)}
              </div>
            </div>
          </div>
        )}
      </TrackableLink>

      <div className="mb-4 border-l-4 border-neutral-300 bg-neutral-50 py-3 pl-4 pr-3">
        <p className="text-base leading-relaxed text-neutral-700">
          <span className="font-semibold">{hotel.highlight}</span>{' '}
          {hotel.description}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <TrackableLink
          href={hotelDeepLink}
          hotelName={hotel.name}
          city={city}
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-7 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg hover:scale-[1.03]"
        >
          View Details
          <ArrowIcon className="h-5 w-5" />
        </TrackableLink>
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
