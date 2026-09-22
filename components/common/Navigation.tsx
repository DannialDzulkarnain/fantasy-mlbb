'use client';

import React, { useState } from 'react';
import { useFantasy, ScreenTab } from '@/context/FantasyContext';
import {
  Home,
  Shield,
  Users,
  Award,
  Trophy,
  Swords,
  Calendar,
  BookOpen,
  Settings,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  id: ScreenTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Dashboard', icon: Home },
  { id: 'squad', label: 'My Team (Map)', icon: Shield, badge: '5v5' },
  { id: 'market', label: 'Player Market', icon: Users },
  { id: 'points', label: 'GW Points', icon: Award, badge: 'LIVE' },
  { id: 'leaderboard', label: 'Leaderboards', icon: Trophy },
  { id: 'leagues', label: 'Private Leagues', icon: Swords },
  { id: 'fixtures', label: 'MPL Fixtures', icon: Calendar },
  { id: 'rules', label: 'Game Rules', icon: BookOpen },
  { id: 'profile', label: 'Settings', icon: Settings },
];

export default function Navigation() {
  const { activeScreen, setActiveScreen, squadValidation, squad } = useFantasy();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (screen: ScreenTab) => {
    setActiveScreen(screen);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0d121f] border-r border-slate-800/80 shrink-0 min-h-[calc(100vh-4rem)] p-4 justify-between">
        <div className="space-y-6">
          {/* Manager Mini Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold tracking-wide uppercase text-[10px] text-cyan-400">Team Status</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800/40 font-mono">
                {squadValidation.playersCount}/5 Players
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Remaining:</span>
              <span className={`font-mono font-bold ${squadValidation.remainingBudget < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {squadValidation.remainingBudget.toFixed(1)}M
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-slate-300">Transfers:</span>
              <span className="font-mono font-bold text-amber-300">
                {squad.freeTransfers} Free
              </span>
            </div>
          </div>

          {/* Nav Items List */}
          <nav className="space-y-1.5" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-desktop-${item.id}`}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/15 to-transparent text-cyan-300 border-l-4 border-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        item.badge === 'LIVE'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-500 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-cyan-400/70 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MPL MY Season 14</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Official regular season format. Lock occurs 30 mins before Friday series 1.
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#090d16]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5">
        <div className="flex items-center justify-around">
          <button
            onClick={() => handleNavClick('home')}
            id="mobile-nav-home"
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
              activeScreen === 'home' ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => handleNavClick('squad')}
            id="mobile-nav-squad"
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors relative ${
              activeScreen === 'squad' ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span className="text-[10px]">My Team</span>
            {squadValidation.playersCount < 5 && (
              <span className="absolute top-1 right-2 w-2 h-2 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('market')}
            id="mobile-nav-market"
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
              activeScreen === 'market' ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Players</span>
          </button>

          <button
            onClick={() => handleNavClick('points')}
            id="mobile-nav-points"
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors relative ${
              activeScreen === 'points' ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px]">Points</span>
            <span className="absolute top-1 right-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            id="mobile-nav-more"
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
              ['leaderboard', 'leagues', 'fixtures', 'rules', 'profile'].includes(activeScreen)
                ? 'text-cyan-400 font-bold'
                : 'text-slate-400'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </div>

      {/* Mobile "More" Drawer Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#0e1424] border-t border-slate-700 rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <span className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Additional Features
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900/60 text-slate-300 border border-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="font-semibold text-sm">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
