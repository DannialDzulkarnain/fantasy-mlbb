'use client';

import React, { useState, useEffect } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { Clock, Lock, Unlock, ArrowRight } from 'lucide-react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function DeadlineCountdown() {
  const { squad, toggleSquadLock, setActiveScreen } = useFantasy();

  // Target deadline: 2 days, 14 hours, 35 minutes, 20 seconds from initialization
  // (Representing Friday 2:30 PM MYT for Gameweek 4 lock)
  const [targetTime] = useState<number>(() => {
    return Date.now() + (2 * 24 * 60 * 60 + 14 * 60 * 60 + 35 * 60 + 20) * 1000;
  });

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 20,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = targetTime - Date.now();
      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className="bg-gradient-to-r from-[#0d1527] via-[#0f1a30] to-[#0e1628] border border-cyan-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Deadline Info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-400" />
              GAMEWEEK 4 LOCK DEADLINE
            </span>

            {squad.isLocked ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700/60 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                Locked
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Transfers Open
              </span>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
            Roster Lock Countdown
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Squad selection, player transfers, and captain choices lock precisely{' '}
            <strong className="text-slate-200">30 minutes before Match 1</strong> (Selangor Red Giants vs HomeBois).
          </p>
          <div className="text-[11px] text-slate-500 font-mono">
            Lock Target: <strong className="text-slate-300">Friday, 25 Sep 2026 • 2:30 PM MYT</strong>
          </div>
        </div>

        {/* Center / Right: Countdown Display Boxes */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
            {/* Days */}
            <div className="bg-[#080d1a] border border-cyan-500/30 rounded-2xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[70px] shadow-lg">
              <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 block">
                {String(timeRemaining.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 block mt-0.5">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="bg-[#080d1a] border border-cyan-500/30 rounded-2xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[70px] shadow-lg">
              <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 block">
                {String(timeRemaining.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 block mt-0.5">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-[#080d1a] border border-cyan-500/30 rounded-2xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[70px] shadow-lg">
              <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 block">
                {String(timeRemaining.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 block mt-0.5">
                Mins
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-[#080d1a] border border-slate-700/80 rounded-2xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[70px] shadow-lg">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-200 block">
                {String(timeRemaining.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 block mt-0.5">
                Secs
              </span>
            </div>
          </div>

          {/* Quick Transfer CTA Button */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveScreen('squad')}
              id="countdown-manage-transfers-btn"
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span>Make Transfers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Lock simulator toggle */}
            <button
              onClick={toggleSquadLock}
              id="countdown-toggle-lock-btn"
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 border border-slate-700/80 transition-colors flex items-center justify-center gap-1"
            >
              {squad.isLocked ? (
                <>
                  <Unlock className="w-3 h-3 text-amber-400" />
                  <span>Unlock Squad (Demo)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>Simulate Lock (Demo)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
