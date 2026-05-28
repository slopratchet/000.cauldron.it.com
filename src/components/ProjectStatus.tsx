/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';

// Reusable Brutalist Box with overlapping Tab Header
const BrutalistCard = ({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`relative border-[3px] border-ink bg-surface-lowest p-6 pt-10 sm:p-8 sm:pt-12 ${className}`}
  >
    <div className="absolute -top-[14px] left-6 bg-ink text-surface-lowest font-mono text-xs sm:text-sm font-bold px-3 py-1 uppercase tracking-[0.15em] border border-ink">
      {title}
    </div>
    {children}
  </div>
);

// Metadata form row
const MetadataField = ({
  label,
  value,
  isMultiline = false,
}: {
  label: string;
  value: string;
  isMultiline?: boolean;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
    <label className="w-40 font-mono text-[13px] font-bold uppercase tracking-[0.1em] text-ink shrink-0 sm:pt-3">
      {label}
    </label>
    {isMultiline ? (
      <div className="flex-1 border border-ink p-3 font-serif text-[16px] text-ink min-h-[90px] bg-surface-lowest">
        {value}
      </div>
    ) : (
      <div className="flex-1 border border-ink px-4 py-2 font-serif text-[16px] text-ink bg-surface-lowest whitespace-nowrap overflow-hidden text-ellipsis">
        {value}
      </div>
    )}
  </div>
);

// Progress Bar
const ProgressBar = ({
  label,
  percentage,
  className = '',
}: {
  label: string;
  percentage: number;
  className?: string;
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <div className="flex justify-between font-mono text-[13px] font-bold tracking-[0.1em] uppercase text-ink">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="border border-ink h-[14px] w-full bg-surface-lowest p-[2px]">
      <div
        className="bg-ink h-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

// List row
const ActiveUnitRow = ({ name, task }: { name: string; task: string }) => (
  <div className="flex justify-between items-center border-b border-ink py-4 uppercase font-mono text-[13px] sm:text-[14px] font-bold last:border-b-0">
    <span className="text-ink">{name}</span>
    <span className="text-ink-light tracking-[0.05em]">{task}</span>
  </div>
);

// Git Repo Row
const GitStatusRow = ({
  repo,
  status,
  state = 'PASS',
}: {
  repo: string;
  status: string;
  state?: 'PASS' | 'FAIL' | 'RUN' | 'PENDING';
}) => {
  let stateStyles = 'bg-surface-lowest text-ink';
  if (state === 'FAIL') stateStyles = 'bg-ink text-surface-lowest';
  else if (state === 'RUN') stateStyles = 'bg-surface-dim text-ink';

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-ink py-3 uppercase font-mono text-[13px] sm:text-[14px] font-bold last:border-b-0">
      <span className="text-ink flex items-center truncate">
        <span className="opacity-40 mr-1 sm:mr-2">git/</span>
        {repo}
      </span>
      <span
        className={`shrink-0 tracking-[0.08em] sm:tracking-[0.1em] text-center px-2 py-1 font-bold border border-ink flex items-center justify-center ${stateStyles}`}
      >
        {state === 'RUN' && (
          <span className="inline-block w-2 h-2 bg-ink mr-2 animate-ping" />
        )}
        {status}
      </span>
    </div>
  );
};

// Blocker row
const BlockerRow = ({
  id,
  desc,
  severity,
}: {
  id: string;
  desc: string;
  severity: 'HIGH' | 'CRITICAL';
}) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-ink py-4 uppercase font-mono text-[13px] sm:text-[14px] font-bold last:border-b-0">
    <span className="text-ink truncate">
      {id} <span className="opacity-50">//</span> {desc}
    </span>
    <span
      className={`shrink-0 tracking-[0.1em] text-center px-3 py-1 font-bold ${severity === 'CRITICAL' ? 'bg-ink text-surface-lowest border border-ink' : 'bg-surface-lowest border border-ink text-ink'}`}
    >
      {severity}
    </span>
  </div>
);

// Memory Budget Row
const MemoryBudgetRow = ({
  label,
  usage,
  limit,
  unit,
}: {
  label: string;
  usage: number;
  limit: number;
  unit: string;
}) => {
  const percentage = Math.min((usage / limit) * 100, 100);
  const isWarning = percentage > 85;
  return (
    <div className="flex flex-col gap-1.5 mb-4 last:mb-0">
      <div className="flex justify-between font-mono text-[13px] font-bold tracking-[0.1em] uppercase text-ink">
        <span>{label}</span>
        <span
          className={
            isWarning ? 'bg-ink text-surface-lowest px-2 border border-ink' : ''
          }
        >
          {usage}
          {unit} / {limit}
          {unit}
        </span>
      </div>
      <div className="border border-ink h-[12px] w-full bg-surface-lowest p-[1px]">
        <div
          className={`h-full transition-all duration-500 ease-out flex justify-end ${isWarning ? 'bg-ink' : 'bg-ink'}`}
          style={{ width: `${percentage}%` }}
        >
          {isWarning && (
            <div className="w-[4px] h-full bg-surface-lowest animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};

// Table Header
const TableHeader = () => (
  <div className="hidden md:grid grid-cols-[100px_140px_1fr_120px_100px] gap-4 py-2 px-4 uppercase font-mono text-[12px] font-bold tracking-[0.15em] border-b-[3px] border-ink mb-2">
    <div>Req_ID</div>
    <div>Department</div>
    <div>Description</div>
    <div>Due_Date</div>
    <div className="text-center">Status</div>
  </div>
);

// Table Row
const TableRow = ({
  reqId,
  dept,
  desc,
  date,
  status,
  isLast = false,
}: {
  reqId: string;
  dept: string;
  desc: string;
  date: string;
  status: string;
  isLast?: boolean;
}) => {
  let statusStyles = 'bg-surface-lowest text-ink border-ink';
  if (status === 'BLOCKED')
    statusStyles = 'bg-ink text-surface-lowest border-ink';
  else if (status === 'ACTIVE')
    statusStyles = 'bg-surface-dim text-ink border-ink';
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[100px_140px_1fr_120px_100px] gap-2 md:gap-4 border-b border-ink py-4 uppercase font-mono text-[13px] md:px-4 ${isLast ? 'border-b-0 pb-0' : ''}`}
    >
      <div className="font-bold text-ink flex items-center sm:text-[14px]">
        <span className="md:hidden text-ink-light mr-2">ID:</span>
        {reqId}
      </div>
      <div className="text-ink-light tracking-wide flex items-center">
        {dept}
      </div>
      <div className="text-ink flex items-center font-bold px-0">{desc}</div>
      <div className="text-ink-light flex items-center font-bold">{date}</div>
      <div
        className={`font-bold border px-2 py-1 text-center text-[12px] flex items-center justify-center tracking-[0.1em] ${statusStyles}`}
      >
        {status}
      </div>
    </div>
  );
};

// Server Cluster Row
const ServerClusterRow = ({
  region,
  status,
  load,
  uptime,
}: {
  region: string;
  status: string;
  load: number;
  uptime: string;
}) => {
  let statusStyles = 'bg-surface-lowest text-ink border-ink';
  if (status === 'OFFLINE')
    statusStyles = 'bg-ink text-surface-lowest border-ink';
  else if (status === 'SYNCING')
    statusStyles = 'bg-surface-dim text-ink border-ink';

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-ink py-3 uppercase font-mono text-[13px] sm:text-[14px] font-bold last:border-b-0">
      <span className="text-ink flex items-center font-bold">{region}</span>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-end">
        <span className="text-ink-light tracking-wide opacity-80 shrink-0 text-[11px] sm:text-[13px] hidden sm:block">
          UP: {uptime}
        </span>
        <span className="text-ink-light tracking-wide opacity-80 shrink-0 text-[11px] sm:text-[13px] hidden sm:block">
          LOAD: {load}%
        </span>
        <span
          className={`shrink-0 tracking-[0.1em] text-center px-2 py-1 font-bold border border-ink text-[12px] flex items-center justify-center min-w-[70px] ${statusStyles}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

// Telemetry Dial
const TelemetryDial = ({
  label,
  value,
  unit,
  trend,
}: {
  label: string;
  value: string | number;
  unit: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
}) => (
  <div className="flex flex-col border border-ink p-3 bg-surface-lowest flex-1 min-w-[100px]">
    <div className="flex items-center justify-between mb-2">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-ink-light truncate pr-2">
        {label}
      </span>
      <span
        className={`font-mono text-[10px] font-bold shrink-0 ${trend === 'UP' ? 'text-ink' : trend === 'DOWN' ? 'text-ink-light opacity-50' : 'text-ink-light'}`}
      >
        {trend === 'STABLE' ? '−' : trend === 'UP' ? '▲' : '▼'}
      </span>
    </div>
    <div className="flex items-end gap-1">
      <span className="font-display text-3xl sm:text-4xl font-black text-ink leading-none">
        {value}
      </span>
      <span className="font-mono text-[11px] font-bold uppercase text-ink-light mb-1">
        {unit}
      </span>
    </div>
  </div>
);

// Alert Row
const AlertRow = ({
  name,
  status,
  isAlert = false,
}: {
  name: string;
  status: string;
  isAlert?: boolean;
}) => (
  <div className="flex justify-between items-center border-b border-ink py-3 sm:py-4 uppercase font-mono text-[13px] sm:text-[14px] font-bold last:border-b-0">
    <span className="text-ink truncate pr-2">{name}</span>
    <span
      className={`shrink-0 tracking-[0.1em] px-2 py-1 text-center font-bold border border-transparent ${isAlert ? 'bg-ink text-surface-lowest border-ink animate-pulse' : 'text-ink-light'}`}
    >
      {status}
    </span>
  </div>
);

// Art Concept Item
const ConceptImage = ({
  title,
  status,
  imgHash,
}: {
  title: string;
  status: string;
  imgHash: string;
}) => (
  <div className="border-[2px] border-ink p-2 bg-surface-lowest flex flex-col gap-2 relative group cursor-pointer hover:bg-surface-dim transition-colors">
    <div className="aspect-video border border-ink bg-surface-container overflow-hidden flex items-center justify-center relative">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDggOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIiAvPjwvc3ZnPg==')]" />
      <span className="font-mono text-ink text-[10px] font-bold z-10 bg-surface-lowest px-2 py-0.5 border border-ink opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-ink inline-block animate-ping" />{' '}
        {imgHash}
      </span>
    </div>
    <div className="flex justify-between items-center px-1">
      <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase truncate text-ink pr-2">
        {title}
      </span>
      <span
        className={`font-mono text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 border tracking-widest shrink-0 ${status === 'APPR' ? 'bg-ink text-surface-lowest border-ink' : status === 'REVW' ? 'bg-surface-dim text-ink border-ink' : 'bg-surface-lowest text-ink border-ink'}`}
      >
        {status}
      </span>
    </div>
  </div>
);

// Render Farm Row
const RenderFarmRow = ({
  job,
  frames,
  eta,
}: {
  job: string;
  frames: string;
  eta: string;
}) => (
  <div className="flex justify-between items-center border-b border-ink py-3 uppercase font-mono text-[12px] sm:text-[13px] font-bold last:border-b-0">
    <span className="text-ink truncate pr-2 flex items-center gap-2">
      <span
        className={`w-2 h-2 shrink-0 ${eta === 'DONE' ? 'bg-surface-dim border border-ink' : 'bg-ink animate-pulse'}`}
      />{' '}
      {job}
    </span>
    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
      <span className="text-ink-light hidden sm:block">FRM: {frames}</span>
      <span className="tracking-[0.1em] px-2 py-1 text-center font-bold border border-ink bg-surface-lowest min-w-[60px]">
        {eta}
      </span>
    </div>
  </div>
);

const submissionsData = [
  'SYS_REQ: 4182 - RIGGING VERIFICATION // STATUS: PENDING',
  'SYS_REQ: 4183 - LIGHTING PASS 02 // STATUS: ACTIVE',
  'SYS_REQ: 0092 - AUDIO STEMS DELIVERY // STATUS: LOGGED',
  'SYS_REQ: 3321 - ANIMATION BLOCKOUTS // STATUS: PENDING',
  'SYS_REQ: 9910 - UI/UX WIREFRAMES // STATUS: REVIEW',
  'SYS_REQ: 1104 - TEXTURE OPTIMIZATION // STATUS: ACTIVE',
];

const BrutalistMarquee = ({
  items,
  className = '',
}: {
  items: string[];
  className?: string;
}) => {
  return (
    <div
      className={`relative flex overflow-hidden border-y-[4px] border-ink bg-ink text-surface-lowest py-3 sm:py-4 ${className}`}
    >
      <div className="flex animate-marquee whitespace-nowrap min-w-full w-max">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center mx-6 font-mono text-[14px] sm:text-[16px] uppercase font-bold tracking-[0.15em]"
          >
            {item}
            <span className="ml-12 w-[8px] h-[8px] border-[2px] border-surface-lowest block"></span>
          </span>
        ))}
        {items.map((item, i) => (
          <span
            key={`dup-${i}`}
            className="flex items-center mx-6 font-mono text-[14px] sm:text-[16px] uppercase font-bold tracking-[0.15em]"
          >
            {item}
            <span className="ml-12 w-[8px] h-[8px] border-[2px] border-surface-lowest block"></span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase();

  const filteredSubmissionsData = useMemo(
    () => submissionsData.filter((s) => s.toLowerCase().includes(q)),
    [q],
  );

  const metadata = useMemo(
    () =>
      [
        { label: 'Codename', value: 'Project Obsidian', isMultiline: false },
        { label: 'Engine', value: 'Unreal Engine 5', isMultiline: false },
        {
          label: 'Target Platforms',
          value: 'PC, PS5, XSX',
          isMultiline: false,
        },
        { label: 'Lead Producer', value: 'S. Carter', isMultiline: false },
        { label: 'Next Milestone', value: 'Alpha V0.8.4', isMultiline: false },
        {
          label: 'Objective',
          value:
            'Deliver vertical slice for Q3 investor review. Focus on core combat loop.',
          isMultiline: true,
        },
      ].filter(
        (m) =>
          m.label.toLowerCase().includes(q) ||
          m.value.toLowerCase().includes(q),
      ),
    [q],
  );

  const terminalLogs = useMemo(
    () =>
      [
        {
          time: '10:41:02',
          type: 'WARN',
          msg: 'Render cluster node_04 memory cap reached.',
        },
        {
          time: '10:40:15',
          type: 'INFO',
          msg: "User 'a.smith' pushed 12 commits to origin/main.",
        },
        {
          time: '10:38:50',
          type: 'PASS',
          msg: "Automated test suite 'combat_core' (142/142).",
        },
        {
          time: '10:35:12',
          type: 'ERR!',
          msg: 'Asset server timeout on request payload 0x8A.',
        },
        {
          time: '10:30:00',
          type: 'INFO',
          msg: 'Daily backup sequence initiated.',
        },
      ].filter(
        (log) =>
          log.type.toLowerCase().includes(q) ||
          log.msg.toLowerCase().includes(q),
      ),
    [q],
  );

  const activeUnits = useMemo(
    () =>
      [
        { name: 'Main Repository', task: 'ONLINE' },
        { name: 'Build Farm_01', task: 'BUILDING' },
        { name: 'Asset Server', task: 'ONLINE' },
      ].filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.task.toLowerCase().includes(q),
      ),
    [q],
  );

  const gitStatuses = useMemo(
    () =>
      [
        {
          repo: 'obsidian/core-engine',
          status: 'CI: PASSED',
          state: 'PASS' as const,
        },
        {
          repo: 'obsidian/render-pipeline',
          status: 'CI: BUILDING',
          state: 'RUN' as const,
        },
        {
          repo: 'obsidian/multiplayer-net',
          status: 'CI: FAILED',
          state: 'FAIL' as const,
        },
        {
          repo: 'obsidian/ui-systems',
          status: 'CI: PASSED',
          state: 'PASS' as const,
        },
        {
          repo: 'obsidian/backend-services',
          status: 'CI: PENDING',
          state: 'PENDING' as const,
        },
      ].filter(
        (g) =>
          g.repo.toLowerCase().includes(q) ||
          g.status.toLowerCase().includes(q),
      ),
    [q],
  );

  const upcomingSubmissions = useMemo(
    () =>
      [
        {
          reqId: 'SUB-089',
          dept: 'ENV_ART',
          desc: 'Foliage Mesh Optimization pass 2',
          date: '2024.10.12',
          status: 'PENDING',
        },
        {
          reqId: 'SUB-090',
          dept: 'AUDIO',
          desc: 'Combat Foley Stem Mixdown',
          date: '2024.10.14',
          status: 'BLOCKED',
        },
        {
          reqId: 'SUB-091',
          dept: 'SYS_DES',
          desc: 'Loot Drop Weight Balancing',
          date: '2024.10.15',
          status: 'ACTIVE',
        },
        {
          reqId: 'SUB-092',
          dept: 'ANIM',
          desc: 'Hero Idle Transition Set',
          date: '2024.10.16',
          status: 'REVIEW',
        },
      ].filter(
        (s) =>
          s.reqId.toLowerCase().includes(q) ||
          s.dept.toLowerCase().includes(q) ||
          s.desc.toLowerCase().includes(q) ||
          s.status.toLowerCase().includes(q),
      ),
    [q],
  );

  return (
    <div className="min-h-screen bg-surface p-4 sm:p-8 md:p-12 font-serif text-ink-dim antialiased selection:bg-ink selection:text-surface-lowest">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Group */}
        <div className="flex flex-col gap-4">
          <header className="bg-ink text-surface-lowest p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:justify-between md:items-end border-[4px] border-ink shadow-sm gap-4">
            <h1 className="font-display text-4xl sm:text-6xl md:text-[84px] font-black uppercase tracking-tight leading-none mb-2 md:mb-0">
              Project Status Command
            </h1>
            <div className="flex flex-col items-end gap-4 w-full md:w-auto">
              {/* Search Bar */}
              <div className="flex gap-3 w-full md:w-auto items-stretch">
                <div className="w-full md:w-[350px] flex items-center border-[2px] border-surface-lowest bg-ink px-4 py-3.5">
                  <span className="font-mono text-[13px] uppercase text-surface-dim mr-3">
                    Query:
                  </span>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Filter data..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-surface-lowest font-mono text-[16px] w-full placeholder:text-surface-lowest/40"
                  />
                </div>
                <button
                  type="button"
                  className="bg-surface-lowest text-ink font-mono text-[14px] font-bold tracking-[0.1em] uppercase px-6 hover:bg-surface-dim transition-colors"
                >
                  Submit
                </button>
              </div>
              <div className="font-mono text-[14px] sm:text-[16px] tracking-[0.15em] font-bold uppercase pb-1 flex items-center gap-4">
                <span className="text-surface-dim">Phase:</span>
                <span className="bg-surface-lowest text-ink px-10 py-2 min-w-[160px] text-center whitespace-nowrap border border-surface-lowest">
                  Pre-Prod
                </span>
              </div>
            </div>
          </header>

          <BrutalistMarquee
            items={
              filteredSubmissionsData.length > 0
                ? filteredSubmissionsData
                : ['NO SUBMISSIONS FOUND']
            }
          />
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 items-stretch mt-8">
          {/* Left Column (Metadata) */}
          <div className="xl:col-span-5 flex flex-col h-full gap-12">
            {/* Art / Visual Targets */}
            <BrutalistCard
              title="Daily_Visual_Review"
              className="bg-surface-container"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
                <ConceptImage
                  title="Dungeon_Set_04"
                  status="APPR"
                  imgHash="0x8F9B2A"
                />
                <ConceptImage
                  title="Boss_Rig_V2"
                  status="REVW"
                  imgHash="0x11A0C4"
                />
                <ConceptImage
                  title="UI_HUD_Dark"
                  status="WIP"
                  imgHash="0xFF77E1"
                />
                <ConceptImage
                  title="FX_Spell_Aoe"
                  status="APPR"
                  imgHash="0x8B33FF"
                />
              </div>
            </BrutalistCard>

            {/* Countdown */}
            <BrutalistCard title="Countdown" className="bg-surface-container">
              <div className="flex flex-col gap-2 mt-2">
                <div className="font-mono text-[13px] sm:text-[14px] font-bold tracking-[0.1em] uppercase mb-1 text-ink">
                  Time to Alpha V0.8.4
                </div>
                <div className="flex items-end gap-3">
                  <div className="border-[3px] border-ink px-4 sm:px-6 py-2 sm:py-4 font-display text-5xl sm:text-7xl font-bold bg-ink text-surface-lowest leading-none">
                    14
                  </div>
                  <div className="font-mono text-[16px] sm:text-[24px] font-bold uppercase tracking-[0.1em] pb-2 sm:pb-3">
                    Days
                  </div>
                </div>
              </div>
            </BrutalistCard>

            {/* Project Metadata */}
            <BrutalistCard
              title="Project Metadata"
              className="bg-surface-container"
            >
              <div className="space-y-6">
                {metadata.length > 0 ? (
                  metadata.map((item, idx) => (
                    <MetadataField
                      key={idx}
                      label={item.label}
                      value={item.value}
                      isMultiline={item.isMultiline}
                    />
                  ))
                ) : (
                  <div className="font-mono text-[13px] uppercase text-ink-light py-4 text-center">
                    NO METADATA FOUND
                  </div>
                )}
              </div>
            </BrutalistCard>

            {/* Terminal Echo */}
            <BrutalistCard
              title="Terminal_Echo"
              className="bg-surface-container flex-1 flex flex-col min-h-[300px]"
            >
              <div className="mt-2 bg-ink text-surface-lowest p-4 sm:p-5 border-[2px] border-ink flex-1 flex flex-col">
                <div className="font-mono text-[12px] sm:text-[13px] space-y-2 opacity-95 leading-relaxed tracking-[0.05em] flex-1 overflow-y-auto">
                  {terminalLogs.length > 0 ? (
                    terminalLogs.map((log, idx) => (
                      <div key={idx} className="flex">
                        <span className="text-surface-dim opacity-70 shrink-0 w-20">
                          {log.time}
                        </span>
                        <span className="opacity-30 mx-1">||</span>
                        <span>
                          <span className="font-bold">{log.type}</span>:{' '}
                          {log.msg}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-full text-surface-dim opacity-70">
                      NO MATCHING LOGS
                    </div>
                  )}
                </div>
              </div>
            </BrutalistCard>
          </div>

          {/* Right Column (Status & Logistics) */}
          <div className="xl:col-span-7 flex flex-col gap-12">
            {/* System Status */}
            <BrutalistCard
              title="System_Status"
              className="bg-surface-container"
            >
              <div className="flex flex-col mt-2">
                {activeUnits.map((unit, idx) => (
                  <ActiveUnitRow key={idx} name={unit.name} task={unit.task} />
                ))}

                {gitStatuses.length > 0 && activeUnits.length > 0 && (
                  <div className="border-t-[3px] border-ink my-2 opacity-50" />
                )}

                {gitStatuses.map((git, idx) => (
                  <GitStatusRow
                    key={idx}
                    repo={git.repo}
                    status={git.status}
                    state={git.state}
                  />
                ))}

                {activeUnits.length === 0 && gitStatuses.length === 0 && (
                  <div className="font-mono text-[13px] uppercase text-ink-light py-4 text-center">
                    NO MATCHING STATUSES
                  </div>
                )}
              </div>
            </BrutalistCard>

            {/* Top Span: Asset Categories */}
            <BrutalistCard title="Asset Category">
              <div className="flex flex-col md:flex-row gap-8">
                <ProgressBar
                  label="Character_Unit"
                  percentage={45}
                  className="flex-1"
                />
                <ProgressBar
                  label="Environment_Pod"
                  percentage={60}
                  className="flex-1"
                />
                <ProgressBar
                  label="Loot_Tables"
                  percentage={20}
                  className="flex-1"
                />
              </div>
            </BrutalistCard>

            {/* Bottom Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <BrutalistCard title="Active_Units">
                <div className="flex flex-col mt-2">
                  <ActiveUnitRow name="J. Doe (CHAR)" task="Task: Hero Mesh" />
                  <ActiveUnitRow
                    name="A. Smith (ENV)"
                    task="Task: Tree Set A"
                  />
                  <ActiveUnitRow name="R. Lee (SYS)" task="Task: Drop Rates" />
                </div>
              </BrutalistCard>

              <BrutalistCard title="Sprint">
                <div className="flex flex-col h-full justify-between mt-2 gap-8">
                  <div>
                    <div className="font-mono text-[13px] sm:text-[14px] font-bold tracking-[0.1em] uppercase mb-4 text-ink">
                      Completed Pts
                    </div>
                    <div className="border border-ink px-4 py-3 font-display text-5xl font-bold bg-surface-lowest w-full overflow-hidden text-ellipsis">
                      120
                    </div>
                  </div>
                  {/* Outer Sprint Progress */}
                  <div className="border border-ink h-[16px] w-full bg-surface-lowest p-[2px] mt-auto">
                    <div
                      className="bg-ink h-full transition-all duration-500 ease-out"
                      style={{ width: '68%' }}
                    />
                  </div>
                </div>
              </BrutalistCard>
            </div>

            {/* Bottom Split 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Resource Budgets */}
              <BrutalistCard title="Resource_Budgets">
                <div className="flex flex-col mt-2">
                  <MemoryBudgetRow
                    label="Texture VRAM"
                    usage={7.2}
                    limit={8.0}
                    unit="GB"
                  />
                  <MemoryBudgetRow
                    label="Audio Pool"
                    usage={245}
                    limit={512}
                    unit="MB"
                  />
                  <MemoryBudgetRow
                    label="Active Polys"
                    usage={9.1}
                    limit={10.0}
                    unit="M"
                  />
                </div>
              </BrutalistCard>

              {/* Blockers */}
              <BrutalistCard title="Critical_Blockers">
                <div className="flex flex-col mt-2">
                  <BlockerRow
                    id="SYS_ERR-99"
                    desc="Memory leak in foliage shader"
                    severity="CRITICAL"
                  />
                  <BlockerRow
                    id="ANIM-042"
                    desc="Mocap data retargeting failure"
                    severity="HIGH"
                  />
                </div>
              </BrutalistCard>
            </div>

            {/* Bottom Split 3: Live Infrastructure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <BrutalistCard title="Cluster_Nodes">
                <div className="flex flex-col mt-2">
                  <ServerClusterRow
                    region="NA-EAST-01"
                    status="ONLINE"
                    load={42}
                    uptime="99.9%"
                  />
                  <ServerClusterRow
                    region="NA-WEST-02"
                    status="ONLINE"
                    load={81}
                    uptime="99.9%"
                  />
                  <ServerClusterRow
                    region="EU-CENT-01"
                    status="SYNCING"
                    load={12}
                    uptime="42.1%"
                  />
                  <ServerClusterRow
                    region="AP-TEST-09"
                    status="OFFLINE"
                    load={0}
                    uptime="00.0%"
                  />
                </div>
              </BrutalistCard>

              <BrutalistCard title="Live_Telemetry">
                <div className="flex flex-col h-full gap-4 mt-2">
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
                    <TelemetryDial
                      label="Peak CCU"
                      value="4.2"
                      unit="K"
                      trend="UP"
                    />
                    <TelemetryDial
                      label="Tick Rate"
                      value="60"
                      unit="HZ"
                      trend="STABLE"
                    />
                    <TelemetryDial
                      label="Avg Latency"
                      value="42"
                      unit="MS"
                      trend="DOWN"
                    />
                    <TelemetryDial
                      label="DB Transact"
                      value="1.1"
                      unit="M"
                      trend="UP"
                    />
                  </div>
                </div>
              </BrutalistCard>
            </div>

            {/* Bottom Split 4: Security & Economy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <BrutalistCard title="Security_Watch">
                <div className="flex flex-col mt-2">
                  <AlertRow name="Bot Detection Engine" status="ACTIVE" />
                  <AlertRow
                    name="Trade Anomaly Filters"
                    status="FLAG: 14"
                    isAlert
                  />
                  <AlertRow name="Memory Injection Scan" status="SECURE" />
                  <AlertRow name="Login Rate Limiting" status="NOMINAL" />
                </div>
              </BrutalistCard>

              <BrutalistCard title="Economy_Sync">
                <div className="flex flex-col h-full gap-4 mt-2">
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
                    <TelemetryDial
                      label="Inflation"
                      value="+0.4"
                      unit="%"
                      trend="UP"
                    />
                    <TelemetryDial
                      label="AH Listings"
                      value="1.2"
                      unit="M"
                      trend="UP"
                    />
                    <TelemetryDial
                      label="Gold Sink"
                      value="44"
                      unit="B"
                      trend="STABLE"
                    />
                    <TelemetryDial
                      label="Trade Vol"
                      value="18"
                      unit="K"
                      trend="DOWN"
                    />
                  </div>
                </div>
              </BrutalistCard>
            </div>

            {/* Bottom Split 5: Art Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <BrutalistCard title="Render_Farm_Queue">
                <div className="flex flex-col mt-2">
                  <RenderFarmRow
                    job="CIN_INTRO_SEQ_01"
                    frames="1024-2048"
                    eta="14m"
                  />
                  <RenderFarmRow
                    job="Lightmap_Bake_Z1"
                    frames="ALL"
                    eta="1h20"
                  />
                  <RenderFarmRow
                    job="Shader_Precomp"
                    frames="MAT_773"
                    eta="02m"
                  />
                  <RenderFarmRow
                    job="Hero_Turntable"
                    frames="0-120"
                    eta="DONE"
                  />
                </div>
              </BrutalistCard>

              <BrutalistCard title="Art_Build_Size">
                <div className="flex flex-col h-full gap-4 mt-2">
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
                    <TelemetryDial
                      label="Textures"
                      value="42"
                      unit="GB"
                      trend="UP"
                    />
                    <TelemetryDial
                      label="Models"
                      value="18"
                      unit="GB"
                      trend="STABLE"
                    />
                    <TelemetryDial
                      label="Audio"
                      value="8.4"
                      unit="GB"
                      trend="DOWN"
                    />
                    <TelemetryDial
                      label="Anim Data"
                      value="4.1"
                      unit="GB"
                      trend="UP"
                    />
                  </div>
                </div>
              </BrutalistCard>
            </div>
          </div>
        </div>

        {/* Footer / Horizon Bar */}
        <div className="pt-16 pb-8">
          <h2 className="font-display font-black text-3xl uppercase tracking-tighter mb-4 text-ink">
            Upcoming_Submissions
          </h2>
          <div className="border-t-[10px] border-ink pb-2" />
          <div className="border-t-[3px] border-ink mt-2" />

          <div className="border-[3px] border-ink bg-surface-container p-4 sm:p-6 mt-8 shadow-sm">
            <TableHeader />
            <div className="flex flex-col">
              {upcomingSubmissions.length > 0 ? (
                upcomingSubmissions.map((sub, idx) => (
                  <TableRow
                    key={idx}
                    reqId={sub.reqId}
                    dept={sub.dept}
                    desc={sub.desc}
                    date={sub.date}
                    status={sub.status}
                    isLast={idx === upcomingSubmissions.length - 1}
                  />
                ))
              ) : (
                <div className="font-mono text-[13px] uppercase text-ink-light py-8 text-center border-b border-ink">
                  NO SUBMISSIONS MATCH QUERY '{searchQuery}'
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
