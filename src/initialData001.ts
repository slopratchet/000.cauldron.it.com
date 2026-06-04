import type { Operation } from './types';

export const INITIAL_OPERATIONS_001: Operation[] = [
  {
    id: 'pond_4_flash_boil',
    title: 'Operation: Thermodynamic Equity',
    location: 'POND 4 FLASH-BOIL // METRO-RUIN-12',
    time: '0400 HRS',
    target: 'UNASSIGNED ENTROPY',
    clearanceLevel: 'LEVEL 4',
    metadataCode: 'LOG: 884-A // REC: LO-FI',
    objectives: [
      {
        id: 'obj1',
        text: 'Establish the Heresy of the Passive Sink.',
        checked: true,
      },
      {
        id: 'obj2',
        text: 'Monitor thermodynamic markers (jagged obsidian growth, etc).',
        checked: false,
      },
      {
        id: 'obj3',
        text: 'Ensure system entropy is managed before critical mass.',
        checked: false,
        isCritical: true,
      },
    ],
    characters: [
      {
        id: 'elias',
        name: 'SUBJECT_01: THORNE, ELIAS',
        role: 'Senior Maintenance Scribe',
        description:
          'Pragmatic, calm under pressure. Thick white beard and bark-like scarification on his left arm. Believes in grueling maintenance over sanitized illusions.',
        notes:
          '>> Note: Monitor for spontaneous magic outbursts due to environmental stress.',
        status: 'ACTIVE',
      },
      {
        id: 'curtis',
        name: 'SUBJECT_02: BURTUS, CURTIS',
        role: 'Apprentice Filter-Scrubber',
        description:
          'Jittery and paranoid Goblin survivor. Hoards small shiny objects from the silt. Compulsive liar but highly observant.',
        notes:
          '>> Note: Susceptible to kinetic tumors if exposed to the flash-boil without his troll companion.',
        status: 'ACTIVE',
      },
    ],
    scriptLines: [
      {
        id: 's1_l1',
        type: 'heading',
        text: 'EXT. METRO-RUIN-12 (POND 4) - PRE-DAWN',
      },
      {
        id: 's1_l2',
        type: 'action',
        text: 'The air shimmers with unassigned entropy. ELIAS THORNE stands rigidly over a massive, steaming industrial sinkhole. CURTIS BURTUS scurries around the perimeter, biting a rusty button to test its metal.',
      },
      {
        id: 's1_l3',
        type: 'dialogue',
        characterName: 'ELIAS THORNE',
        text: 'The universe, Curtis, is not a sanitized zoo. It demands tribute in the form of sweat and blistered hands. You see this jagged obsidian growth? That is the physical manifestation of lethargy.',
        parenthetical: '(gesturing grandly with a heavily scarred arm)',
      },
      {
        id: 's1_l4',
        type: 'dialogue',
        characterName: 'CURTIS BURTUS',
        text: 'I told you already, Mr. Thorne! I scrubbed the conduits twice! The silt is just... saturated! Besides, Tiny said he’d be back with the heavy-lead scrubbers on Tuesday!',
        parenthetical: '(stashing the button in a patchwork pouch)',
      },
      {
        id: 's1_l5',
        type: 'dialogue',
        characterName: 'ELIAS THORNE',
        text: 'Tuesday is a fiction invented by the middle managers of Chronos Systems. There is only now, and the ever-present threat of Bimodal Sigil routing our colony into radioactive cinder.',
        parenthetical: '(sighing, pulling a weathered pipe from his vest)',
      },
      {
        id: 's1_l6',
        type: 'alert',
        text: 'The stagnant water violently erupts, casting a violet indigo emission across their faces. The friction indicator sparks wildly into the red.',
      },
      {
        id: 's1_l7',
        type: 'dialogue',
        characterName: 'CURTIS BURTUS',
        text: 'Ah! I didn’t do it! I wasn’t even here! I was hatched on a Tuesday!',
        parenthetical:
          '(scrambling backward, attempting to hide behind his own shadow)',
      },
      {
        id: 's1_l8',
        type: 'dialogue',
        characterName: 'ELIAS THORNE',
        text: 'Fascinating. The blowback payload has achieved sentience. Hand me the kinetic dampener, boy. We have work to do.',
        parenthetical: '(calmly tapping out his pipe on a glowing rock)',
      },
    ],
  },
];
