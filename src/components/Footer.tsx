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
    <footer className="relative z-10 border-t border-white/5 bg-night-950/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pitch-500 to-pitch-700 grid place-items-center shadow-md shadow-pitch-900/40 ring-1 ring-pitch-400/20">
                <BallIcon size={28} variant="minimal" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-pitch-300/80 font-semibold">
                  {locale === 'es' ? 'Copa Mundial' : 'World Cup'}
                </div>
                <div className="text-lg font-extrabold text-cream-50">FIFA 2026</div>
              </div>
            </div>
            <p className="text-sm text-cream-100/55 max-w-xs">{t.footer.tagline}</p>
            <p className="text-xs text-cream-100/35 mt-2">{t.footer.madeWith}</p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream-100/45 font-semibold mb-3">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-1.5">
              {links[locale].map(l => (
                <li key={l.id}>
                  <button
                    onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-cream-100/70 hover:text-pitch-300 transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream-100/45 font-semibold mb-3">
              {locale === 'es' ? 'Países anfitriones' : 'Host Countries'}
            </h4>
            <ul className="space-y-2">
              {(Object.keys(hostCountriesInfo) as Country[]).map(c => {
                const info = hostCountriesInfo[c];
                return (
                  <li key={c} className="flex items-center gap-2.5">
                    <img
                      src={info.flag}
                      alt={countryCodeToName(c, locale)}
                      loading="lazy"
                      className="w-6 h-4 rounded-sm object-cover ring-1 ring-white/10"
                    />
                    <span className="text-sm text-cream-100/70">{countryCodeToName(c, locale)}</span>
                    <span className="text-xs text-cream-100/35 ml-auto tabular-nums">
                      {info.matches} {t.hostCountries.matches}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-cream-100/40 font-semibold">
                {locale === 'es' ? 'Hora local' : 'Local time'}
              </div>
              <div className="font-mono font-bold text-cream-50 tabular-nums text-lg mt-0.5">
                {clock}
              </div>
              <div className="text-[10px] text-cream-100/35 truncate">{tz}</div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-100/40 text-center md:text-left">
            {t.footer.copyright}
          </p>
          <p className="text-[10px] text-cream-100/30">
            {locale === 'es' ? 'Sitio no oficial. Fandom project.' : 'Unofficial site. Fandom project.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
