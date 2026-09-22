'use client';

import React, { useState, useMemo } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { Player, Role } from '@/lib/types';
import { SAMPLE_PLAYERS, MPL_TEAMS } from '@/lib/data';
import { 
  X, 
  ArrowRightLeft, 
  Coins, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  TrendingUp, 
  SlidersHorizontal,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface TransferModalProps {
  outgoingPlayer: Player;
  outgoingRole: Role;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export default function TransferModal({
  outgoingPlayer,
  outgoingRole,
  onClose,
  onSuccess
}: TransferModalProps) {
  const { 
    squad, 
    squadValidation, 
    selectPlayerForRole, 
    openMarketForRole,
    setSelectedPlayerDetail 
  } = useFantasy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'projected-desc' | 'price-desc' | 'price-asc' | 'form-desc'>('projected-desc');
  const [validationError, setValidationError] = useState<string | null>(null);

  const outgoingTeam = MPL_TEAMS.find((t) => t.id === outgoingPlayer.teamId);

  // Remaining budget if outgoing player is sold
  const budgetAfterSale = squadValidation.remainingBudget + outgoingPlayer.price;

  // Filter candidate replacements for the same role
  const candidates = useMemo(() => {
    return SAMPLE_PLAYERS.filter((p) => {
      // Must match role
      if (p.role !== outgoingRole) return false;
      // Filter by team
      if (selectedTeamFilter !== 'ALL' && p.teamId !== selectedTeamFilter) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return p.nickname.toLowerCase().includes(q) || p.realName.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'projected-desc':
          return b.projectedPoints - a.projectedPoints;
        case 'price-desc':
          return b.price - a.price;
        case 'price-asc':
          return a.price - b.price;
        case 'form-desc':
          return b.recentForm - a.recentForm;
        default:
          return 0;
      }
    });
  }, [outgoingRole, selectedTeamFilter, searchQuery, sortBy]);

  // Execute transfer
  const handleExecuteTransfer = (candidate: Player) => {
    setValidationError(null);

    // 1. Is it the same player?
    if (candidate.id === outgoingPlayer.id) {
      setValidationError(`${candidate.nickname} is already in this slot.`);
      return;
    }

    // 2. Budget Check: candidate price vs available budget after selling outgoing player
    const costDiff = candidate.price - outgoingPlayer.price;
    const newRemainingBudget = squadValidation.remainingBudget - costDiff;
    if (newRemainingBudget < -0.001) {
      const shortfall = (Math.abs(newRemainingBudget)).toFixed(1);
      setValidationError(
        `Transfer violates 40.0M salary cap! You need ${shortfall}M more budget. (Candidate: ${candidate.price.toFixed(1)}M, Available after sale: ${budgetAfterSale.toFixed(1)}M)`
      );
      return;
    }

    // 3. Team Limit Check: max 2 players per MPL team
    // Calculate team count if this transfer goes through
    const currentTeamCount = squadValidation.teamCounts[candidate.teamId] || 0;
    const isSameTeamAsOutgoing = outgoingPlayer.teamId === candidate.teamId;
    const newTeamCount = isSameTeamAsOutgoing ? currentTeamCount : currentTeamCount + 1;

    if (newTeamCount > 2) {
      const targetTeam = MPL_TEAMS.find((t) => t.id === candidate.teamId);
      setValidationError(
        `Transfer violates Club Limit rule! You cannot have more than 2 players from ${targetTeam?.name || candidate.teamId.toUpperCase()}. (Already rostered: ${currentTeamCount}/2)`
      );
      return;
    }

    // Passed all validation checks! Execute transfer
    const res = selectPlayerForRole(candidate);
    if (!res.success) {
      setValidationError(res.message);
      return;
    }

    onSuccess(
      `Transfer Complete: Sold ${outgoingPlayer.nickname} (+${outgoingPlayer.price.toFixed(1)}M) and signed ${candidate.nickname} (-${candidate.price.toFixed(1)}M). Remaining budget: ${newRemainingBudget.toFixed(1)}M.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-[#0b101c] border border-cyan-500/40 rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0e1526] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/30">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                Transfer & Replace {outgoingRole} Laner
              </h2>
              <p className="text-xs text-slate-400">
                Sell current player and scout replacements within the 40.0M cap & 2-player team limit.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transfer Economics HUD Bar */}
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Outgoing Player Card */}
          <div className="bg-[#070b13] border border-rose-500/40 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                Transfer Out (Selling)
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm font-black text-white">{outgoingPlayer.nickname}</span>
                {outgoingTeam && (
                  <span 
                    className="text-[9px] font-black px-1.5 py-0.2 rounded text-white"
                    style={{ backgroundColor: outgoingTeam.color }}
                  >
                    {outgoingTeam.code}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Form: {outgoingPlayer.recentForm.toFixed(1)}★
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Refund Value</span>
              <span className="text-base font-black font-mono text-emerald-400">
                +{outgoingPlayer.price.toFixed(1)}M
              </span>
            </div>
          </div>

          {/* Budget Available After Sale */}
          <div className="bg-[#070b13] border border-emerald-500/40 rounded-2xl p-3 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Budget Available for New Pick
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black font-mono text-emerald-300">
                {budgetAfterSale.toFixed(1)}M
              </span>
              <span className="text-[10px] text-slate-400">
                ({squadValidation.remainingBudget.toFixed(1)}M bank + {outgoingPlayer.price.toFixed(1)}M refund)
              </span>
            </div>
          </div>

          {/* Free Transfers Remaining */}
          <div className="bg-[#070b13] border border-slate-800 rounded-2xl p-3 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Free Transfers Remaining
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black font-mono text-amber-300">
                {squad.freeTransfers}
              </span>
              <span className="text-[10px] text-slate-400">
                1 free/GW (Rollover cap: 2)
              </span>
            </div>
          </div>
        </div>

        {/* Validation Error Banner (if transfer rule is broken) */}
        {validationError && (
          <div className="p-3 mx-4 mt-3 rounded-2xl bg-rose-950/80 border border-rose-600 text-rose-200 text-xs font-bold flex items-start gap-2.5 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="block font-black text-rose-300">Transfer Rule Violation:</span>
              <span className="font-normal text-rose-200">{validationError}</span>
            </div>
          </div>
        )}

        {/* Search, Filter & Sort Controls */}
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${outgoingRole} Laners...`}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Team Filter */}
            <select
              value={selectedTeamFilter}
              onChange={(e) => setSelectedTeamFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Teams</option>
              {MPL_TEAMS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code} - {t.name}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="projected-desc">Projected Pts</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="form-desc">Recent Form</option>
            </select>
          </div>
        </div>

        {/* Candidate List Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {candidates.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No {outgoingRole} Laners match your filter criteria.
            </div>
          ) : (
            candidates.map((candidate) => {
              const team = MPL_TEAMS.find((t) => t.id === candidate.teamId);
              const isCurrent = candidate.id === outgoingPlayer.id;

              // Rule checks:
              const costDiff = candidate.price - outgoingPlayer.price;
              const newRemainingBudget = squadValidation.remainingBudget - costDiff;
              const isOverBudget = newRemainingBudget < -0.001;

              const currentTeamCount = squadValidation.teamCounts[candidate.teamId] || 0;
              const isSameTeam = outgoingPlayer.teamId === candidate.teamId;
              const newTeamCount = isSameTeam ? currentTeamCount : currentTeamCount + 1;
              const isTeamCapped = !isCurrent && newTeamCount > 2;

              const isValidTransfer = !isCurrent && !isOverBudget && !isTeamCapped;

              return (
                <div
                  key={candidate.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-slate-900/40 border-slate-800 opacity-60'
                      : isValidTransfer
                      ? 'bg-[#0e1424] hover:bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
                      : 'bg-[#10101b] border-slate-800/80'
                  }`}
                >
                  {/* Left: Player Info */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xs shadow"
                      style={{ backgroundColor: team?.color || '#334155' }}
                    >
                      {team?.code}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-white">{candidate.nickname}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{candidate.realName}</span>
                        {isCurrent && (
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded">
                            Current Pick
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span>Form: <strong className="text-cyan-300">{candidate.recentForm.toFixed(1)}★</strong></span>
                        <span>•</span>
                        <span>Proj: <strong className="text-amber-300">{candidate.projectedPoints.toFixed(1)}</strong></span>
                        <span>•</span>
                        <span>Own: <strong className="text-slate-300">{candidate.ownershipPercent}%</strong></span>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => setSelectedPlayerDetail(candidate)}
                          className="text-indigo-400 hover:text-indigo-300 font-semibold underline text-[11px]"
                        >
                          View Build
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & Transfer Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <div className="text-right">
                      <div className="font-black font-mono text-white text-sm">
                        {candidate.price.toFixed(1)}M
                      </div>
                      <div className={`text-[10px] font-mono ${costDiff > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {costDiff > 0 ? `+${costDiff.toFixed(1)}M cost` : `${costDiff.toFixed(1)}M diff`}
                      </div>
                    </div>

                    {/* Action Button / Badge */}
                    {isCurrent ? (
                      <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-bold">
                        Current Pick
                      </span>
                    ) : isTeamCapped ? (
                      <div className="text-right">
                        <button
                          disabled
                          className="px-3 py-1.5 rounded-xl bg-rose-950/40 text-rose-400 border border-rose-800/60 text-xs font-bold cursor-not-allowed flex items-center gap-1"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Team Limit (2/2)</span>
                        </button>
                      </div>
                    ) : isOverBudget ? (
                      <div className="text-right">
                        <button
                          disabled
                          className="px-3 py-1.5 rounded-xl bg-rose-950/40 text-rose-400 border border-rose-800/60 text-xs font-bold cursor-not-allowed"
                        >
                          Over Budget (Need +{Math.abs(newRemainingBudget).toFixed(1)}M)
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleExecuteTransfer(candidate)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                        <span>Transfer In</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0a0f1d] border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              openMarketForRole(outgoingRole);
              onClose();
            }}
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 underline"
          >
            <span>Open in Full Player Market Screen</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
