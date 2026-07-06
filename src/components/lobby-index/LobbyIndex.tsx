import { useState, useEffect } from 'react';
import './styles/lobby-index.css';

export default function LobbyIndex() {
  const [href, setHref] = useState('/control');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    if (action) {
      setHref(`/control?action=${encodeURIComponent(action)}`);
    } else {
      setHref('/control');
    }
  }, []);

  return (
    <div
      id="application-container"
      className="relative flex flex-col items-center justify-center py-24 bg-parchment-deep selection:bg-black selection:text-parchment-deep border-b-2 border-black"
    >
      {/* Background scanline/dots authenticity overlay */}
      <div className="dot-matrix-overlay absolute inset-0 z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <a
          href={href}
          className="group relative inline-flex items-center justify-center px-16 py-8 border-4 border-black bg-black text-[#e6e2d8] font-anton text-4xl uppercase tracking-[0.25em] hard-shadow press-interaction hover:bg-[#d10919] hover:text-[#e6e2d8] transition-colors duration-150"
        >
          <span>CONTROL</span>
        </a>
        <div className="font-mono text-[10px] tracking-widest text-[#333333] opacity-60 uppercase mt-2">
          SIGNAL READY // PRESS TO ESTABLISH LINK
        </div>
      </div>
    </div>
  );
}
