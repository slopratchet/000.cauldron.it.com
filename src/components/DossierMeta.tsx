import React, { useState } from 'react';
import type { Operation } from '../types';
import { Shield, MapPin, Clock, Crosshair, Edit2, Check } from 'lucide-react';

interface DossierMetaProps {
  operation: Operation;
  onUpdateMeta: (updates: Partial<Operation>) => void;
}

export default function DossierMeta({
  operation,
  onUpdateMeta,
}: DossierMetaProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loc, setLoc] = useState(operation.location);
  const [time, setTime] = useState(operation.time);
  const [target, setTarget] = useState(operation.target);
  const [clearance, setClearance] = useState(operation.clearanceLevel);

  const handleSave = () => {
    onUpdateMeta({
      location: loc.toUpperCase(),
      time: time.toUpperCase(),
      target: target.toUpperCase(),
      clearanceLevel: clearance.toUpperCase(),
    });
    setIsEditing(false);
  };

  return (
    <div className="border-4 border-black bg-white p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
      {/* Confidential Stamp */}
      <div className="absolute top-3 right-3 select-none pointer-events-none z-10">
        <span className="stamp font-mono text-sm tracking-widest border-blood-red text-blood-red">
          CONFIDENTIAL
        </span>
      </div>

      <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
        <h2 className="font-mono text-xs font-bold text-intel-orange tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-intel-orange rounded-full inline-block animate-pulse"></span>
          FILE_METADATA_EXTRACT
        </h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="p-1 hover:bg-parchment-deep transition-colors text-black border border-transparent hover:border-black rounded-none cursor-pointer"
          title={isEditing ? 'Save metadata' : 'Edit metadata'}
          id="meta-edit-btn"
        >
          {isEditing ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Edit2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-2 font-mono text-xs text-black">
          <div>
            <label className="block text-gray-500 font-bold mb-0.5">
              LOCATION:
            </label>
            <input
              type="text"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="w-full border border-black p-1 bg-parchment-deep uppercase focus:outline-none focus:ring-1 focus:ring-black"
              id="input-meta-loc"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-bold mb-0.5">
              TIMESTAMP:
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-black p-1 bg-parchment-deep uppercase focus:outline-none focus:ring-1 focus:ring-black"
              id="input-meta-time"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-bold mb-0.5">
              TARGET OBJ:
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full border border-black p-1 bg-parchment-deep uppercase focus:outline-none focus:ring-1 focus:ring-black"
              id="input-meta-target"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-bold mb-0.5">
              CLEARANCE LEVEL:
            </label>
            <input
              type="text"
              value={clearance}
              onChange={(e) => setClearance(e.target.value)}
              className="w-full border border-black p-1 bg-parchment-deep uppercase focus:outline-none focus:ring-1 focus:ring-black"
              id="input-meta-clearance"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-y-2.5 font-mono text-xs text-black">
          <div className="text-gray-500 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-700" /> LOC:
          </div>
          <div className="font-bold tracking-tight">
            {operation.location || 'N/A'}
          </div>

          <div className="text-gray-500 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-700" /> TIME:
          </div>
          <div className="font-bold tracking-tight">
            {operation.time || 'N/A'}
          </div>

          <div className="text-gray-500 font-medium flex items-center gap-1">
            <Crosshair className="w-3.5 h-3.5 text-gray-700" /> TARGET:
          </div>
          <div className="font-bold tracking-tight text-black">
            {operation.target || 'N/A'}
          </div>

          <div className="text-gray-500 font-medium flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-black" /> CLEARANCE:
          </div>
          <div className="font-extrabold text-blood-red tracking-wider">
            {operation.clearanceLevel || 'LEVEL 1'}
          </div>
        </div>
      )}
    </div>
  );
}
