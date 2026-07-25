import React, { useState, useMemo } from 'react';
import {
  Search,
  Grid,
  List,
  ArrowRight,
  SlidersHorizontal,
  BookOpen,
} from 'lucide-react';
import { motion } from 'motion/react';
import { LibraryItem } from '../types';

interface SidebarProps {
  items: LibraryItem[];
  activeItem: LibraryItem | null;
  onSelectItem: (
    item: LibraryItem,
    action?: 'configure' | 'read' | 'jump',
  ) => void;
  search: string;
  setSearch: (s: string) => void;
  category: 'all' | 'rulebook' | 'adventure';
  setCategory: (c: 'all' | 'rulebook' | 'adventure') => void;
  drawerOpen: boolean;
  showFilters: boolean;
  setShowFilters: (b: boolean) => void;
  enableAdventuresSection?: boolean;
  enableRulebooksSection?: boolean;
  enableCategoryFilterBar?: boolean;
  enableNewBadges?: boolean;
}

export default function Sidebar({
  items,
  activeItem,
  onSelectItem,
  search,
  setSearch,
  category,
  setCategory,
  drawerOpen,
  showFilters,
  setShowFilters,
  enableAdventuresSection = true,
  enableRulebooksSection = true,
  enableCategoryFilterBar = false,
  enableNewBadges = true,
}: SidebarProps) {
  const [viewType, setViewType] = useState<'grid' | 'list'>('list');

  React.useEffect(() => {
    if (!enableRulebooksSection && category === 'rulebook') {
      setCategory('all');
    }
    if (!enableAdventuresSection && category === 'adventure') {
      setCategory('all');
    }
  }, [enableRulebooksSection, enableAdventuresSection, category, setCategory]);

  const handleCategoryChange = (cat: 'all' | 'rulebook' | 'adventure') => {
    setCategory(cat);
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

  // Group filter
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || item.type === category;
      return matchSearch && matchCategory;
    });
  }, [items, search, category]);

  const rulebooks = useMemo(() => {
    if (!enableRulebooksSection) return [];
    return filteredItems.filter((i) => i.type === 'rulebook').slice(0, 2);
  }, [filteredItems, enableRulebooksSection]);

  const adventures = useMemo(() => {
    if (!enableAdventuresSection) return [];
    return filteredItems.filter((i) => i.type === 'adventure').slice(0, 4);
  }, [filteredItems, enableAdventuresSection]);

  const visibleCount = useMemo(() => {
    return rulebooks.length + adventures.length;
  }, [rulebooks, adventures]);

  return (
    <aside
      className="w-full flex flex-col bg-surface border-b-2 border-black"
      id="sidebar"
    >
      {/* 2. Filter & Control Panel */}
      <div
        className="px-4 py-3 border-b-2 border-black bg-surface-low flex flex-col gap-2"
        id="sidebar-controls"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-black font-extrabold tracking-wider uppercase">
            {visibleCount} ITEMS IDENTIFIED
          </span>

          <div className="flex items-center gap-3">
            <div className="flex border border-black">
              <button
                onClick={() => setViewType('grid')}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setViewType('grid');
                }}
                className={`p-1 border-r border-black cursor-pointer hover:bg-surface-high ${viewType === 'grid' ? 'bg-black text-surface' : 'bg-surface'}`}
                title="Grid Layout"
              >
                <Grid size={13} />
              </button>
              <button
                onClick={() => setViewType('list')}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setViewType('list');
                }}
                className={`p-1 cursor-pointer hover:bg-surface-high ${viewType === 'list' ? 'bg-black text-surface' : 'bg-surface'}`}
                title="List Layout"
              >
                <List size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Field & Filtering Buttons */}
        {(showFilters || search.length > 0) && (
          <div className="mt-1 flex flex-col gap-2 p-2 border border-black/20 bg-surface animate-fade-in">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-gray-500">
                <Search size={12} />
              </span>
              <input
                type="text"
                placeholder="Query database..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1 border border-black font-mono text-xs bg-surface focus:outline-none focus:bg-surface-low"
              />
            </div>

            {enableCategoryFilterBar && (
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`flex-1 py-1 border font-mono text-[10px] uppercase cursor-pointer transition-colors ${category === 'all' ? 'bg-black text-white border-black font-bold' : 'border-black/30 hover:bg-surface-low'}`}
                >
                  All
                </button>
                {enableRulebooksSection && (
                  <button
                    onClick={() => handleCategoryChange('rulebook')}
                    className={`flex-1 py-1 border font-mono text-[10px] uppercase cursor-pointer transition-colors ${category === 'rulebook' ? 'bg-black text-white border-black font-bold' : 'border-black/30 hover:bg-surface-low'}`}
                  >
                    Rule Books
                  </button>
                )}
                {enableAdventuresSection && (
                  <button
                    onClick={() => handleCategoryChange('adventure')}
                    className={`flex-1 py-1 border font-mono text-[10px] uppercase cursor-pointer transition-colors ${category === 'adventure' ? 'bg-black text-white border-black font-bold' : 'border-black/30 hover:bg-surface-low'}`}
                  >
                    Adventures
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. ADVENTURES SECTION */}
      {adventures.length > 0 && (
        <div className="border-b-2 border-black" id="section-adventures">
          <div className="bg-[#ebe8e1] py-2 px-4 border-b border-black text-center">
            <h2 className="text-black font-display text-base font-black tracking-widest uppercase">
              ADVENTURES
            </h2>
          </div>

          <div
            className={`p-4 gap-4 ${viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
          >
            {adventures.map((item) => (
              <SidebarCard
                key={item.id}
                item={item}
                isActive={activeItem?.id === item.id}
                onSelect={(act) => onSelectItem(item, act)}
                viewType={viewType}
                enableNewBadges={enableNewBadges}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. RULE BOOKS SECTION */}
      {rulebooks.length > 0 && (
        <div className="border-b-2 border-black" id="section-rulebooks">
          <div className="bg-black py-2 px-4 text-center">
            <h2 className="text-surface font-display text-base font-black tracking-widest uppercase">
              RULE BOOKS
            </h2>
          </div>

          <div
            className={`p-4 gap-4 ${viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
          >
            {rulebooks.map((item) => (
              <SidebarCard
                key={item.id}
                item={item}
                isActive={activeItem?.id === item.id}
                onSelect={(act) => onSelectItem(item, act)}
                viewType={viewType}
                enableNewBadges={enableNewBadges}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(filteredItems.length === 0 || visibleCount === 0) && (
        <div className="p-8 text-center" id="empty-results">
          {!enableAdventuresSection && !enableRulebooksSection ? (
            <p className="font-mono text-xs text-red-600 font-bold uppercase tracking-wider">
              ALL SECTIONS ([ADVENTURES] & [RULEBOOKS]) ARE DISABLED IN DATABASE
              CONFIGURATION
            </p>
          ) : (
            <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">
              NO MATCHES LOCATED IN CACHE
            </p>
          )}
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
            }}
            className="mt-4 px-4 py-2 border border-black font-mono text-xs font-bold uppercase hover:bg-surface-high cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            RESET ARCHIVE DIRECTORY
          </button>
        </div>
      )}
    </aside>
  );
}

interface CardProps {
  key?: string;
  item: LibraryItem;
  isActive: boolean;
  onSelect: (action?: 'configure' | 'read' | 'jump') => void;
  viewType: 'grid' | 'list';
  enableNewBadges?: boolean;
}

function SidebarCard({
  item,
  isActive,
  onSelect,
  viewType,
  enableNewBadges = true,
}: CardProps) {
  if (viewType === 'list') {
    return (
      <div
        onClick={() => onSelect('jump')}
        onContextMenu={(e) => {
          e.preventDefault();
          onSelect('jump');
        }}
        className={`structural-border overflow-hidden bg-surface flex transition-all duration-150 cursor-pointer ${isActive ? 'bg-surface-high border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-surface-low'}`}
      >
        {/* Cover Art Wrapper */}
        <div className="relative w-20 h-24 border-r border-black bg-[#ebe8e1] shrink-0">
          <img
            src={item.coverUrl}
            alt={item.title}
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          {item.isNew && enableNewBadges && (
            <div className="absolute top-0 left-0 bg-orange-600 text-white border-r border-b border-black text-[8px] font-mono font-black px-1.5 py-0.5 leading-none z-10">
              NEW
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-2.5 flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-start justify-between gap-1">
              <h3 className="font-display text-xs font-extrabold uppercase tracking-tight leading-tight truncate flex-1">
                {item.title}
              </h3>
            </div>
            <p className="font-mono text-[9px] text-gray-500 uppercase mt-0.5 truncate">
              {item.type} • {item.refCode}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect('configure');
              }}
              className="px-2 py-0.5 border border-black bg-surface hover:bg-black hover:text-white transition-colors inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase cursor-pointer"
              title="Configure Spec (Opens Right Frame)"
            >
              CONFIGURE SPEC <ArrowRight size={9} strokeWidth={2.5} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect('read');
              }}
              className={`px-2 py-0.5 border border-black transition-colors inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase cursor-pointer ${isActive ? 'bg-orange-600 text-white border-black font-extrabold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'bg-black text-white hover:bg-surface hover:text-black'}`}
              title="Pages & External Reader Awareness (Opens Left Frame)"
            >
              PAGES: LEAVE SITE TO READ{' '}
              <ArrowRight size={9} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      onClick={() => onSelect('jump')}
      onContextMenu={(e) => {
        e.preventDefault();
        onSelect('jump');
      }}
      className={`relative structural-border bg-[#ebe8e1] flex flex-col justify-between text-black transition-all cursor-pointer ${isActive ? 'bg-surface-high border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-surface-low hover:-translate-y-0.5'}`}
      style={{ minHeight: '250px' }}
    >
      {/* 1. Styled Cover Block */}
      <div className="p-3 pb-0 flex-1 flex flex-col">
        <div className="relative border border-black bg-surface aspect-3/4 flex-1 overflow-hidden">
          {item.isNew && enableNewBadges && (
            <div className="absolute top-0 left-0 bg-orange-600 text-white border-r border-b border-black text-[9px] font-mono font-black px-1.5 py-0.5 z-10">
              NEW
            </div>
          )}

          <img
            src={item.coverUrl}
            alt={item.title}
            className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 2. Text and Button bar */}
      <div className="p-3 pt-2 flex flex-col justify-between bg-surface-low border-t border-black/30 min-h-[80px]">
        <div>
          <h3
            className="font-display text-xs font-black tracking-tight leading-tight text-gray-900 uppercase line-clamp-2"
            title={item.title}
          >
            {item.title}
          </h3>
          <p className="font-mono text-[9px] text-gray-500 uppercase mt-0.5 truncate">
            {item.type} • {item.refCode}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect('configure');
            }}
            className="px-2 py-1 border border-black bg-surface hover:bg-black hover:text-white transition-colors inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase cursor-pointer"
            title="Configure Spec (Opens Right Frame)"
          >
            CONFIGURE SPEC <ArrowRight size={9} strokeWidth={2.5} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect('read');
            }}
            className={`px-2 py-1 border border-black transition-colors inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase cursor-pointer ${isActive ? 'bg-orange-600 text-white border-black font-extrabold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'bg-black text-white hover:bg-surface hover:text-black'}`}
            title="Pages & External Reader Awareness (Opens Left Frame)"
          >
            PAGES: LEAVE SITE TO READ <ArrowRight size={9} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
