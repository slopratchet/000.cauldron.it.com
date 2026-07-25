import React, { useState, useEffect } from 'react';
import {
  Database,
  RotateCcw,
  ArrowLeft,
  Copy,
  Save,
  Check,
  AlertCircle,
  Terminal,
  Code,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  Eye,
  EyeOff,
} from 'lucide-react';
import { TomeEntry, MainContentVisibility } from './configTypes';
import { initialEntries } from './initialData';

interface DatabaseSchemaViewProps {
  customEntries: TomeEntry[];
  setCustomEntries: React.Dispatch<React.SetStateAction<TomeEntry[]>>;
  entryLabelOverrides?: Record<string, Partial<TomeEntry>>;
  setEntryLabelOverrides?: React.Dispatch<
    React.SetStateAction<Record<string, Partial<TomeEntry>>>
  >;
  sectionVisibility: MainContentVisibility;
  setSectionVisibility: React.Dispatch<
    React.SetStateAction<MainContentVisibility>
  >;
  onGoToCatalog: () => void;
  darkMode: boolean;
  soundEnabled: boolean;
  inkLevel: number;
}

export default function DatabaseSchemaView({
  customEntries,
  setCustomEntries,
  entryLabelOverrides = {},
  setEntryLabelOverrides,
  sectionVisibility,
  setSectionVisibility,
  onGoToCatalog,
  darkMode,
  soundEnabled,
  inkLevel,
}: DatabaseSchemaViewProps) {
  // Combine all entries with active label overrides for database model
  const rawEntries = [...customEntries, ...initialEntries];
  const allEntries = rawEntries.map((e) => ({
    ...e,
    ...(entryLabelOverrides[e.id] || {}),
  }));

  // Helper to build the full database schema object
  const buildFullSchema = (entries: TomeEntry[]) => {
    const grimoireItems = entries.filter(
      (e) => e.type === 'spell' || e.type === 'class',
    );

    return {
      meta: {
        app_id: 'the-archive-protocol',
        name: 'Camp Candor - Catalog',
        description:
          'High-fidelity catalog and design customizer for The Archive Protocol watch collections.',
        version: '1.10',
        registry_status: 'TITAN-FORGED COOLDOWN SYSTEM ACCESS ACTIVE',
        server_time: '2026-07-21T06:10:35-07:00',
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
        active_custom_labels: {
          countdown_timer_label: 'INCREASE RUN TIME',
          mythrokahn_primary_button: 'Stir Cauldron',
          mythrokahn_secondary_button: 'Study Chemicals',
          grimoire_action_button: 'Jumbo Plus',
        },
      },
      catalog_identity_and_status: {
        total_records: entries.length,
        system_integrity: '100%',
        active_session: 'CHRONO-RAID PROTOCOL',
        dark_mode_enabled: darkMode,
        audio_synthesizer_active: soundEnabled,
        ink_level: `${inkLevel}%`,
      },
      main_content_sections_visibility: {
        '00. Navigation Tabs Bar': sectionVisibility.navigation_tabs,
        '01. Campaign Setting': sectionVisibility.campaign_setting,
        '01. Grimoire of Campaigns': sectionVisibility.grimoire_of_campaigns,
        '03. Adventures of the Void': sectionVisibility.adventures_of_the_void,
        '04. Ancient Encounters': sectionVisibility.ancient_encounters,
        navigation_tabs: sectionVisibility.navigation_tabs,
        campaign_setting: sectionVisibility.campaign_setting,
        grimoire_of_campaigns: sectionVisibility.grimoire_of_campaigns,
        adventures_of_the_void: sectionVisibility.adventures_of_the_void,
        ancient_encounters: sectionVisibility.ancient_encounters,
      },
      campaign_setting_inventory: entries
        .filter((e) => e.type === 'class')
        .map((e) => ({
          ...e,
          primaryButtonLabel:
            e.primaryButtonLabel ||
            (e.name.toLowerCase().includes('mythrokahn')
              ? 'Stir Cauldron'
              : 'Experience Setting'),
          secondaryButtonLabel:
            e.secondaryButtonLabel ||
            (e.name.toLowerCase().includes('mythrokahn')
              ? 'Study Chemicals'
              : 'Configure Campaign'),
          countdownTimerLabel:
            e.countdownTimerLabel ||
            (e.name.toLowerCase().includes('mythrokahn')
              ? 'setting stirred'
              : '[ INCREASE RUN TIME ]'),
        })),
      grimoire_spells_specifications: entries
        .filter((e) => e.type === 'spell')
        .map((e) => ({
          ...e,
          primaryButtonLabel: e.primaryButtonLabel || 'Experience Setting',
          secondaryButtonLabel: e.secondaryButtonLabel || 'Configure Campaign',
          countdownTimerLabel: e.countdownTimerLabel || '[ INCREASE RUN TIME ]',
        })),
      grimoire_campaigns_content_items_labels: grimoireItems.map((e) => ({
        id: e.id,
        name: e.name,
        type: e.type,
        primaryButtonLabel:
          e.primaryButtonLabel ||
          (e.name.toLowerCase().includes('mythrokahn')
            ? 'Stir Cauldron'
            : 'Experience Setting'),
        secondaryButtonLabel:
          e.secondaryButtonLabel ||
          (e.name.toLowerCase().includes('mythrokahn')
            ? 'Study Chemicals'
            : 'Configure Campaign'),
        countdownTimerLabel:
          e.countdownTimerLabel ||
          (e.name.toLowerCase().includes('mythrokahn')
            ? 'setting stirred'
            : '[ INCREASE RUN TIME ]'),
      })),
      bestiary_of_void_registry: entries.filter((e) => e.type === 'beast'),
      relics_and_artifact_cores: entries.filter((e) => e.type === 'relic'),
      user_scribed_entries: entries.filter((e) => e.isCustom),
      tickertape_marquee_core: [
        'LIVE REGISTRY ACTIVE',
        'SYSTEM HEALTH: 100%',
        'FORBIDDEN SPELLS UNLOCKED',
        'CHRONO-RAID READY',
      ],
      user_configs_and_preferences: {
        theme: darkMode ? 'dark' : 'light',
        soundEnabled,
        inkLevel,
        enabled_main_content_sections: {
          '00. Navigation Tabs Bar': sectionVisibility.navigation_tabs,
          '01. Campaign Setting': sectionVisibility.campaign_setting,
          '01. Grimoire of Campaigns': sectionVisibility.grimoire_of_campaigns,
          '03. Adventures of the Void':
            sectionVisibility.adventures_of_the_void,
          '04. Ancient Encounters': sectionVisibility.ancient_encounters,
        },
        active_custom_labels: {
          countdown_timer_label: 'INCREASE RUN TIME',
          mythrokahn_primary_button: 'Stir Cauldron',
          mythrokahn_secondary_button: 'Study Chemicals',
          grimoire_action_button: 'Jumbo Plus',
        },
        storageKey: 'the_tome_custom_entries',
      },
      content_cards_order_index: entries.map((e, idx) => ({
        index: idx + 1,
        id: e.id,
        name: e.name,
        type: e.type,
      })),
    };
  };

  const [selectedComponent, setSelectedComponent] = useState<string>('full');
  const [jsonText, setJsonText] = useState<string>('');
  const [isValidJson, setIsValidJson] = useState<boolean>(true);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Get current JSON slice based on selected component
  const getComponentJsonData = (componentKey: string) => {
    const full = buildFullSchema(allEntries);
    switch (componentKey) {
      case '1':
        return full.meta;
      case '2':
        return full.catalog_identity_and_status;
      case '3':
        return full.campaign_setting_inventory;
      case '4':
        return full.grimoire_spells_specifications;
      case '5':
        return full.bestiary_of_void_registry;
      case '6':
        return full.relics_and_artifact_cores;
      case '7':
        return full.user_scribed_entries;
      case '8':
        return full.tickertape_marquee_core;
      case '9':
        return full.user_configs_and_preferences;
      case '10':
        return full.content_cards_order_index;
      case '11':
        return full.main_content_sections_visibility;
      case '12':
        return full.grimoire_campaigns_content_items_labels;
      default:
        return full;
    }
  };

  // Update editor text when selected component or underlying entries change
  useEffect(() => {
    const data = getComponentJsonData(selectedComponent);
    setJsonText(JSON.stringify(data, null, 2));
    setIsValidJson(true);
  }, [
    selectedComponent,
    customEntries,
    sectionVisibility,
    entryLabelOverrides,
  ]);

  // Handle JSON editing
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJsonText(text);
    try {
      JSON.parse(text);
      setIsValidJson(true);
    } catch {
      setIsValidJson(false);
    }
  };

  // Copy JSON to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Toggle individual section visibility directly
  const toggleSection = (key: keyof MainContentVisibility) => {
    const updated = {
      ...sectionVisibility,
      [key]: !sectionVisibility[key],
    };
    setSectionVisibility(updated);
    localStorage.setItem(
      'the_tome_section_visibility',
      JSON.stringify(updated),
    );
    setSaveNotification(`MAIN CONTENT SECTION PARAMS UPDATED!`);
    setTimeout(() => setSaveNotification(null), 3000);
  };

  // Save & Apply Database
  const handleSaveAndApply = () => {
    try {
      const parsed = JSON.parse(jsonText);

      // Check if section visibility object is present in parsed JSON
      const visObj =
        parsed.main_content_sections_visibility ||
        parsed.enabled_main_content_sections ||
        parsed.visible_main_content ||
        (selectedComponent === '11' ? parsed : null);

      if (visObj && typeof visObj === 'object') {
        const newVis = { ...sectionVisibility };
        if (visObj.navigation_tabs !== undefined)
          newVis.navigation_tabs = Boolean(visObj.navigation_tabs);
        if (visObj['00. Navigation Tabs Bar'] !== undefined)
          newVis.navigation_tabs = Boolean(visObj['00. Navigation Tabs Bar']);

        if (visObj.campaign_setting !== undefined)
          newVis.campaign_setting = Boolean(visObj.campaign_setting);
        if (visObj['01. Campaign Setting'] !== undefined)
          newVis.campaign_setting = Boolean(visObj['01. Campaign Setting']);

        if (visObj.grimoire_of_campaigns !== undefined)
          newVis.grimoire_of_campaigns = Boolean(visObj.grimoire_of_campaigns);
        if (visObj['01. Grimoire of Campaigns'] !== undefined)
          newVis.grimoire_of_campaigns = Boolean(
            visObj['01. Grimoire of Campaigns'],
          );

        if (visObj.adventures_of_the_void !== undefined)
          newVis.adventures_of_the_void = Boolean(
            visObj.adventures_of_the_void,
          );
        if (visObj['03. Adventures of the Void'] !== undefined)
          newVis.adventures_of_the_void = Boolean(
            visObj['03. Adventures of the Void'],
          );

        if (visObj.ancient_encounters !== undefined)
          newVis.ancient_encounters = Boolean(visObj.ancient_encounters);
        if (visObj['04. Ancient Encounters'] !== undefined)
          newVis.ancient_encounters = Boolean(visObj['04. Ancient Encounters']);

        setSectionVisibility(newVis);
        localStorage.setItem(
          'the_tome_section_visibility',
          JSON.stringify(newVis),
        );
      }

      // Extract and update dynamic item labels across any saved JSON slice
      let itemsToUpdate: any[] = [];
      if (Array.isArray(parsed)) {
        itemsToUpdate = parsed;
      } else if (typeof parsed === 'object' && parsed !== null) {
        if (Array.isArray(parsed.grimoire_campaigns_content_items_labels)) {
          itemsToUpdate.push(...parsed.grimoire_campaigns_content_items_labels);
        }
        if (Array.isArray(parsed.grimoire_spells_specifications)) {
          itemsToUpdate.push(...parsed.grimoire_spells_specifications);
        }
        if (Array.isArray(parsed.campaign_setting_inventory)) {
          itemsToUpdate.push(...parsed.campaign_setting_inventory);
        }
        if (Array.isArray(parsed.user_scribed_entries)) {
          itemsToUpdate.push(...parsed.user_scribed_entries);
        }
      }

      if (itemsToUpdate.length > 0 && setEntryLabelOverrides) {
        const newOverrides: Record<string, Partial<TomeEntry>> = {
          ...entryLabelOverrides,
        };
        itemsToUpdate.forEach((item) => {
          if (item && item.id) {
            newOverrides[item.id] = {
              ...(newOverrides[item.id] || {}),
              ...(item.primaryButtonLabel !== undefined && {
                primaryButtonLabel: item.primaryButtonLabel,
              }),
              ...(item.secondaryButtonLabel !== undefined && {
                secondaryButtonLabel: item.secondaryButtonLabel,
              }),
              ...(item.countdownTimerLabel !== undefined && {
                countdownTimerLabel: item.countdownTimerLabel,
              }),
              ...(item.name !== undefined && { name: item.name }),
              ...(item.description !== undefined && {
                description: item.description,
              }),
            };
          }
        });
        setEntryLabelOverrides(newOverrides);
      }

      if (selectedComponent === 'full') {
        const scribed = parsed.user_scribed_entries || [];
        setCustomEntries(scribed);
      } else if (selectedComponent === '7') {
        if (Array.isArray(parsed)) {
          setCustomEntries(parsed);
        }
      }
      setSaveNotification('DATABASE APPLIED & SYNCHRONIZED SUCCESSFULLY!');
      setTimeout(() => setSaveNotification(null), 3000);
    } catch (err) {
      alert('Invalid JSON format! Please fix syntax errors before applying.');
    }
  };

  // Reset Database
  const handleResetDatabase = () => {
    if (
      window.confirm(
        'Are you sure you want to reset the Archive Database to factory defaults?',
      )
    ) {
      localStorage.removeItem('the_tome_custom_entries');
      localStorage.removeItem('the_tome_section_visibility');
      localStorage.removeItem('the_tome_entry_label_overrides');
      setCustomEntries([]);
      if (setEntryLabelOverrides) {
        setEntryLabelOverrides({});
      }
      const defaultVis: MainContentVisibility = {
        campaign_setting: true,
        grimoire_of_campaigns: true,
        adventures_of_the_void: true,
        ancient_encounters: true,
        navigation_tabs: true,
      };
      setSectionVisibility(defaultVis);
      setSaveNotification('DATABASE RESET TO INITIAL SCHEMA FACTORY DEFAULTS');
      setTimeout(() => setSaveNotification(null), 3000);
    }
  };

  const schemaComponents = [
    { id: '1', label: '1. CATALOG IDENTITY & STATUS' },
    { id: '2', label: '2. SYSTEM & SESSION STATE' },
    { id: '3', label: '3. CAMPAIGN SETTING INVENTORY' },
    { id: '4', label: '4. GRIMOIRE SPELLS SPECIFICATIONS' },
    { id: '5', label: '5. BESTIARY OF VOID REGISTRY' },
    { id: '6', label: '6. RELICS & ARTIFACT CORES' },
    { id: '7', label: '7. USER SCRIBED ENTRIES' },
    { id: '8', label: '8. TICKERTAPE MARQUEE CORE' },
    { id: '9', label: '9. USER CONFIGS & PREFERENCES' },
    { id: '10', label: '10. CONTENT CARDS ORDER INDEX' },
    { id: '11', label: '11. MAIN CONTENT SECTIONS VISIBILITY' },
    {
      id: '12',
      label: '12. DYNAMIC CONTENT ITEM LABELS ([01. GRIMOIRE OF CAMPAIGNS])',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f2ebd9] dark:bg-zinc-950 p-2 sm:p-6 lg:p-10 font-sans text-primary dark:text-zinc-100 flex justify-center items-start">
      {/* Main Console Box Frame */}
      <div className="w-full max-w-4xl bg-[#faf8f2] dark:bg-zinc-900 border-4 sm:border-8 border-black dark:border-zinc-100 shadow-[10px_10px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_rgba(255,255,255,0.2)] p-4 sm:p-8 flex flex-col gap-6 relative">
        {/* Header Notification Banner if saved */}
        {saveNotification && (
          <div className="bg-emerald-600 text-white font-mono text-xs font-bold uppercase p-3 border-2 border-black flex items-center justify-between animate-pulse">
            <span>✓ {saveNotification}</span>
            <button
              onClick={() => setSaveNotification(null)}
              className="text-white hover:text-black font-black cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Console Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-black dark:border-white pb-6">
          <div className="flex items-center gap-3">
            {/* Database Icon Box */}
            <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 border-2 border-black">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                  CHRONO-RAID PROTOCOL CONSOLE
                </span>
                <span className="border border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-sm">
                  LIVE REGISTRY
                </span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-none text-black dark:text-white">
                THE ARCHIVE DATABASE SCHEMA INTERFACE
              </h1>
            </div>
          </div>

          {/* Go to Catalog button */}
          <button
            onClick={onGoToCatalog}
            className="border-2 border-black dark:border-white bg-white dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white text-xs font-mono font-bold uppercase px-4 py-2.5 flex items-center gap-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_rgba(255,255,255,1)] transition-all cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            GO TO CATALOG
          </button>
        </div>

        {/* Reset Database Button */}
        <div>
          <button
            onClick={handleResetDatabase}
            className="border-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white text-xs sm:text-sm font-mono font-black uppercase py-2.5 px-5 flex items-center gap-2 shadow-[3px_3px_0px_rgba(220,38,38,1)] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            RESET ARCHIVE DATABASE
          </button>
        </div>

        {/* Interactive Main Content Sections Toggle Panel */}
        <div className="border-2 border-black dark:border-white bg-amber-500/10 dark:bg-amber-950/30 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-black dark:text-white" />
            <span className="font-mono text-xs uppercase font-black tracking-widest text-black dark:text-white">
              // MAIN CONTENT SECTIONS DATABASE TOGGLES (LIVE SCHEMATIC
              PARAMETERS):
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => toggleSection('navigation_tabs')}
              className={`col-span-1 sm:col-span-2 border-2 border-black dark:border-white p-2.5 font-mono text-xs font-bold uppercase flex justify-between items-center transition-all cursor-pointer ${
                sectionVisibility.navigation_tabs
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-900/80 text-red-100 border-red-600'
              }`}
            >
              <span>[ 00. GLOBAL NAVIGATION TABS BAR ]</span>
              <span className="flex items-center gap-1 font-extrabold text-[10px]">
                {sectionVisibility.navigation_tabs ? (
                  <>
                    <Eye className="w-3.5 h-3.5" /> ENABLED
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> REMOVED / DISABLED
                  </>
                )}
              </span>
            </button>

            <button
              onClick={() => toggleSection('campaign_setting')}
              className={`border-2 border-black dark:border-white p-2.5 font-mono text-xs font-bold uppercase flex justify-between items-center transition-all cursor-pointer ${
                sectionVisibility.campaign_setting
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-900/80 text-red-100 border-red-600'
              }`}
            >
              <span>[ 01. CAMPAIGN SETTING ]</span>
              <span className="flex items-center gap-1 font-extrabold text-[10px]">
                {sectionVisibility.campaign_setting ? (
                  <>
                    <Eye className="w-3.5 h-3.5" /> ENABLED
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> REMOVED
                  </>
                )}
              </span>
            </button>

            <button
              onClick={() => toggleSection('grimoire_of_campaigns')}
              className={`border-2 border-black dark:border-white p-2.5 font-mono text-xs font-bold uppercase flex justify-between items-center transition-all cursor-pointer ${
                sectionVisibility.grimoire_of_campaigns
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-900/80 text-red-100 border-red-600'
              }`}
            >
              <span>[ 01. GRIMOIRE OF CAMPAIGNS ]</span>
              <span className="flex items-center gap-1 font-extrabold text-[10px]">
                {sectionVisibility.grimoire_of_campaigns ? (
                  <>
                    <Eye className="w-3.5 h-3.5" /> ENABLED
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> REMOVED
                  </>
                )}
              </span>
            </button>

            <button
              onClick={() => toggleSection('adventures_of_the_void')}
              className={`border-2 border-black dark:border-white p-2.5 font-mono text-xs font-bold uppercase flex justify-between items-center transition-all cursor-pointer ${
                sectionVisibility.adventures_of_the_void
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-900/80 text-red-100 border-red-600'
              }`}
            >
              <span>[ 03. ADVENTURES OF THE VOID ]</span>
              <span className="flex items-center gap-1 font-extrabold text-[10px]">
                {sectionVisibility.adventures_of_the_void ? (
                  <>
                    <Eye className="w-3.5 h-3.5" /> ENABLED
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> REMOVED
                  </>
                )}
              </span>
            </button>

            <button
              onClick={() => toggleSection('ancient_encounters')}
              className={`border-2 border-black dark:border-white p-2.5 font-mono text-xs font-bold uppercase flex justify-between items-center transition-all cursor-pointer ${
                sectionVisibility.ancient_encounters
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-900/80 text-red-100 border-red-600'
              }`}
            >
              <span>[ 04. ANCIENT ENCOUNTERS ]</span>
              <span className="flex items-center gap-1 font-extrabold text-[10px]">
                {sectionVisibility.ancient_encounters ? (
                  <>
                    <Eye className="w-3.5 h-3.5" /> ENABLED
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> REMOVED
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-300 dark:border-zinc-700 my-1" />

        {/* Select Schema Component Section */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-zinc-600 dark:text-zinc-400">
            // SELECT SCHEMA COMPONENT:
          </span>

          {/* Full Archive Schema button */}
          <button
            onClick={() => setSelectedComponent('full')}
            className={`border-2 border-black dark:border-white px-4 py-3 font-mono text-xs sm:text-sm font-black uppercase w-full flex justify-between items-center tracking-wider transition-all cursor-pointer ${
              selectedComponent === 'full'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-[4px_4px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black dark:bg-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
          >
            <span>[FULL ARCHIVE SCHEMA]</span>
            <span className="flex items-center gap-1 font-mono text-xs">
              &gt;_
            </span>
          </button>

          {/* Numbered Components List */}
          <div className="grid grid-cols-1 gap-2">
            {schemaComponents.map((comp) => {
              const isSelected = selectedComponent === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedComponent(comp.id)}
                  className={`border-2 border-black dark:border-white px-4 py-2.5 font-mono text-xs sm:text-sm font-bold uppercase w-full text-left tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-black dark:bg-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700'
                  }`}
                >
                  {comp.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Code / JSON Schema Box */}
        <div className="border-2 border-black dark:border-white bg-[#0e1713] dark:bg-black rounded-none overflow-hidden flex flex-col shadow-[6px_6px_0px_rgba(0,0,0,1)]">
          {/* Code box header */}
          <div className="bg-black/90 dark:bg-zinc-900 border-b border-zinc-800 p-3 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <Code className="w-4 h-4 text-emerald-400" />
              <span>&lt;/&gt; ARCHIVE-PROTOCOL-SCHEMA.JSON</span>
            </div>
            <div className="border border-red-500/80 text-red-500 bg-red-950/40 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm">
              REAL-TIME INTENSITY ACTIVE
            </div>
          </div>

          {/* Textarea for JSON */}
          <textarea
            value={jsonText}
            onChange={handleJsonChange}
            spellCheck={false}
            className="w-full h-96 p-4 bg-[#0e1713] dark:bg-black text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y border-none"
          />

          {/* Validation Status Footer */}
          <div
            className={`p-3 font-mono text-xs font-bold flex items-center gap-2 border-t ${
              isValidJson
                ? 'bg-[#132c20] text-emerald-300 border-emerald-600'
                : 'bg-[#381111] text-red-300 border-red-600'
            }`}
          >
            {isValidJson ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  ✓ SYNTAX IS VALID: Database parsing active. Live feedback
                  secured.
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  ✕ SYNTAX ERROR: Invalid JSON structure detected. Fix syntax to
                  enable saving.
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Copy JSON button */}
          <button
            onClick={handleCopy}
            className="flex-1 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-black dark:text-white font-mono text-xs sm:text-sm font-black uppercase py-3.5 px-4 flex justify-center items-center gap-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            {copySuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>COPIED TO CLIPBOARD!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>[ 📋 COPY JSON ]</span>
              </>
            )}
          </button>

          {/* Save & Apply Database button */}
          <button
            onClick={handleSaveAndApply}
            disabled={!isValidJson}
            className={`flex-1 border-2 border-black dark:border-white font-mono text-xs sm:text-sm font-black uppercase py-3.5 px-4 flex justify-center items-center gap-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
              isValidJson
                ? 'bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200'
                : 'bg-zinc-400 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed opacity-60'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>[ 💾 SAVE & APPLY DATABASE ]</span>
          </button>
        </div>
      </div>
    </div>
  );
}
