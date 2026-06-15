import { Cpu } from 'lucide-react';

interface OperationalLandscapeProps {
  title?: string;
  imgRef?: string;
}

export default function OperationalLandscape({
  title = 'Operational Landscape',
  imgRef = 'IMG_REF_69.SYS',
}: OperationalLandscapeProps) {
  return (
    <div
      id="landscape-container"
      className="border-4 border-black bg-white overflow-hidden hard-shadow flex flex-col h-full font-mono"
    >
      <div className="bg-black text-white px-4 py-1 text-xs uppercase flex justify-between tracking-widest font-bold">
        <span className="flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 inline text-amber-500" /> {title}
        </span>
        <span>{imgRef}</span>
      </div>
      <div className="relative h-64 w-full flex-grow min-h-[220px]">
        <img
          id="historical-landscape-img"
          alt="Historical context theater seating mapping"
          className="w-full h-full object-cover grayscale contrast-125 brightness-95 opacity-90 inline-block"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxQrHqJjZyBOR9k5TDnJEFIYh6COJ6PY4Tbq66fmf9yV1BSJd4mCAdTEFEF-ebH9GSZUIii52XyeJhlncFoCEUYcj6Q2AQ1IzrCE2K8TWj3cvtUw3W0BHRdinj2bETUYvPaVGEwhbMCplkxkvMPG355MXB2sm8swORA4DesKfXZzzxfPeISYWOlsiXqb6N8jjtRyI88m70ejppE_nTbUh-V8yxweDTTlZ5KE2rqrfTvXbjWWQ39F9ehl_M7lNkteR6J7btMcW0wLbB"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
      </div>
    </div>
  );
}
