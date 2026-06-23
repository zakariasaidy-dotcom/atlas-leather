export function MarqueeSection() {
  const items = [
    "Cuir Pleine Fleur",
    "Artisanat Marocain",
    "Façonné à la Main",
    "Casablanca",
    "Qualité Premium",
    "Durabilité",
    "Authenticité",
    "Savoir-Faire",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="bg-ink py-4 overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 mx-6 text-[11px] uppercase tracking-[0.22em] text-cream-100/50"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-gold/50 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
