// Auto-generated blog data - DO NOT EDIT MANUALLY
// Generated: 2025-09-30T23:02:51.377Z

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

export const blogPosts: Record<string, BlogPost[]> = {
  "london": [
    {
      "city": "london",
      "slug": "best-hotels-with-rooftop-pools-in-miami",
      "title": "Best Hotels with Rooftop Pools in Miami",
      "excerpt": "Finding hotels with rooftop pools in Miami can be a daunting task, as the city is filled with numerous options that vary in style and amenities. This curated list not only highlights the best places to soak up the sun and enjoy stunning skyline views but also helps travelers make informed choices for a memorable stay. With our recommendations, you can easily find the perfect rooftop oasis to enhance your Miami experience.",
      "hotels": [
        {
          "id": "lp19c0d",
          "name": "Mayfair House Hotel & Garden",
          "image": "https://static.cupid.travel/hotels/502849201.jpg",
          "description": "Experience unparalleled luxury at our boutique hotel in Coconut Grove, featuring a stunning rooftop pool, a stylish bar, and exquisite gourmet dining. Enjoy spacious accommodations equipped with advanced technology, including 65-inch flat-screen TVs and options for private outdoor showers. Stay fit at our state-of-the-art 24-hour fitness center, ensuring your every need is met for a memorable stay.",
          "highlight": "Boasts a stunning rooftop pool, stylish bar, and spacious accommodations with advanced technology in a luxurious boutique setting.",
          "price": "$340/night",
          "location": "3000 Florida Avenue",
          "tags": [],
          "isRefundable": true
        },
        {
          "id": "lp8a284",
          "name": "Novotel Miami Brickell",
          "image": "https://static.cupid.travel/hotels/294498726.jpg",
          "description": "Discover the Novotel Miami Brickell, where a stunning rooftop pool awaits for ultimate relaxation under the Miami sun. Each modern room is thoughtfully equipped with air conditioning, a flat-screen TV, and a private bathroom with complimentary toiletries for your comfort. With convenient facilities including 7 meeting rooms, a business center, an on-site bar, and a welcoming restaurant, this hotel perfectly caters to both business and leisure travelers.",
          "highlight": "Offers a stunning rooftop pool with outdoor furniture and a heated swimming area for relaxation under the Miami sun.",
          "price": "$228/night",
          "location": "1500 SW 1st Avenue",
          "tags": [],
          "isRefundable": false
        },
        {
          "id": "lp65555d0e",
          "name": "Private Oasis at Arya",
          "image": "https://static.cupid.travel/hotels/317890860.jpg",
          "description": "Experience luxury at Private Oasis at Arya, where a stunning rooftop pool offers breathtaking sea views, creating the perfect atmosphere for relaxation in Miami. This sustainable hotel features modern amenities, including free WiFi, private parking, and air-conditioned units equipped with flat-screen TVs and kitchens. Families will love the indoor play area and the hotel's proximity to local attractions, ensuring a memorable stay for guests of all ages.",
          "highlight": "Boasts a stunning rooftop pool with breathtaking sea views and offers family rooms along with modern amenities.",
          "price": "$207/night",
          "location": "2889 McFarlane Rd",
          "tags": [],
          "isRefundable": false
        },
        {
          "id": "lp4b5f5",
          "name": "W Miami",
          "image": "https://static.cupid.travel/hotels/ex_w3997h2661x3y6-d6181390_z.jpg",
          "description": "Experience the luxurious allure of W Miami, perfectly situated for easy access to shopping and nightlife. Enjoy rejuvenating moments at the stunning outdoor pool or the rooftop terrace with panoramic views of the skyline. Indulge in culinary delights at Panther Coffee and unwind in elegantly designed guest rooms equipped with modern amenities for a stylish and comfortable stay.",
          "highlight": "Boasts a stunning rooftop terrace offering panoramic skyline views and a rejuvenating outdoor pool for a luxurious retreat.",
          "price": "$411/night",
          "location": "485 Brickell Avenue",
          "tags": [],
          "isRefundable": true
        },
        {
          "id": "lp42e7e",
          "name": "Kimpton EPIC Hotel, an IHG Hotel",
          "image": "https://static.cupid.travel/hotels/242170411.jpg",
          "description": "Experience the breathtaking views and eco-friendly luxury at Kimpton EPIC Hotel, where each guestroom features floor-to-ceiling windows and a private balcony. Enjoy relaxation at the spa, stay active with fitness classes, and take a refreshing dip in the rooftop pool while soaking in the stunning Miami skyline. Conveniently located in the heart of Miami's financial district, this pet-friendly hotel also offers easy access to major attractions and a full-service marina for a truly unforgettable stay.",
          "highlight": "Boasts a stunning rooftop pool with breathtaking views of the Miami skyline and eco-friendly luxury amenities.",
          "price": "$411/night",
          "location": "270 Biscayne Blvd Way",
          "tags": [],
          "isRefundable": true
        },
        {
          "id": "lp84ad1",
          "name": "EAST Miami",
          "image": "https://static.cupid.travel/hotels/493547913.jpg",
          "description": "EAST Miami redefines luxury with its four exquisite pools, a 24-hour fitness center, and an on-site restaurant serving diverse culinary delights. Guests can savor authentic Uruguayan cuisine at Quinto or unwind at the rooftop bar, Sugar, on the 40th level, where stunning city views await. Nestled in Brickell City Centre, the hotel offers easy access to upscale shopping, dining, and nearby attractions, making it the perfect choice for an unforgettable getaway.",
          "highlight": "Provides a stunning rooftop bar on the 40th level with breathtaking city views and multiple exquisite pools.",
          "price": "$401/night",
          "location": "788 Brickell Plaza",
          "tags": [],
          "isRefundable": true
        }
      ]
    }
  ]
};

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
