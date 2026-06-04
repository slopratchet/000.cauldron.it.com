import type { Operation } from './types';

export const INITIAL_OPERATIONS: Operation[] = [
  {
    id: 'fustian_social_change_1',
    title: 'Operation: The Great Awakening',
    location: 'METRO-RUIN-12',
    time: 'MIDNIGHT',
    target: 'THE OBSIDIAN TOWER',
    clearanceLevel: 'LEVEL 5',
    metadataCode: 'LOG: AWAKE // REC: THUNDER',
    objectives: [
      {
        id: 'obj1',
        text: 'Infiltrate the bureaucratic stronghold.',
        checked: true,
      },
      {
        id: 'obj2',
        text: 'Distribute the pamphlets of undeniable truth.',
        checked: false,
      },
      {
        id: 'obj3',
        text: 'Ensure the Thermodynamic Blowback Payload is armed.',
        checked: false,
        isCritical: true,
      },
    ],
    characters: [
      {
        id: 'elias',
        name: 'SUBJECT_A: ELIAS THORNE',
        role: 'The Whispering Guide',
        description:
          'An old soul, marked by bark-like scarification. He carries the weight of forgotten lore.',
        notes: '>> Note: His magic outbursts are unpredictable but necessary.',
        status: 'ACTIVE',
      },
      {
        id: 'curtis',
        name: 'SUBJECT_B: CURTIS BURTUS',
        role: 'The Nimble Saboteur',
        description:
          'A jittery survivor, hoarding shiny objects. Quick, cunning, and paranoid.',
        notes: '>> Note: Prone to biting when panicked. Keep him calm.',
        status: 'ACTIVE',
      },
    ],
    scriptLines: [
      { id: 'l1', type: 'heading', text: 'EXT. METRO-RUIN-12 - NIGHT' },
      {
        id: 'l2',
        type: 'action',
        text: 'Rain lashes against the jagged obsidian-like armor of the towering stronghold. Violet indigo emissions pulse from the upper floors. The Thermodynamic Blowback Payload hums in the distance.',
      },
      {
        id: 'l3',
        type: 'dialogue',
        characterName: 'ELIAS THORNE',
        text: 'The Ley-Lines of Rot converge here. The entropy is staggering. We must strike now, before the stagnant water dampens our kinetic potential.',
        parenthetical: '(adjusting his heavy coat)',
      },
      {
        id: 'l4',
        type: 'dialogue',
        characterName: 'CURTIS BURTUS',
        text: 'Too many guards! Too many shiny badges! I tell you, Elias, this is madness! Madness wrapped in a copper wire!',
        parenthetical: '(gnawing on a stolen coin)',
      },
      {
        id: 'l5',
        type: 'dialogue',
        characterName: 'ELIAS THORNE',
        text: 'Peace, Curtis. The Illusion of the Magic Beast crumbles tonight. We will not be silenced by the Heresy of the Passive Sink!',
        parenthetical: '(his bark-like scars glowing faintly)',
      },
      {
        id: 'l6',
        type: 'alert',
        text: 'A siren wails. The violet lights shift to a blood red. The Thermodynamic Blowback Payload begins its sequence.',
      },
    ],
  },
];
