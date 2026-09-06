'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { Sun, Calendar as CalendarIcon, Clock, Sunset, Check, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Step2DateTime() {
  const { availability, selectedDate, setSelectedDate, selectedSlot, setSelectedSlot } = useBooking();

  const activeDay = availability.find((d) => d.date === selectedDate) ||
    availability.find((d) => !d.isBlocked);

  const handleDateClick = (dateStr: string, isBlocked: boolean) => {
    if (isBlocked) return;
    setSelectedDate(dateStr);
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-lg sm:text-xl text-[#2c2520] font-bold mb-1">
          Select Date & Lighting Slot
        </h3>
        <p className="text-xs text-[#7a6a5b] font-light">
          Real-time calendar availability synced with the photographer&apos;s schedule.
        </p>
      </div>

      {/* Date Carousel / Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#423830] mb-3">
          <span className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#2c2520]">
            <CalendarIcon className="w-3.5 h-3.5 text-[#b88548]" />
            <span>Available Shoot Dates</span>
          </span>
          <Badge variant="secondary" className="text-[10px]">
            Next 14 Days
          </Badge>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
          {availability.map((day) => {
            const isSelected = selectedDate === day.date || (!selectedDate && activeDay?.date === day.date);
            const isBlocked = day.isBlocked;

            return (
              <button
                key={day.date}
                type="button"
                disabled={isBlocked}
                onClick={() => handleDateClick(day.date, isBlocked)}
                className={`p-2 sm:p-3 rounded-xl text-center transition-all flex flex-col items-center justify-center cursor-pointer select-none ${
                  isBlocked
                    ? 'opacity-35 bg-[#f5efe4] border border-[#ebd8c0] cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#b88548] text-white font-bold shadow-md scale-105 ring-2 ring-[#b88548]/30'
                    : 'bg-white text-[#2c2520] border border-[#ebd8c0] hover:border-[#b88548] hover:bg-[#fbf8f2]'
                }`}
              >
                <span className={`text-[9px] uppercase font-bold tracking-wider ${isSelected ? 'text-white' : 'text-[#7a6a5b]'}`}>
                  {day.dayOfWeek}
                </span>
                <span className="text-sm sm:text-base font-bold my-0.5">
                  {day.dayNumber}
                </span>
                <span className={`text-[8px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#ebd8c0]' : isBlocked ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {isBlocked ? 'Booked' : 'Open'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lighting & Time Slots */}
      {activeDay && !activeDay.isBlocked && (
        <div className="pt-4 border-t border-[#ebd8c0]">
          <div className="flex items-center justify-between text-xs text-[#2c2520] mb-3">
            <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#b88548]" />
              <span>Available Time Slots for {activeDay.date}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeDay.slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const isAvailable = slot.isAvailable;

              return (
                <Card
                  key={slot.id}
                  onClick={() => isAvailable && setSelectedSlot(slot)}
                  className={`transition-all cursor-pointer border ${
                    !isAvailable
                      ? 'opacity-40 bg-[#f5efe4] border-[#ebd8c0] cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#fbf9f5] border-2 border-[#b88548] shadow-xs ring-1 ring-[#b88548]'
                      : 'bg-white border-[#ebd8c0] hover:border-[#b88548]/60 hover:bg-[#faf8f5]'
                  }`}
                >
                  <CardContent className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#f5efe4] flex items-center justify-center shrink-0 border border-[#ebd8c0]">
                        {slot.isGoldenHour ? (
                          <Sunset className="w-4 h-4 text-[#855b25]" />
                        ) : (
                          <Sun className="w-4 h-4 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#2c2520] flex items-center gap-1.5">
                          <span>{slot.time}</span>
                          {slot.isGoldenHour && (
                            <Badge variant="gold" className="text-[8px] py-0 px-1.5">
                              Golden Hour
                            </Badge>
                          )}
                        </div>
                        <div className="text-[11px] text-[#7a6a5b] mt-0.5">{slot.label}</div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#b88548] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Timestamp Preview */}
      {selectedSlot && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between font-medium">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Reserved Slot:</span>
          </span>
          <span className="font-bold font-serif">
            {selectedDate || activeDay?.date} @ {selectedSlot.time}
          </span>
        </div>
      )}
    </div>
  );
}
