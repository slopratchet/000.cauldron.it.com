export enum MagicSchool {
  EVOCATION = 'Evocation',
  ABJURATION = 'Abjuration',
  CONJURATION = 'Conjuration',
  TRANSMUTATION = 'Transmutation',
  DIVINATION = 'Divination',
  ENCHANTMENT = 'Enchantment',
}

export type LogStatus = 'normal' | 'warning' | 'error';

export interface Coordinates {
  x: number; // percentage width
  y: number; // percentage height
  label: string;
}

export interface Incantation {
  id: string; // e.g. "I-740921-A"
  code: string; // e.g. "G-14"
  school: MagicSchool;
  section: string; // e.g. "1.0", "2.0"
  temporalMark: string; // e.g. "21 SEP 1974"
  dateUnix: number; // for sorting
  description: string;
  status: LogStatus;
  resonance: number; // 1-100 score
  deployments: number;
  errorsFound: number;
  coordinates: Coordinates;
  operator: string;
  pylonRef: string;
  harmonicIndex: number; // Hz feedback
}

export interface Statistics {
  totalDeployments: number;
  totalSchools: number;
  totalResonance: number;
  totalErrors: number;
}
