import { teamFlags } from './matches';

export interface GroupTeams {
  letter: string;
  teams: string[];
}

export const groupsByLetter: GroupTeams[] = [
  { letter: 'A', teams: ['México', 'Sudáfrica', 'Corea del Sur', 'República Checa'] },
  { letter: 'B', teams: ['Canadá', 'Bosnia y Herzegovina', 'Catar', 'Suiza'] },
  { letter: 'C', teams: ['Brasil', 'Marruecos', 'Haití', 'Escocia'] },
  { letter: 'D', teams: ['Estados Unidos', 'Paraguay', 'Australia', 'Turquía'] },
  { letter: 'E', teams: ['Alemania', 'Curazao', 'Costa de Marfil', 'Ecuador'] },
  { letter: 'F', teams: ['Países Bajos', 'Japón', 'Suecia', 'Túnez'] },
  { letter: 'G', teams: ['Bélgica', 'Egipto', 'Irán', 'Nueva Zelanda'] },
  { letter: 'H', teams: ['España', 'Uruguay', 'Arabia Saudita', 'Cabo Verde'] },
  { letter: 'I', teams: ['Francia', 'Senegal', 'Noruega', 'Irak'] },
  { letter: 'J', teams: ['Argentina', 'Austria', 'Argelia', 'Jordania'] },
  { letter: 'K', teams: ['Portugal', 'Colombia', 'Uzbekistán', 'RD Congo'] },
  { letter: 'L', teams: ['Inglaterra', 'Croacia', 'Ghana', 'Panamá'] },
];

export function flagFor(team: string): string | undefined {
  return teamFlags[team];
}
