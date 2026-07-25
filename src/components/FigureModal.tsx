import React, { useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Watch } from '../types';

interface FigureModalProps {
  watch: Watch | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FigureModal({
  watch,
  isOpen,
  onClose,
}: FigureModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!watch) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between p-4 md:p-8">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-lg cursor-zoom-out"
          />

          {/* Absolute Close Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-20"
          >
            <button
              onClick={onClose}
              className="p-2 border-2 border-white/20 bg-black/40 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center shadow-lg"
              aria-label="Close figure panel"
            >
              <X size={20} />
            </button>
          </motion.div>

          {/* Main Focused Image Container */}
          <div className="relative z-10 flex-grow flex items-center justify-center p-2 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-full max-h-[90vh] flex flex-col items-center justify-center"
            >
              <img
                src={watch.image}
                alt={`${watch.name} blueprint`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[78vh] object-contain shadow-[0_0_50px_rgba(255,255,255,0.05)] border-4 border-white/10"
              />

              {/* Bold White Title under Pop-up Image */}
              <div className="mt-4 text-center max-w-xl px-4">
                <h3 className="font-mono text-lg md:text-2xl font-bold text-white uppercase tracking-wider">
                  {watch.figNum ? `${watch.figNum}: ` : ''}
                  {watch.name}
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
