import { useState, useEffect } from 'react';
import { BallIcon } from './icons/BallIcon';
import { hostCountriesInfo, type Country } from '../data/venues';
import type { Translations, Locale } from '../i18n/translations';
import { countryCodeToName } from '../lib/format';

interface FooterProps {
  t: Translations;
  locale: Locale;
}

export function Footer({ t, locale }: FooterProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const clock = time.toLocaleTimeString(locale === 'es' ? 'es-ES' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: tz,
  });

  const links: Record<Locale, Array<{ id: string; label: string }>> = {
    es: [
      { id: 'home', label: 'Inicio' },
      { id: 'matches', label: 'Partidos' },
      { id: 'groups', label: 'Grupos' },
      { id: 'venues', label: 'Sedes' },
    ],
    en: [
      { id: 'home', label: 'Home' },
      { id: 'matches', label: 'Matches' },
      { id: 'groups', label: 'Groups' },
      { id: 'venues', label: 'Venues' },
    ],
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-night-950/60 backdrop-blur-xl mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pitch-500 to-pitch-700 grid place-items-center shadow-md shadow-pitch-900/40 ring-1 ring-pitch-400/20 flex-shrink-0">
                <BallIcon size={26} variant="minimal" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-pitch-300/80 font-semibold">
                  {locale === 'es' ? 'Copa Mundial' : 'World Cup'}
                </div>
                <div className="text-lg font-extrabold text-cream-50">FIFA 2026</div>
              </div>
            </div>
            <p className="text-sm text-cream-100/55 max-w-xs leading-relaxed">{t.footer.tagline}</p>
            <p className="text-xs text-cream-100/35 leading-relaxed">{t.footer.madeWith}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream-100/45 font-semibold mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {links[locale].map(l => (
                <li key={l.id}>
                  <button
                    onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-cream-100/70 hover:text-pitch-300 transition-colors duration-200"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream-100/45 font-semibold mb-3 mt-6">
              {locale === 'es' ? 'Idioma' : 'Language'}
            </h4>
            <div className="flex items-center gap-2 text-sm text-cream-100/70">
              <span className={locale === 'es' ? 'text-pitch-300 font-semibold' : ''}>ES</span>
              <span className="text-cream-100/20">·</span>
              <span className={locale === 'en' ? 'text-pitch-300 font-semibold' : ''}>EN</span>
            </div>
          </div>

          {/* Host countries + clock */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream-100/45 font-semibold mb-4">
              {locale === 'es' ? 'Países anfitriones' : 'Host Countries'}
            </h4>
            <ul className="space-y-2.5">
              {(Object.keys(hostCountriesInfo) as Country[]).map(c => {
                const info = hostCountriesInfo[c];
                return (
                  <li key={c} className="flex items-center gap-2.5 min-h-[28px]">
                    <img
                      src={info.flag}
                      alt={countryCodeToName(c, locale)}
                      loading="lazy"
                      className="w-6 h-4 rounded-sm object-cover ring-1 ring-white/10 flex-shrink-0"
                    />
                    <span className="text-sm text-cream-100/70">{countryCodeToName(c, locale)}</span>
                    <span className="text-xs text-cream-100/35 ml-auto tabular-nums">
                      {info.matches} {t.hostCountries.matches}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-cream-100/40 font-semibold">
                {locale === 'es' ? 'Hora local' : 'Local time'}
              </div>
              <div className="font-mono font-bold text-cream-50 tabular-nums text-2xl mt-1 leading-none">
                {clock}
              </div>
              <div className="text-[10px] text-cream-100/35 mt-1.5 truncate" title={tz}>
                {tz}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-100/40 text-center md:text-left">
            {t.footer.copyright}
          </p>
          <p className="text-[10px] text-cream-100/30">
            {locale === 'es' ? 'Sitio no oficial · Fandom project' : 'Unofficial site · Fandom project'}
          </p>
        </div>
      </div>
    </footer>
  );
}
