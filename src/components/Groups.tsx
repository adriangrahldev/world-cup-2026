import { Users } from 'lucide-react';
import { groupsByLetter, flagFor } from '../data/groups';
import type { Translations, Locale } from '../i18n/translations';

interface GroupsProps {
  t: Translations;
  locale: Locale;
}

export function Groups({ t, locale }: GroupsProps) {
  return (
    <section id="groups" className="relative z-10 px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <div className="section-eyebrow justify-center mb-3">
            <span className="w-6 h-px bg-pitch-400/60" />
            <span>{locale === 'es' ? 'Los Grupos' : 'The Groups'}</span>
            <span className="w-6 h-px bg-pitch-400/60" />
          </div>
          <h2 className="section-title">{t.groups.title}</h2>
          <p className="section-subtitle mt-2">{t.groups.subtitle}</p>
        </header>

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
      </div>
    </section>
  );
}
