import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  Property,
  PropertyFormData,
  PropertyFilters,
  Coordinates,
} from "@/types";

const PROPERTIES_COLLECTION = "properties";

// Convert Firestore timestamp to Date
const convertTimestamp = (timestamp: any): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return timestamp || new Date();
};

// Convert Property from Firestore format
const convertFirestoreProperty = (doc: any): Property => {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as Property;
};

// Note: Image handling is done via URLs directly, no Firebase Storage needed

// Enhanced geocoding service with Nigerian location support (CORS-free)
export const getCoordinatesFromAddress = async (
  address: string
): Promise<Coordinates> => {
  try {
    console.log("Geocoding address:", address);

    // Skip external API calls to avoid CORS issues
    // Use intelligent location mapping based on address content

    // Enhanced location mapping for Lagos areas and Nigerian cities
    const locationMap: Record<string, Coordinates> = {
      // Lagos neighborhoods and areas
      "victoria island": { latitude: 6.4281, longitude: 3.4219 },
      ikoyi: { latitude: 6.4474, longitude: 3.4553 },
      lekki: { latitude: 6.4698, longitude: 3.5852 },
      surulere: { latitude: 6.4969, longitude: 3.3553 },
      yaba: { latitude: 6.5158, longitude: 3.3707 },
      ikeja: { latitude: 6.5954, longitude: 3.3364 },
      bariga: { latitude: 6.5244, longitude: 3.3792 },
      shomolu: { latitude: 6.5244, longitude: 3.3792 },
      ifako: { latitude: 6.5954, longitude: 3.3364 },
      oworoshoki: { latitude: 6.5244, longitude: 3.3792 },
      mainland: { latitude: 6.5244, longitude: 3.3792 },
      island: { latitude: 6.4281, longitude: 3.4219 },
      ajah: { latitude: 6.4698, longitude: 3.5852 },
      gbagada: { latitude: 6.5244, longitude: 3.3792 },
      maryland: { latitude: 6.5954, longitude: 3.3364 },
      festac: { latitude: 6.4698, longitude: 3.2792 },
      apapa: { latitude: 6.4698, longitude: 3.3792 },

      // Major Nigerian cities
      lagos: { latitude: 6.5244, longitude: 3.3792 },
      abuja: { latitude: 9.0765, longitude: 7.3986 },
      kano: { latitude: 12.0022, longitude: 8.592 },
      ibadan: { latitude: 7.3775, longitude: 3.947 },
      "port harcourt": { latitude: 4.8156, longitude: 7.0498 },
      benin: { latitude: 6.335, longitude: 5.6037 },
      maiduguri: { latitude: 11.8311, longitude: 13.151 },
      zaria: { latitude: 11.1119, longitude: 7.7227 },
      aba: { latitude: 5.1066, longitude: 7.3667 },
      jos: { latitude: 9.8965, longitude: 8.8583 },
    };

    // Check if address contains any known location
    const addressLower = address.toLowerCase();
    for (const [location, coords] of Object.entries(locationMap)) {
      if (addressLower.includes(location)) {
        console.log(`Found coordinates for ${location}:`, coords);
        return coords;
      }
    }

    // Default to Lagos coordinates if no match found
    console.log("Using default Lagos coordinates");
    return locationMap.lagos;
  } catch (error) {
    console.error("Error geocoding address:", error);
    // Return default coordinates for Lagos, Nigeria
    return {
      latitude: 6.5244,
      longitude: 3.3792,
    };
  }
};

// Reverse geocoding - get address from coordinates
export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );

    if (response.ok) {
      const data = await response.json();
      return data.display_name || `${latitude}, ${longitude}`;
    }

    return `${latitude}, ${longitude}`;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return `${latitude}, ${longitude}`;
  }
};

// Create a new property
export const createProperty = async (
  propertyData: PropertyFormData,
  userId: string
): Promise<string> => {
  try {
    // Get coordinates if not provided
    let coordinates = propertyData.coordinates;
    if (!coordinates) {
      coordinates = await getCoordinatesFromAddress(propertyData.location);
    }

    const property: Omit<Property, "id"> = {
      ...propertyData,
      coordinates,
      status: "available",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
      // Backward compatibility fields
      image: propertyData.images[0] || "",
      agent: propertyData.agentContact.name,
      type: propertyData.purchaseType,
    };

    const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), {
      ...property,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating property:", error);
    throw new Error("Failed to create property");
  }
};

// Update an existing property
export const updateProperty = async (
  propertyId: string,
  propertyData: Partial<PropertyFormData>,
  userId: string
): Promise<void> => {
  try {
    const propertyRef = doc(db, PROPERTIES_COLLECTION, propertyId);

    // Get coordinates if location changed and coordinates not provided
    let coordinates = propertyData.coordinates;
    if (propertyData.location && !coordinates) {
      coordinates = await getCoordinatesFromAddress(propertyData.location);
    }

    const updateData: any = {
      ...propertyData,
      ...(coordinates && { coordinates }),
      updatedAt: serverTimestamp(),
      // Update backward compatibility fields
      ...(propertyData.images && { image: propertyData.images[0] || "" }),
      ...(propertyData.agentContact && {
        agent: propertyData.agentContact.name,
      }),
      ...(propertyData.purchaseType && { type: propertyData.purchaseType }),
    };

    await updateDoc(propertyRef, updateData);
  } catch (error) {
    console.error("Error updating property:", error);
    throw new Error("Failed to update property");
  }
};

// Delete a property
export const deleteProperty = async (propertyId: string): Promise<void> => {
  try {
    // Delete the property document (images are just URLs, no storage cleanup needed)
    const propertyRef = doc(db, PROPERTIES_COLLECTION, propertyId);
    await deleteDoc(propertyRef);
  } catch (error) {
    console.error("Error deleting property:", error);
    throw new Error("Failed to delete property");
  }
};

// Get a single property by ID
export const getProperty = async (
  propertyId: string
): Promise<Property | null> => {
  try {
    const propertyRef = doc(db, PROPERTIES_COLLECTION, propertyId);
    const propertySnap = await getDoc(propertyRef);

    if (propertySnap.exists()) {
      return convertFirestoreProperty(propertySnap);
    }

    return null;
  } catch (error) {
    console.error("Error getting property:", error);
    throw new Error("Failed to get property");
  }
};

// Get all properties with optional filtering and pagination
export const getProperties = async (
  filters?: PropertyFilters,
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ properties: Property[]; lastDoc: DocumentSnapshot | null }> => {
  try {
    let q = query(collection(db, PROPERTIES_COLLECTION));

    // Apply filters
    if (filters) {
      if (filters.propertyType) {
        q = query(q, where("propertyType", "==", filters.propertyType));
      }
      if (filters.purchaseType) {
        q = query(q, where("purchaseType", "==", filters.purchaseType));
      }
      if (filters.status) {
        q = query(q, where("status", "==", filters.status));
      }
      if (filters.bedrooms) {
        q = query(q, where("bedrooms", "==", filters.bedrooms));
      }
      if (filters.bathrooms) {
        q = query(q, where("bathrooms", "==", filters.bathrooms));
      }
      if (filters.priceRange) {
        if (filters.priceRange.min) {
          q = query(q, where("price", ">=", filters.priceRange.min));
        }
        if (filters.priceRange.max) {
          q = query(q, where("price", "<=", filters.priceRange.max));
        }
      }
    }

    // Add ordering and pagination
    q = query(q, orderBy("createdAt", "desc"), limit(pageSize));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const properties = querySnapshot.docs.map(convertFirestoreProperty);
    const newLastDoc =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { properties, lastDoc: newLastDoc };
  } catch (error) {
    console.error("Error getting properties:", error);
    throw new Error("Failed to get properties");
  }
};

// Search properties by text
export const searchProperties = async (
  searchTerm: string,
  pageSize: number = 20
): Promise<Property[]> => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a basic implementation that searches in name and location
    // For production, consider using Algolia or Elasticsearch

    const queries = [
      query(
        collection(db, PROPERTIES_COLLECTION),
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
        orderBy("name"),
        limit(pageSize)
      ),
      query(
        collection(db, PROPERTIES_COLLECTION),
        where("location", ">=", searchTerm),
        where("location", "<=", searchTerm + "\uf8ff"),
        orderBy("location"),
        limit(pageSize)
      ),
    ];

    const results = await Promise.all(queries.map((q) => getDocs(q)));
    const allProperties = results.flatMap((snapshot) =>
      snapshot.docs.map(convertFirestoreProperty)
    );

    // Remove duplicates based on ID
    const uniqueProperties = allProperties.filter(
      (property, index, self) =>
        index === self.findIndex((p) => p.id === property.id)
    );

    return uniqueProperties.slice(0, pageSize);
  } catch (error) {
    console.error("Error searching properties:", error);
    throw new Error("Failed to search properties");
  }
};

// Get properties count
export const getPropertiesCount = async (
  filters?: PropertyFilters
): Promise<number> => {
  try {
    let q = query(collection(db, PROPERTIES_COLLECTION));

    // Apply same filters as getProperties
    if (filters) {
      if (filters.propertyType) {
        q = query(q, where("propertyType", "==", filters.propertyType));
      }
      if (filters.purchaseType) {
        q = query(q, where("purchaseType", "==", filters.purchaseType));
      }
      if (filters.status) {
        q = query(q, where("status", "==", filters.status));
      }
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting properties count:", error);
    return 0;
  }
};
