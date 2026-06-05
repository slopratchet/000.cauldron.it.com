import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function LobbyIndex() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allLinks = [
    { title: '/script/000', url: '/script/000', section: 'SCRIPT' },
    { title: '/script/001', url: '/script/001', section: 'SCRIPT' },
    { title: '/actor/000', url: '/actor/000', section: 'ACTOR' },
    { title: '/actor/001', url: '/actor/001', section: 'ACTOR' },
    { title: '/actor/002', url: '/actor/002', section: 'ACTOR' },
    { title: '/actor/005', url: '/actor/005', section: 'ACTOR' },
    { title: '/action/000', url: '/action/000', section: 'ACTION' },
    { title: '/action/001', url: '/action/001', section: 'ACTION' },
    { title: '/action/002', url: '/action/002', section: 'ACTION' },
    { title: '/know/000', url: '/know/000', section: 'KNOW' },
    { title: '/know/001', url: '/know/001', section: 'KNOW' },
    { title: '/know/002', url: '/know/002', section: 'KNOW' },
    { title: '/know/003', url: '/know/003', section: 'KNOW' },
    { title: '/rule/000', url: '/rule/000', section: 'RULE' },
  ];

  const filteredItems = searchQuery
    ? allLinks.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1b1b1b] flex flex-col justify-between selection:bg-blood-red selection:text-white">
      <div className="h-2 bg-[#1b1b1b]" />

      <main className="flex-grow w-full max-w-7xl mx-auto py-6">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 select-none">
          {/* Main Title Banner */}
          <section className="my-8">
            <h2 className="font-accent text-6xl uppercase tracking-tighter text-black md:text-[110px] md:leading-[105px]">
              LOBBY INDEX
            </h2>
            <div className="mt-2 flex flex-col justify-between font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500 sm:flex-row">
              <span>DATA STACK // REFERENCE LOBBY V.70 // ACCESS: GRANTED</span>
            </div>
            <div className="mt-4 h-1.5 bg-black" />
          </section>

          {/* Interactive Search Tool */}
          <div className="relative mb-8 w-full">
            <div className="flex border-2 border-[#1b1b1b] bg-white shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
              <input
                id="index-search-input"
                type="text"
                placeholder="TERM QUERY (e.g. Script, Actor)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full font-mono text-xs px-3 py-2 outline-none uppercase placeholder:text-neutral-400"
              />
              <div className="flex items-center gap-1.5 border-l-2 border-[#1b1b1b] bg-neutral-100 px-3 font-mono text-[10px] font-bold text-neutral-500">
                <Search className="h-3.5 w-3.5 text-neutral-400" /> QUERY
              </div>
            </div>

            {/* Search Results Dropdown Overlay */}
            {searchQuery && (
              <div className="absolute z-10 mt-2 w-full border-2 border-[#1b1b1b] bg-white p-2 font-mono shadow-[4px_4px_0px_0px_rgba(27,27,27,1)]">
                <p className="border-b border-[#1b1b1b]/10 pb-1 text-[10px] font-bold text-neutral-400 uppercase">
                  QUERY REGISTER OUTCOME ({filteredItems.length} FOUND)
                </p>
                {filteredItems.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto divide-y divide-neutral-100">
                    {filteredItems.map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        className="flex w-full cursor-pointer justify-between py-2.5 px-1.5 text-left text-xs uppercase hover:bg-neutral-100 font-semibold text-[#1b1b1b]"
                      >
                        <span>{item.title}</span>
                        <span className="text-blood-red font-bold">
                          {item.section}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="p-3 text-center text-xs italic text-neutral-500">
                    No archives match the query.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
            {/* ================= COLUMN 1 ================= */}
            <div className="flex flex-col">
              <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
                DECK_01 // SCRIPT
              </div>

              <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
                <div className="border-b border-neutral-300 pb-3 mb-4">
                  <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                    Script
                  </h3>
                </div>

                <div className="space-y-4">
                  <a
                    href="/script/000"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/script/000</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/script/001"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/script/001</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                </div>
              </div>
            </div>
            {/* ================= COLUMN 2 ================= */}
            <div className="flex flex-col">
              <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
                DECK_02 // ACTOR
              </div>

              <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
                <div className="border-b border-neutral-300 pb-3 mb-4">
                  <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                    Actor
                  </h3>
                </div>

                <div className="space-y-4">
                  <a
                    href="/actor/000"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/actor/000</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/actor/001"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/actor/001</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/actor/002"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/actor/002</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/actor/005"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/actor/005</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                </div>
              </div>
            </div>
            {/* ================= COLUMN 3 ================= */}
            <div className="flex flex-col">
              <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
                DECK_03 // ACTION
              </div>

              <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
                <div className="border-b border-neutral-300 pb-3 mb-4">
                  <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                    Action
                  </h3>
                </div>

                <div className="space-y-4">
                  <a
                    href="/action/000"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/action/000</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/action/001"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/action/001</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/action/002"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/action/002</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/action/005"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/action/005</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                </div>
              </div>
            </div>
            {/* ================= COLUMN 4 ================= */}
            <div className="flex flex-col">
              <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
                DECK_04 // KNOW
              </div>

              <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
                <div className="border-b border-neutral-300 pb-3 mb-4">
                  <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                    Know
                  </h3>
                </div>

                <div className="space-y-4">
                  <a
                    href="/know/000"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/know/000</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/know/001"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/know/001</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/know/002"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/know/002</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                  <a
                    href="/know/003"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/know/003</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                </div>
              </div>
            </div>
            {/* ================= COLUMN 5 ================= */}
            <div className="flex flex-col">
              <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
                DECK_05 // PROFILE
              </div>

              <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
                <div className="border-b border-neutral-300 pb-3 mb-4">
                  <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                    Profile
                  </h3>
                </div>

                <div className="space-y-4">
                  <a
                    href="/profile/000"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">
                      /profile/000
                    </span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                </div>
              </div>
            </div>
            {/* ================= COLUMN 6 ================= */}
            <div className="flex flex-col">
              <div className="bg-black py-1 px-3 text-center text-xs font-mono font-bold tracking-widest text-[#fdfbf7]">
                DECK_06 // RULE
              </div>

              <div className="mt-2 flex-grow border-2 border-[#1b1b1b] bg-[#fdfbf7] p-5 shadow-[2px_2px_0px_0px_rgba(27,27,27,1)]">
                <div className="border-b border-neutral-300 pb-3 mb-4">
                  <h3 className="font-accent text-[42px] leading-[40px] uppercase text-[#1b1b1b] tracking-wider">
                    Rule
                  </h3>
                </div>

                <div className="space-y-4">
                  <a
                    href="/rule/000"
                    className="group flex w-full items-end justify-between font-serif text-[17px] text-[#1b1b1b] hover:text-blood-red transition-colors"
                  >
                    <span className="font-semibold text-left">/rule/000</span>
                    <span className="mx-2 mb-1 flex-grow border-b border-dotted border-[#1b1b1b]/30" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
