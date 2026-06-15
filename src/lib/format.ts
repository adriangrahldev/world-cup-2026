import type { Locale } from '../i18n/translations';
import { getMatchUtcDate } from '../data/matches';
import type { Match } from '../data/matches';

export function formatDateLocalized(dateStr: string, locale: Locale, opts?: Intl.DateTimeFormatOptions): string {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', opts ?? { day: 'numeric', month: 'short' }).format(date);
  } catch {
    return dateStr;
  }
}

export function formatWeekdayDay(dateStr: string, locale: Locale): string {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' }).format(date);
  } catch {
    return dateStr;
  }
}

export function formatTime(time24: string, locale: Locale): string {
  try {
    const [h, m] = time24.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', { hour: 'numeric', minute: '2-digit', hour12: locale === 'en' }).format(date);
  } catch {
    return time24;
  }
}

// Format the match kickoff time in the visitor's IANA timezone
export function formatMatchTime(match: Match, locale: Locale, visitorTz: string): string {
  try {
    const utc = getMatchUtcDate(match);
    return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: locale === 'en',
      timeZone: visitorTz,
    }).format(utc);
  } catch {
    return match.time;
  }
}

// Format the match date in the visitor's IANA timezone
export function formatMatchDate(match: Match, locale: Locale, visitorTz: string, opts?: Intl.DateTimeFormatOptions): string {
  try {
    const utc = getMatchUtcDate(match);
    return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
      ...(opts ?? { weekday: 'short', day: 'numeric', month: 'short' }),
      timeZone: visitorTz,
    }).format(utc);
  } catch {
    return match.date;
  }
}

export function countryCodeToName(code: 'USA' | 'MEX' | 'CAN', locale: Locale): string {
  const map: Record<string, Record<Locale, string>> = {
    USA: { es: 'Estados Unidos', en: 'United States', pt: 'Estados Unidos', fr: 'États-Unis' },
    MEX: { es: 'México', en: 'Mexico', pt: 'México', fr: 'Mexique' },
    CAN: { es: 'Canadá', en: 'Canada', pt: 'Canadá', fr: 'Canada' },
  };
  return map[code]?.[locale] ?? code;
}
