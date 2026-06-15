import React, { useMemo } from 'react';
import {
  Compass,
  MapPin,
  Flame,
  Sparkles,
  Layers,
  BookOpen,
  Workflow,
} from 'lucide-react';

interface LocationDetail {
  id: string;
  name: string;
  type: 'coordinate' | 'combat';
  hexId: string;
  hexName: string;
  coordinates: string;
  layerName: string;
  layerVal: number;
  terrain: string;
  lore: string;
  classification: string; // e.g. "Settlement Center", "Crypt Vault", "Hazard Node", "Runic Landmark"
  hazardThreatRating: string; // e.g. "Danger Class I (None)", "Danger Class III (Significant)", etc.
  hazardLevelVal: number; // 0 to 100
  ethericResonanceVal: number; // 0 to 100
  lootSecrets: string;
  tacticalGuideline?: string;
  factionDominance: string; // e.g. "Oakhaven Town Council", "Restless Spirits", "Storm Wardens Brotherhood", "Ironwood Circle", "None"
  factionStatus: 'Friendly' | 'Hostile' | 'Neutral' | 'None';
}

const COORDINATE_TYPE_MAPPING: Record<string, string> = {
  'loc-oakhaven-square': 'clinic',
  'loc-oakhaven-vault': 'keep',
  'loc-oakhaven-monument': 'memorial',
  'loc-oakhaven-watchtower': 'tower',
  'loc-oakhaven-elara-chest': 'heirloom',
  'loc-barrow-moor': 'hexagon',
  'loc-barrow-cemetery': 'church',
  'loc-barrow-woods': 'path',
  'loc-barrow-sunken-swamp': 'moat crown',
  'loc-barrow-cold-ridge': 'path',
  'loc-barrow-mounds': 'memorial',
  'loc-barrow-blind': 'studio',
  'loc-barrow-silt-reach': 'hexagon',
  'loc-tomb-vault': 'corinth',
  'loc-tomb-guard-chamber': 'keep',
  'loc-tomb-alcove': 'memorial',
  'loc-tomb-inner-crypt': 'church',
  'loc-tomb-forgotten-crypts': 'library',
  'loc-monoliths': 'corinth',
  'loc-weeping-altar': 'church',
  'loc-sub-records': 'library',
  'loc-sub-waterway': 'port',
  'loc-sub-distill': 'studio',
  'loc-sub-shaft': 'path',
  'loc-sub-basin': 'keep',
  'loc-sub-moss': 'garden',
  'loc-sub-crypt-altar': 'church',
  'loc-sub-crypt-sieve': 'clinic',
  'loc-sub-crypt-ossuary': 'library',
  'loc-ast-nexus': 'corinth',
  'loc-ast-shrines': 'church',
  'loc-ast-battery': 'studio',
  'loc-ast-spire': 'tower',
  'loc-ast-citadel': 'tower',
  'loc-ast-garrison': 'keep',
  'loc-ast-gravitational': 'hexagon',
  'loc-ast-collector': 'studio',
};

const TYPE_STYLES: Record<
  string,
  { bg: string; border: string; icon: string }
> = {
  clinic: {
    bg: 'bg-emerald-50 text-emerald-800',
    border: 'border-emerald-250',
    icon: '🏥',
  },
  corinth: {
    bg: 'bg-amber-50 text-amber-800',
    border: 'border-amber-250',
    icon: '🏛️',
  },
  hexagon: {
    bg: 'bg-purple-50 text-purple-850',
    border: 'border-purple-250',
    icon: '⬡',
  },
  garden: {
    bg: 'bg-emerald-50 text-emerald-900',
    border: 'border-emerald-300',
    icon: '🌸',
  },
  tower: {
    bg: 'bg-indigo-50 text-indigo-800',
    border: 'border-indigo-250',
    icon: '🏰',
  },
  memorial: {
    bg: 'bg-teal-50 text-teal-800',
    border: 'border-teal-250',
    icon: '🕯️',
  },
  heirloom: {
    bg: 'bg-amber-100 text-amber-900',
    border: 'border-amber-300',
    icon: '👑',
  },
  library: {
    bg: 'bg-cyan-50 text-cyan-800',
    border: 'border-cyan-250',
    icon: '📚',
  },
  port: {
    bg: 'bg-blue-50 text-blue-800',
    border: 'border-blue-250',
    icon: '⚓',
  },
  'moat crown': {
    bg: 'bg-sky-50 text-sky-850',
    border: 'border-sky-300',
    icon: '🕳️',
  },
  keep: {
    bg: 'bg-slate-100 text-slate-800 border-slate-300',
    border: 'border-slate-300',
    icon: '🛡️',
  },
  studio: {
    bg: 'bg-pink-50 text-pink-800',
    border: 'border-pink-250',
    icon: '🎨',
  },
  path: {
    bg: 'bg-stone-50 text-stone-850',
    border: 'border-stone-250',
    icon: '🛤️',
  },
  church: {
    bg: 'bg-rose-50 text-rose-800',
    border: 'border-rose-250',
    icon: '⛪',
  },
};

export function GridZoneDetailsInspector() {
  // --- COMPLETE STATIC DATABASE OF CAMPAIGN LOCATIONS AND COMBAT SITES ---
  const locationDetailsList: LocationDetail[] = useMemo(() => {
    return [
      // ================= HEX-00: VILLAGE (OAKHAVEN) =================
      {
        id: 'loc-oakhaven-square',
        name: 'Oakhaven Town Square',
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Village Settlement',
        lore: 'The sprawling hub of Oakhaven Village. Centered around a massive warding obelisk of ancient giant design, which currently crackles with erratic, violet static as atmospheric tempest charges feed into its damp rock face.',
        classification: 'Settlement Landmark & Sanctuary',
        hazardThreatRating: 'Danger Class I (Minimal)',
        hazardLevelVal: 10,
        ethericResonanceVal: 65,
        lootSecrets:
          'Highland Altar Key hidden under the floorboards of the eastern market stall.',
        factionDominance: 'Oakhaven Town Council',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-oakhaven-farmlands',
        name: 'Southern Farmlands',
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Arable Lowlands',
        lore: 'Once-lucrative barley fields now turning soggy under the unending downpours. Shuddering windmills stand motionless against black thunderclouds while isolated lightning strikes turn crop ridges into smoldering charcoal.',
        classification: 'Settlement Resource Zone',
        hazardThreatRating: 'Danger Class I (Minimal)',
        hazardLevelVal: 15,
        ethericResonanceVal: 12,
        lootSecrets:
          "Buried cache of silver crescent tokens near the decaying scarecrow's base.",
        factionDominance: 'Oakhaven Town Council',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-oakhaven-council-hall',
        name: 'Council High Hall',
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Timber & Stonework Hall',
        lore: 'The political heart of Oakhaven. Shored up by ancient petrified giant-tree pillars, the council hall contains the official campaign ledger rolls, maps of the local ley lines, and historical archives detailing the ancient peace compacts.',
        classification: 'Government Archives',
        hazardThreatRating: 'Danger Class I (Minimal)',
        hazardLevelVal: 5,
        ethericResonanceVal: 40,
        lootSecrets:
          'An original charcoal charcoal chart mapping the Subterranean Grotto level layout.',
        factionDominance: 'Oakhaven Town Council',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-oakhaven-alley',
        name: 'Oakhaven Back-Alley Den',
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Shadowy Cul-de-Sacs',
        lore: 'A narrow, debris-choked crawlspace behind the brewing tavern. Smugglers and rogue elements gather here in rain cloaks, trading secrets about wet silt paths and exchanging stolen giant gold relics.',
        classification: 'Underworld Node',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 28,
        ethericResonanceVal: 18,
        lootSecrets:
          "Smuggler's cipher ledger detailing clandestine paths through the Barrowmoor mire.",
        factionDominance: 'None (Rogue Elements)',
        factionStatus: 'Neutral',
      },
      {
        id: 'loc-oakhaven-practice-ring',
        name: 'Oakhaven Practice Ring',
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Compacted Soil Courtyard',
        lore: "The marshaled guard training grounds. Training dummies stuffed with wet straw are split down the center by localized squalls, serving as a bleak physical reminder of the tempest's raw martial elements.",
        classification: 'Military Training Facility',
        hazardThreatRating: 'Danger Class I (Minimal)',
        hazardLevelVal: 12,
        ethericResonanceVal: 8,
        lootSecrets:
          'Discarded Masterwork Dirk under the mud of the weapon racks.',
        factionDominance: 'Oakhaven Town Council',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-oakhaven-shrine-altar',
        name: 'Oakhaven Shrine Altar Box',
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Runic Sanctuary Chamber',
        lore: "An ironwood holy container sitting within Oakhaven's small stone temple. It preserves sacred abjuration incense and holy scripture shards designed to insulate the local community from the giant's restless spirit.",
        classification: 'Sacred Reliquary',
        hazardThreatRating: 'Danger Class I (Minimal)',
        hazardLevelVal: 5,
        ethericResonanceVal: 85,
        lootSecrets:
          'Scroll of Protection against Undead aligned to Restless Spirits.',
        factionDominance: 'Oakhaven Town Council',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-oakhaven-vault',
        name: 'Oakhaven Council Vault',
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Iron-bolted Cellar',
        lore: 'A secure basement reinforced against burglaries. Built directly over a convergence of minor earth currents, it houses historical tribute chests and sealed treaty contracts between town founders and the Storm Wardens.',
        classification: 'Secured Treasury',
        hazardThreatRating: 'Danger Class I (Minimal)',
        hazardLevelVal: 10,
        ethericResonanceVal: 35,
        lootSecrets:
          '120 gp of ancient currency and an intact Abjuration Ward Talisman.',
        factionDominance: 'Oakhaven Town Council',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-oakhaven-monument',
        name: 'Oakhaven Founders Memorial',
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Gravel Plinth Garden',
        lore: "An ornate, mossy slate bust of Oakhaven's first settlement architect. Inscribed on its pedestal are the original terms of the Pact, outlining the sacred boundaries between mortal lands and giant burial mounds.",
        classification: 'Historical Registry Landmark',
        hazardThreatRating: 'Danger Class I (Minimal)',
        hazardLevelVal: 8,
        ethericResonanceVal: 22,
        lootSecrets:
          'An etched copper plate detailing star coordinates for high astral paths.',
        factionDominance: 'Oakhaven Town Council',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-oakhaven-watchtower',
        name: 'Oakhaven Guard Watchtower',
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Timber Scaffolding Lookout',
        lore: 'A 40-foot scaffold post looking north over the dark margins of the Barrowmoors. Guards huddle in thick tarpaulins, scanning the marsh-fog with iron lanterns for anomalous spectral lights or marsh wights.',
        classification: 'Sentry Garrison Outer Post',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 20,
        ethericResonanceVal: 15,
        lootSecrets:
          'Heavy heavy iron Spyglass and three pre-loaded Flare Bolts.',
        factionDominance: 'Oakhaven Town Council',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-oakhaven-elara-chest',
        name: "Oakhaven Elder's Private Chest",
        type: 'coordinate',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Quaint Study Chamber',
        lore: "Positioned inside Elder Elara's quarters. This heavy juniper chest holds a cluster of runic star charts, samples of dried peat-moss with warding qualities, and personal letters tracking the giant tomb's lightning breaches.",
        classification: 'Confidential Archive',
        hazardThreatRating: 'Danger Class I (Minimal)',
        hazardLevelVal: 4,
        ethericResonanceVal: 60,
        lootSecrets:
          'A private journal charting the exact trigger of the nighttime procedural events.',
        factionDominance: 'Oakhaven Town Council',
        factionStatus: 'Friendly',
      },

      // ================= HEX-01: SWAMPS (BARROWMOORS) =================
      {
        id: 'loc-barrow-moor',
        name: 'Damp Barrowmoors',
        type: 'coordinate',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Rotting Marshland Mire',
        lore: 'An expansive wilderness characterized by choking storm-mists. Thick brackish water hides skeletal root systems and unstable soils. Deep sub-audible hums roll through the marsh every thirty minutes as storm currents flow through the mud.',
        classification: 'Perilous Mire Wilderness',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 55,
        ethericResonanceVal: 50,
        lootSecrets:
          'Discarded rusted iron lantern containing an intact Spark of Everburning Star-Fire.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-barrow-cemetery',
        name: 'Highlands Cemetery',
        type: 'coordinate',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Fenced Burial Knolls',
        lore: "The final resting place of Oakhaven's early generation settlers. Crude slate gravestones and family burial iron enclosures are built high on the rare rocky ridges. Soil liquefaction from the storms has exposed several mossy vaults.",
        classification: 'Desecrated Settler Sepulcher',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 60,
        ethericResonanceVal: 72,
        lootSecrets:
          'An old grave medallion that allows casting of Speak with Dead once per day.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-barrow-woods',
        name: 'Whispering Woods',
        type: 'coordinate',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Drown Willow Forest',
        lore: 'A dense, overgrown patch of ancient black-bark willows. The winds whistling through the hollow trunks mimic human whispers, creating a high auditory hazard for scouts who lose focus on the wet ground.',
        classification: 'Mystical Thornwood Clump',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 38,
        ethericResonanceVal: 58,
        lootSecrets:
          'Ironwood resin that can be applied to weapons to bypass spectral damage resistances.',
        factionDominance: 'Ironwood Circle',
        factionStatus: 'Neutral',
      },
      {
        id: 'loc-barrow-sunken-swamp',
        name: 'Barrowmoor Sunken Swampland',
        type: 'coordinate',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Deep Silt Bog',
        lore: 'Low swamp hollows where the stagnant water is coated in green oil films. Creeping cold water vapors rise from peat pools, occasionally igniting with blue-green gas sparks in the storm winds.',
        classification: 'Environmental Hazard Puddle',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 64,
        ethericResonanceVal: 30,
        lootSecrets:
          'A sunken leather chest containing 85 old gold pennies and an silver potion vial.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-barrow-cold-ridge',
        name: 'Barrowmoor Cold Swamp Ridge',
        type: 'coordinate',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Frost-rimed Mud Uplands',
        lore: 'A narrow, slightly elevated mud ridge that marks the boundary between the lower slough and the rocky highland crags. Frozen tempest sleet clings to the low gorse shrubs, creating very slippery footing.',
        classification: 'Scenic Transition Ridge',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 32,
        ethericResonanceVal: 20,
        lootSecrets:
          "A hidden hunter's hideout stash with two dry wool blankets and hunting rations.",
        factionDominance: 'None (Desolate Margins)',
        factionStatus: 'None',
      },
      {
        id: 'loc-barrow-mounds',
        name: 'Barrowmoor Whispering Mounds',
        type: 'coordinate',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Sacred Burial Hillocks',
        lore: 'Three massive grassy tumuli containing ancient giant-kin graves from the planetary formation epoch. Inscribed sandstone panels under the moss hum with runic star-wind parameters when storm activity reaches maximum intensities.',
        classification: 'Celestial Relic Tumulus',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 78,
        ethericResonanceVal: 90,
        lootSecrets:
          "The High Rune Plate which fits into the central chamber of Vorgun's tomb.",
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-barrow-blind',
        name: 'Barrowmoor Treehouse Blind',
        type: 'coordinate',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Canopy Platform',
        lore: 'Constructed sixty feet above the mud in a rotting giant hollow cedar. Designed by deep wood rangers decades ago, the treehouse platform is wet and decaying but provides an unobstructed view of planar lighting strikes.',
        classification: 'Abandoned Scout Outpost',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 25,
        ethericResonanceVal: 15,
        lootSecrets:
          'Waterproof case containing a hand-drawn topographical map of Sentinel Monolith nodes.',
        factionDominance: 'Ironwood Circle',
        factionStatus: 'Neutral',
      },
      {
        id: 'loc-barrow-silt-reach',
        name: 'Barrowmoor Wet Silt Reach',
        type: 'coordinate',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Shifting Quagmire Sands',
        lore: 'An open, waterlogged stretch of grey sand silt. The ground here behaves like fluid due to underlying spring currents. It swallows structural materials and organic targets in minutes if they lack boards to spread boundaries weight.',
        classification: 'Lethal Environmental Zone',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 82,
        ethericResonanceVal: 10,
        lootSecrets:
          'An intact bronze shield from a past expedition sticking out of the shifting sand.',
        factionDominance: 'None (Wild Mire)',
        factionStatus: 'None',
      },

      // ================= HEX-02: STONE TOMB (VORGUN'S TOMB SUBTERRANEAN) =================
      {
        id: 'loc-tomb-vault',
        name: "Vorgun's Sarcophagus Vault",
        type: 'coordinate',
        hexId: 'hex-02',
        hexName: "Stone Tomb (Vorgun's Tomb)",
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Worked Granite Vault',
        lore: "The core chamber enclosing Vorgun's monumental sarcophagus. Built of polished dark basalt, the master sarcophagus is etched with micro-runes tracking planar stellar cycles. Violet electrical vapors rise from vertical wall channels.",
        classification: 'Tomb High Sanctorum',
        hazardThreatRating: 'Danger Class V (Cataclysmic)',
        hazardLevelVal: 95,
        ethericResonanceVal: 98,
        lootSecrets:
          'The Legendary Blade of Guardianship is sealed within the inner giant stone lid.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-tomb-guard-chamber',
        name: "Vorgun's Burial Guard Chamber",
        type: 'coordinate',
        hexId: 'hex-02',
        hexName: "Stone Tomb (Vorgun's Tomb)",
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Reinforced Ashlar Hall',
        lore: 'An ornate defensive antichamber lined with massive, cracked stone statues of giant sentinels. Their stone limbs and shields carry star-alignment markings and show fractures where raw static discharge has vented into the surrounding vaults.',
        classification: 'Tomb Defensive Garrison',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 74,
        ethericResonanceVal: 60,
        lootSecrets:
          'Shard of Crystalline Quartz containing stored electrical spell charges.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-tomb-alcove',
        name: "Vorgun's Deep Sarcophagus Alcove",
        type: 'coordinate',
        hexId: 'hex-02',
        hexName: "Stone Tomb (Vorgun's Tomb)",
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Intimate Granite Niche',
        lore: 'A quiet, recessed niche positioned behind the massive giant memorial walls. It contains ancient offering jars filled with calcified grains and dried marsh lilies from centuries past, remarkably preserved by underground dry drafts.',
        classification: 'Tomb Offering Sanctuary',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 48,
        ethericResonanceVal: 75,
        lootSecrets:
          "An ornamental Giant's Signet Gold Ring which grants resistance to electrical hazard components.",
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-tomb-inner-crypt',
        name: "Vorgun's Tomb Inner Crypt",
        type: 'coordinate',
        hexId: 'hex-02',
        hexName: "Stone Tomb (Vorgun's Tomb)",
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Vaulted Stone Sepulcher',
        lore: 'A sacred chamber positioned directly below the central ley line alignment. The brick walls are completely clad in ancient copper lining plates designed to focus the celestial grounding wind currents.',
        classification: 'Tomb Core Grounding Crypt',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 80,
        ethericResonanceVal: 88,
        lootSecrets:
          'Three gold plates describing the ritual processes for binding restless giant souls.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-tomb-forgotten-crypts',
        name: 'The Forgotten Crypts',
        type: 'coordinate',
        hexId: 'hex-02',
        hexName: "Stone Tomb (Vorgun's Tomb)",
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Decaying Sandstone Catacombs',
        lore: "Extensive unmapped catacombs where Oakhaven's founders secretly buried family lines to benefit from the tomb's spatial abjuration boundaries. Damp, dripping water has caused sandstone wall sections to collapse.",
        classification: 'Subterranean Shared Catacombs',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 72,
        ethericResonanceVal: 65,
        lootSecrets:
          'An iron key that unlocks the secondary security vault inside Oakhaven Council Hall.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },

      // ================= HEX-02-SURFACE: STONE TOMB (SURFACE ENTRANCE) =================
      {
        id: 'loc-monoliths',
        name: 'Sentinel Stone Monoliths',
        type: 'coordinate',
        hexId: 'hex-02-surface',
        hexName: 'Stone Tomb (Surface Entrance)',
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Exposed Bedrock Tor',
        lore: 'Four massive megaliths hovering three inches off the solid mountain rock bedrock. Glowing star-runes are deeply carved into their faces, crackling loudly when gravitational shear storms pass over the peaks.',
        classification: 'Planar Grounding Obelisks',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 84,
        ethericResonanceVal: 92,
        lootSecrets:
          'An astronomical astrolabe that predicts planar rift closures.',
        factionDominance: 'Ironwood Circle',
        factionStatus: 'Neutral',
      },
      {
        id: 'loc-weeping-altar',
        name: 'Barrowmoor Weeping Cairn Altar',
        type: 'coordinate',
        hexId: 'hex-02-surface',
        hexName: 'Stone Tomb (Surface Entrance)',
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Slate Slab Structure',
        lore: "An ancient slate slab altar located near the tomb's outer stone door. Sleet and condensation trickle down the slate continuously like tears. Pilgrims once placed copper tokens here to secure safe passage through the low mire.",
        classification: 'Ritual Offering Mound',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 45,
        ethericResonanceVal: 62,
        lootSecrets:
          'A hidden copper compartment containing two highly concentrated Elixirs of Willpower.',
        factionDominance: 'Ironwood Circle',
        factionStatus: 'Neutral',
      },

      // ================= HEX-SUB-01: SMUGGLERS' GROTTO =================
      {
        id: 'loc-sub-records',
        name: 'Barrowmoor Family Shrine Records',
        type: 'coordinate',
        hexId: 'hex-sub-01',
        hexName: "Misty Hollow Smugglers' Grotto",
        coordinates: 'q:2, r:-2, s:0',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Damp Cavern Shelves',
        lore: "A limestone recess used by smugglers to hide family logs. Wrapped in oiled badger skin, these logs detail true birthlines of Oakhaven's founders and track ancestral claims on the giant's sacred treasures.",
        classification: 'Ancestral Archive Hideout',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 30,
        ethericResonanceVal: 25,
        lootSecrets:
          "The original Founder's Ledger confirming the sacred Pact boundaries violation terms.",
        factionDominance: 'None (Smuggler Hideout)',
        factionStatus: 'None',
      },
      {
        id: 'loc-sub-waterway',
        name: 'Waterway Cargo Cache',
        type: 'coordinate',
        hexId: 'hex-sub-01',
        hexName: "Misty Hollow Smugglers' Grotto",
        coordinates: 'q:2, r:-2, s:0',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Submerged Stone Berth',
        lore: "Built into the cavern's canal lock, this flooded cache holds buoyant tarred barrels chained to heavy stone anchors to prevent them from floating high or drifting downriver with the tide.",
        classification: 'Smuggler Wet Storage',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 25,
        ethericResonanceVal: 15,
        lootSecrets:
          'A waterproof pouch holding three silver thief-picks and rare imported spices.',
        factionDominance: 'None (Smuggler Hideout)',
        factionStatus: 'None',
      },
      {
        id: 'loc-sub-distill',
        name: "Smuggler's Distill Vault",
        type: 'coordinate',
        hexId: 'hex-sub-01',
        hexName: "Misty Hollow Smugglers' Grotto",
        coordinates: 'q:2, r:-2, s:0',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Smoky Rock Crevice',
        lore: "An underground distillery venting steam through natural mud chimneys into the marsh above. It brews highly aromatic 'Marsh-Silt Brandy' using luminescent moss and heavy swamp waters.",
        classification: 'Illicit Brewery Chamber',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 40,
        ethericResonanceVal: 34,
        lootSecrets:
          'Multiple clay bottles of potent Distilled Spirit that heals frost damage.',
        factionDominance: 'None (Smuggler Hideout)',
        factionStatus: 'None',
      },
      {
        id: 'loc-sub-shaft',
        name: 'Charter-Thief Escape Shaft',
        type: 'coordinate',
        hexId: 'hex-sub-01',
        hexName: "Misty Hollow Smugglers' Grotto",
        coordinates: 'q:2, r:-2, s:0',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Craggy Bedrock Funnel',
        lore: 'A crude vertical chimney rope system leading up to a hollow oak tree on the surface boundary. Perfect for escaping town militia raids on short notice with light cargo.',
        classification: 'Emergency Escape Link',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 20,
        ethericResonanceVal: 10,
        lootSecrets:
          'A dropped leather belt containing an ornate brass grappling hook.',
        factionDominance: 'None (Smuggler Hideout)',
        factionStatus: 'None',
      },
      {
        id: 'loc-sub-basin',
        name: 'Sunken Basin Hideout',
        type: 'coordinate',
        hexId: 'hex-sub-01',
        hexName: "Misty Hollow Smugglers' Grotto",
        coordinates: 'q:2, r:-2, s:0',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Lid-Shut Limestone Pool',
        lore: 'A dry raised limestone terrace within the grotto, enclosed by hanging columns. Hammocks and wool bedrolls are slung over the dry rocks around a low embers firepit.',
        classification: 'Clandestine Living Quarters',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 15,
        ethericResonanceVal: 20,
        lootSecrets:
          'A hidden gold key that unlocks merchant lockboxes in northern settlements.',
        factionDominance: 'None (Smuggler Hideout)',
        factionStatus: 'None',
      },
      {
        id: 'loc-sub-moss',
        name: 'Weeping Moss Garden',
        type: 'coordinate',
        hexId: 'hex-sub-01',
        hexName: "Misty Hollow Smugglers' Grotto",
        coordinates: 'q:2, r:-2, s:0',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Damp Phosphorescent Wall',
        lore: 'A beautiful wall-hanging garden of weeping blue-green moss. It feeds slowly on the ley line static runoff leaking from the planar astral layer, sparkling in high frequency intervals.',
        classification: 'Static Moss Oasis',
        hazardThreatRating: 'Danger Class I (Negligible)',
        hazardLevelVal: 8,
        ethericResonanceVal: 65,
        lootSecrets:
          'Three pinches of Glow-Silt Dust which grants light-glowing sight in crypts.',
        factionDominance: 'None (Smuggler Hideout)',
        factionStatus: 'None',
      },

      // ================= HEX-SUB-02: FORGOTTEN CRYPTS / FAMILY CRYPT =================
      {
        id: 'loc-sub-crypt-altar',
        name: 'Ancestral High Altar',
        type: 'coordinate',
        hexId: 'hex-sub-02',
        hexName: 'Forgotten Crypts / Family Crypt',
        coordinates: 'q:4, r:-3, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Runic Obsidian Pillars',
        lore: 'The highest sanctuary in the crypt, reserved for bloodline elders. A golden brazier burns forever with cold spectral flames, casting shadows of memory that outline long-forgotten family lineages on the walls.',
        classification: 'Family Ritual Chamber',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 20,
        ethericResonanceVal: 48,
        lootSecrets:
          'A family signet ring that opens secondary lockboxes in the high hall.',
        factionDominance: 'None',
        factionStatus: 'None',
      },
      {
        id: 'loc-sub-crypt-sieve',
        name: 'Damped Sieve Well',
        type: 'coordinate',
        hexId: 'hex-sub-02',
        hexName: 'Forgotten Crypts / Family Crypt',
        coordinates: 'q:4, r:-3, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Silty Bedrock Basin',
        lore: 'A shallow well designed to leach groundwater through layers of charcoal. It remains pristine but is guarded by high-vibrational static runes that shock warm-blooded intruders.',
        classification: 'Subterranean Water Sieve',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 35,
        ethericResonanceVal: 30,
        lootSecrets:
          'Two crystal phials of Purified Well Water which removes swamp diseases.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-sub-crypt-ossuary',
        name: 'Ossuary Custody Vault',
        type: 'coordinate',
        hexId: 'hex-sub-02',
        hexName: 'Forgotten Crypts / Family Crypt',
        coordinates: 'q:4, r:-3, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Stacked Limestone Alcoves',
        lore: 'Filled with clay jars of cremation ash arranged chronologically. Soft whispers echo through the narrow shelves, chanting ancient local epics to keep the spirits calm and anchored.',
        classification: 'Historic Ossuary Archive',
        hazardThreatRating: 'Danger Class I (Negligible)',
        hazardLevelVal: 10,
        ethericResonanceVal: 40,
        lootSecrets:
          'An ancient translation slate that deciphers giant runic writing on monoliths.',
        factionDominance: 'None',
        factionStatus: 'None',
      },

      // ================= HEX-AST-01: ASTRAL LEYLINE NEXUS =================
      {
        id: 'loc-ast-nexus',
        name: 'Western Leyline Conduit',
        type: 'coordinate',
        hexId: 'hex-ast-01',
        hexName: 'Astral Leyline Nexus',
        coordinates: 'q:0, r:1, s:-1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Planar Lightning Conduit',
        lore: 'A glowing needle-pillar of raw star-power that connects planar levels directly to the Oakhaven ward obelisks. Sub-harmonic sound-waves vibrate through the energy field, causing crystal debris to float and dance.',
        classification: 'Aether Energy Anchor',
        hazardThreatRating: 'Danger Class V (Cataclysmic)',
        hazardLevelVal: 90,
        ethericResonanceVal: 96,
        lootSecrets:
          'An unstable Ley Flame Core capable of overloading localized warding stones.',
        factionDominance: 'Storm Wardens Brotherhood',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-ast-shrines',
        name: 'High Warding Shrines',
        type: 'coordinate',
        hexId: 'hex-ast-01',
        hexName: 'Astral Leyline Nexus',
        coordinates: 'q:0, r:1, s:-1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Levitating Quartz Spires',
        lore: 'Hovering stone altars where ancient planar wardens anchored atmospheric safety fields. Beautiful stellar light beams converge here, casting clean auroras over the turbulent low clouds of the Barrowmoors.',
        classification: 'Planar Warding Bastion',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 50,
        ethericResonanceVal: 85,
        lootSecrets:
          'A celestial gemstone shard that enhances healing magic effectiveness by 25%.',
        factionDominance: 'Storm Wardens Brotherhood',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-ast-battery',
        name: 'Aether Current Battery',
        type: 'coordinate',
        hexId: 'hex-ast-01',
        hexName: 'Astral Leyline Nexus',
        coordinates: 'q:0, r:1, s:-1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Luminous Amethyst Clusters',
        lore: 'A grid-like array of massive violet quartz crystals that functions as an immense reservoir for high-frequency ley energy. A steady static crackle alerts adventurers to the potential for electrical arcs.',
        classification: 'High-Frequency Regulator',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 78,
        ethericResonanceVal: 88,
        lootSecrets:
          'A refined quartz lens that can be attached to goggles to detect magic ley lines.',
        factionDominance: 'Storm Wardens Brotherhood',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-ast-spire',
        name: 'Runic Resonance Spire',
        type: 'coordinate',
        hexId: 'hex-ast-01',
        hexName: 'Astral Leyline Nexus',
        coordinates: 'q:0, r:1, s:-1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Crystalline Granite Tower',
        lore: 'An elegant towering structure covered in vertical giant script runes. The spire filters raw magic currents flowing from the deep planar rift, shielding the valley below from severe psychic pressure.',
        classification: 'Atheric Filtering Spire',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 55,
        ethericResonanceVal: 92,
        lootSecrets:
          'A rare scroll of Planar Warding allowing a party to traverse high-gravity areas.',
        factionDominance: 'Storm Wardens Brotherhood',
        factionStatus: 'Friendly',
      },

      // ================= HEX-AST-02: SKY RUINS MONOLITH PEAK =================
      {
        id: 'loc-ast-citadel',
        name: 'Lighthouse Citadel',
        type: 'coordinate',
        hexId: 'hex-ast-02',
        hexName: 'Sky Ruins Monolith Peak',
        coordinates: 'q:-1, r:0, s:1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Polished Obsidian Tower',
        lore: 'A massive stargazing bastion built of black obsidian that channels the glowing beam of the main ley line. The gravity sheer is highly unstable here, requiring characters to anchor themselves to floor rings.',
        classification: 'Planar Navigational Lighthouse',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 76,
        ethericResonanceVal: 91,
        lootSecrets:
          'An Astrological Star-Map depicting coordinates to secondary giant Bastions.',
        factionDominance: 'Storm Wardens Brotherhood',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-ast-garrison',
        name: 'Garrison Watchtower',
        type: 'coordinate',
        hexId: 'hex-ast-02',
        hexName: 'Sky Ruins Monolith Peak',
        coordinates: 'q:-1, r:0, s:1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Eroded Granite Outpost',
        lore: 'Originally manned by giant-kin sentinel units, this ruined garrison overlooks the southern planar fissures. Sandstone arches are split by intense electrical heat, leaving levitating segments hovering in the breeze.',
        classification: 'Planar Defensive Outpost',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 58,
        ethericResonanceVal: 45,
        lootSecrets:
          'A robust giant recurve bow and five lightning-attuned steel arrows.',
        factionDominance: 'Storm Wardens Brotherhood',
        factionStatus: 'Friendly',
      },
      {
        id: 'loc-ast-gravitational',
        name: 'Gravitational Anchoring Arch',
        type: 'coordinate',
        hexId: 'hex-ast-02',
        hexName: 'Sky Ruins Monolith Peak',
        coordinates: 'q:-1, r:0, s:1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Hovering Basalt Rings',
        lore: 'A series of interlocking concentric circles made of basalt that slowly spin around a magnetic iron spindle. This machinery maintains gravitational density on the peak, preventing loose structures from floating off into space.',
        classification: 'Peak Gravitational Anchor',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 62,
        ethericResonanceVal: 70,
        lootSecrets:
          'An orbital magnetic compass that operates perfectly in zero gravity.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'loc-ast-collector',
        name: 'Solar Wind Collector Hub',
        type: 'coordinate',
        hexId: 'hex-ast-02',
        hexName: 'Sky Ruins Monolith Peak',
        coordinates: 'q:-1, r:0, s:1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Reflective Quartz Dish',
        lore: 'A massive concave basin of mirror-polished sky crystals that tilts toward the high astral horizon. It intercepts solar wind particles and converts them into dense liquid light used as an engine reactant.',
        classification: 'Astral Particle Condenser',
        hazardThreatRating: 'Danger Class II (Low)',
        hazardLevelVal: 28,
        ethericResonanceVal: 80,
        lootSecrets:
          'A glass canister containing Pure Liquid Moon-fire that lights up dark rooms.',
        factionDominance: 'Storm Wardens Brotherhood',
        factionStatus: 'Friendly',
      },

      // =================================== COMBAT SITES ===================================
      {
        id: 'com-cemetery-outskirts',
        name: 'Highlands Cemetery Outskirts',
        type: 'combat',
        hexId: 'hex-00',
        hexName: 'Village (Oakhaven)',
        coordinates: 'q:0, r:0, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Overgrown Bramble Knolls',
        lore: "The gloomy borders of Oakhaven's oldest yard. Brambles and iron spurs choke the pathway. Famished ghouls sneak out of wet silt holes to ambush village patrols who wander away from the central ward stone.",
        classification: 'Deadly Swarm Ambush Zone',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 45,
        ethericResonanceVal: 40,
        lootSecrets:
          'A pouch containing silver crescent coins and an old Guard captain insignia.',
        tacticalGuideline:
          'Undead gain +1 bonus to attack rolls under the Weeping Moon. Keep the party clustered within 15ft of protective light sources to suppress ghoul regeneration traits.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'com-barrowmoors',
        name: 'Damp Barrowmoors',
        type: 'combat',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Soggy Moss Sinkhole',
        lore: 'A treacherous hollow where the terrain drops into sticky silt pools. Skeletal marsh ghouls arise from the thick mud, dragging characters down into dark anaerobic water pockets if they fail strength tests.',
        classification: 'Heavy Silt Combat Zone',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 60,
        ethericResonanceVal: 48,
        lootSecrets:
          'An intact steel breastplate on a skeleton with 30 gp in its leather belt pouch.',
        tacticalGuideline:
          'Moving through this space costs double movement (0.50x speed). Leverage fire-based spells to trigger localized marsh-gas explosions for massive area-of-effect damage.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'com-mistwood',
        name: 'Mistwood Wilds Swamp',
        type: 'combat',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Dense Choking Mire',
        lore: 'The primary marsh swamp territory claimed by the Barrowmoor Hag. Heavy grey fog severely obscuring standard sight lines, while poisonous spore blights latch onto skin, causing slow corrosive physical damage.',
        classification: 'Corrosive Acid Spore Pocket',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 75,
        ethericResonanceVal: 62,
        lootSecrets:
          "The Hag's bubbling cauldron contains three vials of Acid Resistance potion.",
        tacticalGuideline:
          'Arachnophobia Safe Substitution: Giant Spider monsters are replaced with Venomous Vine Blights. Characters must make daily Constitution checks or suffer 1d6 poison damage.',
        factionDominance: 'None (Hag Territory)',
        factionStatus: 'Hostile',
      },
      {
        id: 'com-lotus-glade',
        name: 'Elder-Lotus Glade',
        type: 'combat',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Rotting Giant Fern Circle',
        lore: 'A beautiful but deadly clearing centered around an ancient, rotting giant purple water lily. Lightning bolts strike the pool periodically, charging the lotus roots with high electrical voltage that sparks outward.',
        classification: 'High Voltage Arena',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 70,
        ethericResonanceVal: 77,
        lootSecrets:
          'Intact Ancient Lotus Bulb which doubles magical focus regeneration speed.',
        tacticalGuideline:
          'Avoid standing on metallic or water log elements. When lightning strikes, a shockwave sweeps the pool, dealing 2d6 electrical damage to ungrounded characters.',
        factionDominance: 'None (Wild Mire)',
        factionStatus: 'None',
      },
      {
        id: 'com-smuggler-hollow',
        name: 'Barrowmoor Smuggler Marsh-Hollow',
        type: 'combat',
        hexId: 'hex-01',
        hexName: 'Swamps (Barrowmoors)',
        coordinates: 'q:1, r:-1, s:0',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Half-merged Limestone Cave',
        lore: 'A hidden caverns mouth where mud-clogged water bypasses the overland patrols. Criminal cutthroats and shadow spirits guard wooden smuggler flatboats filled with grain and abjuration relics.',
        classification: 'Smuggler Camp Sledge',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 52,
        ethericResonanceVal: 38,
        lootSecrets:
          "A heavy bronze master key that unlocks the secure doors inside Vorgun's guard chamber.",
        tacticalGuideline:
          'Levy environmental cover behind the wooden cargo crates to block arrow lines. Smuggler cutthroats are highly vulnerable to psychic-based fear spells.',
        factionDominance: 'None (Criminal Syndicate)',
        factionStatus: 'Neutral',
      },
      {
        id: 'com-burial-mound',
        name: 'Burial Mound',
        type: 'combat',
        hexId: 'hex-02-surface',
        hexName: 'Stone Tomb (Surface Entrance)',
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Wind-swept Stone Steps',
        lore: 'The massive staircase leading into the burial complex. Runic lightning ward blocks are damaged, creating high planar sparks. Ancient stone sentinels stand on the steps, slashing at intruders with heavy stone glaives.',
        classification: 'Monumental Gate Skirmish',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 76,
        ethericResonanceVal: 80,
        lootSecrets:
          "The sentinel captain's shattered stone glaive containing an intact storm sapphire.",
        tacticalGuideline:
          'High wind blasts sweep the platform every 2 rounds. Characters within 10ft of the edge must succeed on Dexterity saves or be swept down 20 feet onto rocky scree.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'com-sentinel-stones',
        name: 'Sentinel Stone Monoliths',
        type: 'combat',
        hexId: 'hex-02-surface',
        hexName: 'Stone Tomb (Surface Entrance)',
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Surface 0.0',
        layerVal: 0,
        terrain: 'Gravitator Field Tor',
        lore: 'An open bedrock ridge where levitating stones drift in circular patterns. Unstable gravitational shear storms deal heavy physical bludgeoning damage to teams who fail to seek cover behind deeply anchored rocks.',
        classification: 'Gravitational Shear Arena',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 82,
        ethericResonanceVal: 90,
        lootSecrets:
          'An astronomical astrolabe that unlocks skyward planar rifts.',
        tacticalGuideline:
          'Use levitating stones as dynamic vertical cover. Lightning mephits present here will try to use gust spells to push characters into the unstable friction fields.',
        factionDominance: 'Ironwood Circle',
        factionStatus: 'Neutral',
      },
      {
        id: 'com-inner-crypt',
        name: 'Inner Tomb Sarcophagus Chamber',
        type: 'combat',
        hexId: 'hex-02',
        hexName: "Stone Tomb (Vorgun's Tomb)",
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Runic Granite Sanctorum',
        lore: "The final resting chamber of Vorgun. The giant's spectral projection hover over the central coffin, lashing out with heavy storm-lasers that bounce off the copper grounding walls, filling the space with electrical sparks.",
        classification: 'Boss Encounter Arena',
        hazardThreatRating: 'Danger Class V (Cataclysmic)',
        hazardLevelVal: 96,
        ethericResonanceVal: 99,
        lootSecrets:
          "Unlocks the Blade of Guardianship and grants the 'Saviour of Oakhaven' trait.",
        tacticalGuideline:
          "Vorgun's spectral visual is immune to standard physical blades. Use the 'sacred ritual of binding memory' using the three high runes to temporarily ground and stun him.",
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'com-spirit-throne',
        name: 'Ancient Spirit Throne Room',
        type: 'combat',
        hexId: 'hex-02',
        hexName: "Stone Tomb (Vorgun's Tomb)",
        coordinates: 'q:3, r:-2, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Decaying Basalt Throne Room',
        lore: 'The ancient assembly hall of the Giant lords. Visages of long-dead storm counselors inhabit the decaying granite throne chairs. When approached, their stony eyes flare with blue fire and they conjure cold sleet storms.',
        classification: 'Lord Visage Hall',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 85,
        ethericResonanceVal: 82,
        lootSecrets:
          "The Storm Lord's Iron Crown, which adds +2 to Spell DC for lightning and wind magic.",
        tacticalGuideline:
          'The sleet storm cuts visual ranges to 10 feet. Rely on sound-echo tracking or use thermal/spectral vision sensors to target the counselors.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'com-forgotten-crypts',
        name: 'The Forgotten Crypts',
        type: 'combat',
        hexId: 'hex-sub-02',
        hexName: 'Forgotten Crypts / Family Crypt',
        coordinates: 'q:4, r:-3, s:-1',
        layerName: 'Subterranean -1.0',
        layerVal: -1,
        terrain: 'Unmapped Sandstone Catacombs',
        lore: 'Narrow, damp corridors littered with ancient bone sarcophagi. Barrow ghouls and skeleton rats gnaw on wooden coffin boards, aggressively rushing the party from ceiling crevasses when torches are lit.',
        classification: 'Skeletal Labyrinth Ambush',
        hazardThreatRating: 'Danger Class III (Significant)',
        hazardLevelVal: 68,
        ethericResonanceVal: 55,
        lootSecrets:
          "Ring of Silent Sneaking hidden in the skull of the founding mayor's bust.",
        tacticalGuideline:
          'Ghouls inflict physical claw paralysis. Ensure your frontline wardens consume dried wolfberry potions before entering these cramped tunnels to resist paralyzing claws.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
      {
        id: 'com-leyline-conduit',
        name: 'Western Leyline Conduit',
        type: 'combat',
        hexId: 'hex-ast-01',
        hexName: 'Astral Leyline Nexus',
        coordinates: 'q:0, r:1, s:-1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Crackling Energy Tor',
        lore: 'A highly charged planetary anchor point. Energy vortices swirl around levitating quartz spires, guarded by erratic lightning mephits and lightning elementals that feed on raw stellar currents.',
        classification: 'Planar Elemental Conduit',
        hazardThreatRating: 'Danger Class V (Cataclysmic)',
        hazardLevelVal: 90,
        ethericResonanceVal: 95,
        lootSecrets:
          'Celestial Sapphire Core, useful for boosting lightning defense matrix gears.',
        tacticalGuideline:
          'Every lightning mephit defeated here vents an electrical blast dealing 1d10 damage to adjacent units. Engage them from solid ranged lines.',
        factionDominance: 'Storm Wardens Brotherhood',
        factionStatus: 'Friendly',
      },
      {
        id: 'com-whispering-summit',
        name: 'Whispering Heath Summit',
        type: 'combat',
        hexId: 'hex-ast-02',
        hexName: 'Sky Ruins Monolith Peak',
        coordinates: 'q:-1, r:0, s:1',
        layerName: 'Planar Astral +1.0',
        layerVal: 1,
        terrain: 'Planar Cliff Edge',
        lore: 'High wind-swept heights directly overlooking the low cloud layers of the Barrowmoors. Heavy planar gravity shear storms deal physical bludgeoning damage to targets who stand in exposed paths.',
        classification: 'High Altitude Overlook',
        hazardThreatRating: 'Danger Class IV (Extreme)',
        hazardLevelVal: 72,
        ethericResonanceVal: 60,
        lootSecrets:
          'A container of Giant Feather Fall powder (3 applications).',
        tacticalGuideline:
          'Fierce winds can knock characters prone. Maintain a low crawl or align physical grapple hooks to stable obsidian stone pillars.',
        factionDominance: 'Restless Spirits',
        factionStatus: 'Hostile',
      },
    ];
  }, []);

  // --- SUBSET RESOLUTIONS ---
  const coordinateLocations = useMemo(() => {
    return locationDetailsList.filter((item) => item.type === 'coordinate');
  }, [locationDetailsList]);

  const combatSites = useMemo(() => {
    return locationDetailsList.filter((item) => item.type === 'combat');
  }, [locationDetailsList]);

  const stats = useMemo(() => {
    const total = locationDetailsList.length;
    const coordinates = coordinateLocations.length;
    const combat = combatSites.length;
    const surface = locationDetailsList.filter((i) => i.layerVal === 0).length;
    const subterranean = locationDetailsList.filter(
      (i) => i.layerVal === -1,
    ).length;
    const planar = locationDetailsList.filter((i) => i.layerVal === 1).length;
    return { total, coordinates, combat, surface, subterranean, planar };
  }, [locationDetailsList, coordinateLocations, combatSites]);

  return (
    <section
      id="section-grid-zone-inspector"
      className="border border-black p-6 rounded bg-white/25 flex flex-col gap-6 select-all"
    >
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black pb-3 gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-neutral-800" />
          <h2 className="font-serif text-xl font-black uppercase tracking-wide">
            Zone Directory
          </h2>
        </div>
      </div>

      <p className="font-serif text-sm leading-relaxed text-neutral-700">
        This comprehensive dossier compiles and archives all{' '}
        <b>Coordinate Locations</b> & <b>Combat Sites</b> extracted from the
        active campaign hex layers. Displayed in an unabridged, unified ledger,
        this record tracks geospatial parameters, ancient histories, potential
        spoils, and combat guidelines.
      </p>

      {/* QUICK STATISTICS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-1">
        <div className="bg-white/80 border border-neutral-300 rounded p-2 text-center font-mono select-all">
          <span className="text-[9px] text-neutral-400 block uppercase font-bold">
            Total Dossiers
          </span>
          <span className="font-sans text-xl font-black text-neutral-900">
            {stats.total}
          </span>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded p-2 text-center font-mono select-all">
          <span className="text-[9px] text-emerald-600 block uppercase font-bold">
            📍 Coordinate Nodes
          </span>
          <span className="font-sans text-xl font-black text-emerald-950">
            {stats.coordinates}
          </span>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded p-2 text-center font-mono select-all">
          <span className="text-[9px] text-rose-700 block uppercase font-bold">
            ⚔️ Combat Hazards
          </span>
          <span className="font-sans text-xl font-black text-rose-950">
            {stats.combat}
          </span>
        </div>
        <div className="bg-amber-50/50 border border-amber-200 rounded p-2 text-center font-mono select-all">
          <span className="text-[9px] text-amber-700 block uppercase font-bold">
            Surface Layer
          </span>
          <span className="font-sans text-xl font-black text-neutral-900">
            {stats.surface}
          </span>
        </div>
        <div className="bg-purple-50/50 border border-purple-200 rounded p-2 text-center font-mono select-all">
          <span className="text-[9px] text-purple-700 block uppercase font-bold">
            Crypt Layer
          </span>
          <span className="font-sans text-xl font-black text-neutral-900">
            {stats.subterranean}
          </span>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded p-2 text-center font-mono select-all">
          <span className="text-[9px] text-indigo-700 block uppercase font-bold">
            Astral Layer
          </span>
          <span className="font-sans text-xl font-black text-indigo-950">
            {stats.planar}
          </span>
        </div>
      </div>

      {/* MASTER DOSSIER DIRECTORY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* COLUMN 1: COORDINATE LOCATIONS DIRECTORY */}
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="flex items-center gap-2 border-b border-black pb-2">
            <span className="text-emerald-700 text-lg">📍</span>
            <h3 className="font-serif font-black text-base uppercase tracking-tight text-neutral-950">
              Coordinate Locations Archive ({coordinateLocations.length})
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {coordinateLocations.map((item, idx) => {
              let hexColor =
                'bg-neutral-100/80 text-neutral-600 border-neutral-250';
              if (item.hexId === 'hex-00')
                hexColor = 'bg-amber-50/80 text-amber-800 border-amber-200/50';
              if (item.hexId === 'hex-01')
                hexColor = 'bg-teal-50/85 text-teal-800 border-teal-200/50';
              if (item.hexId.startsWith('hex-02'))
                hexColor =
                  'bg-purple-50/85 text-purple-800 border-purple-200/50';
              if (item.hexId.startsWith('hex-sub'))
                hexColor =
                  'bg-fuchsia-50/85 text-fuchsia-800 border-fuchsia-200/50';
              if (item.hexId.startsWith('hex-ast'))
                hexColor =
                  'bg-indigo-50/85 text-indigo-800 border-indigo-200/50';

              const itemType = COORDINATE_TYPE_MAPPING[item.id] || 'hexagon';
              const typeStyle = TYPE_STYLES[itemType] || {
                bg: 'bg-neutral-100 text-neutral-800',
                border: 'border-neutral-200',
                icon: '📍',
              };

              return (
                <div
                  key={item.id}
                  className="bg-white/70 border border-neutral-300 rounded p-4 font-mono text-xs flex flex-col gap-3 shadow-none hover:shadow-xs transition-shadow-all duration-200"
                >
                  <div className="flex justify-between items-start gap-2 border-b border-neutral-200 pb-2">
                    <div className="flex flex-col">
                      <span className="font-serif font-black text-sm uppercase text-neutral-950">
                        {idx + 1}. {item.name}
                      </span>
                      <span className="text-[9px] text-neutral-400 uppercase font-semibold mt-0.5">
                        ID: {item.id} // {item.classification}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className={`text-[9.5px] font-mono font-black px-2 py-0.5 rounded-md border uppercase flex items-center gap-1 shadow-sm select-all ${typeStyle.bg} ${typeStyle.border}`}
                      >
                        {typeStyle.icon} {itemType}
                      </span>
                      <span className="text-[8.5px] font-mono font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-250 select-all">
                        📍 {item.coordinates.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* GRID METRICS */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 text-[10px] pb-2 border-b border-dashed border-neutral-200">
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Hex Sector
                      </span>
                      <span className="font-bold text-neutral-800">
                        {item.hexId} ({item.hexName})
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Coordinates
                      </span>
                      <span className="font-bold text-neutral-900">
                        {item.coordinates}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Layer & Terrain
                      </span>
                      <span className="font-bold text-neutral-800">
                        {item.layerName} // {item.terrain}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Atmospheric Resonance
                      </span>
                      <span className="font-bold text-emerald-800">
                        {item.ethericResonanceVal}% Ley Intensity
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Faction Alignment
                      </span>
                      <span className="font-bold text-neutral-800 font-serif">
                        {item.factionDominance}{' '}
                        {item.factionStatus !== 'None' &&
                          `(${item.factionStatus})`}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Hazard Severity
                      </span>
                      <span className="font-bold text-amber-800">
                        {item.hazardThreatRating} ({item.hazardLevelVal}%)
                      </span>
                    </div>
                  </div>

                  {/* LORE STATEMENT */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-neutral-450" /> Recorded
                      Lore
                    </span>
                    <p className="font-serif text-[12px] leading-relaxed text-neutral-800 italic bg-stone-50/50 p-2.5 rounded border border-neutral-250">
                      &ldquo;{item.lore}&rdquo;
                    </p>
                  </div>

                  {/* SPOILS / SECRET CONCEALMENT */}
                  {item.lootSecrets && (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded p-2.5 text-[10.5px]">
                      <span className="text-[8.5px] font-black text-emerald-800 uppercase tracking-wider block mb-1">
                        🔑 Concealed Reserves, Loot, or Crypt-Secrets
                      </span>
                      <p className="text-emerald-950 font-sans leading-relaxed">
                        {item.lootSecrets}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: COMBAT SITES & HAZARDS */}
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="flex items-center gap-2 border-b border-black pb-2">
            <span className="text-rose-700 text-lg">⚔️</span>
            <h3 className="font-serif font-black text-base uppercase tracking-tight text-neutral-950">
              Hazard Sites ({combatSites.length})
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {combatSites.map((item, idx) => {
              // Threat styling
              const isCataclysmic = item.hazardLevelVal >= 90;
              const isExtreme =
                item.hazardLevelVal >= 75 && item.hazardLevelVal < 90;

              let threatBadgeColor =
                'bg-rose-100 text-rose-900 border-rose-300 font-bold shadow-xs';
              if (isCataclysmic)
                threatBadgeColor =
                  'bg-red-600 text-white border-red-800 font-black shadow-sm';
              else if (isExtreme)
                threatBadgeColor =
                  'bg-amber-600 text-white border-amber-800 font-extrabold shadow-sm';

              return (
                <div
                  key={item.id}
                  className="bg-white/70 border border-neutral-300 rounded p-4 font-mono text-xs flex flex-col gap-3 shadow-none hover:shadow-xs transition-shadow-all duration-200"
                >
                  <div className="flex justify-between items-start gap-2 border-b border-neutral-200 pb-2">
                    <div className="flex flex-col">
                      <span className="font-serif font-black text-sm uppercase text-neutral-950">
                        {idx + 1}. {item.name}
                      </span>
                      <span className="text-[9px] text-neutral-400 uppercase font-semibold mt-0.5">
                        ID: {item.id} // {item.classification}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${threatBadgeColor}`}
                    >
                      HAZARD
                    </span>
                  </div>

                  {/* GRID METRICS */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[10px] pb-2 border-b border-dashed border-neutral-200">
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Hex Sector / Threat
                      </span>
                      <span className="font-bold text-rose-900">
                        {item.hexId} // {item.hazardThreatRating}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Coordinates
                      </span>
                      <span className="font-bold text-neutral-900">
                        {item.coordinates}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Danger Level // Layer
                      </span>
                      <span className="font-bold text-neutral-800">
                        {item.hazardLevelVal}% Threat Intensity //{' '}
                        {item.layerName}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase text-[8px] font-bold">
                        Claimant Hostility // Dominance
                      </span>
                      <span className="font-bold text-neutral-800">
                        {item.factionStatus === 'Hostile'
                          ? '⚠️ Hostile'
                          : item.factionStatus}{' '}
                        //{' '}
                        <b className="font-serif text-neutral-905">
                          {item.factionDominance}
                        </b>
                      </span>
                    </div>
                  </div>

                  {/* LORE STATEMENT */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-neutral-450" /> Recorded
                      Threat Dossier
                    </span>
                    <p className="font-serif text-[12px] leading-relaxed text-neutral-800 italic bg-stone-50/50 p-2.5 rounded border border-neutral-250">
                      &ldquo;{item.lore}&rdquo;
                    </p>
                  </div>

                  {/* TACTICAL GUIDELINES */}
                  {item.tacticalGuideline && (
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded p-2.5 text-[10.5px]">
                      <span className="text-[8.5px] font-black text-rose-800 uppercase tracking-wider block mb-1 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-rose-700" /> GM Tactical
                        Encounter Guidelines
                      </span>
                      <p className="text-rose-950 font-sans leading-relaxed">
                        {item.tacticalGuideline}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER COGNIZANCE TELEMETRY BAR */}
      <div className="border-t border-black/10 pt-4 mt-2 font-mono text-[9px] text-neutral-500 flex flex-col sm:flex-row justify-between items-baseline gap-2 select-none">
        <span className="font-extrabold uppercase text-[8.5px] tracking-wide text-neutral-400">
          ELDEN RECORDS ARCHIVAL LEDGER INDEX COMPLETED
        </span>
        <div className="flex gap-4">
          <span>
            COORDINATES COMPILED: <b>14 RECORDS</b>
          </span>
          <span>
            COMBAT SENSORS ACTIVE: <b>12 RECORDS</b>
          </span>
          <span>
            HEALTH COGNIZANCE: <b>OK</b>
          </span>
        </div>
      </div>
    </section>
  );
}
