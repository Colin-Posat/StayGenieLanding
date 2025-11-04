// generateArticles.ts
// Run this from your frontend/client directory
// Usage: npx tsx generateArticles.ts

import fs from 'fs';
import path from 'path';
import { CITIES_BY_WATER, CITIES_NOT_BY_WATER, type City } from './cities.ts';

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
  intro?: string;
  hotels: Hotel[];
}

interface ErrorResult {
  query: ArticleQuery;
  error: string;
}

// ============================================================================
// CONFIGURATION - Edit these values to change what articles are generated
// ============================================================================

// TEST MODE: Set to true to use limited cities and articles for testing
const TEST_MODE = true;

// Test cities - 15 popular tourist destinations
const TEST_CITIES: City[] = [
  { name: "Paris", slug: "paris" },
  { name: "New York", slug: "new-york" },
  { name: "London", slug: "london" },
  { name: "Tokyo", slug: "tokyo" },
  { name: "Barcelona", slug: "barcelona" },
  { name: "Rome", slug: "rome" },
  { name: "Dubai", slug: "dubai" },
  { name: "Los Angeles", slug: "los-angeles" },
  { name: "Miami", slug: "miami" },
  { name: "Las Vegas", slug: "las-vegas" },
  { name: "San Francisco", slug: "san-francisco" },
  { name: "Amsterdam", slug: "amsterdam" },
  { name: "Sydney", slug: "sydney" },
  { name: "Bangkok", slug: "bangkok" },
  { name: "Singapore", slug: "singapore" },
];

// Article templates - 10 different types (will generate all 10 for each city = 150 total)
interface ArticleTemplate {
  titleTemplate: string;
  queryTemplate: string;
}

const ARTICLE_TEMPLATES: ArticleTemplate[] = [
  {
    titleTemplate: "What are the best dog-friendly hotels in <city>",
    queryTemplate: "best dog friendly hotels in <city>"
  },
  {
    titleTemplate: "What are the best pet-friendly hotels in <city>",
    queryTemplate: "best pet friendly hotels in <city>"
  },
  {
    titleTemplate: "Amazing hotels for families with kids in <city>",
    queryTemplate: "hotels for families with kids in <city>"
  },
  {
    titleTemplate: "Best cheap, safe, and clean hotels in <city>",
    queryTemplate: "cheap safe clean hotels in <city>"
  },
  {
    titleTemplate: "What are the best hotels in <city> under $100 and clean",
    queryTemplate: "hotels in <city> under 100 dollars and clean"
  },
  {
    titleTemplate: "Rooftop Bars: What are the best hotels in <city> with rooftop bars",
    queryTemplate: "hotels in <city> with rooftop bars"
  },
  {
    titleTemplate: "Best boutique hotels in <city>: Amazing and affordable",
    queryTemplate: "boutique hotels in <city> affordable and stylish"
  },
  {
    titleTemplate: "What are the affordable, clean hotels in <city> with breakfast included",
    queryTemplate: "affordable clean hotels in <city> with breakfast included"
  },
  {
    titleTemplate: "Best hotels in <city> for women travelers: Safe, clean, and great amenities",
    queryTemplate: "best hotels in <city> for women travelers"
  },
  {
    titleTemplate: "Best hotels in <city> for weddings: Luxurious but affordable",
    queryTemplate: "best hotels in <city> for weddings luxury and affordable"
  }
];


// Which cities to generate articles for when NOT in test mode:
// Options: 'water', 'non-water', 'both'
const CITY_TYPE: 'water' | 'non-water' | 'both' = 'both';

// ============================================================================

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get the appropriate city list based on configuration
function getCitiesToProcess(): City[] {
  // If in test mode, return test cities (unshuffled for consistency)
  if (TEST_MODE) {
    return TEST_CITIES;
  }
  
  let cities: City[];
  
  switch (CITY_TYPE) {
    case 'water':
      cities = [...CITIES_BY_WATER];
      break;
    case 'non-water':
      cities = [...CITIES_NOT_BY_WATER];
      break;
    case 'both':
      cities = [...CITIES_BY_WATER, ...CITIES_NOT_BY_WATER];
      break;
    default:
      throw new Error(`Invalid CITY_TYPE: ${CITY_TYPE}`);
  }
  
  // Randomize the order
  return shuffleArray(cities);
}

// Replace <city> placeholder with actual city name
function fillTemplate(template: string, cityName: string): string {
  return template.replace(/<city>/g, cityName);
}

// Convert cities to ArticleQuery format
function createArticleQueries(): ArticleQuery[] {
  const cities = getCitiesToProcess();
  const queries: ArticleQuery[] = [];
  
  // For each city, create an article for each template
  for (const city of cities) {
    for (const template of ARTICLE_TEMPLATES) {
      queries.push({
        city: city.slug,
        query: fillTemplate(template.queryTemplate, city.name),
        title: fillTemplate(template.titleTemplate, city.name)
      });
    }
  }
  
  // Shuffle the final queries for random order
  return shuffleArray(queries);
}

// Helper function to create a URL-safe slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate a single article and save it locally
async function generateAndPushArticle(
  query: ArticleQuery,
  index: number,
  total: number
): Promise<{ success: boolean; article?: Article; error?: string }> {

  console.log(`\n${'='.repeat(60)}`);
  console.log(`📝 Article ${index + 1}/${total}: ${query.title}`);
  console.log(`${'='.repeat(60)}`);

  try {
    // Step 1: Generate the article
    console.log(`🔄 Generating article...`);
    const response = await fetch(`${API_BASE_URL}/api/articles/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Generation failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const article = data.article as Article;

    console.log(`✅ Article generated successfully`);

    // Step 2: Validate hotel IDs
    const missingIds = article.hotels.filter(h => !h.id).length;
    const validIds = article.hotels.length - missingIds;
    console.log(`🔍 Hotel IDs: ${validIds} valid, ${missingIds} missing`);

    // Step 3: Save article locally
    console.log(`💾 Saving article locally...`);
    const slug = createSlug(article.title);
    const articlesDir = path.join(process.cwd(), 'generated-articles', article.city);

    // Create directory if it doesn't exist
    if (!fs.existsSync(articlesDir)) {
      fs.mkdirSync(articlesDir, { recursive: true });
    }

    const filepath = path.join(articlesDir, `${slug}.json`);
    const articleWithMetadata = {
      ...article,
      slug: slug,
      generatedAt: new Date().toISOString(),
      hotelCount: article.hotels.length,
      hotelsWithIds: article.hotels.filter((h: Hotel) => h.id).length,
    };

    fs.writeFileSync(filepath, JSON.stringify(articleWithMetadata, null, 2), 'utf8');
    console.log(`✅ Article saved to: ${filepath}`);

    return { success: true, article };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Failed to process article: ${errorMessage}`);
    return { success: false, error: errorMessage };
  }
}

async function generateArticles() {
  const ARTICLE_QUERIES = createArticleQueries();
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🚀 Starting article generation for ${ARTICLE_QUERIES.length} articles`);
  if (TEST_MODE) {
    console.log(`   🧪 TEST MODE: Using ${TEST_CITIES.length} cities × ${ARTICLE_TEMPLATES.length} article types`);
  }
  console.log(`   Each article will be saved locally after generation`);
  console.log(`${'='.repeat(80)}\n`);

  const results: Article[] = [];
  const errors: ErrorResult[] = [];
  const startTime = Date.now();

  // Process each article sequentially
  for (let i = 0; i < ARTICLE_QUERIES.length; i++) {
    const query = ARTICLE_QUERIES[i];

    const result = await generateAndPushArticle(query, i, ARTICLE_QUERIES.length);

    if (result.success && result.article) {
      results.push(result.article);
    } else {
      errors.push({
        query: query,
        error: result.error || 'Unknown error'
      });
    }

    // Add delay between articles to avoid rate limiting
    if (i < ARTICLE_QUERIES.length - 1) {
      console.log(`\n⏳ Waiting 2 seconds before next article...\n`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Final summary
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);

  console.log(`\n${'='.repeat(80)}`);
  console.log(`✅ Batch Generation Complete!`);
  console.log(`${'='.repeat(80)}`);
  console.log(`Total Requested: ${ARTICLE_QUERIES.length}`);
  console.log(`Successfully Generated: ${results.length}`);
  console.log(`Failed: ${errors.length}`);
  console.log(`Duration: ${duration} minutes`);

  if (errors.length > 0) {
    console.log(`\n❌ Failed Articles:`);
    errors.forEach((err) => {
      console.log(`  - ${err.query.title}`);
      console.log(`    Error: ${err.error}`);
    });
  }

  // Validate hotel IDs across all articles
  let totalMissingIds = 0;
  results.forEach((article: Article) => {
    const missing = article.hotels.filter(h => !h.id).length;
    totalMissingIds += missing;
  });

  if (totalMissingIds > 0) {
    console.warn(`\n⚠️  Warning: ${totalMissingIds} hotels are missing IDs across all articles`);
  } else {
    console.log(`\n✅ All hotels have valid IDs`);
  }

  // Save summary file
  const summaryPath = path.join(process.cwd(), 'generation-summary.json');
  const summary = {
    generatedAt: new Date().toISOString(),
    totalRequested: ARTICLE_QUERIES.length,
    totalGenerated: results.length,
    totalFailed: errors.length,
    durationMinutes: parseFloat(duration),
    successfulArticles: results.map(a => ({
      city: a.city,
      title: a.title,
      slug: createSlug(a.title),
      hotelCount: a.hotels.length
    })),
    failedArticles: errors.map(e => ({
      city: e.query.city,
      title: e.query.title,
      error: e.error
    }))
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`\n📊 Summary saved to: ${summaryPath}`);

  console.log(`\n${'='.repeat(80)}`);
  console.log(`✅ All done! ${results.length} articles pushed to website.`);
  console.log(`${'='.repeat(80)}\n`);
}

// Run the script
generateArticles().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});