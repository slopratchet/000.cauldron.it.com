import { TomeEntry } from './configTypes';

export const initialEntries: TomeEntry[] = [
  // --- CHARACTER CLASSES / WORLDS ---
  {
    id: 'class-1',
    type: 'class',
    name: 'Mythrokahn',
    description:
      'The Mythrokahn emerge from the frigid sepulchers of the Forgotten Reach — spectral echoes of fallen paladins, their vows twisted by necrotic resonance.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 112',
    flavorText:
      '"The heavy stride of their iron plate is a tolling bell, announcing the arrival of silence."',
    expandedLore:
      'Forged in the sub-zero temperatures of the Obsidian Sepulcher, a Mythrokahn yields their mortality in exchange for a blade composed of pure anti-matter. Though slow of stride and heavy of iron, their presence alone causes vegetation to wither and living tissue to contract. Their ultimate technique, the Void Horizon, pulls nearby starlight into their core, leaving foes blinded in absolute dark before the blow descends.',
    isWorld: true,
    statusBadge: 'source world',
    iconType: 'skull',
    primaryButtonLabel: 'Edit world',
    secondaryButtonLabel: 'Start new campaign',
    actions: [
      {
        name: 'Decapitating Cleave',
        formula: '2d10+4',
        description:
          'A sweeping heavy strike with the void-blade. On roll over 18, decapitates minor targets.',
      },
      {
        name: 'Stygian Aura',
        formula: '1d6',
        description:
          'Necrotic frost emanates from the plate, dealing damage to all adjacent creatures.',
      },
      {
        name: 'Unholy Fortitude',
        formula: '1d20+3',
        description:
          'Channel raw darkness to withstand mortal damage. Succeeds on roll of 12+.',
      },
    ],
  },
  {
    id: 'class-2',
    type: 'class',
    name: 'Flesh Weaver',
    description:
      "They follow a rigid code known as the 'Liturgy of the Still Heart.' It is a series of seventy-seven mandates that govern their every movement, from the weight of their stride to the angle of their blade.",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 124',
    flavorText: '"Flesh is but raw yarn, and we are the tailors of the grave."',
    expandedLore:
      'Operating in the margins of anatomical science, Flesh Weavers view living matter as highly mutable clay. They carry surgical tools, silver threads, and alchemical binders to mend, merge, or distort physical forms in real-time. By weaving dead muscles directly into their own sinews, they can temporarily double their strength, though each stitching invites whispers of the stitched souls to infect their mind.',
    statusBadge: 'running',
    sessionAge: 'Session running for 1 day 4 hrs',
    iconType: 'flask',
    primaryButtonLabel: 'Resume session',
    secondaryButtonLabel: 'View log',
    actions: [
      {
        name: 'Suture Flesh',
        formula: '1d8+3',
        description:
          'Binds bleeding wounds of an ally, mending bones. However, the target suffers temporary fatigue.',
      },
      {
        name: 'Needle Flurry',
        formula: '3d4',
        description:
          'Launches a hail of acupuncture silver needles designed to block life-force nodes.',
      },
      {
        name: 'Unravel Sinew',
        formula: '2d6+2',
        description:
          'Touches a wound, causing muscle strands to sever and unravel. Deals deep organic damage.',
      },
    ],
  },
  {
    id: 'class-3',
    type: 'class',
    name: 'Void Acolyte',
    description:
      'Their weapon is an extension of their soul. Each kill feeds the blade, and each drop of blood spilled serves to lubricate the grinding gears of their eternal existence.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 140',
    flavorText:
      '"Listen closely to the hollow spaces between breathing. That is where our Lord resides."',
    expandedLore:
      'Acolytes of the Outer Abyss undergo ritual deafness to tune out worldly distractions and listen only to the cosmic humming. They manipulate spatial gravity, opening micro-fractures in three-dimensional space.',
    statusBadge: 'running',
    sessionAge: 'Session running for 5 days 18 hrs',
    iconType: 'bone',
    primaryButtonLabel: 'Resume session',
    secondaryButtonLabel: 'View log',
    actions: [
      {
        name: 'Eldritch Whisper',
        formula: '1d10+4',
        description:
          "Sends high-frequency mental static directly to the target's temporal lobe, causing psychic panic.",
      },
      {
        name: 'Singularity Pull',
        formula: '1d12',
        description:
          'Creates a temporary high-mass node that drags nearby creatures inward, crushing armor.',
      },
      {
        name: 'Abyssal Shield',
        formula: '1d20+2',
        description:
          'Opens a portal in front of self to absorb oncoming projectile attacks on a roll of 10+.',
      },
    ],
  },
  {
    id: 'class-4',
    type: 'class',
    name: 'Iron Maiden',
    description:
      'Note to players: High-difficulty class. Their inability to heal through standard clerical prayers makes them reliant on soul-leeching mechanisms found in darker reaches.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 158',
    flavorText:
      '"Within this cage of thorns, I am both the executioner and the monument of our sins."',
    expandedLore:
      'The Iron Maiden is a class composed of warrior-ascetics who have welded themselves inside heavy spiked coffins. Refusing standard clerical healing which they view as corrupting, they feed off the lifespans of those they vanquish.',
    statusBadge: 'running',
    sessionAge: 'Session running for 2 days 7 hrs',
    iconType: 'skull',
    primaryButtonLabel: 'Resume session',
    secondaryButtonLabel: 'View log',
    actions: [
      {
        name: "Chastity's Embrace",
        formula: '2d12+2',
        description:
          'Pins the target against their spiked frame, crushing and draining vital fluids.',
      },
      {
        name: 'Spike Retribution',
        formula: '1d10',
        description:
          'Launches fragments of broken iron spikes from their armor casing outward in all directions.',
      },
      {
        name: "Martyr's Bloodlust",
        formula: '1d20+5',
        description:
          'Converts current health points into a devastating critical strike. Successful hit on 14+.',
      },
    ],
  },

  // --- GRIMOIRE OF SPELLS / CAMPAIGNS CLONED ---
  {
    id: 'spell-2',
    type: 'spell',
    name: 'Mythrokahn - Campaign #2',
    description:
      'Deals 2d10 crushing damage, paralyzing living tissue for one turn.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 245',
    level: 'LVL: V',
    flavorText:
      '"The snapping of the tibia is a song of mechanical precision. Listen to the chords of agony."',
    expandedLore:
      'Bone Shatter vibrates the carbonate minerals within skeleton structures at their natural resonant frequency. This results in the bone structure exploding outward while leaving skin and muscle intact.',
    parentWorldId: 'class-1',
    statusBadge: 'running',
    sessionAge: 'Session running for 3 days 11 hrs',
    iconType: 'bone',
    primaryButtonLabel: 'View campaign log',
    secondaryButtonLabel: '+ Add adventure',
    adventures: [
      {
        id: 'adv-1',
        name: 'THE FORGOTTEN REACH',
        statusBadge: 'active',
        clearedEncounters: 3,
        totalEncounters: 5,
        encounters: [
          { id: 'enc-1', name: 'Bone shatter', status: 'cleared' },
          { id: 'enc-2', name: 'Sepulcher ambush', status: 'in progress' },
          { id: 'enc-3', name: 'Bone-Chamber Trial', status: 'cleared' },
          { id: 'enc-4', name: 'Dark Tunnel Sentry', status: 'cleared' },
          { id: 'enc-5', name: 'Void Horizon Threshold', status: 'pending' },
        ],
      },
      {
        id: 'adv-2',
        name: 'THE STYGIAN CRYPTS',
        statusBadge: 'pending',
        clearedEncounters: 0,
        totalEncounters: 3,
        encounters: [
          { id: 'enc-2-1', name: 'Sub-Zero Gatekeeper', status: 'pending' },
          { id: 'enc-2-2', name: 'Frost-bound Sarcophagus', status: 'pending' },
          { id: 'enc-2-3', name: 'Obsidian Core Vault', status: 'pending' },
        ],
      },
    ],
    actions: [
      {
        name: 'Shatter Fracture',
        formula: '2d10',
        description:
          'Deals massive internal crushing damage. Target is paralyzed for 1 turn.',
      },
      {
        name: 'Splinter Laceration',
        formula: '1d10',
        description:
          'Sharp bone fragments rupture outward. Deals damage to adjacent allies of the victim.',
      },
    ],
  },
  {
    id: 'spell-1',
    type: 'spell',
    name: 'Mythrokahn - Campaign #1',
    description:
      'A spell of total dissolution, cast in a matter of heartbeats.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 210',
    level: 'LVL: III',
    flavorText:
      '"A single droplet of the black bile turns an oak forest into a gray graveyard by midnight."',
    expandedLore:
      'Necrosis is a spell forbidden under the Treaty of Aeon. It releases a cloud of sub-atomic spores that target the molecular bonds of organic cells. Victims do not bleed; instead, their limbs dissolve into fine, dry ash.',
    parentWorldId: 'class-1',
    statusBadge: 'running',
    sessionAge: 'Session running for 3 days 11 hrs',
    iconType: 'flask',
    primaryButtonLabel: 'View campaign log',
    secondaryButtonLabel: '+ Add adventure',
    adventures: [
      {
        id: 'adv-c1',
        name: 'Catacombs of the Still Heart',
        statusBadge: 'active',
        clearedEncounters: 1,
        totalEncounters: 3,
        encounters: [
          { id: 'enc-c1-1', name: 'Spores Altar', status: 'cleared' },
          { id: 'enc-c1-2', name: 'Ash Threshold', status: 'in progress' },
          { id: 'enc-c1-3', name: 'Dissolution Sanctum', status: 'pending' },
        ],
      },
      {
        id: 'adv-c2',
        name: 'Abyssal Necropolis',
        statusBadge: 'locked',
        clearedEncounters: 0,
        totalEncounters: 2,
        encounters: [
          { id: 'enc-c2-1', name: 'Silent Ossuary Gate', status: 'pending' },
          {
            id: 'enc-c2-2',
            name: 'Throne of the Ash Monarch',
            status: 'pending',
          },
        ],
      },
    ],
    actions: [
      {
        name: 'Rotting Spores',
        formula: '3d6',
        description:
          'Deals instant necrotic damage. Target continues taking 1d6 damage for three turns.',
      },
      {
        name: 'Drain Essence',
        formula: '1d12',
        description:
          'Siphons the liquid vitality of the victim, transferring half of the rolled value as health.',
      },
    ],
  },
  {
    id: 'spell-3',
    type: 'spell',
    name: 'Mythrokahn - Campaign #1',
    description: 'Initial campaign deployment for Mythrokahn setting.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 211',
    level: 'LVL: I',
    flavorText: '"The vanguard advances through the frozen rift."',
    expandedLore:
      'The first expeditionary force into the Mythrokahn rift established the bone vanguard.',
    parentWorldId: 'class-1',
    statusBadge: 'running',
    sessionAge: 'Session running for 1 day 0 hrs',
    iconType: 'flask',
    primaryButtonLabel: 'View campaign log',
    secondaryButtonLabel: '+ Add adventure',
    adventures: [
      {
        id: 'adv-3-1',
        name: 'Vanguard Frontier',
        statusBadge: 'active',
        clearedEncounters: 2,
        totalEncounters: 2,
        encounters: [
          { id: 'enc-3-1-1', name: 'Frozen Outpost', status: 'cleared' },
          { id: 'enc-3-1-2', name: 'Rift Boundary', status: 'cleared' },
        ],
      },
    ],
    actions: [
      {
        name: 'Vanguard Strike',
        formula: '1d10+2',
        description: 'Frontline physical impact.',
      },
    ],
  },

  // --- BESTIARY OF THE VOID / ADVENTURES OF THE VOID ---
  {
    id: 'beast-1',
    type: 'beast',
    name: 'Grave Stalker',
    description:
      'Creatures that emerge from the frigid sepulchers. In the company of mortals, they remain silent, their presence marked only by the smell of ancient parchment and ozone.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 402',
    cr: 'CR: 12',
    statusBadge: 'active',
    flavorText:
      '"Do not turn your lantern toward the shadows. That is what they use to map your coordinates."',
    expandedLore:
      'Grave Stalkers are long, multi-jointed predators composed of calcified bone plates and dark, fibrous void energy. They move soundlessly along ceilings, mimicking the geometry of architectural beams. They are drawn to light sources, seeking to extinguish them first before isolating and dragging prey into the dark tunnels of the deep catacombs.',
    clearedEncounters: 1,
    totalEncounters: 3,
    encounters: [
      { id: 'enc-b1-1', name: 'Sepulcher Ambush', status: 'in progress' },
      { id: 'enc-b1-2', name: 'Dark Tunnel Sentry', status: 'pending' },
      { id: 'enc-b1-3', name: 'Bone-Chamber Trial', status: 'cleared' },
    ],
    actions: [
      {
        name: 'Ambusher Claws',
        formula: '1d8+5',
        description:
          'Strikes from absolute concealment. If target is in dark, deals double damage.',
      },
      {
        name: 'Stifle Lantern',
        formula: '1d20+2',
        description:
          'Lashes out to crush light sources. Light is immediately snuffed on a roll of 8+.',
      },
    ],
  },
  {
    id: 'beast-2',
    type: 'beast',
    name: 'Soul Reaper',
    description:
      'Each kill feeds their existence. They seek not glory, but the eventual peace that comes only with the total dissolution of the world and its spiritual anchors.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 512',
    cr: 'CR: 20',
    statusBadge: 'active',
    flavorText:
      '"There are no rewards in their kingdom. Only the quiet end of all frequencies."',
    expandedLore:
      'Appearing as floating cowls containing nothing but an ever-turning mechanical clockwork of silver gears, Soul Reapers are sentient filters sent to gather stray spiritual energy. They do not have anger or bloodlust; they execute their reaping with a cold, terrifying mathematical efficiency. Their touch crystallizes soul-matter, making resurrection impossible.',
    clearedEncounters: 2,
    totalEncounters: 3,
    encounters: [
      { id: 'enc-b2-1', name: 'Clockwork Veil Altar', status: 'cleared' },
      { id: 'enc-b2-2', name: 'Soul-Harvest Sanctum', status: 'cleared' },
      { id: 'enc-b2-3', name: 'Stasis Threshold', status: 'in progress' },
    ],
    actions: [
      {
        name: 'Reaping Scythe',
        formula: '2d12+6',
        description:
          'A sweeping strike of absolute cold. Bypasses standard armor and magic wards.',
      },
      {
        name: 'Temporal Stasis',
        formula: '1d20',
        description:
          'Saves target in place, locking their turn. Succeeds on roll of 15+.',
      },
    ],
  },

  // --- RELICS (Extra section for high-level fidelity to Navigation) ---
  {
    id: 'relic-1',
    type: 'relic',
    name: 'Aeonglass Chronometer',
    description:
      'An intricate timepiece forged during the eclipse of the Second Era. Its sand is ground from the bones of stellar travelers and flows in reverse.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 614',
    rarity: 'RARITY: FORBIDDEN',
    flavorText: '"To hold the sand is to bleed minutes from the future."',
    expandedLore:
      'The Aeonglass was crafted to allow scholars to glimpse past historical events. However, users quickly discovered that reversing the hourglass of the Chronometer causes physical environments to roll back to their state five minutes prior, though the user ages five years for every activation.',
    actions: [
      {
        name: 'Rewind Chronicle',
        formula: '1d20+4',
        description:
          'Undoes the last action in local timeline on a roll of 12+. User takes minor decay damage.',
      },
      {
        name: 'Strobe Distortion',
        formula: '1d6',
        description:
          'Emits a pulse of fragmented time. Stuns random adjacent creature for rolled rounds.',
      },
    ],
  },
  {
    id: 'relic-2',
    type: 'relic',
    name: 'Ring of Unbroken Thread',
    description:
      'A band of silver that has no welds or seam. It vibrates subtly when the wearer is about to make a decision of catastrophic significance.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 722',
    rarity: 'RARITY: ARCHEO',
    flavorText:
      '"The threads are delicate, yet they bind empires and turn stars to dust."',
    expandedLore:
      'Discovered in the tomb of the Weaver-Queen, this ring connects its wearer to the central nodes of destiny. It is highly valued by adventurers and politicians alike, as it acts as a compass pointing toward paths of highest survival, though it occasionally demands a sacrifice of memory to calibrate.',
    actions: [
      {
        name: 'Destiny Pulse',
        formula: '1d20+8',
        description:
          'Adds rolled value directly to any upcoming critical saving throw.',
      },
      {
        name: 'Siphon Destiny',
        formula: '1d10',
        description:
          'Drains luck from a nearby creature, subtracting rolled amount from their next turn.',
      },
    ],
  },
  {
    id: 'relic-3',
    type: 'relic',
    name: 'Abyssal Censer',
    description:
      'An iron vessel that burns a black resin gathered from the deep trenches of the Forgotten Gulf. Its smoke snuffs out light and lightens the weight of bones.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 735',
    rarity: 'RARITY: UNCOMMON',
    flavorText:
      '"With each swing, the boundary between sleep and stone grows thinner."',
    expandedLore:
      "The censer's fumes induce a state of sensory detachment. Soldiers in the Void Campaign used it to ignore critical trauma, though prolonged exposure resulted in permanent calcification of lung tissue.",
    actions: [
      {
        name: 'Incense Veil',
        formula: '1d6',
        description:
          'Obscures a 15ft radius. Hostile units suffer physical blindness for rolled rounds.',
      },
      {
        name: 'Soporific Breath',
        formula: '1d8',
        description:
          'Calms adjacent beasts, lowering their aggression. Succeeds on rolled value higher than 4.',
      },
    ],
  },
  {
    id: 'relic-4',
    type: 'relic',
    name: 'Crown of Bone-Sovereign',
    description:
      'Forged from the calcified crests of nine ancient kings who refused to yield their kingdoms to the Void. It demands royal blood to ignite its true authority.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 748',
    rarity: 'RARITY: LEGENDARY',
    flavorText: '"Uneasy is the head that wears the bone of kings."',
    expandedLore:
      'The Crown acts as an amplification array for necromantic signals. Whoever wears it can command minor skeletal legions, but the crown steadily drains their marrow, leaving them brittle and hollow over centuries.',
    actions: [
      {
        name: 'Sovereign Command',
        formula: '2d10',
        description:
          'Forces undead targets to halt or turn on their creators unless they resist.',
      },
      {
        name: 'Marrow Leech',
        formula: '1d12',
        description:
          "Drains physical integrity of nearby targets to restore wearer's defense.",
      },
    ],
  },
  {
    id: 'relic-5',
    type: 'relic',
    name: 'The Whispering Mirror',
    description:
      "An oval mirror of polished obsidian obsidian that displays no reflections. Instead, it shows a slow, silent montage of the user's alternate demises.",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 760',
    rarity: 'RARITY: ELDRITCH',
    flavorText:
      '"To peer within is to realize how many times you have already died."',
    expandedLore:
      "Scribes of the Second Age peered into the obsidian surface to learn of tactical failures in prospective wars. The mirror does not lie, but the sheer burden of witnessing one's own throat cut in a thousand different ways drives most to madness.",
    actions: [
      {
        name: 'Glimpse Demise',
        formula: '1d20+6',
        description:
          "Gain precognition of an enemy's next tactical maneuver. Predicts perfectly on 12+.",
      },
      {
        name: 'Reflect Horrors',
        formula: '1d12',
        description:
          'Forces an attacking creature to face their own worst fears, reducing their accuracy.',
      },
    ],
  },
  {
    id: 'relic-6',
    type: 'relic',
    name: 'Void-Scythe of the Harvester',
    description:
      'A colossal farming tool converted for cosmic reaping. Its blade is made from the razor-sharp scales of a leviathan that swam between dimensions.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 774',
    rarity: 'RARITY: FORBIDDEN',
    flavorText:
      '"The wheat screams no louder than the kings when the harvest begins."',
    expandedLore:
      "The Scythe does not cut flesh; it cuts the ethereal bounds connecting the physical body to its spiritual coordinates. To be struck by it is to have one's presence smeared across several dimensions at once.",
    actions: [
      {
        name: 'Dimension Cleave',
        formula: '2d12+4',
        description:
          'Sweeps through physical armor, ignoring physical shields. Massive damage.',
      },
      {
        name: 'Sow Void Spores',
        formula: '1d8',
        description:
          'Leaves micro-fractures in the air where the blade swung, damaging intruders.',
      },
    ],
  },
  {
    id: 'relic-7',
    type: 'relic',
    name: 'Book of Forbidden Hours',
    description:
      'A leather-bound diary with pages made from the dried skins of chronomancers. Reading its text causes the local flow of time to stutter and stall.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 789',
    rarity: 'RARITY: FORBIDDEN',
    flavorText:
      '"Five minutes spent reading this index equates to fifty years in the outer suns."',
    expandedLore:
      'Written by an anonymous monk who survived three consecutive world collapses. Its chapters contain instructions on how to temporarily unbind a single room from the galactic passage of time, allowing for long rests in split seconds.',
    actions: [
      {
        name: 'Siphon Seconds',
        formula: '1d20+2',
        description:
          "Steals a turn from a nearby target's immediate future initiative pool on 14+.",
      },
      {
        name: 'Stall Century',
        formula: '1d10',
        description:
          'Frees the user from gravity and movement restrictions for the rolled duration.',
      },
    ],
  },
  {
    id: 'relic-8',
    type: 'relic',
    name: 'Tears of the Star-Less God',
    description:
      'A collection of five solidified droplets of silver fluid, kept in a lead-lined vial. They are cold to the touch and emit a faint, sad melody.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 801',
    rarity: 'RARITY: MYSTICAL',
    flavorText: '"A god who has no stars to rule has only tears to offer."',
    expandedLore:
      "Found in the ruins of the Astral Spire, these droplets are the only physical remnants of a deity that was forgotten before the first words were carved. Drinking a tear restores deep magical reserves, but permanently replaces one's happy memories with deep cosmic sorrow.",
    actions: [
      {
        name: 'Astral Melancholy',
        formula: '2d6',
        description:
          'Creates an aura of heavy sorrow. Surrounding targets lose their will to strike.',
      },
      {
        name: 'Shattered Spark',
        formula: '1d12+3',
        description:
          'Releases a high-intensity burst of cold stellar light, blinding all witnesses.',
      },
    ],
  },
  {
    id: 'relic-9',
    type: 'relic',
    name: 'The Obsidian Monolith',
    description:
      'A pocket-sized replica of the massive spires that dot the Desolation of Ghyre. It hums with a resonance that interferes with magnetic and electrical fields.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 812',
    rarity: 'RARITY: ARCHEO',
    flavorText:
      '"The great spires do not watch us. They simply stand, reminding us that we are temporary."',
    expandedLore:
      'Used by ancient surveyors to anchor physical coordinates against spatial distortion. Carrying the replica prevents the user from being teleported or displaced by external dimensional spells.',
    actions: [
      {
        name: 'Anchor Geometry',
        formula: '1d20+10',
        description:
          'Prevents any displacement or teleportation in a 50ft radius for 3 rounds.',
      },
      {
        name: 'Resonating Pulse',
        formula: '1d8',
        description:
          'Deals crushing mechanical damage to construct enemies and metal armors.',
      },
    ],
  },
  {
    id: 'relic-10',
    type: 'relic',
    name: 'Grave-Dust Phylactery',
    description:
      'A hollow copper cylinder filled with the fine gray ashes of twenty-two saints. It can be attached to the hilt of any ritual weapon.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 824',
    rarity: 'RARITY: RARE',
    flavorText:
      '"Even in death, their devotion remains, a wall against the shadow."',
    expandedLore:
      'The ashes inside the phylactery react violently to necrotic influences. When a void creature approaches, the cylinder grows searing hot, alerting the wielder and coating their blade in a protective silver frost.',
    actions: [
      {
        name: 'Saintly Ward',
        formula: '1d10+4',
        description:
          'Provides high-potency elemental resistance against undead and necrotic targets.',
      },
      {
        name: 'Ashen Discharge',
        formula: '2d4',
        description:
          'Releases a cloud of hot sacred ash that burns and blinds heretical foes.',
      },
    ],
  },
  {
    id: 'relic-11',
    type: 'relic',
    name: 'Skeletal Key of Aeon',
    description:
      'A key carved from the femur of a chronomantic entity. Its teeth shift and rearrange themselves constantly, mimicking the lock it is inserted into.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 836',
    rarity: 'RARITY: MYSTICAL',
    flavorText:
      '"There are no doors that can withstand the key of hours. Only doors that have not yet been built."',
    expandedLore:
      'The key operates by finding a timeline where the targeted lock was already opened, and pulling that open state into the current present. This bypasses any mechanical or magical barrier, though it occasionally unlocks things better left behind.',
    actions: [
      {
        name: 'Unbind Portal',
        formula: '1d20+12',
        description:
          'Unlocks any standard or magical portal instantly on a roll of 10+.',
      },
      {
        name: 'Temporal Phase',
        formula: '1d6',
        description:
          'Phases the user through a thin wall or barrier for a single turn.',
      },
    ],
  },
  {
    id: 'relic-12',
    type: 'relic',
    name: 'Rune-Carved Astrolabe',
    description:
      'A brass instrument used to navigate the stellar currents of the Far Reaches. Its dials are inscribed with runes that do not correspond to any known language.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 849',
    rarity: 'RARITY: ARCHEO',
    flavorText:
      '"The stars are not silent; they are merely speaking in a frequency we have forgotten how to read."',
    expandedLore:
      'Crafted by the Star-Scribes before their disappearance. When aligned with the current galactic alignment, it can predict natural disasters, spatial fractures, or the arrival of stellar leviathans with perfect accuracy.',
    actions: [
      {
        name: 'Star Map Calibration',
        formula: '1d20+5',
        description:
          'Reveals secret passages, traps, and hidden pathways in local environments.',
      },
      {
        name: 'Stellar Guidance',
        formula: '1d10',
        description:
          "Guides an ally's hand, granting a bonus to their next ranged projectile roll.",
      },
    ],
  },
  {
    id: 'relic-13',
    type: 'relic',
    name: 'Lantern of Living Shadow',
    description:
      'A heavy brass lantern that contains no wick or oil. Instead, a trapped fragment of a Void Specter floats inside, casting a dim, purple light.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 862',
    rarity: 'RARITY: ELDRITCH',
    flavorText:
      '"The light does not banish the dark; it merely gives the shadows a physical form."',
    expandedLore:
      'The light emitted by this lantern causes shadows to behave independently of their light sources. These shadows can be commanded to grasp, distract, or trip targets, though they are highly unpredictable in bright sunlight.',
    actions: [
      {
        name: 'Shadow Grasp',
        formula: '1d12+2',
        description:
          'Directs nearby shadows to hold a target, reducing their speed to zero on a 6+.',
      },
      {
        name: 'Obsidian Flare',
        formula: '2d6',
        description:
          'Releases a wave of dark light that drains energy from all organic life forms.',
      },
    ],
  },
  {
    id: 'relic-14',
    type: 'relic',
    name: 'Shattered Pact-Blade',
    description:
      'The remnants of a sacred sword shattered during the battle of the Broken Gate. Its shards are held together by a pulsing crimson magnetic force.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 875',
    rarity: 'RARITY: RARE',
    flavorText:
      '"A broken promise is a blade that cuts deeper than any intact steel."',
    expandedLore:
      "Though broken, the blade retains its holy resonance. When swung, the shards separate and strike in a wide arc before snapping back together. The weapon grows stronger as the wielder's alliances are broken.",
    actions: [
      {
        name: 'Shard Storm',
        formula: '3d4+2',
        description:
          'Launches fragments outward in a cone. Deals slashing damage to all targets.',
      },
      {
        name: 'Pact Vindication',
        formula: '1d12',
        description:
          'Deals additional radiant damage if wielder has suffered a betrayal recently.',
      },
    ],
  },
  {
    id: 'relic-15',
    type: 'relic',
    name: 'Chalice of Crimson Tide',
    description:
      'A gold chalice decorated with nine rubies that drip liquid warmth. Any liquid poured inside is instantly converted into warm, metallic blood.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 888',
    rarity: 'RARITY: LEGENDARY',
    flavorText:
      '"Drink deep of the old blood, and remember the empires that fell to build this cup."',
    expandedLore:
      'The Chalice is sought after by Flesh Weavers and Vampiric Lords alike. Drinking from it heals severe physical trauma and restores vital energy, but binds the user to the will of the ancient deity that forged it.',
    actions: [
      {
        name: 'Vampiric Draught',
        formula: '1d10+5',
        description:
          'Restores health and cures any organic poisons or decay. High potency.',
      },
      {
        name: 'Crimson Surge',
        formula: '1d20',
        description:
          'Douses an area in cursed blood, making all targets inside vulnerable to decay.',
      },
    ],
  },
  {
    id: 'relic-16',
    type: 'relic',
    name: 'Plague-Mask of the Raven-Lord',
    description:
      "A leather plague doctor's mask with a silver beak. The glass lenses are stained green, allowing the wearer to see active bacteria and toxins.",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 901',
    rarity: 'RARITY: MYSTICAL',
    flavorText:
      '"The plague is not a punishment; it is a process of refinement."',
    expandedLore:
      'Worn by the chief physicians during the Great Weeping. The mask filters out any environmental toxins, gases, or airborne plagues, and allows the wearer to diagnose organic illnesses at a single glance.',
    actions: [
      {
        name: 'Toxin Diagnosis',
        formula: '1d20+4',
        description:
          'Instantly identifies any poisons, curses, or magical ailments affecting a target.',
      },
      {
        name: 'Miasma Filter',
        formula: '1d8',
        description:
          'Grants absolute immunity to poison gases and cloud-based spells for rolled rounds.',
      },
    ],
  },
  {
    id: 'relic-17',
    type: 'relic',
    name: 'Flesh-Stitched Standard',
    description:
      'A massive banner stitched together from the banners of a hundred defeated guilds. It hums with a faint, discordant chorus of a thousand battle cries.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKNzjFJmyyAubw75N8PkgeIzleC5ayxs64PjCxfaFXeW-Ak1CSH0oGsFNw5XBKMX1Bl7E7rUJhcQ5vo_p1Sup5KxoqHknA8ZZELdjoVwpHlUbfLdmTFr59OA5LB_6WlmPHfDZvJyYpCY5NnrX_rnsw3qnsO9xIENlFMrupVYLrM6oiOyitkA9HOkyJyftv6cN9M72-4ufzGV6Y-wcP68YPt-WptTx9SfRQjaKC5npPCiwJNR-W50qNPfggVm6gNrE31ygOG-diAPoK',
    pageRef: 'PAGE 914',
    rarity: 'RARITY: RARE',
    flavorText:
      '"Our banners may be torn, our names forgotten, but our rage remains bound to this silk."',
    expandedLore:
      'Carried into battle by the champions of the Shattered Reach. Planting the standard into the ground increases the strength and resolve of all allies within sight, though it draws the immediate attention of enemy leaders.',
    actions: [
      {
        name: 'Rallying Anthem',
        formula: '2d6+2',
        description:
          'Grants a physical strength and defense bonus to all nearby allies for 3 rounds.',
      },
      {
        name: 'Defiant Stand',
        formula: '1d20',
        description:
          'Grants absolute stagger and fear resistance to the wielder on a roll of 8+.',
      },
    ],
  },
];
