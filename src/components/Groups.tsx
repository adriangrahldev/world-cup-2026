import { useState, useMemo } from 'react';
import { Users, ChevronRight, ListOrdered, BarChart3 } from 'lucide-react';
import { groupsByLetter, flagFor } from '../data/groups';
import { getGroupStandings, type GroupTable } from '../data/stats';
import type { Translations, Locale } from '../i18n/translations';

interface GroupsProps {
  t: Translations;
  locale: Locale;
}

type ViewMode = 'teams' | 'standings';

const ABBR: Record<Locale, { PJ: string; G: string; E: string; P: string; GF: string; GC: string; Dif: string; Pts: string; team: string; matches: string }> = {
  es: { PJ: 'PJ', G: 'G', E: 'E', P: 'P', GF: 'GF', GC: 'GC', Dif: 'Dif', Pts: 'Pts', team: 'Eq.', matches: 'partidos' },
  en: { PJ: 'P', G: 'W', E: 'D', P: 'L', GF: 'GF', GC: 'GA', Dif: 'GD', Pts: 'Pts', team: 'Team', matches: 'matches' },
  pt: { PJ: 'J', G: 'V', E: 'E', P: 'D', GF: 'GP', GC: 'GC', Dif: 'DG', Pts: 'Pts', team: 'Time', matches: 'partidas' },
  fr: { PJ: 'J', G: 'G', E: 'N', P: 'P', GF: 'BP', GC: 'BC', Dif: 'Diff', Pts: 'Pts', team: 'Éq.', matches: 'matchs' },
};

export function Groups({ t, locale }: GroupsProps) {
  const [mode, setMode] = useState<ViewMode>('teams');
  const abbr = ABBR[locale];
  const tables = useMemo<GroupTable[]>(() => {
    // Trigger recompute when the json is edited (Vite HMR will replace this module).
    return groupsByLetter.map(g => getGroupStandings(g.letter));
  }, []);

  return (
    <section id="groups" className="relative z-10 px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-8">
          <div className="section-eyebrow justify-center mb-3">
            <span className="w-6 h-px bg-pitch-400/60" />
            <span>{locale === 'es' ? 'Los Grupos' : 'The Groups'}</span>
            <span className="w-6 h-px bg-pitch-400/60" />
          </div>
          <h2 id="groups-heading" className="section-title">{t.groups.title}</h2>
          <p className="section-subtitle mt-2">{t.groups.subtitle}</p>
        </header>

        {/* Mode toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 p-1 rounded-full surface">
            <button
              onClick={() => setMode('teams')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                mode === 'teams'
                  ? 'bg-pitch-500 text-night-950 shadow-md shadow-pitch-700/30'
                  : 'text-cream-100/65 hover:text-cream-50'
              }`}
              aria-pressed={mode === 'teams'}
            >
              <Users className="w-3.5 h-3.5" />
              {locale === 'es' ? 'Equipos' : 'Teams'}
            </button>
            <button
              onClick={() => setMode('standings')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                mode === 'standings'
                  ? 'bg-pitch-500 text-night-950 shadow-md shadow-pitch-700/30'
                  : 'text-cream-100/65 hover:text-cream-50'
              }`}
              aria-pressed={mode === 'standings'}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              {locale === 'es' ? 'Posiciones' : 'Standings'}
            </button>
          </div>
        </div>

        {mode === 'teams' ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {groupsByLetter.map((g, idx) => (
              <div
                key={g.letter}
                className="surface surface-hover rounded-2xl p-4 flex flex-col h-full"
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pitch-500 to-pitch-700 grid place-items-center shadow-md shadow-pitch-900/40">
                      <span className="text-night-950 font-black text-sm">{g.letter}</span>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-cream-100/45 font-semibold">
                        {locale === 'es' ? 'Grupo' : 'Group'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-cream-100/45">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{g.teams.length}</span>
                  </div>
                </div>

                <ul className="space-y-1.5 flex-1">
                  {g.teams.map((team, i) => {
                    const flag = flagFor(team);
                    return (
                      <li
                        key={team}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300 min-h-[40px]"
                      >
                        {flag ? (
                          <img
                            src={flag}
                            alt={team}
                            loading="lazy"
                            className="w-7 h-5 rounded object-cover ring-1 ring-white/10 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-7 h-5 rounded bg-night-700 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-cream-50 truncate flex-1" title={team}>
                          {team}
                        </span>
                        <span className="text-[10px] tabular-nums text-cream-100/35 font-semibold flex-shrink-0">
                          #{i + 1}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {tables.map((table, idx) => (
              <StandingCard key={table.letter} table={table} abbr={abbr} locale={locale} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StandingCard({ table, abbr, locale, idx }: { table: GroupTable; abbr: typeof ABBR[Locale]; locale: Locale; idx: number }) {
  const playedAny = table.teams.some(t => t.played > 0);
  return (
    <div
      className="surface surface-hover rounded-2xl p-3 md:p-4 flex flex-col h-full"
      style={{ animationDelay: `${idx * 30}ms` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pitch-500 to-pitch-700 grid place-items-center shadow-md shadow-pitch-900/40">
          <span className="text-night-950 font-black text-sm">{table.letter}</span>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-cream-100/45 font-semibold">
            {locale === 'es' ? 'Grupo' : 'Group'}
          </div>
          <div className="text-[10px] text-cream-100/35 flex items-center gap-1">
            <BarChart3 className="w-2.5 h-2.5" />
            {playedAny
              ? (locale === 'es' ? 'En curso' : 'In progress')
              : (locale === 'es' ? 'Sin jugar' : 'Not started')}
          </div>
        </div>
      </div>

      <table className="w-full text-[11px] tabular-nums">
        <thead>
          <tr className="text-[9px] uppercase tracking-wider text-cream-100/40 font-semibold">
            <th className="text-left py-1 pr-1 w-6">#</th>
            <th className="text-left py-1 pr-1">{abbr.team}</th>
            <th className="text-center py-1 px-0.5" title={abbr.PJ}>{abbr.PJ}</th>
            <th className="text-center py-1 px-0.5" title={abbr.G}>{abbr.G}</th>
            <th className="text-center py-1 px-0.5" title={abbr.E}>{abbr.E}</th>
            <th className="text-center py-1 px-0.5" title={abbr.P}>{abbr.P}</th>
            <th className="text-center py-1 px-0.5" title={abbr.GF}>{abbr.GF}</th>
            <th className="text-center py-1 px-0.5" title={abbr.GC}>{abbr.GC}</th>
            <th className="text-center py-1 px-0.5" title={abbr.Dif}>{abbr.Dif}</th>
            <th className="text-center py-1 pl-0.5 font-bold text-cream-100/60" title={abbr.Pts}>{abbr.Pts}</th>
          </tr>
        </thead>
        <tbody>
          {table.teams.map((t, i) => {
            const qualifies = i < 2;
            const third = i === 2;
            return (
              <tr
                key={t.team}
                className={`border-t border-white/5 ${
                  qualifies ? 'bg-pitch-500/[0.04]' : third ? 'bg-pitch-500/[0.02]' : ''
                }`}
              >
                <td className="py-1.5 pr-1 text-cream-100/50 font-semibold">
                  {i + 1}
                  {qualifies && <span className="ml-0.5 text-pitch-400/60">·</span>}
                </td>
                <td className="py-1.5 pr-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {t.flag && (
                      <img
                        src={t.flag}
                        alt=""
                        loading="lazy"
                        className="w-4 h-3 rounded-sm object-cover ring-1 ring-white/10 flex-shrink-0"
                      />
                    )}
                    <span className="text-cream-50 font-semibold truncate max-w-[80px]" title={t.team}>
                      {t.team}
                    </span>
                  </div>
                </td>
                <td className="py-1.5 px-0.5 text-center text-cream-100/70">{t.played}</td>
                <td className="py-1.5 px-0.5 text-center text-cream-100/70">{t.won}</td>
                <td className="py-1.5 px-0.5 text-center text-cream-100/70">{t.drawn}</td>
                <td className="py-1.5 px-0.5 text-center text-cream-100/70">{t.lost}</td>
                <td className="py-1.5 px-0.5 text-center text-cream-100/70">{t.goalsFor}</td>
                <td className="py-1.5 px-0.5 text-center text-cream-100/70">{t.goalsAgainst}</td>
                <td className={`py-1.5 px-0.5 text-center font-semibold ${t.goalDifference > 0 ? 'text-pitch-300' : t.goalDifference < 0 ? 'text-red-300/80' : 'text-cream-100/70'}`}>
                  {t.goalDifference > 0 ? `+${t.goalDifference}` : t.goalDifference}
                </td>
                <td className="py-1.5 pl-0.5 text-center font-bold text-cream-50">{t.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-3 text-[9px] text-cream-100/40">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-pitch-400/70" />
          {locale === 'es' ? 'Clasifica' : 'Qualifies'}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-pitch-400/30" />
          {locale === 'es' ? 'Posible 3.º' : 'Possible 3rd'}
        </span>
      </div>
    </div>
  );
}
