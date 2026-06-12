import { Clock, MapPin, Calendar as CalIcon } from 'lucide-react';
import type { Match } from '../data/matches';
import { formatTime, formatDateLocalized } from '../lib/format';
import type { Locale } from '../i18n/translations';

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

function Flag({ src, alt, size = 'md' }: { src?: string; alt: string; size?: 'sm' | 'md' | 'lg' }) {
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

export function MatchCard({ match, index = 0, variant = 'default', locale }: MatchCardProps) {
  const isFeatured = variant === 'featured';
  const matchDate = new Date(match.date + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isToday = matchDate.getTime() === today.getTime();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = matchDate.getTime() === tomorrow.getTime();
  const isPast = matchDate.getTime() < today.getTime();

  const stageInfo = getStageInfo(match.stage || 'group');
  const stageLabel = locale === 'es' ? stageInfo.es : stageInfo.en;

  const datePill = isToday
    ? locale === 'es' ? 'HOY' : 'TODAY'
    : isTomorrow
      ? locale === 'es' ? 'MAÑANA' : 'TOMORROW'
      : formatDateLocalized(match.date, locale, { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();

  return (
    <article
      className={`group surface surface-hover rounded-2xl p-4 flex flex-col h-full ${
        isPast ? 'opacity-65' : ''
      } ${isToday ? 'ring-1 ring-pitch-400/40' : ''}`}
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2 mb-3 min-h-[24px]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-[10px] font-bold tracking-[0.14em] px-2 py-1 rounded-md whitespace-nowrap ${
              isToday
                ? 'bg-pitch-500 text-night-950'
                : isPast
                  ? 'bg-white/5 text-cream-100/40'
                  : 'bg-pitch-500/15 text-pitch-200'
            }`}
          >
            {datePill}
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
          <span className="text-xs font-semibold tabular-nums">{formatTime(match.time, locale)}</span>
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
          <div className={`grid place-items-center rounded-xl bg-white/5 border border-white/5 ${isFeatured ? 'w-12 h-12' : 'w-10 h-10'}`}>
            <span className="text-pitch-300 font-black text-sm tracking-wider">VS</span>
          </div>
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

      {/* Bottom */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-cream-100/55">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <MapPin className="w-3.5 h-3.5 text-pitch-300/80 flex-shrink-0" />
          <span className="text-xs truncate">{match.venue}</span>
        </div>
        <div className="flex items-center gap-1 text-xs flex-shrink-0">
          <CalIcon className="w-3 h-3 text-pitch-300/60" />
          <span className="tabular-nums">{formatDateLocalized(match.date, locale, { day: '2-digit', month: 'short' })}</span>
        </div>
      </div>
    </article>
  );
}
