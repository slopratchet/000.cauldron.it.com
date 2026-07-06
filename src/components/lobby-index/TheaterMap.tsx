import { useState, useEffect } from 'react';
import { Grid } from 'lucide-react';
import type { Seat } from './types';

interface TheaterMapProps {
  seats: Seat[];
  onToggleSeat?: (seatId: string) => void;
  onSelectSeatCoordinate?: (coordinate: string) => void;
}

export default function TheaterMap({ seats }: TheaterMapProps) {
  const [offset, setOffset] = useState<number>(0);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [actorLookup, setActorLookup] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/data/lookups/actor.json')
      .then((res) => res.json())
      .then((data) => setActorLookup(data))
      .catch((err) => console.error('Failed to load actor lookup:', err));
  }, []);

  return (
    <div
      id="theater-mapping-card"
      className="border-2 border-black p-4 bg-black text-white hard-shadow-sm flex flex-col font-mono h-full"
    >
      {/* Grid title panel */}
      <h3 className="text-sm font-bold uppercase border-b-2 border-white/20 pb-1.5 mb-4 flex items-center justify-between">
        <span>Theater Mapping</span>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setOffset((prev) => (prev + 20) % 1000)}
        >
          <Grid className="w-4 h-4 text-white" />
        </button>
      </h3>

      {/* Grid mapping space */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 p-1 bg-black border border-white/20 mb-4 flex-grow justify-items-center items-center">
        {seats.map((seat, index) => {
          const actorId = ((index + offset) % 1000).toString().padStart(3, '0');
          const isSelected = selectedActor === actorId;

          return (
            <button
              key={seat.id}
              type="button"
              onClick={() => {
                setSelectedActor(actorId);
                const params = new URLSearchParams(window.location.search);
                params.set('actor', actorId);
                const jsonName = actorLookup[actorId] || actorId;
                params.set('json', jsonName);
                const newPath =
                  window.location.pathname + '?' + params.toString();
                window.history.pushState(null, '', newPath);
              }}
              title={`Actor ${actorId}`}
              className={`w-[180px] h-[90px] border-2 cursor-pointer transition-all duration-75 hover:scale-105 active:scale-95 flex items-center justify-center font-bold text-xs ${
                isSelected
                  ? 'bg-white text-black border-white animate-pulse'
                  : 'bg-black text-white border-neutral-700 hover:bg-neutral-800'
              }`}
            >
              <span>[{actorId}]</span>
            </button>
          );
        })}
      </div>

      {/* Status Legend indices */}
      <div className="mt-auto flex flex-wrap gap-4 text-xs font-bold uppercase border-t border-white/20 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-white border border-white inline-block"></span>
          <span>Active Toggle (White/On)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-black border border-neutral-700 inline-block"></span>
          <span className="text-[#E6E2D8]">Inactive Toggle (Black/Off)</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          const currentActor = selectedActor || '000';
          const jsonName = actorLookup[currentActor] || currentActor;
          window.location.href = `/character-select?actor=${currentActor}&json=${jsonName}`;
        }}
        className="mt-4 w-full bg-white text-black font-bold uppercase py-2 border-2 border-white hover:bg-neutral-200 active:scale-95 transition-transform cursor-pointer"
      >
        [Open Agent]
      </button>
    </div>
  );
}
