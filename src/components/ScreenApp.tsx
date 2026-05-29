import React, { useState, useEffect, useRef } from 'react';

export default function ScreenApp() {
  const [viewers, setViewers] = useState(1970);
  const [logs, setLogs] = useState([
    {
      time: '12:04',
      sender: 'ADMIN',
      message: 'Calibrating visual phase array...',
      type: 'normal',
    },
    {
      time: '12:05',
      sender: 'USER_402',
      message: 'Signal strength holding steady in the perimeter.',
      type: 'normal',
    },
    {
      time: '12:07',
      sender: 'SYSTEM',
      message: 'New subscriber joined the party.',
      type: 'normal',
    },
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Viewer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => prev + (Math.floor(Math.random() * 5) - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-logs simulation
  useEffect(() => {
    const t1 = setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          sender: 'SYSTEM',
          message: 'Sub-channel verified.',
          type: 'system',
        },
      ]);
    }, 5000);

    const t2 = setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          sender: 'SYSTEM',
          message: 'Parity check complete.',
          type: 'system',
        },
      ]);
    }, 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center p-gutter relative selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Background Technical Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#091426 1px, transparent 1px), linear-gradient(90deg, #091426 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      <section className="max-w-[1000px] w-full flex flex-col gap-6 relative z-10 py-6">
        {/* Header Signal Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-primary pb-4 gap-4">
          <div className="flex flex-col">
            <span className="screen-font-label-sm text-secondary uppercase tracking-widest">
              LIVE BROADCAST // PROTOCOL 74
            </span>
            <h1 className="screen-font-headline-xl text-primary leading-none mt-1">
              MINIMALIST SIGNAL
            </h1>
          </div>
          <div className="flex gap-8 mb-1">
            <div className="flex flex-col items-end">
              <span className="screen-font-label-sm text-on-surface-variant uppercase">
                ACTIVE FREQUENCY
              </span>
              <span className="screen-font-code-md font-bold text-primary">
                14.2 MHz
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="screen-font-label-sm text-on-surface-variant uppercase">
                UPLINK STRENGTH
              </span>
              <span className="screen-font-code-md font-bold text-secondary">
                OPTIMAL
              </span>
            </div>
          </div>
        </div>

        {/* Central Live Viewport */}
        <div className="relative group aspect-video w-full bg-ink-wash border-[6px] border-primary block-shadow overflow-hidden">
          {/* Video/Signal Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              alt="An abstract, minimalist tactical interface representing a live stream"
              className="w-full h-full object-cover opacity-90 mix-blend-screen"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkGvJfHvVD_5Gdv7OlO87ALoDCWeUvItmAdlBk0yrG2Q9JeIkYBHyw3zmqrjaEBZpExWwFtR9iRqMYPx5ZW8cjBp0QGIX1htE24-0ExZKhLhVG8f5DAaXDCWp1r-RpcT0oG_dUFCny4G2V9sCTiOGqSV248xa9GYnKN1Tv0WyvC4WmA5KTPm3P5vv6Pb6gqUrSZIx7G9f68JtSSqX0t6JDqJx55_1fhzzaKnvfT4Y4svC8B2jnBPMBok6Ra1CDc_8IOhl-qO6tJ9h5"
            />
          </div>

          {/* Technical Overlays */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 m-4 flex flex-col justify-between p-4 sm:p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blood-red signal-pulse"></div>
                <span className="screen-font-code-md text-white/80 tracking-widest uppercase">
                  REC [LIVE]
                </span>
              </div>
              <div className="text-right">
                <div className="screen-font-code-md text-white/60">
                  00:48:12:09
                </div>
                <div className="screen-font-label-sm text-secondary">
                  CAM_01_FEED
                </div>
              </div>
            </div>

            {/* Viewport Focus Reticle (Simulated) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-secondary/30 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-secondary rounded-full"></div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-4">
                <div className="bg-primary/80 backdrop-blur-sm px-4 py-2 border border-secondary/20">
                  <span className="screen-font-code-md text-white">
                    VIEWERS: {viewers.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="screen-font-label-sm text-white/50 uppercase">
                  ENCRYPTION: AES-1974
                </span>
                <div className="flex gap-1">
                  <div className="w-6 h-1 bg-secondary"></div>
                  <div className="w-6 h-1 bg-secondary"></div>
                  <div className="w-6 h-1 bg-secondary/30"></div>
                  <div className="w-6 h-1 bg-secondary/10"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="scanline"></div>

          {/* Play/Pause Overlay (Micro Interaction Area) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 cursor-pointer pointer-events-auto">
            <span
              className="material-symbols-outlined text-white text-[80px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              pause_circle
            </span>
          </div>
        </div>

        {/* Dashboard Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-2">
          {/* Status Card 1 */}
          <div className="border-2 border-primary p-4 flex flex-col gap-2 hover:bg-surface-variant transition-colors group cursor-default bg-white">
            <div className="flex justify-between items-center">
              <span className="screen-font-label-sm text-on-surface-variant uppercase">
                Signal Origin
              </span>
              <span className="material-symbols-outlined text-headline-sm text-secondary group-hover:scale-110 transition-transform">
                location_on
              </span>
            </div>
            <div className="screen-font-headline-sm text-primary">
              SECTOR_B.11
            </div>
            <div className="text-sm screen-font-code-md text-primary/60">
              52.5200° N, 13.4050° E
            </div>
          </div>

          {/* Status Card 2 */}
          <div className="border-2 border-primary p-4 flex flex-col gap-2 hover:bg-surface-variant transition-colors group cursor-default bg-white">
            <div className="flex justify-between items-center">
              <span className="screen-font-label-sm text-on-surface-variant uppercase">
                Bandwidth
              </span>
              <span className="material-symbols-outlined text-headline-sm text-secondary group-hover:-rotate-12 transition-transform">
                wifi_tethering
              </span>
            </div>
            <div className="screen-font-headline-sm text-primary">
              84.2 MB/S
            </div>
            <div className="flex gap-1 mt-1">
              <div className="h-1 flex-1 bg-primary"></div>
              <div className="h-1 flex-1 bg-primary"></div>
              <div className="h-1 flex-1 bg-primary"></div>
              <div className="h-1 flex-1 bg-secondary"></div>
            </div>
          </div>

          {/* Status Card 3 */}
          <div className="border-2 border-primary p-4 flex flex-col gap-2 hover:bg-surface-variant transition-colors group cursor-default bg-white">
            <div className="flex justify-between items-center">
              <span className="screen-font-label-sm text-on-surface-variant uppercase">
                Latency
              </span>
              <span className="material-symbols-outlined text-headline-sm text-secondary group-hover:translate-x-1 transition-transform">
                speed
              </span>
            </div>
            <div className="screen-font-headline-sm text-primary">12 MS</div>
            <div className="screen-font-code-md text-green-700 font-bold uppercase tracking-tighter text-sm">
              OPERATIONAL
            </div>
          </div>
        </div>

        {/* Interaction Panel */}
        <div className="mt-4 flex flex-col md:flex-row gap-gutter">
          <div className="flex-1 border-2 border-primary p-6 bg-surface-container-low flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-primary/20 pb-2">
              <span className="material-symbols-outlined text-primary">
                chat
              </span>
              <span className="screen-font-label-md uppercase font-bold text-primary tracking-widest">
                SIGNAL LOG
              </span>
            </div>

            <div
              ref={logContainerRef}
              className="space-y-3 h-32 overflow-y-auto pr-2 custom-scrollbar"
            >
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-4 fade-in">
                  <span className="screen-font-code-md text-secondary whitespace-nowrap">
                    {log.time}
                  </span>
                  <p className="screen-font-body-md text-on-surface">
                    <span className="font-bold">{log.sender}:</span>{' '}
                    {log.message}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative mt-auto pt-2">
              <input
                className="w-full bg-white border-2 border-primary px-4 py-3 screen-font-code-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors uppercase placeholder:normal-case placeholder:text-black/40"
                placeholder="Transmit message..."
                type="text"
              />
              <button className="absolute right-2 top-4 bottom-2 bg-primary text-white px-4 flex items-center hover:bg-secondary transition-colors cursor-pointer active:scale-95">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>

          <div className="w-full md:w-72 flex flex-col gap-4">
            <button className="w-full py-4 border-2 border-primary flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group bg-white cursor-pointer active:scale-95">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                share
              </span>
              <span className="screen-font-label-md font-bold uppercase tracking-widest">
                RE-ROUTE SIGNAL
              </span>
            </button>
            <button className="w-full py-4 border-2 border-blood-red text-blood-red flex items-center justify-center gap-2 hover:bg-blood-red hover:text-white transition-all group bg-white cursor-pointer active:scale-95">
              <span className="material-symbols-outlined group-hover:rotate-180 transition-transform">
                power_settings_new
              </span>
              <span className="screen-font-label-md font-bold uppercase tracking-widest">
                TERMINATE LINK
              </span>
            </button>
            <div className="w-full border-2 border-primary p-4 bg-white flex flex-col items-center justify-center gap-3 mt-auto">
              <div className="flex items-center gap-2 w-full border-b border-primary/20 pb-2 justify-center">
                <span className="material-symbols-outlined text-primary text-sm">
                  qr_code_scanner
                </span>
                <span className="screen-font-label-sm text-primary uppercase tracking-widest font-bold">
                  AUTH OVERRIDE
                </span>
              </div>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AUTH_OVERRIDE_SEQUENCE&color=091426&bgcolor=ffffff"
                alt="Override QR Code"
                className="w-full max-w-[120px] aspect-square opacity-90 mix-blend-multiply"
              />
            </div>
          </div>
        </div>

        {/* Full Screen Action */}
        <button
          className="w-full py-4 border-2 border-primary bg-white text-primary flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group cursor-pointer active:scale-95 mt-2"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch((err) => {
                console.log(
                  `Error attempting to enable fullscreen: ${err.message}`,
                );
              });
            } else {
              document.exitFullscreen();
            }
          }}
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
            fullscreen
          </span>
          <span className="screen-font-label-md font-bold uppercase tracking-widest">
            Experience in Full Screen
          </span>
        </button>
      </section>
    </main>
  );
}
