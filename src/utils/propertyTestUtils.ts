// Property Management Test Utilities
import { PropertyFormData, PropertyFeature, PropertyType, PurchaseType } from '@/types';

// Sample property data for testing
export const samplePropertyData: PropertyFormData = {
  name: 'Luxury Penthouse in Victoria Island',
  location: 'Victoria Island, Lagos, Nigeria',
  description: 'A stunning luxury penthouse with panoramic views of Lagos lagoon. Features modern amenities, spacious living areas, and premium finishes throughout.',
  neighborhood: 'Victoria Island',
  price: 150000000, // 150 million Naira
  bedrooms: 4,
  bathrooms: 3,
  sqft: 3500,
  propertyType: 'penthouse' as PropertyType,
  purchaseType: 'sale' as PurchaseType,
  features: [
    'gym',
    'pool',
    'security',
    'parking',
    'elevator',
    'air_conditioning',
    'balcony',
    'internet'
  ] as PropertyFeature[],
  images: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
  ],
  agentContact: {
    name: 'Adebayo Johnson',
    phone: '+234 803 123 4567',
    email: 'adebayo.johnson@luxeview.com',
    whatsappLink: 'https://wa.me/2348031234567'
  }
};

// Test validation function
export const validatePropertyData = (data: PropertyFormData): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 1) {
    errors.push('Property name is required');
  }

  if (!data.location || data.location.trim().length < 1) {
    errors.push('Location is required');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  if (!data.neighborhood || data.neighborhood.trim().length < 1) {
    errors.push('Neighborhood is required');
  }

  if (!data.price || data.price <= 0) {
    errors.push('Price must be greater than 0');
  }

  if (data.bedrooms < 0) {
    errors.push('Bedrooms must be 0 or greater');
  }

  if (data.bathrooms < 0) {
    errors.push('Bathrooms must be 0 or greater');
  }

  if (!data.sqft || data.sqft <= 0) {
    errors.push('Square feet must be greater than 0');
  }

  if (!data.features || data.features.length === 0) {
    errors.push('At least one feature must be selected');
  }

  if (!data.images || data.images.length === 0) {
    errors.push('At least one image is required');
  }

  if (!data.agentContact.name || data.agentContact.name.trim().length < 1) {
    errors.push('Agent name is required');
  }

  if (!data.agentContact.phone || data.agentContact.phone.trim().length < 1) {
    errors.push('Agent phone is required');
  }

  if (!data.agentContact.email || !isValidEmail(data.agentContact.email)) {
    errors.push('Valid agent email is required');
  }

  return errors;
};

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Format price for display
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
};

// Test coordinate validation
export const isValidCoordinates = (lat: number, lon: number): boolean => {
  return (
    lat >= -90 && lat <= 90 &&
    lon >= -180 && lon <= 180
  );
};

// Nigerian cities for testing geocoding
export const nigerianTestCities = [
  'Lagos',
  'Abuja',
  'Kano',
  'Ibadan',
  'Port Harcourt',
  'Benin City',
  'Maiduguri',
  'Zaria',
  'Aba',
  'Jos'
];

// Property features for testing
export const allPropertyFeatures: PropertyFeature[] = [
  'gym',
  'pool',
  'security',
  'solar_power',
  'parking',
  'garden',
  'balcony',
  'elevator',
  'air_conditioning',
  'heating',
  'fireplace',
  'walk_in_closet',
  'laundry_room',
  'storage',
  'pet_friendly',
  'furnished',
  'internet',
  'cable_tv',
  'dishwasher',
  'microwave',
  'refrigerator',
  'washer_dryer'
];

// Property types for testing
export const allPropertyTypes: PropertyType[] = [
  'condo',
  'apartment',
  'house',
  'townhouse',
  'villa',
  'penthouse',
  'estate',
  'others'
];

// Purchase types for testing
export const allPurchaseTypes: PurchaseType[] = [
  'sale',
  'rent'
];

// Test data generator
export const generateTestProperty = (overrides: Partial<PropertyFormData> = {}): PropertyFormData => {
  return {
    ...samplePropertyData,
    ...overrides
  };
};

// Console test runner
export const runPropertyTests = () => {
  console.log('🏠 Running Property Management Tests...\n');

  // Test 1: Validate sample property data
  console.log('Test 1: Validating sample property data');
  const errors = validatePropertyData(samplePropertyData);
  if (errors.length === 0) {
    console.log('✅ Sample property data is valid');
  } else {
    console.log('❌ Sample property data has errors:', errors);
  }

  // Test 2: Test price formatting
  console.log('\nTest 2: Testing price formatting');
  const formattedPrice = formatPrice(samplePropertyData.price);
  console.log(`✅ Price formatted: ${formattedPrice}`);

  // Test 3: Test coordinate validation
  console.log('\nTest 3: Testing coordinate validation');
  const validCoords = isValidCoordinates(6.5244, 3.3792); // Lagos coordinates
  const invalidCoords = isValidCoordinates(200, 400); // Invalid coordinates
  console.log(`✅ Valid coordinates (Lagos): ${validCoords}`);
  console.log(`✅ Invalid coordinates: ${!invalidCoords}`);

  // Test 4: Test property generation
  console.log('\nTest 4: Testing property generation');
  const testProperty = generateTestProperty({ name: 'Test Property', price: 50000000 });
  console.log(`✅ Generated test property: ${testProperty.name} - ${formatPrice(testProperty.price)}`);

  console.log('\n🎉 All property management tests completed!');
};

// Export for use in development
if (typeof window !== 'undefined') {
  (window as any).runPropertyTests = runPropertyTests;
  (window as any).samplePropertyData = samplePropertyData;
}
