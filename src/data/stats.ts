/**
 * Tournament stats computed from results.json + matches.ts + groups.ts.
 * No hardcoded numbers — everything is derived from the source of truth.
 */
import { worldCupMatches, type Match } from './matches';
import { results, getMatchResult } from './results';
import { groupsByLetter } from './groups';
import { teamFlags } from './matches';

export interface TeamStanding {
  group: string;
  team: string;
  flag?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface GroupTable {
  letter: string;
  teams: TeamStanding[]; // sorted by points desc, then GD, then GF, then name
}

export interface ScorerEntry {
  player: string;
  team: string;
  flag?: string;
  goals: number;
  // minute(s) of the goals, in order
  minutes: (number | string)[];
  hasPenalty: boolean;
  hasOwnGoal: boolean;
}

// ----------------------------------------------------------------------------
// Standings
// ----------------------------------------------------------------------------

function emptyRow(group: string, team: string): TeamStanding {
  return {
    group,
    team,
    flag: teamFlags[team],
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  };
}

export function getGroupStandings(groupLetter: string): GroupTable {
  const group = groupsByLetter.find(g => g.letter === groupLetter);
  if (!group) return { letter: groupLetter, teams: [] };

  const table: Record<string, TeamStanding> = {};
  for (const team of group.teams) {
    table[team] = emptyRow(groupLetter, team);
  }

  const groupMatchIds = worldCupMatches
    .filter(m => m.group === groupLetter)
    .map(m => m.id);

  for (const id of groupMatchIds) {
    const r = getMatchResult(id);
    if (!r || r.status !== 'final') continue;
    const m = worldCupMatches.find(x => x.id === id);
    if (!m) continue;
    const home = table[m.homeTeam];
    const away = table[m.awayTeam];
    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;
    home.goalsFor += r.homeScore;
    home.goalsAgainst += r.awayScore;
    away.goalsFor += r.awayScore;
    away.goalsAgainst += r.homeScore;

    if (r.homeScore > r.awayScore) {
      home.won += 1; home.points += 3;
      away.lost += 1;
    } else if (r.homeScore < r.awayScore) {
      away.won += 1; away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1; away.drawn += 1;
      home.points += 1; away.points += 1;
    }
  }

  for (const t of Object.values(table)) {
    t.goalDifference = t.goalsFor - t.goalsAgainst;
  }

  const teams = Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    if (b.won !== a.won) return b.won - a.won;
    return a.team.localeCompare(b.team);
  });

  return { letter: groupLetter, teams };
}

export function getAllGroupStandings(): GroupTable[] {
  return groupsByLetter.map(g => getGroupStandings(g.letter));
}

// ----------------------------------------------------------------------------
// Top scorers
// ----------------------------------------------------------------------------

export function getTopScorers(limit = 10): ScorerEntry[] {
  // own goals count for the team they benefited, not the scorer.
  // We attribute goals to the player regardless of own_goal, but tag them.
  const map: Record<string, ScorerEntry> = {};
  for (const m of worldCupMatches) {
    if (m.stage && m.stage !== 'group') continue; // only group-stage for now
    const r = getMatchResult(m.id);
    if (!r) continue;
    for (const g of r.goals) {
      const teamName = g.team === 'home' ? m.homeTeam : m.awayTeam;
      const key = `${g.scorer}|${teamName}`;
      if (!map[key]) {
        map[key] = {
          player: g.scorer,
          team: teamName,
          flag: teamFlags[teamName],
          goals: 0,
          minutes: [],
          hasPenalty: false,
          hasOwnGoal: false,
        };
      }
      map[key].goals += 1;
      map[key].minutes.push(g.minute);
      if (g.type === 'penalty') map[key].hasPenalty = true;
      if (g.type === 'own_goal') map[key].hasOwnGoal = true;
    }
  }
  return Object.values(map)
    .sort((a, b) => {
      if (b.goals !== a.goals) return b.goals - a.goals;
      return a.player.localeCompare(b.player);
    })
    .slice(0, limit);
}

// ----------------------------------------------------------------------------
// Tournament-wide roll-up (for the hero / footer)
// ----------------------------------------------------------------------------

export interface TournamentSummary {
  matchesPlayed: number;
  goalsScored: number;
  avgGoals: number;
  biggestWin?: {
    matchId: number;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
  };
}

export function getTournamentSummary(): TournamentSummary {
  const played = results.filter(r => r.status === 'final');
  const goals = played.reduce((acc, r) => acc + r.homeScore + r.awayScore, 0);
  let biggest: TournamentSummary['biggestWin'] | undefined;
  let biggestMargin = -1;
  for (const r of played) {
    const m = worldCupMatches.find(x => x.id === r.id);
    if (!m) continue;
    const margin = Math.abs(r.homeScore - r.awayScore);
    if (margin > biggestMargin) {
      biggestMargin = margin;
      biggest = {
        matchId: m.id,
        homeTeam: m.homeTeam,
        awayTeam: m.awayTeam,
        homeScore: r.homeScore,
        awayScore: r.awayScore,
      };
    }
  }
  return {
    matchesPlayed: played.length,
    goalsScored: goals,
    avgGoals: played.length > 0 ? goals / played.length : 0,
    biggestWin: biggest,
  };
}

// ----------------------------------------------------------------------------
// Recent results + upcoming (for sidebar / mini sections)
// ----------------------------------------------------------------------------

export function getRecentResults(limit = 6): Array<{ match: Match; result: ReturnType<typeof getMatchResult> }> {
  const played = worldCupMatches
    .map(m => ({ match: m, result: getMatchResult(m.id) }))
    .filter(x => x.result?.status === 'final')
    .sort((a, b) => b.match.date.localeCompare(a.match.date) || b.match.time.localeCompare(a.match.time));
  return played.slice(0, limit);
}
