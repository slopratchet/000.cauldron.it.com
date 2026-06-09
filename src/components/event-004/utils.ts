/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Sweeps a block of text, replacing any blacklisted words with safe content
 * as configured in the safety_and_accessibility instructions.
 */
export function applyArachnophobiaFilter(
  text: string,
  isActive: boolean,
  filterConfig?: {
    target_entity: string;
    replacement_entity: string;
    text_scrub_array: string[];
  },
): string {
  if (!text || !isActive) return text;

  const config = filterConfig || {
    target_entity: 'monsters.giant_spider',
    replacement_entity: 'monsters.venomous_vine_blight',
    text_scrub_array: [
      'webs',
      'spiders',
      'skittering',
      'eight legs',
      'spinnerets',
    ],
  };

  let scrubbed = text;

  // Replace the monster text specifically
  const monsterRegex = /giant spider/gi;
  scrubbed = scrubbed.replace(monsterRegex, 'Venomous Vine Blight');

  const ghostRegex = /vorguns_ghost/gi;
  // We keep Ghost of Vorgun, but replace other text

  // Scrub the exact phrases in the array
  const replacements: { [key: string]: string } = {
    webs: 'creeping thorns',
    web: 'creeping thorn',
    spiders: 'shrub blights',
    spider: 'shrub blight',
    skittering: 'rustling vines',
    'eight legs': 'creeping root systems',
    spinnerets: 'thorny nodes',
  };

  config.text_scrub_array.forEach((scrubWord) => {
    const regex = new RegExp(`\\b${scrubWord}\\b`, 'gi');
    const replacement = replacements[scrubWord.toLowerCase()] || 'plant spores';
    scrubbed = scrubbed.replace(regex, replacement);
  });

  return scrubbed;
}

/**
 * Formats a generic node id or enum string to comfortable reading header
 */
export function sanitizeLabel(label: string): string {
  return label
    .replace(/_/g, ' ')
    .replace(/node-\d+/gi, (m) => m.toUpperCase())
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Generates an extremely descriptive, deterministic, uppercase ID for a mechanical skill challenge
 * that visually binds and highlights the challenges between the Scenes viewer and Impacts compiler.
 */
export function generateChallengeId(
  sceneId: string,
  type: 'soc' | 'exp',
  encounterId: string,
  skillName: string,
  state?: 'success' | 'failure',
): string {
  const cleanScene = (sceneId || 'SCENE').toUpperCase().replace('SCENE_', '');
  const cleanEnc = (encounterId || '')
    .toUpperCase()
    .replace('SOC_', '')
    .replace('EXP_', '');
  const cleanSkill = (skillName || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '_')
    .replace(/_DEC_.*|_DC_.*|DC.*/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  const cleanState = state ? `-${state.toUpperCase()}` : '';

  return `MSC-${cleanScene}-${cleanEnc}-${cleanSkill}${cleanState}`
    .replace(/__+/g, '_')
    .replace(/_$/g, '');
}

export function getImaginativeTitleFromId(
  challengeId: string,
  npcOrHazard?: string,
  skillName?: string,
): string {
  const id = challengeId.toUpperCase();

  if (id.includes('ELARA') && id.includes('INSIGHT'))
    return "The Weight of a Matriarch's Plea";
  if (id.includes('ARGUN') && id.includes('PERSUASION'))
    return "Deescalating the Harvester's Wrath";
  if (id.includes('ARGUN') && id.includes('INTIMIDATION'))
    return 'Subduing the Skeptical Landowner';
  if (id.includes('REYNA') && id.includes('HISTORY'))
    return 'Kriegspiel on the Border Maps';
  if (id.includes('BARKEEP') && id.includes('DECEPTION'))
    return "Whispers in the Goblet's Foam";
  if (id.includes('NEXUS') && id.includes('ARCANA'))
    return 'Quelling the Spark of the Leyline Core';
  if (id.includes('WANDERER') && id.includes('PERSUASION'))
    return 'Soothe the Weeping Apparition';
  if (id.includes('WANDERER') && id.includes('HISTORY'))
    return 'Chronicle of the Withered Treaty';
  if (id.includes('CORBIN') && id.includes('DECEPTION'))
    return "The Smuggler's Sentry Gambit";
  if (id.includes('CARGO') && id.includes('ATHLETICS'))
    return 'Dredging the Submerged Mahogany Trunk';
  if (id.includes('CARGO') && id.includes('THIEVES_TOOLS'))
    return 'Defusing the Pressure-Activated Water Trap';

  // Dynamic procedural fallback for any other items
  const name = (npcOrHazard || '')
    .replace(/\(.*?\)/g, '')
    .replace(/_/g, ' ')
    .trim();
  const skill = (skillName || '')
    .replace(/\(.*?\)/g, '')
    .replace(/_/g, ' ')
    .trim();

  return name && skill ? `${skill} Challenge: ${name}` : 'Mysterious Encounter';
}
