import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';

interface EventsProps {
  playClack: () => void;
  data?: {
    title?: string;
    subtitle?: string;
    items?: Array<{ date: string; name: string; location: string }>;
  };
}

export function Events({ playClack, data }: EventsProps) {
  const title = data?.title || 'Events';
  const subtitle = data?.subtitle || 'UPCOMING EVENTS';
  const eventsList = data?.items || [
    { date: 'February 20-23', name: 'GenghisCon', location: 'Denver, US' },
    { date: 'March 1-5', name: 'GAMA', location: 'Louisville, US' },
    {
      date: 'March 5-8',
      name: 'Emerald City Comic Con',
      location: 'Seattle, US',
    },
    { date: 'March 19-22', name: 'GaryCon', location: 'Lake Geneva, US' },
    { date: 'March 25-29', name: 'Adepticon', location: 'Milwaukee, US' },
    { date: 'March 26-29', name: 'Pax East', location: 'Boston, US' },
    { date: 'April 3-5', name: 'GothCon', location: 'Gothenburg, SE' },
    { date: 'April 11', name: 'Salute!', location: 'London, United Kingdom' },
    { date: 'May 21-24', name: 'MomoCon', location: 'Atlanta, US' },
    { date: 'May 27-29', name: 'ACD Expo', location: 'Madison, US' },
    {
      date: 'May 30-31',
      name: 'Comic Con Stockholm Summer',
      location: 'Stockholm, Sweden',
    },
    { date: 'May 29-31', name: 'UK Games Expo', location: 'Birmingham, UK' },
    { date: 'June 18-22', name: 'Origins', location: 'Columbus, US' },
    { date: 'July 31-Aug 3', name: 'Gencon', location: 'Indianapolis, US' },
    { date: 'August 2-9', name: 'Medeltidsveckan', location: 'Visby, Sweden' },
    { date: 'September 4-7', name: 'Pax West', location: 'Seattle, US' },
    {
      date: 'September 4-6',
      name: 'Tabletop Scotland',
      location: 'Ingliston, United Kingdom',
    },
    {
      date: 'September 25-28',
      name: 'Bokmässan',
      location: 'Göteborg, Sweden',
    },
    { date: 'October 16-19', name: 'Game Hole Con', location: 'Madison, US' },
    { date: 'October 17', name: 'Spelkongress', location: 'Stockholm, Sweden' },
    { date: 'October 23-26', name: 'Essen Spiel', location: 'Essen, Germany' },
    {
      date: 'October 30 - Nov 1',
      name: 'Comic Con Stockholm Winter',
      location: 'Stockholm, Sweden',
    },
    {
      date: 'November 28',
      name: 'Dragonmeet',
      location: 'London, United Kingdom',
    },
    {
      date: 'December 4-6',
      name: 'PaxUnplugged',
      location: 'Philadelphia, US',
    },
    {
      date: 'December 5-6',
      name: 'Nördarnas julmarknad',
      location: 'Stockholm, Sweden',
    },
  ];

  return (
    <section
      id="events"
      className="scroll-mt-36 bg-[#1C1C1C] text-[#F9F6EE] border-4 border-obsidian shadow-[6px_6px_0px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      {/* Hero Header Banner */}
      <div className="relative h-44 sm:h-52 bg-slate-950 overflow-hidden border-b-4 border-obsidian">
        {/* Dark smoky atmospheric game convention overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60 grayscale filter contrast-125 transition-transform duration-700 hover:scale-[1.03]"
          style={{
            backgroundImage: `url('/img/000.png')`,
          }}
        ></div>

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>

        {/* Superimposed big title */}
        <div className="absolute bottom-6 left-6 md:left-10 z-10">
          <motion.h2
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-bone leading-none tracking-tight font-black"
          >
            {title}
          </motion.h2>
        </div>
      </div>

      {/* Path Breadcrumb Bar */}
      <div className="bg-[#111111] px-6 py-2.5 border-b border-obsidian text-[10px] font-mono-ui tracking-widest text-[#D32F2F] font-bold">
        START / {title.toUpperCase()}
      </div>

      {/* Main Content Split Grid */}
      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Mission Description */}
        <div className="md:col-span-6 space-y-8 text-left">
          <div className="space-y-4">
            <h3 className="font-serif-display text-2.5xl sm:text-3xl md:text-4.5xl text-bone leading-tight tracking-tight">
              You can meet us at conventions, festivals, and industry
              gatherings, to can discover our games, meet the people behind
              them, and experience our worlds firsthand.
            </h3>
            <div className="w-16 h-1.5 bg-[#D32F2F]"></div>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-[#E4DFD3]/85 font-serif-body leading-relaxed normal-case">
            <p>
              From demos and previews to talks and tournaments, our presence at
              events is about sharing stories, connecting with players, and
              celebrating roleplaying wherever it thrives.
            </p>
            <p>Check back here to see where we&apos;re heading next.</p>
          </div>
        </div>

        {/* Right Column: Upcoming Events List */}
        <div className="md:col-span-6 text-left border-t-2 border-dashed border-bone/10 md:border-t-0 md:border-l-2 md:border-dashed md:border-bone/20 pt-6 md:pt-0 md:pl-10 space-y-5">
          <h4 className="font-archive text-xl tracking-wider text-bone uppercase flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            {subtitle}
          </h4>

          {/* Simple Bullet Lists aligned as standard in the reference image */}
          <ul className="space-y-3.5 text-xs sm:text-sm text-[#E4DFD3]/90 font-serif-body leading-normal normal-case">
            {eventsList.map((evt, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#D32F2F] mt-1 shrink-0">•</span>
                <span>
                  <strong className="text-bone font-medium">{evt.date}</strong>{' '}
                  {evt.name},{' '}
                  <span className="text-bone/60">{evt.location}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
