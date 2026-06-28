import { useState, useEffect } from 'react';
import { $clerkStore } from '@clerk/astro/client';
import { User } from 'lucide-react';

export default function ClerkPlayerObject() {
  const [clerk, setClerk] = useState($clerkStore.get());

  useEffect(() => {
    return $clerkStore.subscribe((newClerk) => {
      setClerk(newClerk);
    });
  }, []);

  const user = clerk?.user;

  return (
    <div
      id="clerk-player-object"
      className="border-2 border-black p-4 bg-zinc-800 text-[#E6E2D8] hard-shadow-sm flex flex-col font-mono mt-4"
    >
      <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-[#E6E2D8]/20">
        <User className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Player Object (Clerk)
        </h3>
      </div>
      <div className="font-mono text-[10px] overflow-auto max-h-64 scrollbar-hide select-text">
        {user ? (
          <pre className="whitespace-pre-wrap break-all leading-tight opacity-80">
            {JSON.stringify(user, null, 2)}
          </pre>
        ) : (
          <p className="text-amber-500 italic py-4 text-center">
            - No active player session detected in clerk store -
          </p>
        )}
      </div>
    </div>
  );
}
