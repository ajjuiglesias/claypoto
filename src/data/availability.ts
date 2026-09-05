import { DayAvailability } from '@/types';

// Generates upcoming 14 available days starting from today/tomorrow
export function generateDefaultAvailability(): DayAvailability[] {
  const days: DayAvailability[] = [];
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const today = new Date();
  
  for (let i = 2; i < 16; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    
    const dayOfWeek = dayNames[d.getDay()];
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    
    // YYYY-MM-DD
    const dateStr = d.toISOString().split('T')[0];
    
    days.push({
      date: dateStr,
      dayOfWeek: dayOfWeek,
      dayNumber: d.getDate(),
      isBlocked: i === 5 || i === 11, // A couple pre-blocked dates to show functionality
      slots: [
        { id: `${dateStr}-s1`, time: '09:00 AM', label: 'Morning Soft Light', isGoldenHour: false, isAvailable: true },
        { id: `${dateStr}-s2`, time: '01:30 PM', label: 'Studio Direct Light', isGoldenHour: false, isAvailable: !isWeekend },
        { id: `${dateStr}-s3`, time: '05:15 PM', label: 'Golden Hour Sunset', isGoldenHour: true, isAvailable: true },
        { id: `${dateStr}-s4`, time: '06:45 PM', label: 'Blue Hour Twilight', isGoldenHour: true, isAvailable: i % 2 === 0 },
      ],
    });
  }
  
  return days;
}

export const INITIAL_AVAILABILITY = generateDefaultAvailability();
