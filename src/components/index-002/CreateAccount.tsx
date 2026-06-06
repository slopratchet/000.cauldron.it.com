import React, { useState } from 'react';
import {
  UserPlus,
  Shield,
  Moon,
  AlignLeft,
  Info,
  Trophy,
  CheckCircle,
} from 'lucide-react';

interface CreateAccountProps {
  onBack: () => void;
}

export default function CreateAccount({ onBack }: CreateAccountProps) {
  const [charName, setCharName] = useState<string>('');
  const [breed, setBreed] = useState<string>('Homid');
  const [tribe, setTribe] = useState<string>('Children of Gaia');
  const [auspice, setAuspice] = useState<string>('Ahroun (Warrior)');
  const [attributes, setAttributes] = useState({
    physical: 3,
    social: 2,
    mental: 2,
  });
  const [pointsRemaining, setPointsRemaining] = useState<number>(4);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const tribes = [
    'Children of Gaia',
    'Get of Fenris',
    'Shadow Lords',
    'Silver Fangs',
    'Bone Gnawers',
    'Black Furies',
  ];

  const auspices = [
    'Ragabash (New Moon // Trickster)',
    'Theurge (Crescent Moon // Shaman)',
    'Philodox (Half Moon // Judge)',
    'Galliard (Gibbous Moon // Bard)',
    'Ahroun (Full Moon // Warrior)',
  ];

  const adjustAttribute = (
    attr: 'physical' | 'social' | 'mental',
    amount: number,
  ) => {
    const val = attributes[attr];
    if (amount > 0 && pointsRemaining > 0 && val < 5) {
      setAttributes((prev) => ({ ...prev, [attr]: val + 1 }));
      setPointsRemaining((prev) => prev - 1);
    } else if (amount < 0 && val > 1) {
      setAttributes((prev) => ({ ...prev, [attr]: val - 1 }));
      setPointsRemaining((prev) => prev + 1);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!charName.trim()) return;
    setIsRegistered(true);
  };

  return (
    <div className="border-4 border-[#1b1b1b] bg-[#fdfbf7] p-6 text-[#1b1b1b] shadow-[4px_4px_0px_0px_rgba(27,27,27,1)] md:p-8">
      {/* Top Banner Navigation */}
      <div className="mb-6 flex flex-col justify-between border-b-2 border-[#1b1b1b] pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold tracking-widest text-neutral-500 font-mono">
            SYS_REG:// REGISTER_CHARACTER
          </span>
          <h2 className="font-accent text-3xl uppercase tracking-wider text-[#1b1b1b]">
            CHARACTER REGISTRY INTERFACE
          </h2>
        </div>
        <button
          onClick={onBack}
          className="mt-2 cursor-pointer border border-[#1b1b1b] bg-white px-3 py-1 font-mono text-xs font-bold uppercase hover:bg-neutral-100 sm:mt-0 active:translate-y-0.5"
        >
          [ ESC // CANCEL ]
        </button>
      </div>

      {isRegistered ? (
        <div className="text-center py-10 space-y-6">
          <div className="inline-flex h-14 w-14 items-center justify-center border-2 border-emerald-600 bg-emerald-50 text-emerald-600">
            <CheckCircle className="h-8 w-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-emerald-600 uppercase">
              REGISTRATION SUCCESSFUL
            </span>
            <h3 className="font-accent text-4xl uppercase tracking-wider">
              WELCOME TO GAIA'S REBEL ARMY
            </h3>
            <p className="font-serif text-neutral-600 max-w-md mx-auto">
              Your files have been committed to the 1970 Chronos Systems manual
              register. Your pack is assembled.
            </p>
          </div>

          {/* Dossier Card display */}
          <div className="border-2 border-[#1b1b1b] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(212,74,0,1)] max-w-md mx-auto text-left font-mono text-xs space-y-4">
            <div className="border-b-2 border-neutral-200 pb-2 flex justify-between items-center">
              <span className="font-bold text-[#1b1b1b] uppercase">
                CHAR_DOSSIER: // {charName.toUpperCase()}
              </span>
              <span className="bg-blood-red px-1.5 py-0.5 text-[9px] text-white font-bold uppercase">
                INIT_OK
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 uppercase">
              <div className="space-y-0.5">
                <p className="text-[10px] text-neutral-400">BREED STATUS</p>
                <p className="font-bold">{breed}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] text-neutral-400">
                  TRIBAL AFFILIATION
                </p>
                <p className="font-bold text-blood-red">{tribe}</p>
              </div>
              <div className="space-y-0.5 col-span-2">
                <p className="text-[10px] text-neutral-400">
                  AUSPICE (BIRTH MOON)
                </p>
                <p className="font-bold">{auspice}</p>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-neutral-200 pt-3 space-y-2">
              <p className="text-xs font-bold uppercase text-neutral-500">
                STARTING ATTRIBUTES:
              </p>
              <div className="space-y-1.5 uppercase font-bold text-[10px]">
                <div className="flex items-center justify-between">
                  <span>PHYSICAL (STRENGTH / DEXTERITY)</span>
                  <span className="text-sm">
                    {'●'.repeat(attributes.physical)}
                    {'○'.repeat(5 - attributes.physical)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SOCIAL (CHARISMA / MANIPULATION)</span>
                  <span className="text-sm">
                    {'●'.repeat(attributes.social)}
                    {'○'.repeat(5 - attributes.social)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>MENTAL (INTELLIGENCE / PERCEPTION)</span>
                  <span className="text-sm">
                    {'●'.repeat(attributes.mental)}
                    {'○'.repeat(5 - attributes.mental)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#e6e2d8]/30 p-2.5 text-[9px] text-neutral-500 uppercase leading-relaxed font-sans">
              <strong>OPERATIVE DIRECTIVE:</strong> Ready to take action?
              Navigate back to the Index, choose Chapters to learn tactics, or
              roll d10 pools to resolve conflicts.
            </div>
          </div>

          <button
            onClick={() => {
              setIsRegistered(false);
              setCharName('');
              setAttributes({ physical: 3, social: 2, mental: 2 });
              setPointsRemaining(4);
            }}
            className="cursor-pointer border border-[#1b1b1b] bg-white px-5 py-2 font-mono text-xs font-bold uppercase hover:bg-neutral-100 active:translate-y-0.5"
          >
            CREATE ANOTHER OPERATIVE
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleRegister}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 mt-4 text-xs font-mono"
        >
          {/* Left Side: Detail inputs */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="flex items-center gap-2 border-b border-[#1b1b1b]/10 pb-2 text-sm font-bold uppercase tracking-wider text-neutral-700">
              <Shield className="h-4 w-4" /> Personal Dossier
            </h3>

            {/* Character Name */}
            <div className="space-y-1.5">
              <label
                id="character-name-label"
                className="font-bold text-[#1b1b1b]/80 uppercase"
              >
                CHARACTER NAME / CALLSIGN:
              </label>
              <input
                id="character-name-input"
                type="text"
                required
                maxLength={25}
                placeholder="E.G. SILVERSHARD, SHADOWCLAW..."
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
                className="w-full border-2 border-[#1b1b1b] bg-white p-3 text-sm font-bold uppercase outline-none focus:border-blood-red placeholder:text-neutral-400"
              />
            </div>

            {/* Breed Status Choice */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#1b1b1b]/80 uppercase">
                BREED ORIGIN:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Homid', 'Metis', 'Lupus'].map((b) => (
                  <button
                    key={b}
                    id={`breed-option-${b}`}
                    type="button"
                    onClick={() => setBreed(b)}
                    className={`cursor-pointer border-2 py-2.5 font-bold uppercase tracking-wider text-center ${
                      breed === b
                        ? 'border-blood-red bg-[#1b1b1b] text-white'
                        : 'border-[#1b1b1b] bg-white hover:bg-neutral-50'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-neutral-400 italic">
                {breed === 'Homid' &&
                  'BORN HUMAN - High initial adaptability & technology affinity.'}
                {breed === 'Metis' &&
                  'BORN IN BREED - Grew up in Werewolf society, high initial laws focus.'}
                {breed === 'Lupus' &&
                  'BORN A WILD WOLF - Incredibly sharp physical instincts & spiritual links.'}
              </p>
            </div>

            {/* Select Tribe Dropdown */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#1b1b1b]/80 uppercase">
                TRIBAL ALIGNMENT:
              </label>
              <select
                id="tribe-dropdown"
                value={tribe}
                onChange={(e) => setTribe(e.target.value)}
                className="w-full border-2 border-[#1b1b1b] bg-white p-3 font-mono font-bold uppercase outline-none focus:border-blood-red"
              >
                {tribes.map((t) => (
                  <option key={t} value={t}>
                    {t.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Auspice Moon Phase */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#1b1b1b]/80 uppercase">
                AUSPICE (BIRTH MOON PATRONAGE):
              </label>
              <div className="border border-[#1b1b1b]/10 p-3 bg-[#e6e2d8]/20 flex gap-3 text-[11px] text-neutral-600 mb-1 leading-normal">
                <Moon className="h-5 w-5 shrink-0 mt-0.5 text-amber-500" />
                <span>
                  The phase of the moon directly during your birth dictates your
                  primary spiritual role, your initial gifts, and Rage
                  thresholds.
                </span>
              </div>
              <div className="space-y-1">
                {auspices.map((a) => (
                  <label
                    key={a}
                    className="flex cursor-pointer items-center gap-2 border border-neutral-300 bg-white p-2.5 hover:bg-neutral-50"
                  >
                    <input
                      id={`auspice-option-${a}`}
                      type="radio"
                      name="auspice"
                      checked={auspice === a}
                      onChange={() => setAuspice(a)}
                      className="accent-[#1b1b1b]"
                    />
                    <span className="font-bold text-neutral-700">{a}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Attribute Points Allocator */}
          <div className="lg:col-span-5 flex flex-col justify-between border-t-2 border-neutral-200 pt-6 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-6">
            <div className="space-y-6">
              <div className="flex justify-between items-baseline border-b border-[#1b1b1b]/10 pb-2">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-700">
                  <AlignLeft className="h-4 w-4" /> Attributes allocation
                </h3>
                <span className="bg-blood-red px-2 py-0.5 text-[10px] font-bold text-white uppercase animate-pulse">
                  {pointsRemaining} PT REG REMAINING
                </span>
              </div>

              <div className="bg-parchment p-3 text-[10.5px] border border-neutral-300 text-neutral-600">
                <p className="font-bold flex gap-1 items-center mb-1 text-neutral-800">
                  <Info className="h-3.5 w-3.5 shrink-0" /> Allocation Rules:
                </p>
                Allocate starting creation points to raise attributes. Limit of
                5 maximum dots. Unallocated points must decline to 0.
              </div>

              {/* Attributes Adjusters */}
              <div className="space-y-5">
                {/* Physical */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span>PHYSICAL</span>
                    <span>{attributes.physical} DOTS</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      id="sub-physical-button"
                      type="button"
                      onClick={() => adjustAttribute('physical', -1)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-[#1b1b1b] bg-white font-bold hover:bg-neutral-100 disabled:opacity-30"
                      disabled={attributes.physical <= 1}
                    >
                      -
                    </button>
                    <div className="flex-grow flex items-center justify-center gap-1.5 text-base text-[#1b1b1b]">
                      {'●'.repeat(attributes.physical)}
                      {'○'.repeat(5 - attributes.physical)}
                    </div>
                    <button
                      id="add-physical-button"
                      type="button"
                      onClick={() => adjustAttribute('physical', 1)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-[#1b1b1b] bg-white font-bold hover:bg-neutral-100 disabled:opacity-30"
                      disabled={
                        pointsRemaining === 0 || attributes.physical >= 5
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Social */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span>SOCIAL</span>
                    <span>{attributes.social} DOTS</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      id="sub-social-button"
                      type="button"
                      onClick={() => adjustAttribute('social', -1)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-[#1b1b1b] bg-white font-bold hover:bg-neutral-100 disabled:opacity-30"
                      disabled={attributes.social <= 1}
                    >
                      -
                    </button>
                    <div className="flex-grow flex items-center justify-center gap-1.5 text-base text-[#1b1b1b]">
                      {'●'.repeat(attributes.social)}
                      {'○'.repeat(5 - attributes.social)}
                    </div>
                    <button
                      id="add-social-button"
                      type="button"
                      onClick={() => adjustAttribute('social', 1)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-[#1b1b1b] bg-white font-bold hover:bg-neutral-100 disabled:opacity-30"
                      disabled={pointsRemaining === 0 || attributes.social >= 5}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Mental */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span>MENTAL</span>
                    <span>{attributes.mental} DOTS</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      id="sub-mental-button"
                      type="button"
                      onClick={() => adjustAttribute('mental', -1)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-[#1b1b1b] bg-white font-bold hover:bg-neutral-100 disabled:opacity-30"
                      disabled={attributes.mental <= 1}
                    >
                      -
                    </button>
                    <div className="flex-grow flex items-center justify-center gap-1.5 text-base text-[#1b1b1b]">
                      {'●'.repeat(attributes.mental)}
                      {'○'.repeat(5 - attributes.mental)}
                    </div>
                    <button
                      id="add-mental-button"
                      type="button"
                      onClick={() => adjustAttribute('mental', 1)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-[#1b1b1b] bg-white font-bold hover:bg-neutral-100 disabled:opacity-30"
                      disabled={pointsRemaining === 0 || attributes.mental >= 5}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              id="submit-registration-button"
              type="submit"
              disabled={pointsRemaining > 0 || !charName}
              className="mt-8 w-full cursor-pointer border-2 border-[#1b1b1b] bg-[#1b1b1b] py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-neutral-800 disabled:bg-neutral-200 disabled:border-neutral-300 disabled:text-neutral-400 disabled:pointer-events-none shadow-[2px_2px_0px_0px_rgba(212,74,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(212,74,0,1)]"
            >
              COMMENCE REGISTRATION
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
