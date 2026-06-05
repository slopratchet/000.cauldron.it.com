import React, { useState } from 'react';
import IndexScreen from './components/IndexScreen';
import PageReader from './components/PageReader';
import CreateAccount from './components/CreateAccount';
import DiceSimulator from './components/DiceSimulator';
import { manualSections } from './data/manualData';
import { ActiveScreen, ManualItem } from './types';
import { LayoutGrid } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('index');
  const [activeItem, setActiveItem] = useState<ManualItem | null>(null);

  // Flattened ordered array of all manual items for simple page flipping
  const allManualItems = manualSections.flatMap((section) => section.items);

  const handleSelectItem = (item: ManualItem) => {
    setActiveItem(item);
    setActiveScreen('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNextPage = () => {
    if (!activeItem) return;
    const currentIndex = allManualItems.findIndex(
      (item) => item.id === activeItem.id,
    );
    if (currentIndex !== -1 && currentIndex < allManualItems.length - 1) {
      setActiveItem(allManualItems[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handlePrevPage = () => {
    if (!activeItem) return;
    const currentIndex = allManualItems.findIndex(
      (item) => item.id === activeItem.id,
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      setActiveItem(allManualItems[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const hasNext = activeItem
    ? allManualItems.findIndex((item) => item.id === activeItem.id) <
      allManualItems.length - 1
    : false;

  const hasPrev = activeItem
    ? allManualItems.findIndex((item) => item.id === activeItem.id) > 0
    : false;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1b1b1b] flex flex-col justify-between selection:bg-blood-red selection:text-white">
      {/* Decorative top ribbon strip */}
      <div className="h-2 bg-[#1b1b1b]" />

      <main className="flex-grow w-full max-w-7xl mx-auto py-6">
        {/* Render Active View State Container */}
        {activeScreen === 'index' && (
          <IndexScreen
            onSelectItem={handleSelectItem}
            onOpenDiceRoller={() => setActiveScreen('dice')}
            onJoinPartyClick={() => setActiveScreen('character')}
          />
        )}

        {activeScreen === 'character' && (
          <CreateAccount onBack={() => setActiveScreen('index')} />
        )}

        {activeScreen === 'dice' && (
          <DiceSimulator onBack={() => setActiveScreen('index')} />
        )}
        {activeScreen === 'reader' && activeItem && (
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            {/* Quick Action Navigation bar above reader */}
            <div className="mb-4 flex flex-wrap gap-2.5 font-mono text-xs font-bold uppercase">
              <button
                id="header-nav-index"
                onClick={() => setActiveScreen('index')}
                className="flex cursor-pointer items-center gap-1.5 border border-neutral-300 bg-white py-1.5 px-3 hover:bg-neutral-100"
              >
                <LayoutGrid className="h-3.5 w-3.5 text-neutral-400" /> [1]
                INDEX INDEX
              </button>
            </div>

            <PageReader
              item={activeItem}
              onBackToIndex={() => setActiveScreen('index')}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          </div>
        )}
      </main>
    </div>
  );
}
