import type { Operation } from './types';

export const INITIAL_OPERATIONS: Operation[] = [
  {
    id: 'fustian_revolution',
    title: 'Operation: Fustian Revolution',
    location: 'THE PRIMAL RECEPTACLE (ALLIGATOR-FARM-PONDS)',
    time: 'MIDNIGHT HOUR',
    target: 'THE HERESY OF THE PASSIVE SINK',
    clearanceLevel: 'LEVEL OMEGA',
    metadataCode: 'LOG: REV-001 // REC: BRUTALIST',
    objectives: [
      {
        id: 'obj1',
        text: 'Denounce the Sanitized Zoo Fallacy.',
        checked: true,
      },
      {
        id: 'obj2',
        text: 'Ignite the glowing tumors of kinetic potential.',
        checked: false,
      },
      {
        id: 'obj3',
        text: 'Ensure Thermodynamic Blowback Payload is armed.',
        checked: false,
        isCritical: true,
      },
    ],
    characters: [
      {
        id: 'elias',
        name: 'SUBJECT_01: THORNE, ELIAS',
        role: 'Veteran Guide & Agitator',
        description:
          'Experienced guide with a pragmatic view of danger. Calm under pressure. Quiet, but has a surprising repertoire of old folklore and shanties.',
        notes: '>> Note: Exhibits unpredictable magic outbursts.',
        status: 'ACTIVE',
      },
      {
        id: 'curtis',
        name: 'SUBJECT_02: BURTUS, CURTIS',
        role: 'Acquisitions Expert & Saboteur',
        description:
          'A jittery and paranoid survivor obsessed with shiny objects. Cunning and can talk his way out of almost any situation.',
        notes: '>> Note: Tendency to bite things when panicked.',
        status: 'ACTIVE',
      },
    ],
    scriptLines: [
      {
        id: 'f_l1',
        type: 'heading',
        text: 'EXT. METRO-RUIN-12 POND 4 FLASH-BOIL - NIGHT',
      },
      {
        id: 'f_l2',
        type: 'action',
        text: 'A sprawling urban ruin, heavily decayed. Jagged obsidian-like armor growths pulse with violet indigo emissions. ELIAS THORNE stands before the glowing, radioactive sludge of the pond. CURTIS BURTUS scurries behind him, clutching a handful of stolen buttons.',
      },
      {
        id: 'f_l3',
        type: 'dialogue',
        characterName: 'ELIAS',
        text: 'The universe does not accept a static exhaust port, Curtis. The ponds require grueling maintenance. Spatial displacement has generated unfathomable unassigned entropy!',
        parenthetical: '(gesturing grandly with a bark-scarred arm)',
      },
      {
        id: 'f_l4',
        type: 'dialogue',
        characterName: 'CURTIS',
        text: "Entropy? I don't care about entropy! I just want the shiny bits! Is it true the colony was reduced to cinder in a microsecond?",
        parenthetical: '(biting his nails nervously)',
      },
      {
        id: 'f_l5',
        type: 'dialogue',
        characterName: 'ELIAS',
        text: 'Liquid probability, heavy with the specific, highly toxic frequency of unassigned entropy. This is the Ley-Lines of Rot! We must embrace the Thermodynamic Blowback!',
        parenthetical: '',
      },
      {
        id: 'f_l6',
        type: 'alert',
        text: 'WARNING: VECTOR ALPHA DETECTED. The stagnant water acts as a localized kinetic dampener, but friction is rising. System Load Data reads 92% Entropy.',
      },
    ],
  },
];
