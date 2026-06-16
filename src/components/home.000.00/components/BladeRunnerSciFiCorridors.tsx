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
  CheckCircle,
  X,
} from 'lucide-react';

interface BladeRunnerSciFiCorridorsProps {
  playClack: () => void;
  onAddToCart?: () => void;
}

export function BladeRunnerSciFiCorridors({
  playClack,
  onAddToCart,
}: BladeRunnerSciFiCorridorsProps) {
  // Quote / Review Rotator State
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    {
      text: 'Blade Runner: The Roleplaying Game blends sci-fi noir with corporate intrigue and is sure to bring out the existential detective in everyone.',
      author: 'Screen Rant',
    },
    {
      text: 'A masterpiece of hardboiled cyberpunk atmosphere, capturing the elegant sorrow, heavy rain, and neon decay of Los Angeles 2037 perfectly.',
      author: 'Game Informer',
    },
    {
      text: 'The customized Year Zero engine beautifully weights trauma, stress, and artificial memories. Essential for any tabletop roleplayer.',
      author: 'Gizmodo',
    },
  ];

  // Gallery Slide State
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryItems = [
    {
      url: '/img/006.png',
      caption:
        'The dark, rain-soaked concrete canyons of LAPD LAPD LAPD Sector 4.',
    },
    {
      url: '/img/005.png',
      caption:
        'Neon advertisements flickering above overcrowded noodle stands.',
    },
    {
      url: '/img/006.png',
      caption:
        'Chasing spinner silhouettes in the smog-laden futuristic atmosphere.',
    },
    {
      url: '/img/011.png',
      caption:
        'A silent detective contemplating artificial memories in his damp corridor.',
    },
  ];

  // Video Mock Modals index
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'tablestory',
      title: 'Blade Runner 2023 | Electric Dreams | Ep. 1',
      author: 'Tablestory',
      thumbnail: '/img/000.png',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'memy',
      title: 'Blade Runner: Electric Dreams Part 1',
      author: 'Me, Myself and Die!',
      thumbnail: '/img/006.png',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'oxv',
      title: "Blade Runner: The Roleplaying Game | Let's Play",
      author: 'Oxventure',
      thumbnail: '/img/007.png',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
      id="blade-runner-sci-fi-corridors"
      className="scroll-mt-32 w-full bg-[#121212] border-4 border-obsidian text-bone p-0 overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] my-12"
    >
      {/* SECTION 1: HERO NEON NOIR BANNER */}
      <div className="relative min-h-[400px] md:min-h-[500px] flex flex-col justify-center items-center p-8 overflow-hidden select-none">
        {/* Rainy Cyber City Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.4] saturate-[1.25] transition-transform duration-1000 transform scale-102"
          style={{
            backgroundImage: `url('/img/003.png')`,
          }}
        />
        {/* Animated Rain & Overlay Shimmer Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 via-transparent to-[#121212] z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent z-1 animate-pulse" />

        {/* Heading HUD Panel Block */}
        <div className="relative z-10 text-center space-y-4 max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border border-cyan-500/40 bg-cyan-950/40 backdrop-blur-md text-cyan-400 font-mono text-[9px] tracking-[0.25em] px-4 py-1.5 rounded-sm uppercase font-bold"
          >
            OFFICIAL SCI-FI EXPANSION
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-archive text-5xl sm:text-6xl md:text-7xl font-black text-white hover:text-cyan-300 transition-colors tracking-widest leading-none drop-shadow-[0_8px_16px_rgba(6,182,212,0.5)]"
          >
            BLADE RUNNER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-archive text-sm sm:text-md tracking-[0.4em] text-neutral-300 uppercase leading-none font-bold"
          >
            THE ROLEPLAYING GAME
          </motion.p>
        </div>

        {/* HUD coordinates footer across image */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex justify-between font-mono text-[8px] text-neutral-500 select-none hidden sm:flex">
          <span>LAT: 34.0522° N // LON: 118.2437° W</span>
          <span>SYS.VER // CAL-3000-MUTANT</span>
          <span>WALLACE CORP SECURE SYSTEM CORRIDOR</span>
        </div>
      </div>

      {/* SECTION 2: BREADCRUMBS & OVERVIEW HERO COLUMNS */}
      <div className="bg-[#181818] border-t border-b border-bone/10 px-4 md:px-8 py-2 select-none">
        <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-widest block text-center sm:text-left">
          START / GAMES / SCI-FI / BLADE RUNNER THE ROLEPLAYING GAME
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 py-10">
        {/* Left column info list */}
        <div className="lg:col-span-4 space-y-6 text-left border-b lg:border-b-0 lg:border-r border-bone/10 pb-8 lg:pb-0 lg:pr-8">
          <div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-bone leading-none font-black tracking-tight">
              Blade Runner
              <br />
              The Roleplaying
              <br />
              Game
            </h2>
          </div>

          <div className="font-mono text-xs space-y-2 border-t border-dashed border-bone/15 pt-4">
            <div className="flex justify-between">
              <span className="text-neutral-400 font-bold">PLAYERS</span>
              <span className="text-[#D4AF37] font-bold">2–5 PLAYERS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400 font-bold">AGES</span>
              <span className="text-[#D4AF37] font-bold">16+ SECURE</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => {
                playClack();
                const el = document.getElementById('core-game-editions');
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full bg-[#c39c6d] hover:bg-[#b0885c] text-obsidian font-archive text-[11px] tracking-wider font-extrabold uppercase py-3 px-5 transition-colors text-center block shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>SHOP PRODUCTS</span>
              </div>
            </button>

            <a
              href="https://freeleaguepublishing.com/wp-content/uploads/2022/11/BR_CharacterSheet_v2_Fillable.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={playClack}
              className="w-full border border-[#c39c6d] text-[#c39c6d] hover:bg-[#c39c6d]/10 font-archive text-[11px] tracking-wider font-extrabold uppercase py-3 px-5 transition-all text-center block shadow"
            >
              <div className="flex items-center justify-center gap-2">
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOADS (PDF CHAR SHEETS)</span>
              </div>
            </a>

            <button
              onClick={() => {
                playClack();
                alert(
                  'StartPlaying gateway routing active... Search initiated for open Blade Runner 2037 modules.',
                );
              }}
              className="w-full border border-neutral-600 text-neutral-400 hover:text-white hover:border-[#c39c6d] font-archive text-[9px] tracking-widest font-bold uppercase py-2 px-4 transition-all text-center block"
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-3 h-3 text-[#D4AF37]" />
                <span>FIND PLAYERS ON STARTPLAYING</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right column lore summary description */}
        <div className="lg:col-span-8 text-left flex flex-col justify-center space-y-6">
          <h3 className="font-serif text-2xl md:text-4xl text-neutral-100 leading-tight font-black">
            A neon-noir wonderland that’ll take your breath away. One way or
            another.
          </h3>
          <p className="font-serif-body text-stone-300 text-base md:text-[17px] leading-relaxed select-text font-normal">
            An evocative world of conflicts and contrasts that dares to ask the
            hard questions and investigate the powers of empathy, the poisons of
            fear, and the burdens of being human during inhumane times. An
            iconic and unforgiving playground of endless possibilities that
            picks you up, slaps you in the face, and tells you to wake up.
          </p>
          <div className="border-l-4 border-[#D32F2F] pl-4 font-mono text-xs tracking-wider text-[#D32F2F] font-bold uppercase">
            Time to live. Or time to die.
          </div>
        </div>
      </div>

      {/* SECTION 3: REVIEWS QUOTE ROTATOR & THE GAME DESCRIPTION */}
      <div className="bg-[#151515] border-t border-b border-bone/10 py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="font-mono text-[9px] tracking-[0.2em] text-[#D4AF37] font-bold uppercase">
            REPRESENTATIVE EVALUATIONS
          </div>

          {/* Quote block */}
          <div className="min-h-[140px] flex items-center justify-center relative px-8">
            <button
              onClick={handlePrevQuote}
              className="absolute left-0 p-2 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded transition-colors"
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
                <p className="font-serif text-stone-200 text-base sm:text-lg md:text-xl italic leading-relaxed text-center font-medium">
                  "{quotes[quoteIndex].text}"
                </p>
                <div className="font-archive text-xs tracking-widest text-[#E4DFD3] font-bold uppercase">
                  — {quotes[quoteIndex].author}
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handleNextQuote}
              className="absolute right-0 p-2 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded transition-colors"
              title="Next Quote"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED: "THE GAME" & INTRICATE EXPLAINER BLOCKS */}
      <div className="px-6 md:px-12 py-12 bg-[#121212]">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold uppercase block mb-1">
              HUD FILE_04 // SPECIFICATIONS
            </span>
            <h4 className="font-archive text-xl text-white font-black tracking-wider uppercase">
              THE GAME
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 font-serif-body text-stone-300 text-sm md:text-base leading-relaxed space-y-4 select-text">
            <p>
              The official{' '}
              <strong className="text-[#c39c6d]">BLADE RUNNER RPG</strong>{' '}
              propels you into the streets of Los Angeles as Blade Runners with
              unique specialties, personalities — and memories.
            </p>
            <p>
              The game pushes the boundaries of investigative gameplay in
              tabletop RPGs, giving you a range of tools to solve an array of
              cases far beyond retiring Replicants. Beyond the core casework,
              the RPG showcases the key themes of Blade Runner — sci-fi action,
              corporate intrigue, existential character drama, and moral
              conflict. It challenges you to question your friends, empathize
              with your enemies, and explore the poisons and perseverance of
              hope and humanity during inhumane times.
            </p>
            <p>
              The rules of the game are based on the acclaimed{' '}
              <strong className="text-cyan-400">Year Zero Engine</strong>, used
              in award-winning games such as the{' '}
              <span className="italic">ALIEN RPG</span>,{' '}
              <span className="italic">Tales From the Loop</span> and{' '}
              <span className="italic">Forbidden Lands</span>, but further
              developed and uniquely tailored for BLADE RUNNER.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE SETTING WITH SPLIT-SCREEN CHARACTERS GRAPHIC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#171717] border-t border-b border-bone/10">
        {/* Left Column Graphic: Dual characters aiming guns under high glare rain bokeh */}
        <div className="relative min-h-[350px] sm:min-h-[420px] lg:min-h-full overflow-hidden flex items-center justify-center select-none">
          <img
            referrerPolicy="no-referrer"
            src="/img/006.png"
            alt="Two tactical investigators with high contrast background bokeh lights"
            className="absolute inset-0 w-full h-full object-cover saturate-[1.3] brightness-[0.7]"
          />
          {/* Neon reddish circular light overlays to reproduce the bokeh light spots accurately */}
          <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-80" />
          <div className="absolute top-10 right-16 w-32 h-32 rounded-full bg-orange-600/30 blur-2xl animate-pulse" />
          <div className="absolute bottom-12 left-12 w-28 h-28 rounded-full bg-red-700/40 blur-2xl" />

          <div className="relative z-10 text-center bg-black/40 p-4 border border-bone/15 backdrop-blur-sm">
            <span className="font-mono text-[8px] text-[#D4AF37] block tracking-[0.3em] font-extrabold uppercase">
              REPLICANT DETECT UNIT
            </span>
            <span className="font-mono text-[10px] text-white font-bold block mt-1 uppercase">
              STATUS: CHASSIS LINK ESTABLISHED
            </span>
          </div>
        </div>

        {/* Right Column Content: The Setting details */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-6 text-left">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] font-bold uppercase block mb-1">
              CHRONICLE OVERVIEW
            </span>
            <h4 className="font-archive text-xl text-white font-black tracking-wider uppercase">
              THE SETTING
            </h4>
          </div>

          <div className="font-serif-body text-stone-300 text-sm sm:text-base leading-relaxed space-y-4 select-text">
            <p>
              Set in the year 2037, the Core Rulebook begins the adventure
              shortly after the Wallace Corporation debuts the new Nexus-9
              Replicants on Earth, giving you the choice to play as either human
              or Replicants.
            </p>
            <p>
              As a member of the LAPD’s Rep-Detect Unit, you’ll face impossible
              choices and find beauty and humanity in the stubborn resilience to
              keep fighting. To persevere through pain. To agonize over itches
              you can’t scratch. To do questionable and extraordinary things,
              chasing after fleeting moments of love, hope, and redemption to be
              lost in time like tears in rain.
            </p>
            <p>
              Other than that, it’s just a normal day on the force, so get to
              work and grab some noodles on the way. That stack of cases won’t
              crack itself. It’s a shame you won’t live long enough to solve
              them all.
            </p>
            <p className="font-serif italic text-white pt-2 text-md">
              But then again, who does?
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: GALLERY CAROUSEL DISPLAY */}
      <div className="bg-[#121212] py-12 px-6 md:px-12 select-none">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center border-b border-bone/10 pb-2">
            <span className="font-mono text-[8px] text-neutral-500 font-bold tracking-widest uppercase">
              ©2022 Alcon Entertainment, LLC. All rights reserved.
            </span>
            <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">
              GALLERY PREVIEW // {galleryIndex + 1} OF {galleryItems.length}
            </span>
          </div>

          {/* Interactive Slide Container */}
          <div className="relative aspect-[16/9] w-full bg-[#181818] border border-bone/15 overflow-hidden rounded group shadow-xl">
            <img
              referrerPolicy="no-referrer"
              src={galleryItems[galleryIndex].url}
              alt={galleryItems[galleryIndex].caption}
              className="w-full h-full object-cover transition-transform duration-500 brightness-[0.8]"
            />

            {/* Absolute navigation controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
              <p className="font-serif-body text-neutral-200 text-xs sm:text-sm font-semibold max-w-[80%] text-left drop-shadow mb-1">
                {galleryItems[galleryIndex].caption}
              </p>
            </div>

            <button
              onClick={handlePrevGallery}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 hover:bg-black text-white rounded transition-colors"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextGallery}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 hover:bg-black text-white rounded transition-colors"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* VIDEOS ROW SECTION */}
      <div className="bg-[#191919] px-6 md:px-12 py-12 border-t border-b border-bone/10 text-left">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Tv className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] font-bold uppercase">
                COMMUNITY ACTUAL PLAYS
              </span>
            </div>
            <h4 className="font-archive text-xl text-white font-black tracking-wider uppercase">
              Watch Sessions Live
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
                className="group cursor-pointer space-y-3 bg-[#111] p-2 border border-bone/10 hover:border-cyan-500/60 transition-all rounded shadow"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded bg-stone-900 border border-none">
                  <img
                    referrerPolicy="no-referrer"
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  {/* YouTube Player Red Icon overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                    <div className="w-12 h-8 bg-[#ff0000] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <p className="font-mono text-[8px] text-[#D4AF37] tracking-wider uppercase font-bold">
                    {vid.author}
                  </p>
                  <h5 className="font-archive text-[10px] text-bone tracking-wide uppercase line-clamp-2 leading-snug font-bold">
                    {vid.title}
                  </h5>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-bone/10 justify-end">
            <button
              onClick={() => {
                playClack();
                const el = document.getElementById('core-game-editions');
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-[#c39c6d] hover:bg-[#b0885c] text-obsidian font-archive text-[10px] tracking-wider font-extrabold uppercase py-2.5 px-5 transition-colors block text-center"
            >
              SHOP PRODUCTS
            </button>
            <a
              href="https://freeleaguepublishing.com/wp-content/uploads/2022/11/BR_CharacterSheet_v2_Fillable.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={playClack}
              className="border border-neutral-500 text-neutral-300 hover:text-white hover:border-[#c39c6d] font-archive text-[10px] tracking-wider font-bold uppercase py-2.5 px-5 transition-all block text-center"
            >
              DOWNLOADS (PDF PACKS)
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 6: CORE GAME EDITIONS SWEDISH KRONA SHELF */}
      <div
        id="core-game-editions"
        className="bg-[#121212] px-6 md:px-12 py-12 text-left scroll-mt-28"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-baseline border-b border-bone/10 pb-2">
            <h4 className="font-serif-display text-2xl md:text-3xl text-[#E4DFD3] font-black tracking-tight uppercase">
              Core Game Editions
            </h4>

            <button
              onClick={() => {
                playClack();
                const shopEl = document.getElementById('shop-featured-books');
                if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-mono text-xs text-[#D5AF37] hover:underline font-bold uppercase tracking-wider"
            >
              Shop all &rarr;
            </button>
          </div>

          {/* TWO PRODUCTS BOXED COVERS SIDE BY SIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product 1: STARTER SET */}
            <div className="bg-[#1A1A1A] border-2 border-bone/10 hover:border-cyan-500/50 p-4 transition-all duration-300 rounded shadow-md flex flex-col justify-between space-y-4 group">
              <div className="space-y-4">
                {/* Book cover area */}
                <div className="aspect-[4/3] w-full bg-[#111] overflow-hidden rounded border border-bone/5 flex items-center justify-center p-4">
                  <img
                    referrerPolicy="no-referrer"
                    src="/img/006.png"
                    alt="Blade Runner Starter Set Premium Box Cover Illustration"
                    className="h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:scale-104 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#D5AF37] tracking-widest font-bold uppercase block">
                    Blade Runner RPG
                  </span>
                  <h5 className="font-archive text-md text-white tracking-widest uppercase font-black">
                    STARTER SET
                  </h5>
                  <p className="font-mono text-xs text-stone-300 font-bold mt-1">
                    538.00 kr
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() =>
                    handleAddToCart('BLADE RUNNER RPG STARTER SET')
                  }
                  className="bg-[#c39c6d] hover:bg-[#b0885c] text-obsidian font-archive text-[10px] tracking-wider font-extrabold uppercase py-2.5 px-2 transition-colors flex items-center justify-center gap-1.5 rounded-sm"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => {
                    playClack();
                    alert(
                      'Contains: 80-page rulebook, 56-page casebook, 4 pre-generated characters, huge full-color map, custom dice!',
                    );
                  }}
                  className="border border-[#c39c6d] text-[#c39c6d] hover:bg-[#c39c6d]/10 font-archive text-[10px] tracking-wider font-bold uppercase py-2.5 px-2 transition-all text-center rounded-sm"
                >
                  READ MORE
                </button>
              </div>
            </div>

            {/* Product 2: CORE RULEBOOK */}
            <div className="bg-[#1A1A1A] border-2 border-bone/10 hover:border-cyan-500/50 p-4 transition-all duration-300 rounded shadow-md flex flex-col justify-between space-y-4 group">
              <div className="space-y-4">
                {/* Book cover area */}
                <div className="aspect-[4/3] w-full bg-[#111] overflow-hidden rounded border border-bone/5 flex items-center justify-center p-4">
                  <img
                    referrerPolicy="no-referrer"
                    src="/img/008.png"
                    alt="Blade Runner Core Rules Technical Book Cover"
                    className="h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:scale-104 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#D5AF37] tracking-widest font-bold uppercase block">
                    Blade Runner RPG
                  </span>
                  <h5 className="font-archive text-md text-white tracking-widest uppercase font-black">
                    CORE RULEBOOK
                  </h5>
                  <p className="font-mono text-xs text-stone-300 font-bold mt-1">
                    568.00 kr
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() =>
                    handleAddToCart('BLADE RUNNER RPG CORE RULEBOOK')
                  }
                  className="bg-[#c39c6d] hover:bg-[#b0885c] text-obsidian font-archive text-[10px] tracking-wider font-extrabold uppercase py-2.5 px-2 transition-colors flex items-center justify-center gap-1.5 rounded-sm"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => {
                    playClack();
                    alert(
                      'Contains: 236 pages of gorgeous hardcover world lore, quick rules mechanics, character creators, and Los Angeles city indexes.',
                    );
                  }}
                  className="border border-[#c39c6d] text-[#c39c6d] hover:bg-[#c39c6d]/10 font-archive text-[10px] tracking-wider font-bold uppercase py-2.5 px-2 transition-all text-center rounded-sm"
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
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#1C1C1C] text-bone border-4 border-[#c39c6d] p-4 shadow-2xl rounded flex items-start gap-3 select-none"
          >
            <div className="bg-cyan-500/20 text-cyan-400 p-2 rounded border border-cyan-500/30">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-left flex-1">
              <p className="font-archive text-[11px] tracking-wider text-[#D5AF37] uppercase font-extrabold">
                SECURE TRANSIT ESTABLISHED
              </p>
              <p className="font-serif-body text-[12px] text-[#E4DFD3] normal-case leading-snug">
                Added{' '}
                <span className="font-bold text-white uppercase">
                  {cartNotification}
                </span>{' '}
                code item to your cart collection.
              </p>
              <span className="font-mono text-[8px] text-neutral-500 block uppercase font-bold pt-1">
                TRANSIT INDEX CODEX: SECURE_77V
              </span>
            </div>
            <button
              onClick={() => setCartNotification(null)}
              className="text-stone-400 hover:text-white p-1"
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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 select-none"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="w-full max-w-2xl bg-[#1A1A1A] border-4 border-obsidian p-6 text-left space-y-4 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
                title="Close Player"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="font-mono text-[9px] text-[#D5AF37] tracking-widest uppercase font-bold block">
                  NOW SECURED STREAMING // COMMUNITY ARCHIVE
                </span>
                <h4 className="font-archive text-md text-bone uppercase tracking-wider font-extrabold pr-8">
                  {videos.find((v) => v.id === selectedVideo)?.title}
                </h4>
              </div>

              {/* High-fidelity fake embedded video screen with play static and cyber glow */}
              <div className="relative aspect-video w-full bg-black flex flex-col justify-center items-center border border-bone/15 group overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] pointer-events-none" />

                <Tv className="w-16 h-16 text-cyan-400/20 animate-pulse mb-3" />
                <p className="font-mono text-xs text-cyan-500/80 font-bold uppercase tracking-widest text-center">
                  * ENCRYPTED DATA TRANSMISSION *
                </p>
                <p className="font-serif-body text-[11px] text-stone-400 mt-1 max-w-[80%] text-center">
                  Tabletop session broadcast stream established. Click below to
                  watch the original creator page on YouTube.
                </p>

                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    playClack();
                    setSelectedVideo(null);
                  }}
                  className="mt-4 bg-[#ff0000] hover:bg-red-700 text-white font-archive text-[10px] tracking-widest font-black uppercase py-2 px-6 rounded shadow-lg transition-transform hover:scale-105"
                >
                  LAUNCH YOUTUBE BROADCAST
                </a>
              </div>

              <div className="flex justify-between items-center font-mono text-[9px] text-stone-500">
                <span>REPLICANT DETECT SCAN // ACTIVE</span>
                <span>LAPD LOGS CAL-3000</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
