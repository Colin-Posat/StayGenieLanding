// Auto-generated blog data - DO NOT EDIT MANUALLY
// Generated: 2025-09-30T20:15:01.138Z

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
  "miami": [
    {
      "city": "miami",
      "slug": "the-6-best-beachfront-miami-hotels",
      "title": "The 6 Best Beachfront Miami Hotels",
      "excerpt": "Finding the perfect hotel that combines pet-friendly accommodations with luxurious spa amenities can be a daunting task, especially in a vibrant destination like Miami. This curated list saves you time and effort by highlighting the best beachfront hotels that welcome both you and your furry friend, ensuring a relaxing getaway for everyone. With stunning views and top-notch services, these properties offer a unique blend of comfort and indulgence.",
      "hotels": [
        {
          "id": "lp29c7d",
          "name": "JW Marriott Miami",
          "image": "https://static.cupid.travel/hotels/489586308.jpg",
          "description": "Experience unparalleled luxury at JW Marriott Hotel Miami, conveniently located near Miami International Airport. Enjoy elegantly appointed rooms with flat-screen TVs and 24-hour room service, along with rejuvenating wellness amenities at Salus Spa. Savor diverse dining options and take advantage of nearby attractions, including the Miami Beach Convention Center and Crandon Golf Course, for an unforgettable getaway.",
          "highlight": "Includes elegantly appointed rooms with 24-hour room service and access to rejuvenating wellness amenities at Salus Spa.",
          "price": "$386/night",
          "rating": 7.5,
          "location": "1109 Brickell Ave",
          "tags": [],
          "isRefundable": false
        },
        {
          "id": "lp1a9df",
          "name": "The Grayson Hotel Miami Downtown",
          "image": "https://static.cupid.travel/hotels/600837110.jpg",
          "description": "Discover modern luxury at The Gabriel Miami Downtown, Curio Collection by Hilton, where guests enjoy a complimentary drink upon arrival. With stunning floor-to-ceiling windows offering panoramic views of the Miami skyline and Biscayne Bay, your stay is bound to be unforgettable. Indulge in exquisite tapas at CVLTVRA and unwind at the DERMANOVA Med Spa after a workout in the state-of-the-art fitness center for the ultimate Miami experience.",
          "highlight": "Includes a rooftop garden and a world-class spa, along with stunning skyline views from floor-to-ceiling windows.",
          "price": "$321/night",
          "rating": 7.5,
          "location": "1100 Biscayne Blvd",
          "tags": [],
          "isRefundable": false
        },
        {
          "id": "lp4b5f5",
          "name": "W Miami",
          "image": "https://static.cupid.travel/hotels/ex_w3997h2661x3y6-d6181390_z.jpg",
          "description": "Experience the luxurious allure of W Miami, perfectly situated for easy access to shopping and nightlife. Enjoy refreshing dips in the stunning outdoor pool or take in panoramic views from the rooftop terrace. Delight your taste buds with gourmet meals at Panther Coffee and unwind in elegantly designed guest rooms equipped with modern amenities for the ultimate comfort.",
          "highlight": "W Miami includes a rooftop terrace with panoramic views and a luxurious spa for ultimate relaxation and enjoyment.",
          "price": "$544/night",
          "rating": 7.5,
          "location": "485 Brickell Avenue",
          "tags": [],
          "isRefundable": true
        },
        {
          "id": "lp30c6d",
          "name": "The Mutiny Hotel",
          "image": "https://static.cupid.travel/hotels/ex_981ec8be_z.jpg",
          "description": "Experience luxury and relaxation at The Mutiny Hotel, nestled in the lively Coconut Grove of Miami. Enjoy indulgent spa treatments, a refreshing outdoor pool, and delectable dining at Table 14 Bar & Restaurant, all while staying in one of our uniquely designed guestrooms equipped with kitchens and modern amenities. Whether you're here for business or leisure, The Mutiny Hotel offers the perfect blend of comfort and convenience for an unforgettable getaway.",
          "highlight": "Includes spacious guestrooms with kitchens, a full spa, and an outdoor pool for a luxurious beachfront experience.",
          "price": "$227/night",
          "rating": 7.5,
          "location": "2951 S Bayshore Dr",
          "tags": [],
          "isRefundable": true
        },
        {
          "id": "lp243c1",
          "name": "Biltmore Hotel Miami Coral Gables",
          "image": "https://static.cupid.travel/hotels/168307400.jpg",
          "description": "Experience unparalleled luxury at the Biltmore Hotel, where you can enjoy an 18-hole golf course, a rejuvenating spa, and modern comforts like 65-inch flat-screen TVs in every room. With 10 tennis courts, a large swimming pool, and a state-of-the-art fitness center set within 150 acres of lush landscapes, leisure is truly at your fingertips. Delight in a diverse culinary journey featuring French and Italian cuisine, alongside a relaxed pub atmosphere and a lavish Sunday Champagne Brunch—book your unforgettable stay in Coral Gables today.",
          "highlight": "Includes an 18-hole golf course and a rejuvenating spa within 150 acres of lush landscapes.",
          "price": "$439/night",
          "rating": 7.5,
          "location": "1200 Anastasia Ave",
          "tags": [],
          "isRefundable": false
        },
        {
          "id": "lp42e7e",
          "name": "Kimpton EPIC Hotel, an IHG Hotel",
          "image": "https://static.cupid.travel/hotels/242170411.jpg",
          "description": "Experience luxury at Kimpton EPIC Hotel, where stunning floor-to-ceiling windows and private balconies in each room offer breathtaking views. Indulge in relaxation at the spa or stay active with fitness classes, and unwind at the rooftop pool while soaking in the Miami skyline. Conveniently located in the financial district, this pet-friendly hotel features a full-service marina and waterfront dining for an unforgettable stay.",
          "highlight": "Includes stunning floor-to-ceiling windows and a rooftop pool overlooking the Miami skyline, along with a full-service marina.",
          "price": "$367/night",
          "rating": 7.5,
          "location": "270 Biscayne Blvd Way",
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
