import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen text-ink-wash bg-parchment-deep flex flex-col font-sans relative pb-16 antialiased selection:bg-amber-100 selection:text-black">
      {/* Decorative calibration visual grid (simulating analog report presentation) */}
      <div
        className="absolute inset-0 bg-repeat bg-center opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 20%, transparent 20%)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* Stack Container of beautiful static printed ledgers */}
      <main className="flex-grow px-4 md:px-8 py-10 space-y-16 max-w-4xl mx-auto w-full relative z-10">
        {/* =========================================================================
            LEDGER PAGE 1: ARCHIVE REF. 100-299 (SEPTEMBER OPERATIONAL REPORT)
            ========================================================================= */}
        <article className="bg-white brutalist-border brutalist-shadow p-6 md:p-8 flex flex-col animate-fadeIn relative">
          {/* Top binder hole indicators for realistic offline document aesthetic */}
          <div className="absolute top-2 left-1/4 -translate-x-1/2 flex gap-4 opacity-15 pointer-events-none">
            <span className="w-4 h-4 bg-black rounded-full block border border-black" />
          </div>
          <div className="absolute top-2 right-1/4 translate-x-1/2 flex gap-4 opacity-15 pointer-events-none">
            <span className="w-4 h-4 bg-black rounded-full block border border-black" />
          </div>

          {/* Header Block with REF */}
          <div className="border-b-4 border-black pb-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div className="space-y-0.5">
                <h1 className="font-headline-lg uppercase tracking-tight text-3xl leading-tight">
                  INDEX OF INCANTATIONS
                </h1>
                <div className="font-label-sm text-neutral-500 uppercase">
                  ARCHIVAL CLASSIFICATION REGISTER // OPERATIONS CONTROL
                </div>
              </div>
              <div className="font-label-md text-zinc-900 bg-stone-100 p-1.5 px-3.5 border-2 border-black select-none shrink-0 self-start md:self-auto font-mono">
                ARCHIVE REF. 100-299
              </div>
            </div>
          </div>

          {/* Render section text loops */}
          <div className="flex-grow">
            <div className="columns-1 md:columns-2 gap-12 font-body-md text-zinc-900 leading-relaxed">
              {/* 1.0 EVOCATION PROTOCOLS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  1.0 Evocation Protocols
                </h3>
                <div className="space-y-4">
                  <p className="font-body-md leading-relaxed">
                    <strong className="font-bold">
                      Incantation I-740921-A (G-14)
                    </strong>{' '}
                    [Temporal Mark: 21 SEP 1974]: Fireball detonation confirmed
                    within optimal parameters. Primary mana surge recalibrated
                    post-ignition to prevent thermal cascade.
                  </p>

                  <div>
                    <div className="flex items-baseline font-bold font-label-md">
                      <span>Incantation I-740928-D</span>
                      <div className="toc-leader" />
                      <span className="text-[#D97706] shrink-0">G-18</span>
                    </div>
                    <div className="text-xs text-neutral-500 mb-1 font-mono">
                      Temporal Mark: 28 SEP 1974
                    </div>
                    <p className="font-body-italic text-sm leading-tight opacity-90">
                      Lightning arc stability test. Variance detected in
                      grounding runes. Requires immediate structural review of
                      primary pylons.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2.0 ABJURATION WARDS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  2.0 Abjuration Wards
                </h3>
                <div className="space-y-4 font-body-md">
                  <div>
                    <div className="flex items-baseline font-bold font-label-md">
                      <span>Incantation I-740921-B</span>
                      <div className="toc-leader" />
                      <span className="text-neutral-500 shrink-0">G-15</span>
                    </div>
                    <div className="text-xs text-neutral-500 mb-1 font-mono">
                      Temporal Mark: 21 SEP 1974
                    </div>
                    <p className="font-body-italic text-sm leading-tight opacity-90">
                      Standard ward deployment around the perimeter. Kinetic
                      barriers holding at 98% efficiency. No spatial anomalies
                      reported.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline font-bold font-label-md">
                      <span>Incantation I-740929-A</span>
                      <div className="toc-leader" />
                      <span className="text-neutral-500 shrink-0">H-02</span>
                    </div>
                    <div className="text-xs text-neutral-500 mb-1 font-mono">
                      Temporal Mark: 29 SEP 1974
                    </div>
                    <p className="font-body-italic text-sm leading-tight opacity-90">
                      Anti-scrying matrix initiated. Flux saturation nominal.
                      Aetheric signature masked successfully from external
                      observation.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3.0 CONJURATION RIFTS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  3.0 Conjuration Rifts
                </h3>
                <div className="space-y-4">
                  {/* Entirely in warning amber-red to highlight custom feedback loop status */}
                  <div className="text-[#D97706] border-l-2 pl-3 border-[#D97706]/50">
                    <p className="font-body-md leading-relaxed font-semibold">
                      <strong className="font-extrabold font-sans">
                        Incantation I-740922-A (P-03)
                      </strong>{' '}
                      [Temporal Mark: 22 SEP 1974]: Signal Lost - Counterspell
                      Feedback Loop Detected. Breach in sector containment.
                      Immediate quarantine recommended.
                    </p>
                  </div>

                  <p className="font-body-md leading-relaxed text-zinc-850">
                    <strong className="font-bold">
                      Incantation I-740930-B (P-05)
                    </strong>{' '}
                    [Temporal Mark: 30 SEP 1974]: Minor elemental sprite
                    summoned for ventilation maintenance. Binding circles
                    intact. Entity compliance confirmed.
                  </p>
                </div>
              </div>

              {/* 4.0 TRANSMUTATION FIELDS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  4.0 Transmutation Fields
                </h3>
                <div className="space-y-4">
                  <p className="font-body-md leading-relaxed text-zinc-850">
                    <strong className="font-bold">
                      Incantation I-740923-A (O-112)
                    </strong>{' '}
                    [Temporal Mark: 23 SEP 1974]: Lead-to-gold catalytic
                    conversion sequence tested. Mana surge in Sector O exceeding
                    1970 baseline. Isotope decay accelerated.
                  </p>
                </div>
              </div>

              {/* 5.0 DIVINATION ARRAYS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  5.0 Divination Arrays
                </h3>
                <div className="space-y-4 font-body-md">
                  <p className="font-body-md leading-relaxed text-zinc-850">
                    <strong className="font-bold">
                      Incantation I-740924-C (B-22)
                    </strong>{' '}
                    [Temporal Mark: 24 SEP 1974]: Long-range scrying session
                    targeting the northern ley lines. Visuals confirmed.
                    Chrono-distortion minimal. Session closed and archived.
                  </p>
                </div>
              </div>

              {/* 6.0 ENCHANTMENT RELAYS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  6.0 Enchantment Relays
                </h3>
                <div className="space-y-4 font-body-md">
                  <p className="font-body-md leading-relaxed text-zinc-850">
                    <strong className="font-bold">
                      Incantation I-740925-A (M-41)
                    </strong>{' '}
                    [Temporal Mark: 25 SEP 1974]: Aetheric relay network
                    synchronized with central crystalline hub. Cognitive
                    enhancement aura distributed across engineering deck.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pagination design (static print representation) */}
          <div className="mt-8 pt-4 border-t-2 border-black flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50 p-4 -mx-6 -mb-6 md:-mx-8 md:-mb-8 font-mono">
            <div className="font-bold text-[10px] text-zinc-600 tracking-wider">
              DISPLAYING 6 OF 1,200 ENTRIES
            </div>
            <div className="flex gap-2 shrink-0 select-none">
              <span className="brutalist-border px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-neutral-150 opacity-50 cursor-not-allowed">
                ◀ PREV PAGE
              </span>
              <span className="brutalist-border px-3 py-1.5 text-zinc-400 bg-neutral-200 text-[10px] font-bold tracking-widest uppercase opacity-50 cursor-not-allowed">
                NEXT PAGE ▶
              </span>
            </div>
          </div>
        </article>

        {/* =========================================================================
            LEDGER PAGE 2: ARCHIVE REF. 300-499 (OCTOBER OPERATIONAL REPORT)
            ========================================================================= */}
        <article className="bg-white brutalist-border brutalist-shadow p-6 md:p-8 flex flex-col animate-fadeIn relative">
          {/* Top binder hole indicators for realistic offline document aesthetic */}
          <div className="absolute top-2 left-1/4 -translate-x-1/2 flex gap-4 opacity-15 pointer-events-none">
            <span className="w-4 h-4 bg-black rounded-full block border border-black" />
          </div>
          <div className="absolute top-2 right-1/4 translate-x-1/2 flex gap-4 opacity-15 pointer-events-none">
            <span className="w-4 h-4 bg-black rounded-full block border border-black" />
          </div>

          {/* Header Block with REF */}
          <div className="border-b-4 border-black pb-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div className="space-y-0.5">
                <h2 className="font-headline-lg uppercase tracking-tight text-3xl leading-tight">
                  INDEX OF INCANTATIONS
                </h2>
                <div className="font-label-sm text-neutral-500 uppercase">
                  ARCHIVAL CLASSIFICATION REGISTER // OPERATIONS CONTROL
                </div>
              </div>
              <div className="font-label-md text-zinc-900 bg-stone-100 p-1.5 px-3.5 border-2 border-black select-none shrink-0 self-start md:self-auto font-mono">
                ARCHIVE REF. 300-499
              </div>
            </div>
          </div>

          {/* Render section text loops */}
          <div className="flex-grow">
            <div className="columns-1 md:columns-2 gap-12 font-body-md text-zinc-900 leading-relaxed">
              {/* 1.0 EVOCATION PROTOCOLS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  1.0 Evocation Protocols
                </h3>
                <div className="space-y-4">
                  <p className="font-body-md leading-relaxed">
                    <strong className="font-bold">
                      Incantation I-741002-C (G-22)
                    </strong>{' '}
                    [Temporal Mark: 02 OCT 1974]: Thermal combustion array
                    calibration. Unstable blue flame stabilized with local
                    gravity inhibitors. Heat output exceeded expectations.
                  </p>

                  <div>
                    <div className="flex items-baseline font-bold font-label-md">
                      <span>Incantation I-741029-E</span>
                      <div className="toc-leader" />
                      <span className="text-[#D97706] shrink-0">G-19</span>
                    </div>
                    <div className="text-xs text-neutral-500 mb-1 font-mono">
                      Temporal Mark: 29 OCT 1974
                    </div>
                    <p className="font-body-italic text-sm leading-tight opacity-90">
                      Mana burst overload test. Safe detonation breached stage
                      barrier. High heat dispersion detected nearby. Core shut
                      down initiated manually.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2.0 ABJURATION WARDS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  2.0 Abjuration Wards
                </h3>
                <div className="space-y-4 font-body-md">
                  <div>
                    <div className="flex items-baseline font-bold font-label-md">
                      <span>Incantation I-741005-B</span>
                      <div className="toc-leader" />
                      <span className="text-neutral-500 shrink-0">K-09</span>
                    </div>
                    <div className="text-xs text-neutral-500 mb-1 font-mono">
                      Temporal Mark: 05 OCT 1974
                    </div>
                    <p className="font-body-italic text-sm leading-tight opacity-90">
                      Acoustic silencing dampener tested around the Orchestra
                      pit. Complete audio insulation achieved for 45 minutes
                      till rune decay.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3.0 CONJURATION RIFTS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  3.0 Conjuration Rifts
                </h3>
                <div className="space-y-4">
                  {/* Entirely in warning amber-red to highlight custom feedback loop status */}
                  <div className="text-[#D97706] border-l-2 pl-3 border-[#D97706]/50">
                    <p className="font-body-md leading-relaxed font-semibold">
                      <strong className="font-extrabold font-sans">
                        Incantation I-741009-F (P-12)
                      </strong>{' '}
                      [Temporal Mark: 09 OCT 1974]: Rift dilatation anomaly.
                      Minor spectral vortex formed behind stage elevator.
                      Secondary sealing circle deployed successfully.
                    </p>
                  </div>

                  <p className="font-body-md leading-relaxed text-zinc-850">
                    <strong className="font-bold">
                      Incantation I-741107-Z (P-18)
                    </strong>{' '}
                    [Temporal Mark: 07 NOV 1974]: Spatial fissure containment
                    loop. Portal successfully stabilized to allow pure water
                    condensation retrieval. Zero anomalous spikes recorded.
                  </p>
                </div>
              </div>

              {/* 4.0 TRANSMUTATION FIELDS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  4.0 Transmutation Fields
                </h3>
                <div className="space-y-4">
                  <p className="font-body-md leading-relaxed text-zinc-850">
                    <strong className="font-bold">
                      Incantation I-741014-X (O-210)
                    </strong>{' '}
                    [Temporal Mark: 14 OCT 1974]: Gravity inversion test in the
                    VIP lounge. Glassware and furniture floated without
                    structural damage. Recalibrator overheated.
                  </p>
                </div>
              </div>

              {/* 5.0 DIVINATION ARRAYS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  5.0 Divination Arrays
                </h3>
                <div className="space-y-4 font-body-md">
                  <p className="font-body-md leading-relaxed text-zinc-850">
                    <strong className="font-bold">
                      Incantation I-741018-D (B-49)
                    </strong>{' '}
                    [Temporal Mark: 18 OCT 1974]: Temporal window simulation.
                    Observed events from year 2026. Cryptic records indicate
                    server systems run entirely in containers. Highly
                    speculative description dismissed.
                  </p>
                </div>
              </div>

              {/* 6.0 ENCHANTMENT RELAYS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  6.0 Enchantment Relays
                </h3>
                <div className="space-y-4 font-body-md">
                  <p className="font-body-md leading-relaxed text-zinc-850">
                    <strong className="font-bold">
                      Incantation I-741022-A (M-48)
                    </strong>{' '}
                    [Temporal Mark: 22 OCT 1974]: Subconscious suggestion array
                    tests. Audience seating calibrated to increase emotional
                    alignment with performance. Strong feedback peaks observed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pagination design (static print representation) */}
          <div className="mt-8 pt-4 border-t-2 border-black flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50 p-4 -mx-6 -mb-6 md:-mx-8 md:-mb-8 font-mono">
            <div className="font-bold text-[10px] text-zinc-600 tracking-wider">
              DISPLAYING 6 OF 1,200 ENTRIES
            </div>
            <div className="flex gap-2 shrink-0 select-none">
              <span className="brutalist-border px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-neutral-150 opacity-50 cursor-not-allowed">
                ◀ PREV PAGE
              </span>
              <span className="brutalist-border px-3 py-1.5 text-zinc-400 bg-neutral-200 text-[10px] font-bold tracking-widest uppercase opacity-50 cursor-not-allowed">
                NEXT PAGE ▶
              </span>
            </div>
          </div>
        </article>

        {/* =========================================================================
            LEDGER PAGE 3: ARCHIVE REF. 500-699 (SUPPLEMENTARY ANOMALY SUMMARY)
            ========================================================================= */}
        <article className="bg-white brutalist-border brutalist-shadow p-6 md:p-8 flex flex-col animate-fadeIn relative">
          {/* Top binder hole indicators for realistic offline document aesthetic */}
          <div className="absolute top-2 left-1/4 -translate-x-1/2 flex gap-4 opacity-15 pointer-events-none">
            <span className="w-4 h-4 bg-black rounded-full block border border-black" />
          </div>
          <div className="absolute top-2 right-1/4 translate-x-1/2 flex gap-4 opacity-15 pointer-events-none">
            <span className="w-4 h-4 bg-black rounded-full block border border-black" />
          </div>

          {/* Header Block with REF */}
          <div className="border-b-4 border-black pb-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div className="space-y-0.5">
                <h2 className="font-headline-lg uppercase tracking-tight text-3xl leading-tight">
                  INDEX OF INCANTATIONS
                </h2>
                <div className="font-label-sm text-neutral-500 uppercase">
                  ARCHIVAL CLASSIFICATION REGISTER // OPERATIONS CONTROL
                </div>
              </div>
              <div className="font-label-md text-zinc-900 bg-stone-100 p-1.5 px-3.5 border-2 border-black select-none shrink-0 self-start md:self-auto font-mono">
                ARCHIVE REF. 500-699
              </div>
            </div>
          </div>

          {/* Render section text loops */}
          <div className="flex-grow">
            <div className="columns-1 md:columns-2 gap-12 font-body-md text-zinc-900 leading-relaxed">
              {/* 2.0 ABJURATION WARDS */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  2.0 Abjuration Wards
                </h3>
                <div className="space-y-4">
                  {/* Entirely in warning amber-red to highlight custom feedback loop status */}
                  <div className="text-[#D97706] border-l-2 pl-3 border-[#D97706]/50">
                    <p className="font-body-md leading-relaxed font-semibold">
                      <strong className="font-extrabold font-sans">
                        Incantation I-741103-W (K-12)
                      </strong>{' '}
                      [Temporal Mark: 03 NOV 1974]: Resonating shield alignment
                      failure. Dampener coil collapsed, causing standard
                      lightning arcs to cross-couple with background scrying
                      array.
                    </p>
                  </div>
                </div>
              </div>

              {/* 7.0 AETHERIC COUPLING MATRIX */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  7.0 Aetheric Coupling Matrix
                </h3>
                <div className="space-y-4 font-body-md">
                  <div>
                    <div className="flex items-baseline font-bold font-label-md">
                      <span>Incantation I-741112-Q</span>
                      <div className="toc-leader" />
                      <span className="text-neutral-500 shrink-0">A-01</span>
                    </div>
                    <div className="text-xs text-neutral-500 mb-1 font-mono">
                      Temporal Mark: 12 NOV 1974
                    </div>
                    <p className="font-body-italic text-sm leading-tight opacity-90">
                      Inter-pylon alignment verified across central array. Minor
                      harmonic oscillations damped using quartz crystal
                      frequency shunts.
                    </p>
                  </div>
                </div>
              </div>

              {/* 8.0 CHRONO-METRIC TELEMETRY */}
              <div className="break-inside-avoid mb-8">
                <h3 className="font-headline-md uppercase mb-4 text-xl border-b-2 border-black pb-1 select-none">
                  8.0 Chrono-Metric Telemetry
                </h3>
                <div className="space-y-4 font-body-md">
                  <p className="font-body-md leading-relaxed text-zinc-850">
                    <strong className="font-bold">
                      Incantation I-741119-Y (C-50)
                    </strong>{' '}
                    [Temporal Mark: 19 NOV 1974]: Chrono-synced fast logging
                    sequence initialized. All background state engines
                    decommissioned cleanly based on explicit tactical
                    directives. System integrity holding at 100% capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pagination design (static print representation) */}
          <div className="mt-8 pt-4 border-t-2 border-black flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50 p-4 -mx-6 -mb-6 md:-mx-8 md:-mb-8 font-mono">
            <div className="font-bold text-[10px] text-zinc-600 tracking-wider">
              DISPLAYING 3 OF 1,200 ENTRIES
            </div>
            <div className="flex gap-2 shrink-0 select-none">
              <span className="brutalist-border px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-neutral-150 opacity-50 cursor-not-allowed">
                ◀ PREV PAGE
              </span>
              <span className="brutalist-border px-3 py-1.5 text-zinc-400 bg-neutral-200 text-[10px] font-bold tracking-widest uppercase opacity-50 cursor-not-allowed">
                NEXT PAGE ▶
              </span>
            </div>
          </div>
        </article>
      </main>

      {/* Decorative clean laboratory footer */}
      <footer className="text-center select-none opacity-60 pb-8">
        <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest space-y-1">
          <div>
            SPELLCASTING RESONANCE TELEMETRY LEDGER // SYSTEM-V MODEL 1974-ALPHA
            SUMMARY DOCUMENT
          </div>
          <div>
            CRAFTED BY EXPERIMENTAL RESEARCH LOGISTICS DIRECTORY — DIVISION DECK
            5 // CLASSIFIED RECORD ONLY
          </div>
        </div>
      </footer>
    </div>
  );
}
