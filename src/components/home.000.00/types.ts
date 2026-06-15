export interface GameWorld {
  id: string;
  title: string;
  subtitle: string;
  category: 'sci-fi' | 'fantasy' | 'horror';
  description: string;
  expandedLore: string;
  coverUrl: string;
  price: number;
  highlightColor: string;
  accentColor: string;
  badge: string;
  features: string[];
}

export interface CharacterSeat {
  id: string;
  role: string;
  status: 'AVAILABLE' | 'DECEASED' | 'INSANE' | 'CORRUPTED' | 'RESERVED';
  price: number;
  spec: string;
  avatarColor: string;
  characterBio: string;
}

export interface StreamComment {
  id: string;
  author: string;
  text: string;
  rolledPoints?: number;
  role?: string;
  avatarColor: string;
}

export interface CommunityForumPost {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  snippet: string;
}
