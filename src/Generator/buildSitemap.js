"use strict";
// scripts/buildSitemap.ts
// Scans generated-articles/**/**.json and writes ../../public/sitemap.xml
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var SITE_URL = "https://www.staygenie.app";
var PROJECT_ROOT = process.cwd();
var ARTICLES_ROOT = path.join(PROJECT_ROOT, "generated-articles");
var SITEMAP_PATH = path.join(PROJECT_ROOT, "../../public/sitemap.xml");
// ---------- helpers ----------
function createSlug(title) {
    return title
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
function escXml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function urlTag(loc, lastmodISO, changefreq, priority) {
    return [
        "<url>",
        "<loc>".concat(escXml(loc), "</loc>"),
        "<lastmod>".concat(lastmodISO, "</lastmod>"),
        "<changefreq>".concat(changefreq, "</changefreq>"),
        "<priority>".concat(priority.toFixed(1), "</priority>"),
        "</url>",
    ].join("");
}
function buildSitemapXml(urlBlocks) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n  xmlns:news=\"http://www.google.com/schemas/sitemap-news/0.9\"\n  xmlns:xhtml=\"http://www.w3.org/1999/xhtml\"\n  xmlns:mobile=\"http://www.google.com/schemas/sitemap-mobile/1.0\"\n  xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\"\n  xmlns:video=\"http://www.google.com/schemas/sitemap-video/1.1\">\n".concat(urlBlocks.join("\n"), "\n</urlset>\n");
}
// no generator, rewritten for compatibility
function walkFiles(dir) {
    var files = [];
    if (!fs.existsSync(dir))
        return files;
    var entries = fs.readdirSync(dir, { withFileTypes: true });
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var e = entries_1[_i];
        var full = path.join(dir, e.name);
        if (e.isDirectory()) {
            files.push.apply(files, walkFiles(full));
        }
        else if (e.isFile()) {
            files.push(full);
        }
    }
    return files;
}
function readJsonSafe(file) {
    try {
        var raw = fs.readFileSync(file, "utf8");
        return { data: JSON.parse(raw) };
    }
    catch (e) {
        var message = e instanceof Error ? e.message : "Unknown JSON parse error";
        return { error: message };
    }
}
function fileMtimeISO(file) {
    try {
        var st = fs.statSync(file);
        return new Date(st.mtimeMs).toISOString();
    }
    catch (_a) {
        return new Date().toISOString();
    }
}
// ---------- main ----------
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var nowISO, articleFiles, articles, cities, _i, articleFiles_1, file, _a, data, error, cityFromPath, city, slugFromPath, slug, lastmod, staticRoutes, _b, _c, city, staticBlocks, articleBlocks, allBlocks, seen, deduped, _d, allBlocks_1, block, locMatch, loc, outDir, xml;
        return __generator(this, function (_e) {
            nowISO = new Date().toISOString();
            articleFiles = fs.existsSync(ARTICLES_ROOT) === false
                ? []
                : walkFiles(ARTICLES_ROOT).filter(function (f) { return f.endsWith(".json"); });
            if (!articleFiles.length) {
                console.warn("No generated articles found in: ".concat(ARTICLES_ROOT, ". Sitemap will include only static routes."));
            }
            articles = [];
            cities = new Set();
            for (_i = 0, articleFiles_1 = articleFiles; _i < articleFiles_1.length; _i++) {
                file = articleFiles_1[_i];
                _a = readJsonSafe(file), data = _a.data, error = _a.error;
                if (error || !data) {
                    console.warn("Skipping ".concat(file, ": ").concat(error));
                    continue;
                }
                cityFromPath = path.basename(path.dirname(file));
                city = (data.city || cityFromPath || "").trim();
                if (!city) {
                    console.warn("Skipping ".concat(file, ": missing city"));
                    continue;
                }
                slugFromPath = path.basename(file, ".json");
                slug = (data.slug || createSlug(data.title || slugFromPath)).trim();
                if (!slug) {
                    console.warn("Skipping ".concat(file, ": missing slug/title"));
                    continue;
                }
                lastmod = data.generatedAt
                    ? new Date(data.generatedAt).toISOString()
                    : fileMtimeISO(file);
                cities.add(city);
                articles.push({ city: city, slug: slug, lastmod: lastmod });
            }
            staticRoutes = [
                { loc: "".concat(SITE_URL), changefreq: "daily", priority: 0.7, lastmod: nowISO },
                {
                    loc: "".concat(SITE_URL, "/Blog"),
                    changefreq: "daily",
                    priority: 0.7,
                    lastmod: nowISO,
                },
            ];
            for (_b = 0, _c = Array.from(cities).sort(); _b < _c.length; _b++) {
                city = _c[_b];
                staticRoutes.push({
                    loc: "".concat(SITE_URL, "/Blog/").concat(city),
                    changefreq: "daily",
                    priority: 0.7,
                    lastmod: nowISO,
                });
            }
            staticBlocks = staticRoutes.map(function (r) {
                return urlTag(r.loc, r.lastmod, r.changefreq, r.priority);
            });
            articleBlocks = articles
                .sort(function (a, b) { return a.city.localeCompare(b.city) || a.slug.localeCompare(b.slug); })
                .map(function (a) {
                return urlTag("".concat(SITE_URL, "/Blog/").concat(a.city, "/").concat(a.slug), a.lastmod, "weekly", 0.8);
            });
            allBlocks = __spreadArray(__spreadArray([], staticBlocks, true), articleBlocks, true);
            seen = new Set();
            deduped = [];
            for (_d = 0, allBlocks_1 = allBlocks; _d < allBlocks_1.length; _d++) {
                block = allBlocks_1[_d];
                locMatch = block.match(/<loc>([^<]+)<\/loc>/);
                loc = (locMatch === null || locMatch === void 0 ? void 0 : locMatch[1]) || block;
                if (!seen.has(loc)) {
                    seen.add(loc);
                    deduped.push(block);
                }
            }
            outDir = path.dirname(SITEMAP_PATH);
            if (!fs.existsSync(outDir))
                fs.mkdirSync(outDir, { recursive: true });
            xml = buildSitemapXml(deduped);
            fs.writeFileSync(SITEMAP_PATH, xml, "utf8");
            console.log("🗺️  Sitemap written:", SITEMAP_PATH);
            console.log("\u2022 Articles found: ".concat(articles.length));
            console.log("\u2022 Cities found: ".concat(cities.size));
            console.log("\u2022 URLs in sitemap: ".concat(deduped.length));
            return [2 /*return*/];
        });
    });
}
main().catch(function (err) {
    var message = err instanceof Error ? err.message : String(err);
    console.error("Fatal error building sitemap:", message);
    process.exit(1);
});
