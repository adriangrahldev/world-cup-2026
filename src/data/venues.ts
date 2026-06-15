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
  { name: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA', capacity: 82500, matches: 9, opened: 2010, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&q=70&fit=crop' },
  { name: 'AT&T Stadium', city: 'Arlington, TX', country: 'USA', capacity: 80000, matches: 9, opened: 2009, image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&auto=format&q=70&fit=crop' },
  { name: 'SoFi Stadium', city: 'Inglewood, CA', country: 'USA', capacity: 70240, matches: 8, opened: 2020, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&q=70&fit=crop' },
  { name: 'Hard Rock Stadium', city: 'Miami Gardens, FL', country: 'USA', capacity: 65326, matches: 7, opened: 1987, image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format&q=70&fit=crop' },
  { name: 'NRG Stadium', city: 'Houston, TX', country: 'USA', capacity: 72220, matches: 7, opened: 2002, image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&q=70&fit=crop' },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta, GA', country: 'USA', capacity: 71000, matches: 8, opened: 2017, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&q=70&fit=crop' },
  { name: 'Arrowhead Stadium', city: 'Kansas City, MO', country: 'USA', capacity: 76416, matches: 6, opened: 1972, image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&q=70&fit=crop' },
  { name: 'Gillette Stadium', city: 'Foxborough, MA', country: 'USA', capacity: 65878, matches: 7, opened: 2002, image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&auto=format&q=70&fit=crop' },
  { name: "Levi's Stadium", city: 'Santa Clara, CA', country: 'USA', capacity: 68500, matches: 6, opened: 2014, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&q=70&fit=crop' },
  { name: 'Lumen Field', city: 'Seattle, WA', country: 'USA', capacity: 69000, matches: 6, opened: 2002, image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&auto=format&q=70&fit=crop' },
  { name: 'Lincoln Financial Field', city: 'Philadelphia, PA', country: 'USA', capacity: 69596, matches: 6, opened: 2003, image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&auto=format&q=70&fit=crop' },
  // Mexico
  { name: 'Estadio Azteca', city: 'Ciudad de México', country: 'MEX', capacity: 87523, matches: 5, opened: 1966, image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&auto=format&q=70&fit=crop' },
  { name: 'Estadio Akron', city: 'Guadalajara', country: 'MEX', capacity: 49850, matches: 4, opened: 2010, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&q=70&fit=crop' },
  { name: 'Estadio Monterrey', city: 'Monterrey', country: 'MEX', capacity: 53500, matches: 4, opened: 2015, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&q=70&fit=crop' },
  // Canada
  { name: 'BC Place', city: 'Vancouver', country: 'CAN', capacity: 54500, matches: 7, opened: 1983, image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&auto=format&q=70&fit=crop' },
  { name: 'BMO Field', city: 'Toronto', country: 'CAN', capacity: 45500, matches: 6, opened: 2007, image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&auto=format&q=70&fit=crop' },
];

export const hostCountriesInfo: Record<Country, { code: string; flag: string; matches: number; cities: number }> = {
  USA: { code: 'USA', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1280px-Flag_of_the_United_States.png', matches: 78, cities: 11 },
  MEX: { code: 'MEX', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1280px-Flag_of_Mexico.svg.png', matches: 13, cities: 3 },
  CAN: { code: 'CAN', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1280px-Flag_of_Canada_%28Pantone%29.svg.png', matches: 13, cities: 2 },
};
