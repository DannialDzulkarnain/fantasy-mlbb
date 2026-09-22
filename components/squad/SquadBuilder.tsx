'use client';

import React, { useState } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import MobaMap from './MobaMap';
import TransferModal from './TransferModal';
import { MPL_TEAMS } from '@/lib/data';
import { Role, Player } from '@/lib/types';
import { 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  Trash2, 
  ListFilter, 
  Map, 
  Crown,
  ChevronRight,
  TrendingUp,
  Coins,
  ArrowRightLeft
} from 'lucide-react';

export default function SquadBuilder() {
  const {
    squad,
    squadValidation,
    confirmSquad,
    autoPickSquad,
    clearSquad,
    resetSquadToDemo,
    openMarketForRole,
    removePlayerFromRole,
    setCaptain,
    setViceCaptain,
    setSelectedPlayerDetail
  } = useFantasy();

  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [confirmToast, setConfirmToast] = useState<{ message: string; isError: boolean } | null>(null);
  const [transferTarget, setTransferTarget] = useState<{ player: Player; role: Role } | null>(null);

  const handleConfirm = () => {
    const res = confirmSquad();
    setConfirmToast({ message: res.message, isError: !res.success });
    setTimeout(() => setConfirmToast(null), 4000);
  };

  const rolesOrder: Role[] = ['EXP', 'Jungle', 'Mid', 'Gold', 'Roam'];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              My Fantasy Squad
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              GW4
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Assemble your 5-man MPL Malaysia roster directly onto the MOBA battlefield.
          </p>
        </div>

        {/* View switcher (Map vs List) */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('map')}
            id="squad-view-map-btn"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'map'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>MOBA Map</span>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            id="squad-view-list-btn"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'list'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>List Roster</span>
          </button>
        </div>
      </div>

      {/* Real-time Validation Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Budget Metric Card */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              Squad Budget
            </span>
            <div className="text-lg font-black font-mono">
              <span className={squadValidation.remainingBudget < 0 ? 'text-rose-400' : 'text-emerald-400'}>
                {squadValidation.remainingBudget.toFixed(1)}M
              </span>
              <span className="text-xs text-slate-500 font-normal ml-1">
                / {squadValidation.totalCost.toFixed(1)}M spent
              </span>
            </div>
          </div>
          {/* Visual Budget Meter */}
          <div className="w-20 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${
                squadValidation.totalCost > 40.0 ? 'bg-rose-500' : 'bg-emerald-400'
              }`}
              style={{ width: `${Math.min(100, (squadValidation.totalCost / 40.0) * 100)}%` }}
            />
          </div>
        </div>

        {/* Team Limit Tracker Card */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Team Cap (Max 2/Team)
          </span>
          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            {Object.entries(squadValidation.teamCounts).map(([teamId, count]) => {
              const team = MPL_TEAMS.find((t) => t.id === teamId);
              const isMaxed = count >= 2;
              const isOver = count > 2;
              return (
                <span
                  key={teamId}
                  className={`text-[10px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                    isOver
                      ? 'bg-rose-950 text-rose-300 border-rose-600 animate-pulse'
                      : isMaxed
                      ? 'bg-amber-950 text-amber-300 border-amber-600'
                      : 'bg-slate-900 text-slate-300 border-slate-700'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: team?.color || '#fff' }} />
                  {team?.code || teamId.toUpperCase()} {count}/2
                </span>
              );
            })}
            {Object.keys(squadValidation.teamCounts).length === 0 && (
              <span className="text-xs text-slate-500 italic">No players picked yet</span>
            )}
          </div>
        </div>

        {/* Squad Status & Confirm Action Card */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Squad Lock Status
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {squad.isLocked ? (
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  Locked for GW4
                </span>
              ) : squadValidation.isValid ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ready to Lock
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Needs Attention
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleConfirm}
            id="squad-confirm-btn"
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg ${
              squad.isLocked
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : squadValidation.isValid
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{squad.isLocked ? 'Locked' : 'Lock Squad'}</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {confirmToast && (
        <div
          className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold animate-fadeIn ${
            confirmToast.isError
              ? 'bg-rose-950/80 border-rose-700 text-rose-200'
              : 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
          }`}
        >
          {confirmToast.isError ? (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{confirmToast.message}</span>
        </div>
      )}

      {/* Validation Warnings / Errors Banner if any */}
      {(squadValidation.errors.length > 0 || squadValidation.warnings.length > 0) && (
        <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl space-y-1 text-xs">
          {squadValidation.errors.map((err, i) => (
            <div key={i} className="text-rose-300 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              {err}
            </div>
          ))}
          {squadValidation.warnings.map((warn, i) => (
            <div key={i} className="text-amber-300 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {warn}
            </div>
          ))}
        </div>
      )}

      {/* Quick Helper Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={autoPickSquad}
            id="squad-autopick-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/50 font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Auto-Pick Optimal Roster</span>
          </button>
          <button
            onClick={resetSquadToDemo}
            id="squad-reset-demo-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Squad</span>
          </button>
          <button
            onClick={clearSquad}
            id="squad-clear-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 border border-rose-800/40 font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Clear Roster</span>
          </button>
        </div>

        <div className="text-slate-400 text-xs font-mono">
          Free Transfers: <strong className="text-amber-300">{squad.freeTransfers}</strong>
        </div>
      </div>

      {/* Main Squad View: MAP VIEW OR LIST VIEW */}
      {activeTab === 'map' ? (
        <MobaMap onOpenTransfer={(player, role) => setTransferTarget({ player, role })} />
      ) : (
        /* LIST VIEW ROSTER */
        <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Role & Player</span>
            <div className="flex items-center gap-8">
              <span>Form & Proj</span>
              <span>Price</span>
              <span>Actions</span>
            </div>
          </div>

          <div className="space-y-2">
            {rolesOrder.map((role) => {
              const roleKey = role.toLowerCase() as 'exp' | 'jungle' | 'mid' | 'gold' | 'roam';
              const player = squad[roleKey];
              const isCaptain = player && squad.captainId === player.id;
              const isViceCaptain = player && squad.viceCaptainId === player.id;
              const team = player ? MPL_TEAMS.find((t) => t.id === player.teamId) : null;

              return (
                <div
                  key={role}
                  className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                    player
                      ? isCaptain
                        ? 'bg-amber-950/20 border-amber-500/50'
                        : isViceCaptain
                        ? 'bg-indigo-950/20 border-cyan-500/40'
                        : 'bg-slate-900/60 border-slate-800'
                      : 'bg-slate-950/50 border-dashed border-slate-800'
                  }`}
                >
                  {/* Left: Role + Player Name */}
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-center text-xs font-black px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {role}
                    </span>

                    {player ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-100">
                            {player.nickname}
                          </span>
                          {team && (
                            <span
                              className="text-[9px] font-black px-1.5 py-0.5 rounded text-white"
                              style={{ backgroundColor: team.color }}
                            >
                              {team.code}
                            </span>
                          )}
                          {isCaptain && (
                            <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Crown className="w-2.5 h-2.5 fill-slate-950" />
                              CAP (2X)
                            </span>
                          )}
                          {isViceCaptain && (
                            <span className="bg-cyan-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded">
                              VC (SUB)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {player.realName}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 italic">
                        Empty slot. Tap pick player to draft.
                      </span>
                    )}
                  </div>

                  {/* Right: Stats + Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                    {player ? (
                      <>
                        <div className="text-right text-xs">
                          <div className="font-bold text-cyan-300">{player.recentForm.toFixed(1)}★</div>
                          <div className="text-[10px] text-slate-400">{player.projectedPoints.toFixed(1)} pts</div>
                        </div>

                        <div className="font-mono font-bold text-emerald-400 text-sm">
                          {player.price.toFixed(1)}M
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Transfer Out / Sell Button */}
                          <button
                            onClick={() => setTransferTarget({ player, role })}
                            title="Transfer / Sell Player"
                            className="px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-600/50 text-cyan-300 text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Transfer</span>
                          </button>

                          <button
                            onClick={() => setSelectedPlayerDetail(player)}
                            title="View Pro Build"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          >
                            <TrendingUp className="w-4 h-4 text-indigo-400" />
                          </button>
                          <button
                            onClick={() => setCaptain(player.id)}
                            title="Set Captain (2x points)"
                            className={`p-1.5 rounded-lg border text-xs font-bold ${
                              isCaptain
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
                            }`}
                          >
                            C
                          </button>
                          <button
                            onClick={() => setViceCaptain(player.id)}
                            title="Set Vice Captain"
                            className={`p-1.5 rounded-lg border text-xs font-bold ${
                              isViceCaptain
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
                            }`}
                          >
                            VC
                          </button>
                          <button
                            onClick={() => removePlayerFromRole(role)}
                            title="Remove"
                            className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => openMarketForRole(role)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1"
                      >
                        <span>Select {role}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {transferTarget && (
        <TransferModal
          outgoingPlayer={transferTarget.player}
          outgoingRole={transferTarget.role}
          onClose={() => setTransferTarget(null)}
          onSuccess={(msg) => {
            setConfirmToast({ message: msg, isError: false });
            setTimeout(() => setConfirmToast(null), 5000);
          }}
        />
      )}
    </div>
  );
}
