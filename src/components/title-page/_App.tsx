/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  ZoomIn,
  Share2,
  Plus,
  Minus,
  ChevronRight,
  X,
  Check,
  Sparkles,
  FileText,
  BookOpen,
  ArrowUpCircle,
  Users,
  Star,
  Terminal as TerminalIcon,
  Clock,
  AlertTriangle,
  Download,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  Database,
  Copy,
  Save,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PRODUCT_PRIMARY_IMAGE,
  PRODUCT_IMAGES,
  SUBCLASSES,
  SPELLS,
  MONSTERS,
  MAGIC_ITEMS,
  SPECIFICATIONS,
  TABLE_OF_CONTENTS,
} from './data';
import {
  PreOrderData,
  Subclass,
  Spell,
  Monster,
  MagicItem,
  ArchivalIndexNode,
} from './types';

const DEFAULT_ARCHIVAL_NODES: ArchivalIndexNode[] = [
  {
    id: 'mythrokahn',
    label: 'MYTHROKAHN',
    url: 'https://mythrokahn.com',
    enabled: true,
    description: 'Primary World Bible & Arcane Catalog Node',
  },
  {
    id: 'slopratchet',
    label: 'SLOPRATCHET',
    url: 'https://slopratchet.com',
    enabled: true,
    description: 'Swamp Sector 7 Navigation Grid & Hardware',
  },
  {
    id: 'prfctbe3ng',
    label: 'PRFCTBE3NG',
    url: 'https://prfctbe3ng.com',
    enabled: true,
    description: 'Heterocosm Cybernetic Entity Archives',
  },
  {
    id: 'blessed-and-bounded',
    label: 'BLESSED & THE BOUNDED',
    url: 'https://blessedandbounded.com',
    enabled: true,
    description: 'CAA Charter Syndicate & Guild Registry',
  },
];

function getNormalizedArchivalNodes(dbData: any): ArchivalIndexNode[] {
  const rawNodes =
    dbData?.navigation?.archival_index_nodes ||
    dbData?.navigation?.categories ||
    dbData?.archival_index_nodes;

  if (Array.isArray(rawNodes) && rawNodes.length > 0) {
    return rawNodes.map((item: any, idx: number) => {
      if (typeof item === 'string') {
        return {
          id: `node-${idx}-${item.toLowerCase().replace(/\s+/g, '-')}`,
          label: item,
          url: `https://${item.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
          enabled: true,
        };
      }
      return {
        id: item.id || `node-${idx}`,
        label: item.label || item.name || item.title || `Node ${idx + 1}`,
        url:
          item.url ||
          item.link ||
          item.href ||
          `https://${(item.label || 'node').toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        enabled:
          item.enabled !== undefined
            ? Boolean(item.enabled)
            : item.active !== undefined
              ? Boolean(item.active)
              : true,
        description: item.description,
      };
    });
  }
  return DEFAULT_ARCHIVAL_NODES;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  FileText,
  BookOpen,
  ArrowUpCircle,
  Users,
  Star,
  Sparkles,
  Clock,
  Database,
  Terminal: TerminalIcon,
  ShieldAlert,
};

function renderBentoIcon(
  iconName?: string,
  symbol?: string,
  FallbackIcon?: React.ComponentType<any>,
) {
  if (symbol) {
    return (
      <div className="text-4xl font-mono font-black text-brand-primary mb-2">
        {symbol}
      </div>
    );
  }
  if (iconName && ICON_MAP[iconName]) {
    const IconComp = ICON_MAP[iconName];
    return (
      <IconComp className="w-12 h-12 stroke-[1.5] text-brand-primary mb-2" />
    );
  }
  if (FallbackIcon) {
    return (
      <FallbackIcon className="w-12 h-12 stroke-[1.5] text-brand-primary mb-2" />
    );
  }
  return (
    <FileText className="w-12 h-12 stroke-[1.5] text-brand-primary mb-2" />
  );
}

const INITIAL_DATABASE_SCHEMA = {
  meta: {
    app_id: 'the-archive-protocol',
    name: 'Mythrokahn - Alligator Alley Franchise Bible',
    description:
      'High-fidelity catalog and design customizer for The Archive Protocol watch collections.',
    version: '1.10',
    registry_status: 'TITAN-FORGED COOLDOWN SYSTEM ACCESS ACTIVE',
    server_time: '2026-07-21T06:10:35-07:00',
    stable_servers: true,
    station_no: 'CO-001',
    modalFieldManualHeader: 'FIELD OPERATIONS MANUAL (SECURE ENTRY)',
    modalAuthenticStatusHeader: 'AUTHENTIC CHRONOMETER STATUS',
    modalAuthenticStatusText:
      'COSC certified. Inspected under high vacuum conditions. Tested for 600 hours.',
    modalStatsMatrixHeader: 'ARTIFACT STATS & SPECIFICATION MATRIX',
    modalChecksumText: 'CHECKSUM: OK',
    labelCaseDiameter: 'ITEM LEVEL (iLvl)',
    labelMaterial: 'FORGED MATERIAL',
    labelWaterResistance: 'DUNGEON ATTUNEMENT',
    show_campaign_settings_menu: true,
  },
  navigation: {
    show_campaign_settings_menu: true,
    campaign_settings_label: 'CAMPAIGN SETTINGS',
    archival_index_nodes_header: 'ARCHIVAL INDEX NODES',
    archival_index_nodes: DEFAULT_ARCHIVAL_NODES,
    categories: DEFAULT_ARCHIVAL_NODES,
  },
  catalog_identity: {
    product_name: 'Mythrokahn (v1.0)',
    tagline: 'Alligator Alley Franchise Bible & World-Building Protocol',
    publisher: 'Camp Candor Third Authority (CA3A)',
    edition: 'Deluxe Smyth-Sewn Leather Tome',
    base_price: 2903.76,
    clearance_status: 'Approved',
    terminal_title: 'COMPLETE CAMPAIGN LENGTH TERMINAL',
    release_status_badge: 'PRE-RELEASE STATUS',
    release_countdown: { days: 30, hours: 3, minutes: 3, seconds: 55 },
    charter_seal_header: '5th Edition',
    charter_seal_title: 'D and D Compatible',
    charter_seal_subtitle: '5th Edition D and D compatible',
    narrative_charter:
      'This document charters the official Alligator Alley Franchise Bible & World-Building Protocol. Recognizing the critical need for canonical consistency, this Codex serves as the indispensable operational imperative and the single, authoritative source of truth (SSoT) for the entire transmedia IP development.',
    absolute_canon: 'NO BEEF, ALLIGATOR TAIL',
    deluxe_includes_title: 'THE DELUXE FRANCHISE BIBLE & CODEX INCLUDES:',
    deluxe_bullet_points: [
      {
        bold: 'Core World Identity & Foundational Modalities',
        text: ', defining the absolute absence of bovine biological elements, the social dominance of alligator tail gastronomy, and Doležel’s authentication metrics.',
      },
      {
        bold: 'Key Factions, Casts, and Social Guilds',
        text: ', profiling the Alligator Tail Culinary Guild, the Swamp Rangers, and the outlaw heretics smuggling artificial beef.',
      },
      {
        bold: 'Swamp Tyrant Bestiary specifications',
        text: ', listing biological traits, capture protocols, and threat classes for colossal reptilian apex predators like the Crimson Tail Giga-Gator.',
      },
      {
        bold: 'Pre-order Digital Lockboxes',
        text: ': Immediate secure Confluence Wiki Access, a high-resolution Transmedia Concept Art Pack, and the CAA Sandbox Campaign Module.',
      },
    ],
  },
  pricing_mechanisms: {
    base_price: 2903.76,
    hourly_rate: 3.99,
    base_flat_fee: 15.0,
    use_dynamic_countdown_price: false,
    free_shipping_threshold: 250.0,
    flat_shipping_rate: 15.0,
    sales_tax_rate: 0.085,
    tax_label: 'Arcane Registry Tax (8.5%)',
    character_slots_label: 'CHARACTER',
    character_slots_per_unit: 3,
    slots_per_row: 20,
    order_button_label: 'ORDER CAMPAIGN NOW',
    include_tax_and_shipping_in_button_total: false,
    printed_world_book_fee: 30.0,
    printed_world_book_label: 'Printed World Setting Book',
  },
  world_building_registry: {
    section_title:
      'Archival Codex Registry & World-Building Modules [Interactive Grid]',
    section_subtitle: 'CLICK ANY COMPONENT BOX TO OPEN THE CODEX ARCHIVE',
    seal_module: {
      header: '5th Edition',
      title: 'D and D Compatible',
      subtitle: '5th Edition D and D compatible',
    },
    factions_module: {
      icon: 'FileText',
      title: '8 Factions',
      subtitle: 'Browse Factions',
      drawer_title: 'Archival Codex: 8 Key Factions',
    },
    pages_module: {
      icon: 'BookOpen',
      title: '288 Pages',
      subtitle: 'Heavy matte leather stock',
    },
    modalities_module: {
      icon: 'Sparkles',
      symbol: '§',
      title: '5 Modalities',
      subtitle: 'Inspect Modalities',
      drawer_title: 'Modalities: 5 World Rules',
    },
    monsters_module: {
      icon: 'ArrowUpCircle',
      title: '4 Tyrant Classes',
      subtitle: 'Read Bestiary',
      drawer_title: 'Threats: Swamp Tyrant Bestiary',
    },
    story_arcs_module: {
      icon: 'Users',
      title: '6 Story Arcs, 1 Bible',
      subtitle: 'Fully Cross-Referenced',
    },
    magic_items_module: {
      icon: 'Star',
      title: '5 Key Relics',
      subtitle: 'Inspect Gear',
      drawer_title: 'Equipment: 5 Tactical Relics',
    },
    drawer_records_label: 'RECORDS LIST',
  },
  watch_inventory: PRODUCT_IMAGES,
  chronometer_specifications: SPECIFICATIONS,
  case_alloy_registry: SUBCLASSES,
  dial_color_cores: SPELLS,
  bezel_focus_shields: MONSTERS,
  strap_binding_options: MAGIC_ITEMS,
  user_saved_configs: TABLE_OF_CONTENTS,
  tickertape_marquee_core: [
    'CANONICAL PARADIGM: NO BEEF, ALLIGATOR TAIL ONLY',
    'CENTRAL AUTHENTICATIONAL AUTHORITY (CAA) RATIFIED',
    'PRE-ORDER DIGITAL LOCKBOXES: CONFLUENCE WIKI + CONCEPT ART + CAA MODULE',
    'CLEARANCE STATUS: APPROVED // AUTHORIZED BY CAA PRESS',
    'DELUXE SMYTH-SEWN LEATHER HARDCOVER // 288 DEFINITIVE PAGES',
  ],
  content_cards_order: [
    'MYTHROKAHN_CORE_CODEX',
    'ALLIGATOR_TAIL_CULINARY_GUILD',
    'SWAMP_TYRANT_BESTIARY',
    'BOVINE_HERETICS_DOSSIER',
    'TRANSMEDIA_COHESION_LIAISON',
  ],
};

export default function App() {
  // Navigation States
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Bento Drag to Scroll States and Handlers
  const [isDraggingBento, setIsDraggingBento] = useState(false);
  const bentoDragStartRef = useRef({ x: 0, scrollLeft: 0, hasMoved: false });
  const bentoContainerRef = useRef<HTMLDivElement>(null);

  const handleBentoMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bentoContainerRef.current) return;
    setIsDraggingBento(true);
    bentoDragStartRef.current = {
      x: e.pageX,
      scrollLeft: bentoContainerRef.current.scrollLeft,
      hasMoved: false,
    };
  };

  const handleBentoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingBento || !bentoContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - bentoDragStartRef.current.x) * 1.5;
    bentoContainerRef.current.scrollLeft =
      bentoDragStartRef.current.scrollLeft - walk;
    if (Math.abs(x - bentoDragStartRef.current.x) > 5) {
      bentoDragStartRef.current.hasMoved = true;
    }
  };

  const handleBentoMouseUpOrLeave = () => {
    setIsDraggingBento(false);
  };

  const handleBentoItemClick = (action: () => void) => {
    if (bentoDragStartRef.current.hasMoved) {
      return; // Ignore click on drag completion
    }
    action();
  };

  // Media Gallery States
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Purchasing & checkout States
  const [quantity, setQuantity] = useState(1);
  const [includePrintedWorldBook, setIncludePrintedWorldBook] = useState(false);
  const [preOrderDrawerOpen, setPreOrderDrawerOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Review, 2: Details, 3: Success
  const [preOrderForm, setPreOrderForm] = useState({
    fullName: 'Elliot Bradly',
    email: 'elliotbradly@gmail.com', // Pre-filled from metadata to delight the user!
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    zipCode: '97477',
    country: 'United States',
    cardNumber: '4000 1234 5678 9010',
    cardExpiry: '12/28',
    cardCvc: '555',
  });
  const [confirmedOrder, setConfirmedOrder] = useState<PreOrderData | null>(
    null,
  );

  // Countdown Timer & Time Dilation States
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 3,
    minutes: 3,
    seconds: 55,
  });
  const [timeDilation, setTimeDilation] = useState(1); // Real-time multiplier
  const [dilationActive, setDilationActive] = useState(false);
  const [isReleased, setIsReleased] = useState(false);

  // Function to manually increase a timer unit by one unit
  const handleIncreaseTimer = (
    unit: 'days' | 'hours' | 'minutes' | 'seconds',
  ) => {
    setTimeLeft((prev) => {
      let days = prev.days;
      let hours = prev.hours;
      let minutes = prev.minutes;
      let seconds = prev.seconds;

      if (unit === 'days') {
        days += 1;
      } else if (unit === 'hours') {
        hours += 1;
        if (hours >= 24) {
          hours = 0;
          days += 1;
        }
      } else if (unit === 'minutes') {
        minutes += 1;
        if (minutes >= 60) {
          minutes = 0;
          hours += 1;
          if (hours >= 24) {
            hours = 0;
            days += 1;
          }
        }
      } else if (unit === 'seconds') {
        seconds += 1;
        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
          if (minutes >= 60) {
            minutes = 0;
            hours += 1;
            if (hours >= 24) {
              hours = 0;
              days += 1;
            }
          }
        }
      }
      return { days, hours, minutes, seconds };
    });
    triggerToast(`SYSTEM CLOCK OVERRIDE: +1 ${unit.toUpperCase()}`);
  };

  // Bento Feature Log Drawer States
  const [activeFeatureDrawer, setActiveFeatureDrawer] = useState<
    'subclasses' | 'spells' | 'monsters' | 'magic_items' | null
  >(null);
  const [selectedItemDetail, setSelectedItemDetail] = useState<any | null>(
    null,
  );

  // Dynamic Sparkle Positions for Order Button
  const [sparklePos, setSparklePos] = useState({
    key: 0,
    s1: { top: '15%', left: '85%' },
    s2: { top: '65%', left: '12%' },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSparklePos((prev) => ({
        key: prev.key + 1,
        s1: {
          top: `${Math.floor(12 + Math.random() * 65)}%`,
          left: `${Math.floor(8 + Math.random() * 80)}%`,
        },
        s2: {
          top: `${Math.floor(12 + Math.random() * 65)}%`,
          left: `${Math.floor(8 + Math.random() * 80)}%`,
        },
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Accordion Toggles
  const [jumpToSectionOpen, setJumpToSectionOpen] = useState(true); // Default open as per screenshot (arrow points UP)
  const [productDetailsOpen, setProductDetailsOpen] = useState(false); // Default closed as per screenshot (arrow points DOWN)
  const [productSpecsOpen, setProductSpecsOpen] = useState(false); // Default closed as per screenshot (arrow points DOWN)

  // References for scrolling
  const productSectionRef = useRef<HTMLElement>(null);
  const featuresSectionRef = useRef<HTMLElement>(null);
  const specificationsSectionRef = useRef<HTMLElement>(null);
  const productDetailsSectionRef = useRef<HTMLDivElement>(null);

  // Database State
  const [dbData, setDbData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ARCHIVE_PROTOCOL_DB');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          /* ignore */
        }
      }
    }
    return INITIAL_DATABASE_SCHEMA;
  });

  // URL & DB Interface State
  const [isDbMode, setIsDbMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('db') === 'true';
    }
    return false;
  });

  const [activeSchemaKey, setActiveSchemaKey] = useState<string>('ALL');
  const [jsonEditorText, setJsonEditorText] = useState(() =>
    JSON.stringify(INITIAL_DATABASE_SCHEMA, null, 2),
  );
  const [isJsonValid, setIsJsonValid] = useState(true);

  // Sync with URL parameter ?db=true
  useEffect(() => {
    const checkUrl = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const hasDb = params.get('db') === 'true';
        setIsDbMode(hasDb);
      }
    };
    checkUrl();
    window.addEventListener('popstate', checkUrl);
    return () => window.removeEventListener('popstate', checkUrl);
  }, []);

  const toggleDbMode = (enable: boolean) => {
    setIsDbMode(enable);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (enable) {
        url.searchParams.set('db', 'true');
      } else {
        url.searchParams.delete('db');
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  // Sync editor text when active schema selection or dbData changes
  useEffect(() => {
    let contentToDisplay = dbData;
    if (
      activeSchemaKey !== 'ALL' &&
      (dbData as any)[activeSchemaKey] !== undefined
    ) {
      contentToDisplay = (dbData as any)[activeSchemaKey];
    }
    const formatted = JSON.stringify(contentToDisplay, null, 2);
    setJsonEditorText(formatted);
    setIsJsonValid(true);
  }, [activeSchemaKey, dbData]);

  const handleJsonInputChange = (val: string) => {
    setJsonEditorText(val);
    try {
      JSON.parse(val);
      setIsJsonValid(true);
    } catch (e) {
      setIsJsonValid(false);
    }
  };

  const handleSelectSchema = (key: string) => {
    setActiveSchemaKey(key);
  };

  const handleSaveDatabase = () => {
    if (!isJsonValid) return;
    try {
      const parsed = JSON.parse(jsonEditorText);
      let newDbData = { ...dbData };
      if (activeSchemaKey === 'ALL') {
        newDbData = parsed;
      } else {
        (newDbData as any)[activeSchemaKey] = parsed;
      }
      setDbData(newDbData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ARCHIVE_PROTOCOL_DB', JSON.stringify(newDbData));
      }
      triggerToast('DATABASE SCHEMA SAVED AND COUPLED TO SYSTEM.');
    } catch (e) {
      setIsJsonValid(false);
      triggerToast('ERROR: COULD NOT PARSE JSON DATABASE SCHEMA.');
    }
  };

  const handleResetDatabase = () => {
    setDbData(INITIAL_DATABASE_SCHEMA);
    setActiveSchemaKey('ALL');
    setJsonEditorText(JSON.stringify(INITIAL_DATABASE_SCHEMA, null, 2));
    setIsJsonValid(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ARCHIVE_PROTOCOL_DB');
    }
    triggerToast('ARCHIVE DATABASE RESET TO INITIAL CATALOG DEFAULTS.');
  };

  const handleCopyJson = () => {
    navigator.clipboard
      .writeText(jsonEditorText)
      .then(() => {
        triggerToast('ARCHIVE DATABASE JSON COPIED TO CLIPBOARD.');
      })
      .catch(() => {
        triggerToast('ERROR: COULD NOT COPY JSON TO CLIPBOARD.');
      });
  };

  const schemaButtons = [
    { key: 'catalog_identity', label: '1. CATALOG IDENTITY & STATUS' },
    { key: 'navigation', label: '2. NAVIGATION & ARCHIVAL INDEX NODES' },
    { key: 'watch_inventory', label: '3. WATCH COLLECTION INVENTORY' },
    {
      key: 'chronometer_specifications',
      label: '4. CHRONOMETER SPECIFICATIONS',
    },
    { key: 'case_alloy_registry', label: '5. CASE ALLOY REGISTRY' },
    { key: 'dial_color_cores', label: '6. DIAL COLOR & VELUM CORES' },
    { key: 'bezel_focus_shields', label: '7. BEZEL FOCUS SHIELDS' },
    { key: 'strap_binding_options', label: '8. STRAP & BINDING OPTIONS' },
    { key: 'user_saved_configs', label: '9. USER SAVED CONFIGS' },
    { key: 'tickertape_marquee_core', label: '10. TICKERTAPE MARQUEE CORE' },
    { key: 'content_cards_order', label: '11. CONTENT CARDS ORDER INDEX' },
  ];

  // Handle keypresses (escape modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomOpen(false);
        setSearchOpen(false);
        setCategoriesOpen(false);
        setPreOrderDrawerOpen(false);
        setActiveFeatureDrawer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Utility to scroll smoothly
  const scrollToRef = (
    ref: React.RefObject<any>,
    block: ScrollLogicalPosition = 'start',
  ) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block });
    }
  };

  // Toast message controller
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handle Share action
  const handleShare = () => {
    const dummyUrl = window.location.href;
    navigator.clipboard
      .writeText(dummyUrl)
      .then(() => {
        triggerToast(
          'ARCHIVE ACCESS PROTOCOL: PDP LINK COPIED TO LOCAL CLIPBOARD.',
        );
      })
      .catch(() => {
        triggerToast('ERROR: CLIPBOARD WRITE BLOCKED. SHARE LINK: ' + dummyUrl);
      });
  };

  // Quantity controllers
  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  // Dynamic variables derived directly from dbData for live database feedback
  const productImages = dbData.watch_inventory || PRODUCT_IMAGES;
  const productName =
    dbData.catalog_identity?.product_name ?? 'Mythrokahn (v1.0)';
  const publisherName =
    dbData.catalog_identity?.publisher ?? 'Camp Candor Third Authority (CA3A)';
  const clearanceStatus =
    dbData.catalog_identity?.clearance_status ?? 'Approved';
  const terminalTitle =
    dbData.catalog_identity?.terminal_title ??
    'COMPLETE CAMPAIGN LENGTH TERMINAL';
  const releaseStatusBadge =
    dbData.catalog_identity?.release_status_badge ?? 'PRE-RELEASE STATUS';
  const narrativeCharter =
    dbData.catalog_identity?.narrative_charter ??
    'This document charters the official Alligator Alley Franchise Bible & World-Building Protocol.';
  const absoluteCanon =
    dbData.catalog_identity?.absolute_canon ?? 'NO BEEF, ALLIGATOR TAIL';
  const deluxeIncludesTitle =
    dbData.catalog_identity?.deluxe_includes_title ??
    'THE DELUXE FRANCHISE BIBLE & CODEX INCLUDES:';
  const deluxeBulletPoints =
    dbData.catalog_identity?.deluxe_bullet_points ||
    INITIAL_DATABASE_SCHEMA.catalog_identity.deluxe_bullet_points;
  const charterSealHeader =
    dbData.catalog_identity?.charter_seal_header ?? '5th Edition';
  const charterSealTitle =
    dbData.catalog_identity?.charter_seal_title ?? 'D and D Compatible';
  const charterSealSubtitle =
    dbData.catalog_identity?.charter_seal_subtitle ??
    '5th Edition D and D compatible';
  const stationNo = dbData.meta?.station_no ?? 'CO-001';

  // Navigation settings from JSON database object
  const showCampaignSettingsMenu =
    dbData.navigation?.show_campaign_settings_menu ??
    dbData.meta?.show_campaign_settings_menu ??
    true;
  const campaignSettingsLabel =
    dbData.navigation?.campaign_settings_label ?? 'Campaign Settings';
  const archivalNodes = getNormalizedArchivalNodes(dbData);

  const handleToggleNode = (nodeId: string, currentEnabled: boolean) => {
    const currentNodes = getNormalizedArchivalNodes(dbData);
    const updatedNodes = currentNodes.map((node) => {
      if (node.id === nodeId || node.label === nodeId) {
        return { ...node, enabled: !currentEnabled };
      }
      return node;
    });

    const newDbData = {
      ...dbData,
      navigation: {
        ...dbData.navigation,
        archival_index_nodes: updatedNodes,
        categories: updatedNodes,
      },
    };

    setDbData(newDbData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ARCHIVE_PROTOCOL_DB', JSON.stringify(newDbData));
    }
    const targetNode = currentNodes.find(
      (n) => n.id === nodeId || n.label === nodeId,
    );
    const name = targetNode?.label || nodeId;
    triggerToast(
      `NODE [${name.toUpperCase()}] TOGGLED ${!currentEnabled ? 'ON' : 'OFF'}`,
    );
  };

  // World-Building Registry & Interactive Grid Data
  const wbRegistry =
    dbData.world_building_registry ||
    INITIAL_DATABASE_SCHEMA.world_building_registry;
  const subclassesList = dbData.case_alloy_registry || SUBCLASSES;
  const spellsList = dbData.dial_color_cores || SPELLS;
  const monstersList = dbData.bezel_focus_shields || MONSTERS;
  const magicItemsList = dbData.strap_binding_options || MAGIC_ITEMS;

  // Pre-Order Calculations & Pricing Mechanisms from JSON Database Object
  const pricing =
    dbData.pricing_mechanisms || INITIAL_DATABASE_SCHEMA.pricing_mechanisms;
  const totalHours = timeLeft.days * 24 + timeLeft.hours;
  const basePrice = pricing.use_dynamic_countdown_price
    ? pricing.hourly_rate +
      totalHours * pricing.hourly_rate +
      pricing.base_flat_fee
    : (pricing.base_price ?? dbData.catalog_identity?.base_price ?? 2903.76);

  const baseSubtotal = basePrice * quantity;
  const printedWorldBookFee = pricing.printed_world_book_fee ?? 30.0;
  const printedWorldBookAddon = includePrintedWorldBook
    ? printedWorldBookFee
    : 0;
  const subtotal = baseSubtotal + printedWorldBookAddon;

  const freeShippingThreshold = pricing.free_shipping_threshold ?? 250.0;
  const flatShippingRate = pricing.flat_shipping_rate ?? 15.0;
  const shipping = subtotal >= freeShippingThreshold ? 0 : flatShippingRate;

  const salesTaxRate = pricing.sales_tax_rate ?? 0.085;
  const tax = subtotal * salesTaxRate;
  const total = subtotal + shipping + tax;

  const characterSlotsLabel = pricing.character_slots_label ?? 'CHARACTER';
  const characterSlotsPerUnit = pricing.character_slots_per_unit ?? 3;
  const totalCharacterSlots = characterSlotsPerUnit * quantity;
  const orderButtonText = pricing.order_button_label ?? 'ORDER CAMPAIGN NOW';
  const orderButtonDisplayAmount =
    pricing.include_tax_and_shipping_in_button_total ? total : subtotal;

  // Handle Pre-Order Submit
  const handlePreOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `ARC-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleString();

    const newOrder: PreOrderData = {
      ...preOrderForm,
      quantity,
      subtotal,
      shipping,
      tax,
      total,
      orderId,
      timestamp,
      includePrintedWorldBook,
    };

    setConfirmedOrder(newOrder);
    setCheckoutStep(3);
    triggerToast(`ORDER SECURED: ${orderId} TRANSMITTED TO ARCANA VAULTS.`);
  };

  // Download printable order receipt ticket
  const downloadReceipt = () => {
    if (!confirmedOrder) return;
    const receiptContent = `
=========================================
      THE ARCHIVE PROTOCOL - RECEIPT
=========================================
ORDER STATUS : SECURED & CLEARED
ORDER ID     : ${confirmedOrder.orderId}
TIMESTAMP    : ${confirmedOrder.timestamp}
STATION      : CLIENT PRE-ORDER TERMINAL
-----------------------------------------
CUSTOMER PROFILE:
NAME         : ${confirmedOrder.fullName}
EMAIL        : ${confirmedOrder.email}
SHIPPING     : ${confirmedOrder.address}, ${confirmedOrder.city}, ${confirmedOrder.zipCode}
-----------------------------------------
MANIFEST:
ITEM         : Alligator Alley: Franchise Bible (v1.0)
EDITION      : CAA Codex Charter
UNIT PRICE   : $${basePrice.toFixed(2)}
QUANTITY     : ${confirmedOrder.quantity}
-----------------------------------------
FINANCIAL AUDIT:
SUBTOTAL     : $${confirmedOrder.subtotal.toFixed(2)}
SHIPPING     : $${confirmedOrder.shipping === 0 ? 'FREE' : `$${confirmedOrder.shipping.toFixed(2)}`}
TAX (8.5%)   : $${confirmedOrder.tax.toFixed(2)}
TOTAL CHARGE : $${confirmedOrder.total.toFixed(2)}
-----------------------------------------
BONUSES REGISTERED:
 - Digital Confluence Wiki Access [PROCESSED]
 - High-Res Concept Art Pack [READY]
 - CAA Sandbox Campaign Module [ACTIVE]
-----------------------------------------
THANK YOU FOR TRUSTING THE CAA PROTOCOL.
THIS RECEIPT SERVES AS OFFICIAL RECORD OF YOUR
ALLIGATOR ALLEY FRANCHISE BIBLE CHARTER ENTRY.
=========================================
`;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RECEIPT-${confirmedOrder.orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast('RECEIPT TICKET DOWNLOADED TO STORAGE.');
  };

  // Mock search matches
  const mockSearchResults =
    searchQuery.trim() === ''
      ? []
      : [
          {
            title: 'Alligator Alley Franchise Bible',
            desc: 'The official master world-building bible and transmedia operational protocol charter (v1.0).',
            type: 'Core Codex',
          },
          {
            title: 'Article III: Key Factions & Casts',
            desc: 'Fractions profiling the Alligator Tail Culinary Guild, the Swamp Rangers, and heretic outlaws.',
            type: 'Codex Article',
          },
          {
            title: 'Crimson Tail Giga-Gator Specifications',
            desc: 'Threat Class 5 biological and behavioral specs for the colossal 40-foot Swamp Tyrant.',
            type: 'Bestiary Spec',
          },
          {
            title: 'Golden Alligator Lasso Blueprint',
            desc: 'A high-tension composite capture tool designed for harvesting swamp predators.',
            type: 'Gear Item',
          },
        ].filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  if (isDbMode) {
    return (
      <div className="min-h-screen antialiased bg-brand-surface text-brand-primary flex flex-col font-sans selection:bg-brand-primary selection:text-brand-surface relative p-4 md:p-8">
        {/* Toast Notification Bar */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-brand-primary text-brand-surface font-mono text-xs md:text-sm font-bold py-3 px-6 shadow-hard border-thick flex items-center gap-3 uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-brand-accent animate-pulse shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto w-full border-thick bg-brand-surface p-4 md:p-8 shadow-hard my-auto relative">
          {/* Header Block */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-brand-primary flex items-center justify-center shrink-0 border-2 border-brand-primary shadow-sm">
                <Database className="w-8 h-8 text-brand-surface" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary/80">
                    CHRONO-RAID PROTOCOL CONSOLE
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#006644] border border-[#006644] bg-[#e6f4ea] px-2 py-0.5">
                    LIVE REGISTRY
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight text-brand-primary leading-tight">
                  THE ARCHIVE DATABASE SCHEMA INTERFACE
                </h1>
              </div>
            </div>

            <button
              onClick={() => toggleDbMode(false)}
              className="font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 border border-brand-primary/40 hover:border-brand-primary hover:bg-brand-primary hover:text-brand-surface transition-colors flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer"
            >
              ← GO TO CATALOG
            </button>
          </div>

          {/* Reset Database Button */}
          <div className="mb-6">
            <button
              onClick={handleResetDatabase}
              className="font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET ARCHIVE DATABASE</span>
            </button>
          </div>

          <hr className="border-t-2 border-brand-primary mb-6" />

          {/* SELECT SCHEMA COMPONENT section */}
          <div className="mb-6">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary/60 mb-3">
              // SELECT SCHEMA COMPONENT:
            </div>

            <div className="space-y-2">
              {/* Full Archive Schema button */}
              <button
                onClick={() => handleSelectSchema('ALL')}
                className={`w-full text-left py-3.5 px-5 font-mono text-xs md:text-sm font-black uppercase tracking-wider border-thick flex justify-between items-center transition-colors cursor-pointer ${
                  activeSchemaKey === 'ALL'
                    ? 'bg-brand-primary text-brand-surface'
                    : 'bg-brand-surface text-brand-primary hover:bg-brand-primary/10'
                }`}
              >
                <span>[FULL ARCHIVE SCHEMA]</span>
                <span className="font-mono font-bold">&gt;_</span>
              </button>

              {/* 10 schema component buttons */}
              {schemaButtons.map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => handleSelectSchema(btn.key)}
                  className={`w-full text-left py-3.5 px-5 font-mono text-xs md:text-sm font-bold uppercase tracking-wider border-2 border-brand-primary transition-colors cursor-pointer ${
                    activeSchemaKey === btn.key
                      ? 'bg-brand-primary text-brand-surface'
                      : 'bg-brand-surface text-brand-primary hover:bg-brand-primary/5'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* JSON Code Area */}
          <div className="bg-[#0b0f19] border-thick shadow-hard p-4 mb-6 text-white font-mono">
            <div className="flex justify-between items-center pb-3 border-b border-gray-800 mb-3 text-xs flex-wrap gap-2">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <span>&lt;/&gt;</span> ARCHIVE-PROTOCOL-SCHEMA.JSON
              </span>
              <span className="bg-red-950 text-red-500 border border-red-800 text-[10px] font-bold px-2 py-0.5 tracking-widest uppercase">
                REAL-TIME INTENSITY ACTIVE
              </span>
            </div>

            <textarea
              value={jsonEditorText}
              onChange={(e) => handleJsonInputChange(e.target.value)}
              className="w-full h-80 md:h-96 bg-transparent text-emerald-300 font-mono text-xs md:text-sm p-2 focus:outline-none resize-y leading-relaxed border-none tracking-wide"
              spellCheck={false}
            />

            <div
              className={`mt-3 p-3 border text-xs font-mono font-bold flex items-center gap-2 ${
                isJsonValid
                  ? 'bg-[#0d2818] border-emerald-600 text-emerald-400'
                  : 'bg-[#2d0a0a] border-red-600 text-red-400'
              }`}
            >
              {isJsonValid ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    SYNTAX IS VALID: Database parsing active. Live feedback
                    secured.
                  </span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    SYNTAX ERROR: Invalid JSON structure. Check brackets and
                    quotes.
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleCopyJson}
              className="w-full py-4 px-6 bg-brand-surface border-thick shadow-hard hover:bg-brand-primary hover:text-brand-surface text-brand-primary font-mono text-xs md:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              <Copy className="w-5 h-5" />
              <span>COPY JSON</span>
            </button>

            <button
              onClick={handleSaveDatabase}
              disabled={!isJsonValid}
              className={`w-full py-4 px-6 border-thick shadow-hard font-mono text-xs md:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-colors cursor-pointer ${
                isJsonValid
                  ? 'bg-brand-primary text-brand-surface hover:bg-black'
                  : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              }`}
            >
              <Save className="w-5 h-5" />
              <span>SAVE &amp; APPLY DATABASE</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen antialiased bg-brand-surface text-brand-primary flex flex-col font-sans selection:bg-brand-primary selection:text-brand-surface relative pb-12">
      {/* BEGIN: MainHeader */}
      <header className="border-b-thick py-5 px-6 md:px-12 flex justify-between items-center bg-brand-primary text-brand-surface sticky top-0 z-40">
        <div className="flex items-center gap-4 md:gap-6 flex-wrap md:flex-nowrap">
          {showCampaignSettingsMenu && (
            <div className="relative">
              <button
                id="category-dropdown-btn"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-2 hover:bg-white/10 p-2 transition-colors font-bold uppercase tracking-wide border-2 border-transparent focus:border-brand-surface cursor-pointer text-base md:text-lg whitespace-nowrap text-brand-surface"
              >
                <span>{campaignSettingsLabel}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Categories Dropdown menu */}
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.1 }}
                    className="absolute left-0 mt-2 w-80 md:w-[480px] bg-brand-surface text-brand-primary border-thick shadow-hard z-50 p-3"
                  >
                    <div className="bg-brand-primary text-brand-surface py-3 px-4 md:px-6 text-xs md:text-sm font-mono font-bold uppercase tracking-widest mb-2 flex justify-between items-center">
                      <span>
                        {dbData.navigation?.archival_index_nodes_header ||
                          'ARCHIVAL INDEX NODES'}
                      </span>
                      <span className="text-[10px] font-mono font-normal opacity-75">
                        JSON DB LINKED
                      </span>
                    </div>

                    <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
                      {archivalNodes.map((node, idx) => (
                        <div
                          key={node.id || idx}
                          className={`w-full p-3 md:p-3.5 border-2 transition-all flex items-center justify-between gap-3 ${
                            node.enabled
                              ? 'bg-brand-surface border-brand-primary/80 hover:border-brand-primary hover:bg-brand-surface-low shadow-sm'
                              : 'bg-gray-100/90 border-dashed border-gray-300 opacity-60'
                          }`}
                        >
                          {/* Left side: Node Label & External URL */}
                          <div
                            onClick={() => {
                              if (node.enabled) {
                                triggerToast(
                                  `OPENING EXTERNAL NODE: ${node.url}`,
                                );
                                window.open(
                                  node.url,
                                  '_blank',
                                  'noopener,noreferrer',
                                );
                                setCategoriesOpen(false);
                              } else {
                                triggerToast(
                                  `NODE [${node.label}] IS CURRENTLY DISABLED (OFF)`,
                                );
                              }
                            }}
                            className={`flex-grow flex flex-col justify-center cursor-pointer group ${node.enabled ? '' : 'cursor-not-allowed'}`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm md:text-base font-mono font-black uppercase tracking-wider ${node.enabled ? 'group-hover:underline text-brand-primary' : 'text-gray-500'}`}
                              >
                                {node.label}
                              </span>
                              {node.enabled && (
                                <ExternalLink className="w-4 h-4 text-brand-primary/70 group-hover:text-brand-primary shrink-0" />
                              )}
                            </div>
                            <div className="font-mono text-[10px] text-brand-primary/60 truncate max-w-[200px] md:max-w-[280px]">
                              {node.url}
                            </div>
                          </div>

                          {/* Right side: ON/OFF Toggle Switch */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleNode(node.id, node.enabled);
                            }}
                            className={`px-3 py-1.5 font-mono text-[10px] font-black uppercase border-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                              node.enabled
                                ? 'bg-[#85762B] text-white border-[#85762B] hover:bg-[#6c6022]'
                                : 'bg-gray-200 text-gray-600 border-gray-400 hover:bg-gray-300'
                            }`}
                            title={`Click to turn ${node.enabled ? 'OFF' : 'ON'}`}
                          >
                            <span>{node.enabled ? 'ON' : 'OFF'}</span>
                            <div
                              className={`w-2 h-2 rounded-full ${node.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Footer info in dropdown */}
                    <div className="mt-3 pt-2 border-t border-dashed border-brand-primary/30 flex justify-between items-center text-[10px] font-mono text-brand-primary/70">
                      <span>CUSTOMIZABLE IN JSON DATABASE</span>
                      <button
                        onClick={() => {
                          setCategoriesOpen(false);
                          toggleDbMode(true);
                          setActiveSchemaKey('navigation');
                        }}
                        className="font-bold underline uppercase hover:text-brand-primary cursor-pointer text-brand-primary"
                      >
                        EDIT SCHEMA →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Brand center marker (Subtle but authority) */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-black tracking-[0.25em] text-brand-surface/60">
          <span>STATION NO: {stationNo}</span>
        </div>

        {/* Search button */}
        <div className="flex items-center gap-3">
          <button
            id="search-overlay-btn"
            onClick={() => setSearchOpen(true)}
            className="p-2 hover:bg-white/10 border-2 border-transparent hover:border-brand-surface transition-all cursor-pointer text-brand-surface"
            aria-label="Search rulebooks"
          >
            <Search className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      </header>
      {/* END: MainHeader */}

      {/* Toast Alert overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-brand-primary text-brand-surface border-thick shadow-hard p-4 flex items-start gap-3">
              <TerminalIcon className="w-5 h-5 shrink-0 mt-0.5 animate-pulse text-brand-accent" />
              <div className="flex-grow">
                <div className="font-mono text-xs font-black tracking-wide">
                  SYSTEM DIAGNOSTIC TELEMETRY
                </div>
                <div className="font-mono text-xs mt-1 text-brand-surface/90 font-medium leading-relaxed uppercase">
                  {toastMessage}
                </div>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="hover:text-brand-accent shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accordion sections removed per user request */}

      {/* BEGIN: MainContent */}
      <main
        ref={productSectionRef}
        className="flex-grow max-w-[1600px] mx-auto w-full px-6 md:px-12 py-8 flex flex-col lg:flex-row gap-12 xl:gap-24"
      >
        {/* Left Side: Product Media Section */}
        <section
          aria-label="Product Media"
          className="w-full lg:w-1/2 flex flex-col md:flex-row gap-6 relative"
        >
          {/* Vertical Thumbnails */}
          <div className="flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-y-auto hide-scrollbar snap-x md:snap-y w-full md:w-24 shrink-0 h-auto md:max-h-[600px]">
            {productImages.map((img: any, idx: number) => {
              const isActive = activeImgIndex === idx;
              return (
                <button
                  key={img.id || idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`border-thick w-20 h-20 shrink-0 snap-center focus:outline-none focus:ring-2 focus:ring-brand-primary p-1 bg-white transition-all ${
                    isActive
                      ? 'ring-2 ring-brand-primary opacity-100 scale-105'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View product image ${idx + 1}`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover grayscale contrast-125 ${img.type === 'interior' ? 'brightness-95 contrast-150' : ''}`}
                  />
                </button>
              );
            })}

            {/* Thumbnail vertical scroll helper */}
            <button
              onClick={() => {
                setActiveImgIndex((prev) => (prev + 1) % productImages.length);
                triggerToast(
                  `IMAGE CYCLE: SHOWING NODE ${activeImgIndex + 1} OF ${productImages.length}`,
                );
              }}
              className="w-20 h-10 md:h-20 border-2 border-brand-primary/30 hover:border-brand-primary flex justify-center items-center shrink-0 hover:bg-brand-primary hover:text-brand-surface transition-all cursor-pointer"
              aria-label="Next image spread"
            >
              <ChevronDown className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          {/* Main Showcase Image */}
          <div className="order-1 md:order-2 flex-grow relative border-thick shadow-hard bg-white p-2 flex items-center justify-center min-h-[400px] md:min-h-[550px] max-h-[700px]">
            <img
              src={(productImages[activeImgIndex] || productImages[0])?.url}
              alt={(productImages[activeImgIndex] || productImages[0])?.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain grayscale contrast-125 max-h-[650px] transition-all duration-300"
            />

            {/* Floating Info tag */}
            <div className="absolute left-4 bottom-4 bg-brand-primary text-brand-surface px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
              {(productImages[activeImgIndex] || productImages[0])?.caption}
            </div>

            {/* Image Actions (Zoom/Share) */}
            <div className="absolute right-4 top-4 flex flex-col gap-3">
              <button
                id="lightbox-zoom-btn"
                onClick={() => setZoomOpen(true)}
                className="w-11 h-11 border-thick bg-brand-surface flex items-center justify-center hover:bg-brand-primary hover:text-brand-surface transition-all shadow-hard cursor-pointer"
                aria-label="Zoom active product plate"
              >
                <ZoomIn className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                id="share-product-btn"
                onClick={handleShare}
                className="w-11 h-11 border-thick bg-brand-surface flex items-center justify-center hover:bg-brand-primary hover:text-brand-surface transition-all shadow-hard cursor-pointer"
                aria-label="Copy sharing link"
              >
                <Share2 className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </section>

        {/* Right Side: Product Details & Controls Section */}
        <section
          aria-label="Product Details"
          className="w-full lg:w-1/2 flex flex-col"
        >
          {/* Header Badge Tags */}
          <div className="flex gap-3 mb-6">
            <span className="border-thick px-3.5 py-1 text-xs font-black uppercase bg-white tracking-widest shadow-hard-sm">
              Pre-Order
            </span>
            <span className="border-thick px-3.5 py-1 text-xs font-black uppercase bg-brand-accent tracking-widest shadow-hard-sm">
              CAA Approved
            </span>
          </div>

          {/* Core Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-3">
            {productName}
          </h1>

          {/* Publisher node */}
          <p className="text-xs font-mono font-bold uppercase tracking-wider mb-6 flex items-center gap-1.5 text-brand-primary/70">
            <span>Governance Authority:</span>
            <span className="text-brand-primary font-black underline decoration-2">
              {publisherName}
            </span>
          </p>

          {/* Pricing Grid */}
          <div className="flex items-baseline gap-4 mb-8">
            <div className="text-5xl font-mono font-black tracking-tight">
              ${basePrice.toFixed(2)}
            </div>
            <div className="text-xs font-mono uppercase text-brand-primary/50 font-bold">
              [ Clearance Hour: {clearanceStatus} ]
            </div>
          </div>

          {/* Countdown timer Block */}
          <div className="mb-5 bg-brand-surface-low border-thick p-3 sm:p-5 shadow-hard relative overflow-hidden">
            {/* Visual alert banner */}
            <div className="flex justify-between items-center mb-3 sm:mb-4 gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 font-mono font-black uppercase text-[10px] sm:text-xs text-brand-primary tracking-wider">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] text-red-600 animate-pulse shrink-0" />
                <span>{terminalTitle}</span>
              </div>
              <span className="bg-red-600 text-white px-2 py-0.5 font-mono text-[8px] sm:text-[9px] font-black uppercase animate-pulse shrink-0">
                {releaseStatusBadge}
              </span>
            </div>

            {/* Ticking Clock Readout */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div
                onClick={() => handleIncreaseTimer('days')}
                className="border-thick p-1.5 sm:p-3 text-center bg-white shadow-hard-sm cursor-pointer hover:bg-brand-surface-low transition-colors select-none group"
                title="Click to increase days by 1"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-brand-primary leading-none mb-1 group-hover:scale-105 transition-transform">
                  {timeLeft.days.toString().padStart(2, '0')}d
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-brand-primary/50">
                  DAYS
                </div>
              </div>
              <div
                onClick={() => handleIncreaseTimer('hours')}
                className="border-thick p-1.5 sm:p-3 text-center bg-white shadow-hard-sm cursor-pointer hover:bg-brand-surface-low transition-colors select-none group"
                title="Click to increase hours by 1"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-brand-primary leading-none mb-1 group-hover:scale-105 transition-transform">
                  {timeLeft.hours.toString().padStart(2, '0')}h
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-brand-primary/50">
                  HOURS
                </div>
              </div>
              <div
                onClick={() => handleIncreaseTimer('minutes')}
                className="border-thick p-1.5 sm:p-3 text-center bg-white shadow-hard-sm cursor-pointer hover:bg-brand-surface-low transition-colors select-none group"
                title="Click to increase minutes by 1"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-brand-primary leading-none mb-1 group-hover:scale-105 transition-transform">
                  {timeLeft.minutes.toString().padStart(2, '0')}m
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-brand-primary/50">
                  MINS
                </div>
              </div>
              <div
                onClick={() => handleIncreaseTimer('seconds')}
                className="border-thick p-1.5 sm:p-3 text-center bg-white shadow-hard-sm cursor-pointer hover:bg-brand-surface-low transition-colors select-none group"
                title="Click to increase seconds by 1"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-brand-primary leading-none mb-1 group-hover:scale-105 transition-transform">
                  {timeLeft.seconds.toString().padStart(2, '0')}s
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-brand-primary/50">
                  SECS
                </div>
              </div>
            </div>

            {isReleased && (
              <div className="absolute inset-0 bg-brand-primary/95 flex flex-col items-center justify-center text-center p-4 z-10">
                <Sparkles className="w-8 h-8 text-brand-accent animate-bounce mb-1" />
                <div className="font-mono text-sm font-black text-brand-surface uppercase tracking-widest">
                  LAUNCH CRITICAL SEQUENCE CLEARED
                </div>
                <p className="font-serif text-xs text-brand-surface/80 max-w-xs mt-1">
                  The bundle is officially released! All digital PDFs and keys
                  have unlocked in your pre-order storage.
                </p>
                <button
                  onClick={() => {
                    setIsReleased(false);
                    setDilationActive(false);
                    setTimeDilation(1);
                    triggerToast('LAUNCH TEMPLATE SIMULATOR ARCHIVE RESET.');
                  }}
                  className="mt-3 px-3 py-1 bg-brand-surface text-brand-primary font-mono text-[9px] font-black uppercase hover:bg-brand-accent cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3 inline mr-1" /> Reset Clock
                </button>
              </div>
            )}
          </div>

          {/* Purchase Actions */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Quantity Selector & Character Slots inline row */}
            <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border-thick bg-white shadow-hard select-none shrink-0">
                <button
                  onClick={decrementQuantity}
                  className="px-3 sm:px-4 py-2 sm:py-3 font-black text-lg hover:bg-brand-surface-high transition-colors focus:outline-none cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 stroke-[3]" />
                </button>
                <div className="px-4 sm:px-5 py-2 sm:py-3 border-x-thick font-mono font-black text-lg min-w-[45px] sm:min-w-[50px] text-center">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  className="px-3 sm:px-4 py-2 sm:py-3 font-black text-lg hover:bg-brand-surface-high transition-colors focus:outline-none cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              {/* Count of Character Slots */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold uppercase leading-relaxed text-brand-primary/60 flex-grow">
                <span>{characterSlotsLabel}:</span>
                <span className="text-brand-primary font-black bg-brand-accent px-2 py-0.5 border border-brand-primary">
                  {totalCharacterSlots} SLOTS
                </span>
                <div className="flex flex-wrap items-center gap-1 max-w-[156px] sm:max-w-[316px]">
                  {Array.from({ length: totalCharacterSlots }).map((_, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 bg-brand-primary border border-brand-primary inline-block shrink-0 transition-all duration-200"
                      title={`Character Slot ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Order button */}
            <motion.button
              id="preorder-action-btn"
              onClick={() => {
                setPreOrderDrawerOpen(true);
                setCheckoutStep(1);
              }}
              className="relative overflow-hidden w-full py-4 px-6 text-lg sm:text-xl font-mono font-black uppercase tracking-wider flex items-center justify-between sm:justify-center gap-3 bg-[#f95700] hover:bg-[#e04e00] text-white border-thick shadow-hard active:translate-x-1 active:translate-y-1 transition-all cursor-pointer group"
            >
              {/* Shimmer sweep animation repeating every 3s */}
              <motion.div
                key={`shimmer-${sparklePos.key}`}
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  duration: 1.0,
                  ease: 'easeInOut',
                }}
              />

              {/* Dynamic Sparkle Star 1 */}
              <motion.div
                key={`sparkle1-${sparklePos.key}`}
                style={{ top: sparklePos.s1.top, left: sparklePos.s1.left }}
                className="absolute pointer-events-none text-yellow-200 z-10 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                animate={{
                  scale: [0, 1.4, 1, 0],
                  opacity: [0, 1, 1, 0],
                  rotate: [-45, 15, 45, 90],
                }}
                transition={{
                  duration: 1.0,
                  times: [0, 0.3, 0.7, 1],
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="w-5 h-5 fill-yellow-200 stroke-yellow-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
              </motion.div>

              {/* Dynamic Sparkle Star 2 */}
              <motion.div
                key={`sparkle2-${sparklePos.key}`}
                style={{ top: sparklePos.s2.top, left: sparklePos.s2.left }}
                className="absolute pointer-events-none text-white z-10 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.9, 0],
                  rotate: [0, 45, 90],
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="w-3.5 h-3.5 fill-white stroke-yellow-100" />
              </motion.div>

              <span className="relative z-10 flex items-center gap-2">
                <span>{orderButtonText}</span>
              </span>
              <span className="relative z-10 font-sans text-xs bg-brand-surface text-brand-primary px-2.5 py-0.5 font-bold shrink-0 border-2 border-dashed border-brand-primary">
                TOTAL: ${orderButtonDisplayAmount.toFixed(2)}
              </span>
            </motion.button>
          </div>

          {/* Narrative description with high-craft styling */}
          <div className="font-serif text-lg text-brand-primary max-w-none mb-4 leading-relaxed border-l-[6px] border-brand-primary pl-6 py-2">
            <p className="mb-4 font-semibold text-xl leading-snug">
              {narrativeCharter}
            </p>
            <p className="font-sans font-bold uppercase tracking-widest text-sm text-brand-primary/80 mb-4 bg-brand-accent/50 px-2.5 py-1.5 inline-block">
              Absolute Canon: "{absoluteCanon}"
            </p>
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-wide text-brand-primary/60">
              {deluxeIncludesTitle}
            </p>
            <ul className="font-sans text-sm list-none space-y-3.5">
              {deluxeBulletPoints.map((bp: any, idx: number) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="font-mono font-bold text-brand-primary text-base select-none mt-0.5">
                    ▪
                  </span>
                  <span>
                    <strong>{bp.bold}</strong>
                    {bp.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      {/* END: MainContent */}

      {/* BEGIN: Features Strip (Bento-styled grid with interactive logs!) */}
      <section
        ref={featuresSectionRef}
        className="border-y-thick bg-white py-6 px-6 md:px-12 mt-4 overflow-hidden"
      >
        <div className="max-w-[1600px] mx-auto">
          {/* Header block */}
          <div className="flex justify-between items-baseline mb-6 border-b-2 border-brand-primary/10 pb-3">
            <h2 className="font-mono text-xs font-black uppercase tracking-[0.2em] text-brand-primary/60">
              {wbRegistry.section_title}
            </h2>
            <span className="hidden md:inline font-mono text-[10px] text-brand-primary/40 font-bold">
              {wbRegistry.section_subtitle}
            </span>
          </div>

          <div
            ref={bentoContainerRef}
            onMouseDown={handleBentoMouseDown}
            onMouseMove={handleBentoMouseMove}
            onMouseUp={handleBentoMouseUpOrLeave}
            onMouseLeave={handleBentoMouseUpOrLeave}
            className={`flex flex-nowrap justify-start gap-8 md:gap-4 items-stretch overflow-x-auto hide-scrollbar pb-4 md:pb-0 select-none ${isDraggingBento ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            {/* Feature 1 */}
            <div className="flex flex-col justify-between items-center text-center p-4 border-2 border-brand-primary/10 hover:border-brand-primary bg-brand-surface-low/30 hover:bg-brand-surface transition-all min-w-[150px] flex-1">
              <div className="text-3xl font-mono font-black text-brand-primary mb-1">
                {wbRegistry.seal_module?.header || charterSealHeader}
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-primary/80 bg-brand-accent/50 px-1.5 py-0.5 border border-brand-primary/20">
                {wbRegistry.seal_module?.title || charterSealTitle}
              </div>
              <p className="text-[11px] font-serif italic text-brand-primary/70 mt-1 max-w-[130px]">
                {wbRegistry.seal_module?.subtitle || charterSealSubtitle}
              </p>
            </div>

            {/* Feature 2: Subclasses / Factions */}
            <button
              onClick={() =>
                handleBentoItemClick(() => {
                  setActiveFeatureDrawer('subclasses');
                  setSelectedItemDetail(null);
                })
              }
              className="flex flex-col justify-between items-center text-center p-4 border-2 border-brand-primary/10 hover:border-brand-primary bg-brand-surface-low/30 hover:bg-brand-surface transition-all min-w-[150px] flex-1 cursor-pointer"
            >
              {renderBentoIcon(
                wbRegistry.factions_module?.icon,
                wbRegistry.factions_module?.symbol,
                FileText,
              )}
              <div className="text-sm font-mono font-black uppercase tracking-wide">
                {wbRegistry.factions_module?.title || '8 Factions'}
              </div>
              <p className="text-[11px] font-serif italic text-brand-primary/70 mt-1 max-w-[130px] underline decoration-dotted">
                {wbRegistry.factions_module?.subtitle || 'Browse Factions'}
              </p>
            </button>

            {/* Feature 3: Pages */}
            <div className="flex flex-col justify-between items-center text-center p-4 border-2 border-brand-primary/10 bg-brand-surface-low/30 min-w-[150px] flex-1">
              {renderBentoIcon(
                wbRegistry.pages_module?.icon,
                wbRegistry.pages_module?.symbol,
                BookOpen,
              )}
              <div className="text-sm font-mono font-black uppercase tracking-wide">
                {wbRegistry.pages_module?.title || '288 Pages'}
              </div>
              <p className="text-[11px] font-serif italic text-brand-primary/70 mt-1 max-w-[130px]">
                {wbRegistry.pages_module?.subtitle ||
                  'Heavy matte leather stock'}
              </p>
            </div>

            {/* Feature 4: Spells / Modalities */}
            <button
              onClick={() =>
                handleBentoItemClick(() => {
                  setActiveFeatureDrawer('spells');
                  setSelectedItemDetail(null);
                })
              }
              className="flex flex-col justify-between items-center text-center p-4 border-2 border-brand-primary/10 hover:border-brand-primary bg-brand-surface-low/30 hover:bg-brand-surface transition-all min-w-[150px] flex-1 cursor-pointer"
            >
              {renderBentoIcon(
                wbRegistry.modalities_module?.icon,
                wbRegistry.modalities_module?.symbol,
                Sparkles,
              )}
              <div className="text-sm font-mono font-black uppercase tracking-wide">
                {wbRegistry.modalities_module?.title || '5 Modalities'}
              </div>
              <p className="text-[11px] font-serif italic text-brand-primary/70 mt-1 max-w-[130px] underline decoration-dotted">
                {wbRegistry.modalities_module?.subtitle || 'Inspect Modalities'}
              </p>
            </button>

            {/* Feature 5: Monsters */}
            <button
              onClick={() =>
                handleBentoItemClick(() => {
                  setActiveFeatureDrawer('monsters');
                  setSelectedItemDetail(null);
                })
              }
              className="flex flex-col justify-between items-center text-center p-4 border-2 border-brand-primary/10 hover:border-brand-primary bg-brand-surface-low/30 hover:bg-brand-surface transition-all min-w-[150px] flex-1 cursor-pointer"
            >
              {renderBentoIcon(
                wbRegistry.monsters_module?.icon,
                wbRegistry.monsters_module?.symbol,
                ArrowUpCircle,
              )}
              <div className="text-sm font-mono font-black uppercase tracking-wide">
                {wbRegistry.monsters_module?.title || '4 Tyrant Classes'}
              </div>
              <p className="text-[11px] font-serif italic text-brand-primary/70 mt-1 max-w-[130px] underline decoration-dotted">
                {wbRegistry.monsters_module?.subtitle || 'Read Bestiary'}
              </p>
            </button>

            {/* Feature 6: Story Arcs */}
            <div className="flex flex-col justify-between items-center text-center p-4 border-2 border-brand-primary/10 bg-brand-surface-low/30 min-w-[150px] flex-1">
              {renderBentoIcon(
                wbRegistry.story_arcs_module?.icon,
                wbRegistry.story_arcs_module?.symbol,
                Users,
              )}
              <div className="text-sm font-mono font-black uppercase tracking-wide leading-none">
                {wbRegistry.story_arcs_module?.title || '6 Story Arcs, 1 Bible'}
              </div>
              <p className="text-[11px] font-serif italic text-brand-primary/70 mt-1 max-w-[130px]">
                {wbRegistry.story_arcs_module?.subtitle ||
                  'Fully Cross-Referenced'}
              </p>
            </div>

            {/* Feature 7: Magic Items */}
            <button
              onClick={() =>
                handleBentoItemClick(() => {
                  setActiveFeatureDrawer('magic_items');
                  setSelectedItemDetail(null);
                })
              }
              className="flex flex-col justify-between items-center text-center p-4 border-2 border-brand-primary/10 hover:border-brand-primary bg-brand-surface-low/30 hover:bg-brand-surface transition-all min-w-[150px] flex-1 cursor-pointer"
            >
              {renderBentoIcon(
                wbRegistry.magic_items_module?.icon,
                wbRegistry.magic_items_module?.symbol,
                Star,
              )}
              <div className="text-sm font-mono font-black uppercase tracking-wide">
                {wbRegistry.magic_items_module?.title || '5 Key Relics'}
              </div>
              <p className="text-[11px] font-serif italic text-brand-primary/70 mt-1 max-w-[130px] underline decoration-dotted">
                {wbRegistry.magic_items_module?.subtitle || 'Inspect Gear'}
              </p>
            </button>

            {/* Scroll Right Button */}
            <div className="hidden md:flex items-center justify-center min-w-[60px] pl-4 border-l-2 border-brand-primary/15">
              <button
                onClick={() =>
                  handleBentoItemClick(() => {
                    triggerToast('SCROLLING REGISTRY COMPONENT BUFFER MATRIX.');
                    const scrolls = [
                      'subclasses',
                      'spells',
                      'monsters',
                      'magic_items',
                    ];
                    const randIndex = Math.floor(
                      Math.random() * scrolls.length,
                    );
                    setActiveFeatureDrawer(scrolls[randIndex] as any);
                    setSelectedItemDetail(null);
                  })
                }
                className="p-3 bg-brand-surface hover:bg-brand-primary hover:text-brand-surface transition-all border-2 border-brand-primary shadow-hard rounded-none cursor-pointer"
                aria-label="Scroll register node next"
              >
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* END: Features Strip */}

      {/* FOOTER STRIP */}
      <footer className="mt-16 border-t-thick pt-8 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="text-left font-mono uppercase">
          <div className="text-[10px] font-bold text-brand-primary/60 tracking-wider flex flex-wrap items-center gap-1.5">
            <span>CAMP CANDOR SYSTEMS</span>
            <span>|</span>
            <span>PRINTED IN THE KINGDOM OF MANOR</span>
            <span>|</span>
            <span>STATUS:</span>
            <span className="text-[#00E5A3] font-black">ONLINE</span>
          </div>
        </div>
        <div className="shrink-0">
          <button
            onClick={() =>
              triggerToast('TERMINATING SESSION... GUEST REDIRECT INITIATED.')
            }
            className="border-2 border-brand-primary font-mono text-xs font-bold uppercase py-2 px-5 hover:bg-brand-primary hover:text-brand-surface transition-all tracking-wider cursor-pointer bg-white"
          >
            LOG_OUT
          </button>
        </div>
      </footer>

      {/* LIGHTBOX ACTIVE IMAGE ZOOM MODAL */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-primary/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-5xl bg-brand-surface border-thick shadow-hard-lg p-3 md:p-6"
            >
              {/* Header inside Zoom */}
              <div className="flex justify-between items-center mb-4 border-b-thick pb-3">
                <div className="font-mono text-xs font-black uppercase text-brand-primary">
                  HIGH RESOLUTION PLATE: IMAGE INDEX #{activeImgIndex + 1}
                </div>
                <button
                  onClick={() => setZoomOpen(false)}
                  className="p-1 border-2 border-brand-primary hover:bg-brand-primary hover:text-brand-surface transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Main zoom image container */}
              <div className="flex items-center justify-center bg-white border-2 border-brand-primary p-2 h-[70vh] relative overflow-hidden group">
                <img
                  src={PRODUCT_IMAGES[activeImgIndex].url}
                  alt={PRODUCT_IMAGES[activeImgIndex].alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain grayscale contrast-125 select-none"
                />
              </div>

              {/* Footer specs */}
              <div className="mt-4 flex flex-wrap justify-between items-center gap-3 font-mono text-[10px] text-brand-primary/60">
                <div className="font-bold">
                  PLATE EXPLANATION:{' '}
                  {PRODUCT_IMAGES[activeImgIndex].caption.toUpperCase()}
                </div>
                <div className="font-bold bg-brand-accent px-2 py-0.5 border border-brand-primary text-brand-primary">
                  ZOOM NODE CLEARED [100% SCALE]
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOCK RULEBOOK SEARCH TERMINAL MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-primary/80 z-50 flex items-start justify-center p-4 md:p-12 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              className="w-full max-w-3xl bg-brand-surface border-thick shadow-hard-lg mt-8"
            >
              {/* Terminal search box header */}
              <div className="bg-brand-primary text-brand-surface p-4 flex justify-between items-center border-b-thick">
                <div className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-wider">
                  <TerminalIcon className="w-5 h-5 text-brand-accent animate-pulse" />
                  <span>Interactive Search Node Terminal [v5.5e]</span>
                </div>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-brand-surface hover:text-brand-accent transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search input stage */}
              <div className="p-6 border-b-2 border-brand-primary/20">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ENTER QUERY (e.g. Subclasses, Spells, Szass Tam, Astrolabe)..."
                    className="w-full border-thick bg-white p-4 font-mono text-sm uppercase font-black placeholder-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-accent transition-all text-brand-primary rounded-none"
                    autoFocus
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-brand-primary/30 font-bold">
                    ESC to Exit
                  </div>
                </div>
              </div>

              {/* Results console */}
              <div className="p-6 max-h-[400px] overflow-y-auto">
                {searchQuery.trim() === '' ? (
                  <div className="text-center py-8 font-mono text-xs text-brand-primary/50 font-bold">
                    [ ENTER TERMS TO INITIATE ARCHIVAL LOG QUERY ]
                    <div className="mt-2 text-[10px] uppercase">
                      Suggested searches: "Subclasses", "Spells", "Lich",
                      "Items"
                    </div>
                  </div>
                ) : mockSearchResults.length === 0 ? (
                  <div className="text-center py-8 font-mono text-xs text-red-600 font-bold">
                    [ ACCESS BLOCKED: ZERO RESULTS FOR "
                    {searchQuery.toUpperCase()}" IN THE 5.5E REPOSITORY ]
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="font-mono text-[10px] text-brand-primary/40 font-bold uppercase mb-2">
                      Query results: Found {mockSearchResults.length} record
                      nodes
                    </div>
                    {mockSearchResults.map((res, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          triggerToast(
                            `RECORD EXAMINED: ${res.title.toUpperCase()}`,
                          );
                          setSearchOpen(false);
                          setSearchQuery('');
                          if (
                            res.title.includes('Chapter II') ||
                            res.title.includes('Subclass')
                          ) {
                            setActiveFeatureDrawer('subclasses');
                          } else if (
                            res.title.includes('Chapter IV') ||
                            res.title.includes('Thay')
                          ) {
                            setActiveFeatureDrawer('monsters');
                          } else if (
                            res.title.includes('Astrolabe') ||
                            res.title.includes('Item')
                          ) {
                            setActiveFeatureDrawer('magic_items');
                          }
                        }}
                        className="border-2 border-brand-primary p-4 hover:bg-brand-primary hover:text-brand-surface transition-all cursor-pointer group text-left bg-white"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs font-black uppercase tracking-wide group-hover:text-brand-surface">
                            {res.title}
                          </span>
                          <span className="font-mono text-[9px] bg-brand-accent text-brand-primary border border-brand-primary px-2 py-0.5 group-hover:bg-brand-surface group-hover:text-brand-primary">
                            {res.type}
                          </span>
                        </div>
                        <p className="font-serif text-xs text-brand-primary/80 mt-1 group-hover:text-brand-surface/90">
                          {res.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LORE LOG DRAWER OVERLAY (Subclasses, Spells, Monsters, Magic Items) */}
      <AnimatePresence>
        {activeFeatureDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-primary/70 z-50 flex justify-end backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="w-full max-w-2xl bg-brand-surface border-l-thick h-full flex flex-col shadow-hard-lg"
            >
              {/* Drawer Header */}
              <div className="bg-brand-primary text-brand-surface p-5 flex justify-between items-center border-b-thick shrink-0">
                <div className="flex items-center gap-2.5 font-mono text-sm font-black uppercase tracking-wider">
                  <TerminalIcon className="w-5 h-5 text-brand-accent animate-pulse" />
                  <span>
                    {activeFeatureDrawer === 'subclasses' &&
                      (wbRegistry.factions_module?.drawer_title ||
                        'Archival Codex: 8 Key Factions')}
                    {activeFeatureDrawer === 'spells' &&
                      (wbRegistry.modalities_module?.drawer_title ||
                        'Modalities: 5 World Rules')}
                    {activeFeatureDrawer === 'monsters' &&
                      (wbRegistry.monsters_module?.drawer_title ||
                        'Threats: Swamp Tyrant Bestiary')}
                    {activeFeatureDrawer === 'magic_items' &&
                      (wbRegistry.magic_items_module?.drawer_title ||
                        'Equipment: 5 Tactical Relics')}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveFeatureDrawer(null);
                    setSelectedItemDetail(null);
                  }}
                  className="text-brand-surface hover:text-brand-accent transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer split layout */}
              <div className="flex-grow flex overflow-hidden">
                {/* Left pane: Navigation list */}
                <div className="w-2/5 border-r-2 border-brand-primary/25 overflow-y-auto p-4 bg-brand-surface-low/50">
                  <div className="font-mono text-[9px] font-black text-brand-primary/45 uppercase tracking-wider mb-2">
                    {wbRegistry.drawer_records_label || 'RECORDS LIST'}
                  </div>
                  <div className="space-y-2">
                    {/* Render corresponding items from json data object */}
                    {activeFeatureDrawer === 'subclasses' &&
                      subclassesList.map((sub: any) => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedItemDetail(sub)}
                          className={`w-full text-left p-2.5 border-2 border-brand-primary text-xs font-mono font-bold uppercase transition-all flex justify-between items-center ${
                            selectedItemDetail?.id === sub.id
                              ? 'bg-brand-primary text-brand-surface'
                              : 'bg-white hover:bg-brand-surface-high'
                          }`}
                        >
                          <span className="truncate">{sub.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                        </button>
                      ))}
                    {activeFeatureDrawer === 'spells' &&
                      spellsList.map((spell: any) => (
                        <button
                          key={spell.id}
                          onClick={() => setSelectedItemDetail(spell)}
                          className={`w-full text-left p-2.5 border-2 border-brand-primary text-xs font-mono font-bold uppercase transition-all flex justify-between items-center ${
                            selectedItemDetail?.id === spell.id
                              ? 'bg-brand-primary text-brand-surface'
                              : 'bg-white hover:bg-brand-surface-high'
                          }`}
                        >
                          <span className="truncate">{spell.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                        </button>
                      ))}
                    {activeFeatureDrawer === 'monsters' &&
                      monstersList.map((mon: any) => (
                        <button
                          key={mon.id}
                          onClick={() => setSelectedItemDetail(mon)}
                          className={`w-full text-left p-2.5 border-2 border-brand-primary text-xs font-mono font-bold uppercase transition-all flex justify-between items-center ${
                            selectedItemDetail?.id === mon.id
                              ? 'bg-brand-primary text-brand-surface'
                              : 'bg-white hover:bg-brand-surface-high'
                          }`}
                        >
                          <span className="truncate">{mon.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                        </button>
                      ))}
                    {activeFeatureDrawer === 'magic_items' &&
                      magicItemsList.map((item: any) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedItemDetail(item)}
                          className={`w-full text-left p-2.5 border-2 border-brand-primary text-xs font-mono font-bold uppercase transition-all flex justify-between items-center ${
                            selectedItemDetail?.id === item.id
                              ? 'bg-brand-primary text-brand-surface'
                              : 'bg-white hover:bg-brand-surface-high'
                          }`}
                        >
                          <span className="truncate">{item.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                        </button>
                      ))}
                  </div>
                </div>

                {/* Right pane: Active details sheet */}
                <div className="w-3/5 overflow-y-auto p-6 bg-white flex flex-col justify-between">
                  {selectedItemDetail ? (
                    <div>
                      {/* Class Type or Spell Level Header */}
                      <div className="flex justify-between items-center border-b-2 border-brand-primary/15 pb-3.5 mb-4">
                        <div>
                          <h3 className="text-2xl font-black uppercase text-brand-primary leading-tight">
                            {selectedItemDetail.name}
                          </h3>
                          <div className="text-[10px] font-mono uppercase bg-brand-accent px-2 py-0.5 mt-1 text-brand-primary border border-brand-primary w-fit font-bold">
                            {selectedItemDetail.classType ||
                              selectedItemDetail.level ||
                              selectedItemDetail.type ||
                              selectedItemDetail.rarity}
                          </div>
                        </div>
                      </div>

                      {/* Content sheets */}
                      <div className="space-y-4">
                        {/* Source citations */}
                        {selectedItemDetail.source && (
                          <div className="font-mono text-[10px] text-brand-primary/50 font-bold uppercase">
                            Coded Source: {selectedItemDetail.source}
                          </div>
                        )}

                        {/* Narrative */}
                        <div className="font-serif text-base text-brand-primary/90 leading-relaxed border-l-4 border-brand-primary pl-4">
                          {selectedItemDetail.description}
                        </div>

                        {/* Special attributes */}
                        {/* Spell stats detail */}
                        {selectedItemDetail.school && (
                          <div className="bg-brand-surface-low p-3 border border-brand-primary font-mono text-[11px] leading-relaxed space-y-1">
                            <div>
                              <strong>SCHOOL:</strong>{' '}
                              {selectedItemDetail.school}
                            </div>
                            <div>
                              <strong>CAST TIME:</strong>{' '}
                              {selectedItemDetail.castingTime}
                            </div>
                            <div>
                              <strong>RANGE:</strong> {selectedItemDetail.range}
                            </div>
                            <div>
                              <strong>COMPONENTS:</strong>{' '}
                              {selectedItemDetail.components}
                            </div>
                            <div>
                              <strong>DURATION:</strong>{' '}
                              {selectedItemDetail.duration}
                            </div>
                          </div>
                        )}

                        {/* Monster Stats Grid */}
                        {selectedItemDetail.stats && (
                          <div className="border-thick p-3 bg-brand-surface shadow-hard-sm">
                            <div className="font-mono text-[10px] font-black uppercase border-b border-brand-primary pb-1 mb-2">
                              Threat Specifications ({selectedItemDetail.cr})
                            </div>
                            <div className="grid grid-cols-6 gap-1.5 text-center font-mono">
                              <div className="bg-white p-1 border border-brand-primary">
                                <div className="text-[9px] uppercase font-bold text-brand-primary/40">
                                  Str
                                </div>
                                <div className="text-xs font-bold">
                                  {selectedItemDetail.stats.str}
                                </div>
                              </div>
                              <div className="bg-white p-1 border border-brand-primary">
                                <div className="text-[9px] uppercase font-bold text-brand-primary/40">
                                  Dex
                                </div>
                                <div className="text-xs font-bold">
                                  {selectedItemDetail.stats.dex}
                                </div>
                              </div>
                              <div className="bg-white p-1 border border-brand-primary">
                                <div className="text-[9px] uppercase font-bold text-brand-primary/40">
                                  Con
                                </div>
                                <div className="text-xs font-bold">
                                  {selectedItemDetail.stats.con}
                                </div>
                              </div>
                              <div className="bg-white p-1 border border-brand-primary">
                                <div className="text-[9px] uppercase font-bold text-brand-primary/40">
                                  Int
                                </div>
                                <div className="text-xs font-bold">
                                  {selectedItemDetail.stats.int}
                                </div>
                              </div>
                              <div className="bg-white p-1 border border-brand-primary">
                                <div className="text-[9px] uppercase font-bold text-brand-primary/40">
                                  Wis
                                </div>
                                <div className="text-xs font-bold">
                                  {selectedItemDetail.stats.wis}
                                </div>
                              </div>
                              <div className="bg-white p-1 border border-brand-primary">
                                <div className="text-[9px] uppercase font-bold text-brand-primary/40">
                                  Cha
                                </div>
                                <div className="text-xs font-bold">
                                  {selectedItemDetail.stats.cha}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 font-mono text-[10px] leading-snug">
                              <strong>HP Matrix:</strong>{' '}
                              {selectedItemDetail.hp} |{' '}
                              <strong>Armored Core:</strong>{' '}
                              {selectedItemDetail.ac} AC
                            </div>
                          </div>
                        )}

                        {/* Subclass details */}
                        {selectedItemDetail.specialFeature && (
                          <div className="border-2 border-brand-primary p-3 bg-brand-surface-low/50">
                            <h4 className="font-mono text-xs font-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-brand-primary">
                              <Sparkles className="w-4 h-4 text-brand-accent fill-brand-primary stroke-[1.5]" />
                              <span>Featured Trait Blueprint</span>
                            </h4>
                            <p className="font-serif text-sm leading-relaxed text-brand-primary/80">
                              {selectedItemDetail.specialFeature}
                            </p>
                          </div>
                        )}

                        {/* Magic Item properties list */}
                        {selectedItemDetail.properties && (
                          <div className="space-y-2">
                            <div className="font-mono text-[10px] font-black text-brand-primary/60 uppercase">
                              MAGICAL PROPERTY NODES:
                            </div>
                            <ul className="font-mono text-[11px] list-disc pl-4 space-y-1 text-brand-primary/95">
                              {selectedItemDetail.properties.map(
                                (prop: string, idx: number) => (
                                  <li key={idx}>{prop}</li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-brand-primary/40 font-mono">
                      <TerminalIcon className="w-12 h-12 stroke-[1] mb-2 animate-pulse" />
                      <span className="text-xs font-black">
                        SELECT A RECORD ITEM NODE FROM THE LEFT FILE EXPLORER TO
                        READ CONTENTS
                      </span>
                    </div>
                  )}

                  {/* Footer metadata read */}
                  <div className="border-t border-brand-primary/10 pt-3 mt-6 text-[9px] font-mono font-bold uppercase text-brand-primary/30 text-right">
                    Clearance Security Code: SECURE-LOG-LEVEL-2
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC PRE-ORDER DRAWERS (checkout flow) */}
      <AnimatePresence>
        {preOrderDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-primary/70 z-50 flex justify-end backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="w-full max-w-lg bg-brand-surface border-l-thick h-full flex flex-col shadow-hard-lg overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="bg-brand-primary text-brand-surface p-5 flex justify-between items-center border-b-thick shrink-0">
                <div className="flex items-center gap-2.5 font-mono text-xs font-black uppercase tracking-widest">
                  <TerminalIcon className="w-5 h-5 text-brand-accent animate-pulse" />
                  <span>
                    Pre-Order Secure Console [Matrix {checkoutStep}/3]
                  </span>
                </div>
                <button
                  onClick={() => setPreOrderDrawerOpen(false)}
                  className="text-brand-surface hover:text-brand-accent transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Breadcrumbs */}
              <div className="border-b border-brand-primary/10 p-4 font-mono text-[9px] font-bold uppercase flex justify-between bg-brand-surface-low">
                <span
                  className={
                    checkoutStep === 1
                      ? 'text-brand-primary font-black underline decoration-2'
                      : 'text-brand-primary/40'
                  }
                >
                  1. Order Summary
                </span>
                <span>▶</span>
                <span
                  className={
                    checkoutStep === 2
                      ? 'text-brand-primary font-black underline decoration-2'
                      : 'text-brand-primary/40'
                  }
                >
                  2. Shipping clearance
                </span>
                <span>▶</span>
                <span
                  className={
                    checkoutStep === 3
                      ? 'text-brand-primary font-black underline decoration-2'
                      : 'text-brand-primary/40'
                  }
                >
                  3. Secured docket
                </span>
              </div>

              {/* Drawer Content */}
              <div className="flex-grow p-6 flex flex-col justify-between">
                {/* STEP 1: ORDER SUMMARY REVIEW */}
                {checkoutStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-mono text-xs font-black uppercase tracking-wider mb-3">
                        Review Pre-Order Manifest
                      </h3>

                      {/* Product line card */}
                      <div className="border-thick p-4 bg-white shadow-hard-sm flex gap-4">
                        <img
                          src={PRODUCT_PRIMARY_IMAGE}
                          alt="Bundle Cover"
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover grayscale border border-brand-primary"
                        />
                        <div className="flex-grow">
                          <h4 className="font-mono text-xs font-black uppercase leading-tight">
                            Mythrokahn
                          </h4>
                          <div className="text-[10px] font-mono text-brand-primary/50 mt-1 uppercase font-bold">
                            CAA Approved Smyth Leather Binder + Confluence
                            Access
                          </div>
                          <div className="mt-2 flex justify-between items-baseline font-mono text-xs">
                            <span className="font-bold">
                              Quantity: {quantity}
                            </span>
                            <span className="font-black">
                              ${(basePrice * quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pre-order bonuses list & add-ons box (Matches exact provided reference layout with right-side photo) */}
                    <div className="bg-brand-surface-low p-3.5 md:p-4 border-2 border-dashed border-brand-primary/30 flex items-stretch gap-3 md:gap-4">
                      {/* Left side: Full height vertical toggle switch in custom olive color */}
                      <label
                        className="relative inline-flex cursor-pointer shrink-0 self-stretch my-0"
                        id="printed-book-toggle-wrapper"
                      >
                        <input
                          type="checkbox"
                          id="printed-book-toggle"
                          checked={includePrintedWorldBook}
                          onChange={(e) => {
                            setIncludePrintedWorldBook(e.target.checked);
                            triggerToast(
                              e.target.checked
                                ? 'ADD-ON ATTACHED: PRINTED WORLD SETTING BOOK (+$30.00)'
                                : 'ADD-ON REMOVED: PRINTED WORLD SETTING BOOK',
                            );
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-20 md:w-24 h-full min-h-[110px] bg-white border-2 border-[#85762B] peer-checked:bg-[#85762B]/10 transition-colors relative p-1 select-none flex flex-col justify-between">
                          <div
                            className={`w-full h-8 border-2 border-[#85762B] transition-all duration-200 flex items-center justify-center font-mono text-[9px] font-black tracking-widest bg-[#85762B] text-white shadow-sm ${
                              includePrintedWorldBook ? 'mt-0' : 'mt-auto'
                            }`}
                          >
                            {includePrintedWorldBook ? 'ON' : 'OFF'}
                          </div>
                        </div>
                      </label>

                      {/* Middle: Printed book info & pre-order bonuses */}
                      <div className="flex-1 space-y-2.5 min-w-0 flex flex-col justify-between">
                        {/* Printed World Setting Book Add-On Header */}
                        <div>
                          <div className="flex items-center gap-1.5 font-mono text-[10px] md:text-[11px] font-black text-brand-primary uppercase">
                            <BookOpen className="w-3.5 h-3.5 text-[#85762B] shrink-0" />
                            <span>
                              {pricing.printed_world_book_label ||
                                'PRINTED WORLD SETTING BOOK'}
                            </span>
                          </div>
                          <span className="font-serif italic text-[10px] md:text-[11px] text-brand-primary/75 block mt-0.5 leading-tight">
                            Add physical hardcover edition shipped to your
                            address (+${printedWorldBookFee.toFixed(2)} fee)
                          </span>
                        </div>

                        {/* Unlocked pre-order bonuses */}
                        <div className="border-t border-dashed border-brand-primary/30 pt-2">
                          <div className="font-mono text-[9px] md:text-[10px] font-black text-brand-primary/80 uppercase mb-1">
                            UNLOCKED PRE-ORDER BONUSES INCLUDED (FREE):
                          </div>
                          <ul className="font-mono text-[8.5px] md:text-[9px] space-y-1 text-brand-primary/90 pl-0.5 list-none">
                            <li className="flex items-center gap-1.5">
                              <span className="text-green-600 font-black">
                                ✓
                              </span>
                              <span className="truncate">
                                CONFLUENCE WIKI DIGITAL CODEX KEY [VALUED AT
                                $29.99]
                              </span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="text-green-600 font-black">
                                ✓
                              </span>
                              <span className="truncate">
                                HIGH-RES TRANSMEDIA CONCEPT ART PACK [VALUED AT
                                $15.00]
                              </span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="text-green-600 font-black">
                                ✓
                              </span>
                              <span className="truncate">
                                CAA SANDBOX STORY CAMPAIGN MODULE [VALUED AT
                                $19.99]
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Right side: Photo thumbnail matching reference image */}
                      <div className="shrink-0 w-20 md:w-28 h-full min-h-[110px] border-2 border-brand-primary relative bg-brand-surface overflow-hidden flex flex-col justify-center">
                        <img
                          src="https://picsum.photos/seed/swamp-city/800/1000"
                          alt="World Setting Hardcover Edition Preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-brand-primary/80 text-brand-surface font-mono text-[8px] font-bold text-center py-0.5 uppercase tracking-tighter">
                          HARDCOVER
                        </div>
                      </div>
                    </div>

                    {/* Cost Ledger breakdown */}
                    <div className="border-thick p-4 bg-brand-surface shadow-hard-sm font-mono text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold uppercase text-brand-primary/60">
                          Base Subtotal:
                        </span>
                        <span className="font-bold">
                          ${baseSubtotal.toFixed(2)}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {includePrintedWorldBook && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, scaleY: 0.8 }}
                            animate={{ opacity: 1, height: 'auto', scaleY: 1 }}
                            exit={{ opacity: 0, height: 0, scaleY: 0.8 }}
                            transition={{
                              type: 'spring',
                              stiffness: 350,
                              damping: 25,
                            }}
                            className="overflow-hidden"
                          >
                            <div className="flex justify-between text-brand-primary font-bold bg-brand-accent/40 px-2 py-1.5 border-l-4 border-[#85762B] my-1 shadow-sm rounded-r-sm">
                              <motion.span
                                initial={{ x: -12 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.05 }}
                                className="uppercase text-[11px] flex items-center gap-1.5"
                              >
                                <BookOpen className="w-3.5 h-3.5 text-[#85762B]" />
                                Printed World Setting Book:
                              </motion.span>
                              <motion.span
                                initial={{ scale: 1.25, color: '#85762B' }}
                                animate={{ scale: 1, color: 'inherit' }}
                                transition={{ duration: 0.3 }}
                              >
                                +${printedWorldBookFee.toFixed(2)}
                              </motion.span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="flex justify-between">
                        <span className="font-bold uppercase text-brand-primary/60">
                          Secure Ground Shipping:
                        </span>
                        <span className="font-bold">
                          {shipping === 0
                            ? `FREE (OVER $${freeShippingThreshold.toFixed(0)})`
                            : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold uppercase text-brand-primary/60">
                          {pricing.tax_label ||
                            `Arcane Registry Tax (${(salesTaxRate * 100).toFixed(1)}%)`}
                          :
                        </span>
                        <span className="font-bold">${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-brand-primary/10 pt-2 flex justify-between text-sm font-black items-center">
                        <span className="uppercase text-brand-primary">
                          Final Total charge:
                        </span>
                        <motion.span
                          key={total}
                          initial={{
                            scale: 1.15,
                            backgroundColor: '#85762B',
                            color: '#ffffff',
                          }}
                          animate={{
                            scale: 1,
                            backgroundColor:
                              'var(--color-brand-accent, #eab308)',
                            color: 'inherit',
                          }}
                          transition={{ duration: 0.35 }}
                          className="bg-brand-accent px-2 py-0.5 inline-block font-black"
                        >
                          ${total.toFixed(2)}
                        </motion.span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="w-full btn-brutal btn-brutal-primary py-4 font-mono font-black uppercase tracking-wider text-sm mt-4 text-center"
                    >
                      Proceed to Shipping &amp; Payment ▶
                    </button>
                  </div>
                )}

                {/* STEP 2: SHIPPING DETAILS & CREDIT CARD PUNCH CARD */}
                {checkoutStep === 2 && (
                  <form onSubmit={handlePreOrderSubmit} className="space-y-4">
                    <h3 className="font-mono text-xs font-black uppercase tracking-wider border-b border-brand-primary/10 pb-2">
                      Shipping clearance &amp; Credentials
                    </h3>

                    <div className="space-y-3 font-mono text-xs">
                      {/* Name */}
                      <div>
                        <label className="block font-black uppercase text-brand-primary/60 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={preOrderForm.fullName}
                          onChange={(e) =>
                            setPreOrderForm({
                              ...preOrderForm,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full border-2 border-brand-primary bg-white px-3 py-2 font-black rounded-none uppercase focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        />
                      </div>

                      {/* Email - prefilled with client email */}
                      <div>
                        <label className="block font-black uppercase text-brand-primary/60 mb-1">
                          Clearance Email
                        </label>
                        <input
                          type="email"
                          required
                          value={preOrderForm.email}
                          onChange={(e) =>
                            setPreOrderForm({
                              ...preOrderForm,
                              email: e.target.value,
                            })
                          }
                          className="w-full border-2 border-brand-primary bg-white px-3 py-2 font-black rounded-none focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block font-black uppercase text-brand-primary/60 mb-1">
                          Shipping Address
                        </label>
                        <input
                          type="text"
                          required
                          value={preOrderForm.address}
                          onChange={(e) =>
                            setPreOrderForm({
                              ...preOrderForm,
                              address: e.target.value,
                            })
                          }
                          className="w-full border-2 border-brand-primary bg-white px-3 py-2 font-black rounded-none uppercase focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        />
                      </div>

                      {/* City/State/Zip */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-black uppercase text-brand-primary/60 mb-1">
                            City Node
                          </label>
                          <input
                            type="text"
                            required
                            value={preOrderForm.city}
                            onChange={(e) =>
                              setPreOrderForm({
                                ...preOrderForm,
                                city: e.target.value,
                              })
                            }
                            className="w-full border-2 border-brand-primary bg-white px-3 py-2 font-black rounded-none uppercase focus:ring-2 focus:ring-brand-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-black uppercase text-brand-primary/60 mb-1">
                            Zip/Postal Code
                          </label>
                          <input
                            type="text"
                            required
                            value={preOrderForm.zipCode}
                            onChange={(e) =>
                              setPreOrderForm({
                                ...preOrderForm,
                                zipCode: e.target.value,
                              })
                            }
                            className="w-full border-2 border-brand-primary bg-white px-3 py-2 font-black rounded-none uppercase focus:ring-2 focus:ring-brand-accent focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Secure Card Punch */}
                      <div className="border-thick p-4 bg-brand-surface-low shadow-hard-sm mt-4">
                        <div className="font-mono text-[10px] font-black uppercase text-brand-primary/70 mb-2 flex items-center gap-1">
                          <ShieldAlert className="w-4 h-4 text-brand-primary stroke-[2.5]" />
                          <span>Simulated Arcane Card Clearance</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-brand-primary/60 mb-0.5">
                              Card Number
                            </label>
                            <input
                              type="text"
                              required
                              value={preOrderForm.cardNumber}
                              onChange={(e) =>
                                setPreOrderForm({
                                  ...preOrderForm,
                                  cardNumber: e.target.value,
                                })
                              }
                              className="w-full border-2 border-brand-primary bg-white px-2 py-1 font-black text-xs rounded-none focus:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold uppercase text-brand-primary/60 mb-0.5">
                                Expiry
                              </label>
                              <input
                                type="text"
                                required
                                value={preOrderForm.cardExpiry}
                                onChange={(e) =>
                                  setPreOrderForm({
                                    ...preOrderForm,
                                    cardExpiry: e.target.value,
                                  })
                                }
                                className="w-full border-2 border-brand-primary bg-white px-2 py-1 font-black text-xs rounded-none text-center focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase text-brand-primary/60 mb-0.5">
                                CVV/CVC
                              </label>
                              <input
                                type="text"
                                required
                                value={preOrderForm.cardCvc}
                                onChange={(e) =>
                                  setPreOrderForm({
                                    ...preOrderForm,
                                    cardCvc: e.target.value,
                                  })
                                }
                                className="w-full border-2 border-brand-primary bg-white px-2 py-1 font-black text-xs rounded-none text-center focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing total display */}
                    <div className="flex justify-between items-center font-mono text-xs border-t border-brand-primary/10 pt-3 mt-4">
                      <span className="font-bold">Total Bill:</span>
                      <span className="text-base font-black bg-brand-accent px-2 py-0.5 border border-brand-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    <div className="space-y-3 mt-4">
                      <button
                        type="submit"
                        className="w-full btn-brutal btn-brutal-primary py-4 font-mono font-black uppercase tracking-wider text-sm text-center"
                      >
                        Authorize Pre-Order Ticket ✔
                      </button>

                      <button
                        type="button"
                        onClick={() => setCheckoutStep(1)}
                        className="w-full btn-brutal py-3.5 font-mono font-black uppercase tracking-wider text-xs text-center flex items-center justify-center gap-1.5"
                      >
                        <span>◀ Return to [1. Order Summary]</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: PRE-ORDER SECURED SUCCESS DOCKET */}
                {checkoutStep === 3 && confirmedOrder && (
                  <div className="space-y-6">
                    <div className="text-center py-6 border-thick bg-brand-primary text-brand-surface shadow-hard">
                      <Check className="w-12 h-12 text-brand-accent stroke-[3.5] mx-auto mb-2 animate-bounce" />
                      <h3 className="font-mono text-base font-black uppercase tracking-widest leading-none mb-1">
                        Pre-Order Secured
                      </h3>
                      <p className="font-mono text-[10px] text-brand-surface/70 font-bold uppercase">
                        Ticket Node: {confirmedOrder.orderId}
                      </p>
                    </div>

                    {/* Physical ticket docket readout */}
                    <div className="border-thick bg-white p-4 font-mono text-[11px] leading-relaxed shadow-hard-sm relative overflow-hidden">
                      {/* Sideline dashes to make it look like paper */}
                      <div className="absolute top-0 bottom-0 left-0 w-1 border-r border-dashed border-brand-primary/30" />

                      <div className="text-center border-b border-brand-primary pb-3 mb-3">
                        <div className="font-black text-xs tracking-wider">
                          THE ARCHIVE PROTOCOL RECEIPT
                        </div>
                        <div className="text-[9px] text-brand-primary/50 font-bold">
                          {confirmedOrder.timestamp}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <strong>NAME:</strong>{' '}
                          {confirmedOrder.fullName.toUpperCase()}
                        </div>
                        <div>
                          <strong>CLEARANCE EMAIL:</strong>{' '}
                          {confirmedOrder.email}
                        </div>
                        <div>
                          <strong>SHIPPING NODE:</strong>{' '}
                          {confirmedOrder.address.toUpperCase()},{' '}
                          {confirmedOrder.city.toUpperCase()}
                        </div>
                        <div className="border-y border-brand-primary/15 py-2 my-2 space-y-1">
                          <div className="flex justify-between font-black">
                            <span>
                              ALLIGATOR ALLEY CODEX (Qty:{' '}
                              {confirmedOrder.quantity})
                            </span>
                            <span>
                              $
                              {(basePrice * confirmedOrder.quantity).toFixed(2)}
                            </span>
                          </div>
                          {confirmedOrder.includePrintedWorldBook && (
                            <div className="flex justify-between font-bold text-[10px] text-brand-primary">
                              <span>+ PRINTED WORLD SETTING BOOK</span>
                              <span>+$30.00</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-1 text-[10px]">
                          <div className="flex justify-between">
                            <span>SHIPPING (MATRIX GROUND):</span>
                            <span>
                              {confirmedOrder.shipping === 0
                                ? 'FREE'
                                : `$${confirmedOrder.shipping.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>ARCANE TAX (8.5%):</span>
                            <span>${confirmedOrder.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-black text-xs border-t border-brand-primary/10 pt-1.5 mt-1.5">
                            <span>TOTAL SECURED CHARGED:</span>
                            <span className="bg-brand-accent px-1.5 border border-brand-primary">
                              ${confirmedOrder.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Receipt controls */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={downloadReceipt}
                        className="btn-brutal py-3 font-mono font-black uppercase text-xs text-center flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4 stroke-[2.5]" />
                        <span>Download Receipt</span>
                      </button>
                      <button
                        onClick={() => {
                          setPreOrderDrawerOpen(false);
                          setCheckoutStep(1);
                        }}
                        className="btn-brutal btn-brutal-primary py-3 font-mono font-black uppercase text-xs text-center flex items-center justify-center"
                      >
                        <span>Close Console</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Secure certificate footer */}
                <div className="border-t border-brand-primary/10 pt-4 mt-6 flex justify-between items-center font-mono text-[9px] text-brand-primary/30 font-bold uppercase shrink-0">
                  <span>SSL CLEARANCE PROTOCOL: ACTIVE</span>
                  <span>ENCRYPTION: SHIELD-AES-256</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Floating Database Schema Button in bottom-right corner */}
      <button
        id="fixed-database-btn"
        onClick={() => toggleDbMode(true)}
        className="fixed bottom-6 right-6 z-50 font-mono text-xs font-bold uppercase tracking-wider bg-brand-surface border-thick shadow-hard p-3 hover:bg-brand-primary hover:text-brand-surface transition-all flex items-center gap-2 cursor-pointer"
        title="Open Archive Database Schema Interface (?db=true)"
        aria-label="Open Database Schema"
      >
        <Database className="w-5 h-5 stroke-[2.5]" />
        <span className="hidden sm:inline font-black">?db=true</span>
      </button>
    </div>
  );
}
