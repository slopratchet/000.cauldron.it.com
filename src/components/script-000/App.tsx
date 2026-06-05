import React, { useState, useEffect } from 'react';
import { INITIAL_OPERATIONS } from '../../initialData';
import { Operation, Character, ScriptLine, SceneObjective } from '../../types';
import DossierMeta from './DossierMeta';
import PsychProfiles from './PsychProfiles';
import SceneObjectives from './SceneObjectives';
import NavConsoleCard from './NavConsoleCard';
import ScreenplayLedger from './ScreenplayLedger';
import ClassifiedAugmentation from './ClassifiedAugmentation';
import ManualTranscriptAdd from './ManualTranscriptAdd';
import {
  BookOpenText,
  Menu,
  HelpCircle,
  Info,
  ShieldAlert,
  Terminal,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  RefreshCw,
  Sliders,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

export default function App() {
  const [operations, setOperations] = useState<Operation[]>(INITIAL_OPERATIONS);
  const [activeOpId, setActiveOpId] = useState<string>('jaguar_shark');

  // Tactical Sirens state when weapon systems are armed
  const [weaponsArmed, setWeaponsArmed] = useState(false);

  // Audio state simulation descriptions
  const [audioSimulation, setAudioSimulation] = useState(true);

  // Overlay states
  const [showFaq, setShowFaq] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showPartyRequest, setShowPartyRequest] = useState(false);
  const [customOperationTitle, setCustomOperationTitle] = useState('');
  const [isCreatingOp, setIsCreatingOp] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const activeOp = operations.find((o) => o.id === activeOpId) || operations[0];
  const activeOpIndex = operations.findIndex((o) => o.id === activeOpId);
  const currentPage = activeOpIndex !== -1 ? activeOpIndex + 1 : 1;
  const totalPages = operations.length;

  // Update operation values
  const handleUpdateActiveOp = (updates: Partial<Operation>) => {
    setOperations((prev) =>
      prev.map((op) => (op.id === activeOpId ? { ...op, ...updates } : op)),
    );
  };

  const handleUpdateLines = (newLines: ScriptLine[]) => {
    handleUpdateActiveOp({ scriptLines: newLines });
  };

  const handleUpdateOpLines = (opId: string, newLines: ScriptLine[]) => {
    setOperations((prev) =>
      prev.map((op) =>
        op.id === opId ? { ...op, scriptLines: newLines } : op,
      ),
    );
  };

  const handleUpdateCharacters = (newChars: Character[]) => {
    handleUpdateActiveOp({ characters: newChars });
  };

  const handleUpdateObjectives = (newObjs: SceneObjective[]) => {
    handleUpdateActiveOp({ objectives: newObjs });
  };

  const handleArmedStatus = (state: boolean) => {
    setWeaponsArmed(state);
  };

  // Synchronize dynamic arm status with current active operations checklist on toggle
  useEffect(() => {
    const weaponObj = activeOp.objectives.find((obj) => obj.isCritical);
    if (weaponObj) {
      setWeaponsArmed(weaponObj.checked);
    } else {
      setWeaponsArmed(false);
    }
  }, [activeOpId, activeOp.objectives]);

  // Handle active characters to pre-fill prompt context if selector clicked
  const handleSelectCharacter = (name: string) => {
    setAiPrompt(`${name} argues about tactical protocols...`);
    setTimeout(() => {
      const inputElement = document.getElementById(
        'input-ai-prompt',
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    }, 50);
  };

  // Add custom operation profile
  const handleCreateNewOperation = () => {
    if (!customOperationTitle) return;
    const cleanId = customOperationTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');

    if (operations.some((o) => o.id === cleanId)) {
      alert(
        'An operation with that file key already exists inside the archives.',
      );
      return;
    }

    const newOp: Operation = {
      id: cleanId,
      title: `Operation: ${customOperationTitle.toUpperCase()}`,
      location: 'UNKNOWN COORDINATES',
      time: '0000 HRS',
      target: 'UNDISCLOSED TARGET',
      clearanceLevel: 'LEVEL 1',
      metadataCode: `LOG: 00${operations.length + 1}-A`,
      objectives: [
        {
          id: 'custom_obj_1',
          text: 'Define the scope and destination.',
          checked: false,
        },
        {
          id: 'custom_obj_2',
          text: 'Equip the expedition gear.',
          checked: false,
        },
        {
          id: 'custom_obj_weap',
          text: 'Initialize emergency tracking signals.',
          checked: false,
          isCritical: true,
        },
      ],
      characters: [
        {
          id: 'custom_char_1',
          name: 'SUBJECT_01: EXPLORER',
          role: 'Lead Diver',
          description: 'A newly rostered marine investigator ready to explore.',
          notes: '>> Note: Security card issued.',
          status: 'ACTIVE',
        },
      ],
      scriptLines: [
        {
          id: 'custom_line_1',
          type: 'heading',
          text: 'EXT. UNCHARTED REEF - SUNSET',
        },
        {
          id: 'custom_line_2',
          type: 'action',
          text: 'A profound wind whistles across the empty deck of the vessel. The crew checks their compass dials.',
        },
        {
          id: 'custom_line_3',
          type: 'dialogue',
          characterName: 'EXPLORER',
          text: 'We are reaching the target coordinates now. Ready physical sensors.',
          parenthetical: '(squinting into the horizon)',
        },
      ],
    };

    setOperations([...operations, newOp]);
    setActiveOpId(cleanId);
    setIsCreatingOp(false);
    setCustomOperationTitle('');
  };

  const handleDeleteOperation = (opId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (operations.length <= 1) {
      alert('At least one operation dossier must remain in the archives.');
      return;
    }
    const confirmed = confirm(
      'Are you sure you want to delete this operation?',
    );
    if (!confirmed) return;

    const newOps = operations.filter((op) => op.id !== opId);
    setOperations(newOps);
    if (activeOpId === opId) {
      setActiveOpId(newOps[0].id);
    }
  };

  return (
    <div className="bg-parchment-deep text-black min-h-screen flex flex-col font-tinos relative overflow-x-hidden pb-16 selection:bg-black selection:text-white">
      {/* Watermark in background */}
      <div className="watermark font-anton text-black select-none pointer-events-none">
        {activeOp.target || 'FILE_01'}
      </div>

      {/* ALERT FLASHER FOR WEAPONS ARMED MODE */}
      {weaponsArmed && (
        <div className="bg-blood-red text-white font-mono text-[11px] py-1 px-4 text-center select-none animate-pulse flex items-center justify-center gap-2 tracking-widest z-50 shadow-md">
          <ShieldAlert className="w-4 h-4 animate-spin" />
          <span>
            🚨 WARNING: WEAPON STATUS ARMED // PRESSURE GAUGE SPIKES TO CRITICAL
            🚨
          </span>
        </div>
      )}

      {weaponsArmed && (
        <div className="bg-red-900/10 text-blood-red py-2 px-6 text-center select-none font-mono text-xs border-y border-blood-red animate-pulse flex items-center justify-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" />
          [SIMULATION DIAL DIAGNOSTIC: Retro-Sonar pings are echoing at double
          velocity. Loud 1970s acoustic ping alarm is sounding in the distance.]
        </div>
      )}

      {/* Main Content Layout Canvas */}
      <main className="flex-grow flex flex-col md:flex-row p-4 md:p-8 gap-6 relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Left Column: Technical intelligence dossier details */}
        <aside className="w-full md:w-1/3 flex flex-col gap-5 print:hidden">
          {/* LEDGER MISSION CHANGER */}
          <div className="border-4 border-black bg-black text-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2 font-mono">
            <div className="flex justify-between items-center border-b border-zinc-700 pb-1.5 mb-1 select-none">
              <button
                onClick={() => setIsStreaming(!isStreaming)}
                className={`text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 border cursor-pointer select-none transition-all duration-200 ${
                  isStreaming
                    ? 'bg-emerald-600 border-emerald-500 text-white animate-pulse'
                    : 'bg-transparent border-intel-orange text-intel-orange hover:bg-intel-orange hover:text-black'
                }`}
                title="Toggle performance streaming mode"
              >
                {isStreaming ? 'STOP_STREAM' : 'STREAM_PERFORMANCE'}
              </button>
              <button
                onClick={() => setIsCreatingOp(true)}
                className="text-[9px] bg-intel-orange text-black font-extrabold px-1.5 py-0.5 hover:bg-white transition-colors cursor-pointer"
                id="btn-sidebar-new-file"
              >
                + NEW PAGE
              </button>
            </div>
            <div className="flex flex-col gap-1.5 text-xs">
              {operations.map((op) => (
                <div
                  key={op.id}
                  className={`text-left font-bold transition-all uppercase flex justify-between items-center ${
                    op.id === activeOpId
                      ? 'bg-white text-black'
                      : 'hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  <button
                    onClick={() => setActiveOpId(op.id)}
                    className="flex-grow text-left px-2 py-1 cursor-pointer font-bold uppercase"
                  >
                    {op.title.replace('Operation: ', '')}
                  </button>
                  <span className="text-[9px] opacity-70 pr-2">
                    {op.id === activeOpId ? (
                      '● ACTIVE'
                    ) : (
                      <button
                        onClick={(e) => handleDeleteOperation(op.id, e)}
                        className="text-red-500 hover:text-red-400 font-bold hover:underline cursor-pointer lowercase"
                        title="Delete operation"
                      >
                        ○ delete
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 1. Technical Metadata Extract card */}
          <DossierMeta
            operation={activeOp}
            onUpdateMeta={handleUpdateActiveOp}
          />

          {/* 2. Character Profiles / Subjects */}
          <PsychProfiles
            characters={activeOp.characters}
            onUpdateCharacters={handleUpdateCharacters}
            onSelectCharacter={handleSelectCharacter}
          />

          {/* 3. Dramatic Scene Targets & Checklists */}
          <SceneObjectives
            objectives={activeOp.objectives}
            onUpdateObjectives={handleUpdateObjectives}
            onArmedChange={handleArmedStatus}
          />

          {/* 4. Gritty Navigation Instrument Gear Screen */}
          <NavConsoleCard />

          {/* Interactive simulated sounds desk */}
          <div className="border border-black p-3 bg-zinc-100/80 font-mono text-[10px] text-zinc-700 flex justify-between items-center select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="flex items-center gap-1">
              {audioSimulation ? (
                <Volume2 className="w-3.5 h-3.5 text-zinc-700" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
              )}
              SYSTEM_AUDIO_MONITOR:{' '}
              {audioSimulation ? 'SOCIETY_SYNTH_LIVE' : 'SOCIETY_SYNTH_MUTED'}
            </span>
            <button
              onClick={() => setAudioSimulation(!audioSimulation)}
              className="text-[9px] uppercase tracking-tight border border-gray-400 px-1 py-0.5 hover:bg-white text-black font-bold cursor-pointer"
            >
              TOGGLE
            </button>
          </div>

          <ClassifiedAugmentation
            operation={activeOp}
            onUpdateLines={handleUpdateLines}
            characters={activeOp.characters}
            aiPrompt={aiPrompt}
            setAiPrompt={setAiPrompt}
          />

          <ManualTranscriptAdd
            operation={activeOp}
            onUpdateLines={handleUpdateLines}
            characters={activeOp.characters}
          />
        </aside>

        {/* Right Column: Screenplay Typewriter desk */}
        <section className="w-full md:w-2/3 h-auto">
          <ScreenplayLedger
            operations={operations}
            onUpdateOpLines={handleUpdateOpLines}
            activeOpId={activeOpId}
            setActiveOpId={setActiveOpId}
          />
        </section>
      </main>

      {/* Dynamic Popups/Interactions for high coverage and completion */}

      {/* Dialog: FAQ / Handbook */}
      {showFaq && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 print:hidden select-none">
          <div className="bg-white border-4 border-black p-6 max-w-lg w-full relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
            <button
              onClick={() => setShowFaq(false)}
              className="absolute top-3 right-3 text-black hover:text-blood-red hover:scale-110 transition-transform cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <h3 className="font-anton text-lg tracking-wider uppercase text-black mb-1 border-b border-black pb-1 flex items-center gap-1.5">
              <HelpCircle className="w-5 h-5 text-intel-orange" />{' '}
              INTEL_OPERATIONAL_HANDBOOK
            </h3>
            <p className="font-serif text-[13px] text-zinc-700 leading-relaxed mb-4">
              Here are responses to general system queries regarding "The Tome:
              1970 Edition".
            </p>

            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              <div>
                <h4 className="font-bold text-black border-l-2 border-intel-orange pl-1.5 mb-1 text-[11px]">
                  Q: What are these secret intelligence files?
                </h4>
                <p className="text-zinc-600 font-serif leading-relaxed text-[11px]">
                  The files represent the actual preservation dossiers of the
                  Zissou Expedition Society during the 1970s. These are live
                  ledger units that catalog metadata, tactical radar profiles,
                  and critical screenplay structures!
                </p>
              </div>

              <div>
                <h4 className="font-bold text-black border-l-2 border-intel-orange pl-1.5 mb-1 text-[11px]">
                  Q: How do I test the Gemini API integrations?
                </h4>
                <p className="text-zinc-600 font-serif leading-relaxed text-[11px]">
                  Input any scenario in the screenplay input box (e.g. *Ned
                  argues about radar signals* or *A school of jellyfish
                  approaches*) and hit **AUGMENT_SCRIPT**. The server uses
                  Gemini 3.5 to create formatted dialogue!
                </p>
              </div>

              <div>
                <h4 className="font-bold text-black border-l-2 border-intel-orange pl-1.5 mb-1 text-[11px]">
                  Q: How do I trigger alarms?
                </h4>
                <p className="text-zinc-600 font-serif leading-relaxed text-[11px]">
                  Checking the critical warning icon objective **"Ensure weapon
                  systems are armed"** on the Scene Objectives list activates
                  the tactical nuclear light sirens!
                </p>
              </div>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setShowFaq(false)}
                className="bg-black hover:bg-neutral-800 text-white font-bold tracking-wider uppercase px-4 py-1 cursor-pointer"
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog: Tour Guide */}
      {showTour && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 print:hidden select-none">
          <div className="bg-white border-4 border-black p-6 max-w-lg w-full relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
            <button
              onClick={() => setShowTour(false)}
              className="absolute top-3 right-3 text-black hover:text-blood-red transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <h3 className="font-anton text-lg tracking-wider uppercase text-black mb-1 border-b border-black pb-1 flex items-center gap-1.5">
              <Info className="w-5 h-5 text-black" /> TOUR_SOCIETY_RESERVE
            </h3>
            <p className="font-serif text-[13px] text-zinc-700 leading-relaxed mb-4">
              Welcome aboard the Research Vessel Belafonte. Take a quick visual
              patrol route of this console:
            </p>

            <ul className="space-y-3 font-serif text-[12px] text-zinc-600 leading-relaxed max-h-[250px] overflow-y-auto pr-1">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-intel-orange flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Left Sidebar:</strong> File archives with editable
                  locations, psych dossiers, responsive target objective
                  checkboxes, and an interactive gear panel.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-intel-orange flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Right Blueprint Sheet:</strong> The actual literary
                  transcript formatted elegantly in typewriter-style spacing
                  with red warnings, yellow accents, and inline actions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-intel-orange flex-shrink-0 mt-0.5" />
                <span>
                  <strong>AI Augmentation Suite:</strong> Feed custom directions
                  to Gemini to write dialogue strings matching the active
                  characters in real-time.
                </span>
              </li>
            </ul>

            <div className="mt-5 text-right">
              <button
                onClick={() => setShowTour(false)}
                className="bg-black hover:bg-neutral-800 text-white font-bold tracking-wider uppercase px-4 py-1 cursor-pointer"
              >
                END PATROL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog: Live Party Signup */}
      {showPartyRequest && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 print:hidden select-none">
          <div className="bg-white border-4 border-black p-6 max-w-sm w-full relative shadow-[8px_8px_0px_0px_rgba(209,9,25,1)] font-mono text-xs">
            <button
              onClick={() => setShowPartyRequest(false)}
              className="absolute top-3 right-3 text-black hover:text-blood-red cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <h3 className="font-anton text-lg tracking-wider uppercase text-blood-red mb-1 border-b border-blood-red pb-1 flex items-center gap-1.5">
              <UserCheck className="w-5 h-5" /> JOIN THE EXPEDITION
            </h3>
            <p className="font-serif text-[12px] text-zinc-700 leading-relaxed mb-4">
              Submit your request card to join the Zissou Expedition Society.
              Enter your scientific specialty:
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[9px] font-bold text-gray-500 mb-0.5">
                  FULL NAME:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alistair Hennessey"
                  className="w-full border border-black p-1 bg-parchment-deep/40 text-xs focus:ring-1 focus:ring-black focus:outline-none uppercase"
                  id="signup-name"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-gray-500 mb-0.5">
                  SPECIALTY FIELD:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acoustic Cartography / Heavy Diving"
                  className="w-full border border-black p-1 bg-parchment-deep/40 text-xs focus:ring-1 focus:ring-black focus:outline-none"
                  id="signup-specialty"
                />
              </div>

              <button
                onClick={() => {
                  alert(
                    'Specialty log submitted to Steve. He has raised an eyebrow, which implies high operational likelihood of confirmation!',
                  );
                  setShowPartyRequest(false);
                }}
                className="w-full bg-black text-white hover:bg-neutral-800 p-1.5 text-center font-bold uppercase transition-colors font-mono text-[10px] cursor-pointer"
              >
                SUBMIT DECK CARD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Operation Creation Screen */}
      {isCreatingOp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 print:hidden select-none">
          <div className="bg-white border-4 border-black p-6 max-w-sm w-full relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
            <button
              onClick={() => setIsCreatingOp(false)}
              className="absolute top-3 right-3 text-black hover:text-blood-red cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <h3 className="font-anton text-lg tracking-wider uppercase text-black mb-1 border-b border-black pb-1 flex items-center gap-1.5">
              CREATE_SOCIETY_FILE
            </h3>
            <p className="font-serif text-[12px] text-zinc-700 leading-relaxed mb-4">
              Initialize a brand-new classified operational target log into the
              Camp Candor manual archives.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[9px] font-bold text-gray-500 mb-0.5">
                  OPERATION TITLE / CODENAME:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Isla Nublar"
                  value={customOperationTitle}
                  onChange={(e) => setCustomOperationTitle(e.target.value)}
                  className="w-full border border-black p-1 bg-parchment-deep/40 text-xs focus:ring-1 focus:ring-black focus:outline-none uppercase font-bold"
                  id="create-op-title"
                />
              </div>

              <button
                onClick={handleCreateNewOperation}
                className="w-full bg-black text-white hover:bg-neutral-800 p-1.5 text-center font-bold uppercase transition-colors text-[10px] cursor-pointer"
                id="btn-confirm-new-op"
              >
                INITIALIZE OPERATION
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Standard Ledger Fixed Footer layout */}
      <footer className="fixed bottom-0 left-0 w-full flex justify-between items-center px-4 md:px-8 py-2.5 z-40 bg-black border-t-2 border-black text-parchment-deep font-mono text-[9px] tracking-tight selection:bg-white selection:text-black">
        <div className="uppercase">
          THE TOME © 1974 - 1979 CAMP CANDOR SYSTEMS | REGISTERED USER: ADMIN_01
        </div>
        <div className="flex gap-4 md:gap-6">
          <button
            onClick={() => setShowFaq(true)}
            className="uppercase text-parchment-deep hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => setShowTour(true)}
            className="uppercase text-parchment-deep hover:text-white transition-colors cursor-pointer"
          >
            TOUR
          </button>
          <button
            onClick={() => setShowPartyRequest(true)}
            className="uppercase text-parchment-deep hover:text-white transition-colors cursor-pointer"
          >
            JOIN EXPEDITION
          </button>
          <button
            onClick={() =>
              alert(
                `Active Mission Metadata: ${activeOp.title}. Segment Locator: ${activeOp.location}.`,
              )
            }
            className="uppercase text-parchment-deep hover:text-white transition-colors cursor-pointer"
          >
            SYSTEM METADATA
          </button>
          <button
            onClick={() =>
              alert(`Script Page ${currentPage} of ${totalPages} pages.`)
            }
            className="hidden sm:block uppercase text-parchment-deep hover:text-white transition-colors cursor-pointer"
          >
            PAGE {currentPage} OF {totalPages}
          </button>
        </div>
      </footer>
    </div>
  );
}
