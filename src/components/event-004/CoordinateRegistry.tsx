import React from 'react';
import { Compass, MapPin } from 'lucide-react';
import { HexMapPlacement } from './types';

interface CoordinateRegistryProps {
  hexmaps: Record<string, HexMapPlacement>;
}

export function CoordinateRegistry({ hexmaps }: CoordinateRegistryProps) {
  // Separate into Surface and Subterranean
  const surfaceEntries = Object.entries(hexmaps).filter(
    ([hexId, hex]) => hex.layer === 0,
  );
  const subterraneanEntries = Object.entries(hexmaps).filter(
    ([hexId, hex]) => hex.layer === -1,
  );

  const renderHexCard = (hexId: string, hex: HexMapPlacement) => {
    const isVillage = hexId === 'hex-00';
    const isSwamp = hexId === 'hex-01';
    const isStoneTombSub = hexId === 'hex-02';
    const isStoneTombSurf = hexId === 'hex-02-surface';

    let headerStyles = 'text-neutral-800 border-neutral-300';

    if (isVillage) {
      headerStyles = 'text-amber-900 border-amber-400';
    } else if (isSwamp) {
      headerStyles = 'text-emerald-900 border-emerald-400';
    } else if (isStoneTombSub) {
      headerStyles = 'text-rose-900 border-rose-455';
    } else if (isStoneTombSurf) {
      headerStyles = 'text-purple-900 border-purple-400';
    }

    return (
      <div
        key={hexId}
        className="border border-neutral-300 p-4 rounded bg-stone-50/40 flex flex-col justify-between gap-4 hover:border-black transition-colors duration-150 shadow-xs"
      >
        <div>
          <div className="flex justify-between items-start">
            <span
              className={`font-serif font-black text-sm uppercase tracking-tight block ${headerStyles}`}
            >
              {hexId === 'hex-02'
                ? 'Stone Tomb (Subterranean)'
                : hexId === 'hex-02-surface'
                  ? 'Stone Tomb (Surface)'
                  : hexId === 'hex-00'
                    ? 'Oakhaven Village'
                    : 'Barrowmoors Swamps'}
            </span>
            <span className="font-mono text-[9px] bg-neutral-200/70 border border-neutral-300 text-neutral-700 font-bold px-2 py-0.5 rounded uppercase tracking-wide">
              {hexId}
            </span>
          </div>
          <div className="text-[10px] text-neutral-500 mt-2 flex items-center gap-1">
            <span>Terrain Type:</span>
            <b className="text-black uppercase text-[9.5px] tracking-wide font-mono bg-white px-1.5 py-0.5 rounded border border-neutral-200">
              {hex.terrain_override}
            </b>
          </div>
        </div>

        <div className="text-left text-[11px] leading-snug font-mono pt-1">
          <div className="flex justify-between">
            <span className="text-neutral-500">Grid Coordinates:</span>
            <b className="text-neutral-800">
              ({hex.q}, {hex.r}, {hex.s})
            </b>
          </div>
          <div className="flex justify-between mt-1 pt-1 border-t border-dashed border-neutral-150">
            <span className="text-neutral-500">Bounds Weight:</span>
            <b className="text-neutral-850 font-semibold">
              {hex.scale_miles
                ? `${hex.scale_miles} Miles`
                : `${hex.scale_ft} Ft`}
            </b>
          </div>
          <div className="flex justify-between mt-1 text-[10px]">
            <span className="text-neutral-400">Atmospheric Layer:</span>
            <span
              className={`font-bold px-1 rounded ${hex.layer === 0 ? 'bg-amber-100 text-amber-850' : 'bg-purple-100 text-purple-850'}`}
            >
              Level {hex.layer === 0 ? '0.0 (Surface)' : '-1.0 (Subterranean)'}
            </span>
          </div>

          {hex.runic_wind && (
            <div className="flex justify-between mt-1 text-[9.5px] pl-2 text-stone-500">
              <span>├ Wind Pattern:</span>
              <span className="text-neutral-700 text-right">
                {hex.runic_wind}
              </span>
            </div>
          )}
          {hex.etheric_pressure && (
            <div className="flex justify-between mt-0.5 text-[9.5px] pl-2 text-stone-500">
              <span>├ Etheric Pressure:</span>
              <span className="text-neutral-700 text-right">
                {hex.etheric_pressure}
              </span>
            </div>
          )}
          {hex.relative_humidity && (
            <div className="flex justify-between mt-0.5 text-[9.5px] pl-2 text-stone-500">
              <span>├ Rel. Humidity:</span>
              <span className="text-neutral-700 text-right">
                {hex.relative_humidity}
              </span>
            </div>
          )}
          {hex.spectral_density && (
            <div className="flex justify-between mt-0.5 text-[9.5px] pl-2 text-stone-500">
              <span>├ Spectral Density:</span>
              <span className="text-neutral-700 text-right">
                {hex.spectral_density}
              </span>
            </div>
          )}
          {hex.acoustic_echo && (
            <div className="flex justify-between mt-0.5 text-[9.5px] pl-2 text-stone-500">
              <span>└ Acoustic Echo:</span>
              <span className="text-neutral-700 text-right">
                {hex.acoustic_echo}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      id="coordinate-registry"
      className="w-full flex flex-col gap-6 font-mono text-xs"
    >
      {/* SECTION 1: SURFACE 0.0 */}
      <div className="flex flex-col gap-3">
        <span className="font-bold text-neutral-500 uppercase tracking-widest text-[9.5px] border-b border-neutral-350 pb-1">
          📊 SURFACE 0.0 COORDINATES REGISTRY
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {surfaceEntries.map(([hexId, hex]) => renderHexCard(hexId, hex))}
        </div>
      </div>

      {/* SECTION 2: SUBTERRANEAN -1.0 */}
      <div className="flex flex-col gap-3">
        <span className="font-bold text-neutral-500 uppercase tracking-widest text-[9.5px] border-b border-neutral-350 pb-1">
          📊 SUBTERRANEAN -1.0 COORDINATES REGISTRY
        </span>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-sm">
          {subterraneanEntries.map(([hexId, hex]) => renderHexCard(hexId, hex))}
        </div>
      </div>
    </div>
  );
}
