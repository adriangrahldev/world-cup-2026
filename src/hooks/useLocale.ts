import { useEffect, useState, useCallback } from 'react';
import { translations, type Locale } from '../i18n/translations';

const STORAGE_KEY = 'wc2026.locale';
const COUNTRY_KEY = 'wc2026.country';

export type Country = 'auto' | 'USA' | 'MEX' | 'CAN' | 'other';

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // Spanish speaking
  MX: 'es', ES: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es',
  EC: 'es', GT: 'es', BO: 'es', CU: 'es', DO: 'es', HN: 'es', SV: 'es',
  NI: 'es', CR: 'es', PA: 'es', UY: 'es', PY: 'es', PR: 'es', US: 'es', MX_: 'es',
  // English speaking default
  GB: 'en', CA: 'en', AU: 'en', IE: 'en', NZ: 'en',
};

const COUNTRY_NAME: Record<string, Record<Locale, string>> = {
  USA: { es: 'Estados Unidos', en: 'United States' },
  MEX: { es: 'México', en: 'Mexico' },
  CAN: { es: 'Canadá', en: 'Canada' },
  other: { es: 'Internacional', en: 'International' },
};

export function detectLocaleFromBrowser(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === 'es' || stored === 'en') return stored;

  const browserLangs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const lang of browserLangs) {
    const lower = lang.toLowerCase();
    if (lower.startsWith('es')) return 'es';
    if (lower.startsWith('en')) return 'en';
  }
  return 'en';
}

async function detectCountryByLocale(): Promise<Country> {
  if (typeof window === 'undefined') return 'other';
  const stored = localStorage.getItem(COUNTRY_KEY) as Country | null;
  if (stored) return stored;

  try {
    // Intl.DateTimeFormat can give country from timezone in some cases
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('America/Mexico') || tz.includes('America/Tijuana') || tz.includes('America/Cancun') || tz.includes('America/Monterrey') || tz.includes('America/Mazatlan')) {
      return 'MEX';
    }
    if (tz.includes('America/Los_Angeles') || tz.includes('America/Denver') || tz.includes('America/Chicago') || tz.includes('America/New_York') || tz.includes('America/Phoenix')) {
      return 'USA';
    }
    if (tz.includes('America/Toronto') || tz.includes('America/Vancouver') || tz.includes('America/Edmonton') || tz.includes('America/Winnipeg') || tz.includes('America/Halifax')) {
      return 'CAN';
    }
  } catch {
    // ignore
  }
  return 'other';
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocaleFromBrowser());
  const [country, setCountry] = useState<Country>('other');
  const [countryResolved, setCountryResolved] = useState(false);

  useEffect(() => {
    let mounted = true;
    detectCountryByLocale().then(c => {
      if (!mounted) return;
      setCountry(c);
      setCountryResolved(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      // ignore
    }
  }, []);

  const setCountryPref = useCallback((c: Country) => {
    setCountry(c);
    try {
      localStorage.setItem(COUNTRY_KEY, c);
    } catch {
      // ignore
    }
    // Cambio de país puede sugerir cambio de idioma
    if (c === 'MEX' && locale === 'en') {
      setLocale('es');
    } else if (c === 'USA' && locale === 'en') {
      // USA: mantener preferencia del usuario
    }
  }, [locale, setLocale]);

  const t = translations[locale];

  return {
    locale,
    setLocale,
    country,
    setCountry: setCountryPref,
    countryResolved,
    t,
    countryName: (code: Country) => COUNTRY_NAME[code]?.[locale] ?? code,
  };
}
