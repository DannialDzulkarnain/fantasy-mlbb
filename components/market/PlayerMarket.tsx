'use client';

import React, { useState, useMemo } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { SAMPLE_PLAYERS, MPL_TEAMS } from '@/lib/data';
import { Role, Player } from '@/lib/types';
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  Minus,
  Check,
  Plus,
  ArrowRightLeft,
  Eye,
  AlertCircle,
  Coins,
  ShieldAlert,
  X,
  Filter,
  RotateCcw,
  Sparkles,
  Flame,
  Award,
  Users
} from 'lucide-react';

export type SortOption =
  | 'projected-desc'
  | 'ownership-desc'
  | 'form-desc'
  | 'price-desc'
  | 'price-asc'
  | 'total-desc';

export type AvailabilityFilter = 'ALL' | 'AFFORDABLE' | 'AVAILABLE_ONLY' | 'UNCAPPED_ONLY';
export type PriceRangeFilter = 'ALL' | 'BUDGET' | 'MID' | 'PREMIUM';

export default function PlayerMarket() {
  const {
    squad,
    squadValidation,
    selectPlayerForRole,
    setSelectedPlayerDetail,
    selectedMarketRole,
    setSelectedMarketRole,
    setActiveScreen
  } = useFantasy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('projected-desc');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('ALL');
  const [priceRange, setPriceRange] = useState<PriceRangeFilter>('ALL');
  const [actionNotice, setActionNotice] = useState<{ message: string; isError: boolean } | null>(null);

  const rolesList: { id: Role | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Roles' },
    { id: 'EXP', label: 'EXP Laner' },
    { id: 'Jungle', label: 'Jungler' },
    { id: 'Mid', label: 'Mid Laner' },
    { id: 'Gold', label: 'Gold Laner' },
    { id: 'Roam', label: 'Roamer' },
  ];

  // Reset all filters to default
  const handleResetFilters = () => {
    setSelectedMarketRole('ALL');
    setSelectedTeam('ALL');
    setSearchQuery('');
    setSortBy('projected-desc');
    setAvailabilityFilter('ALL');
    setPriceRange('ALL');
  };

  const hasActiveFilters =
    selectedMarketRole !== 'ALL' ||
    selectedTeam !== 'ALL' ||
    searchQuery.trim() !== '' ||
    availabilityFilter !== 'ALL' ||
    priceRange !== 'ALL' ||
    sortBy !== 'projected-desc';

  // Filtered and sorted players
  const displayedPlayers = useMemo(() => {
    return SAMPLE_PLAYERS.filter((player) => {
      const roleKey = player.role.toLowerCase() as 'exp' | 'jungle' | 'mid' | 'gold' | 'roam';
      const isSelectedInSquad = squad[roleKey]?.id === player.id;
      const teamCount = squadValidation.teamCounts[player.teamId] || 0;
      const isTeamBlocked = !isSelectedInSquad && teamCount >= 2 && squad[roleKey]?.teamId !== player.teamId;

      // 1. Role match
      if (selectedMarketRole !== 'ALL' && player.role !== selectedMarketRole) {
        return false;
      }

      // 2. Team match
      if (selectedTeam !== 'ALL' && player.teamId !== selectedTeam) {
        return false;
      }

      // 3. Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchNick = player.nickname.toLowerCase().includes(q);
        const matchReal = player.realName.toLowerCase().includes(q);
        const matchTeam = player.teamId.toLowerCase().includes(q);
        if (!matchNick && !matchReal && !matchTeam) return false;
      }

      // 4. Availability & Affordability filter
      if (availabilityFilter === 'AVAILABLE_ONLY' && isSelectedInSquad) {
        return false;
      }
      if (availabilityFilter === 'UNCAPPED_ONLY' && isTeamBlocked) {
        return false;
      }
      if (availabilityFilter === 'AFFORDABLE') {
        const currentCostWithoutSlot = squadValidation.totalCost - (squad[roleKey]?.price || 0);
        const wouldExceedBudget = !isSelectedInSquad && currentCostWithoutSlot + player.price > 40.0;
        if (wouldExceedBudget) return false;
      }

      // 5. Price range filter
      if (priceRange === 'BUDGET' && player.price > 7.6) return false;
      if (priceRange === 'MID' && (player.price <= 7.6 || player.price > 8.4)) return false;
      if (priceRange === 'PREMIUM' && player.price <= 8.4) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'projected-desc':
          return b.projectedPoints - a.projectedPoints;
        case 'ownership-desc':
          return b.ownershipPercent - a.ownershipPercent;
        case 'form-desc':
          return b.recentForm - a.recentForm;
        case 'price-desc':
          return b.price - a.price;
        case 'price-asc':
          return a.price - b.price;
        case 'total-desc':
          return b.totalPoints - a.totalPoints;
        default:
          return 0;
      }
    });
  }, [selectedMarketRole, selectedTeam, searchQuery, availabilityFilter, priceRange, sortBy, squad, squadValidation]);

  const handleSelectPlayer = (player: Player) => {
    const res = selectPlayerForRole(player);
    setActionNotice({ message: res.message, isError: !res.success });
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Player Market</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
              MPL MY S14
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Scout, filter, and draft official MPL Malaysia stars within your 40.0M salary cap.
          </p>
        </div>

        {/* Squad Quick Status */}
        <div className="flex items-center gap-3 bg-[#0d1424] border border-slate-800 px-3.5 py-2 rounded-xl text-xs shadow-sm">
          <div>
            <span className="text-slate-400">Remaining Budget: </span>
            <span className={`font-mono font-bold ${squadValidation.remainingBudget < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {squadValidation.remainingBudget.toFixed(1)}M
            </span>
          </div>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => setActiveScreen('squad')}
            className="text-cyan-400 hover:text-cyan-300 font-bold underline"
          >
            My Squad ({squadValidation.playersCount}/5)
          </button>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div
          className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-lg ${
            actionNotice.isError
              ? 'bg-rose-950/90 border-rose-700 text-rose-200'
              : 'bg-emerald-950/90 border-emerald-700 text-emerald-200'
          }`}
        >
          {actionNotice.isError ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{actionNotice.message}</span>
        </div>
      )}

      {/* Search & Filter Controls Panel */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4 shadow-xl">
        {/* Top Row: Search Input + Sort Selection */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search player nickname, real name, or team..."
              className="w-full pl-9 pr-9 py-2.5 bg-slate-900 border border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Sort Options Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">Sort By:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-2xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-500 shadow-inner"
            >
              <option value="projected-desc">Projected Pts (High to Low)</option>
              <option value="form-desc">Recent Form (Rating)</option>
              <option value="ownership-desc">Ownership % (Popularity)</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="total-desc">Total Fantasy Points</option>
            </select>
          </div>
        </div>

        {/* Quick Sort Feature Buttons (One-Click) */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Quick Sort:
          </span>
          <button
            onClick={() => setSortBy('projected-desc')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              sortBy === 'projected-desc'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Award className="w-3 h-3" />
            <span>Projected Pts</span>
          </button>
          <button
            onClick={() => setSortBy('form-desc')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              sortBy === 'form-desc'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Recent Form</span>
          </button>
          <button
            onClick={() => setSortBy('ownership-desc')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              sortBy === 'ownership-desc'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>Ownership %</span>
          </button>
          <button
            onClick={() => setSortBy('price-desc')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              sortBy === 'price-desc'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <span>Price (High)</span>
          </button>
          <button
            onClick={() => setSortBy('price-asc')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              sortBy === 'price-asc'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <span>Price (Low)</span>
          </button>
        </div>

        {/* Role Filter Tabs */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Filter by Role
            </span>
            <span className="text-[11px] text-slate-500">
              Select specific lane or view all
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {rolesList.map(({ id, label }) => {
              const countForRole =
                id === 'ALL'
                  ? SAMPLE_PLAYERS.length
                  : SAMPLE_PLAYERS.filter((p) => p.role === id).length;

              return (
                <button
                  key={id}
                  onClick={() => setSelectedMarketRole(id)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 border ${
                    selectedMarketRole === id
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 border-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="leading-tight">{label}</span>
                  <span
                    className={`text-[10px] font-mono ${
                      selectedMarketRole === id ? 'text-slate-900 font-bold' : 'text-slate-500'
                    }`}
                  >
                    ({countForRole})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MPL Team Filter Pills */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Filter by MPL MY Team (Max 2/Team Rule)
            </span>
            <span className="text-[11px] text-slate-500">
              Badge shows current squad representation
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedTeam('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTeam === 'ALL'
                  ? 'bg-white text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Teams
            </button>
            {MPL_TEAMS.map((team) => {
              const countInSquad = squadValidation.teamCounts[team.id] || 0;
              const isCapped = countInSquad >= 2;

              return (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    selectedTeam === team.id
                      ? 'border-cyan-400 text-white shadow-lg'
                      : isCapped
                      ? 'bg-slate-900/80 border-amber-800/60 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  style={{
                    backgroundColor: selectedTeam === team.id ? `${team.color}35` : undefined,
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: team.color }} />
                  <span>{team.code}</span>
                  <span
                    className={`text-[10px] font-mono px-1 rounded ${
                      isCapped
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : countInSquad > 0
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'text-slate-500'
                    }`}
                  >
                    {countInSquad}/2
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Smart Filters: Affordability & Price Tiers */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Availability / Affordability */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Eligibility:</span>
            <button
              onClick={() => setAvailabilityFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                availabilityFilter === 'ALL'
                  ? 'bg-slate-200 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setAvailabilityFilter('AFFORDABLE')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                availabilityFilter === 'AFFORDABLE'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Affordable Only
            </button>
            <button
              onClick={() => setAvailabilityFilter('AVAILABLE_ONLY')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                availabilityFilter === 'AVAILABLE_ONLY'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Available to Draft
            </button>
            <button
              onClick={() => setAvailabilityFilter('UNCAPPED_ONLY')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                availabilityFilter === 'UNCAPPED_ONLY'
                  ? 'bg-indigo-500 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Exclude Capped (2/2)
            </button>
          </div>

          {/* Price Range Tiers */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Price:</span>
            <button
              onClick={() => setPriceRange('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                priceRange === 'ALL'
                  ? 'bg-slate-200 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Any Price
            </button>
            <button
              onClick={() => setPriceRange('BUDGET')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                priceRange === 'BUDGET'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Budget (≤7.6M)
            </button>
            <button
              onClick={() => setPriceRange('MID')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                priceRange === 'MID'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Mid (7.7M-8.4M)
            </button>
            <button
              onClick={() => setPriceRange('PREMIUM')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                priceRange === 'PREMIUM'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Star (≥8.5M)
            </button>
          </div>
        </div>

        {/* Active Filter Chips & Reset All Button */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400">Active Filters:</span>

              {selectedMarketRole !== 'ALL' && (
                <span className="px-2 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1 text-[11px]">
                  Role: {selectedMarketRole}
                  <button onClick={() => setSelectedMarketRole('ALL')}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {selectedTeam !== 'ALL' && (
                <span className="px-2 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1 text-[11px]">
                  Team: {selectedTeam}
                  <button onClick={() => setSelectedTeam('ALL')}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {searchQuery.trim() && (
                <span className="px-2 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1 text-[11px]">
                  &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {availabilityFilter !== 'ALL' && (
                <span className="px-2 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1 text-[11px]">
                  {availabilityFilter === 'AFFORDABLE'
                    ? 'Affordable'
                    : availabilityFilter === 'AVAILABLE_ONLY'
                    ? 'Available'
                    : 'Uncapped'}
                  <button onClick={() => setAvailabilityFilter('ALL')}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {priceRange !== 'ALL' && (
                <span className="px-2 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1 text-[11px]">
                  Tier: {priceRange}
                  <button onClick={() => setPriceRange('ALL')}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Players Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-slate-100 font-bold">{displayedPlayers.length}</strong> of{' '}
          <strong className="text-slate-300">{SAMPLE_PLAYERS.length}</strong> players
        </span>
        <span className="text-slate-500">
          Max 2 players per MPL team • 40.0M Total Budget
        </span>
      </div>

      {/* Empty State */}
      {displayedPlayers.length === 0 ? (
        <div className="bg-[#0b101c] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No players found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No professional players match your current filter combination. Try clearing your filters or search term.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        /* Players Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {displayedPlayers.map((player) => {
            const team = MPL_TEAMS.find((t) => t.id === player.teamId);
            const roleKey = player.role.toLowerCase() as 'exp' | 'jungle' | 'mid' | 'gold' | 'roam';
            const isSelectedInSquad = squad[roleKey]?.id === player.id;
            const isCaptain = squad.captainId === player.id;
            const isViceCaptain = squad.viceCaptainId === player.id;

            // Team limit check
            const teamCount = squadValidation.teamCounts[player.teamId] || 0;
            const isTeamBlocked = !isSelectedInSquad && teamCount >= 2 && squad[roleKey]?.teamId !== player.teamId;

            // Budget check
            const currentCostWithoutSlot = squadValidation.totalCost - (squad[roleKey]?.price || 0);
            const wouldExceedBudget = !isSelectedInSquad && currentCostWithoutSlot + player.price > 40.0;

            // Price change indicator
            const priceDiff = Number((player.price - player.previousPrice).toFixed(1));

            return (
              <div
                key={player.id}
                className={`bg-[#0d1322] rounded-2xl border p-4 flex flex-col justify-between gap-3 transition-all duration-200 shadow-md ${
                  isSelectedInSquad
                    ? 'border-cyan-500/80 bg-gradient-to-b from-[#0e182f] to-[#0a0f1d] ring-1 ring-cyan-400/30'
                    : 'border-slate-800 hover:border-slate-700 hover:bg-[#0f172a]'
                }`}
              >
                {/* Card Top: Role Badge, Team Tag, Price Movement */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        {player.role}
                      </span>
                      {team && (
                        <span
                          className="text-[10px] font-black px-2 py-0.5 rounded text-white shadow-sm flex items-center gap-1"
                          style={{ backgroundColor: team.color }}
                        >
                          {team.code}
                        </span>
                      )}
                    </div>

                    {/* Price Movement Indicator */}
                    <div className="flex items-center gap-1 text-[11px] font-mono">
                      {priceDiff > 0 ? (
                        <span className="text-emerald-400 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" /> +{priceDiff.toFixed(1)}M
                        </span>
                      ) : priceDiff < 0 ? (
                        <span className="text-rose-400 flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" /> {priceDiff.toFixed(1)}M
                        </span>
                      ) : (
                        <span className="text-slate-500 flex items-center gap-0.5">
                          <Minus className="w-3 h-3" /> 0.0M
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Nickname & Real Name */}
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-base font-black text-white tracking-tight">
                        {player.nickname}
                      </h3>
                      <p className="text-[11px] text-slate-400">{player.realName}</p>
                    </div>
                    <div className="text-right font-mono font-black text-base text-emerald-400">
                      {player.price.toFixed(1)}M
                    </div>
                  </div>

                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-3 gap-1.5 bg-slate-900/90 rounded-xl p-2.5 mt-3 border border-slate-800/80 text-center">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Form</div>
                      <div className="text-xs font-black text-cyan-300">{player.recentForm.toFixed(1)}★</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Proj Pts</div>
                      <div className="text-xs font-black text-amber-300">{player.projectedPoints.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Ownership</div>
                      <div className="text-xs font-black text-slate-200">{player.ownershipPercent.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>

                {/* Status / Restriction Alerts */}
                {isTeamBlocked && (
                  <div className="text-[10px] text-amber-400 bg-amber-950/30 border border-amber-800/50 p-1.5 rounded-lg flex items-center gap-1.5">
                    <ShieldAlert className="w-3 h-3 shrink-0" />
                    <span>Team cap reached (2 players from {team?.code} already drafted).</span>
                  </div>
                )}
                {wouldExceedBudget && (
                  <div className="text-[10px] text-rose-400 bg-rose-950/30 border border-rose-800/50 p-1.5 rounded-lg flex items-center gap-1.5">
                    <Coins className="w-3 h-3 shrink-0" />
                    <span>Exceeds remaining budget ({squadValidation.remainingBudget.toFixed(1)}M available).</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setSelectedPlayerDetail(player)}
                    id={`market-view-detail-${player.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Pro Build</span>
                  </button>

                  {isSelectedInSquad ? (
                    <div className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-black">
                      <Check className="w-3.5 h-3.5" />
                      <span>In Squad</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSelectPlayer(player)}
                      id={`market-select-btn-${player.id}`}
                      disabled={squad.isLocked || isTeamBlocked || wouldExceedBudget}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black transition-all ${
                        squad.isLocked || isTeamBlocked || wouldExceedBudget
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                          : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      }`}
                    >
                      {squad[roleKey] ? (
                        <>
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                          <span>Replace</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Select</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
