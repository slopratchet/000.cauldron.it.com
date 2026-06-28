import { Grid } from 'lucide-react';
import type { Seat } from './types';

interface TheaterMapProps {
  seats: Seat[];
  onToggleSeat: (seatId: string) => void;
  onSelectSeatCoordinate: (coordinate: string) => void;
}

export default function TheaterMap({
  seats,
  onToggleSeat,
  onSelectSeatCoordinate,
}: TheaterMapProps) {
  return (
    <div
      id="theater-mapping-card"
      className="border-2 border-black p-4 bg-black text-[#E6E2D8] hard-shadow-sm flex flex-col font-mono h-full"
    >
      {/* Grid title panel */}
      <h3 className="text-sm font-bold uppercase border-b-2 border-[#E6E2D8]/20 pb-1.5 mb-4 flex items-center justify-between">
        <span>Theater Mapping</span>
        <Grid className="w-4 h-4 text-[#E6E2D8]" />
      </h3>

      {/* Grid mapping space */}
      <div className="grid grid-cols-5 gap-1.5 p-1 bg-black border border-[#E6E2D8]/20 mb-4 flex-grow justify-items-center items-center">
        {seats.map((seat) => {
          const isOccupied = seat.status === 'OCCUPIED';
          const targetUrl =
            seat.url || 'https://en.wikipedia.org/wiki/Theater_(structure)';
          return (
            <a
              key={seat.id}
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onToggleSeat(seat.id);
                onSelectSeatCoordinate(seat.id);
              }}
              title={`Seat ${seat.id} (${isOccupied ? 'Occupied' : 'Vacant'}) - Click to open page`}
              className={`w-full aspect-square border-2 border-black cursor-pointer transition-all duration-75 hover:scale-105 active:scale-95 flex items-center justify-center font-bold text-xs ${
                isOccupied
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-[#E6E2D8] text-black hover:bg-[#d0cbbe]'
              }`}
            >
              {/* Numeric or ID stamp on the squares */}
              <span>{seat.id.replace('G-', '')}</span>
            </a>
          );
        })}
      </div>

      {/* Status Legend indices */}
      <div className="mt-auto flex flex-wrap gap-4 text-xs font-bold uppercase border-t border-[#E6E2D8]/20 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-black border border-[#E6E2D8] inline-block"></span>
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#E6E2D8] border border-[#E6E2D8] inline-block"></span>
          <span className="text-[#E6E2D8]">Vacant</span>
        </div>
        <div className="ml-auto text-[10px] opacity-60 italic font-normal text-[#E6E2D8]">
          Click coordinate to launch web page & toggle.
        </div>
      </div>
    </div>
  );
}
