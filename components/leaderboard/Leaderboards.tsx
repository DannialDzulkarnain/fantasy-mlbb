'use client';

import React, { useState } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { GLOBAL_LEADERBOARD, MPL_TEAMS } from '@/lib/data';
import { 
  Trophy, 
  Medal, 
  Search, 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Sparkles,
  Users
} from 'lucide-react';

export default function Leaderboards() {
  const { userProfile } = useFantasy();
  const [activeTab, setActiveTab] = useState<'overall' | 'weekly' | 'fan'>('overall');
  const [searchQuery, setSearchQuery] = useState('');

  const favTeam = MPL_TEAMS.find((t) => t.id === userProfile.favoriteTeamId) || MPL_TEAMS[0];

  const filteredEntries = GLOBAL_LEADERBOARD.filter((entry) => {
    if (activeTab === 'fan' && entry.favoriteTeamId !== userProfile.favoriteTeamId && !entry.isCurrentUser) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return entry.teamName.toLowerCase().includes(q) || entry.managerName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            MPL Malaysia Leaderboards
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Official regular season rankings across all registered Malaysian fantasy managers.
          </p>
        </div>

        {/* User Rank Card */}
        <div className="bg-[#0e1424] border border-cyan-500/40 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 font-black flex items-center justify-center text-sm border border-cyan-500/30">
            #1.3K
          </div>
          <div className="text-xs">
            <span className="text-slate-400 block font-medium">Your Ranking</span>
            <span className="font-bold text-slate-200">#1,324 Overall (804.2 pts)</span>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('overall')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'overall'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            Overall Malaysia
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'weekly'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            Gameweek 4 Live
          </button>
          <button
            onClick={() => setActiveTab('fan')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fan'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: favTeam.color }} />
            <span>{favTeam.code} Fan League</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search manager or team..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {GLOBAL_LEADERBOARD.slice(0, 3).map((entry, idx) => {
          const medals = [
            { label: '1st Place', color: 'from-amber-400 to-yellow-600', ring: 'border-amber-400', text: 'text-amber-300' },
            { label: '2nd Place', color: 'from-slate-300 to-slate-500', ring: 'border-slate-400', text: 'text-slate-200' },
            { label: '3rd Place', color: 'from-amber-700 to-amber-900', ring: 'border-amber-600', text: 'text-amber-500' },
          ];
          const m = medals[idx];

          return (
            <div
              key={entry.rank}
              className={`relative bg-[#0d1322] border ${m.ring} rounded-2xl p-4 shadow-xl flex flex-col justify-between overflow-hidden`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 ${m.text}`}>
                  {m.label}
                </span>
                <span className="text-xl font-black font-mono text-white">#{entry.rank}</span>
              </div>

              <div className="my-3">
                <div className="text-base font-black text-white truncate">{entry.teamName}</div>
                <div className="text-xs text-slate-400">{entry.managerName}</div>
                <div className="text-[11px] text-amber-300/90 mt-1 flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-amber-400" />
                  <span>Cap: {entry.captainPick}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Total Score:</span>
                <span className="text-base font-black text-cyan-300">{entry.totalPoints.toFixed(1)} pts</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 w-16">Rank</th>
                <th className="py-3 px-4">Fantasy Team & Manager</th>
                <th className="py-3 px-4">Captain</th>
                <th className="py-3 px-4 text-right">GW4 Pts</th>
                <th className="py-3 px-4 text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEntries.map((entry) => {
                const isUser = entry.isCurrentUser;
                return (
                  <tr
                    key={entry.rank}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-cyan-950/40 border-l-4 border-cyan-400 font-semibold'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <div className="flex items-center gap-2">
                        {entry.rank === 1 ? (
                          <span className="text-amber-400 font-black">#1</span>
                        ) : entry.rank === 2 ? (
                          <span className="text-slate-300 font-black">#2</span>
                        ) : entry.rank === 3 ? (
                          <span className="text-amber-600 font-black">#3</span>
                        ) : (
                          <span className="text-slate-400">#{entry.rank}</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-black text-sm text-slate-100 flex items-center gap-2">
                            <span>{entry.teamName}</span>
                            {isUser && (
                              <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/40">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{entry.managerName}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-amber-300 text-[11px] font-semibold border border-slate-700">
                        <Crown className="w-3 h-3 fill-amber-400" />
                        {entry.captainPick}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                      +{entry.gwPoints.toFixed(1)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-black text-cyan-300 text-sm">
                      {entry.totalPoints.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
