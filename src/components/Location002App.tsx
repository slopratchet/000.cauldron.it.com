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
              THE PRIMAL RECEPTACLE
            </h1>
            <p className="font-label-md text-label-md mt-2 opacity-70">
              SUBJECT ID: ALLIGATOR-FARM-PONDS // REF: STRESS TEST OF CREATION
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
              FIG. 32: BIMODAL SYNTAX MATRIX
            </div>
            <div className="w-full aspect-video ink-border overflow-hidden relative">
              <img
                alt="Isometric architectural blueprint"
                className="w-full h-full object-contain mix-blend-multiply opacity-90"
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80"
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
              SYSTEM COMPONENTS
              <span className="material-symbols-outlined">architecture</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 ink-border bg-black"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    Topological Plumbing
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    Heavy-lead conduits
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 ink-border bg-surface-container-highest"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    Thermal Sink
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    Saturated Silt
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 ink-border bg-[var(--color-blood-red)]"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    Biological Processors
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    The Archosaurs
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 dashed-ink-border bg-white"></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold uppercase">
                    Bimodal Sigil
                  </span>
                  <span className="font-label-sm text-label-sm opacity-60">
                    GET / POST Syntax
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
                  01. THE COMPILATION
                </p>
                <p className="font-body-md text-body-md italic leading-tight">
                  "The GET request is fulfilled. Impossible rain falls."
                </p>
              </div>
              <div className="border-l-4 border-black pl-3 py-1">
                <p className="font-label-sm text-label-sm uppercase font-bold">
                  02. ROUTING OF BLOWBACK
                </p>
                <p className="font-body-md text-body-md italic leading-tight">
                  "Universe generates massive payload of chaotic desiccation."
                </p>
              </div>
              <div className="border-l-4 border-black pl-3 py-1 opacity-50">
                <p className="font-label-sm text-label-sm uppercase font-bold">
                  03. STATE TRANSLATION
                </p>
                <p className="font-body-md text-body-md italic leading-tight">
                  "Route spatial friction to Bimodal Sigil."
                </p>
              </div>
            </div>
          </div>
          <InteractableButton className="w-full bg-[var(--color-primary)] text-white ink-border-heavy py-4 brutalist-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 font-headline-md text-headline-md uppercase tracking-widest">
            <span>EXECUTE MASSIVE STATE TRANSLATION</span>
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
