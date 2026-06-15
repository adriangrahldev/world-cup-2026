export type Country = 'USA' | 'MEX' | 'CAN';

export interface Venue {
  name: string;
  city: string;
  country: Country;
  capacity: number;
  matches: number;
  opened: number;
  image: string;
}

export const venues: Venue[] = [
  // USA
  { name: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA', capacity: 82500, matches: 9, opened: 2010, image: '/venues/metlife-stadium.avif' },
  { name: 'AT&T Stadium', city: 'Arlington, TX', country: 'USA', capacity: 80000, matches: 9, opened: 2009, image: '/venues/att-stadium.avif' },
  { name: 'SoFi Stadium', city: 'Inglewood, CA', country: 'USA', capacity: 70240, matches: 8, opened: 2020, image: '/venues/sofi-stadium.avif' },
  { name: 'Hard Rock Stadium', city: 'Miami Gardens, FL', country: 'USA', capacity: 65326, matches: 7, opened: 1987, image: '/venues/hard-rock-stadium.avif' },
  { name: 'NRG Stadium', city: 'Houston, TX', country: 'USA', capacity: 72220, matches: 7, opened: 2002, image: '/venues/nrg-stadium.avif' },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta, GA', country: 'USA', capacity: 71000, matches: 8, opened: 2017, image: '/venues/mercedes-benz-stadium.avif' },
  { name: 'Arrowhead Stadium', city: 'Kansas City, MO', country: 'USA', capacity: 76416, matches: 6, opened: 1972, image: '/venues/arrowhead-stadium.avif' },
  { name: 'Gillette Stadium', city: 'Foxborough, MA', country: 'USA', capacity: 65878, matches: 7, opened: 2002, image: '/venues/gillette-stadium.avif' },
  { name: "Levi's Stadium", city: 'Santa Clara, CA', country: 'USA', capacity: 68500, matches: 6, opened: 2014, image: '/venues/levis-stadium.avif' },
  { name: 'Lumen Field', city: 'Seattle, WA', country: 'USA', capacity: 69000, matches: 6, opened: 2002, image: '/venues/lumen-field.avif' },
  { name: 'Lincoln Financial Field', city: 'Philadelphia, PA', country: 'USA', capacity: 69596, matches: 6, opened: 2003, image: '/venues/lincoln-financial-field.avif' },
  // Mexico
  { name: 'Estadio Azteca', city: 'Ciudad de México', country: 'MEX', capacity: 87523, matches: 5, opened: 1966, image: '/venues/estadio-azteca.avif' },
  { name: 'Estadio Akron', city: 'Guadalajara', country: 'MEX', capacity: 49850, matches: 4, opened: 2010, image: '/venues/estadio-akron.avif' },
  { name: 'Estadio Monterrey', city: 'Monterrey', country: 'MEX', capacity: 53500, matches: 4, opened: 2015, image: '/venues/estadio-monterrey.avif' },
  // Canada
  { name: 'BC Place', city: 'Vancouver', country: 'CAN', capacity: 54500, matches: 7, opened: 1983, image: '/venues/bc-place.avif' },
  { name: 'BMO Field', city: 'Toronto', country: 'CAN', capacity: 45500, matches: 6, opened: 2007, image: '/venues/bmo-field.avif' },
];

// Use the locally-hosted flags (48-flag set) for the host-country panel.
import { teamFlags } from './flags';

export const hostCountriesInfo: Record<Country, { code: string; flag: string; matches: number; cities: number }> = {
  USA: { code: 'USA', flag: teamFlags['Estados Unidos'], matches: 78, cities: 11 },
  MEX: { code: 'MEX', flag: teamFlags['México'], matches: 13, cities: 3 },
  CAN: { code: 'CAN', flag: teamFlags['Canadá'], matches: 13, cities: 2 },
};
