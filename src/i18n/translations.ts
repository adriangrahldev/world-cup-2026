export type Locale = 'es' | 'en' | 'pt' | 'fr';

type TranslationsTree = {
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
  scorers: { title: string; subtitle: string; goals: string; penalty: string; ownGoal: string };
  bracket: { title: string; subtitle: string };
  filters: { all: string; upcoming: string; finished: string; live: string };
};

const t: Record<Locale, TranslationsTree> = {
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
      ctaMatches: 'Ver partidos',
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
      mon: 'LUN', tue: 'MAR', wed: 'MIÉ', thu: 'JUE', fri: 'VIE', sat: 'SÁB', sun: 'DOM',
    },
    months: {
      short: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    },
    a11y: {
      languageSelector: 'Selector de idioma',
      match: 'Partido',
      versus: 'versus',
    },
    scorers: {
      title: 'Goleadores del Mundial',
      subtitle: 'Los máximos artilleros del torneo',
      goals: 'Goles',
      penalty: 'penales',
      ownGoal: 'en contra',
    },
    bracket: {
      title: 'Llave de la fase final',
      subtitle: '32avos, octavos, cuartos, semis, tercer puesto y la gran final',
    },
    filters: {
      all: 'Todos',
      upcoming: 'Próximos',
      finished: 'Finalizados',
      live: 'En vivo',
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
      ctaMatches: 'View matches',
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
      mon: 'MON', tue: 'TUE', wed: 'WED', thu: 'THU', fri: 'FRI', sat: 'SAT', sun: 'SUN',
    },
    months: {
      short: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    },
    a11y: {
      languageSelector: 'Language selector',
      match: 'Match',
      versus: 'versus',
    },
    scorers: {
      title: 'Top Scorers',
      subtitle: 'The leading goalscorers of the tournament',
      goals: 'Goals',
      penalty: 'penalties',
      ownGoal: 'own goal',
    },
    bracket: {
      title: 'Knockout Bracket',
      subtitle: 'Round of 32, Round of 16, quarters, semis, third place and the final',
    },
    filters: {
      all: 'All',
      upcoming: 'Upcoming',
      finished: 'Finished',
      live: 'Live',
    },
  },
  pt: {
    nav: {
      home: 'Início',
      matches: 'Partidas',
      groups: 'Grupos',
      venues: 'Sedes',
      hostCountries: 'Países Anfitriões',
    },
    header: {
      hostCountriesLabel: 'Países Anfitriões',
      skipToContent: 'Pular para o conteúdo',
    },
    hero: {
      badge: 'Copa do Mundo da FIFA 2026',
      title1: 'WORLD CUP',
      title2: '2026',
      subtitle: 'O maior torneio da história',
      edition: '11 de junho — 19 de julho de 2026',
      location: 'Estados Unidos · México · Canadá',
      ctaCalendar: 'Adicionar ao calendário',
      ctaCalendarHint: 'Todas as 104 partidas · Formato ICS',
      ctaMatches: 'Ver partidas',
      exporting: 'Exportando…',
      exported: 'Calendário baixado!',
      scroll: 'Descobrir',
    },
    stats: {
      countries: 'Países',
      teams: 'Seleções',
      matches: 'Partidas',
      venues: 'Sedes',
    },
    upcoming: {
      title: 'Partidas da Semana',
      subtitle: 'Próximas {count} partidas do torneio',
      more: 'E mais {count} partidas esta semana',
      viewAll: 'Ver todas as partidas',
      today: 'HOJE',
      noMatches: 'Não há partidas nos próximos 7 dias',
    },
    fixtures: {
      title: 'Tabela Completa',
      subtitle: '{groups} partidas de grupos · {knockout} fase final',
      filterAll: 'Todas as partidas',
      filterGroup: 'Grupo {group}',
      showMore: 'Ver mais {count} partidas',
      showLess: 'Mostrar menos',
    },
    match: {
      final: 'FIM DE JOGO',
      live: 'AO VIVO',
      postponed: 'Adiado',
      goals: 'Gols',
      showGoals: 'Ver gols',
      hideGoals: 'Ocultar gols',
      penalty: 'pênaltis',
      ownGoal: 'gol contra',
      vs: 'vs',
    },
    groups: {
      title: 'Os 12 Grupos',
      subtitle: '48 seleções divididas em 12 grupos de 4 times',
      viewMatches: 'Ver partidas',
    },
    venues: {
      title: 'As 16 Sedes',
      subtitle: 'EUA, México e Canadá sediam a maior Copa do Mundo',
      capacity: 'Capacidade',
      city: 'Cidade',
      country: 'País',
    },
    hostCountries: {
      title: 'Países Anfitriões',
      subtitle: '16 cidades-sede em 3 países',
      matches: 'partidas',
      cities: 'cidades',
    },
    final: {
      title: 'GRANDE FINAL',
      date: '19 de julho de 2026 · 15h00',
      venue: 'MetLife Stadium · Nova York / Nova Jérsei',
      tagline: 'O campeão é coroado',
    },
    footer: {
      tagline: 'O maior espetáculo do futebol',
      quickLinks: 'Links',
      language: 'Idioma',
      copyright: '© 2026 FIFA World Cup · Copa do Mundo da FIFA',
      madeWith: 'Feito com paixão para os torcedores do mundo',
    },
    days: {
      mon: 'SEG', tue: 'TER', wed: 'QUA', thu: 'QUI', fri: 'SEX', sat: 'SÁB', sun: 'DOM',
    },
    months: {
      short: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
    },
    a11y: {
      languageSelector: 'Seletor de idioma',
      match: 'Partida',
      versus: 'versus',
    },
    scorers: {
      title: 'Artilheiros',
      subtitle: 'Os goleadores do torneio',
      goals: 'Gols',
      penalty: 'pênaltis',
      ownGoal: 'gol contra',
    },
    bracket: {
      title: 'Chave da fase final',
      subtitle: '32-avos, oitavas, quartas, semis, terceiro lugar e a grande final',
    },
    filters: {
      all: 'Todos',
      upcoming: 'Próximos',
      finished: 'Encerrados',
      live: 'Ao vivo',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      matches: 'Matchs',
      groups: 'Groupes',
      venues: 'Sites',
      hostCountries: 'Pays hôtes',
    },
    header: {
      hostCountriesLabel: 'Pays hôtes',
      skipToContent: 'Aller au contenu',
    },
    hero: {
      badge: 'Coupe du Monde de la FIFA 2026',
      title1: 'WORLD CUP',
      title2: '2026',
      subtitle: 'Le plus grand tournoi de l\'histoire',
      edition: '11 juin — 19 juillet 2026',
      location: 'États-Unis · Mexique · Canada',
      ctaCalendar: 'Ajouter au calendrier',
      ctaCalendarHint: 'Les 104 matchs · Format ICS',
      ctaMatches: 'Voir les matchs',
      exporting: 'Exportation…',
      exported: 'Calendrier téléchargé !',
      scroll: 'Découvrir',
    },
    stats: {
      countries: 'Pays',
      teams: 'Équipes',
      matches: 'Matchs',
      venues: 'Sites',
    },
    upcoming: {
      title: 'Matchs de la semaine',
      subtitle: 'Les {count} prochains matchs du tournoi',
      more: 'Et {count} matchs de plus cette semaine',
      viewAll: 'Voir tous les matchs',
      today: 'AUJOURD\'HUI',
      noMatches: 'Aucun match dans les 7 prochains jours',
    },
    fixtures: {
      title: 'Calendrier complet',
      subtitle: '{groups} matchs de groupes · {knockout} phase finale',
      filterAll: 'Tous les matchs',
      filterGroup: 'Groupe {group}',
      showMore: 'Voir {count} matchs de plus',
      showLess: 'Voir moins',
    },
    match: {
      final: 'TERMINÉ',
      live: 'EN DIRECT',
      postponed: 'Reporté',
      goals: 'Buts',
      showGoals: 'Voir les buts',
      hideGoals: 'Masquer les buts',
      penalty: 'tirs au but',
      ownGoal: 'csc',
      vs: 'vs',
    },
    groups: {
      title: 'Les 12 groupes',
      subtitle: '48 nations réparties en 12 groupes de 4 équipes',
      viewMatches: 'Voir les matchs',
    },
    venues: {
      title: 'Les 16 sites',
      subtitle: 'Les États-Unis, le Mexique et le Canada accueillent la plus grande Coupe du Monde',
      capacity: 'Capacité',
      city: 'Ville',
      country: 'Pays',
    },
    hostCountries: {
      title: 'Pays hôtes',
      subtitle: '16 villes hôtes dans 3 pays',
      matches: 'matchs',
      cities: 'villes',
    },
    final: {
      title: 'LA FINALE',
      date: '19 juillet 2026 · 15h00',
      venue: 'MetLife Stadium · New York / New Jersey',
      tagline: 'Le champion est couronné',
    },
    footer: {
      tagline: 'Le plus grand spectacle du football',
      quickLinks: 'Liens',
      language: 'Langue',
      copyright: '© 2026 FIFA World Cup · Coupe du Monde de la FIFA',
      madeWith: 'Fait avec passion pour les supporters du monde entier',
    },
    days: {
      mon: 'LUN', tue: 'MAR', wed: 'MER', thu: 'JEU', fri: 'VEN', sat: 'SAM', sun: 'DIM',
    },
    months: {
      short: ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'],
    },
    a11y: {
      languageSelector: 'Sélecteur de langue',
      match: 'Match',
      versus: 'contre',
    },
    scorers: {
      title: 'Meilleurs buteurs',
      subtitle: 'Les buteurs du tournoi',
      goals: 'Buts',
      penalty: 'penaltys',
      ownGoal: 'csc',
    },
    bracket: {
      title: 'Tableau final',
      subtitle: '32e de finale, 16e, quarts, demis, match pour la 3e place et la finale',
    },
    filters: {
      all: 'Tous',
      upcoming: 'À venir',
      finished: 'Terminés',
      live: 'En direct',
    },
  },
};

export const translations: Record<Locale, TranslationsTree> = t;
export const translationsTree = t;

export type Translations = TranslationsTree;
