'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { Sun, Calendar as CalendarIcon, Clock, Sunset, Check } from 'lucide-react';

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
        <h3 className="font-serif text-xl text-[#2c2520] font-semibold mb-1">
          Select Date & Lighting Slot
        </h3>
        <p className="text-xs text-[#5c4f44] font-light">
          Real-time calendar availability synced with the photographer&apos;s schedule.
        </p>
      </div>

      {/* Date Carousel / Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#423830] mb-3">
          <span className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#2c2520]">
            <CalendarIcon className="w-3.5 h-3.5 text-[#855b25]" />
            <span>Available Shoot Dates</span>
          </span>
          <span className="text-[11px] text-[#7a6a5b]">Next 14 Days</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {availability.map((day) => {
            const isSelected = selectedDate === day.date || (!selectedDate && activeDay?.date === day.date);
            const isBlocked = day.isBlocked;

            return (
              <button
                key={day.date}
                disabled={isBlocked}
                onClick={() => handleDateClick(day.date, isBlocked)}
                className={`p-2.5 rounded-xl text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                  isBlocked
                    ? 'opacity-30 bg-[#f5efe4] border border-[#ebd8c0] cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#b88548] text-white font-bold shadow-md scale-105'
                    : 'bg-white text-[#2c2520] border border-[#ebd8c0] hover:border-[#b88548]'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold ${isSelected ? 'text-white' : 'text-[#7a6a5b]'}`}>
                  {day.dayOfWeek}
                </span>
                <span className="text-base font-bold my-0.5">
                  {day.dayNumber}
                </span>
                <span className={`text-[9px] font-bold ${isSelected ? 'text-[#ebd8c0]' : isBlocked ? 'text-rose-600' : 'text-emerald-700'}`}>
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
              <Clock className="w-3.5 h-3.5 text-[#855b25]" />
              <span>Available Time Slots for {activeDay.date}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeDay.slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const isAvailable = slot.isAvailable;

              return (
                <button
                  key={slot.id}
                  disabled={!isAvailable}
                  onClick={() => isAvailable && setSelectedSlot(slot)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    !isAvailable
                      ? 'opacity-30 bg-[#f5efe4] border-[#ebd8c0] cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#fbf8f2] border-2 border-[#b88548] shadow-xs'
                      : 'bg-white border-[#ebd8c0] hover:border-[#b88548] text-[#423830]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f5efe4] flex items-center justify-center shrink-0 border border-[#ebd8c0]">
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
                          <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[9px] font-bold uppercase tracking-wider border border-amber-300">
                            Golden Hour
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#7a6a5b]">{slot.label}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#b88548] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Timestamp Preview */}
      {selectedSlot && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between font-medium">
          <span>Date & Time Reserved:</span>
          <span className="font-bold">
            {selectedDate || activeDay?.date} @ {selectedSlot.time}
          </span>
        </div>
      )}
    </div>
  );
}
