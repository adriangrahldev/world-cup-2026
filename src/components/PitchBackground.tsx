export function PitchBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-[#08111a] to-night-950" />

      {/* Pitch decoration */}
      <svg
        className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[1800px] opacity-[0.07]"
        viewBox="0 0 1200 600"
        fill="none"
      >
        <ellipse cx="600" cy="300" rx="580" ry="280" stroke="#4ade80" strokeWidth="1.5" />
        <line x1="20" y1="300" x2="1180" y2="300" stroke="#4ade80" strokeWidth="1.5" />
        <circle cx="600" cy="300" r="80" stroke="#4ade80" strokeWidth="1.5" />
        <rect x="20" y="200" width="100" height="200" stroke="#4ade80" strokeWidth="1.5" />
        <rect x="1080" y="200" width="100" height="200" stroke="#4ade80" strokeWidth="1.5" />
        <rect x="20" y="240" width="60" height="120" stroke="#4ade80" strokeWidth="1.5" />
        <rect x="1120" y="240" width="60" height="120" stroke="#4ade80" strokeWidth="1.5" />
        <circle cx="80" cy="300" r="8" fill="#4ade80" />
        <circle cx="1120" cy="300" r="8" fill="#4ade80" />
      </svg>

      {/* Soft glow orbs */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-pitch-500/15 blur-[140px] anim-float" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-[120px] anim-float-slow" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-pitch-700/10 blur-[120px] anim-float" />

      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-950/60 via-transparent to-night-950/60" />
    </div>
  );
}
