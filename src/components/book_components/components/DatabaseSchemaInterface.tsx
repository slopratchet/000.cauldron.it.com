import React, { useState, useEffect } from 'react';
import {
  Database,
  RotateCcw,
  Copy,
  Check,
  Save,
  ArrowLeft,
  Code,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { LIBRARY_ITEMS } from '../data';
import { LibraryItem } from '../types';

interface DatabaseSchemaInterfaceProps {
  onExitDbMode: () => void;
  onUpdateItems?: (newItems: LibraryItem[]) => void;
  onUpdateSectionToggles?: (toggles: {
    enableAdventuresSection: boolean;
    enableRulebooksSection: boolean;
    enableJumpToSection: boolean;
    enableCategoryFilterBar: boolean;
    enableNewBadges?: boolean;
  }) => void;
}

export default function DatabaseSchemaInterface({
  onExitDbMode,
  onUpdateItems,
  onUpdateSectionToggles,
}: DatabaseSchemaInterfaceProps) {
  // Load database schema from localStorage or build initial complete schema
  const getInitialSchema = () => {
    const saved = localStorage.getItem('archive_protocol_full_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const { sectionToggles, ...rest } = parsed;
        return {
          sectionToggles: sectionToggles || {
            enableAdventuresSection: true,
            enableRulebooksSection: true,
            enableJumpToSection: true,
            enableCategoryFilterBar: false,
            enableNewBadges: true,
          },
          ...rest,
        };
      } catch (e) {
        console.error('Error parsing stored DB, returning default:', e);
      }
    }

    return {
      sectionToggles: {
        enableAdventuresSection: true,
        enableRulebooksSection: true,
        enableJumpToSection: true,
        enableCategoryFilterBar: false,
        enableNewBadges: true,
      },
      meta: {
        app_id: 'the-archive-protocol',
        name: 'Camp Candor - Catalog',
        description:
          'High-fidelity catalog and design customizer for The Archive Protocol watch collections.',
        version: '1.10',
        registry_status: 'TITAN-FORGED COOLDOWN SYSTEM ACCESS ACTIVE',
        server_time: new Date().toISOString(),
        stable_servers: true,
        modalFieldManualHeader: 'FIELD OPERATIONS MANUAL (SECURE ENTRY)',
        modalAuthenticStatusHeader: 'AUTHENTIC CHRONOMETER STATUS',
        modalAuthenticStatusText:
          'COSC certified. Inspected under high vacuum conditions. Tested for 600 hours.',
        modalStatsMatrixHeader: 'ARTIFACT STATS & SPECIFICATION MATRIX',
        modalChecksumText: 'CHECKSUM: OK',
        labelCaseDiameter: 'ITEM LEVEL (iLvl)',
        labelMaterial: 'FORGED MATERIAL',
        labelWaterResistance: 'DUNGEON ATTUNEMENT',
      },
      watchCollectionInventory: LIBRARY_ITEMS,
      chronometerSpecifications: {
        caliber: 'A-9280 TITAN CHRONO ENGINE',
        jewels: 28,
        powerReserve: '72 HOURS',
        frequency: '28,800 vph',
        certification: 'COSC HIGH VACUUM',
      },
      caseAlloyRegistry: [
        { id: 'saronite', name: 'SARONITE ALLOY', rating: 'CLASS A TANKING' },
        { id: 'titansteel', name: 'TITANSTEEL CORE', rating: 'HEAVY IMPACT' },
      ],
      dialColorAndVelumCores: [
        { id: 'void-black', name: 'VOID BLACK ABSORPTION' },
        { id: 'titan-gold', name: 'TITAN GOLD RUNIC' },
      ],
      bezelFocusShields: [
        { id: 'rotational-bezel', name: '60-MIN ROTATIONAL SHIELD' },
      ],
      strapAndBindingOptions: [
        { id: 'tactical-nylon', name: 'HEAVY-DUTY TACTICAL NYLON' },
        { id: 'dragon-leather', name: 'DRAGONSCALE LEATHER BINDING' },
      ],
      userSavedConfigs: [
        {
          configId: 'CFG-8821',
          name: 'TACTICAL ALLIGATOR SPEC',
          timestamp: new Date().toLocaleDateString(),
        },
      ],
      tickertapeMarqueeCore: [
        { id: 't1', message: 'CHRONOS SYSTEMS v1.4 CORE ENGINE INITIALIZED.' },
        { id: 't2', message: 'ALL ARCHIVE SCHEMAS COUPLED SUCCESSFULLY.' },
      ],
      contentCardsOrderIndex: LIBRARY_ITEMS.map((item) => item.id),
    };
  };

  const [fullDb, setFullDb] = useState<any>(getInitialSchema);
  const [selectedComponent, setSelectedComponent] =
    useState<string>('FULL_SCHEMA');
  const [jsonText, setJsonText] = useState<string>('');
  const [syntaxError, setSyntaxError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Update editor text when selected component or fullDb changes
  useEffect(() => {
    let targetData: any = fullDb;
    if (selectedComponent === 'CATALOG_IDENTITY')
      targetData = { meta: fullDb.meta };
    else if (selectedComponent === 'SECTION_TOGGLES')
      targetData = {
        sectionToggles: fullDb.sectionToggles || {
          enableAdventuresSection: true,
          enableRulebooksSection: true,
        },
      };
    else if (selectedComponent === 'WATCH_COLLECTION')
      targetData = {
        watchCollectionInventory: fullDb.watchCollectionInventory,
      };
    else if (selectedComponent === 'CHRONO_SPECS')
      targetData = {
        chronometerSpecifications: fullDb.chronometerSpecifications,
      };
    else if (selectedComponent === 'CASE_ALLOY')
      targetData = { caseAlloyRegistry: fullDb.caseAlloyRegistry };
    else if (selectedComponent === 'DIAL_COLOR')
      targetData = { dialColorAndVelumCores: fullDb.dialColorAndVelumCores };
    else if (selectedComponent === 'BEZEL_SHIELDS')
      targetData = { bezelFocusShields: fullDb.bezelFocusShields };
    else if (selectedComponent === 'STRAP_BINDINGS')
      targetData = { strapAndBindingOptions: fullDb.strapAndBindingOptions };
    else if (selectedComponent === 'USER_CONFIGS')
      targetData = { userSavedConfigs: fullDb.userSavedConfigs };
    else if (selectedComponent === 'MARQUEE_CORE')
      targetData = { tickertapeMarqueeCore: fullDb.tickertapeMarqueeCore };
    else if (selectedComponent === 'CARDS_INDEX')
      targetData = { contentCardsOrderIndex: fullDb.contentCardsOrderIndex };

    setJsonText(JSON.stringify(targetData, null, 2));
    setSyntaxError(null);
  }, [selectedComponent, fullDb]);

  // Live syntax check on edit
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonText(val);
    try {
      JSON.parse(val);
      setSyntaxError(null);
    } catch (err: any) {
      setSyntaxError(err.message);
    }
  };

  // Toggle Section directly via quick button
  const handleToggleSection = (
    key:
      | 'enableAdventuresSection'
      | 'enableRulebooksSection'
      | 'enableJumpToSection'
      | 'enableCategoryFilterBar'
      | 'enableNewBadges',
  ) => {
    const currentToggles = fullDb.sectionToggles || {
      enableAdventuresSection: true,
      enableRulebooksSection: true,
      enableJumpToSection: true,
      enableCategoryFilterBar: false,
      enableNewBadges: true,
    };
    const newToggles = {
      ...currentToggles,
      [key]:
        currentToggles[key] !== undefined
          ? !currentToggles[key]
          : key === 'enableCategoryFilterBar'
            ? true
            : false,
    };
    const { sectionToggles: _oldToggles, ...restDb } = fullDb;
    const updatedDb = {
      sectionToggles: newToggles,
      ...restDb,
    };
    setFullDb(updatedDb);
    localStorage.setItem(
      'archive_protocol_full_db',
      JSON.stringify(updatedDb, null, 2),
    );

    if (onUpdateSectionToggles) {
      onUpdateSectionToggles(newToggles);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Reset Archive Database
  const handleReset = () => {
    localStorage.removeItem('archive_protocol_full_db');
    const freshToggles = {
      enableAdventuresSection: true,
      enableRulebooksSection: true,
      enableJumpToSection: true,
      enableCategoryFilterBar: false,
      enableNewBadges: true,
    };
    const fresh = {
      sectionToggles: freshToggles,
      meta: {
        app_id: 'the-archive-protocol',
        name: 'Camp Candor - Catalog',
        description:
          'High-fidelity catalog and design customizer for The Archive Protocol watch collections.',
        version: '1.10',
        registry_status: 'TITAN-FORGED COOLDOWN SYSTEM ACCESS ACTIVE',
        server_time: new Date().toISOString(),
        stable_servers: true,
        modalFieldManualHeader: 'FIELD OPERATIONS MANUAL (SECURE ENTRY)',
        modalAuthenticStatusHeader: 'AUTHENTIC CHRONOMETER STATUS',
        modalAuthenticStatusText:
          'COSC certified. Inspected under high vacuum conditions. Tested for 600 hours.',
        modalStatsMatrixHeader: 'ARTIFACT STATS & SPECIFICATION MATRIX',
        modalChecksumText: 'CHECKSUM: OK',
        labelCaseDiameter: 'ITEM LEVEL (iLvl)',
        labelMaterial: 'FORGED MATERIAL',
        labelWaterResistance: 'DUNGEON ATTUNEMENT',
      },
      watchCollectionInventory: LIBRARY_ITEMS,
      chronometerSpecifications: {
        caliber: 'A-9280 TITAN CHRONO ENGINE',
        jewels: 28,
        powerReserve: '72 HOURS',
        frequency: '28,800 vph',
        certification: 'COSC HIGH VACUUM',
      },
      caseAlloyRegistry: [
        { id: 'saronite', name: 'SARONITE ALLOY', rating: 'CLASS A TANKING' },
        { id: 'titansteel', name: 'TITANSTEEL CORE', rating: 'HEAVY IMPACT' },
      ],
      dialColorAndVelumCores: [
        { id: 'void-black', name: 'VOID BLACK ABSORPTION' },
        { id: 'titan-gold', name: 'TITAN GOLD RUNIC' },
      ],
      bezelFocusShields: [
        { id: 'rotational-bezel', name: '60-MIN ROTATIONAL SHIELD' },
      ],
      strapAndBindingOptions: [
        { id: 'tactical-nylon', name: 'HEAVY-DUTY TACTICAL NYLON' },
        { id: 'dragon-leather', name: 'DRAGONSCALE LEATHER BINDING' },
      ],
      userSavedConfigs: [
        {
          configId: 'CFG-8821',
          name: 'TACTICAL ALLIGATOR SPEC',
          timestamp: new Date().toLocaleDateString(),
        },
      ],
      tickertapeMarqueeCore: [
        { id: 't1', message: 'CHRONOS SYSTEMS v1.4 CORE ENGINE INITIALIZED.' },
        { id: 't2', message: 'ALL ARCHIVE SCHEMAS COUPLED SUCCESSFULLY.' },
      ],
      contentCardsOrderIndex: LIBRARY_ITEMS.map((item) => item.id),
    };
    setFullDb(fresh);
    if (onUpdateItems) onUpdateItems(LIBRARY_ITEMS);
    if (onUpdateSectionToggles) onUpdateSectionToggles(freshToggles);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Save JSON
  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      let updatedDb = { ...fullDb };

      if (selectedComponent === 'FULL_SCHEMA') {
        updatedDb = parsed;
      } else if (selectedComponent === 'CATALOG_IDENTITY') {
        updatedDb.meta = parsed.meta || parsed;
      } else if (selectedComponent === 'SECTION_TOGGLES') {
        updatedDb.sectionToggles = parsed.sectionToggles || parsed;
      } else if (selectedComponent === 'WATCH_COLLECTION') {
        updatedDb.watchCollectionInventory =
          parsed.watchCollectionInventory || parsed;
      } else if (selectedComponent === 'CHRONO_SPECS') {
        updatedDb.chronometerSpecifications =
          parsed.chronometerSpecifications || parsed;
      } else if (selectedComponent === 'CASE_ALLOY') {
        updatedDb.caseAlloyRegistry = parsed.caseAlloyRegistry || parsed;
      } else if (selectedComponent === 'DIAL_COLOR') {
        updatedDb.dialColorAndVelumCores =
          parsed.dialColorAndVelumCores || parsed;
      } else if (selectedComponent === 'BEZEL_SHIELDS') {
        updatedDb.bezelFocusShields = parsed.bezelFocusShields || parsed;
      } else if (selectedComponent === 'STRAP_BINDINGS') {
        updatedDb.strapAndBindingOptions =
          parsed.strapAndBindingOptions || parsed;
      } else if (selectedComponent === 'USER_CONFIGS') {
        updatedDb.userSavedConfigs = parsed.userSavedConfigs || parsed;
      } else if (selectedComponent === 'MARQUEE_CORE') {
        updatedDb.tickertapeMarqueeCore =
          parsed.tickertapeMarqueeCore || parsed;
      } else if (selectedComponent === 'CARDS_INDEX') {
        updatedDb.contentCardsOrderIndex =
          parsed.contentCardsOrderIndex || parsed;
      }

      setFullDb(updatedDb);
      localStorage.setItem(
        'archive_protocol_full_db',
        JSON.stringify(updatedDb, null, 2),
      );

      // If watch items changed, sync with parent catalog state
      if (
        updatedDb.watchCollectionInventory &&
        Array.isArray(updatedDb.watchCollectionInventory)
      ) {
        if (onUpdateItems) {
          onUpdateItems(updatedDb.watchCollectionInventory);
        }
      }

      if (updatedDb.sectionToggles && onUpdateSectionToggles) {
        onUpdateSectionToggles(updatedDb.sectionToggles);
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e: any) {
      setSyntaxError(e.message);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schemaComponentsList = [
    { key: 'CATALOG_IDENTITY', label: '1. CATALOG IDENTITY & STATUS' },
    {
      key: 'SECTION_TOGGLES',
      label: '2. SECTION DISPLAY TOGGLES (ADVENTURES / RULEBOOKS)',
    },
    { key: 'WATCH_COLLECTION', label: '3. WATCH COLLECTION INVENTORY' },
    { key: 'CHRONO_SPECS', label: '4. CHRONOMETER SPECIFICATIONS' },
    { key: 'CASE_ALLOY', label: '5. CASE ALLOY REGISTRY' },
    { key: 'DIAL_COLOR', label: '6. DIAL COLOR & VELUM CORES' },
    { key: 'BEZEL_SHIELDS', label: '7. BEZEL FOCUS SHIELDS' },
    { key: 'STRAP_BINDINGS', label: '8. STRAP & BINDING OPTIONS' },
    { key: 'USER_CONFIGS', label: '9. USER SAVED CONFIGS' },
    { key: 'MARQUEE_CORE', label: '10. TICKERTAPE MARQUEE CORE' },
    { key: 'CARDS_INDEX', label: '11. CONTENT CARDS ORDER INDEX' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#edeae1] p-3 sm:p-6 md:p-10 text-black font-sans select-none overflow-y-auto">
      {/* Outer Brutalist Frame Card */}
      <div className="max-w-4xl mx-auto border-4 border-black bg-[#faf8f5] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-8 flex flex-col gap-6">
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black/20 pb-6">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Database size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] md:text-xs font-bold text-gray-700 tracking-wider uppercase">
                  CHRONO-RAID PROTOCOL CONSOLE
                </span>
                <span className="bg-emerald-100 border border-emerald-500 text-emerald-800 font-mono text-[9px] font-extrabold px-1.5 py-0.5 uppercase tracking-widest">
                  LIVE REGISTRY
                </span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-none uppercase mt-1">
                THE ARCHIVE DATABASE SCHEMA INTERFACE
              </h1>
            </div>
          </div>

          <button
            onClick={onExitDbMode}
            className="self-start md:self-center px-4 py-2 border-2 border-black bg-surface hover:bg-black hover:text-white transition-colors font-mono text-xs font-black tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <ArrowLeft size={14} strokeWidth={3} />
            GO TO CATALOG
          </button>
        </div>

        {/* RESET DATABASE BUTTON */}
        <div>
          <button
            onClick={handleReset}
            className="border-2 border-red-600 bg-surface hover:bg-red-50 text-red-600 transition-colors px-4 py-2.5 font-mono text-xs font-extrabold uppercase flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]"
          >
            <RotateCcw size={14} strokeWidth={2.5} />
            RESET ARCHIVE DATABASE
          </button>
        </div>

        {/* INTERACTIVE SECTION VISIBILITY TOGGLES */}
        <div className="border-2 border-black bg-surface-low p-4 flex flex-col gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
              ⚡ SECTION VISIBILITY TOGGLES (DATABASE PERSISTED)
            </span>
            <span className="font-mono text-[9px] bg-black text-white px-1.5 py-0.5 font-bold uppercase tracking-widest">
              LIVE STATE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {/* ADVENTURES TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => handleToggleSection('enableAdventuresSection')}
              className={`border-2 border-black p-3 flex items-center justify-between cursor-pointer font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] ${
                (fullDb.sectionToggles?.enableAdventuresSection ?? true)
                  ? 'bg-black text-white'
                  : 'bg-red-100 text-red-900 border-red-700'
              }`}
            >
              <span>[ADVENTURES]</span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-black ${
                  (fullDb.sectionToggles?.enableAdventuresSection ?? true)
                    ? 'bg-emerald-400 text-black'
                    : 'bg-red-600 text-white'
                }`}
              >
                {(fullDb.sectionToggles?.enableAdventuresSection ?? true)
                  ? 'ENABLED'
                  : 'DISABLED'}
              </span>
            </button>

            {/* RULEBOOKS TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => handleToggleSection('enableRulebooksSection')}
              className={`border-2 border-black p-3 flex items-center justify-between cursor-pointer font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] ${
                (fullDb.sectionToggles?.enableRulebooksSection ?? true)
                  ? 'bg-black text-white'
                  : 'bg-red-100 text-red-900 border-red-700'
              }`}
            >
              <span>[RULEBOOKS]</span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-black ${
                  (fullDb.sectionToggles?.enableRulebooksSection ?? true)
                    ? 'bg-emerald-400 text-black'
                    : 'bg-red-600 text-white'
                }`}
              >
                {(fullDb.sectionToggles?.enableRulebooksSection ?? true)
                  ? 'ENABLED'
                  : 'DISABLED'}
              </span>
            </button>

            {/* JUMP TO SECTION TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => handleToggleSection('enableJumpToSection')}
              className={`border-2 border-black p-3 flex items-center justify-between cursor-pointer font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] ${
                (fullDb.sectionToggles?.enableJumpToSection ?? true)
                  ? 'bg-black text-white'
                  : 'bg-red-100 text-red-900 border-red-700'
              }`}
            >
              <span>[JUMP TO SECTION]</span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-black ${
                  (fullDb.sectionToggles?.enableJumpToSection ?? true)
                    ? 'bg-emerald-400 text-black'
                    : 'bg-red-600 text-white'
                }`}
              >
                {(fullDb.sectionToggles?.enableJumpToSection ?? true)
                  ? 'ENABLED'
                  : 'DISABLED'}
              </span>
            </button>

            {/* CATEGORY FILTER BAR TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => handleToggleSection('enableCategoryFilterBar')}
              className={`border-2 border-black p-3 flex items-center justify-between cursor-pointer font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] ${
                (fullDb.sectionToggles?.enableCategoryFilterBar ?? false)
                  ? 'bg-black text-white'
                  : 'bg-red-100 text-red-900 border-red-700'
              }`}
            >
              <span>[CATEGORY FILTERS]</span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-black ${
                  (fullDb.sectionToggles?.enableCategoryFilterBar ?? false)
                    ? 'bg-emerald-400 text-black'
                    : 'bg-red-600 text-white'
                }`}
              >
                {(fullDb.sectionToggles?.enableCategoryFilterBar ?? false)
                  ? 'ENABLED'
                  : 'DISABLED'}
              </span>
            </button>

            {/* NEW BADGES TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => handleToggleSection('enableNewBadges')}
              className={`border-2 border-black p-3 flex items-center justify-between cursor-pointer font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] ${
                (fullDb.sectionToggles?.enableNewBadges ?? true)
                  ? 'bg-black text-white'
                  : 'bg-red-100 text-red-900 border-red-700'
              }`}
            >
              <span>[NEW BADGES]</span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-black ${
                  (fullDb.sectionToggles?.enableNewBadges ?? true)
                    ? 'bg-emerald-400 text-black'
                    : 'bg-red-600 text-white'
                }`}
              >
                {(fullDb.sectionToggles?.enableNewBadges ?? true)
                  ? 'ENABLED'
                  : 'DISABLED'}
              </span>
            </button>
          </div>
        </div>

        {/* SECTION HEADER */}
        <div className="font-mono text-xs font-bold text-gray-600 tracking-wider">
          // SELECT SCHEMA COMPONENT:
        </div>

        {/* SCHEMA SELECTOR BUTTONS */}
        <div className="flex flex-col gap-2.5">
          {/* Full Archive Schema Button */}
          <button
            onClick={() => setSelectedComponent('FULL_SCHEMA')}
            className={`w-full border-2 border-black p-3.5 text-left font-mono text-xs md:text-sm font-black uppercase flex items-center justify-between cursor-pointer transition-all ${
              selectedComponent === 'FULL_SCHEMA'
                ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]'
                : 'bg-surface hover:bg-surface-low text-black'
            }`}
          >
            <span>[FULL ARCHIVE SCHEMA]</span>
            <span className="font-mono font-extrabold text-xs">&gt;_</span>
          </button>

          {/* Individual Schema Components */}
          {schemaComponentsList.map((comp) => {
            const isSelected = selectedComponent === comp.key;
            return (
              <button
                key={comp.key}
                onClick={() => setSelectedComponent(comp.key)}
                className={`w-full border-2 border-black p-3 text-left font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]'
                    : 'bg-surface hover:bg-surface-low text-black'
                }`}
              >
                {comp.label}
              </button>
            );
          })}
        </div>

        {/* CODE EDITOR / INSPECTOR CONTAINER */}
        <div className="border-2 border-black bg-[#0c100d] text-emerald-400 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
          {/* Code Bar Header */}
          <div className="p-3 bg-[#141a15] border-b border-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <Code size={14} className="text-emerald-500" />
              <span>&lt;/&gt; ARCHIVE-PROTOCOL-SCHEMA.JSON</span>
            </div>
            <span className="border border-red-600 bg-red-950/80 text-red-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">
              REAL-TIME INTENSITY ACTIVE
            </span>
          </div>

          {/* Editable JSON Textarea */}
          <textarea
            value={jsonText}
            onChange={handleJsonChange}
            spellCheck={false}
            className="w-full h-80 bg-transparent text-emerald-400 font-mono text-xs p-3.5 focus:outline-none resize-y leading-relaxed selection:bg-emerald-800 selection:text-white"
          />

          {/* Syntax Validation Status Bar */}
          <div
            className={`p-2.5 text-xs font-mono font-bold flex items-center gap-2 border-t ${
              syntaxError
                ? 'bg-red-950 text-red-200 border-red-700'
                : 'bg-emerald-950/90 text-emerald-300 border-emerald-800'
            }`}
          >
            {syntaxError ? (
              <>
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <span className="truncate">✕ SYNTAX ERROR: {syntaxError}</span>
              </>
            ) : (
              <>
                <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                <span>
                  ✓ SYNTAX IS VALID: Database parsing active. Live feedback
                  secured.
                </span>
              </>
            )}
          </div>
        </div>

        {/* SAVE SUCCESS NOTIFICATION */}
        {savedSuccess && (
          <div className="p-3 bg-emerald-100 border-2 border-emerald-700 text-emerald-900 font-mono text-xs font-bold flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-700" />
            <span>Database state successfully coupled! Catalog is synced.</span>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex-1 border-2 border-black bg-white hover:bg-gray-100 text-black transition-colors py-3 px-4 font-mono text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            {copied ? (
              <Check size={16} className="text-emerald-600" />
            ) : (
              <Copy size={16} />
            )}
            {copied ? 'COPIED TO CLIPBOARD' : 'COPY JSON'}
          </button>

          <button
            onClick={handleSave}
            disabled={!!syntaxError}
            className={`flex-1 border-2 border-black py-3.5 px-4 font-mono text-xs font-black uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
              syntaxError
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-60'
                : 'bg-black text-white hover:bg-gray-900'
            }`}
          >
            <Save size={16} />
            SAVE & COUPLE DATABASE
          </button>
        </div>
      </div>
    </div>
  );
}
