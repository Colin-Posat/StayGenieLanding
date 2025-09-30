// lib/blog.ts
import fs from 'fs'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import path from 'path'

export type Hotel = {
  name: string
  image: string
  description: string
  highlight: string
  price?: number
  rating?: number
  location?: string
}

export type BlogPost = {
  aiInsight?: unknown
  hotelName?: string
  hotelImage?: string | StaticImport
  slug: string
  city: string
  query?: string
  title: string
  intro?: string
  hotels: Hotel[]
  dateAdded?: string
  excerpt?: string
}

const GENERATED_ARTICLES_DIR = path.join(process.cwd(), 'src', 'Generator', 'generated-articles')

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function loadPosts(): BlogPost[] {
  if (!fs.existsSync(GENERATED_ARTICLES_DIR)) {
    return []
  }

  const posts: BlogPost[] = []

  // Read all city folders
  const cityFolders = fs.readdirSync(GENERATED_ARTICLES_DIR).filter(item => {
    const itemPath = path.join(GENERATED_ARTICLES_DIR, item)
    return fs.statSync(itemPath).isDirectory()
  })

  // Read JSON files from each city folder
  for (const city of cityFolders) {
    const cityPath = path.join(GENERATED_ARTICLES_DIR, city)
    const files = fs.readdirSync(cityPath).filter(file => file.endsWith('.json'))

    for (const file of files) {
      const filePath = path.join(cityPath, file)
      const content = fs.readFileSync(filePath, 'utf8')
      const data = JSON.parse(content) as Partial<BlogPost>

      posts.push({
        ...data,
        slug: data.slug || createSlug(data.title || ''),
        city: city.toLowerCase().trim(),
        title: data.title || '',
        hotels: data.hotels || [],
        dateAdded: data.dateAdded || new Date().toISOString(),
      })
    }
  }

  return posts
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