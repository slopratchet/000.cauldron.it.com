/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenType = 'HOME' | 'FAQ' | 'CAST' | 'TOUR';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  highlightWords?: string[];
  portalLink?: string;
}

export interface CharacterClass {
  name: string;
  description: string;
  baseHp: number;
  perD20Multiplier: number;
  abilities: {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
  };
  specialMove: string;
}

export interface PlayerCharacter {
  name: string;
  classType: string;
  hp: number;
  stats: {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
  };
  backstory: string;
  signatureSpell: string;
  diceRollsHistory: number[];
}

export interface CastMember {
  id: string;
  name: string;
  role: string;
  title: string;
  hp: number;
  maxHp: number;
  stats: {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
  };
  signatureAbility: string;
  quote: string;
  bio: string;
  woodcutImg: string; // fallback illustration URL or SVGs
}

export interface TourDate {
  id: string;
  city: string;
  venue: string;
  dateStr: string;
  status: 'SOLD OUT' | 'SEATS OPEN' | 'LIMITED';
  capacityPercentage: number;
  ticketPrice: number;
}
