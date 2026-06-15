/**
 * Match results module.
 *
 * Source of truth is `results.json` next to this file — edit it by hand
 * as games finish. Keep entries ordered by `date` ascending so the JSON
 * stays easy to scan.
 *
 * Schema for each result:
 *   {
 *     id:        number                       // match id from data/matches.ts
 *     date:      "YYYY-MM-DD"                 // for human sorting
 *     status:    "final" | "live" | "postponed"
 *     homeScore: number
 *     awayScore: number
 *     goals:     Goal[]
 *     penalties?: { home: number; away: number }   // only if decided from the spot
 *   }
 *
 * Goal:
 *   { team: "home" | "away", scorer: string, minute: string|number, type?: "goal"|"penalty"|"own_goal" }
 *   `minute` may be a number ("67") or string with stoppage/ET ("45+2", "90+5", "105").
 *   `type` defaults to "goal" if omitted.
 *
 * Matches without an entry are treated as "not yet played" and the UI
 * falls back to the upcoming layout (VS, kickoff time).
 */
import raw from './results.json';

export type GoalType = 'goal' | 'penalty' | 'own_goal';

export interface Goal {
  team: 'home' | 'away';
  scorer: string;
  minute: number | string;
  type?: GoalType;
}

export interface PenaltyResult {
  home: number;
  away: number;
}

export interface MatchResult {
  id: number;
  date: string;
  status: 'final' | 'live' | 'postponed';
  homeScore: number;
  awayScore: number;
  goals: Goal[];
  penalties?: PenaltyResult;
}

interface RawFile {
  results: MatchResult[];
  [k: string]: unknown;
}

const data = raw as RawFile;
export const results: MatchResult[] = Array.isArray(data.results) ? data.results : [];

// Index by id for O(1) lookup
const byId: Map<number, MatchResult> = new Map(results.map(r => [r.id, r]));

export function getMatchResult(matchId: number): MatchResult | undefined {
  return byId.get(matchId);
}

export function hasMatchResult(matchId: number): boolean {
  return byId.has(matchId);
}

// Convenience: get goals split per team
export function getGoalsByTeam(result: MatchResult): { home: Goal[]; away: Goal[] } {
  const home: Goal[] = [];
  const away: Goal[] = [];
  for (const g of result.goals) {
    (g.team === 'home' ? home : away).push(g);
  }
  return { home, away };
}
