export type Role = 'EXP' | 'Jungle' | 'Mid' | 'Gold' | 'Roam';

export interface MPLTeam {
  id: string;
  name: string;
  code: string;
  color: string;
  secondaryColor: string;
  rank: number;
  form: ('W' | 'L')[];
  winRate: number;
  rival: string;
  description: string;
}

export interface ItemBuildItem {
  id: string;
  name: string;
  category: 'Attack' | 'Magic' | 'Defense' | 'Movement';
  icon: string;
  description: string;
}

export interface HeroStat {
  heroName: string;
  games: number;
  wins: number;
  winRate: number;
  kda: string;
  icon: string;
}

export interface ProBuildData {
  hero: string;
  heroIcon: string;
  battleSpell: string;
  battleSpellIcon: string;
  emblem: string;
  emblemTalents: string[];
  finalBuild: ItemBuildItem[];
  mostUsedBuild: ItemBuildItem[];
  notes: string;
}

export interface PlayerGWStats {
  mapsPlayed: number;
  wins: number;
  kills: number;
  assists: number;
  deaths: number;
  bonusPoints?: number;
}

export interface Player {
  id: string;
  nickname: string;
  realName: string;
  teamId: string;
  role: Role;
  price: number; // e.g. 8.8 (in millions)
  previousPrice: number;
  ownershipPercent: number; // e.g. 34.2
  projectedPoints: number; // e.g. 26.5
  recentForm: number; // 0-10 score
  totalPoints: number;
  kda: {
    kills: number;
    deaths: number;
    assists: number;
    ratio: number;
  };
  killParticipation: number; // e.g. 74.5%
  recentHeroPool: HeroStat[];
  recentProBuild: ProBuildData;
  gwStats: Record<number, PlayerGWStats>;
}

export interface FantasySquad {
  exp: Player | null;
  jungle: Player | null;
  mid: Player | null;
  gold: Player | null;
  roam: Player | null;
  captainId: string | null;
  viceCaptainId: string | null;
  isLocked: boolean;
  freeTransfers: number;
}

export interface ScoringWeights {
  jungleKill: number;
  jungleAssist: number;
  jungleDeath: number;
  goldKill: number;
  goldAssist: number;
  goldDeath: number;
  midKill: number;
  midAssist: number;
  midDeath: number;
  expKill: number;
  expAssist: number;
  expDeath: number;
  roamKill: number;
  roamAssist: number;
  roamDeath: number;
  mapPlayed: number;
  mapWin: number;
}

export interface LeaderboardEntry {
  rank: number;
  manager: string;
  teamName: string;
  gwPoints: number;
  totalPoints: number;
  favTeam: string;
  isCurrentUser?: boolean;
}

export interface PrivateLeague {
  id: string;
  name: string;
  code: string;
  creator: string;
  createdAt: string;
  membersCount: number;
  myRank: number;
  entries: LeaderboardEntry[];
}

export interface Fixture {
  id: string;
  gameweek: number;
  day: string;
  date: string;
  time: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  homeDifficulty: number; // 1 to 5
  awayDifficulty: number; // 1 to 5
  mvpPlayerId?: string;
}

export interface UserProfile {
  managerName: string;
  fantasyTeamName: string;
  favoriteTeamId: string;
  avatarSeed: string;
  notifications: boolean;
  haptics: boolean;
}
