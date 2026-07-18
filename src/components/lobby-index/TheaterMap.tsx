import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Seat } from './types';

interface TheaterMapProps {
  seats: Seat[];
  onToggleSeat?: (seatId: string) => void;
  onSelectSeatCoordinate?: (coordinate: string) => void;
}

export default function TheaterMap({ seats }: TheaterMapProps) {
  const [iconIndex, setIconIndex] = useState<number>(0);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [actorLookup, setActorLookup] = useState<Record<string, string>>({});
  const [clickState, setClickState] = useState<string>('00');

  useEffect(() => {
    let currentIconIndex = 0;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const clickParam = params.get('click');
      if (clickParam === '01') {
        setClickState('01');
      }
      const urlIconIndex = params.get('iconIndex');
      if (urlIconIndex !== null) {
        currentIconIndex = parseInt(urlIconIndex, 10) || 0;
        setIconIndex(currentIconIndex);
      }
      setSelectedActor(params.get('actor'));
    }
    fetch('/data/lookups/actor.json')
      .then((res) => res.json())
      .then((data) => {
        setActorLookup(data);
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          let actorId = params.get('actor');
          if (!actorId || !params.get('json')) {
            actorId = ((((0 + currentIconIndex * 6) % 1000) + 1000) % 1000)
              .toString()
              .padStart(3, '0');
            const jsonName = data[actorId] || actorId;
            setSelectedActor(actorId);
            params.set('actor', actorId);
            params.set('json', jsonName);
            const newPath = window.location.pathname + '?' + params.toString();
            window.history.replaceState(null, '', newPath);
          } else {
            setSelectedActor(actorId);
          }

          // Dispatch initial selection coordinates to the host page websocket loop
          window.dispatchEvent(
            new CustomEvent('lobby-ws-send', {
              detail: { type: 'CHARACTER_SELECT', characterId: actorId },
            }),
          );
        }
      })
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
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              setIconIndex((prev) => {
                const next = prev - 1;
                if (typeof window !== 'undefined') {
                  const params = new URLSearchParams(window.location.search);
                  params.set('iconIndex', next.toString());
                  const newPath =
                    window.location.pathname + '?' + params.toString();
                  window.history.pushState(null, '', newPath);
                }
                return next;
              });
            }}
          >
            <ArrowLeft
              className="w-12 h-4 text-white"
              preserveAspectRatio="none"
            />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              setIconIndex((prev) => {
                const next = prev + 1;
                if (typeof window !== 'undefined') {
                  const params = new URLSearchParams(window.location.search);
                  params.set('iconIndex', next.toString());
                  const newPath =
                    window.location.pathname + '?' + params.toString();
                  window.history.pushState(null, '', newPath);
                }
                return next;
              });
            }}
          >
            <ArrowRight
              className="w-12 h-4 text-white"
              preserveAspectRatio="none"
            />
          </button>
        </div>
      </h3>

      {/* Grid mapping space */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1.5 p-1 bg-black border border-white/20 mb-4 flex-grow justify-items-center items-center">
        {seats.slice(0, 9).map((seat, index) => {
          const actorId = ((((index + iconIndex * 6) % 1000) + 1000) % 1000)
            .toString()
            .padStart(3, '0');
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

                if (typeof window !== 'undefined') {
                  window.dispatchEvent(
                    new CustomEvent('lobby-ws-send', {
                      detail: {
                        type: 'CHARACTER_SELECT',
                        characterId: actorId,
                      },
                    }),
                  );
                }
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

      <div className="flex flex-col gap-2 mt-4">
        <button
          type="button"
          disabled={!selectedActor}
          onClick={() => {
            if (!selectedActor) return;
            const currentActor = selectedActor;
            const jsonName = actorLookup[currentActor] || currentActor;
            const params = new URLSearchParams(window.location.search);
            params.set('actor', currentActor);
            params.set('json', jsonName);
            window.location.href = `/character-select?${params.toString()}`;
          }}
          className={`w-full font-bold uppercase py-2 border-2 transition-transform ${
            selectedActor
              ? 'bg-white text-black border-white hover:bg-neutral-200 active:scale-95 cursor-pointer'
              : 'bg-transparent text-neutral-500 border-neutral-700 cursor-not-allowed opacity-50'
          }`}
        >
          {clickState === '01' ? '[Create Agent]' : '[Open Agent]'}
        </button>

        <button
          type="button"
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            if (selectedActor) {
              const jsonName = actorLookup[selectedActor] || selectedActor;
              params.set('actor', selectedActor);
              params.set('json', jsonName);
            }
            window.location.href = `/invite?${params.toString()}`;
          }}
          className="w-full font-bold uppercase py-2 border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          [Invite Agent]
        </button>
      </div>
    </div>
  );
}
