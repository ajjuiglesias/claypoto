export interface PackageTier {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  outfits: string;
  imageCount: string;
  turnaround: string;
  price: number;
  deposit: number;
  features: string[];
  isPopular?: boolean;
  category: 'portrait' | 'couples' | 'branding' | 'all';
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'portraits' | 'couples' | 'branding' | 'families' | 'weddings';
  imageUrl: string;
  description: string;
  location: string;
  recommendedPackageId: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startingPrice: number;
  imageUrl: string;
  inclusions: string[];
  recommendedPackageId: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  label: string; // e.g. "Golden Hour", "Morning Glow", "Studio Light"
  isGoldenHour?: boolean;
  isAvailable: boolean;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // "MON", "TUE", etc.
  dayNumber: number;
  isBlocked: boolean;
  slots: TimeSlot[];
}

export interface BookingSubmission {
  id: string;
  createdAt: string;
  packageId: string;
  packageName: string;
  totalPrice: number;
  depositPaid: number;
  remainingBalance: number;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  signature: string;
  status: 'confirmed' | 'pending' | 'completed' | 'rescheduled';
}
