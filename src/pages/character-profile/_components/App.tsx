import React from 'react';
import { characterData } from './data';
import {
  Dices,
  RefreshCw,
  Plus,
  Trash2,
  ShieldAlert,
  Database,
  Info,
  Copy,
  Check,
  Save,
  RotateCcw,
} from 'lucide-react';

const LabeledBlock = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col border-b-[2px] border-dashed border-black py-2">
    <span className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] text-black">
      {label}
    </span>
    <span className="font-tinos text-[18px] leading-[24px] text-black mt-1">
      {value}
    </span>
  </div>
);

const StatBlock = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
  key?: React.Key;
}) => (
  <div className="brutalist-border p-2 text-center flex flex-col items-center justify-center bg-white h-full">
    <p className="font-jetbrains text-[12px] leading-[16px] tracking-[0.1em] font-bold uppercase text-black">
      {label}
    </p>
    <p className="font-anton text-[36px] leading-[40px] mt-2 text-black">
      {value}
    </p>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="font-anton text-[36px] md:text-[48px] leading-tight tracking-[0.01em] uppercase mb-6 border-b-[4px] border-black pb-2 text-black">
    {title}
  </h2>
);

const SPELL_DETAILS: Record<string, { level: string; desc: string }> = {
  // Cantrips
  Prestidigitation: {
    level: 'Cantrip',
    desc: 'Perform minor sensory effects, snuff out candles, warm/chill food, or soil/clean objects.',
  },
  Message: {
    level: 'Cantrip',
    desc: 'Whisper a message to a creature within 120ft; they hear it in their head and can whisper a response.',
  },
  'Vicious Mockery': {
    level: 'Cantrip',
    desc: 'Insults laced with enchantments causing 4d4 psychic damage and disadvantage on next attack.',
  },
  'Minor Illusion': {
    level: 'Cantrip',
    desc: 'Create a 5ft-cube sound or silent image within 30 feet that lasts for up to 1 minute.',
  },

  // Known Spells
  "Tasha's Hideous Laughter": {
    level: '1st Lvl',
    desc: 'Forces a target prone, rendering them incapacitated with fits of laughter on failed Wis save.',
  },
  'Healing Word': {
    level: '1st Lvl',
    desc: 'Swift mud-scented comfort restoring 1d4 + Charisma modifier HP to a creature within 60ft.',
  },
  Silence: {
    level: '2nd Lvl',
    desc: 'Creates a 20ft sphere of absolute quiet, completely negating any sound or verbal spell components.',
  },
  'Hypnotic Pattern': {
    level: '3rd Lvl',
    desc: 'Conjures a shifting pattern of silent lights that charms and incapacitates onlookers in a 30ft cube.',
  },
  'Plant Growth': {
    level: '3rd Lvl',
    desc: 'Enriches all plants in half-mile radius, or creates thick thorns that make terrain difficult.',
  },
  'Freedom of Movement': {
    level: '4th Lvl',
    desc: 'Target ignores swamp peat, difficult terrain, paralysis, or magical restraints.',
  },
  'Greater Restoration': {
    level: '5th Lvl',
    desc: 'Curative energies remove curses, petrification, ability score reductions, or de-buffs.',
  },
  "Otto's Irresistible Dance": {
    level: '6th Lvl',
    desc: 'Forces a target into a frantic, comic jig, reducing speed to 0 and giving attackers advantage.',
  },
  Forcecage: {
    level: '7th Lvl',
    desc: 'Traps a target inside an unbreakable, invisible, 20-foot cube cage of physical force.',
  },
  Glibness: {
    level: '8th Lvl',
    desc: 'Elevates conversational charm to divine heights; any Charisma roll of 14 or lower becomes a 15.',
  },
  Counterspell: {
    level: '3rd Lvl',
    desc: 'Instantly interrupts a hostile spellcaster within 60 feet, unraveling their arcane formula.',
  },
  'Water Walk': {
    level: '3rd Lvl',
    desc: 'Allows up to 10 targets to traverse liquid silt, boiling peat, or sulfur swamps as solid ground.',
  },
  'Transmute Rock': {
    level: '5th Lvl',
    desc: 'Transforms solid stone into dense mud to trap foes, or hardens mud flats into solid shale.',
  },
  'Find Greater Steed': {
    level: '4th Lvl',
    desc: 'Conjures a loyal, celestial mount (such as a giant corvid or swamp gryphon) with telepathic bonds.',
  },
  Heal: {
    level: '6th Lvl',
    desc: 'Channels massive positive energy to restore 70 HP and instantly cure blindness, deafness, and all diseases.',
  },
  Whirlwind: {
    level: '7th Lvl',
    desc: 'Summons a violent 10ft-wide, 30ft-tall vortex of howling peat wind and silt to batter enemies.',
  },
};

const DossierBlock = ({
  num,
  label,
  value,
  onChange,
}: {
  num: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [tempVal, setTempVal] = React.useState(value);

  const handleSave = () => {
    onChange(tempVal);
    setIsEditing(false);
  };

  return (
    <div className="brutalist-border-thick bg-white p-6 relative flex flex-col md:flex-row gap-6 hover:bg-[#FAF8F5] transition-all duration-150 brutalist-shadow mb-6 group">
      <div className="md:w-1/4 border-r-0 md:border-r-[3px] border-black pb-4 md:pb-0 pr-0 md:pr-6 flex flex-col justify-between">
        <div>
          <span className="font-jetbrains text-[10px] uppercase tracking-widest text-[#666666] block mb-1">
            REGISTRY_NODE_{num}
          </span>
          <h3 className="font-anton text-[26px] uppercase text-black leading-none">
            {label}
          </h3>
        </div>
        <div className="flex gap-2 items-center mt-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="font-jetbrains text-[11px] text-[#E6E2D8] bg-black px-3 py-1 uppercase font-bold tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              [ SAVE ]
            </button>
          ) : (
            <button
              onClick={() => {
                setTempVal(value);
                setIsEditing(true);
              }}
              className="font-jetbrains text-[11px] text-black bg-transparent border border-black px-3 py-1 uppercase font-bold tracking-wider hover:bg-black hover:text-[#E6E2D8] transition-all opacity-70 group-hover:opacity-100 cursor-pointer"
            >
              [ MODIFY ]
            </button>
          )}
        </div>
      </div>
      <div className="md:w-3/4 flex flex-col justify-center text-black">
        {isEditing ? (
          <textarea
            value={tempVal}
            onChange={(e) => setTempVal(e.target.value)}
            className="w-full min-h-[140px] p-3 border-2 border-black font-tinos text-[18px] bg-[#FAF8F5] focus:outline-none focus:ring-0 leading-relaxed text-black"
            autoFocus
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 w-full">
            {value
              .split('\n')
              .map((line) => line.trim())
              .filter((line) => line.length > 0)
              .map((item, idx) => {
                const cleanText = item.replace(/^[•\-\*\s]+/, '').trim();
                if (!cleanText) return null;

                const delimiterMatch = cleanText.match(
                  /^(.*?)(\s+—\s+|\s+-\s+|:\s+)(.*)$/,
                );
                let title = '';
                let desc = cleanText;
                if (delimiterMatch) {
                  title = delimiterMatch[1];
                  desc = delimiterMatch[3];
                }

                return (
                  <div
                    key={idx}
                    className="brutalist-border bg-[#F5F2EB] p-4 flex flex-col hover:bg-white hover:border-black transition-all duration-150 brutalist-shadow-sm"
                  >
                    {title ? (
                      <div>
                        <h4 className="font-anton text-[18px] uppercase text-black leading-tight mb-2 pb-0.5 border-b border-lightgray">
                          {title}
                        </h4>
                        <p className="font-tinos text-[15px] leading-relaxed text-neutral-800">
                          {desc}
                        </p>
                      </div>
                    ) : (
                      <p className="font-tinos text-[15px] leading-relaxed text-neutral-800">
                        {cleanText}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

const TALENTS_DATA = [
  {
    category: 'HOMELAND',
    skill: 'CLIMBING',
    rank: 2,
    effect:
      'CRAG-BORN: Ignore penalties for steep terrain; +1d20 on athletic checks in mountains.',
  },
  {
    category: 'ARCHETYPE',
    skill: 'MELEE',
    rank: 4,
    effect:
      'NO MERCY: Re-roll any 1s on damage dice when wielding two-handed weapons.',
  },
  {
    category: 'NATURE',
    skill: 'WILLPOWER',
    rank: 3,
    effect:
      'SAVAGE RESILIENCE: Spend 1 Fortune to ignore a non-lethal wound effect for round.',
  },
  {
    category: 'BLOODLINE',
    skill: 'AWARENESS',
    rank: 1,
    effect:
      'INSTINCT: +1 to initiative. You are never considered surprised in natural wilderness.',
  },
  {
    category: 'EDUCATION',
    skill: 'SURVIVAL',
    rank: 2,
    effect:
      'TRACKER: Identify species and number of tracks with a simple success.',
  },
  {
    category: 'CASTE',
    skill: 'ANIMAL HANDLING',
    rank: 1,
    effect:
      'HERDER: Gain an advantage when interacting with or calming domesticated beasts.',
  },
  {
    category: 'WAR STORY',
    skill: 'MELEE',
    rank: 1,
    effect:
      'BATTLE OF VENARIUM: +1 Focus and +1 Expertise to Melee checks when outnumbered.',
  },
];

const WEAPONS_DEFAULT = [
  {
    label: 'WEAPON_1',
    name: 'Staff of the Woodlands',
    atk_bonus: '+8',
    damage: '1d6 + 5 (bludgeoning)',
    critical: '20 / x2',
    range: 'Melee',
    weight: '4 lbs',
    type: 'Bludgeoning / Magic',
    size: 'Medium',
    special_properties:
      'Acts as a +2 quarterstaff. Casts plant/animal spell formulas using charges.',
  },
  {
    label: 'WEAPON_2',
    name: 'Martial Rapier',
    atk_bonus: '+7',
    damage: '1d8 + 4 (piercing)',
    critical: '18-20 / x2',
    range: 'Melee',
    weight: '2 lbs',
    type: 'Finesse / Piercing',
    size: 'Medium',
    special_properties:
      'Finesse, light weapon, deals swift piercing punctures.',
  },
  {
    label: 'WEAPON_3',
    name: 'Recurve Hand Crossbow',
    atk_bonus: '+7',
    damage: '1d6 + 4 (piercing)',
    critical: '19-20 / x2',
    range: '30 / 120',
    weight: '3 lbs',
    type: 'Ranged / Piercing',
    size: 'Small',
    special_properties: 'Light weapon, loading. Enables bonus action shots.',
  },
];

const AMMO_DEFAULT = {
  ammo1: [
    '20x Silt-tipped Poison Bolts',
    '15x Standard Iron Bolts',
    'Empty extra pouch',
  ],
  ammo2: [
    '5x Serpentine Sleep Darts',
    '3x Sparkstone Explosive Flasks',
    '1x Glow-lichen signal flare',
  ],
};

const ARMOR1_DEFAULT = {
  name: 'Mud-proof Gum Waders',
  location: 'Legs',
  type: 'Plated Boots / Heavy Rubber',
  equip_bonus: '+4 AC',
  proficient: 'Y',
  penalty: 'None',
  weight: '6 lbs',
  speed: 'No penalty',
  size: 'Medium',
  max_dex: '+4 Dex',
  special_properties:
    'Provides advantage on saving throws to resist swamp gas & toxic mud.',
};

const ARMOR2_DEFAULT = {
  name: 'Leather Jerkin',
  location: 'Torso',
  type: 'Light Armor',
  equip_bonus: '+8 AC',
  proficient: 'Y',
  penalty: 'None',
  weight: '4 lbs',
  speed: 'No penalty',
  size: 'Medium',
  max_dex: 'No Max',
  special_properties: 'Standard padded leather, supple and water-treated.',
};

interface DBData {
  characterData: typeof characterData;
  weapons: typeof WEAPONS_DEFAULT;
  ammo: typeof AMMO_DEFAULT;
  ammoTracker1: boolean[];
  ammoTracker2: boolean[];
  ammoTrackerSize1: number;
  ammoTrackerSize2: number;
  armor1: typeof ARMOR1_DEFAULT;
  armor2: typeof ARMOR2_DEFAULT;
  contacts: string;
  fractions: string;
  desires: string;
  sacrifices: string;
  atonements: string;
  vitalRecords: {
    placeOfBirth: string;
    dateOfBirth: string;
    employerAffiliation: string;
  };
  familyHistory: string;
  assetsEquipment: {
    standardOfLiving: string;
    monthlyIncome: string;
    propertyList: string;
  };
  mentalDiagnostics: {
    insanityPoints: number;
    corruptionPoints: number;
    synchronicityPoints: number;
    inspirationPoints: number;
  };
  manifestations: string;
  actionSummary: { action: string; type: string }[];
  operativeNotes: string;
  supplyMetrics: {
    waterWine: boolean[];
    rations: boolean[];
    feed: boolean[];
    stabilizersAntibiotics: boolean[];
    bioOilHydrocarbons: boolean[];
    weldingSlagScrap: boolean[];
  };
  maxRanks: number;
  skillsList: {
    isClassSkill: boolean;
    name: string;
    keyAbility: string;
    abilityModifier: number;
    ranks: number;
    miscModifier: number;
  }[];
  vitalsAndWounds: {
    maxHp: number;
    currentHp: number;
    majorWoundThreshold: number;
    wounds: boolean[];
  };
}

const DB_DEFAULTS = {
  get characterData() {
    return characterData;
  },
  get weapons() {
    return WEAPONS_DEFAULT;
  },
  get ammo() {
    return AMMO_DEFAULT;
  },
  get ammoTracker1() {
    return Array(20).fill(true);
  },
  get ammoTracker2() {
    return Array(20).fill(true);
  },
  get ammoTrackerSize1() {
    return 20;
  },
  get ammoTrackerSize2() {
    return 20;
  },
  get armor1() {
    return ARMOR1_DEFAULT;
  },
  get armor2() {
    return ARMOR2_DEFAULT;
  },
  get contacts() {
    return (
      '• Elder Corvid of Bleak Sough — A grizzled, semi-feral raven informant who exchanges whispered secrets of the shifting mire pathways for dried silver-perch eyes.\n' +
      '• The Mire-Dwellers Rover Caravan — A nomadic guild of river-runners and silt-traders who help Charity smuggle rare mosses, medicinal herbs, and insulated gear.\n' +
      "• Oakhaven Frontier Outpost Warden — An old ranger colleague of Charity's who secretly leaves caches of rations, hand crossbow bolts, and fresh coffee beans near the western marsh boundaries.\n" +
      '• Silt-Runner Smuggler Rings — A shady underground network that supplies Charity with rare spell scroll fragments and wild magic focal stones.'
    );
  },
  get fractions() {
    return (
      '• The Third Authority — A deeply secretive and enigmatic governing council that monitors continental magical balance and tracks planar anomalies across the Bleak Sough.\n' +
      '• The Silt-Weavers Guild — An eccentric cabal of local river marsh cartographers and geomancers who study silt currents and draft private topographical charts.\n' +
      '• The Crimson Canopy Rangers — A small, informal band of veteran forest-wanderers and archers who assist Charity in tracking hostile feral beast spawns.\n' +
      "• The Oakhaven Botanical Conservatory — An academic circle that occasionally funds Charity's expeditions in exchange for rare swamp spore samples."
    );
  },
  get desires() {
    return (
      '• Stabilizing the Bleak Sough Core — To isolate and permanently secure the volatile magical leakages in the central peat mire before they corrupt local spirits.\n' +
      '• Deciphering the Left Arm Scarification — To decode the ancient, bark-like arcane sigils etched into her skin during a wild magic backlash decades ago.\n' +
      '• Compiling the Siltland Atlas — A lifetime physical mapping project recording every active sulfur vent, dryad hollow, and safe pathway in the marsh.\n' +
      '• Mentoring the Next Guide Generation — To pass on her old-school folklore and navigation techniques to keep future pathfinders alive in the shifting mires.'
    );
  },
  get sacrifices() {
    return (
      "• Left Arm's Flesh & Sensation — Permanently charred, bark-hardened, and infused with raw wild magic conducting paths during her ascension event, rendering it numb to normal touch.\n" +
      '• Tranquil and Safe Retirement — Gave up a life of warm comfort and bardic fame in metropolitan cities to remain a lonely vigilante in the hazardous swamps.\n' +
      '• Her Handcrafted Silver Harmonica — Lost to the depths of an acidic sulfur geyser while desperately pacifying a maddened elder marsh elemental.\n' +
      "• Metropolitan Reputation & Status — Severed prestigious connections to academic guilds to protect the secret locations of Bleak Sough's mystical resources."
    );
  },
  get atonements() {
    return (
      '• Dusk "Requiem of Silt" Performance — Playing hauntingly beautiful harmonica melodies at sunset to quiet the restless spirits of wood-rot and decay.\n' +
      '• Tending Displaced Dryad Saplings — Carefully replanting and warding young dryad seedlings away from acidic peat and sulfur vent pathways.\n' +
      '• Free Safe Passage & Healing Salves — Guiding lost outcasts and healing wounded marsh travelers with homemade herbal remedies without asking for coin.\n' +
      "• Raven Offerings at the Elder Oak — Leaving daily offerings of fresh beetles and polished pebbles at the hollow oak to maintain the ravens' loyalty and favor."
    );
  },
  get vitalRecords() {
    return {
      placeOfBirth: 'INDUSTRIAL SECTOR 4, HAB-BLOCK',
      dateOfBirth: '1942.08.15',
      employerAffiliation: 'CHRONOS SYSTEMS - LOGISTICS DIVISION',
    };
  },
  get familyHistory() {
    return (
      "Subject's immediate family perished during the '68 Sector Collapse. Raised in state-sponsored facility 88-B. " +
      'Minimal contact with remaining distant relatives in the outer agricultural zones. Exhibits strong detachment ' +
      'protocols typical of orphans from that era.\n' +
      'Note: Regular remittances sent to an unknown account in Sector 2. Investigate further.'
    );
  },
  get assetsEquipment() {
    return {
      standardOfLiving: 'ADEQUATE / SUBSIDIZED',
      monthlyIncome: '4,500 CR (BASE + HAZARD PAY)',
      propertyList: [
        '• Service Weapon (Standard Issue)',
        '• Encrypted Comm-Link (Model 4)',
        '• Hab-Unit 402, Sector 7-B',
        '• Assorted survival gear (Locker 9)',
      ].join('\n'),
    };
  },
  get mentalDiagnostics() {
    return {
      insanityPoints: 6,
      corruptionPoints: 4,
      synchronicityPoints: 8,
      inspirationPoints: 5,
    };
  },
  get manifestations() {
    return 'Log disorders or mutations here...';
  },
  get actionSummary() {
    return [
      { action: 'Aim', type: 'Half' },
      { action: 'Cast', type: 'Varies' },
      { action: 'Charge', type: 'Full' },
      { action: 'Move', type: 'Half' },
      { action: 'Standard Attack', type: 'Half' },
    ];
  },
  get operativeNotes() {
    return (
      'Subject exhibits unusually high base Essence generation parameters, likely linked to the traumatic awakening incident recorded in File #77-A. Diagnostic scans indicate volatile fluctuations during stress events, suggesting the "Nightmares" drawback is a physiological manifestation of excess unstructured magical energy bleeding into the subconscious.\n\n' +
      "Recommend continued observation. Subject's mastery over Occult Knowledge is advancing at an accelerated rate, far outpacing standard training protocols. The current Channeling Level of 4 is borderline unstable for an operative with only 450 total logged field hours. Ensure standard suppression gear is maintained and audited weekly."
    );
  },
  get supplyMetrics() {
    return {
      waterWine: [
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      rations: [
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      feed: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      stabilizersAntibiotics: [
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      bioOilHydrocarbons: [
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      weldingSlagScrap: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    };
  },
  get maxRanks() {
    return 23;
  },
  get skillsList() {
    return [
      {
        isClassSkill: true,
        name: 'Balance',
        keyAbility: 'DEX',
        abilityModifier: 2,
        ranks: 10,
        miscModifier: 2,
      },
      {
        isClassSkill: true,
        name: 'Barter',
        keyAbility: 'CHA',
        abilityModifier: 3,
        ranks: 5,
        miscModifier: 0,
      },
      {
        isClassSkill: false,
        name: 'Bluff',
        keyAbility: 'CHA',
        abilityModifier: 3,
        ranks: 4,
        miscModifier: 1,
      },
      {
        isClassSkill: true,
        name: 'Climb',
        keyAbility: 'STR',
        abilityModifier: 1,
        ranks: 8,
        miscModifier: -2,
      },
      {
        isClassSkill: true,
        name: 'Concentration',
        keyAbility: 'CON',
        abilityModifier: 1,
        ranks: 12,
        miscModifier: 4,
      },
      {
        isClassSkill: false,
        name: 'Diplomacy',
        keyAbility: 'CHA',
        abilityModifier: 3,
        ranks: 6,
        miscModifier: 0,
      },
      {
        isClassSkill: true,
        name: 'Heal',
        keyAbility: 'WIS',
        abilityModifier: 0,
        ranks: 5,
        miscModifier: 3,
      },
      {
        isClassSkill: false,
        name: 'Intimidate',
        keyAbility: 'CHA',
        abilityModifier: 3,
        ranks: 2,
        miscModifier: 0,
      },
      {
        isClassSkill: true,
        name: 'Knowledge (Occult)',
        keyAbility: 'INT',
        abilityModifier: 1,
        ranks: 15,
        miscModifier: 5,
      },
      {
        isClassSkill: true,
        name: 'Listen',
        keyAbility: 'WIS',
        abilityModifier: 0,
        ranks: 8,
        miscModifier: 2,
      },
      {
        isClassSkill: true,
        name: 'Move Silently',
        keyAbility: 'DEX',
        abilityModifier: 2,
        ranks: 12,
        miscModifier: 0,
      },
      {
        isClassSkill: false,
        name: 'Ride',
        keyAbility: 'DEX',
        abilityModifier: 2,
        ranks: 3,
        miscModifier: 0,
      },
      {
        isClassSkill: true,
        name: 'Search',
        keyAbility: 'INT',
        abilityModifier: 1,
        ranks: 10,
        miscModifier: 2,
      },
      {
        isClassSkill: false,
        name: 'Sense Motive',
        keyAbility: 'WIS',
        abilityModifier: 0,
        ranks: 4,
        miscModifier: 0,
      },
      {
        isClassSkill: true,
        name: 'Spellcraft',
        keyAbility: 'INT',
        abilityModifier: 1,
        ranks: 14,
        miscModifier: 3,
      },
      {
        isClassSkill: false,
        name: 'Spot',
        keyAbility: 'WIS',
        abilityModifier: 0,
        ranks: 6,
        miscModifier: 2,
      },
      {
        isClassSkill: true,
        name: 'Survival',
        keyAbility: 'WIS',
        abilityModifier: 0,
        ranks: 18,
        miscModifier: 6,
      },
    ];
  },
  get vitalsAndWounds() {
    return {
      maxHp: 14,
      currentHp: 14,
      majorWoundThreshold: 7,
      wounds: [true, false, false, false, false, false],
    };
  },
};

const getInitialDBData = (): DBData => {
  let savedCharacterData = DB_DEFAULTS.characterData;
  const savedCharDataStr = localStorage.getItem('charity_character_data_v1');
  if (savedCharDataStr) {
    try {
      savedCharacterData = JSON.parse(savedCharDataStr);
    } catch (e) {}
  }

  let savedWeapons = DB_DEFAULTS.weapons;
  const savedWeaponsStr = localStorage.getItem('charity_weapons_v3');
  if (savedWeaponsStr) {
    try {
      savedWeapons = JSON.parse(savedWeaponsStr);
    } catch (e) {}
  }

  let savedAmmo = DB_DEFAULTS.ammo;
  const savedAmmoStr = localStorage.getItem('charity_ammo_v3');
  if (savedAmmoStr) {
    try {
      savedAmmo = JSON.parse(savedAmmoStr);
    } catch (e) {}
  }

  let savedAmmoTracker1 = DB_DEFAULTS.ammoTracker1;
  const savedAmmoTracker1Str = localStorage.getItem('charity_ammo_tracker1_v1');
  if (savedAmmoTracker1Str) {
    try {
      savedAmmoTracker1 = JSON.parse(savedAmmoTracker1Str);
    } catch (e) {}
  }

  let savedAmmoTracker2 = DB_DEFAULTS.ammoTracker2;
  const savedAmmoTracker2Str = localStorage.getItem('charity_ammo_tracker2_v1');
  if (savedAmmoTracker2Str) {
    try {
      savedAmmoTracker2 = JSON.parse(savedAmmoTracker2Str);
    } catch (e) {}
  }

  const savedAmmoTrackerSize1 =
    parseInt(localStorage.getItem('charity_ammo_tracker_size1_v1') || '') ||
    DB_DEFAULTS.ammoTrackerSize1;
  const savedAmmoTrackerSize2 =
    parseInt(localStorage.getItem('charity_ammo_tracker_size2_v1') || '') ||
    DB_DEFAULTS.ammoTrackerSize2;

  let savedArmor1 = DB_DEFAULTS.armor1;
  const savedArmor1Str = localStorage.getItem('charity_armor1_v4');
  if (savedArmor1Str) {
    try {
      savedArmor1 = JSON.parse(savedArmor1Str);
    } catch (e) {}
  }

  let savedArmor2 = DB_DEFAULTS.armor2;
  const savedArmor2Str = localStorage.getItem('charity_armor2_v4');
  if (savedArmor2Str) {
    try {
      savedArmor2 = JSON.parse(savedArmor2Str);
    } catch (e) {}
  }

  const savedContacts =
    localStorage.getItem('charity_contacts_v3') || DB_DEFAULTS.contacts;
  const savedFractions =
    localStorage.getItem('charity_fractions_v3') || DB_DEFAULTS.fractions;
  const savedDesires =
    localStorage.getItem('charity_desires_v3') || DB_DEFAULTS.desires;
  const savedSacrifices =
    localStorage.getItem('charity_sacrifices_v3') || DB_DEFAULTS.sacrifices;
  const savedAtonements =
    localStorage.getItem('charity_atonements_v3') || DB_DEFAULTS.atonements;

  let savedVitalRecords = DB_DEFAULTS.vitalRecords;
  const savedVitalRecordsStr = localStorage.getItem('charity_vital_records_v1');
  if (savedVitalRecordsStr) {
    try {
      savedVitalRecords = JSON.parse(savedVitalRecordsStr);
    } catch (e) {}
  }

  const savedFamilyHistory =
    localStorage.getItem('charity_family_history_v1') ||
    DB_DEFAULTS.familyHistory;

  let savedAssetsEquipment = DB_DEFAULTS.assetsEquipment;
  const savedAssetsEquipmentStr = localStorage.getItem(
    'charity_assets_equipment_v1',
  );
  if (savedAssetsEquipmentStr) {
    try {
      savedAssetsEquipment = JSON.parse(savedAssetsEquipmentStr);
    } catch (e) {}
  }

  let savedMentalDiagnostics = DB_DEFAULTS.mentalDiagnostics;
  const savedMentalDiagnosticsStr = localStorage.getItem(
    'charity_mental_diagnostics_v1',
  );
  if (savedMentalDiagnosticsStr) {
    try {
      const parsed = JSON.parse(savedMentalDiagnosticsStr);
      savedMentalDiagnostics = {
        insanityPoints: Math.min(
          10,
          parsed.insanityPoints ?? DB_DEFAULTS.mentalDiagnostics.insanityPoints,
        ),
        corruptionPoints: Math.min(
          10,
          parsed.corruptionPoints ??
            DB_DEFAULTS.mentalDiagnostics.corruptionPoints,
        ),
        synchronicityPoints: Math.min(
          10,
          parsed.synchronicityPoints ??
            DB_DEFAULTS.mentalDiagnostics.synchronicityPoints,
        ),
        inspirationPoints: Math.min(
          10,
          parsed.inspirationPoints ??
            DB_DEFAULTS.mentalDiagnostics.inspirationPoints,
        ),
      };
    } catch (e) {}
  }

  let savedManifestations = DB_DEFAULTS.manifestations;
  const savedManifestationsStr = localStorage.getItem(
    'charity_manifestations_v1',
  );
  if (savedManifestationsStr) {
    savedManifestations = savedManifestationsStr;
  } else {
    const mdSaved = localStorage.getItem('charity_mental_diagnostics_v1');
    if (mdSaved) {
      try {
        const parsed = JSON.parse(mdSaved);
        if (parsed.manifestations) savedManifestations = parsed.manifestations;
      } catch (e) {}
    }
  }

  let savedActionSummary = DB_DEFAULTS.actionSummary;
  const savedActionSummaryStr = localStorage.getItem(
    'charity_action_summary_v3',
  );
  if (savedActionSummaryStr) {
    try {
      savedActionSummary = JSON.parse(savedActionSummaryStr);
    } catch (e) {}
  }

  const savedOperativeNotes =
    localStorage.getItem('charity_operative_notes_v1') ||
    DB_DEFAULTS.operativeNotes;

  let savedSupplyMetrics = DB_DEFAULTS.supplyMetrics;
  const savedSupplyMetricsStr = localStorage.getItem(
    'charity_supply_metrics_v2',
  );
  if (savedSupplyMetricsStr) {
    try {
      const parsed = JSON.parse(savedSupplyMetricsStr);
      savedSupplyMetrics = {
        waterWine: parsed.waterWine ?? DB_DEFAULTS.supplyMetrics.waterWine,
        rations: parsed.rations ?? DB_DEFAULTS.supplyMetrics.rations,
        feed: parsed.feed ?? DB_DEFAULTS.supplyMetrics.feed,
        stabilizersAntibiotics:
          parsed.stabilizersAntibiotics ??
          DB_DEFAULTS.supplyMetrics.stabilizersAntibiotics,
        bioOilHydrocarbons:
          parsed.bioOilHydrocarbons ??
          DB_DEFAULTS.supplyMetrics.bioOilHydrocarbons,
        weldingSlagScrap:
          parsed.weldingSlagScrap ?? DB_DEFAULTS.supplyMetrics.weldingSlagScrap,
      };
    } catch (e) {}
  }

  const savedMaxRanks =
    parseInt(localStorage.getItem('charity_max_ranks_v1') || '') ||
    DB_DEFAULTS.maxRanks;

  let savedSkillsList = DB_DEFAULTS.skillsList;
  const savedSkillsListStr = localStorage.getItem('charity_skills_tracker_v1');
  if (savedSkillsListStr) {
    try {
      savedSkillsList = JSON.parse(savedSkillsListStr);
    } catch (e) {}
  }

  let savedVitalsAndWounds = DB_DEFAULTS.vitalsAndWounds;
  const savedVitalsAndWoundsStr = localStorage.getItem(
    'charity_vitals_wounds_v1',
  );
  if (savedVitalsAndWoundsStr) {
    try {
      savedVitalsAndWounds = JSON.parse(savedVitalsAndWoundsStr);
    } catch (e) {}
  }

  return {
    characterData: savedCharacterData,
    weapons: savedWeapons,
    ammo: savedAmmo,
    ammoTracker1: savedAmmoTracker1,
    ammoTracker2: savedAmmoTracker2,
    ammoTrackerSize1: savedAmmoTrackerSize1,
    ammoTrackerSize2: savedAmmoTrackerSize2,
    armor1: savedArmor1,
    armor2: savedArmor2,
    contacts: savedContacts,
    fractions: savedFractions,
    desires: savedDesires,
    sacrifices: savedSacrifices,
    atonements: savedAtonements,
    vitalRecords: savedVitalRecords,
    familyHistory: savedFamilyHistory,
    assetsEquipment: savedAssetsEquipment,
    mentalDiagnostics: savedMentalDiagnostics,
    manifestations: savedManifestations,
    actionSummary: savedActionSummary,
    operativeNotes: savedOperativeNotes,
    supplyMetrics: savedSupplyMetrics,
    maxRanks: savedMaxRanks,
    skillsList: savedSkillsList,
    vitalsAndWounds: savedVitalsAndWounds,
  };
};

const getTabJsonString = (tab: string, data: DBData): string => {
  let subData: any = data;
  if (tab === 'IDENTITY') subData = data.characterData;
  else if (tab === 'DOSSIER') {
    subData = {
      vitalRecords: data.vitalRecords,
      assetsEquipment: data.assetsEquipment,
      mentalDiagnostics: data.mentalDiagnostics,
    };
  } else if (tab === 'TALENTS') {
    subData = {
      skillsList: data.skillsList,
      maxRanks: data.maxRanks,
    };
  } else if (tab === 'WEAPONS') subData = data.weapons;
  else if (tab === 'AMMO') {
    subData = {
      ammo: data.ammo,
      ammoTracker1: data.ammoTracker1,
      ammoTracker2: data.ammoTracker2,
      ammoTrackerSize1: data.ammoTrackerSize1,
      ammoTrackerSize2: data.ammoTrackerSize2,
    };
  } else if (tab === 'GEAR') {
    subData = {
      armor1: data.armor1,
      armor2: data.armor2,
    };
  } else if (tab === 'CONTACTS') {
    subData = {
      contacts: data.contacts,
      fractions: data.fractions,
      desires: data.desires,
      sacrifices: data.sacrifices,
      atonements: data.atonements,
    };
  } else if (tab === 'CLASSIFIED') {
    subData = {
      operativeNotes: data.operativeNotes,
      manifestations: data.manifestations,
    };
  } else if (tab === 'VITALS') {
    subData = {
      vitalsAndWounds: data.vitalsAndWounds,
      supplyMetrics: data.supplyMetrics,
    };
  }
  return JSON.stringify(subData, null, 2);
};

const SchemaConsole = ({
  dbData,
  updateDBData,
  onReset,
}: {
  dbData: DBData;
  updateDBData: (updater: (prev: DBData) => DBData) => void;
  onReset: () => void;
}) => {
  const [currentTab, setCurrentTab] = React.useState('ALL_MODULES');
  const [inputText, setInputText] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);
  const [syntaxError, setSyntaxError] = React.useState<string | null>(null);
  const [copySuccess, setCopySuccess] = React.useState(false);

  // Sync editor text on tab switch
  React.useEffect(() => {
    setInputText(getTabJsonString(currentTab, dbData));
    setIsValid(true);
    setSyntaxError(null);
  }, [currentTab]);

  // Handle external updates to dbData (from sheet edits)
  React.useEffect(() => {
    try {
      const parsedText = JSON.parse(inputText);
      const targetJson = getTabJsonString(currentTab, dbData);
      const parsedTarget = JSON.parse(targetJson);
      if (JSON.stringify(parsedText) !== JSON.stringify(parsedTarget)) {
        setInputText(targetJson);
      }
    } catch (e) {
      if (!inputText) {
        setInputText(getTabJsonString(currentTab, dbData));
      }
    }
  }, [dbData]);

  const handleTextChange = (text: string) => {
    setInputText(text);
    if (!text.trim()) {
      setIsValid(false);
      setSyntaxError('Empty input');
      return;
    }
    try {
      const parsed = JSON.parse(text);
      setIsValid(true);
      setSyntaxError(null);

      // Instantly sync valid JSON changes to the main database state in real-time!
      updateDBData((prev) => {
        const next = { ...prev };
        if (currentTab === 'ALL_MODULES') {
          return { ...next, ...parsed };
        } else if (currentTab === 'IDENTITY') {
          next.characterData = parsed;
        } else if (currentTab === 'DOSSIER') {
          if (parsed.vitalRecords) next.vitalRecords = parsed.vitalRecords;
          if (parsed.assetsEquipment)
            next.assetsEquipment = parsed.assetsEquipment;
          if (parsed.mentalDiagnostics)
            next.mentalDiagnostics = parsed.mentalDiagnostics;
        } else if (currentTab === 'TALENTS') {
          if (parsed.skillsList) next.skillsList = parsed.skillsList;
          if (parsed.maxRanks !== undefined) next.maxRanks = parsed.maxRanks;
        } else if (currentTab === 'WEAPONS') {
          next.weapons = parsed;
        } else if (currentTab === 'AMMO') {
          if (parsed.ammo) next.ammo = parsed.ammo;
          if (parsed.ammoTracker1) next.ammoTracker1 = parsed.ammoTracker1;
          if (parsed.ammoTracker2) next.ammoTracker2 = parsed.ammoTracker2;
          if (parsed.ammoTrackerSize1 !== undefined)
            next.ammoTrackerSize1 = parsed.ammoTrackerSize1;
          if (parsed.ammoTrackerSize2 !== undefined)
            next.ammoTrackerSize2 = parsed.ammoTrackerSize2;
        } else if (currentTab === 'GEAR') {
          if (parsed.armor1) next.armor1 = parsed.armor1;
          if (parsed.armor2) next.armor2 = parsed.armor2;
        } else if (currentTab === 'CONTACTS') {
          if (parsed.contacts) next.contacts = parsed.contacts;
          if (parsed.fractions) next.fractions = parsed.fractions;
          if (parsed.desires) next.desires = parsed.desires;
          if (parsed.sacrifices) next.sacrifices = parsed.sacrifices;
          if (parsed.atonements) next.atonements = parsed.atonements;
        } else if (currentTab === 'CLASSIFIED') {
          if (parsed.operativeNotes)
            next.operativeNotes = parsed.operativeNotes;
          if (parsed.manifestations)
            next.manifestations = parsed.manifestations;
        } else if (currentTab === 'VITALS') {
          if (parsed.vitalsAndWounds)
            next.vitalsAndWounds = parsed.vitalsAndWounds;
          if (parsed.supplyMetrics) next.supplyMetrics = parsed.supplyMetrics;
        }
        return next;
      });
    } catch (err: any) {
      setIsValid(false);
      setSyntaxError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleManualSync = () => {
    if (isValid) {
      handleTextChange(inputText);
      alert('Database synchronized successfully!');
    }
  };

  const getFileName = () => {
    if (currentTab === 'ALL_MODULES') return 'ALL-MODULES-COMBINED.JSON';
    if (currentTab === 'IDENTITY') return 'IDENTITY-RECORD.JSON';
    if (currentTab === 'DOSSIER') return 'TECHNICAL-DOSSIER.JSON';
    if (currentTab === 'TALENTS') return 'TALENTS-AND-SKILLS.JSON';
    if (currentTab === 'WEAPONS') return 'WEAPONS-ARSENAL.JSON';
    if (currentTab === 'AMMO') return 'AMMUNITION-TRACKER.JSON';
    if (currentTab === 'GEAR') return 'PROTECTIVE-GEAR.JSON';
    if (currentTab === 'CONTACTS') return 'CONTACTS-AND-REPUTATION.JSON';
    if (currentTab === 'CLASSIFIED') return 'CLASSIFIED-DOSSIER.JSON';
    if (currentTab === 'VITALS') return 'VITALS-AND-SUPPLIES.JSON';
    return 'DATABASE.JSON';
  };

  const TABS = [
    { id: 'ALL_MODULES', label: '[FULL DATABASE SCHEMA]' },
    { id: 'IDENTITY', label: '1. IDENTITY' },
    { id: 'DOSSIER', label: '2. DOSSIER' },
    { id: 'TALENTS', label: '3. TALENTS' },
    { id: 'WEAPONS', label: '4. WEAPONS' },
    { id: 'AMMO', label: '5. AMMO' },
    { id: 'GEAR', label: '6. GEAR' },
    { id: 'CONTACTS', label: '7. CONTACTS' },
    { id: 'CLASSIFIED', label: '8. CLASSIFIED' },
    { id: 'VITALS', label: '9. VITALS' },
  ];

  return (
    <div className="bg-[#FAF8F5] text-black border-[4px] border-black p-6 md:p-8 mb-8 brutalist-shadow relative font-sans">
      {/* Top Console Title bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-[4px] border-black pb-5 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-black text-[#FAF8F5] border-2 border-black rounded-xs">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-jetbrains text-[10px] uppercase tracking-widest text-[#666666] font-bold">
                TACTICAL DOSSIER SCHEMA CONSOLE
              </span>
              <span className="bg-[#E2F7EB] text-[#117A3E] border border-[#117A3E]/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#117A3E] inline-block"></span>
                LIVE DB ENGINES
              </span>
            </div>
            <h2 className="font-anton text-[32px] md:text-[38px] leading-none uppercase text-black mt-1">
              JSON DATABASE SCHEMA SETTINGS
            </h2>
          </div>
        </div>
        <button
          onClick={onReset}
          className="border-2 border-red-800 text-red-800 bg-transparent hover:bg-red-50 hover:text-red-900 font-jetbrains text-[11px] font-bold px-4 py-2 uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer brutalist-border rounded-xs shrink-0 self-end md:self-auto"
        >
          <RotateCcw className="h-4 w-4" />
          RESET DATABASE
        </button>
      </div>

      {/* Tab selection */}
      <div className="mb-6">
        <span className="font-jetbrains text-[11px] font-bold tracking-widest text-[#666666] block mb-3">
          // SELECT DB MODULE OR FULL SCHEMA:
        </span>
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = currentTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setCurrentTab(t.id)}
                className={`font-jetbrains text-[11px] font-bold px-4 py-2 uppercase tracking-wide transition-all border border-black cursor-pointer ${
                  active
                    ? 'bg-black text-[#FAF8F5] ring-2 ring-black'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Main Window */}
      <div className="border-[3px] border-black brutalist-shadow-sm mb-6 bg-black text-white font-mono rounded-xs overflow-hidden">
        {/* Editor header bar */}
        <div className="bg-[#1C1A17] border-b-[2px] border-black px-4 py-3 flex justify-between items-center text-[11px] text-neutral-400">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-[#00FF66] font-extrabold font-mono font-bold">
              &lt;&gt;
            </span>
            <span className="tracking-wider text-neutral-200">
              {getFileName()}
            </span>
          </div>
          <span className="font-jetbrains text-[10px] font-bold uppercase tracking-wider bg-black px-2.5 py-1 text-neutral-300 border border-neutral-800">
            EDITS APPLY LIVE
          </span>
        </div>

        {/* Text Area */}
        <textarea
          value={inputText}
          onChange={(e) => handleTextChange(e.target.value)}
          spellCheck={false}
          className="w-full h-[320px] p-4 bg-[#0F0E0D] text-[#00FF66] font-mono text-[13px] leading-relaxed focus:outline-none focus:ring-0 border-0 resize-y block whitespace-pre"
        />

        {/* Status bar */}
        <div className="border-t border-neutral-900 px-4 py-3 bg-[#131210]">
          {isValid ? (
            <div className="flex items-center gap-2 text-[#00FF66] text-[11px] font-bold tracking-wide ">
              <span className="h-2 w-2 rounded-full bg-[#00FF66] inline-block animate-pulse"></span>
              <span>SYNTAX IS VALID: Schema parsing active. Safe to sync.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1 text-[#FF4545] text-[11px] font-bold ">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF4545] inline-block"></span>
                <span>
                  SYNTAX ERROR: Invalid JSON format. Real-time updates paused.
                </span>
              </div>
              {syntaxError && (
                <span className="pl-4 text-neutral-400 font-mono text-[10px] lowercase">
                  [Error details: {syntaxError}]
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom control buttons */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-3">
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto border-2 border-black bg-white hover:bg-neutral-50 text-black font-jetbrains text-[12px] font-bold px-6 py-3 uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer brutalist-border rounded-xs"
        >
          {copySuccess ? (
            <>
              <Check className="h-4 w-4 text-green-700 animate-pulse" />
              COPIED!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-black" />
              COPY JSON
            </>
          )}
        </button>
        <button
          onClick={handleManualSync}
          disabled={!isValid}
          className={`w-full sm:w-auto border-2 border-black font-jetbrains text-[12px] font-bold px-6 py-3 uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer brutalist-border rounded-xs ${
            isValid
              ? 'bg-black hover:bg-neutral-900 text-[#FAF8F5]'
              : 'bg-neutral-200 text-neutral-400 border-neutral-300 cursor-not-allowed'
          }`}
        >
          <Save className="h-4 w-4" />
          SAVE & SYNC DATABASE
        </button>
      </div>
    </div>
  );
};

const resolveJsonUrl = (fileName: string): string => {
  if (!fileName) return '';
  let url = fileName.trim();
  url = url.replace(/^\[|\]$/g, '');
  if (!url.toLowerCase().endsWith('.json')) {
    url = url + '.json';
  }
  if (
    !url.startsWith('/') &&
    !url.startsWith('http://') &&
    !url.startsWith('https://') &&
    !url.startsWith('src/') &&
    !url.startsWith('public/')
  ) {
    url = '/' + url;
  }
  return url;
};

export default function App() {
  const [showDbConsole, setShowDbConsole] = React.useState(false);
  const [currentLoadedFile, setCurrentLoadedFile] = React.useState<
    string | null
  >(null);
  const [fileLoadStatus, setFileLoadStatus] = React.useState<{
    success?: boolean;
    error?: string;
    loading?: boolean;
  }>({});
  const [dbData, setDbData] = React.useState<DBData>(getInitialDBData);

  const loadDatabaseFromObj = (data: Partial<DBData>) => {
    setDbData((prev) => {
      const next = { ...prev };
      if (data.characterData) next.characterData = data.characterData;
      if (data.weapons) next.weapons = data.weapons;
      if (data.ammo) next.ammo = data.ammo;
      if (data.ammoTracker1) next.ammoTracker1 = data.ammoTracker1;
      if (data.ammoTracker2) next.ammoTracker2 = data.ammoTracker2;
      if (data.ammoTrackerSize1 !== undefined)
        next.ammoTrackerSize1 = data.ammoTrackerSize1;
      if (data.ammoTrackerSize2 !== undefined)
        next.ammoTrackerSize2 = data.ammoTrackerSize2;
      if (data.armor1) next.armor1 = data.armor1;
      if (data.armor2) next.armor2 = data.armor2;
      if (data.contacts !== undefined) next.contacts = data.contacts;
      if (data.fractions !== undefined) next.fractions = data.fractions;
      if (data.desires !== undefined) next.desires = data.desires;
      if (data.sacrifices !== undefined) next.sacrifices = data.sacrifices;
      if (data.atonements !== undefined) next.atonements = data.atonements;
      if (data.vitalRecords) next.vitalRecords = data.vitalRecords;
      if (data.familyHistory !== undefined)
        next.familyHistory = data.familyHistory;
      if (data.assetsEquipment) next.assetsEquipment = data.assetsEquipment;
      if (data.mentalDiagnostics)
        next.mentalDiagnostics = data.mentalDiagnostics;
      if (data.manifestations !== undefined)
        next.manifestations = data.manifestations;
      if (data.actionSummary) next.actionSummary = data.actionSummary;
      if (data.operativeNotes !== undefined)
        next.operativeNotes = data.operativeNotes;
      if (data.supplyMetrics) next.supplyMetrics = data.supplyMetrics;
      if (data.maxRanks !== undefined) next.maxRanks = data.maxRanks;
      if (data.skillsList) next.skillsList = data.skillsList;
      if (data.vitalsAndWounds) next.vitalsAndWounds = data.vitalsAndWounds;

      // Sync to localStorage
      localStorage.setItem(
        'charity_character_data_v1',
        JSON.stringify(next.characterData),
      );
      localStorage.setItem('charity_weapons_v3', JSON.stringify(next.weapons));
      localStorage.setItem('charity_ammo_v3', JSON.stringify(next.ammo));
      localStorage.setItem(
        'charity_ammo_tracker1_v1',
        JSON.stringify(next.ammoTracker1),
      );
      localStorage.setItem(
        'charity_ammo_tracker2_v1',
        JSON.stringify(next.ammoTracker2),
      );
      localStorage.setItem(
        'charity_ammo_tracker_size1_v1',
        String(next.ammoTrackerSize1),
      );
      localStorage.setItem(
        'charity_ammo_tracker_size2_v1',
        String(next.ammoTrackerSize2),
      );
      localStorage.setItem('charity_armor1_v4', JSON.stringify(next.armor1));
      localStorage.setItem('charity_armor2_v4', JSON.stringify(next.armor2));
      localStorage.setItem('charity_contacts_v3', next.contacts);
      localStorage.setItem('charity_fractions_v3', next.fractions);
      localStorage.setItem('charity_desires_v3', next.desires);
      localStorage.setItem('charity_sacrifices_v3', next.sacrifices);
      localStorage.setItem('charity_atonements_v3', next.atonements);
      localStorage.setItem(
        'charity_vital_records_v1',
        JSON.stringify(next.vitalRecords),
      );
      localStorage.setItem('charity_family_history_v1', next.familyHistory);
      localStorage.setItem(
        'charity_assets_equipment_v1',
        JSON.stringify(next.assetsEquipment),
      );
      localStorage.setItem(
        'charity_mental_diagnostics_v1',
        JSON.stringify(next.mentalDiagnostics),
      );
      localStorage.setItem('charity_manifestations_v1', next.manifestations);
      localStorage.setItem(
        'charity_action_summary_v3',
        JSON.stringify(next.actionSummary),
      );
      localStorage.setItem('charity_operative_notes_v1', next.operativeNotes);
      localStorage.setItem(
        'charity_supply_metrics_v2',
        JSON.stringify(next.supplyMetrics),
      );
      localStorage.setItem('charity_max_ranks_v1', String(next.maxRanks));
      localStorage.setItem(
        'charity_skills_tracker_v1',
        JSON.stringify(next.skillsList),
      );
      localStorage.setItem(
        'charity_vitals_wounds_v1',
        JSON.stringify(next.vitalsAndWounds),
      );

      return next;
    });
  };

  const fetchJsonDatabase = (fileName: string) => {
    setFileLoadStatus({ loading: true });
    const resolvedUrl = resolveJsonUrl(fileName);
    fetch(resolvedUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        loadDatabaseFromObj(data);
        setFileLoadStatus({ success: true });
      })
      .catch((err) => {
        console.error('Failed to load JSON database:', err);
        setFileLoadStatus({ error: err.message || 'Failed to fetch file' });
      });
  };

  React.useEffect(() => {
    let lastJsonParam: string | null = null;
    const checkUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setShowDbConsole(params.get('db') === 'true');

      const jsonParam = params.get('json');
      if (jsonParam !== lastJsonParam) {
        lastJsonParam = jsonParam;
        if (jsonParam) {
          setCurrentLoadedFile(jsonParam);
          fetchJsonDatabase(jsonParam);
        } else {
          setCurrentLoadedFile(null);
          setFileLoadStatus({});
        }
      }
    };
    checkUrl();
    window.addEventListener('popstate', checkUrl);
    const interval = setInterval(checkUrl, 1000);
    return () => {
      window.removeEventListener('popstate', checkUrl);
      clearInterval(interval);
    };
  }, []);

  const [talentsRolls, setTalentsRolls] = React.useState<
    Record<number, { val: number; isRolling: boolean; bonus: number }>
  >({});

  const handleRollTalent = (idx: number, bonus: number) => {
    setTalentsRolls((prev) => ({
      ...prev,
      [idx]: { val: 0, isRolling: true, bonus },
    }));

    setTimeout(() => {
      const roll = Math.floor(Math.random() * 20) + 1;
      setTalentsRolls((prev) => ({
        ...prev,
        [idx]: { val: roll, isRolling: false, bonus },
      }));
    }, 600);
  };

  const updateDBData = (updater: (prev: DBData) => DBData) => {
    setDbData((prev) => {
      const next = updater(prev);
      localStorage.setItem(
        'charity_character_data_v1',
        JSON.stringify(next.characterData),
      );
      localStorage.setItem('charity_weapons_v3', JSON.stringify(next.weapons));
      localStorage.setItem('charity_ammo_v3', JSON.stringify(next.ammo));
      localStorage.setItem(
        'charity_ammo_tracker1_v1',
        JSON.stringify(next.ammoTracker1),
      );
      localStorage.setItem(
        'charity_ammo_tracker2_v1',
        JSON.stringify(next.ammoTracker2),
      );
      localStorage.setItem(
        'charity_ammo_tracker_size1_v1',
        String(next.ammoTrackerSize1),
      );
      localStorage.setItem(
        'charity_ammo_tracker_size2_v1',
        String(next.ammoTrackerSize2),
      );
      localStorage.setItem('charity_armor1_v4', JSON.stringify(next.armor1));
      localStorage.setItem('charity_armor2_v4', JSON.stringify(next.armor2));
      localStorage.setItem('charity_contacts_v3', next.contacts);
      localStorage.setItem('charity_fractions_v3', next.fractions);
      localStorage.setItem('charity_desires_v3', next.desires);
      localStorage.setItem('charity_sacrifices_v3', next.sacrifices);
      localStorage.setItem('charity_atonements_v3', next.atonements);
      localStorage.setItem(
        'charity_vital_records_v1',
        JSON.stringify(next.vitalRecords),
      );
      localStorage.setItem('charity_family_history_v1', next.familyHistory);
      localStorage.setItem(
        'charity_assets_equipment_v1',
        JSON.stringify(next.assetsEquipment),
      );
      localStorage.setItem(
        'charity_mental_diagnostics_v1',
        JSON.stringify(next.mentalDiagnostics),
      );
      localStorage.setItem('charity_manifestations_v1', next.manifestations);
      localStorage.setItem(
        'charity_action_summary_v3',
        JSON.stringify(next.actionSummary),
      );
      localStorage.setItem('charity_operative_notes_v1', next.operativeNotes);
      localStorage.setItem(
        'charity_supply_metrics_v2',
        JSON.stringify(next.supplyMetrics),
      );
      localStorage.setItem('charity_max_ranks_v1', String(next.maxRanks));
      localStorage.setItem(
        'charity_skills_tracker_v1',
        JSON.stringify(next.skillsList),
      );
      localStorage.setItem(
        'charity_vitals_wounds_v1',
        JSON.stringify(next.vitalsAndWounds),
      );
      return next;
    });
  };

  const {
    characterData,
    weapons,
    ammo,
    ammoTracker1,
    ammoTracker2,
    ammoTrackerSize1,
    ammoTrackerSize2,
    armor1,
    armor2,
    contacts,
    fractions,
    desires,
    sacrifices,
    atonements,
    vitalRecords,
    familyHistory,
    assetsEquipment,
    mentalDiagnostics,
    manifestations,
    actionSummary,
    operativeNotes,
    supplyMetrics,
    maxRanks,
    skillsList,
    vitalsAndWounds,
  } = dbData;

  const {
    meta,
    identity,
    description,
    personality,
    notes,
    definition,
    proficiencies,
    spellcasting,
    currentState,
  } = characterData;
  const inv = currentState.inventory;

  const [weaponRolls, setWeaponRolls] = React.useState<
    Record<
      number,
      {
        isRolling: boolean;
        d20: number;
        damageVal: number;
        damageFormula: string;
        text: string;
      }
    >
  >({});

  const handleRollWeapon = (idx: number) => {
    setWeaponRolls((prev) => ({
      ...prev,
      [idx]: {
        isRolling: true,
        d20: 0,
        damageVal: 0,
        damageFormula: '',
        text: '',
      },
    }));

    setTimeout(() => {
      const w = weapons[idx];
      const atkOffset = parseInt(w.atk_bonus.replace(/[^\d+-]/g, ''), 10) || 0;
      const d20 = Math.floor(Math.random() * 20) + 1;

      let dmgVal = 0;
      let dmgFormulaText = '';
      const dmgMatch = w.damage.match(/(\d+)d(\d+)\s*\+?\s*(\d*)/i);
      if (dmgMatch) {
        const numDice = parseInt(dmgMatch[1], 10);
        const diceSides = parseInt(dmgMatch[2], 10);
        const constBonus = parseInt(dmgMatch[3], 10) || 0;
        let sum = 0;
        const rolls = [];
        for (let i = 0; i < numDice; i++) {
          const r = Math.floor(Math.random() * diceSides) + 1;
          rolls.push(r);
          sum += r;
        }
        dmgVal = sum + constBonus;
        dmgFormulaText = `(${rolls.join('+')}) + ${constBonus}`;
      } else {
        dmgVal = parseInt(w.damage.replace(/[^\d]/g, ''), 10) || 4;
        dmgFormulaText = `${dmgVal}`;
      }

      setWeaponRolls((prev) => ({
        ...prev,
        [idx]: {
          isRolling: false,
          d20,
          damageVal: dmgVal,
          damageFormula: dmgFormulaText,
          text: `Attack: ${d20} + ${atkOffset} = ${d20 + atkOffset} | Damage: ${dmgVal}`,
        },
      }));
    }, 600);
  };

  const handleToggleAmmo1 = (idx: number) => {
    updateDBData((prev) => {
      const next = [...prev.ammoTracker1];
      if (idx < next.length) {
        next[idx] = !next[idx];
      }
      return { ...prev, ammoTracker1: next };
    });
  };

  const handleToggleAmmo2 = (idx: number) => {
    updateDBData((prev) => {
      const next = [...prev.ammoTracker2];
      if (idx < next.length) {
        next[idx] = !next[idx];
      }
      return { ...prev, ammoTracker2: next };
    });
  };

  const handleResizeAmmo1 = (newSize: number) => {
    const size = Math.max(2, Math.min(60, newSize));
    updateDBData((prev) => {
      let next = [...prev.ammoTracker1];
      if (next.length < size) {
        next = [...next, ...Array(size - next.length).fill(true)];
      } else if (next.length > size) {
        next = next.slice(0, size);
      }
      return { ...prev, ammoTrackerSize1: size, ammoTracker1: next };
    });
  };

  const handleResizeAmmo2 = (newSize: number) => {
    const size = Math.max(2, Math.min(60, newSize));
    updateDBData((prev) => {
      let next = [...prev.ammoTracker2];
      if (next.length < size) {
        next = [...next, ...Array(size - next.length).fill(true)];
      } else if (next.length > size) {
        next = next.slice(0, size);
      }
      return { ...prev, ammoTrackerSize2: size, ammoTracker2: next };
    });
  };

  const updateWeaponField = (weaponIdx: number, field: string, val: string) => {
    updateDBData((prev) => {
      const next = prev.weapons.map((w, i) => {
        if (i === weaponIdx) {
          return { ...w, [field]: val };
        }
        return w;
      });
      return { ...prev, weapons: next };
    });
  };

  const updateAmmoField = (
    group: 'ammo1' | 'ammo2',
    lineIdx: number,
    val: string,
  ) => {
    updateDBData((prev) => {
      const nextGroup = [...prev.ammo[group]];
      nextGroup[lineIdx] = val;
      return { ...prev, ammo: { ...prev.ammo, [group]: nextGroup } };
    });
  };

  const updateArmor1Field = (field: string, val: any) => {
    updateDBData((prev) => ({
      ...prev,
      armor1: { ...prev.armor1, [field]: val },
    }));
  };

  const updateArmor2Field = (field: string, val: any) => {
    updateDBData((prev) => ({
      ...prev,
      armor2: { ...prev.armor2, [field]: val },
    }));
  };

  const handleUpdateContacts = (val: string) => {
    updateDBData((prev) => ({ ...prev, contacts: val }));
  };
  const handleUpdateFractions = (val: string) => {
    updateDBData((prev) => ({ ...prev, fractions: val }));
  };
  const handleUpdateDesires = (val: string) => {
    updateDBData((prev) => ({ ...prev, desires: val }));
  };
  const handleUpdateSacrifices = (val: string) => {
    updateDBData((prev) => ({ ...prev, sacrifices: val }));
  };
  const handleUpdateAtonements = (val: string) => {
    updateDBData((prev) => ({ ...prev, atonements: val }));
  };

  const [isEditingNotes, setIsEditingNotes] = React.useState(false);

  const handleUpdateSkillRow = (idx: number, field: string, value: any) => {
    updateDBData((prev) => {
      const next = prev.skillsList.map((row, i) => {
        if (i === idx) {
          return { ...row, [field]: value };
        }
        return row;
      });
      return { ...prev, skillsList: next };
    });
  };

  const handleAddSkillRow = () => {
    updateDBData((prev) => {
      const next = [
        ...prev.skillsList,
        {
          isClassSkill: false,
          name: 'New Skill',
          keyAbility: 'DEX',
          abilityModifier: 0,
          ranks: 0,
          miscModifier: 0,
        },
      ];
      return { ...prev, skillsList: next };
    });
  };

  const handleRemoveSkillRow = (idx: number) => {
    updateDBData((prev) => {
      const next = prev.skillsList.filter((_, i) => i !== idx);
      return { ...prev, skillsList: next };
    });
  };

  const handleUpdateMaxRanks = (val: number) => {
    updateDBData((prev) => ({ ...prev, maxRanks: val }));
  };

  const handleUpdateVitalsAndWounds = (
    field: 'maxHp' | 'currentHp' | 'majorWoundThreshold',
    val: number,
  ) => {
    updateDBData((prev) => {
      const next = { ...prev.vitalsAndWounds, [field]: val };
      if (field === 'maxHp') {
        next.majorWoundThreshold = Math.floor(val / 2);
      }
      return { ...prev, vitalsAndWounds: next };
    });
  };

  const handleToggleWoundSlot = (idx: number) => {
    updateDBData((prev) => {
      const nextWounds = [...prev.vitalsAndWounds.wounds];
      nextWounds[idx] = !nextWounds[idx];
      return {
        ...prev,
        vitalsAndWounds: { ...prev.vitalsAndWounds, wounds: nextWounds },
      };
    });
  };

  const handleUpdateVitalRecords = (
    field: 'placeOfBirth' | 'dateOfBirth' | 'employerAffiliation',
    val: string,
  ) => {
    updateDBData((prev) => ({
      ...prev,
      vitalRecords: { ...prev.vitalRecords, [field]: val },
    }));
  };

  const handleUpdateFamilyHistory = (val: string) => {
    updateDBData((prev) => ({ ...prev, familyHistory: val }));
  };

  const handleUpdateAssetsEquipment = (
    field: 'standardOfLiving' | 'monthlyIncome' | 'propertyList',
    val: string,
  ) => {
    updateDBData((prev) => ({
      ...prev,
      assetsEquipment: { ...prev.assetsEquipment, [field]: val },
    }));
  };

  const handleUpdateMentalDiagnostics = (
    field:
      | 'insanityPoints'
      | 'corruptionPoints'
      | 'synchronicityPoints'
      | 'inspirationPoints',
    val: any,
  ) => {
    updateDBData((prev) => ({
      ...prev,
      mentalDiagnostics: { ...prev.mentalDiagnostics, [field]: val },
    }));
  };

  const handleUpdateManifestations = (val: string) => {
    updateDBData((prev) => ({ ...prev, manifestations: val }));
  };

  const handleUpdateActionSummary = (
    idx: number,
    field: 'action' | 'type',
    val: string,
  ) => {
    updateDBData((prev) => {
      const next = prev.actionSummary.map((item, i) => {
        if (i === idx) {
          return { ...item, [field]: val };
        }
        return item;
      });
      return { ...prev, actionSummary: next };
    });
  };

  const handleAddActionSummaryRow = () => {
    updateDBData((prev) => {
      const next = [
        ...prev.actionSummary,
        { action: 'New Action', type: 'Half' },
      ];
      return { ...prev, actionSummary: next };
    });
  };

  const handleRemoveActionSummaryRow = (idx: number) => {
    updateDBData((prev) => {
      const next = prev.actionSummary.filter((_, i) => i !== idx);
      return { ...prev, actionSummary: next };
    });
  };

  const handleUpdateOperativeNotes = (val: string) => {
    updateDBData((prev) => ({ ...prev, operativeNotes: val }));
  };

  const handleUpdateSupplyMetrics = (
    group:
      | 'waterWine'
      | 'rations'
      | 'feed'
      | 'stabilizersAntibiotics'
      | 'bioOilHydrocarbons'
      | 'weldingSlagScrap',
    idx: number,
    val: boolean,
  ) => {
    updateDBData((prev) => {
      const nextGroup = [...prev.supplyMetrics[group]];
      nextGroup[idx] = val;
      return {
        ...prev,
        supplyMetrics: { ...prev.supplyMetrics, [group]: nextGroup },
      };
    });
  };

  const getItemName = (id: string) => {
    // @ts-ignore
    const item = inv.items[id];
    if (!item) return id;
    const name = String(item.item_id)
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return item.quantity > 1 ? `${name} (x${item.quantity})` : name;
  };

  return (
    <>
      <div className="flex flex-1 relative bg-[#E6E2D8]">
        <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
          {currentLoadedFile && (
            <div
              className={`mb-6 border-2 font-jetbrains text-xs brutalist-border rounded-xs p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                fileLoadStatus.loading
                  ? 'bg-amber-100 text-amber-950 border-amber-500'
                  : fileLoadStatus.error
                    ? 'bg-red-100 text-red-950 border-red-500'
                    : 'bg-emerald-100 text-emerald-950 border-emerald-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <Database
                  className={`h-5 w-5 shrink-0 ${fileLoadStatus.loading ? 'animate-spin' : ''}`}
                />
                <div>
                  <div className="font-bold uppercase tracking-wider flex items-center gap-2">
                    {fileLoadStatus.loading && (
                      <span className="px-1.5 py-0.5 bg-amber-500 text-white rounded-xs text-[10px]">
                        LOADING
                      </span>
                    )}
                    {fileLoadStatus.error && (
                      <span className="px-1.5 py-0.5 bg-red-500 text-white rounded-xs text-[10px]">
                        SYNC FAILURE
                      </span>
                    )}
                    {fileLoadStatus.success && (
                      <span className="px-1.5 py-0.5 bg-emerald-500 text-white rounded-xs text-[10px]">
                        ACTIVE SCHEMA
                      </span>
                    )}
                    Database Source: {currentLoadedFile}
                  </div>
                  <div className="mt-1 opacity-80 font-medium">
                    {fileLoadStatus.loading &&
                      'Fetching and parsing external JSON schema database...'}
                    {fileLoadStatus.error &&
                      `Could not fetch database: ${fileLoadStatus.error}`}
                    {fileLoadStatus.success &&
                      'Synchronized successfully with local real-time persistent storage.'}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => fetchJsonDatabase(currentLoadedFile)}
                  disabled={fileLoadStatus.loading}
                  className="px-3 py-1.5 bg-white hover:bg-neutral-50 text-black border border-black rounded-xs font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  REFRESH
                </button>
                <button
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search);
                    params.delete('json');
                    window.history.pushState(
                      {},
                      '',
                      `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`,
                    );
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white border border-black rounded-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  UNLINK
                </button>
              </div>
            </div>
          )}
          {showDbConsole && (
            <SchemaConsole
              dbData={dbData}
              updateDBData={updateDBData}
              onReset={() => {
                if (
                  window.confirm(
                    'Are you sure you want to restore the default database state? All local overrides will be cleared.',
                  )
                ) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            />
          )}
          {/* Header & Synopsis */}
          <section className="relative mb-12 border-b-[4px] border-black pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col pt-24 md:pt-40">
                <h1 className="font-anton text-[64px] md:text-[84px] leading-[1] tracking-[-0.02em] uppercase text-black mb-2">
                  {identity.name}
                </h1>
                <p className="font-jetbrains text-[14px] font-bold tracking-widest bg-black text-[#E6E2D8] px-4 py-2 inline-block self-start mb-6 uppercase">
                  Level 20 • {identity.species} • {identity.alignment}
                </p>
                <blockquote className="font-anton text-[24px] leading-[32px] uppercase mb-4 bg-white text-black p-6 brutalist-border">
                  {personality.traits.split('.')[0]}.
                </blockquote>
                <p className="font-tinos text-[18px] leading-[28px] italic leading-relaxed text-black mt-4">
                  {notes}
                </p>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col gap-6 items-center md:items-end">
                <div className="relative w-[576px] h-[576px] max-w-full aspect-square brutalist-border-thick p-2 bg-white overflow-hidden flex flex-col justify-end">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC89Hu_52TdyLqB2irIngndK12akcKx4p_Yw5U6Hr4QBqA7xYNJEjIgfpw0j_ZRDqKFrDBLkV0x6tnXfZo9HGIPfuCYBB99cBT8ILOg50Txa2KsOoQNndUb6tTB7E9_vGA-Jlso3wcc7iDV23wxIsLrDVMMwNfyGE4J-TVt0mgyDwy1ikxr8f-Hub-64rWtzmVT7QKr0ZlO4ihLDSZNXIBTx8H451sXLG-YZPwbSxYvzDv-cCtz7p2N1915uJuvj_UXr4e-mcmTFz-4"
                    alt="Charity Vaughn Character Portrait"
                    className="absolute inset-x-2 inset-y-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover grayscale contrast-125 block"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 bg-white border-t-4 border-black w-[calc(100%+16px)] -mx-2 -mb-2 py-4 text-center">
                    <span className="font-anton text-[24px] md:text-[32px] tracking-wide text-black uppercase">
                      SOCIAL CHAMELEON
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#e2e2e2] p-6 brutalist-border">
                  <h3 className="font-anton text-[24px] leading-[32px] uppercase border-b-[2px] border-black mb-4 pb-1">
                    PHYSICAL DESCRIPTION
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <LabeledBlock
                      label="Background"
                      value={identity.background}
                    />
                    <LabeledBlock label="Age" value={description.age} />
                    <LabeledBlock label="Height" value={description.height} />
                    <LabeledBlock label="Weight" value={description.weight} />
                    <LabeledBlock label="Eyes" value={description.eyes} />
                    <LabeledBlock label="Hair" value={description.hair} />
                    <div className="col-span-2">
                      <LabeledBlock
                        label="Skin & Distinguishing Features"
                        value={description.skin}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Stats & Attributes */}
          <section className="mb-12">
            <SectionHeader title="Technical Dossier" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left col: Ability Scores */}
              <div className="col-span-1">
                <div className="brutalist-border-thick p-4 bg-white mb-6">
                  <h3 className="font-anton text-[24px] leading-[32px] uppercase border-b-[2px] border-black mb-4 pb-1">
                    ABILITY SCORES
                  </h3>
                  <div className="font-jetbrains text-[14px] font-medium uppercase mb-4 flex justify-between border-b-[1px] border-dashed border-black pb-2">
                    <span>Generation Method:</span>{' '}
                    <span>{definition.abilityScoreGeneration.method}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(
                      definition.abilityScoreGeneration.scores,
                    ).map(([stat, val]) => (
                      <StatBlock
                        key={stat}
                        label={stat.slice(0, 3)}
                        value={val as string | number}
                      />
                    ))}
                  </div>
                </div>

                {/* State variables */}
                <div className="grid grid-cols-2 gap-4">
                  <StatBlock
                    label="CURRENT HP"
                    value={currentState.currentHp}
                  />
                  <StatBlock label="TEMP HP" value={currentState.temporaryHp} />

                  {/* VITALS_AND_WOUNDS TRACKER */}
                  <div
                    id="vitals-and-wounds-box"
                    className="col-span-2 border-2 border-black bg-[#FAF8F5] p-5 brutalist-shadow-sm flex flex-col font-jetbrains"
                  >
                    <div className="font-jetbrains font-bold text-[12px] uppercase tracking-widest text-black mb-4 flex items-center gap-1 ">
                      <span>&gt; VITALS_AND_WOUNDS</span>
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* Max HP and Current HP */}
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-jetbrains text-[10px] uppercase font-bold text-[#444] tracking-wider ">
                        <div className="flex items-center gap-2">
                          <span>HIT POINTS MAX:</span>
                          <input
                            type="number"
                            value={vitalsAndWounds.maxHp}
                            onChange={(e) =>
                              handleUpdateVitalsAndWounds(
                                'maxHp',
                                Math.max(0, parseInt(e.target.value) || 0),
                              )
                            }
                            className="w-12 bg-white border-2 border-black text-center font-jetbrains font-bold text-[12px] py-0.5 px-1 focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span>CURRENT:</span>
                          <input
                            type="number"
                            value={vitalsAndWounds.currentHp}
                            onChange={(e) =>
                              handleUpdateVitalsAndWounds(
                                'currentHp',
                                Math.max(0, parseInt(e.target.value) || 0),
                              )
                            }
                            className="w-12 bg-white border-2 border-black text-center font-jetbrains font-bold text-[12px] py-0.5 px-1 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Major Wound Threshold */}
                      <div className="flex items-center gap-2 font-jetbrains text-[10px] uppercase font-bold text-[#444] tracking-wider ">
                        <span>MAJOR WOUND THRESHOLD:</span>
                        <input
                          type="number"
                          value={vitalsAndWounds.majorWoundThreshold}
                          onChange={(e) =>
                            handleUpdateVitalsAndWounds(
                              'majorWoundThreshold',
                              Math.max(0, parseInt(e.target.value) || 0),
                            )
                          }
                          className="w-12 bg-white border-2 border-black text-center font-jetbrains font-bold text-[12px] py-0.5 px-1 focus:outline-none"
                        />
                      </div>

                      {/* Wound Track */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-jetbrains text-[10px] uppercase font-bold text-[#444] tracking-wider pt-1">
                        <span>WOUND TRACK:</span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {vitalsAndWounds.wounds.map((checked, i) => {
                            const slotLabel = String(i + 1).padStart(2, '0');
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleToggleWoundSlot(i)}
                                className={`h-6.5 px-2.5 border border-black min-w-[36px] text-center font-jetbrains font-bold text-[11px] cursor-pointer transition-all ${
                                  checked
                                    ? 'bg-black text-white hover:bg-neutral-800 ring-2 ring-black'
                                    : 'bg-white text-black border-dashed border-black/50 hover:bg-neutral-100'
                                }`}
                              >
                                {slotLabel}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 brutalist-border p-4 bg-black text-[#E6E2D8]">
                    <div className="font-jetbrains text-[14px] flex justify-between uppercase mb-2">
                      <span>Total XP:</span> <span>{currentState.xp}</span>
                    </div>
                    <div className="font-jetbrains text-[14px] flex justify-between uppercase mb-2">
                      <span>Exhaustion:</span>{' '}
                      <span>{currentState.exhaustionLevel}</span>
                    </div>
                    <div className="font-jetbrains text-[14px] flex justify-between uppercase mb-2">
                      <span>Inspiration:</span>{' '}
                      <span>{currentState.inspiration ? 'YES' : 'NO'}</span>
                    </div>
                    <div className="font-jetbrains text-[14px] flex justify-between uppercase">
                      <span>Conditions:</span>{' '}
                      <span>
                        {currentState.conditions.length
                          ? currentState.conditions.join(', ')
                          : 'NONE'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Magic Scores */}
                <div className="brutalist-border-thick p-4 bg-white mt-6">
                  <h3 className="font-anton text-[24px] leading-[32px] uppercase border-b-[2px] border-black mb-4 pb-1">
                    MAGIC SCORES
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    {/* Group 1 */}
                    <div className="brutalist-border p-3 bg-[#FAF8F5]">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            forc
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            warm grey flannel
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            fric
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            glamorgan sausage
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            sped
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            pink and sleek
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            mass
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            deep sea dream
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Group 2 */}
                    <div className="brutalist-border p-3 bg-[#FAF8F5]">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            bein
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            harvest pumpkin
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            ctrl
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            deep blush
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            rslv
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            peridot
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            wits
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            yoshi's green
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Group 3 */}
                    <div className="brutalist-border p-3 bg-[#FAF8F5]">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            tude
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            highlands moss
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            vizn
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            portal entrance
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            post
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            undefined
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            styl
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            violet indigo
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Group 4 */}
                    <div className="brutalist-border p-3 bg-[#FAF8F5]">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            koud
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            sprout
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            grit
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            wet sandstone
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            byte
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            prairie sun
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                          <span className="font-jetbrains text-[11px] font-bold uppercase bg-black text-[#E6E2D8] px-1.5 py-0.5">
                            flow
                          </span>
                          <span className="font-tinos text-[14px] font-bold text-black italic text-right">
                            clair de lune
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle col: Personality & Profs */}
              <div className="col-span-1 lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="brutalist-border p-6 bg-white">
                    <p className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] border-b-[2px] border-black mb-2 pb-1">
                      Traits
                    </p>
                    <p className="font-tinos text-[16px] leading-[24px]">
                      {personality.traits}
                    </p>
                  </div>
                  <div className="brutalist-border p-6 bg-white">
                    <p className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] border-b-[2px] border-black mb-2 pb-1">
                      Ideals
                    </p>
                    <p className="font-tinos text-[16px] leading-[24px]">
                      {personality.ideals}
                    </p>
                  </div>
                  <div className="brutalist-border p-6 bg-white">
                    <p className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] border-b-[2px] border-black mb-2 pb-1">
                      Bonds
                    </p>
                    <p className="font-tinos text-[16px] leading-[24px]">
                      {personality.bonds}
                    </p>
                  </div>
                  <div className="brutalist-border p-6 bg-white">
                    <p className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] border-b-[2px] border-black mb-2 pb-1">
                      Flaws
                    </p>
                    <p className="font-tinos text-[16px] leading-[24px]">
                      {personality.flaws}
                    </p>
                  </div>
                </div>

                {/* Proficiencies */}
                <div className="brutalist-border-thick p-6 bg-[#F5F2EB] text-black">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-[3px] border-black pb-2 mb-6">
                    <div>
                      <h3 className="font-anton text-[36px] uppercase leading-none">
                        PROFICIENCIES
                      </h3>
                      <span className="font-jetbrains text-[10px] uppercase text-[#666666] tracking-wider block mt-1">
                        LOG_NODE_CHARITY_CORE_CAPABILITIES
                      </span>
                    </div>
                    <span className="font-jetbrains text-[13px] bg-black text-[#E6E2D8] px-3 py-1 uppercase font-bold tracking-widest mt-2 sm:mt-0">
                      PROFICIENCIES BONUS: +6
                    </span>
                  </div>

                  <div className="mb-8">
                    <p className="font-jetbrains text-[12px] font-bold uppercase tracking-wider mb-4 border-b-2 border-black pb-1">
                      [ MASTERED SKILLS SPECIFIER - CALCULATED MODIFIERS ]
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* NATURE */}
                      <div className="brutalist-border bg-white p-4 flex flex-col justify-between hover:bg-[#FAF8F5] transition-all brutalist-shadow">
                        <div>
                          <div className="flex justify-between items-start border-b border-dashed border-black pb-2 mb-3">
                            <div>
                              <span className="font-jetbrains text-[10px] uppercase text-[#666666] block">
                                expertise // nature
                              </span>
                              <h4 className="font-anton text-[24px] uppercase leading-none mt-1">
                                NATURE
                              </h4>
                            </div>
                            <div className="text-right">
                              <span className="font-anton text-[32px] leading-none text-black pr-1">
                                +12
                              </span>
                              <span className="font-jetbrains text-[10px] text-black align-super">
                                MOD
                              </span>
                            </div>
                          </div>
                          <p className="font-tinos text-[15px] leading-relaxed text-neutral-800">
                            <strong>Deep Swamp Botany & Silt Spores:</strong>{' '}
                            Charity understands the complex biological loops and
                            fungal pathways of Bleak Sough like the back of her
                            bark-scarred arm, cataloging silent toxic mists,
                            decay cycles, and predicting localized magical
                            leakages with pristine scientific and arcane
                            accuracy.
                          </p>
                        </div>
                        <div className="font-jetbrains text-[10px] uppercase text-black font-semibold mt-4 text-right bg-[#EAE6DF] inline-block self-end px-2 py-0.5">
                          [OUTLANDER BONUS] +12 (INT +0, EXPERTISE +12)
                        </div>
                      </div>

                      {/* SURVIVAL */}
                      <div className="brutalist-border bg-white p-4 flex flex-col justify-between hover:bg-[#FAF8F5] transition-all brutalist-shadow">
                        <div>
                          <div className="flex justify-between items-start border-b border-dashed border-black pb-2 mb-3">
                            <div>
                              <span className="font-jetbrains text-[10px] uppercase text-[#666666] block">
                                expertise // survival
                              </span>
                              <h4 className="font-anton text-[24px] uppercase leading-none mt-1">
                                SURVIVAL
                              </h4>
                            </div>
                            <div className="text-right">
                              <span className="font-anton text-[32px] leading-none text-black pr-1">
                                +12
                              </span>
                              <span className="font-jetbrains text-[10px] text-black align-super">
                                MOD
                              </span>
                            </div>
                          </div>
                          <p className="font-tinos text-[15px] leading-relaxed text-neutral-800">
                            <strong>Navigating Shifting Channels:</strong> Her
                            68-year tenure as an expert marsh navigator allows
                            her to track paths through ever-changing peat mires,
                            detect treacherous quicksilt, secure fresh
                            provisions from sulfur vents, and locate temporal
                            dryad clusters.
                          </p>
                        </div>
                        <div className="font-jetbrains text-[10px] uppercase text-black font-semibold mt-4 text-right bg-[#EAE6DF] inline-block self-end px-2 py-0.5">
                          [OUTLANDER BONUS] +12 (WIS +0, EXPERTISE +12)
                        </div>
                      </div>

                      {/* PERFORMANCE */}
                      <div className="brutalist-border bg-white p-4 flex flex-col justify-between hover:bg-[#FAF8F5] transition-all brutalist-shadow">
                        <div>
                          <div className="flex justify-between items-start border-b border-dashed border-black pb-2 mb-3">
                            <div>
                              <span className="font-jetbrains text-[10px] uppercase text-[#666666] block">
                                expertise // performance
                              </span>
                              <h4 className="font-anton text-[24px] uppercase leading-none mt-1">
                                PERFORMANCE
                              </h4>
                            </div>
                            <div className="text-right">
                              <span className="font-anton text-[32px] leading-none text-black pr-1">
                                +17
                              </span>
                              <span className="font-jetbrains text-[10px] text-green-700 align-super font-bold">
                                MAX
                              </span>
                            </div>
                          </div>
                          <p className="font-tinos text-[15px] leading-relaxed text-neutral-800">
                            <strong>
                              Eldritch Shanties & Coffee Cup Rhythms:
                            </strong>{' '}
                            Charity commands an unmatched acoustic repertoire of
                            traditional folklore and twilight melodies. She uses
                            her disposable cup as a percussion resonator and
                            performs Twilight Requiems to pacify ancient
                            marshlands and focus her wild sorcery.
                          </p>
                        </div>
                        <div className="font-jetbrains text-[10px] uppercase text-black font-semibold mt-4 text-right bg-[#EAE6DF] inline-block self-end px-2 py-0.5">
                          [BARD COLLEGE] +17 (CHA +5, EXPERTISE +12)
                        </div>
                      </div>

                      {/* STEALTH */}
                      <div className="brutalist-border bg-white p-4 flex flex-col justify-between hover:bg-[#FAF8F5] transition-all brutalist-shadow">
                        <div>
                          <div className="flex justify-between items-start border-b border-dashed border-black pb-2 mb-3">
                            <div>
                              <span className="font-jetbrains text-[10px] uppercase text-[#666666] block">
                                expertise // stealth
                              </span>
                              <h4 className="font-anton text-[24px] uppercase leading-none mt-1">
                                STEALTH
                              </h4>
                            </div>
                            <div className="text-right">
                              <span className="font-anton text-[32px] leading-none text-black pr-1">
                                +14
                              </span>
                              <span className="font-jetbrains text-[10px] text-black align-super">
                                MOD
                              </span>
                            </div>
                          </div>
                          <p className="font-tinos text-[15px] leading-relaxed text-neutral-800">
                            <strong>Vanishing into Peat Mists:</strong>{' '}
                            Deceptively silent, she slides her heavy waders and
                            protective gear through deep bottom mud without
                            disturbing the swamp surface, successfully vanishing
                            into thick reed banks, fog cover, and dense mangrove
                            shadows.
                          </p>
                        </div>
                        <div className="font-jetbrains text-[10px] uppercase text-black font-semibold mt-4 text-right bg-[#EAE6DF] inline-block self-end px-2 py-0.5">
                          [BARD TRAINING] +14 (DEX +2, EXPERTISE +12)
                        </div>
                      </div>

                      {/* ACROBATICS */}
                      <div className="brutalist-border bg-white p-4 flex flex-col justify-between hover:bg-[#FAF8F5] transition-all brutalist-shadow">
                        <div>
                          <div className="flex justify-between items-start border-b border-dashed border-black pb-2 mb-3">
                            <div>
                              <span className="font-jetbrains text-[10px] uppercase text-[#666666] block">
                                proficient // acrobatics
                              </span>
                              <h4 className="font-anton text-[24px] uppercase leading-none mt-1">
                                ACROBATICS
                              </h4>
                            </div>
                            <div className="text-right">
                              <span className="font-anton text-[28px] leading-none text-black pr-1">
                                +8
                              </span>
                              <span className="font-jetbrains text-[10px] text-black align-super">
                                MOD
                              </span>
                            </div>
                          </div>
                          <p className="font-tinos text-[15px] leading-relaxed text-neutral-800">
                            <strong>Marsh-Oak Root Balancing:</strong> Despite
                            her advanced age of 68 and extremely solid muscular
                            frame, her balance is unparalleled, letting her
                            sprint across moss-slick roots, dodge swamp gas
                            explosions, and traverse high hanging walkways.
                          </p>
                        </div>
                        <div className="font-jetbrains text-[10px] uppercase text-black font-semibold mt-4 text-right bg-[#EAE6DF] inline-block self-end px-2 py-0.5">
                          [BARD TRAINING] +8 (DEX +2, PROF +6)
                        </div>
                      </div>

                      {/* PERCEPTION */}
                      <div className="brutalist-border bg-white p-4 flex flex-col justify-between hover:bg-[#FAF8F5] transition-all brutalist-shadow">
                        <div>
                          <div className="flex justify-between items-start border-b border-dashed border-black pb-2 mb-3">
                            <div>
                              <span className="font-jetbrains text-[10px] uppercase text-[#666666] block">
                                proficient // perception
                              </span>
                              <h4 className="font-anton text-[24px] uppercase leading-none mt-1">
                                PERCEPTION
                              </h4>
                            </div>
                            <div className="text-right">
                              <span className="font-anton text-[28px] leading-none text-black pr-1">
                                +6
                              </span>
                              <span className="font-jetbrains text-[10px] text-black align-super">
                                MOD
                              </span>
                            </div>
                          </div>
                          <p className="font-tinos text-[15px] leading-relaxed text-neutral-800">
                            <strong>
                              Sensing Silt Pressure & Spirit Whispers:
                            </strong>{' '}
                            Her keen amber eyes spot tiny bubbles of escaping
                            gases in mud flats, perceive microscopic changes in
                            humidity, and discern the faintest musical hums from
                            elder wood-spirits miles away.
                          </p>
                        </div>
                        <div className="font-jetbrains text-[10px] uppercase text-black font-semibold mt-4 text-right bg-[#EAE6DF] inline-block self-end px-2 py-0.5">
                          [BARD TRAINING] +6 (WIS +0, PROF +6)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-[3px] border-black pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Saving Throws */}
                    <div className="brutalist-border bg-white p-4 hover:bg-[#FAF8F5] transition-all">
                      <p className="font-jetbrains text-[11px] font-bold uppercase border-b-2 border-black mb-2 pb-1 text-[#666]">
                        // SAVING THROWS REGISTER
                      </p>
                      <h5 className="font-anton text-[20px] uppercase text-black mb-1">
                        DEXTERITY (+8) & CHARISMA (+11)
                      </h5>
                      <p className="font-tinos text-[15px] text-gray-700 leading-relaxed">
                        Dexterity guards Charity against sudden geysers, swamp
                        cave-ins, and hostile sorcery, while her titanic
                        Charisma resists cosmic planar aligning, psychic dryad
                        manipulations, and raw eldritch corruptions.
                      </p>
                    </div>

                    {/* Tools */}
                    <div className="brutalist-border bg-white p-4 hover:bg-[#FAF8F5] transition-all">
                      <p className="font-jetbrains text-[11px] font-bold uppercase border-b-2 border-black mb-2 pb-1 text-[#666]">
                        // SWAMP TOOLS & TALISMANS
                      </p>
                      <h5 className="font-anton text-[20px] uppercase text-black mb-1">
                        Harmonica, Pan Flute, Cartographer's Tools
                      </h5>
                      <p className="font-tinos text-[15px] text-gray-700 leading-relaxed">
                        Features her swamp-tuned standard Harmonica for focuses,
                        her willow-wood Pan Flute to perform nature shanties,
                        and mapmaking compasses to draft the Bleak Sough's
                        shifting silt charts.
                      </p>
                    </div>

                    {/* Languages */}
                    <div className="brutalist-border bg-white p-4 hover:bg-[#FAF8F5] transition-all">
                      <p className="font-jetbrains text-[11px] font-bold uppercase border-b-2 border-black mb-2 pb-1 text-[#666]">
                        // LINGUISTIC ALIGNMENTS
                      </p>
                      <h5 className="font-anton text-[20px] uppercase text-black mb-1">
                        Elvish & Common (Silt-Trader Dialect)
                      </h5>
                      <p className="font-tinos text-[15px] text-gray-700 leading-relaxed">
                        Speaks standard trade Common seasoned with local marsh
                        guild jargon, alongside ancient Root-Elvish acquired
                        deep within primordial marshcanopies from elder dryads.
                      </p>
                    </div>

                    {/* Armor & Weapons */}
                    <div className="brutalist-border bg-white p-4 hover:bg-[#FAF8F5] transition-all">
                      <p className="font-jetbrains text-[11px] font-bold uppercase border-b-2 border-black mb-2 pb-1 text-[#666]">
                        // COMBAT OUTFITTING & ARMAMENT
                      </p>
                      <h5 className="font-anton text-[18px] uppercase text-black mb-1 leading-snug">
                        Light Armor | Simple, Longsword, Rapier & Crossbows
                      </h5>
                      <p className="font-tinos text-[15px] text-gray-700 leading-relaxed">
                        Dressed in heavily mud-proof gum waders and protective
                        insulation. Proficient with the Staff of Woodlands
                        (woodlands club), martial rapiers, and quick recurve
                        hand crossbows.
                      </p>
                    </div>
                  </div>

                  {/* Jack of All Trades Note */}
                  <div className="border-t-2 border-dashed border-black mt-6 pt-4 text-center">
                    <span className="font-jetbrains text-[11px] uppercase tracking-wider text-black bg-[#EAE6DF] px-3 py-1 font-bold">
                      * JACK OF ALL TRADES ACTIVE: HALF-PROFICIENCY (+3) APPLIED
                      TO ALL OTHER ABILITY SKILLS *
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Tracker Section */}
          <section className="mb-12">
            <div className="brutalist-border bg-white overflow-hidden brutalist-shadow">
              {/* Header black top bar */}
              <div className="bg-black text-[#E6E2D8] px-6 py-4 flex justify-between items-center border-b-[4px] border-black">
                <h3 className="font-anton text-[24px] uppercase tracking-wider text-white">
                  SKILLS
                </h3>
                <div
                  id="skills-max-ranks-wrapper"
                  className="flex items-center gap-3 bg-[#FAF8F5] border-2 border-black text-black px-3 py-1 font-jetbrains font-bold text-[12px] uppercase "
                >
                  <span>MAX RANKS</span>
                  <input
                    id="skills-max-ranks-input"
                    type="number"
                    value={maxRanks}
                    onChange={(e) =>
                      handleUpdateMaxRanks(
                        Math.max(0, parseInt(e.target.value) || 0),
                      )
                    }
                    className="w-10 bg-white border border-black text-center font-jetbrains font-bold text-[12px] p-0.5 focus:outline-none focus:ring-0 focus:border-black"
                  />
                </div>
              </div>

              {/* Table container */}
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[750px] border-collapse text-left font-jetbrains text-[12px] bg-[#FAF8F5]">
                  <thead>
                    <tr className="border-b-2 border-black bg-[#EAE6DF]/30">
                      <th className="py-3 px-3 font-jetbrains text-[10px] uppercase font-bold text-neutral-500 text-center w-[8%]">
                        CLASS
                      </th>
                      <th className="py-3 px-3 font-jetbrains text-[10px] uppercase font-bold text-neutral-500 text-left w-[24%]">
                        SKILL NAME
                      </th>
                      <th className="py-3 px-3 font-jetbrains text-[10px] uppercase font-bold text-neutral-500 text-center w-[12%]">
                        KEY ABILITY
                      </th>
                      <th className="py-3 px-3 font-jetbrains text-[10px] uppercase font-bold text-neutral-500 text-center w-[12%]">
                        SKILL MODIFIER
                      </th>
                      <th className="py-3 font-jetbrains text-[10px] text-center w-[2%]"></th>
                      <th className="py-3 px-3 font-jetbrains text-[10px] uppercase font-bold text-neutral-500 text-center w-[12%]">
                        ABILITY MODIFIER
                      </th>
                      <th className="py-3 font-jetbrains text-[10px] text-center w-[2%]"></th>
                      <th className="py-3 px-3 font-jetbrains text-[10px] uppercase font-bold text-neutral-500 text-center w-[11%]">
                        RANKS
                      </th>
                      <th className="py-3 font-jetbrains text-[10px] text-center w-[2%]"></th>
                      <th className="py-3 px-3 font-jetbrains text-[10px] uppercase font-bold text-neutral-500 text-center w-[11%]">
                        MISC MODIFIER
                      </th>
                      <th className="py-3 px-3 w-[4%] text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {skillsList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-black/5 transition-all">
                        <td className="py-2.5 px-3 text-center align-middle">
                          <button
                            id={`skill-class-btn-${idx}`}
                            type="button"
                            onClick={() =>
                              handleUpdateSkillRow(
                                idx,
                                'isClassSkill',
                                !item.isClassSkill,
                              )
                            }
                            className={`mx-auto h-5 w-5 border border-black flex items-center justify-center font-bold text-[11px] transition-all cursor-pointer ${
                              item.isClassSkill
                                ? 'bg-black text-[#FAF8F5]'
                                : 'bg-white text-transparent hover:bg-neutral-100'
                            }`}
                          >
                            ✓
                          </button>
                        </td>
                        <td className="py-2.5 px-3 align-middle">
                          <input
                            id={`skill-name-input-${idx}`}
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                              handleUpdateSkillRow(idx, 'name', e.target.value)
                            }
                            className="w-full bg-transparent border-0 p-0 font-jetbrains font-bold text-[13px] text-black focus:ring-0 focus:outline-none focus:border-b focus:border-black/30 placeholder-neutral-400"
                            placeholder="Skill name"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-center align-middle">
                          <input
                            id={`skill-ability-input-${idx}`}
                            type="text"
                            value={item.keyAbility}
                            onChange={(e) =>
                              handleUpdateSkillRow(
                                idx,
                                'keyAbility',
                                e.target.value.toUpperCase(),
                              )
                            }
                            className="w-16 mx-auto bg-transparent border-0 p-0 text-center font-jetbrains font-bold uppercase text-[12px] text-neutral-600 focus:ring-0 focus:outline-none"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-center align-middle">
                          <div
                            id={`skill-modifier-box-${idx}`}
                            className="w-14 h-8 mx-auto border border-black bg-white flex items-center justify-center font-jetbrains font-bold text-[13px] shadow-[1px_1px_0px_#000]"
                          >
                            {(item.abilityModifier || 0) +
                              (item.ranks || 0) +
                              (item.miscModifier || 0) >=
                            0
                              ? '+'
                              : ''}
                            {(item.abilityModifier || 0) +
                              (item.ranks || 0) +
                              (item.miscModifier || 0)}
                          </div>
                        </td>
                        <td className="py-2.5 text-center align-middle text-neutral-450 font-bold text-[14px]">
                          =
                        </td>
                        <td className="py-2.5 px-3 text-center align-middle">
                          <input
                            id={`skill-abmod-input-${idx}`}
                            type="number"
                            value={item.abilityModifier}
                            onChange={(e) =>
                              handleUpdateSkillRow(
                                idx,
                                'abilityModifier',
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="w-14 h-8 mx-auto bg-white border border-black text-center font-jetbrains font-bold text-[13px] text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                          />
                        </td>
                        <td className="py-2.5 text-center align-middle text-neutral-450 font-bold text-[14px]">
                          +
                        </td>
                        <td className="py-2.5 px-3 text-center align-middle">
                          <input
                            id={`skill-ranks-input-${idx}`}
                            type="number"
                            min="0"
                            max={maxRanks}
                            value={item.ranks}
                            onChange={(e) =>
                              handleUpdateSkillRow(
                                idx,
                                'ranks',
                                Math.min(
                                  maxRanks,
                                  Math.max(0, parseInt(e.target.value) || 0),
                                ),
                              )
                            }
                            className="w-14 h-8 mx-auto bg-white border border-black text-center font-jetbrains font-bold text-[13px] text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                          />
                        </td>
                        <td className="py-2.5 text-center align-middle text-neutral-450 font-bold text-[14px]">
                          +
                        </td>
                        <td className="py-2.5 px-3 text-center align-middle">
                          <input
                            id={`skill-misc-input-${idx}`}
                            type="number"
                            value={item.miscModifier}
                            onChange={(e) =>
                              handleUpdateSkillRow(
                                idx,
                                'miscModifier',
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="w-14 h-8 mx-auto bg-white border border-black text-center font-jetbrains font-bold text-[13px] text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-center align-middle">
                          <button
                            id={`skill-delete-btn-${idx}`}
                            type="button"
                            onClick={() => handleRemoveSkillRow(idx)}
                            className="text-neutral-400 hover:text-red-600 p-1 hover:bg-neutral-100 border border-transparent hover:border-black/20 rounded transition-all cursor-pointer"
                            title="Remove Skill Row"
                          >
                            <Trash2 className="h-3.5 w-3.5 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer bar with add button */}
              <div className="border-t border-black bg-[#FAF8F5] p-3 flex justify-between items-center">
                <span className="text-[10px] font-jetbrains text-neutral-500 uppercase tracking-widest font-semibold ml-2">
                  {skillsList.length} LOGGED SKILL entries
                </span>
                <button
                  id="skills-add-row-btn"
                  type="button"
                  onClick={handleAddSkillRow}
                  className="border border-black bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Add Skill Node
                </button>
              </div>
            </div>
          </section>

          {/* Capabilities Section */}
          <section className="mb-12">
            <div className="brutalist-border bg-white overflow-hidden brutalist-shadow">
              {/* Header block corresponding to dark black top bar */}
              <div className="bg-black text-[#E6E2D8] px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-[4px] border-black">
                <h3 className="font-anton text-[24px] uppercase tracking-wider text-white">
                  CAPABILITIES
                </h3>
                <span className="font-jetbrains text-[11px] uppercase tracking-widest text-neutral-400 font-bold mt-1 sm:mt-0">
                  TABLE_REF: TAL-99
                </span>
              </div>

              {/* Table Column Names */}
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[850px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#EAE6DF] border-b-2 border-black">
                      <th className="py-2.5 px-4 font-jetbrains text-[11px] font-bold uppercase text-black w-[15%]">
                        CATEGORY
                      </th>
                      <th className="py-2.5 px-4 font-jetbrains text-[11px] font-bold uppercase text-black w-[18%]">
                        SKILL AFFILIATION
                      </th>
                      <th className="py-2.5 px-4 font-jetbrains text-[11px] font-bold uppercase text-black w-[10%] text-center">
                        RANK
                      </th>
                      <th className="py-2.5 px-4 font-jetbrains text-[11px] font-bold uppercase text-black w-[42%]">
                        EFFECT / NARRATIVE MODIFIER
                      </th>
                      <th className="py-2.5 px-4 font-tinos text-[16px] italic text-black font-semibold text-right pr-6 w-[15%]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TALENTS_DATA.map((row, idx) => {
                      const splitIdx = row.effect.indexOf(':');
                      const prefix =
                        splitIdx !== -1
                          ? row.effect.substring(0, splitIdx)
                          : '';
                      const bodyText =
                        splitIdx !== -1
                          ? row.effect.substring(splitIdx + 1)
                          : row.effect;
                      const rollState = talentsRolls[idx];

                      return (
                        <tr
                          key={idx}
                          className="border-b border-[#D8D2C4] last:border-0 hover:bg-[#FAF8F5] transition-colors"
                        >
                          {/* CATEGORY */}
                          <td className="py-4 px-4 align-middle">
                            <span className="bg-[#EAE6DF] border border-black/15 text-black px-2.5 py-1 font-jetbrains text-[10px] font-bold tracking-wider uppercase ">
                              {row.category}
                            </span>
                          </td>

                          {/* SKILL AFFILIATION */}
                          <td className="py-4 px-4 align-middle">
                            <span className="font-jetbrains font-bold text-[12px] uppercase text-[#735A43] tracking-wide">
                              {row.skill}
                            </span>
                          </td>

                          {/* RANK */}
                          <td className="py-4 px-4 align-middle text-center font-bold">
                            <div className="inline-flex items-center justify-center bg-black text-[#E6E2D8] font-anton text-[14px] leading-none h-7 w-7 pb-0.5 ">
                              {row.rank}
                            </div>
                          </td>

                          {/* EFFECT / NARRATIVE MODIFIER */}
                          <td className="py-4 px-4 align-middle pr-8">
                            <p className="font-tinos text-[15px] leading-relaxed text-neutral-800">
                              {prefix && (
                                <strong className="font-sans font-bold uppercase text-[13px] tracking-wide text-neutral-900 border-r border-black/20 pr-1.5 mr-1.5">
                                  {prefix}
                                </strong>
                              )}
                              <span className="italic text-neutral-600">
                                {bodyText}
                              </span>
                            </p>
                          </td>

                          {/* ACTIONS */}
                          <td className="py-4 px-4 pr-6 align-middle text-right shrink-0">
                            {rollState ? (
                              <div className="inline-flex items-center gap-2">
                                {rollState.isRolling ? (
                                  <span className="font-jetbrains text-[9px] uppercase tracking-wider bg-black text-white px-2 py-1 flex items-center gap-1.5 animate-pulse">
                                    <RefreshCw className="h-2.5 w-2.5 animate-spin text-white" />
                                    ROLLING...
                                  </span>
                                ) : (
                                  <div className="inline-flex items-center gap-1.5">
                                    <span className="font-anton text-[15px] tracking-tight bg-green-700 text-white px-2 py-0.5 border border-black brutalist-shadow-xs animate-bounce">
                                      D20: {rollState.val} + {rollState.bonus} ={' '}
                                      {rollState.val + rollState.bonus}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleRollTalent(idx, row.rank)
                                      }
                                      className="border border-black p-1 hover:bg-neutral-100 bg-white cursor-pointer transition-colors"
                                      title="Re-roll"
                                    >
                                      <RefreshCw className="h-3 w-3 text-black" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => handleRollTalent(idx, row.rank)}
                                className="border border-black bg-black text-white px-3 py-1.5 font-jetbrains text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer hover:shadow-xs"
                              >
                                <Dices className="h-3.5 w-3.5 text-white" />
                                ROLL CHECK
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Resources */}
          <section className="mb-12">
            <SectionHeader title="Resources" />
            <div className="w-full">
              {/* Magic Config */}
              <div className="space-y-6">
                {spellcasting.sources.map((src, i) => (
                  <div key={i} className="brutalist-border p-6 bg-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-[4px] border-black pb-3 mb-6 gap-2">
                      <div>
                        <h3 className="font-anton text-[32px] uppercase leading-none">
                          {src.source}
                        </h3>
                        <span className="font-jetbrains text-[10px] uppercase text-[#666666] tracking-wider block mt-1 font-bold">
                          ACTIVE ARCANE FORMULAS & CANTATIONS
                        </span>
                      </div>
                      <span className="font-jetbrains text-[13px] bg-black text-[#E6E2D8] px-3 py-1 uppercase font-bold tracking-widest shrink-0">
                        CASTING ABILITY: {src.ability}
                      </span>
                    </div>

                    {/* Cantrips */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 border-b-2 border-black pb-1 mb-4">
                        <span className="w-2.5 h-2.5 bg-black rotate-45 block"></span>
                        <h4 className="font-jetbrains text-[12px] font-bold uppercase tracking-wider text-black">
                          Cantrips (At-Will Magic)
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {src.cantrips.map((spell) => {
                          const detail = SPELL_DETAILS[spell] || {
                            level: 'Cantrip',
                            desc: '',
                          };
                          return (
                            <div
                              key={spell}
                              className="brutalist-border p-3 bg-[#FAF8F5] flex flex-col justify-between hover:bg-white transition-all duration-150 brutalist-shadow-sm"
                            >
                              <div>
                                <div className="flex justify-between items-start border-b border-dashed border-gray-400 pb-1.5 mb-2">
                                  <span className="font-anton text-[16px] uppercase tracking-wide text-neutral-900">
                                    {spell}
                                  </span>
                                  <span className="font-jetbrains text-[9px] bg-black text-white px-1.5 py-0.5 uppercase tracking-widest font-bold">
                                    {detail.level}
                                  </span>
                                </div>
                                <p className="font-tinos text-[13px] leading-relaxed text-neutral-700">
                                  {detail.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Known Spells */}
                    <div>
                      <div className="flex items-center gap-2 border-b-2 border-black pb-1 mb-4">
                        <span className="w-2.5 h-2.5 bg-black rotate-45 block"></span>
                        <h4 className="font-jetbrains text-[12px] font-bold uppercase tracking-wider text-black">
                          Known Spells (Weaved Realities)
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {src.known_spells.map((spell) => {
                          const detail = SPELL_DETAILS[spell] || {
                            level: 'Spell',
                            desc: '',
                          };
                          return (
                            <div
                              key={spell}
                              className="brutalist-border p-3 bg-[#FAF8F5] flex flex-col justify-between hover:bg-white transition-all duration-150 brutalist-shadow-sm"
                            >
                              <div>
                                <div className="flex justify-between items-start border-b border-dashed border-gray-400 pb-1.5 mb-2 gap-2">
                                  <span className="font-anton text-[15px] uppercase tracking-wide text-neutral-900 leading-tight">
                                    {spell}
                                  </span>
                                  <span className="font-jetbrains text-[9px] bg-[#EAE6DF] text-black px-1.5 py-0.5 uppercase border border-black font-bold shrink-0">
                                    {detail.level}
                                  </span>
                                </div>
                                <p className="font-tinos text-[13px] leading-relaxed text-neutral-700">
                                  {detail.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Level Progression */}
          <section className="mb-12">
            <SectionHeader title="Development" />
            <div className="brutalist-border bg-white overflow-x-auto p-4 md:p-8">
              <div className="columns-1 md:columns-2 lg:columns-4 gap-4">
                {Object.entries(definition.levelProgression)
                  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                  .map(([lvl, details]: [string, any]) => (
                    <div
                      key={lvl}
                      className={`border-l-[4px] border-black pl-3 py-3 pr-2 bg-[#E6E2D8] brutalist-border break-inside-avoid mb-4 block w-full h-auto min-h-[120px] pb-3 ${parseInt(lvl) >= 14 ? 'opacity-40 grayscale' : ''}`}
                    >
                      <h4 className="font-anton text-[20px] uppercase border-b border-black mb-2 pb-0.5">
                        Level {lvl}: {details.class}
                      </h4>
                      {details.choices ? (
                        details.choices.map((c: any, idx: number) => (
                          <div
                            key={idx}
                            className="font-tinos text-[14px] leading-tight mb-2"
                          >
                            <span className="font-jetbrains text-[10px] font-bold uppercase block text-[#555]">
                              {c.type.replace(/_/g, ' ')}
                            </span>
                            {c.value && <span>{c.value}</span>}
                            {c.values && <span>{c.values.join(', ')}</span>}
                            {c.choice && c.choice.increases && (
                              <span>
                                {c.choice.increases
                                  .map(
                                    (inc: any) => `${inc.score} +${inc.value}`,
                                  )
                                  .join(', ')}
                              </span>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="font-tinos text-[14px] leading-tight mb-2">
                          <span className="font-jetbrains text-[10px] font-bold uppercase block text-[#555]">
                            CLASS TRAINING
                          </span>
                          <span>
                            Core Class progression & Hit Die accumulation
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Affiliations, Factions & Alignments */}
          <section className="mb-12">
            <SectionHeader title="Affiliations" />
            <div className="flex flex-col">
              <DossierBlock
                num="01"
                label="Contacts"
                value={contacts}
                onChange={handleUpdateContacts}
              />
              <DossierBlock
                num="02"
                label="Fractions"
                value={fractions}
                onChange={handleUpdateFractions}
              />
              <DossierBlock
                num="03"
                label="Desires"
                value={desires}
                onChange={handleUpdateDesires}
              />
              <DossierBlock
                num="04"
                label="Sacrifices"
                value={sacrifices}
                onChange={handleUpdateSacrifices}
              />
              <DossierBlock
                num="05"
                label="Atonements"
                value={atonements}
                onChange={handleUpdateAtonements}
              />
            </div>
          </section>

          {/* Inventory */}
          <section className="mb-12">
            <SectionHeader title="Inventory" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 border-[4px] border-black bg-white">
                <div className="bg-black text-[#E6E2D8] p-4 text-center">
                  <h3 className="font-anton text-[28px] uppercase">Wealth</h3>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-jetbrains text-[12px] font-bold">
                      PLATINUM
                    </p>
                    <p className="font-anton text-[24px]">{inv.currency.pp}</p>
                  </div>
                  <div>
                    <p className="font-jetbrains text-[12px] font-bold">GOLD</p>
                    <p className="font-anton text-[24px]">{inv.currency.gp}</p>
                  </div>
                  <div>
                    <p className="font-jetbrains text-[12px] font-bold">
                      SILVER
                    </p>
                    <p className="font-anton text-[24px]">{inv.currency.sp}</p>
                  </div>
                  <div>
                    <p className="font-jetbrains text-[12px] font-bold">
                      COPPER
                    </p>
                    <p className="font-anton text-[24px]">{inv.currency.cp}</p>
                  </div>
                </div>
                <div className="border-t-[2px] border-black p-4">
                  <h4 className="font-jetbrains text-[14px] font-bold uppercase mb-2 border-b border-black">
                    Active Loadout
                  </h4>
                  <p className="font-jetbrains text-[10px] font-bold uppercase text-gray-600 mt-2">
                    Main Hand
                  </p>
                  <p className="font-tinos text-[18px] font-bold">
                    {getItemName(inv.loadout.held.main_hand)}
                  </p>

                  <p className="font-jetbrains text-[10px] font-bold uppercase text-gray-600 mt-2">
                    Off Hand
                  </p>
                  <p className="font-tinos text-[18px] font-bold">
                    {getItemName(inv.loadout.held.off_hand)}
                  </p>

                  <p className="font-jetbrains text-[10px] font-bold uppercase text-gray-600 mt-4 border-b border-gray-400 pb-1 mb-2">
                    Worn Overlays
                  </p>
                  <ul className="flex flex-col gap-1.5 mb-2">
                    {inv.loadout.worn.map((id) => (
                      <li
                        key={id}
                        className="font-tinos text-[18px] font-bold text-black flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-black mr-2 inline-block"></span>
                        {getItemName(id)}
                      </li>
                    ))}
                  </ul>

                  <p className="font-jetbrains text-[10px] font-bold uppercase text-gray-600 mt-4 border-b border-gray-400 pb-1 mb-2">
                    Attuned Relics
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {inv.loadout.attuned_items.map((id) => (
                      <li
                        key={id}
                        className="font-tinos text-[18px] font-bold text-black flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-black mr-2 inline-block"></span>
                        {getItemName(id)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 brutalist-border p-6 bg-[#e2e2e2]">
                <h3 className="font-anton text-[28px] uppercase border-b border-black pb-2 mb-4">
                  Complete Manifesto of Belongings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {Object.entries(inv.items).map(
                    ([id, item]: [string, any]) => (
                      <div
                        key={id}
                        className="flex justify-between border-b border-dashed border-gray-400 py-1"
                      >
                        <span className="font-tinos text-[16px] uppercase">
                          {String(item.item_id).replace(/_/g, ' ')}
                        </span>
                        <span className="font-jetbrains text-[12px] font-bold">
                          x{item.quantity}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Weapons Systems Section */}
          <section className="mb-12">
            <SectionHeader title="Arsenal" />

            <div className="flex flex-col gap-8">
              {/* WEAPON SYSTEMS Box */}
              <div className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm">
                <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                  WEAPON_SYSTEMS
                </div>

                <div className="flex flex-col gap-8">
                  {weapons.map((w, idx) => {
                    const rollState = weaponRolls[idx];
                    return (
                      <div
                        key={idx}
                        className="border-b border-dashed border-black/40 last:border-0 pb-6 last:pb-0"
                      >
                        {/* Header within weapon profile */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-jetbrains text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
                            {w.label} — SPECIFICATIONS
                          </span>

                          {rollState ? (
                            <div className="flex items-center gap-1.5 selection:bg-black ">
                              {rollState.isRolling ? (
                                <span className="font-jetbrains text-[9px] uppercase tracking-wider bg-black text-white px-2 py-0.5 flex items-center gap-1.5 animate-pulse">
                                  <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                                  ROLLING...
                                </span>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <span className="font-anton text-[12px] tracking-wide bg-neutral-900 border border-black text-[#FAF8F5] px-2.5 py-0.5 brutalist-shadow-xs">
                                    ATK:{' '}
                                    {rollState.d20 +
                                      (parseInt(
                                        w.atk_bonus.replace(/[^\d+-]/g, ''),
                                        10,
                                      ) || 0)}{' '}
                                    (d20: {rollState.d20}) | DMG:{' '}
                                    {rollState.damageVal}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleRollWeapon(idx)}
                                    className="border border-black p-1 hover:bg-neutral-100 bg-white cursor-pointer transition-colors"
                                    title="Re-roll"
                                  >
                                    <RefreshCw className="h-2.5 w-2.5 text-black" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleRollWeapon(idx)}
                              className="border border-black bg-black text-[#FAF8F5] px-2 py-1 font-jetbrains text-[9px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Dices className="h-3 w-3 text-white" />
                              ROLL ATTACK
                            </button>
                          )}
                        </div>

                        {/* Interactive Grid inputs mimicking the image */}
                        <div className="grid grid-cols-12 gap-3">
                          {/* Row 1 */}
                          <div className="col-span-12 sm:col-span-6 md:col-span-5 flex flex-col justify-end">
                            <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                              {w.label}
                            </label>
                            <input
                              type="text"
                              value={w.name}
                              onChange={(e) =>
                                updateWeaponField(idx, 'name', e.target.value)
                              }
                              className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[12px] text-black focus:outline-none focus:ring-0"
                            />
                          </div>
                          <div className="col-span-4 sm:col-span-2 flex flex-col justify-end">
                            <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                              ATK_BONUS
                            </label>
                            <input
                              type="text"
                              value={w.atk_bonus}
                              onChange={(e) =>
                                updateWeaponField(
                                  idx,
                                  'atk_bonus',
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[12px] text-center text-black focus:outline-none"
                            />
                          </div>
                          <div className="col-span-5 sm:col-span-3 md:col-span-3 flex flex-col justify-end">
                            <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                              DAMAGE
                            </label>
                            <input
                              type="text"
                              value={w.damage}
                              onChange={(e) =>
                                updateWeaponField(idx, 'damage', e.target.value)
                              }
                              className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[12px] text-black focus:outline-none"
                            />
                          </div>
                          <div className="col-span-3 sm:col-span-2 md:col-span-2 flex flex-col justify-end">
                            <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                              CRITICAL
                            </label>
                            <input
                              type="text"
                              value={w.critical}
                              onChange={(e) =>
                                updateWeaponField(
                                  idx,
                                  'critical',
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[12px] text-center text-black focus:outline-none"
                            />
                          </div>

                          {/* Row 2 */}
                          <div className="col-span-4 sm:col-span-2 flex flex-col justify-end">
                            <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                              RANGE
                            </label>
                            <input
                              type="text"
                              value={w.range}
                              onChange={(e) =>
                                updateWeaponField(idx, 'range', e.target.value)
                              }
                              className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                            />
                          </div>
                          <div className="col-span-4 sm:col-span-2 flex flex-col justify-end">
                            <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                              WEIGHT
                            </label>
                            <input
                              type="text"
                              value={w.weight}
                              onChange={(e) =>
                                updateWeaponField(idx, 'weight', e.target.value)
                              }
                              className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                            />
                          </div>
                          <div className="col-span-4 sm:col-span-2 flex flex-col justify-end">
                            <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                              TYPE
                            </label>
                            <input
                              type="text"
                              value={w.type}
                              onChange={(e) =>
                                updateWeaponField(idx, 'type', e.target.value)
                              }
                              className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                            />
                          </div>
                          <div className="col-span-4 sm:col-span-2 flex flex-col justify-end">
                            <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                              SIZE
                            </label>
                            <input
                              type="text"
                              value={w.size}
                              onChange={(e) =>
                                updateWeaponField(idx, 'size', e.target.value)
                              }
                              className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                            />
                          </div>
                          <div className="col-span-8 sm:col-span-4 flex flex-col justify-end">
                            <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                              SPECIAL_PROPERTIES
                            </label>
                            <input
                              type="text"
                              value={w.special_properties}
                              onChange={(e) =>
                                updateWeaponField(
                                  idx,
                                  'special_properties',
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AMMO GRIDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* AMMO 1 */}
                <div className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-7 pb-4 brutalist-shadow-sm flex flex-col justify-between">
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-0.5 border border-black">
                    AMMO_1
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start w-full mt-2">
                    {/* Left side: Grid and controls */}
                    <div className="flex flex-col items-center shrink-0 border border-black/20 bg-black/[0.03] p-2 rounded-sm w-full sm:w-auto">
                      <div className="relative border-2 border-black bg-white inline-block">
                        <div className="flex">
                          {(() => {
                            const cols1 = Math.ceil(ammoTrackerSize1 / 2) || 1;
                            return Array.from({ length: cols1 }).map(
                              (_, colIdx) => {
                                const topIdx = colIdx;
                                const bottomIdx = colIdx + cols1;
                                const isLast = colIdx === cols1 - 1;
                                const hasThickBorder =
                                  (colIdx + 1) % 5 === 0 && !isLast;

                                return (
                                  <div
                                    key={colIdx}
                                    className={`flex flex-col ${isLast ? '' : 'border-r border-black/30'} ${
                                      hasThickBorder
                                        ? 'border-r-[2.5px] border-r-black'
                                        : ''
                                    }`}
                                  >
                                    {/* Top Cell */}
                                    {topIdx < ammoTrackerSize1 ? (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleToggleAmmo1(topIdx)
                                        }
                                        className={`h-3 w-3 sm:h-3.5 sm:w-3.5 border-b border-black/30 transition-colors cursor-pointer flex items-center justify-center font-jetbrains text-[9px] ${
                                          ammoTracker1[topIdx]
                                            ? 'bg-black text-white font-extrabold'
                                            : 'bg-transparent text-transparent hover:bg-neutral-150'
                                        }`}
                                        title={`Ammo 1 Slot ${topIdx + 1}`}
                                      >
                                        {ammoTracker1[topIdx] ? '•' : ''}
                                      </button>
                                    ) : (
                                      <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 border-b border-black/30 bg-neutral-205 " />
                                    )}

                                    {/* Bottom Cell */}
                                    {bottomIdx < ammoTrackerSize1 ? (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleToggleAmmo1(bottomIdx)
                                        }
                                        className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-colors cursor-pointer flex items-center justify-center font-jetbrains text-[9px] ${
                                          ammoTracker1[bottomIdx]
                                            ? 'bg-black text-white font-extrabold'
                                            : 'bg-transparent text-transparent hover:bg-neutral-150'
                                        }`}
                                        title={`Ammo 1 Slot ${bottomIdx + 1}`}
                                      >
                                        {ammoTracker1[bottomIdx] ? '•' : ''}
                                      </button>
                                    ) : (
                                      <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 bg-neutral-205 " />
                                    )}
                                  </div>
                                );
                              },
                            );
                          })()}
                        </div>
                      </div>

                      {/* Controls Under Grid */}
                      <div className="mt-2 w-full flex flex-col gap-1 text-[8px] font-jetbrains font-bold text-neutral-500 uppercase ">
                        <div className="flex items-center justify-between gap-1.5 border-b border-black/10 pb-0.5">
                          <span>
                            CAP:{' '}
                            <span className="text-black">
                              {ammoTrackerSize1}
                            </span>
                          </span>
                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                handleResizeAmmo1(ammoTrackerSize1 - 2)
                              }
                              className="px-0.5 border border-black/20 hover:border-black hover:bg-neutral-100 transition-all cursor-pointer font-bold"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleResizeAmmo1(ammoTrackerSize1 + 2)
                              }
                              className="px-0.5 border border-black/20 hover:border-black hover:bg-neutral-100 transition-all cursor-pointer font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between gap-1 pt-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateDBData((prev) => ({
                                ...prev,
                                ammoTracker1:
                                  Array(ammoTrackerSize1).fill(true),
                              }))
                            }
                            className="hover:text-black hover:underline cursor-pointer transition-all"
                          >
                            Fill
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateDBData((prev) => ({
                                ...prev,
                                ammoTracker1:
                                  Array(ammoTrackerSize1).fill(false),
                              }))
                            }
                            className="hover:text-black hover:underline cursor-pointer transition-all"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Inputs */}
                    <div className="flex-1 w-full flex flex-col gap-2.5">
                      {ammo.ammo1.map((val, lineIdx) => (
                        <div key={lineIdx} className="flex items-center gap-2">
                          <span className="font-jetbrains text-[9px] text-[#888] font-bold">
                            L{lineIdx + 1}:
                          </span>
                          <input
                            type="text"
                            value={val}
                            onChange={(e) =>
                              updateAmmoField('ammo1', lineIdx, e.target.value)
                            }
                            className="w-full bg-transparent border-0 border-b border-black/30 px-1 py-1 font-jetbrains font-bold text-[12px] text-black focus:border-b-2 focus:border-black focus:outline-none transition-colors"
                            placeholder="------------------------"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AMMO 2 */}
                <div className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-7 pb-4 brutalist-shadow-sm flex flex-col justify-between">
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-0.5 border border-black">
                    AMMO_2
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start w-full mt-2">
                    {/* Left side: Grid and controls */}
                    <div className="flex flex-col items-center shrink-0 border border-black/20 bg-black/[0.03] p-2 rounded-sm w-full sm:w-auto">
                      <div className="relative border-2 border-black bg-white inline-block">
                        <div className="flex">
                          {(() => {
                            const cols2 = Math.ceil(ammoTrackerSize2 / 2) || 1;
                            return Array.from({ length: cols2 }).map(
                              (_, colIdx) => {
                                const topIdx = colIdx;
                                const bottomIdx = colIdx + cols2;
                                const isLast = colIdx === cols2 - 1;
                                const hasThickBorder =
                                  (colIdx + 1) % 5 === 0 && !isLast;

                                return (
                                  <div
                                    key={colIdx}
                                    className={`flex flex-col ${isLast ? '' : 'border-r border-black/30'} ${
                                      hasThickBorder
                                        ? 'border-r-[2.5px] border-r-black'
                                        : ''
                                    }`}
                                  >
                                    {/* Top Cell */}
                                    {topIdx < ammoTrackerSize2 ? (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleToggleAmmo2(topIdx)
                                        }
                                        className={`h-3 w-3 sm:h-3.5 sm:w-3.5 border-b border-black/30 transition-colors cursor-pointer flex items-center justify-center font-jetbrains text-[9px] ${
                                          ammoTracker2[topIdx]
                                            ? 'bg-black text-white font-extrabold'
                                            : 'bg-transparent text-transparent hover:bg-neutral-155'
                                        }`}
                                        title={`Ammo 2 Slot ${topIdx + 1}`}
                                      >
                                        {ammoTracker2[topIdx] ? '•' : ''}
                                      </button>
                                    ) : (
                                      <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 border-b border-black/30 bg-neutral-205 " />
                                    )}

                                    {/* Bottom Cell */}
                                    {bottomIdx < ammoTrackerSize2 ? (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleToggleAmmo2(bottomIdx)
                                        }
                                        className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-colors cursor-pointer flex items-center justify-center font-jetbrains text-[9px] ${
                                          ammoTracker2[bottomIdx]
                                            ? 'bg-black text-white font-extrabold'
                                            : 'bg-transparent text-transparent hover:bg-neutral-155'
                                        }`}
                                        title={`Ammo 2 Slot ${bottomIdx + 1}`}
                                      >
                                        {ammoTracker2[bottomIdx] ? '•' : ''}
                                      </button>
                                    ) : (
                                      <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 bg-neutral-205 " />
                                    )}
                                  </div>
                                );
                              },
                            );
                          })()}
                        </div>
                      </div>

                      {/* Controls Under Grid */}
                      <div className="mt-2 w-full flex flex-col gap-1 text-[8px] font-jetbrains font-bold text-neutral-500 uppercase ">
                        <div className="flex items-center justify-between gap-1.5 border-b border-black/10 pb-0.5">
                          <span>
                            CAP:{' '}
                            <span className="text-black">
                              {ammoTrackerSize2}
                            </span>
                          </span>
                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                handleResizeAmmo2(ammoTrackerSize2 - 2)
                              }
                              className="px-0.5 border border-black/20 hover:border-black hover:bg-neutral-100 transition-all cursor-pointer font-bold"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleResizeAmmo2(ammoTrackerSize2 + 2)
                              }
                              className="px-0.5 border border-black/20 hover:border-black hover:bg-neutral-100 transition-all cursor-pointer font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between gap-1 pt-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateDBData((prev) => ({
                                ...prev,
                                ammoTracker2:
                                  Array(ammoTrackerSize2).fill(true),
                              }))
                            }
                            className="hover:text-black hover:underline cursor-pointer transition-all"
                          >
                            Fill
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateDBData((prev) => ({
                                ...prev,
                                ammoTracker2:
                                  Array(ammoTrackerSize2).fill(false),
                              }))
                            }
                            className="hover:text-black hover:underline cursor-pointer transition-all"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Inputs */}
                    <div className="flex-1 w-full flex flex-col gap-2.5">
                      {ammo.ammo2.map((val, lineIdx) => (
                        <div key={lineIdx} className="flex items-center gap-2">
                          <span className="font-jetbrains text-[9px] text-[#888] font-bold">
                            L{lineIdx + 1}:
                          </span>
                          <input
                            type="text"
                            value={val}
                            onChange={(e) =>
                              updateAmmoField('ammo2', lineIdx, e.target.value)
                            }
                            className="w-full bg-transparent border-0 border-b border-black/30 px-1 py-1 font-jetbrains font-bold text-[12px] text-black focus:border-b-2 focus:border-black focus:outline-none transition-colors"
                            placeholder="------------------------"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Armor Outfitting Section */}
          <section className="mb-12">
            <SectionHeader title="Outfitting" />

            <div className="flex flex-col gap-8">
              {/* ARMOR_PIECES */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ARMOR_PIECE_1 */}
                <div className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm flex flex-col justify-between">
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                    ARMOR_PIECE_1
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    {/* Row 1 */}
                    <div className="col-span-12 sm:col-span-8 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        ARMOR ITEM
                      </label>
                      <input
                        type="text"
                        value={armor1.name}
                        onChange={(e) =>
                          updateArmor1Field('name', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[12px] text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-4 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        LOCATION
                      </label>
                      <input
                        type="text"
                        value={armor1.location || ''}
                        onChange={(e) =>
                          updateArmor1Field('location', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">
                        TYPE
                      </label>
                      <input
                        type="text"
                        value={armor1.type}
                        onChange={(e) =>
                          updateArmor1Field('type', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        EQUIP_BONUS
                      </label>
                      <input
                        type="text"
                        value={armor1.equip_bonus}
                        onChange={(e) =>
                          updateArmor1Field('equip_bonus', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-4 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        PROFICIENT?
                      </label>
                      <div className="flex items-center gap-3 h-[30px] bg-white border border-black px-2 ">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <span className="font-jetbrains text-[9px] font-bold text-black pb-0.5">
                            Y
                          </span>
                          <button
                            type="button"
                            onClick={() => updateArmor1Field('proficient', 'Y')}
                            className={`h-4 w-4 border border-black flex items-center justify-center font-bold text-[10px] cursor-pointer ${armor1.proficient === 'Y' ? 'bg-black text-[#FAF8F5]' : 'bg-white text-transparent'}`}
                          >
                            ✓
                          </button>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <span className="font-jetbrains text-[9px] font-bold text-black pb-0.5">
                            N
                          </span>
                          <button
                            type="button"
                            onClick={() => updateArmor1Field('proficient', 'N')}
                            className={`h-4 w-4 border border-black flex items-center justify-center font-bold text-[10px] cursor-pointer ${armor1.proficient === 'N' ? 'bg-black text-[#FAF8F5]' : 'bg-white text-transparent'}`}
                          >
                            ✓
                          </button>
                        </label>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        PENALTY
                      </label>
                      <input
                        type="text"
                        value={armor1.penalty}
                        onChange={(e) =>
                          updateArmor1Field('penalty', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        WEIGHT
                      </label>
                      <input
                        type="text"
                        value={armor1.weight}
                        onChange={(e) =>
                          updateArmor1Field('weight', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        SPEED
                      </label>
                      <input
                        type="text"
                        value={armor1.speed}
                        onChange={(e) =>
                          updateArmor1Field('speed', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        SIZE
                      </label>
                      <input
                        type="text"
                        value={armor1.size}
                        onChange={(e) =>
                          updateArmor1Field('size', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        MAX_DEX
                      </label>
                      <input
                        type="text"
                        value={armor1.max_dex}
                        onChange={(e) =>
                          updateArmor1Field('max_dex', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-9 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        SPECIAL_PROPERTIES
                      </label>
                      <input
                        type="text"
                        value={armor1.special_properties}
                        onChange={(e) =>
                          updateArmor1Field(
                            'special_properties',
                            e.target.value,
                          )
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ARMOR_PIECE_2 */}
                <div className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm flex flex-col justify-between">
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                    ARMOR_PIECE_2
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    {/* Row 1 */}
                    <div className="col-span-12 sm:col-span-8 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        ARMOR ITEM
                      </label>
                      <input
                        type="text"
                        value={armor2.name}
                        onChange={(e) =>
                          updateArmor2Field('name', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[12px] text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-4 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        LOCATION
                      </label>
                      <input
                        type="text"
                        value={armor2.location || ''}
                        onChange={(e) =>
                          updateArmor2Field('location', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">
                        TYPE
                      </label>
                      <input
                        type="text"
                        value={armor2.type}
                        onChange={(e) =>
                          updateArmor2Field('type', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        EQUIP_BONUS
                      </label>
                      <input
                        type="text"
                        value={armor2.equip_bonus}
                        onChange={(e) =>
                          updateArmor2Field('equip_bonus', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-4 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        PROFICIENT?
                      </label>
                      <div className="flex items-center gap-3 h-[30px] bg-white border border-black px-2 ">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <span className="font-jetbrains text-[9px] font-bold text-black pb-0.5">
                            Y
                          </span>
                          <button
                            type="button"
                            onClick={() => updateArmor2Field('proficient', 'Y')}
                            className={`h-4 w-4 border border-black flex items-center justify-center font-bold text-[10px] cursor-pointer ${armor2.proficient === 'Y' ? 'bg-black text-[#FAF8F5]' : 'bg-white text-transparent'}`}
                          >
                            ✓
                          </button>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <span className="font-jetbrains text-[9px] font-bold text-black pb-0.5">
                            N
                          </span>
                          <button
                            type="button"
                            onClick={() => updateArmor2Field('proficient', 'N')}
                            className={`h-4 w-4 border border-black flex items-center justify-center font-bold text-[10px] cursor-pointer ${armor2.proficient === 'N' ? 'bg-black text-[#FAF8F5]' : 'bg-white text-transparent'}`}
                          >
                            ✓
                          </button>
                        </label>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        PENALTY
                      </label>
                      <input
                        type="text"
                        value={armor2.penalty}
                        onChange={(e) =>
                          updateArmor2Field('penalty', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        WEIGHT
                      </label>
                      <input
                        type="text"
                        value={armor2.weight}
                        onChange={(e) =>
                          updateArmor2Field('weight', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        SPEED
                      </label>
                      <input
                        type="text"
                        value={armor2.speed}
                        onChange={(e) =>
                          updateArmor2Field('speed', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        SIZE
                      </label>
                      <input
                        type="text"
                        value={armor2.size}
                        onChange={(e) =>
                          updateArmor2Field('size', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        MAX_DEX
                      </label>
                      <input
                        type="text"
                        value={armor2.max_dex}
                        onChange={(e) =>
                          updateArmor2Field('max_dex', e.target.value)
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-center text-black focus:outline-none"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-9 flex flex-col justify-end">
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        SPECIAL_PROPERTIES
                      </label>
                      <input
                        type="text"
                        value={armor2.special_properties}
                        onChange={(e) =>
                          updateArmor2Field(
                            'special_properties',
                            e.target.value,
                          )
                        }
                        className="w-full bg-white border border-black px-2 py-1 font-jetbrains font-bold text-[11px] text-black focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* VITAL RECORDS & FAMILY HISTORY */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* VITAL RECORDS */}
                <div
                  id="vital-records-dossier"
                  className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm"
                >
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                    VITAL_RECORDS
                  </div>

                  <div className="flex flex-col gap-4 mt-2">
                    <div>
                      <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">
                        PLACE OF BIRTH
                      </label>
                      <input
                        type="text"
                        value={vitalRecords.placeOfBirth}
                        onChange={(e) =>
                          handleUpdateVitalRecords(
                            'placeOfBirth',
                            e.target.value,
                          )
                        }
                        className="w-full bg-white border border-black px-2 py-1.5 font-jetbrains font-bold text-[12px] text-black focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">
                          DATE OF BIRTH
                        </label>
                        <input
                          type="text"
                          value={vitalRecords.dateOfBirth}
                          onChange={(e) =>
                            handleUpdateVitalRecords(
                              'dateOfBirth',
                              e.target.value,
                            )
                          }
                          className="w-full bg-white border border-black px-2 py-1.5 font-jetbrains font-bold text-[12px] text-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1 block">
                          EMPLOYER / AFFILIATION
                        </label>
                        <input
                          type="text"
                          value={vitalRecords.employerAffiliation}
                          onChange={(e) =>
                            handleUpdateVitalRecords(
                              'employerAffiliation',
                              e.target.value,
                            )
                          }
                          className="w-full bg-white border border-black px-2 py-1.5 font-jetbrains font-bold text-[12px] text-black focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAMILY HISTORY */}
                <div
                  id="family-history-dossier"
                  className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm flex flex-col justify-between"
                >
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                    FAMILY_HISTORY
                  </div>

                  <div className="flex flex-col h-full mt-2">
                    <textarea
                      value={familyHistory}
                      onChange={(e) =>
                        handleUpdateFamilyHistory(e.target.value)
                      }
                      className="flex-1 w-full bg-transparent border-0 font-tinos text-[14px] leading-relaxed text-black/80 focus:ring-0 focus:outline-none resize-y min-h-[165px] placeholder-neutral-400"
                      placeholder="Log historical details here..."
                    />
                    <div className="text-[7.5px] font-mono text-neutral-400 uppercase tracking-wider text-right border-t border-dashed border-black/10 pt-1.5">
                      AUTHORIZED ACCESS ONLY
                    </div>
                  </div>
                </div>
              </div>

              {/* ASSETS & ACTION SUMMARY */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ASSETS & EQUIPMENT */}
                <div
                  id="assets-equipment-dossier"
                  className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm flex flex-col justify-between"
                >
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                    ASSETS_&_EQUIPMENT
                  </div>

                  <div className="flex flex-col gap-5 mt-2">
                    <div>
                      <div className="font-jetbrains text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        STANDARD OF LIVING
                      </div>
                      <input
                        type="text"
                        value={assetsEquipment.standardOfLiving}
                        onChange={(e) =>
                          handleUpdateAssetsEquipment(
                            'standardOfLiving',
                            e.target.value,
                          )
                        }
                        className="w-full bg-transparent border-0 border-b border-black font-jetbrains font-bold text-[13px] text-black py-0.5 focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="font-jetbrains text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">
                        MONTHLY INCOME
                      </div>
                      <input
                        type="text"
                        value={assetsEquipment.monthlyIncome}
                        onChange={(e) =>
                          handleUpdateAssetsEquipment(
                            'monthlyIncome',
                            e.target.value,
                          )
                        }
                        className="w-full bg-transparent border-0 border-b border-black font-jetbrains font-bold text-[13px] text-black py-0.5 focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div className="border-b border-dotted border-black/40 my-1"></div>

                    <div>
                      <div className="font-jetbrains text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        PROPERTY LIST
                      </div>
                      <textarea
                        value={assetsEquipment.propertyList}
                        onChange={(e) =>
                          handleUpdateAssetsEquipment(
                            'propertyList',
                            e.target.value,
                          )
                        }
                        className="w-full bg-transparent border-0 font-jetbrains leading-relaxed text-[12px] text-black focus:ring-0 focus:outline-none resize-y min-h-[95px] placeholder-neutral-400"
                        placeholder="• Item 1&#10;• Item 2..."
                      />
                    </div>
                  </div>
                </div>

                {/* ACTION SUMMARY */}
                <div
                  id="action-summary-dossier"
                  className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm flex flex-col justify-between"
                >
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                    ACTION_SUMMARY
                  </div>

                  <div className="flex flex-col h-full mt-2 justify-between">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-jetbrains text-[12px]">
                        <thead>
                          <tr className="border-b-2 border-black text-[10px] font-bold text-neutral-500">
                            <th className="py-1">BASIC ACTION</th>
                            <th className="py-1 text-right">TYPE</th>
                            <th className="py-1 w-8"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {actionSummary.map((item, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-black/10 last:border-0 hover:bg-black/5"
                            >
                              <td className="py-1.5 pr-2">
                                <input
                                  type="text"
                                  value={item.action}
                                  onChange={(e) =>
                                    handleUpdateActionSummary(
                                      idx,
                                      'action',
                                      e.target.value,
                                    )
                                  }
                                  className="w-full bg-transparent border-0 p-0 font-jetbrains font-bold text-[12px] focus:ring-0 focus:outline-none"
                                />
                              </td>
                              <td className="py-1.5 text-right font-bold w-32">
                                <input
                                  type="text"
                                  value={item.type}
                                  onChange={(e) =>
                                    handleUpdateActionSummary(
                                      idx,
                                      'type',
                                      e.target.value,
                                    )
                                  }
                                  className="w-full bg-transparent border-0 p-0 text-right font-jetbrains font-bold text-[12px] focus:ring-0 focus:outline-none"
                                />
                              </td>
                              <td className="py-1.5 text-right w-8">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveActionSummaryRow(idx)
                                  }
                                  className="text-neutral-400 hover:text-black cursor-pointer p-0.5"
                                  title="Remove action"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddActionSummaryRow}
                      className="mt-4 border border-black border-dashed py-1 text-center font-jetbrains text-[10px] font-bold uppercase hover:bg-neutral-100 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-3 w-3" />
                      Add Action Row
                    </button>
                  </div>
                </div>
              </div>

              {/* MENTAL DIAGNOSTICS & SUPPLY METRICS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* MENTAL DIAGNOSTICS */}
                <div
                  id="mental-diagnostics-dossier"
                  className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm"
                >
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase flex items-center gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    MENTAL_DIAGNOSTICS
                  </div>

                  <div className="flex flex-col gap-6 mt-2">
                    {/* Insanity Points Block */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-jetbrains text-[10px] font-bold tracking-wider text-black">
                          INSANITY POINTS
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-jetbrains">
                          <span className="text-neutral-500 font-bold uppercase ">
                            CURRENT:
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={mentalDiagnostics.insanityPoints}
                            onChange={(e) =>
                              handleUpdateMentalDiagnostics(
                                'insanityPoints',
                                Math.min(
                                  10,
                                  Math.max(0, parseInt(e.target.value) || 0),
                                ),
                              )
                            }
                            className="w-10 bg-white border border-black px-1 py-0.5 text-center font-jetbrains font-bold text-[11px] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from({ length: 10 }).map((_, i) => {
                            const active = i < mentalDiagnostics.insanityPoints;
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() =>
                                  handleUpdateMentalDiagnostics(
                                    'insanityPoints',
                                    active ? i : i + 1,
                                  )
                                }
                                className={`h-4.5 w-4.5 rounded-full border border-black transition-colors ${active ? 'bg-[#EA580C]' : 'bg-white hover:bg-neutral-100'}`}
                                title={`Set Insanity Points to ${i + 1}`}
                              />
                            );
                          })}
                        </div>
                        <div className="text-center font-jetbrains text-[8px] text-neutral-400 pb-1 tracking-widest uppercase">
                          ... MAX 10 ...
                        </div>
                      </div>
                    </div>

                    {/* Corruption Points Block */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-jetbrains text-[10px] font-bold tracking-wider text-black">
                          CORRUPTION POINTS
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-jetbrains">
                          <span className="text-neutral-500 font-bold uppercase ">
                            CURRENT:
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={mentalDiagnostics.corruptionPoints}
                            onChange={(e) =>
                              handleUpdateMentalDiagnostics(
                                'corruptionPoints',
                                Math.min(
                                  10,
                                  Math.max(0, parseInt(e.target.value) || 0),
                                ),
                              )
                            }
                            className="w-10 bg-white border border-black px-1 py-0.5 text-center font-jetbrains font-bold text-[11px] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from({ length: 10 }).map((_, i) => {
                            const active =
                              i < mentalDiagnostics.corruptionPoints;
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() =>
                                  handleUpdateMentalDiagnostics(
                                    'corruptionPoints',
                                    active ? i : i + 1,
                                  )
                                }
                                className={`h-4.5 w-4.5 rounded-full border border-black transition-colors ${active ? 'bg-[#EA580C]' : 'bg-white hover:bg-neutral-100'}`}
                                title={`Set Corruption Points to ${i + 1}`}
                              />
                            );
                          })}
                        </div>
                        <div className="text-center font-jetbrains text-[8px] text-neutral-400 pb-1 tracking-widest uppercase">
                          ... MAX 10 ...
                        </div>
                      </div>
                    </div>

                    {/* Synchronicity Points Block */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-jetbrains text-[10px] font-bold tracking-wider text-black">
                          SYNCHRONICITY POINTS
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-jetbrains">
                          <span className="text-neutral-500 font-bold uppercase ">
                            CURRENT:
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={mentalDiagnostics.synchronicityPoints}
                            onChange={(e) =>
                              handleUpdateMentalDiagnostics(
                                'synchronicityPoints',
                                Math.min(
                                  10,
                                  Math.max(0, parseInt(e.target.value) || 0),
                                ),
                              )
                            }
                            className="w-10 bg-white border border-black px-1 py-0.5 text-center font-jetbrains font-bold text-[11px] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from({ length: 10 }).map((_, i) => {
                            const active =
                              i < mentalDiagnostics.synchronicityPoints;
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() =>
                                  handleUpdateMentalDiagnostics(
                                    'synchronicityPoints',
                                    active ? i : i + 1,
                                  )
                                }
                                className={`h-4.5 w-4.5 rounded-full border border-black transition-colors ${active ? 'bg-[#EA580C]' : 'bg-white hover:bg-neutral-100'}`}
                                title={`Set Synchronicity Points to ${i + 1}`}
                              />
                            );
                          })}
                        </div>
                        <div className="text-center font-jetbrains text-[8px] text-neutral-400 pb-1 tracking-widest uppercase">
                          ... MAX 10 ...
                        </div>
                      </div>
                    </div>

                    {/* Inspiration Points Block */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-jetbrains text-[10px] font-bold tracking-wider text-black">
                          INSPIRATION POINTS
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-jetbrains">
                          <span className="text-neutral-500 font-bold uppercase ">
                            CURRENT:
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={mentalDiagnostics.inspirationPoints}
                            onChange={(e) =>
                              handleUpdateMentalDiagnostics(
                                'inspirationPoints',
                                Math.min(
                                  10,
                                  Math.max(0, parseInt(e.target.value) || 0),
                                ),
                              )
                            }
                            className="w-10 bg-white border border-black px-1 py-0.5 text-center font-jetbrains font-bold text-[11px] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap gap-1.5">
                          {Array.from({ length: 10 }).map((_, i) => {
                            const active =
                              i < mentalDiagnostics.inspirationPoints;
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() =>
                                  handleUpdateMentalDiagnostics(
                                    'inspirationPoints',
                                    active ? i : i + 1,
                                  )
                                }
                                className={`h-4.5 w-4.5 rounded-full border border-black transition-colors ${active ? 'bg-[#EA580C]' : 'bg-white hover:bg-neutral-100'}`}
                                title={`Set Inspiration Points to ${i + 1}`}
                              />
                            );
                          })}
                        </div>
                        <div className="text-center font-jetbrains text-[8px] text-neutral-400 pb-1 tracking-widest uppercase">
                          ... MAX 10 ...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SUPPLY METRICS */}
                <div
                  id="supply-metrics-dossier"
                  className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm flex flex-col justify-between"
                >
                  <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                    SUPPLY_METRICS
                  </div>

                  <div className="flex flex-col gap-5 mt-2">
                    {/* Water/Wine (Wineskins) */}
                    <div>
                      <div className="font-jetbrains text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        WATER / WINE (WINESKINS)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {supplyMetrics.waterWine.map((val, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              handleUpdateSupplyMetrics('waterWine', idx, !val)
                            }
                            className={`h-6.5 w-6.5 border-2 border-black flex items-center justify-center font-serif text-[12px] font-bold transition-all cursor-pointer ${
                              val
                                ? 'bg-[#EA580C] text-black font-extrabold'
                                : 'bg-white text-transparent hover:bg-neutral-100'
                            }`}
                          >
                            ✕
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rations (Days) */}
                    <div>
                      <div className="font-jetbrains text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        RATIONS (DAYS)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {supplyMetrics.rations.map((val, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              handleUpdateSupplyMetrics('rations', idx, !val)
                            }
                            className={`h-6.5 w-6.5 border-2 border-black flex items-center justify-center font-serif text-[12px] font-bold transition-all cursor-pointer ${
                              val
                                ? 'bg-[#EA580C] text-black font-extrabold'
                                : 'bg-white text-transparent hover:bg-neutral-100'
                            }`}
                          >
                            ✕
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Feed (Mounts/Animals) */}
                    <div>
                      <div className="font-jetbrains text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        FEED (MOUNTS/ANIMALS)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {supplyMetrics.feed.map((val, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              handleUpdateSupplyMetrics('feed', idx, !val)
                            }
                            className={`h-6.5 w-6.5 border-2 border-black flex items-center justify-center font-serif text-[12px] font-bold transition-all cursor-pointer ${
                              val
                                ? 'bg-[#EA580C] text-black font-extrabold'
                                : 'bg-white text-transparent hover:bg-neutral-100'
                            }`}
                          >
                            ✕
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Stabilizers / Antibiotics (Doses) */}
                    <div>
                      <div className="font-jetbrains text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        STABILIZERS / ANTIBIOTICS (DOSES)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(supplyMetrics.stabilizersAntibiotics || []).map(
                          (val, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() =>
                                handleUpdateSupplyMetrics(
                                  'stabilizersAntibiotics',
                                  idx,
                                  !val,
                                )
                              }
                              className={`h-6.5 w-6.5 border-2 border-black flex items-center justify-center font-serif text-[12px] font-bold transition-all cursor-pointer ${
                                val
                                  ? 'bg-[#EA580C] text-black font-extrabold'
                                  : 'bg-white text-transparent hover:bg-neutral-100'
                              }`}
                            >
                              ✕
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Bio-Oil / Hydrocarbons (Liters) */}
                    <div>
                      <div className="font-jetbrains text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        BIO-OIL / HYDROCARBONS (LITERS)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(supplyMetrics.bioOilHydrocarbons || []).map(
                          (val, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() =>
                                handleUpdateSupplyMetrics(
                                  'bioOilHydrocarbons',
                                  idx,
                                  !val,
                                )
                              }
                              className={`h-6.5 w-6.5 border-2 border-black flex items-center justify-center font-serif text-[12px] font-bold transition-all cursor-pointer ${
                                val
                                  ? 'bg-[#EA580C] text-black font-extrabold'
                                  : 'bg-white text-transparent hover:bg-neutral-100'
                              }`}
                            >
                              ✕
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Welding Slag / Scrap (KG) */}
                    <div>
                      <div className="font-jetbrains text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                        WELDING SLAG / SCRAP (KG)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(supplyMetrics.weldingSlagScrap || []).map(
                          (val, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() =>
                                handleUpdateSupplyMetrics(
                                  'weldingSlagScrap',
                                  idx,
                                  !val,
                                )
                              }
                              className={`h-6.5 w-6.5 border-2 border-black flex items-center justify-center font-serif text-[12px] font-bold transition-all cursor-pointer ${
                                val
                                  ? 'bg-[#EA580C] text-black font-extrabold'
                                  : 'bg-white text-transparent hover:bg-neutral-100'
                              }`}
                            >
                              ✕
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* INDEPENDENT MANIFESTATIONS & MUTATIONS DOSSIER */}
              <div
                id="manifestations-dossier"
                className="mt-8 relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm"
              >
                <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  MANIFESTATIONS_&_MUTATIONS
                </div>
                <div className="mt-2">
                  <div className="border border-black bg-white p-3">
                    <div className="font-jetbrains text-[8px] font-bold text-neutral-500 uppercase tracking-widest mb-1 pb-1 border-b border-black font-semibold">
                      SUBJECT_MANIFESTATIONS
                    </div>
                    <textarea
                      value={manifestations}
                      onChange={(e) =>
                        handleUpdateManifestations(e.target.value)
                      }
                      className="w-full bg-transparent border-0 font-jetbrains text-[11px] text-black focus:ring-0 focus:outline-none resize-y min-h-[80px] placeholder-neutral-400"
                      placeholder="Log disorders, psychic feedback, or physical mutations here..."
                    />
                  </div>
                </div>
              </div>

              {/* OPERATIVE NOTES [RESTRICTED] */}
              <div
                id="operative-notes-dossier"
                className="relative border-2 border-black bg-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm flex flex-col"
              >
                <div className="absolute -top-[12px] left-4 bg-black text-[#FAF8F5] font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                  OPERATIVE_NOTES_[RESTRICTED]
                </div>

                <div className="mt-2 text-black">
                  {isEditingNotes ? (
                    <div className="flex flex-col gap-3">
                      <textarea
                        value={operativeNotes}
                        onChange={(e) =>
                          handleUpdateOperativeNotes(e.target.value)
                        }
                        className="w-full bg-white border border-black p-3 font-tinos text-[14px] leading-relaxed text-black focus:ring-0 focus:outline-none resize-y min-h-[220px]"
                        placeholder="Log classified records here..."
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setIsEditingNotes(false)}
                          className="border border-black bg-black text-[#FAF8F5] font-jetbrains text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          Lock and Seal Archive
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="font-tinos text-[15px] leading-relaxed text-black/90 columns-1 md:columns-2 gap-10 whitespace-pre-line">
                        {operativeNotes}
                      </div>
                      <div className="flex justify-between items-center border-t border-dashed border-black/20 pt-3">
                        <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest">
                          CLASSIFIED DATA STREAM // LEVEL_4_SECURITY
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsEditingNotes(true)}
                          className="border border-black bg-white hover:bg-neutral-100 text-black font-jetbrains text-[9px] font-bold uppercase tracking-wider px-2 py-1 transition-colors cursor-pointer"
                        >
                          Declassify & Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* EXPENDITURES DOSSIER */}
              <div
                id="expenditures-dossier"
                className="mt-8 relative border-2 border-black bg-black text-[#FAF8F5] px-4 pt-8 pb-5 brutalist-shadow-sm flex flex-col"
              >
                <div className="absolute -top-[12px] left-4 bg-white text-black font-jetbrains text-[10px] font-bold tracking-widest px-3 py-1 border border-black uppercase">
                  CURRENT_EXPENDITURES
                </div>
                <div className="mt-2 text-[#FAF8F5]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-neutral-800 bg-neutral-900 p-4">
                      <p className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] border-b border-neutral-700 mb-3 pb-1 text-neutral-400">
                        Class Resources
                      </p>
                      <div className="space-y-1.5">
                        {Object.entries(currentState.usedResources).map(
                          ([res, used]) => (
                            <div
                              key={res}
                              className="flex justify-between font-tinos text-[16px] border-b border-dashed border-neutral-800"
                            >
                              <span>{res}</span>
                              <span className="font-bold text-[#EA580C]">
                                {used} Used
                              </span>
                            </div>
                          ),
                        )}
                        <div className="flex justify-between font-tinos text-[16px] border-b border-dashed border-neutral-800 pt-1">
                          <span>Hit Dice (d8)</span>
                          <span className="font-bold text-[#EA580C]">
                            {currentState.usedHitDice.d8} Used
                          </span>
                        </div>
                        <div className="flex justify-between font-tinos text-[16px] border-b border-dashed border-neutral-800">
                          <span>Hit Dice (d6)</span>
                          <span className="font-bold text-[#EA580C]">
                            {currentState.usedHitDice.d6} Used
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-neutral-800 bg-neutral-900 p-4 flex flex-col justify-between">
                      <div>
                        <p className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] border-b border-neutral-700 mb-3 pb-1 text-neutral-400">
                          Death Saves
                        </p>
                        <div className="space-y-1.5 pb-3">
                          <div className="flex justify-between font-tinos text-[16px] border-b border-dashed border-neutral-800">
                            <span>Successes</span>
                            <span className="font-bold text-[#EA580C]">
                              {currentState.deathSaves.successes}
                            </span>
                          </div>
                          <div className="flex justify-between font-tinos text-[16px] border-b border-dashed border-neutral-800">
                            <span>Failures</span>
                            <span className="font-bold text-[#EA580C]">
                              {currentState.deathSaves.failures}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] border-b border-neutral-700 mb-2 pb-1 text-neutral-400 mt-2">
                          Active Effects
                        </p>
                        <p className="font-tinos text-[16px] bg-neutral-800 p-2 border border-neutral-700 text-[#EA580C] font-semibold">
                          {currentState.activeEffects.length
                            ? currentState.activeEffects.join(', ')
                            : 'None'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="border border-neutral-800 bg-neutral-900 p-4">
                      <p className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] border-b border-neutral-700 mb-3 pb-1 text-neutral-400">
                        Spell Slots Used
                      </p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                        {Object.entries(currentState.usedSpellSlots).map(
                          ([lvl, used]) => (
                            <div
                              key={lvl}
                              className="flex justify-between font-tinos text-[15px] border-b border-dashed border-neutral-800"
                            >
                              <span className="uppercase text-neutral-300">
                                LVL {lvl.split('_')[1]}
                              </span>
                              <span className="font-bold text-[#EA580C]">
                                {used}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="border border-neutral-800 bg-neutral-900 p-4">
                      <p className="font-jetbrains text-[12px] font-bold uppercase tracking-[0.1em] border-b border-neutral-700 mb-3 pb-1 text-neutral-400">
                        Item Charges Used
                      </p>
                      <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                        {Object.entries(currentState.usedItemCharges).map(
                          ([id, used]) => (
                            <div
                              key={id}
                              className="flex justify-between font-tinos text-[15px] border-b border-dashed border-neutral-800"
                            >
                              <span className="uppercase text-neutral-300">
                                {getItemName(id)}
                              </span>
                              <span className="font-bold text-[#EA580C]">
                                {used}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Metadata */}
          <section className="brutalist-border p-4 bg-black text-gray-400 font-jetbrains text-[10px] uppercase flex flex-col md:flex-row justify-between break-all gap-4">
            <div>
              <p>CHARACTER ID: {meta.character_id}</p>
              <p>USER ID: {meta.user_id}</p>
            </div>
            <div className="md:text-center">
              <p>SCHEMA VERSION: {meta.schemaVersion}</p>
              <p>ACTIVE SOURCES: {meta.active_sources.join(', ')}</p>
            </div>
            <div className="md:text-right">
              <p>CREATED: {meta.createdAt}</p>
              <p>UPDATED: {meta.updatedAt}</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
