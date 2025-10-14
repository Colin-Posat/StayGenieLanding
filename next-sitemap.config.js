/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.staygenie.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/500'],

  additionalPaths: async (config) => {
    const blogPosts = [
      // Chicago
      '/Blog/chicago/amazing-hotels-for-families-with-kids-in-chicago',
      '/Blog/chicago/best-downtown-chicago-hotels-with-free-breakfast',

      // Las Vegas
      '/Blog/las-vegas/best-cheap-safe-clean-hotels-in-las-vegas',

      // London
      '/Blog/london/best-family-hotels-in-london-with-kids-activities',

      // Los Angeles
      '/Blog/los-angeles/top-la-hotels-with-rooftop-pools',
      '/Blog/los-angeles/what-are-the-affordable-clean-hotels-in-los-angeles-with-breakfast-included',

      // Miami
      '/Blog/miami/best-family-friendly-hotels-in-miami-beach-with-pools',

      // New York
      '/Blog/new-york/best-boutique-hotels-in-new-york-with-rooftop-bars',
      '/Blog/new-york/what-are-the-best-dog-friendly-hotels-in-new-york',

      // San Francisco (none yet, but keep folder ready)
    ];

    return blogPosts.map((loc) => ({
      loc,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
