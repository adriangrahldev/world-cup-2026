import { useEffect, useMemo } from 'react';
import type { Locale } from '../i18n/translations';
import { worldCupMatches, getMatchUtcDate } from '../data/matches';
import { results, getMatchResult } from '../data/results';
import { getTournamentSummary, getTopScorers } from '../data/stats';

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
  const summary = useMemo(() => getTournamentSummary(), []);
  const top = useMemo(() => getTopScorers(1)[0], []);

  useEffect(() => {
    // ---------- dynamic title / description ----------
    const topLine = top
      ? (locale === 'es' ? `Goleador: ${top.player} (${top.goals})` : `Top scorer: ${top.player} (${top.goals})`)
      : '';
    const liveLine = summary.matchesPlayed > 0
      ? (locale === 'es'
          ? `${summary.matchesPlayed} jugados · ${summary.goalsScored} goles`
          : `${summary.matchesPlayed} played · ${summary.goalsScored} goals`)
      : '';

    const defaultTitle = locale === 'es'
      ? `Mundial 2026 · Calendario, Resultados, Grupos y Sedes${liveLine ? ' · ' + liveLine : ''}`
      : `World Cup 2026 · Schedule, Results, Groups & Venues${liveLine ? ' · ' + liveLine : ''}`;

    const title = pageTitle || defaultTitle;

    const defaultDescription = (() => {
      if (summary.matchesPlayed > 0 && top) {
        return locale === 'es'
          ? `Copa Mundial 2026: ${summary.matchesPlayed} partidos jugados, ${summary.goalsScored} goles. ${topLine}. Calendario completo de los 104 partidos, los 12 grupos y las 16 sedes oficiales en EE.UU., México y Canadá.`
          : `2026 World Cup: ${summary.matchesPlayed} matches played, ${summary.goalsScored} goals. ${topLine}. Full schedule of 104 matches, 12 groups and 16 host venues in USA, Mexico and Canada.`;
      }
      return locale === 'es'
        ? 'Copa Mundial de la FIFA 2026: calendario completo de los 104 partidos, los 12 grupos, las 48 selecciones y las 16 sedes oficiales en Estados Unidos, México y Canadá.'
        : 'FIFA World Cup 2026: full schedule of 104 matches, 12 groups, 48 nations and 16 host venues in the United States, Mexico and Canada.';
    })();
    const description = pageDescription || defaultDescription;

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', `${BASE}/`, 'property');
    setMeta('og:locale', locale === 'es' ? 'es_ES' : 'en_US', 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    setLink('canonical', `${BASE}/`);
    setLink('alternate', `${BASE}/?lang=es`, 'es');
    setLink('alternate', `${BASE}/?lang=en`, 'en');
    setLink('alternate', `${BASE}/?lang=pt`, 'pt');
    setLink('alternate', `${BASE}/?lang=fr`, 'fr');
    setLink('alternate', `${BASE}/`, 'x-default');

    // ---------- structured data ----------
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
                ? 'El Mundial 2026 comenzó el 11 de junio de 2026 con el partido inaugural México vs Sudáfrica en el Estadio Azteca.'
                : 'The 2026 World Cup started on June 11, 2026, with the opening match Mexico vs South Africa at Estadio Azteca.',
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

    // ---------- SportsEvent per match ----------
    // Opening + final are always included; played matches get a richer block with result.
    const opening = worldCupMatches.find(m => m.id === 1);
    const final = worldCupMatches.find(m => m.stage === 'final');

    const buildEvent = (m: typeof worldCupMatches[number], withResult: boolean) => {
      const r = withResult ? getMatchResult(m.id) : undefined;
      const event: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: locale === 'es'
          ? (m.group ? `Mundial 2026 - Grupo ${m.group}: ${m.homeTeam} vs ${m.awayTeam}` : `Mundial 2026: ${m.homeTeam} vs ${m.awayTeam}`)
          : (m.group ? `World Cup 2026 - Group ${m.group}: ${m.homeTeam} vs ${m.awayTeam}` : `World Cup 2026: ${m.homeTeam} vs ${m.awayTeam}`),
        startDate: getMatchUtcDate(m).toISOString(),
        eventStatus: r?.status === 'final' ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: m.venue,
          address: { '@type': 'PostalAddress', addressLocality: m.city, addressCountry: m.country },
        },
        sport: 'Football',
        homeTeam: { '@type': 'SportsTeam', name: m.homeTeam },
        awayTeam: { '@type': 'SportsTeam', name: m.awayTeam },
      };
      if (r && r.status === 'final') {
        event.description = locale === 'es'
          ? `${m.homeTeam} ${r.homeScore} - ${r.awayScore} ${m.awayTeam}`
          : `${m.homeTeam} ${r.homeScore} - ${r.awayScore} ${m.awayTeam}`;
      }
      return event;
    };

    if (opening) ld.push(buildEvent(opening, true));
    if (final) ld.push(buildEvent(final, true));

    // All played matches (up to 20 in JSON-LD to stay light)
    const playedEvents: object[] = results
      .filter(r => r.status === 'final' && r.id !== 1 && worldCupMatches.find(m => m.id === r.id)?.stage !== 'final')
      .slice(0, 20)
      .map(r => {
        const m = worldCupMatches.find(x => x.id === r.id);
        return m ? buildEvent(m, true) : null;
      })
      .filter((x): x is Record<string, unknown> => !!x);
    ld.push(...playedEvents);

    setStructuredData('dynamic', ld);
  }, [locale, pageTitle, pageDescription, summary, top]);

  return null;
}
