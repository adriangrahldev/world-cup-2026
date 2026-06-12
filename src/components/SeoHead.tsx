import { useEffect } from 'react';
import type { Locale } from '../i18n/translations';
import { worldCupMatches } from '../data/matches';

interface SeoHeadProps {
  locale: Locale;
  pageTitle?: string;
  pageDescription?: string;
}

const BASE = 'https://worldcup.adriangrahl.com';

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setStructuredData(id: string, data: object | object[]) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-seo="${id}"]`);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-seo', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SeoHead({ locale, pageTitle, pageDescription }: SeoHeadProps) {
  useEffect(() => {
    const title = pageTitle || (locale === 'es'
      ? 'World Cup 2026 · Copa Mundial de la FIFA · Calendario, Grupos y Sedes'
      : 'World Cup 2026 · FIFA World Cup · Schedule, Groups & Venues');

    const description = pageDescription || (locale === 'es'
      ? 'Copa Mundial de la FIFA 2026: calendario completo de los 104 partidos, los 12 grupos, las 48 selecciones y las 16 sedes oficiales en Estados Unidos, México y Canadá.'
      : 'FIFA World Cup 2026: full schedule of 104 matches, the 12 groups, 48 nations and 16 host venues in the United States, Mexico and Canada.');

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', `${BASE}/`, 'property');
    setMeta('og:locale', locale === 'es' ? 'es_ES' : 'en_US', 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    // hreflang
    setLink('canonical', `${BASE}/`);
    setLink('alternate', `${BASE}/?lang=es`, 'es');
    setLink('alternate', `${BASE}/?lang=en`, 'en');
    setLink('alternate', `${BASE}/`, 'x-default');

    // Structured data — dynamic per locale
    const ld: object[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        url: BASE,
        name: 'World Cup 2026 — adriangrahl',
        inLanguage: ['es-ES', 'en-US'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: locale === 'es' ? '¿Cuándo empieza el Mundial 2026?' : 'When does the 2026 World Cup start?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: locale === 'es'
                ? 'El Mundial 2026 comienza el 11 de junio de 2026 con el partido inaugural México vs Sudáfrica en el Estadio Azteca.'
                : 'The 2026 World Cup starts on June 11, 2026, with the opening match Mexico vs South Africa at Estadio Azteca.',
            },
          },
          {
            '@type': 'Question',
            name: locale === 'es' ? '¿Cuántos equipos participan?' : 'How many teams participate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: locale === 'es'
                ? 'Participan 48 selecciones divididas en 12 grupos de 4 equipos, que disputan 104 partidos en total.'
                : '48 nations divided into 12 groups of 4 teams play 104 matches in total.',
            },
          },
          {
            '@type': 'Question',
            name: locale === 'es' ? '¿Dónde se juega la final?' : 'Where is the final played?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: locale === 'es'
                ? 'La Gran Final se juega el 19 de julio de 2026 en el MetLife Stadium (East Rutherford, Nueva Jersey, Estados Unidos).'
                : 'The Final is played on July 19, 2026 at MetLife Stadium (East Rutherford, New Jersey, USA).',
            },
          },
        ],
      },
    ];

    // Add a SportsEvent for the opening match + the final
    const opening = worldCupMatches.find(m => m.id === 1);
    const final = worldCupMatches.find(m => m.stage === 'final');
    if (opening) {
      ld.push({
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: locale === 'es' ? `Mundial 2026: ${opening.homeTeam} vs ${opening.awayTeam}` : `World Cup 2026: ${opening.homeTeam} vs ${opening.awayTeam}`,
        startDate: `${opening.date}T${opening.time}:00-05:00`,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: opening.venue, address: { '@type': 'PostalAddress', addressLocality: opening.city, addressCountry: opening.country } },
        sport: 'Football',
        homeTeam: { '@type': 'SportsTeam', name: opening.homeTeam },
        awayTeam: { '@type': 'SportsTeam', name: opening.awayTeam },
      });
    }
    if (final) {
      ld.push({
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: locale === 'es' ? 'Gran Final del Mundial 2026' : '2026 World Cup Final',
        startDate: `${final.date}T${final.time}:00-04:00`,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: final.venue, address: { '@type': 'PostalAddress', addressLocality: final.city, addressCountry: final.country } },
        sport: 'Football',
        description: locale === 'es'
          ? 'La final del Mundial más grande de la historia.'
          : 'The final of the biggest World Cup ever.',
      });
    }

    setStructuredData('dynamic', ld);
  }, [locale, pageTitle, pageDescription]);

  return null;
}
