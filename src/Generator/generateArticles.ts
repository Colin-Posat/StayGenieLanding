// generateArticles.ts
// Run this from your frontend/client directory
// Usage: npx tsx generateArticles.ts

import * as fs from 'fs';
import * as path from 'path';
import { CITIES_BY_WATER, CITIES_NOT_BY_WATER, type City } from './cities';

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
  lat?: number;
  lng?: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Article {
  city: string;
  title: string;
  excerpt: string;
  intro?: string;
  hotels: Hotel[];
  faqs: FAQ[];
}

interface ErrorResult {
  query: ArticleQuery;
  error: string;
}

// ============================================================================
// CONFIGURATION - Edit these values to change what articles are generated
// ============================================================================

// TEST MODE: Set to true to use limited cities and articles for testing
const TEST_MODE = false;
const MAX_ARTICLES = 300;
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

// Article templates with city type filtering
interface ArticleTemplate {
  titleTemplate: string;
  queryTemplate: string;
  cityType?: 'water' | 'non-water' | 'both';
}

const ARTICLE_TEMPLATES: ArticleTemplate[] = [
  // Universal templates (work for any city)
  {
    titleTemplate: "Best dog-friendly hotels in <city>",
    queryTemplate: "best dog friendly hotels in <city>",
    cityType: 'both'
  },
  {
    titleTemplate: "Best pet-friendly hotels in <city>",
    queryTemplate: "best pet friendly hotels in <city>",
    cityType: 'both'
  },
  {
    titleTemplate: "Best hotels for families with kids in <city>",
    queryTemplate: "hotels for families with kids in <city>",
    cityType: 'both'
  },
  {
    titleTemplate: "Best cheap, safe, and clean hotels in <city>",
    queryTemplate: "cheap safe clean hotels in <city>",
    cityType: 'both'
  },
  {
    titleTemplate: "Best hotels in <city> under $100",
    queryTemplate: "hotels in <city> under 100 dollars and clean",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with rooftop bars",
    queryTemplate: "hotels in <city> with rooftop bars",
    cityType: 'both'
  },
  {
    titleTemplate: "Best boutique hotels in <city>",
    queryTemplate: "boutique hotels in <city> affordable and stylish",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with breakfast included",
    queryTemplate: "affordable clean hotels in <city> with breakfast included",
    cityType: 'both'
  },
  {
    titleTemplate: "Best hotels in <city> for women travelers",
    queryTemplate: "best hotels in <city> for women travelers",
    cityType: 'both'
  },
  {
    titleTemplate: "Best hotels in <city> for weddings",
    queryTemplate: "best hotels in <city> for weddings luxury and affordable",
    cityType: 'both'
  },
  
  // Water city only templates
  {
    titleTemplate: "Best waterfront hotels in <city>",
    queryTemplate: "waterfront hotels in <city> ocean view beachfront hotels",
    cityType: 'water'
  },
  {
    titleTemplate: "Best <city> hotels with beach access",
    queryTemplate: "hotels in <city> with beach access oceanfront beachfront",
    cityType: 'water'
  },
  {
    titleTemplate: "Best <city> harbor view hotels",
    queryTemplate: "hotels in <city> with harbor view marina waterfront",
    cityType: 'water'
  },
  {
    titleTemplate: "Best beachfront hotels in <city>",
    queryTemplate: "beachfront hotels in <city> on the beach ocean view",
    cityType: 'water'
  },
  
  // Non-water city templates
  {
    titleTemplate: "Best <city> hotels with mountain views",
    queryTemplate: "hotels in <city> with mountain views scenic views nature",
    cityType: 'non-water'
  },
  
  // More universal templates
  {
    titleTemplate: "Best <city> hotels with rooftop pools",
    queryTemplate: "hotels in <city> with rooftop pool infinity pool",
    cityType: 'both'
  },
  {
    titleTemplate: "Best luxury boutique hotels in <city>",
    queryTemplate: "luxury boutique hotels in <city> upscale small hotels",
    cityType: 'both'
  },
  {
    titleTemplate: "Best downtown <city> hotels with free breakfast",
    queryTemplate: "downtown <city> hotels with breakfast included city center",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with rooftop restaurants",
    queryTemplate: "hotels in <city> with rooftop restaurant dining views",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with infinity pools",
    queryTemplate: "hotels in <city> with infinity pool rooftop pool views",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with spa and wellness centers",
    queryTemplate: "hotels in <city> with spa wellness center massage services",
    cityType: 'both'
  },
  {
    titleTemplate: "Best historic boutique hotels in <city>",
    queryTemplate: "historic boutique hotels in <city> heritage hotels character",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels near convention center",
    queryTemplate: "hotels near <city> convention center walking distance business",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with 24/7 room service",
    queryTemplate: "hotels in <city> with 24 hour room service late night dining",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with in-room jacuzzis",
    queryTemplate: "hotels in <city> with jacuzzi in room hot tub suite",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> airport hotels with free shuttle under $150",
    queryTemplate: "cheap hotels near <city> airport with free shuttle service",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with connecting rooms",
    queryTemplate: "hotels in <city> with connecting rooms family suites",
    cityType: 'both'
  },
  {
    titleTemplate: "Best quiet hotels in <city> for light sleepers",
    queryTemplate: "quiet peaceful hotels in <city> soundproof rooms away from noise",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with kitchenettes",
    queryTemplate: "hotels in <city> with kitchenette kitchen extended stay",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels for solo female travelers",
    queryTemplate: "safe hotels in <city> for solo female travelers women only",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with EV charging stations",
    queryTemplate: "hotels in <city> with electric vehicle charging tesla charging",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with private balconies",
    queryTemplate: "hotels in <city> with private balcony terrace city view",
    cityType: 'both'
  },
  {
    titleTemplate: "Best <city> hotels with coworking spaces",
    queryTemplate: "hotels in <city> with coworking space business center digital nomad",
    cityType: 'both'
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

// Convert cities to ArticleQuery format with city-type filtering
function createArticleQueries(): ArticleQuery[] {
  const queries: ArticleQuery[] = [];
  
  // Get all cities to process
  const allCities = getCitiesToProcess();
  
  // Categorize cities by water/non-water
  const waterCities = allCities.filter(city => 
    CITIES_BY_WATER.some(wc => wc.slug === city.slug)
  );
  
  const nonWaterCities = allCities.filter(city => 
    CITIES_NOT_BY_WATER.some(nwc => nwc.slug === city.slug)
  );
  
  console.log(`\n📊 City Distribution:`);
  console.log(`   Water cities: ${waterCities.length}`);
  console.log(`   Non-water cities: ${nonWaterCities.length}`);
  console.log(`   Total cities: ${allCities.length}\n`);
  
  // Process each template
  for (const template of ARTICLE_TEMPLATES) {
    let citiesToUse: City[] = [];
    
    // Determine which cities to use based on template type
    if (template.cityType === 'water') {
      citiesToUse = waterCities;
    } else if (template.cityType === 'non-water') {
      citiesToUse = nonWaterCities;
    } else {
      // 'both' or undefined = use all cities
      citiesToUse = allCities;
    }
    
    // Create queries for appropriate cities
    for (const city of citiesToUse) {
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

    // Step 2.5: Validate coordinates
    const missingCoordinates = article.hotels.filter(h => !h.lat || !h.lng).length;
    const validCoordinates = article.hotels.length - missingCoordinates;
    console.log(`📍 Coordinates: ${validCoordinates} valid, ${missingCoordinates} missing`);

    // Step 2.75: Validate FAQs
    const faqCount = article.faqs?.length || 0;
    console.log(`❓ FAQs: ${faqCount} generated`);

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
      hotelsWithCoordinates: article.hotels.filter((h: Hotel) => h.lat && h.lng).length,
      faqCount: faqCount,
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
  let ARTICLE_QUERIES = createArticleQueries();
  if (MAX_ARTICLES && ARTICLE_QUERIES.length > MAX_ARTICLES) {
    console.log(`⚠️  Limiting generation from ${ARTICLE_QUERIES.length} to ${MAX_ARTICLES} articles`);
    ARTICLE_QUERIES = ARTICLE_QUERIES.slice(0, MAX_ARTICLES);
  }
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🚀 Starting article generation for ${ARTICLE_QUERIES.length} articles`);
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🚀 Starting article generation for ${ARTICLE_QUERIES.length} articles`);
  if (TEST_MODE) {
    console.log(`   🧪 TEST MODE: Using ${TEST_CITIES.length} test cities`);
  }
  console.log(`   Each article will include hotels + coordinates + FAQs and be saved locally`);
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
  let totalMissingCoordinates = 0;
  let totalFAQs = 0;
  results.forEach((article: Article) => {
    const missingIds = article.hotels.filter(h => !h.id).length;
    const missingCoords = article.hotels.filter(h => !h.lat || !h.lng).length;
    totalMissingIds += missingIds;
    totalMissingCoordinates += missingCoords;
    totalFAQs += article.faqs?.length || 0;
  });

  if (totalMissingIds > 0) {
    console.warn(`\n⚠️  Warning: ${totalMissingIds} hotels are missing IDs across all articles`);
  } else {
    console.log(`\n✅ All hotels have valid IDs`);
  }

  if (totalMissingCoordinates > 0) {
    console.warn(`⚠️  Warning: ${totalMissingCoordinates} hotels are missing coordinates across all articles`);
  } else {
    console.log(`✅ All hotels have coordinates`);
  }

  console.log(`✅ Total FAQs generated: ${totalFAQs} (avg ${(totalFAQs / results.length).toFixed(1)} per article)`);

  // Save summary file
  const summaryPath = path.join(process.cwd(), 'generation-summary.json');
  const summary = {
    generatedAt: new Date().toISOString(),
    totalRequested: ARTICLE_QUERIES.length,
    totalGenerated: results.length,
    totalFailed: errors.length,
    durationMinutes: parseFloat(duration),
    totalFAQs: totalFAQs,
    avgFAQsPerArticle: parseFloat((totalFAQs / results.length).toFixed(1)),
    totalMissingCoordinates: totalMissingCoordinates,
    successfulArticles: results.map(a => ({
      city: a.city,
      title: a.title,
      slug: createSlug(a.title),
      hotelCount: a.hotels.length,
      hotelsWithCoordinates: a.hotels.filter(h => h.lat && h.lng).length,
      faqCount: a.faqs?.length || 0
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
  console.log(`✅ All done! ${results.length} articles generated with hotels + coordinates + FAQs.`);
  console.log(`${'='.repeat(80)}\n`);
}

// Run the script
generateArticles().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});