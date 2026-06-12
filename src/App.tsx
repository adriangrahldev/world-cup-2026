import { useEffect, useState, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { worldCupMatches, generateICS, groups, getUpcomingMatches } from './data/matches';
import { useLocale } from './hooks/useLocale';
import { PitchBackground } from './components/PitchBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TeamsMarquee } from './components/TeamsMarquee';
import { UpcomingMatches } from './components/UpcomingMatches';
import { Fixtures } from './components/Fixtures';
import { Groups } from './components/Groups';
import { Venues } from './components/Venues';
import { FinalSection } from './components/FinalSection';
import { Footer } from './components/Footer';

function App() {
  const { locale, setLocale, country, t } = useLocale();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const upcoming = useMemo(() => getUpcomingMatches(7), []);

  // Sync html lang attribute on locale change
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
      <PitchBackground />

      <Header
        locale={locale}
        onChangeLocale={setLocale}
        detectedCountry={country === 'auto' ? '' : country}
      />

      <main id="main" className="relative z-10">
        <Hero
          t={t}
          locale={locale}
          onExport={handleExportCalendar}
          isExporting={isExporting}
          exportSuccess={exportSuccess}
          countryName={countryName}
        />

        <TeamsMarquee locale={locale} />

        <UpcomingMatches matches={upcoming} t={t} locale={locale} />

        <Fixtures matches={worldCupMatches} groups={groups} t={t} locale={locale} />

        <Groups t={t} locale={locale} />

        <Venues t={t} locale={locale} />

        <FinalSection t={t} locale={locale} />
      </main>

      <Footer t={t} locale={locale} />

      <Analytics />
    </div>
  );
}

export default App;
