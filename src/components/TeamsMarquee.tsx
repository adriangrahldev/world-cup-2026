import { teamFlags } from '../data/matches';
import type { Locale } from '../i18n/translations';

interface TeamsMarqueeProps {
  locale: Locale;
}

const TEAMS = Object.keys(teamFlags);

export function TeamsMarquee({ locale }: TeamsMarqueeProps) {
  const half = [...TEAMS, ...TEAMS];
  return (
    <section
      aria-label={locale === 'es' ? 'Equipos participantes' : 'Participating teams'}
      className="relative z-10 py-6 border-y border-white/5 bg-night-950/40 overflow-hidden"
    >
      <div className="text-center mb-3 text-[10px] uppercase tracking-[0.22em] text-cream-100/40 font-semibold">
        {locale === 'es' ? '48 selecciones · 6 confederaciones' : '48 nations · 6 confederations'}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-night-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-night-950 to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 anim-marquee w-max">
          {half.map((team, i) => {
            const flag = teamFlags[team];
            return (
              <div
                key={`${team}-${i}`}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-colors duration-300"
              >
                {flag && (
                  <img
                    src={flag}
                    alt={team}
                    loading="lazy"
                    className="w-6 h-4 rounded-sm object-cover ring-1 ring-white/10"
                  />
                )}
                <span className="text-xs font-semibold text-cream-100/75 whitespace-nowrap">
                  {team}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
