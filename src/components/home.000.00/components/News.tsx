import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowRight, Tag, Mail, BookOpen, Check } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Update' | 'Release' | 'Event' | 'Community';
  summary: string;
  content: string;
  imageUrl: string;
}

interface NewsProps {
  playClack: () => void;
  data?: {
    sectionTitle?: string;
    subtitle?: string;
    items?: NewsItem[];
  };
}

export function News({ playClack, data }: NewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const sectionTitle = data?.sectionTitle || 'Latest News';
  const subtitle = data?.subtitle || 'CHRONICLES & DISPATCHES';

  const newsItems: NewsItem[] = data?.items || [
    {
      id: 'news-1',
      title: 'The Tome of Souls Hardcover & Deluxe Editions Now Shipping',
      date: 'June 10, 2026',
      category: 'Release',
      summary:
        'Our massive fantasy sandbox campaign book is officially shipping. Embark on dark adventures through the shifting valleys.',
      content:
        'We are thrilled to announce that the physical editions of The Tome of Souls have arrived at our fulfillment centers and are heading out to backers and retailers world-wide. Crafted with cloth-wrapped covers, foil stamps, and heavyweight satin paper, this 320-page compendium provides complete sandbox rules, custom monster tables, and cohesive adventure modules. Order your copy in our shop today to receive immediate PDF files.',
      imageUrl: '/img/003.png',
    },
    {
      id: 'news-2',
      title: 'Camp Candor Set to Showcase Physical Assemblies at Gen Con 2026',
      date: 'May 28, 2026',
      category: 'Event',
      summary:
        'Visit Booth #441 for live-run demonstration scenarios, original canvas art previews, and limited custom dice sets.',
      content:
        'This August, Camp Candor is heading to Gen Con in Indianapolis! We will be hosting 24 active tabletop convention sessions led by our verified Free Agents. Stop by Booth #441 to meet our design crew, play mini-scenarios, and pick up convention-exclusive printable Character Passports and leather-debossed dice vaults.',
      imageUrl: '/img/004.png',
    },
    {
      id: 'news-3',
      title: 'Workshop Release: High-Fidelity PDF Layout Templates Updated',
      date: 'April 15, 2026',
      category: 'Update',
      summary:
        'Empower your house rules using our updated publisher layout assets, character sheet PDFs, and print matrices.',
      content:
        'We have updated our Community Content guidelines and uploaded professional Adobe InDesign and Scribus formatting templates to our public folder. Backers can now design, format, and share custom scenarios using official Camp Candor fonts and stylistic borders. All layout templates comply with our Open Gaming Covenant.',
      imageUrl: '/img/010.png',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      playClack();
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  const filteredNews =
    selectedCategory === 'ALL'
      ? newsItems
      : newsItems.filter(
          (item) => item.category.toUpperCase() === selectedCategory,
        );

  return (
    <section id="news" className="scroll-mt-36 space-y-8">
      {/* Section Title */}
      <div className="flex justify-between items-end border-b-2 border-obsidian pb-3">
        <div>
          <span className="font-mono-ui text-[10px] text-[#D32F2F] tracking-widest uppercase mb-1 font-bold block">
            {subtitle}
          </span>
          <h3 className="font-serif-display text-4xl text-obsidian tracking-tight">
            {sectionTitle}
          </h3>
        </div>

        {/* Category Pill Filters */}
        <div className="hidden sm:flex gap-1.5 font-mono-ui text-[10px] font-bold">
          {['ALL', 'RELEASE', 'EVENT', 'UPDATE'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClack();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 border transition-all ${selectedCategory === cat ? 'bg-obsidian text-bone border-obsidian' : 'bg-white text-obsidian border-obsidian/20 hover:border-obsidian'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile News Category Selector */}
      <div className="flex sm:hidden gap-1.5 overflow-x-auto pb-2 font-mono-ui text-[10px] font-bold">
        {['ALL', 'RELEASE', 'EVENT', 'UPDATE'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playClack();
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1 border shrink-0 transition-all ${selectedCategory === cat ? 'bg-obsidian text-bone border-obsidian' : 'bg-white text-obsidian border-obsidian/20'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid Layout */}
      <div className="grid grid-cols-1 gap-8">
        {/* Left Column: News Dispatches */}
        <div className="space-y-6">
          {filteredNews.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.id}
                className="bg-white border-4 border-obsidian overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,0.85)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.85)] transition-all duration-200"
              >
                <div
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Article Thumbnail */}
                  <div
                    className={`md:w-1/3 aspect-video md:aspect-auto border-b-2 md:border-b-0 ${isEven ? 'md:border-r-2' : 'md:border-l-2'} border-obsidian bg-stone-100 relative overflow-hidden`}
                  >
                    <img
                      referrerPolicy="no-referrer"
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Article Metadata & Summary */}
                  <div className="md:w-2/3 p-5 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[10px] font-mono-ui font-bold">
                        <span className="flex items-center gap-1 text-obsidian/60">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.date}
                        </span>
                        <span className="bg-charcoal text-bone text-[9px] px-2 py-0.5 uppercase tracking-wider rounded flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          {item.category}
                        </span>
                      </div>

                      <h4 className="font-archive text-xl uppercase leading-tight text-obsidian hover:text-[#D32F2F] transition-colors">
                        {item.title}
                      </h4>

                      <p className="font-serif-body text-sm text-obsidian/80 leading-relaxed font-normal">
                        {item.summary}
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          playClack();
                          setExpandedId(isExpanded ? null : item.id);
                        }}
                        className="font-mono-ui text-xs font-bold uppercase tracking-wider border-b-2 border-obsidian hover:border-[#D32F2F] hover:text-[#D32F2F] transition-colors pb-1 inline-flex items-center gap-1.5"
                      >
                        {isExpanded ? 'Collapse Report' : 'Read Article'}
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Article Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t-2 border-obsidian"
                    >
                      <div className="p-6 bg-[#FFF9EA]/40 text-obsidian font-serif-body text-sm leading-relaxed whitespace-pre-line border-l-4 border-[#D32F2F] font-normal">
                        <p className="mb-4">{item.content}</p>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-obsidian/10">
                          <BookOpen className="w-4 h-4 text-[#D32F2F]" />
                          <span className="font-mono-ui text-[10px] uppercase font-bold text-obsidian/50">
                            CAMPCANDOR // PUBLISHER BULLETINS INDEX
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
