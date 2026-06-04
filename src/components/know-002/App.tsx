/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import type { ScreenType } from './types';
import { MAGIC_ANSWERS, FAQ_DATA } from './data';
import FaqScreen from './components/FaqScreen';
import { ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('FAQ');
  const [searchQuery, setSearchQuery] = useState('');

  // Dialog modal state
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [factionEmail, setFactionEmail] = useState('elliotbradly@gmail.com');
  const [factionClass, setFactionClass] = useState('Order of Scribes');
  const [pledgeChecked, setPledgeChecked] = useState(false);
  const [joinedReceipt, setJoinedReceipt] = useState<string | null>(null);

  // Intelligent custom index answering override state
  const [suggestedAnswers, setSuggestedAnswers] = useState<string[]>([]);
  const [archivistFeedback, setArchivistFeedback] = useState<string | null>(
    null,
  );

  // Check query changes and generate witty Archivist answers when query starts with a question mark
  useEffect(() => {
    if (!searchQuery) {
      setSuggestedAnswers([]);
      setArchivistFeedback(null);
      return;
    }

    const query = searchQuery.toLowerCase();

    // Check if searching FAQ question keywords
    const matches = FAQ_DATA.filter(
      (f) =>
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query),
    );

    if (matches.length > 0) {
      setSuggestedAnswers(matches.map((m) => m.question));
      setArchivistFeedback(null);
    } else {
      setSuggestedAnswers([]);
      // Select a random witty magic answer if no exact matches found
      const hash = query.length % MAGIC_ANSWERS.length;
      setArchivistFeedback(MAGIC_ANSWERS[hash]);
    }
  }, [searchQuery]);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeChecked) return;

    const memberNum = Math.floor(Math.random() * 89999 + 10000);
    setJoinedReceipt(`GUILD-MEMBER-${memberNum}`);

    // Auto close modal after a nice success feedback
    setTimeout(() => {
      setIsJoinModalOpen(false);
    }, 4500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-parchment text-black antialiased relative">
      {/* Decorative top tiny border */}
      <div className="h-1.5 w-full bg-blood-red" />

      {/* Archivist Search Assistant Overlap Widget (Only shown when active logs typed) */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full mt-4 select-none z-30">
          <div className="border-4 border-black bg-black text-parchment p-4 shadow-brutalist relative">
            <div className="absolute top-2 right-2 font-mono text-[9px] text-neutral-500 font-extrabold uppercase bg-neutral-900 border border-neutral-800 px-1 py-0.5">
              INDEX_SCANNER_V4
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blood-red text-white p-1.5 border border-black shrink-0 font-bold rotate-[-3deg] inline-block">
                <HelpCircle className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-mono font-black text-xs uppercase tracking-wider text-white">
                  THE ARCHIVIST'S COGNITIVE CORNER
                </h4>

                {suggestedAnswers.length > 0 && (
                  <div className="font-mono text-2xs md:text-xs text-[#848484] space-y-1">
                    <span className="text-emerald-400 font-bold">
                      FOUND CLOSE CODES IN INDEX:
                    </span>
                    <ul className="list-disc list-inside space-y-1 pl-1 text-parchment-deep font-bold font-sans">
                      {suggestedAnswers.slice(0, 3).map((ans, idx) => (
                        <li
                          key={idx}
                          className="cursor-pointer hover:underline text-blood-red"
                          onClick={() => {
                            setSearchQuery(ans);
                          }}
                        >
                          {ans}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {archivistFeedback && (
                  <p className="font-serif italic text-xs md:text-sm text-parchment-deep leading-relaxed pt-1">
                    "{archivistFeedback}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content frame with standard transitions */}
      <main className="flex-grow">
        {/* MAIN CONTENT AREA */}
        {activeScreen === 'FAQ' && (
          <FaqScreen
            searchQuery={searchQuery}
            onNavigateToTour={() => setActiveScreen('TOUR')}
            onOpenPortal={() => {
              setActiveScreen('TOUR');
            }}
          />
        )}
      </main>

      {/* JOIN THE PARTY MODAL - BRUTALIST PARCHMENT SHEET STYLE */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-xs select-none">
          <div
            id="join-party-modal"
            className="border-4 border-black bg-white max-w-lg w-full p-6 md:p-8 shadow-brutalist relative rotate-[0.5deg]"
          >
            {/* Close Button badge */}
            <button
              onClick={() => {
                setIsJoinModalOpen(false);
                setJoinedReceipt(null);
                setPledgeChecked(false);
              }}
              className="absolute -top-3 -right-3 border-2 border-black bg-black text-parchment font-mono font-bold text-xs w-8 h-8 flex items-center justify-center hover:bg-blood-red cursor-pointer hover:translate-x-[1px]"
            >
              [X]
            </button>

            {!joinedReceipt ? (
              <form onSubmit={handlePledgeSubmit} className="space-y-5">
                <div className="border-b-4 border-black pb-2">
                  <h3 className="font-display text-3xl text-black uppercase leading-tight">
                    PLEDGE FEALTY TO THE PARTY
                  </h3>
                  <span className="font-mono text-2xs md:text-xs text-neutral-400 font-extrabold uppercase">
                    REGISTRATION SECTION III // ARCHIVE ENROLMENT
                  </span>
                </div>

                <p className="font-serif text-sm leading-relaxed text-charcoal">
                  Enrolling in the Twenty-Sided Guild grants you early access to
                  mythical merchandise releases, national campaign dispatches,
                  and exclusive dice roll updates.
                </p>

                {/* Email field */}
                <div className="space-y-1">
                  <label className="font-mono text-xs font-black uppercase text-charcoal block">
                    ELECTRONIC CORRESPONDENCE (EMAIL):
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address..."
                    value={factionEmail}
                    onChange={(e) => setFactionEmail(e.target.value)}
                    className="w-full border-2 border-black bg-parchment text-sm font-mono font-bold tracking-wider py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-blood-red"
                  />
                </div>

                {/* Circle pick */}
                <div className="space-y-1">
                  <label className="font-mono text-xs font-black uppercase text-charcoal block">
                    CHOSEN ALLIANCE COVEN:
                  </label>
                  <select
                    value={factionClass}
                    onChange={(e) => setFactionClass(e.target.value)}
                    className="w-full border-2 border-black bg-parchment text-sm font-mono font-bold py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-blood-red"
                  >
                    <option value="Order of Scribes">
                      Order of the Sacred Scribes (Archivists)
                    </option>
                    <option value="Front-Line Shield Vanguard">
                      Vanguard of Front-Line Warriors
                    </option>
                    <option value="Underdark Syndicate">
                      Shadow Guild of Rogues (Thiefs)
                    </option>
                    <option value="Crimson Tankard singers">
                      Orators of the Crimson Tankard
                    </option>
                  </select>
                </div>

                {/* Pledge checkbox constraint */}
                <div className="flex items-start gap-2.5 border border-black p-3 bg-parchment">
                  <input
                    type="checkbox"
                    id="pledge-agree-box"
                    required
                    checked={pledgeChecked}
                    onChange={(e) => setPledgeChecked(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded-none border-2 border-black accent-black cursor-pointer"
                  />
                  <label
                    htmlFor="pledge-agree-box"
                    className="font-mono text-[11px] leading-relaxed text-neutral-800 font-bold uppercase select-none cursor-pointer"
                  >
                    I pledge to abide by the final consensus roll of the
                    twenty-sided die onstage, and agree to support all chaotic
                    team choices during regional campaigns.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!pledgeChecked}
                  className="w-full border-2 border-black bg-black text-parchment hover:bg-blood-red hover:border-blood-red disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-500 font-mono font-black text-xs tracking-widest uppercase py-3 shadow-brutalist transition-colors cursor-pointer"
                >
                  SIGN THE LEDGER
                </button>
              </form>
            ) : (
              <div className="space-y-5 text-center py-4">
                <div className="w-16 h-16 border-4 border-emerald-800 bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto rounded-none">
                  <ShieldCheck className="h-10 w-10 shrink-0" />
                </div>

                <h3 className="font-display text-4xl text-emerald-900 uppercase">
                  LEDGER SIGNED!
                </h3>

                <div className="font-mono text-xs bg-emerald-50/50 border-2 border-emerald-950 p-4 rounded-none max-w-sm mx-auto text-emerald-950 text-left space-y-2">
                  <div className="font-sans font-black text-center border-b border-emerald-900 pb-1.5 mb-2 tracking-widest text-[#1b1b1b]">
                    TAVERN ACCREDITATION GUILD
                  </div>
                  <div>
                    <span className="font-bold uppercase text-2xs text-[#4c4546]">
                      MEMBER TOKEN:
                    </span>
                    <span className="font-black text-black float-right font-sans">
                      {joinedReceipt}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold uppercase text-2xs text-[#4c4546]">
                      FACTION ASSIGNED:
                    </span>
                    <span className="font-black text-black float-right uppercase">
                      {factionClass}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold uppercase text-2xs text-[#4c4546]">
                      LOGGED EMAIL:
                    </span>
                    <span className="font-black text-blood-red float-right">
                      {factionEmail}
                    </span>
                  </div>
                </div>

                <p className="font-serif italic text-sm text-[#4c4546]">
                  "Your details have been burned onto the inner tablet files.
                  Watch your electronic dispatch for magical responses of the
                  Archivist..."
                </p>

                <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest animate-pulse font-extrabold pt-2">
                  * AUTO CLOSING SCROLL CHRONO...
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
