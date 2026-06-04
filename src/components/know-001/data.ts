/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FAQItem, CastMember, TourDate, CharacterClass } from './types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'pass-one',
    category: 'THE ANATOMY OF THE CREATIVE INTERROGATION',
    question: 'PASS ONE: THE VISCERAL RESPONSE',
    answer:
      'The first read-through must be done without analytical pausing. The objective is to experience the story as a pure piece of cinema or theater. This pass identifies the macro-tonal shift of the work. If a script feels suffocating, the design must lean into low ceilings, heavy textures, and restricted sightlines, even if the scene descriptions do not explicitly demand them.',
    highlightWords: ['macro-tonal shift of the work'],
  },
  {
    id: 'pass-two',
    category: 'THE ANATOMY OF THE CREATIVE INTERROGATION',
    question: 'PASS TWO: THE STRUCTURAL DECONSTRUCTION',
    answer:
      'The second read is an exhaustive, scene-by-scene interrogation where the script is treated as a crime scene. The designer looks for explicit facts, implicit requirements, and structural transitions.',
  },
  {
    id: 'pass-three',
    category: 'THE ANATOMY OF THE CREATIVE INTERROGATION',
    question: 'PASS THREE: THE PSYCHOLOGICAL & THEMATIC SUBTEXT',
    answer:
      'The third read looks past the text and into the subtext. It examines character arcs, thematic motifs, and psychological states, mapping them directly onto physical spaces.',
  },
  {
    id: 'spatial-volume',
    category: 'PILLARS OF SCENOGRAPHIC INTERPRETATION',
    question: 'I. SPATIAL VOLUME AND BOUNDARY',
    answer:
      'The script dictates where a scene happens, but the designer determines how much space that scene needs to convey its psychological reality.',
  },
  {
    id: 'chronological-metric',
    category: 'PILLARS OF SCENOGRAPHIC INTERPRETATION',
    question: 'II. THE CHRONOLOGICAL METRIC',
    answer:
      'Sets should rarely look like they were built yesterday; they must look like they have existed across time. The designer scans the text for clues about the history of the environment.',
  },
  {
    id: 'psychological-architecture',
    category: 'PILLARS OF SCENOGRAPHIC INTERPRETATION',
    question: 'III. PSYCHOLOGICAL ARCHITECTURE',
    answer:
      "The environment must act as an externalization of the characters' internal worlds. The designer tracks emotional arcs through architectural transitions.",
  },
];

export const SYSTEM_WARNING = {
  header: 'SCENOGRAPHIC METRICS',
  badge: 'CAUTION DESIGNER',
  text: 'Note to designers: The script markup is not a passive reading exercise; it is an act of forensic translation. It is the precise moment where literature is taken apart and rebuilt as physical architecture, texture, color, and spatial geometry.',
};

export const CAST_DATA: CastMember[] = [
  {
    id: 'violet',
    name: 'VIOLET / PURPLE',
    role: 'ARCHITECTURE',
    title: 'Interior/Exterior Architecture',
    hp: 100,
    maxHp: 100,
    stats: { STR: 20, DEX: 10, CON: 20, INT: 15, WIS: 15, CHA: 10 },
    signatureAbility: 'Structural Layout',
    quote: 'Built sets, locations, modifications.',
    bio: 'Structural layout, doors, windows, structural materials.',
    woodcutImg:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'blue',
    name: 'BLUE',
    role: 'ATMOSPHERICS',
    title: 'Environmental Factors / SFX',
    hp: 80,
    maxHp: 80,
    stats: { STR: 10, DEX: 15, CON: 10, INT: 20, WIS: 20, CHA: 15 },
    signatureAbility: 'Weather & Time',
    quote: 'Fog, smoke, rain, fire.',
    bio: 'Weather, practical atmospheric elements, time of day shifts affecting light fixtures.',
    woodcutImg:
      'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=200',
  },
];

export const TOUR_DATA: TourDate[] = [
  {
    id: 'td1',
    city: 'NEW YORK',
    venue: 'The Stage 42 Theatre',
    dateStr: 'SOLD OUT',
    status: 'SOLD OUT',
    capacityPercentage: 100,
    ticketPrice: 85,
  },
  {
    id: 'td2',
    city: 'CHICAGO',
    venue: 'The Blackstone Coliseum',
    dateStr: 'CHICAGO10-14 OCT',
    status: 'SEATS OPEN',
    capacityPercentage: 74,
    ticketPrice: 65,
  },
  {
    id: 'td3',
    city: 'LOS ANGELES',
    venue: 'The El Rey Pavilion',
    dateStr: 'LOS ANGELES NOV 2024',
    status: 'LIMITED',
    capacityPercentage: 92,
    ticketPrice: 75,
  },
  {
    id: 'td4',
    city: 'LONDON',
    venue: "The Sadler's Dungeon",
    dateStr: 'LONDON DEC 2024',
    status: 'SEATS OPEN',
    capacityPercentage: 61,
    ticketPrice: 90,
  },
  {
    id: 'td5',
    city: 'WATERDEEP',
    venue: 'Yawning Portal Theatre',
    dateStr: 'MYTHICAL FEB 2026',
    status: 'SEATS OPEN',
    capacityPercentage: 35,
    ticketPrice: 120,
  },
  {
    id: 'td6',
    city: 'NEVERWINTER',
    venue: "Lord Neverember's Rotunda",
    dateStr: 'MYTHICAL MAR 2026',
    status: 'SEATS OPEN',
    capacityPercentage: 12,
    ticketPrice: 150,
  },
];

export const CHARACTER_CLASSES: CharacterClass[] = [
  {
    name: 'WARRIOR',
    description:
      'Front-line brute with heavy armor, great strength, and a habit of breaking items before checking if they are traps.',
    baseHp: 18,
    perD20Multiplier: 6,
    abilities: { STR: 15, DEX: 11, CON: 14, INT: 8, WIS: 9, CHA: 10 },
    specialMove: 'Slamming Shield Sweep',
  },
  {
    name: 'THIEF',
    description:
      'Slick, quick-fingered agent of silver accumulation. Specializes in shadow maneuvers and leaving teammates with the bar tab.',
    baseHp: 14,
    perD20Multiplier: 4,
    abilities: { STR: 9, DEX: 16, CON: 11, INT: 12, WIS: 10, CHA: 14 },
    specialMove: 'Slight-of-Hand Distraction',
  },
  {
    name: 'WIZARD',
    description:
      'An apprentice wizard with highly unpredictable outcomes. Prone to burning scrolls, beard fire, and spontaneous ice grids.',
    baseHp: 10,
    perD20Multiplier: 3,
    abilities: { STR: 7, DEX: 12, CON: 10, INT: 16, WIS: 13, CHA: 11 },
    specialMove: 'Chaotic Void Detonation',
  },
  {
    name: 'ORATOR',
    description:
      'Charisma-driven virtuoso whose singing is marginally tolerable but whose political insults carry real kinetic power.',
    baseHp: 12,
    perD20Multiplier: 4,
    abilities: { STR: 10, DEX: 13, CON: 11, INT: 11, WIS: 10, CHA: 16 },
    specialMove: 'Compulsive Satirical Rant',
  },
];

export const MAGIC_ANSWERS = [
  "The Archivist scans the Tome... 'The rules strictly state that d20 modifiers apply, but the bartender has final veto authority.'",
  'The dice tumble! You rolled a 15. Your prompt hits the target but leaves a slight scent of singed parchment.',
  "An ancient footnote reads: 'All queries regarding rules must be accompanied by a flagon of mead.'",
  'The Chronos system hums. Gamiotics server status is active. Real-time consensus indicates 87% chance of a dragon encounter.',
  'Warning! Magic feedback detected. Ask again, but frame your question with more historical humility.',
  "The fighter shrugs: 'If the door is locked, kick it. If the query isn't answering, kick it harder.'",
  "Special archives entry 24b: 'Twenty-Sided Tavern performers are trained in improvised diplomatic resolution.'",
  "A quiet voice from the shadow: 'The Rogue already stole that information. It's available for 5 gold pieces.'",
];
