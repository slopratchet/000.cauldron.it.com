export interface Chapter {
  name: string;
  content: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  isNew: boolean;
  type: 'rulebook' | 'adventure';
  coverUrl: string;
  description: string;
  chapters: Chapter[];
  refCode: string;
  metaDetails: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'system' | 'roll' | 'combat' | 'command';
  message: string;
  detail?: string;
}

export interface PlayerCharacter {
  id: string;
  name: string;
  class: string;
  level: number;
  hpCurrent: number;
  hpMax: number;
  ac: number;
  status: string;
  avatarUrl: string;
}

export interface CanonTarget {
  id: string;
  targetLabel: string;
  title: string;
  pages: string;
  quote: string;
  refCode: string;
  clearance: string;
  isSelected?: boolean;
}
