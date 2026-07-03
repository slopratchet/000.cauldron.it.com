import { Cpu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { $clerkStore } from '@clerk/astro/client';

interface OperationalLandscapeProps {
  title?: string;
  imgRef?: string;
}

export default function OperationalLandscape({
  title = 'Operational Landscape',
  imgRef = 'IMG_REF_69.SYS',
}: OperationalLandscapeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeSrc, setIframeSrc] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);

  // Real-time tracking for the interface dashboard
  const [clerkStatus, setClerkStatus] = useState<string>('INIT');
  const [iframeLoaded, setIframeLoaded] = useState<string>('FALSE (WAITING)');
  const [handshakeStatus, setHandshakeStatus] = useState<string>(
    'AWAITING_IFRAME_SIGNAL',
  );
  const [childReport, setChildReport] = useState<string>('NO_DATA_YET');

  useEffect(() => {
    console.log(
      '🔍 [PARENT] Component mounted. Resolving Authentication Context...',
    );
    const baseUrl = 'https://react.mmorpg.it.com/canvas?ui=false';
    let clerkRetries = 0;

    const initIframe = async () => {
      const clerk = $clerkStore.get();

      if (!clerk || !clerk.loaded) {
        clerkRetries++;
        setClerkStatus(`LOADING_RETRY_${clerkRetries}/30`);
        if (clerkRetries < 30) {
          setTimeout(initIframe, 100);
          return;
        }
        console.warn(
          '❌ [PARENT] Clerk store failed to load within 3 seconds.',
        );
        setClerkStatus('TIMEOUT_FAILED');
      } else {
        setClerkStatus('STORE_LOADED');
      }

      let fetchedToken = null;
      try {
        if (clerk && clerk.session) {
          fetchedToken = await clerk.session.getToken();
          console.log('✅ [PARENT] Token generated successfully.');
          setToken(fetchedToken);
          setClerkStatus('TOKEN_ACQUIRED');
        } else {
          console.warn('⚠️ [PARENT] No active session discovered.');
          setClerkStatus('NO_SESSION');
        }
      } catch (err) {
        console.error('💥 [PARENT] Exception reading token:', err);
        setClerkStatus(
          `ERROR: ${err instanceof Error ? err.message : 'UNKNOWN'}`,
        );
      }

      let finalIframeUrl = baseUrl;
      if (fetchedToken) {
        finalIframeUrl +=
          (finalIframeUrl.includes('?') ? '&' : '?') +
          'token=' +
          encodeURIComponent(fetchedToken);
      }

      console.log(
        `🚀 [PARENT] Pointing iframe destination to: "${finalIframeUrl}"`,
      );
      setIframeSrc(finalIframeUrl);
    };

    initIframe();

    // ─── TWO-WAY HANDSHAKE LISTENER ───
    const handleIncomingMessage = (e: MessageEvent) => {
      // Validate the target coming from your Cloudflare Pages domain
      if (e.origin !== 'https://react.mmorpg.it.com') return;

      console.log('📥 [PARENT] Message received from Iframe Content:', e.data);

      if (e.data && e.data.type === 'IFRAME_ENGINE_BOOTED') {
        console.log(
          '⚡ [PARENT] Handshake Request captured! Child DOM is fully alive and ready for injection.',
        );
        setHandshakeStatus('RECEIVED_BOOT_SIGNAL');

        if (token && iframeRef.current && iframeRef.current.contentWindow) {
          console.log(
            '📤 [PARENT] Dispatching Handshake Response: Sending credentials...',
          );
          iframeRef.current.contentWindow.postMessage(
            { type: 'CLERK_AUTH_TOKEN', payload: { token: token } },
            'https://react.mmorpg.it.com',
          );
          setHandshakeStatus('TOKEN_DISPATCHED_OK');
        } else {
          console.warn(
            '⚠️ [PARENT] Handshake skipped. Token state is null or missing target window context.',
          );
          setHandshakeStatus('FAILED_MISSING_TOKEN');
        }
      }

      if (e.data && e.data.type === 'IFRAME_DIAGNOSTIC_REPORT') {
        console.log(
          '📊 [PARENT] Detailed Diagnostic Report submitted by Child Context:',
          e.data.payload,
        );
        setChildReport(JSON.stringify(e.data.payload));
      }
    };

    window.addEventListener('message', handleIncomingMessage);
    return () => window.removeEventListener('message', handleIncomingMessage);
  }, [token]);

  const handleIframeLoad = () => {
    console.log(
      '🏁 [PARENT] Native iframe element "onLoad" reached standard browser completion.',
    );
    setIframeLoaded('TRUE (HTML_PARSED)');
  };

  return (
    <div
      id="landscape-container"
      className="border-4 border-black bg-white overflow-hidden hard-shadow flex flex-col h-full font-mono relative"
    >
      <div className="bg-black text-white px-4 py-1 text-xs uppercase flex justify-between tracking-widest font-bold z-20">
        <span className="flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 inline text-amber-500" /> {title}
        </span>
        <span className="text-red-400 text-[10px] animate-pulse font-bold">
          CROSS-FRAME PROTOCOL ONLINE
        </span>
      </div>

      {/* Real-time Diagnostic Matrix Terminal */}
      <div className="bg-slate-900 border-b-2 border-black text-emerald-400 text-[10px] p-2 space-y-1 font-mono z-20">
        <div>
          📡 <span className="text-white font-bold">1. CLERK STATUS:</span>{' '}
          {clerkStatus}
        </div>
        <div>
          ⏱️ <span className="text-white font-bold">2. NATIVE ONLOAD:</span>{' '}
          {iframeLoaded}
        </div>
        <div>
          🤝{' '}
          <span className="text-white font-bold">3. HANDSHAKE PIPELINE:</span>{' '}
          {handshakeStatus}
        </div>
        <div>
          📊{' '}
          <span className="text-white font-bold">4. CHILD REPORT MATRIX:</span>{' '}
          <span className="text-amber-300 break-all">{childReport}</span>
        </div>
      </div>

      <div className="relative w-full flex-grow min-h-[400px] h-[600px] bg-neutral-800">
        {iframeSrc ? (
          <iframe
            ref={iframeRef}
            sandbox="allow-scripts allow-same-origin"
            id="app-iframe"
            title="Operational Landscape View"
            className="w-full h-full border-none block relative z-10"
            src={iframeSrc}
            onLoad={handleIframeLoad}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-400 animate-pulse">
            Compiling Destination Environment...
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none z-20"></div>
      </div>
    </div>
  );
}
