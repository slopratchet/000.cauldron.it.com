import React, { useState } from 'react';

const InteractableButton = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1000);
    if (props.onClick) props.onClick(e);
  };

  return (
    <button className={className} onClick={handleClick} {...props}>
      {isSyncing ? 'SYNCING...' : children}
    </button>
  );
};

export default function App() {
  return (
    <div className="font-body-md text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow p-[var(--spacing-margin-page)] max-w-7xl mx-auto w-full grid grid-cols-12 gap-[var(--spacing-gutter)]">
        <header className="col-span-12 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-[var(--spacing-stack-sm)] mb-[var(--spacing-stack-md)]">
          <div>
            <h1 className="font-headline-xl text-headline-xl uppercase tracking-tighter leading-none">
              QUARANTINE CABINS
            </h1>
            <p className="font-label-md text-label-md mt-2 opacity-70">
              SUBJECT ID: TAVERN-SEATING-ALPHA-1974 // REF: H. KRAMER
            </p>
          </div>
          <div className="flex gap-4 mt-[var(--spacing-stack-md)] md:mt-0">
            <div className="bg-black text-white px-4 py-2 font-label-sm text-label-sm uppercase">
              STRICT PROTOCOL
            </div>
            <div className="bg-white border-2 border-black px-4 py-2 font-label-sm text-label-sm uppercase">
              REVISION: V.1.0.70
            </div>
          </div>
        </header>

        <section className="col-span-12 lg:col-span-8">
          <div className="ink-border-heavy hover:border-[var(--color-blood-red)] transition-colors bg-white p-4 relative brutalist-shadow bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="absolute top-4 left-4 font-label-sm text-label-sm bg-black text-white px-2 py-1 z-10">
              FIG. 31: PRIMARY THEATER BLUEPRINT
            </div>
            <div className="w-full aspect-video ink-border overflow-hidden relative">
              <img
                alt="Isometric architectural blueprint"
                className="w-full h-full object-contain mix-blend-multiply opacity-90"
                src="https://lh3.googleusercontent.com/aida/ADBb0ujAXcsL9iYKxP6a5CFBD0zT__akuzlz1rR3JJ3FMjGgA1a9xyEBwy3MWAGJbp0pWqvH8S5oo2AY-8iE9vWQrn0Z4Dj8VhFaKiuK7BCJnfzOYyNHTUyWKUKzzgmmtgN_8cffu3ZmA6IFD1T3Q5qoqRwoHHuCha_nC-_lc0vC94UqRGsraXVpYArEPfwIetM07gAT-8Zwlwe90sUkgi5cfrNJ6jiK3c77zf1ZYVg8q3vpyQWN7LuZmM0SJS2t"
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 border-double"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-t-2 border-black pt-4">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[var(--color-ink-wash)] uppercase">
                  Scale
                </span>
                <span className="font-label-md text-label-md font-bold">
                  1:48 (1/4" = 1'-0")
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[var(--color-ink-wash)] uppercase">
                  Capacity
                </span>
                <span className="font-label-md text-label-md font-bold">
                  1200 DEPLOYED UNITS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[var(--color-ink-wash)] uppercase">
                  Last Sync
                </span>
                <span className="font-label-md text-label-md font-bold">
                  14 OCT 1974
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[var(--color-ink-wash)] uppercase">
                  Status
                </span>
                <span className="font-label-md text-label-md font-bold text-[var(--color-blood-red)]">
                  ACTIVE SORTIE
                </span>
              </div>
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-[var(--spacing-stack-md)]">
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors bg-white p-[var(--spacing-stack-md)] brutalist-shadow">
            <h3 className="font-headline-md text-headline-md border-b-2 border-black mb-[var(--spacing-stack-sm)] flex items-center justify-between">
              THEATER ZONES
              <span className="material-symbols-outlined">architecture</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 ink-border bg-black"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    The Pit
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    General Admission / High Density
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 ink-border bg-surface-container-highest"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    Orchestra
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    Tiered Command Seating
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 ink-border bg-[var(--color-blood-red)]"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    Sound Booth
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    Logistics & Comms Hub
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 dashed-ink-border bg-white"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    Mezzanine
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    Strategic Overview Deck
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors bg-[var(--color-parchment-deep)] p-[var(--spacing-stack-md)] dashed-ink-border">
            <h3 className="font-headline-md text-headline-md border-b-2 border-black mb-[var(--spacing-stack-sm)] flex items-center justify-between">
              ACTIVE PLAYS
              <span className="material-symbols-outlined">history_edu</span>
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-black pl-3 py-1">
                <p className="font-label-sm text-label-sm uppercase font-bold text-[var(--color-blood-red)]">
                  01. INFILTRATION
                </p>
                <p className="font-body-md text-body-md italic leading-tight">
                  "The tavern must fall before the moon crests."
                </p>
              </div>
              <div className="border-l-4 border-black pl-3 py-1">
                <p className="font-label-sm text-label-sm uppercase font-bold">
                  02. EXTRACTION
                </p>
                <p className="font-body-md text-body-md italic leading-tight">
                  "Priority target located in the Balcony wings."
                </p>
              </div>
              <div className="border-l-4 border-black pl-3 py-1 opacity-50">
                <p className="font-label-sm text-label-sm uppercase font-bold">
                  03. REGROUP
                </p>
                <p className="font-body-md text-body-md italic leading-tight">
                  "Stand down until further orders from H.K."
                </p>
              </div>
            </div>
          </div>
          <InteractableButton className="w-full bg-[var(--color-blueprint-orange)] text-white ink-border-heavy py-4 brutalist-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 font-headline-md text-headline-md uppercase tracking-widest">
            <span>VALIDATE BLUEPRINT</span>
            <span className="material-symbols-outlined">verified</span>
          </InteractableButton>
        </aside>

        <section className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-gutter)] mt-[var(--spacing-stack-lg)]">
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors p-[var(--spacing-stack-md)] bg-white">
            <p className="font-label-sm text-label-sm uppercase opacity-50 mb-1">
              Environmental Data
            </p>
            <div className="flex items-end gap-2">
              <span className="font-headline-lg text-headline-lg leading-none">
                68°F
              </span>
              <span className="font-label-md text-label-md mb-2">
                / HUMIDITY 45%
              </span>
            </div>
          </div>
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors p-[var(--spacing-stack-md)] bg-white">
            <p className="font-label-sm text-label-sm uppercase opacity-50 mb-1">
              Personnel Load
            </p>
            <div className="flex items-end gap-2">
              <span className="font-headline-lg text-headline-lg leading-none">
                942
              </span>
              <span className="font-label-md text-label-md mb-2">
                / 1200 MAX
              </span>
            </div>
          </div>
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors p-[var(--spacing-stack-md)] bg-white">
            <p className="font-label-sm text-label-sm uppercase opacity-50 mb-1">
              Structural Integrity
            </p>
            <div className="flex items-end gap-2">
              <span className="font-headline-lg text-headline-lg leading-none text-[var(--color-blood-red)]">
                92%
              </span>
              <span className="font-label-md text-label-md mb-2">
                / NOMINAL
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
