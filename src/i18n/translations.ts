export type Locale = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      matches: 'Partidos',
      groups: 'Grupos',
      venues: 'Sedes',
      hostCountries: 'Países Anfitriones',
    },
    header: {
      hostCountriesLabel: 'Países Anfitriones',
      skipToContent: 'Saltar al contenido',
    },
    hero: {
      badge: 'Copa Mundial de la FIFA 2026',
      title1: 'WORLD CUP',
      title2: '2026',
      subtitle: 'El torneo más grande de la historia',
      edition: '11 Junio — 19 Julio 2026',
      location: 'Estados Unidos · México · Canadá',
      ctaCalendar: 'Importar al Calendario',
      ctaCalendarHint: 'Todos los 104 partidos · Formato ICS',
      exporting: 'Exportando…',
      exported: '¡Calendario descargado!',
      scroll: 'Descubrir',
    },
    stats: {
      countries: 'Países',
      teams: 'Equipos',
      matches: 'Partidos',
      venues: 'Sedes',
    },
    upcoming: {
      title: 'Partidos de la Semana',
      subtitle: 'Próximos {count} partidos del torneo',
      more: 'Y {count} partidos más esta semana',
      viewAll: 'Ver todos los partidos',
      today: 'HOY',
      noMatches: 'No hay partidos en los próximos 7 días',
    },
    fixtures: {
      title: 'Fixture Completo',
      subtitle: '{groups} partidos de grupos · {knockout} fase final',
      filterAll: 'Todos los partidos',
      filterGroup: 'Grupo {group}',
      showMore: 'Ver {count} partidos más',
      showLess: 'Mostrar menos',
    },
    match: {
      final: 'FINAL',
      live: 'EN VIVO',
      postponed: 'Pospuesto',
      goals: 'Goles',
      showGoals: 'Ver goles',
      hideGoals: 'Ocultar goles',
      penalty: 'penales',
      ownGoal: 'en contra',
      vs: 'vs',
    },
    groups: {
      title: 'Los 12 Grupos',
      subtitle: '48 selecciones divididas en 12 grupos de 4 equipos',
      viewMatches: 'Ver partidos',
    },
    venues: {
      title: 'Las 16 Sedes',
      subtitle: 'Estados Unidos, México y Canadá reciben el Mundial más grande',
      capacity: 'Capacidad',
      city: 'Ciudad',
      country: 'País',
    },
    hostCountries: {
      title: 'Países Anfitriones',
      subtitle: '16 ciudades sede en 3 países',
      matches: 'partidos',
      cities: 'ciudades',
    },
    final: {
      title: 'GRAN FINAL',
      date: '19 Julio 2026 · 15:00',
      venue: 'MetLife Stadium · Nueva York / Nueva Jersey',
      tagline: 'El campeón se corona',
    },
    footer: {
      tagline: 'La cita más grande del fútbol',
      quickLinks: 'Enlaces',
      language: 'Idioma',
      copyright: '© 2026 FIFA World Cup · Copa Mundial de la FIFA',
      madeWith: 'Hecho con pasión para los hinchas del mundo',
    },
    days: {
      mon: 'LUN',
      tue: 'MAR',
      wed: 'MIÉ',
      thu: 'JUE',
      fri: 'VIE',
      sat: 'SÁB',
      sun: 'DOM',
    },
    months: {
      short: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    },
    a11y: {
      languageSelector: 'Selector de idioma',
      match: 'Partido',
      versus: 'versus',
    },
  },
  en: {
    nav: {
      home: 'Home',
      matches: 'Matches',
      groups: 'Groups',
      venues: 'Venues',
      hostCountries: 'Host Countries',
    },
    header: {
      hostCountriesLabel: 'Host Countries',
      skipToContent: 'Skip to content',
    },
    hero: {
      badge: 'FIFA World Cup 2026',
      title1: 'WORLD CUP',
      title2: '2026',
      subtitle: 'The biggest tournament in history',
      edition: 'June 11 — July 19, 2026',
      location: 'United States · Mexico · Canada',
      ctaCalendar: 'Add to Calendar',
      ctaCalendarHint: 'All 104 matches · ICS format',
      exporting: 'Exporting…',
      exported: 'Calendar downloaded!',
      scroll: 'Discover',
    },
    stats: {
      countries: 'Countries',
      teams: 'Teams',
      matches: 'Matches',
      venues: 'Venues',
    },
    upcoming: {
      title: 'Matches This Week',
      subtitle: 'Next {count} matches of the tournament',
      more: 'And {count} more matches this week',
      viewAll: 'View all matches',
      today: 'TODAY',
      noMatches: 'No matches in the next 7 days',
    },
    fixtures: {
      title: 'Full Fixtures',
      subtitle: '{groups} group matches · {knockout} knockout stage',
      filterAll: 'All matches',
      filterGroup: 'Group {group}',
      showMore: 'Show {count} more matches',
      showLess: 'Show less',
    },
    match: {
      final: 'FULL TIME',
      live: 'LIVE',
      postponed: 'Postponed',
      goals: 'Goals',
      showGoals: 'Show goals',
      hideGoals: 'Hide goals',
      penalty: 'penalties',
      ownGoal: 'own goal',
      vs: 'vs',
    },
    groups: {
      title: 'The 12 Groups',
      subtitle: '48 nations divided into 12 groups of 4 teams',
      viewMatches: 'View matches',
    },
    venues: {
      title: 'The 16 Host Cities',
      subtitle: 'USA, Mexico and Canada host the biggest World Cup',
      capacity: 'Capacity',
      city: 'City',
      country: 'Country',
    },
    hostCountries: {
      title: 'Host Countries',
      subtitle: '16 host cities across 3 nations',
      matches: 'matches',
      cities: 'cities',
    },
    final: {
      title: 'THE FINAL',
      date: 'July 19, 2026 · 3:00 PM',
      venue: 'MetLife Stadium · New York / New Jersey',
      tagline: 'The champion is crowned',
    },
    footer: {
      tagline: 'The greatest show in football',
      quickLinks: 'Quick Links',
      language: 'Language',
      copyright: '© 2026 FIFA World Cup · The FIFA World Cup',
      madeWith: 'Made with passion for fans around the world',
    },
    days: {
      mon: 'MON',
      tue: 'TUE',
      wed: 'WED',
      thu: 'THU',
      fri: 'FRI',
      sat: 'SAT',
      sun: 'SUN',
    },
    months: {
      short: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    },
    a11y: {
      languageSelector: 'Language selector',
      match: 'Match',
      versus: 'versus',
    },
  },
};

export type Translations = {
  nav: Record<string, string>;
  header: { hostCountriesLabel: string; skipToContent: string };
  hero: Record<string, string>;
  stats: Record<string, string>;
  upcoming: Record<string, string>;
  fixtures: Record<string, string>;
  match: Record<string, string>;
  groups: Record<string, string>;
  venues: Record<string, string>;
  hostCountries: Record<string, string>;
  final: Record<string, string>;
  footer: Record<string, string>;
  days: Record<string, string>;
  months: { short: string[] };
  a11y: Record<string, string>;
};
