import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dices,
  BookOpen,
  MessageSquare,
  Monitor,
  Users,
  User,
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  Volume2,
  ShieldCheck,
  HeartPulse,
  Send,
  CheckCircle2,
  ShoppingBag,
  ExternalLink,
  Gamepad2,
  Info,
  X,
} from 'lucide-react';
import type {
  GameWorld,
  CharacterSeat,
  StreamComment,
  CommunityForumPost,
} from '../types';
import { News } from '../components/News';
import { AtTheTable } from '../components/AtTheTable';
import { OnlineRoleplaying } from '../components/OnlineRoleplaying';
import { PlaySolo } from '../components/PlaySolo';
import { Events } from '../components/Events';
import { About } from '../components/About';
import { BladeRunnerSciFiCorridors } from '../components/BladeRunnerSciFiCorridors';
import { GothicCryptsHorror } from '../components/GothicCryptsHorror';
import { PrimalMamaCoreSystem } from '../components/PrimalMamaCoreSystem';
import { HorrorOnTheHourOfTheAlligator } from '../components/HorrorOnTheHourOfTheAlligator';

export interface HomeProps {
  playClack: () => void;
  cartCount: number;
  onAddToCart: () => void;
  bookedSeats: string[];
  onBookSeat: (role: string) => void;
  currentHash: string;
}

import { DEFAULT_SCHEMA } from '../defaultSchema';
export { DEFAULT_SCHEMA };

export function Home({
  playClack,
  cartCount,
  onAddToCart,
  bookedSeats,
  onBookSeat,
  currentHash,
}: HomeProps) {
  // Map dynamic bindings cleanly to preserve down-stream compatibility beautifully
  const gameWorlds = DEFAULT_SCHEMA.gameWorlds;
  const products = DEFAULT_SCHEMA.shopBlock.products;
  const originalSeats = DEFAULT_SCHEMA.repertoireSeats;

  // Navigation & filtering state
  const [activeTab, setActiveTab] = useState<'worlds' | 'terminal'>('worlds');
  const [worldFilter, setWorldFilter] = useState<
    'all' | 'sci-fi' | 'fantasy' | 'horror'
  >('all');

  // Relink currentHash to active Tab or Section scrolling
  useEffect(() => {
    if (currentHash === '#system') {
      setActiveTab('terminal');
    } else {
      setActiveTab('worlds');

      // Automatic smooth scroll to elements
      const targetId = currentHash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [currentHash]);

  // World lore modal state
  const [selectedWorld, setSelectedWorld] = useState<GameWorld | null>(null);

  // RPG Starter wizard state
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [charName, setCharName] = useState('');
  const [charClass, setCharClass] = useState('Mecha Marshal');
  const [charStats, setCharStats] = useState({
    strength: 10,
    agility: 10,
    willpower: 10,
    intelligence: 10,
  });
  const [isRolling, setIsRolling] = useState(false);
  const [wizardCompleted, setWizardCompleted] = useState(false);

  // Streaming player state
  const [activeStream, setActiveStream] = useState<'lotr' | 'bladerunner'>(
    'lotr',
  );
  const [isStreamPlaying, setIsStreamPlaying] = useState(true);
  const [streamComments, setStreamComments] = useState<StreamComment[]>([
    {
      id: '1',
      author: 'Hobbit_Slayer',
      text: 'Elijah Wood playing Lord of the Rings 5e is epic! 🤯',
      avatarColor: 'bg-green-600',
      role: 'Viewer',
    },
    {
      id: '2',
      author: 'BladeRunner_XYZ',
      text: 'The Atmosphere on the replicant desk is tense',
      avatarColor: 'bg-[#D32F2F]',
      role: 'Moderator',
    },
    {
      id: '3',
      author: 'DiceMage99',
      text: 'Just rolled a Nat 20 on perception at the table!',
      avatarColor: 'bg-amber-500',
      rolledPoints: 20,
    },
  ]);
  const [newCommentInput, setNewCommentInput] = useState('');

  // Forums Sandbox state
  const [forumPosts, setForumPosts] = useState<CommunityForumPost[]>(
    () =>
      DEFAULT_SCHEMA.communityBlock?.posts ||
      DEFAULT_SCHEMA.communityBlock.posts,
  );
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('PRIMAL MAMA');
  const [newPostSnippet, setNewPostSnippet] = useState('');
  const [showDraftPost, setShowDraftPost] = useState(false);

  // Audience Sabotage Voting live states
  const [votingCategory, setVotingCategory] = useState<
    'pathogen' | 'cage' | 'gravity' | 'storm'
  >('pathogen');
  const [votingStats, setVotingStats] = useState({
    pathogen: 42,
    cage: 23,
    gravity: 15,
    storm: 20,
  });
  const [userVotedOption, setUserVotedOption] = useState<string | null>(null);

  // Interactive Dice Console States
  const [selectedDie, setSelectedDie] = useState<number>(20);
  const [diceHistory, setDiceHistory] = useState<string[]>([
    '[00:08] System Initialized ➔ Dice Rolling Module Ready',
  ]);
  const [activeDieResult, setActiveDieResult] = useState<number | null>(null);

  // Handle stream comment simulator tick
  useEffect(() => {
    if (!isStreamPlaying) return;
    const commentators = [
      'LoreWalker',
      'CriticalGamer',
      'Table_Dwarf',
      'Synth_Replicant',
      'Ring_Bearer',
      'Acid_Scum',
      'Mutant_Moose',
    ];
    const commentsPool = [
      'Did they just check the ledger?',
      'The GMs audio is crisper than my cards',
      'ROLL FOR INITIATIVE!',
      'They need to use more light-stones in Davokar',
      'Blade Runner RPG neon aesthetic is so cozy 🌃',
      'Frontier Scum seems like a fever-dream wild west, love it!',
      'What are the expansion specs?',
      'Can you play solo?',
      'Buying this book immediately!',
    ];

    const interval = setInterval(() => {
      const author =
        commentators[Math.floor(Math.random() * commentators.length)];
      const text =
        commentsPool[Math.floor(Math.random() * commentsPool.length)];
      const isRoll = Math.random() > 0.7;
      const points = isRoll ? Math.floor(Math.random() * 20) + 1 : undefined;
      const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-purple-500',
        'bg-yellow-500',
        'bg-emerald-500',
        'bg-pink-500',
      ];

      const newComment: StreamComment = {
        id: Math.random().toString(),
        author,
        text: isRoll ? `rolled a ${points}! 🎲` : text,
        avatarColor: colors[Math.floor(Math.random() * colors.length)],
        rolledPoints: points,
      };

      setStreamComments((prev) => [...prev.slice(-15), newComment]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isStreamPlaying]);

  // Dice action rolling
  const handleRollDice = () => {
    playClack();
    setIsRolling(true);
    let counter = 0;
    const interval = setInterval(() => {
      setActiveDieResult(Math.floor(Math.random() * selectedDie) + 1);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        const finalResult = Math.floor(Math.random() * selectedDie) + 1;
        setActiveDieResult(finalResult);
        setIsRolling(false);

        let comment = '';
        if (selectedDie === 20) {
          if (finalResult === 20) comment = ' ➔ CRITICAL SUCCESS! 🌟';
          else if (finalResult === 1) comment = ' ➔ CRITICAL FAILURE! 💀';
        }

        const time = new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setDiceHistory((prev) => [
          `[${time}] Rolled d${selectedDie} ➔ ${finalResult}${comment}`,
          ...prev.slice(0, 19),
        ]);
      }
    }, 60);
  };

  // Filter game worlds list
  const filteredWorlds =
    worldFilter === 'all'
      ? gameWorlds
      : gameWorlds.filter((w) => w.category === worldFilter);

  // Submit stream comment
  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentInput.trim()) {
      playClack();
      const userComm: StreamComment = {
        id: Math.random().toString(),
        author: '@elliotbradly',
        text: newCommentInput,
        avatarColor: 'bg-obsidian border border-[#D4AF37]',
        role: 'ADMIN_USER',
      };
      setStreamComments((prev) => [...prev, userComm]);
      setNewCommentInput('');
    }
  };

  // Submit forum post
  const handleSendPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostTitle.trim() && newPostSnippet.trim()) {
      playClack();
      const userPost: CommunityForumPost = {
        id: Math.random().toString(),
        title: newPostTitle,
        category: newPostCategory,
        author: '@elliotbradly',
        replies: 0,
        likes: 1,
        snippet: newPostSnippet,
      };
      setForumPosts((prev) => [userPost, ...prev]);
      setNewPostTitle('');
      setNewPostSnippet('');
      setShowDraftPost(false);
    }
  };

  // Live poll sabotage subaction
  const handleVoteSabotage = (
    opt: 'pathogen' | 'cage' | 'gravity' | 'storm',
  ) => {
    if (userVotedOption === null) {
      playClack();
      setUserVotedOption(opt);
      setVotingStats((prev) => {
        const next = { ...prev };
        next[opt] = next[opt] + 1;
        return next;
      });
    }
  };

  // Wizard quick rolls
  const rollWizardStats = () => {
    playClack();
    setIsRolling(true);
    setTimeout(() => {
      setCharStats({
        strength: Math.floor(Math.random() * 8) + 10,
        agility: Math.floor(Math.random() * 8) + 10,
        willpower: Math.floor(Math.random() * 8) + 10,
        intelligence: Math.floor(Math.random() * 8) + 10,
      });
      setIsRolling(false);
    }, 400);
  };

  return (
    <main className="min-h-screen pb-20 bg-[#E4DFD3] text-obsidian relative">
      {/* Decorative Hexagon Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='42' viewBox='0 0 24 42' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0l12 7v14l-12 7L0 21V7z' fill='none' stroke='%23000000' stroke-width='1'/%3E%3Cpath d='M0 35l12 7 12-7M12 21v14' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '24px 42px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* VIEW A: MAINSTREAM CAMP CANDOR SYSTEM (OUR WORLDS, SHOP, NEWS, ETC) */}
        {activeTab === 'worlds' && (
          <div className="space-y-16">
            {/* 1. Explore Our Worlds Section with Integrated Platform Choices (Combined and Full-Width) */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showExploreWorlds ? (
              <section
                id="our-games"
                className="scroll-mt-36 space-y-12 pt-[40px] relative"
              >
                {/* Words have Power Intro Header Block */}
                <div className="border-b-4 border-obsidian pb-6">
                  <h2 className="font-serif-display text-5xl md:text-6xl text-obsidian leading-[0.95] tracking-tight font-black whitespace-pre-line">
                    {(
                      DEFAULT_SCHEMA.introBlock?.title ||
                      DEFAULT_SCHEMA.introBlock.title
                    ).replace('<br/>', '\n')}
                  </h2>
                  <p className="font-serif-body text-[17px] md:text-lg leading-relaxed text-obsidian/90 max-w-2xl mt-4 font-medium">
                    {DEFAULT_SCHEMA.introBlock?.description ||
                      DEFAULT_SCHEMA.introBlock.description}
                  </p>
                </div>

                {/* Combined Genre & Platform Full Wide Blocks */}
                <div className="space-y-12">
                  {gameWorlds
                    .filter((world) => {
                      if (
                        world.id === 'scifi' &&
                        DEFAULT_SCHEMA.sectionsVisibility
                          ?.showSciFiWorldCard === false
                      )
                        return false;
                      if (
                        world.id === 'fantasy' &&
                        DEFAULT_SCHEMA.sectionsVisibility
                          ?.showPrimalMamaWorldCard === false
                      )
                        return false;
                      if (
                        world.id === 'horror' &&
                        DEFAULT_SCHEMA.sectionsVisibility
                          ?.showHorrorWorldCard === false
                      )
                        return false;
                      if (
                        world.id === 'hourofthealligator' &&
                        DEFAULT_SCHEMA.sectionsVisibility
                          ?.showHourOfTheAlligatorWorldCard === false
                      )
                        return false;
                      return true;
                    })
                    .map((world, idx) => {
                      const isEven = idx % 2 === 0;

                      // Custom theme parameters for coloring details
                      const themeGlow =
                        world.id === 'scifi'
                          ? 'shadow-[0_0_25px_rgba(211,47,47,0.15)] group-hover:shadow-[0_0_30px_rgba(211,47,47,0.3)]'
                          : world.id === 'fantasy'
                            ? 'shadow-[0_0_25px_rgba(5,58,36,0.15)] group-hover:shadow-[0_0_30px_rgba(5,58,36,0.3)]'
                            : world.id === 'hourofthealligator'
                              ? 'shadow-[0_0_25px_rgba(138,28,20,0.15)] group-hover:shadow-[0_0_30px_rgba(138,28,20,0.3)]'
                              : 'shadow-[0_0_25px_rgba(60,29,66,0.15)] group-hover:shadow-[0_0_30px_rgba(60,29,66,0.3)]';

                      const badgeBg =
                        world.id === 'scifi'
                          ? 'bg-[#D32F2F] text-white'
                          : world.id === 'fantasy'
                            ? 'bg-[#053a24] text-white'
                            : world.id === 'hourofthealligator'
                              ? 'bg-[#8a1c14] text-white'
                              : 'bg-[#3c1d42] text-white';

                      return (
                        <motion.div
                          key={world.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          onClick={() => {
                            playClack();
                            if (world.id === 'fantasy') {
                              const el = document.getElementById(
                                'primal-mama-core-system',
                              );
                              if (el)
                                el.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start',
                                });
                            } else if (world.id === 'scifi') {
                              const el = document.getElementById(
                                'blade-runner-sci-fi-corridors',
                              );
                              if (el)
                                el.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start',
                                });
                            } else if (world.id === 'horror') {
                              const el = document.getElementById(
                                'gothic-crypts-horror-vault',
                              );
                              if (el)
                                el.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start',
                                });
                            }
                          }}
                          className="grid grid-cols-1 md:grid-cols-12 border-4 border-obsidian bg-charcoal text-bone overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.85)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.85)] hover:-translate-y-1 transition-all duration-300 w-full cursor-pointer"
                        >
                          {/* Genre Promo Card: Column 1 (Left Column) - Taller and wider image */}
                          <div className="col-span-12 md:col-span-6 relative min-h-[400px] sm:min-h-[480px] md:min-h-[580px] lg:min-h-[640px] overflow-hidden group border-b-4 md:border-b-0 md:border-r-4 border-obsidian">
                            {/* High-fidelity background cover */}
                            <img
                              referrerPolicy="no-referrer"
                              src={world.coverUrl}
                              alt={world.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Dramatic color overlay matching genre vibes */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-t ${world.id === 'scifi' ? 'from-[#8B0000]/95 via-[#8B0000]/45' : world.id === 'fantasy' ? 'from-[#053a24]/95 via-[#053a24]/45' : world.id === 'hourofthealligator' ? 'from-[#4a100a]/95 via-[#4a100a]/45' : 'from-[#1a0a24]/95 via-[#1a0a24]/45'} to-transparent opacity-90 group-hover:opacity-95 transition-opacity`}
                            />

                            {/* HUD Badge top left */}
                            <div className="absolute top-4 left-4 border border-bone/35 px-2 py-0.5 font-mono-ui text-[9px] text-bone tracking-widest uppercase bg-black/40 font-bold">
                              {world.badge}
                            </div>

                            {/* Title details bottom left */}
                            <div className="absolute bottom-6 left-6 right-6 text-left space-y-2">
                              <h3 className="font-archive text-3.5xl text-bone tracking-widest leading-none drop-shadow-md group-hover:text-[#D4AF37] transition-colors uppercase font-black">
                                {world.title}
                              </h3>
                              <p className="font-mono-ui text-xs text-[#E4DFD3]/90 tracking-widest uppercase font-medium leading-tight">
                                {world.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Info & Platforms Section: Column 2 (Right Column) */}
                          <div className="col-span-12 md:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6 bg-[#151515] text-left">
                            {/* Genre info summary at the top of the second column */}
                            <div className="space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <span
                                  className={`text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded self-start ${badgeBg}`}
                                >
                                  {world.title} COMPENDIUM
                                </span>
                                <span className="text-[#D4AF37] text-xs font-mono font-medium">
                                  ➔ START PLAYING
                                </span>
                              </div>
                              <p className="font-serif-body text-[15px] sm:text-[16px] text-[#E4DFD3]/90 normal-case leading-relaxed font-normal">
                                {world.description} {world.expandedLore}
                              </p>

                              {/* Rich vertical checklist listing */}
                              <div className="space-y-2 pt-3 border-t border-bone/10">
                                {world.features.map((feat, fidx) => (
                                  <div
                                    key={fidx}
                                    className="flex items-start gap-2.5 text-stone-300 font-serif-body text-xs sm:text-[13px] normal-case leading-tight"
                                  >
                                    <span className="text-[#D32F2F] font-bold select-none text-base sm:text-lg shrink-0 -mt-0.5">
                                      ✓
                                    </span>
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Styled platform decision header inside Column 2 */}
                            <div className="border-t-2 border-dashed border-bone/15 pt-5">
                              <h4 className="font-archive text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
                                SELECT PLATFORM FOR {world.title}
                              </h4>

                              {/* 3 Interactive Choose Your Platform CTA buttons customized inside each world block */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {/* Platform 1: Play Solo */}
                                {(() => {
                                  const isSoloActive =
                                    DEFAULT_SCHEMA.sectionsVisibility
                                      ?.showPlaySolo !== false;
                                  return (
                                    <button
                                      disabled={!isSoloActive}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (!isSoloActive) return;
                                        playClack();
                                        const el =
                                          document.getElementById('play-solo');
                                        if (el)
                                          el.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                          });
                                      }}
                                      className={`bg-gradient-to-b from-[#1a100a] via-[#591d00] to-[#1a100a] border-2 border-bone/20 p-4 text-left transition-all duration-300 rounded flex flex-col justify-between h-48 shadow-lg ${isSoloActive ? 'group/btn cursor-pointer hover:border-emerald-600 hover:via-[#6d2500]' : 'opacity-30 grayscale saturate-0 contrast-75 pointer-events-none cursor-default'}`}
                                    >
                                      <div className="flex justify-between items-start w-full">
                                        <User className="w-7 h-7 text-[#D4AF37]" />
                                        <span className="font-mono text-[9px] text-emerald-500 font-bold group-hover/btn:translate-x-1 transition-transform">
                                          ➔
                                        </span>
                                      </div>
                                      <div className="space-y-1">
                                        <h5 className="font-archive text-[11px] tracking-wider text-bone uppercase group-hover/btn:text-emerald-500 transition-colors font-bold">
                                          SOLO MODE
                                        </h5>
                                        <p className="font-serif-body text-[10px] text-bone/85 normal-case leading-snug">
                                          Explore alone via offline system
                                          rulebooks.
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })()}

                                {/* Platform 2: At The Table */}
                                {(() => {
                                  const isAtTheTableActive =
                                    DEFAULT_SCHEMA.sectionsVisibility
                                      ?.showAtTheTable !== false;
                                  return (
                                    <button
                                      disabled={!isAtTheTableActive}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (!isAtTheTableActive) return;
                                        playClack();
                                        const el =
                                          document.getElementById(
                                            'at-the-table',
                                          );
                                        if (el)
                                          el.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                          });
                                      }}
                                      className={`bg-gradient-to-b from-[#1a100a] via-[#591d00] to-[#1a100a] border-2 border-bone/20 p-4 text-left transition-all duration-300 rounded flex flex-col justify-between h-48 shadow-lg ${isAtTheTableActive ? 'group/btn cursor-pointer hover:border-[#D32F2F] hover:via-[#6d2500]' : 'opacity-30 grayscale saturate-0 contrast-75 pointer-events-none cursor-default'}`}
                                    >
                                      <div className="flex justify-between items-start w-full">
                                        <Users className="w-7 h-7 text-[#D4AF37]" />
                                        <span className="font-mono text-[9px] text-[#D32F2F] font-bold group-hover/btn:translate-x-1 transition-transform">
                                          ➔
                                        </span>
                                      </div>
                                      <div className="space-y-1">
                                        <h5 className="font-archive text-[11px] tracking-wider text-bone uppercase group-hover/btn:text-[#D32F2F] transition-colors font-bold">
                                          AT THE TABLE
                                        </h5>
                                        <p className="font-serif-body text-[10px] text-bone/85 normal-case leading-snug">
                                          Physical sessions, sheets, &
                                          traditional dice.
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })()}

                                {/* Platform 3: Online Roleplaying */}
                                {(() => {
                                  const isOnlinePlayActive =
                                    DEFAULT_SCHEMA.sectionsVisibility
                                      ?.showOnlinePlay !== false;
                                  return (
                                    <button
                                      disabled={!isOnlinePlayActive}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (!isOnlinePlayActive) return;
                                        playClack();
                                        if (world.id === 'fantasy') {
                                          window.location.hash =
                                            '#primal-mama/lobby';
                                        } else {
                                          const el =
                                            document.getElementById(
                                              'online-roleplaying',
                                            );
                                          if (el)
                                            el.scrollIntoView({
                                              behavior: 'smooth',
                                              block: 'start',
                                            });
                                        }
                                      }}
                                      className={`bg-gradient-to-b from-[#1a100a] via-[#591d00] to-[#1a100a] border-2 border-bone/20 p-4 text-left transition-all duration-300 rounded flex flex-col justify-between h-48 shadow-lg ${isOnlinePlayActive ? 'group/btn cursor-pointer hover:border-[#D4AF37] hover:via-[#6d2500]' : 'opacity-30 grayscale saturate-0 contrast-75 pointer-events-none cursor-default'}`}
                                    >
                                      <div className="flex justify-between items-start w-full">
                                        <Monitor className="w-7 h-7 text-[#D4AF37]" />
                                        <span className="font-mono text-[9px] text-[#D4AF37] font-bold group-hover/btn:translate-x-1 transition-transform">
                                          ➔
                                        </span>
                                      </div>
                                      <div className="space-y-1">
                                        <h5 className="font-archive text-[11px] tracking-wider text-bone uppercase group-hover/btn:text-[#D4AF37] transition-colors font-bold">
                                          ONLINE PLAY
                                        </h5>
                                        <p className="font-serif-body text-[10px] text-bone/85 normal-case leading-snug">
                                          Virtual tabletops, digital sheets, &
                                          remote party.
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </section>
            ) : null}

            {/* 3. "Let's Play" Immersive Banner with Interactive RPG Character Creator (Image 1) */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showLetsPlayCharacterCreator ? (
              <section className="relative border-4 border-obsidian p-8 md:p-12 text-center overflow-hidden bg-obsidian text-bone shadow-[8px_8px_0px_rgba(0,0,0,0.85)]">
                {/* Dark forest wallpaper background */}
                <div
                  className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
                  style={{
                    backgroundImage: `url('/img/011.png')`,
                  }}
                />

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <div className="w-12 h-12 mx-auto border-2 border-bone rounded-full flex items-center justify-center p-2.5 bg-obsidian">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full fill-none stroke-current"
                      strokeWidth="6"
                    >
                      <path d="M50 8 C50 8, 25 35, 50 50 C75 35, 50 8, 50 8 Z" />
                      <path d="M50 92 C50 92, 25 65, 50 50 C75 65, 50 92, 50 92 Z" />
                    </svg>
                  </div>
                  <h2 className="font-serif-display text-5xl md:text-6xl text-bone leading-none tracking-tight">
                    {DEFAULT_SCHEMA.letsPlayBlock?.title ||
                      DEFAULT_SCHEMA.letsPlayBlock.title}
                  </h2>
                  <p className="font-serif-body text-base md:text-lg text-[#E4DFD3]/90 leading-relaxed font-medium">
                    {DEFAULT_SCHEMA.letsPlayBlock?.description ||
                      DEFAULT_SCHEMA.letsPlayBlock.description}
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        playClack();
                        setShowWizard(!showWizard);
                      }}
                      className="bg-white hover:bg-[#D4AF37] hover:text-obsidian px-8 py-3 text-obsidian font-archive text-base uppercase tracking-widest transition-colors font-bold shadow-md flex items-center justify-center"
                    >
                      {showWizard ? 'CLOSE CREATOR WIZARD' : 'GET STARTED'}
                    </button>
                  </div>

                  {/* STATEFUL RPG CHARACTER CREATOR WIZARD MODAL */}
                  <AnimatePresence>
                    {showWizard && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-[#E4DFD3] text-obsidian border-4 border-obsidian p-6 text-left shadow-2xl mt-8 relative"
                      >
                        <div className="border-b-2 border-obsidian pb-3 mb-4 flex justify-between items-center">
                          <span className="font-mono-ui text-xs font-bold text-[#D32F2F] tracking-widest uppercase">
                            RP_CHARACTER GENERATOR // STEP {wizardStep} of 3
                          </span>
                          <div className="flex gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full ${wizardStep >= 1 ? 'bg-[#D32F2F]' : 'bg-obsidian/25'}`}
                            ></span>
                            <span
                              className={`w-2 h-2 rounded-full ${wizardStep >= 2 ? 'bg-[#D32F2F]' : 'bg-obsidian/25'}`}
                            ></span>
                            <span
                              className={`w-2 h-2 rounded-full ${wizardStep >= 3 ? 'bg-[#D32F2F]' : 'bg-obsidian/25'}`}
                            ></span>
                          </div>
                        </div>

                        {wizardStep === 1 && (
                          <div className="space-y-4">
                            <h4 className="font-archive text-2xl uppercase">
                              Designate Core Identity
                            </h4>
                            <p className="font-serif-body text-sm font-medium">
                              To author your legacy, write down your designated
                              title or character codename:
                            </p>
                            <div>
                              <label className="block text-[10px] font-mono-ui uppercase font-bold text-obsidian mb-1">
                                CHARACTER CODENAME
                              </label>
                              <input
                                type="text"
                                value={charName}
                                onChange={(e) => setCharName(e.target.value)}
                                placeholder="e.g. Eldon Finch, Rep-44"
                                className="w-full p-2.5 bg-white border-2 border-obsidian font-mono-ui text-sm focus:bg-[#FFF9EA]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono-ui uppercase font-bold text-obsidian mb-1">
                                CHOOSE CLASS SETTING
                              </label>
                              <select
                                value={charClass}
                                onChange={(e) => setCharClass(e.target.value)}
                                className="w-full p-2.5 bg-white border-2 border-obsidian font-mono-ui text-sm focus:bg-[#FFF9EA]"
                              >
                                <option value="Mecha Marshal">
                                  Mecha Marshal (Sci-Fi / Mutant)
                                </option>
                                <option value="Primal Wildcard">
                                  Primal Wildcard (Universal / Primal Mama)
                                </option>
                                <option value="Gothic Gravekeeper">
                                  Gothic Gravekeeper (Horror / Ruins)
                                </option>
                                <option value="Frontier Scum Desperado">
                                  Frontier Scum Desperado (Acid Western)
                                </option>
                              </select>
                            </div>
                            <button
                              disabled={!charName.trim()}
                              onClick={() => {
                                playClack();
                                setWizardStep(2);
                              }}
                              className="bg-obsidian text-bone hover:bg-[#D32F2F] disabled:opacity-50 px-5 py-2.5 font-archive text-sm uppercase tracking-wide flex items-center justify-center gap-1.5 ml-auto"
                            >
                              NEXT CRUCIBLE <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {wizardStep === 2 && (
                          <div className="space-y-4">
                            <h4 className="font-archive text-2xl uppercase">
                              Roll Core Attributes
                            </h4>
                            <p className="font-serif-body text-sm font-medium">
                              Use high-frequency 10Hz randomized server dice to
                              roll your physical and mental attributes:
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/40 p-4 border border-obsidian/20 font-mono-ui">
                              <div>
                                <div className="text-[10px] font-bold text-obsidian/60 uppercase">
                                  STRENGTH
                                </div>
                                <div className="text-3xl font-bold">
                                  {charStats.strength}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-obsidian/60 uppercase">
                                  AGILITY
                                </div>
                                <div className="text-3xl font-bold">
                                  {charStats.agility}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-obsidian/60 uppercase">
                                  WILLPOWER
                                </div>
                                <div className="text-3xl font-bold">
                                  {charStats.willpower}
                                </div>
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-obsidian/60 uppercase">
                                  TECH/INTEL
                                </div>
                                <div className="text-3xl font-bold">
                                  {charStats.intelligence}
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <button
                                onClick={rollWizardStats}
                                className="bg-white hover:bg-white border-2 border-obsidian font-mono-ui text-xs font-bold uppercase tracking-widest px-4 py-2"
                              >
                                🎲 ROLL ATTRIBUTES
                              </button>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    playClack();
                                    setWizardStep(1);
                                  }}
                                  className="text-xs uppercase underline"
                                >
                                  Back
                                </button>
                                <button
                                  onClick={() => {
                                    playClack();
                                    setWizardStep(3);
                                  }}
                                  className="bg-obsidian text-bone hover:bg-[#D32F2F] px-5 py-2.5 font-archive text-sm uppercase tracking-wide"
                                >
                                  CONFIRM STATS
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {wizardStep === 3 && (
                          <div className="space-y-4">
                            <h4 className="font-archive text-2xl uppercase">
                              Assemble Character Passport
                            </h4>
                            <p className="font-serif-body text-sm font-medium">
                              Your character is fully shaped and bound to the
                              server matrix. Output the finalized passport
                              docket below:
                            </p>

                            {/* Formal printable character card */}
                            <div
                              id="print-passport"
                              className="border-4 border-dashed border-obsidian bg-white p-5 font-mono-ui text-xs space-y-4"
                            >
                              <div className="flex justify-between border-b pb-2">
                                <div>
                                  <span className="font-bold text-sm uppercase text-[#D32F2F]">
                                    COVENANT PASSPORT 1970
                                  </span>
                                  <p className="text-[9px] text-gray-500">
                                    CAMP CANDOR SYSTEM
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className="text-[9px] text-gray-500">
                                    ID CODE:
                                  </span>
                                  <p className="font-bold">
                                    FL-{charName.slice(0, 3).toUpperCase()}-
                                    {charStats.strength * charStats.agility}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-[9px] text-gray-500 block uppercase">
                                    TITLE & IDENTITY
                                  </span>
                                  <p className="font-bold uppercase text-sm border-b pb-1">
                                    {charName}
                                  </p>
                                  <span className="text-[9px] text-gray-500 block uppercase mt-2">
                                    CLASS SETTING
                                  </span>
                                  <p className="font-bold uppercase text-sm">
                                    {charClass}
                                  </p>
                                </div>
                                <div className="bg-[#E4DFD3]/40 border p-2.5 space-y-1">
                                  <span className="text-[9px] text-gray-500 block uppercase font-bold text-center border-b border-gray-300 pb-0.5">
                                    FINAL ROLL STATS
                                  </span>
                                  <div className="flex justify-between">
                                    <span>STR:</span>
                                    <span className="font-bold">
                                      {charStats.strength}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>AGI:</span>
                                    <span className="font-bold">
                                      {charStats.agility}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>WIL:</span>
                                    <span className="font-bold">
                                      {charStats.willpower}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>INT:</span>
                                    <span className="font-bold">
                                      {charStats.intelligence}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-gray-500 font-bold">
                                ✓ CHAR BINDING TO THE LEAD BOOK COMPLETE
                              </span>
                              <button
                                onClick={() => {
                                  playClack();
                                  setWizardStep(1);
                                  setShowWizard(false);
                                  alert(
                                    'Your Character Passport codename "' +
                                      charName +
                                      '" has been written to the Local Vault! Reliquary efficiency locked.',
                                  );
                                }}
                                className="bg-[#D32F2F] text-bone hover:bg-obsidian border-2 border-black font-archive text-sm uppercase px-6 py-2.5 tracking-wider font-bold"
                              >
                                BIND COVENANT TO ARCHIVES
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
            ) : null}

            {/* 3. News Dispatch Section */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showNewsDispatches ? (
              <News playClack={playClack} data={DEFAULT_SCHEMA.newsBlock} />
            ) : null}

            {/* 3b. At the Table (Gathering Friends) Section */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showAtTheTable ? (
              <AtTheTable
                playClack={playClack}
                data={DEFAULT_SCHEMA.atTheTableBlock}
              />
            ) : null}

            {/* 3d. Play Solo Section */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showPlaySolo ? (
              <PlaySolo
                playClack={playClack}
                data={DEFAULT_SCHEMA.playSoloBlock}
              />
            ) : null}

            {/* 3c. Online Roleplaying Section */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showOnlinePlaySection ? (
              <OnlineRoleplaying
                playClack={playClack}
                data={DEFAULT_SCHEMA.onlinePlayBlock}
              />
            ) : null}

            {/* 4. Our Community Section (Image 2) */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showCommunityCards ? (
              <section id="community" className="scroll-mt-36 space-y-8">
                <div className="flex justify-between items-end border-b-2 border-obsidian pb-3">
                  <h3 className="font-serif-display text-4xl text-obsidian tracking-tight">
                    Our Community
                  </h3>
                </div>

                {/* Three community cards representation (Image 2) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* DISCORD Card */}
                  <div className="bg-[#E4DFD3] border-4 border-obsidian overflow-hidden p-0 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] flex flex-col">
                    <div className="aspect-[4/3] w-full border-b-2 border-obsidian relative bg-stone-300">
                      <img
                        referrerPolicy="no-referrer"
                        src="/img/005.png"
                        alt="Simon Stalenhag Mech Style scenery"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col gap-3 justify-between">
                      <div>
                        <h4 className="font-archive text-xl tracking-wider uppercase">
                          DISCORD
                        </h4>
                        <p className="font-serif-body text-xs text-obsidian/85 leading-relaxed mt-1 font-medium">
                          Connect with players all around the world to discuss
                          Camp Candor games, organize voice sessions, and
                          arrange virtual tables.
                        </p>
                      </div>
                      {/* Sandbox Trigger */}
                      <button
                        onClick={() => {
                          playClack();
                          setShowDraftPost(!showDraftPost);
                        }}
                        className="w-full bg-white hover:bg-obsidian hover:text-bone text-obsidian border-2 border-obsidian p-2 font-mono-ui text-[10px] font-bold uppercase transition-colors"
                      >
                        {showDraftPost
                          ? 'CLOSE DISCORD FEED'
                          : 'ACCESS DISCORD FEED'}
                      </button>
                    </div>
                  </div>

                  {/* COMMUNITY CONTENT Card */}
                  <div className="bg-[#E4DFD3] border-4 border-obsidian overflow-hidden p-0 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] flex flex-col">
                    <div className="aspect-[4/3] w-full border-b-2 border-obsidian relative bg-stone-300">
                      <img
                        referrerPolicy="no-referrer"
                        src="/img/010.png"
                        alt="Notebook dice, pencil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col gap-3 justify-between">
                      <div>
                        <h4 className="font-archive text-xl tracking-wider uppercase">
                          COMMUNITY CONTENT
                        </h4>
                        <p className="font-serif-body text-xs text-obsidian/85 leading-relaxed mt-1 font-medium">
                          Create, publish and sell your own content for Camp
                          Candor game lines under our official licensing
                          program.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          playClack();
                          alert(
                            'Welcome to the Workshop! Community tools and PDF templates are ready for layout download in your simulated publisher folder.',
                          );
                        }}
                        className="w-full bg-white hover:bg-obsidian hover:text-bone text-obsidian border-2 border-obsidian p-2 font-mono-ui text-[10px] font-bold uppercase transition-colors"
                      >
                        LICENSE SPECIFICATIONS
                      </button>
                    </div>
                  </div>

                  {/* ORGANIZED PLAY Card */}
                  <div className="bg-[#E4DFD3] border-4 border-obsidian overflow-hidden p-0 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] flex flex-col">
                    <div className="aspect-[4/3] w-full border-b-2 border-obsidian relative bg-stone-300">
                      <img
                        referrerPolicy="no-referrer"
                        src="/img/002.png"
                        alt="Tabletop gaming convention group play"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col gap-3 justify-between">
                      <div>
                        <h4 className="font-archive text-xl tracking-wider uppercase">
                          ORGANIZED PLAY
                        </h4>
                        <p className="font-serif-body text-xs text-obsidian/85 leading-relaxed mt-1 font-medium">
                          Become a Free Agent and lead Camp Candor games at
                          conventions and independent local game stores.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          playClack();
                          alert(
                            'Organized Play roster accessed! 24 active tabletop conventions are registered for convention guides.',
                          );
                        }}
                        className="w-full bg-white hover:bg-obsidian hover:text-bone text-obsidian border-2 border-obsidian p-2 font-mono-ui text-[10px] font-bold uppercase transition-colors"
                      >
                        REGISTER AS AGENT
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stateful Sandbox Forum Feed Container (Image 2 integration) */}
                <AnimatePresence>
                  {showDraftPost && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-4 border-obsidian bg-white p-5 rounded font-serif shadow-inner space-y-6 overflow-hidden text-obsidian"
                    >
                      <div className="border-b border-gray-200 pb-3 flex justify-between items-center flex-wrap gap-2">
                        <span className="font-mono-ui text-xs font-bold uppercase text-[#D32F2F]">
                          Live Discord Channels Feed
                        </span>
                        <button
                          onClick={() => {
                            playClack();
                            setForumPosts(forumPosts);
                            alert(
                              'Simulated Discord feed synced. Channels updated!',
                            );
                          }}
                          className="text-[10px] font-mono-ui uppercase font-bold underline hover:text-[#D32F2F]"
                        >
                          REFRESH DISCORD FEED
                        </button>
                      </div>

                      {/* Active Feed */}
                      <div className="space-y-4">
                        {forumPosts.map((post) => (
                          <div
                            key={post.id}
                            className="border-l-4 border-obsidian pl-4 py-1.5 hover:bg-[#E4DFD3]/20 transition-colors"
                          >
                            <div className="flex gap-2 items-center text-xs font-mono-ui font-semibold text-gray-500 uppercase">
                              <span className="bg-[#E4DFD3] text-obsidian font-bold px-1.5 py-0.5">
                                {post.category}
                              </span>
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>{post.replies} replies</span>
                              <span>•</span>
                              <span>{post.likes} likes</span>
                            </div>
                            <h5 className="font-archive text-lg uppercase text-obsidian mt-1">
                              {post.title}
                            </h5>
                            <p className="font-serif-body text-xs text-obsidian/75 leading-relaxed mt-1 font-medium">
                              {post.snippet}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Thread Submission Box */}
                      <form
                        onSubmit={handleSendPost}
                        className="bg-[#E4DFD3]/40 border-2 border-dashed border-obsidian p-4 space-y-4"
                      >
                        <h6 className="font-archive text-sm uppercase tracking-wider mb-2">
                          Draft Community Thread
                        </h6>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono-ui text-xs">
                          <div>
                            <label className="block text-[10px] font-bold mb-1">
                              THREAD TITLE
                            </label>
                            <input
                              value={newPostTitle}
                              onChange={(e) => setNewPostTitle(e.target.value)}
                              type="text"
                              required
                              placeholder="e.g. Blade Runner RPG: Case file templates"
                              className="w-full p-2 border border-obsidian outline-none bg-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold mb-1">
                              GAME CATEGORY
                            </label>
                            <select
                              value={newPostCategory}
                              onChange={(e) =>
                                setNewPostCategory(e.target.value)
                              }
                              className="w-full p-2 border border-obsidian outline-none bg-white font-medium"
                            >
                              <option value="PRIMAL MAMA">
                                PRIMAL MAMA (Universal System)
                              </option>
                              <option value="PRIMAL MAMA: FANTASY">
                                PRIMAL FANTASY (Fantasy)
                              </option>
                              <option value="BLADE RUNNER">
                                BLADE RUNNER (Sci-Fi)
                              </option>
                              <option value="FRONTIER SCUM">
                                FRONTIER SCUM (Western)
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="font-mono-ui text-xs">
                          <label className="block text-[10px] font-bold mb-1">
                            THREAD SNIPPET
                          </label>
                          <textarea
                            value={newPostSnippet}
                            onChange={(e) => setNewPostSnippet(e.target.value)}
                            required
                            rows={2}
                            placeholder="Write key questions or insights representing table rulings..."
                            className="w-full p-2 border border-obsidian outline-none bg-white font-mono-ui"
                          />
                        </div>

                        <button
                          type="submit"
                          className="bg-obsidian hover:bg-[#D32F2F] text-bone font-archive uppercase text-xs tracking-wider px-5 py-2 hover:border-[#D32F2F] transition-colors"
                        >
                          SEND MESSAGE TO INTERACTIVE DISCORD
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            ) : null}

            {/* Interactive Blade Runner Sci-Fi Corridors Deep Detail Component */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showSciFiCorridorsDetail && (
              <BladeRunnerSciFiCorridors
                playClack={playClack}
                onAddToCart={onAddToCart}
              />
            )}

            {/* Interactive Campaign Boxed Adventure Set: Horror on the Hour of the Alligator */}
            {DEFAULT_SCHEMA.sectionsVisibility
              ?.showHourOfTheAlligatorDetail && (
              <HorrorOnTheHourOfTheAlligator
                playClack={playClack}
                onAddToCart={onAddToCart}
              />
            )}

            {/* Interactive Primal Mama Core Generic Rule System Detail Component */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showPrimalCoreSystemDetail && (
              <PrimalMamaCoreSystem
                playClack={playClack}
                onAddToCart={onAddToCart}
                showCommunityDemoChannels={
                  DEFAULT_SCHEMA.sectionsVisibility?.showCommunityDemoChannels
                }
              />
            )}

            {/* Interactive Vaults & Gothic Crypts Horror Deep Detail Component */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showGothicHorrorDetail && (
              <GothicCryptsHorror
                playClack={playClack}
                onAddToCart={onAddToCart}
              />
            )}

            {/* 5. LIVEPLAY & STREAMING SECTION (Image 2) */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showStreamingSimulator ? (
              <section className="scroll-mt-36 space-y-6 relative border-4 border-dashed border-transparent hover:border-obsidian/10 p-4 transition-all duration-300 font-sans">
                <div className="border-b border-obsidian/20 pb-2">
                  <span className="font-mono-ui text-[10px] tracking-widest text-obsidian/60 block uppercase font-bold">
                    {DEFAULT_SCHEMA.streamingBlock?.caption ||
                      DEFAULT_SCHEMA.streamingBlock.caption}
                  </span>
                  <h3 className="font-serif-display text-4xl text-obsidian capitalize mt-1">
                    {DEFAULT_SCHEMA.streamingBlock?.sectionTitle ||
                      DEFAULT_SCHEMA.streamingBlock.sectionTitle}
                  </h3>
                </div>

                {/* Dual-choice interactive video feed simulator */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Simulated Screen with controls */}
                  <div className="lg:col-span-8 flex flex-col">
                    <div className="relative aspect-video w-full border-4 border-obsidian bg-black overflow-hidden shadow-xl">
                      {/* High-fidelity responsive imagery for stream backdrops */}
                      {activeStream === 'lotr' ? (
                        <img
                          referrerPolicy="no-referrer"
                          src="/img/010.png"
                          alt="Elijah Wood Lord of the Rings 5e liveplay context"
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity ${isStreamPlaying ? 'opacity-80 saturate-[0.8]' : 'opacity-40 blur-sm'}`}
                        />
                      ) : (
                        <img
                          referrerPolicy="no-referrer"
                          src="/img/011.png"
                          alt="Blade Runner Me Myself Die Liveplay stream context"
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity ${isStreamPlaying ? 'opacity-80 saturate-[0.8]' : 'opacity-40 blur-sm'}`}
                        />
                      )}

                      {/* Glassy overlay HUD */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/30">
                        <div className="flex justify-between items-start">
                          <div className="bg-red-600 text-bone px-2 py-0.5 font-mono-ui text-[9px] font-bold uppercase rounded animate-pulse">
                            LIVE SIMULATION
                          </div>
                          <div className="bg-black/75 text-bone font-mono-ui text-[9px] px-2 py-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping"></span>
                            {DEFAULT_SCHEMA.streamingBlock?.spectatorsCount ||
                              DEFAULT_SCHEMA.streamingBlock.spectatorsCount}
                          </div>
                        </div>

                        {/* Title Badge Overlay */}
                        <div className="text-center">
                          {!isStreamPlaying && (
                            <button
                              onClick={() => {
                                playClack();
                                setIsStreamPlaying(true);
                              }}
                              className="mx-auto w-16 h-16 bg-white/90 hover:bg-[#D4AF37] text-obsidian rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-105"
                            >
                              <Play className="w-8 h-8 fill-current text-obsidian ml-1" />
                            </button>
                          )}
                        </div>

                        <div className="flex justify-between items-center text-bone">
                          <div>
                            <p className="font-archive uppercase text-base sm:text-xl text-bone tracking-wider">
                              {activeStream === 'lotr'
                                ? DEFAULT_SCHEMA.streamingBlock?.channel1
                                    ?.title ||
                                  DEFAULT_SCHEMA.streamingBlock.channel1.title
                                : DEFAULT_SCHEMA.streamingBlock?.channel2
                                    ?.title ||
                                  DEFAULT_SCHEMA.streamingBlock.channel2.title}
                            </p>
                            <p className="text-[10px] sm:text-xs font-mono-ui text-bone/70 uppercase">
                              {activeStream === 'lotr'
                                ? DEFAULT_SCHEMA.streamingBlock?.channel1
                                    ?.desc ||
                                  DEFAULT_SCHEMA.streamingBlock.channel1.desc
                                : DEFAULT_SCHEMA.streamingBlock?.channel2
                                    ?.desc ||
                                  DEFAULT_SCHEMA.streamingBlock.channel2.desc}
                            </p>
                          </div>

                          {/* Interactive toggle control */}
                          <button
                            onClick={() => {
                              playClack();
                              setIsStreamPlaying(!isStreamPlaying);
                            }}
                            className="p-1.5 bg-black/60 hover:bg-black text-bone"
                          >
                            {isStreamPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Channel selectors (Image 2 names) */}
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <button
                        onClick={() => {
                          playClack();
                          setActiveStream('lotr');
                        }}
                        className={`border-2 p-3 text-left transition-all ${activeStream === 'lotr' ? 'border-[#D32F2F] bg-white shadow-sm' : 'border-obsidian/20 hover:border-obsidian bg-white/50'}`}
                      >
                        <h5 className="font-archive text-sm uppercase text-obsidian">
                          {DEFAULT_SCHEMA.streamingBlock?.channel1?.title ||
                            DEFAULT_SCHEMA.streamingBlock.channel1.title}
                        </h5>
                        <span className="font-serif-body text-[11px] text-gray-500 italic">
                          {DEFAULT_SCHEMA.streamingBlock?.channel1?.desc ||
                            DEFAULT_SCHEMA.streamingBlock.channel1.desc}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          playClack();
                          setActiveStream('bladerunner');
                        }}
                        className={`border-2 p-3 text-left transition-all ${activeStream === 'bladerunner' ? 'border-[#D32F2F] bg-white shadow-sm' : 'border-obsidian/20 hover:border-obsidian bg-white/50'}`}
                      >
                        <h5 className="font-archive text-sm uppercase text-obsidian">
                          {DEFAULT_SCHEMA.streamingBlock?.channel2?.title ||
                            DEFAULT_SCHEMA.streamingBlock.channel2.title}
                        </h5>
                        <span className="font-serif-body text-[11px] text-gray-500 italic">
                          {DEFAULT_SCHEMA.streamingBlock?.channel2?.desc ||
                            DEFAULT_SCHEMA.streamingBlock.channel2.desc}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Simulated Stream Chat Sidebar (Image 2) */}
                  <div className="lg:col-span-4 border-4 border-obsidian bg-obsidian text-bone p-4 flex flex-col h-[380px] lg:h-auto justify-between shadow-lg font-mono-ui text-xs text-left">
                    <div className="border-b border-bone/20 pb-2 mb-2 flex justify-between uppercase tracking-wider text-[10px]">
                      <span className="font-bold flex items-center gap-1">
                        <Volume2 className="w-3 h-3 text-[#D32F2F] animate-pulse" />
                        CHAT TELEMETRY FEED
                      </span>
                      <span className="text-gray-400">10Hz CLK</span>
                    </div>

                    {/* Chat logs */}
                    <div className="flex-grow overflow-y-auto space-y-2 pr-2 text-[11px] scrollbar px-1 pb-4">
                      {streamComments.map((c) => (
                        <div key={c.id} className="leading-relaxed text-left">
                          <span
                            className={`inline-block mr-1.5 px-1 py-0.5 text-[8px] font-bold uppercase text-bone rounded ${c.avatarColor}`}
                          >
                            {c.author
                              .replace('@', '')
                              .slice(0, 4)
                              .toUpperCase()}
                          </span>
                          <span className="font-bold text-[#D4AF37] mr-1.5">
                            {c.author}:
                          </span>
                          <span className="text-bone/85">{c.text}</span>
                          {c.rolledPoints && (
                            <span className="ml-2 font-bold px-1 bg-[#D32F2F]/20 text-[#D32F2F] border border-[#D32F2F]/30 rounded">
                              d20 ➔ {c.rolledPoints}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Comment Sender Box */}
                    <form
                      onSubmit={handleSendComment}
                      className="border-t border-bone/20 pt-3 flex gap-1"
                    >
                      <input
                        type="text"
                        value={newCommentInput}
                        onChange={(e) => setNewCommentInput(e.target.value)}
                        placeholder="Comment into Matrix..."
                        className="flex-grow bg-[#1a1a1a] text-bone text-xs border border-bone/20 p-2 focus:outline-none focus:border-[#D32F2F]"
                      />
                      <button
                        type="submit"
                        className="bg-[#D32F2F] p-2 hover:bg-[#8B0000] transition-colors text-white"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            ) : null}

            {/* 3e. Upcoming Events Section */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showUpcomingEvents ? (
              <Events
                playClack={playClack}
                data={DEFAULT_SCHEMA.upcomingEventsBlock}
              />
            ) : null}

            {/* Retailer network banner removed */}

            {/* 7. Shop & Featured Books Catalogue (Image 3 FOLLOW US grid) */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showFeaturedShop ? (
              <section
                id="shop"
                className="scroll-mt-36 space-y-8 border-4 border-dashed border-transparent hover:border-obsidian/10 p-4 transition-all duration-300"
              >
                <div className="border-b-2 border-obsidian pb-3">
                  <span className="font-mono-ui text-[10px] text-obsidian/60 tracking-widest block uppercase font-bold">
                    {DEFAULT_SCHEMA.shopBlock?.subtitle ||
                      DEFAULT_SCHEMA.shopBlock.subtitle}
                  </span>
                  <h3 className="font-serif-display text-4xl text-obsidian capitalize mt-1">
                    {DEFAULT_SCHEMA.shopBlock?.title ||
                      DEFAULT_SCHEMA.shopBlock.title}
                  </h3>
                </div>

                {/* Grid representation of the 6 books shown in Image 3 */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="bg-[#E4DFD3] border-[3px] border-obsidian shadow-[6px_6px_0px_rgba(0,0,0,0.85)] flex flex-col hover:-translate-y-1 hover:translate-x-1 hover:shadow-[3px_3px_0px_rgba(0,0,0,0.85)] transition-all overflow-hidden"
                    >
                      {/* Cover Frame */}
                      <div className="aspect-[3/4] w-full border-b-[3px] border-obsidian relative bg-stone-300">
                        <img
                          referrerPolicy="no-referrer"
                          src={p.img}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Hover stats overlay */}
                        <div className="absolute inset-0 bg-obsidian/90 opacity-0 hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-bone text-left">
                          <div>
                            <span className="text-[9px] font-mono-ui bg-[#D32F2F] px-1 text-white uppercase">
                              {p.badge}
                            </span>
                            <h6 className="font-archive text-sm text-[#D4AF37] mt-1 leading-tight">
                              {p.title}
                            </h6>
                            <p className="text-[10px] font-serif-body text-bone/90 mt-1.5 leading-tight">
                              {p.desc}
                            </p>
                          </div>
                          <span className="font-mono-ui text-xs text-bone font-bold block border-t border-bone/20 pt-1.5">
                            RETAIL: ${p.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Book descriptors */}
                      <div className="p-3 flex-grow flex flex-col justify-between text-left space-y-2 bg-[#E4DFD3]">
                        <div>
                          <h5 className="font-archive text-[13px] leading-tight text-obsidian uppercase tracking-wide truncate">
                            {p.title}
                          </h5>
                          <p className="font-serif-body text-[10px] text-obsidian/70 leading-tight italic truncate">
                            {p.subtitle}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono-ui text-xs font-bold">
                            ${p.price.toFixed(2)}
                          </span>

                          {/* Cart interactive trigger */}
                          <button
                            onClick={() => {
                              onAddToCart();
                            }}
                            className="p-1 bg-obsidian text-bone hover:bg-[#D32F2F] hover:text-bone rounded transition-colors"
                            title="Add Rulebook to Crate"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* 6. About Camp Candor Section */}
            {DEFAULT_SCHEMA.sectionsVisibility?.showAboutCampCandor ? (
              <About playClack={playClack} data={DEFAULT_SCHEMA.aboutBlock} />
            ) : null}
          </div>
        )}

        {/* VIEW B: PORTED ORIGINAL BRUTALIST ALLIGATOR INK CORE TERMINAL (`#system`) */}
        {activeTab === 'terminal' && (
          <div className="space-y-12">
            {/* Immersive CRT tactical screen & Ink Video Broadcaster */}
            <section className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between md:items-end border-b-2 border-obsidian/30 pb-3">
                <div>
                  <div className="font-mono-ui text-[10px] text-[#D32F2F] tracking-widest uppercase mb-1 font-bold">
                    SYSTEM NODE UPLINK ACTIVE // MULTIPLEX DEC-70
                  </div>
                  <h2 className="font-archive text-4xl text-obsidian uppercase">
                    FATE IS MECHANICAL
                  </h2>
                </div>

                <div className="flex gap-6 mt-3 md:mt-0 font-mono-ui text-[9px] tracking-widest uppercase border border-obsidian p-2 bg-white/40">
                  <div className="flex flex-col">
                    <span className="text-obsidian/60">SYS INTEL</span>
                    <span className="font-bold text-[#D32F2F]">MUSE AWAKE</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-obsidian/60">COVENANT FREQ</span>
                    <span className="font-bold">10 HZ CLK</span>
                  </div>
                </div>
              </div>

              {/* Main CRT Frame containing interactive video */}
              <div className="border-4 border-obsidian p-3 bg-[#D9D4C5] shadow-[8px_8px_0px_rgba(0,0,0,0.85)] relative mt-4">
                <div className="font-mono-ui text-[10px] uppercase font-bold text-obsidian pb-1.5 flex justify-between px-2 bg-white/20 pt-1.5 border-b-2 border-obsidian mb-2">
                  <span>{'>'} MAIN BROADCAST FEED // COVENANT INTERRUPT</span>
                  <span className="animate-pulse text-[#D32F2F] font-bold">
                    REC FEED
                  </span>
                </div>

                <div className="relative w-full aspect-video border-2 border-obsidian overflow-hidden bg-obsidian shadow-inner">
                  {/* Stock black ink fluid video element from original design */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-55 contrast-125 saturate-0"
                    src="https://static.videezy.com/system/resources/previews/000/038/850/original/Black_Ink_P3.mp4"
                  />
                  <div className="absolute inset-0 bg-[#E4DFD3]/10 mix-blend-overlay pointer-events-none" />

                  {/* Stylized glass scanning lines */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px]" />

                  {/* Decorative terminal crosshairs */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#D32F2F]/30 pointer-events-none" />
                  <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#D32F2F]/30 pointer-events-none" />

                  {/* Text HUD Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/85 p-3.5 border border-bone/20 text-bone flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <p className="font-serif-body italic text-xs leading-relaxed max-w-xl">
                      "Step away from the audience. Claim the 1-of-1 Entwinement
                      Ticket. You do not play our engine; you inhabit the cast,
                      you rig the scaffold, and you bleed for the lore."
                    </p>
                    <div className="flex gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => {
                          playClack();
                          alert(
                            'Box Office Booking simulation activated. Registering seats below!',
                          );
                        }}
                        className="bg-[#D32F2F] text-bone font-mono-ui text-[10px] font-bold px-3 py-1.5 uppercase hover:bg-[#8B0000]"
                      >
                        BOX OFFICE
                      </button>
                      <button
                        onClick={() => {
                          playClack();
                          alert(
                            'Covenant agreement locked. Under local protocol, your account will be subjected to random critical fail rolls.',
                          );
                        }}
                        className="text-bone/70 hover:text-bone text-[10px] font-mono-ui uppercase underline"
                      >
                        COVENANT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The Triptych of Fate Module Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="border-4 border-obsidian bg-[#E4DFD3] p-5 flex flex-col shadow-[8px_8px_0px_rgba(0,0,0,0.85)] font-normal justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start border-b border-obsidian/20 pb-2 mb-2 font-bold">
                    <span className="font-mono-ui text-[9px] text-obsidian uppercase bg-white/60 px-1.5 py-0.5 border border-obsidian">
                      MODULE 01
                    </span>
                    <span className="font-mono-ui text-[9px] uppercase tracking-wider text-gray-500">
                      DATABASE
                    </span>
                  </div>
                  <h3 className="font-archive text-2xl uppercase mt-2 leading-none">
                    THE TOME OF SOULS
                  </h3>
                  <p className="font-serif-body text-xs leading-relaxed text-obsidian/90">
                    The history of our network is not written by designers. It
                    is written by the corpses of your characters. Every action,
                    failures, and boss encounter is permanently etched into the
                    local Akashic ledger.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playClack();
                    window.location.hash = '#reliquary';
                  }}
                  className="font-mono-ui text-[10px] font-bold uppercase text-obsidian bg-white border-2 border-obsidian p-2 text-center mt-4 block w-full hover:bg-obsidian hover:text-bone transition-colors"
                >
                  BROWSE CEMETERY ARCHIVE
                </button>
              </div>

              {/* Card 2 */}
              <div className="border-4 border-[#D32F2F] bg-[#FFF9EA] p-5 flex flex-col shadow-[8px_8px_0px_rgba(0,0,0,0.85)] font-normal justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start border-b border-[#D32F2F]/20 pb-2 mb-2 font-bold">
                    <span className="font-mono-ui text-[9px] text-[#D32F2F] uppercase bg-red-100 px-1.5 py-0.5 border border-[#D32F2F]">
                      MODULE 02
                    </span>
                    <span className="font-mono-ui text-[9px] uppercase text-[#D32F2F]">
                      LIVE MUSE
                    </span>
                  </div>
                  <h3 className="font-archive text-2xl text-[#D32F2F] uppercase mt-2 leading-none">
                    THE VENGEFUL MUSE
                  </h3>
                  <p className="font-serif-body text-xs leading-relaxed text-obsidian/90">
                    Watch the Adversarial Director in real-time. Our LLM core
                    does not write standard dialogue; it writes active
                    consequence. Witness the engine actively hunting server
                    griefers, vaccinating pathogens, and altering physics.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playClack();
                    alert(
                      'Direct Muse diagnostic uplink hooked! Log reports 100% operational efficiency with zero hallucination leaks.',
                    );
                  }}
                  className="font-mono-ui text-[10px] font-bold uppercase text-white bg-[#D32F2F] border-2 border-black p-2 text-center mt-4 block w-full hover:bg-black transition-colors"
                >
                  INTERCEPT MUSE TELEMETRY
                </button>
              </div>

              {/* Card 3 */}
              <div className="border-4 border-obsidian bg-[#E4DFD3] p-5 flex flex-col shadow-[8px_8px_0px_rgba(0,0,0,0.85)] font-normal justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start border-b border-obsidian/20 pb-2 mb-2 font-bold">
                    <span className="font-mono-ui text-[9px] text-obsidian uppercase bg-white/60 px-1.5 py-0.5 border border-obsidian">
                      MODULE 03
                    </span>
                    <span className="font-mono-ui text-[9px] uppercase tracking-wider text-gray-500">
                      MATHS CODE
                    </span>
                  </div>
                  <h3 className="font-archive text-2xl uppercase mt-2 leading-none">
                    THE CALCULUS OF FATE
                  </h3>
                  <p className="font-serif-body text-xs leading-relaxed text-obsidian/90">
                    There are no respawns. There are no safe zones. Our engine
                    translates your poetry into lethal tabletop mathematics on a
                    10Hz edge-server heartbeat. Prepare your formulas carefully.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playClack();
                    alert(
                      'Tabletop rule matrices accessed. Formula output loaded to memory.',
                    );
                  }}
                  className="font-mono-ui text-[10px] font-bold uppercase text-obsidian bg-white border-2 border-obsidian p-2 text-center mt-4 block w-full hover:bg-obsidian hover:text-bone transition-colors"
                >
                  STUDY MATHEMATICAL RULES
                </button>
              </div>
            </section>

            {/* Combined Interactive Dice Console & Character Booking Roster */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
              {/* THE REPERTOIRE COVENANT LIVES - Character Slot booker */}
              <section className="lg:col-span-7 bg-charcoal text-bone border-4 border-obsidian p-6 md:p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.85)]">
                <div className="border-b-2 border-bone/20 pb-3 mb-6 flex justify-between items-end">
                  <div>
                    <h3 className="font-archive text-2xl uppercase">
                      THE REPERTOIRE LIVES
                    </h3>
                    <p className="text-[10px] font-mono-ui text-bone/50 uppercase tracking-widest mt-1">
                      Once a server soul is bound, the class slot locks
                      globally.
                    </p>
                  </div>
                  <span className="bg-[#D32F2F] text-bone font-mono-ui text-[9px] px-2 py-0.5 tracking-wider uppercase font-bold border border-black animate-pulse">
                    ACT_IV PROTOCOL
                  </span>
                </div>

                <div className="space-y-4">
                  {originalSeats.map((seat) => {
                    const isReserved = bookedSeats.includes(seat.id);
                    const statusText = isReserved ? 'RESERVED' : seat.status;
                    const canReserve =
                      seat.status === 'AVAILABLE' && !isReserved;

                    return (
                      <div
                        key={seat.id}
                        className={`border-2 p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3 transition-colors ${
                          statusText === 'AVAILABLE'
                            ? 'border-bone/20 bg-black/40 hover:bg-black/80'
                            : statusText === 'RESERVED'
                              ? 'border-[#D4AF37] bg-black text-[#D4AF37]'
                              : 'border-bone/10 opacity-40 bg-zinc-900/50'
                        }`}
                      >
                        <div className="space-y-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-archive text-xl uppercase tracking-wider">
                              {seat.role}
                            </span>
                            <span
                              className={`text-[8px] font-mono-ui font-bold px-1.5 py-0.5 ${
                                statusText === 'AVAILABLE'
                                  ? 'bg-green-600 text-bone'
                                  : statusText === 'RESERVED'
                                    ? 'bg-[#D4AF37] text-obsidian'
                                    : 'bg-[#D32F2F] text-bone'
                              }`}
                            >
                              {statusText}
                            </span>
                          </div>
                          <span className="block font-mono-ui text-[9px] text-bone/40 uppercase">
                            {seat.spec}
                          </span>
                          <p className="font-serif-body text-xs text-bone/70 italic leading-tight">
                            {seat.characterBio}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          {canReserve ? (
                            <button
                              onClick={() => onBookSeat(seat.id)}
                              className="w-full sm:w-auto bg-white text-obsidian font-archive text-xs font-bold uppercase px-4 py-2 border-2 border-obsidian hover:bg-[#D32F2F] hover:text-bone transition-all"
                            >
                              BOOK SOUL — ${seat.price}
                            </button>
                          ) : isReserved ? (
                            <div className="text-right font-mono-ui text-[10px]">
                              <p className="font-bold">BOOKED BY YOU</p>
                              <span className="text-white/40">
                                ID: @elliotbradly
                              </span>
                            </div>
                          ) : (
                            <span className="text-stone-500 font-mono-ui text-xs font-bold uppercase">
                              OUT OF VOID
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* THE NEON MUTINY Pending block */}
                <div className="border-2 border-dashed border-bone/15 p-4 bg-black/20 text-[#E4DFD3]/70 font-mono-ui text-xs text-left mt-6 space-y-2">
                  <h5 className="font-archive text-sm text-[#D32F2F]">
                    ACT I: THE NEON MUTINY
                  </h5>
                  <p className="text-[10px] leading-relaxed font-medium">
                    CRUCIBLE: SEC-07 • AUDIENCE SEAT COVENANT PENDING INDEX
                    LOCKS IN 24 SECONDS.
                  </p>
                </div>
              </section>

              {/* INTERACTIVE TABLETOP DICE CONSOLE - Highly requested visual flair */}
              <section className="lg:col-span-5 bg-[#E4DFD3] border-4 border-obsidian p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.85)] text-left flex flex-col justify-between">
                <div>
                  <div className="border-b-2 border-obsidian pb-2 mb-4 flex justify-between items-center bg-white/20 p-2 border">
                    <span className="font-archive text-lg uppercase flex items-center gap-1">
                      <Dices className="w-5 h-5 text-[#D32F2F]" />
                      DICE_CONSOLE.EXE
                    </span>
                    <span className="font-mono-ui text-[8px] uppercase tracking-wider bg-obsidian text-bone px-1 py-0.5">
                      MATHS CORE
                    </span>
                  </div>

                  <p className="font-serif-body text-xs mt-2 leading-relaxed text-obsidian/80">
                    Select a mechanical polyhedral die setting below to transmit
                    a true randomized roll output:
                  </p>

                  {/* Polyhedral option Grid */}
                  <div className="grid grid-cols-6 gap-1.5 my-4 font-mono-ui text-[11px] font-bold">
                    {[4, 6, 8, 10, 12, 20].map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          playClack();
                          setSelectedDie(d);
                        }}
                        className={`py-2 text-center border-2 border-obsidian transition-colors ${selectedDie === d ? 'bg-obsidian text-bone' : 'bg-white hover:bg-[#FFF9EA]'}`}
                      >
                        d{d}
                      </button>
                    ))}
                  </div>

                  {/* Core Rolling Display Area */}
                  <div className="bg-obsidian text-bone text-center p-6 border-2 border-obsidian shadow-inner flex flex-col items-center justify-center min-h-[120px] relative">
                    <div className="absolute top-2 right-2 font-mono-ui text-[8px] text-[#D4AF37]">
                      CLK RE-RAMP READY
                    </div>
                    {isRolling ? (
                      <div className="flex flex-col items-center gap-2">
                        <Dices className="w-7 h-7 text-[#D32F2F] animate-spin" />
                        <span className="font-mono-ui text-[10px] uppercase tracking-widest text-[#D32F2F] animate-pulse">
                          ROLLING...
                        </span>
                      </div>
                    ) : activeDieResult !== null ? (
                      <div className="space-y-1">
                        <div className="font-archive text-5xl text-[#D4AF37] leading-none">
                          {activeDieResult}
                        </div>
                        <div className="font-mono-ui text-[9px] uppercase tracking-widest text-[#E4DFD3]/60">
                          OUT OF d{selectedDie}
                        </div>
                      </div>
                    ) : (
                      <div className="text-bone/50 font-serif-body text-xs italic">
                        Uplink dice configuration to initiate roll
                      </div>
                    )}
                  </div>

                  <button
                    disabled={isRolling}
                    onClick={handleRollDice}
                    className="w-full bg-[#D32F2F] text-bone hover:bg-[#8B0000] border-2 border-black font-archive text-sm uppercase py-2.5 mt-3 tracking-widest transition-transform font-bold disabled:opacity-50"
                  >
                    🎲 TRIGGER PHYSICAL ROLL
                  </button>
                </div>

                {/* Rolled logs history list */}
                <div className="mt-4 border-t border-obsidian/20 pt-4 font-mono-ui text-[10px] text-obsidian/70">
                  <span className="font-bold block uppercase text-[8px] tracking-wider mb-1.5 text-obsidian/85">
                    ROLL LOG DIAGNOSTICS:
                  </span>
                  <div className="h-[95px] overflow-y-auto space-y-1 leading-tight pr-1.5 bg-white/30 p-2 border">
                    {diceHistory.map((h, i) => (
                      <div key={i} className="truncate">
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* THE CHEAP SEATS - General Admission pass subscribing & livepolls */}
            <section className="bg-white text-obsidian border-4 border-obsidian p-6 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.85)]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <h3 className="font-archive text-3.5xl text-obsidian uppercase leading-none">
                    GENERAL ADMISSION
                  </h3>
                  <div className="font-mono-ui text-[10px] text-obsidian/60 tracking-widest uppercase border-b-2 border-obsidian pb-1 font-bold">
                    THE CHEAP SEATS // VOYEUR COVENANT TIER
                  </div>
                  <p className="font-serif-body text-sm leading-relaxed text-obsidian/95 font-medium">
                    Cannot book an available soul role? You can still witness
                    the core performance tragedy. General Admission passes grant
                    you access to the interactive LLM Voting modules and
                    Obituary ticker feeds. You cannot swing physical weapons,
                    but you can vote to trigger catastrophes.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        playClack();
                        alert(
                          'Cheap Seats Subscription added! General Admission unlocked on your simulated local terminal.',
                        );
                      }}
                      className="bg-obsidian text-bone hover:bg-[#D32F2F] px-6 py-3 font-archive text-xs uppercase tracking-widest cursor-pointer border-2 border-black"
                    >
                      CLAIM COVENANT PASS — $4.99/mo
                    </button>
                    <button
                      onClick={() => {
                        playClack();
                        alert(
                          'Global Obituary Ticker active. Registered deceased souls: Paladin (Acid Gland), Mage (Spell-burn Cold %100).',
                        );
                      }}
                      className="font-mono-ui text-[10px] font-bold uppercase underline"
                    >
                      OBITUARY TICKER FILES
                    </button>
                  </div>
                </div>

                {/* Interactive Audience voting sabotage poll simulator */}
                <div className="md:col-span-5 bg-[#E4DFD3] border-4 border-obsidian p-5 shadow-inner space-y-4">
                  <div className="border-b border-obsidian/30 pb-1.5 flex justify-between items-center text-xs font-mono-ui">
                    <span className="font-bold text-[#D32F2F] animate-pulse">
                      ● CROWD VOTING MODULE
                    </span>
                    <span className="text-[10px] bg-white px-1 border">
                      ACTIVE
                    </span>
                  </div>

                  <p className="font-serif-body text-[11px] text-obsidian/85 font-semibold">
                    The current character is approaching the Rusted Vault.
                    Choose a catastrophe to trigger in the crucible:
                  </p>

                  {/* Voter options */}
                  <div className="space-y-2 font-mono-ui text-[11px]">
                    {/* Pathogen option */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold">
                        <button
                          onClick={() => handleVoteSabotage('pathogen')}
                          disabled={userVotedOption !== null}
                          className={`text-left underline hover:text-[#D32F2F] ${userVotedOption === 'pathogen' ? 'text-[#D32F2F] font-extrabold' : ''}`}
                        >
                          {userVotedOption === 'pathogen'
                            ? '✓ INFECT TOXIC PATHOGEN'
                            : 'INFECT TOXIC PATHOGEN'}
                        </button>
                        <span>{votingStats.pathogen}%</span>
                      </div>
                      <div className="w-full bg-obsidian/10 h-2 border border-obsidian">
                        <div
                          className="bg-[#D32F2F] h-full transition-all duration-500"
                          style={{ width: `${votingStats.pathogen}%` }}
                        />
                      </div>
                    </div>

                    {/* Cage option */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold">
                        <button
                          onClick={() => handleVoteSabotage('cage')}
                          disabled={userVotedOption !== null}
                          className={`text-left underline hover:text-[#D32F2F] ${userVotedOption === 'cage' ? 'text-[#D32F2F] font-extrabold' : ''}`}
                        >
                          {userVotedOption === 'cage'
                            ? '✓ DROP RUSTED SPIRE CAGE'
                            : 'DROP RUSTED SPIRE CAGE'}
                        </button>
                        <span>{votingStats.cage}%</span>
                      </div>
                      <div className="w-full bg-obsidian/10 h-2 border border-obsidian">
                        <div
                          className="bg-[#D32F2F] h-full transition-all duration-500"
                          style={{ width: `${votingStats.cage}%` }}
                        />
                      </div>
                    </div>

                    {/* Gravity option */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold">
                        <button
                          onClick={() => handleVoteSabotage('gravity')}
                          disabled={userVotedOption !== null}
                          className={`text-left underline hover:text-[#D32F2F] ${userVotedOption === 'gravity' ? 'text-[#D32F2F] font-extrabold' : ''}`}
                        >
                          {userVotedOption === 'gravity'
                            ? '✓ REVERSE SERVER GRAVITY'
                            : 'REVERSE SERVER GRAVITY'}
                        </button>
                        <span>{votingStats.gravity}%</span>
                      </div>
                      <div className="w-full bg-obsidian/10 h-2 border border-obsidian">
                        <div
                          className="bg-[#D32F2F] h-full transition-all duration-500"
                          style={{ width: `${votingStats.gravity}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {userVotedOption !== null && (
                    <div className="bg-white text-[10px] font-mono-ui font-bold p-1.5 text-center border-l-4 border-green-600 text-green-700">
                      VOTE ACCEPTED ➔ TRANSMITTING IMPULSE SIGNAL TO GRIDS
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* LORE DETAILS OVERLAY DESIGN MODAL (For Worlds Compendium) */}
      <AnimatePresence>
        {selectedWorld && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#E4DFD3] text-obsidian border-4 border-obsidian max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative scrollbar my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playClack();
                  setSelectedWorld(null);
                }}
                className="absolute top-4 right-4 p-2 border-2 border-obsidian bg-white hover:bg-obsidian hover:text-bone transition-colors"
                title="Exit Lore Docket"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 text-left">
                <span className="font-mono-ui text-[10px] text-[#D32F2F] tracking-widest font-bold uppercase bg-red-100 p-1 border border-[#D32F2F]">
                  {selectedWorld.badge} COMPENDIUM DOCKET
                </span>
                <h3 className="font-archive text-4xl uppercase tracking-widest text-obsidian pt-1">
                  {selectedWorld.title} WORLDS
                </h3>
                <p className="font-mono-ui text-xs text-stone-500 uppercase italic">
                  {selectedWorld.subtitle}
                </p>
              </div>

              {/* Cover Banner */}
              <div className="border-2 border-obsidian aspect-video w-full overflow-hidden relative">
                <img
                  referrerPolicy="no-referrer"
                  src={selectedWorld.coverUrl}
                  alt={selectedWorld.title}
                  className="w-full h-full object-cover saturate-[0.8]"
                />
              </div>

              <div className="text-left space-y-4 font-normal">
                <h5 className="font-archive text-lg uppercase border-b border-obsidian/30 pb-1">
                  System & Lore Integration
                </h5>
                <p className="font-serif-body text-sm leading-relaxed text-obsidian/85 text-justify font-medium">
                  {selectedWorld.expandedLore}
                </p>

                {/* Sub features list */}
                <div className="p-4 bg-white/40 border border-obsidian/20 font-mono-ui text-xs space-y-2">
                  <span className="text-[10px] font-bold text-obsidian/50 block uppercase">
                    RECOMMENDED RULEBOOK MODULE FEATURE INTEGRATIONS:
                  </span>
                  {selectedWorld.features.map((f, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <ShieldCheck className="w-4 h-4 text-[#D32F2F] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call-to-actions */}
              <div className="pt-4 border-t border-obsidian/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-left">
                  <span className="font-mono-ui text-[9px] text-gray-500 uppercase block">
                    RETAIL SOURCE LICENSE PRICE
                  </span>
                  <p className="font-archive text-2xl text-obsidian">
                    ${selectedWorld.price.toFixed(2)} USD
                  </p>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      playClack();
                      onAddToCart();
                      setSelectedWorld(null);
                    }}
                    className="flex-1 sm:flex-none bg-[#D32F2F] text-bone hover:bg-obsidian border-2 border-black px-6 py-3 font-archive text-xs uppercase tracking-widest text-center"
                  >
                    ADD RULEBOOK TO CRATE
                  </button>
                  <button
                    onClick={() => {
                      playClack();
                      setSelectedWorld(null);
                    }}
                    className="flex-1 sm:flex-none bg-white hover:bg-[#E4DFD3] border border-obsidian px-5 py-3 font-mono-ui text-xs uppercase tracking-wide text-center"
                  >
                    CLOSE DOCKET
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
