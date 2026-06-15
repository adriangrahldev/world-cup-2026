import { useState, useEffect } from 'react';
import { Trophy, Star, MapPin, Clock } from 'lucide-react';
import { BallIcon } from './icons/BallIcon';
import { worldCupMatches, getMatchUtcDate, getVisitorTimezone } from '../data/matches';
import { formatMatchTime, formatMatchDate } from '../lib/format';
import type { Translations, Locale } from '../i18n/translations';

interface FinalSectionProps {
  t: Translations;
  locale: Locale;
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = target.getTime() - now;
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds, finished: false };
}

const PAD = (n: number) => String(n).padStart(2, '0');

export function FinalSection({ t, locale }: FinalSectionProps) {
  const finalMatch = worldCupMatches.find(m => m.stage === 'final');
  const visitorTz = getVisitorTimezone();
  const finalUtc = finalMatch ? getMatchUtcDate(finalMatch) : null;
  const countdown = useCountdown(finalUtc ?? new Date(0));

  const dateStr = finalMatch
    ? formatMatchDate(finalMatch, locale, visitorTz, { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const timeStr = finalMatch
    ? formatMatchTime(finalMatch, locale, visitorTz)
    : '';

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
            <rect x="20" y="20" width="760" height="360" stroke="#fbbf24" strokeWidth="1" fill="none" />
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

            <h2 id="final-heading" className="text-3xl md:text-5xl font-black tracking-tight text-cream-50 mb-2">
              {t.final.title}
            </h2>

            {dateStr && (
              <p className="text-gold-400 font-bold text-base md:text-lg mb-1 tabular-nums">
                {dateStr} · {timeStr}
              </p>
            )}
            {finalMatch && (
              <p className="text-cream-100/60 mb-6 flex items-center justify-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold-400" />
                {finalMatch.venue} · {finalMatch.city}
              </p>
            )}

            {/* Countdown */}
            {!countdown.finished ? (
              <div
                className="inline-flex items-stretch gap-2 md:gap-3 mb-6"
                role="timer"
                aria-label={locale === 'es' ? 'Cuenta regresiva para la final' : 'Countdown to the final'}
              >
                <CountUnit value={countdown.days} label={locale === 'es' ? 'Días' : 'Days'} locale={locale} />
                <span className="text-2xl md:text-3xl font-black text-gold-400/40 self-center">:</span>
                <CountUnit value={countdown.hours} label={locale === 'es' ? 'Hs' : 'Hrs'} locale={locale} />
                <span className="text-2xl md:text-3xl font-black text-gold-400/40 self-center">:</span>
                <CountUnit value={countdown.minutes} label={locale === 'es' ? 'Min' : 'Min'} locale={locale} />
                <span className="text-2xl md:text-3xl font-black text-gold-400/40 self-center">:</span>
                <CountUnit value={countdown.seconds} label={locale === 'es' ? 'Seg' : 'Sec'} locale={locale} />
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6">
                <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                <span className="text-gold-300 font-semibold text-sm">
                  {locale === 'es' ? '¡La final ya se jugó!' : 'The final has been played!'}
                </span>
              </div>
            )}

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

function CountUnit({ value, label, locale }: { value: number; label: string; locale: Locale }) {
  return (
    <div className="flex flex-col items-center min-w-[58px] md:min-w-[72px]">
      <div className="bg-night-900/60 border border-gold-500/15 rounded-xl px-2 py-2 md:px-3 md:py-2.5 backdrop-blur-sm">
        <span className="block text-2xl md:text-4xl font-black text-cream-50 tabular-nums leading-none">
          {PAD(value)}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-cream-100/40 mt-1.5 font-semibold">
        {label}
      </span>
    </div>
  );
}
