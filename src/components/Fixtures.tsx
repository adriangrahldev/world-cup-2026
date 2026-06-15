import { useState, useMemo } from 'react';
import { Calendar, ChevronDown, Search, Filter } from 'lucide-react';
import type { Match } from '../data/matches';
import { getMatchUtcDate, getYmdInTz, getVisitorTimezone } from '../data/matches';
import { hasMatchResult } from '../data/results';
import type { Translations, Locale } from '../i18n/translations';
import { MatchCard } from './MatchCard';

interface FixturesProps {
  matches: Match[];
  groups: readonly string[];
  t: Translations;
  locale: Locale;
}

type StatusFilter = 'all' | 'upcoming' | 'finished' | 'live';

export function Fixtures({ matches, groups, t, locale }: FixturesProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [statusOpen, setStatusOpen] = useState(false);

  const visitorTz = useMemo(() => getVisitorTimezone(), []);
  const now = useMemo(() => Date.now(), []);

  const statusFiltered = useMemo(() => {
    if (status === 'all') return matches;
    if (status === 'finished') {
      return matches.filter(m => {
        if (hasMatchResult(m.id)) return true;
        // also show past matches even if no result yet
        return getMatchUtcDate(m).getTime() < now;
      });
    }
    if (status === 'upcoming') {
      return matches.filter(m => {
        if (hasMatchResult(m.id)) return false;
        return getMatchUtcDate(m).getTime() >= now;
      });
    }
    if (status === 'live') {
      return matches.filter(m => {
        const r = (m as Match & { _result?: { status?: string } })._result;
        return r?.status === 'live';
      });
    }
    return matches;
  }, [matches, status, now]);

  const filtered = useMemo(() => {
    let list = selectedGroup === 'all' ? statusFiltered : statusFiltered.filter(m => m.group === selectedGroup);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        m =>
          m.homeTeam.toLowerCase().includes(q) ||
          m.awayTeam.toLowerCase().includes(q) ||
          m.city.toLowerCase().includes(q) ||
          m.venue.toLowerCase().includes(q)
      );
    }
    return list;
  }, [statusFiltered, selectedGroup, query]);

  const visible = showAll ? filtered : filtered.slice(0, 12);
  const hasMore = filtered.length > 12;
  const groupStage = matches.filter(m => m.stage === 'group').length;
  const knockout = matches.filter(m => m.stage !== 'group').length;

  const statusLabel: Record<StatusFilter, { es: string; en: string }> = {
    all: { es: 'Todos', en: 'All' },
    upcoming: { es: 'Próximos', en: 'Upcoming' },
    finished: { es: 'Finalizados', en: 'Finished' },
    live: { es: 'En vivo', en: 'Live' },
  };

  const todayCount = useMemo(() => {
    const todayYmd = getYmdInTz(new Date(now), visitorTz);
    return matches.filter(m => {
      const ymd = getYmdInTz(getMatchUtcDate(m), visitorTz);
      return ymd === todayYmd;
    }).length;
  }, [matches, visitorTz, now]);

  return (
    <section id="matches" className="relative z-10 px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <div className="section-eyebrow mb-3">
              <span className="w-6 h-px bg-pitch-400/60" />
              <span>{locale === 'es' ? 'Calendario' : 'Calendar'}</span>
            </div>
            <h2 id="matches-heading" className="section-title">{t.fixtures.title}</h2>
            <p className="section-subtitle mt-2">
              {t.fixtures.subtitle
                .replace('{groups}', String(groupStage))
                .replace('{knockout}', String(knockout))}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-100/40" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={locale === 'es' ? 'Buscar equipo, sede…' : 'Search team, venue…'}
                className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white/5 border border-white/10 text-cream-50 text-sm placeholder:text-cream-100/35 focus:outline-none focus:border-pitch-400/50 focus:bg-white/10 transition-colors"
                aria-label={locale === 'es' ? 'Buscar partidos' : 'Search matches'}
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <button
                onClick={() => setStatusOpen(o => !o)}
                className="appearance-none w-full sm:w-auto pl-9 pr-9 py-2.5 rounded-full bg-white/5 border border-white/10 text-cream-50 text-sm font-medium focus:outline-none focus:border-pitch-400/50 cursor-pointer hover:bg-white/10 transition-colors flex items-center gap-1.5"
                aria-haspopup="listbox"
                aria-expanded={statusOpen}
              >
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-100/40 pointer-events-none" />
                <span>{statusLabel[status][locale]}</span>
                {todayCount > 0 && status === 'all' && (
                  <span className="text-[9px] uppercase tracking-wider text-pitch-300 bg-pitch-500/15 px-1.5 py-0.5 rounded-full font-semibold">
                    {todayCount} {locale === 'es' ? 'hoy' : 'today'}
                  </span>
                )}
                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-100/40 pointer-events-none transition-transform ${statusOpen ? 'rotate-180' : ''}`} />
              </button>
              {statusOpen && (
                <>
                  <button
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setStatusOpen(false)}
                    aria-hidden="true"
                  />
                  <ul
                    className="absolute right-0 top-full mt-2 w-44 surface rounded-2xl p-1.5 z-20 shadow-2xl"
                    role="listbox"
                  >
                    {(['all', 'upcoming', 'finished', 'live'] as StatusFilter[]).map(s => (
                      <li key={s}>
                        <button
                          onClick={() => { setStatus(s); setStatusOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                            status === s ? 'bg-pitch-500/15 text-pitch-200' : 'text-cream-100 hover:bg-white/5'
                          }`}
                          role="option"
                          aria-selected={status === s}
                        >
                          <span>{statusLabel[s][locale]}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="relative">
              <select
                value={selectedGroup}
                onChange={e => setSelectedGroup(e.target.value)}
                className="appearance-none w-full sm:w-auto pl-9 pr-9 py-2.5 rounded-full bg-white/5 border border-white/10 text-cream-50 text-sm font-medium focus:outline-none focus:border-pitch-400/50 cursor-pointer hover:bg-white/10 transition-colors"
                aria-label={locale === 'es' ? 'Filtrar por grupo' : 'Filter by group'}
              >
                <option value="all" className="bg-night-800">
                  {t.fixtures.filterAll}
                </option>
                {groups.map(g => (
                  <option key={g} value={g} className="bg-night-800">
                    {t.fixtures.filterGroup.replace('{group}', g)}
                  </option>
                ))}
              </select>
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-100/40 pointer-events-none" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-100/40 pointer-events-none" />
            </div>
          </div>
        </header>

        {visible.length === 0 ? (
          <div className="surface rounded-3xl p-10 text-center">
            <p className="text-cream-100/60">
              {locale === 'es' ? 'No se encontraron partidos.' : 'No matches found.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {visible.map((m, i) => (
              <MatchCard key={m.id} match={m} index={i} variant="default" locale={locale} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(s => !s)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-cream-50 text-sm font-semibold transition-all duration-300"
            >
              {showAll
                ? t.fixtures.showLess
                : t.fixtures.showMore.replace('{count}', String(filtered.length - 12))}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
