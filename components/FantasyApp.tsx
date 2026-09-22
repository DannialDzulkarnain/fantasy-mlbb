'use client';

import React from 'react';
import { FantasyProvider, useFantasy } from '@/context/FantasyContext';
import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';
import HomeDashboard from '@/components/home/HomeDashboard';
import SquadBuilder from '@/components/squad/SquadBuilder';
import PlayerMarket from '@/components/market/PlayerMarket';
import GameweekPoints from '@/components/points/GameweekPoints';
import Leaderboards from '@/components/leaderboard/Leaderboards';
import PrivateLeagues from '@/components/leagues/PrivateLeagues';
import FixturesView from '@/components/fixtures/FixturesView';
import GameRulesView from '@/components/rules/GameRulesView';
import ProfileSettingsView from '@/components/profile/ProfileSettingsView';
import PlayerDetailModal from '@/components/player/PlayerDetailModal';

function MainContent() {
  const { activeScreen } = useFantasy();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {activeScreen === 'home' && <HomeDashboard />}
      {activeScreen === 'squad' && <SquadBuilder />}
      {activeScreen === 'market' && <PlayerMarket />}
      {activeScreen === 'points' && <GameweekPoints />}
      {activeScreen === 'leaderboard' && <Leaderboards />}
      {activeScreen === 'leagues' && <PrivateLeagues />}
      {activeScreen === 'fixtures' && <FixturesView />}
      {activeScreen === 'rules' && <GameRulesView />}
      {activeScreen === 'profile' && <ProfileSettingsView />}

      {/* Global Player Detail Modal */}
      <PlayerDetailModal />
    </main>
  );
}

export default function FantasyApp() {
  return (
    <FantasyProvider>
      <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans">
        <Header />
        <div className="flex-1 flex flex-col md:flex-row pb-16 md:pb-0">
          <Navigation />
          <MainContent />
        </div>
      </div>
    </FantasyProvider>
  );
}
