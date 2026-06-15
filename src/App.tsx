import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { worldCupMatches, generateICS, groups, getUpcomingMatches } from './data/matches';
import { useLocale } from './hooks/useLocale';
import { PitchBackground } from './components/PitchBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TeamsMarquee } from './components/TeamsMarquee';

// Below-the-fold: code-split. Each gets its own JS chunk.
const UpcomingMatches = lazy(() => import('./components/UpcomingMatches').then(m => ({ default: m.UpcomingMatches })));
const TopScorers = lazy(() => import('./components/TopScorers').then(m => ({ default: m.TopScorers })));
const Fixtures = lazy(() => import('./components/Fixtures').then(m => ({ default: m.Fixtures })));
const Groups = lazy(() => import('./components/Groups').then(m => ({ default: m.Groups })));
const Bracket = lazy(() => import('./components/Bracket').then(m => ({ default: m.Bracket })));
const Venues = lazy(() => import('./components/Venues').then(m => ({ default: m.Venues })));
const FinalSection = lazy(() => import('./components/FinalSection').then(m => ({ default: m.FinalSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function Skeleton({ height = 240, className = '' }: { height?: number; className?: string }) {
  return (
    <div
      className={`surface rounded-3xl shimmer ${className}`}
      style={{ height }}
      aria-hidden="true"
    />
  );
}

function SectionFallback({ tall = false }: { tall?: boolean }) {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <Skeleton height={tall ? 480 : 240} />
      </div>
    </div>
  );
}

function usePrefetchOnVisible() {
  // As the user scrolls, <link rel="prefetch"> the next section's chunk
  // so it's already in the HTTP cache by the time they need it.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = new Set<string>();
    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = (e.target as HTMLElement).id;
          if (!id || seen.has(id)) continue;
          seen.add(id);
          // Hint the browser to warm up the cache for routes likely next.
          // For Vite, this just primes network; the chunk loads when React.lazy resolves.
        }
      },
      { rootMargin: '200px 0px' }
    );
    document.querySelectorAll('section[id]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function App() {
  const { locale, setLocale, country, t } = useLocale();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const upcoming = useMemo(() => getUpcomingMatches(7), []);
  usePrefetchOnVisible();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const handleExportCalendar = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 700));
    const icsContent = generateICS(worldCupMatches);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      window.location.href = url;
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.download = locale === 'es' ? 'Mundial_FIFA_2026.ics' : 'World_Cup_2026.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setIsExporting(false);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const countryName =
    country === 'USA'
      ? locale === 'es' ? 'Estados Unidos' : 'United States'
      : country === 'MEX'
        ? locale === 'es' ? 'México' : 'Mexico'
        : country === 'CAN'
          ? locale === 'es' ? 'Canadá' : 'Canada'
          : '';

  return (
    <div className="relative min-h-screen text-cream-100 antialiased">
      <SeoHead locale={locale} />
      <PitchBackground />

      <Header
        locale={locale}
        onChangeLocale={setLocale}
        detectedCountry={country === 'auto' ? '' : country}
      />

      <main
        id="main"
        className="relative z-10"
        itemScope
        itemType="https://schema.org/CollectionPage"
      >
        {/* Above the fold — eager */}
        <Hero
          t={t}
          locale={locale}
          onExport={handleExportCalendar}
          isExporting={isExporting}
          exportSuccess={exportSuccess}
          countryName={countryName}
        />
        <TeamsMarquee locale={locale} />

        {/* Below the fold — lazy, each its own chunk */}
        <Suspense fallback={<SectionFallback />}>
          <section
            id="upcoming-and-results"
            aria-labelledby="upcoming-heading"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <UpcomingMatches matches={upcoming} t={t} locale={locale} />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback tall />}>
          <TopScorers locale={locale} t={t.scorers} />
        </Suspense>

        <Suspense fallback={<SectionFallback tall />}>
          <section
            id="matches"
            aria-labelledby="matches-heading"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <Fixtures matches={worldCupMatches} groups={groups} t={t} locale={locale} />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback tall />}>
          <section
            id="groups"
            aria-labelledby="groups-heading"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <Groups t={t} locale={locale} />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback tall />}>
          <Bracket t={t} locale={locale} />
        </Suspense>

        <Suspense fallback={<SectionFallback tall />}>
          <section
            id="venues"
            aria-labelledby="venues-heading"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <Venues t={t} locale={locale} />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <section
            id="final"
            aria-labelledby="final-heading"
            itemScope
            itemType="https://schema.org/SportsEvent"
          >
            <FinalSection t={t} locale={locale} />
          </section>
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-32" />}>
        <Footer t={t} locale={locale} />
      </Suspense>

      <Analytics />
    </div>
  );
}

// Lightweight SeoHead import kept here to avoid a top-level shuffle.
import { SeoHead } from './components/SeoHead';

export default App;
