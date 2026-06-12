import { Trophy, Star, MapPin } from 'lucide-react';
import { BallIcon } from './icons/BallIcon';
import type { Translations, Locale } from '../i18n/translations';

interface FinalSectionProps {
  t: Translations;
  locale: Locale;
}

export function FinalSection({ t, locale }: FinalSectionProps) {
  return (
    <section className="relative z-10 px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="relative surface rounded-3xl p-8 md:p-12 text-center overflow-hidden">
          {/* Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gold-500/15 blur-[100px] pointer-events-none" />

          {/* Pitch lines deco */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 800 400"
          >
            <ellipse cx="400" cy="200" rx="380" ry="180" stroke="#fbbf24" strokeWidth="1" fill="none" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="#fbbf24" strokeWidth="1" />
            <circle cx="400" cy="200" r="60" stroke="#fbbf24" strokeWidth="1" fill="none" />
          </svg>

          <div className="relative">
            {/* Trophy with ball */}
            <div className="relative inline-block mb-6">
              <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-gold-400 to-gold-600 grid place-items-center shadow-2xl shadow-gold-700/40 ring-1 ring-gold-300/30">
                <Trophy className="w-10 h-10 md:w-12 md:h-12 text-night-950 fill-night-950" />
              </div>
              <div className="absolute -bottom-2 -right-2 anim-float-slow">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cream-50 grid place-items-center shadow-xl ring-2 ring-gold-400/40">
                  <BallIcon size={36} variant="minimal" />
                </div>
              </div>
            </div>

            <h2 id="final-heading" className="text-3xl md:text-5xl font-black tracking-tight text-cream-50 mb-3">
              {t.final.title}
            </h2>

            <p className="text-gold-400 font-bold text-lg mb-2 tabular-nums">
              {t.final.date}
            </p>
            <p className="text-cream-100/60 mb-6 flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-400" />
              {t.final.venue}
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-500/30">
              <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
              <span className="text-gold-300 font-semibold text-sm">{t.final.tagline}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
