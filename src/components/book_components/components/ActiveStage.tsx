import React, { useState, useRef, useEffect } from 'react';
import { LibraryItem, CanonTarget } from '../types';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  X,
  ArrowLeft,
  BookOpen,
  Check,
  Heart,
  Settings,
  Activity,
  RefreshCw,
  Zap,
  ExternalLink,
  AlertTriangle,
  Compass,
  Sliders,
  Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActiveStageProps {
  key?: React.Key | string;
  selectedItem: LibraryItem | null;
  onClearSelection: () => void;
  rightDrawerOpen: boolean;
  setRightDrawerOpen: (o: boolean) => void;
  leftDrawerOpen: boolean;
  setLeftDrawerOpen: (o: boolean) => void;
  enableJumpToSection?: boolean;
}

interface ArticleData {
  title: string;
  desc: string;
  pages: string;
  detailQuote: string;
  detailParagraphs: string[];
}

interface SpecRow {
  param: string;
  spec: string;
}

interface BookTheme {
  ref1: string;
  ref2: string;
  drawerTitle: string;
  drawerQuote: string;
  drawerParagraphs: string[];
  articles: ArticleData[];
  specs: SpecRow[];
  pubSpecs: SpecRow[];
}

// Custom curated static theme data for Primal Mama (Alligator theme)
const PRIMAL_MAMA_THEME: BookTheme = {
  ref1: 'REF. 01',
  ref2: 'REF. 02',
  drawerTitle: 'ALL AMERICAN ALLIGATOR DELIVERY SYSTEM OF PRIMAL MAMA',
  drawerQuote:
    '"A legendary high-stamina beastmaster relic forged in Saronite and Titansteel. Built for the rigorous demands of deep instanced dungeons and high-damage tanking."',
  drawerParagraphs: [
    'Engineered specifically for extreme damage-soak operations, providing massive baseline armor and resistance against structural vibration and severe flame debuffs.',
    'The void-core dark interface is treated with absolute light absorption properties to prevent blinding spells, paired with high-readability neon runes.',
    'This gear piece is individually itemized with ancient Titan runes, verifying its item level and registry within the High-Fidelity Manual.',
  ],
  articles: [
    {
      title: 'ARTICLE I: CORE WORLD IDENTITY & PREMISE',
      desc: "The 'No Beef, Alligator Tail' paradigm. Ecological, economic, and social systems derived from Bovine Absence.",
      pages: 'PAGES: 04 - 38',
      detailQuote:
        '"Establishing the foundational boundaries of the zero-bovine domain."',
      detailParagraphs: [
        'In the absolute absence of bovine lifeforms, the entire ecological cycle of the Great Wetlands has evolved to revolve around alternative high-durability reptilian species.',
        "The harvesting of 'Alligator Tail' has become the cornerstone of regional trade, acting as both a premium fuel source, a raw material for runic leather gear, and a high-status currency.",
      ],
    },
    {
      title: 'ARTICLE II: FOUNDATIONAL MODALITIES',
      desc: 'The rules of world-building as established by the CAA. Real-time alignment of media platforms.',
      pages: 'PAGES: 39 - 88',
      detailQuote: '"The codified directives of structural reality creation."',
      detailParagraphs: [
        'Standardizing rules across multiple media platforms ensures absolute synchronization of the player workspace, keeping the chronological engine coherent.',
        'The Central Authenticated Authority (CAA) publishes guidelines establishing gravity multipliers, weapon swing rates, and local scarcity indices to balance extreme encounters.',
      ],
    },
    {
      title: 'ARTICLE III: KEY FACTIONS & CASTS',
      desc: 'The Culinary Guild, the Swamp Rangers, and the Bovine heretics. Detailed background and design notes.',
      pages: 'PAGES: 89 - 142',
      detailQuote:
        '"A tri-fold struggle for supremacy in the sinking frontier."',
      detailParagraphs: [
        'The Culinary Guild maintains absolute authority over high-fatality seasoning recipes and localized blast-ovens.',
        'The Swamp Rangers patrol the outer bayous, wielding heavy electrified lassos and brass-tipped polearms to restrain wild Swamp Tyrants.',
        'Underground, the Bovine Heretics whisper forbidden myths of a four-legged cloven-hoofed deity that once walked the fields of Aeon, attempting to manifest the Bovine Presence.',
      ],
    },
    {
      title: 'ARTICLE IV: SWAMP TYRANT BESTIARY',
      desc: 'Comprehensive specs of reptilian threats. Biology, habitat, and capture guidelines for 20+ species.',
      pages: 'PAGES: 143 - 210',
      detailQuote:
        '"Classified data logs on apex predators of the deep marsh."',
      detailParagraphs: [
        'The Swamp Tyrant is a colossal, armored crocodilian species exhibiting near-total immunity to traditional heat weaponry and standard frost hazards.',
        'Capturing a live specimen demands a team of five highly trained beastmasters equipped with high-frequency resonance spikes and a Smyth Sewn harness.',
      ],
    },
    {
      title: 'ARTICLE V: RELICS & GEAR BLUEPRINT',
      desc: 'Golden lassos, cleavers, diagnostic scanners, and tactical equipment sheets.',
      pages: 'PAGES: 211 - 250',
      detailQuote: '"The mechanical arsenal of the border-patrol specialists."',
      detailParagraphs: [
        'Tactical gear pieces, such as the Golden Lasso and the Alligator Delivery System, utilize internal electric micro-coils to shock targets upon contact.',
        'Diagnostic scanners analyze target chitin density in real-time, feeding direct numerical data to the DM Command Center console for rapid tactical processing.',
      ],
    },
    {
      title: 'ARTICLE VI: TRANSMEDIA SANDBOX MODULE',
      desc: 'Interactive campaign seeds and narrative arcs for writers, game developers, and artists.',
      pages: 'PAGES: 251 - 288',
      detailQuote:
        '"Multi-threaded campaign orchestration in the zero-bovine sandbox."',
      detailParagraphs: [
        'Offers Dungeon Masters twelve modular encounter tables, sandbox story seeds, and branching narrative paths featuring a heist on the Culinary Guild vault.',
        'Provides writers and developers with detailed cross-reference logs to design coherent side-quests and itemization sheets.',
      ],
    },
  ],
  specs: [
    {
      param: 'SPECIFICATION PROTOCOL',
      spec: 'Alligator Alley Franchise Bible v1.0',
    },
    {
      param: 'CODEX VOLUME',
      spec: '288 Definitive Pages (Matte Paper + Digital Wiki Access)',
    },
    {
      param: 'ARCHIVAL MEDIA',
      spec: '140gsm High-Opacity Uncoated Cream Stock (Heavy ink bounds)',
    },
    {
      param: 'COVER BINDER',
      spec: 'Smyth Sewn Lay-Flat Leather Hardcover with Crimson Ribbon',
    },
    { param: 'FORM FACTOR', spec: '8.5 x 11.2 Inches (Standard Field Format)' },
    {
      param: 'DESIGN STUDIO',
      spec: 'Central Authenticated Authority (CAA) Press',
    },
    {
      param: 'RATIFICATION DATE',
      spec: 'Charter Established (Estimated Release: Autumn 2026)',
    },
    {
      param: 'INTERMEDIA ACCESS',
      spec: 'Includes PDF, Confluence Wiki Code, and VTT Creature Token Packs',
    },
  ],
  pubSpecs: [
    {
      param: 'PUBLISHER HOUSE',
      spec: 'Central Authenticated Authority (CAA) Publishing',
    },
    {
      param: 'ISBN / CATALOG ID',
      spec: 'ISBN 978-1-952041-02-9 | CAA-PUB-881',
    },
    {
      param: 'PRINTING RUN',
      spec: 'Limited 1st Edition Collector Hardcover (5,000 Copies)',
    },
    {
      param: 'PAPER STOCK & WEIGHT',
      spec: '140gsm High-Opacity Cream Stock (Acid-Free)',
    },
    {
      param: 'COVER FINISHING',
      spec: 'Velvet Matte Laminate + Gold Foil Embossing',
    },
    {
      param: 'DISTRIBUTION CHANNELS',
      spec: 'Global Physical Bookstores & Direct CAA Portal',
    },
    {
      param: 'COPYRIGHT & LICENSING',
      spec: '© 2026 CAA Press. All Rights Reserved. OGL 1.0a Compliant',
    },
    {
      param: 'DIGITAL DISTRIBUTION',
      spec: 'DRM-Free PDF, Markdown Wiki, and VTT Token Bundle',
    },
  ],
};

// Generates dynamic theme details for other books so they reuse this glorious layout
function generateBookTheme(item: LibraryItem): BookTheme {
  if (item.id === 'primal-mama') {
    return PRIMAL_MAMA_THEME;
  }

  // Fallback dynamic generation
  const refNum = item.refCode.split(' ')[1] || '01.01.01';
  const articles: ArticleData[] = item.chapters.map((ch, idx) => {
    const artNum = idx + 1;
    const RomanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    const roman = RomanNumerals[idx] || `${artNum}`;

    return {
      title: `ARTICLE ${roman}: ${ch.name.replace(/^[IVX]+\.\s*/, '').toUpperCase()}`,
      desc:
        ch.content.length > 80 ? ch.content.slice(0, 80) + '...' : ch.content,
      pages: `PAGES: ${artNum * 35} - ${(artNum + 1) * 35}`,
      detailQuote: `"${ch.name} detail logs extracted from the official system registry."`,
      detailParagraphs: [
        ch.content,
        `This segment represents crucial operational data for DMs executing campaigns inside the ${item.title} boundary. Read carefully to optimize rule variance tables.`,
      ],
    };
  });

  // If no articles generated, make a dummy one
  if (articles.length === 0) {
    articles.push({
      title: 'ARTICLE I: OVERVIEW & GENERAL PREMISE',
      desc: item.description,
      pages: 'PAGES: 04 - 50',
      detailQuote: `"${item.title} introductory data core."`,
      detailParagraphs: [item.description],
    });
  }

  return {
    ref1: 'REF. 01',
    ref2: `REF. ${refNum.substring(0, 2)}`,
    drawerTitle: `${item.title.toUpperCase()} SYSTEM COMPENDIUM`,
    drawerQuote: `"${item.description}"`,
    drawerParagraphs: [
      `This digital reference contains all verified chapters, tables, and tactical encounter rules required for orchestration.`,
      `All data points are synchronized with Chronos Systems core engine standard v1.4, optimized for high-survival game environments.`,
    ],
    articles,
    specs: [
      {
        param: 'SPECIFICATION PROTOCOL',
        spec: `${item.title} Official Resource Manual`,
      },
      {
        param: 'CODEX VOLUME',
        spec: `${item.metaDetails.join(' | ') || 'Definitive Campaign Guide'}`,
      },
      {
        param: 'ARCHIVAL MEDIA',
        spec: '140gsm High-Opacity Uncoated Cream Stock',
      },
      {
        param: 'COVER BINDER',
        spec: 'Smyth Sewn Lay-Flat Leather Hardcover with Crimson Ribbon',
      },
      {
        param: 'FORM FACTOR',
        spec: '8.5 x 11.2 Inches (Standard Field Format)',
      },
      { param: 'DESIGN STUDIO', spec: 'Chronos Systems Press Authority' },
      {
        param: 'RATIFICATION DATE',
        spec: 'Charter Established (Estimated Release: Autumn 2026)',
      },
      {
        param: 'INTERMEDIA ACCESS',
        spec: 'Includes PDF, Confluence Wiki Code, and VTT Creature Token Packs',
      },
    ],
    pubSpecs: [
      { param: 'PUBLISHER HOUSE', spec: 'Chronos Systems Press Authority' },
      {
        param: 'ISBN / CATALOG ID',
        spec: `ISBN 978-0-994112-${((item.title.length * 17) % 90) + 10}-1 | CHR-PUB-102`,
      },
      {
        param: 'PRINTING RUN',
        spec: '1st Collector Hardcover Edition Printing',
      },
      {
        param: 'PAPER STOCK & WEIGHT',
        spec: '140gsm High-Opacity Uncoated Cream Stock',
      },
      {
        param: 'COVER FINISHING',
        spec: 'Smyth Sewn Lay-Flat Hardcover with Crimson Ribbon',
      },
      {
        param: 'DISTRIBUTION CHANNELS',
        spec: 'Global Physical Bookstores & Digital VTT Platforms',
      },
      {
        param: 'COPYRIGHT & LICENSING',
        spec: `© 2026 Chronos Systems Authority. OGL 1.0a Compliant`,
      },
      {
        param: 'DIGITAL DISTRIBUTION',
        spec: 'DRM-Free PDF, Markdown Wiki, and Token Pack',
      },
    ],
  };
}

const JUMBO_TITLES: Record<string, string[]> = {
  'primal-mama': [
    'ALL AMERICAN',
    'ALLIGATOR DELIVERY',
    'SYSTEM OF PRIMAL',
    'MAMA',
  ],
  'ravenloft-horrors': ['RAVENLOFT', 'THE HORRORS', 'WITHIN', 'DREAD CODES'],
  'ravenloft-bundle': ['RAVENLOFT', 'ULTIMATE', 'GOTHIC TERROR', 'BUNDLE'],
  'northlands-sagas': ['NORTHLANDS', 'SAGAS', 'EPIC CAMPAIGNS', 'FROZEN'],
  'northlands-worldbook': [
    'NORTHLANDS',
    'WORLDBOOK',
    'DEFINITIVE',
    'FROZEN WASTES',
  ],
  'chronos-engine': [
    'CHRONOS SYSTEMS',
    'ENGINE GUIDE',
    'V1.4 CORE',
    'STANDARDS',
  ],
  'iron-lich': ['VAULT OF THE', 'IRON LICH', 'RUSTED MEGA', 'DUNGEON'],
  'old-gods': ['CODEX OF THE', 'OLD GODS', 'FORBIDDEN', 'ELDER LORE'],
  'void-whispers': ['WHISPERS', 'OF THE VOID', 'METALLIC', 'SIGNALS'],
  'star-pharaoh': ['TOMB OF THE', 'STAR PHARAOH', 'BLACK GLASS', 'CRYPT'],
  technomancer: ['TECHNOMANCER', 'MANUAL OF', 'RUNIC SYNTH', 'ARRAYS'],
};

function getJumboLines(item: LibraryItem): string[] {
  if (JUMBO_TITLES[item.id]) {
    return JUMBO_TITLES[item.id];
  }
  const words = `${item.title} ${item.subtitle || ''}`
    .toUpperCase()
    .split(' ')
    .filter(Boolean);
  if (words.length === 0) return ['LORE CODES'];
  if (words.length <= 2) return [words.join(' ')];

  const lines: string[] = [];
  const chunk = Math.ceil(words.length / 3);
  for (let i = 0; i < words.length; i += chunk) {
    lines.push(words.slice(i, i + chunk).join(' '));
  }
  return lines;
}

export default function ActiveStage({
  selectedItem,
  onClearSelection,
  rightDrawerOpen,
  setRightDrawerOpen,
  leftDrawerOpen,
  setLeftDrawerOpen,
  enableJumpToSection = true,
}: ActiveStageProps) {
  // Collapsible Accordion States
  const [jumpOpen, setJumpOpen] = useState(true);
  const [codexOpen, setCodexOpen] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [pubSpecsOpen, setPubSpecsOpen] = useState(false);

  const isFirstRender = useRef(true);

  // Active Article Selection State
  const [activeArticle, setActiveArticle] = useState<ArticleData | null>(null);
  const [leavingToast, setLeavingToast] = useState(false);
  const [pdfToast, setPdfToast] = useState(false);

  // Function to open target data as a clean new HTML document page
  const openTargetHtmlPage = (target: CanonTarget) => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${target.title} - Specification Document</title>
  <style>
    :root {
      --bg: #f7f5f0;
      --text: #0f0f0f;
      --accent: #d9381e;
      --border: #000000;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 860px;
      margin: 0 auto;
      border: 3px solid var(--border);
      background: #ffffff;
      padding: 40px;
      box-shadow: 8px 8px 0px 0px #000000;
    }
    .header {
      border-bottom: 2px solid var(--border);
      padding-bottom: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 15px;
    }
    .badge {
      background: #000;
      color: #fff;
      font-family: monospace;
      font-weight: 800;
      font-size: 11px;
      padding: 6px 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .ref-code {
      font-family: monospace;
      font-size: 12px;
      color: #555;
      font-weight: 700;
    }
    h1 {
      font-family: 'Impact', 'Arial Black', sans-serif;
      font-size: 32px;
      text-transform: uppercase;
      margin: 15px 0;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }
    .quote-box {
      border-left: 4px solid var(--border);
      background: #f0ede6;
      padding: 18px 22px;
      margin: 25px 0;
      font-style: italic;
      font-family: Georgia, serif;
      font-size: 16px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
      margin: 30px 0;
      padding: 20px;
      border: 2px solid #000;
      background: #FAF8F5;
      font-family: monospace;
      font-size: 12px;
    }
    .meta-item label {
      display: block;
      font-size: 10px;
      color: #777;
      text-transform: uppercase;
      font-weight: bold;
    }
    .meta-item span {
      font-weight: bold;
      color: #000;
    }
    .section-title {
      font-family: monospace;
      font-size: 13px;
      font-weight: 900;
      text-transform: uppercase;
      border-bottom: 2px solid #000;
      padding-bottom: 6px;
      margin-top: 35px;
      margin-bottom: 15px;
      letter-spacing: 0.5px;
    }
    p {
      margin-bottom: 18px;
      font-size: 15px;
      color: #222;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid var(--border);
      display: flex;
      justify-content: space-between;
      font-family: monospace;
      font-size: 11px;
      color: #666;
    }
    .actions {
      display: flex;
      gap: 12px;
      margin-top: 30px;
    }
    .btn {
      background: var(--border);
      color: white;
      border: 2px solid #000;
      padding: 10px 20px;
      font-family: monospace;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 3px 3px 0px #000;
      text-transform: uppercase;
      text-decoration: none;
      display: inline-block;
      font-size: 12px;
    }
    .btn:hover {
      background: var(--accent);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="badge">OFFICIAL ARCHIVAL SPECIFICATION</div>
        <div class="ref-code" style="margin-top: 8px;">REF CODE: ${target.refCode}</div>
      </div>
      <div class="badge" style="background: var(--accent);">${target.pages}</div>
    </div>

    <h1>${target.title}</h1>

    <div class="quote-box">
      ${target.quote}
    </div>

    <div class="meta-grid">
      <div class="meta-item">
        <label>DOCUMENT ID</label>
        <span>${target.id.toUpperCase()}</span>
      </div>
      <div class="meta-item">
        <label>CLEARANCE STATUS</label>
        <span>${target.clearance}</span>
      </div>
      <div class="meta-item">
        <label>PAGE / VOLUME SPEC</label>
        <span>${target.pages}</span>
      </div>
      <div class="meta-item">
        <label>ARCHIVE STAMP</label>
        <span>COMMAND CENTER ARCHIVE</span>
      </div>
    </div>

    <div class="section-title">01 // EXECUTIVE SPECIFICATION OVERVIEW</div>
    <p>
      This manuscript documents the complete mechanical parameters, armor ratings, and tactical resolution formulas for <strong>${target.title}</strong>. Engineered to withstand intense high-vibration environments and severe combat scenarios, this record provides canonical guidelines for field operatives and researchers alike.
    </p>

    <div class="section-title">02 // FIELD DEPLOYMENT DIRECTIVES</div>
    <p>
      All data listed within this manuscript is synchronized directly with the primary Command Center repository. Modification or unauthorized redistribution of this volume is strictly regulated under clearance protocols corresponding to status: <strong>${target.clearance}</strong>.
    </p>

    <div class="section-title">03 // MANUSCRIPT RESOLUTION MATRIX</div>
    <p>
      For further data queries or custom configuration adjustments, return to the interactive Command Center dashboard or export the full technical report using the download action.
    </p>

    <div class="actions">
      <button class="btn" onclick="window.print()">PRINT / SAVE AS PDF</button>
      <button class="btn" style="background:#555;" onclick="window.close()">CLOSE WINDOW</button>
    </div>

    <div class="footer">
      <span>COMMAND CENTER ARCHIVE MATRIX</span>
      <span>TIMESTAMP: ${new Date().toLocaleString()}</span>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank', 'noopener,noreferrer');
  };

  // 3 Canon Targets state list for Left Frame
  const [canonTargetsList, setCanonTargetsList] = useState<CanonTarget[]>([
    {
      id: 'target-1',
      targetLabel: 'SELECTED CANON TARGET',
      title: 'ALL AMERICAN ALLIGATOR DELIVERY SYSTEM OF PRIMAL MAMA',
      pages: 'ALL PAGES (288P)',
      quote:
        '"A legendary high-stamina beastmaster relic forged in Saronite and Titansteel. Built for the rigorous demands of deep instanced dungeons and high-damage tanking."',
      refCode: 'REF_N: 01.02.14',
      clearance: 'LEVEL 4 GRANTED',
      isSelected: true,
    },
    {
      id: 'target-2',
      targetLabel: 'SELECTED CANON TARGET',
      title: 'FLORIDA BAYOU TACTICAL FIELD SPECIFICATIONS & BESTIARY',
      pages: 'VOL. II (144P)',
      quote:
        '"Comprehensive reptilian threat specs, habitat metrics, capture guidelines, and autonomous d20 behavior patterns."',
      refCode: 'REF_N: 01.02.15',
      clearance: 'LEVEL 3 RESTRICTED',
      isSelected: false,
    },
    {
      id: 'target-3',
      targetLabel: 'SELECTED CANON TARGET',
      title: 'CAA MODALITIES & TRANSMEDIA MANUSCRIPT REPOSITORY',
      pages: 'VOL. III (96P)',
      quote:
        '"Interactive campaign seeds and narrative arcs for writers, game developers, and artists aligning across platforms."',
      refCode: 'REF_N: 01.02.16',
      clearance: 'LEVEL 5 COMMANDER',
      isSelected: false,
    },
  ]);

  // Sync / update targets list when selectedItem or activeArticle changes
  useEffect(() => {
    if (selectedItem) {
      setCanonTargetsList([
        {
          id: 'target-1',
          targetLabel: 'SELECTED CANON TARGET',
          title: activeArticle
            ? activeArticle.title.toUpperCase()
            : selectedItem.title.toUpperCase(),
          pages: activeArticle ? activeArticle.pages : 'ALL PAGES (288P)',
          quote: activeArticle
            ? `"${activeArticle.desc}"`
            : `"${selectedItem.description}"`,
          refCode: `${selectedItem.refCode}`,
          clearance: 'LEVEL 4 GRANTED',
          isSelected: true,
        },
        {
          id: 'target-2',
          targetLabel: 'SELECTED CANON TARGET',
          title: `${selectedItem.title.toUpperCase()} - FIELD SPECIFICATIONS & TACTICAL BESTIARY`,
          pages: 'VOL. II (144P)',
          quote:
            '"Comprehensive tactical equipment sheets, creature behavior patterns, and field deployment guidelines."',
          refCode: `${selectedItem.refCode}.02`,
          clearance: 'LEVEL 3 RESTRICTED',
          isSelected: false,
        },
        {
          id: 'target-3',
          targetLabel: 'SELECTED CANON TARGET',
          title: `${selectedItem.title.toUpperCase()} - TRANSMEDIA ARCHIVE & REPOSITORY`,
          pages: 'VOL. III (96P)',
          quote:
            '"Interactive campaign seeds, narrative arcs, and retro-mechanical resolution formulas."',
          refCode: `${selectedItem.refCode}.03`,
          clearance: 'LEVEL 5 COMMANDER',
          isSelected: false,
        },
      ]);
    }
  }, [selectedItem, activeArticle]);

  const handleSelectCanonTarget = (id: string) => {
    setCanonTargetsList((prev) =>
      prev.map((item) => ({
        ...item,
        isSelected: item.id === id,
      })),
    );
  };

  // Configurator Interactive Overlay States
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const [alloyRatio, setAlloyRatio] = useState(75);
  const [coresCount, setCoresCount] = useState(2);
  const [voltageTuning, setVoltageTuning] = useState(true);
  const [calibrating, setCalibrating] = useState(false);
  const [calibrationLog, setCalibrationLog] = useState<string[]>([]);

  // Local spec saving toggle
  const [specSaved, setSpecSaved] = useState(false);

  // Scroll to helper using standard HTML scroll
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Triggering Right Frame (Product Spec & Configurator)
  const handleOpenRightFrame = () => {
    setRightDrawerOpen(true);
    setLeftDrawerOpen(false);
  };

  // Triggering Left Frame (External Reader Awareness)
  const handleOpenLeftFrame = (art?: ArticleData) => {
    if (art) {
      setActiveArticle(art);
    }
    setLeftDrawerOpen(true);
    setRightDrawerOpen(false);
  };

  // Reset states when selected item changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setConfiguratorOpen(false);
    setSpecSaved(false);
    setCalibrationLog([]);
    setCalibrating(false);
    setJumpOpen(true);
    setCodexOpen(true);
    setSpecsOpen(false);
    setPubSpecsOpen(false);
  }, [selectedItem]);

  // Simulate configurator calibration
  const runCalibration = () => {
    setCalibrating(true);
    setCalibrationLog(['[INFO] BOOTSTRAPPING CODES...']);

    setTimeout(() => {
      setCalibrationLog((prev) => [
        ...prev,
        '[OK] SARONITE-TO-TITAN ALLOY BONDED AT ' + alloyRatio + '%',
      ]);
    }, 400);

    setTimeout(() => {
      setCalibrationLog((prev) => [
        ...prev,
        '[OK] CONNECTING CORES (' + coresCount + ' UNITS ENGAGED)',
      ]);
    }, 800);

    setTimeout(() => {
      setCalibrationLog((prev) => [
        ...prev,
        voltageTuning
          ? '[WARNING] HIGH RESONANCE DETECTED - COOLANT OVERRIDE ENGAGED'
          : '[OK] VOLTAGE TUNED TO LOW-NOISE COMPACT STATE',
      ]);
    }, 1200);

    setTimeout(() => {
      setCalibrationLog((prev) => [
        ...prev,
        '[SUCCESS] SYSTEM CALIBRATED. ALLIGATOR SHOCK COILS INITIALIZED.',
      ]);
      setCalibrating(false);
    }, 1600);
  };

  if (!selectedItem) {
    return <div className="flex-1 h-full bg-surface" id="dashboard-stage" />;
  }

  // Resolve the book's specialized visual theme data
  const theme = generateBookTheme(selectedItem);

  return (
    <div
      className="flex-1 h-full flex flex-col bg-surface relative overflow-hidden"
      id="active-stage"
    >
      {/* 1. STAGE INNER SCROLL CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-24">
        {/* ACCORDION 1: JUMP TO SECTION */}
        {enableJumpToSection && (
          <div
            className="border-2 border-black bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            id="section-jump"
          >
            <button
              onClick={() => setJumpOpen(!jumpOpen)}
              className="w-full bg-black text-white px-4 py-3 flex items-center justify-between font-display text-xs md:text-sm font-black tracking-widest uppercase hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
            >
              <span>JUMP TO SECTION</span>
              {jumpOpen ? (
                <ChevronUp size={16} strokeWidth={2.5} />
              ) : (
                <ChevronDown size={16} strokeWidth={2.5} />
              )}
            </button>

            <AnimatePresence initial={false}>
              {jumpOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 md:p-5 bg-surface grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                      onClick={handleOpenRightFrame}
                      className="border-2 border-black bg-surface hover:bg-surface-low transition-colors p-3.5 flex items-center justify-between text-left font-display text-xs md:text-sm font-black tracking-wide uppercase group cursor-pointer"
                      title="Open Configure Spec Frame (Right)"
                    >
                      <span>1. Configure Spec [Right Frame]</span>
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                        strokeWidth={2.5}
                      />
                    </button>
                    <button
                      onClick={() => handleOpenLeftFrame()}
                      className="border-2 border-black bg-surface hover:bg-surface-low transition-colors p-3.5 flex items-center justify-between text-left font-display text-xs md:text-sm font-black tracking-wide uppercase group cursor-pointer"
                      title="Open External Reader Awareness Frame (Left)"
                    >
                      <span>2. Reader Awareness [Left Frame]</span>
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                        strokeWidth={2.5}
                      />
                    </button>
                    <button
                      onClick={() => {
                        if (!specsOpen) setSpecsOpen(true);
                        setTimeout(
                          () => handleScrollTo('section-codex-specifications'),
                          50,
                        );
                      }}
                      className="border-2 border-black bg-surface hover:bg-surface-low transition-colors p-3.5 flex items-center justify-between text-left font-display text-xs md:text-sm font-black tracking-wide uppercase group cursor-pointer"
                    >
                      <span>3. Technical Blueprint</span>
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                        strokeWidth={2.5}
                      />
                    </button>
                    <button
                      onClick={() => {
                        if (!pubSpecsOpen) setPubSpecsOpen(true);
                        setTimeout(
                          () =>
                            handleScrollTo('section-publishing-specifications'),
                          50,
                        );
                      }}
                      className="border-2 border-black bg-surface hover:bg-surface-low transition-colors p-3.5 flex items-center justify-between text-left font-display text-xs md:text-sm font-black tracking-wide uppercase group cursor-pointer"
                    >
                      <span>4. Publishing Specification</span>
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                        strokeWidth={2.5}
                      />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ACCORDION 2: CODEX ARCHITECTURE [TABLE OF ARTICLES] */}
        <div
          className="border-2 border-black bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          id="section-codex-architecture"
        >
          <button
            onClick={() => setCodexOpen(!codexOpen)}
            className="w-full bg-black text-white px-4 py-3 flex items-center justify-between font-display text-xs md:text-sm font-black tracking-widest uppercase hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
          >
            <span>INTERACTIVE INDEX [TABLE OF ARTICLES]</span>
            {codexOpen ? (
              <ChevronUp size={16} strokeWidth={2.5} />
            ) : (
              <ChevronDown size={16} strokeWidth={2.5} />
            )}
          </button>

          <AnimatePresence initial={false}>
            {codexOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-4 md:p-5 bg-surface space-y-4">
                  {/* System Canon Subheader */}
                  <div
                    id="system-canon-schema-header"
                    className="bg-black text-white px-4 py-2 flex items-center justify-between font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest scroll-mt-2"
                  >
                    <span>SYSTEM CANON SCHEMA: WORLD CODEX ARTICLES</span>
                    <span>CODEX VERSION 1.0</span>
                  </div>

                  {/* List of Articles */}
                  <div className="grid grid-cols-1 gap-3.5">
                    {theme.articles.map((art, idx) => {
                      const isReadingThis =
                        leftDrawerOpen && activeArticle?.title === art.title;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ x: 2, scale: 1.005 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleOpenLeftFrame(art)}
                          className={`border-2 border-black bg-surface hover:bg-surface-low transition-all duration-150 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                            isReadingThis
                              ? 'bg-orange-50/90 border-black ring-2 ring-orange-600'
                              : ''
                          }`}
                        >
                          <div className="space-y-1.5 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-display text-xs md:text-sm font-extrabold uppercase tracking-tight text-black group-hover:underline">
                                {art.title}
                              </h4>
                              {isReadingThis && (
                                <span className="font-mono text-[8px] font-black bg-orange-600 text-white border border-black px-1.5 py-0.5 uppercase tracking-widest animate-pulse">
                                  READING AWARENESS
                                </span>
                              )}
                            </div>
                            <p className="font-serif text-xs md:text-[13px] text-gray-600 leading-relaxed max-w-3xl italic">
                              {art.desc}
                            </p>
                          </div>

                          <div className="shrink-0 font-mono text-[9px] md:text-[10px] font-black tracking-wider bg-surface-low border border-black py-1.5 px-3 uppercase flex items-center gap-1.5 group-hover:bg-black group-hover:text-white transition-colors">
                            <span>{art.pages} • LEAVE SITE TO READ</span>
                            <BookOpen size={10} className="stroke-[2.5]" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ACCORDION 3: CODEX SPECIFICATIONS */}
        <div
          className="border-2 border-black bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          id="section-codex-specifications"
        >
          <button
            onClick={() => setSpecsOpen(!specsOpen)}
            className="w-full bg-black text-white px-4 py-3 flex items-center justify-between font-display text-xs md:text-sm font-black tracking-widest uppercase hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
          >
            <span>CODEX SPECIFICATIONS</span>
            {specsOpen ? (
              <ChevronUp size={16} strokeWidth={2.5} />
            ) : (
              <ChevronDown size={16} strokeWidth={2.5} />
            )}
          </button>

          <AnimatePresence initial={false}>
            {specsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-4 md:p-5 bg-surface">
                  <div className="border-2 border-black overflow-hidden bg-surface-low">
                    {/* Table Header Row */}
                    <div className="grid grid-cols-12 bg-black text-white font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest p-2.5">
                      <div className="col-span-5 md:col-span-4 border-r border-white/20 pr-2">
                        DATA NODE PARAMETER
                      </div>
                      <div className="col-span-7 md:col-span-8 pl-3">
                        VERIFIED CLEARANCE SPECIFICATION
                      </div>
                    </div>

                    {/* Table Data Rows */}
                    <div className="divide-y-2 divide-black/10">
                      {theme.specs.map((row, idx) => (
                        <div
                          key={idx}
                          className={`grid grid-cols-12 font-mono text-[10px] md:text-xs p-3 transition-colors ${idx % 2 === 0 ? 'bg-surface' : 'bg-surface-low'}`}
                        >
                          <div className="col-span-5 md:col-span-4 font-black tracking-tight text-black border-r border-black/10 pr-2 uppercase">
                            {row.param}
                          </div>
                          <div className="col-span-7 md:col-span-8 pl-3 text-gray-700 leading-normal uppercase">
                            {row.spec}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ACCORDION 4: PUBLISHING SPECIFICATION */}
        <div
          className="border-2 border-black bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          id="section-publishing-specifications"
        >
          <button
            onClick={() => setPubSpecsOpen(!pubSpecsOpen)}
            className="w-full bg-black text-white px-4 py-3 flex items-center justify-between font-display text-xs md:text-sm font-black tracking-widest uppercase hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
          >
            <span>PUBLISHING SPECIFICATION</span>
            {pubSpecsOpen ? (
              <ChevronUp size={16} strokeWidth={2.5} />
            ) : (
              <ChevronDown size={16} strokeWidth={2.5} />
            )}
          </button>

          <AnimatePresence initial={false}>
            {pubSpecsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-4 md:p-5 bg-surface">
                  <div className="border-2 border-black overflow-hidden bg-surface-low">
                    {/* Table Header Row */}
                    <div className="grid grid-cols-12 bg-black text-white font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest p-2.5">
                      <div className="col-span-5 md:col-span-4 border-r border-white/20 pr-2">
                        PUBLISHING PARAMETER
                      </div>
                      <div className="col-span-7 md:col-span-8 pl-3">
                        VERIFIED PUBLISHING SPECIFICATION
                      </div>
                    </div>

                    {/* Table Data Rows */}
                    <div className="divide-y-2 divide-black/10">
                      {theme.pubSpecs.map((row, idx) => (
                        <div
                          key={idx}
                          className={`grid grid-cols-12 font-mono text-[10px] md:text-xs p-3 transition-colors ${idx % 2 === 0 ? 'bg-surface' : 'bg-surface-low'}`}
                        >
                          <div className="col-span-5 md:col-span-4 font-black tracking-tight text-black border-r border-black/10 pr-2 uppercase">
                            {row.param}
                          </div>
                          <div className="col-span-7 md:col-span-8 pl-3 text-gray-700 leading-normal uppercase">
                            {row.spec}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. RIGHT CORE PRODUCT FRAME (SLIDES IN FROM THE RIGHT) */}
      <AnimatePresence>
        {rightDrawerOpen && (
          <div
            className="fixed inset-0 z-[9999] flex justify-end"
            id="right-drawer-wrapper"
          >
            {/* Backdrop slide-in clicker to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setRightDrawerOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
              id="right-drawer-backdrop"
            />

            {/* Main Tactile Drawer Sheet from RIGHT */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full sm:w-[500px] md:w-[550px] h-full bg-surface border-l-4 border-black shadow-[-8px_0px_24px_rgba(0,0,0,0.15)] flex flex-col z-10 relative select-text"
              id="right-drawer-sheet"
            >
              {/* Drawer Top Navigation bar */}
              <div className="p-4 md:p-5 border-b-2 border-black flex items-center justify-between bg-surface-low shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] bg-black text-white px-2.5 py-1 uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <Settings size={12} className="stroke-[2.5]" />
                    <span>RIGHT FRAME: PRODUCT SPEC & CONFIGURATOR</span>
                  </span>
                </div>

                <button
                  onClick={() => setRightDrawerOpen(false)}
                  className="w-[34px] h-[34px] border-2 border-black hover:bg-surface-high flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
                  title="Close Right Frame"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Drawer Content Area (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-5 md:p-7 space-y-6">
                <h2 className="font-display text-xl md:text-2xl font-black tracking-tight uppercase leading-tight text-black">
                  {theme.drawerTitle}
                </h2>

                <div className="border-l-4 border-black pl-4 py-1 italic font-serif text-xs md:text-sm text-gray-700 leading-relaxed">
                  {theme.drawerQuote}
                </div>

                <div className="h-0 border-t-2 border-black/10 flex items-center justify-center relative">
                  <span className="absolute bg-surface px-3 font-mono text-[9px] tracking-widest font-black text-gray-400 uppercase">
                    FIELD OPERATIONS MANUAL (SPECIFICATION ARCHIVE)
                  </span>
                </div>

                {/* LAUNCH CONFIGURATOR & SAVE SPEC BUTTONS */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSpecSaved(!specSaved)}
                    className={`w-full py-2.5 px-4 font-display text-xs md:text-sm font-black uppercase tracking-wide flex items-center justify-center gap-2 border-2 border-black cursor-pointer focus:outline-none transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${
                      specSaved
                        ? 'bg-[#32CD32] text-white border-[#32CD32]'
                        : 'bg-surface hover:bg-surface-high text-black'
                    }`}
                  >
                    <Heart
                      size={14}
                      className={specSaved ? 'fill-current' : ''}
                    />
                    <span>
                      {specSaved ? 'SPECIFICATION SECURED' : 'SAVE SPEC'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfiguratorOpen(true)}
                    className="w-full bg-black text-white hover:bg-neutral-800 transition-colors py-3 px-4 font-display text-xs md:text-sm font-black uppercase tracking-wide flex items-center justify-center gap-2 border-2 border-black cursor-pointer focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    <Settings size={14} className="animate-spin-slow" />
                    <span>LAUNCH CONFIGURATOR</span>
                  </button>
                </div>

                <div className="space-y-4 font-serif text-[13px] md:text-[14px] text-gray-800 leading-relaxed">
                  {theme.drawerParagraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. LEFT CORE PRODUCT FRAME (EXTERNAL READER AWARENESS - SLIDES IN FROM THE LEFT) */}
      <AnimatePresence>
        {leftDrawerOpen && (
          <div
            className="fixed inset-0 z-[9999] flex justify-start"
            id="left-drawer-wrapper"
          >
            {/* Backdrop clicker to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLeftDrawerOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
              id="left-drawer-backdrop"
            />

            {/* Sheet sliding in from LEFT */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full sm:w-[500px] md:w-[550px] h-full bg-surface border-r-4 border-black shadow-[8px_0px_24px_rgba(0,0,0,0.15)] flex flex-col z-10 relative select-text"
              id="left-drawer-sheet"
            >
              {/* Drawer Top Navigation bar */}
              <div className="p-4 md:p-5 border-b-2 border-black flex items-center justify-between bg-surface-low shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] bg-black text-white px-2.5 py-1 uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <ExternalLink size={12} className="stroke-[2.5]" />
                    <span>LEFT FRAME: EXTERNAL READER AWARENESS</span>
                  </span>
                </div>

                <button
                  onClick={() => setLeftDrawerOpen(false)}
                  className="w-[34px] h-[34px] border-2 border-black hover:bg-surface-high flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
                  title="Close Left Frame"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Drawer Content Area (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-5 md:p-7 space-y-6">
                {/* Awareness Alert Panel */}
                <div className="border-2 border-black bg-amber-100/90 p-4 space-y-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-2 text-black font-mono text-xs font-black uppercase tracking-wider">
                    <AlertTriangle
                      size={18}
                      className="text-amber-800 shrink-0"
                    />
                    <span>AWARENESS: LEAVING APPLICATION</span>
                  </div>
                  <p className="font-serif text-xs md:text-sm text-gray-800 leading-relaxed italic">
                    You are about to navigate away from this Command Center web
                    application to open external canonical reading material for{' '}
                    <strong>
                      {selectedItem ? selectedItem.title : 'Selected Codex'}
                    </strong>
                    .
                  </p>
                  <div className="font-mono text-[9px] text-gray-700 uppercase bg-surface/80 p-2 border border-black/20 font-bold">
                    DESTINATION: OFFICIAL CANON MANUSCRIPT READER & REPOSITORY
                  </div>
                </div>

                <div className="h-0 border-t-2 border-black/10 flex items-center justify-center relative">
                  <span className="absolute bg-surface px-3 font-mono text-[9px] tracking-widest font-black text-gray-400 uppercase">
                    CONFIRM YOUR LEAVING INTENT
                  </span>
                </div>

                {/* Explicit Action Buttons */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedItem) {
                        const dummyUrl = `https://archive.chronos-systems.org/canon/doc/${selectedItem.id}`;
                        window.open(dummyUrl, '_blank', 'noopener,noreferrer');
                      }
                      setLeavingToast(true);
                      setTimeout(() => setLeavingToast(false), 4000);
                    }}
                    className="w-full bg-orange-600 text-white hover:bg-orange-700 transition-colors py-3.5 px-4 font-display text-xs md:text-sm font-black uppercase tracking-wide flex items-center justify-center gap-2 border-2 border-black cursor-pointer focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                  >
                    <ExternalLink size={16} strokeWidth={2.5} />
                    <span>PROCEED & LEAVE SITE TO READ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPdfToast(true);
                      setTimeout(() => setPdfToast(false), 4000);

                      // Create a downloadable mock PDF file
                      const activeTarget =
                        canonTargetsList.find((t) => t.isSelected) ||
                        canonTargetsList[0];
                      const pdfContent = `=================================================\nCANON MANUSCRIPT ARCHIVE - OFFICIAL SPECIFICATION\n=================================================\n\nTITLE: ${activeTarget.title}\nPAGE RANGE: ${activeTarget.pages}\nREF CODE: ${activeTarget.refCode}\nCLEARANCE: ${activeTarget.clearance}\n\nSUMMARY / QUOTE:\n${activeTarget.quote}\n\n=================================================\nCONFIDENTIAL COMMAND CENTER ARCHIVE RECORD\nGenerated: ${new Date().toISOString()}\n=================================================`;

                      const blob = new Blob([pdfContent], {
                        type: 'text/plain',
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${activeTarget.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_spec.pdf`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="w-full bg-black text-white hover:bg-neutral-800 transition-colors py-3 px-4 font-display text-xs md:text-sm font-black uppercase tracking-wide flex items-center justify-center gap-2 border-2 border-black cursor-pointer focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    <Download size={16} strokeWidth={2.5} />
                    <span>DOWNLOAD PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLeftDrawerOpen(false)}
                    className="w-full bg-surface hover:bg-surface-high text-black transition-colors py-2.5 px-4 font-display text-xs md:text-sm font-black uppercase tracking-wide flex items-center justify-center gap-2 border-2 border-black cursor-pointer focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    <ArrowLeft size={14} strokeWidth={2.5} />
                    <span>STAY IN COMMAND CENTER</span>
                  </button>
                </div>

                {leavingToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-black text-white border-2 border-black font-mono text-[10px] uppercase font-bold text-center flex items-center justify-center gap-2"
                  >
                    <Compass size={14} className="animate-spin" />
                    <span>
                      TRANSITIONING TO EXTERNAL CANON READER IN NEW TAB...
                    </span>
                  </motion.div>
                )}

                {pdfToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-emerald-800 text-white border-2 border-black font-mono text-[10px] uppercase font-bold text-center flex items-center justify-center gap-2"
                  >
                    <Download size={14} className="animate-bounce" />
                    <span>DOWNLOADING CANON SPECIFICATION PDF...</span>
                  </motion.div>
                )}

                {/* 3 Canon Targets List (Individually Customizable) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between border-b-2 border-black pb-1.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase text-black">
                      <Sliders size={12} className="stroke-[2.5]" />
                      <span>CANON TARGET SPECIFICATIONS (3 ITEMS)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {canonTargetsList.map((target) => (
                      <div
                        key={target.id}
                        className={`border-2 border-black p-4 space-y-3 transition-all ${
                          target.isSelected
                            ? 'bg-surface-low ring-2 ring-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                            : 'bg-surface hover:bg-surface-low'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-black/20 pb-2">
                          <button
                            type="button"
                            onClick={() => handleSelectCanonTarget(target.id)}
                            className="flex items-center gap-2 cursor-pointer text-left group focus:outline-none"
                            title={
                              target.isSelected
                                ? 'Selected Target'
                                : 'Select Target'
                            }
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded-full border-2 border-black flex items-center justify-center shrink-0 ${target.isSelected ? 'bg-black' : 'bg-white group-hover:border-orange-600'}`}
                            >
                              {target.isSelected && (
                                <div className="w-1 h-1 rounded-full bg-white" />
                              )}
                            </div>
                          </button>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openTargetHtmlPage(target);
                              }}
                              className="font-mono text-[9px] bg-black hover:bg-orange-600 text-white px-2.5 py-1 font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] group/pagebtn"
                              title={`Click to open ${target.pages} HTML specification document`}
                            >
                              <span>{target.pages}</span>
                              <ExternalLink
                                size={10}
                                strokeWidth={2.5}
                                className="group-hover/pagebtn:scale-110 transition-transform shrink-0"
                              />
                            </button>
                          </div>
                        </div>

                        {/* Standard Card View */}
                        <h3 className="font-display text-base font-black uppercase tracking-tight text-black leading-snug">
                          {target.title}
                        </h3>

                        <p className="font-serif text-xs text-gray-700 italic leading-relaxed">
                          {target.quote}
                        </p>

                        <div className="font-mono text-[9px] text-gray-600 uppercase pt-1 flex items-center justify-between border-t border-black/10">
                          <span>REF CODE: {target.refCode}</span>
                          <span className="font-bold text-black">
                            {target.clearance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. INTERACTIVE CONFIGURATOR FULL OVERLAY/MODAL */}
      <AnimatePresence>
        {configuratorOpen && (
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            id="configurator-wrapper"
          >
            {/* Backdrop clicker to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfiguratorOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Configurator Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-surface border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 flex flex-col overflow-hidden"
              id="configurator-modal"
            >
              {/* Header */}
              <div className="p-3.5 bg-black text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Activity
                    size={14}
                    className="text-[#32CD32] animate-pulse"
                  />
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                    CONFIGURATOR OVERRIDE UNIT
                  </span>
                </div>
                <button
                  onClick={() => setConfiguratorOpen(false)}
                  className="p-1 border border-white/20 hover:border-white text-white cursor-pointer focus:outline-none"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 overflow-y-auto space-y-5">
                {/* Control 1: Purity Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[10px] font-black uppercase text-black">
                    <span>SARONITE ALLOY RATIO</span>
                    <span>{alloyRatio}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={alloyRatio}
                    onChange={(e) => setAlloyRatio(parseInt(e.target.value))}
                    className="w-full accent-black cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[8px] text-gray-500">
                    <span>10% LOW STABILITY</span>
                    <span>100% MAXIMUM SOAK</span>
                  </div>
                </div>

                {/* Control 2: Titan Cores Counter */}
                <div className="flex items-center justify-between border-t border-b border-black/10 py-3">
                  <div className="space-y-0.5">
                    <h6 className="font-mono text-[10px] font-black text-black uppercase">
                      TITAN CORES ENGAGED
                    </h6>
                    <p className="font-mono text-[8px] text-gray-500 uppercase">
                      Power amplification modules
                    </p>
                  </div>
                  <div className="flex items-center border-2 border-black">
                    <button
                      onClick={() => setCoresCount(Math.max(1, coresCount - 1))}
                      className="px-2.5 py-1 hover:bg-surface-low font-mono font-black border-r border-black"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-mono text-xs font-black bg-surface-low text-black">
                      {coresCount}
                    </span>
                    <button
                      onClick={() => setCoresCount(Math.min(5, coresCount + 1))}
                      className="px-2.5 py-1 hover:bg-surface-low font-mono font-black border-l border-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Control 3: Voltage Toggle */}
                <div className="flex items-center justify-between py-1">
                  <div className="space-y-0.5">
                    <h6 className="font-mono text-[10px] font-black text-black uppercase">
                      VOLTAGE RESONANCE
                    </h6>
                    <p className="font-mono text-[8px] text-gray-500 uppercase">
                      Low-noise or turbo power
                    </p>
                  </div>
                  <button
                    onClick={() => setVoltageTuning(!voltageTuning)}
                    className={`w-12 h-6 border-2 border-black rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${voltageTuning ? 'bg-black justify-end' : 'bg-surface justify-start'}`}
                  >
                    <motion.div
                      layout
                      className={`w-4 h-4 rounded-full border border-black ${voltageTuning ? 'bg-white' : 'bg-black'}`}
                    />
                  </button>
                </div>

                {/* Live Console Output */}
                {calibrationLog.length > 0 && (
                  <div className="p-3 bg-black text-[#32CD32] font-mono text-[9px] rounded-xs space-y-1.5 h-[120px] overflow-y-auto select-none border-2 border-black">
                    {calibrationLog.map((log, idx) => (
                      <p
                        key={idx}
                        className="leading-relaxed animate-fade-in truncate"
                      >
                        {log}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Button */}
              <div className="p-4 border-t-2 border-black bg-surface-low">
                <button
                  onClick={runCalibration}
                  disabled={calibrating}
                  className="w-full bg-black hover:bg-neutral-800 disabled:bg-neutral-400 text-white py-2.5 font-display text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-black"
                >
                  {calibrating ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" />
                      <span>TUNING IN PROGRESS...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={12} />
                      <span>EXECUTE CALIBRATION SEQUENCE</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
