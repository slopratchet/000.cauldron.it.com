import { Watch } from '../types';

/**
 * Generates a unique, tileable SVG hexagon background pattern for a given content card.
 * Uses watch.hexPatternStyle if defined, or maps dynamically based on watch.id / card index.
 */
export function getHexagonPatternSvg(watch: Watch, index: number): string {
  // Determine pattern style
  let style = watch.hexPatternStyle;

  if (!style) {
    if (watch.id === 'primal-mama' || watch.id === 'mythrokahn') {
      style = 'dense-dots';
    } else if (
      watch.id === 'toot-and-scute-unusual-simulation-service' ||
      watch.name.toLowerCase().includes('slopratchet')
    ) {
      style = 'flat-topped-macro';
    } else if (watch.id === 'perfect-beeing') {
      style = 'tactical-crosshair';
    } else if (watch.id === 'blessed-and-the-bounded') {
      style = 'flat-topped-conduits';
    } else {
      const styles = [
        'dense-dots',
        'flat-topped-macro',
        'tactical-crosshair',
        'stretched-conduits',
        'circuit-matrix',
        'quantum-rings',
      ];
      style = styles[index % styles.length];
    }
  }

  switch (style) {
    case 'flat-topped-macro':
      // Flat-Topped Hexagon Pattern (30% smaller, flat side up)
      return `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="12.6" viewBox="0 0 30 18">
        <rect width="30" height="18" fill="#fff" />
        <path d="M5 1 L15 1 L20 9.6 L15 17.3 L5 17.3 L0 9.6 Z M20 9.6 L25 9.6 M0 9.6 L-5 9.6 M15 1 L20 -6.7 M5 1 L0 -6.7 M15 17.3 L20 25 M5 17.3 L0 25 M20 9.6 L30 9.6" stroke="#000" stroke-width="0.9" fill="none" />
        <path d="M7 3.5 L13 3.5 L16.5 9.6 L13 15.7 L7 15.7 L3.5 9.6 Z" stroke="#000" stroke-width="0.6" stroke-dasharray="2 1.5" fill="none" opacity="0.6" />
        <circle cx="10" cy="9.6" r="1.2" fill="#000" opacity="0.8" />
      </svg>`;

    case 'flat-topped-conduits':
      // Flat-Topped Elongated Conduit Grid (Flat side up for Blessed & The Bounded)
      return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="14">
        <rect width="32" height="14" fill="#fff" />
        <path d="M6 1 L22 1 L28 7 L22 13 L6 13 L0 7 Z M28 7 L32 7 M0 7 L-4 7 M22 1 L28 -5 M6 1 L0 -5 M22 13 L28 19 M6 13 L0 19 M28 7 L32 7" stroke="#000" stroke-width="0.9" fill="none" />
        <line x1="10" y1="0" x2="10" y2="14" stroke="#000" stroke-width="0.7" stroke-dasharray="2 2" opacity="0.65" />
        <line x1="22" y1="0" x2="22" y2="14" stroke="#000" stroke-width="0.7" stroke-dasharray="2 2" opacity="0.65" />
      </svg>`;

    case 'dense-dots':
      // Pattern 1: Compact High-Density Honeycomb with Center Micro-Dots
      return `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="20">
        <rect width="12" height="20" fill="#fff" />
        <path d="M6 0 L12 3.3 L12 10 L6 13.3 L0 10 L0 3.3 Z M6 13.3 L6 16.6 M6 0 L6 3.3 M6 16.6 L0 20 M6 16.6 L12 20" stroke="#000" stroke-width="0.8" fill="none" />
        <circle cx="6" cy="6.6" r="1.1" fill="#000" opacity="0.75" />
      </svg>`;

    case 'macro-concentric':
      // Pattern 2: Large Heavy Titan Hexagons with Concentric Dashed Inner Hex
      return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="40">
        <rect width="24" height="40" fill="#fff" />
        <path d="M12 0 L24 6.6 L24 20 L12 26.6 L0 20 L0 6.6 Z M12 26.6 L12 33.3 M12 0 L12 6.6 M12 33.3 L0 40 M12 33.3 L24 40" stroke="#000" stroke-width="1.1" fill="none" />
        <path d="M12 4 L19 7.8 L19 15.5 L12 19.3 L5 15.5 L5 7.8 Z" stroke="#000" stroke-width="0.7" stroke-dasharray="3 2" fill="none" opacity="0.6" />
      </svg>`;

    case 'tactical-crosshair':
      // Pattern 3: Cybernetic Target Acquisition Mesh with Crosshair Vectors
      return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="28">
        <rect width="16" height="28" fill="#fff" />
        <path d="M8 0 L16 4.6 L16 14 L8 18.6 L0 14 L0 4.6 Z M8 18.6 L8 23.3 M8 0 L8 4.6 M8 23.3 L0 28 M8 23.3 L16 28" stroke="#000" stroke-width="0.8" fill="none" />
        <line x1="8" y1="0" x2="8" y2="18.6" stroke="#000" stroke-width="0.6" opacity="0.35" />
        <line x1="0" y1="4.6" x2="16" y2="14" stroke="#000" stroke-width="0.6" opacity="0.35" />
        <line x1="16" y1="4.6" x2="0" y2="14" stroke="#000" stroke-width="0.6" opacity="0.35" />
        <circle cx="8" cy="9.3" r="1.5" fill="none" stroke="#000" stroke-width="0.6" />
      </svg>`;

    case 'stretched-conduits':
      // Pattern 4: Elongated Monolithic Columns with Dashed Transverse Lines
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="32">
        <rect width="14" height="32" fill="#fff" />
        <path d="M7 0 L14 4 L14 16 L7 20 L0 16 L0 4 Z M7 20 L7 26 M7 0 L7 4 M7 26 L0 32 M7 26 L14 32" stroke="#000" stroke-width="0.9" fill="none" />
        <line x1="0" y1="10" x2="14" y2="10" stroke="#000" stroke-width="0.7" stroke-dasharray="2 2" opacity="0.6" />
        <line x1="0" y1="26" x2="14" y2="26" stroke="#000" stroke-width="0.7" stroke-dasharray="2 2" opacity="0.6" />
      </svg>`;

    case 'circuit-matrix':
      // Pattern 5: Arcane Circuit Matrix with Vertex Solder Nodes
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="34">
        <rect width="20" height="34" fill="#fff" />
        <path d="M10 0 L20 5.7 L20 17 L10 22.7 L0 17 L0 5.7 Z M10 22.7 L10 28.3 M10 0 L10 5.7 M10 28.3 L0 34 M10 28.3 L20 34" stroke="#000" stroke-width="0.8" fill="none" />
        <circle cx="10" cy="0" r="1.3" fill="#000" />
        <circle cx="20" cy="5.7" r="1.3" fill="#000" />
        <circle cx="20" cy="17" r="1.3" fill="#000" />
        <circle cx="10" cy="22.7" r="1.3" fill="#000" />
        <circle cx="0" cy="17" r="1.3" fill="#000" />
        <circle cx="0" cy="5.7" r="1.3" fill="#000" />
      </svg>`;

    case 'quantum-rings':
    default:
      // Pattern 6: Orbital Resonator Hex Grid with Target Rings
      return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="30">
        <rect width="18" height="30" fill="#fff" />
        <path d="M9 0 L18 5 L18 15 L9 20 L0 15 L0 5 Z M9 20 L9 25 M9 0 L9 5 M9 25 L0 30 M9 25 L18 30" stroke="#000" stroke-width="0.85" fill="none" />
        <circle cx="9" cy="10" r="3.5" fill="none" stroke="#000" stroke-width="0.6" />
        <circle cx="9" cy="10" r="1" fill="#000" />
      </svg>`;
  }
}

/**
 * Returns a CSS-compatible data URI for the watch's unique hexagon pattern.
 */
export function getHexagonPatternDataUrl(watch: Watch, index: number): string {
  const svg = getHexagonPatternSvg(watch, index);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
