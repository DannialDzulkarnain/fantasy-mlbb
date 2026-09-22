'use client';

import React from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Coins, 
  Crown, 
  ArrowRightLeft, 
  Clock, 
  Award,
  Zap,
  Info
} from 'lucide-react';

export default function GameRulesView() {
  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          Fantasy MPL MY Official Rules
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Everything you need to know about squad building, transfers, scoring calculations, and deadlines.
        </p>
      </div>

      {/* Rules Sections */}
      <div className="space-y-4 text-xs sm:text-sm text-slate-300">
        {/* Rule 1: Squad Composition */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-cyan-300 font-black text-base">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>1. Squad Composition & Battlefield Roles</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Every fantasy squad consists of exactly <strong>5 starting players</strong> corresponding to the authentic 5v5 Mobile Legends MOBA battlefield:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <li className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <strong className="text-white">1 EXP Laner:</strong> Top lane frontline initiator and split pusher.
            </li>
            <li className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <strong className="text-white">1 Jungler:</strong> Objective securer, retribution holder & early carry.
            </li>
            <li className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <strong className="text-white">1 Mid Laner:</strong> Central map controller, wave clearer & magic DPS.
            </li>
            <li className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <strong className="text-white">1 Gold Laner:</strong> Marksman carry responsible for late-game team fights.
            </li>
            <li className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 sm:col-span-2">
              <strong className="text-white">1 Roamer:</strong> Support or tank providing river vision, crowd control & setup.
            </li>
          </ul>
        </div>

        {/* Rule 2: Budget & Constraints */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400 font-black text-base">
            <Coins className="w-5 h-5 text-emerald-400" />
            <span>2. Budget Cap & Club Limits</span>
          </div>
          <div className="space-y-2 text-slate-300">
            <p>
              • <strong>Total Salary Cap:</strong> You are allotted a budget of exactly <strong className="text-emerald-300">40.0M</strong> to draft all 5 starting players.
            </p>
            <p>
              • <strong>Team Representation Limit:</strong> You may draft a maximum of <strong>2 players from the same MPL team</strong> (e.g. at most 2 from Selangor Red Giants, 2 from HomeBois).
            </p>
          </div>
        </div>

        {/* Rule 3: Captain & Vice Captain */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-300 font-black text-base">
            <Crown className="w-5 h-5 text-amber-400" />
            <span>3. Captain & Vice Captain Mechanics</span>
          </div>
          <div className="space-y-2 text-slate-300">
            <p>
              • <strong>Captain:</strong> Receives <strong className="text-amber-300">2x (double) fantasy points</strong> for all maps played in the gameweek.
            </p>
            <p>
              • <strong>Vice Captain:</strong> Acts as an automatic emergency reserve. The Vice Captain&apos;s 2x multiplier activates <em>only if</em> your chosen Captain does not play a single map in that gameweek.
            </p>
          </div>
        </div>

        {/* Rule 4: Transfers & Lock Deadline */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-indigo-300 font-black text-base">
            <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
            <span>4. Transfers & Lock Deadlines</span>
          </div>
          <div className="space-y-2 text-slate-300">
            <p>
              • <strong>Free Transfers:</strong> You receive <strong>1 free player transfer</strong> per gameweek.
            </p>
            <p>
              • <strong>Transfer Rollover:</strong> If unused, free transfers roll over up to a maximum cap of <strong>2 free transfers</strong>.
            </p>
            <p>
              • <strong>Lock Deadline:</strong> Squad rosters lock precisely <strong>30 minutes before</strong> the first broadcasted series of the gameweek (typically Friday 3:00 PM MYT).
            </p>
          </div>
        </div>

        {/* Rule 5: Role-Adjusted Scoring Table */}
        <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-cyan-300 font-black text-base">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>5. Role-Adjusted Scoring Matrix</span>
          </div>
          <p className="text-slate-400">
            Points are awarded on a per-map basis with weighting adjusted for role responsibilities:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <th className="p-2.5">Role</th>
                  <th className="p-2.5">Kill</th>
                  <th className="p-2.5">Assist</th>
                  <th className="p-2.5">Death</th>
                  <th className="p-2.5">Map Played</th>
                  <th className="p-2.5">Map Win</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr>
                  <td className="p-2.5 font-bold text-white font-sans">Jungle</td>
                  <td className="p-2.5 text-cyan-300">+1.00</td>
                  <td className="p-2.5 text-indigo-300">+0.50</td>
                  <td className="p-2.5 text-rose-400">-0.75</td>
                  <td className="p-2.5 text-slate-300">+1.00</td>
                  <td className="p-2.5 text-emerald-400">+1.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white font-sans">Gold</td>
                  <td className="p-2.5 text-cyan-300">+1.10</td>
                  <td className="p-2.5 text-indigo-300">+0.50</td>
                  <td className="p-2.5 text-rose-400">-0.75</td>
                  <td className="p-2.5 text-slate-300">+1.00</td>
                  <td className="p-2.5 text-emerald-400">+1.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white font-sans">Mid</td>
                  <td className="p-2.5 text-cyan-300">+1.00</td>
                  <td className="p-2.5 text-indigo-300">+0.50</td>
                  <td className="p-2.5 text-rose-400">-0.75</td>
                  <td className="p-2.5 text-slate-300">+1.00</td>
                  <td className="p-2.5 text-emerald-400">+1.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white font-sans">EXP</td>
                  <td className="p-2.5 text-cyan-300">+1.10</td>
                  <td className="p-2.5 text-indigo-300">+0.75</td>
                  <td className="p-2.5 text-rose-400">-0.50</td>
                  <td className="p-2.5 text-slate-300">+1.00</td>
                  <td className="p-2.5 text-emerald-400">+1.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white font-sans">Roam</td>
                  <td className="p-2.5 text-cyan-300">+1.00</td>
                  <td className="p-2.5 text-indigo-300">+0.60</td>
                  <td className="p-2.5 text-rose-400">-0.40</td>
                  <td className="p-2.5 text-slate-300">+1.00</td>
                  <td className="p-2.5 text-emerald-400">+1.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
