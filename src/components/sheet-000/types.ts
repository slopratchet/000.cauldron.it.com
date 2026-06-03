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
}

export interface Personality {
  traits: string;
  ideals: string;
  bonds: string;
  flaws: string;
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

export interface AbilityScoreGeneration {
  method: string;
  scores: AbilityScores;
}

export interface Definition {
  abilityScoreGeneration: AbilityScoreGeneration;
  levelProgression: { [key: string]: LevelProgressionItem };
}

export interface ProficiencySkill {
  name: string;
  source: string;
  modifier: string;
}

export interface Proficiencies {
  skills: ProficiencySkill[];
  saving_throws: string[];
  armor: string[];
  weapons: string[];
  tools: string[];
  languages: string[];
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

export interface CharacterRecord {
  meta: Meta;
  identity: Identity;
  description: Description;
  personality: Personality;
  notes: string;
  definition: Definition;
  proficiencies: Proficiencies;
  spellcasting: Spellcasting;
  currentState: CurrentState;
  is_custom?: boolean;
}
