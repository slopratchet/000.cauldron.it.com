/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Adventure } from './types';

export const DEFAULT_ADVENTURE: Adventure = {
  meta: {
    adventure_id: 'VS-01',
    title: 'The Vengeful Storm',
    authors: ['Master Architect'],
    schemaVersion: '13.0_AAA_Engine',
    design_philosophy: '4 hours etc',
    system: 'D&D 5th Edition (SRD 5.2)',
    character_levels: '3-5',
  },

  safety_and_accessibility: {
    content_warnings: ['Child Endangerment', 'Drowning', 'Grief/Loss'],
    dynamic_filters: {
      filter_arachnophobia: {
        target_entity: 'monsters.giant_spider',
        replacement_entity: 'monsters.venomous_vine_blight',
        text_scrub_array: [
          'webs',
          'spiders',
          'skittering',
          'eight legs',
          'spinnerets',
        ],
      },
    },
  },

  theme: {
    core_concept: 'Guardianship vs. Plunder',
    moral_question:
      'Is peace achieved through violence, or through understanding and restoration?',
    mood: 'Melancholic, tense, mysterious, with moments of awe and terror.',
  },

  narrative: {
    synopsis:
      'The village of Oakhaven is beset by unnatural storms emanating from the tomb of a long-dead Storm Giant. Players must brave the storm-wracked Barrowmoors to find the source of the disturbance.',
    dramatis_personae: {
      elara: 'The elder ritualist of Oakhaven and the primary quest-giver.',
      vorgun:
        'The ancient Storm Giant guardian whose spirit is now in anguish.',
      kailina:
        "Vorgun's deceased daughter, whose spirit is deeply anchored inside the barrow monument and yearns for peace.",
      elric:
        "Oakhaven's historical founder, who established the wardstones but originally stole the monolith cores.",
    },
    story_beats: {
      paradigm: 'three_act_structure',
      beats: {
        inciting_incident: {
          name: 'The Missing Boy',
          linked_scene: 'scene_arrival_at_oakhaven',
        },
        plot_point_1: {
          name: 'Entering the Moors',
          linked_scene: 'scene_journey_barrowmoors',
        },
        midpoint: {
          name: "The Thieves' Diary",
          linked_scene: 'scene_journey_barrowmoors',
        },
        climax: {
          name: 'The Moral Choice',
          linked_scene: 'scene_burial_chamber_climax',
        },
      },
    },
  },

  journal: {
    main_quest: {
      id: 'mq_vorguns_peace',
      title:
        'Quiet the endless tempest by pacifying the restless storm giant spirit of Vorgun',
      stages: {
        'Social Investigation': {
          objective:
            "Social Investigation - Uncover the root cause of the endless tempest by investigating the Oakhaven warding stones, questioning council elders, and exploring hidden records regarding Vorgun's ancient pact.",
          state: 'completed',
          trigger_start: 'adventure_start',
          xp_reward: 500,
          sub_nodes: [
            {
              id: 'node_1_sub_1',
              objective: 'Interview Council Elder Elara in Oakhaven tavern.',
              state: 'completed',
              xp_reward: 150,
            },
            {
              id: 'node_1_sub_2',
              objective:
                'Inspect the damaged warding stone in the town center.',
              state: 'completed',
              xp_reward: 150,
            },
          ],
        },
        'Wilderness Exploration': {
          objective:
            "Wilderness Exploration - Navigating the perilous, mist-shrouded Barrowmoors to locate the ancient sentinel standing stones, survival guides, and forgotten pathways holding clues to the giants' curse.",
          state: 'active',
          trigger_start: 'scene_journey_barrowmoors',
          xp_reward: 800,
          sub_nodes: [
            {
              id: 'node_2_sub_1',
              objective: 'Locate and translate the three Runes of Binding.',
              state: 'active',
              xp_reward: 250,
            },
            {
              id: 'node_2_sub_2',
              objective:
                'Bypass or defeat the Barrowmoor Hag guarding the gate.',
              state: 'locked',
              xp_reward: 350,
            },
          ],
        },
        'Spirit Climax Resolution': {
          objective:
            "Spirit Climax Resolution - Infiltrating the deep barrow chambers beneath the highland crags, facing the spectral warden, and performing the sacred ritual of binding memory to calm Vorgun's rage.",
          state: 'locked',
          trigger_start: 'scene_burial_chamber_climax',
          xp_reward: 1500,
          sub_nodes: [
            {
              id: 'node_3_sub_1',
              objective: 'Breach the inner Burial Chamber.',
              state: 'locked',
              xp_reward: 400,
            },
            {
              id: 'node_3_sub_2',
              objective:
                "Soothe the eternal lament of Vorgun's restless spirit.",
              state: 'locked',
              xp_reward: 600,
            },
          ],
        },
      },
    },
  },

  party_integration: {
    background_hooks: {
      acolyte: {
        linked_secret: 'secret_vorguns_true_death',
        bonus: 'Advantage on Religion checks to decipher runes.',
        location: 'Highland Warding Shrine',
      },
      criminal: {
        linked_secret: 'secret_smugglers_tunnel',
        bonus:
          'Knowledge of damp tunnels under the moors; bypasses one hazard challenge.',
        location: 'Smuggler Moors Outpost',
      },
      sage: {
        linked_secret: 'secret_ancient_pact',
        bonus:
          'Can translate ancient giant celestial scriptures without any ability checks.',
        location: 'Scribes Ancient Library',
      },
      soldier: {
        linked_secret: 'secret_giant_guard_tactics',
        bonus:
          'Gain +2 to bonus damage during encounters inside giant-themed locations.',
        location: 'Garrison Watchtower',
      },
      outlander: {
        linked_secret: 'secret_willow_wisp',
        bonus:
          'Immune to navigation penalties caused by dense swamp fog of the moors.',
        location: 'Whispering Heath Moors',
      },
      folk_hero: {
        linked_secret: 'secret_ritualist_herbal',
        bonus:
          'Allows players to double healing from short rest rations within Oakhaven.',
        location: 'Oakhaven Town Square',
      },
      hermit: {
        linked_secret: 'secret_lost_conclave',
        bonus:
          'Can hear telepathic residual memories on touch of any stone relics.',
        location: 'Solitary Crag Hermitage',
      },
      noble: {
        linked_secret: 'secret_founders_betrayal',
        bonus:
          'Direct high-profile alignment check benefits with town council elders.',
        location: 'Oakhaven High Manor',
      },
    },
  },

  chronology: {
    calendar_system: 'Standard_365',
    day_of_week: 'Moonday',
    month: 'Olarune',
    year: 998,
    celestial_bodies: [
      {
        name: 'The Weeping Moon',
        current_phase: 'Waxing Crescent',
        mechanical_impact:
          'Undead gain +1 to attack rolls while the moon is visible.',
      },
    ],
    daily_cycle: {
      dawn: '06:00',
      dusk: '18:00',
      on_dawn: { action: 'execute_procedure', proc_id: 'proc_dawn_blessing' },
      on_dusk: { action: 'execute_procedure', proc_id: 'proc_night_terrors' },
    },
  },

  lore_web: {
    secrets: {
      secret_vorguns_true_death: {
        id: 'secret_vorguns_true_death',
        truth:
          'Vorgun willingly bound his spirit to the Heart of the Storm to act as an eternal guardian.',
        clues_required: 3,
        clue_locations: [
          'handout_thieves_diary',
          'dialogue_elara_secret',
          'rune_memory_vision',
        ],
        xp_reward: 500,
      },
      secret_smugglers_tunnel: {
        id: 'secret_smugglers_tunnel',
        truth:
          'There is an old, half-collapsed mining shaft that leads directly behind the Oakhaven shrine into the Barrowmoors.',
        clues_required: 2,
        clue_locations: ['map_fragment', 'guild_ledger'],
        xp_reward: 300,
      },
      secret_ancient_pact: {
        id: 'secret_ancient_pact',
        truth:
          'The founders of Oakhaven swore an oath to never take gold or weapons from the burial mounds of the Storm Giants.',
        clues_required: 2,
        clue_locations: ['sacred_tome', 'altar_inscription'],
        xp_reward: 400,
      },
      secret_giant_guard_tactics: {
        id: 'secret_giant_guard_tactics',
        truth:
          "Vorgun's stone guards are vulnerable to thunder damage because of microfissures in their outer crystalline plating.",
        clues_required: 1,
        clue_locations: ['blacksmith_notes'],
        xp_reward: 200,
      },
      secret_willow_wisp: {
        id: 'secret_willow_wisp',
        truth:
          "Will-o'-wisps in the swamp are actually the souls of original builders trying to guide travelers away from hazardous traps.",
        clues_required: 2,
        clue_locations: ['spirit_dialogue', 'weathered_gravestone'],
        xp_reward: 250,
      },
      secret_founders_betrayal: {
        id: 'secret_founders_betrayal',
        truth:
          'Oakhaven town founder Elric was the one who stole the original warding stone core, triggering the infinite rain storm.',
        clues_required: 3,
        clue_locations: [
          'diary_entry_7',
          'underground_shrine_inscription',
          'ancient_key_engraving',
        ],
        xp_reward: 600,
      },
      secret_weeping_cairn: {
        id: 'secret_weeping_cairn',
        truth:
          'The weeping cairn on the eastern swamp border is actually a high-density water elemental node draining localized wild magic streams.',
        clues_required: 2,
        clue_locations: ['ritualist_herbal', 'cairn_engravings'],
        xp_reward: 350,
      },
      secret_hag_alliance: {
        id: 'secret_hag_alliance',
        truth:
          "The Barrowmoor Hag was once Elder Elara's older sister, mutated decades ago by a cursed bargain with the primordial swamp deities.",
        clues_required: 3,
        clue_locations: [
          'forgotten_letter',
          'elara_bedroom_diary',
          'hag_confession',
        ],
        xp_reward: 500,
      },
      secret_drowned_catacombs: {
        id: 'secret_drowned_catacombs',
        truth:
          'There is a subterranean aquatic path directly to the burial chamber that is accessible only when the tide indicator falls below d4 dice thresholds.',
        clues_required: 2,
        clue_locations: ['fisher_tales', 'mossy_hatch'],
        xp_reward: 300,
      },
      secret_vorgun_affinity: {
        id: 'secret_vorgun_affinity',
        truth:
          "Vorgun's ghost will immediately stop attacks if an adventurer holds the celestial vial aloft and speaks his deceased daughter's true name 'Kailina'.",
        clues_required: 1,
        clue_locations: ['family_shrine_records'],
        xp_reward: 250,
      },
      secret_star_map: {
        id: 'secret_star_map',
        truth:
          "The celestial star coordinates engraved high upon the chamber's roof reveal the real locations of three other ancient giant storm bastions across the continent.",
        clues_required: 2,
        clue_locations: ['buried_astrolabe', 'tomb_pillars'],
        xp_reward: 450,
      },
    },
  },

  tension_engine: {
    pool_mechanic: {
      max_dice: 6,
      die_type: 'd10',
      triggers_to_add_die: [
        'player_action:search_room_carefully',
        'player_fails_stealth_check',
        'player_action:spellcast_unveils_ward',
        'player_action:prolonged_rest_in_wild',
        'player_action:touch_relic_without_ritual',
      ],
      triggers_to_roll_pool: ['pool_reaches_max', 'player_action:loud_noise'],
      on_roll_complication: {
        condition: 'roll_contains_1',
        action: 'execute_procedure',
        proc_id: 'proc_storm_escalates',
      },
    },
    categories: [
      {
        category_name: 'Storm Fury',
        description:
          "Atmospheric hazards brought on by Vorgun's mounting frustration.",
        sub_complications: [
          {
            name: 'Forked Lightning Strike',
            description:
              'Direct static discharge targeting metallic weapons or armor.',
            severity: 'High',
          },
          {
            name: 'Gale-Force Winds',
            description:
              'All projectile attacks and airborne navigation suffer extreme penalties.',
            severity: 'Medium',
          },
          {
            name: 'Pelting Hail',
            description:
              'Restricted visibility and continuous low-level cold damage over time.',
            severity: 'Low',
          },
        ],
      },
      {
        category_name: 'Swamp Terrors',
        description:
          'The flora and fauna of the Barrowmoors stirred into aggression.',
        sub_complications: [
          {
            name: 'Sinking Quicksand',
            description:
              'Characters are trapped and restrained, requiring structural athletics to escape.',
            severity: 'High',
          },
          {
            name: "Will-o'-Wisp Lure",
            description:
              'Magical lights confuse party navigation, causing a random detour on the hex grid.',
            severity: 'Medium',
          },
          {
            name: 'Stagnant Gas Pocket',
            description:
              'Highly flammable or toxic swamp gas can ignite or poison the party.',
            severity: 'Medium',
          },
        ],
      },
      {
        category_name: 'Ancient Curse',
        description:
          'Metaphysical echo anomalies stemming from ancient giant stone architecture.',
        sub_complications: [
          {
            name: 'Haunting Voice of Vorgun',
            description:
              'Fear-driven saving throwing checks against auditory memories of giant elders.',
            severity: 'High',
          },
          {
            name: 'Runic Feedback Siphon',
            description:
              'Spells cast within 100 feet trigger magical backfires, draining slot charges.',
            severity: 'Medium',
          },
          {
            name: 'Stony Gaze projection',
            description:
              'Ancient giant statues track eyes, petrifying flesh momentarily.',
            severity: 'High',
          },
        ],
      },
      {
        category_name: 'Resource Attrition',
        description:
          'The degradation of equipment and mental fatigue in high stress.',
        sub_complications: [
          {
            name: 'Spoiled Rations',
            description:
              'Swamp moisture destroys supply packs, reducing short rest healing output.',
            severity: 'Low',
          },
          {
            name: 'Damp Torch Ignition Failure',
            description:
              'Lighting items fail to combust, relying entirely on magical vision.',
            severity: 'Low',
          },
          {
            name: 'Rusting Crystals',
            description:
              'Acidic mire weakens non-magical shields, reducing armor durability.',
            severity: 'Medium',
          },
        ],
      },
    ],
  },

  audiovisual_cues: {
    soundscapes: {
      bgm_storm_exterior: {
        asset_path: 'audio/music/storm_tense.mp3',
        loop: true,
      },
      bgm_sorrowful_ambient: {
        asset_path: 'audio/music/tomb_choir.mp3',
        loop: true,
      },
      sfx_storm_fading: {
        asset_path: 'audio/sfx/storm_fading.wav',
        loop: false,
      },
    },
    lighting_states: {
      village_dusk: {
        ambient_light: '#4A5568',
        fog_of_war: false,
        directional_light: '#A0AEC0',
        intensity: 0.4,
        vtt_temperature_c: 16,
        grid_interference_pct: 2,
        chromatic_dispersion_index: 'Standard Rayleigh (Stable)',
        climate_phenomenon: 'Humid swamp air drafts with low silver drizzle',
      },
      tomb_interior: {
        ambient_light: '#1A1A24',
        fog_of_war: true,
        intensity: 0.1,
        vtt_temperature_c: 8,
        grid_interference_pct: 15,
        chromatic_dispersion_index: 'Dense Grave-Silt Spore (Low Scattering)',
        climate_phenomenon:
          'Cold bone-dry drafts carrying deep dust suspension',
      },
      bright_warm_light: {
        ambient_light: '#FAD6A5',
        fog_of_war: false,
        intensity: 1.0,
        vtt_temperature_c: 24,
        grid_interference_pct: 0,
        chromatic_dispersion_index:
          'Pristine Solar Clear-field (Zero Refraction)',
        climate_phenomenon: 'Warm thermals with stable, dust-free updrafts',
      },
    },
    vfx_states: {
      heavy_rain_particle: {
        asset_path: 'vfx/particles/rain_heavy.pfx',
        density: 0.8,
      },
      ghost_aura_particle: {
        asset_path: 'vfx/particles/spirit_aura_blue.pfx',
        density: 0.5,
      },
    },
    environment_groups: {
      preset_stormy_village: {
        name: 'Stormy Village Preset',
        description: 'Binds the active rain storm to the dusk village setting.',
        soundscape_id: 'bgm_storm_exterior',
        lighting_id: 'village_dusk',
        vfx_id: 'heavy_rain_particle',
      },
      preset_gloomy_tomb: {
        name: 'Gloomy Tomb Chamber Preset',
        description:
          'Binds heavy tomb crypt lighting, sorrowful music, and spirit auras.',
        soundscape_id: 'bgm_sorrowful_ambient',
        lighting_id: 'tomb_interior',
        vfx_id: 'ghost_aura_particle',
      },
      preset_peaceful_shrine: {
        name: 'Peaceful Cleared Shrine Preset',
        description:
          'Binds fading storms, bright warm light, and clear calm atmosphere.',
        soundscape_id: 'sfx_storm_fading',
        lighting_id: 'bright_warm_light',
        vfx_id: 'ghost_aura_particle',
      },
    },
  },

  definitions: {
    entities: {
      monsters: {
        vorguns_ghost: {
          name: 'Ghost of Vorgun',
          base_stat_block: 'Ghost',
          hp: 75,
          size: 'Huge',
          default_vfx: 'ghost_aura_particle',
          locations: [
            'Burial Mound',
            'Inner Tomb Sarcophagus Chamber',
            'Ancient Spirit Throne Room',
          ],
          xp_reward: 1800,
        },
        barrow_ghoul: {
          name: 'Barrow Ghoul',
          base_stat_block: 'Ghoul',
          hp: 22,
          size: 'Medium',
          default_vfx: 'decay_cloud_particle',
          locations: [
            'Damp Barrowmoors',
            'The Forgotten Crypts',
            'Highlands Cemetery Outskirts',
          ],
          xp_reward: 450,
        },
        lightning_mephit: {
          name: 'Lightning Mephit',
          base_stat_block: 'Mephit',
          hp: 21,
          size: 'Small',
          default_vfx: 'spark_aura_particle',
          locations: [
            'Sentinel Stone Monoliths',
            'Western Leyline Conduit',
            'Whispering Heath Summit',
          ],
          xp_reward: 200,
        },
        barrowmoor_hag: {
          name: 'Barrowmoor Hag',
          base_stat_block: 'Green Hag',
          hp: 82,
          size: 'Medium',
          default_vfx: 'swamp_fog_particle',
          locations: [
            'Mistwood Wilds Swamp',
            'Elder-Lotus Glade',
            'Barrowmoor Smuggler Marsh-Hollow',
          ],
          xp_reward: 700,
        },
      },
      npcs: {
        elara: {
          name: 'Elara',
          location: 'Oakhaven Council Chambers',
          roleplaying: {
            ideal: 'Community',
            flaw: 'Deeply suspicious of outsiders',
          },
        },
        brennan: {
          name: 'Brennan the Blacksmith',
          location: 'Oakhaven Blacksmith Workshop',
          roleplaying: {
            ideal: 'Craftsmanship',
            flaw: 'Extremely stubborn and narrow-minded',
          },
        },
        kaelen: {
          name: 'Father Kaelen',
          location: 'Oakhaven Sanctuary Shrine',
          roleplaying: {
            ideal: 'Faith',
            flaw: 'Naively trusts that good resolves everything',
          },
        },
        mira: {
          name: 'Mira the Tavernkeep',
          location: 'Oakhaven Weeping Willow Tavern',
          roleplaying: {
            ideal: 'Hospitality',
            flaw: 'Gossip-monger who leaks customer secrets',
          },
        },
        dorn: {
          name: 'Dorn of the North',
          location: 'Oakhaven Town Border Gates',
          roleplaying: {
            ideal: 'Vengeance',
            flaw: 'Refuses to adapt to local traditions',
          },
        },
        lysandra: {
          name: 'Lady Lysandra',
          location: 'Oakhaven High Manor',
          roleplaying: {
            ideal: 'Honor',
            flaw: 'Cares more about reputation than safety',
          },
        },
        silas: {
          name: 'Silas the Smuggler',
          location: 'Barrowmoor Smuggler Marsh-Hollow',
          roleplaying: {
            ideal: 'Freedom',
            flaw: 'Greedy and easily bought off in a crisis',
          },
        },
        valya: {
          name: 'Valya the Herbalist',
          location: 'Barrowmoor Elder-Lotus Glade',
          roleplaying: {
            ideal: 'Knowledge',
            flaw: 'Secretive about herb sources and recipes',
          },
        },
        rowan: {
          name: 'Rowan the Ranger',
          location: 'Barrowmoor Mistwood Wilds',
          roleplaying: {
            ideal: 'Nature Protection',
            flaw: 'Extremely antisocial and avoids Oakhaven',
          },
        },
        theron: {
          name: 'Theron the Scribe',
          location: 'Oakhaven Archives Hall',
          roleplaying: {
            ideal: 'Truth Preservation',
            flaw: 'Physically cowardly and panics easily',
          },
        },
        althea: {
          name: 'Althea the Seer',
          location: 'Barrowmoor Forgotten Family Shrine',
          roleplaying: {
            ideal: 'Insight',
            flaw: 'Speaks always in vague double-meanings',
          },
        },
        gideon: {
          name: 'Commander Gideon',
          location: 'Oakhaven Guard Headquarters',
          roleplaying: {
            ideal: 'Duty',
            flaw: 'Blindly follows outdated imperial directives',
          },
        },
        eldrida: {
          name: 'Eldrida the Weeper',
          location: 'Barrowmoor Mourner Cairn',
          roleplaying: {
            ideal: 'Remembrance',
            flaw: 'Prone to severe melancholic trances',
          },
        },
        fletcher: {
          name: 'Fletcher the Fletcher',
          location: 'Oakhaven Archery Ranges',
          roleplaying: {
            ideal: 'Precision',
            flaw: 'Obsessed with perfect symmetry',
          },
        },
        jorund: {
          name: 'Jorund the Stonecutter',
          location: 'Oakhaven Quarry Site',
          roleplaying: {
            ideal: 'Endurance',
            flaw: 'Extremely slow to take any critical action',
          },
        },
        brishen: {
          name: 'Brishen the Fortune Teller',
          location: 'Oakhaven Caravan Guild',
          roleplaying: {
            ideal: 'Fate Acceptance',
            flaw: 'Manipulates predictions for pocket change',
          },
        },
        orla: {
          name: 'Orla the Swampsinger',
          location: 'Barrowmoor Sunken Swampland',
          roleplaying: {
            ideal: 'Harmony',
            flaw: 'Mesmerized by deadly marsh echoes',
          },
        },
        cassian: {
          name: 'Cassian the Rogue',
          location: 'Oakhaven Back-Alley Den',
          roleplaying: {
            ideal: 'Acrobatics',
            flaw: 'Incurable compulsive gambler',
          },
        },
        thora: {
          name: 'Thora the Shieldmaiden',
          location: 'Oakhaven Practice Ring',
          roleplaying: {
            ideal: 'Protection',
            flaw: 'Quick-tempered and starts tavern brawls',
          },
        },
        finbar: {
          name: 'Finbar the Fisher',
          location: 'Barrowmoor Cold Swamp Ridge',
          roleplaying: {
            ideal: 'Simplicity',
            flaw: 'Always exaggerates the size of his catches',
          },
        },
      },
      items: {
        blade_of_guardianship: {
          name: 'Blade of Guardianship',
          type: 'Magic Greatsword',
          properties: 'Sentient (Lawful Good)',
          location: "Vorgun's Sarcophagus Vault",
          xp_reward: 500,
        },
        stormrider_ring: {
          name: 'Stormrider Ring',
          type: 'Ring',
          properties: 'Provides absolute immunity to electrical shocks',
          location: 'Oakhaven Shrine Altar Box',
          xp_reward: 300,
        },
        barrow_scepter: {
          name: 'Barrow-Stone Scepter',
          type: 'Scepter',
          properties:
            'Deals bonus damage specifically to hollow earth creatures',
          location: 'Barrowmoor Whispering Mounds',
          xp_reward: 350,
        },
        celestial_vial: {
          name: 'Vial of Celestial Tears',
          type: 'Vial',
          properties: 'Cures all minor physical and magical ailments instantly',
          location: 'Barrowmoor Family Shrine Records',
          xp_reward: 250,
        },
        crystalline_shield: {
          name: 'Crystalline Aegis',
          type: 'Shield',
          properties: 'Can reflect a light spell back at its original caster',
          location: 'Oakhaven Council Vault',
          xp_reward: 300,
        },
        skyward_bow: {
          name: 'Skyward Gaze Longbow',
          type: 'Longbow',
          properties:
            'Allows aiming clearly from the ground through dense storms',
          location: 'Barrowmoor Treehouse Blind',
          xp_reward: 400,
        },
        giants_girdle: {
          name: 'Belt of Giant Might',
          type: 'Belt',
          properties: 'Temporarily grants raw strength to lift minor boulders',
          location: "Vorgun's Burial Guard Chamber",
          xp_reward: 450,
        },
        gale_boots: {
          name: 'Gale-Step Boots',
          type: 'Boots',
          properties: 'Increases standard tactical speed over wetlands',
          location: 'Barrowmoor Wet Silt Reach',
          xp_reward: 250,
        },
        thunder_cleaver: {
          name: 'Thunder-Cleaver Battleaxe',
          type: 'Battleaxe',
          properties: 'Produces a loud boom when dealing critical hits',
          location: 'Oakhaven Founders Memorial',
          xp_reward: 350,
        },
        sentinel_cloak: {
          name: 'Sentinel Cloak of Vorgun',
          type: 'Cloak',
          properties: 'Allows silent movement while a heavy downpour is active',
          location: "Vorgun's Deep Sarcophagus Alcove",
          xp_reward: 300,
        },
        conduit_staff: {
          name: 'Stormcore Conduit Staff',
          type: 'Staff',
          properties: 'Directs passive magic streams without draining slots',
          location: 'Barrowmoor Weeping Cairn Altar',
          xp_reward: 350,
        },
        runic_pennant: {
          name: 'Standard of the Restless',
          type: 'Banner',
          properties: "Steadies allies' courage within 30 feet",
          location: 'Oakhaven Guard Watchtower',
          xp_reward: 200,
        },
        storm_beacon: {
          name: 'Heart Beacon Core',
          type: 'Relic Core',
          properties: 'Emits a soft pulse that reveals near invisible glyphs',
          location: "Vorgun's Tomb Inner Crypt",
          xp_reward: 600,
        },
        ancient_key: {
          name: "Elric's Founder Ring Key",
          type: 'Key Ring',
          properties: "Unlocks the secure iron vault inside Oakhaven's shrine",
          location: "Oakhaven Elder's Private Chest",
          xp_reward: 150,
        },
      },
    },
    tables: {
      storm_echoes: {
        name: 'Storm Echoes Table',
        roll_type: 'd12',
        auto_trigger: {
          type: 'event',
          event_name: 'per_hex_traveled',
          condition: 'is_outdoors == true',
        },
        entries: [
          { roll: 1, name: 'Echo of Sorrow', script_id: 'script_echo_sorrow' },
          { roll: 2, name: 'Echo of Battle', script_id: 'script_echo_battle' },
          {
            roll: 3,
            name: 'A sudden chill sweeps the moors',
            script_id: 'script_cold_snap',
          },
          {
            roll: 4,
            name: "The weeping giant's face appears in clouds",
            script_id: 'script_cloud_face',
          },
          {
            roll: 5,
            name: 'A lightning bolt strikes an ancient hollow tree',
            script_id: 'script_lightning_strike',
          },
          {
            roll: 6,
            name: 'A surge of magical electricity fills the humid air',
            script_id: 'script_power_surge',
          },
          {
            roll: 7,
            name: 'A wave of static whisperings that sound like lost names',
            script_id: 'script_static_whispers',
          },
          {
            roll: 8,
            name: 'The ground shakes from a distant subterranean thunderclap',
            script_id: 'script_distant_quake',
          },
          {
            roll: 9,
            name: 'Phantom blue rain that does not wet physical garments',
            script_id: 'script_phantom_rain',
          },
          {
            roll: 10,
            name: 'Runic wind picks up, carrying fine glowing sand crystals',
            script_id: 'script_runic_sand',
          },
          {
            roll: 11,
            name: 'Wailing flutes echo in the gusts from the Eastern Peak',
            script_id: 'script_wailing_winds',
          },
          {
            roll: 12,
            name: 'A sudden eclipse forces dusk state light levels',
            script_id: 'script_eclipse_state',
          },
        ],
      },
      wilderness_hazards: {
        name: 'Wilderness Hazards Table',
        roll_type: 'd8',
        auto_trigger: {
          type: 'event',
          event_name: 'on_failed_navigation',
          condition: 'is_swamp == true',
        },
        entries: [
          { roll: 1, name: 'Quicksand Sinkhole', script_id: 'script_sinkhole' },
          { roll: 2, name: 'Acidic Muck Spores', script_id: 'script_spores' },
          {
            roll: 3,
            name: 'Swamp Gas Explosion',
            script_id: 'script_gas_explosion',
          },
          { roll: 4, name: 'Swarm of Leeches', script_id: 'script_leeches' },
          {
            roll: 5,
            name: 'Runic Arc Arc-Lightning Static Shock',
            script_id: 'script_arc_shock',
          },
          {
            roll: 6,
            name: 'Barrowmoor Silt Mudslide',
            script_id: 'script_mudslide',
          },
          {
            roll: 7,
            name: 'Hallucinogenic Marsh Fern Pollen',
            script_id: 'script_fern_pollen',
          },
          {
            roll: 8,
            name: 'Spectral Willow-the-Wisp Lure',
            script_id: 'script_willow_lure',
          },
        ],
      },
      loot_cache: {
        name: 'Ancient Barrows Treasure Cache',
        roll_type: 'd6',
        auto_trigger: {
          type: 'event',
          event_name: 'on_investigate_barrow_grave',
          condition: 'roll_success == true',
        },
        entries: [
          {
            roll: 1,
            name: 'A small leather pouch filled with pristine giant-sized electrum coins',
            script_id: 'script_loot_electrum',
          },
          {
            roll: 2,
            name: 'An ornate iron brooch shaped like a cresting tidal wave',
            script_id: 'script_loot_brooch',
          },
          {
            roll: 3,
            name: 'A translucent opal vial containing glowing storm-water distillate',
            script_id: 'script_loot_potion',
          },
          {
            roll: 4,
            name: 'A fragile map fragment charting subterranean stream bypass channels',
            script_id: 'script_loot_map',
          },
          {
            roll: 5,
            name: 'A polished silver sacrificial rod that sparks slightly to the touch',
            script_id: 'script_loot_rod',
          },
          {
            roll: 6,
            name: 'A cracked giant ring carved from black volcanic obsidian',
            script_id: 'script_loot_ring',
          },
        ],
      },
      weather_patterns: {
        name: 'Barrowmoor Meteorological Weather Patterns',
        roll_type: 'd6',
        auto_trigger: {
          type: 'event',
          event_name: 'hourly_climate_shift',
          condition: 'is_outdoors == true',
        },
        entries: [
          {
            roll: 1,
            name: 'Drizzling, heavy mist containing blue bio-luminescent swamp spores',
            script_id: 'script_weather_mist',
          },
          {
            roll: 2,
            name: 'Severe, driving sheet-rain that cuts horizontal visual range by half',
            script_id: 'script_weather_torrential',
          },
          {
            roll: 3,
            name: 'Eerie silence with static sky heat lightning that casts negative shadows',
            script_id: 'script_weather_static',
          },
          {
            roll: 4,
            name: 'Swirling winds carrying the distant, low humming of colossal chimes',
            script_id: 'script_weather_gales',
          },
          {
            roll: 5,
            name: 'Cold, bone-chilling swamp fog that triggers a sensory numbness',
            script_id: 'script_weather_chill',
          },
          {
            roll: 6,
            name: 'A sudden, brief break in cloud cover, letting pale moonlight stream in',
            script_id: 'script_weather_clear',
          },
        ],
      },
      giant_runes: {
        name: 'Translating Giant Monumental Glyphs',
        roll_type: 'd6',
        auto_trigger: {
          type: 'event',
          event_name: 'on_decipher_runes',
          condition: 'intelligence_arcana_success == true',
        },
        entries: [
          {
            roll: 1,
            name: "The Glyph of Kailina: translating to 'Endless Sorrow of the Heavens'",
            script_id: 'script_rune_kailina',
          },
          {
            roll: 2,
            name: 'The Ward of Binding: detailing a pact made between giant-kin and first settlers',
            script_id: 'script_rune_binding',
          },
          {
            roll: 3,
            name: 'The Sigil of Storm-Call: describing a ritual to channel lightning into wardstones',
            script_id: 'script_rune_storm',
          },
          {
            roll: 4,
            name: "The Seal of Resignation: denoting the giant's voluntary sacrifice to anchor storms",
            script_id: 'script_rune_seal',
          },
          {
            roll: 5,
            name: 'The Crest of the Great Architect: warning of a severe curse on grave robbing',
            script_id: 'script_rune_crest',
          },
          {
            roll: 6,
            name: 'The Rune of Infinite Sky: detailing the location of secondary planar gates',
            script_id: 'script_rune_sky',
          },
        ],
      },
      crypt_incidents: {
        name: 'Subterranean Tomb Haunted Aberrations',
        roll_type: 'd6',
        auto_trigger: {
          type: 'event',
          event_name: 'on_entering_undiscovered_crypt',
          condition: 'has_torches == true',
        },
        entries: [
          {
            roll: 1,
            name: 'Stone sarcophagi lids shudder violently and emit high-pitched vibrations',
            script_id: 'script_crypt_shudder',
          },
          {
            roll: 2,
            name: 'Torches flare from bright amber to a cold, unnatural spiritual indigo',
            script_id: 'script_crypt_flame',
          },
          {
            roll: 3,
            name: "A chilling draft whispers the adventurers' deepest personal regrets in unison",
            script_id: 'script_crypt_regrets',
          },
          {
            roll: 4,
            name: 'Hovering, spectral orbs of blue light coalesce to point towards hidden doorways',
            script_id: 'script_crypt_orbs',
          },
          {
            roll: 5,
            name: 'Wall carvings of storm giants seem to weep water that sparkles',
            script_id: 'script_crypt_weep',
          },
          {
            roll: 6,
            name: 'A sudden weightless sensation lifts dust and pebbles off the stone flags',
            script_id: 'script_crypt_weightless',
          },
        ],
      },
      swamp_flora: {
        name: 'Marshland Bio-luminescent Herbs & Mycetophilids',
        roll_type: 'd6',
        auto_trigger: {
          type: 'event',
          event_name: 'on_forage_swamp',
          condition: 'wisdom_nature_success == true',
        },
        entries: [
          {
            roll: 1,
            name: 'Weeping Willow-Calyx: an herb that glows softly and numbs open wounds',
            script_id: 'script_flora_calyx',
          },
          {
            roll: 2,
            name: 'Sorrow-Spore Fungi: emits purple static dust that suppresses magic feedback',
            script_id: 'script_flora_spores',
          },
          {
            roll: 3,
            name: 'Grave-Lotus Leaf: a root that can be mashed to purge localized disease',
            script_id: 'script_flora_lotus',
          },
          {
            roll: 4,
            name: 'Tempest Vine-Weft: highly elastic vines that conduct ambient electricity safely',
            script_id: 'script_flora_vines',
          },
          {
            roll: 5,
            name: 'Ectoplasmic Lichen: moss growing on stone monuments that restores spell focus',
            script_id: 'script_flora_lichen',
          },
          {
            roll: 6,
            name: 'Silver Silt Bulb: sweet root that doubles healing recovery upon short resting',
            script_id: 'script_flora_bulb',
          },
        ],
      },
      undead_encounters: {
        name: 'Catacomb Awakened Guardian Spawns',
        roll_type: 'd6',
        auto_trigger: {
          type: 'event',
          event_name: 'on_failed_stealth_tomb',
          condition: 'has_metal_armor == true',
        },
        entries: [
          {
            roll: 1,
            name: 'Two Barrow Ghouls crawl down from the shadowed cracks in ceiling stone',
            script_id: 'script_spawn_ghouls',
          },
          {
            roll: 2,
            name: 'An iron-bound skeletal giant warrior clutching a rusty greatsword rises',
            script_id: 'script_spawn_skeleton',
          },
          {
            roll: 3,
            name: 'Three glowing Lightning Mephits materialize from storm-wells around pillars',
            script_id: 'script_spawn_mephits',
          },
          {
            roll: 4,
            name: 'A heavy, static-charged shade of a sworn giant defender steps out',
            script_id: 'script_spawn_shade',
          },
          {
            roll: 5,
            name: 'Swarm of spectral rats clad in tiny, glowing runic collars emerges',
            script_id: 'script_spawn_rats',
          },
          {
            roll: 6,
            name: 'The ancient tomb defense monolith hums and projects a moving beam of energy',
            script_id: 'script_spawn_monolith',
          },
        ],
      },
      memory_fragments: {
        name: 'Psychic Memories of the Ancient Giant',
        roll_type: 'd6',
        auto_trigger: {
          type: 'event',
          event_name: 'on_touch_giant_effigy',
          condition: 'has_unlocked_sages_secret == true',
        },
        entries: [
          {
            roll: 1,
            name: 'Vivid image of Vorgun crafting the beautiful Oakhaven wardstones with lightning',
            script_id: 'script_memory_crafting',
          },
          {
            roll: 2,
            name: 'Sound of primeval giant-kin chanting binding blessings in ancient celestial',
            script_id: 'script_memory_chanting',
          },
          {
            roll: 3,
            name: 'The sorrow of laying his young daughter Kailina to rest inside the deep barrow',
            script_id: 'script_memory_burial',
          },
          {
            roll: 4,
            name: 'The betrayal of founding elder Elric taking the silver storm core from altar',
            script_id: 'script_memory_betrayal',
          },
          {
            roll: 5,
            name: 'Standing on highest peaks, watching ocean shores freeze over millenia ago',
            script_id: 'script_memory_peaks',
          },
          {
            roll: 6,
            name: 'A feeling of deep, eternal protective warmth wrapping around the township',
            script_id: 'script_memory_warmth',
          },
        ],
      },
    },
    handouts: {
      handout_thieves_diary: {
        id: 'handout_thieves_diary',
        type: 'text',
        content:
          "...the runes were a trick. It wasn't treasure that sealed the door, but respect...",
      },
      handout_elder_scroll: {
        id: 'handout_elder_scroll',
        type: 'parchment',
        content:
          '...by decree of the Great Founder Elric, Oakhaven warrants eternal alliance and annual rune trade streams with the Silent King of the Southern Heights...',
      },
      handout_blacksmith_blueprint: {
        id: 'handout_blacksmith_blueprint',
        type: 'blueprint',
        content:
          '...mix three parts molten Oakhaven slate ore with one drop of electrified rain under severe storm condition to harden the steel against any runic kinetic burst...',
      },
      handout_shrine_hymn: {
        id: 'handout_shrine_hymn',
        type: 'hymnal',
        content:
          '...hear our voice, Wardens of the Tempest, let the lightning pass over our halls... we return the memories of the barrow graves...',
      },
      handout_smuggler_map: {
        id: 'handout_smuggler_map',
        type: 'map sketch',
        content:
          '...charcoal map sketch detail: bypass the deep moss quicksands of Hex [0, 1] by hugging the prehistoric stone cairns on the eastern marsh ribcage...',
      },
      handout_vorgun_will: {
        id: 'handout_vorgun_will',
        type: 'scroll of memory',
        content:
          '...my power shall rest with the Sentinel greatsword... let none awake the tomb unless the three runes of memory, rage, and honor are appeased in absolute peace...',
      },
      handout_rangers_journal: {
        id: 'handout_rangers_journal',
        type: "ranger's field journal",
        content:
          "...spotted footprints near the standing monoliths. They aren't wild beasts; the gait is too heavy, drag markings of heavy iron greaves...",
      },
      handout_herbalist_recipe: {
        id: 'handout_herbalist_recipe',
        type: 'herbalist recipe scroll',
        content:
          '...Lotus roots mashed with morning dew. Suppresses the marsh sickness, but do not inhale the dark purple vapors...',
      },
      handout_guard_roster: {
        id: 'handout_guard_roster',
        type: 'garrison duty roster',
        content:
          '...post change at midnight. Watch the Southern Highway for Smuggler caravans. Report any flickering lights above the barrow tombs...',
      },
      handout_scribes_chronicle: {
        id: 'handout_scribes_chronicle',
        type: 'chronicle fragment',
        content:
          '...the Great Schism of Year 422. How the sacred wards of Oakhaven fell when the founding families forgot their ancient blood oaths to Vorgun...',
      },
      handout_seers_prediction: {
        id: 'handout_seers_prediction',
        type: 'divination parchment',
        content:
          '...when the silver storm rises on the eighth day, the sky will bleed pale blue lightning. Only the sentinel heart can absolute ground the surge...',
      },
    },
    hexmaps: {
      'hex-00': {
        q: 0,
        r: 0,
        s: 0,
        layer: 0,
        scale_miles: 6,
        terrain_override: 'village',
        runic_wind: 'Gentle Climatic Breeze',
        etheric_pressure: '1.00 atm (Standard)',
        relative_humidity: '42% (Normal)',
        spectral_density: '1.2% Spore Ratio (Clear)',
        acoustic_echo: 'Open Field Free Resonance',
      },
      'hex-01': {
        q: 1,
        r: -1,
        s: 0,
        layer: 0,
        scale_miles: 6,
        terrain_override: 'swamp',
        runic_wind: 'Erratic Gale Soughs',
        etheric_pressure: '1.08 atm (Damp)',
        relative_humidity: '93% (Saturating Fog)',
        spectral_density: '45% Poison Spore Spikes',
        acoustic_echo: 'Muffled & Squelched Mud Dampening',
      },
      'hex-02': {
        q: 3,
        r: -2,
        s: -1,
        layer: -1,
        scale_ft: 5,
        terrain_override: 'worked_stone (Subterranean Tomb)',
        runic_wind: 'Chill Static Chamber Draft',
        etheric_pressure: '0.95 atm (Underground)',
        relative_humidity: '65% (Dank Crypt Vapors)',
        spectral_density: '15% Ectoplasmic Mist Index',
        acoustic_echo: 'Extreme Stonework Feedback Echo',
      },
      'hex-02-surface': {
        q: 3,
        r: -2,
        s: -1,
        layer: 0,
        scale_miles: 6,
        terrain_override: 'worked_stone (Surface Entrance)',
        runic_wind: 'Severe Gale-Force Wind Blasts',
        etheric_pressure: '1.05 atm',
        relative_humidity: '85% (Storm-struck Peaks)',
        spectral_density: '3.5% Arcane Static Spores',
        acoustic_echo: 'Deep howling mountain echo resonance',
      },
      'hex-sub-01': {
        q: 2,
        r: -2,
        s: 0,
        layer: -1,
        scale_ft: 10,
        terrain_override: "subterranean_cave (Smugglers' Grotto)",
        runic_wind: 'Faint drafts carrying moss scent',
        etheric_pressure: '1.02 atm (Damp Cavity)',
        relative_humidity: '90% (Wet Cave Walls)',
        spectral_density: '8.5% Spore Glow',
        acoustic_echo: 'Low dripping cavern echo',
      },
      'hex-sub-02': {
        q: 4,
        r: -3,
        s: -1,
        layer: -1,
        scale_ft: 10,
        terrain_override: 'subterranean_vaults (Forgotten Crypts)',
        runic_wind: 'Muted Static Chamber draft',
        etheric_pressure: '0.98 atm',
        relative_humidity: '72% (Stagnant)',
        spectral_density: '32% Ghost-Mist Ratio',
        acoustic_echo: 'Delayed Hollow Vault Reverberation',
      },
      'hex-ast-01': {
        q: 0,
        r: 1,
        s: -1,
        layer: 1,
        scale_miles: 1,
        terrain_override: 'astral_conduit (Leyline Nexus)',
        runic_wind: 'Sub-harmonic Leyline Screams',
        etheric_pressure: '0.45 atm (Planar Distortion)',
        relative_humidity: '5% (Desiccated Vacuum)',
        spectral_density: '98% High Arcane Particle Flow',
        acoustic_echo: 'Aetheric crackling noise resonance',
      },
      'hex-ast-02': {
        q: -1,
        r: 0,
        s: 1,
        layer: 1,
        scale_miles: 2,
        terrain_override: 'planar_cliffs (Monolith Peak)',
        runic_wind: 'Gravitational Shear Hurricanes',
        etheric_pressure: '0.75 atm (Unstable Air)',
        relative_humidity: '12% (Thin Frigid Atmosphere)',
        spectral_density: '64% Gravitational Field Dust',
        acoustic_echo: 'Screaming whistling altitude feedback',
      },
      'hex-ast-03': {
        q: 1,
        r: 0,
        s: -1,
        layer: 1,
        scale_miles: 2,
        terrain_override: 'planar_rift (Twilight Conduit)',
        runic_wind: 'Gravitational Shear storms',
        etheric_pressure: '0.35 atm',
        relative_humidity: '0% (Absolute Zero)',
        spectral_density: '99% Raw Plasma Discharge',
        acoustic_echo: 'Deep stellar hum resonance',
      },
    },

    screenplays: {
      sp_vorguns_resolution: {
        id: 'sp_vorguns_resolution',
        name: 'A Ghost of a Chance',
        slugline: {
          text: "INT. VORGUN's TOMB - RESOLUTION",
          vtt_automation: {
            lighting: 'bright_warm_light',
            sfx: 'sfx_storm_fading',
          },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: 'The violent winds immediately die down. The phantom giant kneels, bowing its head in reverence.',
          },
          {
            type: 'vtt_animation',
            target_id: 'vorguns_ghost',
            animation_clip: 'anim_kneel_and_offer_sword',
          },
        ],
      },
      sp_arrival_oakhaven: {
        id: 'sp_arrival_oakhaven',
        name: 'Stormy Entrance',
        slugline: {
          text: 'EXT. OAKHAVEN VILLAGE - DAY',
          vtt_automation: {
            lighting: 'village_dusk',
            sfx: 'bgm_storm_exterior',
          },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: 'Heavy rain pelts the wooden rooftops of Oakhaven as the adventurers walk in.',
          },
        ],
      },
      sp_elara_greeting: {
        id: 'sp_elara_greeting',
        name: "Elder's Warning Prayer",
        slugline: {
          text: 'INT. OAKHAVEN COUNCILS - NIGHT',
          vtt_automation: {
            lighting: 'bright_warm_light',
            sfx: 'bgm_sorrowful_ambient',
          },
        },
        screenplay_blocks: [
          { type: 'character', name: 'ELARA' },
          {
            type: 'dialogue',
            text: "Please, travelers! The storm giants seek our ruin if we cannot appease Vorgun's restless soul!",
          },
        ],
      },
      sp_storm_escalates: {
        id: 'sp_storm_escalates',
        name: 'The Tempest Rising',
        slugline: {
          text: 'EXT. THE BARROWMOORS - NIGHT',
          vtt_automation: {
            lighting: 'tomb_interior',
            sfx: 'bgm_storm_exterior',
          },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: 'A massive fork of violet lightning strikes a nearby monolith, shaking the very earth beneath you.',
          },
        ],
      },
      sp_monolith_rune: {
        id: 'sp_monolith_rune',
        name: 'The Glowing Inscriptions',
        slugline: {
          text: 'EXT. ANCIENT MONOLITH - DUSK',
          vtt_automation: { lighting: 'village_dusk', sfx: 'sfx_storm_fading' },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: 'The heavy stone runes begin to glow with a pale cold blue energy.',
          },
        ],
      },
      sp_tomb_breach: {
        id: 'sp_tomb_breach',
        name: 'Breaching the Mound',
        slugline: {
          text: 'INT. TOMB ENTRANCE - DUNGEON',
          vtt_automation: {
            lighting: 'tomb_interior',
            sfx: 'bgm_sorrowful_ambient',
          },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: "The giant iron-reinforced heavy stone doors grind open, revealing the dark void of Vorgun's tomb.",
          },
        ],
      },
      sp_ghost_apparition: {
        id: 'sp_ghost_apparition',
        name: 'Haunted Giant Apparition',
        slugline: {
          text: 'INT. TOMB INNER CHAMBER - NIGHT',
          vtt_automation: {
            lighting: 'tomb_interior',
            sfx: 'bgm_sorrowful_ambient',
          },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: 'A huge, semi-transparent spectral figure rises from the central sarcophagus.',
          },
        ],
      },
      sp_relic_awakens: {
        id: 'sp_relic_awakens',
        name: 'Awakening of the Relic',
        slugline: {
          text: 'INT. THE BURIAL MOUND - DAY',
          vtt_automation: {
            lighting: 'bright_warm_light',
            sfx: 'sfx_storm_fading',
          },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: 'The ancient sword atop the shrine pulses with bright static energy, humming with celestial power.',
          },
        ],
      },
      sp_spirit_restoration: {
        id: 'sp_spirit_restoration',
        name: 'Restoration of the Spirit',
        slugline: {
          text: "INT. VORGUN'S ALCOVE - DUSK",
          vtt_automation: {
            lighting: 'bright_warm_light',
            sfx: 'sfx_storm_fading',
          },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: 'The spectral giant closes its shining blue eyes as the runes return to their places. The storm finally breaks.',
          },
        ],
      },
      sp_ambient_whispers: {
        id: 'sp_ambient_whispers',
        name: 'Whispers from Cold Swamp',
        slugline: {
          text: 'EXT. COLD SWAMP RIDGE - NIGHT',
          vtt_automation: {
            lighting: 'tomb_interior',
            sfx: 'bgm_storm_exterior',
          },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: 'Ghostly voices whisper through the moaning wind, telling ancient tales of honor and betrayal.',
          },
        ],
      },
      sp_climax_victory: {
        id: 'sp_climax_victory',
        name: 'Highlands Golden Rays',
        slugline: {
          text: 'INT. SHATTERED SANCTUM - DAY',
          vtt_automation: {
            lighting: 'bright_warm_light',
            sfx: 'sfx_storm_fading',
          },
        },
        screenplay_blocks: [
          {
            type: 'action_line',
            text: "Sunlight pierces through the cracked ceiling of the tomb, casting golden rays on the giant's silent sword.",
          },
        ],
      },
    },

    dialogue_trees: {
      dt_elara_hub: {
        id: 'dt_elara_hub',
        nodes: {
          start: {
            npc_text: 'Will you help us find Finn and stop the storm?',
            speaking_intent:
              'Plea for assistance and communal safety regarding the missing youth',
            player_options: [
              {
                text: 'We will find him. (Accept Quest)',
                next_node: 'accept',
                trigger_script: 'seq_accept_main_quest',
                speaking_intent: 'Altruistic Heroic Undertaking',
              },
              {
                text: 'What do you know about the Storm Giant?',
                next_node: 'lore_dump',
                speaking_intent: 'Fact-Finding & Local Lore Probe',
              },
              {
                text: 'We need supplies first.',
                next_node: 'vendor_screen',
                speaking_intent: 'Practical Resource Procurement & Preparation',
              },
            ],
          },
          lore_dump: {
            npc_text:
              'Vorgun was a guardian, not a monster. But his tomb was defiled by outsiders three nights ago.',
            speaking_intent:
              'Sorrowful lore disclosure and defense of the misunderstood guardian giant',
            player_options: [
              {
                text: 'I understand. We will help.',
                next_node: 'accept',
                trigger_script: 'seq_accept_main_quest',
                speaking_intent: 'Communal Duty Alliance & Resolute Resolve',
              },
              {
                text: 'Let me ask something else.',
                next_node: 'start',
                speaking_intent: 'Conversational Topic Pivot',
              },
            ],
          },
          vendor_screen: {
            npc_text:
              'I have only old herbs and wet firewood. If you help, standard ritual components are yours.',
            speaking_intent:
              'Practical hospitality mixed with material resource constraints',
            player_options: [
              {
                text: 'Very well. Tell me about the giant.',
                next_node: 'lore_dump',
                speaking_intent: 'Deeper Quest Investigation',
              },
              {
                text: 'We will go find Finn.',
                next_node: 'accept',
                trigger_script: 'seq_accept_main_quest',
                speaking_intent: 'Immediate Urgent Rescue Action',
              },
            ],
          },
          accept: {
            npc_text:
              'May the old gods watch over your path. Follow the flooded river to the Barrowmoors.',
            speaking_intent:
              'Solemn spiritual benediction and tactical road route brief',
            player_options: [
              {
                text: '[End Conversation]',
                next_node: 'exit_dialogue',
                speaking_intent: 'Dismissal and Departure',
              },
            ],
          },
        },
      },
      dt_barrowmoors_wanderer: {
        id: 'dt_barrowmoors_wanderer',
        nodes: {
          start: {
            npc_text:
              'Who goes there? The mud swallows all who trespass... Why have you braved the weeping moors?',
            speaking_intent:
              'Wary spectral gatekeeping and territorial testing of alignment',
            player_options: [
              {
                text: "We seek Finn and want to restore Vorgun's peace.",
                next_node: 'seek_peace',
                speaking_intent: 'Honorable Peace-Seeking Resolution',
              },
              {
                text: 'We are travelers looking for passage.',
                next_node: 'travelers',
                speaking_intent: 'Ambiguous Travel Evasion',
              },
              {
                text: '[Intimidate] Begone, spirit, before we purge you!',
                next_node: 'confrontation',
                speaking_intent: 'Aggressive Manifestation & Martial Threat',
              },
            ],
          },
          seek_peace: {
            npc_text:
              "Peace? Vorgun's soul is bound in torment because descendants of Oakhaven broke the old sacred pact. They plundered the runes of binding, unaware they kept the storm asleep.",
            speaking_intent:
              'Agonized, tragic historical clarification and warning of elemental imbalance',
            player_options: [
              {
                text: 'We will recover the runes and make it right.',
                next_node: 'promise_restoration',
                speaking_intent: 'Sacred Restoration Binding Promise',
              },
              {
                text: 'Why are the runes so important?',
                next_node: 'runes_lore',
                speaking_intent: 'Intellectual/Analytical Mystery Probe',
              },
            ],
          },
          travelers: {
            npc_text:
              'There is no passage here for the blind. The Barrowmoors keep our grief. Turn back or drown in rain.',
            speaking_intent:
              'Defensive rejection and existential warning of environmental doom',
            player_options: [
              {
                text: 'Wait, we truly wish to help stop the storm.',
                next_node: 'seek_peace',
                speaking_intent:
                  'Resolute De-escalation & Plea for Understanding',
              },
            ],
          },
          confrontation: {
            npc_text:
              "Purge me? I am but the first echo of Vorgun's rage! Speak with blades if you must, but the rain will wash your bones!",
            speaking_intent:
              'Vengeful hostile retort and escalation of physical combat stakes',
            player_options: [
              {
                text: '[Prepare for Combat / End]',
                next_node: 'exit_dialogue',
                speaking_intent: 'Bracing for Battle Initiation',
              },
            ],
          },
          runes_lore: {
            npc_text:
              'Runes of Rage and Memory are physical ties keeping our giant guardian anchored. Seek them in the burial chamber.',
            speaking_intent:
              'Reluctant informational aid about structural runic physics',
            player_options: [
              {
                text: 'Thank you, we will go now.',
                next_node: 'exit_dialogue',
                speaking_intent: 'Gratitude and Stealthy Departure',
              },
            ],
          },
          promise_restoration: {
            npc_text:
              "Go then. Speak with Vorgun's ghost with empathy, or you shall join us in the wet graves.",
            speaking_intent:
              'Grim, conditionally optimistic guidance towards empathetic resolution',
            player_options: [
              {
                text: '[Leave conversation]',
                next_node: 'exit_dialogue',
                speaking_intent: 'Acknowledge and Terminate',
              },
            ],
          },
        },
      },
    },
  },

  factions: {
    oakhaven_villagers: {
      name: 'Villagers of Oakhaven',
      description:
        "A close-knit community of survivors clinging to the fertile soils surrounding the Oakhaven valley. Led by the cautious Elder council, they seek to restore Vorgun's ancient protective ward while defending their land from aggressive tomb-raiders and vengeful swamp spirits.",
      relations: { restless_spirits: 'Hostile', player_party: 'Neutral' },
      controlled_areas: [
        'Oakhaven Town Square',
        'Southern Farmlands',
        'Council High Hall',
      ],
    },
    restless_spirits: {
      name: 'Spirits of the Barrowmoor',
      description:
        'The spectral remnants of a cataclysmic former age, tethered to the damp earth by forgotten blood-oaths and defiled family altars. They wander the foggy moors attacking warm-blooded intruders to prevent any defilement of their ancestral tombs.',
      relations: { oakhaven_villagers: 'Hostile', player_party: 'Hostile' },
      controlled_areas: [
        'Damp Barrowmoors',
        'The Forgotten Crypts',
        'Highlands Cemetery',
      ],
    },
    ironwood_circle: {
      name: 'The Ironwood Circle',
      description:
        'An ancient, reclusive order of local rangers and druids dedicated to shielding raw nature from planar leakage and wild elemental corruptions. They monitor the leyline shifts in the Whispering Woods, acting as neutral guardians of structural balance.',
      relations: {
        oakhaven_villagers: 'Neutral',
        restless_spirits: 'Hostile',
        player_party: 'Friendly',
      },
      controlled_areas: [
        'Whispering Woods',
        'Sentinel Stone Monoliths',
        'Western Leyline Conduit',
      ],
    },
    storm_wardens: {
      name: 'The Storm Wardens Brotherhood',
      description:
        "An elite auxiliary order maintaining the ancient aether towers and monolith structures. Gifted with lightning resistance and storm channeling arts, they oversee gravitational anchors and high psychic conduits across the region's monolithic peaks.",
      relations: {
        oakhaven_villagers: 'Friendly',
        restless_spirits: 'Hostile',
        player_party: 'Friendly',
      },
      controlled_areas: [
        'Lighthouse Citadel',
        'Garrison Watchtowers',
        'High Warding Shrines',
      ],
    },
  },

  locations: {
    loc_oakhaven: {
      id: 'loc_oakhaven',
      uuid: '8f1b2c4d-a9f8-4e31-8c47-19a6b5c3d2e1',
      name: 'Oakhaven Village',
      type: 'settlement',
      hexmap_id: 'hex-00',
      default_lighting: 'lighting_states.village_dusk',
    },
    loc_barrowmoors: {
      id: 'loc_barrowmoors',
      uuid: '2e4b3c1d-8f9a-4c21-b371-d6e8a5f2c4b3',
      name: 'The Barrowmoors',
      type: 'wilderness',
      hexmap_id: 'hex-01',
    },
    loc_vorguns_tomb: {
      id: 'loc_vorguns_tomb',
      uuid: '7c1d3e8a-bf96-412e-a573-02f8db1c4e95',
      parent_id: 'loc_barrowmoors',
      name: "Vorgun's Tomb",
      type: 'dungeon',
      hexmap_id: 'hex-02',
      default_lighting: 'lighting_states.tomb_interior',
    },
    loc_smugglers_grotto: {
      id: 'loc_smugglers_grotto',
      uuid: '3f2b4c1a-8f9a-4c28-b371-d6e8a5f2c4b4',
      parent_id: 'loc_barrowmoors',
      name: "Misty Hollow Smugglers' Grotto",
      type: 'dungeon',
      hexmap_id: 'hex-sub-01',
      default_lighting: 'lighting_states.tomb_interior',
    },
    loc_forgotten_crypts: {
      id: 'loc_forgotten_crypts',
      uuid: '4f2b4c1a-8f9a-4c28-b371-d6e8a5f2c4b5',
      parent_id: 'loc_vorguns_tomb',
      name: 'Forgotten Crypts / Family Crypt',
      type: 'dungeon',
      hexmap_id: 'hex-sub-02',
      default_lighting: 'lighting_states.tomb_interior',
    },
    loc_astral_nexus: {
      id: 'loc_astral_nexus',
      uuid: '5f2b4c1a-8f9a-4c28-b371-d6e8a5f2c4b6',
      name: 'Astral Leyline Nexus',
      type: 'wilderness',
      hexmap_id: 'hex-ast-01',
    },
    loc_monolith_peak: {
      id: 'loc_monolith_peak',
      uuid: '6f2b4c1a-8f9a-4c28-b371-d6e8a5f2c4b7',
      name: 'Sky Ruins Monolith Peak',
      type: 'wilderness',
      hexmap_id: 'hex-ast-02',
    },
    loc_twilight_conduit: {
      id: 'loc_twilight_conduit',
      uuid: '7f2b4c1a-8f9a-4c28-b371-d6e8a5f2c4b8',
      name: 'Aether Void Rift / Twilight Conduit',
      type: 'wilderness',
      hexmap_id: 'hex-ast-03',
    },
  },

  scripts: {
    seq_guardian_peace: {
      id: 'seq_guardian_peace',
      description: 'Logic execution for appeasing the ghost of Vorgun.',
      sequence: [
        {
          type: 'play_cutscene',
          screenplay_id: 'sp_vorguns_resolution',
          playback_behavior: 'blocking',
          interruptible: false,
          ticks: 120,
          effect:
            "Plays the ultimate cinematic resolution of Vorgun's restless spirit.",
        },
        {
          type: 'grant_item',
          item_id: 'items.blade_of_guardianship',
          awakened: true,
          ticks: 10,
          effect: 'Awards the awakened Blade of Guardianship to the party.',
        },
        {
          type: 'update_world_state',
          key: 'storms_cease_fully',
          value: true,
          ticks: 15,
          effect:
            'Calms the supernatural atmospheric Runic Tempests permanently.',
        },
        {
          type: 'update_faction_relation',
          faction: 'restless_spirits',
          target: 'player_party',
          new_status: 'Neutral',
          ticks: 15,
          effect: "Shifts the hostile specters' stance to neutral.",
        },
        {
          type: 'update_journal_node',
          quest_id: 'mq_vorguns_peace',
          node: 'Spirit Climax Resolution',
          new_state: 'completed',
          ticks: 20,
          effect: "Closes the main questline's final milestone.",
        },
      ],
    },
    seq_elara_greeting: {
      id: 'seq_elara_greeting',
      description:
        'Main trigger script for displaying the greeting dialog when encountering Elder Elara.',
      sequence: [
        {
          type: 'initiate_dialogue',
          dialogue_tree_id: 'dt_elara_hub',
          target_npc_id: 'elara',
          ticks: 45,
          effect:
            'Launches the primary interactive conversation with the village elder.',
        },
      ],
    },
    seq_accept_main_quest: {
      id: 'seq_accept_main_quest',
      description:
        'Main workflow logic indicating the acceptance of the main quest sequence.',
      sequence: [
        {
          type: 'update_journal_node',
          quest_id: 'mq_vorguns_peace',
          node: 'Social Investigation',
          new_state: 'completed',
          ticks: 15,
          effect: 'Completes the initial investigation phase.',
        },
        {
          type: 'update_journal_node',
          quest_id: 'mq_vorguns_peace',
          node: 'Wilderness Exploration',
          new_state: 'active',
          ticks: 15,
          effect: 'Activates the wilderness exploration phase.',
        },
        {
          type: 'update_world_state',
          key: 'main_quest_accepted',
          value: true,
          ticks: 20,
          effect: 'Enables regional event triggers related to main quest.',
        },
      ],
    },
    seq_activate_monolith: {
      id: 'seq_activate_monolith',
      description:
        'Unlocks the ancient Barrowmoors obelisk by offering a matching stone rune to the pedestal.',
      sequence: [
        {
          type: 'remove_item',
          item_id: 'items.ancient_stone_rune',
          ticks: 12,
          effect: 'Consumes the ancient stone rune item from party inventory.',
        },
        {
          type: 'apply_vfx',
          effect_name: 'lightning_sparkle_on_monolith',
          intensity: 'high',
          ticks: 30,
          effect:
            'Flashes an intense electromagnetic lightning sequence around the obelisk.',
        },
        {
          type: 'update_world_state',
          key: 'barrow_obelisk_active',
          value: true,
          ticks: 15,
          effect: 'Unlocks sealed burial vaults.',
        },
        {
          type: 'play_audio',
          cue: 'audiovisual_cues.soundscapes.sfx_rune_hum',
          ticks: 25,
          effect: 'Plays the heavy ambient rune hum frequency sound effect.',
        },
      ],
    },
    seq_disarm_coffin_trap: {
      id: 'seq_disarm_coffin_trap',
      description:
        "Allows safe opening of Vorgun's secondary burial sarcophagus without setting off built-in static traps.",
      sequence: [
        {
          type: 'roll_skill_check',
          skill: "Sleight of Hand (Thieves' Tools)",
          dc: 14,
          ticks: 18,
          effect: 'Evaluates standard lockpicking/trap-disarming capability.',
        },
        {
          type: 'disable_entity',
          target_id: 'traps.coffin_static_charge',
          ticks: 20,
          effect: 'Permanently discharges the static trap trigger.',
        },
        {
          type: 'grant_item',
          item_id: 'items.giant_crown_jewel',
          count: 1,
          ticks: 10,
          effect: 'Finds and stores 1 Giant Crown Jewel.',
        },
        {
          type: 'update_journal_node',
          quest_id: 'secondary_spoils',
          node: 'Sarcophagus Disarmed',
          new_state: 'completed',
          ticks: 15,
          effect: 'Safely updates task progress.',
        },
      ],
    },
    seq_summon_weather_ward: {
      id: 'seq_summon_weather_ward',
      description:
        'Creates a localized grid protective zone shielding the active party members from the acidic rainstorm.',
      sequence: [
        {
          type: 'consume_spell_slot',
          level: 2,
          ticks: 10,
          effect: 'Spends a level-2 magical spell slot.',
        },
        {
          type: 'spawn_entity',
          entity_id: 'wards.weather_protection_sphere',
          duration_rounds: 10,
          ticks: 24,
          effect: 'Summons and anchors a protective shielding sphere.',
        },
        {
          type: 'update_world_state',
          key: 'sanctuary_ward_level',
          value: 4,
          ticks: 12,
          effect: 'Boosts sanctuary static ward level to 4.',
        },
      ],
    },
    seq_bribe_barrow_bandits: {
      id: 'seq_bribe_barrow_bandits',
      description:
        'Negotiate terms with the hostile tomb pillagers in the swamp to bypass an impending physical ambush.',
      sequence: [
        {
          type: 'deduct_currency',
          gold: 150,
          ticks: 10,
          effect: 'Subtracts 150 gold from party funds.',
        },
        {
          type: 'update_faction_relation',
          faction: 'tomb_pillagers',
          target: 'player_party',
          new_status: 'Neutral',
          ticks: 15,
          effect: 'Soothes hostilities with swamp bandits.',
        },
        {
          type: 'update_world_state',
          key: 'bandit_toll_paid',
          value: true,
          ticks: 15,
          effect: 'Marks toll paid to prevent spontaneous ambush encounters.',
        },
        {
          type: 'play_cutscene',
          screenplay_id: 'sp_bandit_retreat',
          playback_behavior: 'non_blocking',
          ticks: 60,
          effect:
            'Triggers cinematic showing bandits packing camp and retreating.',
        },
      ],
    },
    seq_awakening_storm_shield: {
      id: 'seq_awakening_storm_shield',
      description:
        'Channel lightning static energy to permanently charge and wake the long-slumbering Aegis of the Gale.',
      sequence: [
        {
          type: 'apply_vfx',
          effect_name: 'electric_conduit',
          target_player: 'party_tank',
          ticks: 30,
          effect:
            'Draws localized crackling energy currents onto the party defender.',
        },
        {
          type: 'update_item_state',
          item_id: 'items.aegis_of_gale',
          property: 'awakened',
          value: true,
          ticks: 20,
          effect: 'Fully awakens the mystical sleeping shield properties.',
        },
        {
          type: 'grant_party_buff',
          buff_name: 'Lightning Resistance',
          duration_minutes: 60,
          ticks: 15,
          effect: 'Bestows 1-hour total lightning dynamic protection to party.',
        },
      ],
    },
    seq_planar_rift_collapse: {
      id: 'seq_planar_rift_collapse',
      description:
        'Seals the erratic planar rupture leading to the Astral layer using raw magical force resonance.',
      sequence: [
        {
          type: 'roll_saving_throw',
          ability: 'Intelligence (Arcana)',
          dc: 16,
          ticks: 20,
          effect: 'Checks magic calibration capacity to seal crack.',
        },
        {
          type: 'update_world_state',
          key: 'planar_instability',
          value: '2%',
          ticks: 15,
          effect: 'Brings residual dimensional stability back to normal tier.',
        },
        {
          type: 'apply_vfx',
          effect_name: 'implosion_gravitational_wave',
          intensity: 'severe',
          ticks: 45,
          effect: 'Generates massive physical vacuum collapse ripple effects.',
        },
        {
          type: 'damage_party',
          damage_type: 'force',
          roll: '2d10',
          ticks: 15,
          effect: 'Misfires raw energy causing 2d10 force feedback damage.',
        },
      ],
    },
    seq_appease_village_council: {
      id: 'seq_appease_village_council',
      description:
        "Soothe the skeptical elder council members of Oakhaven with definitive physical proof of Vorgun's resting peace.",
      sequence: [
        {
          type: 'show_item_presentation',
          item_id: 'items.blade_of_guardianship',
          ticks: 15,
          effect: 'Brandishes the consecrated relic of Vorgun.',
        },
        {
          type: 'update_faction_relation',
          faction: 'oakhaven_villagers',
          target: 'player_party',
          new_status: 'Allied',
          ticks: 15,
          effect: 'Bonds village trust to maximum level.',
        },
        {
          type: 'update_journal_node',
          quest_id: 'mq_vorguns_peace',
          node: 'Council Deliberation',
          new_state: 'completed',
          ticks: 15,
          effect: 'Resolves the pending council task.',
        },
        {
          type: 'grant_currency',
          gold: 300,
          ticks: 10,
          effect: 'Accepts 300 gold reward from council.',
        },
      ],
    },
    seq_global_weather: {
      id: 'seq_global_weather',
      description:
        'Govern persistent atmospheric conditions and ambient light dampening across the sector.',
      sequence: [
        {
          type: 'apply_global_effect',
          rain_rate_dc: 12,
          ambient_light_opacity: '85%',
          primary_element: 'Acid Rainstorm',
          ticks: 60,
          effect: 'Sets deep environmental light obscuration values.',
        },
      ],
    },
    seq_restless_souls_rise: {
      id: 'seq_restless_souls_rise',
      description:
        'Uprising transition during nighttime hours, summoning restless spiritual physical manifestations.',
      sequence: [
        {
          type: 'spawn_entities',
          monster_prefab: 'enemies.restless_phantom',
          max_spawn_limit: 4,
          ritual_resonance: 'Soul Leakage',
          ticks: 35,
          effect: 'Restless phantoms manifest around the Barrowmoors.',
        },
        {
          type: 'apply_fog',
          density_percent: '92%',
          perception_modifier_dc: 4,
          dynamic_vision_blocked: true,
          ticks: 25,
          effect: 'Gloomy thick spiritual fog rises from the soil.',
        },
      ],
    },
    seq_wild_magic_surge: {
      id: 'seq_wild_magic_surge',
      description:
        'Simulates magical surge resonance, inducing electromagnetic lightning interference.',
      sequence: [
        {
          type: 'magical_chaos',
          core_surge_chance: '25%',
          backlash_coefficient: 'high',
          volatile_potency: true,
          ticks: 40,
          effect:
            'Spells have a chance to trigger a random wild surge from the matrix.',
        },
        {
          type: 'aurora_discharge',
          color_spectrum: 'violet-blue',
          interference_field_strength: 'severe',
          metallic_attraction: true,
          ticks: 30,
          effect:
            'Violent blue electromagnetic lightning flashes across the canopy, scrambling compass markers.',
        },
        {
          type: 'mana_static',
          damage_multiplier: '1.5x',
          failed_spellcast_penalty: '+15%',
          particle_luminosity: 180,
          ticks: 24,
          effect:
            'Flickering runic particles cloud the air, amplifying arcane damage but increasing spell failure rate.',
        },
        {
          type: 'geomagnetic_pull',
          relative_gravity_rating: '0.8G',
          heavy_armor_action_tax: '+2',
          levitation_threshold_weight_g: 50,
          ticks: 20,
          effect:
            'Gravitational anomalies lift loose daggers and artifacts in mid-air, rendering heavy armor taxing.',
        },
        {
          type: 'spell_suppression',
          active_sigil_tier: 3,
          nullification_area_radius_meters: 15,
          disruption_vector: 'anti-magic-pulse',
          ticks: 15,
          effect:
            'Ancient sigils on monuments flare bright white, nullifying low-tier utility dynamic protective wards.',
        },
        {
          type: 'planar_resonance',
          ambient_sanity_drain_roll: '1d4',
          cognitive_inspiration_benefit: '+1d6',
          rift_frequency_hz: 432,
          ticks: 45,
          effect:
            'Whispers of long-lost scholars echo from leyline nodes; grants fleeting inspiration but costs deep sanity.',
        },
      ],
    },
    seq_seismic_rumor_shudder: {
      id: 'seq_seismic_rumor_shudder',
      description:
        'Geological tremor that shakes ground coordinates, warning of tomb structural stress degradation.',
      sequence: [
        {
          type: 'camera_shake',
          intensity_magnitude: 4.5,
          decay_duration_seconds: 3.2,
          structural_fatigue_index: '1.2%',
          ticks: 35,
          effect: "Earthquakes rumble down inside Vorgun's resting halls.",
        },
      ],
    },
    seq_lightning_discharge: {
      id: 'seq_lightning_discharge',
      description:
        'Discharges elemental lightning strikes on metallic structures during active hex combat segments.',
      sequence: [
        {
          type: 'elemental_damage',
          ticks: 15,
          effect:
            'Lightning strikes metal points randomly across active coordinates.',
        },
      ],
    },
  },

  procedures: {
    global_weather: {
      id: 'proc_global_weather',
      name: 'The Weeping Sky',
      description:
        'Systemically governs the persistent environmental atmospheric conditions and ambient light dampening across the sector.',
      trigger: { type: 'per_hour_outdoor' },
      script_assoc: 'seq_global_weather',
      script: {
        sequence: [
          { type: 'apply_global_effect', effect: 'Light obscuration.' },
        ],
      },
    },
    restless_souls_rise: {
      id: 'proc_restless_souls_rise',
      name: 'Midnight Apparition Uprising',
      description:
        'Automatically triggers a phase transition during nighttime hours, summoning restless spiritual physical manifestations.',
      trigger: { type: 'nighttime_check' },
      script_assoc: 'seq_restless_souls_rise',
      script: {
        sequence: [
          {
            type: 'spawn_entities',
            effect: 'Restless phantoms manifest around the Barrowmoors.',
          },
          {
            type: 'apply_fog',
            effect: 'Gloomy thick spiritual fog rises from the soil.',
          },
        ],
      },
    },
    wild_magic_surge: {
      id: 'proc_wild_magic_surge',
      name: 'Runic Storm Interference',
      description:
        'Monitors spellcast activity to simulate chaotic resonance, inducing electromagnetic lightning interference.',
      trigger: { type: 'spellcast_detected' },
      script_assoc: 'seq_wild_magic_surge',
      script: {
        sequence: [
          {
            type: 'magical_chaos',
            effect:
              'Spells have a chance to trigger a random wild surge from the matrix.',
          },
          {
            type: 'aurora_discharge',
            effect:
              'Violent blue electromagnetic lightning flashes across the canopy, scrambling compass markers.',
          },
          {
            type: 'mana_static',
            effect:
              'Flickering runic particles cloud the air, amplifying arcane damage but increasing spell failure rate.',
          },
          {
            type: 'geomagnetic_pull',
            effect:
              'Gravitational anomalies lift loose daggers and artifacts in mid-air, rendering heavy armor taxing.',
          },
          {
            type: 'spell_suppression',
            effect:
              'Ancient sigils on monuments flare bright white, nullifying low-tier utility dynamic protective wards.',
          },
          {
            type: 'planar_resonance',
            effect:
              'Whispers of long-lost scholars echo from leyline nodes; grants fleeting inspiration but costs deep sanity.',
          },
        ],
      },
    },
    seismic_rumor_shudder: {
      id: 'proc_seismic_rumor_shudder',
      name: 'Barrow Ground Tremor',
      description:
        'Periodic geological tremor that shakes the ground, signaling structural degradation of the underground tomb vault.',
      trigger: { type: 'every_six_turns' },
      script_assoc: 'seq_seismic_rumor_shudder',
      script: {
        sequence: [
          {
            type: 'camera_shake',
            effect: "Earthquakes rumble down inside Vorgun's resting halls.",
          },
        ],
      },
    },
    lightning_discharge: {
      id: 'proc_lightning_discharge',
      name: 'Furious Static Discharge',
      description:
        'Dangerous static accumulation hazard that discharges powerful lightning strikes on high metal structures during combat.',
      trigger: { type: 'per_round_combat' },
      script_assoc: 'seq_lightning_discharge',
      script: {
        sequence: [
          {
            type: 'elemental_damage',
            effect: 'Lightning bolts strike high metal points randomly.',
          },
        ],
      },
    },
  },

  scenes: {
    scene_arrival_at_oakhaven: {
      id: 'scene_arrival_at_oakhaven',
      location_id: 'loc_oakhaven',
      description:
        'The initial arrival of the party at Oakhaven, seeking the council elders and investigating initial clues under dark clouds.',
      constraints_fulfilled: [
        'State: Adventure Initiated',
        'Entity: Elder Elara Present',
        'VFX: Rain Overlay Enabled',
      ],
      actors: [{ id: 'elara', role: 'quest_giver' }],
      social_encounters: [
        {
          id: 'soc_arrival_elara',
          npc_id: 'elara',
          npc_name: 'Elder Elara (The Grove Guardian)',
          context:
            'As you step across the village threshold, Elder Elara approaches. Rain pours from her wooden cowl as she looks upon the party with serious eyes, pleading for you to find her grandson and secure the warding stones.',
          skill_challenges: [
            {
              skill: 'Insight (Empathetic Assessment)',
              dc: 11,
              success_outcome:
                'You sense her deep grief and determination. She trusts you completely, revealing a shortcut through the barrowmoors (+100 XP, skip first environmental hazard).',
              failure_outcome:
                'She is guarded and shares only the direct paths, warning that danger lies everywhere.',
            },
          ],
        },
      ],
      on_load: { script_id: 'seq_elara_greeting' },
      outcomes: [
        {
          condition: 'world_state:main_quest_accepted == true',
          next_scene_id: 'scene_journey_barrowmoors',
        },
      ],
      screenplays_attached: ['sp_arrival_oakhaven', 'sp_elara_greeting'],
    },
    scene_oakhaven_council_meeting: {
      id: 'scene_oakhaven_council_meeting',
      location_id: 'loc_oakhaven',
      description:
        'The tense deliberative summit where village elders argue and critical swamp security and reconnaissance updates are distributed.',
      constraints_fulfilled: [
        'State: Council Council Summoned',
        'Weather: Heavy Rain',
      ],
      actors: [{ id: 'elara', role: 'moderator' }],
      social_encounters: [
        {
          id: 'soc_council_argun',
          npc_id: 'argun',
          npc_name: 'Farmer Argun (Skeptical Landowner)',
          context:
            "Argun bangs his fist on the table, blaming the wizards' meddling for the storms ruining his livestock pasturelands.",
          skill_challenges: [
            {
              skill: 'Persuasion (Reassurance)',
              dc: 12,
              success_outcome:
                'Argun is pacified, agreeing to let his farmhands assist the party with logistical swamp survival supplies (+1 Resource).',
              failure_outcome:
                'Argun storms out, riling up local hamlet panic. Tension Pool receives +1 die.',
            },
            {
              skill: 'Intimidation (Authority)',
              dc: 14,
              success_outcome:
                'Argun backs down grudgingly, muttering about legalities but ceases disrupting council deliberations.',
              failure_outcome:
                "The council looks unfavorably on party's aggression, increasing difficulty of subsequent diplomacy by +1 DC.",
            },
          ],
        },
        {
          id: 'soc_council_cap_reyna',
          npc_id: 'reyna',
          npc_name: 'Captain Reyna (Garrison Commander)',
          context:
            'Captain Reyna stands by the maps, requesting tactical defense directives before signing off outer-border scout escorts for the party.',
          skill_challenges: [
            {
              skill: 'History (Tactical Defense)',
              dc: 13,
              success_outcome:
                "Reyna is impressed. She allocates two veteran vanguard scouts to escort you, unlocking the 'secret_giant_guard_tactics' bonus location.",
              failure_outcome:
                'Reyna refuses to risk her scouts in the storm, forcing you to cross the moors blind.',
            },
          ],
          dialogue_tree_id: 'dt_reyna_briefing',
        },
      ],
      outcomes: [],
      screenplays_attached: ['sp_elara_greeting'],
    },
    scene_oakhaven_tavern_whispers: {
      id: 'scene_oakhaven_tavern_whispers',
      location_id: 'loc_oakhaven',
      description:
        'Late-night hushed conversations and rumors shared over hot spiced mead regarding ghost sight in the northern moors.',
      constraints_fulfilled: ['Time: Evening', 'Tavern: Open'],
      social_encounters: [
        {
          id: 'soc_tavern_barkeep',
          npc_id: 'barkeep_corbin',
          npc_name: 'Barkeep Corbin (Oakhaven Informant)',
          context:
            'Barkeep Corbin cleans a wooden goblet, keeping his voice low as he whispers rumors of strange blue lightning striking the ancient tomb to the north.',
          skill_challenges: [
            {
              skill: 'Deception/Persuasion (Gather Information)',
              dc: 12,
              success_outcome:
                'Corbin slips you a mapped layout of the outer burial grounds and notes that the spirits fear silvered steel weapons.',
              failure_outcome:
                'Corbin gets nervous and clams up, refusing to talk about forbidden ghosts in front of other patrons.',
            },
          ],
        },
      ],
      outcomes: [],
      screenplays_attached: ['sp_ambient_whispers'],
    },
    scene_oakhaven_shrine_blessing: {
      id: 'scene_oakhaven_shrine_blessing',
      location_id: 'loc_oakhaven',
      description:
        'A sacred divine ward activation ritual performed at the stone monolith altar to secure localized spiritual defense.',
      constraints_fulfilled: [
        'Weather: Thunderstorm',
        'Aura: Divine Ward Active',
      ],
      exploration_encounters: [
        {
          id: 'exp_shrine_nexus',
          name: 'Unstable Leyline Nexus Node',
          hazard_or_feature: 'Leyline Conflux Sparking Core',
          context:
            'The core of the high sanctuary shrine is vibrating heavily, channels of glowing blue plasma sparking out into the wet soil.',
          skill_challenges: [
            {
              skill: 'Arcana (Sigil Attunement)',
              dc: 15,
              success_outcome:
                'You successfully channel the excess residual energy. The localized shield ward stabilizes, and the party gains +200 XP and permanent lightning warding bonus (+2 AC vs lightning spikes).',
              failure_outcome:
                'A sudden magical blast siphons your spell slots, triggering a localized Wild Magic surge and adding +1 die to the Tension Pool.',
            },
          ],
        },
      ],
      outcomes: [],
      screenplays_attached: ['sp_monolith_rune'],
    },
    scene_journey_barrowmoors: {
      id: 'scene_journey_barrowmoors',
      location_id: 'loc_barrowmoors',
      description:
        'An arduous swamp trek through dense fog, waterlogged soil, and ancient graves to reach the tomb of the restless giant.',
      constraints_fulfilled: [
        'Required: Social Investigation Completed',
        'Quest Stage: main_quest_accepted == true',
        'Coordinates: Hex [0, 1] Discovered',
      ],
      on_load_av: {
        play_bgm: 'audiovisual_cues.soundscapes.bgm_storm_exterior',
      },
      social_encounters: [
        {
          id: 'soc_barrowmoors_wanderer',
          npc_id: 'spirit_wanderer',
          npc_name: 'The Sorrowful Wanderer (Lost Spirit)',
          context:
            'A semi-translucent ancient warrior wanders the misty swamp, sobbing softly under the pelting rain while clutching a broken signet medallion.',
          skill_challenges: [
            {
              skill: 'Persuasion (Diplomacy)',
              dc: 13,
              success_outcome:
                "The spirit feels heard and pacifies. It grants safe passage (+2 on upcoming saving throws) and gives a hint toward the 'secret_vorguns_true_death' clue.",
              failure_outcome:
                'The spirit screams in sorrow, rising the Tension Pool by 1 die before fading.',
            },
            {
              skill: 'History (Arcane Lore)',
              dc: 15,
              success_outcome:
                "You identify the crest: a standard of Oakhaven's ancient founders. You deduce that Oakhaven originally traded runes with Vorgun in a sacred alliance.",
              failure_outcome:
                'You misinterpret the sigil as a hostile house, offending the spirit.',
            },
          ],
          dialogue_tree_id: 'dt_barrowmoors_wanderer',
        },
      ],
      outcomes: [
        {
          condition: 'reach_tomb_entrance',
          next_scene_id: 'scene_burial_chamber_climax',
        },
      ],
      screenplays_attached: [
        'sp_storm_escalates',
        'sp_monolith_rune',
        'sp_ambient_whispers',
      ],
    },
    scene_burial_chamber_climax: {
      id: 'scene_burial_chamber_climax',
      location_id: 'loc_vorguns_tomb',
      description:
        "The wet stone burial sepulcher chamber where Vorgun's spirit hovers, radiating ancient lightning storm magic.",
      constraints_fulfilled: [
        'Required: Wilderness Exploration Completed',
        'Encounter Key: vorguns_ghost Activated',
        'Clues Discovered: >= 2',
      ],
      on_load_av: {
        play_bgm: 'audiovisual_cues.soundscapes.bgm_sorrowful_ambient',
      },
      encounters: [
        {
          id: 'enc_vorguns_ghost',
          actors: [{ entity_id: 'monsters.vorguns_ghost', quantity: 1 }],
          on_actor_takes_damage: { action: 'add_die_to_tension_pool' },
        },
      ],
      outcomes: [
        {
          condition: 'actor_hp_zero:monsters.vorguns_ghost',
          next_scene_id: 'scene_resolution_defeat',
        },
        {
          condition:
            'world_state:rage_appeased == true AND world_state:memory_appeased == true',
          script_id: 'seq_guardian_peace',
        },
      ],
      screenplays_attached: [
        'sp_vorguns_resolution',
        'sp_tomb_breach',
        'sp_ghost_apparition',
        'sp_relic_awakens',
        'sp_spirit_restoration',
        'sp_climax_victory',
      ],
    },
    scene_grotto_entrance: {
      id: 'scene_grotto_entrance',
      location_id: 'loc_smugglers_grotto',
      description:
        'Entering the dripping limestone caverns where moisture hangs thick and ancient smuggler barricades block the sub-level canal path.',
      constraints_fulfilled: [
        'Location: Grotto Discovered',
        'Environment: Humid Dampness',
      ],
      actors: [{ id: 'guard_corbin', role: 'informant' }],
      social_encounters: [
        {
          id: 'soc_grotto_corbin',
          npc_id: 'guard_corbin',
          npc_name: 'Guard Corbin (Lighthouse Smuggler Lookout)',
          context:
            "Adjusting his oilskin coat near a rusty coal brazier, Corbin tosses bone dice and warns you that the smuggler ring's leadership has triple-locked the inner canal bypass gate.",
          skill_challenges: [
            {
              skill: 'Deception (Secret Cover Story)',
              dc: 12,
              success_outcome:
                'He accepts your fake smuggler credentials, details patrol routes, and hands you an unmarked copy of the key card directory.',
              failure_outcome:
                'He sounds a small brass whistle, increasing the Tension Pool, and drawing hostile lookouts immediately.',
            },
          ],
        },
      ],
      outcomes: [],
      screenplays_attached: ['sp_grotto_arrival'],
    },
    scene_smugglers_clash: {
      id: 'scene_smugglers_clash',
      location_id: 'loc_smugglers_grotto',
      description:
        'A tense confrontation with the residual lookout thugs guarding the contraband crates and valuable regional smuggling journals.',
      constraints_fulfilled: ['Location: Grotto Depths Reached'],
      actors: [{ id: 'smuggler_thug', role: 'hostile' }],
      encounters: [
        {
          id: 'enc_grotto_brawl',
          actors: [{ entity_id: 'smuggler_thug', quantity: 3 }],
        },
      ],
      outcomes: [],
      screenplays_attached: ['sp_grotto_fight'],
    },
    scene_sunken_dock: {
      id: 'scene_sunken_dock',
      location_id: 'loc_smugglers_grotto',
      description:
        'The final submerged pier where target cargo barges are docked, revealing Oakhaven founder journals and stolen ancestral artifacts.',
      constraints_fulfilled: ['Item: Vault Key Discovered'],
      actors: [{ id: 'corporal_reid', role: 'allied_guide' }],
      exploration_encounters: [
        {
          id: 'exp_sunken_dock_cargo',
          name: 'Submerged Iron Chest',
          hazard_or_feature: 'Flooded Canal Waterway and Trapped Lockbox',
          context:
            'Half-buried in the silt near the sunken dock pier rests a strapped mahogany trunk wrapped in rusted mooring chains. Cold cavern water threatens to submerge it completely if disturbed incorrectly.',
          skill_challenges: [
            {
              skill: 'Athletics (Mooring Recovery)',
              dc: 13,
              success_outcome:
                'You safely heave the heavy trunk onto the dry wooden pier logs, keeping it intact (+75 XP).',
              failure_outcome:
                'The rotting floor planks collapse under your feet, dropping the trunk into deeper mud and splashing freezing water onto the crew.',
            },
            {
              skill: "Thieves' Tools (Relic Disarm)",
              dc: 14,
              success_outcome:
                'You bypass the pressure-release water traps, opening the lockbox safely to reveal stolen Oakhaven ledger maps.',
              failure_outcome:
                'A poison needle trigger shoots outward, delivering moderate toxic exposure.',
            },
          ],
        },
      ],
      outcomes: [],
      screenplays_attached: ['sp_grotto_discovery'],
    },
  },

  world_state: {
    time_elapsed_hours: 14,
    current_time_of_day: '15:30',
    tension_pool_current_dice: 4,
    discovered_clues: ['handout_thieves_diary'],
    unlocked_secrets: [],
    active_global_effects: ['proc_global_weather'],
    completed_scenes: ['scene_arrival_at_oakhaven'],
    active_scene: 'scene_journey_barrowmoors',
    weather_vector: 'Storm Intensity Tier 4 (Severe Electrified Runic Tempest)',
    leyline_resonance: '74% Resonance Ratio (Leyline Nexus Sync Active)',
    challenge_rating_tier: 'Level 4 Challenge Rating',
    time_before_tomb_collapse: '36 Hours Remaining',
    critical_doom_factor: 'Threat level 2 (Moderate Incident Hazard)',
    planar_instability: '12% Instability Ratio (Planar Distortion Low)',
    sanctuary_ward_level: 'Level 3 Dynamic Protective Ward Active',
    anomaly_gravitational_pull: 'Gravity G-Force: 1.05g (Stable Terrain Pull)',
    flags: {
      rage_appeased: false,
      memory_appeased: false,
      main_quest_accepted: true,
      storms_cease_fully: false,
    },
    dynamic_factions: {
      oakhaven_villagers: { attitude_to_party: 'Friendly' },
    },
  },
};
