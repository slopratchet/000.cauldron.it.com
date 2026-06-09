import React from 'react';
import { Braces } from 'lucide-react';

interface ScriptSpec {
  id: string;
  name: string;
  description: string;
  category: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  example: string;
}

const SCRIPT_SPECIFICATIONS: ScriptSpec[] = [
  {
    id: 'apply_fog',
    name: 'Apply Fog',
    description:
      'Spawns dense misty clouds blocking regional line-of-sight tracking parameters.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'density_percent',
        type: 'string',
        required: true,
        description: 'Percent density value of current fog.',
      },
      {
        name: 'perception_modifier_dc',
        type: 'number',
        required: true,
        description: 'Handicap value added to passive perception.',
      },
      {
        name: 'dynamic_vision_blocked',
        type: 'boolean',
        required: true,
        description:
          'Instructs coordinate systems that long sight is unavailable.',
      },
    ],
    example:
      '{ type: "apply_fog", dat: { density_percent: "92%", perception_modifier_dc: 4, dynamic_vision_blocked: true } }',
  },
  {
    id: 'apply_global_effect',
    name: 'Apply Global Effect',
    description:
      'Mutates atmospheric parameters across standard travel environments.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'rain_rate_dc',
        type: 'number',
        required: false,
        description: 'Weather travel skill difficulty check.',
      },
      {
        name: 'ambient_light_opacity',
        type: 'string',
        required: false,
        description: 'Visibility obscuration rating.',
      },
      {
        name: 'primary_element',
        type: 'string',
        required: false,
        description: 'The overriding element.',
      },
    ],
    example:
      '{ type: "apply_global_effect", dat: { rain_rate_dc: 12, ambient_light_opacity: "85%", primary_element: "Acid Rainstorm" } }',
  },
  {
    id: 'apply_vfx',
    name: 'Apply Visual Effects (VFX)',
    description:
      'Fires atmospheric elemental graphic shaders across selected grid positions or players.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'effect_name',
        type: 'string',
        required: true,
        description: 'Visual shader preset key.',
      },
      {
        name: 'intensity',
        type: 'string',
        required: true,
        description:
          "Strength scaling coefficients ('low' | 'medium' | 'high').",
      },
      {
        name: 'target_player',
        type: 'string',
        required: false,
        description: 'Target participant key.',
      },
    ],
    example:
      '{ type: "apply_vfx", dat: { effect_name: "electric_conduit", intensity: "medium", target_player: "party_tank" } }',
  },
  {
    id: 'aurora_discharge',
    name: 'Aurora Discharge',
    description:
      'Creates severe high-canopy electromagnetic storm arrays scrambling visual compass targets.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'color_spectrum',
        type: 'string',
        required: true,
        description: 'Visual emission preset colors.',
      },
      {
        name: 'interference_field_strength',
        type: 'string',
        required: true,
        description: 'Signal degradation tier.',
      },
      {
        name: 'metallic_attraction',
        type: 'boolean',
        required: true,
        description: 'Attracts discharges to metallic structures.',
      },
    ],
    example:
      '{ type: "aurora_discharge", dat: { color_spectrum: "violet-blue", interference_field_strength: "severe", metallic_attraction: true } }',
  },
  {
    id: 'camera_shake',
    name: 'Camera Shake',
    description:
      'Shakes DM and player views, warning of geological destabilizations in underground chambers.',
    category: 'Procedural Danger',
    parameters: [
      {
        name: 'intensity_magnitude',
        type: 'number',
        required: true,
        description: 'Magnitude intensity coefficient of seismic tremor.',
      },
      {
        name: 'decay_duration_seconds',
        type: 'number',
        required: true,
        description: 'Tremor decay time.',
      },
      {
        name: 'structural_fatigue_index',
        type: 'string',
        required: true,
        description: 'Relative tomb structural damage scaling.',
      },
    ],
    example:
      '{ type: "camera_shake", dat: { intensity_magnitude: 4.5, decay_duration_seconds: 3.2, structural_fatigue_index: "1.2%" } }',
  },
  {
    id: 'cold_snap',
    name: 'Cold Snap',
    description:
      'Triggers a rapid dropping of temperatures, freezing surface wet mud layers and inflicting chilled status.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'temperature_drop_fahrenheit',
        type: 'number',
        required: true,
        description: 'Amount of temperature drop inside target area.',
      },
    ],
    example: '{ type: "cold_snap", dat: { temperature_drop_fahrenheit: 15 } }',
  },
  {
    id: 'consume_spell_slot',
    name: 'Consume Spell Slot',
    description:
      'Reduces caster dynamic elemental spellslot values inside resources database.',
    category: 'State Modifier',
    parameters: [
      {
        name: 'level',
        type: 'number',
        required: true,
        description: 'Integer representing spell tier ranking slots (1 to 9).',
      },
    ],
    example: '{ type: "consume_spell_slot", dat: { level: 2 } }',
  },
  {
    id: 'damage_party',
    name: 'Damage Party',
    description: 'Reduces active hitpoints across party arrays from hazards.',
    category: 'Procedural Danger',
    parameters: [
      {
        name: 'damage_type',
        type: 'string',
        required: true,
        description: 'Elemental affinity profile of hit.',
      },
      {
        name: 'roll',
        type: 'string',
        required: true,
        description: 'Roll code calculating final loss values.',
      },
    ],
    example:
      '{ type: "damage_party", dat: { damage_type: "force", roll: "2d10" } }',
  },
  {
    id: 'dawn_automation',
    name: 'Dawn Automation',
    description:
      'Automated standard morning sweep. Resets daily activity budgets and sweeps resting nocturnal creatures.',
    category: 'Automated Process',
    parameters: [],
    example: '{ type: "dawn_automation", dat: {} }',
  },
  {
    id: 'deduct_currency',
    name: 'Deduct Currency',
    description:
      'Extracts specific currency amounts from party financial balances.',
    category: 'State Modifier',
    parameters: [
      {
        name: 'gold',
        type: 'number',
        required: true,
        description: 'Amount of gold raw coins to subtract.',
      },
    ],
    example: '{ type: "deduct_currency", dat: { gold: 150 } }',
  },
  {
    id: 'disable_entity',
    name: 'Disable Entity',
    description:
      'Deactivates physical traps, security monitors, energy shields, or hostile triggers.',
    category: 'State Modifier',
    parameters: [
      {
        name: 'target_id',
        type: 'string',
        required: true,
        description: 'Target entity reference path.',
      },
    ],
    example:
      '{ type: "disable_entity", dat: { target_id: "traps.coffin_static_charge" } }',
  },
  {
    id: 'dusk_automation',
    name: 'Dusk Automation',
    description:
      'Enables village twilight lantern assets and schedules nocturnal guard shifts.',
    category: 'Automated Process',
    parameters: [],
    example: '{ type: "dusk_automation", dat: {} }',
  },
  {
    id: 'echo_battle',
    name: 'Echo of Battle',
    description:
      'Plays faint, metallic battlefield clashing echoes and prompts wisdom sanity checks among participants.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'volume_db',
        type: 'number',
        required: true,
        description: 'Sound volume decibel rating.',
      },
    ],
    example: '{ type: "echo_battle", dat: { volume_db: -12 } }',
  },
  {
    id: 'echo_sorrow',
    name: 'Echo of Sorrow',
    description:
      'Broadcasts weeping acoustic sighs of giant origins, briefly reducing party movement speed.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'duration_rounds',
        type: 'number',
        required: true,
        description: 'Movement speed penalty lifetime in active game cycles.',
      },
    ],
    example: '{ type: "echo_sorrow", dat: { duration_rounds: 3 } }',
  },
  {
    id: 'elemental_damage',
    name: 'Elemental Damage Strike',
    description:
      'Smites coordinates, delivering severe direct affinity-based damage dynamically.',
    category: 'Procedural Danger',
    parameters: [
      {
        name: 'damage',
        type: 'string',
        required: false,
        description: 'Damage die equation roll.',
      },
      {
        name: 'metal_preference',
        type: 'boolean',
        required: false,
        description:
          'Pins lightning strikes specifically to metallic structures.',
      },
    ],
    example:
      '{ type: "elemental_damage", dat: { damage: "3d6", metal_preference: true } }',
  },
  {
    id: 'every_six_turns',
    name: 'Pacing Interval',
    description:
      'Fires once every six consecutive game turns during stagnant exploration to introduce tension shifts.',
    category: 'Automated Process',
    parameters: [],
    example: '{ type: "every_six_turns", dat: {} }',
  },
  {
    id: 'flee_attempt',
    name: 'Desperate Retreat Check',
    description:
      'Evaluates immediate escape action requests, prompting free penalty attacks for nearby foes.',
    category: 'Combat Resolution',
    parameters: [],
    example: '{ type: "flee_attempt", dat: {} }',
  },
  {
    id: 'geomagnetic_pull',
    name: 'Geomagnetic Pull Shift',
    description:
      'Alters gravity profiles, imposing extreme action costs on heavy metal armored participants.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'relative_gravity_rating',
        type: 'string',
        required: true,
        description: "Gravity rating (e.g. '0.8G').",
      },
      {
        name: 'heavy_armor_action_tax',
        type: 'string',
        required: true,
        description: 'Action points penalty added.',
      },
      {
        name: 'levitation_threshold_weight_g',
        type: 'number',
        required: true,
        description: 'Maximum threshold weight in grams for floating.',
      },
    ],
    example:
      '{ type: "geomagnetic_pull", dat: { relative_gravity_rating: "0.8G", heavy_armor_action_tax: "+2", levitation_threshold_weight_g: 50 } }',
  },
  {
    id: 'grant_item',
    name: 'Grant Item',
    description:
      "Places a named, specific item from regional blueprints directly into the adventurers' storage containers.",
    category: 'State Modifier',
    parameters: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: 'The resource path identifying the item catalog key.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Amount of copy stacks to include. Defaults to 1.',
      },
      {
        name: 'awakened',
        type: 'boolean',
        required: false,
        description:
          'Instructs the items system to wake dormant elemental properties immediately.',
      },
    ],
    example:
      '{ type: "grant_item", dat: { item_id: "items.blade_of_guardianship", awakened: true } }',
  },
  {
    id: 'grant_party_buff',
    name: 'Grant Party Buff',
    description:
      'Gifts dynamic resistances, stat enhancements, or protection boons to all party members.',
    category: 'State Modifier',
    parameters: [
      {
        name: 'buff_name',
        type: 'string',
        required: true,
        description: 'The active immunity trait name.',
      },
      {
        name: 'duration_minutes',
        type: 'number',
        required: true,
        description: 'Lifetime countdown duration of active benefits.',
      },
    ],
    example:
      '{ type: "grant_party_buff", dat: { buff_name: "Lightning Resistance", duration_minutes: 60 } }',
  },
  {
    id: 'initiate_dialogue',
    name: 'Initiate Dialogue',
    description:
      'Summons and locks the UI focus onto active branch choice lists with defined NPCs.',
    category: 'Narrative Orchestrator',
    parameters: [
      {
        name: 'dialogue_tree_id',
        type: 'string',
        required: true,
        description: 'Identifier of the branching node discussion graph.',
      },
      {
        name: 'target_npc_id',
        type: 'string',
        required: true,
        description: 'Unique character ID code within the region.',
      },
    ],
    example:
      '{ type: "initiate_dialogue", dat: { dialogue_tree_id: "dt_elara_hub", target_npc_id: "elara" } }',
  },
  {
    id: 'magical_chaos',
    name: 'Magical Chaos Surge Tracker',
    description:
      'Applies wild, volatile high-magic interference parameters to physical spells.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'core_surge_chance',
        type: 'string',
        required: true,
        description: 'Trigger probability percentage string.',
      },
      {
        name: 'backlash_coefficient',
        type: 'string',
        required: true,
        description: 'Thermal hazard level ratings.',
      },
      {
        name: 'volatile_potency',
        type: 'boolean',
        required: true,
        description:
          'Enhances base spell damage output at the risk of backfiring.',
      },
    ],
    example:
      '{ type: "magical_chaos", dat: { core_surge_chance: "25%", backlash_coefficient: "high", volatile_potency: true } }',
  },
  {
    id: 'mana_static',
    name: 'Mana Static Field',
    description:
      'Floods the air current with shimmering magical dust particles, boosting spell output but increasing spell casting failure rates.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'damage_multiplier',
        type: 'string',
        required: true,
        description: 'Arcane damage magnifier scaling.',
      },
      {
        name: 'failed_spellcast_penalty',
        type: 'string',
        required: true,
        description: 'Spell failure probability increment.',
      },
      {
        name: 'particle_luminosity',
        type: 'number',
        required: true,
        description: 'Luminosity rate measured in Lumens.',
      },
    ],
    example:
      '{ type: "mana_static", dat: { damage_multiplier: "1.5x", failed_spellcast_penalty: "+15%", particle_luminosity: 180 } }',
  },
  {
    id: 'merchant_refresh',
    name: 'Merchant Refresh',
    description:
      'Restores village inventory sheets, restocking high-demand tools and random spell components.',
    category: 'Automated Process',
    parameters: [],
    example: '{ type: "merchant_refresh", dat: {} }',
  },
  {
    id: 'nighttime_check',
    name: 'Nighttime Check',
    description:
      'Initializes specialized nocturnal hazard checks, adjusting ambient visibility levels across moist regional zones.',
    category: 'Automated Process',
    parameters: [],
    example: '{ type: "nighttime_check", dat: {} }',
  },
  {
    id: 'per_round_combat',
    name: 'Combat Round Trigger',
    description:
      'Executed at the end of each active combat round to process environmental conditions or hazards.',
    category: 'Combat Resolution',
    parameters: [],
    example: '{ type: "per_round_combat", dat: {} }',
  },
  {
    id: 'planar_resonance',
    name: 'Planar Resonance Whisper',
    description:
      'Siphons deep runic knowledge from interplanar boundaries, taxing party sanity limits.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'ambient_sanity_drain_roll',
        type: 'string',
        required: true,
        description: 'Sanity drain roll value.',
      },
      {
        name: 'cognitive_inspiration_benefit',
        type: 'string',
        required: true,
        description: 'Inspirational trait profit bonus.',
      },
      {
        name: 'rift_frequency_hz',
        type: 'number',
        required: true,
        description: 'Dimensional energy wavelength resonance index.',
      },
    ],
    example:
      '{ type: "planar_resonance", dat: { ambient_sanity_drain_roll: "1d4", cognitive_inspiration_benefit: "+1d6", rift_frequency_hz: 432 } }',
  },
  {
    id: 'play_audio',
    name: 'Play Audio',
    description:
      'Dispatches ambient sound effects or swaps active tactical background battle tracks.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'cue',
        type: 'string',
        required: true,
        description:
          'Reference selector parameter of the target soundscape asset.',
      },
    ],
    example:
      '{ type: "play_audio", dat: { cue: "audiovisual_cues.soundscapes.sfx_rune_hum" } }',
  },
  {
    id: 'play_cutscene',
    name: 'Play Cutscene',
    description:
      'Halts real-time gameplay controls and plays an engaging narrative screenplay sequence.',
    category: 'Narrative Orchestrator',
    parameters: [
      {
        name: 'screenplay_id',
        type: 'string',
        required: true,
        description: 'Must match an ID in the screenplay definitions database.',
      },
      {
        name: 'playback_behavior',
        type: 'string',
        required: true,
        description:
          "Governs input lock layers (e.g., 'blocking' or 'non_blocking').",
      },
      {
        name: 'interruptible',
        type: 'boolean',
        required: false,
        description:
          'Determines if players can actively click past cinematic dialogue strings.',
      },
    ],
    example:
      '{ type: "play_cutscene", dat: { screenplay_id: "sp_vorguns_resolution", playback_behavior: "blocking" } }',
  },
  {
    id: 'player_action:loud_noise',
    name: 'Loud Noise Detection',
    description:
      'Instantly alerts nearby wandering monsters, creating stealth check penalties after high-acoustic activities.',
    category: 'Procedural Danger',
    parameters: [],
    example: '{ type: "player_action:loud_noise", dat: {} }',
  },
  {
    id: 'player_action:trigger_trap',
    name: 'Trap Detonation Actuator',
    description:
      'Processes physical trap triggers when a character steps onto pressure-sensitive floor tiles.',
    category: 'Procedural Danger',
    parameters: [],
    example: '{ type: "player_action:trigger_trap", dat: {} }',
  },
  {
    id: 'remove_item',
    name: 'Remove Item',
    description:
      'Extracts and discards targeted inventory materials from party bags.',
    category: 'State Modifier',
    parameters: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: 'Target resource path ID of the expendable.',
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        description: 'Quantity of item structures to delete. Defaults to 1.',
      },
    ],
    example:
      '{ type: "remove_item", dat: { item_id: "items.ancient_stone_rune", count: 1 } }',
  },
  {
    id: 'rest_interrupted',
    name: 'Camp Rest Interruption',
    description:
      'Triggers camp rest disruptions and ambush encounters when sleeping in unwarded wilderness locations.',
    category: 'Procedural Danger',
    parameters: [],
    example: '{ type: "rest_interrupted", dat: {} }',
  },
  {
    id: 'roll_saving_throw',
    name: 'Roll Saving Throw',
    description:
      'Performs reactive stat checks to shrug off environmental blast fallout.',
    category: 'Procedural Danger',
    parameters: [
      {
        name: 'ability',
        type: 'string',
        required: true,
        description: 'Primary character stat used for checks.',
      },
      {
        name: 'dc',
        type: 'number',
        required: true,
        description: 'Boundary pass index.',
      },
    ],
    example:
      '{ type: "roll_saving_throw", dat: { ability: "Intelligence (Arcana)", dc: 16 } }',
  },
  {
    id: 'roll_skill_check',
    name: 'Roll Skill Check',
    description:
      'Evaluates standard attribute proficiency boundaries against targeted action obstacles.',
    category: 'Procedural Danger',
    parameters: [
      {
        name: 'skill',
        type: 'string',
        required: true,
        description: 'Skill asset identifier name.',
      },
      {
        name: 'dc',
        type: 'number',
        required: true,
        description:
          'Difficulty Class (DC), the boundary index required to succeed.',
      },
    ],
    example:
      '{ type: "roll_skill_check", dat: { skill: "Sleight of Hand (Thieves\' Tools)", dc: 14 } }',
  },
  {
    id: 'script_arc_shock',
    name: 'Script: Arc-Lightning Shock',
    description:
      'Discharges static electricity arcs onto metal armor wearers, forcing saving throws in stormy environments.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'severity_multiplier',
        type: 'number',
        required: true,
        description: 'A multiplier scaling the damage output.',
      },
    ],
    example: '{ type: "script_arc_shock", dat: { severity_multiplier: 1.2 } }',
  },
  {
    id: 'script_cloud_face',
    name: 'Script: Giant Cloud Face',
    description:
      "Creates high-canopy cloud vapor formations portraying the sleeping giant's solemn profile.",
    category: 'Table Outcome',
    parameters: [
      {
        name: 'visual_duration_seconds',
        type: 'number',
        required: true,
        description: 'Lifespan of the visual atmospheric presentation.',
      },
    ],
    example:
      '{ type: "script_cloud_face", dat: { visual_duration_seconds: 45 } }',
  },
  {
    id: 'script_cold_snap',
    name: 'Script: Cold Snap Trigger',
    description:
      'Evaluates standard temperature drop outcomes and issues chilled status overlays.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'intensity',
        type: 'string',
        required: true,
        description: "Cold intensity scaling coefficient ('low' | 'high').",
      },
    ],
    example: '{ type: "script_cold_snap", dat: { intensity: "high" } }',
  },
  {
    id: 'script_crypt_flame',
    name: 'Script: Crypt Flame Shift',
    description:
      'Mutates ambient torch light levels in subterranean chambers, shifting them to a spiritual indigo tone.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'intensity_ratio',
        type: 'number',
        required: true,
        description: 'The color ratio shift index.',
      },
    ],
    example: '{ type: "script_crypt_flame", dat: { intensity_ratio: 0.85 } }',
  },
  {
    id: 'script_crypt_orbs',
    name: 'Script: Crypt Orbs Locator',
    description:
      'Spawns hovering, radiant spectral guidelines pointing toward hidden vault doors.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'guide_count',
        type: 'number',
        required: true,
        description: 'Total glowing particles spawned.',
      },
    ],
    example: '{ type: "script_crypt_orbs", dat: { guide_count: 3 } }',
  },
  {
    id: 'script_crypt_regrets',
    name: 'Script: Crypt Echo Regrets',
    description:
      'Whispers back deeply buried regrets of party members, forcing minor wisdom sanity saving throws.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'volume_factor',
        type: 'number',
        required: true,
        description: 'Whisper decibel rating multiplier.',
      },
    ],
    example: '{ type: "script_crypt_regrets", dat: { volume_factor: 0.9 } }',
  },
  {
    id: 'script_crypt_shudder',
    name: 'Script: Crypt Sarcophagi Shudder',
    description:
      'Vibrates heavy stone sarcophagi lids violently, warning adventurers of nearby high pressure levels.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'vibration_magnitude',
        type: 'number',
        required: true,
        description: 'Magnitude intensity coefficient of seismic tremor.',
      },
    ],
    example:
      '{ type: "script_crypt_shudder", dat: { vibration_magnitude: 2.4 } }',
  },
  {
    id: 'script_crypt_weep',
    name: 'Script: Crypt Weeping Statues',
    description:
      'Causes giant wall relief engravings to weep moisture that sparkles with positive elemental charges.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'salinity_percent',
        type: 'number',
        required: true,
        description: 'Moisture salt density content.',
      },
    ],
    example: '{ type: "script_crypt_weep", dat: { salinity_percent: 12.5 } }',
  },
  {
    id: 'script_crypt_weightless',
    name: 'Script: Crypt Gravity Drift',
    description:
      'Induces brief gravitational anomalies inside deep burial cells, floating dust particles around.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'duration_sec',
        type: 'number',
        required: true,
        description: 'Anomaly status lifespan.',
      },
    ],
    example: '{ type: "script_crypt_weightless", dat: { duration_sec: 15 } }',
  },
  {
    id: 'script_distant_quake',
    name: 'Script: Distant Seismic Tremor',
    description:
      'Fires shaking feedback parameters as deep subterranean seismic booms sound from the moors.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'seismic_scale',
        type: 'number',
        required: true,
        description: 'Seismic rating multiplier.',
      },
    ],
    example: '{ type: "script_distant_quake", dat: { seismic_scale: 1.8 } }',
  },
  {
    id: 'script_echo_battle',
    name: 'Script: Battle Echo',
    description:
      'Resolves spectral audio segments recalling older giant battle campaigns.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'channel_index',
        type: 'number',
        required: true,
        description: 'Target audio segment output index.',
      },
    ],
    example: '{ type: "script_echo_battle", dat: { channel_index: 3 } }',
  },
  {
    id: 'script_echo_sorrow',
    name: 'Script: Sorrow Echo',
    description:
      'Plays heavy giant crying vocal cues, imposing temporary standard navigation penalties outdoors.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'sorrow_depth',
        type: 'number',
        required: true,
        description: 'Sanity check difficulty modifier coefficients.',
      },
    ],
    example: '{ type: "script_echo_sorrow", dat: { sorrow_depth: 8 } }',
  },
  {
    id: 'script_eclipse_state',
    name: 'Script: Eclipse Transition',
    description:
      'Swaps environment master clock indicators, forcing instant artificial dusk/night phases.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'eclipse_magnitude',
        type: 'number',
        required: true,
        description: 'Solar coverage percent from 0 to 1.',
      },
    ],
    example:
      '{ type: "script_eclipse_state", dat: { eclipse_magnitude: 0.98 } }',
  },
  {
    id: 'script_fern_pollen',
    name: 'Script: Fern Pollen Cloud',
    description:
      'Dispatches hallucinogenic pollen sweeps over damp marsh segments, taxing navigation checks.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'hallucination_factor',
        type: 'number',
        required: true,
        description: 'Confusion index ranking of target cloud.',
      },
    ],
    example: '{ type: "script_fern_pollen", dat: { hallucination_factor: 3 } }',
  },
  {
    id: 'script_flora_bulb',
    name: 'Script: Silver Silt Forage',
    description:
      'Awards high-nutritional swamp roots, doubling healing values upon subsequent short resting.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'forager_level',
        type: 'number',
        required: true,
        description: 'The survival skills rank of the discoverer.',
      },
    ],
    example: '{ type: "script_flora_bulb", dat: { forager_level: 2 } }',
  },
  {
    id: 'script_flora_calyx',
    name: 'Script: Willow-Calyx Forage',
    description:
      'Handles foraging discoveries of weeping calyx willow herbs that alleviate open physical wounds.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'item_purity',
        type: 'number',
        required: true,
        description: 'Active medical chemical ratio of sample.',
      },
    ],
    example: '{ type: "script_flora_calyx", dat: { item_purity: 0.95 } }',
  },
  {
    id: 'script_flora_lichen',
    name: 'Script: Ectoplasmic Lichen Forage',
    description:
      'Processes discoveries of glowing mosses that restore spell focuses without standard rests.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'charge_count',
        type: 'number',
        required: true,
        description: 'Available uses remaining.',
      },
    ],
    example: '{ type: "script_flora_lichen", dat: { charge_count: 1 } }',
  },
  {
    id: 'script_flora_lotus',
    name: 'Script: Grave-Lotus Forage',
    description:
      'Handles forage finds of lotus leaves capable of purging severe regional swamp illnesses.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'cleanse_power',
        type: 'number',
        required: true,
        description: 'Bacterial neutralization strength coefficients.',
      },
    ],
    example: '{ type: "script_flora_lotus", dat: { cleanse_power: 100 } }',
  },
  {
    id: 'script_flora_spores',
    name: 'Script: Sorrow-Spore Forage',
    description:
      'Awards specialized spore organisms capable of capturing volatile magical feedback surges.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'absorption_coefficient',
        type: 'number',
        required: true,
        description: 'Surge protection factor.',
      },
    ],
    example:
      '{ type: "script_flora_spores", dat: { absorption_coefficient: 0.4 } }',
  },
  {
    id: 'script_flora_vines',
    name: 'Script: Tempest Vine Forage',
    description:
      'Processes find of highly elastic vines capable of venting high electrical currents outdoors.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'conductivity_rating',
        type: 'number',
        required: true,
        description: 'Direct grounding effectiveness rating.',
      },
    ],
    example:
      '{ type: "script_flora_vines", dat: { conductivity_rating: 0.05 } }',
  },
  {
    id: 'script_gas_explosion',
    name: 'Script: Swamp Gas Detonation',
    description:
      'Fires volatile high-heat pockets instantly, affecting standard travel health markers.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'detonation_radius',
        type: 'number',
        required: true,
        description: 'Threat radius measured in meters.',
      },
    ],
    example: '{ type: "script_gas_explosion", dat: { detonation_radius: 8 } }',
  },
  {
    id: 'script_leeches',
    name: 'Script: Leech Swarm',
    description:
      'Triggers aggressive swamp parasitizing forces draining dynamic coordination stats.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'swarm_density',
        type: 'number',
        required: true,
        description: 'Parasite count estimates in target lock space.',
      },
    ],
    example: '{ type: "script_leeches", dat: { swarm_density: 45 } }',
  },
  {
    id: 'script_lightning_strike',
    name: 'Script: Lightning Bolt Strike',
    description:
      'Directs server-authoritative heavy lightning bolts onto outdoor coordinate nodes.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'bolt_voltage_kv',
        type: 'number',
        required: true,
        description: 'Electrical discharge peak potential in kV.',
      },
    ],
    example:
      '{ type: "script_lightning_strike", dat: { bolt_voltage_kv: 500 } }',
  },
  {
    id: 'script_loot_brooch',
    name: 'Script: Brooch Loot Allocation',
    description:
      'Grants stylized wave-engraved giant brooches from ancient crypt containers.',
    category: 'Loot & Resource Distribution',
    parameters: [
      {
        name: 'is_authentic',
        type: 'boolean',
        required: true,
        description: 'Confirms historic validation of the find.',
      },
    ],
    example: '{ type: "script_loot_brooch", dat: { is_authentic: true } }',
  },
  {
    id: 'script_loot_electrum',
    name: 'Script: Electrum Loot Allocation',
    description:
      'Distributes pristine, giant-sized coin sacks from historical vaults into party balances.',
    category: 'Loot & Resource Distribution',
    parameters: [
      {
        name: 'coin_count',
        type: 'number',
        required: true,
        description: 'Total electrum currency allocated.',
      },
    ],
    example: '{ type: "script_loot_electrum", dat: { coin_count: 50 } }',
  },
  {
    id: 'script_loot_map',
    name: 'Script: Map Loot Allocation',
    description:
      'Uncovers valuable map fragments tracing underground water ways and security bypass paths.',
    category: 'Loot & Resource Distribution',
    parameters: [
      {
        name: 'region_id',
        type: 'string',
        required: true,
        description: 'Designated exploration sector coordinates.',
      },
    ],
    example:
      '{ type: "script_loot_map", dat: { region_id: "region.barrowmoor_underground" } }',
  },
  {
    id: 'script_loot_potion',
    name: 'Script: Potion Loot Allocation',
    description:
      'Grants translucent vials of distilled storm-water potion, providing lightning resistance.',
    category: 'Loot & Resource Distribution',
    parameters: [
      {
        name: 'potency_level',
        type: 'number',
        required: true,
        description: 'Healing potency and immunity tier level.',
      },
    ],
    example: '{ type: "script_loot_potion", dat: { potency_level: 2 } }',
  },
  {
    id: 'script_loot_ring',
    name: 'Script: Ring Loot Allocation',
    description:
      'Allocates ancient volcanic giant rings carrying dynamic protection layers.',
    category: 'Loot & Resource Distribution',
    parameters: [
      {
        name: 'ring_radius',
        type: 'number',
        required: true,
        description: 'Structural fitting diameter measurements.',
      },
    ],
    example: '{ type: "script_loot_ring", dat: { ring_radius: 3.5 } }',
  },
  {
    id: 'script_loot_rod',
    name: 'Script: Rod Loot Allocation',
    description:
      'Awards high-grade silver monolithic activator rods used to channel residual obelisk sparks.',
    category: 'Loot & Resource Distribution',
    parameters: [
      {
        name: 'charge_count',
        type: 'number',
        required: true,
        description: 'Activation counts pre-loaded.',
      },
    ],
    example: '{ type: "script_loot_rod", dat: { charge_count: 6 } }',
  },
  {
    id: 'script_memory_betrayal',
    name: 'Script: Betrayal Memory',
    description:
      'Fires mental projection seqs depicting founder Elric stealing the sacred monolith cores.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'narrative_id',
        type: 'string',
        required: true,
        description: 'Dialogue registry index code.',
      },
    ],
    example:
      '{ type: "script_memory_betrayal", dat: { narrative_id: "mem_betrayal_elric" } }',
  },
  {
    id: 'script_memory_burial',
    name: 'Script: Burial Memory',
    description:
      'Projects tragic psychic overlays portraying Vorgun laying his young daughter to rest within deep barrows.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'narrative_id',
        type: 'string',
        required: true,
        description: 'Historical diary reference registration keys.',
      },
    ],
    example:
      '{ type: "script_memory_burial", dat: { narrative_id: "mem_burial_kailina" } }',
  },
  {
    id: 'script_memory_chanting',
    name: 'Script: Chanting Memory',
    description:
      'Streams ancient celestial giant chant records directly into party memory matrices, offering sanity buffs.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'narrative_id',
        type: 'string',
        required: true,
        description: 'Sound clip identifiers inside database.',
      },
    ],
    example:
      '{ type: "script_memory_chanting", dat: { narrative_id: "mem_chanting_primeval" } }',
  },
  {
    id: 'script_memory_crafting',
    name: 'Script: Crafting Memory',
    description:
      "Displays vivid scenic holograms reproducing Vorgun's creation of Oakhaven's lightning wardstones.",
    category: 'Table Outcome',
    parameters: [
      {
        name: 'narrative_id',
        type: 'string',
        required: true,
        description: 'Historical library records registry codes.',
      },
    ],
    example:
      '{ type: "script_memory_crafting", dat: { narrative_id: "mem_craft_monoliths" } }',
  },
  {
    id: 'script_memory_peaks',
    name: 'Script: Mountain Peaks Memory',
    description:
      'Manifests spatial memories of standing atop colossal mountain heights as regional oceans froze over.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'narrative_id',
        type: 'string',
        required: true,
        description: 'Ancient database imagery index.',
      },
    ],
    example:
      '{ type: "script_memory_peaks", dat: { narrative_id: "mem_glacial_freeze" } }',
  },
  {
    id: 'script_memory_warmth',
    name: 'Script: Town Protection Memory',
    description:
      'Floods the current coordinates with a reassuring warm feeling, lowering regional stress dice pools.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'narrative_id',
        type: 'string',
        required: true,
        description: 'Mental files database identifiers.',
      },
    ],
    example:
      '{ type: "script_memory_warmth", dat: { narrative_id: "mem_protective_warmth" } }',
  },
  {
    id: 'script_mudslide',
    name: 'Script: Barrowmoor Mudslide',
    description:
      'Triggers structural mud torrent sweeps that wash away non-secured regional tools.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'flow_depth_cm',
        type: 'number',
        required: true,
        description: 'Soil and water wave density altitude in cm.',
      },
    ],
    example: '{ type: "script_mudslide", dat: { flow_depth_cm: 120 } }',
  },
  {
    id: 'script_phantom_rain',
    name: 'Script: Spectral Phantom Rain',
    description:
      'Applies specialized dry blue rainfall that does not damp gear but sings on metal plate surfaces.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'duration_sec',
        type: 'number',
        required: true,
        description: 'Status effect visibility lifetime in seconds.',
      },
    ],
    example: '{ type: "script_phantom_rain", dat: { duration_sec: 180 } }',
  },
  {
    id: 'script_power_surge',
    name: 'Script: Leyline Power Surge',
    description:
      'Evaluates standard obelisk nodes, resetting trigger limits and increasing magical static levels.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'surge_ratio',
        type: 'number',
        required: true,
        description: 'The electrostatic enhancement scale.',
      },
    ],
    example: '{ type: "script_power_surge", dat: { surge_ratio: 1.5 } }',
  },
  {
    id: 'script_rune_binding',
    name: 'Script: Rune Binding History',
    description:
      'Unlocks ancient pact coordinates detailing agreements between giant-kin and first settlers.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'rune_age_years',
        type: 'number',
        required: true,
        description: 'Estimated age of monument.',
      },
    ],
    example: '{ type: "script_rune_binding", dat: { rune_age_years: 1200 } }',
  },
  {
    id: 'script_rune_crest',
    name: 'Script: Rune Curse Validation',
    description: 'Validates severe defensive curses triggered by tomb looting.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'saving_throw_dc',
        type: 'number',
        required: true,
        description: 'Base DC to resist the grave-robbing afflictions.',
      },
    ],
    example: '{ type: "script_rune_crest", dat: { saving_throw_dc: 15 } }',
  },
  {
    id: 'script_rune_kailina',
    name: 'Script: Rune Kailina Sorrow',
    description:
      'Deciphers giant-kin runes on deep sarcophagi detailing historical sorrow.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'glyph_id',
        type: 'string',
        required: true,
        description: 'Symbol index code parsed.',
      },
    ],
    example:
      '{ type: "script_rune_kailina", dat: { glyph_id: "glyph.kailina_sorrow" } }',
  },
  {
    id: 'script_rune_seal',
    name: 'Script: Rune Seal Lore',
    description:
      "Translates monument blueprints to detail Vorgun's voluntary anchor sacrifice.",
    category: 'Table Outcome',
    parameters: [
      {
        name: 'glyph_id',
        type: 'string',
        required: true,
        description: 'Symbol coordinates index in monuments.',
      },
    ],
    example:
      '{ type: "script_rune_seal", dat: { glyph_id: "glyph.structural_anchor" } }',
  },
  {
    id: 'script_rune_sky',
    name: 'Script: Rune secondary gate Sky',
    description:
      'Maps planar sky gateways, providing dimensional teleport coordinates.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'gate_coordinate_xyz',
        type: 'string',
        required: true,
        description: 'System structural location tags.',
      },
    ],
    example:
      '{ type: "script_rune_sky", dat: { gate_coordinate_xyz: "12, -4, 88" } }',
  },
  {
    id: 'script_rune_storm',
    name: 'Script: Rune Storm-Call',
    description:
      'Mpas ritual processes used to ground lightning strikes into lightning ward stones.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'voltage_threshold_kv',
        type: 'number',
        required: true,
        description: 'Grounding limit capacity in kV.',
      },
    ],
    example:
      '{ type: "script_rune_storm", dat: { voltage_threshold_kv: 450 } }',
  },
  {
    id: 'script_runic_sand',
    name: 'Script: Glowing Sand Swirl',
    description:
      'Swirls glowing silicon dust in the dry draft layers, restricting far-sight ranges temporarily.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'occlusion_ratio',
        type: 'number',
        required: true,
        description: 'Visual handicap intensity bounds (0 to 1).',
      },
    ],
    example: '{ type: "script_runic_sand", dat: { occlusion_ratio: 0.75 } }',
  },
  {
    id: 'script_sinkhole',
    name: 'Script: Quicksand Sinkhole',
    description:
      'Fires physical hazard saves for participants crossing swamp silt pockets.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'depth_meters',
        type: 'number',
        required: true,
        description: 'The spatial depth multiplier of the silt layer.',
      },
    ],
    example: '{ type: "script_sinkhole", dat: { depth_meters: 4 } }',
  },
  {
    id: 'script_spawn_ghouls',
    name: 'Script: Ghoul Spawner',
    description:
      'Fires animated Barrow Ghouls down from ceiling slots to defend tomb borders.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'ghoul_count',
        type: 'number',
        required: true,
        description: 'Spawning count limits.',
      },
    ],
    example: '{ type: "script_spawn_ghouls", dat: { ghoul_count: 2 } }',
  },
  {
    id: 'script_spawn_mephits',
    name: 'Script: Mephit Spawner',
    description:
      'Deploys static lightning elementals out of monolith storm-wells.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'mephit_count',
        type: 'number',
        required: true,
        description: 'Total mephit spawn allocations.',
      },
    ],
    example: '{ type: "script_spawn_mephits", dat: { mephit_count: 3 } }',
  },
  {
    id: 'script_spawn_monolith',
    name: 'Script: Defense Monolith Glow',
    description:
      'Activates physical defensive searchlight sweeps across target subterranean nodes.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'scan_range_meters',
        type: 'number',
        required: true,
        description: 'Radius of structural monitoring beam.',
      },
    ],
    example:
      '{ type: "script_spawn_monolith", dat: { scan_range_meters: 30 } }',
  },
  {
    id: 'script_spawn_rats',
    name: 'Script: Spectral Rats Swarm',
    description:
      'Launches dynamic spectral rat swarms fitted with microscopic electrical collars.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'swarm_count',
        type: 'number',
        required: true,
        description: 'The density index of the spawned swarm.',
      },
    ],
    example: '{ type: "script_spawn_rats", dat: { swarm_count: 15 } }',
  },
  {
    id: 'script_spawn_shade',
    name: 'Script: Shade Sentinel Spawner',
    description:
      'Manifests a heavy static-charged giant shadow defender to intercept vault intruders.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'shade_level',
        type: 'number',
        required: true,
        description: 'Threat tier rating of the phantom.',
      },
    ],
    example: '{ type: "script_spawn_shade", dat: { shade_level: 4 } }',
  },
  {
    id: 'script_spawn_skeleton',
    name: 'Script: Skeletal Giant Spawner',
    description:
      'Assembles iron-bound titan skeletons clutched with colossal broadswords.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'blade_length_cm',
        type: 'number',
        required: true,
        description:
          'Measures length configuration of standard greatsword asset.',
      },
    ],
    example: '{ type: "script_spawn_skeleton", dat: { blade_length_cm: 220 } }',
  },
  {
    id: 'script_spores',
    name: 'Script: Mushroom Acid Spores',
    description:
      'Spawns corrosive spore traps that degrade non-magical shields and metal boots.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'potency_index',
        type: 'number',
        required: true,
        description: 'Severity of acid dissolution checks (1 to 5).',
      },
    ],
    example: '{ type: "script_spores", dat: { potency_index: 3 } }',
  },
  {
    id: 'script_static_whispers',
    name: 'Script: Whispering Static Sparks',
    description:
      'Drives static crackles carrying spectral voices whispering lost giant name tags.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'name_revelation_key',
        type: 'string',
        required: true,
        description: 'Active name index matching story states.',
      },
    ],
    example:
      '{ type: "script_static_whispers", dat: { name_revelation_key: "name_kailina" } }',
  },
  {
    id: 'script_wailing_winds',
    name: 'Script: Fluted Wailing Winds',
    description:
      'Drives low whistling acoustics past cliff nodes, decreasing active character focus parameters.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'demoralize_tax',
        type: 'number',
        required: true,
        description: 'Focus reduction points.',
      },
    ],
    example: '{ type: "script_wailing_winds", dat: { demoralize_tax: 2 } }',
  },
  {
    id: 'script_weather_chill',
    name: 'Script: Swamp Chill Wave',
    description:
      'Modulates ambient regional climate profiles, applying chilling fog templates.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'temperature_change',
        type: 'number',
        required: true,
        description: 'The localized air temperature shift in degrees.',
      },
    ],
    example:
      '{ type: "script_weather_chill", dat: { temperature_change: -10 } }',
  },
  {
    id: 'script_weather_clear',
    name: 'Script: Cloud Break Event',
    description:
      'Creates momentary tears in local dense storm ceilings, projecting path-finding moonlight templates.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'moonlight_intensity',
        type: 'number',
        required: true,
        description: 'Direct illumination scale from 0 to 1.',
      },
    ],
    example:
      '{ type: "script_weather_clear", dat: { moonlight_intensity: 0.8 } }',
  },
  {
    id: 'script_weather_gales',
    name: 'Script: Giant Monument Gales',
    description:
      'Accelerates local wind models, activating monumental giant chimes.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'wind_speed_knots',
        type: 'number',
        required: true,
        description: 'Wind speed velocity index in knots.',
      },
    ],
    example: '{ type: "script_weather_gales", dat: { wind_speed_knots: 45 } }',
  },
  {
    id: 'script_weather_mist',
    name: 'Script: Blue Spore Drizzle',
    description: 'Renders blue bio-luminescent swamp spore drizzling rains.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'spore_density_ratio',
        type: 'number',
        required: true,
        description: 'Chemical spores volume ratio per cubic meter.',
      },
    ],
    example:
      '{ type: "script_weather_mist", dat: { spore_density_ratio: 0.35 } }',
  },
  {
    id: 'script_weather_static',
    name: 'Script: Dry Static Lightning',
    description:
      'Triggers sky heat lightning without moisture, casting sharp inverted shadows.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'shadow_intensity',
        type: 'number',
        required: true,
        description: 'Brightness of the contrast layers.',
      },
    ],
    example:
      '{ type: "script_weather_static", dat: { shadow_intensity: 0.95 } }',
  },
  {
    id: 'script_weather_torrential',
    name: 'Script: Torrential Floods',
    description:
      'Drives extreme driving sheet-rains that halve local vision fields in outdoors.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'vis_range_percent',
        type: 'number',
        required: true,
        description: 'Resulting horizontal vision scale output.',
      },
    ],
    example:
      '{ type: "script_weather_torrential", dat: { vis_range_percent: 50 } }',
  },
  {
    id: 'script_willow_lure',
    name: 'Script: Will-o-the-Wisp Lure',
    description:
      'Deploys moving blue coordinate anchors drawing careless players into swamp silt traps.',
    category: 'Table Outcome',
    parameters: [
      {
        name: 'lure_strength',
        type: 'number',
        required: true,
        description: 'Attraction field multiplier coefficient.',
      },
    ],
    example: '{ type: "script_willow_lure", dat: { lure_strength: 0.7 } }',
  },
  {
    id: 'show_item_presentation',
    name: 'Show Item Presentation',
    description:
      'Brings up a high-contrast visual detail card presenting important relics.',
    category: 'Narrative Orchestrator',
    parameters: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: 'Item catalog entry to present.',
      },
    ],
    example:
      '{ type: "show_item_presentation", dat: { item_id: "items.blade_of_guardianship" } }',
  },
  {
    id: 'spawn_entity',
    name: 'Spawn Entity',
    description:
      'Spawns dynamic physical structures, interactive landmarks, or tactical shields across active grids.',
    category: 'Procedural Danger',
    parameters: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description:
          'The configuration template registry address of the entity.',
      },
      {
        name: 'duration_rounds',
        type: 'number',
        required: true,
        description:
          'Lifespan measured in action cycles before automatic dissipation.',
      },
    ],
    example:
      '{ type: "spawn_entity", dat: { entity_id: "wards.weather_protection_sphere", duration_rounds: 10 } }',
  },
  {
    id: 'spell_suppression',
    name: 'Spell Suppression Ward',
    description:
      'Dispatches ancient nullifying sigil pulses, suppressing low-level defensive spells.',
    category: 'Atmospheric Control',
    parameters: [
      {
        name: 'active_sigil_tier',
        type: 'number',
        required: true,
        description: 'Rating of the pulse suppressor.',
      },
      {
        name: 'nullification_area_radius_meters',
        type: 'number',
        required: true,
        description: 'Radius range of the anti-magic field.',
      },
      {
        name: 'disruption_vector',
        type: 'string',
        required: true,
        description: 'Type of magic suppression applied.',
      },
    ],
    example:
      '{ type: "spell_suppression", dat: { active_sigil_tier: 3, nullification_area_radius_meters: 15, disruption_vector: "anti-magic-pulse" } }',
  },
  {
    id: 'temperature_drop_check',
    name: 'Temperature Drop Event',
    description:
      'Applies cold-exposure fatigue and disables passive health regeneration during extreme climate shifts.',
    category: 'Atmospheric Control',
    parameters: [],
    example: '{ type: "temperature_drop_check", dat: {} }',
  },
  {
    id: 'threat_escalation',
    name: 'Threat Escalation Check',
    description:
      'Triggers on high alert levels, spawning secondary hazard patrols and lock reinforcements.',
    category: 'Procedural Danger',
    parameters: [],
    example: '{ type: "threat_escalation", dat: {} }',
  },
  {
    id: 'update_faction_relation',
    name: 'Update Faction Relation',
    description:
      'Amends the diplomatic standings and active hostility indexes between named organizations.',
    category: 'State Modifier',
    parameters: [
      {
        name: 'faction',
        type: 'string',
        required: true,
        description: 'Target faction identifier name code.',
      },
      {
        name: 'target',
        type: 'string',
        required: true,
        description: 'Reciprocal system actor group.',
      },
      {
        name: 'new_status',
        type: 'string',
        required: true,
        description:
          "Diplomatic classification rank ('Hostile' | 'Neutral' | 'Friendly' | 'Allied').",
      },
    ],
    example:
      '{ type: "update_faction_relation", dat: { faction: "restless_spirits", target: "player_party", new_status: "Neutral" } }',
  },
  {
    id: 'update_item_state',
    name: 'Update Item State',
    description:
      'Directly reconfigures parameters of unique active objects inside inventory databases.',
    category: 'State Modifier',
    parameters: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: 'Unique catalog key registration reference.',
      },
      {
        name: 'property',
        type: 'string',
        required: true,
        description: 'Item metadata state key.',
      },
      {
        name: 'value',
        type: 'any',
        required: true,
        description: "The value applied to the item's targeting state.",
      },
    ],
    example:
      '{ type: "update_item_state", dat: { item_id: "items.aegis_of_gale", property: "awakened", value: true } }',
  },
  {
    id: 'update_journal_node',
    name: 'Update Journal Node',
    description:
      'Tracks active quests, updating objective log progression tiers dynamically.',
    category: 'State Modifier',
    parameters: [
      {
        name: 'quest_id',
        type: 'string',
        required: true,
        description: 'Specific quest sheet registration code.',
      },
      {
        name: 'node',
        type: 'string',
        required: true,
        description: 'Quest node progress milestone identifier.',
      },
      {
        name: 'new_state',
        type: 'string',
        required: true,
        description:
          "Progression tier coordinates ('inactive' | 'active' | 'completed' | 'failed').",
      },
    ],
    example:
      '{ type: "update_journal_node", dat: { quest_id: "mq_vorguns_peace", node: "Spirit Climax Resolution", new_state: "completed" } }',
  },
  {
    id: 'update_world_state',
    name: 'Update World State',
    description:
      'Mutates regional boolean flags, timer counts, or text registers in the global database state.',
    category: 'State Modifier',
    parameters: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: 'The target status directory address point to alter.',
      },
      {
        name: 'value',
        type: 'any (boolean | string | number)',
        required: true,
        description: 'The updated state to assign to the key.',
      },
    ],
    example:
      '{ type: "update_world_state", dat: { key: "storms_cease_fully", value: true } }',
  },
];

const getCategoryStyles = (category: string) => {
  switch (category) {
    case 'Narrative Orchestrator':
      return 'bg-[#EEF2F6] border-indigo-200/55 text-indigo-950 font-bold';
    case 'Atmospheric Control':
      return 'bg-[#ECFDFC] border-cyan-300/40 text-cyan-900 font-bold';
    case 'State Modifier':
      return 'bg-[#FFF9E6] border-amber-300/40 text-amber-950 font-bold';
    case 'Combat Resolution':
      return 'bg-[#FFF1F2] border-rose-300/40 text-rose-950 font-bold';
    case 'Procedural Danger':
      return 'bg-[#FEF2F2] border-red-300/40 text-red-950 font-bold';
    case 'Automated Process':
      return 'bg-[#F3E8FF] border-purple-300/40 text-purple-950 font-bold';
    case 'Loot & Resource Distribution':
      return 'bg-[#ECFDF5] border-emerald-300/40 text-emerald-950 font-bold';
    case 'Table Outcome':
      return 'bg-[#FAF7EF] border-neutral-300/40 text-[#4338CA] font-bold';
    default:
      return 'bg-[#F3F4F6] border-stone-300/40 text-stone-900 font-bold';
  }
};

const cleanExample = (example: string) => {
  return example.replace(/type:\s*"([a-zA-Z0-9_:]+)"/, (match, p1) => {
    const cleanPart = p1
      .split(':')
      .map((part: string) => {
        return part.replace(/_([a-z0-0])/g, (_: unknown, letter: string) =>
          letter.toUpperCase(),
        );
      })
      .join(':');
    return `type: "${cleanPart}"`;
  });
};

export function ScriptsRegistry() {
  const sortedSpecs = [...SCRIPT_SPECIFICATIONS].sort((x, y) =>
    x.id.localeCompare(y.id),
  );

  return (
    <section
      id="section-scripts-registry"
      className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6"
    >
      <div className="flex items-center justify-between border-b border-black pb-3">
        <div className="flex items-center gap-2">
          <Braces className="w-5 h-5 text-neutral-700 font-bold" />
          <h2 className="font-serif text-xl font-black uppercase tracking-wide text-neutral-900">
            Automated Script Signatures
          </h2>
        </div>
        <span className="font-mono text-[9px] bg-neutral-900 text-stone-100 px-2 py-1 rounded font-bold uppercase">
          {SCRIPT_SPECIFICATIONS.length} FUNCTIONS COPIED
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 font-mono text-xs">
        {sortedSpecs.map((spec) => (
          <div
            key={spec.id}
            className="border border-neutral-300 rounded p-4 bg-white/90 flex flex-col gap-3.5 shadow-xs"
          >
            <div className="flex justify-between items-start gap-2 border-b border-neutral-100 pb-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-serif font-black text-sm uppercase text-neutral-900 tracking-wide">
                  {spec.name.replace(/^Script:\s*/i, '')}
                </span>
                <code className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.25 font-bold rounded select-all w-fit">
                  {spec.id}
                </code>
              </div>
              <span
                className={`text-[8.5px] border px-2 py-0.5 rounded uppercase text-right leading-none ${getCategoryStyles(spec.category)}`}
              >
                {spec.category}
              </span>
            </div>

            <p className="text-[11px] text-neutral-600 leading-normal font-sans">
              {spec.description}
            </p>

            {spec.parameters.length > 0 ? (
              <div>
                <span className="text-[9px] uppercase font-bold text-neutral-400 block mb-1.5">
                  Parameters Interface Signature
                </span>
                <div className="flex flex-col gap-1.5 bg-neutral-50 border border-neutral-200 p-2.5 rounded">
                  {spec.parameters.map((param) => (
                    <div
                      key={param.name}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[10px] pb-1.5 border-b border-neutral-150 last:border-0 last:pb-0"
                    >
                      <div className="flex gap-2 flex-wrap items-baseline">
                        <code className="text-black font-extrabold select-all">
                          {param.name}
                        </code>
                        <span className="text-neutral-400 font-normal text-[8.5px]">
                          ({param.type})
                        </span>
                        {param.required && (
                          <span className="text-rose-600 font-sans font-black text-[7.5px] uppercase tracking-wide">
                            [Required]
                          </span>
                        )}
                      </div>
                      <span className="text-neutral-500 sm:text-right font-sans text-[10px] max-w-xs">
                        {param.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[9px] uppercase font-bold text-neutral-450 block mb-1">
                  Parameters Interface Signature
                </span>
                <div className="text-[9px] text-neutral-400 italic bg-neutral-50 border border-neutral-200 px-2.5 py-2 rounded">
                  No parameters required for this automation trigger.
                </div>
              </div>
            )}

            <div>
              <span className="text-[9px] uppercase font-bold text-neutral-400 block mb-1">
                Code Pattern Example
              </span>
              <code className="block bg-neutral-900 text-amber-400 text-[9.5px] p-2 rounded border border-neutral-950 overflow-x-auto whitespace-pre select-all">
                {cleanExample(spec.example)}
              </code>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
