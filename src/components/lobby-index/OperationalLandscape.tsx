import { useState, useEffect, useRef } from 'react';
import { Cpu } from 'lucide-react';
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
  const [iframeUrl, setIframeUrl] = useState<string>(
    'https://002-primal-mama-mobile-control.pages.dev/',
  );
  const [clerkToken, setClerkToken] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let retries = 0;

    const initIframe = async () => {
      const clerk = $clerkStore.get();

      if (!clerk || !clerk.loaded) {
        retries++;
        if (retries < 30) {
          timeoutId = setTimeout(initIframe, 100);
          return;
        }
        console.warn(
          'Clerk failed to load within 3 seconds. Initializing iframe without token.',
        );
      }

      let token = null;
      try {
        if (clerk && clerk.session) {
          token = await clerk.session.getToken();
          setClerkToken(token);
        }
      } catch (err) {
        console.error('Error fetching Clerk token client-side:', err);
      }

      const baseUrl = 'https://002-primal-mama-mobile-control.pages.dev/';
      let finalIframeUrl = baseUrl;
      if (token) {
        finalIframeUrl +=
          (finalIframeUrl.includes('?') ? '&' : '?') +
          'token=' +
          encodeURIComponent(token);
      }
      setIframeUrl(finalIframeUrl);
    };

    initIframe();

    return () => clearTimeout(timeoutId);
  }, []);

  const handleIframeLoad = () => {
    if (clerkToken && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'CLERK_AUTH_TOKEN', payload: { token: clerkToken } },
        'https://002-primal-mama-mobile-control.pages.dev',
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
          id="historical-landscape-img"
          title="Operational Landscape"
          className="w-full h-full object-cover grayscale contrast-125 brightness-95 opacity-90 inline-block border-none"
          src={iframeUrl}
          onLoad={handleIframeLoad}
          data-img-ref={imgRef}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
