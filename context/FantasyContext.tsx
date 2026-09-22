'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Player, Role, FantasySquad, ScoringWeights, UserProfile, PrivateLeague } from '@/lib/types';
import { SAMPLE_PLAYERS, DEFAULT_SCORING_WEIGHTS, INITIAL_PRIVATE_LEAGUES } from '@/lib/data';
import { validateSquad, SquadValidationResult } from '@/lib/scoring';

export type ScreenTab =
  | 'home'
  | 'squad'
  | 'market'
  | 'points'
  | 'leaderboard'
  | 'leagues'
  | 'fixtures'
  | 'rules'
  | 'profile';

interface FantasyContextType {
  activeScreen: ScreenTab;
  setActiveScreen: (screen: ScreenTab) => void;
  selectedPlayerDetail: Player | null;
  setSelectedPlayerDetail: (player: Player | null) => void;
  squad: FantasySquad;
  squadValidation: SquadValidationResult;
  selectedMarketRole: Role | 'ALL';
  setSelectedMarketRole: (role: Role | 'ALL') => void;
  selectPlayerForRole: (player: Player) => { success: boolean; message: string };
  removePlayerFromRole: (role: Role) => void;
  setCaptain: (playerId: string) => void;
  setViceCaptain: (playerId: string) => void;
  toggleSquadLock: () => void;
  confirmSquad: () => { success: boolean; message: string };
  resetSquadToDemo: () => void;
  clearSquad: () => void;
  autoPickSquad: () => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  currentGameweek: number;
  setCurrentGameweek: (gw: number) => void;
  scoringWeights: ScoringWeights;
  setScoringWeights: React.Dispatch<React.SetStateAction<ScoringWeights>>;
  privateLeagues: PrivateLeague[];
  createPrivateLeague: (name: string) => { code: string };
  joinPrivateLeague: (code: string) => { success: boolean; message: string };
  openMarketForRole: (role: Role) => void;
}

const FantasyContext = createContext<FantasyContextType | undefined>(undefined);

const INITIAL_SQUAD: FantasySquad = {
  exp: SAMPLE_PLAYERS.find((p) => p.id === 'p-kramm') || null, // SRG
  jungle: SAMPLE_PLAYERS.find((p) => p.id === 'p-chibi') || null, // HB
  mid: SAMPLE_PLAYERS.find((p) => p.id === 'p-stormie') || null, // SRG
  gold: SAMPLE_PLAYERS.find((p) => p.id === 'p-cikugais') || null, // TDK
  roam: SAMPLE_PLAYERS.find((p) => p.id === 'p-kuja') || null, // TS
  captainId: 'p-stormie',
  viceCaptainId: 'p-chibi',
  isLocked: false,
  freeTransfers: 2,
};

export function FantasyProvider({ children }: { children: React.ReactNode }) {
  const [activeScreen, setActiveScreen] = useState<ScreenTab>('home');
  const [selectedPlayerDetail, setSelectedPlayerDetail] = useState<Player | null>(null);
  const [selectedMarketRole, setSelectedMarketRole] = useState<Role | 'ALL'>('ALL');
  const [currentGameweek, setCurrentGameweek] = useState<number>(4);
  const [scoringWeights, setScoringWeights] = useState<ScoringWeights>(DEFAULT_SCORING_WEIGHTS);

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProfile = localStorage.getItem('fantasy_mpl_profile');
        if (savedProfile) {
          return JSON.parse(savedProfile);
        }
      } catch (e) {
        console.error('Error reading profile:', e);
      }
    }
    return {
      managerName: 'Dannial',
      fantasyTeamName: 'Selangor Dynasty',
      favoriteTeamId: 'srg',
      avatarSeed: 'esports-1',
      notifications: true,
      haptics: true,
    };
  });

  const [privateLeagues, setPrivateLeagues] = useState<PrivateLeague[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLeagues = localStorage.getItem('fantasy_mpl_leagues');
        if (savedLeagues) {
          return JSON.parse(savedLeagues);
        }
      } catch (e) {
        console.error('Error reading leagues:', e);
      }
    }
    return INITIAL_PRIVATE_LEAGUES;
  });

  const [squad, setSquad] = useState<FantasySquad>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSquad = localStorage.getItem('fantasy_mpl_squad');
        if (savedSquad) {
          const parsed = JSON.parse(savedSquad);
          return {
            exp: SAMPLE_PLAYERS.find((p) => p.id === parsed.exp?.id) || null,
            jungle: SAMPLE_PLAYERS.find((p) => p.id === parsed.jungle?.id) || null,
            mid: SAMPLE_PLAYERS.find((p) => p.id === parsed.mid?.id) || null,
            gold: SAMPLE_PLAYERS.find((p) => p.id === parsed.gold?.id) || null,
            roam: SAMPLE_PLAYERS.find((p) => p.id === parsed.roam?.id) || null,
            captainId: parsed.captainId || null,
            viceCaptainId: parsed.viceCaptainId || null,
            isLocked: Boolean(parsed.isLocked),
            freeTransfers: parsed.freeTransfers ?? 2,
          };
        }
      } catch (e) {
        console.error('Error reading squad:', e);
      }
    }
    return INITIAL_SQUAD;
  });

  // Save changes to local storage
  useEffect(() => {
    try {
      localStorage.setItem('fantasy_mpl_squad', JSON.stringify(squad));
    } catch (e) {
      console.error('Error saving squad:', e);
    }
  }, [squad]);

  useEffect(() => {
    try {
      localStorage.setItem('fantasy_mpl_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error('Error saving profile:', e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('fantasy_mpl_leagues', JSON.stringify(privateLeagues));
    } catch (e) {
      console.error('Error saving leagues:', e);
    }
  }, [privateLeagues]);

  const squadValidation = useMemo(() => {
    return validateSquad(squad, 40.0);
  }, [squad]);

  const selectPlayerForRole = (player: Player): { success: boolean; message: string } => {
    if (squad.isLocked) {
      return { success: false, message: 'Squad is currently locked for the active gameweek.' };
    }

    const roleKey = player.role.toLowerCase() as 'exp' | 'jungle' | 'mid' | 'gold' | 'roam';
    const existingInRole = squad[roleKey];

    // Compute potential cost
    const currentCost = squadValidation.totalCost - (existingInRole ? existingInRole.price : 0);
    const newTotalCost = Number((currentCost + player.price).toFixed(1));

    if (newTotalCost > 40.0) {
      return {
        success: false,
        message: `Cannot add ${player.nickname}. Total cost (${newTotalCost}M) would exceed 40.0M budget limit!`,
      };
    }

    // Check team count
    const teamCounts = { ...squadValidation.teamCounts };
    if (existingInRole) {
      teamCounts[existingInRole.teamId] = Math.max(0, (teamCounts[existingInRole.teamId] || 0) - 1);
    }
    const currentTeamCount = teamCounts[player.teamId] || 0;
    if (currentTeamCount >= 2) {
      return {
        success: false,
        message: `Max 2 players from ${player.teamId.toUpperCase()} allowed. You already have 2!`,
      };
    }

    setSquad((prev) => {
      const next = { ...prev, [roleKey]: player };
      // If the old player was captain/VC, reset or transfer
      if (prev.captainId === existingInRole?.id) {
        next.captainId = player.id;
      }
      if (prev.viceCaptainId === existingInRole?.id) {
        next.viceCaptainId = null;
      }
      return next;
    });

    return { success: true, message: `${player.nickname} added as ${player.role}!` };
  };

  const removePlayerFromRole = (role: Role) => {
    if (squad.isLocked) return;
    const roleKey = role.toLowerCase() as 'exp' | 'jungle' | 'mid' | 'gold' | 'roam';
    const removedPlayer = squad[roleKey];
    setSquad((prev) => {
      const next = { ...prev, [roleKey]: null };
      if (removedPlayer && prev.captainId === removedPlayer.id) next.captainId = null;
      if (removedPlayer && prev.viceCaptainId === removedPlayer.id) next.viceCaptainId = null;
      return next;
    });
  };

  const setCaptain = (playerId: string) => {
    if (squad.isLocked) return;
    setSquad((prev) => ({
      ...prev,
      captainId: playerId,
      viceCaptainId: prev.viceCaptainId === playerId ? null : prev.viceCaptainId,
    }));
  };

  const setViceCaptain = (playerId: string) => {
    if (squad.isLocked) return;
    setSquad((prev) => ({
      ...prev,
      viceCaptainId: playerId,
      captainId: prev.captainId === playerId ? null : prev.captainId,
    }));
  };

  const toggleSquadLock = () => {
    setSquad((prev) => ({ ...prev, isLocked: !prev.isLocked }));
  };

  const confirmSquad = (): { success: boolean; message: string } => {
    if (!squadValidation.isValid) {
      return {
        success: false,
        message: squadValidation.errors[0] || 'Please resolve squad composition errors.',
      };
    }
    setSquad((prev) => ({ ...prev, isLocked: true }));
    return { success: true, message: 'Squad successfully locked for Gameweek 4!' };
  };

  const resetSquadToDemo = () => {
    setSquad(INITIAL_SQUAD);
  };

  const clearSquad = () => {
    setSquad({
      exp: null,
      jungle: null,
      mid: null,
      gold: null,
      roam: null,
      captainId: null,
      viceCaptainId: null,
      isLocked: false,
      freeTransfers: 2,
    });
  };

  const autoPickSquad = () => {
    // Generate an optimal 5-man roster within 40.0M with max 2 per team
    const exp = SAMPLE_PLAYERS.find((p) => p.id === 'p-sepat')!; // 7.8M (HB)
    const jungle = SAMPLE_PLAYERS.find((p) => p.id === 'p-sekysss')!; // 9.6M (SRG)
    const mid = SAMPLE_PLAYERS.find((p) => p.id === 'p-moon')!; // 7.7M (TDK)
    const gold = SAMPLE_PLAYERS.find((p) => p.id === 'p-atannn')!; // 7.2M (TS)
    const roam = SAMPLE_PLAYERS.find((p) => p.id === 'p-yums')!; // 8.6M (SRG)
    // Total = 7.8 + 9.6 + 7.7 + 7.2 + 8.6 = 40.9M (exceeds!) -> let's pick cheaper
    const roamCheap = SAMPLE_PLAYERS.find((p) => p.id === 'p-panda')!; // 6.2M (MV)
    // 7.8 + 9.6 + 7.7 + 7.2 + 6.2 = 38.5M!

    setSquad({
      exp,
      jungle,
      mid,
      gold,
      roam: roamCheap,
      captainId: jungle.id,
      viceCaptainId: exp.id,
      isLocked: false,
      freeTransfers: 2,
    });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const openMarketForRole = (role: Role) => {
    setSelectedMarketRole(role);
    setActiveScreen('market');
  };

  const createPrivateLeague = (name: string): { code: string } => {
    const code = `MPL-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newLeague: PrivateLeague = {
      id: `pl-${Date.now()}`,
      name: name.trim() || 'My MLBB League',
      code,
      creator: `${userProfile.managerName}`,
      createdAt: 'Just now',
      membersCount: 1,
      myRank: 1,
      entries: [
        {
          rank: 1,
          manager: userProfile.managerName,
          teamName: userProfile.fantasyTeamName,
          gwPoints: 151.4,
          totalPoints: 804.2,
          favTeam: userProfile.favoriteTeamId.toUpperCase(),
          isCurrentUser: true,
        },
      ],
    };
    setPrivateLeagues((prev) => [newLeague, ...prev]);
    return { code };
  };

  const joinPrivateLeague = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const existing = privateLeagues.find((l) => l.code === cleanCode);
    if (existing) {
      return { success: true, message: `Joined "${existing.name}" successfully!` };
    }
    // Create new joined entry for demo
    const joinedLeague: PrivateLeague = {
      id: `pl-${Date.now()}`,
      name: `League ${cleanCode}`,
      code: cleanCode,
      creator: 'Tournament Host',
      createdAt: 'Today',
      membersCount: 8,
      myRank: 3,
      entries: [
        { rank: 1, manager: 'KingOfMythic', teamName: 'Immortal MLBB', gwPoints: 164.0, totalPoints: 830.0, favTeam: 'SRG' },
        { rank: 2, manager: 'LordSecurer', teamName: 'Retri Master', gwPoints: 156.5, totalPoints: 812.0, favTeam: 'HB' },
        { rank: 3, manager: userProfile.managerName, teamName: userProfile.fantasyTeamName, gwPoints: 151.4, totalPoints: 804.2, favTeam: userProfile.favoriteTeamId.toUpperCase(), isCurrentUser: true },
        { rank: 4, manager: 'MobaPro', teamName: 'Kiting Squad', gwPoints: 142.0, totalPoints: 780.0, favTeam: 'TDK' },
      ],
    };
    setPrivateLeagues((prev) => [...prev, joinedLeague]);
    return { success: true, message: `Successfully joined league (${cleanCode})!` };
  };

  return (
    <FantasyContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        selectedPlayerDetail,
        setSelectedPlayerDetail,
        squad,
        squadValidation,
        selectedMarketRole,
        setSelectedMarketRole,
        selectPlayerForRole,
        removePlayerFromRole,
        setCaptain,
        setViceCaptain,
        toggleSquadLock,
        confirmSquad,
        resetSquadToDemo,
        clearSquad,
        autoPickSquad,
        userProfile,
        updateUserProfile,
        currentGameweek,
        setCurrentGameweek,
        scoringWeights,
        setScoringWeights,
        privateLeagues,
        createPrivateLeague,
        joinPrivateLeague,
        openMarketForRole,
      }}
    >
      {children}
    </FantasyContext.Provider>
  );
}

export function useFantasy() {
  const context = useContext(FantasyContext);
  if (!context) {
    throw new Error('useFantasy must be used within a FantasyProvider');
  }
  return context;
}
