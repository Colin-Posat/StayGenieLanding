// lib/blog.ts
import fs from 'fs'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import path from 'path'

export type Hotel = {
  name: string
  image: string
  description: string
  highlight: string
}

export type BlogPost = {
  aiInsight: any
  hotelName: string
  hotelImage: string | StaticImport
  slug: string
  city: string
  query: string
  title: string
  intro: string
  hotels: Hotel[]
  dateAdded?: string
}

const DATA_FILE = path.join(process.cwd(), 'content', 'blog-posts.json')

function loadPosts(): BlogPost[] {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2))
    return []
  }

  const raw = fs.readFileSync(DATA_FILE, 'utf8')
  const data = JSON.parse(raw)
  
  return data.map((item: any) => ({
    ...item,
    slug: item.slug || createSlug(item.query),
    city: item.city.toLowerCase().trim(),
    dateAdded: item.dateAdded || new Date().toISOString(),
  }))
}

function createSlug(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getAllCities(): string[] {
  const posts = loadPosts()
  const cities = [...new Set(posts.map(p => p.city))]
  return cities.sort()
}

export function getCityPosts(city: string): BlogPost[] {
  const posts = loadPosts()
  return posts.filter(p => p.city === city.toLowerCase())
}

export function getPost(city: string, slug: string): BlogPost | null {
  const posts = loadPosts()
  return posts.find(p => p.city === city.toLowerCase() && p.slug === slug) || null
}

export function getAllPosts(): BlogPost[] {
  return loadPosts()
}