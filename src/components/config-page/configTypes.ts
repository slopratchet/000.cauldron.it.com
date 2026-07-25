export interface MainContentVisibility {
  campaign_setting: boolean;
  grimoire_of_campaigns: boolean;
  adventures_of_the_void: boolean;
  ancient_encounters: boolean;
  navigation_tabs: boolean;
}

export type EntryType = 'class' | 'spell' | 'beast' | 'relic';

export interface GameAction {
  name: string;
  formula: string; // e.g. "2d10 + 4", "1d6", "1d20 + 5"
  description: string;
}

export interface Encounter {
  id: string;
  name: string;
  status: 'cleared' | 'in progress' | 'pending' | string;
}

export interface Adventure {
  id: string;
  name: string;
  statusBadge?: 'active' | 'completed' | 'in progress' | string;
  clearedEncounters: number;
  totalEncounters: number;
  encounters: Encounter[];
}

export interface TomeEntry {
  id: string;
  type: EntryType;
  name: string;
  description: string;
  imageUrl?: string;
  pageRef: string;
  // Specific attributes depending on the type
  level?: string; // Spells (e.g., "LVL: III")
  cr?: string; // Beasts (e.g., "CR: 12")
  rarity?: string; // Relics (e.g., "RARITY: ARCHEO")
  flavorText?: string;
  expandedLore?: string;
  actions?: GameAction[];
  isCustom?: boolean; // True if scribed via Gemini AI
  // Hierarchy & session age attributes (from design update)
  isWorld?: boolean;
  parentWorldId?: string;
  statusBadge?: string; // e.g. 'source world' | 'running'
  sessionAge?: string; // e.g. 'Session running for 3 days 11 hrs'
  iconType?: string; // e.g. 'skull' | 'flask' | 'bone'
  // Dynamic customizable labels
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  countdownTimerLabel?: string;
  // 4-tier hierarchy extensions: Adventures & Encounters
  adventures?: Adventure[];
  encounters?: Encounter[];
  clearedEncounters?: number;
  totalEncounters?: number;
}
