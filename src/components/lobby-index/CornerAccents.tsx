import React from 'react';

interface CornerAccentsProps {
  size?: string;
  borderColor?: string;
}

export default function CornerAccents({
  size = 'w-6 h-6',
  borderColor = 'border-black',
}: CornerAccentsProps) {
  return (
    <>
      <div
        className={`absolute top-0 left-0 ${size} border-b-2 border-r-2 ${borderColor} pointer-events-none`}
        id="corner-tl"
      />
      <div
        className={`absolute top-0 right-0 ${size} border-b-2 border-l-2 ${borderColor} pointer-events-none`}
        id="corner-tr"
      />
      <div
        className={`absolute bottom-0 left-0 ${size} border-t-2 border-r-2 ${borderColor} pointer-events-none`}
        id="corner-bl"
      />
      <div
        className={`absolute bottom-0 right-0 ${size} border-t-2 border-l-2 ${borderColor} pointer-events-none`}
        id="corner-br"
      />
    </>
  );
}
