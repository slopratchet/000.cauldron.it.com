import { LibraryItem, PlayerCharacter, LogEntry } from './types';

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'primal-mama',
    title: 'Primal Mama',
    subtitle: 'All American Alligator Delivery System',
    price: '$49.99',
    isNew: true,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'A legendary high-stamina beastmaster relic forged in Saronite and Titansteel. Built for the rigorous demands of deep instanced dungeons and high-damage tanking.',
    refCode: 'REF_N: 01.02.14',
    metaDetails: [
      'Alligator Alley Franchise',
      '288 Pages',
      'Tactical Gear Spec',
    ],
    chapters: [
      {
        name: 'ARTICLE I: CORE WORLD IDENTITY & PREMISE',
        content:
          "The 'No Beef, Alligator Tail' paradigm. Ecological, economic, and social systems derived from Bovine Absence.",
      },
      {
        name: 'ARTICLE II: FOUNDATIONAL MODALITIES',
        content:
          'The rules of world-building as established by the CAA. Real-time alignment of media platforms.',
      },
      {
        name: 'ARTICLE III: KEY FACTIONS & CASTS',
        content:
          'The Culinary Guild, the Swamp Rangers, and the Bovine heretics. Detailed background and design notes.',
      },
      {
        name: 'ARTICLE IV: SWAMP TYRANT BESTIARY',
        content:
          'Comprehensive specs of reptilian threats. Biology, habitat, and capture guidelines for 20+ species.',
      },
      {
        name: 'ARTICLE V: RELICS & GEAR BLUEPRINT',
        content:
          'Golden lassos, cleavers, diagnostic scanners, and tactical equipment sheets.',
      },
      {
        name: 'ARTICLE VI: TRANSMEDIA SANDBOX MODULE',
        content:
          'Interactive campaign seeds and narrative arcs for writers, game developers, and artists.',
      },
    ],
  },
  {
    id: 'ravenloft-horrors',
    title: 'Ravenloft: The Horrors Within',
    subtitle: 'A Core Sourcebook of Dread and Decay',
    price: '$39.99',
    isNew: true,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'Uncover the secrets of the dark domains. This manual details gothic horrors, active curses, and nightmarish entities lurking within the mists of Ravenloft.',
    refCode: 'REF_N: 45.92.11',
    metaDetails: [
      'Hardcover: 320 pages',
      'Publisher: Chronos Systems',
      'Standard Format',
      'Published: 1978',
    ],
    chapters: [
      {
        name: 'I. The Mists of Dread',
        content:
          'The borders of the Domain are not physical walls, but shifting vapors that answer to the dark powers. Those who venture into the fog seldom return intact. DM Guide: Rolling on the Madness Table when vision drops below 10ft in the mists.',
      },
      {
        name: 'II. Gothic Archetypes',
        content:
          'Introducing two new subclasses: The Hexbound Ranger and the College of Dirges Bard. Each operates under severe visual and psychological constraints appropriate for a high-fatality gothic setting.',
      },
      {
        name: 'III. Terrors of the Night',
        content:
          'Comprehensive statistics for the Whispering Ghoul, the Blood-Weaver Spider, and the legendary Lord of the Keep. Features fully-detailed d20 behavior patterns for autonomous combat orchestration.',
      },
    ],
  },
  {
    id: 'ravenloft-bundle',
    title: 'Ravenloft: The Horrors Within Ultimate Bundle',
    subtitle: 'The Definitive Collection of Gothic Terror',
    price: '$149.99',
    isNew: true,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'Includes the core sourcebook, custom digital character sheets, battle maps, soundscapes, and five high-fatality mini-adventures designed to push your players to the brink.',
    refCode: 'REF_N: 45.92.12',
    metaDetails: [
      'Complete Collector Set',
      'Includes 5 Campaign Maps',
      'Digital Lore Integration Included',
    ],
    chapters: [
      {
        name: 'I. Campaigns of Madness',
        content:
          'Detailed campaign frameworks for a 12-session horror arc. Spans across the valleys of Barovia into the depths of the Amber Temple.',
      },
      {
        name: 'II. The Soundscapes',
        content:
          'A listing of analog synthesizer tracks and frequency guides designed to elicit atmospheric tension at the game table.',
      },
      {
        name: 'III. Custom Cartography',
        content:
          'High-contrast schematics and isometric layouts of five gothic castles, including the infamous Castle Ravenloft itself.',
      },
    ],
  },
  {
    id: 'northlands-sagas',
    title: 'Northlands Sagas',
    subtitle: 'Epic Campaigns Across Frozen Fjordlands',
    price: '$29.99',
    isNew: true,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'A multi-part epic campaign through the unforgiving, icy wilderness of the Northlands. Face ancient frost giants, legendary beasts, and the encroaching rime-curse.',
    refCode: 'REF_N: 45.92.13',
    metaDetails: [
      'Campaign Module',
      'Level Range: 1-10',
      'Grayscale Battlemaps',
    ],
    chapters: [
      {
        name: 'Saga I: The Whispering Fjord',
        content:
          'The village of Skagafjord has gone silent. Reports of ice-demons rising from the depths of the glacial crevasse must be investigated by the vanguard.',
      },
      {
        name: 'Saga II: Throne of Rime',
        content:
          'Ascend the peaks of Mount Rime to locate the ancient, frozen palace of King Thrym. Beware the frostbite rules: each hour of exposure demands a DC 14 Constitution saving throw.',
      },
      {
        name: 'Saga III: Twilight of the Jarls',
        content:
          'A bitter political conflict erupts in the Great Hall. The party must negotiate a truce or choose a side before the frost giant hordes breach the outer stockades.',
      },
    ],
  },
  {
    id: 'northlands-worldbook',
    title: 'Northlands Worldbook',
    subtitle: 'The Definitive Guide to the Frozen Wastes',
    price: '$49.99',
    isNew: true,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'The definitive setting and lore manual for the Northlands. Perfect for DMs crafting custom campaigns in a brutal, Norse-inspired high-survival setting.',
    refCode: 'REF_N: 45.92.14',
    metaDetails: [
      'Gazetteer and World Guide',
      '200 Detailed Locations',
      'Custom Pantheon Index',
    ],
    chapters: [
      {
        name: 'I. History of the Rime-Age',
        content:
          'Twelve centuries ago, the world was plunged into endless frost. Read the ancient runes and discover the origin of the Jarl alliances and the dark Runic Seals.',
      },
      {
        name: 'II. Geography of the Wastes',
        content:
          'From the Iron Icebergs to the Smoking Volcanic Valleys. Each region is mapped out with weather generation charts, encounter tables, and local resource scarcity indices.',
      },
      {
        name: 'III. Pantheon & Runecraft',
        content:
          'Deities of the cold sky and the dark earth. Rules for engraving standard runic matrixes onto swords, shields, and sacred pillars to grant temporary magical warding.',
      },
    ],
  },
  {
    id: 'chronos-engine',
    title: 'Chronos Systems Engine Guide',
    price: '$19.99',
    isNew: false,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'The core mechanic instructions for DM Command Center. Features advanced d20 variance models, turn sequence overrides, and retro-mechanical resolution formulas.',
    refCode: 'REF_N: 45.92.15',
    metaDetails: ['System manual', 'v1.4 core standards'],
    chapters: [
      {
        name: 'Core Loop',
        content:
          'Every action relies on the 1d20 + Modifier formula. Under extreme strain, DMs can apply the Chronos Penalty: rolling 2d20 and keeping the lower result.',
      },
    ],
  },
  {
    id: 'iron-lich',
    title: 'Vault of the Iron Lich',
    price: '$14.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1519074069444-1ba4e6664402?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'A brutal, retro-designed megadungeon. Players navigate a maze of rust, mechanical death-traps, and clockwork undead created by an ancient artificer turned lich.',
    refCode: 'REF_N: 45.92.16',
    metaDetails: [
      'Megadungeon',
      'High fatality rate',
      'Grid coordinates: C-14 to F-28',
    ],
    chapters: [
      {
        name: 'Level 1: The Rusted Sump',
        content:
          'Acids drip from copper pipelines. Iron skeletons patrols the flooded walkways on a strict 10-turn cycle.',
      },
    ],
  },
  {
    id: 'old-gods',
    title: 'Codex of the Old Gods',
    price: '$45.00',
    isNew: false,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'Forbidden knowledge of deities that predated the Kingdom of Aeon. Includes spellcasting variants that demand physical sacrifices and corruptive feedback rolls.',
    refCode: 'REF_N: 45.92.17',
    metaDetails: ['Forbidden lore', 'Includes sanity rules'],
    chapters: [
      {
        name: 'Elder Glyphs',
        content:
          'To cast spells from the Void, a caster must expend hit points equal to the spell level. Failing a spell check inflicts permanent mental corruption.',
      },
    ],
  },
  {
    id: 'void-whispers',
    title: 'Whispers of the Void',
    price: '$24.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'An investigative horror module. In a secluded frontier hamlet, villagers are hearing metallic signals from the night sky. Can the party disconnect the transceiver before it is too late?',
    refCode: 'REF_N: 45.92.18',
    metaDetails: ['Sci-fi horror crossover', 'Frontier setting'],
    chapters: [
      {
        name: 'Act I: The Signal',
        content:
          'At midnight, the chapel bell rings itself. Monospaced binary codes are discovered scratched into the grain silos.',
      },
    ],
  },
  {
    id: 'star-pharaoh',
    title: 'Tomb of the Star Pharaoh',
    price: '$34.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'Enter a desert pyramid constructed of black obsidian and green laser barriers. Explore the crypt of a monarch who fell from the heavens ten thousand years ago.',
    refCode: 'REF_N: 45.92.19',
    metaDetails: ['Lvl 7 adventure', 'Obsidian grid mapping'],
    chapters: [
      {
        name: 'The Obsidian Crypt',
        content:
          'Gravity acts in reverse inside the pharaoh chamber. Sarcophagus emits localized high-frequency hums.',
      },
    ],
  },
  {
    id: 'technomancer',
    title: "Technomancer's Manual",
    price: '$29.99',
    isNew: false,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'A comprehensive rulebook detailing the fusion of electric circuits, steam pipelines, and elemental runic arrays. Perfect for modernizing archaic campaigns.',
    refCode: 'REF_N: 45.92.20',
    metaDetails: ['Apparatus blueprints', 'Circuits guide'],
    chapters: [
      {
        name: 'Chapter IV: Runic Resistors',
        content:
          'Connecting copper wire to a fire rune creates a localized plasma welder. Drawbacks include battery overcharge.',
      },
    ],
  },
  {
    id: 'clockwork-cathedral',
    title: 'The Clockwork Cathedral',
    price: '$19.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'Steam pistons hiss and brass gearworks turn. A radical cult of gears has seized the ancient cathedral, replacing the holy icons with ticking apparatuses.',
    refCode: 'REF_N: 45.92.21',
    metaDetails: ['Dynamic terrain hazard rules'],
    chapters: [
      {
        name: 'The Great Cog Engine',
        content:
          'Combatants on the rotating brass cogs must succeed a DC 13 Dex save at the end of each round or be pulled into the gear shafts.',
      },
    ],
  },
  {
    id: 'bestiary-planes',
    title: 'Bestiary of the Outer Planes',
    price: '$39.99',
    isNew: false,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'Eldritch geometry and non-Euclidean horrors. Features technical drawings, attack grids, and psychic defense strategies for 80 extra-dimensional entities.',
    refCode: 'REF_N: 45.92.22',
    metaDetails: ['Dimension catalogs', '80 monster logs'],
    chapters: [
      {
        name: 'The Void-Weaver',
        content:
          'A floating mass of black filaments that feeds on spatial memories. Attacks target the wizard spell slots rather than HP.',
      },
    ],
  },
  {
    id: 'shattered-crown',
    title: 'Echoes of the Shattered Crown',
    price: '$15.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'The monarch is slain, and the silver crown has been shattered into six jagged shards. Each shard has taken a life of its own, possessing local warlords with extreme greed.',
    refCode: 'REF_N: 45.92.23',
    metaDetails: ['Political espionage', 'Level 3 campaign'],
    chapters: [
      {
        name: 'Act II: The Baronet',
        content:
          'Infiltrate the walled keep of Baronet Gault, who wears a crown shard as a monocle, granting him perfect truesight.',
      },
    ],
  },
  {
    id: 'black-sun',
    title: 'Citadel of the Black Sun',
    price: '$22.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'In the center of the dark eclipse, a obsidian keep hovers in the dead air. Highly fatal environment: gravity is non-existent, and light is physically hot.',
    refCode: 'REF_N: 45.92.24',
    metaDetails: ['Anti-gravity mechanics', 'Eclipse timer'],
    chapters: [
      {
        name: 'The Core of Darkness',
        content:
          'A black dwarf star sits in the central reactor. Moving within 20ft inflicts cold damage that bypasses armor.',
      },
    ],
  },
  {
    id: 'gridrunner',
    title: "Gridrunner's Handbook",
    price: '$12.99',
    isNew: false,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'A pocket-sized field guide for moving rapidly across technical wireframe maps, hacking mechanical locks, and setting long-range tripwires.',
    refCode: 'REF_N: 45.92.25',
    metaDetails: ['Tactical skirmish guide', 'Pocket format'],
    chapters: [
      {
        name: 'Vanguard Tactics',
        content:
          'Allows rogue-class characters to dash as a free action if they start their turn adjacent to a structural iron column.',
      },
    ],
  },
  {
    id: 'sunken-spire',
    title: 'The Sunken Spire',
    price: '$18.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'An oceanic exploration module. Players board a brass diving bell to descend into the trench of the Sunken Spire, an ancient library of the sea-elves.',
    refCode: 'REF_N: 45.92.26',
    metaDetails: ['Underwater combat formulas', 'Lvl 4 adventure'],
    chapters: [
      {
        name: 'Depth Pressure',
        content:
          'At 1000 fathoms, any direct bludgeoning hit on armor cracks a structural seal, reducing AC by 1.',
      },
    ],
  },
  {
    id: 'clay-iron',
    title: 'Manual of Clay & Iron',
    price: '$25.00',
    isNew: false,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1533158307587-828f0a9501a7?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'Blueprints for constructing physical clay homunculi and iron golems. Features pneumatic activation diagrams and runic command chains.',
    refCode: 'REF_N: 45.92.27',
    metaDetails: ['Golem building specs', 'Clay alchemy manual'],
    chapters: [
      {
        name: 'Golem Assembly',
        content:
          'Assembly requires 120lbs of refined river clay, a silver core worth 200gp, and a successful DC 15 Arcana check.',
      },
    ],
  },
  {
    id: 'aeon-ruins',
    title: 'Ruins of the Aeon Kingdom',
    price: '$27.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'The ancient capital of Chronos lies in ruins. Explore the fractured time-rifts, avoid the patrolling Aeon Wardens, and piece together the history of the fall.',
    refCode: 'REF_N: 45.92.28',
    metaDetails: ['Time-distortion hazards', 'Gazetteer included'],
    chapters: [
      {
        name: 'Rift Zone Delta',
        content:
          'Upon entering the rift, players must roll 1d6. On a 1, their turn is resolved backwards in sequence.',
      },
    ],
  },
  {
    id: 'barrow-down',
    title: 'Shadows Over Barrow-Down',
    price: '$14.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'A classic low-fantasy crawling module. The ancient burial mounds of the highland chieftains are glowing with pale green flame. Skeletal kings rise to reclaim their land.',
    refCode: 'REF_N: 45.92.29',
    metaDetails: ['Barrow mapping grids', 'Low-magic theme'],
    chapters: [
      {
        name: 'Barrow III: The Cairn of Gelt',
        content:
          'A stone sarcophagus sits atop a bed of rusted iron longswords. Touch triggers a chilling scream.',
      },
    ],
  },
  {
    id: 'crimson-ash',
    title: 'Grimoire of Crimson Ash',
    price: '$35.00',
    isNew: false,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'A book of fire magic and volcanic spells. Learn the secrets of ash-weaving, magma streams, and setting boundaries of absolute combustion.',
    refCode: 'REF_N: 45.92.30',
    metaDetails: ['Pyromancy codex', 'Includes flame tables'],
    chapters: [
      {
        name: 'Spell: Ash-Cloud',
        content:
          'Creates a 30ft radius of thick ash. Blinds all creatures without optical thermal filters. Duration: 5 rounds.',
      },
    ],
  },
  {
    id: 'iron-vanguard',
    title: 'The Iron Vanguard',
    price: '$22.00',
    isNew: false,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'Comprehensive guidelines for heavy-armor tactics, shield formations, defensive phalanxes, and fortified encampments in hazardous borderlands.',
    refCode: 'REF_N: 45.92.31',
    metaDetails: ['Fortification maps', 'Shield maneuvers guide'],
    chapters: [
      {
        name: 'The Shield-Wall',
        content:
          'Three or more fighters standing shoulder-to-shoulder with shields raised grant each other +2 AC against physical projectiles.',
      },
    ],
  },
  {
    id: 'obsidian-citadel',
    title: 'Doom of the Obsidian Citadel',
    price: '$19.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'A dark tower rises from a lake of black glass. Within, a renegade sorcerer is constructing a magnifying mirror designed to ignite the fields of Aeon.',
    refCode: 'REF_N: 45.92.32',
    metaDetails: ['Reflective surface hazard rules'],
    chapters: [
      {
        name: 'The Solar Mirror Room',
        content:
          'At the start of turn, random beams of focused sunlight strike tiles, dealing 2d10 fire damage to anyone standing there.',
      },
    ],
  },
  {
    id: 'steam-waste',
    title: 'Gnomes of the Steam-Waste',
    price: '$16.99',
    isNew: false,
    type: 'adventure',
    coverUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'A comedic but highly lethal adventure module. Gnomish prospectors have tapped into a high-pressure volcanic steam line, causing their heavy drills to run amok.',
    refCode: 'REF_N: 45.92.33',
    metaDetails: ['Steam explosion tables', 'Lvl 2 adventure'],
    chapters: [
      {
        name: 'The Drill Depot',
        content:
          'A massive 20-ton iron drill spins wildly on track A. Destroys any cover, player, or monster in its path.',
      },
    ],
  },
  {
    id: 'deep-underdark',
    title: 'Vaults of the Deep Underdark',
    price: '$32.99',
    isNew: false,
    type: 'rulebook',
    coverUrl:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80&sat=-100',
    description:
      'Subterranean navigation, mapping formulas for vertical cavern systems, fungal hazard identification, and telepathic language translations.',
    refCode: 'REF_N: 45.92.34',
    metaDetails: ['Subterranean navigation guides', 'Fungi catalogs'],
    chapters: [
      {
        name: 'Spore Identification',
        content:
          'Luminescent blue mushrooms emit toxic gas when stepped on. DC 14 Poison save required to avoid immediate nausea.',
      },
    ],
  },
];

export const PLAYER_CHARACTERS: PlayerCharacter[] = [
  {
    id: 'char-1',
    name: 'Eldon Vance',
    class: 'Fighter (Hexbound)',
    level: 5,
    hpCurrent: 48,
    hpMax: 48,
    ac: 18,
    status: 'ACTIVE / HEAVY ARMOR',
    avatarUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80&sat=-100',
  },
  {
    id: 'char-2',
    name: 'Lyra Moonsong',
    class: 'Wizard (Chronomancer)',
    level: 5,
    hpCurrent: 26,
    hpMax: 32,
    ac: 12,
    status: 'CONCENTRATING / MADNESS STAGE 1',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80&sat=-100',
  },
  {
    id: 'char-3',
    name: 'Thorne Ironfist',
    class: 'Cleric (Order of Clay)',
    level: 5,
    hpCurrent: 40,
    hpMax: 40,
    ac: 16,
    status: 'ACTIVE / DIVINE OUTLET',
    avatarUrl:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80&sat=-100',
  },
  {
    id: 'char-4',
    name: 'Zephyr',
    class: 'Rogue (Gridrunner)',
    level: 5,
    hpCurrent: 12,
    hpMax: 35,
    ac: 15,
    status: 'WOUNDED / COMPROMISED STEALTH',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80&sat=-100',
  },
];

export const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: '08:44:01',
    type: 'system',
    message: 'CHRONOS SYSTEMS v1.4 CORE ENGINE INITIALIZED.',
  },
  {
    id: 'log-2',
    timestamp: '08:44:10',
    type: 'system',
    message: 'SENSORS ESTABLISHED IN THE KINGDOM OF AEON.',
  },
  {
    id: 'log-3',
    timestamp: '08:44:15',
    type: 'system',
    message: 'ACTIVE DIRECTORY CONNECTED: 24 LIBRARY ITEMS CACHED.',
  },
  {
    id: 'log-4',
    timestamp: '08:44:24',
    type: 'combat',
    message: 'Encounter sequence generated for Castle Ravenloft.',
  },
  {
    id: 'log-5',
    timestamp: '08:44:30',
    type: 'roll',
    message: 'Dungeon Master rolled Initiative: 1d20 + 4 -> [16] + 4 = 20.',
  },
];
