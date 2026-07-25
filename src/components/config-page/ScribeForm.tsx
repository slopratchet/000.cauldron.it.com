import React, { useState } from 'react';
import {
  Feather,
  Sparkles,
  Wand2,
  Sword,
  Skull,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { EntryType, TomeEntry } from './configTypes';

interface ScribeFormProps {
  onEntryScribed: (entry: TomeEntry) => void;
}

export default function ScribeForm({ onEntryScribed }: ScribeFormProps) {
  const [type, setType] = useState<EntryType>('class');
  const [prompt, setPrompt] = useState<string>('');
  const [isScribing, setIsScribing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const statusPhases = [
    'Dipping iron quill into stygian ink...',
    'Consulting heretical archives for cosmic alignment...',
    'Chanting the forbidden incantations of Aeon...',
    'Structuring skeletal attributes and dice matrices...',
    'Binding custom soul-threads onto parchment...',
  ];

  const handleScribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsScribing(true);
    setErrorMessage(null);

    // Cycle through atmospheric scribe messages
    let phaseIdx = 0;
    setStatusMessage(statusPhases[0]);
    const messageInterval = setInterval(() => {
      phaseIdx = (phaseIdx + 1) % statusPhases.length;
      setStatusMessage(statusPhases[phaseIdx]);
    }, 1500);

    try {
      const response = await fetch('/api/scribe/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, prompt }),
      });

      const data = await response.json();
      clearInterval(messageInterval);

      if (!response.ok) {
        throw new Error(data.error || "Failed to contact the Scribe's Pool.");
      }

      onEntryScribed(data);
      setPrompt('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "An unholy disruption occurred in the Scribe's network.",
      );
    } finally {
      clearInterval(messageInterval);
      setIsScribing(false);
    }
  };

  const samplePrompts: Record<EntryType, string[]> = {
    class: [
      'Astral Cartographer who maps dying stars to open wormholes',
      'Grave Sentinel wielding a heavy bell that deafens foes',
      'Blood Siphon who drains vital fluids to power steam gears',
    ],
    spell: [
      'Void Singularity that collapses into a crushing gravitational bead',
      'Cosmic Stasis which freezes targets inside a pocket dimension',
      'Echoes of the Unborn which summons ethereal wailing shades',
    ],
    beast: [
      'Void Leviathan made of black glass shards that float on stardust',
      'Ash Devourer that feeds on wooden structures and light waves',
      'Shattered Husk possessing the armor of a forgotten paladin king',
    ],
    relic: [
      'Chronos Hourglass whose black sand flows in reverse to undo destiny',
      'Crown of Thorns forged from deep-space meteoric iron',
      'Sovereign Core that hums with the residual noise of a shattered star',
    ],
  };

  return (
    <div className="border-2 border-primary bg-background-light dark:bg-background-dark text-primary dark:text-white p-6 flex flex-col gap-4">
      <div className="border-b-2 border-primary dark:border-white pb-3">
        <h2 className="font-display font-black text-2xl uppercase tracking-widest flex items-center gap-2">
          <Feather className="w-6 h-6 animate-pulse" /> Scribe of Aeon
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-wide opacity-75 mt-1">
          Unleash Gemini to weave custom heretical scrolls into the index
        </p>
      </div>

      {isScribing ? (
        <div className="py-12 px-4 flex flex-col items-center justify-center text-center gap-4 border-2 border-dashed border-primary/40 dark:border-white/40 bg-white/40 dark:bg-black/20">
          <div className="w-16 h-16 border-4 border-primary dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
          <p className="font-serif italic text-lg text-primary dark:text-white animate-pulse">
            {statusMessage}
          </p>
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary/50 dark:text-white/50">
            Communicating with the Deep Void...
          </span>
        </div>
      ) : (
        <form onSubmit={handleScribe} className="flex flex-col gap-4">
          {/* Select Category */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-black uppercase tracking-wider">
              1. Choose Entry Blueprint
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['class', 'spell', 'beast', 'relic'] as EntryType[]).map(
                (blueprint) => {
                  const isSelected = type === blueprint;
                  const Icon =
                    blueprint === 'class'
                      ? Sword
                      : blueprint === 'spell'
                        ? Wand2
                        : blueprint === 'beast'
                          ? Skull
                          : Sparkles;

                  return (
                    <button
                      key={blueprint}
                      type="button"
                      onClick={() => setType(blueprint)}
                      className={`py-2.5 px-2 border-2 border-primary dark:border-white font-display font-bold uppercase text-xs flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-background-light dark:bg-white dark:text-background-dark'
                          : 'hover:bg-primary/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{blueprint}</span>
                    </button>
                  );
                },
              )}
            </div>
          </div>

          {/* Prompt input */}
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs font-black uppercase tracking-wider">
                2. Whisper Raw Idea to Scribe
              </label>
              <div className="group relative cursor-pointer flex items-center">
                <HelpCircle className="w-4 h-4 opacity-55" />
                <div className="absolute right-0 bottom-6 w-64 p-3 bg-primary text-background-light dark:bg-white dark:text-primary font-serif text-xs leading-normal hidden group-hover:block border border-primary z-50 shadow-md">
                  Provide a brief prompt (e.g. "Chrono mage", "Void Leviathan").
                  Gemini will generate full descriptions, stats, quotes, and
                  playable actions.
                </div>
              </div>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`e.g., ${samplePrompts[type][0]}`}
              rows={3}
              required
              className="border-2 border-primary dark:border-white bg-white dark:bg-black/30 p-3 font-serif text-sm focus:outline-none focus:ring-0 w-full resize-none placeholder-primary/40 dark:placeholder-white/40 text-primary dark:text-white"
            />
          </div>

          {/* Custom suggestions triggers */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-primary/60 dark:text-white/60">
              Suggested seeds:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts[type].map((seed, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(seed)}
                  className="text-[10px] font-serif border border-primary/20 dark:border-white/20 px-2 py-0.5 rounded-full hover:border-primary dark:hover:border-white hover:bg-primary/5 dark:hover:bg-white/5 transition-colors truncate max-w-full text-left"
                >
                  "{seed}"
                </button>
              ))}
            </div>
          </div>

          {/* Scribe Action Button */}
          <button
            type="submit"
            disabled={!prompt.trim()}
            className="w-full py-3 bg-primary text-background-light dark:bg-white dark:text-background-dark border-2 border-primary dark:border-white font-display font-black uppercase text-sm tracking-widest hover:bg-white hover:text-primary dark:hover:bg-background-dark dark:hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2 mt-2"
          >
            <Feather className="w-4 h-4" />
            <span>Scribe Custom Entry</span>
          </button>
        </form>
      )}

      {/* Error Message display */}
      {errorMessage && (
        <div className="border-2 border-rose-600 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 p-3 flex items-start gap-2 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold uppercase mb-0.5">Unholy Intrusion</div>
            <div>{errorMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
}
