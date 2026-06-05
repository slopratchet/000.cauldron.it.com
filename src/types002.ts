export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  notes: string;
  status: 'ACTIVE' | 'DECEASED' | 'MIA' | 'CLASSIFIED';
  avatarUrl?: string;
}

export interface ScriptLine {
  id: string;
  type: 'action' | 'dialogue' | 'heading' | 'alert';
  characterName?: string;
  text: string;
  parenthetical?: string;
}

export interface SceneObjective {
  id: string;
  text: string;
  checked: boolean;
  isCritical?: boolean;
}

export interface Operation {
  id: string;
  title: string;
  location: string;
  time: string;
  target: string;
  clearanceLevel: string;
  objectives: SceneObjective[];
  characters: Character[];
  scriptLines: ScriptLine[];
  metadataCode: string;
}
