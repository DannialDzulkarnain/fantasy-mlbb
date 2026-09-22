'use client';

import React, { useState } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { MPL_TEAMS } from '@/lib/data';
import { 
  Settings, 
  User, 
  Shield, 
  Heart, 
  RotateCcw, 
  Check, 
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';

export default function ProfileSettingsView() {
  const { userProfile, updateUserProfile, resetSquadToDemo } = useFantasy();

  const [managerName, setManagerName] = useState(userProfile.managerName);
  const [teamName, setTeamName] = useState(userProfile.fantasyTeamName);
  const [favTeamId, setFavTeamId] = useState(userProfile.favoriteTeamId);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      managerName,
      fantasyTeamName: teamName,
      favoriteTeamId: favTeamId,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset squad to default demo roster?')) {
      resetSquadToDemo();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-400" />
          Manager Profile & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize your manager persona, fantasy squad branding, and favorite MPL Malaysia club.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {resetSuccess && (
        <div className="p-3.5 rounded-2xl bg-cyan-950/80 border border-cyan-600 text-cyan-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Demo roster successfully restored to default balance!</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSave} className="bg-[#0e1424] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
        {/* Manager Name */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
            <User className="w-4 h-4 text-cyan-400" />
            Manager Name
          </label>
          <input
            type="text"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            required
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Fantasy Team Name */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-indigo-400" />
            Fantasy Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Favorite MPL Team */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400" />
            Favorite MPL Malaysia Team (Fan League Affiliation)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MPL_TEAMS.map((team) => (
              <button
                type="button"
                key={team.id}
                onClick={() => setFavTeamId(team.id)}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                  favTeamId === team.id
                    ? 'border-cyan-400 bg-cyan-950/30 text-white ring-1 ring-cyan-400/40'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs text-white shadow"
                  style={{ backgroundColor: team.color }}
                >
                  {team.code}
                </div>
                <span className="text-[11px] font-bold truncate max-w-full">{team.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Squad</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Unofficial Prototype Disclaimer Card */}
      <div className="bg-[#0b101c] border border-slate-800/80 rounded-2xl p-5 space-y-2 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-amber-300 font-bold">
          <Info className="w-4 h-4 text-amber-400" />
          <span>Unofficial Community Prototype Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          Fantasy MPL MY is an independent prototype web application developed strictly for esports demonstration and portfolio review. Sample and synthetic competition data are used. All Mobile Legends: Bang Bang trademarks, hero visuals, professional player handles, and tournament marks belong to Moonton and their respective esports organizations.
        </p>
      </div>
    </div>
  );
}
