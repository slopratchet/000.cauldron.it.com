import { Cpu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { $clerkStore } from '@clerk/astro/client';
import type { SystemLogEntry } from './types';

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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Real-time tracking for the interface dashboard
  const appendLog = (
    text: string,
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT' = 'INFO',
  ) => {
    window.dispatchEvent(
      new CustomEvent('lobby-system-log', {
        detail: { text, type },
      }),
    );
  };

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
        appendLog(
          `📡 1. CLERK STATUS: LOADING_RETRY_${clerkRetries}/30`,
          'WARNING',
        );
        if (clerkRetries < 30) {
          setTimeout(initIframe, 100);
          return;
        }
        console.warn(
          '❌ [PARENT] Clerk store failed to load within 3 seconds.',
        );
        appendLog('📡 1. CLERK STATUS: TIMEOUT_FAILED', 'ALERT');
      } else {
        appendLog('📡 1. CLERK STATUS: STORE_LOADED', 'SUCCESS');
      }

      let fetchedToken = null;
      try {
        if (clerk && clerk.session) {
          fetchedToken = await clerk.session.getToken();
          console.log('✅ [PARENT] Token generated successfully.');
          setToken(fetchedToken);
          appendLog('📡 1. CLERK STATUS: TOKEN_ACQUIRED', 'SUCCESS');
        } else {
          console.warn('⚠️ [PARENT] No active session discovered.');
          appendLog('📡 1. CLERK STATUS: NO_SESSION', 'WARNING');
        }
      } catch (err) {
        console.error('💥 [PARENT] Exception reading token:', err);
        appendLog(
          `📡 1. CLERK STATUS: ERROR: ${err instanceof Error ? err.message : 'UNKNOWN'}`,
          'ALERT',
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
        appendLog('🤝 3. HANDSHAKE PIPELINE: RECEIVED_BOOT_SIGNAL', 'SUCCESS');

        if (token && iframeRef.current && iframeRef.current.contentWindow) {
          console.log(
            '📤 [PARENT] Dispatching Handshake Response: Sending credentials...',
          );
          iframeRef.current.contentWindow.postMessage(
            { type: 'CLERK_AUTH_TOKEN', payload: { token: token } },
            'https://react.mmorpg.it.com',
          );
          appendLog('🤝 3. HANDSHAKE PIPELINE: TOKEN_DISPATCHED_OK', 'SUCCESS');
        } else {
          console.warn(
            '⚠️ [PARENT] Handshake skipped. Token state is null or missing target window context.',
          );
          appendLog(
            '🤝 3. HANDSHAKE PIPELINE: FAILED_MISSING_TOKEN',
            'WARNING',
          );
        }
      }

      if (e.data && e.data.type === 'IFRAME_DIAGNOSTIC_REPORT') {
        console.log(
          '📊 [PARENT] Detailed Diagnostic Report submitted by Child Context:',
          e.data.payload,
        );
        appendLog(
          `📊 4. CHILD REPORT MATRIX: ${JSON.stringify(e.data.payload)}`,
          'SUCCESS',
        );
      }
    };

    window.addEventListener('message', handleIncomingMessage);
    return () => window.removeEventListener('message', handleIncomingMessage);
  }, [token]);

  const handleIframeLoad = () => {
    console.log(
      '🏁 [PARENT] Native iframe element "onLoad" reached standard browser completion.',
    );
    appendLog('⏱️ 2. NATIVE ONLOAD: TRUE (HTML_PARSED)', 'SUCCESS');
  };

  return (
    <div
      id="landscape-container"
      className="border-4 border-black bg-white overflow-hidden flex flex-col h-full font-mono relative"
      style={{
        aspectRatio: '1280/720',
      }}
    >
      <div className="bg-black text-white px-4 py-1 text-xs uppercase flex justify-between tracking-widest font-bold z-20">
        <span className="flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 inline text-amber-500" /> {title}
        </span>
        <button
          onClick={() => setIsFullScreen(true)}
          className="text-red-400 text-[10px] animate-pulse font-bold cursor-pointer hover:text-white uppercase"
        >
          Open Full Screen
        </button>
      </div>

      <div
        className={`w-full flex-grow bg-neutral-800 overflow-hidden flex items-center ${
          isFullScreen
            ? 'fixed inset-0 z-[100] h-screen w-screen justify-center bg-black'
            : 'relative justify-start lg:justify-center'
        }`}
      >
        {isFullScreen && (
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 z-[110] bg-black/50 border border-white/20 text-white px-4 py-2 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm rounded"
          >
            Close
          </button>
        )}
        {iframeSrc ? (
          <iframe
            ref={iframeRef}
            sandbox="allow-scripts allow-same-origin"
            id="app-iframe"
            title="Operational Landscape View"
            className="border-none block relative z-10 mx-auto"
            style={
              isFullScreen
                ? {
                    width: 'min(100vw, calc(100vh * 1280 / 720))',
                    height: 'min(100vh, calc(100vw * 720 / 1280))',
                    aspectRatio: '1280 / 720',
                  }
                : {
                    maxWidth: '100%',
                    maxHeight: '100%',
                    aspectRatio: '1280 / 720',
                    width: 'auto',
                    height: 'auto',
                  }
            }
            width={1280}
            height={720}
            src={iframeSrc}
            onLoad={handleIframeLoad}
          />
        ) : (
          <div
            className="flex items-center justify-center text-xs text-neutral-400 animate-pulse"
            style={
              isFullScreen
                ? {
                    width: 'min(100vw, calc(100vh * 1280 / 720))',
                    height: 'min(100vh, calc(100vw * 720 / 1280))',
                    aspectRatio: '1280 / 720',
                  }
                : {
                    maxWidth: '100%',
                    maxHeight: '100%',
                    aspectRatio: '1280 / 720',
                    width: 'auto',
                    height: 'auto',
                  }
            }
          >
            Compiling Destination Environment...
          </div>
        )}
      </div>
    </div>
  );
}
