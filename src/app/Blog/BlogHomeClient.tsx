// src/app/Blog/BlogHomeClient.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CityWithCount {
  city: string
  count: number
}

interface BlogHomeClientProps {
  cities: CityWithCount[]
}

/**
 * Client Component - Handles search and rendering
 */
export function BlogHomeClient({ cities }: BlogHomeClientProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCities = cities.filter(({ city }) =>
    city.replace(/-/g, ' ').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <PageHeader />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {filteredCities.length > 0 ? (
          <CitiesList cities={filteredCities} />
        ) : (
          <EmptyState searchTerm={searchTerm} />
        )}

        <Footer />
      </div>
    </div>
  )
}

/** ---------------------- Layout Components ---------------------- */
function PageHeader() {
  return (
    <header className="mb-8 border-b border-gray-200 pb-6">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Hotel Travel Guides
      </h1>
      <p className="text-gray-600">
        Browse destinations and find the perfect hotel
      </p>
    </header>
  )
}

function SearchBar({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (value: string) => void }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 pt-8 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} StayGenie. All rights reserved.
      </p>
    </footer>
  )
}

/** ---------------------- Content Sections ---------------------- */
function CitiesList({ cities }: { cities: CityWithCount[] }) {
  return (
    <div className="mb-8">
      <p className="mb-4 text-sm text-gray-500">
        {cities.length} {cities.length === 1 ? 'city' : 'cities'}
      </p>
      
      <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
        {cities.map(({ city, count }) => (
          <CityListItem key={city} city={city} count={count} />
        ))}
      </ul>
    </div>
  )
}

function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="py-12 text-center text-gray-500">
      {searchTerm ? (
        <p>No cities found matching &quot;{searchTerm}&quot;</p>
      ) : (
        <p>No guides available yet.</p>
      )}
    </div>
  )
}

/** ---------------------- List Item Component ---------------------- */
function CityListItem({ city, count }: { city: string; count: number }) {
  const cityName = city.replace(/-/g, ' ')

  return (
    <li>
      <Link
        href={`/Blog/${city}`}
        className="flex items-center justify-between py-3 transition hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-400">
            <PinIcon className="h-5 w-5" />
          </span>
          <span className="font-medium capitalize text-gray-900">
            {cityName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {count} {count === 1 ? 'guide' : 'guides'}
          </span>
          <ArrowIcon className="h-4 w-4 text-gray-400" />
        </div>
      </Link>
    </li>
  )
}

/** ---------------------- Icons ---------------------- */
function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" 
      />
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