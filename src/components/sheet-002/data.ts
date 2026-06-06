/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharacterRecord } from './types';

export const DEFAULT_SUBJECTS: CharacterRecord[] = [
  {
    meta: {
      character_id: 'uuid-07e59767-6985-4628-9f7a-62e0b92dadcc',
      user_id: 'owner-uuid-456',
      schemaVersion: '5.1',
      active_sources: ['SRD', 'PHB2024'],
      createdAt: '2024-03-19T10:00:00Z',
      updatedAt: '2026-03-19T14:30:00Z',
    },
    identity: {
      name: 'Catharsis Gale',
      alignment: 'Chaotic Good',
      background: 'Storm Sorcerer',
      species: 'Air Genasi',
    },
    description: {
      age: 24,
      height: '6\' 2"',
      weight: '160 lbs',
      eyes: 'Electric Blue',
      skin: 'Pale blue with swirling patterns',
      hair: 'White, constantly moving as if in a breeze',
    },
    personality: {
      traits:
        'Restless, energetic, deeply connected to the weather. Mood shifts like the wind.',
      ideals: 'Freedom. The open sky belongs to everyone.',
      bonds:
        "My crew on the airship 'The Zephyr'. We ride the storms together.",
      flaws: 'Impulsive. I act before I think, much like a sudden squall.',
      familyHistory:
        "Subject's immediate family perished during the '68 Sector Collapse. Raised in state-sponsored facility 88-B. Minimal contact with remaining distant relatives in the outer agricultural zones. Exhibits strong detachment protocols typical of orphans from that era.\n\nNote: Regular remittances sent to an unknown account in Sector 2. Investigate further.",
    },
    vitalRecords: {
      gender: 'femme',
      placeOfBirth: 'INDUSTRIAL SECTOR 4, HAB-BLOCK',
      dateOfBirth: '1942.08.15',
      employerAffiliation: 'CHRONOS SYSTEMS - LOGISTICS',
    },
    notes:
      'Veteran sky-runner and aeromancer with elemental scarification that acts as a conduit for storm magic. Known to weave the wind itself into her spells. Now a legendary figure of the open skies, capable of manipulating the very atmosphere and summoning lightning through her incantations.',
    definition: {
      abilityScoreGeneration: {
        method: 'PointBuy',
        scores: {
          Strength: 12,
          Dexterity: 14,
          Constitution: 13,
          Intelligence: 11,
          Wisdom: 10,
          Charisma: 16,
        },
        magicScores: {
          FORC: 'warm grey flannel',
          FRIC: 'glamorgan sausage',
          SPED: 'pink and sleek',
          MASS: 'deep sea dream',
          BEIN: 'harvest pumpkin',
          CTRL: 'deep blush',
          RSLV: 'peridot',
          WITS: "yoshi's green",
          TUDE: 'highlands moss',
          VIZN: 'portal entrance',
          POST: 'undefined',
          STYL: 'violet indigo',
          KOUD: 'sprout',
          GRIT: 'wet sandstone',
          BYTE: 'prairie sun',
          FLOW: 'clair de lune',
        },
      },
      progression: {
        '1': {
          class: 'Bard',
          choices: [
            {
              type: 'skill_proficiency',
              values: ['Performance', 'Acrobatics', 'Stealth'],
            },
            {
              type: 'subclass',
              value: 'College of Lore',
            },
          ],
        },
        '2': {
          class: 'Sorcerer',
          choices: [
            {
              type: 'subclass',
              value: 'Wild Magic',
            },
            {
              type: 'spell_known',
              value: 'Chaos Bolt',
            },
          ],
        },
        '3': {
          class: 'Sorcerer',
          choices: [
            {
              type: 'spell_known',
              value: 'Chromatic Orb',
            },
          ],
        },
        '4': {
          class: 'Sorcerer',
          choices: [
            {
              type: 'spell_known',
              value: 'Misty Step',
            },
          ],
        },
        '5': {
          class: 'Sorcerer',
          choices: [
            {
              type: 'feat',
              value: 'Warcaster',
            },
            {
              type: 'spell_known',
              value: 'Scorching Ray',
            },
          ],
        },
        '6': {
          class: 'Bard',
        },
        '7': {
          class: 'Bard',
          choices: [
            {
              type: 'expertise',
              values: ['Nature', 'Survival'],
            },
          ],
        },
        '8': {
          class: 'Bard',
          choices: [
            {
              type: 'asi',
              choice: {
                type: 'ASI',
                increases: [{ score: 'Charisma', value: 2 }],
              },
            },
          ],
        },
        '9': {
          class: 'Bard',
        },
        '10': {
          class: 'Bard',
          choices: [
            {
              type: 'magical_secrets',
              values: ['Counterspell', 'Water Walk'],
            },
          ],
        },
        '11': {
          class: 'Bard',
        },
        '12': {
          class: 'Bard',
          choices: [
            {
              type: 'asi',
              choice: {
                type: 'ASI',
                increases: [{ score: 'Charisma', value: 2 }],
              },
            },
          ],
        },
        '13': {
          class: 'Bard',
        },
        '14': {
          class: 'Bard',
          choices: [
            {
              type: 'magical_secrets',
              values: ['Transmute Rock', 'Find Greater Steed'],
            },
            {
              type: 'expertise',
              values: ['Performance', 'Stealth'],
            },
          ],
        },
        '15': {
          class: 'Bard',
        },
        '16': {
          class: 'Bard',
          choices: [
            {
              type: 'asi',
              choice: {
                type: 'ASI',
                increases: [{ score: 'Constitution', value: 2 }],
              },
            },
          ],
        },
        '17': {
          class: 'Bard',
        },
        '18': {
          class: 'Bard',
          choices: [
            {
              type: 'magical_secrets',
              values: ['Heal', 'Whirlwind'],
            },
          ],
        },
        '19': {
          class: 'Bard',
        },
        '20': {
          class: 'Bard',
          choices: [
            {
              type: 'asi',
              choice: {
                type: 'ASI',
                increases: [
                  { score: 'Constitution', value: 1 },
                  { score: 'Dexterity', value: 1 },
                ],
              },
            },
          ],
        },
      },
    },
    proficiencies: {
      skills: [
        {
          name: 'Nature',
          source: 'Background: Outlander',
          modifier: 'expertise',
        },
        {
          name: 'Survival',
          source: 'Background: Outlander',
          modifier: 'expertise',
        },
        {
          name: 'Performance',
          source: 'Class: Bard',
          modifier: 'expertise',
        },
        {
          name: 'Stealth',
          source: 'Class: Bard (Standard Human)',
          modifier: 'expertise',
        },
        {
          name: 'Acrobatics',
          source: 'Class: Bard',
          modifier: 'proficient',
        },
        {
          name: 'Perception',
          source: 'Class: Bard',
          modifier: 'proficient',
        },
      ],
      detailedSkills: [
        {
          isClassSkill: true,
          name: 'Balance',
          keyAbility: 'DEX',
          modifier: 14,
          abilityMod: 2,
          ranks: 10,
          miscMod: 2,
        },
        {
          isClassSkill: true,
          name: 'Barter',
          keyAbility: 'CHA',
          modifier: 8,
          abilityMod: 3,
          ranks: 5,
          miscMod: 0,
        },
        {
          isClassSkill: false,
          name: 'Bluff',
          keyAbility: 'CHA',
          modifier: 8,
          abilityMod: 3,
          ranks: 4,
          miscMod: 1,
        },
        {
          isClassSkill: true,
          name: 'Climb',
          keyAbility: 'STR',
          modifier: 7,
          abilityMod: 1,
          ranks: 8,
          miscMod: -2,
        },
        {
          isClassSkill: true,
          name: 'Concentration',
          keyAbility: 'CON',
          modifier: 17,
          abilityMod: 1,
          ranks: 12,
          miscMod: 4,
        },
        {
          isClassSkill: false,
          name: 'Diplomacy',
          keyAbility: 'CHA',
          modifier: 9,
          abilityMod: 3,
          ranks: 6,
          miscMod: 0,
        },
        {
          isClassSkill: true,
          name: 'Heal',
          keyAbility: 'WIS',
          modifier: 8,
          abilityMod: 0,
          ranks: 5,
          miscMod: 3,
        },
        {
          isClassSkill: false,
          name: 'Intimidate',
          keyAbility: 'CHA',
          modifier: 5,
          abilityMod: 3,
          ranks: 2,
          miscMod: 0,
        },
        {
          isClassSkill: true,
          name: 'Knowledge (Occult)',
          keyAbility: 'INT',
          modifier: 21,
          abilityMod: 1,
          ranks: 15,
          miscMod: 5,
        },
        {
          isClassSkill: true,
          name: 'Listen',
          keyAbility: 'WIS',
          modifier: 10,
          abilityMod: 0,
          ranks: 8,
          miscMod: 2,
        },
        {
          isClassSkill: true,
          name: 'Move Silently',
          keyAbility: 'DEX',
          modifier: 14,
          abilityMod: 2,
          ranks: 12,
          miscMod: 0,
        },
        {
          isClassSkill: false,
          name: 'Ride',
          keyAbility: 'DEX',
          modifier: 5,
          abilityMod: 2,
          ranks: 3,
          miscMod: 0,
        },
        {
          isClassSkill: true,
          name: 'Search',
          keyAbility: 'INT',
          modifier: 13,
          abilityMod: 1,
          ranks: 10,
          miscMod: 2,
        },
        {
          isClassSkill: false,
          name: 'Sense Motive',
          keyAbility: 'WIS',
          modifier: 4,
          abilityMod: 0,
          ranks: 4,
          miscMod: 0,
        },
        {
          isClassSkill: true,
          name: 'Spellcraft',
          keyAbility: 'INT',
          modifier: 18,
          abilityMod: 1,
          ranks: 14,
          miscMod: 3,
        },
        {
          isClassSkill: false,
          name: 'Spot',
          keyAbility: 'WIS',
          modifier: 8,
          abilityMod: 0,
          ranks: 6,
          miscMod: 2,
        },
        {
          isClassSkill: true,
          name: 'Survival',
          keyAbility: 'WIS',
          modifier: 24,
          abilityMod: 0,
          ranks: 18,
          miscMod: 6,
        },
      ],
      saving_throws: ['Dexterity', 'Charisma'],
      armor: ['Light Armor'],
      weapons: [
        'Simple weapons',
        'hand crossbows',
        'longswords',
        'rapiers',
        'shortswords',
      ],
      tools: ["Cartographer's tools", 'Harmonica', 'Pan Flute'],
      languages: ['Common', 'Elvish'],
      loreCards: [
        {
          cardId: 'lore_card_1',
          type: 'EXPERTISE',
          skillName: 'NATURE',
          modifier: '+12 MOD',
          subtitle: 'Atmospheric Pressure & Wind Currents:',
          description:
            'Catharsis understands the complex biological loops and fungal pathways of Bleak Sough like the back of her bark-scarred arm, cataloging silent toxic mists, decay cycles, and predicting localized magical leakages with pristine scientific and arcane accuracy.',
          footer: '[OUTLANDER BONUS] +12 (INT +0, EXPERTISE +12)',
        },
        {
          cardId: 'lore_card_2',
          type: 'EXPERTISE',
          skillName: 'SURVIVAL',
          modifier: '+12 MOD',
          subtitle: 'Navigating Shifting Channels:',
          description:
            'Her 24 years living in the upper atmosphere allows her to track flight paths through ever-changing storm fronts, detect treacherous downdrafts, secure fresh currents, and locate floating sky-islands.',
          footer: '[OUTLANDER BONUS] +12 (WIS +0, EXPERTISE +12)',
        },
        {
          cardId: 'lore_card_3',
          type: 'EXPERTISE',
          skillName: 'PERFORMANCE',
          modifier: '+17 MAX',
          subtitle: 'Storm-Chasing Hymns & Thunder Rhythms:',
          description:
            'Catharsis commands an unmatched acoustic repertoire of traditional folklore and twilight melodies. She uses her disposable cup as a percussion resonator and performs Twilight Requiems to pacify ancient marshlands and focus her wild sorcery.',
          footer: '[BARD COLLEGE] +17 (CHA +5, EXPERTISE +12)',
        },
        {
          cardId: 'lore_card_4',
          type: 'EXPERTISE',
          skillName: 'STEALTH',
          modifier: '+14 MOD',
          subtitle: 'Vanishing into Storm Clouds:',
          description:
            'Deceptively swift, she glides through the air without disturbing the currents, successfully vanishing into thick thunderheads, fog banks, and dense cloud cover.',
          footer: '[BARD TRAINING] +14 (DEX +2, EXPERTISE +12)',
        },
        {
          cardId: 'lore_card_5',
          type: 'PROFICIENT',
          skillName: 'ACROBATICS',
          modifier: '+8 MOD',
          subtitle: 'Marsh-Oak Root Balancing:',
          description:
            'Despite her young age of 24 and lightweight frame, her balance is unparalleled, letting her sprint across unstable riggings, dodge lightning strikes, and traverse high hanging ship masts.',
          footer: '[BARD TRAINING] +8 (DEX +2, PROF +6)',
        },
        {
          cardId: 'lore_card_6',
          type: 'PROFICIENT',
          skillName: 'PERCEPTION',
          modifier: '+6 MOD',
          subtitle: 'Sensing Barometric Pressure & Wind Whispers:',
          description:
            'Her keen amber eyes spot tiny bubbles of escaping gases in mud flats, perceive microscopic changes in humidity, and discern the faintest musical hums from elder wood-spirits miles away.',
          footer: '[BARD TRAINING] +6 (WIS +0, PROF +6)',
        },
      ],
      loreRegisters: {
        savingThrowsHeader: 'DEXTERITY (+8) & CHARISMA (+11)',
        savingThrowsText:
          'Dexterity guards Catharsis against sudden microbursts, wind shear, and hostile sorcery, while her Charisma resists cosmic planar aligning, psychic elementals, and raw storm corruptions.',
        toolsHeader: "HARMONICA, PAN FLUTE, CARTOGRAPHER'S TOOLS",
        toolsText:
          'Features her storm-tuned Windchime for focuses, her silver flute to perform sky-shanties, and mapmaking compasses to draft the shifting cloud charts.',
        languagesHeader: 'AURAN & COMMON (SKY-TRADER DIALECT)',
        languagesText:
          'Speaks standard trade Common seasoned with local marsh guild jargon, alongside ancient Root-Elvish acquired deep within primordial marshcanopies from elder dryads.',
        combatHeader: 'LIGHT ARMOR | SIMPLE, LONGSWORD, RAPIER & CROSSBOWS',
        combatText:
          'Dressed in heavily mud-proof gum waders and protective insulation. Proficient with the Staff of Woodlands (woodlands club), martial rapiers, and quick recurve hand crossbows.',
      },
    },
    spellcasting: {
      sources: [
        {
          source: 'Class: Bard',
          ability: 'Charisma',
          cantrips: [
            'Prestidigitation',
            'Message',
            'Vicious Mockery',
            'Minor Illusion',
          ],
          known_spells: [
            "Tasha's Hideous Laughter",
            'Healing Word',
            'Silence',
            'Hypnotic Pattern',
            'Plant Growth',
            'Freedom of Movement',
            'Greater Restoration',
            "Otto's Irresistible Dance",
            'Forcecage',
            'Glibness',
            'Counterspell',
            'Water Walk',
            'Transmute Rock',
            'Find Greater Steed',
            'Heal',
            'Whirlwind',
          ],
        },
        {
          source: 'Class: Sorcerer (Wild Magic)',
          ability: 'Charisma',
          cantrips: [
            'Fire Bolt',
            'Light',
            'Ray of Frost',
            'Mage Hand',
            'Shape Water',
          ],
          known_spells: [
            'Chaos Bolt',
            'Chromatic Orb',
            'Misty Step',
            'Scorching Ray',
            "Tasha's Mind Whip",
          ],
        },
      ],
    },
    current: {
      xp: 355000,
      currentHp: 162,
      temporaryHp: 0,
      usedHitDice: { d8: 0, d6: 0 },
      deathSaves: { successes: 0, failures: 0 },
      conditions: [],
      exhaustionLevel: 0,
      inspiration: false,
      activeEffects: [],
      usedResources: { 'Sorcery Points': 0, 'Bardic Inspiration (d10)': 0 },
      usedSpellSlots: {
        level_1: 0,
        level_2: 0,
        level_3: 0,
        level_4: 0,
        level_5: 0,
        level_6: 0,
        level_7: 0,
        level_8: 0,
        level_9: 0,
      },
      usedItemCharges: {
        'uuid-item-2': 0,
      },
      inventory: {
        currency: { cp: 0, sp: 0, gp: 14500, pp: 150 },
        items: {
          'uuid-item-1': { item_id: 'staff_of_the_woodlands', quantity: 1 },
          'uuid-item-2': { item_id: 'harmonica', quantity: 1 },
          'uuid-item-3': {
            item_id: 'backpack',
            quantity: 1,
            contents: ['uuid-item-4', 'uuid-item-11'],
          },
          'uuid-item-4': { item_id: 'mess_kit', quantity: 1 },
          'uuid-item-5': { item_id: 'tinderbox', quantity: 1 },
          'uuid-item-6': { item_id: 'hempen_rope', quantity: 1 },
          'uuid-item-7': { item_id: 'travel_clothes', quantity: 1 },
          'uuid-item-8': { item_id: 'waterskin', quantity: 1 },
          'uuid-item-9': { item_id: 'waders', quantity: 1 },
          'uuid-item-10': { item_id: 'cargo_pants', quantity: 1 },
          'uuid-item-11': { item_id: "cartographer's_tools", quantity: 1 },
          'uuid-item-12': { item_id: 'pan_flute', quantity: 1 },
          'uuid-item-13': { item_id: 'cap_with_emblem', quantity: 1 },
          'uuid-item-14': { item_id: 'coffee_cup', quantity: 1 },
          'uuid-item-15': { item_id: 'gloves', quantity: 1 },
          'uuid-item-16': { item_id: 'lanyard_with_pins', quantity: 1 },
          'uuid-item-17': { item_id: 'sky_navigator_compass', quantity: 1 },
          'uuid-item-18': { item_id: 'amulet_of_health', quantity: 1 },
        },
        loadout: {
          worn: ['uuid-item-9', 'uuid-item-10', 'uuid-item-13', 'uuid-item-15'],
          held: { main_hand: 'uuid-item-14', off_hand: 'uuid-item-1' },
          attuned_items: ['uuid-item-1', 'uuid-item-18'],
        },
      },
    },
    capabilities: [
      {
        category: 'HOMELAND',
        skillAffiliation: 'CLIMBING',
        rank: 2,
        effectName: 'CRAG-BORN',
        effectDescription:
          'Ignore penalties for steep terrain; +1d20 on athletic checks in mountains.',
      },
      {
        category: 'ARCHETYPE',
        skillAffiliation: 'MELEE',
        rank: 4,
        effectName: 'NO MERCY',
        effectDescription:
          'Re-roll any 1s on damage dice when wielding two-handed weapons.',
      },
      {
        category: 'NATURE',
        skillAffiliation: 'WILLPOWER',
        rank: 3,
        effectName: 'SAVAGE RESILIENCE',
        effectDescription:
          'Spend 1 Fortune to ignore a non-lethal wound effect for round.',
      },
      {
        category: 'BLOODLINE',
        skillAffiliation: 'AWARENESS',
        rank: 1,
        effectName: 'INSTINCT',
        effectDescription:
          '+1 to initiative. You are never considered surprised in natural wilderness.',
      },
      {
        category: 'EDUCATION',
        skillAffiliation: 'SURVIVAL',
        rank: 2,
        effectName: 'TRACKER',
        effectDescription:
          'Identify species and number of tracks with a simple success.',
      },
      {
        category: 'CASTE',
        skillAffiliation: 'ANIMAL HANDLING',
        rank: 1,
        effectName: 'HERDER',
        effectDescription:
          'Gain an advantage when interacting with or calming domesticated beasts.',
      },
      {
        category: 'WAR STORY',
        skillAffiliation: 'MELEE',
        rank: 1,
        effectName: 'BATTLE OF VENARIUM',
        effectDescription:
          '+1 Focus and +1 Expertise to Melee checks when outnumbered.',
      },
    ],
    registries: [
      {
        nodeId: 'REGISTRY_NODE_01',
        title: 'CONTACTS',
        items: [
          {
            title: 'ELDER CORVID OF BLEAK SOUGH',
            description:
              'A grizzled, semi-feral raven informant who exchanges whispered secrets of the shifting mire pathways for dried silver-perch eyes.',
          },
          {
            title: 'THE MIRE-DWELLERS ROVER CARAVAN',
            description:
              'A nomadic guild of sky-runners and traders who help Catharsis smuggle rare aeromancy texts, medicinal herbs, and insulated gear.',
          },
          {
            title: 'OAKHAVEN FRONTIER OUTPOST WARDEN',
            description:
              "An old ranger colleague of Catharsis's who secretly leaves caches of rations, hand crossbow bolts, and fresh coffee beans near the western marsh boundaries.",
          },
          {
            title: 'SKY-SMUGGLER RINGS',
            description:
              'A shady underground network that supplies Catharsis with rare spell scroll fragments and wild magic focal stones.',
          },
        ],
      },
      {
        nodeId: 'REGISTRY_NODE_02',
        title: 'FRACTIONS',
        items: [
          {
            title: 'THE THIRD AUTHORITY',
            description:
              'A deeply secretive and enigmatic governing council that monitors continental magical balance and tracks planar anomalies across the Bleak Sough.',
          },
          {
            title: 'THE WIND-WEAVERS GUILD',
            description:
              'An eccentric cabal of local sky cartographers and aeromancers who study wind currents and draft private topographical charts.',
          },
          {
            title: 'THE CRIMSON CANOPY RANGERS',
            description:
              'A small, informal band of veteran forest-wanderers and archers who assist Catharsis in tracking hostile feral beast spawns.',
          },
          {
            title: 'THE OAKHAVEN BOTANICAL CONSERVATORY',
            description:
              "An aviation circle that occasionally funds Catharsis's expeditions in exchange for wind current mapping.",
          },
        ],
      },
      {
        nodeId: 'REGISTRY_NODE_03',
        title: 'DESIRES',
        items: [
          {
            title: 'STABILIZING THE BLEAK SOUGH CORE',
            description:
              'To isolate and permanently secure the volatile magical leakages in the central maelstrom before they corrupt sky spirits.',
          },
          {
            title: 'DECIPHERING THE LEFT ARM SCARIFICATION',
            description:
              'To translate the ever-shifting atmospheric pressure drops and weather patterns into a new form of aeromancy.',
          },
          {
            title: 'COMPILING THE CLOUD ATLAS',
            description:
              'A lifetime physical mapping project recording every active sulfur vent, dryad hollow, and safe pathway in the marsh.',
          },
          {
            title: 'MENTORING THE NEXT FLIGHT GENERATION',
            description:
              'To pass on her old-school folklore and navigation techniques to keep future pathfinders alive in the shifting mires.',
          },
        ],
      },
      {
        nodeId: 'REGISTRY_NODE_04',
        title: 'SACRIFICES',
        items: [
          {
            title: "LEFT ARM'S FLESH & SENSATION",
            description:
              'Permanently charred, bark-hardened, and infused with raw wild magic conducting paths during her ascension event, rendering it numb to normal touch.',
          },
          {
            title: 'TRANQUIL AND SAFE RETIREMENT',
            description:
              'Gave up a stable, grounded life and inheritance to pursue the endless, chaotic freedom of the open sky.',
          },
          {
            title: 'HER HANDCRAFTED SILVER HARMONICA',
            description:
              'Lost to the depths of an acidic sulfur geyser while desperately pacifying a maddened elder marsh elemental.',
          },
          {
            title: 'METROPOLITAN REPUTATION & STATUS',
            description:
              "Severed prestigious connections to academic guilds to protect the secret locations of Bleak Sough's mystical resources.",
          },
        ],
      },
      {
        nodeId: 'REGISTRY_NODE_05',
        title: 'ATONEMENTS',
        items: [
          {
            title: 'DUSK "REQUIEM OF THE SKY" PERFORMANCE',
            description:
              'Playing hauntingly beautiful harmonica melodies at sunset to quiet the restless spirits of wood-rot and decay.',
          },
          {
            title: 'TENDING DISPLACED DRYAD SAPLINGS',
            description:
              'Carefully nurturing and warding young storm elementals away from corrupted thunderheads.',
          },
          {
            title: 'FREE SAFE PASSAGE & HEALING SALVES',
            description:
              'Guiding lost outcasts and healing wounded marsh travelers with homemade herbal remedies without asking for coin.',
          },
          {
            title: 'RAVEN OFFERINGS AT THE ELDER OAK',
            description:
              "Leaving daily offerings of fresh beetles and polished pebbles at the hollow oak to maintain the ravens' loyalty and favor.",
          },
        ],
      },
    ],
    arsenal: {
      weapons: [
        {
          weaponId: 'uuid-weapon-e5491f28-c1fa-4043-9ba8-4ae71bf2c6d4',
          name: 'Staff of the Woodlands',
          atkBonus: '+8',
          damage: '1d6 + 5 (bludgeoning)',
          critical: '20 / x2',
          range: 'Melee',
          weight: '4 lbs',
          type: 'Bludgeoning / Magic',
          size: 'Medium',
          specialProperties:
            'Acts as a +2 quarterstaff. Casts plant/animal spells.',
          narrativeLore:
            'Carved from a living branch of the oldest oak in the heartwood bogs, it hums with deep nature energies.',
        },
        {
          weaponId: 'uuid-weapon-fa901ba3-548c-47b6-be7f-ae6d43e5c709',
          name: 'Martial Rapier',
          atkBonus: '+7',
          damage: '1d8 + 4 (piercing)',
          critical: '18-20 / x2',
          range: 'Melee',
          weight: '2 lbs',
          type: 'Finesse / Piercing',
          size: 'Medium',
          specialProperties:
            'Finesse, light weapon, deals swift piercing punctures.',
          narrativeLore:
            'A polished steel blade carrying the mark of the old duchy, found half-buried in a sunken boat.',
        },
        {
          weaponId: 'uuid-weapon-cb9c0a4e-128c-4b13-98fe-fd892cccdb1e',
          name: 'Recurve Hand Crossbow',
          atkBonus: '+7',
          damage: '1d6 + 4 (piercing)',
          critical: '19-20 / x2',
          range: '30 / 120',
          weight: '3 lbs',
          type: 'Ranged / Piercing',
          size: 'Small',
          specialProperties:
            'Light weapon, loading. Enables bonus action shots with crossbow expert.',
          narrativeLore:
            'Custom fitted with oil-rubbed gears to silence the string tension during marsh infiltration.',
        },
      ],
      ammunition: [
        {
          ammoId: 'uuid-ammo-bc8e2dfa-19cb-48ad-b9fc-34cf81bc89a7',
          label: 'uuid-ammo-bc8e2dfa-19cb-48ad-b9fc-34cf81bc89a7',
          capacity: 20,
          currentCount: 20,
          lines: [
            '20x Static-charged Bolts',
            '15x Standard Iron Bolts',
            'Empty extra pouch',
          ],
        },
        {
          ammoId: 'uuid-ammo-fe6e1cdb-ba8c-4cf2-ae9a-5b682cd127bc',
          label: 'uuid-ammo-fe6e1cdb-ba8c-4cf2-ae9a-5b682cd127bc',
          capacity: 20,
          currentCount: 9,
          lines: [
            '5x Serpentine Sleep Darts',
            '3x Sparkstone Explosive Flasks',
            '1x Glow-lichen signal flare',
          ],
        },
      ],
    },
    outfitting: [
      {
        pieceId: 'uuid-outfitting-af9e87dc-4cb4-4cd5-aabc-ca78d2235cba',
        name: 'Mud-proof Gum Waders',
        location: 'Legs',
        type: 'Plated Boots / Heavy',
        equipBonus: '+4 AC',
        isProficient: true,
        penalty: 'None',
        weight: '6 lbs',
        speed: 'No penalty',
        size: 'Medium',
        maxDex: '+4 Dex',
        specialProperties:
          'Provides advantage on saving throws to resist lightning & wind traps.',
        narrativeLore:
          'Crafted by the master weaver at the edge of the Stratosphere, these boots have walked through hurricane-force winds without a single tear.',
      },
      {
        pieceId: 'uuid-outfitting-8df34ea2-127c-4ab2-96db-cbcfd468be7c',
        name: 'Leather Jerkin',
        location: 'Torso',
        type: 'Light Armor',
        equipBonus: '+8 AC',
        isProficient: true,
        penalty: 'None',
        weight: '4 lbs',
        speed: 'No penalty',
        size: 'Medium',
        maxDex: 'No Max',
        specialProperties: 'Standard padded leather, supple and water-treated.',
        narrativeLore:
          'Softened by years of marsh mist and rain, it provides quiet mobility at the cost of heavier protection.',
      },
      {
        pieceId: 'uuid-outfitting-f12b7da4-ea9c-4be5-bc32-1fb809477a3d',
        name: 'Faded Olive Scarf',
        location: 'Neck',
        type: 'Fabric Accessory',
        equipBonus: '+0 AC',
        isProficient: true,
        penalty: 'None',
        weight: '0.5 lbs',
        speed: 'No penalty',
        size: 'Medium',
        maxDex: 'No Max',
        specialProperties:
          'Warm marsh wool. Offers zero armor but prevents spore inhalation from corrupt weeds.',
        narrativeLore:
          'A knitted wool accessory gifted by an old friend, still smelling faintly of dried heather and pine needle smudge.',
      },
      {
        pieceId: 'uuid-outfitting-9c7de4ba-ab54-47fe-bbba-cbf892d1c1a2',
        name: 'Broad-brimmed Oilskin Hat',
        location: 'Head',
        type: 'Headwear',
        equipBonus: '+0 AC',
        isProficient: true,
        penalty: 'None',
        weight: '1 lb',
        speed: 'No penalty',
        size: 'Medium',
        maxDex: 'No Max',
        specialProperties:
          'Water-resistant oilskin. Shields eyes from acidic rain & provides camo in bogs.',
        narrativeLore:
          "The wide brim lets rainwater trickle away from the wearer's neck, an invaluable asset under eternal stormy skies.",
      },
    ],
    psychology: {
      diagnostics: {
        insanity: 6,
        corruption: 4,
        synchronicity: 8,
        inspiration: 5,
      },
      supplies: {
        waterWine: 3,
        rations: 5,
        feed: 0,
        stabilizers: 2,
        bioOil: 4,
        weldingSlag: 0,
      },
      manifestations: '',
      operativeNotes: {
        column1:
          'Subject exhibits unusually high base Essence generation parameters, likely linked to the traumatic awakening incident recorded in File #77-A. Diagnostic scans indicate volatile fluctuations during stress events, suggesting the "Nightmares" drawback is a physiological manifestation of excess unstructured magical energy bleeding into the subconscious.',
        column2:
          "Recommend continued observation. Subject's mastery over Occult Knowledge is advancing at an accelerated rate, far outpacing standard training protocols. The current Channeling Level of 4 is borderline unstable for an operative with only 450 total logged field hours. Ensure standard suppression gear is maintained and audited weekly.",
      },
      actions: [
        { actionId: 'ACT_1', name: 'Aim', type: 'Half' },
        { actionId: 'ACT_2', name: 'Cast', type: 'Varies' },
        { actionId: 'ACT_3', name: 'Charge', type: 'Full' },
        { actionId: 'ACT_4', name: 'Move', type: 'Half' },
        { actionId: 'ACT_5', name: 'Standard Attack', type: 'Half' },
      ],
    },
  },
];
