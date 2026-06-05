export interface ManualItem {
  id: string;
  title: string;
  page: number;
  indent?: boolean;
  content: string; // The rich story, lore, or rule text
  sectionId: string;
}

export interface ManualSection {
  id: string;
  deckLabel: string;
  title: string;
  chapterLabel?: string;
  page: number;
  items: ManualItem[];
}

export type ActiveScreen = 'index' | 'reader' | 'character' | 'dice';

export interface DiceResult {
  dice: number[];
  successes: number;
  difficulty: number;
  difficultyMet: boolean;
  timestamp: string;
}
