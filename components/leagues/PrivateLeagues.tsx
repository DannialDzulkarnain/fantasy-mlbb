'use client';

import React, { useState } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { 
  Swords, 
  Plus, 
  Users, 
  Copy, 
  Check, 
  Share2, 
  Trophy, 
  Crown,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function PrivateLeagues() {
  const { privateLeagues, createPrivateLeague, joinPrivateLeague } = useFantasy();

  const [selectedLeagueId, setSelectedLeagueId] = useState<string>(privateLeagues[0]?.id || 'l-office');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const [newLeagueName, setNewLeagueName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeLeague = privateLeagues.find((l) => l.id === selectedLeagueId) || privateLeagues[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setToastMessage(`League code ${code} copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
      setToastMessage(null);
    }, 3000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeagueName.trim()) return;
    const res = createPrivateLeague(newLeagueName.trim());
    setNewLeagueName('');
    setShowCreateModal(false);
    setToastMessage(`Created private league! Invite code: ${res.code}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    const res = joinPrivateLeague(joinCode.trim());
    setJoinCode('');
    setShowJoinModal(false);
    setToastMessage(res.message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Swords className="w-6 h-6 text-indigo-400" />
            Private Leagues
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Create custom mini-leagues for your squad, workplace, or Discord community.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowJoinModal(true)}
            id="join-league-btn"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
          >
            Join League
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            id="create-league-btn"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create League</span>
          </button>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Two-Column Layout: League Selector Cards & Active Standings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: My Leagues List */}
        <div className="space-y-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Your Active Leagues ({privateLeagues.length})
          </h2>

          <div className="space-y-2.5">
            {privateLeagues.map((league) => {
              const isSelected = league.id === activeLeague?.id;
              return (
                <div
                  key={league.id}
                  onClick={() => setSelectedLeagueId(league.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#101b33] to-[#0c1424] border-cyan-400/80 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-400/30'
                      : 'bg-[#0e1424] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-black text-white">{league.name}</h3>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3 text-slate-400" />
                        {league.membersCount} Managers
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Rank
                      </span>
                      <span className="font-mono font-black text-amber-300 text-base">
                        #{league.myRank}
                      </span>
                    </div>
                  </div>

                  {/* Shareable League Code */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">
                      Code: <strong className="text-cyan-300">{league.code}</strong>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCode(league.code);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-cyan-300 transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === league.code ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: League Table & Standings */}
        {activeLeague && (
          <div className="lg:col-span-2 bg-[#0e1424] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-white">
                    {activeLeague.name}
                  </h2>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Classic Format
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Total points accumulated through Gameweek 4.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(activeLeague.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold border border-slate-700 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Code ({activeLeague.code})</span>
                </button>
              </div>
            </div>

            {/* Standings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <th className="py-3 px-3 w-14">Pos</th>
                    <th className="py-3 px-3">Manager & Team</th>
                    <th className="py-3 px-3 text-right">GW4 Pts</th>
                    <th className="py-3 px-3 text-right">Total Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {(activeLeague.entries || []).map((row) => (
                    <tr
                      key={row.rank}
                      className={`transition-colors ${
                        row.isCurrentUser
                          ? 'bg-cyan-950/40 border-l-4 border-cyan-400 font-semibold'
                          : 'hover:bg-slate-900/50'
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-bold">
                        {row.rank === 1 ? (
                          <span className="text-amber-400 font-black">#1</span>
                        ) : (
                          <span className="text-slate-400">#{row.rank}</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-100 flex items-center gap-1.5">
                          <span>{row.teamName}</span>
                          {row.isCurrentUser && (
                            <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1 py-0.2 rounded border border-cyan-500/40">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{row.manager}</div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                        +{row.gwPoints.toFixed(1)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-black text-cyan-300 text-sm">
                        {row.totalPoints.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* CREATE LEAGUE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <form
            onSubmit={handleCreate}
            className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-lg font-black text-white">Create a Private League</h3>
            <p className="text-xs text-slate-400">
              Invite friends with a generated unique code to see who has the best tactical MLBB instincts.
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                League Name
              </label>
              <input
                type="text"
                value={newLeagueName}
                onChange={(e) => setNewLeagueName(e.target.value)}
                placeholder="e.g. Bangsar Boys 5v5"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs"
              >
                Create League
              </button>
            </div>
          </form>
        </div>
      )}

      {/* JOIN LEAGUE MODAL */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <form
            onSubmit={handleJoin}
            className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-lg font-black text-white">Join a Private League</h3>
            <p className="text-xs text-slate-400">
              Enter the 8-character league code provided by your league creator (e.g. MPL-9042).
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                League Code
              </label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="MPL-XXXX"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-mono uppercase text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowJoinModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs"
              >
                Join League
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
