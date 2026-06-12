import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Trophy, Globe, Users, Star, ChevronDown, Check, Play, Zap, Signal, MapPinned } from 'lucide-react';
import { worldCupMatches, generateICS, stages, groups, getUpcomingMatches, hostCountries, Match } from './data/matches';

function App() {
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [upcomingMatches] = useState<Match[]>(() => getUpcomingMatches(7));

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleExportCalendar = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const icsContent = generateICS(worldCupMatches);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      window.location.href = url;
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Mundial_FIFA_2026.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setIsExporting(false);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const filteredMatches = selectedGroup === 'all'
    ? worldCupMatches
    : worldCupMatches.filter(m => m.group === selectedGroup);

  const displayMatches = showAllMatches ? filteredMatches : filteredMatches.slice(0, 8);
  const groupStageMatches = worldCupMatches.filter(m => m.stage === 'group').length;
  const knockoutMatches = worldCupMatches.filter(m => m.stage !== 'group').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0d1f3c] text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1628]/70 to-[#0a1628]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12
        }}></div>
      </div>

      {/* Animated Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-cyan-400/12 to-teal-500/12 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-20 py-4 px-4 md:px-8 border-b border-green-500/20 bg-[#0a1628]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 p-[2px] shadow-lg shadow-green-500/30">
                <div className="w-full h-full bg-[#0a1628] rounded-lg flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-green-400 fill-green-400/30" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent">
                  FIFA
                </span>
                <span className="text-2xl md:text-3xl font-bold text-white">World Cup</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-green-400 font-bold text-lg">2026</span>
                <span className="text-gray-400 text-sm">Copa Mundial</span>
              </div>
            </div>
          </div>

          {/* Host Flags */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-gray-400 text-sm">Países Anfitriones</span>
            <div className="flex items-center gap-3">
              <img src={hostCountries.USA.flag} alt="USA" className="w-10 h-6 rounded object-cover shadow-md" />
              <img src={hostCountries.MEX.flag} alt="México" className="w-10 h-6 rounded object-cover shadow-md" />
              <img src={hostCountries.CAN.flag} alt="Canadá" className="w-10 h-6 rounded object-cover shadow-md" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative z-10 px-4 md:px-8 py-12 md:py-16 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Trophy */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-1 shadow-2xl shadow-yellow-500/50 animate-pulse">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a2744] to-[#0a1628] flex items-center justify-center">
                  <Trophy className="w-14 h-14 md:w-18 md:h-18 text-yellow-400 fill-yellow-400/30" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-ping"></div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mb-6 border border-green-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-300 font-medium">Copa Mundial de la FIFA 2026</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-none">
              <span className="bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                WORLD CUP
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent">
                2026
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-2 font-light">
              El torneo más grande de la historia
            </p>
            <p className="text-sm text-green-400 font-medium">
              11 Junio - 19 Julio 2026 • Estados Unidos • México • Canadá
            </p>
          </div>

          {/* Calendar Button */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
              <button
                onClick={handleExportCalendar}
                disabled={isExporting}
                className={`
                  relative px-8 py-4 rounded-2xl font-bold text-lg
                  bg-gradient-to-r from-green-500 via-emerald-600 to-green-500
                  hover:from-green-400 hover:via-emerald-500 hover:to-green-400
                  shadow-2xl shadow-green-500/30
                  transform hover:scale-105 active:scale-95
                  transition-all duration-300
                  flex items-center gap-4
                  ${isExporting ? 'opacity-80 cursor-wait' : ''}
                  ${exportSuccess ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}
                `}
              >
                {isExporting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-white">Exportando...</span>
                  </>
                ) : exportSuccess ? (
                  <>
                    <Check className="w-6 h-6 text-white" />
                    <span className="text-white">¡Calendario descargado!</span>
                  </>
                ) : (
                  <>
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-white text-lg">Importar al Calendario</div>
                      <div className="text-green-100 text-sm font-normal">Todos los 104 partidos • Formato ICS</div>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Globe, value: '3', label: 'Países', color: '#22C55E' },
              { icon: Users, value: '48', label: 'Equipos', color: '#10B981' },
              { icon: Calendar, value: '104', label: 'Partidos', color: '#22C55E' },
              { icon: MapPin, value: '16', label: 'Sedes', color: '#10B981' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-500/10 to-emerald-600/5 backdrop-blur-sm border border-green-500/20 rounded-2xl p-5 hover:border-green-500/40 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="w-7 h-7 mx-auto mb-3" style={{ color: stat.color }} />
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING MATCHES SECTION */}
      <section className="relative z-10 px-4 md:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-green-500/15 border border-green-500/30 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Partidos de la Semana</h2>
                <p className="text-green-400 text-sm">Próximos {upcomingMatches.length} partidos del torneo</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {upcomingMatches.slice(0, 4).map((match, index) => (
                <UpcomingMatchCard key={match.id} match={match} index={index} />
              ))}
            </div>

            {upcomingMatches.length > 4 && (
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm mb-3">Y {upcomingMatches.length - 4} partidos más esta semana</p>
                <button
                  onClick={() => document.getElementById('fixtures')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-400 font-semibold transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  Ver todos los partidos
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Full Fixtures */}
      <section id="fixtures" className="relative z-10 px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Fixture Completo</h2>
                <p className="text-gray-400">{groupStageMatches} partidos de grupos • {knockoutMatches} fase final</p>
              </div>
            </div>

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="px-4 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer backdrop-blur-sm"
            >
              <option value="all" className="bg-[#0a1628]">Todos los partidos</option>
              {groups.map(group => (
                <option key={group} value={group} className="bg-[#0a1628]">Grupo {group}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayMatches.map((match, index) => (
              <MatchCard key={match.id} match={match} index={index} />
            ))}
          </div>

          {filteredMatches.length > 8 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllMatches(!showAllMatches)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl font-semibold transition-all duration-300"
              >
                {showAllMatches ? 'Mostrar menos' : `Ver ${filteredMatches.length - 8} partidos más`}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showAllMatches ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Host Countries */}
      <section className="relative z-10 px-4 md:px-8 py-12 bg-gradient-to-b from-transparent via-green-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <MapPinned className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Países Anfitriones</h2>
            </div>
            <p className="text-gray-400">16 ciudades sede en 3 países</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(hostCountries).map(([code, country]) => (
              <div
                key={code}
                className="bg-gradient-to-br from-green-500/15 to-emerald-600/10 backdrop-blur-sm border border-green-500/25 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300"
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-full h-32 object-cover rounded-xl mb-4 shadow-lg"
                />
                <h3 className="text-xl font-bold text-white mb-2">{country.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-green-400" />
                    {country.matches} partidos
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-green-400" />
                    {country.cities} ciudades
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="relative z-10 px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-yellow-500/20 border border-yellow-500/30 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <Trophy className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 p-1 shadow-2xl shadow-yellow-500/50">
                <div className="w-full h-full rounded-full bg-[#0a1628] flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-yellow-400 fill-yellow-400/30" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">GRAN FINAL</h3>
              <p className="text-xl text-yellow-400 font-bold mb-4">19 Julio 2026 • 13:00</p>
              <p className="text-gray-300 mb-6">MetLife Stadium • Nueva York / Nueva Jersey</p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-300 font-medium">El campeón se corona</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 md:px-8 border-t border-green-500/20 bg-[#0a1628]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2026 FIFA World Cup • Copa Mundial de la FIFA</p>
          <p className="mt-1">Estados Unidos • México • Canadá</p>
        </div>
      </footer>
    </div>
  );
}

function UpcomingMatchCard({ match, index }: { match: Match; index: number }) {
  const matchDate = new Date(match.date + 'T' + match.time);
  const isToday = new Date().toDateString() === matchDate.toDateString();
  const dayName = isToday ? 'HOY' : matchDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();

  return (
    <div
      className="bg-gradient-to-br from-[#0a1628]/90 to-[#1a2744]/90 backdrop-blur-sm border border-green-500/30 rounded-2xl p-4 hover:border-green-400/50 transition-all duration-300 hover:scale-[1.02]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Date Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isToday ? 'bg-green-500 text-white' : 'bg-green-500/20 text-green-400'}`}>
          {dayName}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {match.time}
        </span>
      </div>

      {/* Teams with Flags */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex-1 text-center">
          {match.homeTeamFlag && (
            <img
              src={match.homeTeamFlag}
              alt={match.homeTeam}
              className="w-10 h-7 mx-auto mb-2 rounded object-cover shadow-md"
            />
          )}
          <div className="font-bold text-white text-sm leading-tight">{match.homeTeam}</div>
        </div>
        <div className="px-3 py-1.5 bg-green-500/20 rounded-lg">
          <span className="text-green-400 font-bold text-sm">VS</span>
        </div>
        <div className="flex-1 text-center">
          {match.awayTeamFlag && (
            <img
              src={match.awayTeamFlag}
              alt={match.awayTeam}
              className="w-10 h-7 mx-auto mb-2 rounded object-cover shadow-md"
            />
          )}
          <div className="font-bold text-white text-sm leading-tight">{match.awayTeam}</div>
        </div>
      </div>

      {/* Venue */}
      <div className="pt-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{match.venue}, {match.city}</span>
        </div>
        {match.group && (
          <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">
            Grupo {match.group}
          </span>
        )}
      </div>
    </div>
  );
}

function MatchCard({ match, index }: { match: Match; index: number }) {
  const stageColor = stages[match.stage as keyof typeof stages]?.color || '#22C55E';

  return (
    <div
      className="bg-gradient-to-br from-[#0a1628]/80 to-[#1a2744]/80 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02]"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Stage & Time */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-bold px-2 py-1 rounded-full"
          style={{ backgroundColor: `${stageColor}20`, color: stageColor }}
        >
          {match.group ? `Grupo ${match.group}` : stages[match.stage as keyof typeof stages]?.name}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{match.time}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex-1 text-center">
          {match.homeTeamFlag ? (
            <img
              src={match.homeTeamFlag}
              alt={match.homeTeam}
              className="w-8 h-6 mx-auto mb-1.5 rounded object-cover shadow"
            />
          ) : null}
          <div className="font-semibold text-white text-sm leading-tight truncate">{match.homeTeam}</div>
        </div>
        <span className="text-gray-500 font-bold text-xs px-2">VS</span>
        <div className="flex-1 text-center">
          {match.awayTeamFlag ? (
            <img
              src={match.awayTeamFlag}
              alt={match.awayTeam}
              className="w-8 h-6 mx-auto mb-1.5 rounded object-cover shadow"
            />
          ) : null}
          <div className="font-semibold text-white text-sm leading-tight truncate">{match.awayTeam}</div>
        </div>
      </div>

      {/* Venue & Date */}
      <div className="pt-2 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500 truncate">{match.city}</span>
          <span className="text-green-400 font-medium">
            {new Date(match.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;