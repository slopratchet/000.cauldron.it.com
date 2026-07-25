import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Shield,
  Cpu,
  Save,
  RotateCcw,
  Sliders,
  Layers,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Watch, SavedConfig } from '../types';
import WatchSchematic from './WatchSchematic';
import { getMasterDb, DEFAULT_MASTER_DB } from '../dbStore';

interface ConfigureModalProps {
  watch: Watch | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveConfig: (config: Omit<SavedConfig, 'id' | 'createdAt'>) => void;
  initialPreset?: {
    caseMaterial: string;
    dialColor: string;
    bezelStyle: string;
    strapType: string;
  };
}

export default function ConfigureModal({
  watch,
  isOpen,
  onClose,
  onSaveConfig,
  initialPreset,
}: ConfigureModalProps) {
  const activeDb = getMasterDb() || DEFAULT_MASTER_DB;
  const configOptions =
    activeDb.config_options || DEFAULT_MASTER_DB.config_options;

  const defaultWatch: Watch = watch ||
    (activeDb.watches && activeDb.watches[0]) || {
      id: 'main',
      ref: 'REF-1100-M',
      name: 'MAIN RAID SPECIMEN',
      tagline: 'Titan-Forged Cooldown Registry',
      description: 'High-precision raid specimen.',
      figNum: 'FIG. 01',
      image: '',
      category: 'Classic',
      specs: {
        caseDiameter: '40mm',
        material: configOptions.cases[0]?.name || 'Saronite Alloy (Grade 904L)',
        waterResistance: '300m',
        movement: 'Calibre 3235',
        powerReserve: '70h',
        bezel: configOptions.bezels[0]?.name || 'Rigid Smooth Focus Ring',
        dial: configOptions.dials[0]?.name || 'Brutalist Obsidian Black',
        strap: configOptions.straps[0]?.name || 'Oyster Flat-Link Titansteel',
      },
      details: [],
    };

  const [selectedCase, setSelectedCase] = useState<string>('');
  const [selectedDial, setSelectedDial] = useState<string>('');
  const [selectedBezel, setSelectedBezel] = useState<string>('');
  const [selectedStrap, setSelectedStrap] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedCase(
        initialPreset?.caseMaterial ||
          defaultWatch.specs.material ||
          configOptions.cases[0]?.name ||
          '',
      );
      setSelectedDial(
        initialPreset?.dialColor ||
          defaultWatch.specs.dial ||
          configOptions.dials[0]?.name ||
          '',
      );
      setSelectedBezel(
        initialPreset?.bezelStyle ||
          defaultWatch.specs.bezel ||
          configOptions.bezels[0]?.name ||
          '',
      );
      setSelectedStrap(
        initialPreset?.strapType ||
          defaultWatch.specs.strap ||
          configOptions.straps[0]?.name ||
          '',
      );
      setIsSaved(false);
    }
  }, [isOpen, watch, initialPreset]);

  const handleSave = () => {
    onSaveConfig({
      watchId: defaultWatch.id,
      watchName: defaultWatch.name,
      caseMaterial: selectedCase,
      dialColor: selectedDial,
      bezelStyle: selectedBezel,
      strapType: selectedStrap,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    setSelectedCase(defaultWatch.specs.material);
    setSelectedDial(defaultWatch.specs.dial);
    setSelectedBezel(defaultWatch.specs.bezel);
    setSelectedStrap(defaultWatch.specs.strap);
    setIsSaved(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[90vh] max-h-[850px] bg-[#0d0d0f] text-white border-4 border-primary shadow-2xl flex flex-col font-mono z-10 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-[#18181b] border-b-4 border-primary px-5 py-3.5 flex items-center justify-between select-none">
              <div className="flex items-center space-x-3">
                <Sliders className="text-primary animate-pulse" size={20} />
                <div>
                  <h2 className="font-headline font-black text-sm sm:text-base tracking-wider uppercase text-white leading-none">
                    CAMPAIGN SPECIFICATION CONFIGURATOR
                  </h2>
                  <p className="text-[10px] text-neutral-400 font-mono mt-1">
                    TARGET MODEL:{' '}
                    <span className="text-primary font-bold">
                      {defaultWatch.name}
                    </span>{' '}
                    ({defaultWatch.ref})
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer border-2 border-primary shadow-md flex items-center justify-center"
                aria-label="Close customizer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-[#0d0d0f]">
              {/* Left Column: Live Interactive Schematic Render */}
              <div className="md:col-span-5 bg-[#121215] border-b-4 md:border-b-0 md:border-r-4 border-neutral-800 p-6 flex flex-col items-center justify-between relative overflow-y-auto">
                <div className="w-full flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                  <span className="text-primary font-bold tracking-wider flex items-center space-x-1">
                    <Cpu size={12} className="text-primary" />
                    <span>CANVAS RENDER</span>
                  </span>
                  <span className="bg-black/60 border border-neutral-700 px-2 py-0.5 text-[10px] font-bold text-white">
                    {defaultWatch.figNum}
                  </span>
                </div>

                {/* SVG Schematic Canvas Container */}
                <div className="w-full max-w-[280px] aspect-square my-auto bg-black border-2 border-neutral-800 p-4 shadow-inner flex items-center justify-center relative group">
                  <WatchSchematic
                    watchId={defaultWatch.id}
                    caseMaterial={selectedCase}
                    dialColor={selectedDial}
                    bezelStyle={selectedBezel}
                    strapType={selectedStrap}
                    showLabels={false}
                  />
                  <div className="absolute inset-0 border border-primary/20 pointer-events-none group-hover:border-primary/50 transition-colors" />
                </div>

                {/* Current Active Specs Summary Box */}
                <div className="w-full bg-black/80 border border-neutral-800 p-3 mt-4 text-[10px] space-y-1.5 font-mono">
                  <div className="text-neutral-400 font-bold border-b border-neutral-800 pb-1 mb-1.5 flex items-center justify-between">
                    <span>ACTIVE CAMPAIGN PARAMETERS</span>
                    <Shield size={12} className="text-primary" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">CASE:</span>
                    <span className="text-white font-bold truncate max-w-[170px] text-right">
                      {selectedCase}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">DIAL:</span>
                    <span className="text-white font-bold truncate max-w-[170px] text-right">
                      {selectedDial}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">BEZEL:</span>
                    <span className="text-white font-bold truncate max-w-[170px] text-right">
                      {selectedBezel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">STRAP:</span>
                    <span className="text-white font-bold truncate max-w-[170px] text-right">
                      {selectedStrap}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Customization Controls */}
              <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-6">
                {/* 1. Case Material */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    <Layers size={14} className="text-primary" />
                    <span>1. CASE MATERIAL / HOUSING ALLOY</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {configOptions.cases.map((option) => {
                      const isSelected = selectedCase === option.name;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setSelectedCase(option.name)}
                          className={`p-2.5 text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-primary/20 border-primary text-white shadow-[2px_2px_0px_0px_rgba(255,191,0,1)]'
                              : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300'
                          }`}
                        >
                          <div className="font-bold text-xs flex items-center justify-between">
                            <span className="truncate">{option.name}</span>
                            {isSelected && (
                              <Check
                                size={14}
                                className="text-primary shrink-0 ml-1"
                              />
                            )}
                          </div>
                          <p className="text-[9px] text-neutral-400 mt-1 line-clamp-2">
                            {option.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Dial Color */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    <Layers size={14} className="text-primary" />
                    <span>2. DIAL & RUNIC TEXTURE</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {configOptions.dials.map((option) => {
                      const isSelected = selectedDial === option.name;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setSelectedDial(option.name)}
                          className={`p-2.5 text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-primary/20 border-primary text-white shadow-[2px_2px_0px_0px_rgba(255,191,0,1)]'
                              : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300'
                          }`}
                        >
                          <div className="font-bold text-xs flex items-center justify-between">
                            <span className="truncate">{option.name}</span>
                            {isSelected && (
                              <Check
                                size={14}
                                className="text-primary shrink-0 ml-1"
                              />
                            )}
                          </div>
                          <p className="text-[9px] text-neutral-400 mt-1 line-clamp-2">
                            {option.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Bezel Style */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    <Layers size={14} className="text-primary" />
                    <span>3. BEZEL & COOLDOWN TRACKER</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {configOptions.bezels.map((option) => {
                      const isSelected = selectedBezel === option.name;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setSelectedBezel(option.name)}
                          className={`p-2.5 text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-primary/20 border-primary text-white shadow-[2px_2px_0px_0px_rgba(255,191,0,1)]'
                              : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300'
                          }`}
                        >
                          <div className="font-bold text-xs flex items-center justify-between">
                            <span className="truncate">{option.name}</span>
                            {isSelected && (
                              <Check
                                size={14}
                                className="text-primary shrink-0 ml-1"
                              />
                            )}
                          </div>
                          <p className="text-[9px] text-neutral-400 mt-1 line-clamp-2">
                            {option.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Strap Type */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    <Layers size={14} className="text-primary" />
                    <span>4. BRACELET & TACTICAL STRAP</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {configOptions.straps.map((option) => {
                      const isSelected = selectedStrap === option.name;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setSelectedStrap(option.name)}
                          className={`p-2.5 text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-primary/20 border-primary text-white shadow-[2px_2px_0px_0px_rgba(255,191,0,1)]'
                              : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300'
                          }`}
                        >
                          <div className="font-bold text-xs flex items-center justify-between">
                            <span className="truncate">{option.name}</span>
                            {isSelected && (
                              <Check
                                size={14}
                                className="text-primary shrink-0 ml-1"
                              />
                            )}
                          </div>
                          <p className="text-[9px] text-neutral-400 mt-1 line-clamp-2">
                            {option.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="bg-[#18181b] border-t-4 border-primary p-4 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 text-xs font-bold uppercase transition-colors cursor-pointer flex items-center space-x-2"
              >
                <RotateCcw size={14} />
                <span>RESET BASE SPECS</span>
              </button>

              <div className="flex items-center space-x-3">
                {isSaved && (
                  <span className="text-xs font-bold text-[#4ade80] flex items-center space-x-1.5 animate-bounce">
                    <Check size={16} />
                    <span>SPECIFICATION FORGED & VAULTED!</span>
                  </span>
                )}

                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-black font-extrabold text-xs uppercase transition-all cursor-pointer border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>
                    {getMasterDb()?.meta?.btnObserveMovementLabel ||
                      '[Observe Movement]'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
