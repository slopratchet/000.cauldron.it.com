import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LIBRARY_ITEMS } from './data';
import { LibraryItem } from './types';
import Sidebar from './components/Sidebar';
import ActiveStage from './components/ActiveStage';
import DatabaseSchemaInterface from './components/DatabaseSchemaInterface';
import Header from './components/Header';

export default function App() {
  const [items, setItems] = useState<LibraryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('archive_protocol_full_db');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (
            parsed.watchCollectionInventory &&
            Array.isArray(parsed.watchCollectionInventory)
          ) {
            return parsed.watchCollectionInventory;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return LIBRARY_ITEMS;
  });

  const [sectionToggles, setSectionToggles] = useState<{
    enableAdventuresSection: boolean;
    enableRulebooksSection: boolean;
    enableJumpToSection: boolean;
    enableCategoryFilterBar: boolean;
    enableNewBadges: boolean;
  }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('archive_protocol_full_db');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.sectionToggles) {
            return {
              enableAdventuresSection:
                parsed.sectionToggles.enableAdventuresSection ?? true,
              enableRulebooksSection:
                parsed.sectionToggles.enableRulebooksSection ?? true,
              enableJumpToSection:
                parsed.sectionToggles.enableJumpToSection ?? true,
              enableCategoryFilterBar:
                parsed.sectionToggles.enableCategoryFilterBar ?? false,
              enableNewBadges: parsed.sectionToggles.enableNewBadges ?? true,
            };
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return {
      enableAdventuresSection: true,
      enableRulebooksSection: true,
      enableJumpToSection: true,
      enableCategoryFilterBar: false,
      enableNewBadges: true,
    };
  });

  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    'ravenloft-horrors',
  );
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'rulebook' | 'adventure'>(
    'all',
  );
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Check URL search parameter for ?db=true
  const [isDbMode, setIsDbMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('db') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setIsDbMode(params.get('db') === 'true');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenDb = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('db', 'true');
    window.history.pushState({}, '', url.toString());
    setIsDbMode(true);
  }, []);

  const handleExitDb = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('db');
    const newSearch = url.searchParams.toString();
    const newPath = url.pathname + (newSearch ? '?' + newSearch : '');
    window.history.pushState({}, '', newPath);
    setIsDbMode(false);
  }, []);

  // Find selected item details
  const selectedItem =
    items.find((i) => i.id === selectedItemId) || items[0] || null;

  const handleSelectItem = useCallback(
    (item: LibraryItem, action: 'configure' | 'read' | 'jump' = 'jump') => {
      setSelectedItemId(item.id);
      if (action === 'configure') {
        setRightDrawerOpen(true);
        setLeftDrawerOpen(false);
      } else if (action === 'read') {
        setLeftDrawerOpen(true);
        setRightDrawerOpen(false);
      } else if (action === 'jump') {
        setRightDrawerOpen(false);
        setLeftDrawerOpen(false);
        setTimeout(() => {
          const el = document.getElementById('section-jump');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    },
    [],
  );

  const handleClearSelection = useCallback(() => {
    setSelectedItemId(null);
    setRightDrawerOpen(false);
    setLeftDrawerOpen(false);
  }, []);

  if (isDbMode) {
    return (
      <DatabaseSchemaInterface
        onExitDbMode={handleExitDb}
        onUpdateItems={(newItems) => setItems(newItems)}
        onUpdateSectionToggles={(toggles) => setSectionToggles(toggles)}
      />
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-surface text-black font-sans">
      {/* 0. Top Menu Bar */}
      <div className="w-full shrink-0">
        <Header
          items={items}
          selectedItem={selectedItem}
          onOpenDb={handleOpenDb}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto min-h-0 w-full">
        {/* 1. Directory Catalogue Section directly under top menu bar */}
        <Sidebar
          items={items}
          activeItem={selectedItem}
          onSelectItem={handleSelectItem}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          drawerOpen={rightDrawerOpen || leftDrawerOpen}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          enableAdventuresSection={sectionToggles.enableAdventuresSection}
          enableRulebooksSection={sectionToggles.enableRulebooksSection}
          enableCategoryFilterBar={sectionToggles.enableCategoryFilterBar}
          enableNewBadges={sectionToggles.enableNewBadges}
        />

        {/* 2. Drawered Navigation / Active Stage placed under it */}
        <div
          className="w-full flex flex-col min-w-0 border-t-2 border-black"
          id="main-content-stage"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItemId || 'empty'}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <ActiveStage
                selectedItem={selectedItem}
                onClearSelection={handleClearSelection}
                rightDrawerOpen={rightDrawerOpen}
                setRightDrawerOpen={setRightDrawerOpen}
                leftDrawerOpen={leftDrawerOpen}
                setLeftDrawerOpen={setLeftDrawerOpen}
                enableJumpToSection={sectionToggles.enableJumpToSection}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
