import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home, DEFAULT_SCHEMA } from './pages/Home';
import { Reliquary } from './pages/Reliquary';
import { PrimalMamaLobby } from './components/PrimalMamaLobby';
import { NewsletterDispatch } from './components/NewsletterDispatch';
import { SocialFollow } from './components/SocialFollow';

export default function Home000App() {
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [currentHash, setCurrentHash] = useState(
    window.location.hash || '#home',
  );
  const [cartCount, setCartCount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  // Lifted Schema Data state to align navigation with toggled sections
  const [schemaSource, setSchemaSource] = useState<
    'loading' | 'api' | 'fallback_local' | 'fallback_embedded'
  >('loading');
  const [schemaData, setSchemaData] = useState(() => {
    const stored = localStorage.getItem('schema_data_v9');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && parsed.sectionsVisibility) {
          return parsed;
        }
      } catch (e) {
        // Fallback
      }
    }
    return DEFAULT_SCHEMA;
  });

  const handleSchemaChange = (newData: typeof DEFAULT_SCHEMA) => {
    setSchemaData(newData);
    localStorage.setItem('schema_data_v9', JSON.stringify(newData));
  };

  useEffect(() => {
    let active = true;
    async function fetchSchema() {
      try {
        const response = await fetch('/api/schema');
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        const data = await response.json();
        if (data && typeof data === 'object' && data.sectionsVisibility) {
          if (active) {
            setSchemaData(data);
            setSchemaSource('api');
          }
          return;
        }
        throw new Error('Invalid schema structure from API');
      } catch (err) {
        console.warn(
          'REST API schema fetch failed. Using embedded/stored fallback:',
          err,
        );
        if (active) {
          const stored = localStorage.getItem('schema_data_v9');
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (
                parsed &&
                typeof parsed === 'object' &&
                parsed.sectionsVisibility
              ) {
                setSchemaData(parsed);
                setSchemaSource('fallback_local');
                return;
              }
            } catch (e) {
              // Ignore
            }
          }
          setSchemaData(DEFAULT_SCHEMA);
          setSchemaSource('fallback_embedded');
        }
      }
    }
    fetchSchema();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentHash(hash);
      // Automatically scroll to top when changing hashes
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Set initial hash to #home if empty
  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#home';
    }
  }, []);

  // Diegetic Audio: Ambient murmer / hum + heartbeat
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let osc1: OscillatorNode | null = null;
    let osc2: OscillatorNode | null = null;
    let filter: BiquadFilterNode | null = null;
    let gain: GainNode | null = null;

    const handleFirstInteraction = () => {
      if (!ambientPlaying) {
        setAmbientPlaying(true);
        try {
          const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          if (!AudioCtx) return;
          audioCtx = new AudioCtx();

          // low 10Hz-esque rhythmic heartbeat pulse + generator hum
          gain = audioCtx.createGain();
          gain.gain.setValueAtTime(0.004, audioCtx.currentTime); // very low volume background hum

          filter = audioCtx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(80, audioCtx.currentTime);

          osc1 = audioCtx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note low hum

          osc2 = audioCtx.createOscillator();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(10, audioCtx.currentTime); // 10Hz rhythmic heartbeat oscillator

          const gain2 = audioCtx.createGain();
          gain2.gain.setValueAtTime(0.002, audioCtx.currentTime);

          osc1.connect(filter);
          osc2.connect(gain2.gain); // Modulates volume for heartbeat pulse
          filter.connect(gain);
          gain.connect(audioCtx.destination);

          osc1.start();
          osc2.start();
        } catch (e) {
          // Audio blocked or failed
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      if (osc1) osc1.stop();
      if (osc2) osc2.stop();
      if (audioCtx) audioCtx.close();
    };
  }, [ambientPlaying]);

  // Procedural typewriter tactile audio clack
  const playClack = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      // Vary frequency slightly to represent true mechanical typewriter buttons
      const pitch = 240 + Math.random() * 120;
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Audio context blocked
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    playClack();
  };

  const handleClearCart = () => {
    setCartCount(0);
    playClack();
  };

  const handleBookSeat = (role: string) => {
    setBookedSeats((prev) => [...prev, role]);
    playClack();
  };

  const renderContent = () => {
    if (currentHash === '#reliquary') {
      return <Reliquary playClack={playClack} />;
    }

    if (currentHash === '#primal-mama/lobby') {
      return (
        <PrimalMamaLobby
          playClack={playClack}
          onBack={() => {
            window.location.hash = '#home';
          }}
        />
      );
    }

    // Home, Shop, News, Community, About, Press, Retail, and System Terminal all handled in Home.tsx tabs
    return (
      <Home
        playClack={playClack}
        cartCount={cartCount}
        onAddToCart={handleAddToCart}
        bookedSeats={bookedSeats}
        onBookSeat={handleBookSeat}
        currentHash={currentHash}
        schemaData={schemaData}
        onSchemaChange={handleSchemaChange}
        schemaSource={schemaSource}
      />
    );
  };

  return (
    <div className="font-serif-body bg-[#E4DFD3] text-[#050505] min-h-screen flex flex-col selection:bg-[#D32F2F] selection:text-[#F9F6EE] pt-[104px] md:pt-[104px] transition-colors duration-300">
      <Header
        playClack={playClack}
        cartCount={cartCount}
        currentHash={currentHash}
        onClearCart={handleClearCart}
        sectionsVisibility={schemaData.sectionsVisibility}
      />

      <div className="flex-grow">{renderContent()}</div>

      <SocialFollow playClack={playClack} />

      <NewsletterDispatch playClack={playClack} />

      <Footer playClack={playClack} />
    </div>
  );
}
