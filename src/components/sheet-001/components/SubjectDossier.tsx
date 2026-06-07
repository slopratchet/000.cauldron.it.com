/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  CharacterRecord,
  LevelProgressionChoice,
  DetailedSkill,
  Capability,
  RegistryNode,
  RegistryItem,
  Arsenal,
  ArsenalWeapon,
  ArsenalAmmo,
  OutfittingPiece,
  LoreProficiencyCard,
  LoreRegisters,
  PsychologySection,
  MentalDiagnosticTracker,
  SupplyMetricTracker,
  OperativeNotes,
  ActionRow,
  VitalRecords,
} from '../types';
import {
  Shield,
  Heart,
  Zap,
  Sword,
  BookOpen,
  Briefcase,
  Activity,
  Sparkles,
  Sliders,
  Compass,
  Dices,
  Skull,
  AlertTriangle,
  Eye,
  ShoppingBag,
  HelpCircle,
  Clock,
  Trash2,
  Plus,
  Shirt,
  Scroll,
  Brain,
  Lock,
  Unlock,
  Fingerprint,
} from 'lucide-react';

interface SubjectDossierProps {
  subject: CharacterRecord;
}

interface RollResult {
  effectName: string;
  category: string;
  roll: number;
  modifier: number;
  total: number;
  timestamp: string;
}

const getSkillClassConnection = (
  skillName: string,
  isClassSkill: boolean,
): string => {
  const norm = skillName.toLowerCase().trim();
  if (norm === 'balance') return 'BARD';
  if (norm === 'barter' || norm === 'appraise') return 'BARD';
  if (norm === 'bluff') return 'BARD';
  if (norm === 'climb') return 'DRUID / RANGER';
  if (norm === 'concentration') return 'SORCERER / BARD';
  if (norm === 'diplomacy') return 'BARD';
  if (norm === 'heal') return 'CLERIC / DRUID';
  if (norm === 'intimidate') return 'BARD / SORCERER';
  if (norm.includes('knowledge') || norm.includes('occult'))
    return 'BARD / SORCERER';
  if (norm === 'listen') return 'BARD / RANGER';
  if (norm === 'move silently' || norm === 'hide') return 'BARD / ROGUE';
  if (norm === 'ride') return 'FIGHTER / RANGER';
  if (norm === 'search') return 'ROGUE / RANGER';
  if (norm === 'sense motive') return 'BARD';
  if (norm === 'spellcraft') return 'SORCERER / BARD';
  if (norm === 'spot') return 'ROGUE / RANGER';
  if (norm === 'survival') return 'RANGER / DRUID';

  return isClassSkill ? 'BARD / SORCERER' : 'CROSS-CLASS';
};

export default function SubjectDossier({ subject }: SubjectDossierProps) {
  const [detailedSkills, setDetailedSkills] = React.useState<DetailedSkill[]>(
    () => {
      return subject.proficiencies.detailedSkills || [];
    },
  );
  const [maxRanks, setMaxRanks] = React.useState<number>(23);

  const [capabilities, setCapabilities] = React.useState<Capability[]>(() => {
    return subject.capabilities || [];
  });

  const [activeRoll, setActiveRoll] = React.useState<RollResult | null>(null);
  const [rollHistory, setRollHistory] = React.useState<RollResult[]>([]);
  const [isRolling, setIsRolling] = React.useState(false);

  React.useEffect(() => {
    if (subject.capabilities) {
      setCapabilities(subject.capabilities);
    } else {
      setCapabilities([]);
    }
  }, [subject]);

  const handleAddCapability = () => {
    const newCap: Capability = {
      category: 'EDUCATION',
      skillAffiliation: 'SURVIVAL',
      rank: 1,
      effectName: 'RESOURCEFUL',
      effectDescription: 'Provides a custom advantage during crafting checks.',
    };
    setCapabilities((prev) => [...prev, newCap]);
  };

  const handleRemoveCapability = (index: number) => {
    setCapabilities((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateCapability = (
    index: number,
    fields: Partial<Capability>,
  ) => {
    setCapabilities((prev) =>
      prev.map((cap, idx) => (idx === index ? { ...cap, ...fields } : cap)),
    );
  };

  const handleRollCheck = (cap: Capability) => {
    setIsRolling(true);
    setActiveRoll(null);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count > 6) {
        clearInterval(interval);
        const roll = Math.floor(Math.random() * 20) + 1;
        const modifier = cap.rank * 2;
        const total = roll + modifier;
        const newRoll: RollResult = {
          effectName: cap.effectName,
          category: cap.category,
          roll,
          modifier,
          total,
          timestamp: new Date().toLocaleTimeString(),
        };
        setActiveRoll(newRoll);
        setRollHistory((prev) => [newRoll, ...prev.slice(0, 9)]);
        setIsRolling(false);
      }
    }, 70);
  };

  const [registries, setRegistries] = React.useState<RegistryNode[]>(() => {
    return subject.registries || [];
  });

  React.useEffect(() => {
    if (subject.registries) {
      setRegistries(subject.registries);
    } else {
      setRegistries([]);
    }
  }, [subject]);

  const handleUpdateRegistryTitle = (nodeId: string, newTitle: string) => {
    setRegistries((prev) =>
      prev.map((reg) =>
        reg.nodeId === nodeId ? { ...reg, title: newTitle } : reg,
      ),
    );
  };

  const handleUpdateRegistryItem = (
    nodeId: string,
    itemIdx: number,
    fields: Partial<RegistryItem>,
  ) => {
    setRegistries((prev) =>
      prev.map((reg) => {
        if (reg.nodeId === nodeId) {
          const updated = reg.items.map((item, idx) =>
            idx === itemIdx ? { ...item, ...fields } : item,
          );
          return { ...reg, items: updated };
        }
        return reg;
      }),
    );
  };

  const handleAddRegistryItem = (nodeId: string) => {
    setRegistries((prev) =>
      prev.map((reg) => {
        if (reg.nodeId === nodeId) {
          return {
            ...reg,
            items: [
              ...reg.items,
              {
                title: 'NEW RECORD TITLE',
                description: 'Empty narrative modifier specification.',
              },
            ],
          };
        }
        return reg;
      }),
    );
  };

  const handleRemoveRegistryItem = (nodeId: string, itemIdx: number) => {
    setRegistries((prev) =>
      prev.map((reg) => {
        if (reg.nodeId === nodeId) {
          return {
            ...reg,
            items: reg.items.filter((_, idx) => idx !== itemIdx),
          };
        }
        return reg;
      }),
    );
  };

  const handleAddRegistryNode = () => {
    const newNodeIdNum = registries.length + 1;
    const newNodeId = `REGISTRY_NODE_${newNodeIdNum.toString().padStart(2, '0')}`;
    const newReg: RegistryNode = {
      nodeId: newNodeId,
      title: 'NEW CATEGORY',
      items: [
        {
          title: 'NEW REGISTRY ENTRY',
          description: 'Enter detailed narrative description properties here.',
        },
      ],
    };
    setRegistries((prev) => [...prev, newReg]);
  };

  const handleRemoveRegistryNode = (nodeId: string) => {
    setRegistries((prev) => prev.filter((reg) => reg.nodeId !== nodeId));
  };

  interface WeaponRollResult {
    weaponName: string;
    roll: number;
    modifier: number;
    total: number;
    damageRoll: string;
    damageResultText: string;
    timestamp: string;
  }

  const [activeWeaponRoll, setActiveWeaponRoll] =
    React.useState<WeaponRollResult | null>(null);
  const [isWeaponRolling, setIsWeaponRolling] = React.useState(false);

  const [arsenal, setArsenal] = React.useState<Arsenal>(() => {
    return subject.arsenal || { weapons: [], ammunition: [] };
  });

  const [outfitting, setOutfitting] = React.useState<OutfittingPiece[]>(() => {
    return subject.outfitting || [];
  });

  const [loreCards, setLoreCards] = React.useState<LoreProficiencyCard[]>(
    () => {
      return subject.proficiencies.loreCards || [];
    },
  );

  const [loreRegisters, setLoreRegisters] = React.useState<LoreRegisters>(
    () => {
      return (
        subject.proficiencies.loreRegisters || {
          savingThrowsHeader: '',
          savingThrowsText: '',
          toolsHeader: '',
          toolsText: '',
          languagesHeader: '',
          languagesText: '',
          combatHeader: '',
          combatText: '',
        }
      );
    },
  );

  const [psychology, setPsychology] = React.useState<PsychologySection>(() => {
    const raw = subject.psychology || {
      diagnostics: {
        insanity: 6,
        corruption: 4,
        synchronicity: 8,
        inspiration: 5,
      },
      supplies: {
        waterWine: 3,
        rations: 5,
        feed: 0,
        stabilizers: 2,
        bioOil: 4,
        weldingSlag: 0,
      },
      manifestations: '',
      operativeNotes: { column1: '', column2: '' },
    };
    return {
      ...raw,
      actions: raw.actions || [
        { actionId: 'ACT_1', name: 'Aim', type: 'Half' },
        { actionId: 'ACT_2', name: 'Cast', type: 'Varies' },
        { actionId: 'ACT_3', name: 'Charge', type: 'Full' },
        { actionId: 'ACT_4', name: 'Move', type: 'Half' },
        { actionId: 'ACT_5', name: 'Standard Attack', type: 'Half' },
      ],
    };
  });

  const [familyHistory, setFamilyHistory] = React.useState<string>(() => {
    return subject.personality.familyHistory || '';
  });

  const [vitalRecords, setVitalRecords] = React.useState<VitalRecords>(() => {
    return (
      subject.vitalRecords || {
        gender: 'femme',
        placeOfBirth: 'INDUSTRIAL SECTOR 4, HAB-BLOCK',
        dateOfBirth: '1942.08.15',
        employerAffiliation: 'CHRONOS SYSTEMS - LOGISTICS',
      }
    );
  });

  const [isDeclassified, setIsDeclassified] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (subject.arsenal) {
      setArsenal(subject.arsenal);
    } else {
      setArsenal({ weapons: [], ammunition: [] });
    }
  }, [subject]);

  React.useEffect(() => {
    if (subject.outfitting) {
      setOutfitting(subject.outfitting);
    } else {
      setOutfitting([]);
    }
  }, [subject]);

  React.useEffect(() => {
    if (subject.proficiencies.loreCards) {
      setLoreCards(subject.proficiencies.loreCards);
    } else {
      setLoreCards([]);
    }
    if (subject.proficiencies.loreRegisters) {
      setLoreRegisters(subject.proficiencies.loreRegisters);
    } else {
      setLoreRegisters({
        savingThrowsHeader: '',
        savingThrowsText: '',
        toolsHeader: '',
        toolsText: '',
        languagesHeader: '',
        languagesText: '',
        combatHeader: '',
        combatText: '',
      });
    }

    if (subject.psychology) {
      setPsychology({
        ...subject.psychology,
        actions: subject.psychology.actions || [
          { actionId: 'ACT_1', name: 'Aim', type: 'Half' },
          { actionId: 'ACT_2', name: 'Cast', type: 'Varies' },
          { actionId: 'ACT_3', name: 'Charge', type: 'Full' },
          { actionId: 'ACT_4', name: 'Move', type: 'Half' },
          { actionId: 'ACT_5', name: 'Standard Attack', type: 'Half' },
        ],
      });
    } else {
      setPsychology({
        diagnostics: {
          insanity: 6,
          corruption: 4,
          synchronicity: 8,
          inspiration: 5,
        },
        supplies: {
          waterWine: 3,
          rations: 5,
          feed: 0,
          stabilizers: 2,
          bioOil: 4,
          weldingSlag: 0,
        },
        manifestations: '',
        operativeNotes: {
          column1:
            'Subject exhibits unusually high base Essence generation parameters, likely linked to the traumatic awakening incident recorded in File #77-A. Diagnostic scans indicate volatile fluctuations during stress events, suggesting the "Nightmares" drawback is a physiological manifestation of excess unstructured magical energy bleeding into the subconscious.',
          column2:
            "Recommend continued observation. Subject's mastery over Occult Knowledge is advancing at an accelerated rate, far outpacing standard training protocols. The current Channeling Level of 4 is borderline unstable for an operative with only 450 total logged field hours. Ensure standard suppression gear is maintained and audited weekly.",
        },
        actions: [
          { actionId: 'ACT_1', name: 'Aim', type: 'Half' },
          { actionId: 'ACT_2', name: 'Cast', type: 'Varies' },
          { actionId: 'ACT_3', name: 'Charge', type: 'Full' },
          { actionId: 'ACT_4', name: 'Move', type: 'Half' },
          { actionId: 'ACT_5', name: 'Standard Attack', type: 'Half' },
        ],
      });
    }

    if (subject.personality && subject.personality.familyHistory) {
      setFamilyHistory(subject.personality.familyHistory);
    } else {
      setFamilyHistory('');
    }

    if (subject.vitalRecords) {
      setVitalRecords(subject.vitalRecords);
    } else {
      setVitalRecords({
        gender: 'femme',
        placeOfBirth: 'INDUSTRIAL SECTOR 4, HAB-BLOCK',
        dateOfBirth: '1942.08.15',
        employerAffiliation: 'CHRONOS SYSTEMS - LOGISTICS',
      });
    }
  }, [subject]);

  const handleUpdateVitalRecord = (
    field: keyof VitalRecords,
    value: string,
  ) => {
    setVitalRecords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateLoreCard = (
    index: number,
    fields: Partial<LoreProficiencyCard>,
  ) => {
    setLoreCards((prev) =>
      prev.map((card, idx) => (idx === index ? { ...card, ...fields } : card)),
    );
  };

  const handleUpdateLoreRegister = (fields: Partial<LoreRegisters>) => {
    setLoreRegisters((prev) => ({ ...prev, ...fields }));
  };

  const handleUpdateMentalDiagnostic = (
    field: keyof MentalDiagnosticTracker,
    value: number,
  ) => {
    setPsychology((prev) => ({
      ...prev,
      diagnostics: {
        ...prev.diagnostics,
        [field]: Math.max(0, Math.min(10, value)),
      },
    }));
  };

  const handleUpdateSupplyMetric = (
    field: keyof SupplyMetricTracker,
    value: number,
  ) => {
    const maxVal = field === 'rations' ? 14 : 10;
    setPsychology((prev) => ({
      ...prev,
      supplies: {
        ...prev.supplies,
        [field]: Math.max(0, Math.min(maxVal, value)),
      },
    }));
  };

  const handleUpdateManifestations = (value: string) => {
    setPsychology((prev) => ({
      ...prev,
      manifestations: value,
    }));
  };

  const handleUpdateOperativeNotes = (fields: Partial<OperativeNotes>) => {
    setPsychology((prev) => ({
      ...prev,
      operativeNotes: {
        ...prev.operativeNotes,
        ...fields,
      },
    }));
  };

  const handleUpdateAction = (actionId: string, fields: Partial<ActionRow>) => {
    setPsychology((prev) => ({
      ...prev,
      actions: (prev.actions || []).map((act) =>
        act.actionId === actionId ? { ...act, ...fields } : act,
      ),
    }));
  };

  const handleAddAction = () => {
    setPsychology((prev) => {
      const actions = prev.actions || [];
      const newId = `ACT_${Date.now()}`;
      return {
        ...prev,
        actions: [
          ...actions,
          { actionId: newId, name: 'New Action', type: 'Half' },
        ],
      };
    });
  };

  const handleDeleteAction = (actionId: string) => {
    setPsychology((prev) => ({
      ...prev,
      actions: (prev.actions || []).filter((act) => act.actionId !== actionId),
    }));
  };

  const handleUpdateWeapon = (
    index: number,
    fields: Partial<ArsenalWeapon>,
  ) => {
    setArsenal((prev) => {
      const updatedWeapons = prev.weapons.map((w, idx) =>
        idx === index ? { ...w, ...fields } : w,
      );
      return { ...prev, weapons: updatedWeapons };
    });
  };

  const handleUpdateOutfittingPiece = (
    index: number,
    fields: Partial<OutfittingPiece>,
  ) => {
    setOutfitting((prev) =>
      prev.map((piece, idx) =>
        idx === index ? { ...piece, ...fields } : piece,
      ),
    );
  };

  const handleUpdateAmmoLine = (
    ammoIdx: number,
    lineIdx: number,
    text: string,
  ) => {
    setArsenal((prev) => {
      const updatedAmmo = prev.ammunition.map((ammo, idx) => {
        if (idx === ammoIdx) {
          const updatedLines = [...ammo.lines];
          updatedLines[lineIdx] = text;
          return { ...ammo, lines: updatedLines };
        }
        return ammo;
      });
      return { ...prev, ammunition: updatedAmmo };
    });
  };

  const handleUpdateAmmoCount = (ammoIdx: number, delta: number) => {
    setArsenal((prev) => {
      const updatedAmmo = prev.ammunition.map((ammo, idx) => {
        if (idx === ammoIdx) {
          const newCount = Math.max(
            0,
            Math.min(ammo.capacity, ammo.currentCount + delta),
          );
          return { ...ammo, currentCount: newCount };
        }
        return ammo;
      });
      return { ...prev, ammunition: updatedAmmo };
    });
  };

  const handleSetAmmoCount = (ammoIdx: number, value: number) => {
    setArsenal((prev) => {
      const updatedAmmo = prev.ammunition.map((ammo, idx) => {
        if (idx === ammoIdx) {
          return { ...ammo, currentCount: value };
        }
        return ammo;
      });
      return { ...prev, ammunition: updatedAmmo };
    });
  };

  const handleRollWeaponAttack = (weapon: ArsenalWeapon) => {
    setIsWeaponRolling(true);
    setActiveWeaponRoll(null);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count > 8) {
        clearInterval(interval);

        // Attack Roll
        const roll = Math.floor(Math.random() * 20) + 1;
        const rawMod = parseInt(weapon.atkBonus.replace(/[+]/g, ''), 10) || 0;
        const total = roll + rawMod;

        // Damage Roll simulation
        let damageVal = 0;
        const damageRegex = /(\d+)d(\d+)\s*\+?\s*(\d+)?/;
        const match = weapon.damage.match(damageRegex);
        let damageDetails = '';
        const damageType = weapon.damage.includes('bludgeoning')
          ? 'Bludgeoning'
          : weapon.damage.includes('piercing')
            ? 'Piercing'
            : 'Damage';

        if (match) {
          const numDice = parseInt(match[1], 10);
          const numSides = parseInt(match[2], 10);
          const constant = parseInt(match[3], 10) || 0;
          let diceTotal = 0;
          for (let i = 0; i < numDice; i++) {
            diceTotal += Math.floor(Math.random() * numSides) + 1;
          }
          damageVal = diceTotal + constant;
          damageDetails = `${numDice}d${numSides}(${diceTotal}) + ${constant} = ${damageVal}`;
        } else {
          // Fallback if match fails
          damageVal = Math.floor(Math.random() * 6) + 4;
          damageDetails = `Simulated count: ${damageVal}`;
        }

        const newRoll: WeaponRollResult = {
          weaponName: weapon.name,
          roll,
          modifier: rawMod,
          total,
          damageRoll: damageDetails,
          damageResultText: `${damageVal} ${damageType}`,
          timestamp: new Date().toLocaleTimeString(),
        };

        setActiveWeaponRoll(newRoll);
        setIsWeaponRolling(false);
      }
    }, 60);
  };

  React.useEffect(() => {
    if (subject.proficiencies.detailedSkills) {
      setDetailedSkills(subject.proficiencies.detailedSkills);
    } else {
      setDetailedSkills([]);
    }
  }, [subject]);

  const handleToggleClassSkill = (index: number) => {
    setDetailedSkills((prev) =>
      prev.map((skill, idx) =>
        idx === index ? { ...skill, isClassSkill: !skill.isClassSkill } : skill,
      ),
    );
  };

  const handleSkillNameChange = (index: number, newName: string) => {
    setDetailedSkills((prev) =>
      prev.map((skill, idx) =>
        idx === index ? { ...skill, name: newName } : skill,
      ),
    );
  };

  const handleKeyAbilityChange = (index: number, newAbility: string) => {
    setDetailedSkills((prev) =>
      prev.map((skill, idx) =>
        idx === index ? { ...skill, keyAbility: newAbility } : skill,
      ),
    );
  };

  const handleNumFieldChange = (
    index: number,
    field: 'abilityMod' | 'ranks' | 'miscMod',
    valStr: string,
  ) => {
    const val = parseInt(valStr, 10) || 0;
    setDetailedSkills((prev) =>
      prev.map((skill, idx) => {
        if (idx === index) {
          const updated = { ...skill, [field]: val };
          updated.modifier =
            updated.abilityMod + updated.ranks + updated.miscMod;
          return updated;
        }
        return skill;
      }),
    );
  };

  const handleRemoveSkill = (index: number) => {
    setDetailedSkills((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddSkill = () => {
    const newSkill: DetailedSkill = {
      isClassSkill: false,
      name: 'NEW_SKILL',
      keyAbility: 'DEX',
      modifier: 0,
      abilityMod: 0,
      ranks: 0,
      miscMod: 0,
    };
    setDetailedSkills((prev) => [...prev, newSkill]);
  };

  // Helper to map item UUIDs to human-friendly names
  const getItemFriendlyName = (itemIdOrUuid: string): string => {
    const inventoryItem = subject.current.inventory.items[itemIdOrUuid];
    const rawName = inventoryItem ? inventoryItem.item_id : itemIdOrUuid;
    return rawName.replace(/_/g, ' ').replace(/-/g, ' ').toUpperCase();
  };

  // Helper to render LevelProgressionChoice properties exhaustively
  const renderChoiceDetails = (choice: LevelProgressionChoice) => {
    return (
      <div className="flex flex-col gap-1 text-[11px] text-slate-800 text-left md:text-right items-start md:items-end w-full">
        <div className="flex gap-1.5 flex-wrap items-center justify-start md:justify-end">
          <span className="text-gray-500 font-bold uppercase tracking-wide">
            {choice.type}:
          </span>
          {choice.value && (
            <span className="font-semibold text-slate-900 border border-black/10 px-1 py-0.5 bg-black/5 rounded-sm uppercase">
              {choice.value}
            </span>
          )}
        </div>

        {choice.values && choice.values.length > 0 && (
          <div className="pl-3 md:pl-0 md:pr-3 border-l md:border-l-0 md:border-r border-black/10 mt-0.5 flex flex-wrap gap-1 md:justify-end">
            {choice.values.map((v, i) => (
              <span
                key={i}
                className="text-[10px] font-medium bg-black/5 border border-black/15 px-1 rounded-none uppercase"
              >
                {v}
              </span>
            ))}
          </div>
        )}

        {choice.choice && (
          <div className="pl-3 md:pl-0 md:pr-3 border-l md:border-l-0 md:border-r border-black/10 mt-1 flex flex-col gap-0.5 text-[10.5px] items-start md:items-end">
            <span className="text-gray-500 font-bold uppercase tracking-tighter">
              SUB_CHOICE: {choice.choice.type}
            </span>
            {choice.choice.increases &&
              choice.choice.increases.map((inc, i) => (
                <div key={i} className="flex gap-1.5 font-mono">
                  <span className="text-gray-600 font-bold uppercase">
                    {inc.score}:
                  </span>
                  <span className="font-mono text-xs font-black">
                    +{inc.value}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Meta Registry Banner (Identity Header) */}
      <div className="border border-black bg-black text-parchment p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute right-[-40px] top-[-10px] text-parchment/5 font-mono text-[90px] font-black pointer-events-none select-none tracking-tighter">
          CHRONOS
        </div>
        <div className="flex flex-col gap-1.5 z-10">
          <h1 className="font-sans text-3xl md:text-4.5xl font-black text-white tracking-widest leading-none">
            {subject.identity.name.toUpperCase()}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono font-medium mt-1">
            <span className="bg-white/10 px-2 py-0.5 border border-white/20 uppercase text-white">
              {subject.identity.species}
            </span>
            <span className="bg-white/10 px-2 py-0.5 border border-white/20 uppercase text-white">
              {subject.identity.background}
            </span>
            <span className="bg-white/10 px-2 py-0.5 border border-white/20 uppercase font-bold text-amber-300">
              {subject.identity.alignment}
            </span>
            <span className="bg-white/15 px-2 py-0.5 border border-white/25 uppercase font-medium text-purple-200">
              is_custom:{' '}
              {subject.is_custom !== undefined
                ? String(subject.is_custom).toUpperCase()
                : 'FALSE'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-[11px] font-mono border-t md:border-t-0 md:border-l border-white/20 pt-3 md:pt-0 md:pl-6 text-dusty-gray shrink-0 z-10">
          <div>
            <span className="text-white font-bold">character_id:</span>{' '}
            {subject.meta.character_id}
          </div>
          <div>
            <span className="text-white font-bold">user_id:</span>{' '}
            {subject.meta.user_id}
          </div>
          <div>
            <span className="text-white font-bold">schemaVersion:</span>{' '}
            {subject.meta.schemaVersion}
          </div>
          <div>
            <span className="text-white font-bold">active_sources:</span>{' '}
            {subject.meta.active_sources.join(', ')}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 flex flex-col gap-0.5">
            <div>createdAt: {subject.meta.createdAt}</div>
            <div>updatedAt: {subject.meta.updatedAt}</div>
          </div>
        </div>
      </div>

      {/* 2. Physical Description, Lore & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Dimensions Scan */}
        <div className="md:col-span-4 border border-black p-5 bg-black/5 flex flex-col justify-between">
          <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase block border-b border-black pb-1.5 mb-3">
            description
          </span>
          <div className="flex flex-col gap-3 font-mono text-xs">
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">age:</span>
              <span>{subject.description.age}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">height:</span>
              <span>{subject.description.height}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">weight:</span>
              <span>{subject.description.weight}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">eyes:</span>
              <span>{subject.description.eyes}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-1">
              <span className="font-bold">hair:</span>
              <span>{subject.description.hair}</span>
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-bold mb-1">skin:</span>
              <p className="text-[11px] leading-tight text-slate-800 italic">
                {subject.description.skin}
              </p>
            </div>
          </div>
        </div>

        {/* Notes details */}
        <div className="md:col-span-8 border border-black p-5 bg-white flex flex-col justify-between relative">
          <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase block border-b border-black pb-1.5 mb-3">
            notes
          </span>
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="font-sans text-lg font-black tracking-tight leading-snug">
              RECORD SUMMARY DETAILS
            </h3>
            <p className="font-serif text-base leading-relaxed text-slate-900 border-l-2 border-black pl-4">
              {subject.notes}
            </p>
          </div>
        </div>
      </div>

      {/* 2.5 Vital Records */}
      <div className="border border-black bg-white my-8 p-6 relative pt-10 shadow-sm">
        <div className="absolute -top-3.5 left-5 bg-black text-white px-3 py-1 text-xs font-mono font-black uppercase tracking-wider border border-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Fingerprint className="w-3.5 h-3.5 text-white" /> VITAL_RECORDS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Gender - top-most record as requested */}
          <div className="md:col-span-2 flex flex-col gap-1 border-b border-black/10 pb-2.5">
            <span className="font-mono text-[9px] font-black tracking-wider text-[#5e5e5e] uppercase">
              GENDER
            </span>
            <span className="font-mono text-sm font-semibold tracking-wide uppercase text-slate-900 pl-1">
              {vitalRecords.gender}
            </span>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1 border-b border-black/10 pb-2.5">
            <span className="font-mono text-[9px] font-black tracking-wider text-[#5e5e5e] uppercase">
              PLACE OF BIRTH
            </span>
            <span className="font-mono text-sm font-semibold tracking-wide uppercase text-slate-900 pl-1">
              {vitalRecords.placeOfBirth}
            </span>
          </div>

          <div className="flex flex-col gap-1 border-b border-black/10 pb-2.5">
            <span className="font-mono text-[9px] font-black tracking-wider text-[#5e5e5e] uppercase">
              DATE OF BIRTH
            </span>
            <span className="font-mono text-sm font-semibold tracking-wide uppercase text-slate-900 pl-1">
              {vitalRecords.dateOfBirth}
            </span>
          </div>

          <div className="flex flex-col gap-1 border-b border-black/10 pb-2.5">
            <span className="font-mono text-[9px] font-black tracking-wider text-[#5e5e5e] uppercase">
              AFFILIATION
            </span>
            <span className="font-mono text-sm font-semibold tracking-wide uppercase text-slate-900 pl-1">
              {vitalRecords.employerAffiliation}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Personality Algorithms */}
      <div className="border border-black p-5 bg-black/5 flex flex-col gap-4">
        <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase border-b border-black pb-1.5 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5" /> personality
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="flex flex-col gap-1 border-l-2 border-black/35 pl-3">
            <span className="font-bold text-gray-600">traits:</span>
            <p className="font-serif text-sm text-slate-800 leading-normal">
              {subject.personality.traits}
            </p>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-black/35 pl-3">
            <span className="font-bold text-gray-600">ideals:</span>
            <p className="font-serif text-sm text-slate-800 leading-normal">
              {subject.personality.ideals}
            </p>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-black/35 pl-3">
            <span className="font-bold text-[#5e5e5e] truncate">bonds:</span>
            <p className="font-serif text-sm text-slate-800 leading-normal">
              {subject.personality.bonds}
            </p>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-black/35 pl-3">
            <span className="font-bold text-[#5e5e5e] truncate">flaws:</span>
            <p className="font-serif text-sm text-slate-800 leading-normal">
              {subject.personality.flaws}
            </p>
          </div>
        </div>
      </div>

      {/* 3.5 Family History */}
      <div className="border border-black bg-white my-8 p-6 relative pt-10 shadow-sm">
        <div className="absolute -top-3.5 left-5 bg-black text-white px-3 py-1 text-xs font-mono font-black uppercase tracking-wider border border-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Scroll className="w-3.5 h-3.5 text-white" /> FAMILY_HISTORY
        </div>

        <div className="flex flex-col gap-2">
          <div className="border border-black p-4 bg-[#FBFBF9]/80">
            <p className="font-serif text-[13.5px] leading-relaxed text-slate-800 text-justify whitespace-pre-wrap">
              {familyHistory || 'No family lineage details recorded.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Core Ability Scores (Ability Attribute Definition block) */}
      <div className="border border-black p-5 bg-white">
        <div className="flex justify-between items-end border-b border-black pb-2.5 mb-5">
          <h2 className="font-sans text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-5 h-5" /> ability score
          </h2>
          <span className="font-mono text-xs text-gray-500 font-bold uppercase">
            method: {subject.definition.abilityScoreGeneration.method}
          </span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 font-mono">
          {Object.entries(subject.definition.abilityScoreGeneration.scores).map(
            ([attr, score]) => {
              const modifier = Math.floor((score - 10) / 2);
              return (
                <div
                  key={attr}
                  className="border-2 border-black p-3.5 flex flex-col items-center justify-center text-center relative group select-none transition-all"
                >
                  <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                    {attr}
                  </span>
                  <span className="text-3xl font-black">{score}</span>
                  <span className="text-xs font-bold bg-black text-parchment py-0.5 px-2 mt-1 border border-black">
                    {modifier >= 0 ? `+${modifier}` : modifier}
                  </span>
                </div>
              );
            },
          )}
        </div>

        {/* Magic Scores Block as requested from attached image */}
        {subject.definition.abilityScoreGeneration.magicScores && (
          <div className="mt-8 border-t border-black/15 pt-6">
            <div className="flex justify-between items-end border-b border-black pb-2 mb-6">
              <h3 className="font-sans text-xl font-bold uppercase tracking-widest text-[#000000]">
                MAGIC SCORES
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                [
                  {
                    key: 'FORC',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .FORC,
                  },
                  {
                    key: 'FRIC',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .FRIC,
                  },
                  {
                    key: 'SPED',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .SPED,
                  },
                  {
                    key: 'MASS',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .MASS,
                  },
                ],
                [
                  {
                    key: 'BEIN',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .BEIN,
                  },
                  {
                    key: 'CTRL',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .CTRL,
                  },
                  {
                    key: 'RSLV',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .RSLV,
                  },
                  {
                    key: 'WITS',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .WITS,
                  },
                ],
                [
                  {
                    key: 'TUDE',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .TUDE,
                  },
                  {
                    key: 'VIZN',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .VIZN,
                  },
                  {
                    key: 'POST',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .POST,
                  },
                  {
                    key: 'STYL',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .STYL,
                  },
                ],
                [
                  {
                    key: 'KOUD',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .KOUD,
                  },
                  {
                    key: 'GRIT',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .GRIT,
                  },
                  {
                    key: 'BYTE',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .BYTE,
                  },
                  {
                    key: 'FLOW',
                    val: subject.definition.abilityScoreGeneration.magicScores
                      .FLOW,
                  },
                ],
              ].map((group, groupIdx) => (
                <div
                  key={groupIdx}
                  className="bg-[#fcfbf9] border border-black/10 p-4 flex flex-col gap-3.5 shadow-sm"
                >
                  {group.map((item) => (
                    <div
                      key={item.key}
                      className="flex justify-between items-center group/magic-item"
                    >
                      <span className="bg-black text-[#F5F2E9] py-0.5 px-2.5 text-[10px] font-mono font-bold tracking-wider text-center min-w-[54px] border border-black select-none">
                        {item.key}
                      </span>
                      <div className="flex-grow border-b border-dotted border-black/35 mx-2 relative top-[2px]" />
                      <span className="font-serif italic text-xs font-semibold text-slate-900 text-right">
                        {item.val || 'undefined'}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Telemetry & Live Variables State */}
      <div className="border border-black p-5 bg-[#eae7e7]/15">
        <div className="flex justify-between items-end border-b border-black pb-2.5 mb-5">
          <h2 className="font-sans text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-5 h-5 text-black" /> current
          </h2>
          <span className="font-mono text-xs text-gray-500 font-bold">
            xp: {subject.current.xp.toLocaleString()}
          </span>
        </div>

        {/* Health, Exhaustion, Inspiration Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* HP Dynamic Core */}
          <div className="border-2 border-black p-4 flex flex-col justify-between bg-white relative">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-bold flex justify-between items-center pb-1 border-b border-black/10">
              currentHp
              <Heart className="w-3.5 h-3.5 fill-orange-800 stroke-orange-800" />
            </span>
            <div className="flex items-baseline justify-between mt-2.5">
              <span className="font-sans text-3.5xl font-black">
                {subject.current.currentHp}
                <span className="text-xs text-gray-500 font-mono font-bold ml-1">
                  / 162
                </span>
              </span>
            </div>
            {/* Health Bar */}
            <div className="w-full h-2 bg-gray-200 mt-2 border border-black relative overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subject.current.currentHp / 162) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Temp HP core */}
          <div className="border-2 border-black p-4 flex flex-col justify-between bg-white">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-bold flex justify-between items-center pb-1 border-b border-black/10">
              temporaryHp
              <Shield className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-baseline justify-between mt-2.5">
              <span className="font-sans text-3.5xl font-black">
                {subject.current.temporaryHp}
              </span>
            </div>
            <span className="block font-mono text-[9px] text-gray-400 mt-2 uppercase">
              BARRIER DEFLECTION BUFFER
            </span>
          </div>

          {/* Exhaustion Levels */}
          <div className="border-2 border-black p-4 flex flex-col justify-between bg-white">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-bold flex justify-between items-center pb-1 border-b border-black/10">
              exhaustionLevel
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-baseline justify-between mt-2.5">
              <span className="font-sans text-3.5xl font-black">
                LVL {subject.current.exhaustionLevel}
              </span>
            </div>
            <span className="block font-mono text-[9px] text-orange-700 font-bold mt-2 uppercase">
              {subject.current.exhaustionLevel === 0
                ? 'STABLE STATE'
                : `ALARM: LEVEL ACTIVE`}
            </span>
          </div>

          {/* Spell casting Inspiration conduit (non-interactive display) */}
          <div
            className={`border-2 border-black p-4 flex flex-col justify-between text-left transition-all select-none ${
              subject.current.inspiration
                ? 'bg-black text-parchment'
                : 'bg-white text-black'
            }`}
          >
            <span
              className={`font-mono text-[10px] uppercase font-bold flex justify-between items-center pb-1 border-b ${
                subject.current.inspiration
                  ? 'border-white/20 text-dusty-gray'
                  : 'border-black/10 text-gray-500'
              }`}
            >
              inspiration
              <Sparkles
                className={`w-3.5 h-3.5 ${subject.current.inspiration ? 'text-amber-400' : ''}`}
              />
            </span>
            <div className="flex justify-between items-end mt-2.5">
              <span className="font-sans text-3.5xl font-black">
                {subject.current.inspiration ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>
            <span className="block font-mono text-[9px] text-gray-400 mt-2 uppercase font-medium">
              CONDUIT TRANSMISSION
            </span>
          </div>
        </div>

        {/* Hit Dice and Death Saves tracker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Used Hit Dice */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              usedHitDice
            </span>
            <div className="flex flex-col gap-3">
              {Object.entries(subject.current.usedHitDice).map(
                ([dice, val]) => (
                  <div key={dice} className="flex justify-between items-center">
                    <span>{dice}:</span>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm">{val} USED</span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Death Saves state */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              deathSaves
            </span>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-emerald-700 font-bold">successes:</span>
                <div className="flex items-center gap-3">
                  <span className="font-black text-sm">
                    {subject.current.deathSaves.successes} / 3
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-orange-800 font-bold">failures:</span>
                <div className="flex items-center gap-3">
                  <span className="font-black text-sm">
                    {subject.current.deathSaves.failures} / 3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources, Item charges, and Used spells blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Used Resources: (Sorcery points, Bardic Inspiration etc) */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              usedResources
            </span>
            <div className="flex flex-col gap-3">
              {Object.entries(subject.current.usedResources).map(
                ([resource, val]) => (
                  <div
                    key={resource}
                    className="flex justify-between items-center"
                  >
                    <span className="font-bold">{resource}:</span>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm">{val} SPENT</span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Used Hardware Item Charges */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              usedItemCharges
            </span>
            <div className="flex flex-col gap-3">
              {Object.entries(subject.current.usedItemCharges).map(
                ([itemUuid, val]) => (
                  <div
                    key={itemUuid}
                    className="flex justify-between items-center"
                  >
                    <span className="font-bold">
                      {getItemFriendlyName(itemUuid)}:
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm">
                        {val} CHARGES USED
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Level Spell slots used registry */}
        <div className="border border-black p-4 bg-white font-mono text-xs mb-6">
          <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
            usedSpellSlots
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {(
              Object.keys(subject.current.usedSpellSlots) as Array<
                keyof typeof subject.current.usedSpellSlots
              >
            ).map((slotKey) => {
              const val = subject.current.usedSpellSlots[slotKey];
              return (
                <div
                  key={slotKey}
                  className="border border-black/15 p-2 bg-black/5 flex flex-col justify-between items-center"
                >
                  <span className="font-bold text-[9px] text-gray-500 uppercase text-center block mb-1">
                    {slotKey}
                  </span>
                  <span className="font-black text-sm block">{val} Spent</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Read-Only Conditions and Active Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conditions Active List */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3 flex justify-between items-center">
              conditions
              <Skull className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-wrap gap-1.5 min-h-12 items-start">
              {subject.current.conditions.length > 0 ? (
                subject.current.conditions.map((cond) => (
                  <span
                    key={cond}
                    className="bg-orange-800 text-parchment font-bold px-2 py-0.5 border border-black rounded-none"
                  >
                    {cond.toUpperCase()}
                  </span>
                ))
              ) : (
                <div className="text-gray-400 italic py-2">
                  No system bio-fault conditions active.
                </div>
              )}
            </div>
          </div>

          {/* Spell Active Effects List */}
          <div className="border border-black p-4 bg-white font-mono text-xs">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3 flex justify-between items-center">
              activeEffects
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div className="flex flex-wrap gap-1.5 min-h-12 items-start">
              {subject.current.activeEffects.length > 0 ? (
                subject.current.activeEffects.map((eff) => (
                  <span
                    key={eff}
                    className="bg-black text-parchment font-bold px-2 py-0.5 border border-black rounded-none"
                  >
                    {eff.toUpperCase()}
                  </span>
                ))
              ) : (
                <div className="text-gray-400 italic py-2">
                  No concurrent magical signals active.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Proficiencies System */}
      <div className="border border-black p-5 bg-white">
        <h2 className="font-sans text-xl font-bold uppercase tracking-wider border-b border-black pb-2.5 mb-5 flex items-center gap-2">
          <Sword className="w-5 h-5 text-black" /> EXPERTISE
        </h2>

        {/* Skill subroutine metrics with mod list */}
        <div className="mb-6">
          <span className="font-mono text-[10px] font-bold text-gray-500 tracking-wider uppercase block border-b border-black/10 pb-1.5 mb-3">
            skills
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {subject.proficiencies.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex justify-between items-center border-b border-black/10 pb-2"
              >
                <div>
                  <span className="font-bold block text-sm">{skill.name}</span>
                  <span className="text-[10px] text-gray-500">
                    {skill.source}
                  </span>
                </div>
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 font-bold uppercase ${
                    skill.modifier === 'expertise'
                      ? 'bg-black text-parchment'
                      : 'bg-black/10 text-black border border-black/25'
                  }`}
                >
                  {skill.modifier === 'expertise' ? 'EXPERT' : skill.modifier}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaponry, Armor, saving throws arrays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="flex flex-col gap-2">
            <div className="border-b border-black/10 pb-1">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                saving_throws
              </span>
              <div className="flex flex-wrap gap-1.5">
                {subject.proficiencies.saving_throws.map((save) => (
                  <span
                    key={save}
                    className="bg-black text-parchment px-2 py-0.5 text-[11px] font-bold uppercase"
                  >
                    {save}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-b border-black/10 pb-1 mt-2">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                armor
              </span>
              <div className="flex flex-wrap gap-1.5">
                {subject.proficiencies.armor.map((val) => (
                  <span
                    key={val}
                    className="border border-black font-bold px-2 py-0.5 text-[11px] uppercase bg-black/5"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-b border-black/10 pb-1 mt-2">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                languages
              </span>
              <div className="flex flex-wrap gap-1.5">
                {subject.proficiencies.languages.map((val) => (
                  <span
                    key={val}
                    className="border border-black font-bold px-2 py-0.5 text-[11px] uppercase bg-black/5"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="border-b border-black/10 pb-1">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                weapons
              </span>
              <p className="text-slate-800 text-xs leading-normal bg-black/5 border border-black p-2 uppercase">
                {subject.proficiencies.weapons.join(', ')}
              </p>
            </div>

            <div className="border-b border-black/10 pb-1 mt-1">
              <span className="font-bold text-gray-500 text-[10px] block mb-1">
                tools
              </span>
              <p className="text-slate-800 text-xs leading-normal bg-black/5 border border-black p-2 uppercase">
                {subject.proficiencies.tools.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6.2 Detailed Proficiencies & Lore Matrix */}
      <div className="border border-black bg-white my-8 p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-black pb-3 mb-6 gap-3">
          <h2 className="font-sans text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <Scroll className="w-5 h-5 text-black" /> EXPERTISE LORE
          </h2>
        </div>

        {/* 6 Cards of modular Expertise/Proficiency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loreCards.map((card, idx) => (
            <div
              key={card.cardId || idx}
              className="border-4 border-black p-5 bg-[#FAFAF9] flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-all"
            >
              {/* Header section containing Type, Name and Modifier */}
              <div className="flex justify-between items-start border-b border-dashed border-black/20 pb-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-gray-500 uppercase">
                    <span className="font-black text-[9px]">{card.type}</span>
                    <span>//</span>
                    <span className="text-black">{card.skillName}</span>
                  </div>
                  <h3 className="text-xl font-sans font-black tracking-tight text-black uppercase mt-1">
                    {card.skillName}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-right">
                  <span className="text-xl md:text-2xl font-sans font-bold text-black text-right border-r pr-2 uppercase">
                    {card.modifier}
                  </span>
                </div>
              </div>

              {/* Body containing Subtitle & Description paragraph */}
              <div className="flex flex-col gap-2 flex-grow">
                <h4 className="font-serif font-bold text-sm text-black">
                  {card.subtitle}
                </h4>
                <p className="font-serif text-[12.5px] leading-relaxed text-slate-800 text-justify whitespace-pre-wrap">
                  {card.description}
                </p>
              </div>

              {/* Footer Calculation details block */}
              <div className="bg-black/5 border border-black/15 p-2 font-mono text-[10px] text-gray-600 flex justify-between items-center mt-2">
                <span className="text-gray-700 font-bold uppercase text-[9px]">
                  {card.footer}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Thick divider exactly like the screenshot */}
        <div className="border-t-4 border-black my-8" />

        {/* 4 Bottom Register Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Saving Throws Register */}
          <div className="border border-black bg-white p-5 flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-gray-400 font-bold block uppercase tracking-wider select-none">
                // SAVING THROWS REGISTER
              </span>
              <h3 className="text-sm font-sans font-black tracking-tight text-black uppercase">
                {loreRegisters.savingThrowsHeader}
              </h3>
              <div className="border-t border-dotted border-black/25 w-full my-0.5" />
              <p className="font-serif text-[12.5px] leading-relaxed text-slate-700 whitespace-pre-wrap text-justify">
                {loreRegisters.savingThrowsText}
              </p>
            </div>
          </div>

          {/* 2. Swamp Tools & Talismans */}
          <div className="border border-black bg-white p-5 flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-gray-400 font-bold block uppercase tracking-wider select-none">
                // SWAMP TOOLS & TALISMANS
              </span>
              <h3 className="text-sm font-sans font-black tracking-tight text-black uppercase">
                {loreRegisters.toolsHeader}
              </h3>
              <div className="border-t border-dotted border-black/25 w-full my-0.5" />
              <p className="font-serif text-[12.5px] leading-relaxed text-slate-700 whitespace-pre-wrap text-justify">
                {loreRegisters.toolsText}
              </p>
            </div>
          </div>

          {/* 3. Linguistic Alignments */}
          <div className="border border-black bg-white p-5 flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-gray-400 font-bold block uppercase tracking-wider select-none">
                // LINGUISTIC ALIGNMENTS
              </span>
              <h3 className="text-sm font-sans font-black tracking-tight text-black uppercase">
                {loreRegisters.languagesHeader}
              </h3>
              <div className="border-t border-dotted border-black/25 w-full my-0.5" />
              <p className="font-serif text-[12.5px] leading-relaxed text-slate-700 whitespace-pre-wrap text-justify">
                {loreRegisters.languagesText}
              </p>
            </div>
          </div>

          {/* 4. Combat Outfitting & Armament */}
          <div className="border border-black bg-white p-5 flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-gray-400 font-bold block uppercase tracking-wider select-none">
                // COMBAT OUTFITTING & ARMAMENT
              </span>
              <h3 className="text-sm font-sans font-black tracking-tight text-black uppercase">
                {loreRegisters.combatHeader}
              </h3>
              <div className="border-t border-dotted border-black/25 w-full my-0.5" />
              <p className="font-serif text-[12.5px] leading-relaxed text-slate-700 whitespace-pre-wrap text-justify">
                {loreRegisters.combatText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6.5 Interactive Skills Matrix Panel */}
      <div className="border border-black bg-white shadow-sm">
        {/* Header Bar */}
        <div className="bg-black text-[#F5F2E9] px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-black select-none">
          <h2 className="font-sans text-xl font-black uppercase tracking-widest text-[#F5F2E9]">
            SKILLS
          </h2>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-white select-none">
            <span className="uppercase text-gray-300">MAX RANKS:</span>
            <span className="bg-white/10 text-white px-2 py-0.5 font-sans font-black text-xs">
              {maxRanks}
            </span>
          </div>
        </div>

        {/* Table Headings & Inputs Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px] text-[#5e5e5e] border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-black/5 border-b border-black/25 uppercase font-bold text-[10px] select-none text-center">
                <th className="py-2.5 px-3 text-left">NAME</th>
                <th className="py-2.5 px-3 text-center w-36">CLASS</th>
                <th className="py-2.5 px-3 text-center w-28">KEY ABILITY</th>
                <th className="py-2.5 px-2 text-center w-36">SKILL MODIFIER</th>
                <th className="py-2.5 px-1 text-center w-6 text-gray-400">=</th>
                <th className="py-2.5 px-2 text-center w-28">
                  ABILITY MODIFIER
                </th>
                <th className="py-2.5 px-1 text-center w-6 text-gray-400">+</th>
                <th className="py-2.5 px-2 text-center w-24">RANKS</th>
                <th className="py-2.5 px-1 text-center w-6 text-gray-400">+</th>
                <th className="py-2.5 px-2 text-center w-28">MISC MODIFIER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {detailedSkills.map((skill, index) => {
                const modVal = skill.abilityMod + skill.ranks + skill.miscMod;
                const modText = modVal >= 0 ? `+${modVal}` : `${modVal}`;

                return (
                  <tr
                    key={index}
                    className="hover:bg-black/[0.01] transition-colors h-11 text-center font-mono text-slate-800"
                  >
                    {/* Skill Name */}
                    <td className="py-1 px-3 text-left font-sans text-xs font-bold text-black uppercase">
                      {skill.name.toUpperCase()}
                    </td>

                    {/* Class indicator */}
                    <td className="py-1 px-3 text-center font-bold text-black font-sans text-[10.5px]">
                      {getSkillClassConnection(skill.name, skill.isClassSkill)}
                    </td>

                    {/* Key Ability */}
                    <td className="py-1 px-3 text-center font-mono text-[11px] font-bold">
                      {skill.keyAbility}
                    </td>

                    {/* Calculated Skill Modifier */}
                    <td className="py-1 px-2 text-center">
                      <div className="inline-block border-2 border-black bg-black text-white font-sans font-black text-xs px-3 py-0.5 text-center min-w-[50px] select-none">
                        {modText}
                      </div>
                    </td>

                    {/* operator = */}
                    <td className="py-1 px-1 text-center text-black font-sans font-bold text-sm select-none">
                      =
                    </td>

                    {/* Ability Modifier display */}
                    <td className="py-1 px-2 text-center font-bold text-black">
                      {skill.abilityMod >= 0
                        ? `+${skill.abilityMod}`
                        : skill.abilityMod}
                    </td>

                    {/* operator + */}
                    <td className="py-1 px-1 text-center text-gray-400 font-sans font-bold text-sm select-none">
                      +
                    </td>

                    {/* Ranks display */}
                    <td className="py-1 px-2 text-center font-bold text-black">
                      {skill.ranks}
                    </td>

                    {/* operator + */}
                    <td className="py-1 px-1 text-center text-gray-400 font-sans font-bold text-sm select-none">
                      +
                    </td>

                    {/* Misc Modifier display */}
                    <td className="py-1 px-2 text-center font-bold text-black">
                      {skill.miscMod >= 0 ? `+${skill.miscMod}` : skill.miscMod}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info counts */}
        <div className="bg-black/5 px-4 py-3 border-t border-black/15 flex justify-between items-center font-mono text-[10px] text-[#5e5e5e] font-bold uppercase select-none">
          <div>{detailedSkills.length} LOGGED SKILL ENTRIES</div>
        </div>
      </div>

      {/* 6.9 Dynamic Capabilities Matrix Panel */}
      <div className="border border-black bg-white shadow-sm my-8">
        {/* Header Bar */}
        <div className="bg-black text-[#F5F2E9] px-4 py-3 border-b border-black select-none">
          <h2 className="font-sans text-xl font-black uppercase tracking-widest text-[#F5F2E9]">
            CAPABILITIES
          </h2>
        </div>

        {/* Live Rolling Console Banner */}
        {(isRolling || activeRoll) && (
          <div className="bg-black text-[#38bdf8] p-4 font-mono text-xs border-b border-black flex flex-col gap-1.5 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
            <div className="flex justify-between items-center border-b border-[#38bdf8]/30 pb-1.5 mb-1">
              <span className="font-bold text-[#fafafa] uppercase flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                CHRONOS_DIODE // REAL-TIME RESOLUTION MATRIX
              </span>
              <button
                type="button"
                onClick={() => setActiveRoll(null)}
                className="text-gray-400 hover:text-white font-bold select-none cursor-pointer"
              >
                [X]
              </button>
            </div>
            {isRolling ? (
              <div className="text-amber-300 flex items-center gap-2">
                <span>&gt;&gt; STABILIZING TEMPORAL CORES...</span>
                <span className="inline-block animate-bounce font-black">
                  d20
                </span>
              </div>
            ) : activeRoll ? (
              <div className="flex flex-col gap-1 select-all h-full">
                <div className="text-[#38bdf8] font-bold">
                  TARGET:{' '}
                  <span className="text-white bg-[#38bdf8]/25 px-1.5 py-0.5">
                    {activeRoll.effectName}
                  </span>{' '}
                  ({activeRoll.category})
                </div>
                <div className="text-sm mt-1 font-bold text-[#34d399] flex items-center gap-2">
                  <span>RESULT:</span>
                  <span className="border border-[#34d399] px-2 py-0.5 bg-[#34d399]/10">
                    d20 ({activeRoll.roll}) + MOD ({activeRoll.modifier}) ={' '}
                    <span className="text-white text-base font-black px-1.5 bg-[#34d399]">
                      {activeRoll.total}
                    </span>
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                  STAMP: {activeRoll.timestamp} // ALL BIOMETRICS STABLE
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Capabilities Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px] text-[#5e5e5e] border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-black/5 border-b border-black/25 uppercase font-bold text-[10px] select-none text-center">
                <th className="py-3 px-4 text-left w-32 text-[#5e5e5e]">
                  CATEGORY
                </th>
                <th className="py-3 px-4 text-left w-44 text-[#5e5e5e]">
                  AFFILIATION
                </th>
                <th className="py-3 px-2 text-center w-24 text-[#5e5e5e]">
                  RANK
                </th>
                <th className="py-3 px-4 text-left text-[#5e5e5e]">
                  EFFECT / NARRATIVE MODIFIER
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {capabilities.map((cap, index) => (
                <tr
                  key={index}
                  className="hover:bg-black/[0.01] transition-colors font-mono"
                >
                  {/* Category Badge */}
                  <td className="py-3 px-4 text-left">
                    <span className="inline-flex items-center bg-[#F1EFEA] border border-black/25 shadow-sm px-2.5 py-1 text-[9px] font-bold font-mono tracking-widest text-[#1a1a1a] uppercase">
                      {cap.category}
                    </span>
                  </td>

                  {/* Skill Affiliation */}
                  <td className="py-3 px-4 text-left font-mono text-xs font-semibold text-slate-800 uppercase tracking-wider">
                    {cap.skillAffiliation}
                  </td>

                  {/* Rank Badge */}
                  <td className="py-3 px-2 text-center">
                    <div className="inline-flex items-center justify-center bg-white border-2 border-black w-8 h-8 font-sans font-black text-sm text-black select-none">
                      {cap.rank}
                    </div>
                  </td>

                  {/* Effect Name and Description */}
                  <td className="py-3 px-4 text-left">
                    <div className="flex flex-col sm:flex-row items-baseline gap-2 w-full">
                      <span className="font-sans font-black text-xs text-black uppercase tracking-wider shrink-0">
                        {cap.effectName}
                      </span>
                      <span className="hidden sm:inline font-mono text-xs text-[#b8b4ab] select-none">
                        |
                      </span>
                      <p className="font-serif italic text-xs font-medium text-slate-800 leading-normal">
                        {cap.effectDescription}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info counts */}
        <div className="bg-black/5 px-4 py-3 border-t border-black/15 flex justify-between items-center font-mono text-[10px] text-[#5e5e5e] font-bold uppercase select-none">
          <div>{capabilities.length} LOGGED CAPABILITIES</div>
        </div>
      </div>

      {/* 7. Spellcasting Matrix protocols */}
      <div className="border border-black p-5 bg-white">
        <h2 className="font-sans text-xl font-bold uppercase tracking-wider border-b border-black pb-2.5 mb-5 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-black" /> spellcasting
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          {subject.spellcasting.sources.map((src) => (
            <div
              key={src.source}
              className="border-l-4 border-black pl-4 flex flex-col gap-3"
            >
              <div className="flex justify-between items-baseline border-b border-black/10 pb-2">
                <span className="font-sans text-lg font-black">
                  {src.source}
                </span>
                <span className="text-[10px] text-gray-500 uppercase">
                  ability: {src.ability}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 font-bold block mb-1.5">
                  cantrips
                </span>
                <div className="flex flex-col gap-1">
                  {src.cantrips.map((spell, idx) => (
                    <div
                      key={idx}
                      className="border border-black/20 border-l-2 border-l-black bg-black/5 p-1.5 px-2.5 text-[10.5px] font-bold uppercase tracking-wide text-slate-800"
                    >
                      {spell}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 font-bold block mb-1.5">
                  known_spells
                </span>
                <div className="flex flex-col gap-1">
                  {src.known_spells.map((spell, idx) => (
                    <div
                      key={idx}
                      className="border border-black/20 border-l-2 border-l-black bg-black/[0.02] p-1.5 px-2.5 text-[10.5px] font-bold uppercase tracking-wide text-slate-900"
                    >
                      {spell}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info counts */}
        <div className="bg-black/5 px-4 py-3 border-t border-black/15 flex justify-between items-center font-mono text-[10px] text-[#5e5e5e] font-bold uppercase select-none mt-5">
          <div className="flex gap-4">
            <span>
              {subject.spellcasting.sources.reduce(
                (sum, src) => sum + (src.cantrips || []).length,
                0,
              )}{' '}
              TOTAL LOGGED CANTRIPS
            </span>
            <span className="text-gray-400">|</span>
            <span>
              {subject.spellcasting.sources.reduce(
                (sum, src) => sum + (src.known_spells || []).length,
                0,
              )}{' '}
              TOTAL LOGGED SPELLS
            </span>
          </div>
        </div>
      </div>

      {/* 8. Full Level 1 to 20 Progression Ledger */}
      <div className="border border-black p-5 bg-white">
        <h2 className="font-sans text-xl font-bold uppercase tracking-wider border-b border-black pb-2.5 mb-5 flex items-center gap-2">
          <Clock className="w-5 h-5 text-black" /> progression
        </h2>
        <div className="flex flex-col gap-3 font-mono text-xs">
          {Object.entries(subject.definition.progression).map(([lvl, info]) => {
            return (
              <div
                key={lvl}
                className="border-b border-black/10 pb-3 flex flex-col md:flex-row gap-2 md:items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="bg-black text-parchment font-black py-0.5 px-2.5 text-sm min-w-10 text-center">
                    {lvl}
                  </span>
                  <div>
                    <span className="font-black text-sm text-slate-950 uppercase">
                      {info.class}
                    </span>
                  </div>
                </div>

                <div className="flex-1 md:text-right flex flex-col gap-1 items-start md:items-end md:pl-8">
                  {info.choices ? (
                    <div className="flex flex-col gap-2 w-full md:items-end">
                      {info.choices.map((choice, choiceIdx) => (
                        <div
                          key={choiceIdx}
                          className="w-full flex md:justify-end"
                        >
                          {renderChoiceDetails(choice)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">
                      No specific upgrade choices compiled
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 9. Asset Manifest - Inventory and Currency buffer */}
      <div className="border border-black p-5 bg-[#eae7e7]/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-black pb-3 mb-5 gap-3">
          <h2 className="font-sans text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> inventory
          </h2>
          <div className="flex gap-3 font-mono text-xs font-bold leading-none py-1 px-3 bg-black text-parchment">
            <span>CP: {subject.current.inventory.currency.cp}</span>
            <span>SP: {subject.current.inventory.currency.sp}</span>
            <span>GP: {subject.current.inventory.currency.gp}</span>
            <span>PP: {subject.current.inventory.currency.pp}</span>
          </div>
        </div>

        {/* Detailed currency readout bank */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 font-mono text-xs bg-white p-4 border border-black">
          {(
            Object.keys(subject.current.inventory.currency) as Array<
              keyof typeof subject.current.inventory.currency
            >
          ).map((coinType) => {
            const coinVal = subject.current.inventory.currency[coinType];
            return (
              <div
                key={coinType}
                className="flex justify-between items-center bg-black/5 p-2"
              >
                <span className="font-bold uppercase tracking-wider">
                  {coinType}:
                </span>
                <span className="font-black">{coinVal}</span>
              </div>
            );
          })}
        </div>

        {/* Items listing readout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-mono text-xs mb-6">
          {/* Main items storage buffer with nested package items */}
          <div className="md:col-span-8 border border-black p-4 bg-white">
            <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-3">
              items
            </span>
            <div className="flex flex-col gap-2">
              {Object.entries(subject.current.inventory.items).map(
                ([uuid, item]) => {
                  const subContents = item.contents;
                  return (
                    <div
                      key={uuid}
                      className="border-b border-black/10 pb-2.5 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-black text-sm block">
                            {item.item_id.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            UUID: {uuid}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-black bg-black text-parchment py-0.5 px-2">
                            QTY: {item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Nested backpacking contents */}
                      {subContents && subContents.length > 0 && (
                        <div className="mt-1.5 bg-black/5 border border-black/15 p-2 flex flex-col gap-1 text-[10.5px]">
                          <span className="font-bold text-gray-500 block text-[9px] uppercase tracking-wider">
                            PACKAGE_ITEMS_CONTAINED_INSIDE:
                          </span>
                          <ul className="list-disc list-inside text-slate-800 space-y-0.5">
                            {subContents.map((insideUuid) => (
                              <li key={insideUuid} className="capitalize">
                                {getItemFriendlyName(insideUuid).toLowerCase()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Active Worn, Held and Attuned items ledger */}
          <div className="md:col-span-4 border border-black p-4 bg-white flex flex-col gap-4">
            <div>
              <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-2.5">
                worn
              </span>
              <ul className="space-y-1.5 font-bold uppercase text-[10px]">
                {subject.current.inventory.loadout.worn.map((wornUuid) => (
                  <li
                    key={wornUuid}
                    className="bg-black/5 p-1 border border-black/10"
                  >
                    {getItemFriendlyName(wornUuid)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-2.5">
                held
              </span>
              <div className="flex flex-col gap-2 font-mono text-[10.5px]">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">main_hand:</span>
                  <span className="font-black">
                    {getItemFriendlyName(
                      subject.current.inventory.loadout.held.main_hand,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">off_hand:</span>
                  <span className="font-black">
                    {getItemFriendlyName(
                      subject.current.inventory.loadout.held.off_hand,
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="font-bold text-[10px] text-gray-500 uppercase tracking-wider block border-b border-black pb-1.5 mb-2.5">
                attuned_items
              </span>
              <div className="flex flex-col gap-1.5 font-bold uppercase text-[10px]">
                {subject.current.inventory.loadout.attuned_items.map((uuid) => (
                  <div
                    key={uuid}
                    className="bg-black text-white p-1 border border-black flex justify-between items-center"
                  >
                    <span>{getItemFriendlyName(uuid)}</span>
                    <span className="text-[8px] bg-amber-400 text-black px-1 font-black">
                      ATTUNED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9.5 Arsenal Matrix */}
      <div className="border border-black bg-[#F1EFEA]/30 shadow-sm my-8 p-5">
        <div className="flex border-b border-black pb-3 mb-5">
          <h2 className="font-sans text-3xl font-black uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
            <Sword className="w-7 h-7 text-black" /> ARSENAL
          </h2>
        </div>

        {/* Live Attack Roll Console Banner */}
        {(isWeaponRolling || activeWeaponRoll) && (
          <div className="bg-black text-[#ea580c] p-4 font-mono text-xs border border-black flex flex-col gap-1.5 mb-6 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
            <div className="flex justify-between items-center border-b border-[#ea580c]/30 pb-1.5 mb-1">
              <span className="font-bold text-[#fafafa] uppercase flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                BALLISTICS DIODE // TARGET ACQUISITION & DAMAGE RESOLUTION
              </span>
              <button
                type="button"
                onClick={() => setActiveWeaponRoll(null)}
                className="text-gray-400 hover:text-white font-bold select-none cursor-pointer"
              >
                [X]
              </button>
            </div>
            {isWeaponRolling ? (
              <div className="text-amber-300 flex items-center gap-2">
                <span>&gt;&gt; RESOLVING TRAJECTORIES...</span>
                <span className="inline-block animate-bounce font-black">
                  d20
                </span>
              </div>
            ) : activeWeaponRoll ? (
              <div className="flex flex-col gap-1 select-all h-full">
                <div className="text-[#ea580c] font-bold">
                  WEAPON:{' '}
                  <span className="text-white bg-[#ea580c]/25 px-1.5 py-0.5">
                    {activeWeaponRoll.weaponName}
                  </span>
                </div>
                <div className="text-sm mt-1 font-bold text-[#34d399] flex flex-col sm:flex-row gap-4">
                  <span className="flex items-center gap-2">
                    ATTACK:
                    <span className="border border-[#34d399] px-2 py-0.5 bg-[#34d399]/10">
                      d20 ({activeWeaponRoll.roll}) + MOD (
                      {activeWeaponRoll.modifier}) ={' '}
                      <span className="text-white text-base font-black px-1.5 bg-[#34d399]">
                        {activeWeaponRoll.total}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    DAMAGE:
                    <span className="border border-[#38bdf8] px-2 py-0.5 bg-[#38bdf8]/10 text-[#38bdf8]">
                      DETAILS: {activeWeaponRoll.damageRoll} &gt;&gt;{' '}
                      <span className="text-white bg-[#38bdf8] font-black px-1.5">
                        {activeWeaponRoll.damageResultText}
                      </span>
                    </span>
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                  TIMESTAMP: {activeWeaponRoll.timestamp} // FIRE_CONTROL
                  RESOLVED
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Weapon Systems Heading */}
        <div className="bg-black text-[#F5F2E9] text-[9.5px] font-mono font-bold tracking-widest px-3 py-1.5 inline-block uppercase select-none mb-4">
          WEAPON_SYSTEMS
        </div>

        <div className="flex flex-col gap-6 mb-8">
          {arsenal.weapons.map((weapon, weaponIdx) => (
            <div
              key={weapon.weaponId || weaponIdx}
              className="border border-black/35 p-4 bg-[#FAFAF9] flex flex-col gap-3"
            >
              {/* Weapon Row Header */}
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 font-bold border-b border-dashed border-black/15 pb-1 select-none">
                <span>WEAPON {weaponIdx + 1} – SPECIFICATIONS</span>
              </div>

              {/* Specification Fields Layout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* 1. Name */}
                <div className="md:col-span-2 border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    WEAPON {weaponIdx + 1}
                  </span>
                  <span className="font-sans font-black text-xs text-black block leading-normal uppercase">
                    {weapon.name}
                  </span>
                </div>

                {/* 2. ATK_BONUS */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    ATK_BONUS
                  </span>
                  <span className="font-sans font-bold text-center text-xs text-black block leading-normal">
                    {weapon.atkBonus}
                  </span>
                </div>

                {/* 3. DAMAGE */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    DAMAGE
                  </span>
                  <span className="font-sans font-bold text-center text-xs text-black block leading-normal uppercase">
                    {weapon.damage}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {/* 4. CRITICAL */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    CRITICAL
                  </span>
                  <span className="font-sans font-medium text-center text-xs text-black block leading-normal">
                    {weapon.critical}
                  </span>
                </div>

                {/* 5. RANGE */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    RANGE
                  </span>
                  <span className="font-sans font-medium text-center text-xs text-black block leading-normal uppercase">
                    {weapon.range}
                  </span>
                </div>

                {/* 6. WEIGHT */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    WEIGHT
                  </span>
                  <span className="font-sans font-medium text-center text-xs text-black block leading-normal">
                    {weapon.weight}
                  </span>
                </div>

                {/* 7. TYPE */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    TYPE
                  </span>
                  <span className="font-sans font-medium text-center text-xs text-black block leading-normal uppercase">
                    {weapon.type}
                  </span>
                </div>

                {/* 8. SIZE */}
                <div className="border border-black bg-white p-2 col-span-2 md:col-span-1">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    SIZE
                  </span>
                  <span className="font-sans font-medium text-center text-xs text-black block leading-normal uppercase">
                    {weapon.size}
                  </span>
                </div>
              </div>

              {/* 9. SPECIAL_PROPERTIES + UUID */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* UUID Box */}
                <div className="border border-black bg-white p-2 md:col-span-1">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    WEAPON UUID
                  </span>
                  <span
                    className="font-mono text-[10px] text-slate-800 font-semibold block leading-normal truncate"
                    title={weapon.weaponId}
                  >
                    {weapon.weaponId}
                  </span>
                </div>

                {/* Special Properties */}
                <div className="border border-black bg-white p-2 md:col-span-3">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    SPECIAL_PROPERTIES
                  </span>
                  <p className="font-sans text-xs text-slate-800 leading-normal uppercase">
                    {weapon.specialProperties}
                  </p>
                </div>
              </div>

              {/* 10. NARRATIVE LORE */}
              <div className="border border-black bg-[#FAF9F5] p-2">
                <span className="font-mono text-[8px] text-orange-850 font-bold uppercase tracking-wider block mb-1">
                  NARRATIVE LORE
                </span>
                <p className="font-serif text-xs italic text-slate-800 leading-relaxed">
                  {weapon.narrativeLore || 'No narrative lore logged yet.'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ammunition Trackers Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {arsenal.ammunition.map((ammo, ammoIdx) => {
            return (
              <div
                key={ammo.ammoId}
                className="border-4 border-black bg-white p-4 flex flex-col gap-4"
              >
                {/* Header Badge */}
                <div className="flex justify-between items-center border-b border-black/10 pb-1.5 select-none">
                  <div className="bg-black text-white text-[9px] font-mono font-bold px-2 py-0.5 inline-block uppercase">
                    AMMO POOL {ammoIdx + 1}
                  </div>
                </div>

                {/* Right Side / Lines */}
                <div className="flex-1 font-mono text-xs flex flex-col justify-center gap-3">
                  {ammo.lines.map((line, lineIdx) => {
                    return (
                      <div
                        key={lineIdx}
                        className="flex flex-col gap-1.5 w-full"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex gap-2 items-baseline">
                            <span className="text-gray-400 text-[10px] uppercase font-bold shrink-0 select-none">
                              L{lineIdx + 1}:
                            </span>
                            <span className="font-bold text-slate-900 leading-normal uppercase">
                              {line}
                            </span>
                          </div>
                          <span
                            className="font-mono text-[8px] text-gray-400 bg-black/[0.03] px-1.5 py-0.5 border border-black/10 select-all max-w-[85px] truncate block uppercase tracking-tight"
                            title={ammo.ammoId}
                          >
                            UUID: {ammo.ammoId}
                          </span>
                        </div>
                        {/* separator below every line */}
                        <div className="border-t border-dotted border-black/30 w-full" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 9.6 Outfitting Matrix */}
      <div className="border border-black bg-[#F1EFEA]/30 shadow-sm my-8 p-5">
        <div className="flex border-b border-black pb-3 mb-5">
          <h2 className="font-sans text-3xl font-black uppercase tracking-widest text-[#1a1a1a] flex items-center gap-2">
            <Shirt className="w-7 h-7 text-black" /> OUTFITTING
          </h2>
        </div>

        {/* Dynamic Outfitting/Armor bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          {outfitting.map((piece, pieceIdx) => (
            <div
              key={piece.pieceId || pieceIdx}
              className="border-4 border-black p-5 bg-[#FAFAF9] flex flex-col gap-4 shadow-sm relative"
            >
              {/* Badge for armor piece ID */}
              <div className="absolute -top-3.5 left-4 bg-black text-[#F5F2E9] text-[9.5px] font-mono font-bold tracking-widest px-3 py-1 select-none uppercase">
                OUTFITTING PIECE {pieceIdx + 1}
              </div>

              {/* Row 1: Item Name and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                {/* Armor Item Name */}
                <div className="sm:col-span-2 border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    ARMOR ITEM
                  </span>
                  <span className="font-sans font-black text-xs text-black block leading-normal uppercase">
                    {piece.name}
                  </span>
                </div>

                {/* Location */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    LOCATION
                  </span>
                  <span className="font-sans font-bold text-xs text-black block leading-normal uppercase">
                    {piece.location}
                  </span>
                </div>
              </div>

              {/* Row 2: Type, Equip Bonus, Proficient */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Type */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    TYPE
                  </span>
                  <span className="font-sans font-medium text-xs text-black block leading-normal uppercase">
                    {piece.type}
                  </span>
                </div>

                {/* Equip Bonus */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    EQUIP_BONUS
                  </span>
                  <span className="font-sans font-bold text-center text-xs text-black block leading-normal text-orange-700 uppercase">
                    {piece.equipBonus}
                  </span>
                </div>

                {/* Proficient Y/N Checkboxes */}
                <div className="border border-black bg-white p-2 select-none">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    PROFICIENT?
                  </span>
                  <span className="font-mono text-xs font-bold leading-none py-0.5 block uppercase text-slate-800">
                    {piece.isProficient ? 'TRAINED' : 'NO / UTTER_DENSE'}
                  </span>
                </div>
              </div>

              {/* Row 3: Penalty, Weight, Speed, Size */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Penalty */}
                <div className="border border-black bg-white p-2 border-r-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    PENALTY
                  </span>
                  <span className="font-sans text-center text-xs text-black block leading-normal uppercase">
                    {piece.penalty}
                  </span>
                </div>

                {/* Weight */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    WEIGHT
                  </span>
                  <span className="font-sans text-center text-xs text-black block leading-normal uppercase">
                    {piece.weight}
                  </span>
                </div>

                {/* Speed */}
                <div className="border border-black bg-white p-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    SPEED
                  </span>
                  <span className="font-sans text-center text-xs text-black block leading-normal uppercase">
                    {piece.speed}
                  </span>
                </div>

                {/* Size */}
                <div className="border border-black bg-white p-2 col-span-2 sm:col-span-1">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    SIZE
                  </span>
                  <span className="font-sans text-center text-xs text-black block leading-normal uppercase">
                    {piece.size}
                  </span>
                </div>
              </div>

              {/* Row 4: Max Dex, Item UUID, Special Properties */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {/* Max Dex */}
                <div className="border border-black bg-white p-2 sm:col-span-1">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    MAX_DEX
                  </span>
                  <span className="font-sans text-center text-xs text-black block leading-normal uppercase">
                    {piece.maxDex}
                  </span>
                </div>

                {/* UUID Box */}
                <div className="border border-black bg-[#FDFDFD] p-2 sm:col-span-1">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    ITEM UUID
                  </span>
                  <span
                    className="font-mono text-[10px] text-slate-800 font-semibold block leading-normal truncate"
                    title={piece.pieceId}
                  >
                    {piece.pieceId}
                  </span>
                </div>

                {/* Special Properties */}
                <div className="border border-black bg-white p-2 sm:col-span-2">
                  <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    SPECIAL_PROPERTIES
                  </span>
                  <p className="font-sans text-xs text-slate-800 leading-normal uppercase">
                    {piece.specialProperties}
                  </p>
                </div>
              </div>

              {/* Row 5: Narrative Lore */}
              <div className="border border-black bg-[#FAF9F5] p-2 mt-4">
                <span className="font-mono text-[8px] text-orange-850 font-bold uppercase tracking-wider block mb-1">
                  NARRATIVE LORE
                </span>
                <p className="font-serif text-xs italic text-slate-800 leading-relaxed">
                  {piece.narrativeLore || 'No narrative lore logged yet.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Character Registry - Affiliations, Desires & Sacrifices */}
      <div className="border border-black p-5 bg-white my-8">
        <div className="flex border-b border-black pb-3 mb-5">
          <h2 className="font-sans text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-black animate-pulse" />{' '}
            AFFILIATIONS
          </h2>
        </div>

        {/* Dynamic Registry Nodes grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-6">
          {registries.map((node) => (
            <div
              key={node.nodeId}
              className="flex flex-col sm:flex-row border-4 border-black bg-[#F1EFEA] min-h-[340px] shadow-sm relative"
            >
              {/* Left Registry header column */}
              <div className="w-full sm:w-1/3 p-4 flex flex-col justify-between border-b sm:border-b-0 sm:border-r-4 border-black bg-[#F1EFEA] select-none">
                <div>
                  <h3 className="font-sans text-xl font-black uppercase tracking-widest text-[#1a1a1a] py-1 leading-tight">
                    {node.title}
                  </h3>
                </div>
              </div>

              {/* Right content list column */}
              <div className="flex-1 bg-[#FAFAF9] flex flex-col divide-y-2 divide-[#121010]/15">
                {node.items.length === 0 ? (
                  <div className="p-6 text-center text-gray-400 font-serif italic text-xs flex-1 flex items-center justify-center">
                    No registry log details compiled.
                  </div>
                ) : (
                  node.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-4 flex flex-col gap-1.5 hover:bg-black/[0.02] transition-all relative group"
                    >
                      {/* Item Title */}
                      <h4 className="font-sans text-xs font-black uppercase tracking-wider text-black">
                        {item.title}
                      </h4>

                      {/* Line separator */}
                      <div className="border-t border-black/30 my-0.5" />

                      {/* Item Description */}
                      <p className="font-serif italic text-xs text-[#2b2927] leading-relaxed whitespace-pre-wrap text-justify">
                        {item.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
        {/* Module A: MENTAL DIAGNOSTICS */}
        <div className="border border-black p-6 bg-white relative pt-10 flex flex-col gap-6 shadow-sm">
          <div className="absolute -top-3.5 left-5 bg-black text-white px-3 py-1 text-xs font-mono font-black uppercase tracking-wider border border-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Brain className="w-3.5 h-3.5 text-white" /> MENTAL_DIAGNOSTICS
          </div>

          {[
            { key: 'insanity', label: 'INSANITY POINTS' },
            { key: 'corruption', label: 'CORRUPTION POINTS' },
            { key: 'synchronicity', label: 'SYNCHRONICITY POINTS' },
            { key: 'inspiration', label: 'INSPIRATION POINTS' },
          ].map(({ key, label }) => {
            const currentVal =
              psychology.diagnostics[key as keyof MentalDiagnosticTracker] || 0;
            return (
              <div
                key={key}
                className="flex flex-col gap-2 border-b border-black/5 pb-2"
              >
                <div className="flex justify-between items-center bg-white">
                  <span className="font-sans text-[12.5px] font-black uppercase tracking-wider text-black">
                    {label}
                  </span>
                  <div className="flex items-center gap-2 select-none font-mono">
                    <span className="text-[9px] font-black text-gray-500 uppercase">
                      CURRENT:
                    </span>
                    <span className="text-sm font-black text-black px-1.5 font-sans">
                      {currentVal}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const isFilled = idx < currentVal;
                      return (
                        <div
                          key={idx}
                          className={`w-[22px] h-[22px] rounded-full border-2 border-black ${
                            isFilled
                              ? 'bg-[#ea580c] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]'
                              : 'bg-white'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <span className="font-mono text-[8px] tracking-widest text-[#a3a3a3] mt-1 select-none">
                    ... MAX 10 ...
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Module B: SUPPLY METRICS */}
        <div className="border border-black p-6 bg-white relative pt-10 flex flex-col gap-5 shadow-sm">
          <div className="absolute -top-3.5 left-5 bg-black text-white px-3 py-1 text-xs font-mono font-black uppercase tracking-wider border border-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <ShoppingBag className="w-3.5 h-3.5 text-white" /> SUPPLY_METRICS
          </div>

          {[
            { key: 'waterWine', label: 'WATER / WINE (WINESKINS)', limit: 10 },
            { key: 'rations', label: 'RATIONS (DAYS)', limit: 14 },
            { key: 'feed', label: 'FEED (MOUNTS/ANIMALS)', limit: 10 },
            {
              key: 'stabilizers',
              label: 'STABILIZERS / ANTIBIOTICS (DOSES)',
              limit: 10,
            },
            {
              key: 'bioOil',
              label: 'BIO-OIL / HYDROCARBONS (LITERS)',
              limit: 10,
            },
            {
              key: 'weldingSlag',
              label: 'WELDING SLAG / SCRAP (KG)',
              limit: 10,
            },
          ].map(({ key, label, limit }) => {
            const currentVal =
              psychology.supplies[key as keyof SupplyMetricTracker] || 0;
            return (
              <div key={key} className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5 select-none text-left">
                  {label}
                </span>

                <div className="flex flex-wrap gap-1.5 max-w-full">
                  {Array.from({ length: limit }).map((_, idx) => {
                    const isChecked = idx < currentVal;
                    return (
                      <div
                        key={idx}
                        className={`w-6 h-6 border-2 border-black flex items-center justify-center font-sans text-xs font-black select-none ${
                          isChecked ? 'bg-amber-50' : 'bg-white'
                        }`}
                      >
                        {isChecked && (
                          <span className="text-[#ea580c] font-black text-lg select-none leading-none">
                            &#x2715;
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Module C: MANIFESTATIONS */}
      <div className="border border-black bg-white my-8 p-6 relative pt-10 shadow-sm">
        <div className="absolute -top-3.5 left-5 bg-black text-white px-3 py-1 text-xs font-mono font-black uppercase tracking-wider border border-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Activity className="w-3.5 h-3.5 text-white" /> MANIFESTATIONS
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 select-none text-left">
            SUBJECT_MANIFESTATIONS
          </span>
          <div className="border border-black p-4 bg-neutral-50/50">
            <p className="font-serif text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap">
              {psychology.manifestations || 'No manifestations logged.'}
            </p>
          </div>
        </div>
      </div>

      {/* Module E: ACTION_SUMMARY */}
      <div className="border border-black bg-white my-8 p-6 relative pt-10 shadow-sm">
        <div className="absolute -top-3.5 left-5 bg-black text-white px-3 py-1 text-xs font-mono font-black uppercase tracking-wider border border-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Activity className="w-3.5 h-3.5 text-white" /> ACTION_SUMMARY
        </div>

        <div className="flex flex-col gap-3">
          {/* Table Header */}
          <div className="flex justify-between font-mono text-[10px] font-black uppercase tracking-wider text-slate-500 pb-1.5 border-b-2 border-black px-1 select-none">
            <span>BASIC ACTION</span>
            <span className="w-24 text-right">TYPE</span>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {(psychology.actions || []).map((action, actionIdx) => {
              return (
                <div
                  key={action.actionId}
                  className="flex justify-between items-center py-3 border-b border-neutral-200/80 px-1 transition-colors hover:bg-neutral-50/40 select-none font-sans"
                >
                  <span className="font-extrabold text-sm text-neutral-900 uppercase">
                    {action.name}
                  </span>
                  <span className="w-24 font-mono font-bold text-sm text-right text-neutral-900 uppercase">
                    {action.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Module D: OPERATIVE_NOTES_[RESTRICTED] */}
      <div className="border border-black bg-white my-8 p-6 relative pt-10 shadow-sm">
        <div className="absolute -top-3.5 left-5 px-3 py-1 text-xs font-mono font-black uppercase tracking-wider border flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-orange-950 border-orange-850 text-orange-100 select-none">
          <Lock className="w-3.5 h-3.5 text-orange-400" />{' '}
          OPERATIVE_NOTES_[RESTRICTED]
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#111111] font-serif text-[13px] leading-[1.7] mb-6 select-text text-justify">
          <div className="whitespace-pre-line p-3 border border-black/10 bg-[#FAFAF9]">
            <span className="font-mono text-[8px] uppercase text-gray-500 font-bold block mb-2 select-none">
              // COLUMN 1 : DIRECTIVES
            </span>
            {psychology.operativeNotes.column1 ||
              'No classified intel recorded.'}
          </div>
          <div className="whitespace-pre-line p-3 border border-black/10 bg-[#FAFAF9]">
            <span className="font-mono text-[8px] uppercase text-gray-500 font-bold block mb-2 select-none">
              // COLUMN 2 : OBSERVATIONS
            </span>
            {psychology.operativeNotes.column2 ||
              'No supplementary observation recorded.'}
          </div>
        </div>
      </div>

      {/* Terminal Live Diagnostics Panel */}
      <div className="border-2 border-black bg-black text-parchment font-mono text-[11px] p-4 flex flex-col gap-1 overflow-hidden select-none mt-8">
        <div className="flex justify-between items-center text-dusty-gray text-[9px] pb-1 border-b border-white/15 mb-1.5">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse" />
            CHRONOS_DIAGNOSTICS_LIVE
          </span>
          <span className="text-[#a5a5a5] font-bold uppercase tracking-wider">
            [STABLE_CONN]
          </span>
        </div>
        <div className="text-gray-400 italic">
          SYSTEM LINKED AND STABLE. BIOMETRIC TRANSMISSIONS COMPLETE.
          SINGLE-SCREEN VIEW MODE ACTIVATED.
        </div>
      </div>
    </div>
  );
}
