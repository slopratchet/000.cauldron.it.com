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
    answer: "The first read-through must be done without analytical pausing. The objective is to experience the story as a pure piece of cinema or theater. The Output: The designer captures immediate, instinctual gut reactions. Is the world oppressive or expansive? Does the story feel cold, damp, or sun-bleached?",
  },
  {
    id: 'pass-two',
    category: 'THE ANATOMY OF THE CREATIVE INTERROGATION',
    question: 'PASS TWO: THE STRUCTURAL DECONSTRUCTION',
    answer: "The second read is an exhaustive, scene-by-scene interrogation where the script is treated as a crime scene. The designer looks for explicit facts, implicit requirements, and structural transitions.",
  },
  {
    id: 'pass-three',
    category: 'THE ANATOMY OF THE CREATIVE INTERROGATION',
    question: 'PASS THREE: THE PSYCHOLOGICAL & THEMATIC SUBTEXT',
    answer: "The third read looks past the text and into the subtext. It examines character arcs, thematic motifs, and psychological states, mapping them directly onto physical spaces.",
  },
  {
    id: 'color-coding',
    category: 'THE PHYSICAL MECHANICS',
    question: 'STANDARDIZED COLOR CODING?',
    answer: "To prevent visual chaos, colors are strictly mapped: Violet/Purple for Architecture, Blue for Environmental/SFX, Green for Set Dressing, Yellow for Action Props, Pink/Magenta for Vehicles, and Orange for Graphic Design.",
  },
  {
    id: 'geometric-syntax',
    category: 'THE PHYSICAL MECHANICS',
    question: 'GEOMETRIC SYNTAX?',
    answer: "The Bracket [ Text ] for transitions, The Circle ( Word ) for specific elements, The Arrow -> for spatial vectors, The Delta Δ for change in state, and The Double Underline = for historical anchors.",
  },
  {
    id: 'spatial-volume',
    category: 'SCENOGRAPHIC INTERPRETATION',
    question: 'SPATIAL VOLUME?',
    answer: "The script dictates where a scene happens, but the designer determines how much space that scene needs to convey its psychological reality. Compression vs. Expansion.",
  },
  {
    id: 'chronological-metric',
    category: 'SCENOGRAPHIC INTERPRETATION',
    question: 'CHRONOLOGICAL METRIC?',
    answer: "Sets should rarely look like they were built yesterday; they must look like they have existed across time. The designer scans the text for clues about the history of the environment.",
  },
  {
    id: 'psychological-architecture',
    category: 'SCENOGRAPHIC INTERPRETATION',
    question: 'PSYCHOLOGICAL ARCHITECTURE?',
    answer: "The environment must act as an externalization of the characters' internal worlds. The designer tracks emotional arcs through architectural transitions.",
  },
];


export const SYSTEM_WARNING = {
  header: 'SYSTEM WARNING',
  badge: 'CAUTION ADVENTURER',
  text: 'Note to players: The Tavern is a high-interactivity zone. Your choices carry weight and may result in unforeseen consequences. Entry implies acceptance of all fates determined by the roll of the twenty-sided die. Exercise extreme caution when suggesting reckless actions to the heroes.',
};

export const CAST_DATA: CastMember[] = [
  {
    id: 'archiv',
    name: 'THE ARCHIVIST',
    role: 'DUNGEON MASTER',
    title: 'Guild Master of the Sacred Quill',
    hp: 84,
    maxHp: 84,
    stats: { STR: 10, DEX: 12, CON: 14, INT: 20, WIS: 18, CHA: 16 },
    signatureAbility: 'Fateful Redirection',
    quote: 'Record every success, but carve every failure onto your shield.',
    bio: 'Meticulous transcriber of facts, critical blunders, and minor legends. The Archivist coordinates the visual layouts and keeps the live stage in a state of controlled temporal loop. They hate spilled coffee.',
    woodcutImg:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'fighter',
    name: 'THE WARRIOR',
    role: 'FRONT-LINE BRAWLER',
    title: 'Sunderer of Shields & Iron Doors',
    hp: 120,
    maxHp: 120,
    stats: { STR: 19, DEX: 13, CON: 18, INT: 9, WIS: 10, CHA: 11 },
    signatureAbility: 'Tactical Headbutt',
    quote:
      'My sword does not require an intelligence check, only a physical one.',
    bio: 'An ironclad champion who considers heavy dialogue options to be a waste of precious stamina. Equipped with 200 pounds of cold iron armor and a very light grasp of diplomatic subtlety.',
    woodcutImg:
      'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'rogue',
    name: 'THE THIEF',
    role: 'ACROBATIC INSTIGATOR',
    title: 'Shadow Syndicate Representative',
    hp: 72,
    maxHp: 72,
    stats: { STR: 10, DEX: 20, CON: 13, INT: 14, WIS: 11, CHA: 16 },
    signatureAbility: 'Ankle-Slice & Extort',
    quote: "We aren't technical, we are practical. Now check your purse.",
    bio: 'Quick with daggers, quicker with snark. Believes stealth is the highest form of virtue, followed closely by pocketing silver ware. Rarely gives their real name unless under a Zone of Truth.',
    woodcutImg:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'mage',
    name: 'THE WIZARD',
    role: 'SPELLCASTER & FIRE hazard',
    title: 'Deacon of the Unstable Void',
    hp: 55,
    maxHp: 55,
    stats: { STR: 8, DEX: 14, CON: 11, INT: 19, WIS: 16, CHA: 12 },
    signatureAbility: 'Arcane Spark Combustion',
    quote: 'There are no accidents, only delayed magical backlashes.',
    bio: 'Graduated with absolute lowest honors from the High Spire Academy. Can manipulate space-time anomalies but regularly forgets where they placed their spell focus. Fond of spontaneous pyrotechnics.',
    woodcutImg:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'bard',
    name: 'THE ORATOR',
    role: 'CHARISMA HARVESTER',
    title: 'Vocalist of the Crimson Tankard',
    hp: 68,
    maxHp: 68,
    stats: { STR: 11, DEX: 15, CON: 12, INT: 12, WIS: 10, CHA: 20 },
    signatureAbility: 'Compulsive Melodic Insult',
    quote: "If my song doesn't convince you, my direct eye contact will.",
    bio: 'Armed with a hand-carved four-stringed mandolin and an absolutely unwarranted sense of grandeur. Can smooth-talk a cave troll, write a sonnet about a goblin, and write negative reviews of local hostels.',
    woodcutImg:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
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
