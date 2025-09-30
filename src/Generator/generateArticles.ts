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

// Define your article queries here
const ARTICLE_QUERIES: ArticleQuery[] = [
  {
    city: "miami",
    query: "hotels in Miami that are pet friendly with spas",
    title: "6 Best Miami Hotels for Pet Owners with Spas"
  },
  // Add more queries here
];

// Helper function to create a safe filename from title
function createSafeFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generateArticles() {
  console.log(`Starting article generation for ${ARTICLE_QUERIES.length} queries...\n`);
  
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Generation Complete!`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Total Requested: ${data.totalRequested}`);
    console.log(`Successfully Generated: ${data.totalGenerated}`);
    console.log(`Failed: ${data.totalFailed}`);
    
    if (data.errors && data.errors.length > 0) {
      console.log(`\nErrors:`);
      data.errors.forEach((err: any) => {
        console.log(`  - ${err.query.title}: ${err.error}`);
      });
    }

    // Save all articles to a single summary file
    const outputPath = path.join(process.cwd(), 'generated-articles.json');
    fs.writeFileSync(
      outputPath, 
      JSON.stringify(data.articles, null, 2), 
      'utf8'
    );
    
    console.log(`\nAll articles saved to: ${outputPath}`);

    // Save individual files organized by city
    const articlesBaseDir = path.join(process.cwd(), 'generated-articles');
    
    data.articles.forEach((article: any) => {
      // Create city folder if it doesn't exist
      const cityDir = path.join(articlesBaseDir, article.city);
      if (!fs.existsSync(cityDir)) {
        fs.mkdirSync(cityDir, { recursive: true });
        console.log(`Created directory: ${article.city}/`);
      }

      // Create safe filename from title
      const safeTitle = createSafeFilename(article.title);
      const filename = `${safeTitle}.json`;
      const filepath = path.join(cityDir, filename);
      
      // Save article
      fs.writeFileSync(filepath, JSON.stringify(article, null, 2), 'utf8');
      console.log(`Saved: ${article.city}/${filename}`);
    });

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Individual articles saved to: ${articlesBaseDir}/`);
    console.log(`${'='.repeat(60)}\n`);

  } catch (error) {
    console.error('Error generating articles:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    
    process.exit(1);
  }
}

// Run the script
generateArticles();