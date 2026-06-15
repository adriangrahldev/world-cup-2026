export function PitchBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-[#06090f] to-night-950" />

      {/* Subtle pitch lines, centered and masked */}
      <svg
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] max-w-none opacity-[0.035]"
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="40" y="40" width="1120" height="520" stroke="#4ade80" strokeWidth="1" />
        <line x1="40" y1="300" x2="1160" y2="300" stroke="#4ade80" strokeWidth="1" />
        <circle cx="600" cy="300" r="74" stroke="#4ade80" strokeWidth="1" />
        <rect x="40" y="210" width="92" height="180" stroke="#4ade80" strokeWidth="1" />
        <rect x="1068" y="210" width="92" height="180" stroke="#4ade80" strokeWidth="1" />
      </svg>

      {/* Soft glow orbs */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-pitch-500/15 blur-[140px] anim-float" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-[120px] anim-float-slow" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-pitch-700/10 blur-[120px] anim-float" />

      {/* Vignette top & bottom */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-950 to-transparent" />
    </div>
  );
}
