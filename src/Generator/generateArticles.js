"use strict";
// generateArticles.ts
// Run this from your frontend/client directory
// Usage: npx tsx generateArticles.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var cities_1 = require("./cities");
var API_BASE_URL = 'http://localhost:3003';
// ============================================================================
// CONFIGURATION - Edit these values to change what articles are generated
// ============================================================================
// TEST MODE: Set to true to use limited cities and articles for testing
var TEST_MODE = false;
var MAX_ARTICLES = 300;
// Test cities - 15 popular tourist destinations
var TEST_CITIES = [
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
var ARTICLE_TEMPLATES = [
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
var CITY_TYPE = 'both';
// ============================================================================
// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    var _a;
    var shuffled = __spreadArray([], array, true);
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [shuffled[j], shuffled[i]], shuffled[i] = _a[0], shuffled[j] = _a[1];
    }
    return shuffled;
}
// Get the appropriate city list based on configuration
function getCitiesToProcess() {
    // If in test mode, return test cities (unshuffled for consistency)
    if (TEST_MODE) {
        return TEST_CITIES;
    }
    var cities;
    switch (CITY_TYPE) {
        case 'water':
            cities = __spreadArray([], cities_1.CITIES_BY_WATER, true);
            break;
        case 'non-water':
            cities = __spreadArray([], cities_1.CITIES_NOT_BY_WATER, true);
            break;
        case 'both':
            cities = __spreadArray(__spreadArray([], cities_1.CITIES_BY_WATER, true), cities_1.CITIES_NOT_BY_WATER, true);
            break;
        default:
            throw new Error("Invalid CITY_TYPE: ".concat(CITY_TYPE));
    }
    // Randomize the order
    return shuffleArray(cities);
}
// Replace <city> placeholder with actual city name
function fillTemplate(template, cityName) {
    return template.replace(/<city>/g, cityName);
}
// Convert cities to ArticleQuery format with city-type filtering
function createArticleQueries() {
    var queries = [];
    // Get all cities to process
    var allCities = getCitiesToProcess();
    // Categorize cities by water/non-water
    var waterCities = allCities.filter(function (city) {
        return cities_1.CITIES_BY_WATER.some(function (wc) { return wc.slug === city.slug; });
    });
    var nonWaterCities = allCities.filter(function (city) {
        return cities_1.CITIES_NOT_BY_WATER.some(function (nwc) { return nwc.slug === city.slug; });
    });
    console.log("\n\uD83D\uDCCA City Distribution:");
    console.log("   Water cities: ".concat(waterCities.length));
    console.log("   Non-water cities: ".concat(nonWaterCities.length));
    console.log("   Total cities: ".concat(allCities.length, "\n"));
    // Process each template
    for (var _i = 0, ARTICLE_TEMPLATES_1 = ARTICLE_TEMPLATES; _i < ARTICLE_TEMPLATES_1.length; _i++) {
        var template = ARTICLE_TEMPLATES_1[_i];
        var citiesToUse = [];
        // Determine which cities to use based on template type
        if (template.cityType === 'water') {
            citiesToUse = waterCities;
        }
        else if (template.cityType === 'non-water') {
            citiesToUse = nonWaterCities;
        }
        else {
            // 'both' or undefined = use all cities
            citiesToUse = allCities;
        }
        // Create queries for appropriate cities
        for (var _a = 0, citiesToUse_1 = citiesToUse; _a < citiesToUse_1.length; _a++) {
            var city = citiesToUse_1[_a];
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
function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
// Generate a single article and save it locally
function generateAndPushArticle(query, index, total) {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorText, data, article, missingIds, validIds, faqCount, slug, articlesDir, filepath, articleWithMetadata, error_1, errorMessage;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\n".concat('='.repeat(60)));
                    console.log("\uD83D\uDCDD Article ".concat(index + 1, "/").concat(total, ": ").concat(query.title));
                    console.log("".concat('='.repeat(60)));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    // Step 1: Generate the article
                    console.log("\uD83D\uDD04 Generating article...");
                    return [4 /*yield*/, fetch("".concat(API_BASE_URL, "/api/articles/generate"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(query)
                        })];
                case 2:
                    response = _b.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.text()];
                case 3:
                    errorText = _b.sent();
                    throw new Error("Generation failed: ".concat(response.status, " - ").concat(errorText));
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _b.sent();
                    article = data.article;
                    console.log("\u2705 Article generated successfully");
                    missingIds = article.hotels.filter(function (h) { return !h.id; }).length;
                    validIds = article.hotels.length - missingIds;
                    console.log("\uD83D\uDD0D Hotel IDs: ".concat(validIds, " valid, ").concat(missingIds, " missing"));
                    faqCount = ((_a = article.faqs) === null || _a === void 0 ? void 0 : _a.length) || 0;
                    console.log("\u2753 FAQs: ".concat(faqCount, " generated"));
                    // Step 3: Save article locally
                    console.log("\uD83D\uDCBE Saving article locally...");
                    slug = createSlug(article.title);
                    articlesDir = path.join(process.cwd(), 'generated-articles', article.city);
                    // Create directory if it doesn't exist
                    if (!fs.existsSync(articlesDir)) {
                        fs.mkdirSync(articlesDir, { recursive: true });
                    }
                    filepath = path.join(articlesDir, "".concat(slug, ".json"));
                    articleWithMetadata = __assign(__assign({}, article), { slug: slug, generatedAt: new Date().toISOString(), hotelCount: article.hotels.length, hotelsWithIds: article.hotels.filter(function (h) { return h.id; }).length, faqCount: faqCount });
                    fs.writeFileSync(filepath, JSON.stringify(articleWithMetadata, null, 2), 'utf8');
                    console.log("\u2705 Article saved to: ".concat(filepath));
                    return [2 /*return*/, { success: true, article: article }];
                case 6:
                    error_1 = _b.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'Unknown error';
                    console.error("\u274C Failed to process article: ".concat(errorMessage));
                    return [2 /*return*/, { success: false, error: errorMessage }];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function generateArticles() {
    return __awaiter(this, void 0, void 0, function () {
        var ARTICLE_QUERIES, results, errors, startTime, i, query, result, endTime, duration, totalMissingIds, totalFAQs, summaryPath, summary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ARTICLE_QUERIES = createArticleQueries();
                    if (MAX_ARTICLES && ARTICLE_QUERIES.length > MAX_ARTICLES) {
                        console.log("\u26A0\uFE0F  Limiting generation from ".concat(ARTICLE_QUERIES.length, " to ").concat(MAX_ARTICLES, " articles"));
                        ARTICLE_QUERIES = ARTICLE_QUERIES.slice(0, MAX_ARTICLES);
                    }
                    console.log("\n".concat('='.repeat(80)));
                    console.log("\uD83D\uDE80 Starting article generation for ".concat(ARTICLE_QUERIES.length, " articles"));
                    console.log("\n".concat('='.repeat(80)));
                    console.log("\uD83D\uDE80 Starting article generation for ".concat(ARTICLE_QUERIES.length, " articles"));
                    if (TEST_MODE) {
                        console.log("   \uD83E\uDDEA TEST MODE: Using ".concat(TEST_CITIES.length, " test cities"));
                    }
                    console.log("   Each article will include hotels + FAQs and be saved locally");
                    console.log("".concat('='.repeat(80), "\n"));
                    results = [];
                    errors = [];
                    startTime = Date.now();
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < ARTICLE_QUERIES.length)) return [3 /*break*/, 5];
                    query = ARTICLE_QUERIES[i];
                    return [4 /*yield*/, generateAndPushArticle(query, i, ARTICLE_QUERIES.length)];
                case 2:
                    result = _a.sent();
                    if (result.success && result.article) {
                        results.push(result.article);
                    }
                    else {
                        errors.push({
                            query: query,
                            error: result.error || 'Unknown error'
                        });
                    }
                    if (!(i < ARTICLE_QUERIES.length - 1)) return [3 /*break*/, 4];
                    console.log("\n\u23F3 Waiting 2 seconds before next article...\n");
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    endTime = Date.now();
                    duration = ((endTime - startTime) / 1000 / 60).toFixed(2);
                    console.log("\n".concat('='.repeat(80)));
                    console.log("\u2705 Batch Generation Complete!");
                    console.log("".concat('='.repeat(80)));
                    console.log("Total Requested: ".concat(ARTICLE_QUERIES.length));
                    console.log("Successfully Generated: ".concat(results.length));
                    console.log("Failed: ".concat(errors.length));
                    console.log("Duration: ".concat(duration, " minutes"));
                    if (errors.length > 0) {
                        console.log("\n\u274C Failed Articles:");
                        errors.forEach(function (err) {
                            console.log("  - ".concat(err.query.title));
                            console.log("    Error: ".concat(err.error));
                        });
                    }
                    totalMissingIds = 0;
                    totalFAQs = 0;
                    results.forEach(function (article) {
                        var _a;
                        var missing = article.hotels.filter(function (h) { return !h.id; }).length;
                        totalMissingIds += missing;
                        totalFAQs += ((_a = article.faqs) === null || _a === void 0 ? void 0 : _a.length) || 0;
                    });
                    if (totalMissingIds > 0) {
                        console.warn("\n\u26A0\uFE0F  Warning: ".concat(totalMissingIds, " hotels are missing IDs across all articles"));
                    }
                    else {
                        console.log("\n\u2705 All hotels have valid IDs");
                    }
                    console.log("\u2705 Total FAQs generated: ".concat(totalFAQs, " (avg ").concat((totalFAQs / results.length).toFixed(1), " per article)"));
                    summaryPath = path.join(process.cwd(), 'generation-summary.json');
                    summary = {
                        generatedAt: new Date().toISOString(),
                        totalRequested: ARTICLE_QUERIES.length,
                        totalGenerated: results.length,
                        totalFailed: errors.length,
                        durationMinutes: parseFloat(duration),
                        totalFAQs: totalFAQs,
                        avgFAQsPerArticle: parseFloat((totalFAQs / results.length).toFixed(1)),
                        successfulArticles: results.map(function (a) {
                            var _a;
                            return ({
                                city: a.city,
                                title: a.title,
                                slug: createSlug(a.title),
                                hotelCount: a.hotels.length,
                                faqCount: ((_a = a.faqs) === null || _a === void 0 ? void 0 : _a.length) || 0
                            });
                        }),
                        failedArticles: errors.map(function (e) { return ({
                            city: e.query.city,
                            title: e.query.title,
                            error: e.error
                        }); })
                    };
                    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
                    console.log("\n\uD83D\uDCCA Summary saved to: ".concat(summaryPath));
                    console.log("\n".concat('='.repeat(80)));
                    console.log("\u2705 All done! ".concat(results.length, " articles generated with hotels + FAQs."));
                    console.log("".concat('='.repeat(80), "\n"));
                    return [2 /*return*/];
            }
        });
    });
}
// Run the script
generateArticles().catch(function (error) {
    console.error('Fatal error:', error);
    process.exit(1);
});
