import { useState, useEffect, useRef } from 'react';
import { Languages, ChevronDown, Menu, X } from 'lucide-react';
import { BallIcon } from './icons/BallIcon';
import { hostCountries } from '../data/matches';
import type { Locale } from '../i18n/translations';
import { countryCodeToName } from '../lib/format';
import { getLangLabel } from '../hooks/useLocale';

const LANGS: Locale[] = ['es', 'en', 'pt', 'fr'];

interface HeaderProps {
  locale: Locale;
  onChangeLocale: (l: Locale) => void;
  detectedCountry: string;
}

const NAV_ITEMS: Record<Locale, Array<{ id: string; label: string }>> = {
  es: [
    { id: 'home', label: 'Inicio' },
    { id: 'matches', label: 'Partidos' },
    { id: 'scorers', label: 'Goleadores' },
    { id: 'groups', label: 'Grupos' },
    { id: 'bracket', label: 'Llave' },
    { id: 'venues', label: 'Sedes' },
  ],
  en: [
    { id: 'home', label: 'Home' },
    { id: 'matches', label: 'Matches' },
    { id: 'scorers', label: 'Scorers' },
    { id: 'groups', label: 'Groups' },
    { id: 'bracket', label: 'Bracket' },
    { id: 'venues', label: 'Venues' },
  ],
  pt: [
    { id: 'home', label: 'Início' },
    { id: 'matches', label: 'Partidas' },
    { id: 'scorers', label: 'Goleadores' },
    { id: 'groups', label: 'Grupos' },
    { id: 'bracket', label: 'Chave' },
    { id: 'venues', label: 'Sedes' },
  ],
  fr: [
    { id: 'home', label: 'Accueil' },
    { id: 'matches', label: 'Matchs' },
    { id: 'scorers', label: 'Buteurs' },
    { id: 'groups', label: 'Groupes' },
    { id: 'bracket', label: 'Tableau' },
    { id: 'venues', label: 'Sites' },
  ],
};

export function Header({ locale, onChangeLocale, detectedCountry }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const nav = NAV_ITEMS[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [langOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-soft ${
        scrolled
          ? 'bg-night-950/85 backdrop-blur-xl border-b border-white/5 py-2.5'
          : 'bg-transparent py-3.5'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-3 focus:py-2 focus:rounded-lg focus:bg-pitch-600 focus:text-white"
      >
        {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-6 h-14">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-3 group"
          aria-label="Home"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-pitch-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-pitch-500 to-pitch-700 grid place-items-center shadow-lg shadow-pitch-900/40 ring-1 ring-pitch-400/20">
              <BallIcon size={26} variant="minimal" />
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-start leading-none gap-1">
            <span className="text-[10px] tracking-[0.22em] text-pitch-300/80 font-semibold uppercase">
              {locale === 'es' ? 'Copa Mundial' : 'World Cup'}
            </span>
            <span className="text-base md:text-lg font-extrabold text-cream-50 tracking-tight">
              FIFA <span className="text-pitch-400">2026</span>
            </span>
          </div>
        </button>

        {/* Desktop nav — centered */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-2 text-sm font-medium text-cream-100/75 hover:text-cream-50 rounded-full hover:bg-white/5 transition-all duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right cluster — same height elements */}
        <div className="flex items-center gap-2">
          {/* Host flags */}
          <div className="hidden md:flex items-center gap-1.5 h-10 pl-3 pr-1 border-l border-white/10">
            {Object.entries(hostCountries).map(([code, country]) => (
              <div
                key={code}
                className="w-7 h-5 rounded-sm overflow-hidden ring-1 ring-white/10 shadow-sm hover:ring-pitch-400/40 transition-all duration-300"
                title={countryCodeToName(code as 'USA' | 'MEX' | 'CAN', locale)}
              >
                <img
                  src={country.flag}
                  alt={countryCodeToName(code as 'USA' | 'MEX' | 'CAN', locale)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Language selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(v => !v)}
              className="flex items-center gap-1.5 h-10 px-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-cream-50 text-sm font-semibold transition-all duration-200"
              aria-label="Language selector"
              aria-expanded={langOpen}
            >
              <Languages className="w-4 h-4 text-pitch-300" />
              <span className="uppercase tracking-wide">{locale}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 surface rounded-2xl p-1.5 anim-fade-in shadow-2xl z-10">
                {LANGS.map(l => {
                  const ll = getLangLabel(l);
                  return (
                    <button
                      key={l}
                      onClick={() => { onChangeLocale(l); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        locale === l ? 'bg-pitch-500/15 text-pitch-200' : 'text-cream-100 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-base">{ll.flag}</span>
                      <span>{ll.native}</span>
                      {((l === 'es' && detectedCountry === 'MEX') ||
                        (l === 'en' && detectedCountry === 'USA') ||
                        (l === 'pt' && detectedCountry === 'other') /* approximate, see hook */) && (
                        <span className="ml-auto text-[10px] uppercase tracking-wider text-pitch-300 bg-pitch-500/15 px-2 py-0.5 rounded-full">
                          {ll.detectIn}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden w-10 h-10 grid place-items-center rounded-full bg-white/5 border border-white/10 text-cream-50"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 mx-4 surface rounded-2xl p-2 anim-fade-up">
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="w-full text-left px-4 py-3 rounded-xl text-cream-50 font-medium hover:bg-white/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
