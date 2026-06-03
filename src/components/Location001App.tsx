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
      <main className="flex-grow p-[1.5rem] max-w-7xl mx-auto w-full grid grid-cols-12 gap-[1.5rem]">
        <header className="col-span-12 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-[0.5rem] mb-[1rem]">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-tighter leading-none">
              ONTOLOGICAL ENGINE CORE
            </h1>
            <p className="text-sm font-semibold mt-2 opacity-70">
              TRANSLATION PROTOCOL // OPERATION 'CRUCIBLE'
            </p>
          </div>
          <div className="flex gap-4 mt-[1rem] md:mt-0">
            <div className="bg-black text-white px-4 py-2 text-xs font-semibold uppercase">
              STRICT PROTOCOL
            </div>
            <div className="bg-white border-2 border-black px-4 py-2 text-xs font-semibold uppercase">
              REVISION: V.1.0.70
            </div>
          </div>
        </header>

        <section className="col-span-12 lg:col-span-8">
          <div className="border-4 border-black hover:border-red-600 transition-colors bg-white p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="absolute top-4 left-4 text-xs font-semibold bg-black text-white px-2 py-1 z-10">
              FIG. 31: ONTOLOGICAL ENGINE SCHEMATIC
            </div>
            <div className="w-full aspect-video border-2 border-black overflow-hidden relative">
              <img
                alt="Isometric architectural blueprint"
                className="w-full h-full object-contain mix-blend-multiply opacity-90"
                src="https://lh3.googleusercontent.com/aida/ADBb0ujAXcsL9iYKxP6a5CFBD0zT__akuzlz1rR3JJ3FMjGgA1a9xyEBwy3MWAGJbp0pWqvH8S5oo2AY-8iE9vWQrn0Z4Dj8VhFaKiuK7BCJnfzOYyNHTUyWKUKzzgmmtgN_8cffu3ZmA6IFD1T3Q5qoqRwoHHuCha_nC-_lc0vC94UqRGsraXVpYArEPfwIetM07gAT-8Zwlwe90sUkgi5cfrNJ6jiK3c77zf1ZYVg8q3vpyQWN7LuZmM0SJS2t"
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 border-double"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-t-2 border-black pt-4">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#666666] uppercase">
                  Ledger Size
                </span>
                <span className="text-sm font-semibold font-bold">
                  Unfathomable
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#666666] uppercase">
                  Displacement
                </span>
                <span className="text-sm font-semibold font-bold">
                  1000 STARSHIPS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#666666] uppercase">
                  Distance
                </span>
                <span className="text-sm font-semibold font-bold">
                  100 LIGHTYEARS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#666666] uppercase">
                  Status
                </span>
                <span className="text-sm font-semibold font-bold text-red-600">
                  SPIN-UP ACTIVE
                </span>
              </div>
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-[1rem]">
          <div className="border-2 border-black hover:border-red-600 transition-colors bg-white p-[1rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold border-b-2 border-black mb-[0.5rem] flex items-center justify-between">
              ENGINE COMPONENTS
              <span className="material-symbols-outlined">architecture</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-black bg-black"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold font-bold uppercase">
                    Paradox Collider
                  </span>
                  <span className="text-xs font-semibold opacity-60">
                    Cognitive Architecture Annihilation
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-black bg-gray-300"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold font-bold uppercase">
                    Fractal Loom
                  </span>
                  <span className="text-xs font-semibold opacity-60">
                    Syntax Compilation Node
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-black bg-red-600"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold font-bold uppercase">
                    Routing Daemon
                  </span>
                  <span className="text-xs font-semibold opacity-60">
                    Macro-Ledger Checking
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 border-dashed border-2 border-black bg-white"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold font-bold uppercase">
                    Penal Colony Delta-9
                  </span>
                  <span className="text-xs font-semibold opacity-60">
                    Thermodynamic Friction Sink
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="border-2 border-black hover:border-red-600 transition-colors bg-[#f0e6d2] p-[1rem] border-dashed border-2 border-black">
            <h3 className="text-xl font-bold border-b-2 border-black mb-[0.5rem] flex items-center justify-between">
              SYSTEMIC EXECUTION
              <span className="material-symbols-outlined">history_edu</span>
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-black pl-3 py-1">
                <p className="text-xs font-semibold uppercase font-bold text-red-600">
                  01. THE SPIN-UP
                </p>
                <p className="text-base italic leading-tight">
                  Three million vat-grown brains gorged on Free Belief.
                </p>
              </div>
              <div className="border-l-4 border-black pl-3 py-1">
                <p className="text-xs font-semibold uppercase font-bold">
                  02. STATE TRANSLATION
                </p>
                <p className="text-base italic leading-tight">
                  Armada instantaneously rendering in homeworld orbit.
                </p>
              </div>
              <div className="border-l-4 border-black pl-3 py-1 opacity-50">
                <p className="text-xs font-semibold uppercase font-bold">
                  03. GARBAGE COLLECTION
                </p>
                <p className="text-base italic leading-tight">
                  Biological hardware calcifies; colony reduced to radioactive
                  cinder.
                </p>
              </div>
            </div>
          </div>
          <InteractableButton className="w-full bg-orange-600 text-white border-4 border-black py-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 text-xl font-bold uppercase tracking-widest">
            <span>EXECUTE TRANSLATION</span>
            <span className="material-symbols-outlined">verified</span>
          </InteractableButton>
        </aside>

        <section className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-[1.5rem] mt-[2rem]">
          <div className="border-2 border-black hover:border-red-600 transition-colors p-[1rem] bg-white">
            <p className="text-xs font-semibold uppercase opacity-50 mb-1">
              Engine Fuel
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold leading-none">MAX</span>
              <span className="text-sm font-semibold mb-2">/ FREE BELIEF</span>
            </div>
          </div>
          <div className="border-2 border-black hover:border-red-600 transition-colors p-[1rem] bg-white">
            <p className="text-xs font-semibold uppercase opacity-50 mb-1">
              Brain Load
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold leading-none">3,000,000</span>
              <span className="text-sm font-semibold mb-2">/ VAT-GROWN</span>
            </div>
          </div>
          <div className="border-2 border-black hover:border-red-600 transition-colors p-[1rem] bg-white">
            <p className="text-xs font-semibold uppercase opacity-50 mb-1">
              Entropic Debt
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold leading-none text-red-600">
                0
              </span>
              <span className="text-sm font-semibold mb-2">/ LEDGER ZERO</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
