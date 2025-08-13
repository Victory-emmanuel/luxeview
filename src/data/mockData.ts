// Mock data for dashboards

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  status: 'available' | 'sold' | 'pending';
  views: number;
  inquiries: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: 'house' | 'apartment' | 'condo' | 'villa';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  joinDate: Date;
  lastActive: Date;
  avatar?: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  userName: string;
  userEmail: string;
  message: string;
  date: Date;
  status: 'new' | 'responded' | 'closed';
}

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  agent: string;
  notes?: string;
}

export interface Analytics {
  totalProperties: number;
  totalUsers: number;
  monthlyViews: number;
  revenue: number;
  newInquiries: number;
  scheduledAppointments: number;
}

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse with City Views',
    price: 2500000,
    location: 'Manhattan, New York',
    status: 'available',
    views: 1250,
    inquiries: 23,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    type: 'apartment',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Modern Villa with Pool',
    price: 1800000,
    location: 'Beverly Hills, CA',
    status: 'pending',
    views: 890,
    inquiries: 15,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    type: 'villa',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Waterfront Condo',
    price: 950000,
    location: 'Miami Beach, FL',
    status: 'sold',
    views: 2100,
    inquiries: 45,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    type: 'condo',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'Historic Townhouse',
    price: 3200000,
    location: 'Boston, MA',
    status: 'available',
    views: 675,
    inquiries: 12,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    type: 'house',
    createdAt: new Date('2024-02-10'),
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'client',
    joinDate: new Date('2024-01-10'),
    lastActive: new Date('2024-02-15'),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'client',
    joinDate: new Date('2024-01-15'),
    lastActive: new Date('2024-02-14'),
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    role: 'admin',
    joinDate: new Date('2023-12-01'),
    lastActive: new Date('2024-02-15'),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
];

// Mock Inquiries
export const mockInquiries: Inquiry[] = [
  {
    id: '1',
    propertyId: '1',
    propertyTitle: 'Luxury Penthouse with City Views',
    userName: 'John Smith',
    userEmail: 'john.smith@email.com',
    message: 'I am interested in scheduling a viewing for this property. When would be a good time?',
    date: new Date('2024-02-14'),
    status: 'new',
  },
  {
    id: '2',
    propertyId: '2',
    propertyTitle: 'Modern Villa with Pool',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@email.com',
    message: 'Could you provide more information about the neighborhood and nearby schools?',
    date: new Date('2024-02-13'),
    status: 'responded',
  },
  {
    id: '3',
    propertyId: '4',
    propertyTitle: 'Historic Townhouse',
    userName: 'David Wilson',
    userEmail: 'david.wilson@email.com',
    message: 'What is the history of this property? Any recent renovations?',
    date: new Date('2024-02-12'),
    status: 'new',
  },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    propertyId: '1',
    propertyTitle: 'Luxury Penthouse with City Views',
    date: new Date('2024-02-20'),
    time: '2:00 PM',
    status: 'scheduled',
    agent: 'Michael Chen',
    notes: 'Client interested in immediate purchase',
  },
  {
    id: '2',
    propertyId: '2',
    propertyTitle: 'Modern Villa with Pool',
    date: new Date('2024-02-18'),
    time: '10:00 AM',
    status: 'completed',
    agent: 'Michael Chen',
    notes: 'Showed property, client needs to discuss with spouse',
  },
  {
    id: '3',
    propertyId: '4',
    propertyTitle: 'Historic Townhouse',
    date: new Date('2024-02-22'),
    time: '3:30 PM',
    status: 'scheduled',
    agent: 'Michael Chen',
  },
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  totalProperties: 24,
  totalUsers: 156,
  monthlyViews: 12450,
  revenue: 8750000,
  newInquiries: 23,
  scheduledAppointments: 8,
};

// Client-specific data
export const mockSavedProperties = mockProperties.slice(0, 3);
export const mockViewingHistory = [
  {
    id: '1',
    propertyId: '1',
    propertyTitle: 'Luxury Penthouse with City Views',
    viewDate: new Date('2024-02-14'),
    duration: '5 minutes',
  },
  {
    id: '2',
    propertyId: '2',
    propertyTitle: 'Modern Villa with Pool',
    viewDate: new Date('2024-02-13'),
    duration: '8 minutes',
  },
  {
    id: '3',
    propertyId: '4',
    propertyTitle: 'Historic Townhouse',
    viewDate: new Date('2024-02-12'),
    duration: '3 minutes',
  },
];

export const mockClientPreferences = {
  priceRange: { min: 500000, max: 2000000 },
  locations: ['Manhattan', 'Brooklyn', 'Queens'],
  propertyTypes: ['apartment', 'condo'],
  amenities: ['pool', 'gym', 'parking', 'doorman'],
};
