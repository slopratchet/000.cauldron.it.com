import React from 'react';
import { Menu, Search, MapPin, Heart, Sparkles } from 'lucide-react';

interface TopNavBarProps {
  activeCategory: 'All' | 'Classic' | 'Professional' | 'Watches by Theme';
  onCategoryChange: (
    category: 'All' | 'Classic' | 'Professional' | 'Watches by Theme',
  ) => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenConfigure: () => void;
  favoriteCount: number;
}

export default function TopNavBar({
  activeCategory,
  onCategoryChange,
  onOpenSearch,
  onOpenWishlist,
  onOpenConfigure,
  favoriteCount,
}: TopNavBarProps) {
  return (
    <nav className="bg-black text-white flex flex-col items-center w-full pt-8 pb-6 px-6 max-w-full z-40 sticky top-0 font-label border-b border-neutral-900 select-none">
      {/* 1. Brand Logo Block */}
      <div className="flex items-center space-x-3 mb-6">
        <Menu
          className="text-white cursor-pointer hover:opacity-80 transition-opacity"
          size={24}
        />
        <div className="font-sans text-2xl md:text-3xl font-black text-white tracking-tighter uppercase select-none">
          THE CHRONO-RAID PROTOCOL
        </div>
      </div>

      {/* 2. Horizontal Navigation Tabs */}
      <div className="flex space-x-6 md:space-x-12 items-center justify-center overflow-x-auto w-full max-w-xl pb-1 mb-6 border-b border-neutral-900 hide-scrollbar">
        <button
          onClick={() => onCategoryChange('All')}
          className={`text-xs uppercase tracking-widest font-bold pb-2 transition-all cursor-pointer ${
            activeCategory === 'All'
              ? 'text-white border-b-2 border-white'
              : 'text-neutral-500 hover:text-white'
          }`}
        >
          ALL LOOT
        </button>

        <button
          onClick={() => onCategoryChange('Classic')}
          className={`text-xs uppercase tracking-widest font-bold pb-2 transition-all cursor-pointer ${
            activeCategory === 'Classic'
              ? 'text-white border-b-2 border-white'
              : 'text-neutral-500 hover:text-white'
          }`}
        >
          CLASSIC DUNGEON RELICS
        </button>

        <button
          onClick={() => onCategoryChange('Professional')}
          className={`text-xs uppercase tracking-widest font-bold pb-2 transition-all cursor-pointer ${
            activeCategory === 'Professional'
              ? 'text-white border-b-2 border-white'
              : 'text-neutral-500 hover:text-white'
          }`}
        >
          MYTHIC RAID CHRONO-GEAR
        </button>

        <button
          onClick={() => onCategoryChange('Watches by Theme')}
          className={`text-xs uppercase tracking-widest font-bold pb-2 transition-all cursor-pointer ${
            activeCategory === 'Watches by Theme'
              ? 'text-white border-b-2 border-white'
              : 'text-neutral-500 hover:text-white'
          }`}
        >
          LEGENDARY COVENANT CORES
        </button>
      </div>

      {/* 3. Action Control Row */}
      <div className="flex items-center space-x-6 justify-center w-full max-w-xl">
        <div className="flex space-x-5 text-white items-center">
          <button
            onClick={onOpenSearch}
            className="hover:opacity-70 transition-opacity p-1 cursor-pointer flex items-center justify-center"
            title="Search database"
          >
            <Search size={20} />
          </button>

          <button
            className="hover:opacity-70 transition-opacity p-1 cursor-pointer flex items-center justify-center"
            title="Show showrooms"
            onClick={() =>
              alert(
                'Showroom Map Matrix: Coordinates mapped to Basel, Switzerland. Showroom active.',
              )
            }
          >
            <MapPin size={20} />
          </button>

          <button
            onClick={onOpenWishlist}
            className="hover:opacity-70 transition-opacity p-1 cursor-pointer relative flex items-center justify-center"
            title="Open saved specifications"
          >
            <Heart size={20} />
            {favoriteCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black font-mono text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={onOpenConfigure}
          className="font-mono uppercase text-xs tracking-widest text-white hover:bg-white hover:text-black transition-colors px-6 py-2 border-2 border-white font-bold shrink-0 cursor-pointer flex items-center space-x-2"
        >
          <Sparkles
            size={12}
            className="text-white group-hover:text-black transition-colors"
          />
          <span>CONFIGURE</span>
        </button>
      </div>
    </nav>
  );
}
