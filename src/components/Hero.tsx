import { useEffect, useState } from 'react';
import { Calendar, Check, ChevronDown, Globe2, Users, MapPin, CalendarDays } from 'lucide-react';
import { BallIcon } from './icons/BallIcon';
import type { Translations } from '../i18n/translations';

interface HeroProps {
  t: Translations;
  locale: string;
  onExport: () => void;
  isExporting: boolean;
  exportSuccess: boolean;
  countryName: string;
}

const STAT_KEYS = ['countries', 'teams', 'matches', 'venues'] as const;
const STAT_VALUES = ['3', '48', '104', '16'];
const STAT_ICONS = [Globe2, Users, CalendarDays, MapPin];

export function Hero({ t, locale, onExport, isExporting, exportSuccess, countryName }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center transition-all duration-1000 ease-soft ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pitch-500/10 border border-pitch-500/25 mb-8">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-pitch-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-pitch-400" />
            </span>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-pitch-200">
              {t.hero.badge}
            </span>
          </div>

          {/* Title with floating ball (contained) */}
          <div className="relative max-w-3xl mx-auto">
            <div className="hidden md:block absolute -top-2 right-0 lg:-right-4 anim-float-slow pointer-events-none">
              <BallIcon size={56} variant="full" />
            </div>

            <h1 id="hero-heading" className="text-display text-balance relative">
              <span className="block text-cream-50">{t.hero.title1}</span>
              <span className="block bg-gradient-to-br from-pitch-300 via-pitch-400 to-pitch-600 bg-clip-text text-transparent">
                {t.hero.title2}
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-cream-100/70 mt-7 mb-2 font-light max-w-xl mx-auto text-balance">
            {t.hero.subtitle}
          </p>
          <p className="text-sm text-pitch-300/80 font-medium tracking-wide">
            {t.hero.edition} · {t.hero.location}
          </p>

          {countryName && countryName !== 'auto' && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-cream-100/50">
              <span className="w-1 h-1 rounded-full bg-pitch-400" />
              <span>
                {locale === 'es' ? `Mostrando datos para ${countryName}` : `Showing data for ${countryName}`}
              </span>
            </div>
          )}

          {/* CTA */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onExport}
              disabled={isExporting}
              className="btn-primary disabled:opacity-70 disabled:cursor-wait"
            >
              {isExporting ? (
                <>
                  <span className="w-4 h-4 border-2 border-night-950/30 border-t-night-950 rounded-full animate-spin" />
                  <span>{t.hero.exporting}</span>
                </>
              ) : exportSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>{t.hero.exported}</span>
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  <span>{t.hero.ctaCalendar}</span>
                </>
              )}
            </button>
            <button
              onClick={() => document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-cream-50 text-sm font-semibold transition-all duration-300 group"
            >
              {locale === 'es' ? 'Ver partidos' : 'View matches'}
              <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
            <p className="text-xs text-cream-100/40 sm:absolute sm:mt-20">{t.hero.ctaCalendarHint}</p>
          </div>

          {/* Stats — equalized heights */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
            {STAT_KEYS.map((key, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <div
                  key={key}
                  className="surface surface-hover rounded-2xl px-4 py-6 text-center group cursor-default flex flex-col items-center justify-center min-h-[140px]"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="inline-grid place-items-center w-10 h-10 rounded-xl bg-pitch-500/10 border border-pitch-500/20 mb-3 group-hover:bg-pitch-500/15 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-pitch-300" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-cream-50 tracking-tight leading-none">
                    {STAT_VALUES[i]}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-cream-100/50 mt-2 font-semibold">
                    {t.stats[key]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 flex justify-center anim-fade-in" style={{ animationDelay: '1.2s' }}>
          <button
            onClick={() => document.getElementById('upcoming')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1.5 text-cream-100/40 hover:text-pitch-300 transition-colors group"
            aria-label={t.hero.scroll}
          >
            <span className="text-[10px] uppercase tracking-[0.22em] font-semibold">{t.hero.scroll}</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
