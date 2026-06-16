import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  playClack: () => void;
  cartCount: number;
  currentHash: string;
  onClearCart: () => void;
  sectionsVisibility?: Record<string, boolean>;
}

export function Header({
  playClack,
  cartCount,
  currentHash,
  onClearCart,
  sectionsVisibility,
}: HeaderProps) {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#050505] border-b-2 border-[#E4DFD3]/30 flex flex-col shadow-md">
      {/* Main Mainstream Camp Candor Header Header */}
      <div className="bg-[#E4DFD3] text-obsidian px-4 md:px-8 py-3.5 flex justify-between items-center relative gap-4">
        {/* Logo and Brand */}
        <a
          href="#home"
          onClick={playClack}
          className="flex items-center gap-2 md:gap-3 group shrink-0"
        >
          {/* Detailed mandala / spiral vector logo matching the Free League symbol from the images */}
          <div className="relative w-8 h-8 md:w-9 md:h-9 bg-obsidian text-bone rounded-full flex items-center justify-center p-1.5 group-hover:bg-[#D32F2F] transition-colors shadow">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full fill-none stroke-current"
              strokeWidth="6"
              strokeLinecap="round"
            >
              <circle cx="50" cy="50" r="42" />
              <circle cx="50" cy="50" r="28" strokeDasharray="10 10" />
              <path d="M50 8 C50 8, 25 35, 50 50 C75 35, 50 8, 50 8 Z" />
              <path
                d="M50 92 C50 92, 25 65, 50 50 C75 65, 50 92, 50 92 Z"
                strokeWidth="5"
              />
              <path
                d="M8 50 C8 50, 35 25, 50 50 C35 75, 8 50, 8 50 Z"
                strokeWidth="5"
              />
              <path
                d="M92 50 C92 50, 65 25, 50 50 C65 75, 92 50, 92 50 Z"
                strokeWidth="5"
              />
            </svg>
          </div>
          <div className="flex flex-col max-w-[200px] sm:max-w-xs text-left">
            <span className="font-archive text-lg md:text-xl tracking-[0.05em] text-obsidian leading-none">
              CAMP CANDOR
            </span>
            <span className="font-mono-ui text-[7px] leading-[1.2] text-obsidian/75 mt-0.5 uppercase tracking-normal">
              Massive Multi-Player Online Role Playing Gaming Inspirational
              Technology
            </span>
          </div>
        </a>

        {/* Main Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 font-mono-ui text-[11px] xl:text-[12px] uppercase tracking-wider font-bold">
          {sectionsVisibility?.showHourOfTheAlligatorDetail !== false && (
            <a
              href="#horror-on-the-hour-of-the-alligator"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#horror-on-the-hour-of-the-alligator' ? 'bg-[#8a1c14] text-[#E4DFD3]' : 'hover:bg-black/10 text-obsidian'}`}
            >
              HOUR OF THE ALLIGATOR
            </a>
          )}
          {sectionsVisibility?.showExploreWorlds !== false &&
            sectionsVisibility?.showPrimalCoreSystemDetail !== false && (
              <a
                href="#our-games"
                onClick={() => {
                  playClack();
                  setShowMobileMenu(false);
                }}
                className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#our-games' ? 'bg-obsidian text-bone' : 'hover:bg-black/10 text-obsidian'}`}
              >
                PRIMAL MAMA
              </a>
            )}
          {sectionsVisibility?.showFeaturedShop !== false && (
            <a
              href="#shop"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#shop' ? 'bg-obsidian text-bone' : 'hover:bg-black/10 text-obsidian'}`}
            >
              SHOP
            </a>
          )}
          {sectionsVisibility?.showNewsDispatches !== false && (
            <a
              href="#news"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#news' ? 'bg-obsidian text-bone' : 'hover:bg-black/10 text-obsidian'}`}
            >
              NEWS
            </a>
          )}
          {sectionsVisibility?.showAtTheTable !== false && (
            <a
              href="#at-the-table"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#at-the-table' ? 'bg-obsidian text-bone' : 'hover:bg-black/10 text-obsidian'}`}
            >
              AT THE TABLE
            </a>
          )}
          {sectionsVisibility?.showOnlinePlaySection !== false && (
            <a
              href="#online-roleplaying"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#online-roleplaying' ? 'bg-obsidian text-bone' : 'hover:bg-black/10 text-obsidian'}`}
            >
              ONLINE ROLEPLAYING
            </a>
          )}
          {sectionsVisibility?.showPlaySolo !== false && (
            <a
              href="#play-solo"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#play-solo' ? 'bg-obsidian text-bone' : 'hover:bg-black/10 text-obsidian'}`}
            >
              PLAY SOLO
            </a>
          )}
          {sectionsVisibility?.showUpcomingEvents !== false && (
            <a
              href="#events"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#events' ? 'bg-obsidian text-bone' : 'hover:bg-black/10 text-obsidian'}`}
            >
              EVENTS
            </a>
          )}
          {sectionsVisibility?.showCommunityCards !== false && (
            <a
              href="#community"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#community' ? 'bg-obsidian text-bone' : 'hover:bg-black/10 text-obsidian'}`}
            >
              COMMUNITY
            </a>
          )}
          {sectionsVisibility?.showAboutCampCandor !== false && (
            <a
              href="#about"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className={`px-2.5 py-1.5 rounded transition-all duration-150 ${currentHash === '#about' ? 'bg-obsidian text-bone' : 'hover:bg-black/10 text-obsidian'}`}
            >
              ABOUT
            </a>
          )}
        </nav>

        {/* Action Widgets Zone: Cart and Mobile Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 font-mono-ui text-xs font-bold">
          {/* Cart Widget */}
          {sectionsVisibility?.showFeaturedShop !== false && (
            <div className="relative">
              <button
                onClick={() => {
                  playClack();
                  setShowCartDropdown(!showCartDropdown);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 border border-obsidian/30 bg-white/70 hover:bg-white text-obsidian shadow-sm transition-colors"
                title="View Cart"
              >
                <ShoppingCart className="w-4 h-4 text-obsidian" />
                <span className="hidden lg:inline">CART</span>
                <span className="bg-obsidian text-bone text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5">
                  {cartCount}
                </span>
              </button>

              {/* Simulated Cart Dropdown */}
              {showCartDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white border-2 border-obsidian p-4 shadow-xl text-obsidian z-50">
                  <div className="border-b-2 border-obsidian pb-2 mb-3 flex justify-between items-center">
                    <span className="font-archive uppercase text-base tracking-wider">
                      YOUR CRATE
                    </span>
                    <button
                      onClick={() => setShowCartDropdown(false)}
                      className="text-obsidian/60 hover:text-obsidian"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {cartCount === 0 ? (
                    <p className="text-center text-xs text-obsidian/50 py-4 font-normal">
                      Your crate is currently empty. Add RPG Core Rulebooks from
                      our Worlds Compendium!
                    </p>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center text-xs py-2 border-b border-gray-100">
                        <span>Simulated RPG Order Bundle</span>
                        <span className="font-bold">{cartCount}x Items</span>
                      </div>
                      <div className="pt-3 flex flex-col gap-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span>Total Est:</span>
                          <span>${(cartCount * 39).toFixed(2)} USD</span>
                        </div>
                        <button
                          onClick={() => {
                            playClack();
                            onClearCart();
                            setShowCartDropdown(false);
                            alert(
                              'Checkout Simulated! Thank you for supporting Camp Candor tabletop gaming.',
                            );
                          }}
                          className="w-full bg-[#D32F2F] text-bone py-2 font-archive text-xs uppercase tracking-widest hover:bg-obsidian transition-colors text-center border-2 border-black"
                        >
                          SIMULATE PURCHASING
                        </button>
                        <button
                          onClick={() => {
                            playClack();
                            onClearCart();
                          }}
                          className="text-[10px] text-center text-obsidian/60 hover:text-[#D32F2F] underline uppercase"
                        >
                          Empty Crate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Mobile Main Menu Button */}
          <button
            className="lg:hidden p-2.5 bg-obsidian text-bone rounded border border-obsidian hover:bg-[#D32F2F] hover:border-[#D32F2F] transition-colors"
            onClick={() => {
              playClack();
              setShowMobileMenu(!showMobileMenu);
            }}
            aria-label="Toggle Navigation Menu"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {showMobileMenu && (
        <div className="lg:hidden bg-[#E4DFD3] border-t-2 border-obsidian text-obsidian py-6 px-8 flex flex-col gap-1.5 font-archive font-bold text-lg tracking-wider uppercase shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          {sectionsVisibility?.showHourOfTheAlligatorDetail !== false && (
            <a
              href="#horror-on-the-hour-of-the-alligator"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className="py-3 border-b-2 border-obsidian/10 hover:text-[#8a1c14] hover:pl-2 transition-all duration-150 flex items-center justify-between"
            >
              <span>HOUR OF THE ALLIGATOR</span>
              <span className="text-xs opacity-50 text-[#8a1c14]">➔</span>
            </a>
          )}
          {sectionsVisibility?.showExploreWorlds !== false &&
            sectionsVisibility?.showPrimalCoreSystemDetail !== false && (
              <a
                href="#our-games"
                onClick={() => {
                  playClack();
                  setShowMobileMenu(false);
                }}
                className="py-3 border-b-2 border-obsidian/10 hover:text-[#D32F2F] hover:pl-2 transition-all duration-150 flex items-center justify-between"
              >
                <span>PRIMAL MAMA</span>
                <span className="text-xs opacity-50">➔</span>
              </a>
            )}
          {sectionsVisibility?.showFeaturedShop !== false && (
            <a
              href="#shop"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className="py-3 border-b-2 border-obsidian/10 hover:text-[#D32F2F] hover:pl-2 transition-all duration-150 flex items-center justify-between"
            >
              <span>SHOP</span>
              <span className="text-xs opacity-50">➔</span>
            </a>
          )}
          {sectionsVisibility?.showNewsDispatches !== false && (
            <a
              href="#news"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className="py-3 border-b-2 border-obsidian/10 hover:text-[#D32F2F] hover:pl-2 transition-all duration-150 flex items-center justify-between"
            >
              <span>NEWS</span>
              <span className="text-xs opacity-50">➔</span>
            </a>
          )}
          {sectionsVisibility?.showAtTheTable !== false && (
            <a
              href="#at-the-table"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className="py-3 border-b-2 border-obsidian/10 hover:text-[#D32F2F] hover:pl-2 transition-all duration-150 flex items-center justify-between"
            >
              <span>AT THE TABLE</span>
              <span className="text-xs opacity-50">➔</span>
            </a>
          )}
          {sectionsVisibility?.showOnlinePlaySection !== false && (
            <a
              href="#online-roleplaying"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className="py-3 border-b-2 border-obsidian/10 hover:text-[#D32F2F] hover:pl-2 transition-all duration-150 flex items-center justify-between"
            >
              <span>ONLINE ROLEPLAYING</span>
              <span className="text-xs opacity-50">➔</span>
            </a>
          )}
          {sectionsVisibility?.showPlaySolo !== false && (
            <a
              href="#play-solo"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className="py-3 border-b-2 border-obsidian/10 hover:text-[#D32F2F] hover:pl-2 transition-all duration-150 flex items-center justify-between"
            >
              <span>PLAY SOLO</span>
              <span className="text-xs opacity-50">➔</span>
            </a>
          )}
          {sectionsVisibility?.showUpcomingEvents !== false && (
            <a
              href="#events"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className="py-3 border-b-2 border-obsidian/10 hover:text-[#D32F2F] hover:pl-2 transition-all duration-150 flex items-center justify-between"
            >
              <span>EVENTS</span>
              <span className="text-xs opacity-50">➔</span>
            </a>
          )}
          {sectionsVisibility?.showCommunityCards !== false && (
            <a
              href="#community"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className="py-3 border-b-2 border-obsidian/10 hover:text-[#D32F2F] hover:pl-2 transition-all duration-150 flex items-center justify-between"
            >
              <span>COMMUNITY</span>
              <span className="text-xs opacity-50">➔</span>
            </a>
          )}
          {sectionsVisibility?.showAboutCampCandor !== false && (
            <a
              href="#about"
              onClick={() => {
                playClack();
                setShowMobileMenu(false);
              }}
              className="py-3 border-b-2 border-obsidian/10 hover:text-[#D32F2F] hover:pl-2 transition-all duration-150 flex items-center justify-between"
            >
              <span>ABOUT</span>
              <span className="text-xs opacity-50">➔</span>
            </a>
          )}
        </div>
      )}

      {/* 30px Stretchy Fullwidth Accent Banner */}
      <div className="h-[30px] w-full relative overflow-hidden shrink-0 border-t border-[#E4DFD3]/20">
        <img
          referrerPolicy="no-referrer"
          src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          className="w-full h-full object-cover select-none scale-y-110 saturate-[1.1] brightness-[0.85]"
          alt="Camp Candor Under-Navbar Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050505]/15 to-transparent pointer-events-none"></div>
      </div>
    </header>
  );
}
