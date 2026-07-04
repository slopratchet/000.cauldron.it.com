import { Cpu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { $clerkStore } from '@clerk/astro/client';
import SystemLogs from './SystemLogs';
import type { SystemLogEntry } from './types';

interface OperationalLandscapeProps {
  title?: string;
  imgRef?: string;
  logs?: SystemLogEntry[];
  onClearLogs?: () => void;
  isPaused?: boolean;
  onTogglePause?: () => void;
  isLogsVisible?: boolean;
}

export default function OperationalLandscape({
  title = 'Operational Landscape',
  imgRef = 'IMG_REF_69.SYS',
  logs,
  onClearLogs,
  isPaused,
  onTogglePause,
  isLogsVisible = false,
}: OperationalLandscapeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeSrc, setIframeSrc] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);

  // Dispatch a global event to add a system log, picked up by LobbyIndex component
  const logSystemEvent = (
    text: string,
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT' = 'INFO',
  ) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('lobby-system-log', {
          detail: { text, type },
        }),
      );
    }
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
        logSystemEvent(
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
        logSystemEvent('📡 1. CLERK STATUS: TIMEOUT_FAILED', 'ALERT');
      } else {
        logSystemEvent('📡 1. CLERK STATUS: STORE_LOADED', 'INFO');
      }

      let fetchedToken = null;
      try {
        if (clerk && clerk.session) {
          fetchedToken = await clerk.session.getToken();
          console.log('✅ [PARENT] Token generated successfully.');
          setToken(fetchedToken);
          logSystemEvent('📡 1. CLERK STATUS: TOKEN_ACQUIRED', 'SUCCESS');
        } else {
          console.warn('⚠️ [PARENT] No active session discovered.');
          logSystemEvent('📡 1. CLERK STATUS: NO_SESSION', 'WARNING');
        }
      } catch (err) {
        console.error('💥 [PARENT] Exception reading token:', err);
        logSystemEvent(
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
        logSystemEvent(
          '🤝 3. HANDSHAKE PIPELINE: RECEIVED_BOOT_SIGNAL',
          'INFO',
        );

        if (token && iframeRef.current && iframeRef.current.contentWindow) {
          console.log(
            '📤 [PARENT] Dispatching Handshake Response: Sending credentials...',
          );
          iframeRef.current.contentWindow.postMessage(
            { type: 'CLERK_AUTH_TOKEN', payload: { token: token } },
            'https://react.mmorpg.it.com',
          );
          logSystemEvent(
            '🤝 3. HANDSHAKE PIPELINE: TOKEN_DISPATCHED_OK',
            'SUCCESS',
          );
        } else {
          console.warn(
            '⚠️ [PARENT] Handshake skipped. Token state is null or missing target window context.',
          );
          logSystemEvent(
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
        logSystemEvent(
          `📊 4. CHILD REPORT MATRIX: ${JSON.stringify(e.data.payload)}`,
          'INFO',
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
    logSystemEvent('⏱️ 2. NATIVE ONLOAD: TRUE (HTML_PARSED)', 'SUCCESS');
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

      <div className="relative w-full flex-grow aspect-video bg-neutral-800">
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

      {/* Real-time Diagnostic Matrix Terminal combined with System Logs */}
      {isLogsVisible &&
        logs &&
        onClearLogs &&
        onTogglePause &&
        isPaused !== undefined && (
          <SystemLogs
            logs={logs}
            onClearLogs={onClearLogs}
            isPaused={isPaused}
            onTogglePause={onTogglePause}
          />
        )}
    </div>
  );
}
