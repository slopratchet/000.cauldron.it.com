/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Ticket,
  TicketPercent,
  Check,
  AlertOctagon,
  Share2,
  Printer,
  Dices,
  Calendar,
} from 'lucide-react';
import { TourDate } from '../types';
import { TOUR_DATA } from '../data';

export default function TourScreen() {
  const [selectedTour, setSelectedTour] = useState<TourDate>(TOUR_DATA[1]); // Blackstone Coliseum Chicago defaults
  const [attendeeName, setAttendeeName] = useState('');
  const [seatingRole, setSeatingRole] = useState('Wizard of the Front Row');
  const [ticketCount, setTicketCount] = useState(1);

  const [d20Roll, setD20Roll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');

  const [bookedReceipt, setBookedReceipt] = useState<{
    id: string;
    name: string;
    city: string;
    venue: string;
    count: number;
    role: string;
    basePrice: number;
    finalPrice: number;
    discountDetails: string;
    badge: string;
    date: string;
    timestamp: string;
  } | null>(null);

  const rollUpgrade = () => {
    setIsRolling(true);
    setD20Roll(null);
    let ticks = 0;

    const interval = setInterval(() => {
      setD20Roll(Math.floor(Math.random() * 20) + 1);
      ticks++;
      if (ticks > 12) {
        clearInterval(interval);

        const finalRoll = Math.floor(Math.random() * 20) + 1;
        setD20Roll(finalRoll);

        if (finalRoll === 20) {
          setDiscountPercent(50);
          setDiscountMessage(
            '✦ NATURAL 20! High Mage status unlocked. 50% sovereign discount granted.',
          );
        } else if (finalRoll >= 15) {
          setDiscountPercent(20);
          setDiscountMessage(
            '✦ MAJOR HIT! 20% discount applied by command of the Warrior.',
          );
        } else if (finalRoll >= 10) {
          setDiscountPercent(10);
          setDiscountMessage(
            '✦ MINOR PASS! 10% discount offered by the smooth-talking Bard.',
          );
        } else if (finalRoll === 1) {
          setDiscountPercent(-10); // tax penalty!
          setDiscountMessage(
            '☠️ CRITICAL FAIL! Sneak tax applied by the Thief guild. +10% price penalty.',
          );
        } else {
          setDiscountPercent(0);
          setDiscountMessage(
            '✦ STANDARD PATH. No discount. May the dice favor you in the arena.',
          );
        }
        setIsRolling(false);
      }
    }, 90);
  };

  const handleBookTickets = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName.trim()) return;

    const baseCost = selectedTour.ticketPrice * ticketCount;
    const modifier = 1 - discountPercent / 100;
    const finalPrice = Math.round(baseCost * modifier);

    let badge = 'STANDARD SPECTATOR';
    if (d20Roll === 20) badge = 'SOVEREIGN ARCHMAGE';
    else if (d20Roll && d20Roll >= 15) badge = 'PREMIUM VANGUARD';
    else if (d20Roll === 1) badge = 'MARKED SPECTATOR';

    const receipt = {
      id: 'TKT-' + Math.floor(Math.random() * 90000 + 10000),
      name: attendeeName,
      city: selectedTour.city,
      venue: selectedTour.venue,
      count: ticketCount,
      role: seatingRole,
      basePrice: baseCost,
      finalPrice: finalPrice,
      discountDetails:
        discountPercent !== 0
          ? `${discountPercent}% via d20 roll`
          : 'No modifiers applied',
      badge: badge,
      date: selectedTour.dateStr
        .replace('CHICAGO', '')
        .replace('LOS ANGELES', '')
        .replace('LONDON', ''),
      timestamp:
        new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    };

    setBookedReceipt(receipt);
  };

  return (
    <div className="bg-parchment text-black py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Subsection Header */}
        <div className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-[#4c4546] border-b border-neutral-400 pb-2 mb-6 uppercase">
          LEDGER VI / TAVERN DISPATCHES WITH BOX OFFICE
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Full scroll list of Tour Dates */}
          <div className="lg:col-span-6 border-4 border-black bg-white p-6 shadow-brutalist">
            <h2 className="font-display text-3xl text-black border-b-2 border-black pb-1 mb-5 uppercase flex justify-between items-center">
              <span>AL AlMANAC LOGS</span>
              <Calendar className="h-6 w-6 text-black shrink-0" />
            </h2>
            <p className="font-serif text-sm text-[#4c4546] leading-relaxed mb-6">
              The national campaign maps of the Twenty-Sided Tavern. Book
              tickets below for active arenas, or view archive indexes of
              sellout grounds.
            </p>

            {/* Main dates list */}
            <div className="space-y-3 font-mono">
              {TOUR_DATA.map((t) => {
                const isSelected = selectedTour.id === t.id;
                const isSoldOut = t.status === 'SOLD OUT';

                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      if (!isSoldOut) {
                        setSelectedTour(t);
                        setBookedReceipt(null);
                      }
                    }}
                    className={`border-2 p-3.5 transition-all duration-150 relative ${
                      isSoldOut
                        ? 'bg-neutral-50/50 border-neutral-300 opacity-60 cursor-not-allowed select-none'
                        : isSelected
                          ? 'bg-black text-parchment border-black cursor-pointer shadow-brutalist-sm'
                          : 'bg-parchment hover:bg-parchment-deep text-black border-black cursor-pointer'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        {/* Upper city log */}
                        <div className="flex items-center gap-1.5 font-sans font-extrabold text-sm tracking-wide">
                          <span>{t.city}</span>
                          {t.status === 'LIMITED' && (
                            <span className="bg-amber-100 text-amber-800 border border-amber-400 text-[8px] tracking-widest px-1 py-0.5 leading-none font-mono uppercase font-bold">
                              LIMITED SEATS
                            </span>
                          )}
                        </div>
                        {/* Venue details */}
                        <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono mt-0.5">
                          {t.venue}
                        </div>
                      </div>

                      {/* Right Date info */}
                      <div className="text-right shrink-0">
                        {isSoldOut ? (
                          <span className="text-blood-red font-black text-xs uppercase bg-orange-100 border border-blood-red p-1 rotate-[-2deg] inline-block font-sans animate-pulse">
                            SOLD OUT
                          </span>
                        ) : (
                          <div
                            className={`font-mono text-xs font-black ${isSelected ? 'text-blood-red' : 'text-black'}`}
                          >
                            {t.dateStr}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Box Office / Seating reservation */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Box Office Input Form */}
            <div className="border-4 border-black bg-white p-6 shadow-brutalist">
              <h3 className="font-display text-2.5xl text-black border-b-2 border-black pb-1 mb-4 uppercase">
                TAVERN BOX OFFICE
              </h3>

              <div className="mb-4 text-xs font-mono bg-parchment p-3 border-2 border-black">
                <span className="text-blood-red font-black">ARENA:</span>{' '}
                {selectedTour.city} — {selectedTour.venue} |{' '}
                <span className="text-black font-extrabold">
                  ${selectedTour.ticketPrice} / TICKET
                </span>
              </div>

              <form onSubmit={handleBookTickets} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="font-mono text-xs font-extrabold uppercase text-charcoal block">
                    NAME OF RECEIVER:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full real name..."
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    className="w-full border-2 border-black bg-parchment text-sm font-mono font-bold tracking-wider py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blood-red text-black"
                  />
                </div>

                {/* Seating Roles & Count */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-xs font-extrabold uppercase text-charcoal block">
                      SEATING COUNCIL:
                    </label>
                    <select
                      value={seatingRole}
                      onChange={(e) => setSeatingRole(e.target.value)}
                      className="w-full border-2 border-black bg-parchment text-sm font-mono font-bold py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-blood-red"
                    >
                      <option value="Wizard of the Front Row">
                        Front Row Spellcasters
                      </option>
                      <option value="Balcony Archers Elite">
                        Balcony Archers
                      </option>
                      <option value="Stealthy Rogue Stalker">
                        Shadow Stalkers (Aisle)
                      </option>
                      <option value="Mead Tavern Drunkard">
                        Centered Tankard Standees
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-xs font-extrabold uppercase text-charcoal block">
                      TICKET ALLOCATION (QTY):
                    </label>
                    <div className="flex border-2 border-black">
                      <button
                        type="button"
                        onClick={() =>
                          setTicketCount((prev) => Math.max(1, prev - 1))
                        }
                        className="bg-parchment-deep text-black font-mono font-black text-xs px-3 focus:outline-none"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        readOnly
                        value={ticketCount}
                        className="w-full text-center bg-white text-xs font-mono font-black font-sans shrink-0 border-r border-l border-black py-2"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setTicketCount((prev) => Math.min(8, prev + 1))
                        }
                        className="bg-parchment-deep text-black font-mono font-black text-xs px-3 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Roll upgrade system */}
                <div className="border border-black p-3.5 bg-parchment flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="font-mono font-black text-xs uppercase text-black block">
                      ROLL D20 FOR UPGRADE
                    </span>
                    <span className="font-serif italic text-2xs text-[#4c4546] block">
                      Test your initiative to unlock up to 50% discount!
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div
                      className={`border-2 border-black bg-white w-9 h-9 flex items-center justify-center font-mono font-extrabold text-sm ${isRolling ? 'animate-spin' : ''}`}
                    >
                      {d20Roll !== null ? d20Roll : 'D'}
                    </div>
                    <button
                      type="button"
                      onClick={rollUpgrade}
                      disabled={isRolling}
                      className="border border-black bg-black py-1.5 px-3 text-white hover:bg-blood-red uppercase tracking-wider font-mono font-black text-2xs"
                    >
                      ROLL!
                    </button>
                  </div>
                </div>

                {/* Display Roll modifier message */}
                {discountMessage && (
                  <div className="text-2xs font-mono font-extrabold bg-[#e6e2d8] p-2 border border-black uppercase text-black">
                    {discountMessage}
                  </div>
                )}

                {/* Booking triggers */}
                <button
                  type="submit"
                  className="w-full border-2 border-black bg-black text-parchment hover:bg-blood-red hover:border-blood-red font-mono font-black text-xs tracking-widest uppercase py-3 shadow-brutalist transition-transform duration-150 active:translate-x-0.5 active:translate-y-0.5"
                >
                  FORGE TICKET CONFIRMATION
                </button>
              </form>
            </div>

            {/* Booking Receipt Result */}
            {bookedReceipt && (
              <div
                id="ticket-booking-receipt"
                className="border-4 border-black bg-white p-6 shadow-brutalist border-t-blood-red border-t-8 relative select-none"
              >
                {/* Stamp */}
                <div className="absolute bottom-6 right-6 border-4 border-dotted border-orange-600 text-orange-600 font-display text-2xl uppercase tracking-widest px-3 py-1 rotate-[-12deg] opacity-60">
                  CONFIRMED
                </div>

                <div className="border-b border-dashed border-neutral-300 pb-3 mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-2xl text-black">
                      OFFICIAL TICKET
                    </h4>
                    <span className="font-mono text-2xs text-neutral-400 font-bold uppercase block">
                      ID: {bookedReceipt.id} | TIMESTAMP:{' '}
                      {bookedReceipt.timestamp}
                    </span>
                  </div>
                  <TicketPercent className="h-8 w-8 text-blood-red shrink-0" />
                </div>

                {/* Receipt Details Table */}
                <div className="space-y-2 font-mono text-xs text-charcoal">
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span className="font-bold uppercase text-neutral-400 text-2xs">
                      NOMINATIVE HOLDER:
                    </span>
                    <span className="font-bold text-black font-sans uppercase">
                      {bookedReceipt.name}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span className="font-bold uppercase text-neutral-400 text-2xs">
                      ARENA CITY:
                    </span>
                    <span className="font-bold text-black font-sans">
                      {bookedReceipt.city}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span className="font-bold uppercase text-neutral-400 text-2xs">
                      CONCENSUS COUNCIL Seat:
                    </span>
                    <span className="font-bold text-black">
                      {bookedReceipt.role}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span className="font-bold uppercase text-neutral-400 text-2xs">
                      TICKETS ACCREDITED:
                    </span>
                    <span className="font-bold text-black">
                      {bookedReceipt.count} seat(s)
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span className="font-bold uppercase text-neutral-400 text-2xs">
                      DISCOUNT ATTRIBUTE:
                    </span>
                    <span className="font-bold text-blood-red">
                      {bookedReceipt.discountDetails}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1 pt-1 bg-parchment px-2 font-bold font-mono">
                    <span className="text-black uppercase">
                      GOLD WEIGHT DUE (USD):
                    </span>
                    <span className="text-lg text-black font-black font-sans">
                      ${bookedReceipt.finalPrice}.00
                    </span>
                  </div>
                </div>

                {/* Barcode representation */}
                <div className="mt-6 border-t border-dashed border-neutral-300 pt-4 text-center">
                  <div className="bg-neutral-100 py-1.5 px-6 border-2 border-black inline-block">
                    <div className="font-mono text-[9px] tracking-[6px] text-black font-bold select-none h-6 bg-[repeating-linear-gradient(90deg,#000000,#000000_2px,transparent_2px,transparent_6px)]" />
                    <div className="font-mono text-[8px] text-neutral-500 uppercase font-black mt-1">
                      {bookedReceipt.id} // SECURE_PASSPORT_TOKEN_24B
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      alert(
                        'Parchment dispatch queued! Printing is simulated for security.',
                      );
                    }}
                    className="border-2 border-black bg-white hover:bg-parchment-deep text-black font-mono text-xs font-bold py-1.5 px-3 uppercase tracking-wider flex items-center gap-1 shrink-0"
                  >
                    <Printer className="h-4 w-4" /> PRINT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
