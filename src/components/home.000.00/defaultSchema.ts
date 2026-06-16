export const DEFAULT_SCHEMA = {
  sectionsVisibility: {
    showExploreWorlds: true,
    showSciFiWorldCard: false,
    showPrimalMamaWorldCard: true,
    showHorrorWorldCard: false,
    showLetsPlayCharacterCreator: false,
    showNewsDispatches: false,
    showAtTheTable: true,
    showPlaySolo: false,
    showOnlinePlay: true,
    showOnlinePlaySection: true,
    showCommunityDemoChannels: false,
    showCommunityCards: false,
    showSciFiCorridorsDetail: false,
    showPrimalCoreSystemDetail: true,
    showHourOfTheAlligatorWorldCard: true,
    showHourOfTheAlligatorDetail: true,
    showGothicHorrorDetail: false,
    showStreamingSimulator: false,
    showUpcomingEvents: false,
    showFeaturedShop: false,
    showAboutCampCandor: true,
  },
  introBlock: {
    title: 'Words have\nPower',
    description:
      'Welcome to Camp Candor Massively Multiplayer Online Role-Play Gaming Inspirational Technology, creator of tabletop games and books set in wondrous, literary-rich worlds. Explore our collections and discover your next adventure across any platform.',
  },
  gameWorlds: [
    {
      id: 'scifi',
      title: 'SCI-FI',
      subtitle: 'Mutant & Replicant Corridors',
      category: 'sci-fi',
      description:
        'Explore futuristic conspiracies, high-tech rebellions, and rust-colored neon ruins.',
      expandedLore:
        'The Blade Runner roleplaying game sweeps you into the neon noir rain of Los Angeles 2037. As a Blade Runner of the LAPD Rep-Detect Unit, you walk the razor edge of morality, sorting flesh from circuitry. Step into massive sci-fi mech landscapes and mutant infested wasteland sandboxes where survival is negotiated by the click of heavy ammunition.',
      coverUrl:
        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 49.0,
      highlightColor: 'from-[#8B0000] to-[#E4DFD3]',
      accentColor: '#D32F2F',
      badge: 'BLADE RUNNER & MUTANT',
      features: [
        'Conspiracy investigation logs',
        'Neon mechanics',
        'Fully authorized manuals',
        'Simon Stålenhag artwork compatibility',
      ],
    },
    {
      id: 'hourofthealligator',
      title: 'HOUR OF THE ALLIGATOR',
      subtitle: 'Horror on the Hour of the Alligator Campaign Boxed Set',
      category: 'horror',
      description:
        'Scale the tracks of Europe in 1923. Track down the shattered fragments of the cursed Sedefkar Simulacrum on a luxury locomotive.',
      expandedLore:
        'The legendary Horror on the Hour of the Alligator campaign is adapted into a massive tabletop boxed set expansion. Traverse from London to Constantinople, managing investigator Sanity while matching wits against the skinless followers of the Red Fez.',
      coverUrl:
        'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&w=800&q=80',
      price: 59.0,
      highlightColor: 'from-[#1e130f] to-[#E4DFD3]',
      accentColor: '#8a1c14',
      badge: 'CAMPAIGN BOXED SET',
      features: [
        'Interactive 19-part railroad map',
        'Sedefkar Simulacrum handouts',
        'Sinister passenger manifests',
        'Custom sanity preservation mechanics',
      ],
    },
    {
      id: 'fantasy',
      title: 'PRIMAL MAMA',
      subtitle: 'Universal Core System & Multi-Genre Rules Platform',
      category: 'fantasy',
      description:
        'One streamlined ruleset, infinite distinct worlds. Power and customize high-octane campaigns across any genre.',
      expandedLore:
        'Primal Mama is a versatile core tabletop rules engine engineered for fast, tactical play with maximum narrative flair. Features modular traits, card-based combat pacing, scaling action dice, and Wild Card mechanics. Perfect for sandbox customization — whether you are running hard sci-fi heists, high fantasy exploration, or gritty horror stories. One core book is all you will ever need.',
      coverUrl:
        'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 35.0,
      highlightColor: 'from-[#053a24] to-[#E4DFD3]',
      accentColor: '#053a24',
      badge: 'CORE RULES & SETTINGS ENGINE',
      features: [
        'Universal modular rules engine',
        'Wild Card tactical die scales',
        'Friction-less narrative Bennies',
        'Multi-genre campaign templates',
      ],
    },
    {
      id: 'horror',
      title: 'HORROR',
      subtitle: 'Vaults of the Gothic Dead',
      category: 'horror',
      description:
        'Confront psychological aberrations, eldritch deities, and standard skeletal dread.',
      expandedLore:
        'Experience gothic horrors, eldritch entities and existential panic games. These products feature dark illustrations, bleak sanity parameters, and heavy consequence grids. From the decaying stone crypts of the Gilded Atrium to eldritch curses floating on edge-server frequencies.',
      coverUrl:
        'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 45.0,
      highlightColor: 'from-[#3c1d42] to-[#E4DFD3]',
      accentColor: '#3c1d42',
      badge: 'VAULTS & GOTHIC CRYPTS',
      features: [
        'Sanity deterioration curves',
        'Sacrificial rite mechanics',
        'Atmospheric session prompts',
        'Graveyard cartography boards',
      ],
    },
  ],
  letsPlayBlock: {
    title: "Let's Play",
    description:
      "Learn how to play tabletop roleplaying games – it's easy! Keep reading, join the table, or create your first tactical passport here.",
  },
  newsBlock: {
    sectionTitle: 'Latest News',
    subtitle: 'CHRONICLES & DISPATCHES',
    items: [
      {
        id: 'news-1',
        title: 'The Tome of Souls Hardcover & Deluxe Editions Now Shipping',
        date: 'June 10, 2026',
        category: 'Release',
        summary:
          'Our massive fantasy sandbox campaign book is officially shipping. Embark on dark adventures through the shifting valleys.',
        content:
          'We are thrilled to announce that the physical editions of The Tome of Souls have arrived at our fulfillment centers and are heading out to backers and retailers world-wide. Crafted with cloth-wrapped covers, foil stamps, and heavyweight satin paper, this 320-page compendium provides complete sandbox rules, custom monster tables, and cohesive adventure modules. Order your copy in our shop today to receive immediate PDF files.',
        imageUrl:
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'news-2',
        title:
          'Camp Candor Set to Showcase Physical Assemblies at Gen Con 2026',
        date: 'May 28, 2026',
        category: 'Event',
        summary:
          'Visit Booth #441 for live-run demonstration scenarios, original canvas art previews, and limited custom dice sets.',
        content:
          'This August, Camp Candor is heading to Gen Con in Indianapolis! We will be hosting 24 active tabletop convention sessions led by our verified Free Agents. Stop by Booth #441 to meet our design crew, play mini-scenarios, and pick up convention-exclusive printable Character Passports and leather-debossed dice vaults.',
        imageUrl:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'news-3',
        title: 'Workshop Release: High-Fidelity PDF Layout Templates Updated',
        date: 'April 15, 2026',
        category: 'Update',
        summary:
          'Empower your house rules using our updated publisher layout assets, character sheet PDFs, and print matrices.',
        content:
          'We have updated our Community Content guidelines and uploaded professional Adobe InDesign and Scribus formatting templates to our public folder. Backers can now design, format, and share custom scenarios using official Camp Candor fonts and stylistic borders. All layout templates comply with our Open Gaming Covenant.',
        imageUrl:
          'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  atTheTableBlock: {
    title: 'At the Table',
    heading: 'Gather a group of friends at your gaming table.',
    paragraphs: [
      'Roleplaying games are traditionally played with a group of friends at a table (which is why its often called TTRPG or tabletop roleplaying games). Since the dawn of the hobby in the early 1970s, this has been the default way of experiencing the magic of roleplaying games around the world.',
      'If you have some friends that are interested in RPGs and a nice location to play, great! You have everything you need to start playing. But there are other venues where you can find players and games, such as gaming conventions and game stores. As roleplaying is an intrinsically social hobby, its often a great way to make new friends. Here are some suggestions to get started.',
    ],
    subSections: [
      {
        title: 'EVENTS',
        description:
          'There are tabletop gaming events hosted all round the world on a regular basis. Check your local listing and see what is available in your area. Gen Con in the USA, Essen Spiel in Germany and UK Games Expo in the UK are three big ones that we recommend that you seek out if you have the opportunity.',
      },
      {
        title: 'GAME STORES',
        description:
          "Another way to find a gaming table is to seek out a local gaming store and see if they have any slots open. It's a great way to try out something new and make new friends to boot.",
      },
      {
        title: 'SOCIAL MEDIA',
        description:
          'If you want to set up a local group by yourself, or join one, a good place to start are the many social media channels and online forums dedicated to Free League games.',
      },
      {
        title: 'BECOME A FREE AGENT',
        description:
          'Why not try to organize a game yourself? Our program for organized play at conventions and game stores is called the League of Free Agents and offer support and compensation for Gamesmasters running Free League games in public venues. Read more here.',
      },
    ],
  },
  playSoloBlock: {
    title: 'Play Solo',
    heading: 'Explore the joys of roleplaying by yourself.',
    paragraphs: [
      'Roleplaying is traditionally played with a group of people. However, these days solo roleplaying is increasingly popular. Maybe you want to experience a game inbetween regular sessions with your friends. Or maybe you do not have the opportunity to participate in group games at all.',
      "Either way, solo roleplaying can be a rewarding and uniquely creative way to experience tabletop roleplaying games. We offer solo modules for several of our games that make it easier than ever to get started playing right away. It's also a great way to learn the rules by your own by actually playing them.",
    ],
    bulletHeading: 'Currently we offer solo modules for the following games:',
    bulletItems: [
      'Dragonbane (included in the Core Boxed Set)',
      'The Walking Dead Universe (included in the Core Rulebook)',
      'Twilight: 2000 (included in the Core Boxed Set)',
      'The One Ring™ (available as a digital PDF from DrivethruRPG)',
      'Vaesen – Nordic Horror Roleplaying (available as a digital PDF from DrivethruRPG)',
      'Forbidden Lands (available in The Book of Beasts)',
    ],
    note: 'Please note that you need to have access to the base game itself in those cases where the solo rules are offered separately.',
  },
  onlinePlayBlock: {
    title: 'Online Roleplaying',
    heading: 'Play with online friends without leaving your home.',
    description:
      "It can seem daunting to take your cozy, analogue tabletop roleplaying game that you have experienced around a table with friends face to face into an online, digital format. But these days it really is easier than ever before! Can't gather a group of physical friends together? Online virtual tabletop servers, digital sheets, and audio-connected video channels make group campaigns spectacular. Play with anyone, anywhere!",
  },
  communityBlock: {
    title: 'Our Community',
    cards: [
      {
        id: 'discord',
        title: 'DISCORD',
        description: 'Connect with players all around the world...',
      },
      {
        id: 'workshop',
        title: 'COMMUNITY CONTENT',
        description: 'Create, publish and sell your own content...',
      },
      {
        id: 'organized',
        title: 'ORGANIZED PLAY',
        description: 'Become a Free Agent and lead Camp Candor...',
      },
    ],
    posts: [
      {
        id: '1',
        title: 'Tactics for Primal Mama: Fast Multi-Genre Settings Transitions',
        author: '@Void_Walker',
        category: 'PRIMAL MAMA',
        replies: 34,
        likes: 89,
        snippet:
          'Adapting traits from fantasy to gothic steampunk can be fast and fluid if you use the universal wild card scales. Let me show you...',
      },
      {
        id: '2',
        title: 'Primal Mama Core - Homebrew rules for Bennies card deck',
        author: '@LoreMaster_Core',
        category: 'PRIMAL MAMA',
        replies: 12,
        likes: 45,
        snippet:
          'I created a quick PDF representing custom poker-size card designs to swap standard poker chips for cinematic rule-bending...',
      },
      {
        id: '3',
        title: 'Frontier Scum: High-Noon shootouts and system balance',
        author: '@Null_Pointer',
        category: 'FRONTIER SCUM',
        replies: 19,
        likes: 52,
        snippet:
          'How do you handle rapid reloading on rusted revolvers? Let’s share our rulings.',
      },
    ],
  },
  streamingBlock: {
    sectionTitle: 'Streaming',
    caption: 'LIVEPLAY AND GAME DEMOS',
    spectatorsCount: '4,592 WATCHING',
    channel1: {
      title: 'LOTR ROLEPLAYING',
      desc: 'Official LOTR 5e with guests',
    },
    channel2: { title: 'BLADE RUNNER', desc: 'Liveplay with Me, Myself & Die' },
  },
  upcomingEventsBlock: {
    title: 'Events',
    subtitle: 'UPCOMING EVENTS',
    items: [
      { date: 'February 20-23', name: 'GenghisCon', location: 'Denver, US' },
      { date: 'March 1-5', name: 'GAMA', location: 'Louisville, US' },
      {
        date: 'March 5-8',
        name: 'Emerald City Comic Con',
        location: 'Seattle, US',
      },
      { date: 'March 19-22', name: 'GaryCon', location: 'Lake Geneva, US' },
      { date: 'March 25-29', name: 'Adepticon', location: 'Milwaukee, US' },
      { date: 'March 26-29', name: 'Pax East', location: 'Boston, US' },
      { date: 'April 3-5', name: 'GothCon', location: 'Gothenburg, SE' },
      { date: 'April 11', name: 'Salute!', location: 'London, United Kingdom' },
      { date: 'May 21-24', name: 'MomoCon', location: 'Atlanta, US' },
      { date: 'May 27-29', name: 'ACD Expo', location: 'Madison, US' },
      {
        date: 'May 30-31',
        name: 'Comic Con Stockholm Summer',
        location: 'Stockholm, Sweden',
      },
      { date: 'May 29-31', name: 'UK Games Expo', location: 'Birmingham, UK' },
      { date: 'June 18-22', name: 'Origins', location: 'Columbus, US' },
      { date: 'July 31-Aug 3', name: 'Gencon', location: 'Indianapolis, US' },
      {
        date: 'August 2-9',
        name: 'Medeltidsveckan',
        location: 'Visby, Sweden',
      },
      { date: 'September 4-7', name: 'Pax West', location: 'Seattle, US' },
      {
        date: 'September 4-6',
        name: 'Tabletop Scotland',
        location: 'Ingliston, United Kingdom',
      },
      {
        date: 'September 25-28',
        name: 'Bokmässan',
        location: 'Göteborg, Sweden',
      },
      { date: 'October 16-19', name: 'Game Hole Con', location: 'Madison, US' },
      {
        date: 'October 17',
        name: 'Spelkongress',
        location: 'Stockholm, Sweden',
      },
      {
        date: 'October 23-26',
        name: 'Essen Spiel',
        location: 'Essen, Germany',
      },
      {
        date: 'October 30 - Nov 1',
        name: 'Comic Con Stockholm Winter',
        location: 'Stockholm, Sweden',
      },
      {
        date: 'November 28',
        name: 'Dragonmeet',
        location: 'London, United Kingdom',
      },
      {
        date: 'December 4-6',
        name: 'PaxUnplugged',
        location: 'Philadelphia, US',
      },
      {
        date: 'December 5-6',
        name: 'Nördarnas julmarknad',
        location: 'Stockholm, Sweden',
      },
    ],
  },
  shopBlock: {
    title: 'Shop',
    subtitle: 'STOREFRONT',
    products: [
      {
        id: 'prod-hourofthealligator',
        title: 'HORROR ON THE HOUR OF THE ALLIGATOR',
        subtitle: 'The 19-part campaign boxed volume set',
        price: 59.5,
        desc: 'Engage in premium historical cosmic investigation. Includes 6 full-length campaign booklets, a 1923 vintage map layout poster, complete suspect profile registry cards, and replica passport folders.',
        badge: 'CAMPAIGN BOX',
        img: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-symbaroum',
        title: 'PRIMAL MAMA CORE RULEBOOK',
        subtitle: 'The universal tabletop system',
        price: 29.0,
        desc: 'Includes everything you need to play: Wild Card dice matrices, rules for fast character setup, and modular multi-genre tools.',
        badge: 'BEST SELLER',
        img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-onering',
        title: 'PRIMAL MAMA: FANTASY FRONTIER',
        subtitle: 'Setting companion deck',
        price: 39.0,
        desc: 'Take your core rules back to magic-laden realms of sword & sorcery. Intricate ruins exploration and ancient spellcasting options.',
        badge: 'FANTASY EXPANSION',
        img: 'https://images.unsplash.com/photo-1610116306796-6ebd3051c330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-bladerunner',
        title: 'BLADE RUNNER RPG',
        subtitle: 'Official LAPD Case Files',
        price: 49.0,
        desc: 'Investigate replicant cases in LA 2037. Heavy themes, neon-lit investigation boards, and intense investigative systems.',
        badge: 'CORE EDITION',
        img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-astromancer',
        title: 'PRIMAL MAMA: STRATEGIST BUNDLE',
        subtitle: 'Anniversary Core Rules Stack',
        price: 35.0,
        desc: 'Anniversary Editions of core tables. Includes Core Rulebook, Fantasy companion, and digital printable rules tracking sheets.',
        badge: 'BUNDLE DEALS',
        img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-frontierscum',
        title: 'FRONTIER SCUM',
        subtitle: 'An Acid Western RPG by Karl Druid',
        price: 25.0,
        desc: 'A game about wanted outlaws making their mark on a lost frontier. Gritty, rules-light, high-lethal wilderness shootouts.',
        badge: 'INDIE AWARD',
        img: 'https://images.unsplash.com/photo-1618666012114-a09015783686?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'prod-stormbringer',
        title: 'LEGENDS OF STORMBRINGER',
        subtitle: 'Sword & Sorcery Elric Setting',
        price: 45.0,
        desc: 'Roleplaying in the magical, chaotic fantasy world of Elric of Melniboné. Features custom magic systems and demonic bargains.',
        badge: 'NEW RELEASE',
        img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  aboutBlock: {
    title: 'About Camp Candor',
    subtitle: 'CREATIVE MANDATE',
    paragraphs: [
      'Welcome to Camp Candor, creator of tabletop games and books set in wondrous, literary-rich worlds.',
      'You can meet us at conventions, festivals, and industry gatherings, to discover our games, meet the people behind them, and experience our worlds firsthand.',
      'From demos and previews to talks and tournaments, our presence at events is about sharing stories, connecting with players, and celebrating roleplaying wherever it thrives.',
      'Check back here to see where we’re heading next.',
    ],
  },
  repertoireSeats: [
    {
      id: 'paladin',
      role: 'PALADIN',
      status: 'DECEASED',
      price: 49.0,
      spec: 'CRUCIBLE: Sector Alpha // SHADOW BURNT',
      avatarColor: 'bg-stone-700',
      characterBio:
        'Sought the Golden Cup within the toxic pit. Incinerated by the adversarial dragon.',
    },
    {
      id: 'mage',
      role: 'MAGE',
      status: 'INSANE',
      price: 49.0,
      spec: 'CRUCIBLE: Rusted Spire // SPELL COLD',
      avatarColor: 'bg-[#3c1d42]',
      characterBio:
        'Decoded the 10Hz telemetry without eye-shields. Left mind floating on server grids.',
    },
    {
      id: 'rogue',
      role: 'ROGUE',
      status: 'AVAILABLE',
      price: 49.0,
      spec: 'CRUCIBLE: High Vault // COLD STEEL',
      avatarColor: 'bg-[#D32F2F]',
      characterBio:
        'Silent, specialized in extracting corrupted key cards from server guards.',
    },
    {
      id: 'cleric',
      role: 'CLERIC',
      status: 'CORRUPTED',
      price: 49.0,
      spec: 'CRUCIBLE: Pit of Bones // VOID FLESH',
      avatarColor: 'bg-green-900',
      characterBio:
        'Touched the alien obelisk. Sprouted skeletal appendages and merged with database.',
    },
    {
      id: 'barbarian',
      role: 'BARBARIAN',
      status: 'AVAILABLE',
      price: 49.0,
      spec: 'CRUCIBLE: Neon Mutiny // AXE SPEED',
      avatarColor: 'bg-amber-800',
      characterBio:
        'A high-hp heavy hitter mutated by toxic smog. Perfect for breaching secure bulkheads.',
    },
  ],
};
