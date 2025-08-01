// LuxeView Elite - Type Definitions

export interface Property {
  id: number;
  image: string;
  images?: string[]; // Additional images for gallery
  price: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  description?: string;
  features?: string[];
  agent?: string;
  type?: 'sale' | 'rent';
  status?: 'available' | 'sold' | 'pending';
  yearBuilt?: number;
  lotSize?: string;
  propertyType?: 'house' | 'condo' | 'townhouse' | 'penthouse' | 'estate';
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  content: string;
  rating: number;
  image?: string;
  propertyPurchased?: string;
  date?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  detailedDescription?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface Agent {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  phone: string;
  email: string;
  specialties: string[];
  experience: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  founded: string;
  team: Agent[];
  contact: ContactInfo;
}

export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  propertyType: string[];
  bedrooms: number[];
  bathrooms: number[];
  location: string[];
  status: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: number;
  preferredContact?: 'email' | 'phone';
}
