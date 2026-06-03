import type { Character } from './types';

export const OFFICIAL_CONAN: Character = {
  id: 'CIMMERIAN_001',
  name: 'CONAN',
  expTotal: 12450,
  expSpent: 11200,
  ageAndGender: '27 / MALE',
  caste: 'WARRIOR-HERDMAN',
  archetype: 'BARBARIAN SLAYER',
  education: 'SURVIVAL OF THE FITTEST',
  homeland: 'CIMMERIA',
  languages: 'CIMMERIAN, AQUILONIAN',
  appearance:
    'Massive shoulders, bronzed skin, and piercing blue eyes. A volatile mix of savage fury and cold calculation. Driven by an iron will and an insatiable wanderlust.',
  warStory:
    'The Battle of Venarium. Stood amidst the ruins as a youth, witnessing the fall of the Aquilonian outpost and the triumph of the Cimmerian tribes.',
  quote:
    'Sullen-eyed, sword in hand, a thief, a slayer, with gigantic melancholies and gigantic mirth, to tread the jeweled thrones of the Earth under his sandalled feet.',
  fortuneCurrent: 3,
  fortuneMax: 5,
  renown: 82,
  standing: 14,
  fatigue: '--',
  portraitUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA3yykfhg1I8jYKlwrszdRaNJfn-AWmdV0qsW2XWYAzbcEB5H1ewquaZASlhuTdDogaVQ7mHcqt6n17uLM4WBGc6k9ykmFMJwV5vcmmHuzVxsFzrMf11-dt70ezSFcugOR07oHbIkgHzEeC9hKgoCWG-wQcK6ATnrv_Pv5eZ_VcpqgB5FRiqt6Cft_efFRzwDoqt5dKZ7tZ-nbcJPs_AUvyocOZsGyvFRGJL4v_quAZiyiIPsRa_FV0FDzDSdFfEqmT0dZIfIVNqGiz',
  bannerUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBj44uM3QGU_BvhOcmnT8JQwl80xL5t1GIlxdhE7gRDF5Ap8_6iXIYars2v67dQlL-AsNt6V8ErQhcJDRRc5d-5tw6W0irU-1SdedNeEuLqzwfGyVyw0O-dpmqEWHZ6tzd1u6U5U2bCBDgOrdo0oIMHW4GFBISiwtTZ7zmkDCWhtFkYiaV47FCfKVvjtZMRjIFjt4zSNMvbEtzrga84itDh5ndAh-cxEaH_nkXCPWiMnRW7bs4zAIycX6ZGxos6Aq0w_6c3WZ612b9C',
  talents: [
    {
      id: 't1',
      category: 'HOMELAND',
      skillAffiliation: 'CLIMBING',
      rank: 2,
      effect:
        'CRAG-BORN: Ignore penalties for steep terrain; +1d20 on athletic checks in mountains.',
    },
    {
      id: 't2',
      category: 'ARCHETYPE',
      skillAffiliation: 'MELEE',
      rank: 4,
      effect:
        'NO MERCY: Re-roll any 1s on damage dice when wielding two-handed weapons.',
    },
    {
      id: 't3',
      category: 'NATURE',
      skillAffiliation: 'WILLPOWER',
      rank: 3,
      effect:
        'SAVAGE RESILIENCE: Spend 1 Fortune to ignore a non-lethal wound effect for  round.',
    },
    {
      id: 't4',
      category: 'BLOODLINE',
      skillAffiliation: 'AWARENESS',
      rank: 1,
      effect:
        'INSTINCT: +1 to initiative. You are never considered surprised in natural wilderness.',
    },
    {
      id: 't5',
      category: 'EDUCATION',
      skillAffiliation: 'SURVIVAL',
      rank: 2,
      effect:
        'TRACKER: Identify species and number of tracks with a simple success.',
    },
    {
      id: 't6',
      category: 'CASTE',
      skillAffiliation: 'ANIMAL HANDLING',
      rank: 1,
      effect:
        'HERDER: Gain an advantage when interacting with or calming domesticated beasts.',
    },
    {
      id: 't7',
      category: 'WAR STORY',
      skillAffiliation: 'MELEE',
      rank: 1,
      effect:
        'BATTLE OF VENARIUM: +1 Focus and +1 Expertise to Melee checks when outnumbered.',
    },
  ],
};

export const PRESET_CHARACTERS: Character[] = [
  OFFICIAL_CONAN,
  {
    id: 'AQUILONIAN_002',
    name: 'VALERIA',
    expTotal: 9600,
    expSpent: 9100,
    ageAndGender: '24 / FEMALE',
    caste: 'MERCENARY CAPTAIN',
    archetype: 'SWORDMASTER',
    education: 'BROTHERHOOD OF THE SWORD',
    homeland: 'AQUILONIA',
    languages: 'AQUILONIAN, ARGOSSEAN',
    appearance:
      'Tall, athletic, with close-cut blonde hair and fierce yellow-grey eyes. Clad in steel scale mail, swift on her feet and merciless with a cutlass.',
    warStory:
      'The Red Brotherhood skulduggery. Commanded several corsair raids off the southern coast, outsmarted the Stygian navy blockades.',
    quote:
      'I am Valeria of the Red Brotherhood. I do not bargain with jackals in silk.',
    fortuneCurrent: 4,
    fortuneMax: 5,
    renown: 68,
    standing: 22,
    fatigue: '1',
    portraitUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bannerUrl:
      'https://images.unsplash.com/photo-1519074069444-1ba4e5663aa4?auto=format&fit=crop&q=80&w=1200',
    talents: [
      {
        id: 'val_t1',
        category: 'HOMELAND',
        skillAffiliation: 'ATHLETICS',
        rank: 3,
        effect:
          'SWIFT FOOTED: When taking a dash action, ignore heavy armour movement penalties completely.',
      },
      {
        id: 'val_t2',
        category: 'ARCHETYPE',
        skillAffiliation: 'PARRY',
        rank: 4,
        effect:
          'RIPOSTE: Upon a successful parry against a melee hit, immediately strike back with +1 bonus damage.',
      },
      {
        id: 'val_t3',
        category: 'NATURE',
        skillAffiliation: 'PERSUADE',
        rank: 2,
        effect:
          'COMMANDING SNEER: Terrify minions into submission or force them to hesitate for one beat.',
      },
      {
        id: 'val_t4',
        category: 'BLOODLINE',
        skillAffiliation: 'INSIGHT',
        rank: 2,
        effect:
          'DANGER SENSE: Re-roll warning ticks on ambush counts when sailing or near water bodies.',
      },
    ],
  },
  {
    id: 'HYRKANIAN_003',
    name: 'SUBOTAI',
    expTotal: 10500,
    expSpent: 10200,
    ageAndGender: '29 / MALE',
    caste: 'ARCHER-NOMAD',
    archetype: 'HYRKANIAN RIDER',
    education: 'DESERT NOMAD TRIBE',
    homeland: 'HYRKANIA',
    languages: 'HYRKANIAN, SHEMITISH, ZAMORIAN',
    appearance:
      'Lean, muscular, hawk-faced nomad with dark braided hair and weathered mahogany skin. Never seen without his composite horn-bow.',
    warStory:
      "The Great Steppe War. Rode with five hundred horse archers against the Turanian empire's cavalry columns, surviving three lethal arrow wounds.",
    quote:
      'I am a thief and an archer. My god is Erlik, the Lord of the Underworld, who welcomes our foes.',
    fortuneCurrent: 2,
    fortuneMax: 5,
    renown: 75,
    standing: 10,
    fatigue: '--',
    portraitUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bannerUrl:
      'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=1200',
    talents: [
      {
        id: 'sub_t1',
        category: 'HOMELAND',
        skillAffiliation: 'RIDING',
        rank: 4,
        effect:
          'SADDLE-BORN: Avoid any disadvantage checks on horse or camelback. Able to shoot bow in any angle.',
      },
      {
        id: 'sub_t2',
        category: 'ARCHETYPE',
        skillAffiliation: 'RANGED_WEAPONS',
        rank: 4,
        effect:
          'STEEL RAIN: Spend 1 Fortune point to fire two arrows simultaneously at different targets within range.',
      },
      {
        id: 'sub_t3',
        category: 'NATURE',
        skillAffiliation: 'STEALTH',
        rank: 3,
        effect:
          'SHADOW STEPS: When traversing sandy or arid soil, leave absolutely zero tracking outline behind.',
      },
      {
        id: 'sub_t4',
        category: 'EDUCATION',
        skillAffiliation: 'SURVIVAL',
        rank: 3,
        effect:
          'WATER-FINDER: Sense the nearest active underground oasis or fresh water supply up to 3 leagues away.',
      },
    ],
  },
];

export const TALENTS_TEMPLATES = [
  {
    category: 'HOMELAND',
    skillAffiliation: 'CLIMBING',
    effect:
      'CRAG-BORN: Ignore penalties for steep terrain; +1d20 on athletic checks in mountains.',
  },
  {
    category: 'ARCHETYPE',
    skillAffiliation: 'MELEE',
    effect:
      'NO MERCY: Re-roll any 1s on damage dice when wielding two-handed weapons.',
  },
  {
    category: 'NATURE',
    skillAffiliation: 'WILLPOWER',
    effect:
      'SAVAGE RESILIENCE: Spend 1 Fortune to ignore a non-lethal wound effect for 1 round.',
  },
  {
    category: 'BLOODLINE',
    skillAffiliation: 'AWARENESS',
    effect:
      'INSTINCT: +1 to initiative. You are never considered surprised in natural wilderness.',
  },
  {
    category: 'EDUCATION',
    skillAffiliation: 'SURVIVAL',
    effect:
      'TRACKER: Identify species and number of tracks with a simple success.',
  },
  {
    category: 'CASTE',
    skillAffiliation: 'ANIMAL HANDLING',
    effect:
      'HERDER: Gain an advantage when interacting with or calming domesticated beasts.',
  },
  {
    category: 'WAR STORY',
    skillAffiliation: 'MELEE',
    effect:
      'BATTLE OF VENARIUM: +1 Focus and +1 Expertise to Melee checks when outnumbered.',
  },
  {
    category: 'HOMELAND',
    skillAffiliation: 'SWIMMING',
    effect:
      'AMPHIBIAN: Double breath duration; half damage penalty under water.',
  },
  {
    category: 'ARCHETYPE',
    skillAffiliation: 'STEALTH',
    effect: 'AMBUSH MASTER: +2d20 on combat sneak rounds inside structures.',
  },
  {
    category: 'NATURE',
    skillAffiliation: 'RESISTANCE',
    effect:
      'POISON IMMUNITY: Roll with advantage when resisting venom or spoiled meat.',
  },
  {
    category: 'BLOODLINE',
    skillAffiliation: 'SORCERY',
    effect:
      'ELD_SIGHT: Perceive supernatural aura and demonic links on contact.',
  },
  {
    category: 'EDUCATION',
    skillAffiliation: 'MEDICINE',
    effect:
      'FIELD BINDING: Heal up to 4 life points using local weeds and linen.',
  },
];

export const CASTES = [
  'WARRIOR-HERDMAN',
  'MERCENARY CAPTAIN',
  'DESERT NOMAD TRIBE',
  'ZAMORIAN THIEF',
  'STYGIAN ACOLYTE',
  'NORDHEIMER RAIDER',
  'BOSSONIAN ARCHER',
];

export const HOMELANDS = [
  'CIMMERIA',
  'AQUILONIA',
  'HYRKANIA',
  'ZAMORA',
  'STYGIA',
  'NORDHEIM',
  'KHITAI',
  'SOPHENE',
];

export const ARCHETYPES = [
  'BARBARIAN SLAYER',
  'SWORDMASTER',
  'SCOUT-ASSASSIN',
  'WITCH FINDER',
  'PIRATE REAVER',
  'SORCERER SPECTRE',
];
