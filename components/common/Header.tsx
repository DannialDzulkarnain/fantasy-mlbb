'use client';

import React, { useState, useEffect } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { Shield, Lock, Unlock, Clock, AlertCircle } from 'lucide-react';
import { MPL_TEAMS } from '@/lib/data';

export default function Header() {
  const { squad, toggleSquadLock, userProfile, squadValidation, setActiveScreen } = useFantasy();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 18, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const favTeam = MPL_TEAMS.find((t) => t.id === userProfile.favoriteTeamId) || MPL_TEAMS[0];

  return (
    <header className="w-full bg-[#0b0f19]/95 backdrop-blur-md border-b border-cyan-950/40 sticky top-0 z-40">
      {/* Top Legal Safety Banner */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-purple-950/40 to-slate-900 px-4 py-1 text-center border-b border-cyan-900/30 flex items-center justify-center gap-2 text-[11px] text-cyan-300/80">
        <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>
          <strong className="text-cyan-200">Unofficial prototype.</strong> Sample / synthetic competition data. Not affiliated with MPL Malaysia or MOONTON Games.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Logo & Title */}
        <div 
          onClick={() => setActiveScreen('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          id="header-brand-logo"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-700 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center text-[8px] font-black text-slate-950 border border-slate-900">
              MY
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 uppercase">
                Fantasy MPL
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                MY
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-tight font-medium hidden sm:block">
              Mobile Legends Fantasy League
            </p>
          </div>
        </div>

        {/* Center: Gameweek & Lock Countdown */}
        <div className="hidden md:flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full shadow-inner">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">GW4 LIVE</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Lock in:</span>
            <span className="font-mono font-bold text-amber-300">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Right Action: Demo Lock Toggle & Manager Pill */}
        <div className="flex items-center gap-2">
          {/* Demo Lock/Unlock Toggle */}
          <button
            onClick={toggleSquadLock}
            id="header-toggle-lock-btn"
            title={squad.isLocked ? 'Squad is locked for GW4. Click to unlock (Demo mode).' : 'Squad is editable. Click to test locking (Demo mode).'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              squad.isLocked
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
                : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
            }`}
          >
            {squad.isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Locked</span>
                <span className="text-[10px] opacity-70">(Demo)</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Editable</span>
                <span className="text-[10px] opacity-70">(Demo)</span>
              </>
            )}
          </button>

          {/* User Profile Pill */}
          <button
            onClick={() => setActiveScreen('profile')}
            id="header-profile-btn"
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 px-2.5 py-1.5 rounded-lg transition-colors text-left"
          >
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs text-white shadow"
              style={{ backgroundColor: favTeam.color }}
            >
              {favTeam.code}
            </div>
            <div className="hidden lg:block">
              <div className="text-xs font-bold text-slate-200 leading-none">
                {userProfile.fantasyTeamName}
              </div>
              <div className="text-[10px] text-cyan-400 leading-none mt-1">
                #1,324 Overall
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
