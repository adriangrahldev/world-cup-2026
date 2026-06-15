import { Trophy, Calendar, MapPin, Swords } from 'lucide-react';
import { worldCupMatches, getMatchUtcDate, getVisitorTimezone } from '../data/matches';
import { formatMatchTime, formatMatchDate } from '../lib/format';
import { getMatchResult } from '../data/results';
import { flagFor } from '../data/groups';
import type { Locale } from '../i18n/translations';
import type { Translations } from '../i18n/translations';

interface BracketProps {
  t: Translations;
  locale: Locale;
}

interface Slot {
  matchId: number;
  home: string;
  away: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  homeFlag?: string;
  awayFlag?: string;
  homeIsPlaceholder?: boolean;
  awayIsPlaceholder?: boolean;
  homeScore?: number;
  awayScore?: number;
  played?: boolean;
}

// "1A" -> México / Sudáf… etc: just return the first team in group A for "1A"
function placeholderTeam(label: string): { name: string; flag?: string; isPlaceholder: boolean } {
  return { name: label, isPlaceholder: true };
}

function buildSlot(matchId: number): Slot | null {
  const m = worldCupMatches.find(x => x.id === matchId);
  if (!m) return null;
  const r = getMatchResult(matchId);
  const home = m.homeTeamFlag ? { name: m.homeTeam, flag: m.homeTeamFlag, isPlaceholder: false } : placeholderTeam(m.homeTeam);
  const away = m.awayTeamFlag ? { name: m.awayTeam, flag: m.awayTeamFlag, isPlaceholder: false } : placeholderTeam(m.awayTeam);
  return {
    matchId,
    home: home.name,
    away: away.name,
    date: m.date,
    time: m.time,
    venue: m.venue,
    city: m.city,
    homeFlag: home.flag,
    awayFlag: away.flag,
    homeIsPlaceholder: home.isPlaceholder,
    awayIsPlaceholder: away.isPlaceholder,
    homeScore: r?.homeScore,
    awayScore: r?.awayScore,
    played: r?.status === 'final',
  };
}

const STAGE_LABELS: Record<string, { es: string; en: string; color: string }> = {
  round16: { es: '32avos · Dieciseisavos', en: 'Round of 32', color: '#a855f7' },
  round8: { es: 'Octavos', en: 'Round of 16', color: '#818cf8' },
  quarter: { es: 'Cuartos', en: 'Quarter-finals', color: '#f59e0b' },
  semi: { es: 'Semifinales', en: 'Semi-finals', color: '#fb923c' },
  third: { es: 'Tercer lugar', en: 'Third place', color: '#cd7f32' },
  final: { es: 'Gran Final', en: 'The Final', color: '#fbbf24' },
};

export function Bracket({ t: _t, locale }: BracketProps) {
  const visitorTz = getVisitorTimezone();
  const stageOrder: Array<keyof typeof STAGE_LABELS> = ['round16', 'round8', 'quarter', 'semi', 'final'];
  const matchesByStage = stageOrder.map(stage => ({
    stage,
    matches: worldCupMatches.filter(m => m.stage === stage),
  }));

  return (
    <section id="bracket" className="relative z-10 px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <div className="section-eyebrow justify-center mb-3">
            <span className="w-6 h-px bg-pitch-400/60" />
            <span>{locale === 'es' ? 'Llave' : 'Bracket'}</span>
            <span className="w-6 h-px bg-pitch-400/60" />
          </div>
          <h2 className="section-title">
            {locale === 'es' ? 'Fase final' : 'Knockout stage'}
          </h2>
          <p className="section-subtitle mt-2">
            {locale === 'es'
              ? '32avos, octavos, cuartos, semis, tercer puesto y la gran final del 19 de julio.'
              : 'Round of 32, Round of 16, quarters, semis, third place and the final on July 19.'}
          </p>
        </header>

        <div className="space-y-10">
          {matchesByStage.map(({ stage, matches }) => {
            const meta = STAGE_LABELS[stage];
            return (
              <div key={stage}>
                <div className="flex items-center gap-2 mb-4">
                  <Swords className="w-4 h-4" style={{ color: meta.color }} />
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: meta.color }}>
                    {locale === 'es' ? meta.es : meta.en}
                  </h3>
                  <span className="text-xs text-cream-100/40">
                    · {matches.length} {locale === 'es' ? 'partidos' : 'matches'}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {matches.map(m => {
                    const slot = buildSlot(m.id);
                    if (!slot) return null;
                    return <BracketCard key={m.id} slot={slot} locale={locale} visitorTz={visitorTz} color={meta.color} />;
                  })}
                </div>
              </div>
            );
          })}

          {/* Third place match card */}
          {(() => {
            const slot = buildSlot(103);
            if (!slot) return null;
            return (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Swords className="w-4 h-4" style={{ color: STAGE_LABELS.third.color }} />
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: STAGE_LABELS.third.color }}>
                    {locale === 'es' ? STAGE_LABELS.third.es : STAGE_LABELS.third.en}
                  </h3>
                </div>
                <div className="max-w-md">
                  <BracketCard slot={slot} locale={locale} visitorTz={visitorTz} color={STAGE_LABELS.third.color} />
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

function BracketCard({ slot, locale, visitorTz, color }: { slot: Slot; locale: Locale; visitorTz: string; color: string }) {
  const dateStr = formatMatchDate({ ...slot, time: slot.time, venue: slot.venue, city: slot.city, country: 'USA', homeTeamFlag: '', awayTeamFlag: '', homeTeam: slot.home, awayTeam: slot.away } as never, locale, visitorTz, { day: '2-digit', month: 'short' });
  const timeStr = formatMatchTime({ ...slot, time: slot.time, venue: slot.venue, city: slot.city, country: 'USA', homeTeamFlag: '', awayTeamFlag: '', homeTeam: slot.home, awayTeam: slot.away } as never, locale, visitorTz);

  return (
    <article
      className={`surface surface-hover rounded-2xl p-3 flex flex-col h-full ${slot.played ? 'ring-1 ring-white/5' : ''}`}
      style={{ borderColor: slot.played ? `${color}25` : undefined }}
    >
      {/* Top row: date + status */}
      <div className="flex items-center justify-between gap-2 mb-2 text-[10px]">
        <span className="inline-flex items-center gap-1 text-cream-100/55 font-semibold tabular-nums">
          <Calendar className="w-3 h-3" />
          {dateStr} · {timeStr}
        </span>
        {slot.played ? (
          <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-cream-100/65 font-bold tracking-wider">
            FT
          </span>
        ) : (
          <span
            className="px-1.5 py-0.5 rounded-md font-bold tracking-wider"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {locale === 'es' ? 'Pend.' : 'TBD'}
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-1.5 flex-1">
        <BracketTeamRow
          flag={slot.homeFlag}
          name={slot.home}
          isPlaceholder={slot.homeIsPlaceholder}
          score={slot.homeScore}
          winner={slot.played && (slot.homeScore ?? 0) > (slot.awayScore ?? -1)}
          isFinal={slot.matchId === 104}
        />
        <div className="h-px bg-white/5 my-0.5" />
        <BracketTeamRow
          flag={slot.awayFlag}
          name={slot.away}
          isPlaceholder={slot.awayIsPlaceholder}
          score={slot.awayScore}
          winner={slot.played && (slot.awayScore ?? 0) > (slot.homeScore ?? -1)}
          isFinal={slot.matchId === 104}
        />
      </div>

      {/* Venue */}
      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-1 text-[10px] text-cream-100/45">
        <MapPin className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">{slot.venue}</span>
      </div>
    </article>
  );
}

function BracketTeamRow({ flag, name, isPlaceholder, score, winner }: { flag?: string; name: string; isPlaceholder?: boolean; score?: number; winner?: boolean; isFinal?: boolean }) {
  return (
    <div className={`flex items-center gap-2 p-1.5 rounded-md ${winner ? 'bg-pitch-500/10' : ''}`}>
      {flag ? (
        <img src={flag} alt="" loading="lazy" className="w-5 h-4 rounded-sm object-cover ring-1 ring-white/10 flex-shrink-0" />
      ) : (
        <div className="w-5 h-4 rounded-sm bg-white/5 border border-dashed border-white/15 flex-shrink-0 grid place-items-center text-[8px] text-cream-100/40 font-bold">
          ?
        </div>
      )}
      <span className={`flex-1 min-w-0 truncate text-xs ${winner ? 'text-cream-50 font-bold' : isPlaceholder ? 'text-cream-100/45 italic' : 'text-cream-50/85 font-medium'}`}>
        {name}
      </span>
      {score !== undefined && (
        <span className={`tabular-nums font-black text-sm ${winner ? 'text-pitch-300' : 'text-cream-100/55'}`}>
          {score}
        </span>
      )}
    </div>
  );
}
