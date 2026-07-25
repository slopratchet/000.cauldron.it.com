import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Sword,
  Wand2,
  Skull,
  Sparkles,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Book,
  Feather,
  Dices,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
  Database,
  Edit3,
  PlusCircle,
  Clock,
  FlaskConical,
  Bone,
  Play,
} from 'lucide-react';
import {
  TomeEntry,
  EntryType,
  MainContentVisibility,
  Adventure,
  Encounter,
} from './configTypes';
import { initialEntries } from './initialData';
import EntryCard from './EntryCard';
import EntryDetail from './EntryDetail';
import ScribeForm from './ScribeForm';
import DiceRoller from './DiceRoller';
import DatabaseSchemaView from './DatabaseSchemaView';
import NestedHierarchyCard from './NestedHierarchyCard';

export default function App() {
  // State managers
  const [customEntries, setCustomEntries] = useState<TomeEntry[]>(() => {
    const saved = localStorage.getItem('the_tome_custom_entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [apiEntries, setApiEntries] = useState<TomeEntry[]>([]);
  const [isApiConnected, setIsApiConnected] = useState<boolean>(false);

  const [entryLabelOverrides, setEntryLabelOverrides] = useState<
    Record<string, Partial<TomeEntry>>
  >(() => {
    const saved = localStorage.getItem('the_tome_entry_label_overrides');
    return saved ? JSON.parse(saved) : {};
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<EntryType | 'all'>(
    'all',
  );
  const [shakingBtn, setShakingBtn] = useState<string | null>(null);

  const triggerBtnShake = (btnKey: string) => {
    setShakingBtn(btnKey);
    setTimeout(() => setShakingBtn(null), 350);
  };
  const [selectedEntry, setSelectedEntry] = useState<TomeEntry | null>(null);
  const [rollTrigger, setRollTrigger] = useState<{
    formula: string;
    name: string;
    timestamp: number;
  } | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [inkLevel, setInkLevel] = useState<number>(78);

  const [editingWorld, setEditingWorld] = useState<TomeEntry | null>(null);
  const [activeLogEntry, setActiveLogEntry] = useState<TomeEntry | null>(null);
  const [editWorldName, setEditWorldName] = useState<string>('');
  const [editWorldDesc, setEditWorldDesc] = useState<string>('');

  // Fetch entries from REST API endpoint /api/database on mount
  useEffect(() => {
    async function fetchDatabaseFromApi() {
      try {
        const response = await fetch('/api/database');
        if (!response.ok) {
          throw new Error(`REST API HTTP error: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.allEntries && Array.isArray(data.allEntries)) {
          setApiEntries(data.allEntries);
          setIsApiConnected(true);
        }
      } catch (error) {
        console.warn(
          'Failed to connect to REST API database, using initialEntries fallback:',
          error,
        );
        setApiEntries(initialEntries);
        setIsApiConnected(false);
      }
    }
    fetchDatabaseFromApi();
  }, []);

  const handleEditWorld = (entry: TomeEntry) => {
    setEditingWorld(entry);
    setEditWorldName(entry.name);
    setEditWorldDesc(entry.description);
    playParchmentSound();
  };

  const handleSaveWorld = () => {
    if (!editingWorld) return;
    const updatedData = { name: editWorldName, description: editWorldDesc };
    setEntryLabelOverrides((prev) => ({
      ...prev,
      [editingWorld.id]: {
        ...prev[editingWorld.id],
        ...updatedData,
      },
    }));

    // Sync update to REST API endpoint
    fetch(`/api/entries/${editingWorld.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((r) => r.json())
      .then((resData) => {
        if (resData && resData.entry) {
          setApiEntries((prev) =>
            prev.map((e) => (e.id === resData.entry.id ? resData.entry : e)),
          );
        }
      })
      .catch((err) => console.error('REST API update error:', err));

    setNotification(
      `World parameters updated via REST API: "${editWorldName}"`,
    );
    setTimeout(() => setNotification(null), 3500);
    setEditingWorld(null);
    playParchmentSound();
  };

  const handleAddAdventure = (campaignId: string, adventureName: string) => {
    const newAdv: Adventure = {
      id: `adv-${Date.now()}`,
      name: adventureName,
      statusBadge: 'active',
      clearedEncounters: 0,
      totalEncounters: 2,
      encounters: [
        {
          id: `enc-${Date.now()}-1`,
          name: 'Initial Vanguard',
          status: 'in progress',
        },
        {
          id: `enc-${Date.now()}-2`,
          name: 'Chamber Threshold',
          status: 'pending',
        },
      ],
    };

    setApiEntries((prev) =>
      prev.map((e) => {
        if (e.id !== campaignId) return e;
        const adventures = e.adventures || [];
        const updated = { ...e, adventures: [...adventures, newAdv] };

        // Sync with REST API backend
        fetch(`/api/entries/${campaignId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        }).catch((err) =>
          console.error('REST API adventure update error:', err),
        );

        return updated;
      }),
    );

    setNotification(`New adventure "${adventureName}" attached to campaign.`);
    setTimeout(() => setNotification(null), 3500);
    playParchmentSound();
  };

  const handleToggleEncounter = (
    campaignId: string,
    adventureId: string,
    encounterId: string,
  ) => {
    setApiEntries((prev) =>
      prev.map((e) => {
        if (e.id !== campaignId || !e.adventures) return e;
        const updatedAdventures = e.adventures.map((adv) => {
          if (adv.id !== adventureId) return adv;
          const updatedEncounters = adv.encounters.map((enc) => {
            if (enc.id !== encounterId) return enc;
            const newStatus =
              enc.status === 'cleared' ? 'in progress' : 'cleared';
            return { ...enc, status: newStatus };
          });
          const clearedCount = updatedEncounters.filter(
            (enc) => enc.status === 'cleared',
          ).length;
          return {
            ...adv,
            encounters: updatedEncounters,
            clearedEncounters: clearedCount,
          };
        });
        const updated = { ...e, adventures: updatedAdventures };

        // Sync with REST API backend
        fetch(`/api/entries/${campaignId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        }).catch((err) =>
          console.error('REST API encounter update error:', err),
        );

        return updated;
      }),
    );

    playParchmentSound();
  };

  const handleToggleEncounterStandalone = (
    advId: string,
    encounterId: string,
  ) => {
    setApiEntries((prev) =>
      prev.map((e) => {
        if (e.id !== advId) return e;
        const currentEncounters = e.encounters || [];
        const updatedEncounters = currentEncounters.map((enc) => {
          if (enc.id !== encounterId) return enc;
          const newStatus =
            enc.status === 'cleared' ? 'in progress' : 'cleared';
          return { ...enc, status: newStatus };
        });
        const clearedCount = updatedEncounters.filter(
          (enc) => enc.status === 'cleared',
        ).length;
        const updated = {
          ...e,
          encounters: updatedEncounters,
          clearedEncounters: clearedCount,
        };

        // Sync with REST API
        fetch(`/api/entries/${advId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        }).catch((err) =>
          console.error('REST API encounter update error:', err),
        );

        return updated;
      }),
    );

    playParchmentSound();
  };

  const handleAddEncounterStandalone = (
    advId: string,
    encounterName: string,
  ) => {
    const newEnc: Encounter = {
      id: `enc-${Date.now()}`,
      name: encounterName,
      status: 'in progress',
    };

    setApiEntries((prev) =>
      prev.map((e) => {
        if (e.id !== advId) return e;
        const currentEncounters = e.encounters || [];
        const updatedEncounters = [...currentEncounters, newEnc];
        const clearedCount = updatedEncounters.filter(
          (enc) => enc.status === 'cleared',
        ).length;
        const updated = {
          ...e,
          encounters: updatedEncounters,
          clearedEncounters: clearedCount,
          totalEncounters: updatedEncounters.length,
        };

        // Sync with REST API
        fetch(`/api/entries/${advId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        }).catch((err) => console.error('REST API encounter add error:', err));

        return updated;
      }),
    );

    setNotification(`New encounter "${encounterName}" added to adventure.`);
    setTimeout(() => setNotification(null), 3000);
    playParchmentSound();
  };

  const handleStartCampaign = (worldEntry: TomeEntry) => {
    const newCampaignId = 'campaign-' + Date.now();
    const newCampaign: TomeEntry = {
      id: newCampaignId,
      type: 'spell',
      name: `${worldEntry.name} - Campaign #${customEntries.filter((e) => e.parentWorldId === worldEntry.id).length + 1}`,
      description: `Active campaign session cloned from ${worldEntry.name}.`,
      pageRef: `SESSION #${customEntries.length + 101}`,
      parentWorldId: worldEntry.id,
      statusBadge: 'running',
      sessionAge: 'Session running for 0 days 1 hr',
      iconType: 'flask',
      primaryButtonLabel: 'Resume session',
      secondaryButtonLabel: 'View log',
      actions: worldEntry.actions || [
        {
          name: 'Initiate Encounter',
          formula: '1d20+3',
          description: 'Roll initiative for active campaign.',
        },
      ],
      isCustom: true,
    };
    setCustomEntries((prev) => [newCampaign, ...prev]);

    // Save to server REST API database
    fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCampaign),
    })
      .then((r) => r.json())
      .then((resData) => {
        if (resData && resData.entry) {
          setApiEntries((prev) => [resData.entry, ...prev]);
        }
      })
      .catch((err) => console.error('REST API create entry error:', err));

    setNotification(
      `New campaign cloned from ${worldEntry.name}! Status: Running (Saved to REST API).`,
    );
    setTimeout(() => setNotification(null), 4000);
    playParchmentSound();
  };

  const handleResumeSession = (entry: TomeEntry) => {
    setSelectedEntry(entry);
    setNotification(`Resuming session for "${entry.name}"...`);
    setTimeout(() => setNotification(null), 3000);
    playParchmentSound();
  };

  const handleViewLog = (entry: TomeEntry) => {
    setActiveLogEntry(entry);
    playParchmentSound();
  };

  const [sectionVisibility, setSectionVisibility] =
    useState<MainContentVisibility>(() => {
      const saved = localStorage.getItem('the_tome_section_visibility');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            campaign_setting: parsed.campaign_setting ?? true,
            grimoire_of_campaigns: parsed.grimoire_of_campaigns ?? true,
            adventures_of_the_void: parsed.adventures_of_the_void ?? true,
            ancient_encounters: parsed.ancient_encounters ?? true,
            navigation_tabs: parsed.navigation_tabs ?? true,
          };
        } catch {
          // fallback
        }
      }
      return {
        campaign_setting: true,
        grimoire_of_campaigns: true,
        adventures_of_the_void: true,
        ancient_encounters: true,
        navigation_tabs: true,
      };
    });

  const [isDbMode, setIsDbMode] = useState<boolean>(() => {
    return window.location.search.includes('db=true');
  });

  useEffect(() => {
    const handleUrlChange = () => {
      setIsDbMode(window.location.search.includes('db=true'));
    };

    window.addEventListener('popstate', handleUrlChange);
    const interval = setInterval(handleUrlChange, 200);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      clearInterval(interval);
    };
  }, []);

  const handleOpenDbConsole = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('db', 'true');
    window.history.pushState({}, '', url.toString());
    setIsDbMode(true);
  };

  const handleGoToCatalog = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('db');
    window.history.pushState({}, '', url.toString());
    setIsDbMode(false);
  };

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync custom entries to localStorage
  useEffect(() => {
    localStorage.setItem(
      'the_tome_custom_entries',
      JSON.stringify(customEntries),
    );
  }, [customEntries]);

  // Sync entry label overrides to localStorage
  useEffect(() => {
    localStorage.setItem(
      'the_tome_entry_label_overrides',
      JSON.stringify(entryLabelOverrides),
    );
  }, [entryLabelOverrides]);

  // Synthesize custom rustle parchment sound using Web Audio API
  const playParchmentSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const duration = 0.25;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Filtered noise with peak frequency representing paper friction
      for (let i = 0; i < bufferSize; i++) {
        data[i] =
          (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 3500;
      filter.Q.value = 1.2;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration - 0.04,
      );

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch (e) {
      // Audio context block handles
    }
  };

  // Sound play triggers on simple actions
  const handleCategorySelect = (category: EntryType | 'all') => {
    playParchmentSound();
    setSelectedCategory(category);
  };

  const handleCardClick = (entry: TomeEntry) => {
    playParchmentSound();
    // Detail pop-up on card click disabled per user request
  };

  const handleActionRoll = (formula: string, name: string) => {
    setRollTrigger({
      formula,
      name,
      timestamp: Date.now(),
    });
    setNotification(
      `Cast request: "${name}" (${formula}) sent to the Dice Oracle!`,
    );
    setTimeout(() => setNotification(null), 4000);
  };

  // AI entry generation responder
  const handleEntryScribed = (newEntry: TomeEntry) => {
    setCustomEntries((prev) => [newEntry, ...prev]);
    playParchmentSound();
    // Automatically select and highlight the newly created heretical entry
    setSelectedEntry(newEntry);
    setNotification(
      `Scribe complete: "${newEntry.name}" has been bound to page ${newEntry.pageRef}!`,
    );
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDeleteCustomEntry = (id: string) => {
    setCustomEntries((prev) => prev.filter((item) => item.id !== id));

    // Sync delete to REST API
    fetch(`/api/entries/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setApiEntries((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.error('REST API delete error:', err));

    playParchmentSound();
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
    setNotification('Custom parchment page exiled from REST API database.');
    setTimeout(() => setNotification(null), 3000);
  };

  // Combine REST API database entries and custom lists with label overrides
  const allEntries = useMemo(() => {
    const baseList = apiEntries.length > 0 ? apiEntries : initialEntries;
    const combined = [...customEntries, ...baseList];

    // Deduplicate by ID
    const uniqueMap = new Map<string, TomeEntry>();
    combined.forEach((item) => {
      if (!uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, item);
      }
    });
    const unique = Array.from(uniqueMap.values());

    return unique.map((entry) => {
      const override = entryLabelOverrides[entry.id];
      if (override) {
        return { ...entry, ...override };
      }
      return entry;
    });
  }, [apiEntries, customEntries, entryLabelOverrides]);

  // Apply Search query and Category filters dynamically
  const filteredEntries = useMemo(() => {
    return allEntries.filter((entry) => {
      // Category filter
      if (selectedCategory !== 'all' && entry.type !== selectedCategory) {
        return false;
      }
      // Search text filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = entry.name.toLowerCase().includes(query);
        const matchesDesc = entry.description.toLowerCase().includes(query);
        const matchesPage = entry.pageRef.toLowerCase().includes(query);
        const matchesLore =
          entry.expandedLore?.toLowerCase().includes(query) || false;
        return matchesName || matchesDesc || matchesPage || matchesLore;
      }
      return true;
    });
  }, [allEntries, selectedCategory, searchQuery]);

  // Page/Section Navigation (two arrow buttons cycling REST API categories/sections without opening dialogue modal)
  const handlePrevEntry = () => {
    playParchmentSound();
    const categories = ['all', 'class', 'spell', 'beast', 'relic'];
    const categoryNames: Record<string, string> = {
      all: 'All REST API Archives',
      class: '01. Campaign Worlds & Active Sessions',
      spell: '02. The Spell Grimoire',
      beast: '03. Adventures of the Void',
      relic: '04. Ancient Encounters',
    };
    const currentIndex = categories.indexOf(selectedCategory);
    const prevIndex =
      (currentIndex - 1 + categories.length) % categories.length;
    const nextCat = categories[prevIndex];
    setSelectedCategory(nextCat);
    setNotification(`REST API Section: ${categoryNames[nextCat]}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNextEntry = () => {
    playParchmentSound();
    const categories = ['all', 'class', 'spell', 'beast', 'relic'];
    const categoryNames: Record<string, string> = {
      all: 'All REST API Archives',
      class: '01. Campaign Worlds & Active Sessions',
      spell: '02. The Spell Grimoire',
      beast: '03. Adventures of the Void',
      relic: '04. Ancient Encounters',
    };
    const currentIndex = categories.indexOf(selectedCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    const nextCat = categories[nextIndex];
    setSelectedCategory(nextCat);
    setNotification(`REST API Section: ${categoryNames[nextCat]}`);
    setTimeout(() => setNotification(null), 3000);
  };

  // Dedicated modal navigation handlers (only used inside the open dialogue box)
  const handleModalPrev = () => {
    const dataset = filteredEntries.length > 0 ? filteredEntries : allEntries;
    if (dataset.length === 0 || !selectedEntry) return;
    playParchmentSound();
    const currentIndex = dataset.findIndex((e) => e.id === selectedEntry.id);
    const prevIndex =
      currentIndex === -1
        ? dataset.length - 1
        : (currentIndex - 1 + dataset.length) % dataset.length;
    setSelectedEntry(dataset[prevIndex]);
  };

  const handleModalNext = () => {
    const dataset = filteredEntries.length > 0 ? filteredEntries : allEntries;
    if (dataset.length === 0 || !selectedEntry) return;
    playParchmentSound();
    const currentIndex = dataset.findIndex((e) => e.id === selectedEntry.id);
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % dataset.length;
    setSelectedEntry(dataset[nextIndex]);
  };

  // Split filtered elements by original Category groups for section rendering
  const classes = useMemo(
    () => filteredEntries.filter((e) => e.type === 'class'),
    [filteredEntries],
  );
  const spells = useMemo(
    () => filteredEntries.filter((e) => e.type === 'spell'),
    [filteredEntries],
  );
  const beasts = useMemo(
    () => filteredEntries.filter((e) => e.type === 'beast'),
    [filteredEntries],
  );
  const relics = useMemo(
    () => filteredEntries.filter((e) => e.type === 'relic'),
    [filteredEntries],
  );

  const displayWorld = useMemo(() => {
    if (classes.length > 0) return classes[0];
    return (
      allEntries.find((e) => e.type === 'class' || e.isWorld) || allEntries[0]
    );
  }, [classes, allEntries]);

  const displayCampaigns = useMemo(() => {
    if (spells.length > 0) return spells;
    return allEntries.filter((e) => e.type === 'spell');
  }, [spells, allEntries]);

  if (isDbMode) {
    return (
      <DatabaseSchemaView
        customEntries={customEntries}
        setCustomEntries={setCustomEntries}
        entryLabelOverrides={entryLabelOverrides}
        setEntryLabelOverrides={setEntryLabelOverrides}
        sectionVisibility={sectionVisibility}
        setSectionVisibility={setSectionVisibility}
        onGoToCatalog={handleGoToCatalog}
        darkMode={darkMode}
        soundEnabled={soundEnabled}
        inkLevel={inkLevel}
      />
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden border-[12px] border-primary dark:border-white bg-background-light dark:bg-background-dark text-primary dark:text-white font-serif transition-colors duration-300">
      {/* Dynamic Scribe Banner Notification */}
      {notification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-background-light dark:bg-white dark:text-background-dark border-2 border-primary dark:border-white px-6 py-3 shadow-2xl font-mono text-xs uppercase tracking-wider animate-bounce flex items-center gap-3">
          <Info className="w-4 h-4 shrink-0 text-amber-500" />
          <span>{notification}</span>
        </div>
      )}

      {/* --- GLOBAL NAVIGATION HEADER --- */}
      <div className="w-full border-b-2 border-primary dark:border-white bg-primary text-background-light dark:bg-white dark:text-background-dark p-4 flex items-center justify-between gap-4 z-10">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-black text-lg uppercase tracking-wider">
              Global Navigation
            </h2>
            <span className="border border-emerald-400 text-emerald-300 dark:text-emerald-700 dark:border-emerald-700 bg-emerald-950/80 dark:bg-emerald-100 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Database className="w-3 h-3" /> REST API JSON DATABASE
            </span>
          </div>
          <p className="font-mono text-[9px] mt-1 opacity-75">
            Sections [01], [03], and [04] powered dynamically by REST API (`GET
            /api/database`).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Round pixel-art person avatar in Global Navigation */}
          <button
            id="user-avatar"
            onClick={() => {
              playParchmentSound();
              setIsProfileOpen(true);
            }}
            className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-background-light dark:bg-background-dark flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-primary dark:hover:ring-white cursor-pointer focus:outline-none"
            title="Click to view Scribe Credentials"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-[2px]">
              {/* Row 1: 5 green blocks */}
              <div className="flex gap-[2px] w-full h-[5px]">
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
              </div>
              {/* Row 2: 3 green blocks with spaces */}
              <div className="flex gap-[2px] w-full h-[5px]">
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                <div className="bg-transparent flex-1 h-full"></div>
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                <div className="bg-transparent flex-1 h-full"></div>
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
              </div>
              {/* Row 3: 3 green blocks with spaces */}
              <div className="flex gap-[2px] w-full h-[5px]">
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                <div className="bg-transparent flex-1 h-full"></div>
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                <div className="bg-transparent flex-1 h-full"></div>
                <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* --- FILTERS TAB INTERFACE BAR --- */}
      {sectionVisibility.navigation_tabs && (
        <aside className="w-full border-b-2 border-primary dark:border-white bg-background-light dark:bg-background-dark p-0 z-10">
          <div className="flex flex-col lg:flex-row">
            {/* Filters Selector buttons array */}
            <div className="flex-1 flex flex-col sm:flex-row font-display font-bold uppercase text-[11px] tracking-widest text-center border-b sm:border-b-0 border-primary/20 dark:border-white/20">
              {(sectionVisibility.campaign_setting ||
                sectionVisibility.grimoire_of_campaigns ||
                sectionVisibility.adventures_of_the_void ||
                sectionVisibility.ancient_encounters) && (
                <motion.button
                  whileTap={{ x: [-8, 8, -6, 6, -3, 3, 0], scale: 0.96 }}
                  animate={
                    shakingBtn === 'all'
                      ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    triggerBtnShake('all');
                    handleCategorySelect('all');
                  }}
                  className={`flex-1 p-5 border-b sm:border-b-0 sm:border-r border-primary/20 dark:border-white/20 transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white dark:bg-white dark:text-black font-black'
                      : ''
                  }`}
                >
                  <Book className="w-3.5 h-3.5" /> <span>Full Index</span>
                </motion.button>
              )}

              {sectionVisibility.campaign_setting && (
                <motion.button
                  whileTap={{ x: [-8, 8, -6, 6, -3, 3, 0], scale: 0.96 }}
                  animate={
                    shakingBtn === 'class'
                      ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    triggerBtnShake('class');
                    handleCategorySelect('class');
                  }}
                  className={`flex-1 p-5 border-b sm:border-b-0 sm:border-r border-primary/20 dark:border-white/20 transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark ${
                    selectedCategory === 'class'
                      ? 'bg-primary text-white dark:bg-white dark:text-black font-black'
                      : ''
                  }`}
                >
                  <Sword className="w-3.5 h-3.5" /> <span>Setting</span>
                </motion.button>
              )}

              {sectionVisibility.grimoire_of_campaigns && (
                <motion.button
                  whileTap={{ x: [-8, 8, -6, 6, -3, 3, 0], scale: 0.96 }}
                  animate={
                    shakingBtn === 'spell'
                      ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    triggerBtnShake('spell');
                    handleCategorySelect('spell');
                  }}
                  className={`flex-1 p-5 border-b sm:border-b-0 sm:border-r border-primary/20 dark:border-white/20 transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark ${
                    selectedCategory === 'spell'
                      ? 'bg-primary text-white dark:bg-white dark:text-black font-black'
                      : ''
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5" /> <span>Campaigns</span>
                </motion.button>
              )}

              {sectionVisibility.adventures_of_the_void && (
                <motion.button
                  whileTap={{ x: [-8, 8, -6, 6, -3, 3, 0], scale: 0.96 }}
                  animate={
                    shakingBtn === 'beast'
                      ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    triggerBtnShake('beast');
                    handleCategorySelect('beast');
                  }}
                  className={`flex-1 p-5 border-b sm:border-b-0 sm:border-r border-primary/20 dark:border-white/20 transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark ${
                    selectedCategory === 'beast'
                      ? 'bg-primary text-white dark:bg-white dark:text-black font-black'
                      : ''
                  }`}
                >
                  <Skull className="w-3.5 h-3.5" /> <span>Adventures</span>
                </motion.button>
              )}

              {sectionVisibility.ancient_encounters && (
                <motion.button
                  whileTap={{ x: [-8, 8, -6, 6, -3, 3, 0], scale: 0.96 }}
                  animate={
                    shakingBtn === 'relic'
                      ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    triggerBtnShake('relic');
                    handleCategorySelect('relic');
                  }}
                  className={`flex-1 p-5 border-b sm:border-b-0 sm:border-r-0 border-primary/20 dark:border-white/20 transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark ${
                    selectedCategory === 'relic'
                      ? 'bg-primary text-white dark:bg-white dark:text-black font-black'
                      : ''
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> <span>Encounters</span>
                </motion.button>
              )}
            </div>
          </div>
        </aside>
      )}

      {/* --- HEADER CONTROLS BAR --- */}
      <header className="flex w-full border-b-2 border-primary dark:border-white bg-background-light dark:bg-background-dark z-10">
        <div className="flex w-full divide-x-2 divide-primary dark:divide-white h-[48px]">
          <motion.button
            type="button"
            whileTap={{ x: [-8, 8, -6, 6, -3, 3, 0], scale: 0.98 }}
            onClick={handlePrevEntry}
            className="w-1/2 h-full flex items-center justify-center gap-2 hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors duration-150 cursor-pointer font-mono text-xs font-bold uppercase tracking-wider focus:outline-none group select-none"
            title="Cycle to Previous REST API JSON Data Object"
          >
            <ChevronLeft className="w-6 h-6 shrink-0 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Previous JSON Object</span>
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ x: [-8, 8, -6, 6, -3, 3, 0], scale: 0.98 }}
            onClick={handleNextEntry}
            className="w-1/2 h-full flex items-center justify-center gap-2 hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors duration-150 cursor-pointer font-mono text-xs font-bold uppercase tracking-wider focus:outline-none group select-none"
            title="Cycle to Next REST API JSON Data Object"
          >
            <span className="hidden sm:inline">Next JSON Object</span>
            <ChevronRight className="w-6 h-6 shrink-0 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </header>

      {/* --- MAIN SCROLL INDEX CONTAINER --- */}
      <main className="flex-1 flex flex-col">
        {/* SCROLL INDEX GRID (occupies the full width) */}
        <div className="flex-1 flex flex-col">
          {filteredEntries.length === 0 ? (
            <div className="flex-1 py-16 px-8 text-center flex flex-col items-center justify-center gap-4">
              <Book className="w-16 h-16 opacity-35 animate-pulse text-primary dark:text-white" />
              <p className="font-serif italic text-lg opacity-85">
                "The parchment remains empty. No heretical scrolls match your
                active search index."
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  playParchmentSound();
                }}
                className="px-4 py-1.5 border border-primary dark:border-white font-mono text-[10px] uppercase tracking-widest hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark transition-colors"
              >
                Restore Index
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* CATEGORY 01 & 02: WORLDS & CLONED CAMPAIGNS (4-Tier Parent-Child Hierarchy) */}
              {sectionVisibility.campaign_setting &&
                (selectedCategory === 'all' ||
                  selectedCategory === 'class' ||
                  selectedCategory === 'spell') && (
                  <div id="section-classes" className="flex flex-col">
                    {/* Category Section Header in original brutalist style */}
                    <div className="col-span-full border-t-2 border-b-2 border-primary dark:border-white bg-primary text-background-light dark:bg-white dark:text-background-dark px-6 py-2.5 font-display font-black uppercase tracking-widest flex justify-between items-center text-xs">
                      <span className="font-bold">
                        {selectedCategory === 'class'
                          ? '01. Campaign Setting'
                          : selectedCategory === 'spell'
                            ? '02. Active Campaigns'
                            : '01. Campaign Worlds & Active Sessions'}
                      </span>
                      <Sword className="w-4 h-4" />
                    </div>

                    <div className="p-4 md:p-6 flex flex-col gap-5 bg-background-light dark:bg-background-dark/30 border-b-2 border-primary dark:border-white">
                      {displayWorld ? (
                        <NestedHierarchyCard
                          worldEntry={displayWorld}
                          campaigns={displayCampaigns}
                          hideWorld={selectedCategory === 'spell'}
                          hideCampaigns={selectedCategory === 'class'}
                          onSelectEntry={(entry) => handleCardClick(entry)}
                          onEditWorld={handleEditWorld}
                          onStartCampaign={handleStartCampaign}
                          onResumeSession={handleResumeSession}
                          onViewLog={handleViewLog}
                          onAddAdventure={handleAddAdventure}
                          onToggleEncounter={handleToggleEncounter}
                          onNotification={(msg) => {
                            setNotification(msg);
                            setTimeout(() => setNotification(null), 3000);
                          }}
                        />
                      ) : (
                        <div className="text-center py-6 font-mono text-sm">
                          No world entries found.
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* CATEGORY 03: BESTIARY OF THE VOID / ADVENTURES OF THE VOID */}
              {sectionVisibility.adventures_of_the_void &&
                (selectedCategory === 'all' || selectedCategory === 'beast') &&
                beasts.length > 0 && (
                  <div id="section-bestiary" className="flex flex-col">
                    <div className="col-span-full border-t-2 border-b-2 border-primary dark:border-white bg-primary text-background-light dark:bg-white dark:text-background-dark px-6 py-2.5 font-display font-black uppercase tracking-widest flex justify-between items-center text-xs">
                      <span className="font-bold">
                        03. Adventures of the Void
                      </span>
                      <Skull className="w-4 h-4" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 md:p-6 bg-background-light dark:bg-background-dark/30 border-b-2 border-primary dark:border-white">
                      {beasts.map((entry) => (
                        <EntryCard
                          key={entry.id}
                          entry={entry}
                          onClick={() => handleCardClick(entry)}
                          onDelete={() => handleDeleteCustomEntry(entry.id)}
                          onActionTrigger={handleActionRoll}
                          onAccess={() => {
                            setSelectedEntry(entry);
                            playParchmentSound();
                          }}
                          onToggleEncounter={(encId) =>
                            handleToggleEncounterStandalone(entry.id, encId)
                          }
                          onAddEncounter={(advId, encName) =>
                            handleAddEncounterStandalone(advId, encName)
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}

              {/* CATEGORY 04: ANCIENT RELICS / ANCIENT ENCOUNTERS */}
              {sectionVisibility.ancient_encounters &&
                (selectedCategory === 'all' || selectedCategory === 'relic') &&
                relics.length > 0 && (
                  <div id="section-relics" className="flex flex-col">
                    <div className="col-span-full border-t-2 border-b-2 border-primary dark:border-white bg-primary text-background-light dark:bg-white dark:text-background-dark px-6 py-2.5 font-display font-black uppercase tracking-widest flex justify-between items-center text-xs">
                      <span className="font-bold">04. Ancient Encounters</span>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 border-collapse">
                      {relics.map((entry) => (
                        <EntryCard
                          key={entry.id}
                          entry={entry}
                          onClick={() => handleCardClick(entry)}
                          onDelete={() => handleDeleteCustomEntry(entry.id)}
                          onActionTrigger={handleActionRoll}
                          onAccess={() => {
                            setSelectedEntry(entry);
                            playParchmentSound();
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </main>

      {/* --- ACTIVE BOOK DETAILS DRAWER (OVERLAY) --- */}
      <EntryDetail
        entry={selectedEntry}
        onClose={() => {
          playParchmentSound();
          setSelectedEntry(null);
        }}
        onActionTrigger={handleActionRoll}
        onPrev={handleModalPrev}
        onNext={handleModalNext}
      />

      {/* --- SCRIBE CREDENTIALS MODAL OVERLAY --- */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-8">
          {/* Background click listener to close */}
          <div
            className="absolute inset-0 cursor-zoom-out"
            onClick={() => {
              playParchmentSound();
              setIsProfileOpen(false);
            }}
          />

          {/* Modal Container: Screen-Wide Full Width Panel */}
          <div className="relative w-full max-w-full h-full md:h-auto bg-background-light dark:bg-background-dark text-primary dark:text-white border-y-4 md:border-4 border-primary dark:border-white shadow-2xl z-10 flex flex-col font-mono text-xs overflow-y-auto">
            {/* Header / Accent Bar */}
            <div className="bg-primary text-background-light dark:bg-white dark:text-background-dark p-4 flex justify-between items-center border-b-2 border-primary dark:border-white font-display font-black uppercase tracking-wider text-sm shrink-0">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 animate-pulse" />
                <span>Scribe Identification Credentials</span>
              </div>
              <button
                onClick={() => {
                  playParchmentSound();
                  setIsProfileOpen(false);
                }}
                className="p-1 border border-background-light/30 dark:border-background-dark/30 hover:bg-background-light hover:text-primary dark:hover:bg-background-dark dark:hover:text-white transition-colors cursor-pointer rounded-xs"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body: Immersive 3-column Layout for full-width */}
            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x-2 divide-primary/20 dark:divide-white/20">
              {/* Column 1: Identity Card details */}
              <div className="flex items-center gap-5 pb-6 md:pb-0">
                {/* Large animated pixel avatar */}
                <div className="w-20 h-20 bg-primary/5 dark:bg-white/5 border-2 border-dashed border-primary/40 dark:border-white/40 flex items-center justify-center rounded-xs shrink-0 relative overflow-hidden">
                  <div className="w-12 h-12 flex flex-col justify-center items-center gap-[3px] animate-bounce">
                    {/* Row 1 */}
                    <div className="flex gap-[3px] w-full h-[10px]">
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                    </div>
                    {/* Row 2 */}
                    <div className="flex gap-[3px] w-full h-[10px]">
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                      <div className="bg-transparent flex-1 h-full"></div>
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                      <div className="bg-transparent flex-1 h-full"></div>
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                    </div>
                    {/* Row 3 */}
                    <div className="flex gap-[3px] w-full h-[10px]">
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                      <div className="bg-transparent flex-1 h-full"></div>
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                      <div className="bg-transparent flex-1 h-full"></div>
                      <div className="bg-[#4ade80] flex-1 h-full rounded-[1px]"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-black text-lg uppercase tracking-wider text-primary dark:text-white leading-none">
                    Grand Scribe
                  </h3>
                  <p className="text-xs text-primary/70 dark:text-white/70 mt-1.5 break-all select-all font-bold">
                    elliotbradly@gmail.com
                  </p>
                  <p className="text-[10px] text-primary/40 dark:text-white/40 mt-1">
                    STATION: SCRIPTORIUM CHAMBER #1970
                  </p>
                </div>
              </div>

              {/* Column 2: Status, Level and Sanity quotients */}
              <div className="flex flex-col justify-center gap-5 py-6 md:py-0 md:px-10">
                <div>
                  <span className="text-[10px] text-primary/50 dark:text-white/50 block font-bold tracking-widest mb-1">
                    AUTHORITY LEVEL
                  </span>
                  <span className="font-bold text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    Level 4 Scholar
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-primary/50 dark:text-white/50 block font-bold tracking-widest mb-1">
                    SANITY QUOTIENT
                  </span>
                  <span className="font-bold text-sm uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    87% Stable
                  </span>
                </div>
              </div>

              {/* Column 3: Scriptorium Metrics, Ink levels & Action triggers */}
              <div className="space-y-5 pt-6 md:pt-0 md:pl-10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5 font-bold tracking-widest">
                    <span>BLACK RESIN INK LEVEL</span>
                    <span
                      className={
                        inkLevel < 30
                          ? 'text-rose-500 font-bold'
                          : 'text-primary/70 dark:text-white/70'
                      }
                    >
                      {inkLevel}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-primary/10 dark:bg-white/10 border border-primary/30 dark:border-white/30 rounded-xs overflow-hidden">
                    <div
                      className="h-full bg-primary dark:bg-white transition-all duration-500"
                      style={{ width: `${inkLevel}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between border-t border-primary/10 dark:border-white/10 pt-4 text-[10px] tracking-widest">
                  <span className="font-bold text-primary/60 dark:text-white/60">
                    SCROLLS BOUND IN INDEX:
                  </span>
                  <span className="font-black text-primary dark:text-white">
                    {allEntries.length} Scrolls
                  </span>
                </div>

                {/* Interactive Scriptorium Favor button */}
                <button
                  onClick={() => {
                    playParchmentSound();
                    setInkLevel(100);
                    setNotification(
                      'Inkwells purified! Mystic black resin restored to 100%.',
                    );
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  disabled={inkLevel === 100}
                  className={`w-full py-3 border-2 text-center font-display font-black uppercase text-[10px] tracking-widest transition-all cursor-pointer ${
                    inkLevel === 100
                      ? 'border-primary/20 dark:border-white/20 text-primary/30 dark:text-white/30 cursor-not-allowed'
                      : 'border-primary dark:border-white bg-primary text-background-light hover:bg-background-light hover:text-primary dark:bg-white dark:text-background-dark dark:hover:bg-background-dark dark:hover:text-white'
                  }`}
                >
                  {inkLevel === 100
                    ? '✓ Resin fully synthesized'
                    : '⚡ Purify Scriptorium Inkwells'}
                </button>
              </div>
            </div>

            {/* Stamp of Authenticity */}
            <div className="border-t-2 border-primary/30 dark:border-white/30 bg-primary/5 dark:bg-white/5 p-4 text-[10px] text-center uppercase tracking-widest text-primary/50 dark:text-white/50 shrink-0">
              - SEAL OF THE ARCH-CHRONICLER -
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="w-full bg-[#806f2a] text-white py-12 sm:py-16 px-4 flex flex-col items-center justify-center gap-6 border-t-2 border-primary dark:border-white font-mono select-none">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* Database Console Icon Button */}
          <button
            onClick={handleOpenDbConsole}
            className="border-2 border-white bg-background-light text-black p-2.5 flex items-center justify-center hover:bg-zinc-200 transition-all cursor-pointer shadow-md"
            title="Open Database Schema Interface"
          >
            <Database className="w-5 h-5 text-black" />
          </button>

          {/* >_ CAMP CANDOR SYSTEMS Button */}
          <button
            onClick={handleOpenDbConsole}
            className="bg-[#181818] hover:bg-[#252525] active:bg-[#111111] border border-[#3e3e3e] px-6 py-2.5 flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md group"
            title="Open Database Schema Interface"
          >
            <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-widest flex items-center gap-2">
              <span className="text-zinc-300 font-mono font-black select-none">
                &gt;_
              </span>
              <span>CAMP CANDOR SYSTEMS</span>
            </span>
          </button>
        </div>

        {/* PRINTED IN THE KINGDOM OF MANOR Text */}
        <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#64b5f6] text-center select-none drop-shadow-[0_0_8px_rgba(100,181,246,0.3)]">
          PRINTED IN THE KINGDOM OF MANOR
        </div>
      </footer>

      {/* --- EDIT WORLD PARAMETERS MODAL --- */}
      {editingWorld && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="border-2 border-primary dark:border-white bg-background-light dark:bg-background-dark text-primary dark:text-white max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 font-serif">
            <div className="flex justify-between items-center border-b border-primary/20 dark:border-white/20 pb-3">
              <h3 className="font-display font-black text-xl uppercase tracking-tight flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <span>Edit World: {editingWorld.name}</span>
              </h3>
              <button
                onClick={() => setEditingWorld(null)}
                className="text-primary/60 dark:text-white/60 hover:text-primary dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase tracking-wider opacity-75">
                World Title
              </label>
              <input
                type="text"
                value={editWorldName}
                onChange={(e) => setEditWorldName(e.target.value)}
                className="bg-white dark:bg-zinc-900 border border-primary dark:border-white p-2.5 text-sm font-sans text-primary dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase tracking-wider opacity-75">
                Setting Description
              </label>
              <textarea
                rows={4}
                value={editWorldDesc}
                onChange={(e) => setEditWorldDesc(e.target.value)}
                className="bg-white dark:bg-zinc-900 border border-primary dark:border-white p-2.5 text-sm font-serif text-primary dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex gap-3 pt-3 border-t border-primary/20 dark:border-white/20 font-mono text-xs uppercase font-bold">
              <button
                onClick={() => setEditingWorld(null)}
                className="flex-1 py-2 border border-primary dark:border-white hover:bg-primary/10 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWorld}
                className="flex-1 py-2 border border-primary dark:border-white bg-primary text-background-light dark:bg-white dark:text-background-dark hover:opacity-90 cursor-pointer"
              >
                Save World Parameters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CAMPAIGN LOG MODAL --- */}
      {activeLogEntry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="border-2 border-primary dark:border-white bg-background-light dark:bg-background-dark text-primary dark:text-white max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4 font-serif">
            <div className="flex justify-between items-center border-b border-primary/20 dark:border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-display font-black text-xl uppercase tracking-tight">
                  Campaign Log: {activeLogEntry.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveLogEntry(null)}
                className="text-primary/60 dark:text-white/60 hover:text-primary dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white/60 dark:bg-zinc-900/60 p-3 border border-primary/20 dark:border-white/20 font-mono text-xs flex justify-between items-center">
              <span className="uppercase font-bold text-emerald-700 dark:text-emerald-400">
                STATUS: {activeLogEntry.statusBadge || 'running'}
              </span>
              <span className="flex items-center gap-1 opacity-80">
                <Clock className="w-3.5 h-3.5" />
                {activeLogEntry.sessionAge ||
                  'Session running for 3 days 11 hrs'}
              </span>
            </div>

            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
              <div className="bg-white/40 dark:bg-zinc-900/40 border border-primary/20 dark:border-white/20 p-3">
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 uppercase font-bold mb-1">
                  Session Event #12
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  Party entered the Frigid Sepulchers. Spectral resonance
                  detected in local area.
                </p>
              </div>
              <div className="bg-white/40 dark:bg-zinc-900/40 border border-primary/20 dark:border-white/20 p-3">
                <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400 uppercase font-bold mb-1">
                  Session Event #11
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  Decapitating Cleave activated against minor Void Stalker.
                  Roll: 19 (Critical Success).
                </p>
              </div>
              <div className="bg-white/40 dark:bg-zinc-900/40 border border-primary/20 dark:border-white/20 p-3">
                <div className="text-[10px] font-mono text-sky-700 dark:text-sky-400 uppercase font-bold mb-1">
                  Session Event #10
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  Campaign initialized from Mythrokahn source world setting.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-primary/20 dark:border-white/20 flex justify-end font-mono text-xs uppercase">
              <button
                onClick={() => setActiveLogEntry(null)}
                className="py-2 px-4 border border-primary dark:border-white hover:bg-primary hover:text-background-light dark:hover:bg-white dark:hover:text-background-dark font-bold cursor-pointer"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
