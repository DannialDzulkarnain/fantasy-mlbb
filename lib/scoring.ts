import { Player, Role, ScoringWeights, FantasySquad, PlayerGWStats } from './types';
import { DEFAULT_SCORING_WEIGHTS } from './data';

export interface ScoreBreakdown {
  mapsPlayedScore: number;
  winsScore: number;
  killsScore: number;
  assistsScore: number;
  deathsPenalty: number;
  bonusScore: number;
  rawTotal: number;
  isCaptain: boolean;
  isViceCaptain: boolean;
  finalTotal: number;
}

export function calculatePlayerScore(
  player: Player,
  gw: number,
  isCaptain: boolean,
  isViceCaptain: boolean,
  captainPlayed: boolean = true,
  weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS
): ScoreBreakdown {
  const stats: PlayerGWStats = player.gwStats[gw] || {
    mapsPlayed: 2,
    wins: 1,
    kills: 3,
    assists: 8,
    deaths: 3,
    bonusPoints: 0
  };

  const mapsPlayedScore = stats.mapsPlayed * weights.mapPlayed;
  const winsScore = stats.wins * weights.mapWin;

  let killRate = weights.jungleKill;
  let assistRate = weights.jungleAssist;
  let deathPenaltyRate = weights.jungleDeath;

  switch (player.role) {
    case 'EXP':
      killRate = weights.expKill;
      assistRate = weights.expAssist;
      deathPenaltyRate = weights.expDeath;
      break;
    case 'Jungle':
      killRate = weights.jungleKill;
      assistRate = weights.jungleAssist;
      deathPenaltyRate = weights.jungleDeath;
      break;
    case 'Mid':
      killRate = weights.midKill;
      assistRate = weights.midAssist;
      deathPenaltyRate = weights.midDeath;
      break;
    case 'Gold':
      killRate = weights.goldKill;
      assistRate = weights.goldAssist;
      deathPenaltyRate = weights.goldDeath;
      break;
    case 'Roam':
      killRate = weights.roamKill;
      assistRate = weights.roamAssist;
      deathPenaltyRate = weights.roamDeath;
      break;
  }

  const killsScore = Number((stats.kills * killRate).toFixed(2));
  const assistsScore = Number((stats.assists * assistRate).toFixed(2));
  const deathsPenalty = Number((stats.deaths * deathPenaltyRate).toFixed(2)); // negative
  const bonusScore = stats.bonusPoints || 0;

  const rawTotal = Number((mapsPlayedScore + winsScore + killsScore + assistsScore + deathsPenalty + bonusScore).toFixed(2));

  // Captain activates 2x. Vice Captain activates 2x only if Captain does not play.
  let multiplier = 1;
  if (isCaptain && stats.mapsPlayed > 0) {
    multiplier = 2;
  } else if (isViceCaptain && !captainPlayed) {
    multiplier = 2;
  }

  const finalTotal = Number((rawTotal * multiplier).toFixed(2));

  return {
    mapsPlayedScore,
    winsScore,
    killsScore,
    assistsScore,
    deathsPenalty,
    bonusScore,
    rawTotal,
    isCaptain,
    isViceCaptain,
    finalTotal
  };
}

export interface SquadValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  totalCost: number;
  remainingBudget: number;
  teamCounts: Record<string, number>;
  playersCount: number;
}

export function validateSquad(squad: FantasySquad, maxBudget: number = 40.0): SquadValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const teamCounts: Record<string, number> = {};
  
  const players = [squad.exp, squad.jungle, squad.mid, squad.gold, squad.roam].filter(Boolean) as Player[];
  const playersCount = players.length;

  let totalCost = 0;

  for (const player of players) {
    totalCost += player.price;
    teamCounts[player.teamId] = (teamCounts[player.teamId] || 0) + 1;
  }

  totalCost = Number(totalCost.toFixed(1));
  const remainingBudget = Number((maxBudget - totalCost).toFixed(1));

  // 1. Budget check
  if (totalCost > maxBudget) {
    errors.push(`Budget exceeded by ${(totalCost - maxBudget).toFixed(1)}M. Maximum budget is ${maxBudget.toFixed(1)}M.`);
  }

  // 2. Team limit check (max 2 per team)
  for (const [teamId, count] of Object.entries(teamCounts)) {
    if (count > 2) {
      errors.push(`Too many players from ${teamId.toUpperCase()} (${count}/2). Maximum 2 players per MPL team allowed.`);
    }
  }

  // 3. Squad completeness check
  if (playersCount < 5) {
    warnings.push(`Squad is incomplete (${playersCount}/5 selected). 1 player per role required.`);
  }

  // 4. Captaincy checks
  if (playersCount === 5) {
    if (!squad.captainId) {
      errors.push('No Captain selected. You must designate 1 Captain (2x points).');
    }
    if (!squad.viceCaptainId) {
      errors.push('No Vice Captain selected. You must designate 1 Vice Captain.');
    }
    if (squad.captainId && squad.viceCaptainId && squad.captainId === squad.viceCaptainId) {
      errors.push('Captain and Vice Captain cannot be the same player.');
    }
  }

  return {
    isValid: errors.length === 0 && playersCount === 5,
    errors,
    warnings,
    totalCost,
    remainingBudget,
    teamCounts,
    playersCount
  };
}
