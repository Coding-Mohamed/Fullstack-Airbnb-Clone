// Interface for the city
export interface City {
  name: string;
}

// Interface for the date range used in the date picker
export interface DateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

// Interface for search parameters, which includes location, date range, and number of guests
export interface SearchParams {
  location: string;
  dateRange: DateRange;
  guests: number;
}

export interface House {
  _id: string; // Unique identifier for the house
  title: string; // Title or name of the house listing
  description: string; // Description of the house
  location: string; // City or location of the house (e.g., "Oslo")
  price: number; // Price per night
  images: string[]; // Array of image URLs for the house
  number_of_bedrooms: number; // Number of bedrooms in the house
  number_of_bathrooms: number; // Number of bathrooms in the house
  amenities: string[]; // List of amenities (e.g., "WiFi", "Pool")
  _creationTime?: number; // Optional: Timestamp for when the house was created
  id: string; // Unique identifier for the house (same as _id)
  uid: string; // Unique identifier for the house (same as _id)
  category: string; // Category of the house (e.g., "Apartment", "House")
}

interface Package {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  duration: string;
  highlights: string[];
  images: string[];
  category: string;
  uid: string;
}
