/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AdventureMeta {
  adventure_id: string;
  title: string;
  authors: string[];
  schemaVersion: string;
  design_philosophy: string;
  system: string;
  character_levels: string;
}

export interface DynamicFilter {
  target_entity: string;
  replacement_entity: string;
  text_scrub_array: string[];
}

export interface SafetyAndAccessibility {
  content_warnings: string[];
  dynamic_filters: {
    [key: string]: DynamicFilter;
  };
}

export interface Theme {
  core_concept: string;
  moral_question: string;
  mood: string;
}

export interface Beat {
  name: string;
  linked_scene: string;
}

export interface StoryBeats {
  paradigm: string;
  beats: {
    [key: string]: Beat;
  };
}

export interface Narrative {
  synopsis: string;
  dramatis_personae: {
    [key: string]: string;
  };
  story_beats: StoryBeats;
}

export interface QuestSubNode {
  id: string;
  objective: string;
  state: 'locked' | 'active' | 'completed';
  xp_reward?: number;
}

export interface QuestStage {
  objective: string;
  state: 'locked' | 'active' | 'completed';
  trigger_start: string;
  sub_nodes?: QuestSubNode[];
  xp_reward?: number;
}

export interface MainQuest {
  id: string;
  title: string;
  stages: {
    [key: string]: QuestStage;
  };
}

export interface Journal {
  main_quest: MainQuest;
}

export interface BackgroundHook {
  linked_secret: string;
  bonus: string;
  location?: string;
}

export interface PartyIntegration {
  background_hooks: {
    [key: string]: BackgroundHook;
  };
}

export interface CelestialBody {
  name: string;
  current_phase: string;
  mechanical_impact: string;
}

export interface DailyCycle {
  dawn: string;
  dusk: string;
  on_dawn: {
    action: string;
    proc_id: string;
  };
  on_dusk: {
    action: string;
    proc_id: string;
  };
}

export interface Chronology {
  calendar_system: string;
  celestial_bodies: CelestialBody[];
  daily_cycle: DailyCycle;
  day_of_week?: string;
  month?: string;
  year?: number;
}

export interface Secret {
  id: string;
  truth: string;
  clues_required: number;
  clue_locations: string[];
  xp_reward?: number;
}

export interface LoreWeb {
  secrets: {
    [key: string]: Secret;
  };
}

export interface Complication {
  condition: string;
  action: string;
  proc_id: string;
}

export interface PoolMechanic {
  max_dice: number;
  die_type: string;
  triggers_to_add_die: string[];
  triggers_to_roll_pool: string[];
  on_roll_complication: Complication;
}

export interface SubComplication {
  name: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

export interface ComplicationCategory {
  category_name: string;
  description: string;
  sub_complications: SubComplication[];
}

export interface TensionEngine {
  pool_mechanic: PoolMechanic;
  categories?: ComplicationCategory[];
}

export interface Soundscape {
  asset_path: string;
  loop: boolean;
}

export interface LightingState {
  ambient_light: string;
  fog_of_war: boolean;
  directional_light?: string;
  intensity: number;
  // Dynamic VTT climate engine integration
  vtt_temperature_c?: number;
  grid_interference_pct?: number;
  chromatic_dispersion_index?: string;
  climate_phenomenon?: string;
}

export interface VfxState {
  asset_path: string;
  density: number;
}

export interface EnvironmentGroup {
  name: string;
  description: string;
  soundscape_id: string;
  lighting_id: string;
  vfx_id: string;
}

export interface AudioVisualCues {
  soundscapes: {
    [key: string]: Soundscape;
  };
  lighting_states: {
    [key: string]: LightingState;
  };
  vfx_states: {
    [key: string]: VfxState;
  };
  environment_groups?: {
    [key: string]: EnvironmentGroup;
  };
}

export interface Monster {
  name: string;
  base_stat_block: string;
  hp: number;
  size: string;
  default_vfx: string;
  locations?: string[];
  xp_reward?: number;
}

export interface Npc {
  name: string;
  location?: string;
  roleplaying: {
    ideal: string;
    flaw: string;
  };
}

export interface Item {
  name: string;
  type: string;
  properties: string;
  location?: string;
  xp_reward?: number;
}

export interface Entities {
  monsters: {
    [key: string]: Monster;
  };
  npcs: {
    [key: string]: Npc;
  };
  items: {
    [key: string]: Item;
  };
}

export interface TableEntry {
  roll: number;
  name: string;
  script_id: string;
}

export interface RollTable {
  name: string;
  roll_type: string;
  auto_trigger: {
    type: string;
    event_name: string;
    condition: string;
  };
  entries: TableEntry[];
}

export interface Handout {
  id: string;
  type: string;
  content: string;
}

export interface HexMapPlacement {
  q: number;
  r: number;
  s: number;
  layer: number;
  scale_miles?: number;
  scale_ft?: number;
  terrain_override: string;
  runic_wind?: string;
  etheric_pressure?: string;
  relative_humidity?: string;
  spectral_density?: string;
  acoustic_echo?: string;
}

export interface ScreenplaySlugline {
  text: string;
  vtt_automation: {
    lighting?: string;
    sfx?: string;
    vfx?: string;
  };
}

export interface ScreenplayBlock {
  type:
    | 'action_line'
    | 'vtt_animation'
    | 'character'
    | 'parenthetical'
    | 'dialogue';
  text?: string;
  target_id?: string;
  animation_clip?: string;
  name?: string;
}

export interface Screenplay {
  id: string;
  name: string;
  slugline: ScreenplaySlugline;
  screenplay_blocks: ScreenplayBlock[];
}

export interface DialogueNodeOption {
  text: string;
  next_node: string;
  trigger_script?: string;
  speaking_intent?: string;
}

export interface DialogueNode {
  npc_text: string;
  player_options: DialogueNodeOption[];
  speaking_intent?: string;
}

export interface DialogueTree {
  id: string;
  nodes: {
    [key: string]: DialogueNode;
  };
}

export interface Definitions {
  entities: Entities;
  tables: {
    [key: string]: RollTable;
  };
  handouts: {
    [key: string]: Handout;
  };
  hexmaps: {
    [key: string]: HexMapPlacement;
  };
  screenplays: {
    [key: string]: Screenplay;
  };
  dialogue_trees: {
    [key: string]: DialogueTree;
  };
}

export interface Faction {
  name: string;
  description?: string;
  relations: {
    [key: string]: string;
  };
  controlled_areas?: string[];
}

export interface LocationRecord {
  id: string;
  uuid?: string;
  name: string;
  type: string;
  hexmap_id: string;
  parent_id?: string;
  default_lighting?: string;
}

export interface ScriptStep {
  type: string;
  effect?: string;
  screenplay_id?: string;
  playback_behavior?: string;
  interruptible?: boolean;
  item_id?: string;
  awakened?: boolean;
  key?: string;
  value?: any;
  faction?: string;
  target?: string;
  new_status?: string;
  quest_id?: string;
  node?: string;
  new_state?: 'locked' | 'active' | 'completed';
  dialogue_tree_id?: string;
  target_npc_id?: string;
  // Advanced simulation attributes
  effect_name?: string;
  intensity?: string;
  cue?: string;
  skill?: string;
  dc?: number;
  target_id?: string;
  count?: number;
  level?: number;
  entity_id?: string;
  duration_rounds?: number;
  gold?: number;
  target_player?: string;
  property?: string;
  buff_name?: string;
  duration_minutes?: number;
  ability?: string;
  damage_type?: string;
  roll?: string;
  [key: string]: any;
}

export interface ScriptAssociation {
  id: string;
  description?: string;
  sequence: ScriptStep[];
}

export interface ProcedureTrigger {
  type: string;
}

export interface Procedure {
  id: string;
  name: string;
  description?: string;
  trigger: ProcedureTrigger;
  script_assoc?: string;
  script: {
    sequence: {
      type: string;
      effect: string;
    }[];
  };
}

export interface SceneActor {
  id: string;
  role: string;
}

export interface SceneInteractable {
  id: string;
  name: string;
  type?: string;
  script?: ScriptAssociation;
  script_on_interact?: {
    type: string;
    skill: string;
    dc: number;
    on_success: {
      action: string;
      handout_id?: string;
      key?: string;
      value?: any;
    };
  };
}

export interface SceneOutcome {
  condition: string;
  next_scene_id?: string;
  script_id?: string;
}

export interface SocialEncounter {
  id: string;
  npc_id: string;
  npc_name: string;
  context: string;
  skill_challenges: {
    skill: string;
    dc: number;
    success_outcome: string;
    failure_outcome: string;
  }[];
  dialogue_tree_id?: string;
}

export interface ExplorationEncounter {
  id: string;
  name: string;
  hazard_or_feature: string;
  context: string;
  skill_challenges: {
    skill: string;
    dc: number;
    success_outcome: string;
    failure_outcome: string;
  }[];
}

export interface SceneRecord {
  id: string;
  location_id: string;
  description?: string;
  constraints_fulfilled?: string[];
  actors?: SceneActor[];
  on_load?: {
    script_id: string;
  };
  on_load_av?: {
    play_bgm: string;
  };
  interactables?: SceneInteractable[];
  encounters?: {
    id: string;
    actors: {
      entity_id: string;
      quantity: number;
    }[];
    on_actor_takes_damage?: {
      action: string;
    };
  }[];
  social_encounters?: SocialEncounter[];
  exploration_encounters?: ExplorationEncounter[];
  outcomes: SceneOutcome[];
  screenplays_attached?: string[];
}

export interface WorldState {
  time_elapsed_hours: number;
  current_time_of_day: string;
  tension_pool_current_dice: number;
  discovered_clues: string[];
  unlocked_secrets: string[];
  active_global_effects: string[];
  completed_scenes: string[];
  active_scene: string;
  weather_vector?: string;
  leyline_resonance?: string;
  challenge_rating_tier?: string;
  time_before_tomb_collapse?: string;
  critical_doom_factor?: string;
  planar_instability?: string;
  sanctuary_ward_level?: string;
  anomaly_gravitational_pull?: string;
  flags: {
    [key: string]: boolean;
  };
  dynamic_factions: {
    [key: string]: {
      attitude_to_party: string;
    };
  };
}

export interface Adventure {
  meta: AdventureMeta;
  safety_and_accessibility: SafetyAndAccessibility;
  theme: Theme;
  narrative: Narrative;
  journal: Journal;
  party_integration: PartyIntegration;
  chronology: Chronology;
  lore_web: LoreWeb;
  tension_engine: TensionEngine;
  audiovisual_cues: AudioVisualCues;
  definitions: Definitions;
  factions: {
    [key: string]: Faction;
  };
  locations: {
    [key: string]: LocationRecord;
  };
  scripts: {
    [key: string]: ScriptAssociation;
  };
  procedures: {
    [key: string]: Procedure;
  };
  scenes: {
    [key: string]: SceneRecord;
  };
  world_state: WorldState;
}
