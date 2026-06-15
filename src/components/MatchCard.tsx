import { useMemo, useState } from 'react';
import { Clock, MapPin, Calendar as CalIcon, ChevronDown, CircleDot } from 'lucide-react';
import type { Match } from '../data/matches';
import { getMatchUtcDate, getYmdInTz, getVisitorTimezone } from '../data/matches';
import { getMatchResult, getGoalsByTeam } from '../data/results';
import type { Goal } from '../data/results';
import { formatMatchTime, formatMatchDate } from '../lib/format';
import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';

interface MatchCardProps {
  match: Match;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
  locale: Locale;
}

function getStageInfo(stage: string) {
  const map: Record<string, { color: string; es: string; en: string }> = {
    group: { color: '#22c55e', es: 'Fase de Grupos', en: 'Group Stage' },
    round16: { color: '#a855f7', es: 'Dieciseisavos', en: 'Round of 32' },
    round8: { color: '#818cf8', es: 'Octavos', en: 'Round of 16' },
    quarter: { color: '#f59e0b', es: 'Cuartos', en: 'Quarter-finals' },
    semi: { color: '#fb923c', es: 'Semifinales', en: 'Semi-finals' },
    third: { color: '#cd7f32', es: 'Tercer Lugar', en: 'Third Place' },
    final: { color: '#fbbf24', es: 'Gran Final', en: 'The Final' },
  };
  return map[stage] || map.group;
}

function Flag({ src, alt, size = 'md' }: { src?: string; alt: string; size: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-7 h-5',
    md: 'w-10 h-7',
    lg: 'w-14 h-10',
  };
  if (!src) {
    return (
      <div
        className={`${sizes[size]} rounded-md bg-gradient-to-br from-night-700 to-night-800 grid place-items-center text-[10px] font-bold text-cream-100/40 ring-1 ring-white/10`}
      >
        ?
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${sizes[size]} rounded-md object-cover ring-1 ring-white/10 shadow-sm`}
    />
  );
}

function goalTypeLabel(g: Goal, locale: Locale, t: Record<string, string>): string | null {
  if (g.type === 'penalty') return '(p)';
  if (g.type === 'own_goal') return `(${t.ownGoal})`;
  return null;
}

function goalLine(goals: Goal[], locale: Locale, t: Record<string, string>): string {
  return goals
    .map(g => {
      const tag = goalTypeLabel(g, locale, t);
      return `${g.scorer} ${g.minute}'${tag ? ' ' + tag : ''}`;
    })
    .join('  ·  ');
}

export function MatchCard({ match, index = 0, variant = 'default', locale }: MatchCardProps) {
  const isFeatured = variant === 'featured';
  const visitorTz = useMemo(() => getVisitorTimezone(), []);
  const now = useMemo(() => new Date(), []);
  const matchUtc = useMemo(() => getMatchUtcDate(match), [match.date, match.time, match.venue]);
  const result = useMemo(() => getMatchResult(match.id), [match.id]);
  const t = translations[locale].match;

  const todayYmd = getYmdInTz(now, visitorTz);
  const matchYmd = getYmdInTz(matchUtc, visitorTz);
  const tomorrowYmd = getYmdInTz(new Date(now.getTime() + 24 * 60 * 60 * 1000), visitorTz);

  const isToday = todayYmd === matchYmd;
  const isTomorrow = tomorrowYmd === matchYmd;
  const isPast = matchUtc.getTime() < now.getTime();
  const isPlayed = result?.status === 'final' || (isPast && !!result);
  const isLive = result?.status === 'live';

  const [showGoals, setShowGoals] = useState(false);

  const stageInfo = getStageInfo(match.stage || 'group');
  const stageLabel = locale === 'es' ? stageInfo.es : stageInfo.en;

  const datePill = isToday
    ? locale === 'es' ? 'HOY' : 'TODAY'
    : isTomorrow
      ? locale === 'es' ? 'MAÑANA' : 'TOMORROW'
      : formatMatchDate(match, locale, visitorTz, { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();

  const topPill = isLive
    ? { label: t.live, cls: 'bg-red-500 text-white animate-pulse' }
    : isPlayed
      ? { label: t.final, cls: 'bg-white/10 text-cream-100/70 border border-white/10' }
      : isToday
        ? { label: datePill, cls: 'bg-pitch-500 text-night-950' }
        : isPast
          ? { label: datePill, cls: 'bg-white/5 text-cream-100/40' }
          : { label: datePill, cls: 'bg-pitch-500/15 text-pitch-200' };

  const goals = result ? getGoalsByTeam(result) : null;
  const hasGoals = !!goals && result!.goals.length > 0;

  return (
    <article
      className={`group surface surface-hover rounded-2xl p-4 flex flex-col h-full ${
        isPast && !isPlayed ? 'opacity-65' : ''
      } ${isToday && !isPlayed ? 'ring-1 ring-pitch-400/40' : ''}`}
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2 mb-3 min-h-[24px]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-[10px] font-bold tracking-[0.14em] px-2 py-1 rounded-md whitespace-nowrap ${topPill.cls}`}
          >
            {topPill.label}
          </span>
          {match.group && (
            <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md bg-white/5 text-cream-100/70 border border-white/5">
              {locale === 'es' ? 'Grupo' : 'Group'} {match.group}
            </span>
          )}
          {!match.group && (
            <span
              className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-md"
              style={{ backgroundColor: `${stageInfo.color}20`, color: stageInfo.color }}
            >
              {stageLabel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-cream-100/60 flex-shrink-0">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold tabular-nums">{formatMatchTime(match, locale, visitorTz)}</span>
        </div>
      </div>

      {/* Teams — equal columns, names always 2 lines min */}
      <div className="flex items-center gap-2 flex-1">
        <div className="flex-1 min-w-0 flex flex-col items-center text-center gap-2">
          <Flag src={match.homeTeamFlag} alt={match.homeTeam} size={isFeatured ? 'lg' : 'md'} />
          <span className={`font-semibold text-cream-50 leading-tight line-clamp-2 min-h-[2.5rem] flex items-center ${
            isFeatured ? 'text-base' : 'text-sm'
          }`}>
            {match.homeTeam}
          </span>
        </div>

        <div className="flex flex-col items-center px-1 flex-shrink-0">
          {isPlayed && result ? (
            <div
              className={`grid place-items-center rounded-xl bg-white/5 border border-white/10 ${
                isFeatured ? 'w-16 h-12' : 'w-14 h-10'
              }`}
            >
              <span className={`font-black tabular-nums text-cream-50 ${isFeatured ? 'text-lg' : 'text-base'}`}>
                {result.homeScore}
                <span className="text-cream-100/30 mx-1">–</span>
                {result.awayScore}
              </span>
            </div>
          ) : (
            <div className={`grid place-items-center rounded-xl bg-white/5 border border-white/5 ${isFeatured ? 'w-12 h-12' : 'w-10 h-10'}`}>
              <span className="text-pitch-300 font-black text-sm tracking-wider">{t.vs.toUpperCase()}</span>
            </div>
          )}
          {result?.penalties && (
            <span className="text-[10px] text-cream-100/50 mt-1 tabular-nums">
              ({result.penalties.home}–{result.penalties.away} {t.penalty})
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col items-center text-center gap-2">
          <Flag src={match.awayTeamFlag} alt={match.awayTeam} size={isFeatured ? 'lg' : 'md'} />
          <span className={`font-semibold text-cream-50 leading-tight line-clamp-2 min-h-[2.5rem] flex items-center ${
            isFeatured ? 'text-base' : 'text-sm'
          }`}>
            {match.awayTeam}
          </span>
        </div>
      </div>

      {/* Goalscorers — compact one-liner + expand */}
      {hasGoals && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <button
            type="button"
            onClick={() => setShowGoals(s => !s)}
            className="w-full flex items-center justify-between gap-2 text-left group/btn"
            aria-expanded={showGoals}
            aria-label={showGoals ? t.hideGoals : t.showGoals}
          >
            <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-cream-100/55 uppercase">
              <CircleDot className="w-3 h-3 text-pitch-400" />
              {t.goals} ({result!.goals.length})
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-cream-100/40 transition-transform duration-300 ${showGoals ? 'rotate-180' : ''}`}
            />
          </button>
          {showGoals && (
            <div className="mt-2 space-y-1.5 text-[11px] text-cream-100/70">
              {goals!.home.length > 0 && (
                <p className="flex items-start gap-1.5">
                  <span className="text-pitch-300/80 font-semibold min-w-[60px] truncate">{match.homeTeam.slice(0, 12)}</span>
                  <span className="tabular-nums text-pitch-300/60">·</span>
                  <span className="flex-1">{goalLine(goals!.home, locale, t)}</span>
                </p>
              )}
              {goals!.away.length > 0 && (
                <p className="flex items-start gap-1.5">
                  <span className="text-cream-100/50 font-semibold min-w-[60px] truncate">{match.awayTeam.slice(0, 12)}</span>
                  <span className="tabular-nums text-cream-100/30">·</span>
                  <span className="flex-1">{goalLine(goals!.away, locale, t)}</span>
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-cream-100/55">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <MapPin className="w-3.5 h-3.5 text-pitch-300/80 flex-shrink-0" />
          <span className="text-xs truncate">{match.venue}</span>
        </div>
        <div className="flex items-center gap-1 text-xs flex-shrink-0">
          <CalIcon className="w-3 h-3 text-pitch-300/60" />
          <span className="tabular-nums">{formatMatchDate(match, locale, visitorTz, { day: '2-digit', month: 'short' })}</span>
        </div>
      </div>
    </article>
  );
}
