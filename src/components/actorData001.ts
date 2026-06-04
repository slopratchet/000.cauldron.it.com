export const characterData001 = {
  meta: {
    character_id: 'uuid-09a8f2b7-846c-4b51-935f-359f63569720',
    user_id: 'owner-uuid-456',
    schemaVersion: '5.1',
    active_sources: ['SRD', 'PHB2024'],
    createdAt: '2024-03-19T10:00:00Z',
    updatedAt: '2026-03-19T14:30:00Z',
  },
  identity: {
    name: 'Curtis Burtus',
    alignment: 'Lawful Neutral',
    background: 'Criminal',
    species: 'Goblin',
  },
  description: {
    age: 24,
    height: '3\' 2"',
    weight: '45 lbs',
    eyes: 'Beady Black',
    skin: 'Warty Green',
    hair: 'Patchy black tufts',
  },
  personality: {
    traits:
      "A jittery and paranoid survivor who is always looking over his shoulder. Curtis is obsessed with shiny objects, especially buttons and small coins, which he hoards obsessively. Despite his anxious demeanor, he's surprisingly cunning and can talk his way out of (or into) almost any situation.",
    ideals:
      'Survival. In a world that wants to squish you, staying alive is the ultimate victory. (Any)',
    bonds:
      "I owe a life debt to a massive, dim-witted troll named 'Tiny' who once saved me from a pack of wild dogs. I ride on his shoulders when my short legs get tired.",
    flaws:
      'I am a compulsive liar, even when the truth would serve me better. Also, I have a tendency to bite things (and people) when I panic.',
  },
  notes:
    "A self-taught rogue who learned the harsh realities of street life early on. Known for his uncanny ability to slip through the tightest of security and his bizarre fascination with discarded brass buttons. He carries a rusty spoon that he claims is a 'lucky artifact of immense power' (it's not). He frequently talks to himself (or perhaps an unseen imaginary friend named 'Squeaks') when stressed.",
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
    },
    levelProgression: {
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
        choices: [
          {
            type: 'class_feature',
            value:
              'Countercharm (Vocal harmonies shield allies from fear/charm)',
          },
          {
            type: 'subclass_feature',
            value:
              'Additional Magical Secrets (Learned 2 extra spells from any class list)',
          },
        ],
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
        choices: [
          {
            type: 'class_feature',
            value:
              'Song of Rest (d8) (Siltlands melodies soothe resting allies, extra d8 HP recovery)',
          },
        ],
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
        choices: [
          {
            type: 'class_feature',
            value:
              'Song of Rest (d10) & 6th-Level Spell Access (unlocked supreme space manipulation slots)',
          },
        ],
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
        choices: [
          {
            type: 'class_feature',
            value:
              'Song of Rest (d12) & 7th-Level Spell Access (unlocked ancient forcefields and teleport magic)',
          },
        ],
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
        choices: [
          {
            type: 'class_feature',
            value:
              'Bardic Inspiration Die upgrade (d12) (Inspiring hums now hold ultimate cosmic resonance)',
          },
        ],
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
        choices: [
          {
            type: 'class_feature',
            value:
              '9th-Level Spell Access (the crowning heights of reality-warping bardic songs)',
          },
        ],
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
        choices: [
          {
            type: 'class_feature',
            value:
              'Subtle Muse (gain 1 Bardic Inspiration use if none left when initiative is rolled)',
          },
        ],
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
        name: 'Acrobatics',
        source: 'Background: Criminal',
        modifier: 'proficient',
      },
      {
        name: 'Stealth',
        source: 'Class: Rogue',
        modifier: 'expertise',
      },
      {
        name: 'Sleight of Hand',
        source: 'Class: Rogue',
        modifier: 'expertise',
      },
      {
        name: 'Deception',
        source: 'Class: Rogue',
        modifier: 'proficient',
      },
      {
        name: 'Perception',
        source: 'Class: Rogue',
        modifier: 'proficient',
      },
      {
        name: 'Survival',
        source: 'Species: Goblin',
        modifier: 'proficient',
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
  currentState: {
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
        'uuid-item-1': { item_id: 'rusty_spoon', quantity: 1 },
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
        'uuid-item-9': { item_id: 'oversized_boots', quantity: 1 },
        'uuid-item-10': { item_id: 'cargo_pants', quantity: 1 },
        'uuid-item-11': { item_id: "cartographer's_tools", quantity: 1 },
        'uuid-item-12': { item_id: 'pan_flute', quantity: 1 },
        'uuid-item-13': { item_id: 'button_collection_pouch', quantity: 1 },
        'uuid-item-14': { item_id: 'coffee_cup', quantity: 1 },
        'uuid-item-15': { item_id: 'gloves', quantity: 1 },
        'uuid-item-16': { item_id: 'lanyard_with_pins', quantity: 1 },
        'uuid-item-17': { item_id: 'swamp_navigator_watch', quantity: 1 },
        'uuid-item-18': { item_id: 'shiny_brass_button_amulet', quantity: 1 },
      },
      loadout: {
        worn: ['uuid-item-9', 'uuid-item-10', 'uuid-item-13', 'uuid-item-15'],
        held: { main_hand: 'uuid-item-14', off_hand: 'uuid-item-1' },
        attuned_items: ['uuid-item-1', 'uuid-item-18'],
      },
    },
  },
};
