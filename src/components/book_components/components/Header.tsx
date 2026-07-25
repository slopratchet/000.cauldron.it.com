import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowLeft, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LibraryItem } from '../types';

interface HeaderProps {
  selectedItem: LibraryItem | null;
  onClearSelection: () => void;
  search: string;
  setSearch: (s: string) => void;
  category: 'all' | 'rulebook' | 'adventure';
  setCategory: (c: 'all' | 'rulebook' | 'adventure') => void;
  items: LibraryItem[];
  onOpenDb?: () => void;
}

export default function Header({
  selectedItem,
  onClearSelection,
  search,
  setSearch,
  category,
  setCategory,
  items,
  onOpenDb,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (cat: 'all' | 'rulebook' | 'adventure') => {
    setCategory(cat);
    setDropdownOpen(false);
    onClearSelection(); // Clear selected book to show filtered category workspace
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
      const scrollables = document.querySelectorAll(
        '.overflow-y-auto, aside, #sidebar, #main-content-stage',
      );
      scrollables.forEach((el) => el.scrollTo({ top: 0, behavior: 'smooth' }));
    }, 50);
  };

  const handleReset = () => {
    setSearch('');
    setCategory('all');
    onClearSelection();
  };

  return (
    <header
      className="w-full flex flex-col bg-surface border-b-2 border-black select-none z-40"
      id="global-header"
    >
      {/* ROW 1: Play by Campaign, Breadcrumbs, Search Icon */}
      <div className="h-[64px] flex items-center justify-between px-4 md:px-6 relative bg-surface">
        <div className="flex items-center gap-4 md:gap-6 overflow-hidden mr-4">
          {selectedItem && (
            <button
              onClick={onClearSelection}
              onContextMenu={(e) => {
                e.preventDefault();
                onClearSelection();
              }}
              className="flex items-center gap-2 px-3 py-1.5 border border-black font-mono text-[10px] uppercase font-bold bg-surface hover:bg-surface-high transition-colors cursor-pointer shrink-0"
              id="header-back-btn"
            >
              <ArrowLeft size={11} strokeWidth={2.5} />
              BACK TO DIRECTORY
            </button>
          )}

          {/* Left: PLAY BY CAMPAIGN Dropdown Button */}
          <div
            className="relative shrink-0"
            ref={dropdownRef}
            id="category-dropdown-container"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="flex items-center gap-1.5 md:gap-2 font-display text-sm md:text-base font-extrabold tracking-tight uppercase hover:opacity-80 transition-all cursor-pointer py-2 px-1 focus:outline-none"
              id="category-dropdown-btn"
            >
              <span>
                {category === 'all' && 'Play by Campaign'}
                {category === 'rulebook' && 'Rule Books'}
                {category === 'adventure' && 'Adventures'}
              </span>
              <ChevronDown
                size={14}
                className={`transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                strokeWidth={3}
              />
            </button>

            {/* Animated Tactical Dropdown */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute left-0 mt-2 w-[220px] bg-surface border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50"
                  id="category-dropdown-menu"
                >
                  <div className="p-2 border-b border-black bg-surface-low">
                    <span className="font-mono text-[9px] font-black tracking-widest text-gray-500 uppercase">
                      ARCHIVE FILTER INDEX
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleCategorySelect('all')}
                      className={`w-full text-left px-4 py-2.5 font-display text-xs uppercase font-extrabold tracking-wide transition-colors cursor-pointer ${category === 'all' ? 'bg-black text-white' : 'hover:bg-surface-high text-black'}`}
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => handleCategorySelect('rulebook')}
                      className={`w-full text-left px-4 py-2.5 font-display text-xs uppercase font-extrabold tracking-wide transition-colors cursor-pointer ${category === 'rulebook' ? 'bg-black text-white' : 'hover:bg-surface-high text-black'}`}
                    >
                      Rule Books
                    </button>
                    <button
                      onClick={() => handleCategorySelect('adventure')}
                      className={`w-full text-left px-4 py-2.5 font-display text-xs uppercase font-extrabold tracking-wide transition-colors cursor-pointer ${category === 'adventure' ? 'bg-black text-white' : 'hover:bg-surface-high text-black'}`}
                    >
                      Adventures
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tactical vertical separator line */}
          <div className="h-4 w-[2px] bg-black/30 shrink-0" />

          {/* Breadcrumb Links */}
          <div
            className="flex items-center gap-1.5 md:gap-2 font-display text-[10px] md:text-xs font-black uppercase tracking-wider text-black overflow-hidden"
            id="breadcrumb-navigation"
          >
            <button
              onClick={handleReset}
              className="hover:opacity-75 cursor-pointer focus:outline-none shrink-0"
              id="breadcrumb-home-btn"
            >
              HOME
            </button>

            <span className="text-gray-300 font-normal shrink-0">/</span>

            <button
              onClick={() => handleCategorySelect('all')}
              className={`hover:opacity-75 cursor-pointer focus:outline-none shrink-0 ${!selectedItem ? 'border-b-2 border-black pb-0.5' : ''}`}
              id="breadcrumb-products-btn"
            >
              ALL PRODUCTS
            </button>

            {selectedItem && (
              <>
                <span className="text-gray-300 font-normal shrink-0">/</span>
                <span
                  className="border-b-2 border-black pb-0.5 truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px]"
                  id="breadcrumb-active-item"
                >
                  {selectedItem.title}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right side: Database Schema Console Trigger Button */}
        {onOpenDb && (
          <button
            onClick={onOpenDb}
            title="Open Archive Database Schema Interface (?db=true)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-black font-mono text-[10px] font-black uppercase tracking-wider bg-surface hover:bg-black hover:text-white transition-colors shrink-0 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <Database size={11} strokeWidth={2.5} />
            <span className="hidden sm:inline">DB SCHEMA</span>
          </button>
        )}
      </div>
    </header>
  );
}
