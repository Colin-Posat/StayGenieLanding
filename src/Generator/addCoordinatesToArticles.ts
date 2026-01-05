// scripts/addCoordinatesToArticles.ts
// Reads all generated articles and adds lat/lng coordinates to hotels by fetching from LiteAPI

import * as fs from "fs";
import * as path from "path";

const LITE_API_KEY = "prod_5d46ccea-23f3-4e2f-861b-2158cc0f234e";
const LITE_API_BASE = "https://api.liteapi.travel/v3.0";
const PROJECT_ROOT = process.cwd();
const ARTICLES_ROOT = path.join(PROJECT_ROOT, "generated-articles");

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
  placeId?: string;
  lat?: number;
  lng?: number;
}

interface Article {
  city: string;
  title: string;
  excerpt?: string;
  intro?: string;
  hotels: Hotel[];
  slug?: string;
  generatedAt?: string;
  [key: string]: any; // Allow additional properties
}

interface LiteAPIHotel {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  [key: string]: any;
}

// Walk directory recursively to find all JSON files
function walkFiles(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }
  return files;
}

// Read JSON file safely
function readJsonSafe<T>(file: string): { data?: T; error?: string } {
  try {
    const raw = fs.readFileSync(file, "utf8");
    return { data: JSON.parse(raw) as T };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown JSON parse error";
    return { error: message };
  }
}

// Fetch hotel details from LiteAPI in batches
async function fetchHotelDetails(hotelIds: string[]): Promise<Map<string, { lat: number; lng: number }>> {
  const coordinatesMap = new Map<string, { lat: number; lng: number }>();
  
  if (hotelIds.length === 0) {
    return coordinatesMap;
  }

  // LiteAPI supports comma-separated hotel IDs
  // Split into batches of 100 to avoid URL length issues
  const batchSize = 100;
  const batches: string[][] = [];
  
  for (let i = 0; i < hotelIds.length; i += batchSize) {
    batches.push(hotelIds.slice(i, i + batchSize));
  }

  console.log(`\n📡 Fetching coordinates for ${hotelIds.length} hotels in ${batches.length} batches...`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const hotelIdsParam = batch.join(',');
    
    try {
      console.log(`   Batch ${i + 1}/${batches.length}: Fetching ${batch.length} hotels...`);
      
      const url = `${LITE_API_BASE}/data/hotels?hotelIds=${encodeURIComponent(hotelIdsParam)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': LITE_API_KEY,
          'accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.error(`   ❌ API error for batch ${i + 1}: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      const hotels = data.data as LiteAPIHotel[];

      if (!hotels || !Array.isArray(hotels)) {
        console.warn(`   ⚠️  No hotel data returned for batch ${i + 1}`);
        continue;
      }

      // Extract coordinates from response
      let foundInBatch = 0;
      for (const hotel of hotels) {
        if (hotel.latitude && hotel.longitude) {
          coordinatesMap.set(hotel.id, {
            lat: hotel.latitude,
            lng: hotel.longitude
          });
          foundInBatch++;
        }
      }

      console.log(`   ✅ Found coordinates for ${foundInBatch}/${batch.length} hotels in batch ${i + 1}`);

      // Rate limiting: wait between batches
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

    } catch (error) {
      console.error(`   ❌ Error fetching batch ${i + 1}:`, error instanceof Error ? error.message : error);
    }
  }

  console.log(`\n✅ Total coordinates fetched: ${coordinatesMap.size}/${hotelIds.length}`);
  
  return coordinatesMap;
}

// Update article file with coordinates
function updateArticleFile(
  filePath: string,
  article: Article,
  coordinatesMap: Map<string, { lat: number; lng: number }>
): { updated: number; missing: number } {
  let updatedCount = 0;
  let missingCount = 0;

  // Update each hotel with coordinates
  for (const hotel of article.hotels) {
    if (!hotel.id) {
      missingCount++;
      continue;
    }

    // Skip if already has coordinates
    if (hotel.lat && hotel.lng) {
      continue;
    }

    const coords = coordinatesMap.get(hotel.id);
    if (coords) {
      hotel.lat = coords.lat;
      hotel.lng = coords.lng;
      updatedCount++;
    } else {
      missingCount++;
    }
  }

  // Write updated article back to file
  if (updatedCount > 0) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf8');
    } catch (error) {
      console.error(`   ❌ Failed to write file: ${error instanceof Error ? error.message : error}`);
    }
  }

  return { updated: updatedCount, missing: missingCount };
}

// Main function
async function main() {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🗺️  Adding Coordinates to Existing Articles`);
  console.log(`${'='.repeat(80)}\n`);

  // Step 1: Find all article files
  console.log(`📂 Scanning for articles in: ${ARTICLES_ROOT}`);
  const articleFiles = walkFiles(ARTICLES_ROOT);
  
  if (articleFiles.length === 0) {
    console.log(`\n⚠️  No articles found in ${ARTICLES_ROOT}`);
    return;
  }

  console.log(`✅ Found ${articleFiles.length} article files\n`);

  // Step 2: Read all articles and collect hotel IDs
  console.log(`📖 Reading articles and collecting hotel IDs...`);
  
  const articlesData: Array<{ file: string; article: Article }> = [];
  const allHotelIds = new Set<string>();
  let totalHotels = 0;
  let hotelsWithCoords = 0;
  let hotelsWithoutIds = 0;

  for (const file of articleFiles) {
    const { data, error } = readJsonSafe<Article>(file);
    
    if (error || !data) {
      console.warn(`⚠️  Skipping ${path.basename(file)}: ${error}`);
      continue;
    }

    articlesData.push({ file, article: data });

    for (const hotel of data.hotels) {
      totalHotels++;
      
      if (!hotel.id) {
        hotelsWithoutIds++;
        continue;
      }

      // Check if already has coordinates
      if (hotel.lat && hotel.lng) {
        hotelsWithCoords++;
      } else {
        allHotelIds.add(hotel.id);
      }
    }
  }

  console.log(`\n📊 Statistics:`);
  console.log(`   Total hotels: ${totalHotels}`);
  console.log(`   Hotels with coordinates: ${hotelsWithCoords}`);
  console.log(`   Hotels without IDs: ${hotelsWithoutIds}`);
  console.log(`   Hotels needing coordinates: ${allHotelIds.size}`);

  if (allHotelIds.size === 0) {
    console.log(`\n✅ All hotels already have coordinates! Nothing to do.`);
    return;
  }

  // Step 3: Fetch coordinates from LiteAPI
  const coordinatesMap = await fetchHotelDetails(Array.from(allHotelIds));

  // Step 4: Update all article files
  console.log(`\n📝 Updating article files...`);
  
  let totalUpdated = 0;
  let totalMissing = 0;
  let filesUpdated = 0;

  for (const { file, article } of articlesData) {
    const { updated, missing } = updateArticleFile(file, article, coordinatesMap);
    
    if (updated > 0) {
      filesUpdated++;
      console.log(`   ✅ ${path.basename(file)}: Updated ${updated} hotels`);
    }
    
    totalUpdated += updated;
    totalMissing += missing;
  }

  // Final summary
  console.log(`\n${'='.repeat(80)}`);
  console.log(`✅ Coordinate Update Complete!`);
  console.log(`${'='.repeat(80)}`);
  console.log(`Articles processed: ${articlesData.length}`);
  console.log(`Files updated: ${filesUpdated}`);
  console.log(`Hotels updated with coordinates: ${totalUpdated}`);
  console.log(`Hotels still missing coordinates: ${totalMissing}`);
  console.log(`${'='.repeat(80)}\n`);
}

// Run the script
main().catch((error) => {
  console.error('\n❌ Fatal error:', error instanceof Error ? error.message : error);
  process.exit(1);
});