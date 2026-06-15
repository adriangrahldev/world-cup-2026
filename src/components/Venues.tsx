import { useState, useMemo } from 'react';
import { MapPin, Users, Trophy, Building2, Calendar } from 'lucide-react';
import { venues, hostCountriesInfo, type Country } from '../data/venues';
import type { Translations, Locale } from '../i18n/translations';
import { countryCodeToName } from '../lib/format';

interface VenuesProps {
  t: Translations;
  locale: Locale;
}

const COUNTRY_LABEL: Record<Country, Record<Locale, string>> = {
  USA: { es: 'Estados Unidos', en: 'United States', pt: 'Estados Unidos', fr: 'États-Unis' },
  MEX: { es: 'México', en: 'Mexico', pt: 'México', fr: 'Mexique' },
  CAN: { es: 'Canadá', en: 'Canada', pt: 'Canadá', fr: 'Canada' },
};

const FILTERS: Array<{ id: 'all' | Country; label: { es: string; en: string } }> = [
  { id: 'all', label: { es: 'Todas', en: 'All' } },
  { id: 'USA', label: { es: 'EE. UU.', en: 'USA' } },
  { id: 'MEX', label: { es: 'México', en: 'Mexico' } },
  { id: 'CAN', label: { es: 'Canadá', en: 'Canada' } },
];

export function Venues({ t, locale }: VenuesProps) {
  const [filter, setFilter] = useState<'all' | Country>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? venues : venues.filter(v => v.country === filter)),
    [filter]
  );

  return (
    <section id="venues" className="relative z-10 px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <div className="section-eyebrow justify-center mb-3">
            <span className="w-6 h-px bg-pitch-400/60" />
            <span>{locale === 'es' ? 'Estadios' : 'Stadiums'}</span>
            <span className="w-6 h-px bg-pitch-400/60" />
          </div>
          <h2 id="venues-heading" className="section-title">{t.venues.title}</h2>
          <p className="section-subtitle mt-2">{t.venues.subtitle}</p>
        </header>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {FILTERS.map(f => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-pitch-500 text-night-950 shadow-md shadow-pitch-700/40'
                    : 'bg-white/5 text-cream-100/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {f.label[locale]}
              </button>
            );
          })}
        </div>

        {/* Venues grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          {filtered.map((v, i) => (
            <article
              key={v.name}
              className="group surface surface-hover rounded-2xl overflow-hidden flex flex-col h-full"
              style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-soft group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/40 to-transparent" />
                <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-night-950/70 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-cream-50 tracking-wider">
                  {COUNTRY_LABEL[v.country][locale]}
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-base font-extrabold text-cream-50 leading-tight drop-shadow-lg line-clamp-1">
                    {v.name}
                  </h3>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 text-cream-100/65 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-pitch-300" />
                  <span className="truncate">{v.city}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-white/[0.03]">
                    <Users className="w-3 h-3 text-pitch-300" />
                    <span className="text-cream-50 font-bold tabular-nums">
                      {v.capacity.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-white/[0.03]">
                    <Trophy className="w-3 h-3 text-gold-400" />
                    <span className="text-cream-50 font-bold tabular-nums">{v.matches}</span>
                    <span className="text-cream-100/45 text-[10px]">
                      {locale === 'es' ? 'partidos' : 'matches'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-cream-100/40 pt-1.5 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {v.opened}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {locale === 'es' ? 'Sede oficial' : 'Host venue'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Host countries mini */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(hostCountriesInfo) as Country[]).map(c => {
            const cInfo = hostCountriesInfo[c];
            return (
              <div key={c} className="surface surface-hover rounded-2xl p-4 flex items-center gap-3">
                <img
                  src={cInfo.flag}
                  alt={countryCodeToName(c, locale)}
                  className="w-12 h-8 rounded object-cover ring-1 ring-white/10 shadow-md"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="font-bold text-cream-50 text-sm leading-tight">
                    {countryCodeToName(c, locale)}
                  </div>
                  <div className="text-[11px] text-cream-100/55">
                    {cInfo.matches} {t.hostCountries.matches} · {cInfo.cities} {t.hostCountries.cities}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
