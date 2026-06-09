import React from 'react';
import { AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

const TENSION_ADD_CAUSES: Record<string, string> = {
  'player_action:search_room_carefully':
    'Searching dusty areas or hidden compartments painstakingly slowly, consuming valuable party defense time.',
  player_fails_stealth_check:
    'Stumbling or misstepping during a stealth movement task, causing physical debris/noise hazards.',
  'player_action:spellcast_unveils_ward':
    'Unveiling ancient tomb ward arrays using active magical runes without dampening seals.',
  'player_action:prolonged_rest_in_wild':
    'Setting up camp or sleeping in the open wilderness without protective warding stones active.',
  'player_action:touch_relic_without_ritual':
    'Directly handling consecrated relics of the tomb without first conducting local cleansing rituals.',
};

const TENSION_ROLL_CAUSES: Record<string, string> = {
  pool_reaches_max:
    'The accumulation of dice within the pressure pool reaches the maximum threshold.',
  'player_action:loud_noise':
    'Slamming heavy iron gates, triggering dynamic explosive charges, or screaming in echo chambers.',
};

export function TensionComplicationCauses({ subject }: { subject: any }) {
  const maxDice = subject.tension_engine?.pool_mechanic?.max_dice || 6;
  const dieType = subject.tension_engine?.pool_mechanic?.die_type || 'd10';

  return (
    <section
      id="section-tension-causes-ledger"
      className="border border-black p-6 rounded bg-[#FAF9F5] flex flex-col gap-6 select-all"
    >
      <div className="flex items-center gap-2 border-b border-black pb-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 animate-pulse" />
        <h2 className="font-serif text-xl font-black uppercase tracking-wide text-neutral-900">
          Tension
        </h2>
      </div>

      <p className="font-serif text-sm text-neutral-700 leading-relaxed">
        This ledger traces the specific player actions and event thresholds that
        drive the campaign's doom mechanics. By analyzing these causes, dungeon
        managers can predict when tension escalates into severe physical
        complications.
      </p>

      {/* Two Column Layout System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-[10.5px]">
        {/* Column A: Actions Causing Tension Accumulation */}
        <div className="bg-amber-50/20 border border-amber-300/50 p-4 rounded flex flex-col gap-3">
          <div>
            <span className="font-black text-amber-900 uppercase text-[11px] block border-b border-amber-200 pb-1 mb-1">
              A. Actions Causing Tension Accumulation (+1 Die)
            </span>
            <p className="text-[10px] text-neutral-500 leading-snug">
              Mounting pressure within the environment. Performing any of the
              following active events forces the accumulation of +1 {dieType}{' '}
              into the physical pool structure (Max Capacity: {maxDice}).
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {Object.entries(TENSION_ADD_CAUSES).map(
              ([triggerKey, causeDesc], idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-neutral-200 rounded hover:border-amber-400 transition-colors"
                >
                  <div className="flex items-center gap-1.5 mb-1.5 text-[9px] font-bold text-amber-700 uppercase">
                    <ArrowRight className="w-3 h-3 text-amber-600 shrink-0" />
                    Behavior Key:{' '}
                    <code className="text-[8.5px] bg-neutral-100 px-1 py-0.5 rounded ml-1 text-neutral-600 normal-case">
                      {triggerKey}
                    </code>
                  </div>
                  <p className="text-neutral-700 leading-relaxed select-all">
                    {causeDesc}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Column B: Events Forcing Tension Rolls & Severity Complications */}
        <div className="flex flex-col gap-6">
          <div className="bg-stone-50 border border-neutral-300 p-4 rounded flex flex-col gap-3">
            <div>
              <span className="font-black text-neutral-800 uppercase text-[11px] block border-b border-neutral-200 pb-1 mb-1">
                B. Events Forcing High-Hazard Tension Rolls
              </span>
              <p className="text-[10px] text-neutral-500 leading-snug">
                Tension rolls release the accumulated doom pool of {dieType}s
                simultaneously in an hazard-trigger check.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {Object.entries(TENSION_ROLL_CAUSES).map(
                ([triggerKey, causeDesc], idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-neutral-200 rounded hover:border-stone-500 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5 text-[9px] font-bold text-neutral-800 uppercase">
                      <ArrowRight className="w-3 h-3 text-neutral-600 shrink-0" />
                      Event Key:{' '}
                      <code className="text-[8.5px] bg-neutral-100 px-1 py-0.5 rounded ml-1 text-neutral-600 normal-case">
                        {triggerKey}
                      </code>
                    </div>
                    <p className="text-neutral-700 leading-relaxed select-all">
                      {causeDesc}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Ultimate Complication Mechanics explanation */}
          <div className="p-4 bg-red-50 text-red-950 rounded border border-red-300 flex flex-col gap-2">
            <span className="font-black text-red-800 uppercase text-[10px] border-b border-red-200 pb-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-red-700" />
              C. Severity Complication Logic Check
            </span>
            <p className="leading-relaxed select-all">
              Whenever the accumulated pool is rolled or detonated, each die is
              checked. If **any** die comes up as a <strong>1</strong> (the{' '}
              <code>roll_contains_1</code> condition), the environment triggers
              immediate localized hazards (such as <em>Forked Lightning</em> or{' '}
              <em>Barrow-Marl Swamp Sinks</em>).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
