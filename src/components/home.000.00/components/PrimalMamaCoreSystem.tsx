import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ShoppingBag,
  Download,
  Users,
  Tv,
  Sparkles,
  Eye,
  CheckCircle,
  X,
  Shield,
  Dices,
} from 'lucide-react';

interface PrimalMamaCoreSystemProps {
  playClack: () => void;
  onAddToCart?: () => void;
  showCommunityDemoChannels?: boolean;
}

export function PrimalMamaCoreSystem({
  playClack,
  onAddToCart,
  showCommunityDemoChannels = true,
}: PrimalMamaCoreSystemProps) {
  // Quote / Review Rotator State
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    {
      text: 'Primal Mama is a masterpiece of modern gaming. It strips out the rules-bloat and keeps tabletop play exceptionally fast, visceral, and incredibly modular.',
      author: 'RPG Academy',
    },
    {
      text: 'One system, boundless settings. We went from a neon-cyberpunk heist to a gothic kraken-hunt in the exact same afternoon, without having to teach our table a single new rule.',
      author: 'Tabletop Chronicles',
    },
    {
      text: 'The Wild Card engine and Primal Dice escalations make every dice roll a tactical, high-stakes decision.',
      author: 'Critical Hit',
    },
  ];

  // Gallery Slide State
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryItems = [
    {
      url: '/img/000.png',
      caption:
        'Medieval Fantasy: Primeval dark forests and ancient stone vaults styled perfectly with Primal limits.',
    },
    {
      url: '/img/011.png',
      caption:
        'Cyberpunk Noir: High-frequency data conduits and rain-swept alleys using core tactical grids.',
    },
    {
      url: '/img/007.png',
      caption:
        'Gothic Horror: Crumbling stone tombs loaded with custom psychological trait degradation.',
    },
  ];

  // Video Mock Modals index
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'primal_showcase',
      title: 'Primal Mama RPG | How To Play Core Rules & Wild Cards',
      author: 'HowToRPG',
      thumbnail: '/img/008.png',
    },
    {
      id: 'primal_live_west',
      title: 'Primal Mama: Weird West | Actual Play Showcase - Quickdraw Ep. 1',
      author: 'Tablestory',
      thumbnail: '/img/000.png',
    },
    {
      id: 'primal_sci_fi',
      title: 'Primal Mama SciFi Campaign | Space Raiders Co-op Session',
      author: 'Oxventure',
      thumbnail: '/img/010.png',
    },
  ];

  // Stateful Cart Feedback
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    playClack();
    if (onAddToCart) {
      onAddToCart();
    }
    setCartNotification(productName);
    setTimeout(() => {
      setCartNotification(null);
    }, 4000);
  };

  const handleNextQuote = () => {
    playClack();
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const handlePrevQuote = () => {
    playClack();
    setQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const handleNextGallery = () => {
    playClack();
    setGalleryIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrevGallery = () => {
    playClack();
    setGalleryIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  return (
    <section
      id="primal-mama-core-system"
      className="scroll-mt-28 border-4 border-obsidian bg-[#FFFDF5] text-[#1B1B1B] shadow-[8px_8px_0px_rgba(0,0,0,0.85)]"
    >
      {/* SECTION 1: DUSTY SANDBOX HERO WALLPAPER */}
      <div className="relative min-h-[380px] sm:min-h-[460px] md:min-h-[500px] bg-[#113826] flex items-center justify-center p-6 text-center select-none overflow-hidden border-b-4 border-obsidian">
        {/* Abstract design vector overlay */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-multiply"
          style={{
            backgroundImage: `url('/img/004.png')`,
          }}
        />

        {/* Ambient atmospheric lighting widgets */}
        <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37] border-2 border-obsidian text-black font-mono text-[9px] tracking-widest uppercase font-black"
          >
            <Sparkles className="w-3 h-3" /> UNIVERSAL RULE SYSTEM
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-archive text-5xl sm:text-6xl md:text-7xl font-black text-white hover:text-amber-400 transition-colors tracking-widest leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
          >
            PRIMAL MAMA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-archive text-xs sm:text-sm tracking-[0.4em] text-amber-200 uppercase leading-none font-bold"
          >
            Fast! Bold! Boundless Rules Platform
          </motion.p>
        </div>

        {/* System HUD labels */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex justify-between font-mono text-[8px] text-emerald-400/75 select-none hidden sm:flex">
          <span>RULESET: RE-WIRED // MULTI-GENRE BUILD</span>
          <span>CORE.MATRIX // SECURE-SYSTEM-DESK</span>
          <span>CAMP CANDOR OFFICIAL CERTIFIED PLATFORM</span>
        </div>
      </div>

      {/* SECTION 2: BREADCRUMBS & OVERVIEW HERO COLUMNS */}
      <div className="bg-[#FFF9EA] border-b-4 border-obsidian px-4 md:px-8 py-2 select-none">
        <span className="font-mono text-[9px] text-obsidian font-extrabold uppercase tracking-widest block text-center sm:text-left">
          START / GAMES / UNIVERSAL / PRIMAL MAMA CORE RULE ENGINE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 py-10 bg-[#FFFDF5]">
        {/* Left column info list */}
        <div className="lg:col-span-4 space-y-6 text-left border-b lg:border-b-0 lg:border-r border-obsidian/15 pb-8 lg:pb-0 lg:pr-8">
          <div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-obsidian leading-none font-black tracking-tight">
              Primal Mama
              <br />
              Core Rulebook
              <br />
              Universal Edition
            </h2>
          </div>

          <div className="font-mono text-xs space-y-2 border-t border-dashed border-obsidian/25 pt-4">
            <div className="flex justify-between">
              <span className="text-stone-600 font-bold">COMPATIBILITY</span>
              <span className="text-obsidian font-extrabold text-right">
                UNLIMITED SETTINGS
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600 font-bold">GAME MECHANICS</span>
              <span className="text-emerald-700 font-extrabold text-right">
                FAST / DRIFT-DIAL WILD CARDS
              </span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => {
                playClack();
                const el = document.getElementById('primal-products');
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full bg-[#113826] hover:bg-black hover:text-white text-white font-archive text-[11px] tracking-wider font-extrabold uppercase py-3 px-5 transition-colors text-center block shadow-lg border-2 border-obsidian"
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>SHOP MAIN CORE STACK</span>
              </div>
            </button>

            <button
              onClick={() => {
                playClack();
                alert(
                  'Downloading official Primal Mama system quick-start sheets, Wild Card dials, and blank character sheets...',
                );
              }}
              className="w-full border-2 border-obsidian text-obsidian bg-white hover:bg-amber-50 font-archive text-[11px] tracking-wider font-extrabold uppercase py-3 px-5 transition-all text-center block shadow"
            >
              <div className="flex items-center justify-center gap-2">
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD SYSTEM SHEETS</span>
              </div>
            </button>

            <button
              onClick={() => {
                playClack();
                alert(
                  'Launching matchmaker for certified rules-agnostic Primal GMs...',
                );
              }}
              className="w-full border border-stone-300 text-stone-700 hover:text-black hover:border-obsidian font-archive text-[9px] tracking-widest font-bold uppercase py-2 px-4 transition-all text-center block"
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-3 h-3 text-stone-600" />
                <span>FIND PRIMAL tables ON STARTPLAYING</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right column core system explanation */}
        <div className="lg:col-span-8 text-left flex flex-col justify-center space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-obsidian leading-tight font-black">
            One Core Rules Engine. Infinite Worlds of Thrills and Epic
            Storytelling.
          </h3>
          <p className="font-serif-body text-stone-800 text-base md:text-[17px] leading-relaxed select-text font-normal">
            Primal Mama simplifies your library. Why buy countless roleplaying
            manuals when one system handles it all? Keep players focused on
            cinematic adventure, tactical combat cards, and scalable trait dice.
            Simply apply custom setting parameters to adapt the core rules into
            fantasy realms, hard science fiction, western desperado shootouts,
            or modern investigation plots.
          </p>
          <div className="border-l-4 border-amber-500 pl-4 font-mono text-xs tracking-wider text-stone-900 font-bold uppercase flex items-center gap-2">
            <Dices className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>Fast-paced. Easy-to-run. Impossible to get bogged down.</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: REVIEWS QUOTE ROTATOR & THE GAME DESCRIPTION */}
      <div className="bg-[#FFFDF5] border-t-2 border-b-2 border-obsidian/10 py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="font-mono text-[9px] tracking-[0.2em] text-stone-500 font-bold uppercase">
            CERTIFIED WILD GAME DESPATCHES
          </div>

          {/* Quote block */}
          <div className="min-h-[140px] flex items-center justify-center relative px-8">
            <button
              onClick={handlePrevQuote}
              className="absolute left-0 p-2 hover:bg-stone-100 text-[#1B1B1B] rounded transition-colors"
              title="Previous Quote"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="font-serif text-[#1B1B1B] text-base sm:text-lg md:text-xl italic leading-relaxed text-center font-bold">
                  "{quotes[quoteIndex].text}"
                </p>
                <div className="font-archive text-xs tracking-widest text-[#D4AF37] font-black uppercase">
                  — {quotes[quoteIndex].author}
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handleNextQuote}
              className="absolute right-0 p-2 hover:bg-stone-100 text-[#1B1B1B] rounded transition-colors"
              title="Next Quote"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED: "THE RULES CORE" & EXPLAINER BLOCKS */}
      <div className="px-6 md:px-12 py-12 bg-[#FFFDF5]">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-stone-500 font-bold uppercase block mb-1">
              CAMP-CORE // ENGINE_SPECS_V25
            </span>
            <h4 className="font-archive text-xl text-obsidian font-black tracking-wider uppercase">
              THE CORE SYSTEM
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-6 font-serif-body text-stone-800 text-sm md:text-base leading-relaxed space-y-4 select-text">
            <p>
              Primal Mama is a highly versatile tabletop rules engine engineered
              for fast, tactical play with maximum narrative control. Rather
              than memorizing pages of complex modifiers or nested tables,
              characters are represented by trait dice sizes (from d4 up to
              d12).
            </p>
            <p>
              When obstacles arise, players roll their designated Trait Die
              alongside a standard Wild Card die to gauge their level of
              success. Dynamic rules like <strong>Exploding Dice</strong>{' '}
              (rolling the maximum value on a die triggers instant re-rolls) and
              cinematic <strong>Bennies</strong> (tokens players can trade to
              bend fate and negate lethal damage) ensure game sessions are
              fast-paced, high stakes, and unforgettable.
            </p>
            <p>
              This core book acts as a foundation. By utilizing modular setting
              companions (such as fantasy, sci-fi companion packs, or horror
              settings catalogs), gamemasters can skin this master system
              instantly to explore any time period or genre they desire.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE SETTING WITH SPLIT-SCREEN CHARACTERS GRAPHIC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#FFF9EA] border-t-4 border-b-4 border-obsidian">
        {/* Left Column Graphic */}
        <div className="relative min-h-[350px] sm:min-h-[420px] lg:min-h-full overflow-hidden flex items-center justify-center select-none">
          <img
            referrerPolicy="no-referrer"
            src="/img/011.png"
            alt="RPG dynamic books stack"
            className="absolute inset-0 w-full h-full object-cover saturate-[1.1] brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-[#FFF9EA]/15" />

          <div className="relative z-10 text-center bg-black/85 p-6 border-2 border-obsidian backdrop-blur-sm m-4">
            <span className="font-mono text-[8px] text-amber-400 block tracking-[0.3em] font-extrabold uppercase">
              RELIABLE DESK ARCHIVES
            </span>
            <span className="font-mono text-[10px] text-white font-bold block mt-1 uppercase">
              PRISTINE MULTI-GENRE COMPATIBLE
            </span>
          </div>
        </div>

        {/* Right Column Content */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-6 text-left">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-emerald-800 font-bold uppercase block mb-1">
              CINEMATIC HORIZONS
            </span>
            <h4 className="font-archive text-xl text-obsidian font-black tracking-wider uppercase">
              THE PLAY EXPERIENCE
            </h4>
          </div>

          <div className="font-serif-body text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 select-text">
            <p>
              Because Primal Mama handles task resolution abstractly, GMs spend
              virtually zero time interpreting complex rules. Focus entirely on
              setting design, deep narrative pacing, and interactive stakes.
            </p>
            <p>
              Your player table will love the visual, tactile nature of Wild
              Card dice tracking and Bennies poker chips. Build customizable
              edges and hindrances that make every single character mechanically
              unique and instantly customized to their specific backgrounds.
            </p>
            <p className="font-serif italic text-emerald-950 pt-2 text-md">
              Learn it once. Play it everywhere. Play it forever.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: GALLERY CAROUSEL DISPLAY */}
      <div className="bg-[#FFFDF5] py-12 px-6 md:px-12 select-none">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center border-b border-obsidian/15 pb-2">
            <span className="font-mono text-[8px] text-stone-500 font-bold tracking-widest uppercase">
              ©2026 CAMP CANDOR INSPIRATIONAL TECHNOLOGY. ALL RIGHTS RESERVED.
            </span>
            <span className="font-mono text-[10px] text-obsidian font-bold uppercase">
              PRIMAL SETTINGS PREVIEW // {galleryIndex + 1} OF{' '}
              {galleryItems.length}
            </span>
          </div>

          {/* Interactive Slide Container */}
          <div className="relative aspect-[16/9] w-full bg-stone-950/10 border-4 border-obsidian overflow-hidden rounded shadow-2xl group">
            <img
              referrerPolicy="no-referrer"
              src={galleryItems[galleryIndex].url}
              alt={galleryItems[galleryIndex].caption}
              className="w-full h-full object-cover transition-transform duration-500 brightness-[0.75]"
            />

            {/* Absolute navigation controls */}
            <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6">
              <p className="font-serif-body text-white text-xs sm:text-sm font-semibold max-w-[80%] text-left drop-shadow mb-1">
                {galleryItems[galleryIndex].caption}
              </p>
            </div>

            <button
              onClick={handlePrevGallery}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-obsidian text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextGallery}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-obsidian text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* VIDEOS ROW SECTION */}
      {showCommunityDemoChannels !== false && (
        <div className="bg-[#FFF9EA] px-6 md:px-12 py-12 border-t-4 border-b-4 border-obsidian text-left">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Tv className="w-4 h-4 text-obsidian" />
                <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] font-extrabold uppercase">
                  COMMUNITY DEMO CHANNELS & LORE
                </span>
              </div>
              <h4 className="font-archive text-xl text-obsidian font-black tracking-wider uppercase font-bold">
                Explore Primal Settings in Action
              </h4>
            </div>

            {/* Grid of three video cover mockups */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => {
                    playClack();
                    setSelectedVideo(vid.id);
                  }}
                  className="group cursor-pointer space-y-3 bg-[#FFFDF5] p-3 border-2 border-obsidian hover:border-emerald-700 transition-all rounded shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-stone-950 border border-none">
                    <img
                      referrerPolicy="no-referrer"
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 pointer-events-none brightness-[0.75]"
                    />
                    {/* Play circle overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                      <div className="w-12 h-12 bg-obsidian/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border border-amber-500/55">
                        <Play className="w-5 h-5 text-amber-400 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 px-1">
                    <p className="font-mono text-[8px] text-stone-500 tracking-wider uppercase font-bold">
                      {vid.author}
                    </p>
                    <h5 className="font-archive text-[10px] text-obsidian tracking-wide uppercase line-clamp-2 leading-snug font-bold">
                      {vid.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CORE GAME EDITIONS PRODUCTS */}
      <div
        id="primal-products"
        className="bg-[#FFFDF5] px-6 md:px-12 py-12 text-left scroll-mt-28"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-baseline border-b-2 border-obsidian pb-2">
            <h4 className="font-serif-display text-2xl md:text-3xl text-obsidian font-black tracking-tight uppercase">
              Core Primal Mama Rules Stack
            </h4>

            <button
              onClick={() => {
                playClack();
                const shopEl = document.getElementById('shop');
                if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-mono text-xs text-stone-600 hover:underline font-bold uppercase tracking-wider"
            >
              Shop all &rarr;
            </button>
          </div>

          {/* THREE PRODUCTS BOXED COVERS SIDE BY SIDE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1: Horror on the Hour of the Alligator Campaign Boxed Set */}
            <div className="bg-[#FFF9EA] border-2 border-obsidian hover:border-emerald-700/60 p-4 transition-all duration-300 rounded shadow-md flex flex-col justify-between space-y-4 group">
              <div className="space-y-4">
                {/* Book cover area */}
                <div className="aspect-[4/3] w-full bg-white overflow-hidden rounded border border-obsidian/10 flex items-center justify-center p-4">
                  <img
                    referrerPolicy="no-referrer"
                    src="/img/006.png"
                    alt="Horror on the Hour of the Alligator Set"
                    className="h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:scale-104 transition-transform duration-300 pointer-events-none"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#D4AF37] tracking-widest font-bold uppercase block">
                    Campaign Boxed Adventure Set
                  </span>
                  <h5 className="font-archive text-md text-obsidian tracking-widest uppercase font-black">
                    HORROR ON THE HOUR OF THE ALLIGATOR
                  </h5>
                  <p className="font-mono text-xs text-stone-700 font-bold mt-1">
                    598.00 kr
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      'HORROR ON THE HOUR OF THE ALLIGATOR BOXED SET',
                    )
                  }
                  className="bg-[#113826] hover:bg-black hover:text-white text-white font-archive text-[10px] tracking-wider font-extrabold uppercase py-2.5 px-2 transition-colors flex items-center justify-center gap-1.5 rounded-sm border-2 border-obsidian"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => {
                    playClack();
                    alert(
                      'Horror on the Hour of the Alligator is a legendary 19-part campaign boxed set tracking down the cursed Sedefkar Simulacrum aboard the luxurious Hour of the Alligator across Europe.',
                    );
                  }}
                  className="border-2 border-obsidian bg-white text-obsidian hover:bg-amber-100 font-archive text-[10px] tracking-wider font-bold uppercase py-2.5 px-2 transition-all text-center rounded-sm"
                >
                  READ MORE
                </button>
              </div>
            </div>

            {/* Product 2: PRIMAL MAMA CORE RULEBOOK */}
            <div className="bg-[#FFF9EA] border-2 border-obsidian hover:border-emerald-700/60 p-4 transition-all duration-300 rounded shadow-md flex flex-col justify-between space-y-4 group">
              <div className="space-y-4">
                {/* Book cover area */}
                <div className="aspect-[4/3] w-full bg-white overflow-hidden rounded border border-obsidian/10 flex items-center justify-center p-4">
                  <img
                    referrerPolicy="no-referrer"
                    src="/img/007.png"
                    alt="Primal Mama Core Rulebook"
                    className="h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:scale-104 transition-transform duration-300 pointer-events-none"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#D4AF37] tracking-widest font-bold uppercase block">
                    Fast & Boundless Core
                  </span>
                  <h5 className="font-archive text-md text-obsidian tracking-widest uppercase font-black">
                    PRIMAL MAMA CORE RULEBOOK
                  </h5>
                  <p className="font-mono text-xs text-stone-700 font-bold mt-1">
                    348.00 kr
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() => handleAddToCart('PRIMAL MAMA CORE RULEBOOK')}
                  className="bg-[#113826] hover:bg-black hover:text-white text-white font-archive text-[10px] tracking-wider font-extrabold uppercase py-2.5 px-2 transition-colors flex items-center justify-center gap-1.5 rounded-sm border-2 border-obsidian"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => {
                    playClack();
                    alert(
                      'Detailed 240-page blueprint featuring: Exploding Trait dice equations, blank customizable tables companion, modular hindrance tables, and universal wildcard guides.',
                    );
                  }}
                  className="border-2 border-obsidian bg-white text-obsidian hover:bg-amber-100 font-archive text-[10px] tracking-wider font-bold uppercase py-2.5 px-2 transition-all text-center rounded-sm"
                >
                  READ MORE
                </button>
              </div>
            </div>

            {/* Product 3: PRIMAL MAMA SETTING COMPANIONS */}
            <div className="bg-[#FFF9EA] border-2 border-obsidian hover:border-emerald-700/60 p-4 transition-all duration-300 rounded shadow-md flex flex-col justify-between space-y-4 group">
              <div className="space-y-4">
                {/* Book cover area */}
                <div className="aspect-[4/3] w-full bg-white overflow-hidden rounded border border-obsidian/10 flex items-center justify-center p-4">
                  <img
                    referrerPolicy="no-referrer"
                    src="/img/005.png"
                    alt="Primal Mama Companions Pack"
                    className="h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:scale-104 transition-transform duration-300 pointer-events-none"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#D4AF37] tracking-widest font-bold uppercase block">
                    Multiverse Settings Portfolio
                  </span>
                  <h5 className="font-archive text-md text-obsidian tracking-widest uppercase font-black">
                    PRIMAL MAMA: COMPANION BOOK DECK
                  </h5>
                  <p className="font-mono text-xs text-stone-700 font-bold mt-1">
                    428.00 kr
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() =>
                    handleAddToCart('PRIMAL MAMA: COMPANION BOOK DECK')
                  }
                  className="bg-[#113826] hover:bg-black hover:text-white text-white font-archive text-[10px] tracking-wider font-extrabold uppercase py-2.5 px-2 transition-colors flex items-center justify-center gap-1.5 rounded-sm border-2 border-obsidian"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => {
                    playClack();
                    alert(
                      'Contains four beautifully detailed genres expansions catalog: Primal Fantasy Frontier, Retro Sci-Fi Corridors, Gothic Crypts Horror, and High-Noon Western Desperados.',
                    );
                  }}
                  className="border-2 border-obsidian bg-white text-obsidian hover:bg-amber-100 font-archive text-[10px] tracking-wider font-bold uppercase py-2.5 px-2 transition-all text-center rounded-sm"
                >
                  READ MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATEFUL FLOATING SMART CART TOAST SYSTEM */}
      <AnimatePresence>
        {cartNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 max-w-sm bg-obsidian text-bone border-4 border-amber-400 p-4 shadow-2xl rounded flex items-start gap-3 select-none"
          >
            <div className="bg-amber-950/40 text-[#D4AF37] p-2 rounded border border-amber-400/30">
              <Dices className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div className="space-y-1 text-left flex-1">
              <p className="font-archive text-[11px] tracking-wider text-amber-400 uppercase font-extrabold">
                SECURE PRIMAL SHIPMENT
              </p>
              <p className="font-serif-body text-[12px] text-emerald-200 normal-case leading-snug">
                Added{' '}
                <span className="font-bold text-white uppercase">
                  {cartNotification}
                </span>{' '}
                to your cargo collection.
              </p>
              <span className="font-mono text-[8px] text-stone-500 block uppercase font-bold pt-1">
                TRANSIT ID CODE: PRIMAL_CARNET_X59
              </span>
            </div>
            <button
              onClick={() => setCartNotification(null)}
              className="text-[#D4AF37] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED ACTUAL PLAY MOCK TRAILER OVERLAY MODALS */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 select-none"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="w-full max-w-2xl bg-[#FFFDF5] border-4 border-obsidian p-6 text-left space-y-4 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 text-stone-700 hover:text-black p-1"
                title="Close Player"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="font-mono text-[9px] text-stone-500 tracking-widest uppercase font-bold block">
                  NOW SECURED STREAMING // LORE RECORDINGS
                </span>
                <h4 className="font-archive text-md text-obsidian uppercase tracking-wider font-extrabold pr-8">
                  {videos.find((v) => v.id === selectedVideo)?.title}
                </h4>
              </div>

              {/* High-fidelity fake embedded video screen */}
              <div className="relative aspect-video w-full bg-black flex flex-col justify-center items-center border border-obsidian/30 group overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(0,120,50,0.06),_rgba(0,180,0,0.02),_rgba(50,120,0,0.04))] bg-[size:100%_4px,_6px_100%] pointer-events-none" />

                <Eye className="w-16 h-16 text-amber-500/20 animate-pulse mb-3" />
                <p className="font-mono text-xs text-amber-500/85 font-bold uppercase tracking-widest text-center">
                  * ENCRYPTED PRIMAL TRANSMISSION *
                </p>
                <p className="font-serif-body text-[11px] text-stone-300 mt-1 max-w-[80%] text-center">
                  Primal actual play session broadcast. Click below to view the
                  original content creator page on YouTube.
                </p>

                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    playClack();
                    setSelectedVideo(null);
                  }}
                  className="mt-4 bg-[#113826] hover:bg-black text-white border-2 border-obsidian font-archive text-[10px] tracking-widest font-black uppercase py-2 px-6 rounded shadow-lg transition-transform hover:scale-105"
                >
                  LAUNCH YOUTUBE BROADCAST
                </a>
              </div>

              <div className="flex justify-between items-center font-mono text-[9px] text-stone-500">
                <span>SECURED CORE ENGINE CHANNEL</span>
                <span>CHRONICLE_PR_V25</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
