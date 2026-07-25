import React, { useState } from 'react';
import {
  X,
  Heart,
  Settings,
  BadgeCheck,
  Compass,
  Calendar,
  User,
  ChevronRight,
  ArrowLeft,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Watch, BlogPostAnnouncement } from '../types';
import { getMasterDb } from '../dbStore';

interface DiscoverModalProps {
  watch: Watch | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onOpenConfigurator: () => void;
  onOpenFigure: (watch: Watch) => void;
}

const DEFAULT_ANNOUNCEMENTS: Record<string, BlogPostAnnouncement[]> = {
  'primal-mama': [
    {
      id: 'post-1',
      title:
        'ANNOUNCEMENT: All-American Alligator Delivery System Chrono-Engine Firmware v4.2 Released',
      date: 'JULY 21, 2026',
      category: 'PATCH NOTES',
      author: 'CHIEF CHRONO-ENGINEER',
      summary:
        'Optimized debuff tracking and Boss Cooldown registers for Mythic Dungeon raids. Saronite alloy heat dissipation improved by 14%.',
      content: `All operators equipping the All-American Alligator Delivery System of Primal Mama model are advised to perform a firmware re-sync prior to entering high-tier raid zones.

Key Operational Updates:
• Enhanced debuff clock accuracy under extreme metabolic stress and high-tier damage soak operations.
• Calibrated void-core light absorption for zero glare under heavy spell particle blasts.
• Saronite alloy thermal dissipation efficiency increased by 14% across sustained mythic encounters.
• Added high-priority alert tones for critical cooldown expirations.`,
      pinned: true,
    },
    {
      id: 'post-2',
      title:
        'FIELD REPORT: Saronite Forging Facility Online in Kingdom of Manor',
      date: 'JULY 14, 2026',
      category: 'FIELD REPORT',
      author: 'CAMP CANDOR LOGISTICS',
      summary:
        'Grade 904L Saronite Alloy production reached target yield. Next batch of All-American Alligator Delivery System units ready for guild dispatch.',
      content: `Camp Candor Systems has successfully calibrated the primary arc furnace in Manor. All newly manufactured chassis feature satin-brushed finish with reinforced bezel housing and Titansteel bracers.

Supply & Allocation Status:
• Priority allocation granted to Guild Raid Leaders and frontline beastmasters.
• Inspection certificates issued by the High-Fidelity Manual division for all serialized units.
• Full attunement verification available via live diagnostic console.`,
    },
    {
      id: 'post-3',
      title: 'COMMUNITY DIRECTIVE: Debuff Tracking Optimization Guide',
      date: 'JUNE 28, 2026',
      category: 'DEV LOG',
      author: 'RAID TACTICAL DIVISION',
      summary:
        'Best practices for utilizing the All-American Alligator Delivery System high-legibility dial during high-stress raid encounters.',
      content: `Ensure your dial illumination level is set to maximum luminescence when engaging mythic bosses with rapid phase transitions.

Tactical Checklist:
1. Verify void-core black dial brightness setting in low-light dungeon sectors.
2. Confirm Titansteel bracer latch engagement prior to engaging boss encounters.
3. Utilize mechanical ring clicks for rapid manual phase timing offsets.`,
    },
  ],
  'toot-and-scute-unusual-simulation-service': [
    {
      id: 'post-1',
      title: 'ANNOUNCEMENT: Arcanite-Melt Chronometer Recalibration Active',
      date: 'JULY 21, 2026',
      category: 'ANNOUNCEMENT',
      author: 'GUILD MASTER COMMAND',
      summary:
        'Dual enchanted calendar mechanics have been tuned for instant cooldown resets during speedrun trials.',
      content: `The 18ct Arcanite-Melt legendary chronometer now synchronizes directly with global server clock ticks, eliminating drift during intense dungeon runs.

Highlights:
• Synchronous alignment with weekly server lockouts down to 1/1000th of a second.
• Fluted soundwave resonance bezel tuned for audible audio cues at key cooldown intervals.
• Expanded spell power buffer for sustained guild leadership broadcasts.`,
      pinned: true,
    },
    {
      id: 'post-2',
      title: 'PATCH NOTES: Vellum Parchment Dial UV Stabilization',
      date: 'JULY 08, 2026',
      category: 'PATCH NOTES',
      author: 'SLOPRATCHET SERVICE TECH',
      summary:
        'Applied protective seal to prevent parchment fading under high-intensity spell particle effects.',
      content: `Vellum dials manufactured after July 1st feature anti-reflective arc coating ensuring maximum readability under all environmental conditions.`,
    },
    {
      id: 'post-3',
      title: 'DEV LOG: Guild Master Cooldown Registry Overview',
      date: 'JUNE 22, 2026',
      category: 'DEV LOG',
      author: 'ALCHEMICAL FOUNDRY LABS',
      summary:
        'A deep dive into how Arcanite gold melt enhances spell power retention across multi-hour raids.',
      content: `Our metallurgical tests confirm that the high-density Arcanite core prevents temporal flux, providing stable performance across extended guild campaigns.`,
    },
  ],
  'perfect-beeing': [
    {
      id: 'post-1',
      title: 'DEV LOG: Titan Algorithm Month Reset Protocol Synchronized',
      date: 'JULY 19, 2026',
      category: 'DEV LOG',
      author: 'TITAN CODEWRITER',
      summary:
        'Calibre 9002 complex cooldown engine now supports multi-dimensional zone tracking.',
      content: `Speedrun codes updated for all major raid portals. Ring command codes allow seamless rotation between stat registers.

Technical Breakdown:
• Off-center 24-hour ring calibrated for dual-timezone realm tracking.
• Saros chronological algorithm updated for automatic month and dungeon lockout calculations across 12 discrete interface indicator sockets.
• Elastomer soul-strap durability verified across 10,000 continuous hours of speedrun stress tests.`,
      pinned: true,
    },
    {
      id: 'post-2',
      title: 'FIELD REPORT: Celestial Speedrun Record Broken',
      date: 'JULY 02, 2026',
      category: 'FIELD REPORT',
      author: 'SPEEDRUN OVERSEER',
      summary:
        'Operator set a new realm record utilizing the PRFCTBE3NG 24-hour portal timer system.',
      content: `The precision of Calibre 9002 was verified against global server logs with zero millisecond variance across a 12-hour raid stretch.`,
    },
  ],
  'blessed-and-the-bounded': [
    {
      id: 'post-1',
      title: 'COMMUNITY ALERT: Bio-Mechanical Synthesizer Maintenance',
      date: 'JULY 18, 2026',
      category: 'ANNOUNCEMENT',
      author: 'BIO-SYNTH LABS',
      summary: 'Scheduled tuning for Calibre 4000 metabolic metrics registers.',
      content: `Dual speedy raid sweeps timers undergo routine alignment. Operators may experience temporary diagnostic readouts during maintenance window.

Maintenance Notes:
• All Calibre 4000 registers will auto-calibrate upon next dungeon entrance.
• Metabolic pulse monitors updated for higher accuracy during berserk boss phases.`,
      pinned: true,
    },
    {
      id: 'post-2',
      title: 'PATCH NOTES: Metabolic Cooldown Limit Raised',
      date: 'JULY 05, 2026',
      category: 'PATCH NOTES',
      author: 'CAMP CANDOR SYSTEMS',
      summary: 'Maximum power limits expanded for high-intensity raid sweeps.',
      content: `The carbon-infused obsidian chassis now supports sustained thermal loads up to 1200°C without loss of chronometric precision.`,
    },
  ],
};

export default function DiscoverModal({
  watch,
  isOpen,
  onClose,
  isFavorited,
  onToggleFavorite,
  onOpenConfigurator,
}: DiscoverModalProps) {
  if (!isOpen || !watch) return null;

  const db = getMasterDb();
  const [activeTab, setActiveTab] = useState<'manual' | 'specifications'>(
    'manual',
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPost, setSelectedPost] = useState<BlogPostAnnouncement | null>(
    null,
  );

  // Retrieve announcements for current watch
  const announcementsList: BlogPostAnnouncement[] = watch.announcements ||
    DEFAULT_ANNOUNCEMENTS[watch.id] || [
      {
        id: 'gen-1',
        title: `UPDATE: ${watch.name} Chrono-Engine Calibration`,
        date: 'JULY 21, 2026',
        category: 'PATCH NOTES',
        author: 'CAMP CANDOR COMMAND',
        summary: `${watch.name} has received performance calibration patches for optimized raid encounters.`,
        content: `System updates for ${watch.name} (${watch.ref}) have been successfully applied across all global servers.\n\nTagline: "${watch.tagline}"\n\nAll operators may verify their chassis attunement in the database console.`,
        pinned: true,
      },
      {
        id: 'gen-2',
        title: `FIELD DISPATCH: ${watch.name} Operational Logs`,
        date: 'JULY 10, 2026',
        category: 'FIELD REPORT',
        author: 'RAID TACTICAL DIVISION',
        summary: `Field reports confirm high reliability of ${watch.name} under extreme dungeon stress.`,
        content: `Operational logs indicate zero variance during high-stamina encounters. Attunement certificates remain fully valid.`,
      },
    ];

  const categories = [
    'ALL',
    'PATCH NOTES',
    'ANNOUNCEMENT',
    'FIELD REPORT',
    'DEV LOG',
  ];

  const filteredAnnouncements =
    selectedCategory === 'ALL'
      ? announcementsList
      : announcementsList.filter((item) => item.category === selectedCategory);

  return (
    <AnimatePresence>
      {isOpen && watch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            }}
            className="relative w-full max-w-2xl bg-surface border-4 border-primary shadow-2xl overflow-hidden flex flex-col font-label z-10"
          >
            {/* Tab Controls with Integrated Close Button */}
            <div className="flex border-b-4 border-primary bg-surface-container-low select-none font-mono text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => {
                  setActiveTab('manual');
                  setSelectedPost(null);
                }}
                className={`flex-1 py-4 text-center border-r-4 border-primary transition-all duration-300 ease-out cursor-pointer ${
                  activeTab === 'manual'
                    ? 'bg-primary text-surface'
                    : 'bg-surface text-primary hover:bg-[#8a752b] hover:text-white'
                }`}
              >
                [01] SYSTEM REFERENCE
              </button>
              <button
                onClick={() => {
                  setActiveTab('specifications');
                  setSelectedPost(null);
                }}
                className={`flex-1 py-4 text-center border-r-4 border-primary transition-all duration-300 ease-out cursor-pointer ${
                  activeTab === 'specifications'
                    ? 'bg-primary text-surface'
                    : 'bg-surface text-primary hover:bg-[#8a752b] hover:text-white'
                }`}
              >
                [02] DISPATCH DIRECTORY
              </button>
              <button
                onClick={onClose}
                className="px-6 flex items-center justify-center bg-surface text-primary hover:bg-[#8a752b] hover:text-white transition-all duration-300 ease-out cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Panel */}
            <AnimatePresence mode="wait">
              {activeTab === 'manual' ? (
                /* Tab 1: Field Manual Operations */
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 md:p-8 flex flex-col max-h-[calc(90vh-60px)] overflow-y-auto"
                >
                  {/* Actions */}
                  {(() => {
                    const dbData = getMasterDb();
                    const meta = dbData?.meta;
                    const cfgLabel =
                      meta?.btnConfigureCampaignLabel || 'CONFIGURE CAMPAIGN';
                    const expLabel =
                      meta?.btnExploreSettingLabel || 'EXPLORE SETTING';
                    const obsLabel = isFavorited
                      ? meta?.btnObserveMovementActiveLabel ||
                        '[OBSERVED MOVEMENT]'
                      : meta?.btnObserveMovementLabel || '[Observe Movement]';

                    return (
                      <div className="flex flex-col gap-3 mb-8">
                        <button
                          onClick={() => {
                            const targetUrl =
                              watch.saveUrl || 'https://www.google.com';

                            // If it's our internal redirect, use the same window
                            if (targetUrl.startsWith('/')) {
                              window.location.href = targetUrl;
                            } else {
                              window.open(targetUrl, '_blank');
                            }
                            if (onToggleFavorite) onToggleFavorite();
                          }}
                          className={`w-full flex items-center justify-center space-x-2 py-3 px-6 uppercase text-sm font-bold tracking-widest border-2 transition-all duration-300 ease-out cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                            isFavorited
                              ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                              : 'bg-surface text-primary border-primary hover:bg-[#8a752b] hover:text-white hover:border-[#8a752b]'
                          }`}
                        >
                          <Heart
                            size={16}
                            fill={isFavorited ? 'currentColor' : 'none'}
                          />
                          <span>{obsLabel}</span>
                        </button>

                        <button
                          onClick={() => {
                            const targetUrl =
                              watch.configureCampaignUrl ||
                              'https://www.google.com';
                            window.open(targetUrl, '_blank');
                          }}
                          className="w-full flex items-center justify-center space-x-2 bg-surface text-primary py-3 uppercase text-sm font-bold tracking-widest border-2 border-primary hover:bg-[#8a752b] hover:text-white hover:border-[#8a752b] transition-all duration-300 ease-out cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
                        >
                          <Settings size={16} />
                          <span>{cfgLabel}</span>
                        </button>

                        <button
                          onClick={() => {
                            const targetUrl =
                              watch.exploreSettingUrl ||
                              watch.exploreSettingsUrl ||
                              'https://www.google.com';
                            window.open(targetUrl, '_blank');
                          }}
                          className="w-full flex items-center justify-center space-x-2 bg-surface text-primary py-3 uppercase text-sm font-bold tracking-widest border-2 border-primary hover:bg-[#8a752b] hover:text-white hover:border-[#8a752b] transition-all duration-300 ease-out cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
                        >
                          <Compass size={16} />
                          <span>{expLabel}</span>
                        </button>
                      </div>
                    );
                  })()}

                  <h2 className="font-headline text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter leading-none mb-4">
                    {watch.name}
                  </h2>

                  <p className="font-body text-base md:text-lg text-on-surface-variant italic mb-6 border-l-2 border-primary/50 pl-3 leading-relaxed">
                    "{watch.tagline}"
                  </p>

                  {/* Section: Manual Notes */}
                  <div className="space-y-4 flex-grow mb-6">
                    <div className="font-mono text-[10px] uppercase text-on-surface-variant/70 border-b border-primary/20 pb-1">
                      {db.meta.modalFieldManualHeader}
                    </div>
                    {watch.details.map((detail, index) => (
                      <p
                        key={index}
                        className="font-body text-sm text-on-surface-variant leading-relaxed"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>

                  {/* Security Verification Indicator */}
                  <div className="bg-surface-container-low border border-primary/20 p-3 flex items-center space-x-3">
                    <BadgeCheck className="text-primary shrink-0" size={20} />
                    <div className="font-mono text-[10px] text-on-surface-variant leading-tight">
                      <span className="font-bold text-primary block">
                        {db.meta.modalAuthenticStatusHeader}
                      </span>
                      {db.meta.modalAuthenticStatusText}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Tab 2: Blog Post Announcements Listing */
                <motion.div
                  key="updates"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col bg-surface-container-low max-h-[calc(90vh-60px)] overflow-y-auto"
                >
                  <AnimatePresence mode="wait">
                    {selectedPost ? (
                      /* Expanded Full Post View */
                      <motion.div
                        key={`post-${selectedPost.id}`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="p-6 md:p-8 flex flex-col space-y-6"
                      >
                        <button
                          onClick={() => setSelectedPost(null)}
                          className="self-start inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-primary border border-primary/30 px-3 py-1.5 hover:bg-[#8a752b] hover:text-white hover:border-[#8a752b] transition-colors duration-300 ease-out cursor-pointer"
                        >
                          <ArrowLeft size={14} />
                          <span>BACK TO ALL ANNOUNCEMENTS</span>
                        </button>

                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="bg-[#8a752b] text-white px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold tracking-widest border border-black">
                              {selectedPost.category}
                            </span>
                            <span className="font-mono text-xs text-on-surface-variant/70">
                              {selectedPost.date}
                            </span>
                            <span className="font-mono text-xs text-on-surface-variant/70">
                              • BY {selectedPost.author}
                            </span>
                          </div>

                          <h2 className="font-headline text-2xl md:text-3xl font-black text-primary uppercase tracking-tight mb-4 leading-tight">
                            {selectedPost.title}
                          </h2>

                          <div className="bg-surface border-2 border-primary/20 p-4 mb-6 font-mono text-xs text-primary/90 italic">
                            {selectedPost.summary}
                          </div>

                          <div className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed whitespace-pre-line space-y-4">
                            {selectedPost.content}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-primary/20 flex items-center justify-between font-mono text-[10px] text-on-surface-variant/70">
                          <span>
                            ITEM REF: {watch.ref} // {watch.id.toUpperCase()}
                          </span>
                          <span>CAMP CANDOR ANNOUNCEMENT NETWORK</span>
                        </div>
                      </motion.div>
                    ) : (
                      /* Announcements List View */
                      <motion.div
                        key="post-list"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="p-6 md:p-8 flex flex-col space-y-6"
                      >
                        {/* Filter Categories */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-primary/20 pb-4">
                          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                            <Filter
                              size={14}
                              className="text-primary/60 shrink-0 mr-1"
                            />
                            {categories.map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`font-mono text-[11px] uppercase font-bold px-3 py-1.5 transition-all duration-300 ease-out shrink-0 cursor-pointer border ${
                                  selectedCategory === cat
                                    ? 'bg-primary text-surface border-primary'
                                    : 'bg-surface text-primary/80 border-primary/20 hover:border-primary hover:text-primary'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>

                          <span className="bg-primary/10 text-primary border border-primary/30 font-mono text-[11px] px-2.5 py-1 font-bold shrink-0">
                            {filteredAnnouncements.length}{' '}
                            {filteredAnnouncements.length === 1
                              ? 'POST'
                              : 'POSTS'}
                          </span>
                        </div>

                        {/* Feed List */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`feed-${selectedCategory}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="space-y-4"
                          >
                            {filteredAnnouncements.length === 0 ? (
                              <div className="p-8 text-center bg-surface border border-dashed border-primary/30 font-mono text-xs text-on-surface-variant">
                                NO ANNOUNCEMENTS LOGGED UNDER CATEGORY "
                                {selectedCategory}".
                              </div>
                            ) : (
                              filteredAnnouncements.map((post) => (
                                <div
                                  key={post.id}
                                  onClick={() => setSelectedPost(post)}
                                  className="group bg-surface border-2 border-primary/20 hover:border-primary p-5 transition-all duration-300 ease-out cursor-pointer shadow-sm hover:shadow-md relative overflow-hidden"
                                >
                                  {post.pinned && (
                                    <div className="absolute top-0 right-0 bg-[#8a752b] text-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider border-l border-b border-black">
                                      PINNED DISPATCH
                                    </div>
                                  )}

                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider">
                                      {post.category}
                                    </span>
                                    <span className="font-mono text-[11px] text-on-surface-variant/70 flex items-center gap-1">
                                      <Calendar size={12} />
                                      {post.date}
                                    </span>
                                    <span className="font-mono text-[11px] text-on-surface-variant/70 flex items-center gap-1">
                                      <User size={12} />
                                      {post.author}
                                    </span>
                                  </div>

                                  <h4 className="font-headline text-lg font-bold text-primary group-hover:text-primary uppercase tracking-tight mb-2 leading-snug">
                                    {post.title}
                                  </h4>

                                  <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                                    {post.summary}
                                  </p>

                                  <div className="flex items-center text-xs font-mono font-bold text-primary uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300 ease-out">
                                    <span>READ FULL ANNOUNCEMENT</span>
                                    <ChevronRight
                                      size={14}
                                      className="ml-1 text-[#8a752b]"
                                    />
                                  </div>
                                </div>
                              ))
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Footer Readout */}
                        <div className="pt-4 border-t border-primary/20 flex justify-between font-mono text-[9px] text-on-surface-variant/70">
                          <span>
                            DISPATCH SYSTEM: {watch.id.toUpperCase()}_LOGS
                          </span>
                          <span>{db.meta.modalChecksumText}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
