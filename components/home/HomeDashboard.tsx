'use client';

import React from 'react';
import { useFantasy } from '@/context/FantasyContext';
import DeadlineCountdown from './DeadlineCountdown';
import { MPL_TEAMS, SAMPLE_PLAYERS } from '@/lib/data';
import { 
  Trophy, 
  Coins, 
  ArrowRightLeft, 
  Clock, 
  Crown, 
  ChevronRight, 
  TrendingUp, 
  Users, 
  Swords, 
  Sparkles,
  MapPin,
  Calendar,
  ShieldCheck
} from 'lucide-react';

export default function HomeDashboard() {
  const { 
    squad, 
    squadValidation, 
    setActiveScreen, 
    setSelectedPlayerDetail,
    userProfile,
    privateLeagues
  } = useFantasy();

  const favTeam = MPL_TEAMS.find((t) => t.id === userProfile.favoriteTeamId) || MPL_TEAMS[0];
  const captainPlayer = squad.captainId 
    ? [squad.exp, squad.jungle, squad.mid, squad.gold, squad.roam].find((p) => p?.id === squad.captainId)
    : null;

  // Trending players for transfer recommendations
  const trendingPlayers = SAMPLE_PLAYERS.filter(
    (p) => p.id === 'p-sekysss' || p.id === 'p-innocent' || p.id === 'p-stormie' || p.id === 'p-yums'
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-[#0d1629] via-[#101b33] to-[#141b2c] border border-cyan-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                MPL MY S14 • GAMEWEEK 4
              </span>
              <span className="text-xs text-slate-400">Regular Season</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome, {userProfile.managerName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
              Managing <strong className="text-cyan-300">{userProfile.fantasyTeamName}</strong>. 
              Review your 5-man roster, lock your captain, and climb the Malaysian national leaderboard.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                onClick={() => setActiveScreen('squad')}
                id="hero-open-squad-btn"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                <span>Manage Squad Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveScreen('market')}
                id="hero-open-market-btn"
                className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <span>Scout Player Market</span>
              </button>
            </div>
          </div>

          {/* Captain Spotlight Mini Card */}
          {captainPlayer && (
            <div 
              onClick={() => setSelectedPlayerDetail(captainPlayer)}
              className="bg-[#090e1a]/90 backdrop-blur-md border border-amber-500/40 p-4 rounded-2xl shadow-xl hover:border-amber-400 transition-all cursor-pointer group shrink-0 md:w-64"
            >
              <div className="flex items-center justify-between text-xs text-amber-300 mb-2">
                <span className="flex items-center gap-1 font-black text-[10px] uppercase tracking-wider">
                  <Crown className="w-3.5 h-3.5 fill-amber-400" />
                  Your Captain (2X)
                </span>
                <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300 border border-amber-500/30">
                  {captainPlayer.role}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-800 border border-amber-400/50 flex items-center justify-center font-black text-amber-300 text-lg">
                  {captainPlayer.nickname.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                    {captainPlayer.nickname}
                  </div>
                  <div className="text-xs text-slate-400">
                    Form: <strong className="text-cyan-300">{captainPlayer.recentForm.toFixed(1)}★</strong> • Proj: <strong className="text-amber-300">{captainPlayer.projectedPoints.toFixed(1)}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gameweek Deadline Countdown HUD */}
      <DeadlineCountdown />

      {/* Primary Key Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        {/* Overall Points */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" /> Overall Points
          </span>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">804.2</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">+42.0 pts this week</div>
          </div>
        </div>

        {/* Overall Rank */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" /> Overall Rank
          </span>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">#1,324</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Top 8% in Malaysia</div>
          </div>
        </div>

        {/* GW4 Live Score */}
        <div 
          onClick={() => setActiveScreen('points')}
          className="bg-[#0e1424] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 shadow-sm flex flex-col justify-between cursor-pointer group transition-all"
        >
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> GW4 Live Score
          </span>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 group-hover:scale-105 transition-transform">
              151.4
            </div>
            <div className="text-[11px] text-cyan-400 font-semibold mt-0.5 flex items-center gap-1">
              <span>View breakdown</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Budget Remaining */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-indigo-400" /> Remaining Budget
          </span>
          <div className="mt-2">
            <div className={`text-2xl sm:text-3xl font-black font-mono ${squadValidation.remainingBudget < 0 ? 'text-rose-400' : 'text-slate-100'}`}>
              {squadValidation.remainingBudget.toFixed(1)}M
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Salary Cap 40.0M</div>
          </div>
        </div>

        {/* Available Free Transfers */}
        <div className="col-span-2 md:col-span-1 bg-[#0e1424] border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" /> Free Transfers
          </span>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
              {squad.freeTransfers}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Rollover cap: 2 max</div>
          </div>
        </div>
      </div>

      {/* Two-Column Mid Section: Current Roster Snapshot & Trending Market Picks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Squad Roster Snapshot */}
        <div className="lg:col-span-2 bg-[#0e1424] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">Active Gameweek 4 Roster</h2>
              <p className="text-xs text-slate-400">Your starting 5 positioned for the upcoming series.</p>
            </div>
            <button
              onClick={() => setActiveScreen('squad')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Full MOBA Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {(['EXP', 'Jungle', 'Mid', 'Gold', 'Roam'] as const).map((role) => {
              const roleKey = role.toLowerCase() as 'exp' | 'jungle' | 'mid' | 'gold' | 'roam';
              const player = squad[roleKey];
              const isCaptain = player && squad.captainId === player.id;
              const isVice = player && squad.viceCaptainId === player.id;
              const team = player ? MPL_TEAMS.find((t) => t.id === player.teamId) : null;

              return (
                <div
                  key={role}
                  onClick={() => player ? setSelectedPlayerDetail(player) : setActiveScreen('squad')}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-28 ${
                    player
                      ? isCaptain
                        ? 'bg-amber-950/30 border-amber-400 ring-1 ring-amber-400/40'
                        : isVice
                        ? 'bg-indigo-950/30 border-cyan-400 ring-1 ring-cyan-400/30'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-950/40 border-dashed border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {role}
                    </span>
                    {team && (
                      <span
                        className="text-[9px] font-black px-1 py-0.5 rounded text-white"
                        style={{ backgroundColor: team.color }}
                      >
                        {team.code}
                      </span>
                    )}
                    {isCaptain && (
                      <span className="text-[9px] font-black text-amber-300">2X</span>
                    )}
                  </div>

                  <div>
                    {player ? (
                      <>
                        <div className="font-black text-xs sm:text-sm text-slate-100 truncate">
                          {player.nickname}
                        </div>
                        <div className="text-[10px] font-mono text-emerald-400 font-semibold">
                          {player.price.toFixed(1)}M
                        </div>
                      </>
                    ) : (
                      <div className="text-[11px] text-cyan-400/70 font-semibold italic">
                        + Draft {role}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Trending / Recommended Transfers */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Trending Transfers
              </h2>
              <p className="text-[11px] text-slate-400">High form pros in top draft demand</p>
            </div>
            <button
              onClick={() => setActiveScreen('market')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              Market
            </button>
          </div>

          <div className="space-y-2.5">
            {trendingPlayers.map((player) => {
              const team = MPL_TEAMS.find((t) => t.id === player.teamId);
              return (
                <div
                  key={player.id}
                  onClick={() => setSelectedPlayerDetail(player)}
                  className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {player.role}
                    </span>
                    <div>
                      <div className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                        <span>{player.nickname}</span>
                        {team && (
                          <span
                            className="text-[8px] font-black px-1 py-0.2 rounded text-white"
                            style={{ backgroundColor: team.color }}
                          >
                            {team.code}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Form: <strong className="text-cyan-300">{player.recentForm.toFixed(1)}★</strong> • Own: {player.ownershipPercent.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs font-bold text-emerald-400">
                    {player.price.toFixed(1)}M
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Private Leagues Preview Widget */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">Private Leagues Standings</h2>
              <p className="text-xs text-slate-400">Compete against friends and Malaysian MLBB communities.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveScreen('leagues')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>All Leagues</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {privateLeagues.map((league) => (
            <div
              key={league.id}
              onClick={() => setActiveScreen('leagues')}
              className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800 p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between"
            >
              <div>
                <div className="font-black text-sm text-slate-100">{league.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {league.membersCount} Managers • Code: <strong className="text-cyan-300 font-mono">{league.code}</strong>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Your Rank</span>
                <div className="font-mono font-black text-base text-amber-300">
                  #{league.myRank}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
