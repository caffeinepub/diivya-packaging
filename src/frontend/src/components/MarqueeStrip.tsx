export default function MarqueeStrip() {
  const items = [
    "QUALITY GUARANTEED",
    "CUSTOM SIZES",
    "FAST DELIVERY",
    "IN-HOUSE PRINTING",
    "10+ YEARS EXPERIENCE",
    "TRUSTED BY 500+ CLIENTS",
    "CORRUGATED BOXES",
    "RIGID BOXES",
    "OFFSET PRINTING PRESS",
  ];

  const text = `${items.join(" \u00b7 ")} \u00b7 `;

  return (
    <div className="relative overflow-hidden bg-secondary py-4 border-y border-secondary/80">
      {/* Left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap animate-marquee">
        {/* Duplicate for seamless loop */}
        <span className="flex items-center gap-0 text-primary-foreground font-black uppercase tracking-[0.18em] text-sm pr-0">
          {text} {text}
        </span>
        <span
          className="flex items-center gap-0 text-primary-foreground font-black uppercase tracking-[0.18em] text-sm pr-0"
          aria-hidden="true"
        >
          {text} {text}
        </span>
      </div>
    </div>
  );
}
