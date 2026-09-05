'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PackageTier, DayAvailability, BookingSubmission, TimeSlot } from '@/types';
import { INITIAL_PACKAGES } from '@/data/packages';
import { INITIAL_AVAILABILITY } from '@/data/availability';

interface BookingAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const AVAILABLE_ADDONS: BookingAddon[] = [
  { id: 'addon-rush', name: '48-Hour Priority Rush Delivery', price: 120, description: 'Receive your complete retouched gallery within 2 days.' },
  { id: 'addon-extra-time', name: 'Additional 30 Minutes Coverage', price: 150, description: 'Extended shooting time for an extra location or outfit.' },
  { id: 'addon-fineart', name: 'Museum-Grade 11x14 Archival Print', price: 85, description: 'Hand-crafted cotton rag print shipped to your door.' },
];

interface BookingContextType {
  // Packages
  packages: PackageTier[];
  updatePackage: (pkgId: string, newPrice: number, newDeposit: number) => void;

  // Availability
  availability: DayAvailability[];
  toggleDateBlock: (dateStr: string) => void;
  toggleSlotAvailability: (dateStr: string, slotId: string) => void;

  // Bookings list (for Admin)
  bookings: BookingSubmission[];
  addBooking: (booking: Omit<BookingSubmission, 'id' | 'createdAt'>) => BookingSubmission;
  rescheduleBooking: (bookingId: string, newDate: string, newSlot: string) => void;

  // Active Booking Funnel Modal State
  isModalOpen: boolean;
  openBookingModal: (packageId?: string) => void;
  closeBookingModal: () => void;

  // Booking Flow Steps & Selections
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectedPackage: PackageTier;
  setSelectedPackage: (pkg: PackageTier) => void;
  selectedAddons: string[];
  toggleAddon: (addonId: string) => void;
  selectedDate: string | null;
  setSelectedDate: (dateStr: string | null) => void;
  selectedSlot: TimeSlot | null;
  setSelectedSlot: (slot: TimeSlot | null) => void;
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
  setClientInfo: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string; notes: string }>>;
  signature: string;
  setSignature: (sig: string) => void;

  // Calculations
  totalPrice: number;
  depositDue: number;
  remainingBalance: number;

  // Reset
  resetBookingForm: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const INITIAL_MOCK_BOOKINGS: BookingSubmission[] = [
  {
    id: 'BK-8902',
    createdAt: 'Yesterday, 4:15 PM',
    packageId: 'pkg-signature',
    packageName: 'Signature Session',
    totalPrice: 550,
    depositPaid: 150,
    remainingBalance: 400,
    date: 'Upcoming Saturday',
    timeSlot: '05:15 PM (Golden Hour)',
    clientName: 'Elena Rostova',
    clientEmail: 'elena.rostova@gmail.com',
    clientPhone: '(415) 890-2134',
    notes: 'Looking for moody, natural light portraiture near the botanical conservatory.',
    signature: 'Elena Rostova',
    status: 'confirmed',
  },
  {
    id: 'BK-8901',
    createdAt: '3 days ago',
    packageId: 'pkg-editorial',
    packageName: 'Editorial Story',
    totalPrice: 850,
    depositPaid: 250,
    remainingBalance: 600,
    date: 'Next Tuesday',
    timeSlot: '02:00 PM (Studio Direct)',
    clientName: 'Marcus Vance',
    clientEmail: 'marcus@vancearchitecture.com',
    clientPhone: '(212) 555-0199',
    notes: 'Commercial founder session for new studio monograph launch.',
    signature: 'Marcus Vance',
    status: 'confirmed',
  },
];

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<PackageTier[]>(INITIAL_PACKAGES);
  const [availability, setAvailability] = useState<DayAvailability[]>(INITIAL_AVAILABILITY);
  const [bookings, setBookings] = useState<BookingSubmission[]>(INITIAL_MOCK_BOOKINGS);

  // Modal & Flow State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackageTier>(INITIAL_PACKAGES[1]); // Signature default
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [signature, setSignature] = useState('');

  // Load from localStorage if available
  useEffect(() => {
    try {
      const savedPackages = localStorage.getItem('clay_packages');
      if (savedPackages) setPackages(JSON.parse(savedPackages));

      const savedBookings = localStorage.getItem('clay_bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));
    } catch {
      // fallback
    }
  }, []);

  // Save to localStorage when packages change
  const updatePackage = (pkgId: string, newPrice: number, newDeposit: number) => {
    setPackages((prev) => {
      const updated = prev.map((p) => (p.id === pkgId ? { ...p, price: newPrice, deposit: newDeposit } : p));
      try {
        localStorage.setItem('clay_packages', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleDateBlock = (dateStr: string) => {
    setAvailability((prev) =>
      prev.map((day) => (day.date === dateStr ? { ...day, isBlocked: !day.isBlocked } : day))
    );
  };

  const toggleSlotAvailability = (dateStr: string, slotId: string) => {
    setAvailability((prev) =>
      prev.map((day) => {
        if (day.date !== dateStr) return day;
        return {
          ...day,
          slots: day.slots.map((s) => (s.id === slotId ? { ...s, isAvailable: !s.isAvailable } : s)),
        };
      })
    );
  };

  const addBooking = (bookingData: Omit<BookingSubmission, 'id' | 'createdAt'>) => {
    const newBooking: BookingSubmission = {
      ...bookingData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
    };
    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('clay_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    return newBooking;
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newSlot: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, date: newDate, timeSlot: newSlot, status: 'rescheduled' } : b))
    );
  };

  const openBookingModal = (packageId?: string) => {
    if (packageId) {
      const found = packages.find((p) => p.id === packageId);
      if (found) setSelectedPackage(found);
    }
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const resetBookingForm = () => {
    setCurrentStep(1);
    setSelectedAddons([]);
    setSelectedDate(null);
    setSelectedSlot(null);
    setClientInfo({ name: '', email: '', phone: '', notes: '' });
    setSignature('');
  };

  // Addon pricing calculation
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = AVAILABLE_ADDONS.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = (selectedPackage?.price || 0) + addonsTotal;
  const depositDue = selectedPackage?.deposit || 150;
  const remainingBalance = Math.max(0, totalPrice - depositDue);

  return (
    <BookingContext.Provider
      value={{
        packages,
        updatePackage,
        availability,
        toggleDateBlock,
        toggleSlotAvailability,
        bookings,
        addBooking,
        rescheduleBooking,
        isModalOpen,
        openBookingModal,
        closeBookingModal,
        currentStep,
        setCurrentStep,
        selectedPackage,
        setSelectedPackage,
        selectedAddons,
        toggleAddon,
        selectedDate,
        setSelectedDate,
        selectedSlot,
        setSelectedSlot,
        clientInfo,
        setClientInfo,
        signature,
        setSignature,
        totalPrice,
        depositDue,
        remainingBalance,
        resetBookingForm,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
