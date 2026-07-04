import type { CampaignDatabaseSchema } from './_types';

export const defaultCampaignData: CampaignDatabaseSchema = {
  identity: {
    name: 'CHARITY VAUGHN',
    title: 'SOCIAL CHAMELEON',
    tagline: 'THE IRON FIST IN A VELVET GLOVE',
    quote:
      'In the game of courts and coin, the loudest voice is rarely the most powerful. It is the whisper that guides the blade, and the smile that masks the poison.',
    portraits: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC89Hu_52TdyLqB2irIngndK12akcKx4p_Yw5U6Hr4QBqA7xYNJEjIgfpw0j_ZRDqKFrDBLkV0x6tnXfZo9HGIPfuCYBB99cBT8ILOg50Txa2KsOoQNndUb6tTB7E9_vGA-Jlso3wcc7iDV23wxIsLrDVMMwNfyGE4J-TVt0mgyDwy1ikxr8f-Hub-64rWtzmVT7QKr0ZlO4ihLDSZNXIBTx8H451sXLG-YZPwbSxYvzDv-cCtz7p2N1915uJuvj_UXr4e-mcmTFz-4',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800',
    ],
    reserveButtonText: 'Reserve CHARITY',
    reservationOptions: [
      '[week 22 : attached]',
      '[week 23 : attached]',
      '[week 24 : open]',
    ],
    embraceButtonText: 'Embrace more of CHARITY',
  },
  lore: {
    sectionHeader: 'A MASTER OF PERSUASION',
    paragraphs: [
      'Charity Vaughn does not merely enter a room; she subsumes it. As a social chameleon and mastermind, her presence is a carefully curated performance. With large observant hazel eyes that see through the most intricate deceptions, she navigates the highest echelons of society with a grace that is as lethal as it is beautiful.',
      'Her bonds are not forged in blood, but in the intricate web of favors and secrets she maintains across the continent. To some, she is a savior; to others, a shadow. To all, she is the architect of her own destiny.',
    ],
    quoteBlock:
      'TRUST IS THE MOST EXPENSIVE CURRENCY IN THE REALM. I PREFER TO DEAL IN DEBT.',
  },
  highlights: [
    {
      title: 'SILVERY BARBS',
      description:
        "A momentary lapse in an opponent's focus, engineered by a single sharp word.",
    },
    {
      title: 'MIND BLANK',
      description:
        'The ultimate mental fortress, rendering her thoughts invisible to even the most powerful seers.',
    },
  ],
  technicalDossier: {
    level: 20,
    class: 'POLYMATH/MAESTRO',
    archetype: 'MASTERMIND',
    stats: [
      {
        abbr: 'STR',
        value: 10,
        detail: 'able to lift about 100 lbs over the head',
      },
      { abbr: 'DEX', value: 14, detail: 'able to dodge most incoming attacks' },
      { abbr: 'CON', value: 12, detail: 'average health and endurance limits' },
      {
        abbr: 'INT',
        value: 18,
        detail: 'genius level intellect and reasoning',
      },
      {
        abbr: 'WIS',
        value: 16,
        detail: 'highly perceptive with excellent intuition',
      },
      {
        abbr: 'CHA',
        value: 20,
        detail: 'masterful aura and persuasive presence',
      },
    ],
  },
  tacticalInsight: {
    title: 'TACTICAL INSIGHT',
    quote:
      "Vaughn's primary utility lies in her ability to manipulate the battlefield before the first initiative is rolled. Her psychological profile indicates a preference for non-violent resolution, though she remains highly capable of deploying 'surgical strikes' through proxy agents or high-level enchantments.",
    author: '- Expert Analysis #42',
  },
  reviews: {
    tagline: 'Rated 4.78 out of 5 hearts.',
    rating: '4.78',
    count: '9 reviews',
  },
};
