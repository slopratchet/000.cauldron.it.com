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
  CheckCircle,
  X,
  Skull,
  Flame,
  ShieldAlert,
} from 'lucide-react';

interface GothicCryptsHorrorProps {
  playClack: () => void;
  onAddToCart?: () => void;
}

export function GothicCryptsHorror({
  playClack,
  onAddToCart,
}: GothicCryptsHorrorProps) {
  // Quote / Review Rotator State
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    {
      text: 'Vaesen: Gothic Crypts lands with an icy, spectacular thump, blending dark folklore with modern investigative mechanics. Pure dread masterpiece.',
      author: 'Tabletop Gaming',
    },
    {
      text: 'The mood is as thick as peat-bog fog, capturing ancient sorrow, uncooperative whispers, and skeletal ruins perfectly.',
      author: 'RPG Geek',
    },
    {
      text: 'Vesasens customized panic-level engine weights mental trauma and ancestral blood curses in a way that is absolutely bone-chilling.',
      author: 'Gizmodo',
    },
  ];

  // Gallery Slide State
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryItems = [
    {
      url: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
      caption:
        'The decaying stone tombs of the Gilded Atrium shrouded in freezing evening fog.',
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      caption: 'Misty sentinel gargoyles guarding ancient forbidden vaults.',
    },
    {
      url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80',
      caption:
        'Chasing wisps deep into the mythical, moss-choked woods of Norrland.',
    },
    {
      url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
      caption:
        'A single silver candelabra illuminating centuries of dust and skeletal secrets.',
    },
  ];

  // Video Mock Modals index
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'dark_candle',
      title: 'Vaesen RPG | A Wick In The Darkness | Episode 1',
      author: 'Tablestory',
      thumbnail:
        'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'vault_solo',
      title: 'Gothic Dead: Vault of Bone Solitary Chronicle',
      author: 'SoloInvestigator',
      thumbnail:
        'https://images.unsplash.com/photo-1548263591-19059728cb1c?auto=format&fit=crop&w=800&q=80',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'vaesen_oxv',
      title: 'Vaesen: Mythic North | Actual Play Horror Special',
      author: 'Oxventure',
      thumbnail:
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
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
      id="gothic-crypts-horror-vault"
      className="scroll-mt-32 w-full bg-[#0a080c] border-4 border-[#2b1736] text-bone p-0 overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] my-12"
    >
      {/* SECTION 1: HERO GOTHIC NOIR BANNER */}
      <div className="relative min-h-[400px] md:min-h-[500px] flex flex-col justify-center items-center p-8 overflow-hidden select-none">
        {/* Rainy Misty graveyard image */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.3] saturate-[0.85] transition-transform duration-1000 transform scale-102"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80')`,
          }}
        />
        {/* Animated Mist & Deep Violet Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a080c]/50 via-transparent to-[#0a080c] z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3c1d42]/30 via-transparent to-transparent z-1 animate-pulse" />

        {/* Heading HUD Panel Block */}
        <div className="relative z-10 text-center space-y-4 max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border border-[#ca8af2]/30 bg-[#3c1d42]/40 backdrop-blur-md text-[#ca89f4] font-mono text-[9px] tracking-[0.25em] px-4 py-1.5 rounded-sm uppercase font-bold"
          >
            OFFICIAL RETRO HORROR SOURCEBOOK
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-archive text-5xl sm:text-6xl md:text-7xl font-black text-[#f1ebf7] hover:text-[#ca89f4] transition-colors tracking-widest leading-none drop-shadow-[0_8px_16px_rgba(60,29,66,0.6)]"
          >
            VAULTS & CRYPTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-archive text-sm sm:text-md tracking-[0.4em] text-stone-300 uppercase leading-none font-bold"
          >
            VAULTS OF THE GOTHIC DEAD
          </motion.p>
        </div>

        {/* Coords footer across image */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex justify-between font-mono text-[8px] text-zinc-500 select-none hidden sm:flex">
          <span>LAT: 59.3293° N // LON: 18.0686° E</span>
          <span>RELIQUARY.CODEX // SECURE-VAULT-HORROR</span>
          <span>RESTRICTED SACRED PARISH VAULTS</span>
        </div>
      </div>

      {/* SECTION 2: BREADCRUMBS & OVERVIEW HERO COLUMNS */}
      <div className="bg-[#120f17] border-t border-b border-[#2b1736]/30 px-4 md:px-8 py-2 select-none">
        <span className="font-mono text-[9px] text-[#ca89f4] font-bold uppercase tracking-widest block text-center sm:text-left">
          START / GAMES / HORROR / VAULTS OF THE GOTHIC DEAD & VAESEN
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 py-10">
        {/* Left column info list */}
        <div className="lg:col-span-4 space-y-6 text-left border-b lg:border-b-0 lg:border-r border-bone/10 pb-8 lg:pb-0 lg:pr-8">
          <div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-bone leading-none font-black tracking-tight">
              Vaults & Gothic
              <br />
              Crypts Horror
              <br />
              Edition
            </h2>
          </div>

          <div className="font-mono text-xs space-y-2 border-t border-dashed border-bone/15 pt-4">
            <div className="flex justify-between">
              <span className="text-zinc-400 font-bold">INVESTIGATORS</span>
              <span className="text-[#ca89f4] font-bold">1–6 COVEN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-bold">SANITY TIER</span>
              <span className="text-[#ca89f4] font-bold">ULTRA CRITICAL</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => {
                playClack();
                const el = document.getElementById('horror-editions');
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full bg-[#3c1d42] hover:bg-[#522959] text-bone font-archive text-[11px] tracking-wider font-extrabold uppercase py-3 px-5 transition-colors text-center block shadow-lg border border-[#ca89f4]/40"
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>SHOP HORROR PRODUCTS</span>
              </div>
            </button>

            <button
              onClick={() => {
                playClack();
                alert(
                  'Downloading official high-fidelity Gothic Character Sheet PDF & Horror Reference tables...',
                );
              }}
              className="w-full border border-[#ca89f4] text-[#ca89f4] hover:bg-[#ca89f4]/10 font-archive text-[11px] tracking-wider font-extrabold uppercase py-3 px-5 transition-all text-center block shadow"
            >
              <div className="flex items-center justify-center gap-2">
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOADS (HORROR SHEETS)</span>
              </div>
            </button>

            <button
              onClick={() => {
                playClack();
                alert(
                  'Simulating StartPlaying matching system... Relinking to Live Gothic Horror & Vaesen circles.',
                );
              }}
              className="w-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-[#ca89f4] font-archive text-[9px] tracking-widest font-bold uppercase py-2 px-4 transition-all text-center block"
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-3 h-3 text-[#ca89f4]" />
                <span>FIND VAESEN GROUPS ON STARTPLAYING</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right column lore summary description */}
        <div className="lg:col-span-8 text-left flex flex-col justify-center space-y-6">
          <h3 className="font-serif text-2xl md:text-4xl text-zinc-100 leading-tight font-black">
            A moss-covered grave mound that'll take your sanity. One way or
            another.
          </h3>
          <p className="font-serif-body text-zinc-300 text-base md:text-[17px] leading-relaxed select-text font-normal">
            An evocative world of ancient curses and shadows that dares to ask
            the deep ancestral questions and investigate the powers of cold
            iron, the poison of curses, and the burdens of mortality during
            supernatural times. An iconic and unforgiving graveyard of endless
            tragedies that picks you up, drags you into the mist, and tells you
            to remember.
          </p>
          <div className="border-l-4 border-[#3c1d42] pl-4 font-mono text-xs tracking-wider text-[#ca89f4] font-bold uppercase flex items-center gap-2">
            <Skull className="w-4 h-4 text-[#ca89f4] animate-pulse" />
            <span>Time to live. Or time to decay.</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: REVIEWS QUOTE ROTATOR & THE GAME DESCRIPTION */}
      <div className="bg-[#0f0c14] border-t border-b border-[#2b1736]/40 py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="font-mono text-[9px] tracking-[0.2em] text-[#ca89f4] font-bold uppercase">
            RELIQUARY TESTIMONY & CHRONICLES
          </div>

          {/* Quote block */}
          <div className="min-h-[140px] flex items-center justify-center relative px-8">
            <button
              onClick={handlePrevQuote}
              className="absolute left-0 p-2 hover:bg-zinc-950 text-[#ca89f4] hover:text-white rounded transition-colors"
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
                <div className="font-archive text-xs tracking-widest text-[#ca89f4] font-bold uppercase">
                  — {quotes[quoteIndex].author}
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handleNextQuote}
              className="absolute right-0 p-2 hover:bg-zinc-950 text-[#ca89f4] hover:text-white rounded transition-colors"
              title="Next Quote"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED: "THE GAME" & INTRICATE EXPLAINER BLOCKS */}
      <div className="px-6 md:px-12 py-12 bg-[#0a080c]">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#ca89f4] font-bold uppercase block mb-1">
              RELIC FILE_09 // SPECIFICATIONS
            </span>
            <h4 className="font-archive text-xl text-white font-black tracking-wider uppercase">
              THE GAME
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-6 font-serif-body text-zinc-300 text-sm md:text-base leading-relaxed space-y-4 select-text">
            <p>
              The official{' '}
              <strong className="text-[#ca89f4]">
                VAULTS OF THE GOTHIC DEAD & VAESEN RPG
              </strong>{' '}
              propels you into a mythical, shadowed North or decaying Gothic
              lands as specialized Society Investigators with unique
              supernatural sights and deeply buried personal secrets.
            </p>
            <p>
              The game pushes the boundaries of folkloric investigative gameplay
              in tabletop roleplaying, providing you with delicate protection
              circles, ancient lanterns, and quick protective curses to navigate
              the cold unknown. Question local villagers, decipher forgotten
              tomb maps, and prepare rituals to banish, pacify, or resolve
              ancient entities. It challenges you to balance your sanity,
              survive catastrophic wounds, and explore the heavy prices of
              progress during forgotten times.
            </p>
            <p>
              The rules are powered by the customized version of the acclaimed{' '}
              <strong className="text-[#ca89f4]">Year Zero Engine</strong>,
              specifically streamlined for dark investigation, horror stress,
              magical relic synergies, and intense mechanical focus.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE SETTING WITH SPLIT-SCREEN CHARACTERS GRAPHIC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#120f17] border-t border-b border-[#2b1736]/40">
        {/* Left Column Graphic: Crypt light spots */}
        <div className="relative min-h-[350px] sm:min-h-[420px] lg:min-h-full overflow-hidden flex items-center justify-center select-none">
          <img
            referrerPolicy="no-referrer"
            src="https://images.unsplash.com/photo-1548263591-19059728cb1c?auto=format&fit=crop&w=800&q=80"
            alt="Old stone Gothic crypt illuminated by a single spotlight"
            className="absolute inset-0 w-full h-full object-cover saturate-[1.1] brightness-[0.6]"
          />
          <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-[#120f17] via-transparent to-transparent opacity-85" />
          <div className="absolute top-10 right-16 w-32 h-32 rounded-full bg-purple-900/30 blur-2xl animate-pulse" />
          <div className="absolute bottom-12 left-12 w-28 h-28 rounded-full bg-indigo-900/40 blur-2xl" />

          <div className="relative z-10 text-center bg-black/50 p-4 border border-[#ca89f4]/20 backdrop-blur-sm">
            <span className="font-mono text-[8px] text-[#ca89f4] block tracking-[0.3em] font-extrabold uppercase">
              RELIQUARY SOCIETY MEMBERS
            </span>
            <span className="font-mono text-[10px] text-white font-bold block mt-1 uppercase">
              STATUS: THE SIGHT IS ACTIVE
            </span>
          </div>
        </div>

        {/* Right Column Content: The Setting details */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-6 text-left">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#ca89f4] font-bold uppercase block mb-1">
              CHRONICLE MAP OVERVIEW
            </span>
            <h4 className="font-archive text-xl text-white font-black tracking-wider uppercase">
              THE SETTING
            </h4>
          </div>

          <div className="font-serif-body text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 select-text">
            <p>
              Set in a mythic 19th-century Europe, where local folklore and dark
              fairy tales are dangerously real, the Core Rulebook guides you
              through deep pine forests, haunted ironworks, and forgotten stone
              parishes.
            </p>
            <p>
              Confront powerful elemental monsters, ancient spirits, or restless
              skeletal guardians sleeping in the vaults. Most spirits aren’t
              inherently violent, but the encroachment of modern iron railways
              and industrial pollution has poisoned their sacred resting
              grounds, driving them to blind fury. Can you heal the ancient
              breaches, or will you succumb to the corruption of the vaults?
            </p>
            <p>
              It’s a chilly twilight night. Take your trusty silver flintlock,
              pack your sacred texts, and inspect the graves before the moon
              vanishes completely.
            </p>
            <p className="font-serif italic text-[#ca89f4] pt-2 text-md">
              But then again, who actually makes it back?
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: GALLERY CAROUSEL DISPLAY */}
      <div className="bg-[#0a080c] py-12 px-6 md:px-12 select-none">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center border-b border-[#2b1736]/35 pb-2">
            <span className="font-mono text-[8px] text-zinc-500 font-bold tracking-widest uppercase">
              ©2024 Fria Ligan Publishing. Gothic Relics Reserved.
            </span>
            <span className="font-mono text-[10px] text-[#ca89f4] font-bold uppercase">
              CRYP PREVIEW // {galleryIndex + 1} OF {galleryItems.length}
            </span>
          </div>

          {/* Interactive Slide Container */}
          <div className="relative aspect-[16/9] w-full bg-[#120f17] border border-[#2b1736]/45 overflow-hidden rounded group shadow-2xl">
            <img
              referrerPolicy="no-referrer"
              src={galleryItems[galleryIndex].url}
              alt={galleryItems[galleryIndex].caption}
              className="w-full h-full object-cover transition-transform duration-500 brightness-[0.7]"
            />

            {/* Absolute navigation controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a080c]/90 via-transparent to-transparent flex flex-col justify-end p-4">
              <p className="font-serif-body text-[#eebdfc] text-xs sm:text-sm font-semibold max-w-[80%] text-left drop-shadow mb-1">
                {galleryItems[galleryIndex].caption}
              </p>
            </div>

            <button
              onClick={handlePrevGallery}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#3c1d42]/70 hover:bg-[#3c1d42] text-white rounded transition-colors"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextGallery}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#3c1d42]/70 hover:bg-[#3c1d42] text-white rounded transition-colors"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* VIDEOS ROW SECTION */}
      <div className="bg-[#120f17] px-6 md:px-12 py-12 border-t border-b border-[#2b1736]/40 text-left">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Tv className="w-4 h-4 text-[#ca89f4]" />
              <span className="font-mono text-[9px] tracking-widest text-[#ca89f4] font-bold uppercase">
                GOTHIC COMMMUNITY ACTUAL PLAYS
              </span>
            </div>
            <h4 className="font-archive text-xl text-white font-black tracking-wider uppercase">
              Witness Supernatural Sessions
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
                className="group cursor-pointer space-y-3 bg-[#0a080c] p-2 border border-[#2b1736]/30 hover:border-[#ca89f4] transition-all rounded shadow"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded bg-[#0f0c14] border border-none">
                  <img
                    referrerPolicy="no-referrer"
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  {/* Play circle overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 flex items-center justify-center transition-colors">
                    <div className="w-12 h-12 bg-[#3c1d42]/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border border-[#ca89f4]/50">
                      <Play className="w-5 h-5 text-[#ca89f4] fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <p className="font-mono text-[8px] text-[#ca89f4] tracking-wider uppercase font-bold">
                    {vid.author}
                  </p>
                  <h5 className="font-archive text-[10px] text-zinc-200 tracking-wide uppercase line-clamp-2 leading-snug font-bold">
                    {vid.title}
                  </h5>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#2b1736]/40 justify-end">
            <button
              onClick={() => {
                playClack();
                const el = document.getElementById('horror-editions');
                if (el)
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-[#3c1d42] hover:bg-[#522959] text-bone font-archive text-[10px] tracking-wider font-extrabold uppercase py-2.5 px-5 transition-colors block text-center border border-[#ca89f4]/45"
            >
              SHOP HORROR EXPANSIONS
            </button>
            <button
              onClick={() => {
                playClack();
                alert(
                  'Initiated Gothic dead packet download. High res templates prepared!',
                );
              }}
              className="border border-[#ca89f4] text-[#ca89f4] hover:bg-[#ca89f4]/15 font-archive text-[10px] tracking-wider font-bold uppercase py-2.5 px-5 transition-all block text-center"
            >
              DOWNLOAD FREE HEARSE PACKS
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 6: CORE GAME EDITIONS SWEDISH KRONA SHELF */}
      <div
        id="horror-editions"
        className="bg-[#0a080c] px-6 md:px-12 py-12 text-left scroll-mt-28"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-baseline border-b border-[#2b1736]/40 pb-2">
            <h4 className="font-serif-display text-2xl md:text-3xl text-bone font-black tracking-tight uppercase">
              Core Horror Editions
            </h4>

            <button
              onClick={() => {
                playClack();
                const shopEl = document.getElementById('shop');
                if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-mono text-xs text-[#ca89f4] hover:underline font-bold uppercase tracking-wider"
            >
              Shop all &rarr;
            </button>
          </div>

          {/* TWO PRODUCTS BOXED COVERS SIDE BY SIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product 1: STARTER SET */}
            <div className="bg-[#120f17] border-2 border-[#2b1736]/40 hover:border-[#ca89f4]/50 p-4 transition-all duration-300 rounded shadow-md flex flex-col justify-between space-y-4 group">
              <div className="space-y-4">
                {/* Book cover area */}
                <div className="aspect-[4/3] w-full bg-[#0a080c] overflow-hidden rounded border border-[#2b1736]/30 flex items-center justify-center p-4">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
                    alt="Vaesen Gothic Starter Set Premium Dark Cover"
                    className="h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] group-hover:scale-104 transition-transform duration-300 pointer-events-none"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#ca89f4] tracking-widest font-bold uppercase block">
                    Vaesen Reliques
                  </span>
                  <h5 className="font-archive text-md text-white tracking-widest uppercase font-black">
                    VAESEN STARTER SET
                  </h5>
                  <p className="font-mono text-xs text-zinc-300 font-bold mt-1">
                    398.00 kr
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() => handleAddToCart('VAESEN RPG STARTER SET')}
                  className="bg-[#3c1d42] hover:bg-[#522959] text-bone font-archive text-[10px] tracking-wider font-extrabold uppercase py-2.5 px-2 transition-colors flex items-center justify-center gap-1.5 rounded-sm border border-[#ca89f4]/40"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => {
                    playClack();
                    alert(
                      'Contains: 64-page streamlined rulebook, customized investigative casebook, pre-rolled character passports, atmospheric maps, and special horror token guides.',
                    );
                  }}
                  className="border border-[#ca89f4] text-[#ca89f4] hover:bg-[#ca89f4]/10 font-archive text-[10px] tracking-wider font-bold uppercase py-2.5 px-2 transition-all text-center rounded-sm"
                >
                  READ MORE
                </button>
              </div>
            </div>

            {/* Product 2: CORE RULEBOOK */}
            <div className="bg-[#120f17] border-2 border-[#2b1736]/40 hover:border-[#ca89f4]/50 p-4 transition-all duration-300 rounded shadow-md flex flex-col justify-between space-y-4 group">
              <div className="space-y-4">
                {/* Book cover area */}
                <div className="aspect-[4/3] w-full bg-[#0a080c] overflow-hidden rounded border border-[#2b1736]/30 flex items-center justify-center p-4">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
                    alt="Vaults of the Gothic Dead Hardbound Core Rulebook"
                    className="h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] group-hover:scale-104 transition-transform duration-300 pointer-events-none"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#ca89f4] tracking-widest font-bold uppercase block">
                    Ancestral Tombs
                  </span>
                  <h5 className="font-archive text-md text-white tracking-widest uppercase font-black">
                    VAULTS OF THE GOTHIC DEAD CORE COG
                  </h5>
                  <p className="font-mono text-xs text-zinc-300 font-bold mt-1">
                    468.00 kr
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() =>
                    handleAddToCart('VAULTS OF THE GOTHIC DEAD CORE RULEBOOK')
                  }
                  className="bg-[#3c1d42] hover:bg-[#522959] text-bone font-archive text-[10px] tracking-wider font-extrabold uppercase py-2.5 px-2 transition-colors flex items-center justify-center gap-1.5 rounded-sm border border-[#ca89f4]/40"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => {
                    playClack();
                    alert(
                      'Contains: 280 pages of leather-feel texture hardcover world lore, creature bestiary catalog, mental decay thresholds, and full map coordinates.',
                    );
                  }}
                  className="border border-[#ca89f4] text-[#ca89f4] hover:bg-[#ca89f4]/10 font-archive text-[10px] tracking-wider font-bold uppercase py-2.5 px-2 transition-all text-center rounded-sm"
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
            className="fixed bottom-6 left-6 z-50 max-w-sm bg-[#120f17] text-bone border-4 border-[#3c1d42] p-4 shadow-2xl rounded flex items-start gap-3 select-none"
          >
            <div className="bg-[#3c1d42]/40 text-[#ca89f4] p-2 rounded border border-[#ca89f4]/30">
              <Flame className="w-5 h-5 text-[#ca89f4] animate-pulse" />
            </div>
            <div className="space-y-1 text-left flex-1">
              <p className="font-archive text-[11px] tracking-wider text-[#ca89f4] uppercase font-extrabold">
                CRYPT ACCESS SECURED
              </p>
              <p className="font-serif-body text-[12px] text-purple-200 normal-case leading-snug">
                Added{' '}
                <span className="font-bold text-white uppercase">
                  {cartNotification}
                </span>{' '}
                code item to your cart collection.
              </p>
              <span className="font-mono text-[8px] text-zinc-500 block uppercase font-bold pt-1">
                TRANSIT ID CODE: ANCESTRAL_99X
              </span>
            </div>
            <button
              onClick={() => setCartNotification(null)}
              className="text-zinc-400 hover:text-white p-1"
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
              className="w-full max-w-2xl bg-[#120f17] border-4 border-[#3c1d42] p-6 text-left space-y-4 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
                title="Close Player"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="font-mono text-[9px] text-[#ca89f4] tracking-widest uppercase font-bold block">
                  NOW SECURED STREAMING // ANCESTRAL CHRONICLE ARCHIVE
                </span>
                <h4 className="font-archive text-md text-bone uppercase tracking-wider font-extrabold pr-8">
                  {videos.find((v) => v.id === selectedVideo)?.title}
                </h4>
              </div>

              {/* High-fidelity fake embedded video screen with play static and cyber glow */}
              <div className="relative aspect-video w-full bg-black flex flex-col justify-center items-center border border-[#ca89f4]/20 group overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(120,0,120,0.06),_rgba(0,180,0,0.02),_rgba(0,0,200,0.06))] bg-[size:100%_4px,_6px_100%] pointer-events-none" />

                <Skull className="w-16 h-16 text-[#ca89f4]/20 animate-pulse mb-3" />
                <p className="font-mono text-xs text-[#ca89f4]/80 font-bold uppercase tracking-widest text-center">
                  * ENCRYPTED GOTHIC TRANSMISSION *
                </p>
                <p className="font-serif-body text-[11px] text-zinc-400 mt-1 max-w-[80%] text-center">
                  Supernatural session broadcast stream established. Click below
                  to view the original content creator page on YouTube.
                </p>

                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    playClack();
                    setSelectedVideo(null);
                  }}
                  className="mt-4 bg-[#3c1d42] hover:bg-[#522959] text-white border border-[#ca89f4]/50 font-archive text-[10px] tracking-widest font-black uppercase py-2 px-6 rounded shadow-lg transition-transform hover:scale-105"
                >
                  LAUNCH YOUTUBE BROADCAST
                </a>
              </div>

              <div className="flex justify-between items-center font-mono text-[9px] text-zinc-500">
                <span>RELIQUARY INVESTIGATION // SHIELD ACTIVE</span>
                <span>VAESEN SOCIETY LOGS REG-77</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
