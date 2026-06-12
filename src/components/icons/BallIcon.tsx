import type { CSSProperties } from 'react';

interface BallIconProps {
  className?: string;
  size?: number;
  style?: CSSProperties;
  variant?: 'full' | 'minimal';
  animated?: boolean;
}

export function BallIcon({ className = '', size = 40, style, variant = 'full', animated = false }: BallIconProps) {
  const id = `ball-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? 'anim-roll' : ''}`}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-ball`} cx="0.35" cy="0.32" r="0.85">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="#0a0e1c" opacity="0.5" />
      <circle cx="32" cy="32" r="28" fill={`url(#${id}-ball)`} stroke="#0a0e1c" strokeWidth="1" />
      {variant === 'full' && (
        <g stroke="#0a0e1c" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" fill="#0a0e1c">
          <polygon points="32,15 41,22 38,32 26,32 23,22" />
          <line x1="32" y1="15" x2="32" y2="6" />
          <line x1="38" y1="32" x2="49" y2="36" />
          <line x1="26" y1="32" x2="15" y2="36" />
          <line x1="23" y1="22" x2="12" y2="20" />
          <line x1="41" y1="22" x2="52" y2="20" />
        </g>
      )}
      {variant === 'minimal' && (
        <g stroke="#0a0e1c" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <polygon points="32,15 41,22 38,32 26,32 23,22" fill="#0a0e1c" />
        </g>
      )}
      <ellipse cx="22" cy="22" rx="10" ry="5" fill={`url(#${id}-shine)`} opacity="0.55" />
    </svg>
  );
}
