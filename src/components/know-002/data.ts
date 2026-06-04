/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FAQItem, CastMember, TourDate, CharacterClass } from './types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'intro-0',
    category: 'INTRODUCTION',
    question: 'THE DNA OF THE NARRATIVE',
    answer:
      'To categorize Luc Besson’s 2017 cinematic spectacle *Valerian and the City of a Thousand Planets* as purely "science fiction" is to fundamentally misunderstand the DNA of the narrative, the history of its source material, and the cinematic philosophy behind its creation.    When subjected to a rigorous taxonomic breakdown, *Valerian* reveals itself to be a quintessential, unapologetic work of **science fantasy**. It is a film that uses the high-tech, futuristic iconography of science fiction—intergalactic space stations, faster-than-light travel, and multidimensional virtual reality—as a structural scaffold to house what is essentially a chivalric romance, a magical ecosystem, and an auteur-driven exploration of biological mysticism.    To understand exactly why *Valerian* belongs firmly in the science fantasy genre, we must dissect the film across several distinct vectors: the historical lineage of the French *bande dessinée*, the application of auteur theory to speculative cinema, the use of modern generative rendering to simulate impossible physics, and the film’s underlying obsession with autonomous biological ecosystems.',
  },
  {
    id: 'part-1-0',
    category: 'THE FRANCO-BELGIAN ROOTS AND THE REJECTION OF HARD SCIENCE',
    question:
      'THE FRANCO-BELGIAN ROOTS AND THE REJECTION OF HARD SCIENCE - SEC 1',
    answer:
      'The foundation of *Valerian and the City of a Thousand Planets* lies in the groundbreaking French comic series *Valérian et Laureline*, created by writer Pierre Christin and artist Jean-Claude Mézières in 1967. To classify the film, we must first classify its source material, which emerged from a very different cultural context than American mid-century science fiction.',
  },
  {
    id: 'part-1-1',
    category: 'THE FRANCO-BELGIAN ROOTS AND THE REJECTION OF HARD SCIENCE',
    question:
      'THE FRANCO-BELGIAN ROOTS AND THE REJECTION OF HARD SCIENCE - SEC 2',
    answer:
      'During the Golden Age of American sci-fi, writers like Isaac Asimov and Robert A. Heinlein were heavily focused on "hard" science fiction. They built narratives around extrapolations of physics, orbital mechanics, and rigid sociological frameworks. Their worlds were governed by strict, rational rules.',
  },
  {
    id: 'part-1-2',
    category: 'THE FRANCO-BELGIAN ROOTS AND THE REJECTION OF HARD SCIENCE',
    question:
      'THE FRANCO-BELGIAN ROOTS AND THE REJECTION OF HARD SCIENCE - SEC 3',
    answer:
      'The Franco-Belgian comic tradition of the 1960s and 1970s, however, was heavily influenced by surrealism, expressionism, and the psychedelic movement. Christin and Mézières were not interested in writing technical manuals for space travel; they were interested in social commentary, aesthetic boundary-pushing, and mythic storytelling. The universe of *Valérian* was one where spaceships were simply a means to transport characters into bizarre, allegorical dreamscapes.',
  },
  {
    id: 'part-1-3',
    category: 'THE FRANCO-BELGIAN ROOTS AND THE REJECTION OF HARD SCIENCE',
    question:
      'THE FRANCO-BELGIAN ROOTS AND THE REJECTION OF HARD SCIENCE - SEC 4',
    answer:
      'When Luc Besson adapted this work half a century later, he preserved this fundamental disregard for empirical science. In *Valerian*, there is no attempt to explain the propulsion systems of the *Intruder* (Valerian and Laureline’s ship), nor is there any rational explanation for how gravity is maintained across the impossibly chaotic architecture of Alpha. The technology is entirely frictionless; it exists simply to facilitate the magic of the narrative. This complete subordination of scientific plausibility to aesthetic and narrative wonder is the first major hallmark of science fantasy.',
  },
  {
    id: 'part-2-0',
    category: 'AUTEUR THEORY AND EXPRESSIONISTIC WORLDBUILDING',
    question: 'AUTEUR THEORY AND EXPRESSIONISTIC WORLDBUILDING - SEC 1',
    answer:
      'Examining the film through the lens of auteur theory provides another critical layer of understanding. Auteur theory suggests that a film reflects the director\'s personal creative vision, as if they were the primary "author." Luc Besson is a highly distinct cinematic auteur whose speculative fiction (*The Fifth Element*, *Lucy*, *Valerian*) consistently blurs the line between the biological and the technological.',
  },
  {
    id: 'part-2-1',
    category: 'AUTEUR THEORY AND EXPRESSIONISTIC WORLDBUILDING',
    question: 'AUTEUR THEORY AND EXPRESSIONISTIC WORLDBUILDING - SEC 2',
    answer:
      'Besson’s directorial fingerprint relies heavily on visual maximalism and emotional hyper-reality. In hard science fiction, the universe is often depicted as sterile, cold, and vast—a void governed by the indifference of physics. Think of the utilitarian spacecraft in *2001: A Space Odyssey* or *The Expanse*.',
  },
  {
    id: 'part-2-2',
    category: 'AUTEUR THEORY AND EXPRESSIONISTIC WORLDBUILDING',
    question: 'AUTEUR THEORY AND EXPRESSIONISTIC WORLDBUILDING - SEC 3',
    answer:
      'In contrast, Besson’s universe is vibrantly alive, chaotic, and heavily textured with what can be described as a biopunk-noir aesthetic. His environments are a clash of decaying industrialism and hyper-vibrant biological growth. The City of Alpha is not a pristine metallic ring; it is a sprawling, cancerous accretion of millions of different architectural styles, ship hulls, and biological habitats stacked on top of one another. It is a visual representation of biological rot and rebirth on a macro-structural scale.',
  },
  {
    id: 'part-2-3',
    category: 'AUTEUR THEORY AND EXPRESSIONISTIC WORLDBUILDING',
    question: 'AUTEUR THEORY AND EXPRESSIONISTIC WORLDBUILDING - SEC 4',
    answer:
      'Besson uses the tools of science fiction to paint an expressionistic canvas. The aesthetic choices are driven by emotion and theme, not engineering. The presence of a sprawling, neon-drenched red-light district within a supposedly highly regulated intergalactic government station makes no logistical sense, but it makes perfect *expressionistic* sense. It allows Besson to explore the grimy, tactile, noir-influenced underbelly of a high-tech society. This prioritization of auteur-driven mood and expressionism over rational worldbuilding pushes the film decidedly into the realm of fantasy.',
  },
  {
    id: 'part-3-0',
    category: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM',
    question: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM - SEC 1',
    answer:
      'Perhaps the most fascinating aspect of *Valerian* is its setting: Alpha, the City of a Thousand Planets. This is where the film’s classification as science fantasy becomes most apparent. Alpha functions less like a traditional sci-fi space station and more like an unimaginably complex, autonomous ecosystem simulation.',
  },
  {
    id: 'part-3-1',
    category: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM',
    question: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM - SEC 2',
    answer:
      'The prologue of the film brilliantly charts the history of Alpha, beginning as the International Space Station and slowly accumulating modular additions from various Earth nations, then alien species, until it becomes so massive that its gravitational pull threatens Earth, forcing it to be jettisoned into deep space.',
  },
  {
    id: 'part-3-2',
    category: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM',
    question: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM - SEC 3',
    answer:
      'From a systems architecture perspective, Alpha is a nightmare of high-concurrency environments. It is home to thousands of distinct species, each requiring entirely different biological habitats. There are sectors submerged entirely in liquid, sectors composed of corrosive gases, and sectors dedicated to high-density digital networking.',
  },
  {
    id: 'part-3-3',
    category: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM',
    question: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM - SEC 4',
    answer:
      'However, rather than explaining the massive, high-crunch mathematical models required to sustain life support, thermal regulation, and structural integrity across such a chaotic mass, the film treats Alpha like an emergent biological organism. The station operates on the logic of a living coral reef.',
  },
  {
    id: 'part-3-4',
    category: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM',
    question: 'ALPHA AS AN AUTONOMOUS BIOLOGICAL ECOSYSTEM - SEC 5',
    answer:
      'In a purely sci-fi story, the plot might revolve around the mechanical failure of this station. In *Valerian*, the threat to Alpha is treated like a biological infection. The "Red Zone" is a rapidly expanding, radioactive tumor at the center of the station. The language used by the military commanders to describe it is the language of oncology and virology. Furthermore, the ultimate cause of this "tumor" is not a reactor meltdown, but the physical manifestation of collective trauma and the survival efforts of an ancient, displaced civilization. The station is a living body, and the plot is an immune response—a deeply fantastical approach to a technological setting.',
  },
  {
    id: 'part-4-0',
    category: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION',
    question: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION - SEC 1',
    answer:
      'To realize a universe that defies the laws of physics, a film must rely heavily on the absolute cutting-edge of visual effects. The way *Valerian* utilizes modern generative rendering techniques fundamentally alters how the audience processes the genre.',
  },
  {
    id: 'part-4-1',
    category: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION',
    question: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION - SEC 2',
    answer:
      'When technology in a film reaches a level of visual complexity that the human brain cannot intuitively parse as "manufactured," it crosses Arthur C. Clarke’s threshold and becomes visually indistinguishable from magic. The visual effects teams at Weta Digital and Industrial Light & Magic were tasked with rendering environments that possess multiple, overlapping states of reality.',
  },
  {
    id: 'part-4-2',
    category: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION',
    question: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION - SEC 3',
    answer:
      'The greatest example of this is the "Big Market" sequence early in the film. The Big Market is a massive, multidimensional bazaar situated on a barren desert planet. To the naked eye, the planet is completely empty. However, by putting on a specialized helmet and a haptic glove, visitors can simultaneously interact with a bustling, high-density city that exists in another dimension.',
  },
  {
    id: 'part-4-3',
    category: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION',
    question: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION - SEC 4',
    answer:
      "This sequence is a masterpiece of complex spatial physics and rendering. Characters are seen running through an empty desert in one dimension while simultaneously navigating narrow, crowded alleys, climbing structures, and fighting guards in another. When Valerian's arm gets trapped in a dimensional phase-shifter, part of his body exists in the desert, and part exists in the market.",
  },
  {
    id: 'part-4-4',
    category: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION',
    question: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION - SEC 5',
    answer:
      'To execute this on screen required immense processing power and sophisticated generative rendering to simulate how light, shadow, and atmospheric density interact across two completely different environments simultaneously. But crucially, while the *creation* of the scene was a triumph of high-end software and digital simulation, the *narrative effect* is pure magic.',
  },
  {
    id: 'part-4-5',
    category: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION',
    question: 'GENERATIVE RENDERING AND THE ARCHITECTURE OF ILLUSION - SEC 6',
    answer:
      'There is no grounding in theoretical quantum physics that justifies how the mass of a million-person market is displaced, or how kinetic energy transfers seamlessly across the dimensional barrier without causing explosive atmospheric decompression. The "dimensional helmets" are functionally identical to enchanted amulets that allow a hero to see into the fairy realm. The technology is just the rendering engine for a magical concept.',
  },
  {
    id: 'part-5-0',
    category: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER',
    question: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER - SEC 1',
    answer:
      'The central MacGuffin of the film is the ultimate proof of its science fantasy classification. The entire plot revolves around a creature known as a "Mül Converter."',
  },
  {
    id: 'part-5-1',
    category: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER',
    question: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER - SEC 2',
    answer:
      'Visually, the Converter looks like a small, bioluminescent pangolin or reptile. According to the film’s lore, this creature possesses the ability to ingest a single object and biologically replicate it, excreting hundreds of identical copies. The main characters need the Converter to replicate "pearls"—massive, glowing spheres of pure energy that power the angelic alien race known as the Pearls of Mül.',
  },
  {
    id: 'part-5-2',
    category: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER',
    question: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER - SEC 3',
    answer:
      'If we look at this through the lens of hard science fiction, it is complete nonsense. A biological creature cannot consume a 10-ounce pearl and instantly excrete 100 pounds of identical pearls without violating the most fundamental laws of thermodynamics and the conservation of mass. Where does the extra mass come from? How does a biological stomach synthesize complex, high-energy crystalline structures in a matter of seconds?',
  },
  {
    id: 'part-5-3',
    category: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER',
    question: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER - SEC 4',
    answer:
      'In science fiction, replication on that scale would be handled by nanotechnology or complex molecular synthesizers. In *Valerian*, replication is handled by a cute animal. It is a biological stat block pulled straight from a tabletop bestiary. The Converter is a magical goose that lays golden eggs, reimagined through the lens of modular creature design.',
  },
  {
    id: 'part-5-4',
    category: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER',
    question: 'MODULAR BIOLOGY AND THE MYSTICISM OF THE MÜL CONVERTER - SEC 5',
    answer:
      'This approach to biology permeates the film. The creatures Valerian and Laureline encounter—from the massive, telepathic, memory-eating underwater leviathan to the Doghan Daguis (a trio of bat-like aliens who share a single consciousness and must speak their sentences in sequence)—are not designed through evolutionary logic. They are designed as mythological trials and tricksters. They are dungeon encounters dressed in alien skin.',
  },
  {
    id: 'part-6-0',
    category: 'THE PEARLS AND THE MYTH OF THE NOBLE SAVAGE',
    question: 'THE PEARLS AND THE MYTH OF THE NOBLE SAVAGE - SEC 1',
    answer:
      'The emotional core of the film centers on the Pearls, an androgynous, hairless, luminescent race of humanoids who lived in perfect harmony on a paradise planet before it was destroyed by human space warfare.',
  },
  {
    id: 'part-6-1',
    category: 'THE PEARLS AND THE MYTH OF THE NOBLE SAVAGE',
    question: 'THE PEARLS AND THE MYTH OF THE NOBLE SAVAGE - SEC 2',
    answer:
      'The portrayal of the Pearls is a direct importation of high fantasy tropes. They are essentially Space Elves. They live in a state of grace, deeply connected to the natural rhythms of their planet. They wash their faces with cosmic energy, they live in iridescent seashell structures, and their society is governed by peaceful monarchs.',
  },
  {
    id: 'part-6-2',
    category: 'THE PEARLS AND THE MYTH OF THE NOBLE SAVAGE',
    question: 'THE PEARLS AND THE MYTH OF THE NOBLE SAVAGE - SEC 3',
    answer:
      'When their planet is destroyed, the survivors are stranded inside the wreckage of a human spacecraft. Over decades, they manage to teach themselves advanced human engineering, quantum physics, and computer science, eventually building their own makeshift spacecraft hidden inside Alpha.',
  },
  {
    id: 'part-6-3',
    category: 'THE PEARLS AND THE MYTH OF THE NOBLE SAVAGE',
    question: 'THE PEARLS AND THE MYTH OF THE NOBLE SAVAGE - SEC 4',
    answer:
      'Once again, the film uses the *aesthetic* of science (they are seen welding, typing on holographic keyboards, and building engines) but operates on the *logic* of a fairy tale. The idea that a primitive, harmonious, beach-dwelling species could instantly comprehend and reverse-engineer hyper-advanced interstellar technology simply because they are pure of heart and peaceful is a deeply romantic, fantastical notion. It bypasses the grueling realities of technological development and industrial infrastructure. Their mastery of science is treated as a mystical awakening.',
  },
  {
    id: 'part-7-0',
    category: 'THE CHIVALRIC ROMANCE NARRATIVE STRUCTURE',
    question: 'THE CHIVALRIC ROMANCE NARRATIVE STRUCTURE - SEC 1',
    answer:
      'Finally, we must examine the narrative skeleton of the film. Beneath the neon and the CGI, *Valerian and the City of a Thousand Planets* is a classic chivalric romance.',
  },
  {
    id: 'part-7-1',
    category: 'THE CHIVALRIC ROMANCE NARRATIVE STRUCTURE',
    question: 'THE CHIVALRIC ROMANCE NARRATIVE STRUCTURE - SEC 2',
    answer:
      'Major Valerian and Sergeant Laureline are not depicted as grounded, military tacticians. They are a knight and a paladin. Valerian’s arc is entirely focused on proving his worthiness to Laureline, acting as the cocky but devoted knight seeking the favor of his lady.',
  },
  {
    id: 'part-7-2',
    category: 'THE CHIVALRIC ROMANCE NARRATIVE STRUCTURE',
    question: 'THE CHIVALRIC ROMANCE NARRATIVE STRUCTURE - SEC 3',
    answer:
      'Their journey through Alpha mirrors a classic dungeon crawl. When Laureline is kidnapped by the Boulan Bathors (a race of grotesque, primitive aliens living in the decaying, industrial underbelly of the station), Valerian must venture into their territory to rescue her. He must acquire a disguise (a shape-shifting alien named Bubble, played by Rihanna) to infiltrate the enemy castle (the throne room of the Bathor king). He fights through guards using a combination of swords and specialized gadgets, rescues the maiden just before she is sacrificed at a grand banquet, and escapes.',
  },
  {
    id: 'part-7-3',
    category: 'THE CHIVALRIC ROMANCE NARRATIVE STRUCTURE',
    question: 'THE CHIVALRIC ROMANCE NARRATIVE STRUCTURE - SEC 4',
    answer:
      'This sequence owes far more to the myths of King Arthur, the rescue of Princess Leia in *Star Wars*, and the structure of high-crunch fantasy roleplaying campaigns than it does to any tradition of speculative science fiction. The conflicts are solved not through scientific deduction or engineering, but through martial prowess, bravery, and magical shape-shifting allies.',
  },
  {
    id: 'conc-0',
    category: 'CONCLUSION',
    question: 'CONCLUSION: PART 1',
    answer:
      'To definitively answer the question: *Valerian and the City of a Thousand Planets* is a masterclass in **science fantasy**.',
  },
  {
    id: 'conc-1',
    category: 'CONCLUSION',
    question: 'CONCLUSION: PART 2',
    answer:
      'It is a film that refuses to be bound by the limitations of empirical reality. Luc Besson utilized the most advanced digital tools of the 21st century to construct an incredibly dense, visually overwhelming universe, but he populated that universe with the tropes of ancient mythology.',
  },
  {
    id: 'conc-2',
    category: 'CONCLUSION',
    question: 'CONCLUSION: PART 3',
    answer:
      'From the multi-dimensional overlapping architecture of the Big Market, to the biological mysticism of the Mül Converter, down to the biopunk-noir ecosystem of Alpha station itself, every element of the film is designed to elicit a sense of pure, unadulterated wonder rather than intellectual plausibility. It is a story where spaceships and energy blasters exist side-by-side with telepathic beasts, magical replicators, and space elves.',
  },
  {
    id: 'conc-3',
    category: 'CONCLUSION',
    question: 'CONCLUSION: PART 4',
    answer:
      'It stands as a testament to the fact that when technology is pushed to its absolute visual limit on screen, it loops back around to become magic, allowing a director to build an autonomous, deeply emotional fantasy world among the stars.',
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
