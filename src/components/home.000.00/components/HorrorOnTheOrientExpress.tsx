import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Train, Volume2, VolumeX, ShoppingBag, Download } from 'lucide-react';

interface HorrorOnTheOrientExpressProps {
  playClack: () => void;
  onAddToCart?: () => void;
}

export function HorrorOnTheOrientExpress({
  playClack,
  onAddToCart,
}: HorrorOnTheOrientExpressProps) {
  // Soundscape Generator State
  const [isTrainPlaying, setIsTrainPlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [trainIntervalId, setTrainIntervalId] = useState<
    NodeJS.Timeout | number | null
  >(null);

  // Passenger Manifests / Dossiers
  const passengerDossiers = [
    {
      name: 'Chef de Train Georges',
      role: 'Luxury Compartment Conductor',
      lore: 'A pristine veteran of the Simplon routing. He swears he hears heavy scratching noises on the outer carriage metal while crossing alpine tunnels.',
      suspicion: 'Low',
      secret:
        'He is terrified of losing his pension and turns a blind eye to strange nighttime baggage handoffs.',
    },
    {
      name: 'Professor Julius Smith',
      role: 'Eminent Occult Historian',
      lore: 'He compiled the original parchment notes warning of the Sedefkar statue. His fingers are deeply stained with ink and his eyes look hollow.',
      suspicion: 'Ally',
      secret:
        'His London townhouse was burned down by cultists, and he is traveling under a false Swedish passport.',
    },
    {
      name: 'Countess Natalia K.',
      role: 'Exiled Royal High-Elegance',
      lore: 'She occupies first-class Salon Suite B. She spends hours reading heavy, leather-bound grimoires and possesses a custom bone-handled cane.',
      suspicion: 'High',
      secret:
        "She is a secret patron of the London Occult Guild, seeking the Simulacrum's head to stave off her own failing health.",
    },
    {
      name: 'The Stranger in the Fez',
      role: 'Third-Class Cabin Passenger',
      lore: 'Avoids all direct eye contact. He wears a heavy crimson fez and smells faintly of formaldehyde and stagnant canal water.',
      suspicion: 'Extreme',
      secret:
        'He is a high-ranking priest of the Brotherhood of the Skin, sent to assassinate anyone carrying luggage matching the fragments.',
    },
  ];

  const [selectedDossierIndex, setSelectedDossierIndex] = useState<
    number | null
  >(null);
  const [interrogatedDossiers, setInterrogatedDossiers] = useState<string[]>(
    [],
  );

  // Toggle procedural train audio
  useEffect(() => {
    return () => {
      // Clean up audio on unmount
      if (trainIntervalId) clearInterval(trainIntervalId);
    };
  }, [trainIntervalId]);

  const toggleTrainSoundscape = () => {
    playClack();
    if (isTrainPlaying) {
      setIsTrainPlaying(false);
      if (trainIntervalId) {
        clearInterval(trainIntervalId);
        setTrainIntervalId(null);
      }
    } else {
      setIsTrainPlaying(true);
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        setAudioCtx(ctx);

        let beat = 0;
        // Rhythmic Chug Generator using Audio Nodes
        const id = setInterval(() => {
          beat++;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(45, ctx.currentTime);

          filter.type = 'lowpass';
          // alternate frequency for the rhythmic train track click: "Chug-chug... chug-chug..."
          const isOffbeat = beat % 4 === 1 || beat % 4 === 2;
          filter.frequency.setValueAtTime(isOffbeat ? 90 : 60, ctx.currentTime);

          // volume decay
          gain.gain.setValueAtTime(isOffbeat ? 0.007 : 0.004, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(
            0.0001,
            ctx.currentTime + 0.12,
          );

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.12);

          // Random alpine train whistle
          if (Math.random() < 0.08 && beat % 8 === 0) {
            triggerTrainWhistle(ctx);
          }
        }, 180);

        setTrainIntervalId(id);
      } catch (e) {
        console.warn('Web audio blocked');
      }
    }
  };

  const triggerTrainWhistle = (ctx: AudioContext) => {
    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.setValueAtTime(329.63, ctx.currentTime); // E4 note
      osc2.frequency.setValueAtTime(392.0, ctx.currentTime); // G4 note (eerie minor metallic pairing)

      osc1.type = 'triangle';
      osc2.type = 'triangle';

      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.2);
      osc2.stop(ctx.currentTime + 1.2);
    } catch (err) {
      console.error('Audio trigger failed', err);
    }
  };

  const interrogatePerson = (name: string) => {
    playClack();
    if (!interrogatedDossiers.includes(name)) {
      setInterrogatedDossiers([...interrogatedDossiers, name]);
    }
  };

  return (
    <section
      id="horror-on-the-orient-express"
      className="scroll-mt-32 w-full bg-[#1e130f] border-4 border-[#8a1c14] text-bone p-0 overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] my-12"
    >
      {/* HERO SECTION */}
      <div className="relative min-h-[420px] md:min-h-[520px] flex flex-col justify-center items-center p-8 overflow-hidden select-none">
        {/* Steam train tracks leading into gothic storm */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.25] saturate-[0.7] transform scale-102"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&w=1200&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e130f]/60 via-transparent to-[#1e130f] z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8a1c14]/25 via-transparent to-transparent z-1" />

        <div className="relative z-10 text-center space-y-4 max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-[#8a1c14]/40 bg-[#150a06]/85 backdrop-blur-md text-[#f34f45] font-mono text-[9px] tracking-[0.25em] px-4 py-1.5 rounded-sm uppercase font-extrabold"
          >
            <Train className="w-3" /> LEGENDARY CAMPAIGN BOXED SET
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-archive text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#faf6ee] hover:text-[#f34f45] transition-colors tracking-widest leading-none drop-shadow-[0_8px_16px_rgba(138,28,20,0.6)]"
          >
            ORIENT EXPRESS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-archive text-xs sm:text-sm tracking-[0.35em] text-[#d4af37] uppercase leading-none font-bold"
          >
            THE PRE-EMINENT TABETOP ADVENTURE NOIR
          </motion.p>
        </div>

        <div className="absolute bottom-3 left-4 z-10 flex gap-4 font-mono text-[8px] text-[#faf6ee]/40 select-none hidden sm:flex">
          <span>LINE: SIMPLON ROUTING // LONDON-TO-CONSTANTINOPLE</span>
          <span>1923 EXPEDITION ARCHIVES // COMPATIBLE WITH COURIERS</span>
        </div>
      </div>

      {/* METRIC DATA BAR */}
      <div className="bg-[#150a06] border-t border-b border-[#8a1c14]/30 px-4 md:px-8 py-2 select-none text-left">
        <span className="font-mono text-[9px] text-[#f34f45] font-bold uppercase tracking-widest block text-center sm:text-left">
          START / EXPEDITIONS / HORROR ON THE ORIENT EXPRESS CAMPAIGN BOXED SET
        </span>
      </div>

      {/* DETAILED COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 py-12">
        {/* Info Column */}
        <div className="lg:col-span-4 space-y-6 text-left border-b lg:border-b-0 lg:border-r border-[#faf6ee]/10 pb-8 lg:pb-0 lg:pr-8">
          <div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#faf6ee] leading-none font-black tracking-tight uppercase">
              Horror on
              <br />
              The Orient
              <br />
              Express Set
            </h2>
          </div>

          <p className="font-serif-body text-[#faf6ee]/80 text-[14px] leading-relaxed">
            Traverse 1920s Europe on the Simplon Orient Express. This box
            contains a towering, world-shaping campaign where investigators must
            assemble the split parts of the sentient, cursed{' '}
            <strong>Sedefkar Simulacrum</strong> before it reclaims its skin
            from the helpless world.
          </p>

          <div className="font-mono text-[11px] space-y-2 border-t border-dashed border-[#faf6ee]/15 pt-4">
            <div className="flex justify-between">
              <span className="text-[#faf6ee]/60 font-bold">GAME SYSTEM</span>
              <span className="text-[#d4af37] font-extrabold text-right">
                PRIMAL MAMA / CTHULHU
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#faf6ee]/60 font-bold">REGIONS</span>
              <span className="text-white font-extrabold text-right">
                8 CAPITAL EUROPEAN PORTS
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#faf6ee]/60 font-bold">BOX CONTENTS</span>
              <span className="text-[#f34f45] font-extrabold text-right">
                6 INTRICATE CASE BOOKS
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                if (onAddToCart) onAddToCart();
                alert('ORIENT EXPRESS CAMPAIGN BOXED SET added to your cart!');
              }}
              className="w-full bg-[#8a1c14] hover:bg-[#a6251b] text-white font-archive text-[11px] tracking-wider font-extrabold uppercase py-3 px-5 transition-colors text-center block shadow border-2 border-black"
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>BUY PRE-ORDER BOOK BOX (598.00 kr)</span>
              </div>
            </button>

            <button
              onClick={() => {
                playClack();
                alert(
                  'Downloading 1923 replica Simplon physical handouts, vintage luxury passport booklets, and travel diary ledger PDFs...',
                );
              }}
              className="w-full border-2 border-stone-600 hover:border-white text-stone-200 hover:text-white bg-transparent font-archive text-[11px] tracking-wider font-extrabold uppercase py-3 px-5 transition-all text-center block"
            >
              <div className="flex items-center justify-center gap-2">
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD HANDOUT KIT</span>
              </div>
            </button>
          </div>
        </div>

        {/* INTERACTIVE PASSENGER MANIFESTS */}
        <div className="lg:col-span-8 space-y-8 text-left">
          {/* PASSENGER PROFILE DOSSIERS */}
          <div className="bg-[#150a06] border border-stone-800 p-6 rounded">
            <span className="font-mono text-[10px] tracking-wider text-[#d4af37] uppercase font-bold block mb-4">
              CLASS REGISTER & PASSENGER INTERROGATION DATABASE
            </span>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
              {passengerDossiers.map((p, idx) => (
                <button
                  key={p.name}
                  onClick={() => {
                    playClack();
                    setSelectedDossierIndex(idx);
                  }}
                  className={`p-3 border-2 text-left rounded transition-all ${selectedDossierIndex === idx ? 'bg-[#8a1c14] border-white text-white shadow-md' : 'bg-[#1e130f] border-stone-800 text-stone-300 hover:border-stone-600'}`}
                >
                  <span className="text-[11px] font-archive font-bold tracking-tight block truncate uppercase">
                    {p.name}
                  </span>
                  <span className="text-[8.5px] font-mono tracking-widest text-[#d4af37]/80 block truncate mt-1 uppercase font-bold">
                    {p.role}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedDossierIndex !== null && (
                <motion.div
                  key={selectedDossierIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#241813] border border-stone-700/60 p-4 rounded text-left grid grid-cols-1 md:grid-cols-12 gap-4"
                >
                  <div className="md:col-span-9 space-y-2">
                    <h5 className="font-archive text-[#faf6ee] text-xs font-bold uppercase">
                      {passengerDossiers[selectedDossierIndex].name} (
                      {passengerDossiers[selectedDossierIndex].role})
                    </h5>
                    <p className="font-serif-body text-stone-300 text-xs sm:text-[13px] leading-relaxed">
                      {passengerDossiers[selectedDossierIndex].lore}
                    </p>

                    {interrogatedDossiers.includes(
                      passengerDossiers[selectedDossierIndex].name,
                    ) ? (
                      <div className="bg-[#150a06] border border-[#8a1c14]/40 p-2 text-xs font-mono text-[#ffb0aa] rounded mt-2 select-text">
                        <span className="font-bold text-[#faf6ee] uppercase block mb-0.5">
                          INTERROGATION TRANSCRIPT UNLOCKED:
                        </span>
                        {passengerDossiers[selectedDossierIndex].secret}
                      </div>
                    ) : null}
                  </div>

                  <div className="md:col-span-3 border-l border-stone-800/50 pl-0 md:pl-4 flex flex-col justify-between">
                    <div className="font-mono text-[9px] text-[#faf6ee]/50 uppercase font-bold">
                      CULTIST SUSPICION STATE
                      <span className="block text-white text-xs font-black tracking-widest mt-0.5 text-red-500">
                        {passengerDossiers[selectedDossierIndex].suspicion}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        interrogatePerson(
                          passengerDossiers[selectedDossierIndex].name,
                        )
                      }
                      className="mt-3 bg-[#8a1c14] hover:bg-white hover:text-black hover:border-black text-white py-1.5 px-3 border border-stone-700 text-[10px] select-none font-archive uppercase tracking-widest font-black rounded-sm block text-center"
                    >
                      INTERROGATE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
