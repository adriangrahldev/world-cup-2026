import { useState, useEffect, useMemo } from 'react';
import { Zap, ArrowRight, RefreshCw, History, Trophy } from 'lucide-react';
import type { Match } from '../data/matches';
import { getMatchUtcDate } from '../data/matches';
import { getMatchResult } from '../data/results';
import { getRecentResults, getTournamentSummary } from '../data/stats';
import type { Translations } from '../i18n/translations';
import type { Locale } from '../i18n/translations';
import { MatchCard } from './MatchCard';

interface UpcomingMatchesProps {
  matches: Match[];
  t: Translations;
  locale: Locale;
}

export function UpcomingMatches({ matches, t, locale }: UpcomingMatchesProps) {
  // Empty state
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

  const [tab, setTab] = useState<'upcoming' | 'recent'>('upcoming');
  const [now, setNow] = useState(() => Date.now());

  // refresh "now" every minute so a live or just-started match bubbles up
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const featured = useMemo(() => {
    // Live matches first, then today, then tomorrow
    const scored = matches.map(m => {
      const utc = getMatchUtcDate(m).getTime();
      const live = getMatchResult(m.id)?.status === 'live';
      const todayMs = 24 * 60 * 60 * 1000;
      const hoursUntil = (utc - now) / (1000 * 60 * 60);
      let score = 0;
      if (live) score = 1_000_000;
      else if (utc < now) score = -1_000_000; // already past
      else if (hoursUntil < 24) score = 100 - hoursUntil;
      else score = 50 - hoursUntil;
      return { m, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 4).map(x => x.m);
  }, [matches, now]);

  const recent = useMemo(() => getRecentResults(4), []);
  const summary = useMemo(() => getTournamentSummary(), []);
  const rest = matches.length - featured.length;

  return (
    <section id="upcoming" className="relative z-10 px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="surface rounded-3xl p-6 md:p-8 relative overflow-hidden">
          {/* Decorative line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pitch-400/40 to-transparent" />

          <header className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-pitch-500/30 blur-md rounded-xl" />
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-pitch-500 to-pitch-700 grid place-items-center shadow-lg shadow-pitch-900/40">
                  {tab === 'upcoming' ? (
                    <Zap className="w-5 h-5 text-night-950 fill-night-950" />
                  ) : (
                    <History className="w-5 h-5 text-night-950" />
                  )}
                </div>
              </div>
              <div>
                <h2 id="upcoming-heading" className="text-xl md:text-2xl font-extrabold text-cream-50 tracking-tight leading-tight">
                  {tab === 'upcoming' ? t.upcoming.title : (locale === 'es' ? 'Resultados recientes' : 'Recent results')}
                </h2>
                <p className="text-pitch-300/80 text-sm mt-0.5 flex items-center gap-2 flex-wrap">
                  {tab === 'upcoming' ? (
                    <>{t.upcoming.subtitle.replace('{count}', String(matches.length))}</>
                  ) : (
                    <>
                      <span className="inline-flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {summary.matchesPlayed} {locale === 'es' ? 'jugados' : 'played'}
                      </span>
                      <span className="text-cream-100/30">·</span>
                      <span>{summary.goalsScored} {locale === 'es' ? 'goles' : 'goals'}</span>
                      {summary.biggestWin && (
                        <>
                          <span className="text-cream-100/30">·</span>
                          <span className="text-pitch-200/80">
                            {locale === 'es' ? 'Mayor goleada' : 'Top win'}: {summary.biggestWin.homeTeam} {summary.biggestWin.homeScore}-{summary.biggestWin.awayScore} {summary.biggestWin.awayTeam}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Tab toggle */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              <button
                onClick={() => setTab('upcoming')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  tab === 'upcoming' ? 'bg-pitch-500 text-night-950' : 'text-cream-100/65 hover:text-cream-50'
                }`}
                aria-pressed={tab === 'upcoming'}
              >
                <Zap className="w-3 h-3" />
                {locale === 'es' ? 'Próximos' : 'Upcoming'}
              </button>
              <button
                onClick={() => setTab('recent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  tab === 'recent' ? 'bg-pitch-500 text-night-950' : 'text-cream-100/65 hover:text-cream-50'
                }`}
                aria-pressed={tab === 'recent'}
              >
                <History className="w-3 h-3" />
                {locale === 'es' ? 'Resultados' : 'Results'}
              </button>
            </div>
          </header>

          {tab === 'upcoming' ? (
            <>
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
            </>
          ) : (
            <>
              {recent.length === 0 ? (
                <div className="text-center text-cream-100/55 py-10">
                  {locale === 'es' ? 'Aún no hay partidos jugados.' : 'No matches played yet.'}
                </div>
              ) : (
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
                  {recent.map(({ match }, i) => (
                    <MatchCard key={match.id} match={match} index={i} variant="featured" locale={locale} />
                  ))}
                </div>
              )}
              <div className="mt-7 flex justify-center pt-6 border-t border-white/5">
                <button
                  onClick={() => {
                    setTab('upcoming');
                    document.getElementById('groups')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-pitch-500/10 hover:bg-pitch-500/20 border border-pitch-500/25 text-pitch-200 font-semibold text-sm transition-all duration-300"
                >
                  {locale === 'es' ? 'Ver tabla de posiciones' : 'View group standings'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
