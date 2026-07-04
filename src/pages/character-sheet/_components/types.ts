/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Meta {
  character_id: string;
  user_id: string;
  schemaVersion: string;
  active_sources: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Identity {
  name: string;
  alignment: string;
  background: string;
  species: string;
}

export interface Description {
  age: number;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
  nationality?: string;
}

export interface Personality {
  traits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  familyHistory?: string;
}

export interface LevelProgressionChoice {
  type: string;
  values?: string[];
  value?: string;
  choice?: {
    type: string;
    increases?: Array<{ score: string; value: number }>;
  };
}

export interface LevelProgressionItem {
  class: string;
  choices?: LevelProgressionChoice[];
}

export interface AbilityScores {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
}

export interface MagicScores {
  FORC: string;
  FRIC: string;
  SPED: string;
  MASS: string;
  BEIN: string;
  CTRL: string;
  RSLV: string;
  WITS: string;
  TUDE: string;
  VIZN: string;
  POST: string;
  STYL: string;
  KOUD: string;
  GRIT: string;
  BYTE: string;
  FLOW: string;
}

export interface AbilityScoreGeneration {
  method: string;
  scores: AbilityScores;
  magicScores?: MagicScores;
}

export interface Definition {
  abilityScoreGeneration: AbilityScoreGeneration;
  progression: { [key: string]: LevelProgressionItem };
}

export interface ProficiencySkill {
  name: string;
  source: string;
  modifier: string;
}

export interface DetailedSkill {
  isClassSkill: boolean;
  name: string;
  keyAbility: string;
  modifier: number;
  abilityMod: number;
  ranks: number;
  miscMod: number;
}

export interface Proficiencies {
  skills: ProficiencySkill[];
  detailedSkills?: DetailedSkill[];
  saving_throws: string[];
  armor: string[];
  weapons: string[];
  tools: string[];
  languages: string[];
  loreCards?: LoreProficiencyCard[];
  loreRegisters?: LoreRegisters;
}

export interface SpellcastingSource {
  source: string;
  ability: string;
  cantrips: string[];
  known_spells: string[];
}

export interface Spellcasting {
  sources: SpellcastingSource[];
}

export interface UsedHitDice {
  [key: string]: number;
}

export interface DeathSaves {
  successes: number;
  failures: number;
}

export interface UsedSpellSlots {
  level_1: number;
  level_2: number;
  level_3: number;
  level_4: number;
  level_5: number;
  level_6: number;
  level_7: number;
  level_8: number;
  level_9: number;
}

export interface InventoryCurrency {
  cp: number;
  sp: number;
  gp: number;
  pp: number;
}

export interface InventoryItem {
  item_id: string;
  quantity: number;
  contents?: string[];
}

export interface Loadout {
  worn: string[];
  held: {
    main_hand: string;
    off_hand: string;
  };
  attuned_items: string[];
}

export interface Inventory {
  currency: InventoryCurrency;
  items: { [key: string]: InventoryItem };
  loadout: Loadout;
}

export interface CurrentState {
  xp: number;
  currentHp: number;
  temporaryHp: number;
  usedHitDice: UsedHitDice;
  deathSaves: DeathSaves;
  conditions: string[];
  exhaustionLevel: number;
  inspiration: boolean;
  activeEffects: string[];
  usedResources: { [key: string]: number };
  usedSpellSlots: UsedSpellSlots;
  usedItemCharges: { [key: string]: number };
  inventory: Inventory;
}

export interface VitalRecords {
  gender: string;
  placeOfBirth: string;
  dateOfBirth: string;
  employerAffiliation: string;
  nationality?: string;
}

export interface CharacterRecord {
  meta: Meta;
  identity: Identity;
  description: Description;
  personality: Personality;
  vitalRecords?: VitalRecords;
  notes: string;
  definition: Definition;
  proficiencies: Proficiencies;
  spellcasting: Spellcasting;
  current: CurrentState;
  capabilities?: Capability[];
  registries?: RegistryNode[];
  arsenal?: Arsenal;
  outfitting?: OutfittingPiece[];
  psychology?: PsychologySection;
  is_custom?: boolean;
}

export interface Capability {
  category: string;
  skillAffiliation: string;
  rank: number;
  effectName: string;
  effectDescription: string;
}

export interface RegistryItem {
  title: string;
  description: string;
}

export interface RegistryNode {
  nodeId: string;
  title: string;
  items: RegistryItem[];
}

export interface ArsenalWeapon {
  weaponId: string;
  name: string;
  atkBonus: string;
  damage: string;
  critical: string;
  range: string;
  weight: string;
  type: string;
  size: string;
  specialProperties: string;
  narrativeLore?: string;
}

export interface ArsenalAmmo {
  ammoId: string;
  label: string;
  capacity: number;
  currentCount: number;
  lines: string[];
}

export interface Arsenal {
  weapons: ArsenalWeapon[];
  ammunition: ArsenalAmmo[];
}

export interface OutfittingPiece {
  pieceId: string;
  name: string;
  location: string;
  type: string;
  equipBonus: string;
  isProficient: boolean;
  penalty: string;
  weight: string;
  speed: string;
  size: string;
  maxDex: string;
  specialProperties: string;
  narrativeLore?: string;
}

export interface LoreProficiencyCard {
  cardId: string;
  type: string;
  skillName: string;
  modifier: string;
  subtitle: string;
  description: string;
  footer: string;
}

export interface LoreRegisters {
  savingThrowsHeader: string;
  savingThrowsText: string;
  toolsHeader: string;
  toolsText: string;
  languagesHeader: string;
  languagesText: string;
  combatHeader: string;
  combatText: string;
}

export interface MentalDiagnosticTracker {
  insanity: number;
  corruption: number;
  synchronicity: number;
  inspiration: number;
}

export interface SupplyMetricTracker {
  waterWine: number;
  rations: number;
  feed: number;
  stabilizers: number;
  bioOil: number;
  weldingSlag: number;
}

export interface OperativeNotes {
  column1: string;
  column2: string;
}

export interface ActionRow {
  actionId: string;
  name: string;
  type: string;
}

export interface PsychologySection {
  diagnostics: MentalDiagnosticTracker;
  supplies: SupplyMetricTracker;
  manifestations: string;
  operativeNotes: OperativeNotes;
  actions?: ActionRow[];
}
