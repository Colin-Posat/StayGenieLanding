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
  intro?: string;
  hotels: Hotel[];
}

interface ErrorResult {
  query: ArticleQuery;
  error: string;
}

// Define your article queries here
const ARTICLE_QUERIES: ArticleQuery[] = [
  {
    city: "los-angeles",
    query: "best boutique hotels in los angeles with rooftop bars",
    title: "Best Boutique Hotels in Los Angeles with Rooftop Bars"
  },
  {
    city: "new-york",
    query: "top boutique hotels in new york city with skyline views",
    title: "Top Boutique Hotels in New York City with Skyline Views"
  },
  {
    city: "miami",
    query: "best miami hotels with rooftop pools and ocean views",
    title: "Best Miami Hotels with Rooftop Pools and Ocean Views"
  },
  {
    city: "chicago",
    query: "best boutique hotels in chicago with rooftop lounges",
    title: "Best Boutique Hotels in Chicago with Rooftop Lounges"
  },
  {
    city: "san-francisco",
    query: "best san francisco boutique hotels near union square",
    title: "Best San Francisco Boutique Hotels near Union Square"
  },
  {
    city: "portland",
    query: "cool boutique hotels in portland with rooftop bars",
    title: "Cool Boutique Hotels in Portland with Rooftop Bars"
  },
  {
    city: "denver",
    query: "best boutique hotels in denver with mountain views",
    title: "Best Boutique Hotels in Denver with Mountain Views"
  },
  {
    city: "savannah",
    query: "most charming boutique hotels in savannah historic district",
    title: "Most Charming Boutique Hotels in Savannah's Historic District"
  },
  {
    city: "charleston",
    query: "best boutique hotels in charleston with rooftop bars",
    title: "Best Boutique Hotels in Charleston with Rooftop Bars"
  },
  {
    city: "san-diego",
    query: "best san diego boutique hotels with rooftop bars",
    title: "Best San Diego Boutique Hotels with Rooftop Bars"
  },
  {
    city: "las-vegas",
    query: "unique boutique hotels in las vegas off the strip",
    title: "Unique Boutique Hotels in Las Vegas Off the Strip"
  },
  {
    city: "new-orleans",
    query: "best boutique hotels in new orleans french quarter",
    title: "Best Boutique Hotels in New Orleans French Quarter"
  },
  {
    city: "scottsdale",
    query: "best boutique hotels in scottsdale with rooftop pools",
    title: "Best Boutique Hotels in Scottsdale with Rooftop Pools"
  },
  {
    city: "austin",
    query: "cool boutique hotels in austin with live music and rooftop bars",
    title: "Cool Boutique Hotels in Austin with Live Music and Rooftop Bars"
  },
  {
    city: "seattle",
    query: "best boutique hotels in seattle with rooftop views",
    title: "Best Boutique Hotels in Seattle with Rooftop Views"
  },
  {
    city: "nashville",
    query: "trendy boutique hotels in nashville with rooftop bars",
    title: "Trendy Boutique Hotels in Nashville with Rooftop Bars"
  },
  {
    city: "philadelphia",
    query: "best boutique hotels in philadelphia with rooftop restaurants",
    title: "Best Boutique Hotels in Philadelphia with Rooftop Restaurants"
  },
  {
    city: "san-antonio",
    query: "boutique hotels in san antonio near river walk",
    title: "Boutique Hotels in San Antonio near the River Walk"
  },
  {
    city: "boston",
    query: "best boutique hotels in boston with skyline views",
    title: "Best Boutique Hotels in Boston with Skyline Views"
  },
  {
    city: "atlanta",
    query: "best boutique hotels in atlanta with rooftop lounges",
    title: "Best Boutique Hotels in Atlanta with Rooftop Lounges"
  }
];

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
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🚀 Starting article generation for ${ARTICLE_QUERIES.length} queries`);
  console.log(`   Each article will be pushed to website immediately after generation`);
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