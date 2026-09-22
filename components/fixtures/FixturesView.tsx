'use client';

import React, { useState } from 'react';
import { SAMPLE_FIXTURES, MPL_TEAMS } from '@/lib/data';
import { Calendar, Swords, Clock, CheckCircle2, Shield, Tv } from 'lucide-react';

export default function FixturesView() {
  const [selectedWeek, setSelectedWeek] = useState<number>(4);

  const filteredFixtures = SAMPLE_FIXTURES.filter((f) => f.gameweek === selectedWeek);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-cyan-400" />
            MPL Malaysia Season 14 Fixtures
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Official best-of-3 regular season series schedule and results.
          </p>
        </div>

        {/* Gameweek Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          {[1, 2, 3, 4, 5, 6].map((gw) => (
            <button
              key={gw}
              onClick={() => setSelectedWeek(gw)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedWeek === gw
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Week {gw}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Tv className="w-4 h-4 text-cyan-400" />
          <span>
            <strong>Official Broadcast:</strong> Matches streamed live on YouTube & TikTok MLBB Esports Official every Friday, Saturday & Sunday.
          </span>
        </div>
        <span className="text-[10px] text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded font-mono">
          GMT+8 Malaysia
        </span>
      </div>

      {/* Fixtures List */}
      <div className="space-y-3.5">
        {filteredFixtures.map((fix) => {
          const homeTeam = MPL_TEAMS.find((t) => t.id === fix.homeTeamId);
          const awayTeam = MPL_TEAMS.find((t) => t.id === fix.awayTeamId);

          return (
            <div
              key={fix.id}
              className="bg-[#0e1424] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg transition-all"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs text-slate-400 mb-3">
                <span className="font-semibold text-slate-300">{fix.date} • {fix.time}</span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    fix.status === 'LIVE'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                      : fix.status === 'COMPLETED'
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {fix.status}
                </span>
              </div>

              {/* Matchup Teams Display */}
              <div className="grid grid-cols-3 items-center text-center">
                {/* Home Team */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:pr-4">
                  <div className="text-right">
                    <div className="font-black text-sm sm:text-base text-white">{homeTeam?.name}</div>
                    <span className="text-[10px] text-slate-400 font-mono">Home</span>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow shrink-0"
                    style={{ backgroundColor: homeTeam?.color || '#1e293b' }}
                  >
                    {homeTeam?.code}
                  </div>
                </div>

                {/* Score or VS */}
                <div className="flex flex-col items-center justify-center">
                  {fix.status === 'COMPLETED' || fix.status === 'LIVE' ? (
                    <div className="font-mono font-black text-xl sm:text-2xl text-cyan-300 bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800">
                      {fix.homeScore} - {fix.awayScore}
                    </div>
                  ) : (
                    <div className="font-mono font-bold text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                      VS (Bo3)
                    </div>
                  )}
                  <span className="text-[10px] text-slate-500 mt-1">Best of 3</span>
                </div>

                {/* Away Team */}
                <div className="flex flex-col sm:flex-row-reverse items-center justify-start gap-3 sm:pl-4">
                  <div className="text-left">
                    <div className="font-black text-sm sm:text-base text-white">{awayTeam?.name}</div>
                    <span className="text-[10px] text-slate-400 font-mono">Away</span>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow shrink-0"
                    style={{ backgroundColor: awayTeam?.color || '#1e293b' }}
                  >
                    {awayTeam?.code}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
