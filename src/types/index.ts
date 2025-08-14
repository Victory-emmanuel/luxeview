// LuxeView Elite - Type Definitions

// Coordinates interface for map integration
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Agent contact information
export interface AgentContact {
  name: string;
  phone: string;
  email: string;
  whatsappLink?: string;
}

// Property features enum for consistency
export type PropertyFeature =
  | "gym"
  | "pool"
  | "security"
  | "solar_power"
  | "parking"
  | "garden"
  | "balcony"
  | "elevator"
  | "air_conditioning"
  | "heating"
  | "fireplace"
  | "walk_in_closet"
  | "laundry_room"
  | "storage"
  | "pet_friendly"
  | "furnished"
  | "internet"
  | "cable_tv"
  | "dishwasher"
  | "microwave"
  | "refrigerator"
  | "washer_dryer";

// Property type enum
export type PropertyType =
  | "condo"
  | "apartment"
  | "house"
  | "townhouse"
  | "villa"
  | "penthouse"
  | "estate"
  | "others";

// Purchase type enum
export type PurchaseType = "sale" | "rent";

// Property status enum
export type PropertyStatus = "available" | "sold" | "pending" | "rented";

// Comprehensive Property interface for admin management
export interface Property {
  id: string;
  name: string; // Property name
  location: string; // Location address
  description: string;
  neighborhood: string;
  coordinates: Coordinates; // Map coordinates (auto-generated)
  price: number; // Price in Naira
  bedrooms: number;
  bathrooms: number;
  sqft: number; // Square feet
  propertyType: PropertyType;
  purchaseType: PurchaseType;
  features: PropertyFeature[]; // Array of selected features
  images: string[]; // Array of image URLs
  agentContact: AgentContact;
  status: PropertyStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID of creator

  // Optional fields for backward compatibility
  image?: string; // Main image (first in images array)
  agent?: string; // Agent name (from agentContact.name)
  type?: PurchaseType; // Alias for purchaseType
  yearBuilt?: number;
  lotSize?: string;
}

// Form data interface for property creation/editing
export interface PropertyFormData {
  name: string;
  location: string;
  description: string;
  neighborhood: string;
  coordinates?: Coordinates; // Optional as it can be auto-generated
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: PropertyType;
  purchaseType: PurchaseType;
  features: PropertyFeature[];
  images: string[];
  agentContact: AgentContact;
}

// Property filter interface for search and filtering
export interface PropertyFilters {
  searchTerm?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  propertyType?: PropertyType;
  purchaseType?: PurchaseType;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
  neighborhood?: string;
  features?: PropertyFeature[];
  status?: PropertyStatus;
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
  preferredContact?: "email" | "phone";
}
