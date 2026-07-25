export interface BlogPostAnnouncement {
  id: string;
  title: string;
  date: string;
  category: 'PATCH NOTES' | 'ANNOUNCEMENT' | 'FIELD REPORT' | 'DEV LOG';
  author: string;
  summary: string;
  content: string;
  pinned?: boolean;
}

export interface Watch {
  id: string;
  ref: string;
  name: string;
  tagline: string;
  description: string;
  figNum: string;
  image: string;
  category: 'Classic' | 'Professional' | 'Watches by Theme';
  specs: {
    caseDiameter: string;
    material: string;
    waterResistance: string;
    movement: string;
    powerReserve: string;
    bezel: string;
    dial: string;
    strap: string;
  };
  details: string[];
  announcements?: BlogPostAnnouncement[];
  disabled?: boolean;
  visible?: boolean;
  enabled?: boolean;
  marqueeSpeedSeconds?: number;
  marqueeImageHeightPx?: number;
  marqueeDirection?: 'left' | 'right';
  hexPatternStyle?: string;
  configureCampaignUrl?: string;
  saveUrl?: string;
  exploreSettingUrl?: string;
  exploreSettingsUrl?: string;
}

export interface CustomConfig {
  watchId: string;
  watchName: string;
  caseMaterial: string;
  dialColor: string;
  bezelStyle: string;
  strapType: string;
}

export interface SavedConfig extends CustomConfig {
  id: string;
  createdAt: string;
}
