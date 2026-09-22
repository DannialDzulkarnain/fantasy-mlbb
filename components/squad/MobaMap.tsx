'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFantasy } from '@/context/FantasyContext';
import { Player, Role } from '@/lib/types';
import { MPL_TEAMS } from '@/lib/data';
import { 
  Crown, 
  ShieldAlert, 
  Sparkles, 
  Plus, 
  Info, 
  ArrowRightLeft, 
  Trash2, 
  Check, 
  ChevronRight,
  Eye,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Sliders
} from 'lucide-react';

interface RoleNodeConfig {
  role: Role;
  roleLabel: string;
  roleCode: 'exp' | 'jungle' | 'mid' | 'gold' | 'roam';
  letter: string;
  position: { x: number; y: number }; // Percentage coordinates matching the MLBB map
  desc: string;
}

// Exact tactical coordinates aligned with the official Mobile Legends Sanctum Island map
const ROLE_NODES: RoleNodeConfig[] = [
  {
    role: 'EXP',
    roleLabel: 'EXP Laner',
    roleCode: 'exp',
    letter: 'E',
    position: { x: 12.5, y: 63.8 }, // Blue 'E' circle on left EXP Lane
    desc: 'EXP Lane durable frontline & teamfight initiator',
  },
  {
    role: 'Jungle',
    roleLabel: 'Jungler',
    roleCode: 'jungle',
    letter: 'J',
    position: { x: 32.5, y: 44.0 }, // Blue Jungle buff core & river control
    desc: 'Jungle carry & objective smite specialist',
  },
  {
    role: 'Mid',
    roleLabel: 'Mid Laner',
    roleCode: 'mid',
    letter: 'M',
    position: { x: 46.5, y: 55.8 }, // Blue 'M' circle at central lane threshold
    desc: 'Mid lane high-burst magic damage & fast rotations',
  },
  {
    role: 'Roam',
    roleLabel: 'Roamer',
    roleCode: 'roam',
    letter: 'R',
    position: { x: 69.2, y: 66.8 }, // Blue 'R' circle at lower river bush near Turtle
    desc: 'Playmaker, vision scout & crowd-control tank/support',
  },
  {
    role: 'Gold',
    roleLabel: 'Gold Laner',
    roleCode: 'gold',
    letter: 'G',
    position: { x: 87.5, y: 84.5 }, // Blue 'G' circle on bottom Gold Lane
    desc: 'Gold Lane marksman late-game sustained physical DPS',
  },
];

// Rival (Red side) tactical markers to display full 5v5 map context
const RED_RIVAL_MARKERS = [
  { letter: 'E', role: 'EXP', x: 21.5, y: 9.8 },
  { letter: 'J', role: 'Jungle', x: 54.5, y: 23.5 },
  { letter: 'M', role: 'Mid', x: 58.0, y: 44.5 },
  { letter: 'G', role: 'Gold', x: 78.5, y: 14.5 },
];

interface MobaMapProps {
  onOpenTransfer?: (player: Player, role: Role) => void;
}

export default function MobaMap({ onOpenTransfer }: MobaMapProps) {
  const {
    squad,
    openMarketForRole,
    removePlayerFromRole,
    setCaptain,
    setViceCaptain,
    setSelectedPlayerDetail,
    squadValidation,
  } = useFantasy();

  const [activeSlotModal, setActiveSlotModal] = useState<Role | null>(null);
  const [customMapImage, setCustomMapImage] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('fantasy_custom_map_bg');
    } catch {
      return null;
    }
  });
  const [showRivalMarkers, setShowRivalMarkers] = useState<boolean>(true);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Sila pilih fail gambar (PNG/JPG/WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomMapImage(dataUrl);
        try {
          localStorage.setItem('fantasy_custom_map_bg', dataUrl);
        } catch {
          // Ignore quota errors
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const resetToDefaultMap = () => {
    setCustomMapImage(null);
    try {
      localStorage.removeItem('fantasy_custom_map_bg');
    } catch {
      // Ignore
    }
  };

  const handleNodeClick = (role: Role) => {
    const roleKey = role.toLowerCase() as 'exp' | 'jungle' | 'mid' | 'gold' | 'roam';
    const player = squad[roleKey];
    if (!player) {
      openMarketForRole(role);
    } else {
      setActiveSlotModal(role);
    }
  };

  const selectedSlotPlayer = activeSlotModal
    ? squad[activeSlotModal.toLowerCase() as 'exp' | 'jungle' | 'mid' | 'gold' | 'roam']
    : null;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#070b13] shadow-2xl select-none">
      {/* Hidden File Input for Custom Map Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
        accept="image/*"
        className="hidden"
      />

      {/* Tactical Map Header Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Map Title Tag */}
        <div className="bg-[#0b101c]/95 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-black tracking-wider text-cyan-300 uppercase">
            {customMapImage ? 'Custom MLBB Map' : 'Sanctum Island (Land of Dawn)'}
          </span>
          <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2 hidden sm:inline">
            E • J • M • R • G
          </span>
        </div>

        {/* Map Controls: Custom Image Upload & Rival Toggle */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {customMapImage ? (
            <button
              onClick={resetToDefaultMap}
              title="Reset ke map asal"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/80 text-[11px] font-semibold transition-all shadow-md"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Map</span>
            </button>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Muat naik fail gambar map (screenshot)"
              id="upload-custom-map-btn"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-[11px] font-semibold transition-all shadow-md"
            >
              <Upload className="w-3 h-3" />
              <span>Guna Gambar Map</span>
            </button>
          )}

          <button
            onClick={() => setShowRivalMarkers(!showRivalMarkers)}
            title="Papar/Sembunyi penanda musuh Red Side"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all border shadow-md ${
              showRivalMarkers
                ? 'bg-slate-900/90 text-rose-300 border-rose-900/60 hover:bg-slate-800'
                : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
            <span className="hidden sm:inline">Musuh: {showRivalMarkers ? 'Papar' : 'Sembunyi'}</span>
            <span className="sm:hidden">Red</span>
          </button>
        </div>
      </div>

      {/* THE MOBA BATTLEFIELD AREA (Aspect Ratio ~1:1 matching MLBB map screenshot) */}
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="relative w-full aspect-[592/672] max-h-[720px] mx-auto overflow-hidden bg-[#070e17] transition-all"
      >
        {/* Drag and drop overlay indicator */}
        {isDraggingOver && (
          <div className="absolute inset-0 z-40 bg-cyan-950/80 backdrop-blur-sm border-4 border-dashed border-cyan-400 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
            <Upload className="w-12 h-12 text-cyan-400 animate-bounce mb-3" />
            <div className="text-lg font-black text-white">Lepaskan Gambar Map Di Sini</div>
            <p className="text-xs text-cyan-200 mt-1">
              Gunakan fail tangkap layar (screenshot) peta Mobile Legends anda
            </p>
          </div>
        )}

        {/* MAP BACKGROUND: Either user's custom uploaded image OR high-detail vector replica */}
        {customMapImage ? (
          /* User's custom uploaded MLBB map image */
          <div className="absolute inset-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={customMapImage}
              alt="Mobile Legends Battlefield Map"
              className="w-full h-full object-fill select-none pointer-events-none"
            />
            {/* Subtle atmospheric vignette over the custom image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />
          </div>
        ) : (
          /* HIGH-FIDELITY VECTOR REPLICA OF THE EXACT LAND OF DAWN SANCTUM ISLAND MAP */
          <svg
            viewBox="0 0 1000 1135"
            className="w-full h-full object-fill select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* River water gradient */}
              <linearGradient id="riverWater" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0b3852" />
                <stop offset="40%" stopColor="#12567a" />
                <stop offset="70%" stopColor="#0e4b6d" />
                <stop offset="100%" stopColor="#082c42" />
              </linearGradient>

              {/* Lane cobblestone gradient */}
              <linearGradient id="laneCobble" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              {/* Blue Base Glow */}
              <radialGradient id="blueCrystalGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#0284c7" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
              </radialGradient>

              {/* Red Base Glow */}
              <radialGradient id="redCrystalGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#e11d48" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#9f1239" stopOpacity="0" />
              </radialGradient>

              {/* Lord Pit Glow */}
              <radialGradient id="lordAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#0891b2" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#083344" stopOpacity="0" />
              </radialGradient>

              {/* Turtle Pit Glow */}
              <radialGradient id="turtleAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#7e22ce" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base Terrain: Deep Forest Green & Dark Soil */}
            <rect width="1000" height="1135" fill="#13241a" />

            {/* Tactical Forest Clumps & Natural Ground Variations */}
            <path d="M 0 0 L 1000 0 L 1000 1135 L 0 1135 Z" fill="#1a3526" opacity="0.8" />
            <circle cx="280" cy="220" r="180" fill="#162e22" />
            <circle cx="720" cy="920" r="180" fill="#162e22" />
            <circle cx="240" cy="800" r="160" fill="#183325" />
            <circle cx="760" cy="340" r="160" fill="#183325" />

            {/* DIAGONAL RIVER (Cuts across top-left to bottom-right) */}
            <path
              d="M 140 180 
                 C 200 300, 240 380, 360 480 
                 C 450 560, 550 560, 650 660 
                 C 780 780, 840 900, 920 1060 
                 L 830 1110 
                 C 740 960, 670 850, 560 740 
                 C 480 660, 390 660, 280 560 
                 C 160 440, 100 320, 40 220 Z"
              fill="url(#riverWater)"
              stroke="#1e7399"
              strokeWidth="4"
            />

            {/* River Ripples */}
            <path
              d="M 80 230 Q 300 480 500 620 Q 700 760 880 1080"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="16 14"
              opacity="0.5"
            />

            {/* EPIC MONSTER PITS */}
            {/* 1. LORD PIT (Top River - Aquamarine Dragon Chamber) */}
            <g transform="translate(390, 420)">
              <circle cx="0" cy="0" r="62" fill="url(#lordAura)" />
              <path
                d="M -55 -25 C -45 -70, 45 -70, 55 -25 C 65 35, -65 35, -55 -25 Z"
                fill="#0e3a47"
                stroke="#14b8a6"
                strokeWidth="3.5"
              />
              {/* Lord Water Dragon Silhouette & Golden Horns */}
              <circle cx="0" cy="-10" r="28" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
              <polygon points="-12,-20 0,-38 12,-20" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="0" y="-6" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="900">LORD</text>
              <text x="0" y="8" fill="#5eead4" fontSize="8" textAnchor="middle" fontWeight="bold">SANCTUARY</text>
            </g>

            {/* 2. TURTLE PIT (Bottom River - Purple Crystalline Turtle Chamber) */}
            <g transform="translate(770, 560)">
              <circle cx="0" cy="0" r="58" fill="url(#turtleAura)" />
              <path
                d="M -50 -20 C -40 -60, 40 -60, 50 -20 C 60 30, -60 30, -50 -20 Z"
                fill="#2e1065"
                stroke="#c084fc"
                strokeWidth="3.5"
              />
              {/* Turtle Carapace Silhouette */}
              <ellipse cx="0" cy="-8" rx="26" ry="22" fill="#7e22ce" stroke="#e9d5ff" strokeWidth="2" />
              <text x="0" y="-5" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="900">TURTLE</text>
              <text x="0" y="7" fill="#d8b4fe" fontSize="8" textAnchor="middle" fontWeight="bold">PIT</text>
            </g>

            {/* THREE OFFICIAL LANES */}
            {/* Top Lane (EXP Lane): Blue Base (130, 970) -> Left Edge (80, 200) -> Top Edge (900, 100) */}
            <path
              d="M 140 960 L 80 720 L 80 200 C 80 130, 140 80, 220 70 L 780 70 L 900 120"
              fill="none"
              stroke="url(#laneCobble)"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 140 960 L 80 720 L 80 200 C 80 130, 140 80, 220 70 L 780 70 L 900 120"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="8"
              strokeDasharray="16 16"
              opacity="0.4"
            />

            {/* Middle Lane: Straight Diagonal from (140, 960) to (900, 120) */}
            <path
              d="M 140 960 L 900 120"
              fill="none"
              stroke="url(#laneCobble)"
              strokeWidth="44"
              strokeLinecap="round"
            />
            <path
              d="M 140 960 L 900 120"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="8"
              strokeDasharray="16 16"
              opacity="0.4"
            />

            {/* Bottom Lane (Gold Lane): Blue Base (140, 960) -> Bottom (840, 980) -> Right Edge (920, 200) -> Red Base */}
            <path
              d="M 140 960 L 780 1000 C 860 1000, 920 940, 920 860 L 920 300 L 900 120"
              fill="none"
              stroke="url(#laneCobble)"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 140 960 L 780 1000 C 860 1000, 920 940, 920 860 L 920 300 L 900 120"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="8"
              strokeDasharray="16 16"
              opacity="0.4"
            />

            {/* JUNGLE BUFF CAMPS & NEUTRAL CREEPS */}
            {/* Orange Buff 1 (Top Jungle near Lord - Molten Fiend) */}
            <g transform="translate(545, 260)">
              <circle cx="0" cy="0" r="28" fill="#451a03" stroke="#f97316" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="14" fill="#ea580c" />
              <polygon points="0,-10 8,6 -8,6" fill="#fbbf24" />
            </g>

            {/* Purple Buff 1 (Left Jungle - Demon Creeper) */}
            <g transform="translate(250, 610)">
              <circle cx="0" cy="0" r="26" fill="#3b0764" stroke="#a855f7" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="13" fill="#9333ea" />
            </g>

            {/* Blue Buff 2 (Lower Jungle - Scaled Lizard/Blue Beast) */}
            <g transform="translate(575, 870)">
              <circle cx="0" cy="0" r="26" fill="#082f49" stroke="#0284c7" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="13" fill="#0369a1" />
            </g>

            {/* Gold Crab / Lithowanderer Icons */}
            <circle cx="195" cy="400" r="14" fill="#713f12" stroke="#eab308" strokeWidth="2" />
            <circle cx="810" cy="670" r="14" fill="#713f12" stroke="#eab308" strokeWidth="2" />

            {/* 18 DEFENSIVE TURRETS (Crystal Spires) */}
            {/* BLUE TEAM TURRETS (9 Turrets) */}
            {/* Top Lane Blue Turrets */}
            <g transform="translate(80, 720)">
              <circle cx="0" cy="0" r="14" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#7dd3fc" />
            </g>
            <g transform="translate(80, 520)">
              <circle cx="0" cy="0" r="14" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#7dd3fc" />
            </g>
            <g transform="translate(160, 130)">
              <circle cx="0" cy="0" r="15" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="0,-9 7,7 -7,7" fill="#bae6fd" />
            </g>

            {/* Mid Lane Blue Turrets */}
            <g transform="translate(280, 830)">
              <circle cx="0" cy="0" r="14" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#7dd3fc" />
            </g>
            <g transform="translate(420, 680)">
              <circle cx="0" cy="0" r="14" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#7dd3fc" />
            </g>
            <g transform="translate(525, 560)">
              <circle cx="0" cy="0" r="15" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="0,-9 7,7 -7,7" fill="#bae6fd" />
            </g>

            {/* Bot Lane Blue Turrets */}
            <g transform="translate(345, 995)">
              <circle cx="0" cy="0" r="14" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#7dd3fc" />
            </g>
            <g transform="translate(525, 995)">
              <circle cx="0" cy="0" r="14" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#7dd3fc" />
            </g>
            <g transform="translate(800, 995)">
              <circle cx="0" cy="0" r="15" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="0,-9 7,7 -7,7" fill="#bae6fd" />
            </g>

            {/* RED TEAM TURRETS (9 Turrets) */}
            {/* Top Lane Red Turrets */}
            <g transform="translate(270, 70)">
              <circle cx="0" cy="0" r="15" fill="#9f1239" stroke="#fb7185" strokeWidth="3" />
              <polygon points="0,-9 7,7 -7,7" fill="#fecdd3" />
            </g>
            <g transform="translate(515, 70)">
              <circle cx="0" cy="0" r="14" fill="#9f1239" stroke="#fb7185" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#fecdd3" />
            </g>
            <g transform="translate(700, 70)">
              <circle cx="0" cy="0" r="14" fill="#9f1239" stroke="#fb7185" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#fecdd3" />
            </g>

            {/* Mid Lane Red Turrets */}
            <g transform="translate(710, 360)">
              <circle cx="0" cy="0" r="15" fill="#9f1239" stroke="#fb7185" strokeWidth="3" />
              <polygon points="0,-9 7,7 -7,7" fill="#fecdd3" />
            </g>
            <g transform="translate(795, 250)">
              <circle cx="0" cy="0" r="14" fill="#9f1239" stroke="#fb7185" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#fecdd3" />
            </g>
            <g transform="translate(870, 160)">
              <circle cx="0" cy="0" r="14" fill="#9f1239" stroke="#fb7185" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#fecdd3" />
            </g>

            {/* Bot Lane Red Turrets */}
            <g transform="translate(920, 760)">
              <circle cx="0" cy="0" r="15" fill="#9f1239" stroke="#fb7185" strokeWidth="3" />
              <polygon points="0,-9 7,7 -7,7" fill="#fecdd3" />
            </g>
            <g transform="translate(920, 540)">
              <circle cx="0" cy="0" r="14" fill="#9f1239" stroke="#fb7185" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#fecdd3" />
            </g>
            <g transform="translate(920, 310)">
              <circle cx="0" cy="0" r="14" fill="#9f1239" stroke="#fb7185" strokeWidth="3" />
              <polygon points="0,-8 6,6 -6,6" fill="#fecdd3" />
            </g>

            {/* BLUE ALLIED NEXUS BASE (Bottom-Left Corner) */}
            <g transform="translate(140, 960)">
              <circle cx="0" cy="0" r="110" fill="url(#blueCrystalGlow)" />
              {/* Dais & Ring */}
              <circle cx="0" cy="0" r="70" fill="#082f49" stroke="#38bdf8" strokeWidth="4" />
              <polygon points="-40,-18 0,-50 40,-18 28,34 -28,34" fill="#0284c7" stroke="#7dd3fc" strokeWidth="3" />
              <polygon points="-20,-8 0,-30 20,-8 14,18 -14,18" fill="#38bdf8" />
              <text x="0" y="52" fill="#7dd3fc" fontSize="13" textAnchor="middle" fontWeight="900" letterSpacing="2">
                BLUE BASE
              </text>
            </g>

            {/* RED RIVAL NEXUS BASE (Top-Right Corner) */}
            <g transform="translate(900, 110)">
              <circle cx="0" cy="0" r="110" fill="url(#redCrystalGlow)" />
              {/* Dais & Ring */}
              <circle cx="0" cy="0" r="70" fill="#4c0519" stroke="#fb7185" strokeWidth="4" />
              <polygon points="-40,-18 0,-50 40,-18 28,34 -28,34" fill="#e11d48" stroke="#fda4af" strokeWidth="3" />
              <polygon points="-20,-8 0,-30 20,-8 14,18 -14,18" fill="#fb7185" />
              <text x="0" y="52" fill="#fda4af" fontSize="13" textAnchor="middle" fontWeight="900" letterSpacing="2">
                RED BASE
              </text>
            </g>

            {/* TACTICAL RIVER BUSHES */}
            <ellipse cx="380" cy="510" rx="34" ry="16" fill="#14532d" stroke="#4ade80" strokeWidth="2" opacity="0.85" />
            <ellipse cx="610" cy="610" rx="34" ry="16" fill="#14532d" stroke="#4ade80" strokeWidth="2" opacity="0.85" />
            <ellipse cx="230" cy="300" rx="38" ry="18" fill="#14532d" stroke="#4ade80" strokeWidth="2" opacity="0.85" transform="rotate(-30 230 300)" />
            <ellipse cx="800" cy="820" rx="38" ry="18" fill="#14532d" stroke="#4ade80" strokeWidth="2" opacity="0.85" transform="rotate(-30 800 820)" />
          </svg>
        )}

        {/* OPPOSING RED SIDE TACTICAL CIRCULAR BADGES (E, J, M, G) */}
        {showRivalMarkers && RED_RIVAL_MARKERS.map((red) => (
          <div
            key={`red-${red.role}`}
            style={{
              left: `${red.x}%`,
              top: `${red.y}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-red-500 to-rose-700 border-2 border-white shadow-lg flex items-center justify-center font-black text-white text-[11px] sm:text-xs">
              {red.letter}
            </div>
            <span className="text-[9px] font-bold text-rose-300 drop-shadow mt-0.5 bg-slate-950/80 px-1 py-0.2 rounded hidden sm:inline">
              Rival {red.role}
            </span>
          </div>
        ))}

        {/* BLUE SIDE INTERACTIVE SLOTS ALIGNED WITH USER'S MAP REFERENCE */}
        {ROLE_NODES.map((node) => {
          const player = squad[node.roleCode];
          const isCaptain = player && squad.captainId === player.id;
          const isViceCaptain = player && squad.viceCaptainId === player.id;
          const team = player ? MPL_TEAMS.find((t) => t.id === player.teamId) : null;

          return (
            <div
              key={node.role}
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {player ? (
                /* FILLED PLAYER CARD WITH AUTHENTIC ROLE LETTER ACCENT */
                <button
                  onClick={() => handleNodeClick(node.role)}
                  id={`moba-slot-${node.role.toLowerCase()}`}
                  className={`relative flex flex-col items-center p-1.5 sm:p-2 rounded-xl backdrop-blur-md shadow-2xl transition-all border ${
                    isCaptain
                      ? 'bg-gradient-to-b from-amber-950/95 via-slate-900/95 to-slate-950 border-amber-400 ring-2 ring-amber-400/50 shadow-amber-500/40'
                      : isViceCaptain
                      ? 'bg-gradient-to-b from-indigo-950/95 via-slate-900/95 to-slate-950 border-cyan-400 ring-2 ring-cyan-400/40 shadow-cyan-500/30'
                      : 'bg-[#0c1220]/95 border-slate-700/90 hover:border-cyan-500/70 shadow-slate-950/60'
                  }`}
                >
                  {/* Captain / Vice Captain Badge */}
                  {isCaptain && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-gradient-to-r from-amber-500 to-yellow-300 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider animate-bounce">
                      <Crown className="w-2.5 h-2.5 fill-slate-950" />
                      <span>CAP (2X)</span>
                    </div>
                  )}
                  {isViceCaptain && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                      <span>VC (SUB)</span>
                    </div>
                  )}

                  {/* Top Bar: Official Map Badge Circle + Team tag */}
                  <div className="flex items-center gap-1.5 mb-1 w-full justify-between">
                    <div className="w-5 h-5 rounded-full bg-blue-600 border border-white flex items-center justify-center text-white font-black text-[10px] shadow-sm">
                      {node.letter}
                    </div>
                    {team && (
                      <span
                        className="text-[9px] font-black px-1.5 py-0.2 rounded text-white shadow-sm"
                        style={{ backgroundColor: team.color }}
                      >
                        {team.code}
                      </span>
                    )}
                  </div>

                  {/* Player Nickname */}
                  <div className="font-black text-xs sm:text-sm text-slate-100 tracking-tight max-w-[85px] sm:max-w-[110px] truncate">
                    {player.nickname}
                  </div>

                  {/* Price & Form Pill */}
                  <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-mono">
                    <span className="font-bold text-emerald-400">{player.price.toFixed(1)}M</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-cyan-300 font-semibold">{player.recentForm.toFixed(1)}★</span>
                  </div>

                  {/* Visual affordance dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shadow-sm shadow-cyan-400" />
                </button>
              ) : (
                /* EMPTY ROLE NODE: Matches the Blue Circular Badge with Plus */
                <button
                  onClick={() => handleNodeClick(node.role)}
                  id={`moba-slot-empty-${node.role.toLowerCase()}`}
                  className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#0b1220]/90 backdrop-blur-md border-2 border-dashed border-cyan-400/70 hover:border-cyan-300 hover:bg-cyan-950/60 transition-all group shadow-xl shadow-cyan-950/60 cursor-pointer min-w-[62px] sm:min-w-[76px]"
                >
                  {/* Official Blue Circle Badge with Letter */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 border-2 border-white shadow-md flex items-center justify-center font-black text-white text-xs sm:text-sm group-hover:scale-110 transition-transform">
                    {node.letter}
                  </div>
                  <span className="text-[10px] font-black text-cyan-300 mt-1 tracking-wider uppercase whitespace-nowrap">
                    + {node.role}
                  </span>
                  <span className="text-[8px] text-slate-400">Pilih Pemain</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Map Footer Summary Bar */}
      <div className="bg-[#0b101c] border-t border-slate-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Kesebelasan Pilihan:</span>
          <span className="font-mono font-bold text-slate-200">
            {squadValidation.playersCount} / 5 Slot (E • J • M • R • G)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-white" />
            <span className="text-slate-400 text-[11px]">Pasukan Anda (Blue)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-white" />
            <span className="text-slate-400 text-[11px]">Musuh (Red)</span>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 ml-1"
          >
            {customMapImage ? 'Tukar Gambar Map' : 'Upload image.png'}
          </button>
        </div>
      </div>

      {/* QUICK SLOT ACTIONS MODAL / SHEET */}
      {activeSlotModal && selectedSlotPlayer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {selectedSlotPlayer.role}
                </span>
                <span className="text-base font-black text-slate-100">
                  {selectedSlotPlayer.nickname}
                </span>
              </div>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {selectedSlotPlayer.price.toFixed(1)}M
              </span>
            </div>

            {/* Quick Stats Pill */}
            <div className="grid grid-cols-3 gap-2 text-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="text-slate-400 text-[10px]">Recent Form</div>
                <div className="font-bold text-cyan-300">{selectedSlotPlayer.recentForm.toFixed(1)}★</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px]">Projected</div>
                <div className="font-bold text-amber-300">{selectedSlotPlayer.projectedPoints.toFixed(1)} pts</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px]">Selected By</div>
                <div className="font-bold text-slate-200">{selectedSlotPlayer.ownershipPercent.toFixed(1)}%</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {/* Set Captain */}
              <button
                onClick={() => {
                  setCaptain(selectedSlotPlayer.id);
                  setActiveSlotModal(null);
                }}
                disabled={squad.captainId === selectedSlotPlayer.id}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all border ${
                  squad.captainId === selectedSlotPlayer.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>{squad.captainId === selectedSlotPlayer.id ? 'Current Captain (2x Pts)' : 'Set as Captain (2x Points)'}</span>
                </div>
                {squad.captainId === selectedSlotPlayer.id && <Check className="w-4 h-4 text-amber-400" />}
              </button>

              {/* Set Vice Captain */}
              <button
                onClick={() => {
                  setViceCaptain(selectedSlotPlayer.id);
                  setActiveSlotModal(null);
                }}
                disabled={squad.viceCaptainId === selectedSlotPlayer.id || squad.captainId === selectedSlotPlayer.id}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all border ${
                  squad.viceCaptainId === selectedSlotPlayer.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  <span>{squad.viceCaptainId === selectedSlotPlayer.id ? 'Current Vice Captain' : 'Set as Vice Captain'}</span>
                </div>
                {squad.viceCaptainId === selectedSlotPlayer.id && <Check className="w-4 h-4 text-cyan-400" />}
              </button>

              {/* View Pro Build & Details */}
              <button
                onClick={() => {
                  setSelectedPlayerDetail(selectedSlotPlayer);
                  setActiveSlotModal(null);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span>View Hero Pool & Pro Build</span>
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-400" />
              </button>

              {/* Replace / Transfer Player */}
              <button
                onClick={() => {
                  if (onOpenTransfer && selectedSlotPlayer && activeSlotModal) {
                    onOpenTransfer(selectedSlotPlayer, activeSlotModal);
                  } else {
                    openMarketForRole(activeSlotModal);
                  }
                  setActiveSlotModal(null);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-700/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                  <span>Transfer / Sell Player (+{selectedSlotPlayer.price.toFixed(1)}M)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>

              {/* Remove Player */}
              <button
                onClick={() => {
                  removePlayerFromRole(activeSlotModal);
                  setActiveSlotModal(null);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 border border-rose-800/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Remove from Squad</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setActiveSlotModal(null)}
              className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
