// scripts/buildSitemap.ts
// Scans generated-articles/**/**.json and writes ../../public/sitemap.xml

import * as fs from "fs";
import * as path from "path";

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

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
  excerpt?: string;
  intro?: string;
  hotels: Hotel[];
  slug?: string;
  generatedAt?: string;
}

const SITE_URL = "https://www.staygenie.app";
const PROJECT_ROOT = process.cwd();
const ARTICLES_ROOT = path.join(PROJECT_ROOT, "generated-articles");
const SITEMAP_PATH = path.join(PROJECT_ROOT, "../../public/sitemap.xml");

// ---------- helpers ----------
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlTag(
  loc: string,
  lastmodISO: string,
  changefreq: ChangeFreq,
  priority: number
) {
  return [
    "<url>",
    `<loc>${escXml(loc)}</loc>`,
    `<lastmod>${lastmodISO}</lastmod>`,
    `<changefreq>${changefreq}</changefreq>`,
    `<priority>${priority.toFixed(1)}</priority>`,
    "</url>",
  ].join("");
}

function buildSitemapXml(urlBlocks: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlBlocks.join("\n")}
</urlset>
`;
}

// no generator, rewritten for compatibility
function walkFiles(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...walkFiles(full));
    } else if (e.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function readJsonSafe<T>(file: string): { data?: T; error?: string } {
  try {
    const raw = fs.readFileSync(file, "utf8");
    return { data: JSON.parse(raw) as T };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown JSON parse error";
    return { error: message };
  }
}

function fileMtimeISO(file: string): string {
  try {
    const st = fs.statSync(file);
    return new Date(st.mtimeMs).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// ---------- main ----------
async function main() {
  const nowISO = new Date().toISOString();

  const articleFiles =
    fs.existsSync(ARTICLES_ROOT) === false
      ? []
      : walkFiles(ARTICLES_ROOT).filter((f) => f.endsWith(".json"));

  if (!articleFiles.length) {
    console.warn(
      `No generated articles found in: ${ARTICLES_ROOT}. Sitemap will include only static routes.`
    );
  }

  const articles: Array<{
    city: string;
    slug: string;
    lastmod: string;
  }> = [];

  const cities = new Set<string>();

  for (const file of articleFiles) {
    const { data, error } = readJsonSafe<Article>(file);
    if (error || !data) {
      console.warn(`Skipping ${file}: ${error}`);
      continue;
    }

    const cityFromPath = path.basename(path.dirname(file));
    const city = (data.city || cityFromPath || "").trim();
    if (!city) {
      console.warn(`Skipping ${file}: missing city`);
      continue;
    }

    const slugFromPath = path.basename(file, ".json");
    const slug = (data.slug || createSlug(data.title || slugFromPath)).trim();
    if (!slug) {
      console.warn(`Skipping ${file}: missing slug/title`);
      continue;
    }

    const lastmod = data.generatedAt
      ? new Date(data.generatedAt).toISOString()
      : fileMtimeISO(file);

    cities.add(city);
    articles.push({ city, slug, lastmod });
  }

  const staticRoutes: {
    loc: string;
    changefreq: ChangeFreq;
    priority: number;
    lastmod: string;
  }[] = [
    { loc: `${SITE_URL}`, changefreq: "daily", priority: 0.7, lastmod: nowISO },
    {
      loc: `${SITE_URL}/Blog`,
      changefreq: "daily",
      priority: 0.7,
      lastmod: nowISO,
    },
  ];

  for (const city of Array.from(cities).sort()) {
    staticRoutes.push({
      loc: `${SITE_URL}/Blog/${city}`,
      changefreq: "daily",
      priority: 0.7,
      lastmod: nowISO,
    });
  }

  const staticBlocks = staticRoutes.map((r) =>
    urlTag(r.loc, r.lastmod, r.changefreq, r.priority)
  );

  const articleBlocks = articles
    .sort(
      (a, b) => a.city.localeCompare(b.city) || a.slug.localeCompare(b.slug)
    )
    .map((a) =>
      urlTag(`${SITE_URL}/Blog/${a.city}/${a.slug}`, a.lastmod, "weekly", 0.8)
    );

  const allBlocks = [...staticBlocks, ...articleBlocks];
  const seen = new Set<string>();
  const deduped: string[] = [];
  for (const block of allBlocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const loc = locMatch?.[1] || block;
    if (!seen.has(loc)) {
      seen.add(loc);
      deduped.push(block);
    }
  }

  const outDir = path.dirname(SITEMAP_PATH);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const xml = buildSitemapXml(deduped);
  fs.writeFileSync(SITEMAP_PATH, xml, "utf8");

  console.log("🗺️  Sitemap written:", SITEMAP_PATH);
  console.log(`• Articles found: ${articles.length}`);
  console.log(`• Cities found: ${cities.size}`);
  console.log(`• URLs in sitemap: ${deduped.length}`);
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error("Fatal error building sitemap:", message);
  process.exit(1);
});
