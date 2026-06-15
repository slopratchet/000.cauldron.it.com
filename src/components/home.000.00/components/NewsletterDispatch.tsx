import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

interface NewsletterDispatchProps {
  playClack: () => void;
}

export function NewsletterDispatch({ playClack }: NewsletterDispatchProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    playClack();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section
      id="newsletter-dispatch"
      className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8"
    >
      <div className="bg-[#1C1C1CB2] text-bone border-4 border-obsidian p-6 sm:p-8 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] flex flex-col md:flex-row justify-between items-center gap-8 uppercase">
        <div className="space-y-4 max-w-2xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-bone/20 rounded-full flex items-center justify-center bg-obsidian">
              <Mail className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h4 className="font-archive text-xl sm:text-2xl tracking-wider leading-none">
              NEWSLETTER DISPATCH
            </h4>
          </div>

          <p className="font-serif-body text-xs sm:text-sm text-bone/80 normal-case leading-relaxed font-normal">
            Subscribe to receive official system development checklists, free
            downloadable character passports, and local community play logs.
            Stay synced with our tabletop community bulletins and releases.
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="w-full md:w-80 shrink-0 space-y-3 font-mono-ui"
        >
          {subscribed ? (
            <div className="bg-green-600/20 border border-green-500 text-green-300 p-3 text-xs flex items-center gap-2 font-bold justify-center rounded">
              <Check className="w-4 h-4" />
              <span>SUBSCRIBED SECURELY</span>
            </div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="CODENAME@PROVIDER.COM"
                required
                className="w-full bg-obsidian/85 border-2 border-bone/20 text-bone p-3 font-mono text-xs focus:border-[#D32F2F] focus:outline-none tracking-widest placeholder-bone/40"
              />
              <button
                type="submit"
                className="w-full bg-white hover:bg-[#D4AF37] hover:border-[#D4AF37] text-obsidian font-archive text-xs font-bold uppercase py-3 transition-colors tracking-widest border-2 border-black"
              >
                JOIN THE INDEX
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
