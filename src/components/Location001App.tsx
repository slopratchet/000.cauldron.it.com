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

export default function Location001App() {
  return (
    <div className="font-body-md text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow p-[var(--spacing-margin-page)] max-w-7xl mx-auto w-full grid grid-cols-12 gap-[var(--spacing-gutter)]">
        <header className="col-span-12 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-[var(--spacing-stack-sm)] mb-[var(--spacing-stack-md)]">
          <div>
            <h1 className="font-headline-xl text-headline-xl uppercase tracking-tighter leading-none">
              ONTOLOGICAL ENGINE
            </h1>
            <p className="font-label-md text-label-md mt-2 opacity-70">
              SUBJECT ID: ENGINE-CORE-1974 // REF: H. KRAMER
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
              FIG. 01: ONTOLOGICAL ENGINE DATACENTER
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
                  Power Draw
                </span>
                <span className="font-label-md text-label-md font-bold">
                  EXAWATT TIER
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[var(--color-ink-wash)] uppercase">
                  Processors
                </span>
                <span className="font-label-md text-label-md font-bold">
                  3M VAT-GROWN BRAINS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[var(--color-ink-wash)] uppercase">
                  Ledger Status
                </span>
                <span className="font-label-md text-label-md font-bold">
                  VECTOR ALPHA (ZEROED)
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[var(--color-ink-wash)] uppercase">
                  Status
                </span>
                <span className="font-label-md text-label-md font-bold text-[var(--color-blood-red)]">
                  SPIN-UP ENGAGED
                </span>
              </div>
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-[var(--spacing-stack-md)]">
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors bg-white p-[var(--spacing-stack-md)] brutalist-shadow">
            <h3 className="font-headline-md text-headline-md border-b-2 border-black mb-[var(--spacing-stack-sm)] flex items-center justify-between">
              DATACENTER ZONES
              <span className="material-symbols-outlined">architecture</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 ink-border bg-black"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    The Paradox Collider
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    Cognitive Annihilation Chamber
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 ink-border bg-surface-container-highest"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    The Fractal Loom
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    Bimodal Syntax Compiler
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 ink-border bg-[var(--color-blood-red)]"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    Macro-Ledger
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    Universe Routing Daemon
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 dashed-ink-border bg-white"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    Penal Colony Delta-9
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    Entropy Dump / Cinder State
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors bg-[var(--color-parchment-deep)] p-[var(--spacing-stack-md)] dashed-ink-border">
            <h3 className="font-headline-md text-headline-md border-b-2 border-black mb-[var(--spacing-stack-sm)] flex items-center justify-between">
              SYSTEMIC EXECUTION
              <span className="material-symbols-outlined">history_edu</span>
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-black pl-3 py-1">
                <p className="font-label-sm text-label-sm uppercase font-bold text-[var(--color-blood-red)]">
                  01. SPIN-UP
                </p>
                <p className="font-body-md text-body-md italic leading-tight">
                  "Three million brains injected with joy and agony."
                </p>
              </div>
              <div className="border-l-4 border-black pl-3 py-1">
                <p className="font-label-sm text-label-sm uppercase font-bold">
                  02. BIMODAL SYNTAX
                </p>
                <p className="font-body-md text-body-md italic leading-tight">
                  "GET: Translate Armada. POST: Route friction to Delta-9."
                </p>
              </div>
              <div className="border-l-4 border-black pl-3 py-1 opacity-50">
                <p className="font-label-sm text-label-sm uppercase font-bold">
                  03. GARBAGE COLLECTION
                </p>
                <p className="font-body-md text-body-md italic leading-tight">
                  "Delta-9 calcifies. Ledger reads zero."
                </p>
              </div>
            </div>
          </div>
          <InteractableButton className="w-full bg-[var(--color-blueprint-orange)] text-white ink-border-heavy py-4 brutalist-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 font-headline-md text-headline-md uppercase tracking-widest">
            <span>INITIATE TRANSLATION</span>
            <span className="material-symbols-outlined">verified</span>
          </InteractableButton>
        </aside>

        <section className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-gutter)] mt-[var(--spacing-stack-lg)]">
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors p-[var(--spacing-stack-md)] bg-white">
            <p className="font-label-sm text-label-sm uppercase opacity-50 mb-1">
              Spatial Friction
            </p>
            <div className="flex items-end gap-2">
              <span className="font-headline-lg text-headline-lg leading-none">
                HIGH
              </span>
              <span className="font-label-md text-label-md mb-2">
                / ENTROPIC DEBT
              </span>
            </div>
          </div>
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors p-[var(--spacing-stack-md)] bg-white">
            <p className="font-label-sm text-label-sm uppercase opacity-50 mb-1">
              Displaced Mass
            </p>
            <div className="flex items-end gap-2">
              <span className="font-headline-lg text-headline-lg leading-none">
                1000
              </span>
              <span className="font-label-md text-label-md mb-2">/ SHIPS</span>
            </div>
          </div>
          <div className="ink-border hover:border-[var(--color-blood-red)] transition-colors p-[var(--spacing-stack-md)] bg-white">
            <p className="font-label-sm text-label-sm uppercase opacity-50 mb-1">
              Closed Loop State
            </p>
            <div className="flex items-end gap-2">
              <span className="font-headline-lg text-headline-lg leading-none text-[var(--color-blood-red)]">
                STABLE
              </span>
              <span className="font-label-md text-label-md mb-2">
                / BALANCED
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
