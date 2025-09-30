// src/app/Blog/page.tsx
import { getAllCities, getCityPosts } from '@/lib/blog'
import type { Metadata } from 'next'
import { BlogHomeClient } from './BlogHomeClient'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Hotel Travel Guides | StayGenie',
  description: 'Discover the best hotels for every occasion in cities around the world. Browse curated guides by destination.',
}

/**
 * Server Component - Fetches data
 */
export default function BlogHomePage() {
  const cities = getAllCities()
  
  // Get guide counts for each city
  const citiesWithCounts = cities.map(city => ({
    city,
    count: getCityPosts(city).length
  }))

  return <BlogHomeClient cities={citiesWithCounts} />
}