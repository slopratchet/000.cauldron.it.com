/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FAQItem, CastMember, TourDate, CharacterClass } from './types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'valerian-genre',
    category: 'GENRE CLASSIFICATION',
    question: 'IS VALERIAN PURE SCIENCE FICTION?',
    answer:
      "To categorize Luc Besson’s 2017 cinematic spectacle Valerian and the City of a Thousand Planets as purely 'science fiction' is to fundamentally misunderstand the DNA of the narrative, the history of its source material, and the cinematic philosophy behind its creation.",
    highlightWords: ['fundamentally misunderstand'],
  },
  {
    id: 'science-fantasy',
    category: 'TAXONOMIC BREAKDOWN',
    question: 'WHAT GENRE IS IT THEN?',
    answer:
      'When subjected to a rigorous taxonomic breakdown, Valerian reveals itself to be a quintessential, unapologetic work of science fantasy. It uses the high-tech, futuristic iconography of science fiction as a structural scaffold to house what is essentially a chivalric romance, a magical ecosystem, and an auteur-driven exploration of biological mysticism.',
    highlightWords: ['science fantasy'],
  },
  {
    id: 'franco-belgian',
    category: 'SOURCE MATERIAL',
    question: 'WHAT IS THE HISTORICAL LINEAGE?',
    answer:
      "The foundation lies in the French bande dessinée Valérian et Laureline (1967). Unlike American 'hard' sci-fi, this Franco-Belgian tradition was influenced by surrealism, expressionism, and the psychedelic movement. The universe of Valérian was one where spaceships transported characters into bizarre, allegorical dreamscapes.",
  },
  {
    id: 'auteur-theory',
    category: 'CINEMATIC PHILOSOPHY',
    question: 'HOW DOES AUTEUR THEORY APPLY?',
    answer:
      'Luc Besson is a distinct auteur whose speculative fiction blurs the line between biological and technological. His universe is vibrantly alive, chaotic, and heavily textured with a biopunk-noir aesthetic. He prioritizes auteur-driven mood and expressionism over rational worldbuilding.',
  },
  {
    id: 'alpha-ecosystem',
    category: 'WORLDBUILDING',
    question: 'WHAT IS THE CITY OF ALPHA?',
    answer:
      'Alpha functions less like a traditional sci-fi space station and more like an unimaginably complex, autonomous ecosystem simulation. It operates on the logic of a living coral reef, with the central threat treated like a biological infection rather than a mechanical failure.',
  },
  {
    id: 'big-market',
    category: 'VISUAL EFFECTS',
    question: 'HOW IS GENERATIVE RENDERING USED?',
    answer:
      "The 'Big Market' sequence requires immense processing power to simulate multiple, overlapping states of reality. While the creation is a triumph of digital simulation, the narrative effect is pure magic, indistinguishable from enchanted amulets.",
  },
  {
    id: 'mul-converter',
    category: 'PLOT DEVICES',
    question: 'WHAT IS THE MÜL CONVERTER?',
    answer:
      'The central MacGuffin is a creature that ingests a single object and biologically replicates it, violating fundamental laws of thermodynamics. It is a magical goose that lays golden eggs, reimagined through the lens of modular creature design.',
  },
  {
    id: 'the-pearls',
    category: 'CHARACTER TROPES',
    question: 'WHO ARE THE PEARLS?',
    answer:
      'The Pearls are a direct importation of high fantasy tropes—essentially Space Elves. Their mastery of science is treated as a mystical awakening, bypassing the realities of technological development. It is a deeply romantic, fantastical notion.',
  },
  {
    id: 'chivalric-romance',
    category: 'NARRATIVE STRUCTURE',
    question: 'IS IT A CHIVALRIC ROMANCE?',
    answer:
      'Beneath the neon and the CGI, Valerian and the City of a Thousand Planets is a classic chivalric romance. Major Valerian and Sergeant Laureline are not depicted as grounded, military tacticians. They are a knight and a paladin.',
  },
];

export const SYSTEM_WARNING = {
  header: 'TAXONOMIC WARNING',
  badge: 'CAUTION CRITIC',
  text: 'Note to analysts: Valerian is a high-fantasy zone. Its narrative structure may result in unforeseen reclassifications. Entry implies acceptance of all tropes determined by the rules of chivalric romance. Exercise extreme caution when expecting rigid scientific logic.',
};

export const CAST_DATA: CastMember[] = [
  {
    id: 'valerian',
    name: 'MAJOR VALERIAN',
    role: 'COCKY KNIGHT',
    title: 'Sunderer of Big Market Illusions',
    hp: 120,
    maxHp: 120,
    stats: { STR: 16, DEX: 18, CON: 15, INT: 10, WIS: 9, CHA: 17 },
    signatureAbility: 'Dimensional Phase-Punch',
    quote:
      'My devotion does not require logic, only a successful rescue mission.',
    bio: 'A cocky but devoted knight seeking the favor of his lady. Operates on martial prowess and bravery rather than scientific deduction. Functions like a paladin in a high-crunch fantasy roleplaying campaign.',
    woodcutImg:
      'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'laureline',
    name: 'SERGEANT LAURELINE',
    role: 'THE MAIDEN/PALADIN',
    title: 'Keeper of the Converter',
    hp: 105,
    maxHp: 105,
    stats: { STR: 14, DEX: 16, CON: 14, INT: 18, WIS: 16, CHA: 15 },
    signatureAbility: 'Telepathic Interrogation',
    quote: "We aren't following empirical reality, we are following intuition.",
    bio: 'The capable counterpart and object of chivalric devotion. Kidnapped by primitive aliens in the decaying underbelly, prompting a classic dungeon crawl rescue sequence. Smart, capable, but bound to the romance narrative.',
    woodcutImg:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'besson',
    name: 'LUC BESSON',
    role: 'THE AUTEUR',
    title: 'Architect of Biological Mysticism',
    hp: 200,
    maxHp: 200,
    stats: { STR: 10, DEX: 12, CON: 15, INT: 20, WIS: 18, CHA: 19 },
    signatureAbility: 'Expressionistic Worldbuilding',
    quote: 'Technology pushed to its limit becomes magic.',
    bio: 'A highly distinct cinematic auteur whose speculative fiction blurs biology and technology. Prioritizes visual maximalism, emotional hyper-reality, and biopunk-noir aesthetics over hard science.',
    woodcutImg:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'pearls',
    name: 'THE PEARLS OF MÜL',
    role: 'SPACE ELVES',
    title: 'Harmonious Survivors',
    hp: 45,
    maxHp: 45,
    stats: { STR: 8, DEX: 14, CON: 10, INT: 19, WIS: 20, CHA: 16 },
    signatureAbility: 'Mystical Technological Awakening',
    quote: 'We lived in a state of grace before the sky fell.',
    bio: 'Androgynous, luminescent humanoids. Lived in harmony before destruction. Mastered advanced human engineering purely through being pure of heart and peaceful, a deeply fantastical notion.',
    woodcutImg:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'bubble',
    name: 'BUBBLE',
    role: 'SHAPESHIFTING ALLY',
    title: 'Glamourpad Performer',
    hp: 60,
    maxHp: 60,
    stats: { STR: 12, DEX: 20, CON: 13, INT: 14, WIS: 15, CHA: 20 },
    signatureAbility: 'Perfect Disguise',
    quote: 'I can be whoever you need me to be.',
    bio: 'A shapeshifting alien who acts as a magical ally. Instrumental in infiltrating the enemy castle (Boulan Bathor throne room) during the classic dungeon crawl rescue sequence.',
    woodcutImg:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200',
  },
];

export const TOUR_DATA: TourDate[] = [
  {
    id: 'td1',
    city: 'ALPHA STATION',
    venue: 'The Red Zone',
    dateStr: 'EXPANDING',
    status: 'SOLD OUT',
    capacityPercentage: 100,
    ticketPrice: 85,
  },
  {
    id: 'td2',
    city: 'BIG MARKET',
    venue: 'Multi-Dimensional Bazaar',
    dateStr: 'PHASE 10-14',
    status: 'SEATS OPEN',
    capacityPercentage: 74,
    ticketPrice: 65,
  },
  {
    id: 'td3',
    city: 'PLANET MÜL',
    venue: 'Iridescent Seashell',
    dateStr: 'DESTROYED 2024',
    status: 'LIMITED',
    capacityPercentage: 0,
    ticketPrice: 75,
  },
  {
    id: 'td4',
    city: 'BOULAN BATHOR',
    venue: 'Throne Room Banquet',
    dateStr: 'RESCUE DEC 2024',
    status: 'SEATS OPEN',
    capacityPercentage: 61,
    ticketPrice: 90,
  },
  {
    id: 'td5',
    city: 'EARTH',
    venue: 'International Space Station',
    dateStr: 'JETTISONED 2026',
    status: 'SEATS OPEN',
    capacityPercentage: 35,
    ticketPrice: 120,
  },
];

export const CHARACTER_CLASSES: CharacterClass[] = [
  {
    name: 'KNIGHT',
    description:
      'Cocky but devoted protector relying on martial prowess and bravery. Operates on the logic of a chivalric romance rather than military tactics.',
    baseHp: 18,
    perD20Multiplier: 6,
    abilities: { STR: 16, DEX: 15, CON: 14, INT: 10, WIS: 9, CHA: 14 },
    specialMove: 'Dungeon Crawl Rescue',
  },
  {
    name: 'SPACE ELF',
    description:
      'Androgynous, luminescent survivor capable of mystical technological awakenings. Masters advanced science purely through peaceful intent.',
    baseHp: 14,
    perD20Multiplier: 4,
    abilities: { STR: 9, DEX: 14, CON: 11, INT: 18, WIS: 16, CHA: 15 },
    specialMove: 'Cosmic Energy Wash',
  },
  {
    name: 'AUTEUR',
    description:
      'Visionary creator who blurs biology and technology. Constructs chaotic, biopunk-noir ecosystems ignoring rational worldbuilding rules.',
    baseHp: 10,
    perD20Multiplier: 3,
    abilities: { STR: 7, DEX: 12, CON: 10, INT: 19, WIS: 17, CHA: 16 },
    specialMove: 'Expressionistic Canvas',
  },
  {
    name: 'SHAPESHIFTER',
    description:
      'Magical ally crucial for infiltrating enemy castles. A dungeon encounter dressed in alien skin, functioning as an enchanted disguise.',
    baseHp: 12,
    perD20Multiplier: 4,
    abilities: { STR: 10, DEX: 18, CON: 12, INT: 13, WIS: 14, CHA: 18 },
    specialMove: 'Glamour Manipulation',
  },
];

export const MAGIC_ANSWERS = [
  "The Director scans the script... 'The narrative clearly states empirical reality is suspended.'",
  'The dimensional phase shifts! You rolled a 15. You exist simultaneously in a barren desert and a bustling market.',
  "An ancient footnote reads: 'All queries regarding technological feasibility are magically resolved by the Converter.'",
  'The Alpha system hums. Ecological consensus indicates 87% chance of biological infection in the Red Zone.',
  'Warning! Cinematic maximalism detected. Frame your question with more romantic grandeur.',
  "The Knight shrugs: 'If the door is locked, phase through it using a dimensional helmet.'",
  "Special archives entry 24b: 'Primitive aliens must be bypassed to rescue the maiden.'",
  "A quiet voice from the shadow: 'The Shapeshifter already infiltrated that area. It's available for expressionistic viewing.'",
];
