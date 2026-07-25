import React from 'react';
import { X, BookOpen, Cpu, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManifestoModal({
  isOpen,
  onClose,
}: ManifestoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel (Absolute Center Position matching Search Panel) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-surface border-4 border-primary shadow-2xl flex flex-col p-8 font-label max-h-[85vh] z-10 overflow-hidden"
          >
            {/* Geometric Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-neutral-800 via-white to-neutral-800" />

            <div className="flex justify-between items-center border-b-2 border-primary pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Sparkles size={16} className="text-primary animate-pulse" />
                <div className="font-headline font-black text-xl uppercase tracking-tighter text-primary">
                  MANIFESTO 00 // THE SUPREME ARTIFICE
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 border-2 border-primary hover:bg-[#8a752b] hover:text-white hover:border-[#8a752b] transition-colors duration-150 cursor-pointer"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Manifesto Content */}
            <div className="flex-grow overflow-y-auto pr-2 space-y-6 hide-scrollbar max-h-[55vh] text-primary">
              <div className="font-mono text-[10px] uppercase text-neutral-500 tracking-widest border-b border-primary/20 pb-2">
                DOCUMENT PROTOCOL REF: ARTIFICE-MAXIMA // PRINT & SYNTHETIC
                REALMS
              </div>

              {/* Hook */}
              <div className="border-l-4 border-primary pl-4 py-1 italic font-body text-base text-neutral-800">
                "Reality is a canvas waiting for the brush of deliberate
                exaggeration. True art does not imitate nature; it constructs a
                more seductive surrogate."
              </div>

              {/* Main Text */}
              <div className="font-body text-sm leading-relaxed space-y-4 text-neutral-900">
                <p>
                  We reject the standard dogmas of naturalism and the mundane.
                  The ultimate destiny of human creation is the absolute
                  elevation of <strong>Artifice</strong>—the deliberate,
                  flawless construction of simulated experiences so pure, so
                  detailed, and so robust that they supersede the physical world
                  itself.
                </p>
                <p>
                  We realize this peak condition of hyper-reality across two
                  contrasting yet beautifully symmetric domains: the ancient
                  permanence of <strong>Print Media</strong>, and the infinite
                  digital tapestries of{' '}
                  <strong>
                    Massively Multiplayer Online Role-Playing Games (MMORPGs)
                  </strong>
                  .
                </p>
              </div>

              {/* Column/Feature Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Print Column */}
                <div className="border-2 border-primary p-4 bg-surface-container-lowest hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen size={16} className="text-primary" />
                    <h4 className="font-headline font-black text-xs uppercase tracking-wider">
                      I. PRINT MEDIA
                    </h4>
                  </div>
                  <p className="font-body text-xs text-neutral-700 leading-relaxed">
                    The physically bound, absolute monument. High-contrast ink
                    on heavy textured cotton stock. Through deep debossing, foil
                    block printing, and perfect spot varnishes, print becomes a
                    tangible illusion. It frozen-frames our designed realities
                    in space and time, rendering the artificial immutable.
                  </p>
                </div>

                {/* MMORPG Column */}
                <div className="border-2 border-primary p-4 bg-surface-container-lowest hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cpu size={16} className="text-primary" />
                    <h4 className="font-headline font-black text-xs uppercase tracking-wider">
                      II. THE MMORPG
                    </h4>
                  </div>
                  <p className="font-body text-xs text-neutral-700 leading-relaxed">
                    The infinite sandbox of dynamic simulation. A coordinate
                    system built on pure logic, hosting economies, mythologies,
                    and communities. In these endless virtual architectures, we
                    construct fully realized cyber-societies where the
                    artificial becomes lived, collaborative experience.
                  </p>
                </div>
              </div>

              {/* Closing statement */}
              <div className="font-body text-sm leading-relaxed text-neutral-900">
                <p>
                  Between the heavy ink of the physical book and the millions of
                  rendering threads of the digital server, we find our sacred
                  calling. We do not build to assist reality; we build to
                  outshine it.
                </p>
              </div>
            </div>

            {/* Footer Diagnostic Info matching Search panel */}
            <div className="border-t-2 border-primary pt-4 mt-6 font-mono text-[9px] text-on-surface-variant space-y-1">
              <div className="flex justify-between">
                <span>SYSTEM ID: MANIFESTO_SECURE_VAULT_00</span>
                <span className="text-neutral-500 animate-pulse">
                  ● PROTOCOL ARTIFACT INGEST ACTIVE
                </span>
              </div>
              <div className="text-neutral-400">
                MISSION STATEMENT: EXTREME ARTIFICE VIA DUAL-VECTOR ARCHITECTURE
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
