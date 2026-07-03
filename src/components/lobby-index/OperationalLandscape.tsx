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
  const [iframeSrc, setIframeSrc] = useState<string>(
    'https://002-primal-mama-mobile-control.pages.dev/canvas',
  );
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = 'https://002-primal-mama-mobile-control.pages.dev/canvas';
    let clerkRetries = 0;

    const initIframe = async () => {
      const clerk = $clerkStore.get();

      if (!clerk || !clerk.loaded) {
        clerkRetries++;
        if (clerkRetries < 30) {
          setTimeout(initIframe, 100);
          return;
        }
        console.warn(
          'Clerk failed to load within 3 seconds. Initializing iframe without token.',
        );
      }

      let fetchedToken = null;
      try {
        if (clerk && clerk.session) {
          fetchedToken = await clerk.session.getToken();
          setToken(fetchedToken);
        }
      } catch (err) {
        console.error('Error fetching Clerk token client-side:', err);
      }

      let finalIframeUrl = baseUrl;
      if (fetchedToken) {
        finalIframeUrl +=
          (finalIframeUrl.includes('?') ? '&' : '?') +
          'token=' +
          encodeURIComponent(fetchedToken);
      }

      setIframeSrc(finalIframeUrl);
    };

    initIframe();
  }, []);

  const handleIframeLoad = () => {
    if (token && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'CLERK_AUTH_TOKEN', payload: { token: token } },
        '*',
      );
    }
  };

  return (
    <div
      id="landscape-container"
      className="border-4 border-black bg-white overflow-hidden hard-shadow flex flex-col h-full font-mono"
    >
      <div className="bg-black text-white px-4 py-1 text-xs uppercase flex justify-between tracking-widest font-bold">
        <span className="flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 inline text-amber-500" /> {title}
        </span>
        <div id="surface00"> </div>
      </div>
      <div className="relative h-64 w-full flex-grow min-h-[220px]">
        <iframe
          ref={iframeRef}
          id="app-iframe"
          title="Operational Landscape View"
          className="w-full h-full border-none block"
          src={iframeSrc}
          onLoad={handleIframeLoad}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
