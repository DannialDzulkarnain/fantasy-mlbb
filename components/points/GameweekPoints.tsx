'use client';

import React, { useState } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { MPL_TEAMS } from '@/lib/data';
import { calculatePlayerScore } from '@/lib/scoring';
import { 
  Award, 
  Crown, 
  Sparkles, 
  Settings2, 
  RotateCcw, 
  Info, 
  ChevronRight,
  TrendingUp,
  Skull,
  Crosshair,
  HandHelping,
  Layers
} from 'lucide-react';
import { DEFAULT_SCORING_WEIGHTS } from '@/lib/data';

export default function GameweekPoints() {
  const { 
    squad, 
    currentGameweek, 
    setCurrentGameweek, 
    scoringWeights, 
    setScoringWeights, 
    setSelectedPlayerDetail 
  } = useFantasy();

  const [showConfigModal, setShowConfigModal] = useState(false);

  const gameweeks = [1, 2, 3, 4];

  const squadPlayers = [
    { role: 'EXP' as const, player: squad.exp },
    { role: 'Jungle' as const, player: squad.jungle },
    { role: 'Mid' as const, player: squad.mid },
    { role: 'Gold' as const, player: squad.gold },
    { role: 'Roam' as const, player: squad.roam },
  ];

  // Calculate scores for all players in squad
  let totalGwSquadScore = 0;

  const playerBreakdowns = squadPlayers.map(({ role, player }) => {
    if (!player) return null;
    const isCap = squad.captainId === player.id;
    const isVice = squad.viceCaptainId === player.id;
    const breakdown = calculatePlayerScore(
      player, 
      currentGameweek, 
      isCap, 
      isVice, 
      true, 
      scoringWeights
    );
    totalGwSquadScore += breakdown.finalTotal;
    return {
      role,
      player,
      breakdown,
      team: MPL_TEAMS.find((t) => t.id === player.teamId),
      stats: player.gwStats[currentGameweek] || { mapsPlayed: 2, wins: 1, kills: 3, assists: 8, deaths: 3, bonusPoints: 0 }
    };
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header with GW Selector & Total Score Display */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Gameweek Points & Breakdown
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time role-adjusted fantasy points for every map played.
          </p>

          {/* Gameweek Selector Pills */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs font-semibold text-slate-400 mr-1">Select GW:</span>
            {gameweeks.map((gw) => (
              <button
                key={gw}
                onClick={() => setCurrentGameweek(gw)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentGameweek === gw
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                GW {gw} {gw === 4 ? '(Live)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Total GW Score Hero Badge */}
        <div className="flex items-center gap-4 bg-[#090d18] border border-cyan-500/30 p-5 rounded-2xl shadow-xl">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              GW {currentGameweek} Total Score
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-300">
              {totalGwSquadScore.toFixed(1)} <span className="text-lg font-normal text-slate-500">pts</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">
              Includes Captain 2x multiplier
            </div>
          </div>

          <button
            onClick={() => setShowConfigModal(true)}
            id="open-scoring-rules-btn"
            className="p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors self-center flex flex-col items-center gap-1"
            title="Configure role scoring weights"
          >
            <Settings2 className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Formula</span>
          </button>
        </div>
      </div>

      {/* Role Scoring Formula Quick Guide Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300">
            <strong>Role-Adjusted Scoring Active:</strong> Kills & assists are weighted by role difficulty (e.g. Roamers receive higher assist weight; EXP/Gold receive kill bonuses).
          </span>
        </div>
        <button
          onClick={() => setShowConfigModal(true)}
          className="text-cyan-400 hover:text-cyan-300 font-bold underline shrink-0"
        >
          View / Adjust Multipliers
        </button>
      </div>

      {/* Squad Players Breakdown List */}
      <div className="space-y-4">
        {playerBreakdowns.map((item, idx) => {
          if (!item) {
            const missingRole = squadPlayers[idx].role;
            return (
              <div
                key={missingRole}
                className="bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-500"
              >
                <span>No player selected for {missingRole} slot.</span>
                <span className="text-amber-400 font-mono">0.0 pts</span>
              </div>
            );
          }

          const { role, player, breakdown, team, stats } = item;
          const isCap = breakdown.isCaptain;
          const isVice = breakdown.isViceCaptain;

          return (
            <div
              key={player.id}
              className={`bg-[#0e1424] border rounded-2xl p-4 sm:p-5 shadow-lg transition-all ${
                isCap
                  ? 'border-amber-500/50 bg-gradient-to-r from-amber-950/15 via-[#0e1424] to-[#0e1424]'
                  : isVice
                  ? 'border-cyan-500/40'
                  : 'border-slate-800'
              }`}
            >
              {/* Top Row: Player Identity + Total Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow"
                    style={{ backgroundColor: team?.color || '#334155' }}
                  >
                    {team?.code}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-white">
                        {player.nickname}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {role}
                      </span>
                      {isCap && (
                        <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Crown className="w-3 h-3 fill-slate-950" /> CAPTAIN (2X)
                        </span>
                      )}
                      {isVice && (
                        <span className="bg-cyan-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                          VICE CAPTAIN
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">
                      {team?.name} • Series vs {team?.rival}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Pts</span>
                    <div className="text-2xl font-black font-mono text-cyan-300">
                      {breakdown.finalTotal.toFixed(1)}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPlayerDetail(player)}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="View details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Detailed Points Calculation Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-3 pt-1 text-center text-xs">
                {/* Maps Played */}
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">Maps Played</div>
                  <div className="font-mono font-bold text-slate-200">
                    {stats.mapsPlayed} ({breakdown.mapsPlayedScore >= 0 ? '+' : ''}{breakdown.mapsPlayedScore} pts)
                  </div>
                </div>

                {/* Wins */}
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">Map Wins</div>
                  <div className="font-mono font-bold text-emerald-400">
                    {stats.wins} (+{breakdown.winsScore} pts)
                  </div>
                </div>

                {/* Kills */}
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">Kills</div>
                  <div className="font-mono font-bold text-cyan-300">
                    {stats.kills} (+{breakdown.killsScore} pts)
                  </div>
                </div>

                {/* Assists */}
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">Assists</div>
                  <div className="font-mono font-bold text-indigo-300">
                    {stats.assists} (+{breakdown.assistsScore} pts)
                  </div>
                </div>

                {/* Deaths */}
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">Deaths</div>
                  <div className="font-mono font-bold text-rose-400">
                    {stats.deaths} ({breakdown.deathsPenalty} pts)
                  </div>
                </div>

                {/* Bonus & Multiplier */}
                <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">Multiplier</div>
                  <div className="font-mono font-bold text-amber-300">
                    {isCap ? '2.0x (Cap)' : '1.0x'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONFIGURABLE SCORING RULES MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-cyan-400" />
                  Fantasy Scoring Multipliers
                </h3>
                <p className="text-xs text-slate-400">
                  Tune role scoring weights to test dynamic scoring recalculations.
                </p>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Config Table Form */}
            <div className="space-y-4 text-xs">
              {/* General map scores */}
              <div className="grid grid-cols-2 gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div>
                  <label className="text-slate-400 block mb-1">Map Played Bonus:</label>
                  <input
                    type="number"
                    step="0.25"
                    value={scoringWeights.mapPlayed}
                    onChange={(e) => setScoringWeights((prev) => ({ ...prev, mapPlayed: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Map Win Bonus:</label>
                  <input
                    type="number"
                    step="0.25"
                    value={scoringWeights.mapWin}
                    onChange={(e) => setScoringWeights((prev) => ({ ...prev, mapWin: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-slate-100 font-mono"
                  />
                </div>
              </div>

              {/* Roles weights */}
              {[
                { label: 'Jungle Role', kKey: 'jungleKill', aKey: 'jungleAssist', dKey: 'jungleDeath' },
                { label: 'Gold Role', kKey: 'goldKill', aKey: 'goldAssist', dKey: 'goldDeath' },
                { label: 'Mid Role', kKey: 'midKill', aKey: 'midAssist', dKey: 'midDeath' },
                { label: 'EXP Role', kKey: 'expKill', aKey: 'expAssist', dKey: 'expDeath' },
                { label: 'Roam Role', kKey: 'roamKill', aKey: 'roamAssist', dKey: 'roamDeath' },
              ].map((group) => (
                <div key={group.label} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="font-bold text-cyan-300 mb-2">{group.label}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Kill</label>
                      <input
                        type="number"
                        step="0.1"
                        value={scoringWeights[group.kKey as keyof typeof scoringWeights]}
                        onChange={(e) => setScoringWeights((prev) => ({ ...prev, [group.kKey]: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-slate-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Assist</label>
                      <input
                        type="number"
                        step="0.05"
                        value={scoringWeights[group.aKey as keyof typeof scoringWeights]}
                        onChange={(e) => setScoringWeights((prev) => ({ ...prev, [group.aKey]: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-slate-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Death Penalty</label>
                      <input
                        type="number"
                        step="0.05"
                        value={scoringWeights[group.dKey as keyof typeof scoringWeights]}
                        onChange={(e) => setScoringWeights((prev) => ({ ...prev, [group.dKey]: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-slate-100 font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={() => setScoringWeights(DEFAULT_SCORING_WEIGHTS)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to MPL Standard</span>
              </button>

              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
