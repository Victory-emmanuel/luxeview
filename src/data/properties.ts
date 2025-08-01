import { Property } from '@/types';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

export const properties: Property[] = [
  {
    id: 1,
    image: property1,
    images: [property1, property2, property3],
    price: '$8,500,000',
    location: 'Manhattan Penthouse, New York',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    description: 'Stunning penthouse with panoramic city views, featuring floor-to-ceiling windows, premium finishes, and a private terrace. Located in the heart of Manhattan with world-class amenities.',
    features: [
      'Panoramic City Views',
      'Private Terrace',
      'Floor-to-Ceiling Windows',
      'Premium Finishes',
      'Concierge Service',
      'Fitness Center',
      'Rooftop Pool'
    ],
    agent: 'Sarah Mitchell',
    type: 'sale',
    status: 'available',
    yearBuilt: 2018,
    lotSize: '0.1 acres',
    propertyType: 'penthouse'
  },
  {
    id: 2,
    image: property2,
    images: [property2, property1, property3],
    price: '$12,200,000',
    location: 'Malibu Oceanfront, California',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4800,
    description: 'Breathtaking oceanfront estate with direct beach access, infinity pool, and unobstructed Pacific Ocean views. Modern architecture meets coastal luxury.',
    features: [
      'Direct Beach Access',
      'Infinity Pool',
      'Ocean Views',
      'Modern Architecture',
      'Wine Cellar',
      'Home Theater',
      'Guest House'
    ],
    agent: 'Michael Chen',
    type: 'sale',
    status: 'available',
    yearBuilt: 2020,
    lotSize: '1.2 acres',
    propertyType: 'house'
  },
  {
    id: 3,
    image: property3,
    images: [property3, property1, property2],
    price: '$6,800,000',
    location: 'Aspen Mountain Retreat, Colorado',
    bedrooms: 6,
    bathrooms: 5,
    sqft: 5200,
    description: 'Luxury mountain retreat with ski-in/ski-out access, stone fireplace, and panoramic mountain views. Perfect for year-round mountain living.',
    features: [
      'Ski-in/Ski-out Access',
      'Stone Fireplace',
      'Mountain Views',
      'Hot Tub',
      'Game Room',
      'Wine Storage',
      'Heated Garage'
    ],
    agent: 'Emily Rodriguez',
    type: 'sale',
    status: 'available',
    yearBuilt: 2019,
    lotSize: '2.5 acres',
    propertyType: 'house'
  },
  {
    id: 4,
    image: property1,
    images: [property1, property2, property3],
    price: '$15,300,000',
    location: 'Beverly Hills Estate, California',
    bedrooms: 7,
    bathrooms: 8,
    sqft: 8500,
    description: 'Magnificent Beverly Hills estate with resort-style amenities, including tennis court, pool house, and meticulously landscaped grounds.',
    features: [
      'Tennis Court',
      'Pool House',
      'Landscaped Grounds',
      'Home Office',
      'Chef\'s Kitchen',
      'Master Suite',
      'Security System'
    ],
    agent: 'David Thompson',
    type: 'sale',
    status: 'pending',
    yearBuilt: 2017,
    lotSize: '1.8 acres',
    propertyType: 'estate'
  },
  {
    id: 5,
    image: property2,
    images: [property2, property3, property1],
    price: '$9,700,000',
    location: 'Hamptons Waterfront, New York',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    description: 'Elegant Hamptons waterfront home with private dock, pool, and beautifully appointed interiors. Classic East Coast luxury living.',
    features: [
      'Private Dock',
      'Waterfront Views',
      'Swimming Pool',
      'Elegant Interiors',
      'Guest Quarters',
      'Outdoor Kitchen',
      'Boat House'
    ],
    agent: 'Sarah Mitchell',
    type: 'sale',
    status: 'available',
    yearBuilt: 2016,
    lotSize: '1.5 acres',
    propertyType: 'house'
  }
];

export const featuredProperties = properties.slice(0, 3);
