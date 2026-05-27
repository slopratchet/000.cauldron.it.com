import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Dices,
  Plus,
  Edit3,
  Check,
  X,
  Printer,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Character, Talent, RollLog } from './types';
import {
  PRESET_CHARACTERS,
  TALENTS_TEMPLATES,
  CASTES,
  HOMELANDS,
  ARCHETYPES,
} from './data';

export default function CharacterSheet() {
  // --- STATE ---
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedId, setSelectedId] = useState<string>('CIMMERIAN_001');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Character creation form state
  const [newCharName, setNewCharName] = useState('');
  const [newCharAgeGender, setNewCharAgeGender] = useState('25 / MALE');
  const [newCharCaste, setNewCharCaste] = useState(CASTES[0]);
  const [newCharArchetype, setNewCharArchetype] = useState(ARCHETYPES[0]);
  const [newCharEducation, setNewCharEducation] = useState(
    'SURVIVAL OF THE FITTEST',
  );
  const [newCharHomeland, setNewCharHomeland] = useState(HOMELANDS[0]);
  const [newCharLanguages, setNewCharLanguages] = useState('CIMMERIAN');
  const [newCharQuote, setNewCharQuote] = useState(
    'A traveler of desolate paths...',
  );
  const [newCharAppearance, setNewCharAppearance] = useState(
    'Tall and rugged with sharp features...',
  );
  const [newCharWarStory, setNewCharWarStory] = useState(
    'Surviving local skirmishes on the borders...',
  );
  const [newCharPortraitUrl, setNewCharPortraitUrl] = useState('');
  const [newCharBannerUrl, setNewCharBannerUrl] = useState('');

  // Sheet Edit values
  const [editChar, setEditChar] = useState<Character | null>(null);

  // Dice roller state
  const [slideIndex, setSlideIndex] = useState(0);

  // Load characters on init
  useEffect(() => {
    const saved = localStorage.getItem('cimmerian_characters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setCharacters(parsed);
          setSelectedId(parsed[0].id);
          return;
        }
      } catch (e) {
        console.error('Failed to parse characters', e);
      }
    }
    // Fallback to presets
    setCharacters(PRESET_CHARACTERS);
    setSelectedId('CIMMERIAN_001');
  }, []);

  // Save characters to localStorage
  const saveToStorage = (updatedList: Character[]) => {
    setCharacters(updatedList);
    localStorage.setItem('cimmerian_characters', JSON.stringify(updatedList));
  };

  const selectedChar =
    characters.find((c) => c.id === selectedId) ||
    characters[0] ||
    PRESET_CHARACTERS[0];

  // Start edit flow
  const handleStartEdit = () => {
    if (!selectedChar) return;
    setEditChar(JSON.parse(JSON.stringify(selectedChar))); // deep copy
    setIsEditing(true);
  };

  // Save edit flow
  const handleSaveEdit = () => {
    if (!editChar) return;
    const updated = characters.map((c) =>
      c.id === editChar.id ? editChar : c,
    );
    saveToStorage(updated);
    setIsEditing(false);
    setEditChar(null);
  };

  // Add a Talent to editing character
  const handleAddTalentToEditing = (template: {
    category: string;
    skillAffiliation: string;
    effect: string;
  }) => {
    if (!editChar) return;
    const newTalent: Talent = {
      id: 't_' + Date.now(),
      category: template.category,
      skillAffiliation: template.skillAffiliation,
      rank: 2,
      effect: template.effect,
    };
    setEditChar({
      ...editChar,
      talents: [...editChar.talents, newTalent],
    });
  };

  // Remove Talent from editing character
  const handleRemoveTalentFromEditing = (talentId: string) => {
    if (!editChar) return;
    setEditChar({
      ...editChar,
      talents: editChar.talents.filter((t) => t.id !== talentId),
    });
  };

  // Handle value change in editing character
  const handleEditFieldChange = (
    key: keyof Character,
    value: string | number,
  ) => {
    if (!editChar) return;
    setEditChar({
      ...editChar,
      [key]: value,
    });
  };

  // Handle talent property change
  const handleEditTalentChange = (
    talentId: string,
    key: keyof Talent,
    value: string | number,
  ) => {
    if (!editChar) return;
    const updatedTalents = editChar.talents.map((t) => {
      if (t.id === talentId) {
        return { ...t, [key]: value };
      }
      return t;
    });
    setEditChar({
      ...editChar,
      talents: updatedTalents,
    });
  };

  // Create character flow
  const handleCreateCharacter = (e: FormEvent) => {
    e.preventDefault();
    if (!newCharName.trim()) return;

    const fallbackPortrait =
      newCharPortraitUrl.trim() ||
      'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&q=80&w=600';
    const fallbackBanner =
      newCharBannerUrl.trim() ||
      'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80&w=1200';

    const newChar: Character = {
      id: 'HERO_' + Date.now().toString(36).toUpperCase(),
      name: newCharName.toUpperCase(),
      expTotal: 10000,
      expSpent: 8000,
      ageAndGender: newCharAgeGender,
      caste: newCharCaste,
      archetype: newCharArchetype,
      education: newCharEducation,
      homeland: newCharHomeland,
      languages: newCharLanguages,
      appearance: newCharAppearance,
      warStory: newCharWarStory,
      quote: newCharQuote,
      fortuneCurrent: 3,
      fortuneMax: 5,
      renown: 50,
      standing: 10,
      fatigue: '--',
      portraitUrl: fallbackPortrait,
      bannerUrl: fallbackBanner,
      talents: [
        {
          id: 't_init_' + Date.now(),
          category: 'HOMELAND',
          skillAffiliation: 'SURVIVAL',
          rank: 2,
          effect:
            'OUTLANDER: Advantage on foraging and navigating foreign frontiers.',
        },
      ],
      isCustom: true,
    };

    const updated = [...characters, newChar];
    saveToStorage(updated);
    setSelectedId(newChar.id);
    setIsCreating(false);

    // Reset fields
    setNewCharName('');
    setNewCharAgeGender('25 / MALE');
    setNewCharQuote('A traveler of desolate paths...');
    setNewCharAppearance('Tall and rugged with sharp features...');
    setNewCharWarStory('Surviving local skirmishes on the borders...');
    setNewCharPortraitUrl('');
    setNewCharBannerUrl('');
  };
  // Reset to default presets
  const handleResetToPresets = () => {
    const confirmed = window.confirm(
      'Reset character archives to standard default presets (Conan, Valeria, Subotai)? All unsaved custom progress will be wiped.',
    );
    if (!confirmed) return;
    saveToStorage(PRESET_CHARACTERS);
    setSelectedId('CIMMERIAN_001');
    setIsEditing(false);
    setIsCreating(false);
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(characters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `Cimmerian_Character_Archive_${new Date().toISOString().slice(0, 10)}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON helper
  const handleImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0) {
            saveToStorage(parsed);
            setSelectedId(parsed[0].id);
            alert('Character archive successfully imported!');
          } else {
            alert(
              'Could not process file: Data is not a valid character sheet list.',
            );
          }
        } catch {
          alert(
            'Error parsing JSON file. Please ensure it follows correct schema.',
          );
        }
      };
    }
  };

  // --- DICE ROLLER LOGGER ENGINE ---
  const handleRollDice = (
    expression: string,
    label: string = 'Custom Roll',
    subtext?: string,
  ) => {
    // Basic parser for expressions like "2d20", "1d20", "3d6 + 2", "1d100", etc.
    const cleanExpr = expression.toLowerCase().replace(/\s+/g, '');
    const diceRegex = /^(\d+)d(\d+)(?:([+-]\d+))?$/;
    const match = cleanExpr.match(diceRegex);

    let numDice = 1;
    let dieSize = 20;
    let modifier = 0;

    if (match) {
      numDice = parseInt(match[1]);
      dieSize = parseInt(match[2]);
      if (match[3]) {
        modifier = parseInt(match[3]);
      }
    } else {
      // Direct d20 fallback if they just pass "d20"
      if (cleanExpr === 'd20') {
        numDice = 1;
        dieSize = 20;
      } else {
        // Just roll 1d20 if format is unrecognized
        numDice = 1;
        dieSize = 20;
      }
    }

    const rolls: number[] = [];
    for (let i = 0; i < numDice; i++) {
      rolls.push(Math.floor(Math.random() * dieSize) + 1);
    }

    const sum = rolls.reduce((a, b) => a + b, 0) + modifier + customModifier;

    // Custom game resolution rules for immersive feeling
    let resultText = `Total Score: ${sum}`;
    let flavor = subtext || '';

    if (dieSize === 20) {
      // 2d20 Conan themed checks: count successes (lower is better, typically under skill rating)
      // Let's assume a default attribute rating threshold of 12 for high-stakes actions
      const threshold = 12;
      const successes =
        rolls.filter((r) => r <= threshold).length +
        rolls.filter((r) => r === 1).length; // 1s count as double successes
      const complications = rolls.filter((r) => r === 20).length;

      if (numDice === 2) {
        resultText = `${successes} Success${successes === 1 ? '' : 'es'} vs TN ${threshold} (Rolls: ${rolls.join(', ')})`;
        if (complications > 0) {
          resultText += ` • ${complications} COMPLICATION!`;
          flavor =
            'The shadow of ill destiny deepens as fate works against your motion.';
        } else if (successes >= 3) {
          flavor =
            'CRITICAL SUCCESS! Erlik smiles upon your swift, violent stroke!';
        } else if (successes === 0) {
          flavor =
            'Missed opportunity! The cold winds of Cimmeria howl in silence.';
        } else {
          flavor = 'Success! Blade and grit carve the pathway forward.';
        }
      } else if (numDice === 1) {
        const roll = rolls[0];
        resultText = `Rolled ${roll}${modifier + customModifier >= 0 ? '+' : ''}${modifier + customModifier} = ${sum}`;
        if (roll === 1) {
          flavor = 'CRITICAL THREAT! Perfect action achieved!';
        } else if (roll === 20) {
          flavor = 'FUMBLE! Destiny takes a hazardous twist.';
        }
      }
    } else if (dieSize === 6) {
      // Combat dice roll (Conan system gives effects on 5 and 6)
      const effects = rolls.filter((r) => r === 5 || r === 6).length;
      resultText = `Damage Score: ${sum} (Rolls: ${rolls.join(', ')})`;
      if (effects > 0) {
        flavor = `Triggered ${effects} Weapon Effect${effects > 1 ? 's' : ''}! Bleeding, Piercing or Cleaving damage activated!`;
      } else {
        flavor = 'Impact delivered! Pure barbaric force crashes down.';
      }
    }

    const newLog: RollLog = {
      id: 'roll_' + Date.now() + Math.random().toString(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      characterName: selectedChar.name,
      label,
      expression: `${expression}${customModifier ? (customModifier > 0 ? ` + ${customModifier}` : ` - ${Math.abs(customModifier)}`) : ''}`,
      rolls,
      modifier: modifier + customModifier,
      resultText,
      flavor,
    };

    setRollLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };
  // Adjust fortune point counter live
  const handleAdjustFortune = (amount: number) => {
    const updated = characters.map((c) => {
      if (c.id === selectedId) {
        const nextVal = Math.max(
          0,
          Math.min(c.fortuneMax, c.fortuneCurrent + amount),
        );
        return { ...c, fortuneCurrent: nextVal };
      }
      return c;
    });
    saveToStorage(updated);
  };

  const activeChar = isEditing && editChar ? editChar : selectedChar;

  const slides = [
    '/img/001.png',
    '/img/002.png',
    '/img/003.png',
    '/img/004.png',
    '/img/005.png',
  ];

  return (
    <div className="bg-[#fcf9f8] text-[#1b1c1c] min-h-screen flex flex-col font-sans overflow-x-hidden p-3 md:p-8 relative">
      {/* Dynamic Ambient Mesh Behind Page */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* --- RECONSTRUCTED HERO TITLE BANNER BRAND (NO PRINT) --- */}
      <header className="w-full px-4 md:px-8 mx-auto mb-6 no-print border-b border-[#1b1c1c]/10 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 relative z-20">
        <div className="flex items-center gap-3">
          <div className="bg-black text-[#fcf9f8] p-2 flex items-center justify-center font-mono font-bold leading-none select-none">
            ⚔️ TTRPG
          </div>
          <div>
            <h1 className="font-mono text-xs tracking-widest text-[#1b1c1c]/70 uppercase leading-none mb-1">
              Chronos Systems Interface
            </h1>
            <p className="font-serif text-lg font-bold leading-none tracking-tight">
              1970s Character Sheet Companion
            </p>
          </div>
        </div>

        {/* Dashboard Actions Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Character selection list */}
          <div className="flex items-center bg-[#f0eded] border border-black/20 p-0.5">
            <span className="text-[10px] font-mono uppercase text-[#1b1c1c]/60 px-2">
              Hero
            </span>
            <select
              value={selectedId}
              onChange={(e) => {
                setSelectedId(e.target.value);
                setIsEditing(false);
              }}
              className="bg-transparent border-0 py-1 pl-1 pr-8 text-xs font-mono font-bold uppercase focus:ring-0 cursor-pointer text-[#1b1c1c]"
            >
              {characters.map((char) => (
                <option
                  key={char.id}
                  value={char.id}
                  className="bg-[#fcf9f8] lowercase font-mono"
                >
                  {char.name} [{char.caste.split('-')[0].split(' ')[0]}]
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            title="Create New Hero"
            className="bg-black text-[#fcf9f8] hover:bg-neutral-800 transition-colors p-2 flex items-center gap-1.5 text-xs font-mono font-bold uppercase"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Forge</span>
          </button>

          {!isEditing ? (
            <button
              onClick={handleStartEdit}
              className="border-2 border-black px-3 py-1.5 flex items-center gap-1.5 text-xs font-mono font-bold uppercase hover:bg-black hover:text-[#fcf9f8] transition-all bg-[#fcf9f8] cursor-pointer"
            >
              <Edit3 size={14} />
              <span>Modify</span>
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={handleSaveEdit}
                className="bg-emerald-800 text-white px-3 py-1.5 flex items-center gap-1.5 text-xs font-mono font-bold uppercase hover:bg-emerald-950 transition-colors cursor-pointer"
              >
                <Check size={14} />
                <span>Save Sheet</span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditChar(null);
                }}
                className="bg-red-800 text-white px-3 py-1.5 flex items-center gap-1.5 text-xs font-mono font-bold uppercase hover:bg-red-950 transition-colors cursor-pointer"
              >
                <X size={14} />
                <span>Cancel</span>
              </button>
            </div>
          )}

          <div className="border-l border-black/20 h-6 mx-1 hidden lg:block"></div>

          {/* Prints Sheet */}
          <button
            onClick={() => window.print()}
            title="Print Character Card (Tome Friendly Layout)"
            className="p-2 border border-black/30 hover:border-black hover:bg-[#f0eded] transition-all text-[#1b1c1c]/80 hover:text-black cursor-pointer bg-[#fcf9f8]"
          >
            <Printer size={16} />
          </button>

          {/* Backup Options */}
          <button
            onClick={handleExportJSON}
            title="Export Characters JSON"
            className="p-2 border border-black/30 hover:border-black hover:bg-[#f0eded] transition-all text-[#1b1c1c]/80 hover:text-black cursor-pointer bg-[#fcf9f8]"
          >
            <Download size={16} />
          </button>

          <label
            title="Import Characters JSON"
            className="p-2 border border-black/30 hover:border-black hover:bg-[#f0eded] transition-all text-[#1b1c1c]/80 hover:text-black cursor-pointer bg-[#fcf9f8]"
          >
            <Upload size={16} />
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>

          {/* Dangerous Settings Reset */}
          <button
            onClick={handleResetToPresets}
            title="Restore Defaults"
            className="p-2 border border-red-800/30 hover:border-red-600 hover:bg-red-50 text-red-800 transition-all cursor-pointer bg-[#fcf9f8]"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </header>

      {/* --- CHARACTER CREATION MODAL/PANEL (NO PRINT) --- */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/70 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 no-print">
          <div className="bg-[#fcf9f8] border-4 border-black w-full max-w-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setIsCreating(false)}
              className="absolute top-4 right-4 bg-black text-[#fcf9f8] p-1.5 focus:outline-none"
            >
              <X size={18} />
            </button>

            <div className="border-b-4 border-black pb-3 mb-6">
              <span className="text-xs font-mono tracking-widest text-[#1b1c1c]/50">
                THE BLOOD AND THE IRON
              </span>
              <h2 className="text-3xl font-bold uppercase tracking-tighter">
                Forge Hero Character
              </h2>
            </div>

            <form onSubmit={handleCreateCharacter} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Character Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VALERIA, COG HAN"
                    value={newCharName}
                    onChange={(e) => setNewCharName(e.target.value)}
                    className="w-full bg-[#f0eded] border border-black p-2 font-mono font-bold uppercase focus:ring-1 focus:ring-black focus:outline-none text-sm placeholder:text-black/30"
                  />
                </div>

                {/* Age & Gender */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Age & Gender
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 27 / MALE, 21 / FEMALE"
                    value={newCharAgeGender}
                    onChange={(e) => setNewCharAgeGender(e.target.value)}
                    className="w-full bg-[#f0eded] border border-black p-2 font-mono uppercase focus:ring-1 focus:ring-black focus:outline-none text-sm"
                  />
                </div>

                {/* Caste Select */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Caste / Trade
                  </label>
                  <select
                    value={newCharCaste}
                    onChange={(e) => {
                      setNewCharCaste(e.target.value);
                      if (e.target.value === 'WARRIOR-HERDMAN') {
                        setNewCharEducation('SURVIVAL OF THE FITTEST');
                      } else if (e.target.value === 'MERCENARY CAPTAIN') {
                        setNewCharEducation('BROTHERHOOD OF THE SWORD');
                      }
                    }}
                    className="w-full bg-[#f0eded] border border-black p-2 font-mono font-bold uppercase focus:ring-1 focus:ring-black focus:outline-none text-sm text-[#1b1c1c]"
                  >
                    {CASTES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Archetype Select */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Archetype Class
                  </label>
                  <select
                    value={newCharArchetype}
                    onChange={(e) => setNewCharArchetype(e.target.value)}
                    className="w-full bg-[#f0eded] border border-black p-2 font-mono font-bold uppercase focus:ring-1 focus:ring-black focus:outline-none text-sm text-[#1b1c1c]"
                  >
                    {ARCHETYPES.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Homeland Select */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Homeland
                  </label>
                  <select
                    value={newCharHomeland}
                    onChange={(e) => {
                      setNewCharHomeland(e.target.value);
                      if (e.target.value === 'CIMMERIA') {
                        setNewCharLanguages('CIMMERIAN, AQUILONIAN');
                      } else if (e.target.value === 'AQUILONIA') {
                        setNewCharLanguages('AQUILONIAN, BOSSONIAN');
                      } else if (e.target.value === 'STYGIA') {
                        setNewCharLanguages('STYGIAN, SHEMITISH');
                      }
                    }}
                    className="w-full bg-[#f0eded] border border-black p-2 font-mono font-bold uppercase focus:ring-1 focus:ring-black focus:outline-none text-sm text-[#1b1c1c]"
                  >
                    {HOMELANDS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Education Background
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SURVIVAL OF THE FITTEST"
                    value={newCharEducation}
                    onChange={(e) => setNewCharEducation(e.target.value)}
                    className="w-full bg-[#f0eded] border border-black p-2 font-mono uppercase focus:ring-1 focus:ring-black focus:outline-none text-sm"
                  />
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Known Languages
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CIMMERIAN, AQUILONIAN"
                    value={newCharLanguages}
                    onChange={(e) => setNewCharLanguages(e.target.value)}
                    className="w-full bg-[#f0eded] border border-black p-2 font-mono uppercase focus:ring-1 focus:ring-black focus:outline-none text-sm"
                  />
                </div>

                {/* Sullen Quote */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Sullen Quote / Maxim
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sullen-eyed, sword in hand..."
                    value={newCharQuote}
                    onChange={(e) => setNewCharQuote(e.target.value)}
                    className="w-full bg-[#f0eded] border border-black p-2 font-serif focus:ring-1 focus:ring-black focus:outline-none text-sm italic"
                  />
                </div>
              </div>

              {/* Portrait & Banner Image Overrides */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-black/10 pt-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Portrait Image Link (Optional URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newCharPortraitUrl}
                    onChange={(e) => setNewCharPortraitUrl(e.target.value)}
                    className="w-full bg-[#f0eded] border border-black p-2 font-mono focus:ring-1 focus:ring-black focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                    Story Scene Banner Link (Optional URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newCharBannerUrl}
                    onChange={(e) => setNewCharBannerUrl(e.target.value)}
                    className="w-full bg-[#f0eded] border border-black p-2 font-mono focus:ring-1 focus:ring-black focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Text Areas */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                  Appearance & Personality
                </label>
                <textarea
                  rows={2}
                  value={newCharAppearance}
                  onChange={(e) => setNewCharAppearance(e.target.value)}
                  className="w-full bg-[#f0eded] border border-black p-2 font-serif text-sm focus:ring-1 focus:ring-black focus:outline-none text-[#1b1c1c]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-black/60 mb-1">
                  War Story
                </label>
                <textarea
                  rows={2}
                  value={newCharWarStory}
                  onChange={(e) => setNewCharWarStory(e.target.value)}
                  className="w-full bg-[#f0eded] border border-black p-2 font-serif text-sm focus:ring-1 focus:ring-black focus:outline-none text-[#1b1c1c]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="border-2 border-black bg-transparent hover:bg-black/10 text-black px-4 py-2 font-mono font-bold uppercase transition-colors"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-[#fcf9f8] px-6 py-2 font-mono font-bold uppercase transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={14} />
                  <span>Forge Character</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- STAT EDITING PENCIL HELPER (NO PRINT INLINE TOGGLES) --- */}
      {isEditing && editChar && (
        <div className="w-full px-4 md:px-8 mx-auto mb-6 p-4 border-2 border-dashed border-neutral-600 bg-amber-50/50 relative z-10 no-print flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="animate-pulse w-3 h-3 bg-neutral-900 leading-none inline-block"></span>
            <p className="font-mono text-xs uppercase font-bold text-neutral-800">
              Modifier Mode Enabled. You may change stats directly below or
              click &apos;Save Sheet&apos; in the banner.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveEdit}
              className="bg-emerald-800 text-white font-mono text-xs font-bold uppercase px-3 py-1 bg-emerald-950 transition-colors"
            >
              Apply Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditChar(null);
              }}
              className="bg-neutral-500 text-white font-mono text-xs font-bold uppercase px-3 py-1 hover:bg-neutral-700 transition-colors"
            >
              Discard Changes
            </button>
          </div>
        </div>
      )}

      {/* --- MASTER SHEET CONTAINER (PRINT_FULL ADAPTER) --- */}
      <div className="w-full px-4 md:px-8 mx-auto flex flex-col gap-8 print-full">
        {/* LEFT COLUMN: CHARACTER SHEETS VIEWPORT (TAKES 8 COLUMNS) */}
        <section className="w-full space-y-12 print-full">
          {/* Header Block */}
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-4">
              <div>
                {isEditing ? (
                  <div className="mb-2">
                    <label className="block text-[8px] font-mono text-black/50">
                      ID
                    </label>
                    <input
                      type="text"
                      value={activeChar.id}
                      onChange={(e) =>
                        handleEditFieldChange('id', e.target.value)
                      }
                      className="bg-[#f0eded] border border-black px-2 py-0.5 font-mono text-xs w-48 text-[#1b1c1c]"
                    />
                  </div>
                ) : (
                  <span className="text-[10px] font-mono bg-black/10 px-2 py-0.5 mb-2 inline-block font-bold">
                    ID: {selectedChar.id}
                  </span>
                )}

                {isEditing ? (
                  <div className="mt-1">
                    <label className="block text-[8px] font-mono text-black/50">
                      HERO NAME
                    </label>
                    <input
                      type="text"
                      value={activeChar.name}
                      onChange={(e) =>
                        handleEditFieldChange(
                          'name',
                          e.target.value.toUpperCase(),
                        )
                      }
                      className="bg-[#f0eded] border border-black px-2 py-1 font-mono font-bold text-xl uppercase text-[#1b1c1c] w-64"
                    />
                  </div>
                ) : (
                  <h2 className="text-6xl font-black leading-none uppercase tracking-tighter">
                    {selectedChar.name}
                  </h2>
                )}
              </div>

              {/* EXP Stats */}
              <div className="flex gap-4 mt-6 md:mt-0 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-black/60 uppercase">
                    Exp Total
                  </span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={activeChar.expTotal}
                      onChange={(e) =>
                        handleEditFieldChange(
                          'expTotal',
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="bg-[#f0eded] border border-black font-semibold text-center py-0.5 text-sm w-24 text-[#1b1c1c]"
                    />
                  ) : (
                    <span className="text-2xl font-bold leading-none">
                      {selectedChar.expTotal.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="border-l border-black/20 h-10 mx-2 hidden md:block"></div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-black/60 uppercase">
                    Exp Spent
                  </span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={activeChar.expSpent}
                      onChange={(e) =>
                        handleEditFieldChange(
                          'expSpent',
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="bg-[#f0eded] border border-black font-semibold text-center py-0.5 text-sm w-24 text-[#1b1c1c]"
                    />
                  ) : (
                    <span className="text-2xl font-bold leading-none">
                      {selectedChar.expSpent.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scenic Graphic Banner */}
          <div className="flex justify-center">
            <div className="border-4 border-black bg-black overflow-hidden w-full relative">
              <span className="absolute bottom-2 right-3 font-mono text-[8px] text-[#fcf9f8]/60 bg-black/40 px-1 py-0.5 uppercase z-10 no-print">
                Tome Illustrative Scene
              </span>
              <div className="aspect-video w-full flex items-center justify-center relative">
                <button
                  onClick={() =>
                    setSlideIndex((prev) =>
                      prev === 0 ? slides.length - 1 : prev - 1,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 z-10 transition-colors no-print"
                  title="Previous Image"
                >
                  <ChevronLeft size={24} />
                </button>
                <img
                  alt={`${selectedChar.name} Mythic Scene Background Illustration`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90 contrast-125 hover:contrast-150 transition-all duration-300"
                  src={slides[slideIndex]}
                />
                <button
                  onClick={() =>
                    setSlideIndex((prev) =>
                      prev === slides.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 z-10 transition-colors no-print"
                  title="Next Image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {isEditing && (
                <div className="absolute inset-x-0 bottom-0 bg-[#f0eded] p-2 border-t border-black text-xs no-print text-[#1b1c1c]">
                  <label className="block text-[8px] font-mono uppercase mb-0.5 text-black">
                    Banner Scene URL Link
                  </label>
                  <input
                    type="text"
                    value={activeChar.bannerUrl}
                    onChange={(e) =>
                      handleEditFieldChange('bannerUrl', e.target.value)
                    }
                    className="w-full p-1 border font-mono text-[10px]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Portrait & Background Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* PORTRAIT CARD (4 Columns) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="border-4 border-black relative">
                <div className="absolute -top-3.5 -left-3 bg-black text-[#fcf9f8] px-3 py-0.5 text-[10px] font-mono tracking-widest z-20 font-bold">
                  VISUAL_REF
                </div>
                <div className="bg-neutral-900 aspect-[3/4] overflow-hidden flex items-center justify-center">
                  <img
                    alt={`${selectedChar.name} Character Sheet Portrait`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-90 contrast-125 select-none transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                    src={selectedChar.portraitUrl}
                  />
                </div>

                {/* Sullen Quote Box */}
                <div className="p-4 bg-[#fcf9f8] border-t-4 border-black min-h-[140px] flex items-center justify-center">
                  {isEditing ? (
                    <div className="w-full font-serif text-sm">
                      <label className="block text-[8px] font-mono text-black/50 mb-1">
                        Lore Quote (Italicized)
                      </label>
                      <textarea
                        rows={3}
                        value={activeChar.quote}
                        onChange={(e) =>
                          handleEditFieldChange('quote', e.target.value)
                        }
                        className="w-full bg-[#f0eded] border border-black p-1 text-xs text-[#1b1c1c] leading-tight"
                      />
                    </div>
                  ) : (
                    <p className="font-serif text-sm italic leading-relaxed text-[#1b1c1c]/90">
                      &ldquo;{selectedChar.quote}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Direct Portrait Modifier Trigger (Edit Mode Helper) */}
              {isEditing && (
                <div className="bg-[#f0eded] p-3 border border-black text-xs no-print">
                  <label className="block font-mono text-[9px] uppercase font-bold text-neutral-800 mb-1">
                    Change Portrait URL
                  </label>
                  <input
                    type="text"
                    value={activeChar.portraitUrl}
                    onChange={(e) =>
                      handleEditFieldChange('portraitUrl', e.target.value)
                    }
                    placeholder="Enter portrait image address"
                    className="w-full p-1 border font-mono text-[10px]"
                  />
                </div>
              )}
            </div>

            {/* BACKGROUND DATA CARD (7 Columns) */}
            <div className="md:col-span-7">
              <div className="border-4 border-black bg-[#fcf9f8] p-6 relative h-full">
                <div className="absolute -top-4 left-6 bg-black text-[#fcf9f8] px-4 py-0.5 text-[10px] font-mono tracking-widest font-bold">
                  BACKGROUND_DATA
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mt-4">
                  {/* Field: Age & Gender */}
                  <div className="border-b border-black/20 pb-1">
                    <label className="block font-mono text-black/50 uppercase text-[9px] tracking-wider leading-none mb-1">
                      Age & Gender
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={activeChar.ageAndGender}
                        onChange={(e) =>
                          handleEditFieldChange('ageAndGender', e.target.value)
                        }
                        className="bg-[#f0eded] border border-black px-1 font-semibold text-sm w-full text-[#1b1c1c]"
                      />
                    ) : (
                      <span className="block font-bold text-base">
                        {selectedChar.ageAndGender}
                      </span>
                    )}
                  </div>

                  {/* Field: Caste */}
                  <div className="border-b border-black/20 pb-1">
                    <label className="block font-mono text-black/50 uppercase text-[9px] tracking-wider leading-none mb-1">
                      Caste
                    </label>
                    {isEditing ? (
                      <select
                        value={activeChar.caste}
                        onChange={(e) =>
                          handleEditFieldChange('caste', e.target.value)
                        }
                        className="bg-[#f0eded] border border-black px-1 font-semibold text-xs w-full text-[#1b1c1c]"
                      >
                        {CASTES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="block font-bold text-base uppercase">
                        {selectedChar.caste}
                      </span>
                    )}
                  </div>

                  {/* Field: Archetype */}
                  <div className="border-b border-black/20 pb-1">
                    <label className="block font-mono text-black/50 uppercase text-[9px] tracking-wider leading-none mb-1">
                      Archetype
                    </label>
                    {isEditing ? (
                      <select
                        value={activeChar.archetype}
                        onChange={(e) =>
                          handleEditFieldChange('archetype', e.target.value)
                        }
                        className="bg-[#f0eded] border border-black px-1 font-semibold text-xs w-full text-[#1b1c1c]"
                      >
                        {ARCHETYPES.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="block font-bold text-base uppercase">
                        {selectedChar.archetype}
                      </span>
                    )}
                  </div>

                  {/* Field: Education */}
                  <div className="border-b border-black/20 pb-1">
                    <label className="block font-mono text-black/50 uppercase text-[9px] tracking-wider leading-none mb-1">
                      Education
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={activeChar.education}
                        onChange={(e) =>
                          handleEditFieldChange('education', e.target.value)
                        }
                        className="bg-[#f0eded] border border-black px-1 font-semibold text-xs w-full text-[#1b1c1c]"
                      />
                    ) : (
                      <span className="block font-bold text-base uppercase">
                        {selectedChar.education}
                      </span>
                    )}
                  </div>

                  {/* Field: Homeland */}
                  <div className="border-b border-black/20 pb-1">
                    <label className="block font-mono text-black/50 uppercase text-[9px] tracking-wider leading-none mb-1">
                      Homeland
                    </label>
                    {isEditing ? (
                      <select
                        value={activeChar.homeland}
                        onChange={(e) =>
                          handleEditFieldChange('homeland', e.target.value)
                        }
                        className="bg-[#f0eded] border border-black px-1 font-semibold text-xs w-full text-[#1b1c1c]"
                      >
                        {HOMELANDS.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="block font-bold text-base uppercase">
                        {selectedChar.homeland}
                      </span>
                    )}
                  </div>

                  {/* Field: Languages */}
                  <div className="border-b border-black/20 pb-1">
                    <label className="block font-mono text-black/50 uppercase text-[9px] tracking-wider leading-none mb-1">
                      Languages
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={activeChar.languages}
                        onChange={(e) =>
                          handleEditFieldChange('languages', e.target.value)
                        }
                        className="bg-[#f0eded] border border-black px-1 font-semibold text-xs w-full text-[#1b1c1c]"
                      />
                    ) : (
                      <span className="block font-bold text-base uppercase">
                        {selectedChar.languages}
                      </span>
                    )}
                  </div>
                </div>

                {/* Narrative Sections */}
                <div className="mt-8 space-y-6">
                  {/* Appearance & Personality */}
                  <div className="bg-[#f0eded] p-4 border-l-4 border-black">
                    <label className="block font-mono text-black/50 uppercase text-[9px] tracking-widest mb-1.5 font-bold">
                      Appearance &amp; Personality
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={activeChar.appearance}
                        onChange={(e) =>
                          handleEditFieldChange('appearance', e.target.value)
                        }
                        className="w-full bg-[#fcf9f8] border border-black p-1 text-xs text-[#1b1c1c] font-serif leading-relaxed"
                      />
                    ) : (
                      <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#1b1c1c]">
                        {selectedChar.appearance}
                      </p>
                    )}
                  </div>

                  {/* War Story */}
                  <div className="bg-[#f0eded] p-4 border-l-4 border-black">
                    <label className="block font-mono text-black/50 uppercase text-[9px] tracking-widest mb-1.5 font-bold">
                      War Story
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={activeChar.warStory}
                        onChange={(e) =>
                          handleEditFieldChange('warStory', e.target.value)
                        }
                        className="w-full bg-[#fcf9f8] border border-black p-1 text-xs text-[#1b1c1c] font-serif leading-relaxed"
                      />
                    ) : (
                      <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#1b1c1c]">
                        {selectedChar.warStory}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Counter Bar (Fortune, Renown, Standing, Fatigue) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Fortune Points (Interactive modifier inside) */}
            <div className="border-4 border-black p-4 bg-black text-[#fcf9f8] relative group">
              <div className="text-[10px] font-mono tracking-wider opacity-80 uppercase mb-1 font-bold">
                Fortune Points
              </div>
              <div className="text-2xl font-bold flex items-center justify-between">
                <span>
                  0{selectedChar.fortuneCurrent} / 0{selectedChar.fortuneMax}
                </span>

                {/* Live +/- adjustment trigger buttons (no-print) */}
                <div className="flex gap-1 no-print opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAdjustFortune(-1)}
                    title="Drain Fortune Point"
                    disabled={selectedChar.fortuneCurrent <= 0}
                    className="w-6 h-6 border border-[#fcf9f8]/40 hover:bg-[#fcf9f8] hover:text-black transition-colors font-mono text-xs flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleAdjustFortune(1)}
                    title="Generate Fortune Point"
                    disabled={
                      selectedChar.fortuneCurrent >= selectedChar.fortuneMax
                    }
                    className="w-6 h-6 border border-[#fcf9f8]/40 hover:bg-[#fcf9f8] hover:text-black transition-colors font-mono text-xs flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Renown */}
            <div className="border-4 border-black p-4 bg-[#fcf9f8]">
              <div className="text-[10px] font-mono tracking-wider text-black/50 uppercase mb-1 font-bold">
                Renown
              </div>
              {isEditing ? (
                <input
                  type="number"
                  value={activeChar.renown}
                  onChange={(e) =>
                    handleEditFieldChange(
                      'renown',
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="bg-[#f0eded] border border-black text-center font-bold text-lg w-full text-[#1b1c1c]"
                />
              ) : (
                <div className="text-2xl font-bold">{selectedChar.renown}</div>
              )}
            </div>

            {/* Standing */}
            <div className="border-4 border-black p-4 bg-[#fcf9f8]">
              <div className="text-[10px] font-mono tracking-wider text-black/50 uppercase mb-1 font-bold">
                Standing
              </div>
              {isEditing ? (
                <input
                  type="number"
                  value={activeChar.standing}
                  onChange={(e) =>
                    handleEditFieldChange(
                      'standing',
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="bg-[#f0eded] border border-black text-center font-bold text-lg w-full text-[#1b1c1c]"
                />
              ) : (
                <div className="text-2xl font-bold">
                  {selectedChar.standing}
                </div>
              )}
            </div>

            {/* Fatigue */}
            <div className="border-4 border-black p-4 bg-[#eae7e7]">
              <div className="text-[10px] font-mono tracking-wider text-black/40 uppercase mb-1 font-bold">
                Fatigue
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={activeChar.fatigue}
                  onChange={(e) =>
                    handleEditFieldChange('fatigue', e.target.value)
                  }
                  className="bg-[#fcf9f8] border border-black text-center font-mono font-bold text-lg w-full text-[#1b1c1c]"
                />
              ) : (
                <div className="text-2xl font-bold font-mono">
                  {selectedChar.fatigue || '--'}
                </div>
              )}
            </div>
          </div>
          {/* TALENTS AND CAPABILITIES SECTION */}
          <section className="border-4 border-black bg-[#fcf9f8] overflow-hidden relative">
            <div className="bg-black text-[#fcf9f8] px-4 py-2.5 flex justify-between items-center">
              <h3 className="text-xl font-bold uppercase tracking-tight">
                Talents &amp; Capabilities
              </h3>
              <span className="text-[10px] font-mono opacity-80 uppercase font-bold">
                TABLE_REF: TAL-99
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#e5e2da] text-black border-b-2 border-black">
                    <th className="p-3 font-mono uppercase text-xs border-r border-black/30 font-bold w-32">
                      Category
                    </th>
                    <th className="p-3 font-mono uppercase text-xs border-r border-black/30 font-bold w-40">
                      Skill Affiliation
                    </th>
                    <th className="p-3 font-mono uppercase text-xs border-r border-black/30 font-bold w-20 text-center">
                      Rank
                    </th>
                    <th className="p-3 font-mono uppercase text-xs font-bold">
                      Effect / Narrative Modifier
                    </th>
                    <th className="p-3 font-mono text-right font-bold w-32 no-print">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs font-bold divide-y divide-black/10">
                  {activeChar.talents && activeChar.talents.length > 0 ? (
                    activeChar.talents.map((talent) => (
                      <tr
                        key={talent.id}
                        className="hover:bg-black/5 transition-colors align-top"
                      >
                        {/* Category */}
                        <td className="p-3 border-r border-black/30 font-black">
                          {isEditing ? (
                            <input
                              type="text"
                              value={talent.category}
                              onChange={(e) =>
                                handleEditTalentChange(
                                  talent.id,
                                  'category',
                                  e.target.value.toUpperCase(),
                                )
                              }
                              className="bg-[#f0eded] border border-black p-0.5 text-[10px] w-full"
                            />
                          ) : (
                            <span className="bg-neutral-200/60 px-1 py-0.5 leading-none rounded-[1px]">
                              {talent.category}
                            </span>
                          )}
                        </td>

                        {/* Skill Affiliation */}
                        <td className="p-3 border-r border-black/30 text-amber-950">
                          {isEditing ? (
                            <input
                              type="text"
                              value={talent.skillAffiliation}
                              onChange={(e) =>
                                handleEditTalentChange(
                                  talent.id,
                                  'skillAffiliation',
                                  e.target.value.toUpperCase(),
                                )
                              }
                              className="bg-[#f0eded] border border-black p-0.5 text-[10px] w-full"
                            />
                          ) : (
                            talent.skillAffiliation
                          )}
                        </td>

                        {/* Rank */}
                        <td className="p-3 border-r border-black/30 text-center text-[#1b1c1c]">
                          {isEditing ? (
                            <input
                              type="number"
                              min={1}
                              max={5}
                              value={talent.rank}
                              onChange={(e) =>
                                handleEditTalentChange(
                                  talent.id,
                                  'rank',
                                  parseInt(e.target.value) || 1,
                                )
                              }
                              className="bg-[#f0eded] border border-black p-0.5 text-[10px] text-center w-12"
                            />
                          ) : (
                            <span className="font-sans font-bold text-sm bg-neutral-900 text-[#fcf9f8] px-2 py-0.5 leading-none">
                              {talent.rank}
                            </span>
                          )}
                        </td>

                        {/* Effect Body */}
                        <td className="p-3 font-serif font-normal text-xs text-[#1b1c1c]/90">
                          {isEditing ? (
                            <textarea
                              rows={2}
                              value={talent.effect}
                              onChange={(e) =>
                                handleEditTalentChange(
                                  talent.id,
                                  'effect',
                                  e.target.value,
                                )
                              }
                              className="w-full bg-[#f0eded] border border-black p-1 text-[11px] font-sans"
                            />
                          ) : (
                            talent.effect
                          )}
                        </td>

                        {/* Action Controllers */}
                        <td className="p-3 text-right no-print">
                          {isEditing ? (
                            <button
                              onClick={() =>
                                handleRemoveTalentFromEditing(talent.id)
                              }
                              className="text-red-800 hover:text-red-600 font-mono text-[10px] uppercase font-bold border border-red-800/45 px-1 bg-red-50"
                            >
                              Revoke
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleRollDice(
                                  '2d20',
                                  `Talent: ${talent.skillAffiliation}`,
                                  `Checking ${talent.skillAffiliation} Skill (Rank ${talent.rank}). ${talent.effect}`,
                                )
                              }
                              className="bg-black hover:bg-neutral-800 text-[#fcf9f8] text-[9px] uppercase font-bold px-2 py-1 leading-none tracking-wider flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <Dices size={10} />
                              <span>Roll check</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-6 text-center text-black/50 font-serif italic bg-neutral-100"
                      >
                        This character claims no special talents or trained
                        techniques.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Talent Library Quick Adder (Edit Mode Helper) */}
            {isEditing && (
              <div className="bg-[#f0eded] p-4 border-t-2 border-black no-print">
                <span className="block font-mono text-[9px] uppercase text-black/50 font-bold mb-2">
                  Preset Talents Library Bank:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {TALENTS_TEMPLATES.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddTalentToEditing(item)}
                      className="text-left bg-[#fcf9f8] border border-black/20 hover:border-black p-2 text-[10px] font-mono leading-tight hover:shadow-xs hover:bg-[#eae7e7] transition-all"
                    >
                      <span className="font-bold text-amber-950">
                        +{item.category} ({item.skillAffiliation})
                      </span>
                      : {item.effect.slice(0, 60)}...
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Bottom Spacing */}
          <div className="h-10"></div>
        </section>
      </div>

      {/* --- FOOTER (NO PRINT) --- */}
      <footer className="w-full px-4 md:px-8 mx-auto border-t border-black/10 mt-16 pt-6 pb-12 text-center text-[10px] font-mono text-black/50 no-print">
        <p>
          CHRONOS SYSTEMS • CIMMERIAN HERO TACTICAL CONSOLE • DESIGN INSPIRED BY
          1970S TABLETOP TILE MANUALS
        </p>
        <p className="mt-1">
          Hand-adjusted margins • Raw parchment canvas color palette #FCF9F8
        </p>
      </footer>
    </div>
  );
}
