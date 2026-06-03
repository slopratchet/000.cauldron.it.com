import React, { useState } from 'react';

const portraits = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC89Hu_52TdyLqB2irIngndK12akcKx4p_Yw5U6Hr4QBqA7xYNJEjIgfpw0j_ZRDqKFrDBLkV0x6tnXfZo9HGIPfuCYBB99cBT8ILOg50Txa2KsOoQNndUb6tTB7E9_vGA-Jlso3wcc7iDV23wxIsLrDVMMwNfyGE4J-TVt0mgyDwy1ikxr8f-Hub-64rWtzmVT7QKr0ZlO4ihLDSZNXIBTx8H451sXLG-YZPwbSxYvzDv-cCtz7p2N1915uJuvj_UXr4e-mcmTFz-4',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=800',
];

export default function Profile000App() {
  const [activePortrait, setActivePortrait] = useState(portraits[0]);
  const [showStrDetail, setShowStrDetail] = useState(false);
  const [showDexDetail, setShowDexDetail] = useState(false);
  const [showConDetail, setShowConDetail] = useState(false);
  const [showIntDetail, setShowIntDetail] = useState(false);
  const [showWisDetail, setShowWisDetail] = useState(false);
  const [showChaDetail, setShowChaDetail] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-tinos text-base selection:bg-ink selection:text-parchment">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-parchment w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <section className="relative mb-8 md:mb-12 border-b-4 border-ink pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-full md:w-1/2 order-2 md:order-1 pt-6 md:pt-0">
              <div className="z-10 relative translate-y-[30%] -mb-6 md:-mb-12 md:ml-[-16px] lg:ml-[-24px] bg-ink inline-block px-4 py-2 self-start border-2 border-ink">
                <h1 className="font-anton text-[10vw] md:text-5xl lg:text-[76px] leading-[0.9] tracking-[-0.01em] uppercase text-parchment whitespace-nowrap">
                  CHARITY VAUGHN
                </h1>
              </div>
              <div className="border-4 border-ink p-2 bg-white relative z-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative">
                  <img
                    alt="Charity Vaughn - Social Chameleon"
                    className="w-full aspect-square object-cover grayscale contrast-125 border-2 border-ink"
                    src={activePortrait}
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white border-[3px] border-ink p-2 md:p-3 text-center">
                    <span className="font-anton text-xl md:text-2xl tracking-wide uppercase text-ink">
                      SOCIAL CHAMELEON
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col justify-center pt-4 md:pl-12 lg:pl-20">
              <p className="font-mono text-xs md:text-[14px] font-bold uppercase tracking-[0.1em] bg-ink text-parchment px-4 py-2 inline-block self-start mb-6 border-2 border-ink">
                THE IRON FIST IN A VELVET GLOVE
              </p>
              <p className="font-tinos text-lg md:text-[20px] leading-[1.6] italic font-medium">
                "In the game of courts and coin, the loudest voice is rarely the
                most powerful. It is the whisper that guides the blade, and the
                smile that masks the poison."
              </p>
              <div className="mt-8 flex gap-3">
                {portraits.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePortrait(img)}
                    className={`w-8 h-8 md:w-10 md:h-10 border-2 border-ink flex items-center justify-center font-mono text-sm font-bold shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer ${activePortrait === img ? 'bg-ink text-parchment' : 'bg-white text-ink'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button className="mt-6 block w-full bg-[#cc5500] text-parchment font-anton text-2xl md:text-3xl py-3 border-[3px] border-ink shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase cursor-pointer text-center">
                Reserve CHARITY
              </button>
              <div className="mt-4 relative">
                <select className="w-full appearance-none bg-white border-[3px] border-ink py-3 pl-4 pr-10 font-mono font-bold uppercase text-ink shadow-[4px_4px_0px_0px_#000000] cursor-pointer focus:outline-none focus:ring-0 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all">
                  <option value="week-22">[week 22 : attached]</option>
                  <option value="week-23">[week 23 : attached]</option>
                  <option value="week-24">[week 24 : open]</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink">
                  <svg
                    className="fill-current h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Left Column (Lore & Spells) */}
          <div className="lg:col-span-2 space-y-10">
            <div className="border-l-[6px] border-ink pl-6">
              <h2 className="font-anton text-4xl md:text-[48px] leading-[1.1] tracking-[0.01em] uppercase mb-6 text-ink">
                A MASTER OF PERSUASION
              </h2>
              <p className="font-tinos text-lg md:text-[18px] leading-[1.8] text-ink">
                Charity Vaughn does not merely enter a room; she subsumes it. As
                a social chameleon and mastermind, her presence is a carefully
                curated performance. With large observant hazel eyes that see
                through the most intricate deceptions, she navigates the highest
                echelons of society with a grace that is as lethal as it is
                beautiful.
              </p>

              <blockquote className="font-anton text-2xl md:text-[28px] leading-[1.3] uppercase my-8 bg-ink text-[#cc5500] p-6 md:p-8 border-2 border-ink shadow-[4px_4px_0px_0px_#E6E2D8,6px_6px_0px_0px_#000]">
                "TRUST IS THE MOST EXPENSIVE CURRENCY IN THE REALM. I PREFER TO
                DEAL IN DEBT."
              </blockquote>

              <p className="font-tinos text-lg md:text-[18px] leading-[1.8] text-ink">
                Her bonds are not forged in blood, but in the intricate web of
                favors and secrets she maintains across the continent. To some,
                she is a savior; to others, a shadow. To all, she is the
                architect of her own destiny.
              </p>
            </div>

            <div className="bg-[#e2e2e2] p-6 md:p-8 border-4 border-ink">
              <h3 className="font-anton text-2xl md:text-[28px] leading-[1.2] uppercase border-b-4 border-ink mb-6 pb-3 text-ink">
                PLAYER HIGHLIGHTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-white border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-crosshair">
                  <p className="font-mono text-sm font-bold tracking-[0.1em] uppercase mb-3 border-b border-dashed border-ink/30 pb-2">
                    SILVERY BARBS
                  </p>
                  <p className="font-tinos text-[16px] leading-relaxed">
                    A momentary lapse in an opponent's focus, engineered by a
                    single sharp word.
                  </p>
                </div>
                <div className="p-5 bg-white border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-crosshair">
                  <p className="font-mono text-sm font-bold tracking-[0.1em] uppercase mb-3 border-b border-dashed border-ink/30 pb-2">
                    MIND BLANK
                  </p>
                  <p className="font-tinos text-[16px] leading-relaxed">
                    The ultimate mental fortress, rendering her thoughts
                    invisible to even the most powerful seers.
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-16 w-full block bg-ink text-parchment font-anton text-2xl md:text-3xl py-4 border-[3px] border-ink shadow-[4px_4px_0px_0px_#cc5500] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#cc5500] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase cursor-pointer text-center">
              Embrace more of CHARITY
            </button>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="space-y-8">
            <div className="border-[6px] border-ink p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-anton text-[28px] leading-none uppercase border-b-4 border-ink pb-3 mb-6 bg-ink text-parchment px-3 pt-2 -mx-3 -mt-3">
                TECHNICAL DOSSIER
              </h3>

              <div className="font-mono text-[14px] font-bold uppercase mb-8 space-y-2 tracking-tight">
                <p className="flex justify-between border-b border-dotted border-ink/50 pb-1">
                  <span>LEVEL:</span> <span>20</span>
                </p>
                <p className="flex justify-between border-b border-dotted border-ink/50 pb-1">
                  <span>CLASS:</span> <span>POLYMATH/MAESTRO</span>
                </p>
                <p className="flex justify-between border-b border-dotted border-ink/50 pb-1">
                  <span>ARCHETYPE:</span> <span>MASTERMIND</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 gap-y-6">
                <div
                  className="border-4 border-ink p-2 text-center group hover:bg-ink hover:text-parchment transition-colors cursor-pointer relative"
                  onClick={() => setShowStrDetail(!showStrDetail)}
                >
                  <p className="font-mono text-[11px] font-bold tracking-widest uppercase absolute -top-3 left-1/2 -translate-x-1/2 bg-white group-hover:bg-ink px-2 border-x-2 border-t-2 border-ink transition-colors">
                    STR
                  </p>
                  <p className="font-anton text-[36px] leading-none pt-3">10</p>
                  {showStrDetail && (
                    <div className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border-2 border-ink p-2 shadow-[4px_4px_0px_0px_#000] text-ink text-left text-xs font-mono lowercase">
                      able to lift about 100 lbs over the head
                    </div>
                  )}
                </div>
                <div
                  className="border-4 border-ink p-2 text-center group hover:bg-ink hover:text-parchment transition-colors cursor-pointer relative"
                  onClick={() => setShowDexDetail(!showDexDetail)}
                >
                  <p className="font-mono text-[11px] font-bold tracking-widest uppercase absolute -top-3 left-1/2 -translate-x-1/2 bg-white group-hover:bg-ink px-2 border-x-2 border-t-2 border-ink transition-colors">
                    DEX
                  </p>
                  <p className="font-anton text-[36px] leading-none pt-3">14</p>
                  {showDexDetail && (
                    <div className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border-2 border-ink p-2 shadow-[4px_4px_0px_0px_#000] text-ink text-left text-xs font-mono lowercase">
                      able to dodge most incoming attacks
                    </div>
                  )}
                </div>
                <div
                  className="border-4 border-ink p-2 text-center group hover:bg-ink hover:text-parchment transition-colors cursor-pointer relative"
                  onClick={() => setShowConDetail(!showConDetail)}
                >
                  <p className="font-mono text-[11px] font-bold tracking-widest uppercase absolute -top-3 left-1/2 -translate-x-1/2 bg-white group-hover:bg-ink px-2 border-x-2 border-t-2 border-ink transition-colors">
                    CON
                  </p>
                  <p className="font-anton text-[36px] leading-none pt-3">12</p>
                  {showConDetail && (
                    <div className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border-2 border-ink p-2 shadow-[4px_4px_0px_0px_#000] text-ink text-left text-xs font-mono lowercase">
                      average health and endurance limits
                    </div>
                  )}
                </div>
                <div
                  className="border-4 border-ink p-2 text-center group hover:bg-ink hover:text-parchment transition-colors cursor-pointer relative"
                  onClick={() => setShowIntDetail(!showIntDetail)}
                >
                  <p className="font-mono text-[11px] font-bold tracking-widest uppercase absolute -top-3 left-1/2 -translate-x-1/2 bg-white group-hover:bg-ink px-2 border-x-2 border-t-2 border-ink transition-colors">
                    INT
                  </p>
                  <p className="font-anton text-[36px] leading-none pt-3">18</p>
                  {showIntDetail && (
                    <div className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border-2 border-ink p-2 shadow-[4px_4px_0px_0px_#000] text-ink text-left text-xs font-mono lowercase">
                      genius level intellect and reasoning
                    </div>
                  )}
                </div>
                <div
                  className="border-4 border-ink p-2 text-center group hover:bg-ink hover:text-parchment transition-colors cursor-pointer relative"
                  onClick={() => setShowWisDetail(!showWisDetail)}
                >
                  <p className="font-mono text-[11px] font-bold tracking-widest uppercase absolute -top-3 left-1/2 -translate-x-1/2 bg-white group-hover:bg-ink px-2 border-x-2 border-t-2 border-ink transition-colors">
                    WIS
                  </p>
                  <p className="font-anton text-[36px] leading-none pt-3">16</p>
                  {showWisDetail && (
                    <div className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border-2 border-ink p-2 shadow-[4px_4px_0px_0px_#000] text-ink text-left text-xs font-mono lowercase">
                      highly perceptive with excellent intuition
                    </div>
                  )}
                </div>
                <div
                  className="border-4 border-ink p-2 text-center group hover:bg-ink hover:text-parchment transition-colors cursor-pointer relative"
                  onClick={() => setShowChaDetail(!showChaDetail)}
                >
                  <p className="font-mono text-[11px] font-bold tracking-widest uppercase absolute -top-3 left-1/2 -translate-x-1/2 bg-white group-hover:bg-ink px-2 border-x-2 border-t-2 border-ink transition-colors">
                    CHA
                  </p>
                  <p className="font-anton text-[36px] leading-none pt-3">20</p>
                  {showChaDetail && (
                    <div className="absolute z-10 top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border-2 border-ink p-2 shadow-[4px_4px_0px_0px_#000] text-ink text-left text-xs font-mono lowercase">
                      masterful aura and persuasive presence
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-4 border-dashed border-ink bg-[#F3F3F3] relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-ink -translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-ink translate-x-1 -translate-y-1"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-ink -translate-x-1 translate-y-1"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-ink translate-x-1 translate-y-1"></div>

              <h3 className="font-mono text-[14px] font-bold uppercase mb-3 text-ink bg-white inline-block px-2 border-2 border-ink">
                TACTICAL INSIGHT
              </h3>
              <p className="font-tinos text-[16px] italic leading-relaxed text-ink mt-2">
                "Vaughn's primary utility lies in her ability to manipulate the
                battlefield before the first initiative is rolled. Her
                psychological profile indicates a preference for non-violent
                resolution, though she remains highly capable of deploying
                'surgical strikes' through proxy agents or high-level
                enchantments."
              </p>
              <p className="text-right mt-6 font-mono text-[12px] font-bold uppercase tracking-widest border-t-2 border-dotted border-ink/30 pt-3">
                - Expert Analysis #42
              </p>
            </div>

            <button className="mt-6 w-full block border-4 border-ink p-4 bg-white text-center shadow-[4px_4px_0px_0px_#000000] cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
              <p className="font-mono font-bold text-sm uppercase tracking-wide text-ink">
                Rated 4.78 out of 5 hearts.
              </p>
              <p className="font-tinos mt-1 text-ink">
                <span className="font-anton text-2xl align-middle">4.78</span>
                <span className="mx-2 align-middle font-bold">·</span>
                <span className="align-middle italic">9 reviews</span>
              </p>
            </button>
          </aside>
        </section>
      </main>
    </div>
  );
}
