import React from 'react';

interface WatchSchematicProps {
  watchId: string;
  caseMaterial?: string; // '904L Oystersteel' | 'Obsidian Titanium (Grade 5)' | '18ct Gold-Melt' | etc
  dialColor?: string; // 'Brutalist Black' | 'Vellum Cream' | 'Deep Emerald' | 'Aeronautical Slate' | etc
  bezelStyle?: string; // 'Rigid Smooth Bezel' | 'Acoustic Fluted Bezel' | 'Engraved Tachymeter Bezel' | etc
  strapType?: string; // 'Oyster Flat-Link Steel' | 'Sahara Calfskin Leather' | 'Tactical Ribbed Nylon' | etc
  showLabels?: boolean;
}

export default function WatchSchematic({
  watchId,
  caseMaterial,
  dialColor,
  bezelStyle,
  strapType,
  showLabels = false,
}: WatchSchematicProps) {
  // Resolve base/fallback values based on watchId if no custom specs are provided
  const actualCase =
    caseMaterial ||
    (watchId === 'toot-and-scute-unusual-simulation-service'
      ? '18ct Gold-Melt'
      : watchId === 'blessed-and-the-bounded'
        ? 'Obsidian Titanium (Grade 5)'
        : '904L Oystersteel');
  const actualDial =
    dialColor ||
    (watchId === 'primal-mama' || watchId === 'blessed-and-the-bounded'
      ? 'Brutalist Black'
      : watchId === 'toot-and-scute-unusual-simulation-service'
        ? 'Vellum Cream'
        : 'Aeronautical Slate');
  const actualBezel =
    bezelStyle ||
    (watchId === 'toot-and-scute-unusual-simulation-service'
      ? 'Acoustic Fluted Bezel'
      : watchId === 'perfect-beeing'
        ? 'Acoustic Fluted Bezel'
        : watchId === 'blessed-and-the-bounded'
          ? 'Engraved Tachymeter Bezel'
          : 'Rigid Smooth Bezel');
  const actualStrap =
    strapType ||
    (watchId === 'toot-and-scute-unusual-simulation-service'
      ? 'Oyster Flat-Link Steel'
      : watchId === 'perfect-beeing' || watchId === 'blessed-and-the-bounded'
        ? 'Tactical Ribbed Nylon'
        : 'Oyster Flat-Link Steel');

  // SVG color styling based on configuration choices
  let caseColor = '#5e5e5e'; // steel
  const caseStroke = '#000000';
  if (actualCase.includes('Titanium')) {
    caseColor = '#2b2b2b'; // darker titanium
  } else if (actualCase.includes('Gold')) {
    caseColor = '#d4af37'; // gold
  }

  let dialBgColor = '#121212'; // black
  let dialTextAndTicksColor = '#fcf9f2'; // aged paper color for contrast
  if (actualDial.includes('Cream')) {
    dialBgColor = '#f5f0e1';
    dialTextAndTicksColor = '#1c1c18';
  } else if (actualDial.includes('Emerald')) {
    dialBgColor = '#1b3b22';
    dialTextAndTicksColor = '#fcf9f2';
  } else if (actualDial.includes('Slate')) {
    dialBgColor = '#3a444a';
    dialTextAndTicksColor = '#fcf9f2';
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 select-none">
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full max-w-[320px] max-h-[320px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definition for reusable patterns */}
        <defs>
          {/* Tactical strap texture */}
          <pattern
            id="tactical-ribs"
            width="8"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="3"
              x2="8"
              y2="3"
              stroke="#000000"
              strokeWidth="2.5"
              opacity="0.4"
            />
          </pattern>
          {/* Fluted bezel pattern */}
          <pattern
            id="fluted-teeth"
            width="10"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke="#000000"
              strokeWidth="2.5"
            />
          </pattern>
        </defs>

        {/* --- SECTION 1: STRAP ATTACHMENT (TOP AND BOTTOM) --- */}
        {actualStrap.includes('Nylon') || actualStrap.includes('Tactical') ? (
          // Tactical strap - Ribbed
          <g id="strap-tactical">
            {/* Top strap */}
            <rect
              x="110"
              y="20"
              width="100"
              height="85"
              fill="#3b3b3b"
              stroke="#000000"
              strokeWidth="2.5"
            />
            <rect
              x="110"
              y="20"
              width="100"
              height="85"
              fill="url(#tactical-ribs)"
            />
            {/* Bottom strap */}
            <rect
              x="110"
              y="215"
              width="100"
              height="85"
              fill="#3b3b3b"
              stroke="#000000"
              strokeWidth="2.5"
            />
            <rect
              x="110"
              y="215"
              width="100"
              height="85"
              fill="url(#tactical-ribs)"
            />
          </g>
        ) : actualStrap.includes('Calfskin') ||
          actualStrap.includes('Leather') ? (
          // Leather strap - Clean with side stitches
          <g id="strap-leather">
            {/* Top strap */}
            <path
              d="M110,20 L210,20 L200,105 L120,105 Z"
              fill="#8b5a2b"
              stroke="#000000"
              strokeWidth="2.5"
            />
            <line
              x1="115"
              y1="20"
              x2="123"
              y2="105"
              stroke="#000000"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
            <line
              x1="205"
              y1="20"
              x2="197"
              y2="105"
              stroke="#000000"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
            {/* Bottom strap */}
            <path
              d="M120,215 L200,215 L210,300 L110,300 Z"
              fill="#8b5a2b"
              stroke="#000000"
              strokeWidth="2.5"
            />
            <line
              x1="123"
              y1="215"
              x2="115"
              y2="300"
              stroke="#000000"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
            <line
              x1="197"
              y1="215"
              x2="205"
              y2="300"
              stroke="#000000"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
          </g>
        ) : (
          // Oyster Flat-Link Steel Bracelet
          <g id="strap-oyster" stroke="#000000" strokeWidth="2.5">
            {/* Top bracelet links */}
            <g fill={caseColor}>
              {/* Outer columns */}
              <rect x="110" y="20" width="30" height="30" />
              <rect x="180" y="20" width="30" height="30" />
              <rect x="110" y="50" width="28" height="30" />
              <rect x="182" y="50" width="28" height="30" />
              <rect x="112" y="80" width="26" height="25" />
              <rect x="182" y="80" width="26" height="25" />

              {/* Center column */}
              <rect x="140" y="30" width="40" height="30" fill={caseColor} />
              <rect x="138" y="60" width="44" height="30" fill={caseColor} />
              <rect x="138" y="90" width="44" height="16" fill={caseColor} />
            </g>
            {/* Bottom bracelet links */}
            <g fill={caseColor}>
              {/* Center column */}
              <rect x="138" y="214" width="44" height="16" />
              <rect x="138" y="230" width="44" height="30" />
              <rect x="140" y="260" width="40" height="30" />

              {/* Outer columns */}
              <rect x="112" y="215" width="26" height="25" />
              <rect x="182" y="215" width="26" height="25" />
              <rect x="110" y="240" width="28" height="30" />
              <rect x="182" y="240" width="28" height="30" />
              <rect x="110" y="270" width="30" height="30" />
              <rect x="180" y="270" width="30" height="30" />
            </g>
          </g>
        )}

        {/* --- SECTION 2: OYSTER CASE CASEBODY --- */}
        <g id="casebody" stroke="#000000" strokeWidth="2.5" fill={caseColor}>
          {/* Main asymmetric or heavy round body with lugs */}
          <path d="M 110,95 C 90,115 85,135 85,160 C 85,185 90,205 110,225 L 210,225 C 230,205 235,185 235,160 C 235,135 230,115 210,95 Z" />

          {/* Solid crown protectors */}
          <path d="M 233,148 L 246,150 L 246,170 L 233,172 Z" />

          {/* Screw down crown */}
          <rect
            x="246"
            y="148"
            width="10"
            height="24"
            rx="2"
            fill="#1c1c18"
            stroke="#000000"
            strokeWidth="2"
          />
          {/* Grooves on the crown */}
          <line
            x1="249"
            y1="150"
            x2="249"
            y2="170"
            stroke={caseColor}
            strokeWidth="1.5"
          />
          <line
            x1="252"
            y1="150"
            x2="252"
            y2="170"
            stroke={caseColor}
            strokeWidth="1.5"
          />
        </g>

        {/* --- SECTION 3: BEZEL RING --- */}
        {actualBezel.includes('Fluted') ? (
          // Fluted Bezel (Ridged structure)
          <g id="bezel-fluted">
            <circle
              cx="160"
              cy="160"
              r="75"
              fill={caseColor}
              stroke="#000000"
              strokeWidth="2.5"
            />
            {/* Circular ridges using concentric circle dash arrays */}
            <circle
              cx="160"
              cy="160"
              r="72"
              fill="none"
              stroke="#000000"
              strokeWidth="3"
              strokeDasharray="3,1.5"
            />
            <circle
              cx="160"
              cy="160"
              r="69"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeDasharray="1.5,1.5"
            />
            <circle
              cx="160"
              cy="160"
              r="66"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
            />
          </g>
        ) : actualBezel.includes('Tachymeter') ? (
          // Tachymeter Bezel (Technical calibration indicators)
          <g id="bezel-tachymeter">
            <circle
              cx="160"
              cy="160"
              r="75"
              fill={caseColor}
              stroke="#000000"
              strokeWidth="2.5"
            />
            <circle
              cx="160"
              cy="160"
              r="66"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Tachymeter text scale indicators */}
            <text
              x="160"
              y="93"
              fill="#000000"
              fontSize="5"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              400
            </text>
            <text
              x="223"
              y="125"
              fill="#000000"
              fontSize="5"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              300
            </text>
            <text
              x="227"
              y="180"
              fill="#000000"
              fontSize="5"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              240
            </text>
            <text
              x="160"
              y="231"
              fill="#000000"
              fontSize="5"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              180
            </text>
            <text
              x="94"
              y="180"
              fill="#000000"
              fontSize="5"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              120
            </text>
            <text
              x="96"
              y="125"
              fill="#000000"
              fontSize="5"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              80
            </text>
            {/* Tiny notch marks */}
            <circle
              cx="160"
              cy="160"
              r="71"
              fill="none"
              stroke="#000000"
              strokeWidth="1.5"
              strokeDasharray="1,6"
            />
          </g>
        ) : (
          // Rigid Smooth Bezel
          <g id="bezel-smooth">
            <circle
              cx="160"
              cy="160"
              r="75"
              fill={caseColor}
              stroke="#000000"
              strokeWidth="2.5"
            />
            <circle
              cx="160"
              cy="160"
              r="66"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Radial metallic polish lines */}
            <line
              x1="160"
              y1="85"
              x2="160"
              y2="94"
              stroke="#000000"
              strokeWidth="0.8"
              opacity="0.4"
            />
            <line
              x1="160"
              y1="226"
              x2="160"
              y2="235"
              stroke="#000000"
              strokeWidth="0.8"
              opacity="0.4"
            />
            <line
              x1="85"
              y1="160"
              x2="94"
              y2="160"
              stroke="#000000"
              strokeWidth="0.8"
              opacity="0.4"
            />
            <line
              x1="226"
              y1="160"
              x2="235"
              y2="160"
              stroke="#000000"
              strokeWidth="0.8"
              opacity="0.4"
            />
          </g>
        )}

        {/* --- SECTION 4: DIAL FACE --- */}
        <g id="dial-face">
          {/* Dial Background */}
          <circle
            cx="160"
            cy="160"
            r="65"
            fill={dialBgColor}
            stroke="#000000"
            strokeWidth="2"
          />

          {/* Core Calibration Grid / Crosshairs (Brutalist style) */}
          <line
            x1="160"
            y1="95"
            x2="160"
            y2="225"
            stroke={dialTextAndTicksColor}
            strokeWidth="0.5"
            strokeDasharray="3,3"
            opacity="0.4"
          />
          <line
            x1="95"
            y1="160"
            x2="225"
            y2="160"
            stroke={dialTextAndTicksColor}
            strokeWidth="0.5"
            strokeDasharray="3,3"
            opacity="0.4"
          />
          <circle
            cx="160"
            cy="160"
            r="50"
            fill="none"
            stroke={dialTextAndTicksColor}
            strokeWidth="0.5"
            strokeDasharray="2,4"
            opacity="0.3"
          />

          {/* Outer Minute Track */}
          <circle
            cx="160"
            cy="160"
            r="62"
            fill="none"
            stroke={dialTextAndTicksColor}
            strokeWidth="1"
            strokeDasharray="1,3"
            opacity="0.8"
          />

          {/* Hour Indices (5-minute intervals) */}
          <g stroke={dialTextAndTicksColor} strokeWidth="1.5">
            {/* 12, 3, 6, 9 main markers */}
            {watchId !== 'toot-and-scute-unusual-simulation-service' && (
              <>
                <line x1="160" y1="96" x2="160" y2="104" strokeWidth="2.5" />
                <line x1="160" y1="216" x2="160" y2="224" strokeWidth="2.5" />
                <line x1="96" y1="160" x2="104" y2="160" strokeWidth="2.5" />
                <line x1="216" y1="160" x2="224" y2="160" strokeWidth="2.5" />
              </>
            )}
            {/* Other hours */}
            <line x1="192" y1="104" x2="188" y2="111" />
            <line x1="216" y1="128" x2="209" y2="132" />
            <line x1="216" y1="192" x2="209" y2="188" />
            <line x1="192" y1="216" x2="188" y2="209" />
            <line x1="128" y1="216" x2="132" y2="209" />
            <line x1="104" y1="192" x2="111" y2="188" />
            <line x1="104" y1="128" x2="111" y2="132" />
            <line x1="128" y1="104" x2="132" y2="111" />
          </g>

          {/* --- MODEL-SPECIFIC DIAL CHARACTERISTICS --- */}
          {watchId === 'primal-mama' && (
            <g id="dial-features-primal-mama">
              {/* Bold rectangular/triangular hour marker at 12 */}
              <polygon
                points="160,105 155,97 165,97"
                fill={dialTextAndTicksColor}
              />

              {/* Prominent Explorer-style numerals at 3, 6, 9 */}
              <text
                x="210"
                y="164"
                fill={dialTextAndTicksColor}
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                3
              </text>
              <text
                x="160"
                y="213"
                fill={dialTextAndTicksColor}
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                6
              </text>
              <text
                x="110"
                y="164"
                fill={dialTextAndTicksColor}
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                9
              </text>

              {/* Secure marking text block */}
              <text
                x="160"
                y="138"
                fill={dialTextAndTicksColor}
                fontSize="2.8"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
                opacity="0.8"
              >
                ALL AMERICAN ALLIGATOR DELIVERY SYSTEM OF PRIMAL MAMA
              </text>
              <text
                x="160"
                y="144"
                fill={dialTextAndTicksColor}
                fontSize="3"
                fontFamily="monospace"
                textAnchor="middle"
                opacity="0.6"
              >
                OFFICIAL CHRONOMETER
              </text>
            </g>
          )}

          {watchId === 'toot-and-scute-unusual-simulation-service' && (
            <g id="dial-features-toot-and-scute-unusual-simulation-service">
              {/* 12 o'clock arched DAY cut-out window */}
              <path
                d="M 132,106 C 141,102 150,100 160,100 C 170,100 179,102 188,106"
                fill="none"
                stroke={dialTextAndTicksColor}
                strokeWidth="4"
                strokeLinecap="square"
              />
              <text
                x="160"
                y="103"
                fill={dialBgColor}
                fontSize="3.5"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                MONDAY
              </text>

              {/* 3 o'clock DATE window with magnifying Cyclops outer boundary */}
              <rect
                x="202"
                y="150"
                width="15"
                height="18"
                fill={dialBgColor}
                stroke={dialTextAndTicksColor}
                strokeWidth="1.5"
              />
              <text
                x="210"
                y="162"
                fill={dialTextAndTicksColor}
                fontSize="10"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                18
              </text>
              {/* Cyclops magnifying lens line overlay */}
              <circle
                cx="210"
                cy="159"
                r="11"
                fill="none"
                stroke={dialTextAndTicksColor}
                strokeWidth="1"
                opacity="0.4"
              />

              {/* Roman indices or classic markers */}
              <text
                x="160"
                y="215"
                fill={dialTextAndTicksColor}
                fontSize="9"
                fontWeight="bold"
                fontFamily="serif"
                textAnchor="middle"
              >
                VI
              </text>
              <text
                x="110"
                y="163"
                fill={dialTextAndTicksColor}
                fontSize="9"
                fontWeight="bold"
                fontFamily="serif"
                textAnchor="middle"
              >
                IX
              </text>

              {/* Text markings */}
              <text
                x="160"
                y="132"
                fill={dialTextAndTicksColor}
                fontSize="2.5"
                fontWeight="bold"
                fontFamily="serif"
                textAnchor="middle"
                opacity="0.8"
              >
                TOOT & SCUTE UNUSUAL SLOPRATCHET SERVICE
              </text>
              <text
                x="160"
                y="185"
                fill={dialTextAndTicksColor}
                fontSize="3.5"
                fontFamily="monospace"
                textAnchor="middle"
                opacity="0.6"
              >
                SUPERLATIVE PRECISION
              </text>
            </g>
          )}

          {watchId === 'perfect-beeing' && (
            <g id="dial-features-perfect-beeing">
              {/* Rotatable off-center 24-hour disc inside the center */}
              <circle
                cx="160"
                cy="175"
                r="26"
                fill="none"
                stroke={dialTextAndTicksColor}
                strokeWidth="1"
              />
              <circle
                cx="160"
                cy="175"
                r="22"
                fill={dialBgColor}
                stroke={dialTextAndTicksColor}
                strokeWidth="0.5"
              />

              {/* 24h numerals on the sub-disc */}
              <text
                x="160"
                y="159"
                fill={dialTextAndTicksColor}
                fontSize="4.5"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                24
              </text>
              <text
                x="176"
                y="171"
                fill={dialTextAndTicksColor}
                fontSize="4.5"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                4
              </text>
              <text
                x="170"
                y="188"
                fill={dialTextAndTicksColor}
                fontSize="4.5"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                10
              </text>
              <text
                x="150"
                y="188"
                fill={dialTextAndTicksColor}
                fontSize="4.5"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                14
              </text>
              <text
                x="144"
                y="171"
                fill={dialTextAndTicksColor}
                fontSize="4.5"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                18
              </text>

              {/* Red inverted triangle pointing to the current secondary timezone hour */}
              <polygon points="160,150 157,144 163,144" fill="#ba1a1a" />

              {/* Annual Calendar aperture dots (12 boxes around the dial, active month colored red at 7 o'clock) */}
              <circle cx="152" cy="104" r="1.5" fill={dialTextAndTicksColor} />
              <circle cx="178" cy="107" r="1.5" fill={dialTextAndTicksColor} />
              <circle cx="199" cy="120" r="1.5" fill={dialTextAndTicksColor} />
              <circle cx="211" cy="141" r="1.5" fill={dialTextAndTicksColor} />
              <circle cx="211" cy="177" r="1.5" fill={dialTextAndTicksColor} />
              <circle cx="200" cy="198" r="1.5" fill={dialTextAndTicksColor} />
              <circle cx="178" cy="212" r="1.5" fill={dialTextAndTicksColor} />
              {/* Active July aperture marker (Red!) */}
              <circle
                cx="160"
                cy="216"
                r="2.2"
                fill="#ba1a1a"
                stroke={dialTextAndTicksColor}
                strokeWidth="0.5"
              />
              <circle cx="142" cy="212" r="1.5" fill={dialTextAndTicksColor} />
              <circle cx="120" cy="198" r="1.5" fill={dialTextAndTicksColor} />
              <circle cx="109" cy="177" r="1.5" fill={dialTextAndTicksColor} />
              <circle cx="109" cy="141" r="1.5" fill={dialTextAndTicksColor} />

              <text
                x="160"
                y="125"
                fill={dialTextAndTicksColor}
                fontSize="4"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
                opacity="0.8"
              >
                PRFCTBE3NG
              </text>
            </g>
          )}

          {watchId === 'blessed-and-the-bounded' && (
            <g id="dial-features-blessed-and-the-bounded">
              {/* Chronograph subdials */}
              {/* Subdial at 9 o'clock */}
              <circle
                cx="125"
                cy="160"
                r="14"
                fill="none"
                stroke={dialTextAndTicksColor}
                strokeWidth="1"
              />
              <line
                x1="125"
                y1="160"
                x2="116"
                y2="153"
                stroke="#ba1a1a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <text
                x="125"
                y="152"
                fill={dialTextAndTicksColor}
                fontSize="2.5"
                fontFamily="monospace"
                textAnchor="middle"
                opacity="0.6"
              >
                TORQUE
              </text>

              {/* Subdial at 3 o'clock */}
              <circle
                cx="195"
                cy="160"
                r="14"
                fill="none"
                stroke={dialTextAndTicksColor}
                strokeWidth="1"
              />
              <line
                x1="195"
                y1="160"
                x2="204"
                y2="168"
                stroke="#ba1a1a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <text
                x="195"
                y="152"
                fill={dialTextAndTicksColor}
                fontSize="2.5"
                fontFamily="monospace"
                textAnchor="middle"
                opacity="0.6"
              >
                METABOLIC
              </text>

              {/* Subdial at 6 o'clock */}
              <circle
                cx="160"
                cy="195"
                r="14"
                fill="none"
                stroke={dialTextAndTicksColor}
                strokeWidth="1"
              />
              <line
                x1="160"
                y1="195"
                x2="160"
                y2="183"
                stroke={dialTextAndTicksColor}
                strokeWidth="1"
              />
              <text
                x="160"
                y="212"
                fill={dialTextAndTicksColor}
                fontSize="2.5"
                fontFamily="monospace"
                textAnchor="middle"
                opacity="0.6"
              >
                PULSE
              </text>

              {/* Red warning bar/accent indicator */}
              <rect x="156" y="132" width="8" height="1.5" fill="#ba1a1a" />

              <text
                x="160"
                y="125"
                fill={dialTextAndTicksColor}
                fontSize="3.5"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
                opacity="0.8"
              >
                BLESSED & THE BOUNDED
              </text>
              <text
                x="160"
                y="142"
                fill={dialTextAndTicksColor}
                fontSize="3"
                fontFamily="monospace"
                textAnchor="middle"
                opacity="0.5"
              >
                CHRONO-SYNTHESIZER
              </text>
            </g>
          )}

          {/* --- CENTRAL HANDS --- */}
          <g id="watch-hands">
            {/* Hour hand (Mercedes styling or clean baton depending on model) */}
            {watchId === 'primal-mama' ? (
              // Explorer-style Mercedes hand
              <g transform="rotate(320 160 160)">
                <line
                  x1="160"
                  y1="160"
                  x2="160"
                  y2="122"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="160"
                  y2="122"
                  stroke={dialTextAndTicksColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Mercedes star disc on the hand */}
                <circle
                  cx="160"
                  cy="132"
                  r="4.5"
                  fill={dialTextAndTicksColor}
                  stroke="#000000"
                  strokeWidth="1"
                />
                <line
                  x1="160"
                  y1="127.5"
                  x2="160"
                  y2="136.5"
                  stroke="#000000"
                  strokeWidth="0.8"
                />
                <line
                  x1="155.5"
                  y1="132"
                  x2="164.5"
                  y2="132"
                  stroke="#000000"
                  strokeWidth="0.8"
                />
              </g>
            ) : (
              // Clean executive baton hour hand
              <g transform="rotate(130 160 160)">
                <line
                  x1="160"
                  y1="160"
                  x2="160"
                  y2="126"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <line
                  x1="160"
                  y1="160"
                  x2="160"
                  y2="126"
                  stroke={dialTextAndTicksColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Minute hand (Long elegant baton) */}
            <g transform="rotate(45 160 160)">
              <line
                x1="160"
                y1="160"
                x2="160"
                y2="105"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="160"
                y1="160"
                x2="160"
                y2="105"
                stroke={dialTextAndTicksColor}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>

            {/* Second hand (Ultra thin thread line with circle counterweight) */}
            <g transform="rotate(195 160 160)">
              <line
                x1="160"
                y1="172"
                x2="160"
                y2="98"
                stroke="#ba1a1a"
                strokeWidth="0.75"
              />
              {/* Luminous indicator bead on second hand */}
              <circle
                cx="160"
                cy="112"
                r="2.2"
                fill={dialTextAndTicksColor}
                stroke="#000000"
                strokeWidth="0.5"
              />
            </g>

            {/* Center pinion stack cap */}
            <circle cx="160" cy="160" r="4" fill="#000000" />
            <circle cx="160" cy="160" r="1.5" fill="#e5e2db" />
          </g>
        </g>

        {/* --- DECORATIVE FIELD BLUEPRINT NOTES --- */}
        {showLabels && (
          <g id="technical-annotations" opacity="0.8">
            {/* Outer dotted measurement line */}
            <line
              x1="30"
              y1="20"
              x2="30"
              y2="300"
              stroke="#000000"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="25"
              y1="20"
              x2="35"
              y2="20"
              stroke="#000000"
              strokeWidth="1"
            />
            <line
              x1="25"
              y1="300"
              x2="35"
              y2="300"
              stroke="#000000"
              strokeWidth="1"
            />
            <text
              x="20"
              y="165"
              fill="#000000"
              fontSize="7"
              fontWeight="bold"
              fontFamily="monospace"
              transform="rotate(-90 20 165)"
              textAnchor="middle"
            >
              CALIBRATION LENGTH // 320MM
            </text>

            <line
              x1="110"
              y1="10"
              x2="210"
              y2="10"
              stroke="#000000"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="110"
              y1="5"
              x2="110"
              y2="15"
              stroke="#000000"
              strokeWidth="1"
            />
            <line
              x1="210"
              y1="5"
              x2="210"
              y2="15"
              stroke="#000000"
              strokeWidth="1"
            />
            <text
              x="160"
              y="4"
              fill="#000000"
              fontSize="6.5"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              LUG GAP // 20MM
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
