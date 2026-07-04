export interface IdentityData {
  name: string;
  title: string;
  tagline: string;
  quote: string;
  portraits: string[];
  reserveButtonText: string;
  reservationOptions: string[];
  embraceButtonText: string;
}

export interface LoreData {
  sectionHeader: string;
  paragraphs: string[];
  quoteBlock: string;
}

export interface HighlightItem {
  title: string;
  description: string;
}

export interface StatItem {
  abbr: string;
  value: number;
  detail: string;
}

export interface TechnicalDossierData {
  level: number;
  class: string;
  archetype: string;
  stats: StatItem[];
}

export interface TacticalInsightData {
  title: string;
  quote: string;
  author: string;
}

export interface ReviewsData {
  tagline: string;
  rating: string;
  count: string;
}

export interface CampaignDatabaseSchema {
  identity: IdentityData;
  lore: LoreData;
  highlights: HighlightItem[];
  technicalDossier: TechnicalDossierData;
  tacticalInsight: TacticalInsightData;
  reviews: ReviewsData;
}
