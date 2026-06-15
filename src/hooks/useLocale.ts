import { useEffect, useState, useCallback } from 'react';
import { translations, type Locale } from '../i18n/translations';

const STORAGE_KEY = 'wc2026.locale';
const COUNTRY_KEY = 'wc2026.country';

export type Country = 'auto' | 'USA' | 'MEX' | 'CAN' | 'other';

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // Spanish speaking
  MX: 'es', ES: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es',
  EC: 'es', GT: 'es', BO: 'es', CU: 'es', DO: 'es', HN: 'es', SV: 'es',
  NI: 'es', CR: 'es', PA: 'es', UY: 'es', PY: 'es', PR: 'es', US: 'es',
  // Portuguese (Brazil)
  BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt',
  // French (France + parts of Canada)
  FR: 'fr', BE: 'fr', CH: 'fr', CA: 'fr', LU: 'fr',
  // English speaking default
  GB: 'en', IE: 'en', AU: 'en', NZ: 'en', ZA: 'en', IN: 'en',
};

const LANG_LABEL: Record<Locale, { native: string; flag: string; detectIn: string }> = {
  es: { native: 'Español', flag: '🇪🇸', detectIn: 'Detectado' },
  en: { native: 'English', flag: '🇺🇸', detectIn: 'Detected' },
  pt: { native: 'Português', flag: '🇧🇷', detectIn: 'Detectado' },
  fr: { native: 'Français', flag: '🇫🇷', detectIn: 'Détecté' },
};

export function getLangLabel(l: Locale): { native: string; flag: string; detectIn: string } {
  return LANG_LABEL[l];
}

const COUNTRY_NAME: Record<string, Record<Locale, string>> = {
  USA: { es: 'Estados Unidos', en: 'United States', pt: 'Estados Unidos', fr: 'États-Unis' },
  MEX: { es: 'México', en: 'Mexico', pt: 'México', fr: 'Mexique' },
  CAN: { es: 'Canadá', en: 'Canada', pt: 'Canadá', fr: 'Canada' },
  other: { es: 'Internacional', en: 'International', pt: 'Internacional', fr: 'International' },
};

export function detectLocaleFromBrowser(): Locale {
  if (typeof window === 'undefined') return 'en';
  try {
    const url = new URL(window.location.href);
    const param = url.searchParams.get('lang');
    if (param === 'es' || param === 'en' || param === 'pt' || param === 'fr') return param;
  } catch {
    // ignore
  }
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === 'es' || stored === 'en' || stored === 'pt' || stored === 'fr') return stored;
  const browserLangs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const lang of browserLangs) {
    const lower = lang.toLowerCase();
    if (lower.startsWith('es')) return 'es';
    if (lower.startsWith('pt')) return 'pt';
    if (lower.startsWith('fr')) return 'fr';
    if (lower.startsWith('en')) return 'en';
  }
  return 'en';
}

function syncUrlLang(lang: Locale) {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') !== lang) {
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    }
  } catch {
    // ignore
  }
}

async function detectCountryByLocale(): Promise<Country> {
  if (typeof window === 'undefined') return 'other';
  const stored = localStorage.getItem(COUNTRY_KEY) as Country | null;
  if (stored) return stored;

  try {
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
      syncUrlLang(next);
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
    if (c === 'MEX' && locale === 'en') {
      setLocale('es');
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
