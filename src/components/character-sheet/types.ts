export interface Talent {
  id: string;
  category: string; // HOMELAND, ARCHETYPE, NATURE, BLOODLINE, EDUCATION, CUSTOM, etc.
  skillAffiliation: string;
  rank: number | string;
  effect: string;
}

export interface Character {
  id: string;
  name: string;
  expTotal: number;
  expSpent: number;
  ageAndGender: string;
  caste: string;
  archetype: string;
  education: string;
  homeland: string;
  languages: string;
  appearance: string;
  warStory: string;
  quote: string;
  fortuneCurrent: number;
  fortuneMax: number;
  renown: number;
  standing: number;
  fatigue: string;
  portraitUrl: string;
  bannerUrl: string;
  talents: Talent[];
  isCustom?: boolean;
}

export interface RollLog {
  id: string;
  timestamp: string;
  characterName: string;
  label: string;
  expression: string; // e.g. "2d20", "1d20 + 2", "Damage with Re-roll"
  rolls: number[];
  modifier: number;
  resultText: string;
  flavor?: string;
}
