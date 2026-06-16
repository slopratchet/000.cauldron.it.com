import React from 'react';
import { User, Users, Video, Copy } from 'lucide-react';

interface SocialFollowProps {
  playClack: () => void;
}

export function SocialFollow({ playClack }: SocialFollowProps) {
  const posts = [
    {
      id: 1,
      isTextLayout: true,
      title: 'Free League',
      content: (
        <div className="w-full h-full bg-[#1A1A1A] text-bone p-3 flex flex-col justify-between text-[8px] leading-tight select-none">
          <div className="space-y-1.5 text-left">
            <span className="font-mono text-[#D4AF37] block font-bold text-[7px] tracking-widest uppercase">
              CAMPAIGN SETTING
            </span>
            <p className="font-bold text-[#E4DFD3] text-[9px] mb-1 font-archive tracking-wider">
              A BRAND NEW ADVENTURE
            </p>
            <ul className="space-y-1 font-serif-body text-bone/70 list-disc list-inside">
              <li>A brand new campaign setting</li>
              <li>A standalone setting map</li>
              <li>Includes all digital stretchgoals</li>
              <li>Gives access to all addons</li>
            </ul>
          </div>

          <div className="my-1.5 border-t border-bone/10 py-1.5 text-left">
            <span className="font-mono text-[#D4AF37] block font-bold text-[6px] tracking-widest uppercase font-bold">
              FOR NEWCOMERS
            </span>
            <p className="font-serif-body text-bone/60 leading-normal">
              <span className="text-white font-bold">Core Rulebook $39.00</span>{' '}
              - Everything you need to get started with instant PDFs.
            </p>
          </div>

          <div className="border-t border-bone/10 pt-1.5 text-left">
            <span className="font-mono text-[#D4AF37] block font-bold text-[6px] tracking-widest uppercase font-bold">
              FOR COLLECTORS
            </span>
            <p className="font-serif-body text-bone/60 leading-normal">
              <span className="text-white font-bold">
                Anniversary Box $129.00
              </span>{' '}
              - Premium leatherette case & heavy metallic tokens.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      isCarousel: true,
      imgUrl: '/img/011.png',
      title: 'THE ONE RING',
      alt: 'Atmospheric dark gothic stone archway',
      caption:
        'Explore Middle-earth with the award-winning official tabletop RPG.',
      overlay: (
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 text-left group-hover:bg-black/45 transition-colors duration-300">
          <div className="border-l-2 border-bone/30 pl-2">
            <span className="font-mono text-[8px] tracking-widest text-[#D4AF37] uppercase font-bold">
              OFFICIAL RULEBOOK
            </span>
            <h4 className="font-archive text-[12px] text-white tracking-widest uppercase font-black leading-tight mt-0.5">
              THE ONE RING
            </h4>
            <p className="font-serif-body text-[9px] text-bone/85 mt-1 leading-snug">
              Hands of the White Wizard
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      isCarousel: true,
      imgUrl: '/img/006.png',
      title: 'BLADE RUNNER',
      alt: 'Neon glowing cyber city alley',
      caption: 'A neon-noir wonderland of detective story missions.',
      overlay: (
        <div className="absolute inset-0 bg-black/55 flex flex-col justify-end p-4 text-left group-hover:bg-black/40 transition-colors duration-300">
          <div className="border-l-2 border-cyan-500/50 pl-2">
            <span className="font-mono text-[8px] tracking-widest text-cyan-400 uppercase font-bold">
              NEON NOIR RPG
            </span>
            <h4 className="font-archive text-[12px] text-cyan-200 tracking-wider uppercase font-black leading-tight mt-0.5">
              BLADE RUNNER
            </h4>
            <p className="font-serif-body text-[9px] text-bone/85 mt-1 leading-snug">
              Replicant Rebellion Case
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      hasBadge: true,
      badgeText: 'KICKSTARTER',
      imgUrl: '/img/001.png',
      title: 'Symbaroum',
      alt: 'Mystic foggy dense pine forest',
      caption: 'Journey into the depths of Davokar.',
      overlay: (
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 text-left group-hover:bg-black/45 transition-colors duration-300">
          <div className="border-l-2 border-emerald-600/50 pl-2">
            <span className="font-mono text-[8px] tracking-widest text-emerald-400 uppercase font-bold">
              FANTASY WORLD
            </span>
            <h4 className="font-archive text-[12px] text-emerald-100 tracking-wider uppercase font-black leading-tight mt-0.5">
              SYMBAROUM
            </h4>
            <p className="font-serif-body text-[9px] text-bone/85 mt-1 leading-snug">
              The Dark Woods Chronicles
            </p>
          </div>
          {/* Kickstarter badge element exactly as shown */}
          <div className="absolute top-3 left-3 bg-emerald-600/90 text-[7px] text-white font-mono tracking-widest font-bold py-1 px-2 border border-emerald-400/30 rounded shadow uppercase">
            LIVE NOW
          </div>
        </div>
      ),
    },
    {
      id: 5,
      imgUrl: '/img/004.png',
      title: 'FRONTIER SCUM',
      alt: 'Sepia ink textured parchment',
      caption: 'The acid western masterpiece of bounty hunters and outlaws.',
      overlay: (
        <div className="absolute inset-0 bg-[#3d2712]/50 mix-blend-multiply flex flex-col justify-end p-4 text-left group-hover:bg-[#3d2712]/35 transition-all duration-300">
          <div className="border-l-2 border-[#D4AF37]/50 pl-2 bg-black/40 p-2 rounded">
            <span className="font-mono text-[8px] tracking-widest text-[#D4AF37] uppercase font-bold">
              ACID WESTERN
            </span>
            <h4 className="font-archive text-[12px] text-amber-100 tracking-wider uppercase font-black leading-tight mt-0.5">
              FRONTIER SCUM
            </h4>
            <p className="font-serif-body text-[9px] text-bone/90 mt-1 leading-snug">
              Wanted Outlaws and Heavy Metal
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      imgUrl: '/img/011.png',
      title: 'STORMBRINGER',
      alt: 'Heroic classic artwork illustration banner in green',
      caption: 'The Eternal Champion tabletop chronicle.',
      overlay: (
        <div className="absolute inset-0 bg-[#0e2c14]/55 flex flex-col justify-end p-4 text-left group-hover:bg-[#0e2c14]/40 transition-colors duration-300">
          <div className="border-l-2 border-lime-600/50 pl-2">
            <span className="font-mono text-[8px] tracking-widest text-lime-400 uppercase font-bold">
              LEGENDS SYSTEM
            </span>
            <h4 className="font-archive text-[12px] text-lime-100 tracking-wider uppercase font-black leading-tight mt-0.5">
              STORMBRINGER
            </h4>
            <p className="font-serif-body text-[9px] text-bone/85 mt-1 leading-snug">
              World of Loric Chronicles
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="social-follow"
      className="w-full bg-[#121212] py-10 border-t border-b border-bone/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title Group */}
        <div className="text-left mb-6">
          <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] font-bold uppercase block mb-1">
            SOCIAL MEDIA
          </span>
          <h2 className="font-archive text-3xl sm:text-4xl text-bone tracking-tight font-black leading-none uppercase">
            Follow us
          </h2>
        </div>

        {/* 6 Grid items designed horizontally (scrollable on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 select-none">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={playClack}
              className="relative aspect-square w-full bg-[#1A1A1A] border-2 border-bone/10 hover:border-[#D4AF37]/60 group cursor-pointer overflow-hidden transition-all duration-300 rounded shadow-md"
            >
              {post.isTextLayout ? (
                post.content
              ) : (
                <>
                  <img
                    referrerPolicy="no-referrer"
                    src={post.imgUrl}
                    alt={post.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-[0.8]"
                  />

                  {/* Real Instagram-style multi-image overlay indicator if true */}
                  {post.isCarousel && (
                    <div className="absolute top-3 right-3 text-white/70 bg-black/45 p-1 rounded-sm border border-white/5">
                      <Copy className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Gradient to darken bottom section under text */}
                  {post.overlay}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Social Icons Toolbar below */}
        <div className="flex gap-2.5 mt-6 justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            onClick={playClack}
            className="w-12 h-12 bg-[#222] border-2 border-bone/10 hover:border-[#D4AF37] hover:bg-black/30 flex items-center justify-center transition-all duration-200 text-bone rounded shadow"
            title="Instagram"
          >
            <User className="w-5 h-5 text-[#E4DFD3]/85 hover:text-white transition-colors" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            onClick={playClack}
            className="w-12 h-12 bg-[#222] border-2 border-bone/10 hover:border-[#D4AF37] hover:bg-black/30 flex items-center justify-center transition-all duration-200 text-bone rounded shadow"
            title="Facebook"
          >
            <Users className="w-5 h-5 text-[#E4DFD3]/85 hover:text-white transition-colors" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            onClick={playClack}
            className="w-12 h-12 bg-[#222] border-2 border-bone/10 hover:border-[#D4AF37] hover:bg-black/30 flex items-center justify-center transition-all duration-200 text-bone rounded shadow"
            title="Youtube"
          >
            <Video className="w-5 h-5 text-[#E4DFD3]/85 hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
