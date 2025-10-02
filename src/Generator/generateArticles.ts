// generateArticles.ts
// Run this from your frontend/client directory
// Usage: npx ts-node generateArticles.ts

import fs from 'fs';
import path from 'path';

const API_BASE_URL = 'http://localhost:3003';

interface ArticleQuery {
  city: string;
  query: string;
  title: string;
}

interface Hotel {
  id?: string;
  name: string;
  image: string;
  highlight: string;
  description: string;
  price?: string;
  rating?: number;
  location?: string;
  tags?: string[];
  isRefundable?: boolean;
}

interface Article {
  city: string;
  title: string;
  excerpt: string;
  hotels: Hotel[];
}

interface ErrorResult {
  query: ArticleQuery;
  error: string;
}

interface GenerateResponse {
  totalRequested: number;
  totalGenerated: number;
  totalFailed: number;
  articles: Article[];
  errors?: ErrorResult[];
}

// Define your article queries here
const ARTICLE_QUERIES: ArticleQuery[] = [


  {
    city: "las-vegas",
    query: "best cheap safe clean hotels in las vegas",
    title: "Best Cheap, Safe, Clean Hotels in Las Vegas"
  },
  {
    city: "san-francisco",
    query: "hotels in san francisco for women travelers safe clean amenities",
    title: "Best Hotels in San Francisco for Women Travelers: Safe, Clean and Great Amenities"
  },
];

// Helper function to create a URL-safe slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generateArticles() {
  console.log(`🚀 Starting article generation for ${ARTICLE_QUERIES.length} queries...\n`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/generate-batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articles: ARTICLE_QUERIES
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json() as GenerateResponse;
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ Generation Complete!`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Total Requested: ${data.totalRequested}`);
    console.log(`Successfully Generated: ${data.totalGenerated}`);
    console.log(`Failed: ${data.totalFailed}`);
    
    if (data.errors && data.errors.length > 0) {
      console.log(`\n❌ Errors:`);
      data.errors.forEach((err: ErrorResult) => {
        console.log(`  - ${err.query.title}: ${err.error}`);
      });
    }

    // Validate that hotel IDs are present
    let missingIds = 0;
    data.articles.forEach((article: Article) => {
      article.hotels.forEach((hotel: Hotel) => {
        if (!hotel.id) {
          console.warn(`⚠️  Missing hotel ID for: ${hotel.name} in ${article.city}`);
          missingIds++;
        }
      });
    });

    if (missingIds > 0) {
      console.warn(`\n⚠️  Warning: ${missingIds} hotels are missing IDs`);
    } else {
      console.log(`\n✅ All hotels have valid IDs`);
    }

    // Save all articles to a single summary file
    const outputPath = path.join(process.cwd(), 'generated-articles.json');
    fs.writeFileSync(
      outputPath, 
      JSON.stringify(data.articles, null, 2), 
      'utf8'
    );
    
    console.log(`\n📄 All articles saved to: ${outputPath}`);

    // Save individual files organized by city
    const articlesBaseDir = path.join(process.cwd(), 'generated-articles');
    
    // Create base directory if it doesn't exist
    if (!fs.existsSync(articlesBaseDir)) {
      fs.mkdirSync(articlesBaseDir, { recursive: true });
    }

    data.articles.forEach((article: Article) => {
      // Create city folder if it doesn't exist
      const cityDir = path.join(articlesBaseDir, article.city);
      if (!fs.existsSync(cityDir)) {
        fs.mkdirSync(cityDir, { recursive: true });
        console.log(`📁 Created directory: ${article.city}/`);
      }

      // Create safe filename and slug
      const slug = createSlug(article.title);
      const filename = `${slug}.json`;
      const filepath = path.join(cityDir, filename);
      
      // Add metadata to article
      const articleWithMetadata = {
        ...article,
        slug: slug,
        generatedAt: new Date().toISOString(),
        hotelCount: article.hotels.length,
        // Validate hotel IDs
        hotelsWithIds: article.hotels.filter((h: Hotel) => h.id).length,
        // Deep link format example
        deepLinkExample: article.hotels[0]?.id 
          ? `https://staygenie.nuitee.link/hotels/${article.hotels[0].id}`
          : 'No hotel ID available'
      };
      
      // Save article
      fs.writeFileSync(filepath, JSON.stringify(articleWithMetadata, null, 2), 'utf8');
      console.log(`💾 Saved: ${article.city}/${filename}`);
      
      // Print hotel IDs for verification
      console.log(`   Hotels (${article.hotels.length}):`);
      article.hotels.forEach((hotel: Hotel, idx: number) => {
        console.log(`     ${idx + 1}. ${hotel.name} - ID: ${hotel.id || '❌ MISSING'}`);
      });
      console.log('');
    });

    // Generate a Next.js compatible blog data file
    const blogDataPath = path.join(process.cwd(), 'blog-data.ts');
    generateBlogDataFile(data.articles, blogDataPath);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ All done! Individual articles saved to: ${articlesBaseDir}/`);
    console.log(`✅ Next.js blog data file: ${blogDataPath}`);
    console.log(`${'='.repeat(60)}\n`);

  } catch (error) {
    console.error('❌ Error generating articles:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack:', error.stack);
    }
    
    process.exit(1);
  }
}

// Generate a Next.js compatible TypeScript file for blog data
function generateBlogDataFile(articles: Article[], outputPath: string) {
  type ArticleWithSlug = Article & { slug: string };
  const groupedArticles = articles.reduce((acc: Record<string, ArticleWithSlug[]>, article: Article) => {
    if (!acc[article.city]) {
      acc[article.city] = [];
    }
    acc[article.city].push({
      city: article.city,
      slug: createSlug(article.title),
      title: article.title,
      excerpt: article.excerpt,
      hotels: article.hotels
    });
    return acc;
  }, {} as Record<string, ArticleWithSlug[]>);

  const blogData = `// Auto-generated blog data - DO NOT EDIT MANUALLY
// Generated: ${new Date().toISOString()}

export interface BlogHotel {
  id: string; // System hotel ID for deep linking
  name: string;
  image: string;
  highlight: string;
  description: string;
  price?: string;
  rating?: number;
  location?: string;
  tags?: string[];
  isRefundable?: boolean;
}

export interface BlogPost {
  city: string;
  slug: string;
  title: string;
  excerpt: string;
  hotels: BlogHotel[];
}

export const blogPosts: Record<string, BlogPost[]> = ${JSON.stringify(
  groupedArticles,
  null,
  2
)};

export function getAllCities(): string[] {
  return Object.keys(blogPosts);
}

export function getCityPosts(city: string): BlogPost[] {
  return blogPosts[city] || [];
}

export function getPost(city: string, slug: string): BlogPost | null {
  const posts = getCityPosts(city);
  return posts.find(post => post.slug === slug) || null;
}

export function getAllPosts(): BlogPost[] {
  return Object.values(blogPosts).flat();
}
`;

  fs.writeFileSync(outputPath, blogData, 'utf8');
  console.log(`📝 Generated Next.js blog data file: ${outputPath}`);
}

// Run the script
generateArticles();