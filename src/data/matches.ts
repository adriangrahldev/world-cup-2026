export interface Match {
  id: number;
  homeTeam: string;
  homeTeamFlag: string;
  awayTeam: string;
  awayTeamFlag: string;
  date: string;
  time: string;
  venue: string;
  venueImage?: string;
  city: string;
  country: 'USA' | 'MEX' | 'CAN';
  group?: string;
  stage?: 'group' | 'round16' | 'round8' | 'quarter' | 'semi' | 'third' | 'final';
}

export const teamFlags: Record<string, string> = {
  'México': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1280px-Flag_of_Mexico.svg.png',
  'Sudáfrica': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Flag_of_South_Africa.svg/1280px-Flag_of_South_Africa.svg.png',
  'Corea del Sur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png',
  'República Checa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/1280px-Flag_of_the_Czech_Republic.svg.png',
  'Canadá': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1280px-Flag_of_Canada_%28Pantone%29.svg.png',
  'Bosnia y Herzegovina': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Bosnia_and_Herzegovina.svg/1280px-Flag_of_Bosnia_and_Herzegovina.svg.png',
  'Catar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flag_of_Qatar.svg/1280px-Flag_of_Qatar.svg.png',
  'Suiza': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/1280px-Flag_of_Switzerland.svg.png',
  'Brasil': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Brazil_flag_300.png/1280px-Brazil_flag_300.png',
  'Marruecos': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/1280px-Flag_of_Morocco.svg.png',
  'Haití': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Haiti.svg/1280px-Flag_of_Haiti.svg.png',
  'Escocia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/1280px-Flag_of_Scotland.svg.png',
  'Estados Unidos': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1280px-Flag_of_the_United_States.png',
  'Paraguay': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Paraguay.svg/1280px-Flag_of_Paraguay.svg.png',
  'Australia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1280px-Flag_of_Australia_%28converted%29.svg.png',
  'Turquía': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1280px-Flag_of_Turkey.svg.png',
  'Alemania': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Flag_of_germany_800_480.png/1280px-Flag_of_germany_800_480.png',
  'Curazao': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Flag_of_Cura%C3%A7ao.svg/1280px-Flag_of_Cura%C3%A7ao.svg.png',
  'Costa de Marfil': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Flag_of_Cote_d%27Ivoire.svg/1280px-Flag_of_Cote_d%27Ivoire.svg.png',
  'Ecuador': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/1280px-Flag_of_Ecuador.svg.png',
  'Países Bajos': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Flag_of_the_Netherlands.png/1280px-Flag_of_the_Netherlands.png',
  'Japón': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png',
  'Suecia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/1280px-Flag_of_Sweden.svg.png',
  'Túnez': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Flag_of_Tunisia.svg/1280px-Flag_of_Tunisia.svg.png',
  'Irán': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/1280px-Flag_of_Iran.svg.png',
  'Nueva Zelanda': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/1280px-Flag_of_New_Zealand.svg.png',
  'Bélgica': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/1280px-Flag_of_Belgium.svg.png',
  'Egipto': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/1280px-Flag_of_Egypt.svg.png',
  'Arabia Saudita': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/1280px-Flag_of_Saudi_Arabia.svg.png',
  'Uruguay': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/1280px-Flag_of_Uruguay.svg.png',
  'España': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Spain_flag_300.png/1280px-Spain_flag_300.png',
  'Cabo Verde': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Cape_Verde.svg/1280px-Flag_of_Cape_Verde.svg.png',
  'Francia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Flag_of_France.png/1280px-Flag_of_France.png',
  'Senegal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/1280px-Flag_of_Senegal.svg.png',
  'Irak': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/1280px-Flag_of_Iraq.svg.png',
  'Noruega': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/1280px-Flag_of_Norway.svg.png',
  'Argentina': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flag_of_Argentina.png/1280px-Flag_of_Argentina.png',
  'Argelia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Algeria.svg/1280px-Flag_of_Algeria.svg.png',
  'Austria': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/1280px-Flag_of_Austria.svg.png',
  'Jordania': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Jordan.svg/1280px-Flag_of_Jordan.svg.png',
  'Portugal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png',
  'RD Congo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/1280px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
  'Uzbekistán': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1280px-Flag_of_Uzbekistan.svg.png',
  'Colombia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1280px-Flag_of_Colombia.svg.png',
  'Ghana': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/1280px-Flag_of_Ghana.svg.png',
  'Panamá': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/1280px-Flag_of_Panama.svg.png',
  'Inglaterra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Flag_of_England.PNG/1280px-Flag_of_England.PNG',
  'Croacia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/1280px-Flag_of_Croatia.svg.png',
};

export const venueImages: Record<string, string> = {
  'Estadio Azteca': 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80',
  'Estadio Akron': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'SoFi Stadium': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
  'MetLife Stadium': 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
  'AT&T Stadium': 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80',
  'NRG Stadium': 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
  'Hard Rock Stadium': 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
  'Lumen Field': 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
  "Levi's Stadium": 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'Gillette Stadium': 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
  'BC Place': 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
  'BMO Field': 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
  'Mercedes-Benz Stadium': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'Arrowhead Stadium': 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
  'Lincoln Financial Field': 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
  'Estadio Monterrey': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
};

export const worldCupMatches: Match[] = [
  // Grupo A
  { id: 1, homeTeam: 'México', homeTeamFlag: teamFlags['México'], awayTeam: 'Sudáfrica', awayTeamFlag: teamFlags['Sudáfrica'], date: '2026-06-11', time: '13:00', venue: 'Estadio Azteca', venueImage: venueImages['Estadio Azteca'], city: 'Ciudad de México', country: 'MEX', group: 'A', stage: 'group' },
  { id: 2, homeTeam: 'Corea del Sur', homeTeamFlag: teamFlags['Corea del Sur'], awayTeam: 'República Checa', awayTeamFlag: teamFlags['República Checa'], date: '2026-06-11', time: '20:00', venue: 'Estadio Akron', venueImage: venueImages['Estadio Akron'], city: 'Guadalajara', country: 'MEX', group: 'A', stage: 'group' },
  { id: 25, homeTeam: 'República Checa', homeTeamFlag: teamFlags['República Checa'], awayTeam: 'Sudáfrica', awayTeamFlag: teamFlags['Sudáfrica'], date: '2026-06-18', time: '12:00', venue: 'Mercedes-Benz Stadium', venueImage: venueImages['Mercedes-Benz Stadium'], city: 'Atlanta', country: 'USA', group: 'A', stage: 'group' },
  { id: 28, homeTeam: 'México', homeTeamFlag: teamFlags['México'], awayTeam: 'Corea del Sur', awayTeamFlag: teamFlags['Corea del Sur'], date: '2026-06-18', time: '19:00', venue: 'Estadio Akron', venueImage: venueImages['Estadio Akron'], city: 'Guadalajara', country: 'MEX', group: 'A', stage: 'group' },
  { id: 53, homeTeam: 'República Checa', homeTeamFlag: teamFlags['República Checa'], awayTeam: 'México', awayTeamFlag: teamFlags['México'], date: '2026-06-24', time: '19:00', venue: 'Estadio Azteca', venueImage: venueImages['Estadio Azteca'], city: 'Ciudad de México', country: 'MEX', group: 'A', stage: 'group' },
  { id: 54, homeTeam: 'Sudáfrica', homeTeamFlag: teamFlags['Sudáfrica'], awayTeam: 'Corea del Sur', awayTeamFlag: teamFlags['Corea del Sur'], date: '2026-06-24', time: '19:00', venue: 'Estadio Monterrey', venueImage: venueImages['Estadio Monterrey'], city: 'Monterrey', country: 'MEX', group: 'A', stage: 'group' },

  // Grupo B
  { id: 3, homeTeam: 'Canadá', homeTeamFlag: teamFlags['Canadá'], awayTeam: 'Bosnia y Herzegovina', awayTeamFlag: teamFlags['Bosnia y Herzegovina'], date: '2026-06-12', time: '15:00', venue: 'BMO Field', venueImage: venueImages['BMO Field'], city: 'Toronto', country: 'CAN', group: 'B', stage: 'group' },
  { id: 8, homeTeam: 'Catar', homeTeamFlag: teamFlags['Catar'], awayTeam: 'Suiza', awayTeamFlag: teamFlags['Suiza'], date: '2026-06-13', time: '12:00', venue: "Levi's Stadium", venueImage: venueImages["Levi's Stadium"], city: 'San Francisco', country: 'USA', group: 'B', stage: 'group' },
  { id: 26, homeTeam: 'Suiza', homeTeamFlag: teamFlags['Suiza'], awayTeam: 'Bosnia y Herzegovina', awayTeamFlag: teamFlags['Bosnia y Herzegovina'], date: '2026-06-18', time: '12:00', venue: 'SoFi Stadium', venueImage: venueImages['SoFi Stadium'], city: 'Los Ángeles', country: 'USA', group: 'B', stage: 'group' },
  { id: 27, homeTeam: 'Canadá', homeTeamFlag: teamFlags['Canadá'], awayTeam: 'Catar', awayTeamFlag: teamFlags['Catar'], date: '2026-06-18', time: '15:00', venue: 'BC Place', venueImage: venueImages['BC Place'], city: 'Vancouver', country: 'CAN', group: 'B', stage: 'group' },
  { id: 51, homeTeam: 'Suiza', homeTeamFlag: teamFlags['Suiza'], awayTeam: 'Canadá', awayTeamFlag: teamFlags['Canadá'], date: '2026-06-24', time: '12:00', venue: 'BC Place', venueImage: venueImages['BC Place'], city: 'Vancouver', country: 'CAN', group: 'B', stage: 'group' },
  { id: 52, homeTeam: 'Bosnia y Herzegovina', homeTeamFlag: teamFlags['Bosnia y Herzegovina'], awayTeam: 'Catar', awayTeamFlag: teamFlags['Catar'], date: '2026-06-24', time: '12:00', venue: 'Lumen Field', venueImage: venueImages['Lumen Field'], city: 'Seattle', country: 'USA', group: 'B', stage: 'group' },

  // Grupo C
  { id: 5, homeTeam: 'Haití', homeTeamFlag: teamFlags['Haití'], awayTeam: 'Escocia', awayTeamFlag: teamFlags['Escocia'], date: '2026-06-13', time: '21:00', venue: 'MetLife Stadium', venueImage: venueImages['MetLife Stadium'], city: 'Nueva York', country: 'USA', group: 'C', stage: 'group' },
  { id: 7, homeTeam: 'Brasil', homeTeamFlag: teamFlags['Brasil'], awayTeam: 'Marruecos', awayTeamFlag: teamFlags['Marruecos'], date: '2026-06-13', time: '18:00', venue: 'Gillette Stadium', venueImage: venueImages['Gillette Stadium'], city: 'Boston', country: 'USA', group: 'C', stage: 'group' },
  { id: 29, homeTeam: 'Brasil', homeTeamFlag: teamFlags['Brasil'], awayTeam: 'Haití', awayTeamFlag: teamFlags['Haití'], date: '2026-06-19', time: '21:00', venue: 'Lincoln Financial Field', venueImage: venueImages['Lincoln Financial Field'], city: 'Filadelfia', country: 'USA', group: 'C', stage: 'group' },
  { id: 30, homeTeam: 'Escocia', homeTeamFlag: teamFlags['Escocia'], awayTeam: 'Marruecos', awayTeamFlag: teamFlags['Marruecos'], date: '2026-06-19', time: '18:00', venue: 'Gillette Stadium', venueImage: venueImages['Gillette Stadium'], city: 'Boston', country: 'USA', group: 'C', stage: 'group' },
  { id: 49, homeTeam: 'Escocia', homeTeamFlag: teamFlags['Escocia'], awayTeam: 'Brasil', awayTeamFlag: teamFlags['Brasil'], date: '2026-06-24', time: '18:00', venue: 'Hard Rock Stadium', venueImage: venueImages['Hard Rock Stadium'], city: 'Miami', country: 'USA', group: 'C', stage: 'group' },
  { id: 50, homeTeam: 'Marruecos', homeTeamFlag: teamFlags['Marruecos'], awayTeam: 'Haití', awayTeamFlag: teamFlags['Haití'], date: '2026-06-24', time: '18:00', venue: 'Mercedes-Benz Stadium', venueImage: venueImages['Mercedes-Benz Stadium'], city: 'Atlanta', country: 'USA', group: 'C', stage: 'group' },

  // Grupo D
  { id: 4, homeTeam: 'Estados Unidos', homeTeamFlag: teamFlags['Estados Unidos'], awayTeam: 'Paraguay', awayTeamFlag: teamFlags['Paraguay'], date: '2026-06-12', time: '18:00', venue: 'SoFi Stadium', venueImage: venueImages['SoFi Stadium'], city: 'Los Ángeles', country: 'USA', group: 'D', stage: 'group' },
  { id: 6, homeTeam: 'Australia', homeTeamFlag: teamFlags['Australia'], awayTeam: 'Turquía', awayTeamFlag: teamFlags['Turquía'], date: '2026-06-13', time: '21:00', venue: 'BC Place', venueImage: venueImages['BC Place'], city: 'Vancouver', country: 'CAN', group: 'D', stage: 'group' },
  { id: 31, homeTeam: 'Turquía', homeTeamFlag: teamFlags['Turquía'], awayTeam: 'Paraguay', awayTeamFlag: teamFlags['Paraguay'], date: '2026-06-19', time: '21:00', venue: "Levi's Stadium", venueImage: venueImages["Levi's Stadium"], city: 'San Francisco', country: 'USA', group: 'D', stage: 'group' },
  { id: 32, homeTeam: 'Estados Unidos', homeTeamFlag: teamFlags['Estados Unidos'], awayTeam: 'Australia', awayTeamFlag: teamFlags['Australia'], date: '2026-06-19', time: '12:00', venue: 'Lumen Field', venueImage: venueImages['Lumen Field'], city: 'Seattle', country: 'USA', group: 'D', stage: 'group' },
  { id: 59, homeTeam: 'Turquía', homeTeamFlag: teamFlags['Turquía'], awayTeam: 'Estados Unidos', awayTeamFlag: teamFlags['Estados Unidos'], date: '2026-06-25', time: '19:00', venue: 'SoFi Stadium', venueImage: venueImages['SoFi Stadium'], city: 'Los Ángeles', country: 'USA', group: 'D', stage: 'group' },
  { id: 60, homeTeam: 'Paraguay', homeTeamFlag: teamFlags['Paraguay'], awayTeam: 'Australia', awayTeamFlag: teamFlags['Australia'], date: '2026-06-25', time: '19:00', venue: "Levi's Stadium", venueImage: venueImages["Levi's Stadium"], city: 'San Francisco', country: 'USA', group: 'D', stage: 'group' },

  // Grupo E
  { id: 9, homeTeam: 'Costa de Marfil', homeTeamFlag: teamFlags['Costa de Marfil'], awayTeam: 'Ecuador', awayTeamFlag: teamFlags['Ecuador'], date: '2026-06-14', time: '19:00', venue: 'Lincoln Financial Field', venueImage: venueImages['Lincoln Financial Field'], city: 'Filadelfia', country: 'USA', group: 'E', stage: 'group' },
  { id: 10, homeTeam: 'Alemania', homeTeamFlag: teamFlags['Alemania'], awayTeam: 'Curazao', awayTeamFlag: teamFlags['Curazao'], date: '2026-06-14', time: '12:00', venue: 'NRG Stadium', venueImage: venueImages['NRG Stadium'], city: 'Houston', country: 'USA', group: 'E', stage: 'group' },
  { id: 33, homeTeam: 'Alemania', homeTeamFlag: teamFlags['Alemania'], awayTeam: 'Costa de Marfil', awayTeamFlag: teamFlags['Costa de Marfil'], date: '2026-06-20', time: '16:00', venue: 'BMO Field', venueImage: venueImages['BMO Field'], city: 'Toronto', country: 'CAN', group: 'E', stage: 'group' },
  { id: 34, homeTeam: 'Ecuador', homeTeamFlag: teamFlags['Ecuador'], awayTeam: 'Curazao', awayTeamFlag: teamFlags['Curazao'], date: '2026-06-20', time: '19:00', venue: 'Arrowhead Stadium', venueImage: venueImages['Arrowhead Stadium'], city: 'Kansas City', country: 'USA', group: 'E', stage: 'group' },
  { id: 55, homeTeam: 'Curazao', homeTeamFlag: teamFlags['Curazao'], awayTeam: 'Costa de Marfil', awayTeamFlag: teamFlags['Costa de Marfil'], date: '2026-06-25', time: '16:00', venue: 'Lincoln Financial Field', venueImage: venueImages['Lincoln Financial Field'], city: 'Filadelfia', country: 'USA', group: 'E', stage: 'group' },
  { id: 56, homeTeam: 'Ecuador', homeTeamFlag: teamFlags['Ecuador'], awayTeam: 'Alemania', awayTeamFlag: teamFlags['Alemania'], date: '2026-06-25', time: '16:00', venue: 'MetLife Stadium', venueImage: venueImages['MetLife Stadium'], city: 'Nueva York', country: 'USA', group: 'E', stage: 'group' },

  // Grupo F
  { id: 11, homeTeam: 'Países Bajos', homeTeamFlag: teamFlags['Países Bajos'], awayTeam: 'Japón', awayTeamFlag: teamFlags['Japón'], date: '2026-06-14', time: '15:00', venue: 'AT&T Stadium', venueImage: venueImages['AT&T Stadium'], city: 'Dallas', country: 'USA', group: 'F', stage: 'group' },
  { id: 12, homeTeam: 'Suecia', homeTeamFlag: teamFlags['Suecia'], awayTeam: 'Túnez', awayTeamFlag: teamFlags['Túnez'], date: '2026-06-14', time: '20:00', venue: 'Estadio Monterrey', venueImage: venueImages['Estadio Monterrey'], city: 'Monterrey', country: 'MEX', group: 'F', stage: 'group' },
  { id: 35, homeTeam: 'Países Bajos', homeTeamFlag: teamFlags['Países Bajos'], awayTeam: 'Suecia', awayTeamFlag: teamFlags['Suecia'], date: '2026-06-20', time: '12:00', venue: 'NRG Stadium', venueImage: venueImages['NRG Stadium'], city: 'Houston', country: 'USA', group: 'F', stage: 'group' },
  { id: 36, homeTeam: 'Túnez', homeTeamFlag: teamFlags['Túnez'], awayTeam: 'Japón', awayTeamFlag: teamFlags['Japón'], date: '2026-06-20', time: '22:00', venue: 'Estadio Monterrey', venueImage: venueImages['Estadio Monterrey'], city: 'Monterrey', country: 'MEX', group: 'F', stage: 'group' },
  { id: 57, homeTeam: 'Japón', homeTeamFlag: teamFlags['Japón'], awayTeam: 'Suecia', awayTeamFlag: teamFlags['Suecia'], date: '2026-06-25', time: '18:00', venue: 'AT&T Stadium', venueImage: venueImages['AT&T Stadium'], city: 'Dallas', country: 'USA', group: 'F', stage: 'group' },
  { id: 58, homeTeam: 'Túnez', homeTeamFlag: teamFlags['Túnez'], awayTeam: 'Países Bajos', awayTeamFlag: teamFlags['Países Bajos'], date: '2026-06-25', time: '18:00', venue: 'Arrowhead Stadium', venueImage: venueImages['Arrowhead Stadium'], city: 'Kansas City', country: 'USA', group: 'F', stage: 'group' },

  // Grupo G
  { id: 15, homeTeam: 'Irán', homeTeamFlag: teamFlags['Irán'], awayTeam: 'Nueva Zelanda', awayTeamFlag: teamFlags['Nueva Zelanda'], date: '2026-06-15', time: '18:00', venue: 'Lumen Field', venueImage: venueImages['Lumen Field'], city: 'Seattle', country: 'USA', group: 'G', stage: 'group' },
  { id: 16, homeTeam: 'Bélgica', homeTeamFlag: teamFlags['Bélgica'], awayTeam: 'Egipto', awayTeamFlag: teamFlags['Egipto'], date: '2026-06-15', time: '12:00', venue: 'SoFi Stadium', venueImage: venueImages['SoFi Stadium'], city: 'Los Ángeles', country: 'USA', group: 'G', stage: 'group' },
  { id: 39, homeTeam: 'Bélgica', homeTeamFlag: teamFlags['Bélgica'], awayTeam: 'Irán', awayTeamFlag: teamFlags['Irán'], date: '2026-06-21', time: '12:00', venue: 'SoFi Stadium', venueImage: venueImages['SoFi Stadium'], city: 'Los Ángeles', country: 'USA', group: 'G', stage: 'group' },
  { id: 40, homeTeam: 'Nueva Zelanda', homeTeamFlag: teamFlags['Nueva Zelanda'], awayTeam: 'Egipto', awayTeamFlag: teamFlags['Egipto'], date: '2026-06-21', time: '18:00', venue: 'BC Place', venueImage: venueImages['BC Place'], city: 'Vancouver', country: 'CAN', group: 'G', stage: 'group' },
  { id: 63, homeTeam: 'Egipto', homeTeamFlag: teamFlags['Egipto'], awayTeam: 'Irán', awayTeamFlag: teamFlags['Irán'], date: '2026-06-26', time: '20:00', venue: 'Lumen Field', venueImage: venueImages['Lumen Field'], city: 'Seattle', country: 'USA', group: 'G', stage: 'group' },
  { id: 64, homeTeam: 'Nueva Zelanda', homeTeamFlag: teamFlags['Nueva Zelanda'], awayTeam: 'Bélgica', awayTeamFlag: teamFlags['Bélgica'], date: '2026-06-26', time: '20:00', venue: 'BC Place', venueImage: venueImages['BC Place'], city: 'Vancouver', country: 'CAN', group: 'G', stage: 'group' },

  // Grupo H
  { id: 13, homeTeam: 'Arabia Saudita', homeTeamFlag: teamFlags['Arabia Saudita'], awayTeam: 'Uruguay', awayTeamFlag: teamFlags['Uruguay'], date: '2026-06-15', time: '18:00', venue: 'Hard Rock Stadium', venueImage: venueImages['Hard Rock Stadium'], city: 'Miami', country: 'USA', group: 'H', stage: 'group' },
  { id: 14, homeTeam: 'España', homeTeamFlag: teamFlags['España'], awayTeam: 'Cabo Verde', awayTeamFlag: teamFlags['Cabo Verde'], date: '2026-06-15', time: '12:00', venue: 'Mercedes-Benz Stadium', venueImage: venueImages['Mercedes-Benz Stadium'], city: 'Atlanta', country: 'USA', group: 'H', stage: 'group' },
  { id: 37, homeTeam: 'Uruguay', homeTeamFlag: teamFlags['Uruguay'], awayTeam: 'Cabo Verde', awayTeamFlag: teamFlags['Cabo Verde'], date: '2026-06-21', time: '18:00', venue: 'Mercedes-Benz Stadium', venueImage: venueImages['Mercedes-Benz Stadium'], city: 'Atlanta', country: 'USA', group: 'H', stage: 'group' },
  { id: 38, homeTeam: 'España', homeTeamFlag: teamFlags['España'], awayTeam: 'Arabia Saudita', awayTeamFlag: teamFlags['Arabia Saudita'], date: '2026-06-21', time: '12:00', venue: 'Hard Rock Stadium', venueImage: venueImages['Hard Rock Stadium'], city: 'Miami', country: 'USA', group: 'H', stage: 'group' },
  { id: 65, homeTeam: 'Cabo Verde', homeTeamFlag: teamFlags['Cabo Verde'], awayTeam: 'Arabia Saudita', awayTeamFlag: teamFlags['Arabia Saudita'], date: '2026-06-26', time: '19:00', venue: 'NRG Stadium', venueImage: venueImages['NRG Stadium'], city: 'Houston', country: 'USA', group: 'H', stage: 'group' },
  { id: 66, homeTeam: 'Uruguay', homeTeamFlag: teamFlags['Uruguay'], awayTeam: 'España', awayTeamFlag: teamFlags['España'], date: '2026-06-26', time: '18:00', venue: 'Estadio Akron', venueImage: venueImages['Estadio Akron'], city: 'Guadalajara', country: 'MEX', group: 'H', stage: 'group' },

  // Grupo I
  { id: 17, homeTeam: 'Francia', homeTeamFlag: teamFlags['Francia'], awayTeam: 'Senegal', awayTeamFlag: teamFlags['Senegal'], date: '2026-06-16', time: '15:00', venue: 'MetLife Stadium', venueImage: venueImages['MetLife Stadium'], city: 'Nueva York', country: 'USA', group: 'I', stage: 'group' },
  { id: 18, homeTeam: 'Irak', homeTeamFlag: teamFlags['Irak'], awayTeam: 'Noruega', awayTeamFlag: teamFlags['Noruega'], date: '2026-06-16', time: '18:00', venue: 'Gillette Stadium', venueImage: venueImages['Gillette Stadium'], city: 'Boston', country: 'USA', group: 'I', stage: 'group' },
  { id: 41, homeTeam: 'Noruega', homeTeamFlag: teamFlags['Noruega'], awayTeam: 'Senegal', awayTeamFlag: teamFlags['Senegal'], date: '2026-06-22', time: '20:00', venue: 'Lincoln Financial Field', venueImage: venueImages['Lincoln Financial Field'], city: 'Filadelfia', country: 'USA', group: 'I', stage: 'group' },
  { id: 42, homeTeam: 'Francia', homeTeamFlag: teamFlags['Francia'], awayTeam: 'Irak', awayTeamFlag: teamFlags['Irak'], date: '2026-06-22', time: '17:00', venue: 'MetLife Stadium', venueImage: venueImages['MetLife Stadium'], city: 'Nueva York', country: 'USA', group: 'I', stage: 'group' },
  { id: 61, homeTeam: 'Noruega', homeTeamFlag: teamFlags['Noruega'], awayTeam: 'Francia', awayTeamFlag: teamFlags['Francia'], date: '2026-06-26', time: '15:00', venue: 'Gillette Stadium', venueImage: venueImages['Gillette Stadium'], city: 'Boston', country: 'USA', group: 'I', stage: 'group' },
  { id: 62, homeTeam: 'Senegal', homeTeamFlag: teamFlags['Senegal'], awayTeam: 'Irak', awayTeamFlag: teamFlags['Irak'], date: '2026-06-26', time: '15:00', venue: 'BMO Field', venueImage: venueImages['BMO Field'], city: 'Toronto', country: 'CAN', group: 'I', stage: 'group' },

  // Grupo J
  { id: 19, homeTeam: 'Argentina', homeTeamFlag: teamFlags['Argentina'], awayTeam: 'Argelia', awayTeamFlag: teamFlags['Argelia'], date: '2026-06-16', time: '20:00', venue: 'Arrowhead Stadium', venueImage: venueImages['Arrowhead Stadium'], city: 'Kansas City', country: 'USA', group: 'J', stage: 'group' },
  { id: 20, homeTeam: 'Austria', homeTeamFlag: teamFlags['Austria'], awayTeam: 'Jordania', awayTeamFlag: teamFlags['Jordania'], date: '2026-06-16', time: '21:00', venue: "Levi's Stadium", venueImage: venueImages["Levi's Stadium"], city: 'San Francisco', country: 'USA', group: 'J', stage: 'group' },
  { id: 43, homeTeam: 'Argentina', homeTeamFlag: teamFlags['Argentina'], awayTeam: 'Austria', awayTeamFlag: teamFlags['Austria'], date: '2026-06-22', time: '12:00', venue: 'AT&T Stadium', venueImage: venueImages['AT&T Stadium'], city: 'Dallas', country: 'USA', group: 'J', stage: 'group' },
  { id: 44, homeTeam: 'Jordania', homeTeamFlag: teamFlags['Jordania'], awayTeam: 'Argelia', awayTeamFlag: teamFlags['Argelia'], date: '2026-06-22', time: '20:00', venue: "Levi's Stadium", venueImage: venueImages["Levi's Stadium"], city: 'San Francisco', country: 'USA', group: 'J', stage: 'group' },
  { id: 69, homeTeam: 'Argelia', homeTeamFlag: teamFlags['Argelia'], awayTeam: 'Austria', awayTeamFlag: teamFlags['Austria'], date: '2026-06-27', time: '21:00', venue: 'Arrowhead Stadium', venueImage: venueImages['Arrowhead Stadium'], city: 'Kansas City', country: 'USA', group: 'J', stage: 'group' },
  { id: 70, homeTeam: 'Jordania', homeTeamFlag: teamFlags['Jordania'], awayTeam: 'Argentina', awayTeamFlag: teamFlags['Argentina'], date: '2026-06-27', time: '21:00', venue: 'AT&T Stadium', venueImage: venueImages['AT&T Stadium'], city: 'Dallas', country: 'USA', group: 'J', stage: 'group' },

  // Grupo K
  { id: 23, homeTeam: 'Portugal', homeTeamFlag: teamFlags['Portugal'], awayTeam: 'RD Congo', awayTeamFlag: teamFlags['RD Congo'], date: '2026-06-17', time: '12:00', venue: 'NRG Stadium', venueImage: venueImages['NRG Stadium'], city: 'Houston', country: 'USA', group: 'K', stage: 'group' },
  { id: 24, homeTeam: 'Uzbekistán', homeTeamFlag: teamFlags['Uzbekistán'], awayTeam: 'Colombia', awayTeamFlag: teamFlags['Colombia'], date: '2026-06-17', time: '20:00', venue: 'Estadio Azteca', venueImage: venueImages['Estadio Azteca'], city: 'Ciudad de México', country: 'MEX', group: 'K', stage: 'group' },
  { id: 47, homeTeam: 'Portugal', homeTeamFlag: teamFlags['Portugal'], awayTeam: 'Uzbekistán', awayTeamFlag: teamFlags['Uzbekistán'], date: '2026-06-23', time: '12:00', venue: 'NRG Stadium', venueImage: venueImages['NRG Stadium'], city: 'Houston', country: 'USA', group: 'K', stage: 'group' },
  { id: 48, homeTeam: 'Colombia', homeTeamFlag: teamFlags['Colombia'], awayTeam: 'RD Congo', awayTeamFlag: teamFlags['RD Congo'], date: '2026-06-23', time: '20:00', venue: 'Estadio Akron', venueImage: venueImages['Estadio Akron'], city: 'Guadalajara', country: 'MEX', group: 'K', stage: 'group' },
  { id: 71, homeTeam: 'Colombia', homeTeamFlag: teamFlags['Colombia'], awayTeam: 'Portugal', awayTeamFlag: teamFlags['Portugal'], date: '2026-06-27', time: '19:30', venue: 'Hard Rock Stadium', venueImage: venueImages['Hard Rock Stadium'], city: 'Miami', country: 'USA', group: 'K', stage: 'group' },
  { id: 72, homeTeam: 'RD Congo', homeTeamFlag: teamFlags['RD Congo'], awayTeam: 'Uzbekistán', awayTeamFlag: teamFlags['Uzbekistán'], date: '2026-06-27', time: '19:30', venue: 'Mercedes-Benz Stadium', venueImage: venueImages['Mercedes-Benz Stadium'], city: 'Atlanta', country: 'USA', group: 'K', stage: 'group' },

  // Grupo L
  { id: 21, homeTeam: 'Ghana', homeTeamFlag: teamFlags['Ghana'], awayTeam: 'Panamá', awayTeamFlag: teamFlags['Panamá'], date: '2026-06-17', time: '19:00', venue: 'AT&T Stadium', venueImage: venueImages['AT&T Stadium'], city: 'Dallas', country: 'USA', group: 'L', stage: 'group' },
  { id: 22, homeTeam: 'Inglaterra', homeTeamFlag: teamFlags['Inglaterra'], awayTeam: 'Croacia', awayTeamFlag: teamFlags['Croacia'], date: '2026-06-17', time: '15:00', venue: 'BMO Field', venueImage: venueImages['BMO Field'], city: 'Toronto', country: 'CAN', group: 'L', stage: 'group' },
  { id: 45, homeTeam: 'Inglaterra', homeTeamFlag: teamFlags['Inglaterra'], awayTeam: 'Ghana', awayTeamFlag: teamFlags['Ghana'], date: '2026-06-23', time: '16:00', venue: 'Gillette Stadium', venueImage: venueImages['Gillette Stadium'], city: 'Boston', country: 'USA', group: 'L', stage: 'group' },
  { id: 46, homeTeam: 'Panamá', homeTeamFlag: teamFlags['Panamá'], awayTeam: 'Croacia', awayTeamFlag: teamFlags['Croacia'], date: '2026-06-23', time: '19:00', venue: 'BMO Field', venueImage: venueImages['BMO Field'], city: 'Toronto', country: 'CAN', group: 'L', stage: 'group' },
  { id: 67, homeTeam: 'Panamá', homeTeamFlag: teamFlags['Panamá'], awayTeam: 'Inglaterra', awayTeamFlag: teamFlags['Inglaterra'], date: '2026-06-27', time: '17:00', venue: 'MetLife Stadium', venueImage: venueImages['MetLife Stadium'], city: 'Nueva York', country: 'USA', group: 'L', stage: 'group' },
  { id: 68, homeTeam: 'Croacia', homeTeamFlag: teamFlags['Croacia'], awayTeam: 'Ghana', awayTeamFlag: teamFlags['Ghana'], date: '2026-06-27', time: '17:00', venue: 'Lincoln Financial Field', venueImage: venueImages['Lincoln Financial Field'], city: 'Filadelfia', country: 'USA', group: 'L', stage: 'group' },

  // Dieciseisavos de Final
  { id: 73, homeTeam: '1A', homeTeamFlag: '', awayTeam: '3C/D/E', awayTeamFlag: '', date: '2026-06-28', time: '12:00', venue: 'SoFi Stadium', venueImage: venueImages['SoFi Stadium'], city: 'Los Ángeles', country: 'USA', stage: 'round16' },
  { id: 74, homeTeam: '1C', homeTeamFlag: '', awayTeam: '3A/D', awayTeamFlag: '', date: '2026-06-29', time: '16:30', venue: 'Gillette Stadium', venueImage: venueImages['Gillette Stadium'], city: 'Boston', country: 'USA', stage: 'round16' },
  { id: 75, homeTeam: '1D', homeTeamFlag: '', awayTeam: '2F', awayTeamFlag: '', date: '2026-06-29', time: '19:00', venue: 'Estadio Monterrey', venueImage: venueImages['Estadio Monterrey'], city: 'Monterrey', country: 'MEX', stage: 'round16' },
  { id: 76, homeTeam: '1E', homeTeamFlag: '', awayTeam: '2A', awayTeamFlag: '', date: '2026-06-29', time: '12:00', venue: 'NRG Stadium', venueImage: venueImages['NRG Stadium'], city: 'Houston', country: 'USA', stage: 'round16' },
  { id: 77, homeTeam: '1G', homeTeamFlag: '', awayTeam: '2H', awayTeamFlag: '', date: '2026-06-30', time: '17:00', venue: 'MetLife Stadium', venueImage: venueImages['MetLife Stadium'], city: 'Nueva York', country: 'USA', stage: 'round16' },
  { id: 78, homeTeam: '1B', homeTeamFlag: '', awayTeam: '3A/C/D', awayTeamFlag: '', date: '2026-06-30', time: '12:00', venue: 'AT&T Stadium', venueImage: venueImages['AT&T Stadium'], city: 'Dallas', country: 'USA', stage: 'round16' },
  { id: 79, homeTeam: '1F', homeTeamFlag: '', awayTeam: '2E', awayTeamFlag: '', date: '2026-06-30', time: '19:00', venue: 'Estadio Azteca', venueImage: venueImages['Estadio Azteca'], city: 'Ciudad de México', country: 'MEX', stage: 'round16' },
  { id: 80, homeTeam: '1H', homeTeamFlag: '', awayTeam: '2G', awayTeamFlag: '', date: '2026-07-01', time: '12:00', venue: 'Mercedes-Benz Stadium', venueImage: venueImages['Mercedes-Benz Stadium'], city: 'Atlanta', country: 'USA', stage: 'round16' },
  { id: 81, homeTeam: '2B', homeTeamFlag: '', awayTeam: '2C', awayTeamFlag: '', date: '2026-07-01', time: '17:00', venue: "Levi's Stadium", venueImage: venueImages["Levi's Stadium"], city: 'San Francisco', country: 'USA', stage: 'round16' },
  { id: 82, homeTeam: '2D', homeTeamFlag: '', awayTeam: '2K', awayTeamFlag: '', date: '2026-07-01', time: '13:00', venue: 'Lumen Field', venueImage: venueImages['Lumen Field'], city: 'Seattle', country: 'USA', stage: 'round16' },
  { id: 83, homeTeam: '1K', homeTeamFlag: '', awayTeam: '2J', awayTeamFlag: '', date: '2026-07-02', time: '19:00', venue: 'BMO Field', venueImage: venueImages['BMO Field'], city: 'Toronto', country: 'CAN', stage: 'round16' },
  { id: 84, homeTeam: '1J', homeTeamFlag: '', awayTeam: '2I', awayTeamFlag: '', date: '2026-07-02', time: '12:00', venue: 'SoFi Stadium', venueImage: venueImages['SoFi Stadium'], city: 'Los Ángeles', country: 'USA', stage: 'round16' },
  { id: 85, homeTeam: '1I', homeTeamFlag: '', awayTeam: '2L', awayTeamFlag: '', date: '2026-07-02', time: '20:00', venue: 'BC Place', venueImage: venueImages['BC Place'], city: 'Vancouver', country: 'CAN', stage: 'round16' },
  { id: 86, homeTeam: '2M', homeTeamFlag: '', awayTeam: '2N', awayTeamFlag: '', date: '2026-07-03', time: '18:00', venue: 'Hard Rock Stadium', venueImage: venueImages['Hard Rock Stadium'], city: 'Miami', country: 'USA', stage: 'round16' },
  { id: 87, homeTeam: '1L', homeTeamFlag: '', awayTeam: '2M', awayTeamFlag: '', date: '2026-07-03', time: '20:30', venue: 'Arrowhead Stadium', venueImage: venueImages['Arrowhead Stadium'], city: 'Kansas City', country: 'USA', stage: 'round16' },
  { id: 88, homeTeam: '1M', homeTeamFlag: '', awayTeam: '2O', awayTeamFlag: '', date: '2026-07-03', time: '13:00', venue: 'AT&T Stadium', venueImage: venueImages['AT&T Stadium'], city: 'Dallas', country: 'USA', stage: 'round16' },

  // Octavos de Final
  { id: 89, homeTeam: 'Ganador 73', homeTeamFlag: '', awayTeam: 'Ganador 74', awayTeamFlag: '', date: '2026-07-04', time: '17:00', venue: 'Lincoln Financial Field', venueImage: venueImages['Lincoln Financial Field'], city: 'Filadelfia', country: 'USA', stage: 'round8' },
  { id: 90, homeTeam: 'Ganador 75', homeTeamFlag: '', awayTeam: 'Ganador 76', awayTeamFlag: '', date: '2026-07-04', time: '12:00', venue: 'NRG Stadium', venueImage: venueImages['NRG Stadium'], city: 'Houston', country: 'USA', stage: 'round8' },
  { id: 91, homeTeam: 'Ganador 77', homeTeamFlag: '', awayTeam: 'Ganador 78', awayTeamFlag: '', date: '2026-07-05', time: '16:00', venue: 'MetLife Stadium', venueImage: venueImages['MetLife Stadium'], city: 'Nueva York', country: 'USA', stage: 'round8' },
  { id: 92, homeTeam: 'Ganador 79', homeTeamFlag: '', awayTeam: 'Ganador 80', awayTeamFlag: '', date: '2026-07-05', time: '18:00', venue: 'Estadio Azteca', venueImage: venueImages['Estadio Azteca'], city: 'Ciudad de México', country: 'MEX', stage: 'round8' },
  { id: 93, homeTeam: 'Ganador 81', homeTeamFlag: '', awayTeam: 'Ganador 82', awayTeamFlag: '', date: '2026-07-06', time: '14:00', venue: 'AT&T Stadium', venueImage: venueImages['AT&T Stadium'], city: 'Dallas', country: 'USA', stage: 'round8' },
  { id: 94, homeTeam: 'Ganador 83', homeTeamFlag: '', awayTeam: 'Ganador 84', awayTeamFlag: '', date: '2026-07-06', time: '17:00', venue: 'Lumen Field', venueImage: venueImages['Lumen Field'], city: 'Seattle', country: 'USA', stage: 'round8' },
  { id: 95, homeTeam: 'Ganador 85', homeTeamFlag: '', awayTeam: 'Ganador 86', awayTeamFlag: '', date: '2026-07-07', time: '12:00', venue: 'Mercedes-Benz Stadium', venueImage: venueImages['Mercedes-Benz Stadium'], city: 'Atlanta', country: 'USA', stage: 'round8' },
  { id: 96, homeTeam: 'Ganador 87', homeTeamFlag: '', awayTeam: 'Ganador 88', awayTeamFlag: '', date: '2026-07-07', time: '13:00', venue: 'BC Place', venueImage: venueImages['BC Place'], city: 'Vancouver', country: 'CAN', stage: 'round8' },

  // Cuartos de Final
  { id: 97, homeTeam: 'Ganador 89', homeTeamFlag: '', awayTeam: 'Ganador 90', awayTeamFlag: '', date: '2026-07-09', time: '16:00', venue: 'Gillette Stadium', venueImage: venueImages['Gillette Stadium'], city: 'Boston', country: 'USA', stage: 'quarter' },
  { id: 98, homeTeam: 'Ganador 91', homeTeamFlag: '', awayTeam: 'Ganador 92', awayTeamFlag: '', date: '2026-07-10', time: '12:00', venue: 'SoFi Stadium', venueImage: venueImages['SoFi Stadium'], city: 'Los Ángeles', country: 'USA', stage: 'quarter' },
  { id: 99, homeTeam: 'Ganador 93', homeTeamFlag: '', awayTeam: 'Ganador 94', awayTeamFlag: '', date: '2026-07-11', time: '17:00', venue: 'Hard Rock Stadium', venueImage: venueImages['Hard Rock Stadium'], city: 'Miami', country: 'USA', stage: 'quarter' },
  { id: 100, homeTeam: 'Ganador 95', homeTeamFlag: '', awayTeam: 'Ganador 96', awayTeamFlag: '', date: '2026-07-11', time: '20:00', venue: 'Arrowhead Stadium', venueImage: venueImages['Arrowhead Stadium'], city: 'Kansas City', country: 'USA', stage: 'quarter' },

  // Semifinales
  { id: 101, homeTeam: 'Ganador 97', homeTeamFlag: '', awayTeam: 'Ganador 98', awayTeamFlag: '', date: '2026-07-14', time: '14:00', venue: 'AT&T Stadium', venueImage: venueImages['AT&T Stadium'], city: 'Dallas', country: 'USA', stage: 'semi' },
  { id: 102, homeTeam: 'Ganador 99', homeTeamFlag: '', awayTeam: 'Ganador 100', awayTeamFlag: '', date: '2026-07-15', time: '15:00', venue: 'Mercedes-Benz Stadium', venueImage: venueImages['Mercedes-Benz Stadium'], city: 'Atlanta', country: 'USA', stage: 'semi' },

  // Tercer Lugar
  { id: 103, homeTeam: 'Perdedor Semifinal 1', homeTeamFlag: '', awayTeam: 'Perdedor Semifinal 2', awayTeamFlag: '', date: '2026-07-18', time: '17:00', venue: 'Hard Rock Stadium', venueImage: venueImages['Hard Rock Stadium'], city: 'Miami', country: 'USA', stage: 'third' },

  // Final
  { id: 104, homeTeam: 'Ganador Semifinal 1', homeTeamFlag: '', awayTeam: 'Ganador Semifinal 2', awayTeamFlag: '', date: '2026-07-19', time: '13:00', venue: 'MetLife Stadium', venueImage: venueImages['MetLife Stadium'], city: 'Nueva York', country: 'USA', stage: 'final' },
];

// IANA timezone per venue (16 unique stadiums)
const VENUE_TIMEZONE: Record<string, string> = {
  'Estadio Azteca': 'America/Mexico_City',
  'Estadio Akron': 'America/Mexico_City',
  'Estadio Monterrey': 'America/Monterrey',
  'SoFi Stadium': 'America/Los_Angeles',
  'MetLife Stadium': 'America/New_York',
  'AT&T Stadium': 'America/Chicago',
  'NRG Stadium': 'America/Chicago',
  'Hard Rock Stadium': 'America/New_York',
  'Lumen Field': 'America/Los_Angeles',
  "Levi's Stadium": 'America/Los_Angeles',
  'Gillette Stadium': 'America/New_York',
  'BC Place': 'America/Vancouver',
  'BMO Field': 'America/Toronto',
  'Mercedes-Benz Stadium': 'America/New_York',
  'Arrowhead Stadium': 'America/Chicago',
  'Lincoln Financial Field': 'America/New_York',
};

// UTC offset (in minutes) during June–July 2026.
// US/Canada: DST active (2nd Sun Mar → 1st Sun Nov). Mexico: abolished DST in 2022, fixed UTC-6.
const VENUE_TZ_OFFSET_MIN: Record<string, number> = {
  'America/Mexico_City': 360,    // UTC-6
  'America/Monterrey': 360,      // UTC-6
  'America/New_York': 240,       // UTC-4 (EDT)
  'America/Chicago': 300,        // UTC-5 (CDT)
  'America/Los_Angeles': 420,    // UTC-7 (PDT)
  'America/Toronto': 240,        // UTC-4 (EDT)
  'America/Vancouver': 420,      // UTC-7 (PDT)
};

export function getVenueTimezone(venue: string): string {
  return VENUE_TIMEZONE[venue] || 'UTC';
}

// Build a UTC Date from a match's local time at the venue
export function getMatchUtcDate(match: Pick<Match, 'date' | 'time' | 'venue'>): Date {
  const [y, m, d] = match.date.split('-').map(Number);
  const [h, min] = match.time.split(':').map(Number);
  const offsetMin = VENUE_TZ_OFFSET_MIN[getVenueTimezone(match.venue)] ?? 0;
  return new Date(Date.UTC(y, m - 1, d, h, min) + offsetMin * 60_000);
}

// Format a Date as YYYY-MM-DD in a target IANA timezone
export function getYmdInTz(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const y = parts.find(p => p.type === 'year')?.value;
  const mo = parts.find(p => p.type === 'month')?.value;
  const d = parts.find(p => p.type === 'day')?.value;
  return `${y}-${mo}-${d}`;
}

// Get visitor's IANA timezone (browser)
export function getVisitorTimezone(): string {
  if (typeof Intl === 'undefined') return 'UTC';
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

// Get matches between now and now+days, sorted by actual kickoff time (UTC)
export function getUpcomingMatches(days: number = 7): Match[] {
  const now = Date.now();
  const endMs = now + days * 24 * 60 * 60 * 1000;

  return worldCupMatches
    .filter(m => {
      const t = getMatchUtcDate(m).getTime();
      return t >= now && t <= endMs;
    })
    .sort((a, b) => getMatchUtcDate(a).getTime() - getMatchUtcDate(b).getTime());
}

export function generateICS(matches: Match[]): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const toUtc = (date: Date) =>
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;

  const icsEvents = matches.map(match => {
    const start = getMatchUtcDate(match);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const location = `${match.venue}, ${match.city}`;
    const summary = match.group
      ? `Mundial 2026 - Grupo ${match.group}: ${match.homeTeam} vs ${match.awayTeam}`
      : `Mundial 2026: ${match.homeTeam} vs ${match.awayTeam}`;
    const description = `${match.homeTeam} vs ${match.awayTeam} - ${match.venue}, ${match.city}${match.group ? ` - Grupo ${match.group}` : ''}`;

    return `BEGIN:VEVENT
DTSTART:${toUtc(start)}
DTEND:${toUtc(end)}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
UID:mundial2026-${match.id}@fifa.com
END:VEVENT`;
  }).join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FIFA World Cup 2026//NONSGML v1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Mundial FIFA 2026
${icsEvents}
END:VCALENDAR`;
}

export const stages = {
  group: { name: 'Fase de Grupos', icon: 'Users', color: '#3B82F6' },
  round16: { name: 'Dieciseisavos', icon: 'Target', color: '#A855F7' },
  round8: { name: 'Octavos', icon: 'Crosshair', color: '#818CF8' },
  quarter: { name: 'Cuartos de Final', icon: 'Shield', color: '#F59E0B' },
  semi: { name: 'Semifinales', icon: 'Star', color: '#FB923C' },
  third: { name: 'Tercer Lugar', icon: 'Award', color: '#CD7F32' },
  final: { name: 'Gran Final', icon: 'Trophy', color: '#FBBF24' },
} as const;

export const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const;

export const hostCountries = {
  USA: { name: 'Estados Unidos', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1280px-Flag_of_the_United_States.png', matches: 78, cities: 11 },
  MEX: { name: 'México', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1280px-Flag_of_Mexico.svg.png', matches: 13, cities: 3 },
  CAN: { name: 'Canadá', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1280px-Flag_of_Canada_%28Pantone%29.svg.png', matches: 13, cities: 2 },
};