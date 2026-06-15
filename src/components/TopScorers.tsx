import { Trophy } from 'lucide-react';
import { getTopScorers } from '../data/stats';
import type { Locale } from '../i18n/translations';

interface TopScorersProps {
  locale: Locale;
  t: {
    title: string;
    subtitle: string;
    goals: string;
    penalty: string;
    ownGoal: string;
  };
  limit?: number;
}

export function TopScorers({ locale, t, limit = 8 }: TopScorersProps) {
  const scorers = getTopScorers(limit);
  if (scorers.length === 0) return null;

  const top = scorers[0];

  return (
    <section
      id="scorers"
      aria-label={t.title}
      className="relative z-10 px-4 md:px-8 py-12 md:py-16"
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-8">
          <div className="section-eyebrow justify-center mb-3">
            <span className="w-6 h-px bg-gold-400/60" />
            <span>{locale === 'es' ? 'Goleadores' : 'Top Scorers'}</span>
            <span className="w-6 h-px bg-gold-400/60" />
          </div>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle mt-2">{t.subtitle}</p>
        </header>

        <div className="surface rounded-3xl p-4 md:p-6">
          {/* Top scorer highlight */}
          <div className="flex items-center gap-3 md:gap-4 pb-4 mb-4 border-b border-white/5">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 grid place-items-center shadow-lg shadow-gold-700/30 ring-1 ring-gold-300/30 flex-shrink-0">
              <Trophy className="w-6 h-6 md:w-7 md:h-7 text-night-950" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-gold-400 font-semibold">
                {locale === 'es' ? 'Goleador' : 'Top Scorer'}
              </div>
              <div className="font-extrabold text-cream-50 text-lg md:text-xl leading-tight truncate">
                {top.player}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-cream-100/60 mt-0.5">
                {top.flag && (
                  <img src={top.flag} alt="" className="w-4 h-3 rounded-sm object-cover ring-1 ring-white/10" />
                )}
                <span className="truncate">{top.team}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-3xl md:text-4xl font-black text-gold-300 tabular-nums leading-none">
                {top.goals}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-cream-100/45 mt-0.5">
                {t.goals}
              </div>
            </div>
          </div>

          {/* Ranking list */}
          <ol className="space-y-1">
            {scorers.map((s, i) => (
              <li
                key={`${s.player}-${s.team}`}
                className="flex items-center gap-2 md:gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                <span className={`text-xs font-bold tabular-nums w-5 text-center ${
                  i === 0 ? 'text-gold-300' : i === 1 ? 'text-cream-100/70' : i === 2 ? 'text-amber-700' : 'text-cream-100/30'
                }`}>
                  {i + 1}
                </span>
                {s.flag && (
                  <img
                    src={s.flag}
                    alt=""
                    loading="lazy"
                    className="w-6 h-4 rounded-sm object-cover ring-1 ring-white/10 flex-shrink-0"
                  />
                )}
                <span className="flex-1 min-w-0 text-sm text-cream-50 truncate" title={s.player}>
                  {s.player}
                </span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {s.hasPenalty && (
                    <span className="text-[9px] uppercase tracking-wide text-cream-100/40 font-semibold">
                      ({t.penalty})
                    </span>
                  )}
                  {s.hasOwnGoal && (
                    <span className="text-[9px] uppercase tracking-wide text-cream-100/40 font-semibold">
                      ({t.ownGoal})
                    </span>
                  )}
                </div>
                <span className="text-base font-black text-cream-50 tabular-nums w-7 text-right">
                  {s.goals}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
