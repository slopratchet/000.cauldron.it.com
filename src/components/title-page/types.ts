/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Subclass {
  id: string;
  name: string;
  description: string;
  source: string;
  classType: string;
  specialFeature: string;
}

export interface Spell {
  id: string;
  name: string;
  level: string;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
}

export interface Monster {
  id: string;
  name: string;
  type: string;
  hp: number;
  ac: number;
  cr: string;
  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  description: string;
}

export interface MagicItem {
  id: string;
  name: string;
  rarity: string;
  type: string;
  description: string;
  properties: string[];
}

export interface ArchivalIndexNode {
  id: string;
  label: string;
  url: string;
  enabled: boolean;
  description?: string;
}

export interface PreOrderData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  quantity: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  orderId: string;
  timestamp: string;
  includePrintedWorldBook?: boolean;
}
