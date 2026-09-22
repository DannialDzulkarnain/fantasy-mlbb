'use client';

import React, { useState } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { MPL_TEAMS } from '@/lib/data';
import {
  X,
  Shield,
  Zap,
  Sword,
  Sparkles,
  Check,
  Plus,
  ArrowRightLeft,
  AlertCircle,
  TrendingUp,
  Award,
  Crown
} from 'lucide-react';

export default function PlayerDetailModal() {
  const {
    selectedPlayerDetail,
    setSelectedPlayerDetail,
    squad,
    selectPlayerForRole,
    setCaptain,
    setViceCaptain,
    squadValidation
  } = useFantasy();

  const [activeTab, setActiveTab] = useState<'build' | 'heroes' | 'fantasy'>('build');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!selectedPlayerDetail) return null;

  const player = selectedPlayerDetail;
  const team = MPL_TEAMS.find((t) => t.id === player.teamId);
  const roleKey = player.role.toLowerCase() as 'exp' | 'jungle' | 'mid' | 'gold' | 'roam';
  const isInSquad = squad[roleKey]?.id === player.id;
  const isCaptain = squad.captainId === player.id;
  const isViceCaptain = squad.viceCaptainId === player.id;

  const handleDraft = () => {
    const res = selectPlayerForRole(player);
    setActionNotice(res.message);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b101c] border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Header with Team Color Glow */}
        <div
          className="relative p-5 sm:p-6 border-b border-slate-800"
          style={{
            background: `linear-gradient(135deg, ${team?.color || '#0284c7'}25 0%, #0b101c 70%)`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-xl border border-white/20"
                style={{ backgroundColor: team?.color || '#1e293b' }}
              >
                {team?.code}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {player.role} Laner
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {team?.name}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight mt-0.5 flex items-center gap-2">
                  {player.nickname}
                  {isCaptain && (
                    <span className="text-xs bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3 fill-slate-950" /> CAPTAIN
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-400 font-medium">{player.realName}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlayerDetail(null)}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-4 gap-2 mt-5 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80 text-center">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Fantasy Price</div>
              <div className="text-base font-black font-mono text-emerald-400">{player.price.toFixed(1)}M</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Recent Form</div>
              <div className="text-base font-black text-cyan-300">{player.recentForm.toFixed(1)}★</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Proj GW4</div>
              <div className="text-base font-black text-amber-300">{player.projectedPoints.toFixed(1)} pts</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Ownership</div>
              <div className="text-base font-black text-slate-200">{player.ownershipPercent.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        {/* Prototype Data Disclaimer Alert */}
        <div className="bg-cyan-950/40 border-b border-cyan-900/40 px-5 py-2 flex items-center gap-2 text-xs text-cyan-300">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>SAMPLE / DEMO DATA:</strong> Pro builds and hero stats are modeled for demonstration in this unofficial prototype.
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 px-5 bg-[#090d17]">
          <button
            onClick={() => setActiveTab('build')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'build'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sword className="w-4 h-4" />
            <span>Pro Build & Emblems</span>
          </button>
          <button
            onClick={() => setActiveTab('heroes')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'heroes'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Hero Pool & Win Rates</span>
          </button>
          <button
            onClick={() => setActiveTab('fantasy')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'fantasy'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>GW Performance History</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* TAB 1: PRO BUILD */}
          {activeTab === 'build' && (
            <div className="space-y-5">
              {/* Build Meta Header */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-2 bg-slate-800 rounded-2xl">
                    {player.recentProBuild.heroIcon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Featured Hero Build</div>
                    <div className="text-lg font-black text-white">
                      {player.recentProBuild.hero}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 mr-1">Spell:</span>
                    <strong className="text-amber-300">{player.recentProBuild.battleSpell}</strong>
                  </div>
                  <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 mr-1">Emblem:</span>
                    <strong className="text-cyan-300">{player.recentProBuild.emblem}</strong>
                  </div>
                </div>
              </div>

              {/* Final 6-Item Build Cards */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Latest Match Final Item Build (6 Slots)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {player.recentProBuild.finalBuild.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-3 rounded-xl flex flex-col justify-between gap-1 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl p-1.5 bg-slate-800 rounded-lg">{item.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-slate-100 leading-tight">
                            {idx + 1}. {item.name}
                          </div>
                          <span className="text-[10px] text-cyan-400 font-semibold">{item.category}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Most Used Core Items */}
              <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800 text-xs">
                <span className="font-bold text-slate-300 mr-2">Season Core Items:</span>
                <span className="text-slate-400">
                  {player.recentProBuild.mostUsedBuild.map((i) => i.name).join(' • ')}
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: HERO POOL */}
          {activeTab === 'heroes' && (
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Recent Tournament Hero Pool & Win Rates
              </h4>
              <div className="space-y-2.5">
                {player.recentHeroPool.map((hero, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-slate-800 rounded-xl">{hero.icon}</span>
                      <div>
                        <div className="text-sm font-black text-slate-100">{hero.heroName}</div>
                        <div className="text-xs text-slate-400">{hero.games} Games Played</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <div className="text-xs font-bold text-slate-300">Avg KDA</div>
                        <div className="text-[11px] font-mono text-cyan-400">{hero.kda}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-300">Win Rate</div>
                        <div
                          className={`text-sm font-black font-mono ${
                            hero.winRate >= 70
                              ? 'text-emerald-400'
                              : hero.winRate >= 50
                              ? 'text-cyan-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {hero.winRate}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tournament KDA and Kill Participation */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 font-medium">Tournament KDA Ratio</div>
                  <div className="text-lg font-black text-cyan-300 font-mono mt-0.5">
                    {player.kda.ratio.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {player.kda.kills} K / {player.kda.deaths} D / {player.kda.assists} A
                  </div>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 font-medium">Kill Participation (KP%)</div>
                  <div className="text-lg font-black text-amber-300 font-mono mt-0.5">
                    {player.killParticipation.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Team fight involvement rate
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FANTASY HISTORY */}
          {activeTab === 'fantasy' && (
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Gameweek Points Log (MPL Regular Season)
              </h4>
              <div className="space-y-2">
                {Object.entries(player.gwStats).map(([gw, stats]) => (
                  <div
                    key={gw}
                    className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-200">Gameweek {gw}</div>
                      <div className="text-slate-400 text-[11px]">
                        {stats.mapsPlayed} Maps • {stats.wins} Wins • {stats.kills} Kills • {stats.assists} Assists • {stats.deaths} Deaths
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Score</div>
                      <div className="font-mono font-black text-emerald-400 text-sm">
                        +{(stats.wins * 2 + stats.kills * 1.1 + stats.assists * 0.6).toFixed(1)} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          {actionNotice && (
            <span className="text-xs font-bold text-cyan-300">{actionNotice}</span>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {isInSquad ? (
              <>
                <button
                  onClick={() => setCaptain(player.id)}
                  disabled={isCaptain}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    isCaptain
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  {isCaptain ? '★ Active Captain' : 'Make Captain'}
                </button>
                <div className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400 text-xs font-black flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>In Roster</span>
                </div>
              </>
            ) : (
              <button
                onClick={handleDraft}
                disabled={squad.isLocked}
                className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                {squad[roleKey] ? (
                  <>
                    <ArrowRightLeft className="w-4 h-4" />
                    <span>Swap into {player.role} Slot</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Draft as {player.role} ({player.price.toFixed(1)}M)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
