/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Subclass, Spell, Monster, MagicItem } from './types';

export const PRODUCT_PRIMARY_IMAGE =
  'https://picsum.photos/seed/alligator-alley-bible/800/1000';

export const PRODUCT_IMAGES = [
  {
    id: 'img1',
    url: PRODUCT_PRIMARY_IMAGE,
    alt: 'Alligator Alley Franchise Bible Cover - Leather Tome with Crimson Ribbon',
    type: 'cover',
    caption:
      'The complete Alligator Alley Franchise Bible & World-Building Protocol.',
  },
  {
    id: 'img2',
    url: 'https://picsum.photos/seed/swamp-city/800/1000',
    alt: "Kai'MAN-hattan Skyline - Cyber-Swamp Concept Art",
    type: 'interior',
    caption:
      "Concept art spread of Kai'MAN-hattan skyscrapers sitting in high-contrast neon swamp floodwaters.",
  },
  {
    id: 'img3',
    url: 'https://picsum.photos/seed/giant-gator/800/1000',
    alt: 'Swamp Tyrant Anatomy Spread - Crimson Tail Giga-Gator',
    type: 'monster',
    caption: 'Technical scale diagram of the 40-foot Crimson Tail Giga-Gator.',
  },
  {
    id: 'img4',
    url: 'https://picsum.photos/seed/swamp-map/800/1000',
    alt: 'Swamp Sector 7 Navigation Grid',
    type: 'map',
    caption: 'Topographical blueprint map of Bayou Delta Sector 7.',
  },
];

export const SUBCLASSES: Subclass[] = [
  {
    id: 'sub1',
    name: 'Central Authenticational Authority (CAA)',
    classType: 'Governance Bureau',
    source: 'Charter Article VI',
    description:
      "The supreme governing panel responsible for ratifying Tier 1 canon, resolving retcons, and maintaining the operational integrity of the 'No Beef, Alligator Tail' heterocosm.",
    specialFeature:
      "Absolute Veto: Can declare any draft, script, or game mechanic 'Non-Canonical' instantly if it depicts bovine consumption.",
  },
  {
    id: 'sub2',
    name: 'Alligator Tail Culinary Guild',
    classType: 'Sustenance Syndicate',
    source: 'Charter Article I, Sec 2',
    description:
      'An elite group of culinarians dedicated to perfecting gator-tail gastronomy, establishing the Crimson Tail rating, and policing illegal beef smuggler dens.',
    specialFeature:
      'Gator-Tail Gastronomy: Master of thirty distinct alligator preparations, from black-pep smoked flank to flash-fried crispy webs.',
  },
  {
    id: 'sub3',
    name: 'Keeper of the Codex Team',
    classType: 'IP Development Lead',
    source: 'Charter Article V',
    description:
      'The specialized administrative unit tasked with the day-to-day maintenance, cross-referencing, and version-controlling of the Franchise Bible.',
    specialFeature:
      'Git-Merge Authority: Resolves narrative discrepancies in under 6 seconds, preserving absolute world coherence.',
  },
  {
    id: 'sub4',
    name: 'Bovine Heretics (The Beef Seekers)',
    classType: 'Outlaw Cult',
    source: 'Charter Article II, Sec 4',
    description:
      "A shadowy counter-cultural resistance group obsessed with the legendary 'Cow'—a mythical beast rumored to yield a forbidden red flesh called 'Beef'.",
    specialFeature:
      'Clandestine Smuggling: Experts at setting up hidden basement grills that mimic the aroma of charred ribeye using hickory dust.',
  },
  {
    id: 'sub5',
    name: 'Swamp Rangers & Harvesters',
    classType: 'Tactical Capture Force',
    source: 'Charter Article III, Sec 1',
    description:
      "Hardened swamp-dwellers patrolling the dark bayous to harvest 'Swamp Tyrants' for tail supply while protecting vulnerable civilian outposts.",
    specialFeature:
      'Tyrant Lassoing: Can isolate and bind an active 18-foot alligator in under 4 minutes using high-tension polymer cables.',
  },
  {
    id: 'sub6',
    name: 'Transmedia Cohesion Liaison',
    classType: 'Cross-Media Sync Unit',
    source: 'Charter Article IV',
    description:
      'Liaisons coordinating narrative beats across video game builds, comic books, streaming TV scripts, and theme-park experiences.',
    specialFeature:
      'Synchronized Lore: Prevents plot holes across diverse platforms simultaneously using deep real-time database queries.',
  },
  {
    id: 'sub7',
    name: "Kai'MAN-hattan City Patrol",
    classType: 'Municipal Defense',
    source: 'Charter Article II, Sec 3',
    description:
      "The metropolitan taskforce maintaining peace in the neon-lit, flooded skyscrapers of Kai'MAN-hattan where humans and giant reptiles coexist.",
    specialFeature:
      'Neon Camouflage: Melds perfectly into the cyber-punk swamp signs to track illegal trading rings.',
  },
  {
    id: 'sub8',
    name: 'Heterocosmica Academics',
    classType: 'Theoretical World-Builders',
    source: 'Charter Preamble',
    description:
      'Scholars studying Doležel’s theory of fictional worlds to optimize the authentication metrics of the franchise.',
    specialFeature:
      'Semantic Analysis: Translates complex modal logic into actionable creative directives for storyboard artists.',
  },
];

export const SPELLS: Spell[] = [
  {
    id: 'spl1',
    name: 'The Bovine Absence Directive',
    level: 'Rule #ALE_BIO_001',
    school: 'Biological Modality',
    castingTime: 'Immediate',
    range: 'Global Heterocosm',
    components: 'No Cows, Absolute Gator Tail',
    duration: 'Permanent (Infinity)',
    description:
      'Cattle do not exist, nor have they ever existed, in the Alligator Alley world. This is a foundational biological constraint. Any appearance of beef is treated as an illegal reality-glitch or heretical contraband.',
  },
  {
    id: 'spl2',
    name: "Doležel's Authentication Matrix",
    level: 'Rule #ALE_SEM_002',
    school: 'Semantic Modality',
    castingTime: '1 Review',
    range: 'Authoritative Core',
    components: 'CAA Ratification Signatures',
    duration: 'Indefinite',
    description:
      "Every element depicted in any media must be authenticated by the central Bible or the CAA. Unauthenticated entries collapse into 'fictional non-existence' or tier-3 fanon.",
  },
  {
    id: 'spl3',
    name: 'Crimson Tail Standard',
    level: 'Rule #ALE_CUL_003',
    school: 'Culinary Law',
    castingTime: '1 Taste Audit',
    range: 'All Kitchens',
    components: 'Deep-fat Fryer, Smoker, Lime Juice',
    duration: 'Active',
    description:
      'Alligator tail is the primary protein source. The Crimson Tail standard rates eating houses based on quality, texture, and lack of beef impurities.',
  },
  {
    id: 'spl4',
    name: 'Swamp-Drowned Cities Protocol',
    level: 'Rule #ALE_GEO_004',
    school: 'Geographical Modality',
    castingTime: 'High Tide',
    range: 'All Sectors',
    components: 'Airboats, Water-scrapers, Neon',
    duration: 'Persistent',
    description:
      'Cities are built on high stilts and flooded foundations. Airboats and swamp-skimmers are the primary transportation units. Ground vehicles are obsolete.',
  },
  {
    id: 'spl5',
    name: "The Keeper's Git-Rebase Rule",
    level: 'Rule #ALE_DEV_005',
    school: 'Workflow Modality',
    castingTime: '1 Push / Pull',
    range: 'Production Pipelines',
    components: 'Franchise Bible, Markdown Git',
    duration: 'Constant',
    description:
      'Creative teams must pull the latest bible updates before submitting drafts. Any narrative divergence is automatically overwritten by the Codex master branch.',
  },
];

export const MONSTERS: Monster[] = [
  {
    id: 'mon1',
    name: 'The Crimson Tail Giga-Gator',
    type: 'Colossal Reptile, Apex Predator',
    hp: 380,
    ac: 22,
    cr: 'Threat Class 5 (S-Tier)',
    stats: { str: 28, dex: 12, con: 26, int: 8, wis: 14, cha: 15 },
    description:
      'An ancient 40-foot Swamp Tyrant that reigns over the primeval central bayou. Possesses an impenetrable, dark red scaleset and feeds on entire airboats.',
  },
  {
    id: 'mon2',
    name: 'Bovine Smuggler King',
    type: 'Human, Lawful Evil Outlaw',
    hp: 120,
    ac: 15,
    cr: 'Threat Class 2',
    stats: { str: 14, dex: 16, con: 14, int: 15, wis: 12, cha: 18 },
    description:
      "A notorious racketeer running a network of underground speakeasies that serve artificial 'beef' synthesized from swamp worms and MSG, directly violating CAA laws.",
  },
  {
    id: 'mon3',
    name: 'Neon Swamp Viper',
    type: 'Large Reptile, Toxic Hazard',
    hp: 85,
    ac: 14,
    cr: 'Threat Class 1',
    stats: { str: 10, dex: 18, con: 12, int: 3, wis: 12, cha: 5 },
    description:
      "Luminescent vipers that breed in the neon runoffs of Kai'MAN-hattan. Their venom causes intense sensory confusion and vivid hallucinations of fields of grazing cows.",
  },
  {
    id: 'mon4',
    name: 'Retcon Abomination',
    type: 'Metaphysical Manifestation of Plot Holes',
    hp: 210,
    ac: 18,
    cr: 'Threat Class 4 (A-Tier)',
    stats: { str: 20, dex: 10, con: 22, int: 25, wis: 8, cha: 8 },
    description:
      'A bizarre, shimmering void monster created when a creative team introduces a contradiction to the Franchise Bible. It seeks to consume and delete entire storylines.',
  },
];

export const MAGIC_ITEMS: MagicItem[] = [
  {
    id: 'itm1',
    name: 'The Golden Alligator Lasso',
    rarity: 'Legendary',
    type: 'Tactical Capture Tool',
    description:
      'A self-tightening high-voltage composite cable used by master Swamp Rangers to capture massive Swamp Tyrants without damaging the valuable tail meat.',
    properties: [
      'Holds up to 50 tons of reptilian pulling force',
      'Discharges minor stunning pulses to tranquilize giant beasts',
      'Resistant to acidic swamp water and extreme heat',
    ],
  },
  {
    id: 'itm2',
    name: 'Crimson Tail Culinary Cleaver',
    rarity: 'Very Rare',
    type: 'Guild Tool',
    description:
      'An ultra-balanced, laser-honed titanium cleaver forged by the Culinary Guild specifically to carve gator-tail steaks with molecular precision.',
    properties: [
      'Never requires sharpening or maintenance',
      'Detects and triggers a visual warning when in contact with beef impurities',
      'Increases carving yield by 15%',
    ],
  },
  {
    id: 'itm3',
    name: "The Codex Tablet (Keeper's Replica)",
    rarity: 'Rare',
    type: 'Sync Device',
    description:
      'A rugged, waterproof tablet with satellite uplink to the CAA master server. Used by showrunners and game designers to query the Franchise Bible on-site.',
    properties: [
      'Instant query of any world rule ALE_XXX in under 0.1 seconds',
      'Fingerprint-locked to authenticated personnel with NDAs',
      'Equipped with a self-destruct mechanism if lost or stolen',
    ],
  },
  {
    id: 'itm4',
    name: 'Bovine Purifying Scanner',
    rarity: 'Rare',
    type: 'Diagnostic Tool',
    description:
      "A handheld spectroscope used by Culinary Guild inspectors to verify that meat labeled as 'Genuine Alligator' does not contain trace bovine proteins.",
    properties: [
      'Scans food in 2 seconds to detect any mammalian meat trace',
      'Triggers a red strobe light and alerts the local CAA squad upon beef detection',
      'USB rechargeable with 48 hours of continuous battery life',
    ],
  },
  {
    id: 'itm5',
    name: 'Airboat Propulsion Engine (S-280)',
    rarity: 'Very Rare',
    type: 'Vehicle Component',
    description:
      'A massive, supercharged turbine engine optimized for swamp-skimming vehicles. Emits a loud, mechanical roar that terrifies lower-tier swamp vipers.',
    properties: [
      'Doubles the top speed of standard airboats across dense lilies',
      'Equipped with automated weed-shredding fan blades',
      'Includes a gator-repelling sonar beacon',
    ],
  },
];

export const SPECIFICATIONS = [
  {
    label: 'Specification Protocol',
    value: 'Alligator Alley Franchise Bible v1.0',
  },
  {
    label: 'Codex Volume',
    value: '288 Definitive Pages (Matte Paper + Digital Wiki Access)',
  },
  {
    label: 'Archival Media',
    value: '140gsm High-Opacity Uncoated Cream Stock (Heavy ink bounds)',
  },
  {
    label: 'Cover Binder',
    value: 'Smyth Sewn Lay-Flat Leather Hardcover with Crimson Ribbon',
  },
  { label: 'Form Factor', value: '8.5 x 11.2 Inches (Standard Field Format)' },
  {
    label: 'Design Studio',
    value: 'Central Authenticational Authority (CAA) Press',
  },
  {
    label: 'Ratification Date',
    value: 'Charter Established (Estimated Release: Autumn 2026)',
  },
  {
    label: 'Intermedia Access',
    value: 'Includes PDF, Confluence Wiki Code, and VTT Creature Token Packs',
  },
];

export const TABLE_OF_CONTENTS = [
  {
    chapter: 'Article I: Core World Identity & Premise',
    pages: '04 - 38',
    details:
      "The 'No Beef, Alligator Tail' paradigm. Ecological, economic, and social systems derived from Bovine Absence.",
  },
  {
    chapter: 'Article II: Foundational Modalities',
    pages: '39 - 88',
    details:
      'The rules of world-building as established by the CAA. Real-time alignment of media platforms.',
  },
  {
    chapter: 'Article III: Key Factions & Casts',
    pages: '89 - 142',
    details:
      'The Culinary Guild, the Swamp Rangers, and the Bovine heretics. Detailed background and design notes.',
  },
  {
    chapter: 'Article IV: Swamp Tyrant Bestiary',
    pages: '143 - 210',
    details:
      'Comprehensive specs of reptilian threats. Biology, habitat, and capture guidelines for 20+ species.',
  },
  {
    chapter: 'Article V: Relics & Gear Blueprint',
    pages: '211 - 250',
    details:
      'Golden lassos, cleavers, diagnostic scanners, and tactical equipment sheets.',
  },
  {
    chapter: 'Article VI: Transmedia Sandbox Module',
    pages: '251 - 288',
    details:
      'Interactive campaign seeds and narrative arcs for writers, game developers, and artists.',
  },
];
