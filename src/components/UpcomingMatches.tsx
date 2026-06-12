import { Zap, ArrowRight } from 'lucide-react';
import type { Match } from '../data/matches';
import type { Translations } from '../i18n/translations';
import { MatchCard } from './MatchCard';

interface UpcomingMatchesProps {
  matches: Match[];
  t: Translations;
  locale: 'es' | 'en';
}

export function UpcomingMatches({ matches, t, locale }: UpcomingMatchesProps) {
  if (matches.length === 0) {
    return (
      <section id="upcoming" className="relative z-10 px-4 md:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="surface rounded-3xl p-10 text-center">
            <p className="text-cream-100/60">{t.upcoming.noMatches}</p>
          </div>
        </div>
      </section>
    );
  }

  const featured = matches.slice(0, 4);
  const rest = matches.length - featured.length;

  return (
    <section id="upcoming" className="relative z-10 px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="surface rounded-3xl p-6 md:p-8 relative overflow-hidden">
          {/* Decorative line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pitch-400/40 to-transparent" />

          <header className="flex items-center justify-between gap-4 mb-7">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-pitch-500/30 blur-md rounded-xl" />
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-pitch-500 to-pitch-700 grid place-items-center shadow-lg shadow-pitch-900/40">
                  <Zap className="w-5 h-5 text-night-950 fill-night-950" />
                </div>
              </div>
              <div>
                <h2 id="upcoming-heading" className="text-xl md:text-2xl font-extrabold text-cream-50 tracking-tight leading-tight">
                  {t.upcoming.title}
                </h2>
                <p className="text-pitch-300/80 text-sm mt-0.5">
                  {t.upcoming.subtitle.replace('{count}', String(matches.length))}
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
            {featured.map((m, i) => (
              <MatchCard key={m.id} match={m} index={i} variant="featured" locale={locale} />
            ))}
          </div>

          {rest > 0 && (
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
              <p className="text-sm text-cream-100/50">
                {t.upcoming.more.replace('{count}', String(rest))}
              </p>
              <button
                onClick={() => document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-pitch-500/10 hover:bg-pitch-500/20 border border-pitch-500/25 text-pitch-200 font-semibold text-sm transition-all duration-300"
              >
                {t.upcoming.viewAll}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
