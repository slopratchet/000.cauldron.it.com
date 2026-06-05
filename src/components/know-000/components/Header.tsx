/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, User, ShieldAlert } from 'lucide-react';
import { ScreenType } from '../types';

interface HeaderProps {
  activeScreen: ScreenType;
  setActiveScreen: (screen: ScreenType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onJoinParty: () => void;
}

export default function Header({
  activeScreen,
  setActiveScreen,
  searchQuery,
  setSearchQuery,
  onJoinParty,
}: HeaderProps) {
  const [isSearching, setIsSearching] = useState(false);

  const navItems: { label: string; screen: ScreenType }[] = [
    { label: 'HOME', screen: 'HOME' },
    { label: 'FAQ', screen: 'FAQ' },
    { label: 'CAST', screen: 'CAST' },
    { label: 'TOUR', screen: 'TOUR' },
  ];

  return (
    <header className="border-b-4 border-black bg-parchment sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4 font-mono">
        {/* Logo and Brand */}
        <div
          onClick={() => setActiveScreen('HOME')}
          className="flex items-center gap-2 cursor-pointer group"
          id="header-brand-logo"
        >
          <div className="p-1 border-2 border-black bg-black text-parchment group-hover:bg-blood-red group-hover:border-blood-red transition-colors duration-150">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="font-display text-2xl tracking-tighter leading-none select-none text-black">
            THE TOME: <span className="text-blood-red">1970</span> EDITION
          </span>
        </div>

        {/* Right side search & action items */}
        <div className="flex items-center gap-3 flex-grow md:flex-grow-0 justify-end">
          {/* Query Index Search Bar */}
          <div className="relative flex items-center border-2 border-black bg-white focus-within:ring-2 focus-within:ring-blood-red">
            <span className="pl-3 pr-1 text-black font-bold">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              id="search-input-field"
              placeholder="QUERY INDEX..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              className="bg-transparent text-xs font-mono font-bold tracking-wider placeholder:text-neutral-400 py-1.5 px-2 focus:outline-none w-36 md:w-48 text-black"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearching(false);
                }}
                className="pr-2 text-xs font-mono text-blood-red hover:underline font-bold"
              >
                [X]
              </button>
            )}
          </div>

          {/* Volume Indicator Box */}
          <div className="hidden sm:block border-2 border-black py-1 px-2 text-xs font-mono font-extrabold bg-parchment-deep text-black select-none shadow-brutalist-sm">
            VOL. IV
          </div>

          {/* Action Button */}
          <button
            id="join-party-btn"
            onClick={onJoinParty}
            className="border-2 border-black bg-black hover:bg-blood-red hover:border-blood-red text-parchment text-xs font-bold py-1.5 px-4 tracking-widest uppercase transition-all duration-150 shrink-0 shadow-brutalist-sm hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px]"
          >
            JOIN THE PARTY
          </button>
        </div>
      </div>
    </header>
  );
}
