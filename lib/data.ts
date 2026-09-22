import { MPLTeam, Player, Fixture, PrivateLeague, ScoringWeights } from './types';

export const MPL_TEAMS: MPLTeam[] = [
  {
    id: 'srg',
    name: 'Selangor Red Giants',
    code: 'SRG',
    color: '#EF4444',
    secondaryColor: '#991B1B',
    rank: 1,
    form: ['W', 'W', 'W', 'W', 'W'],
    winRate: 92,
    rival: 'HomeBois',
    description: 'Reigning MPL MY & MSC Champions. Dominant macro and early snowball.'
  },
  {
    id: 'hb',
    name: 'HomeBois',
    code: 'HB',
    color: '#F59E0B',
    secondaryColor: '#B45309',
    rank: 2,
    form: ['W', 'W', 'L', 'W', 'W'],
    winRate: 80,
    rival: 'Selangor Red Giants',
    description: 'High-octane aggression led by veteran leadership and deep hero pools.'
  },
  {
    id: 'tdk',
    name: 'Todak',
    code: 'TDK',
    color: '#3B82F6',
    secondaryColor: '#1D4ED8',
    rank: 3,
    form: ['W', 'L', 'W', 'W', 'L'],
    winRate: 68,
    rival: 'Team Secret',
    description: 'The historic kings of Malaysian MLBB with iconic off-meta innovations.'
  },
  {
    id: 'ts',
    name: 'Team Secret',
    code: 'TS',
    color: '#10B981',
    secondaryColor: '#047857',
    rank: 4,
    form: ['L', 'W', 'W', 'L', 'W'],
    winRate: 62,
    rival: 'Todak',
    description: 'Methodical objective setup with explosive late-game teamfight scaling.'
  },
  {
    id: 'rsg',
    name: 'RSG Malaysia',
    code: 'RSG',
    color: '#8B5CF6',
    secondaryColor: '#6D28D9',
    rank: 5,
    form: ['W', 'L', 'L', 'W', 'W'],
    winRate: 58,
    rival: 'Selangor Red Giants',
    description: 'Disciplined counter-engage specialists with rock-solid turtle control.'
  },
  {
    id: 'mv',
    name: 'Monster Vicious',
    code: 'MV',
    color: '#EC4899',
    secondaryColor: '#BE185D',
    rank: 6,
    form: ['L', 'W', 'L', 'W', 'L'],
    winRate: 50,
    rival: 'Team HAQ',
    description: 'Fearless rookie squad known for volatile drafts and clutch comebacks.'
  },
  {
    id: 'haq',
    name: 'Team HAQ',
    code: 'HAQ',
    color: '#06B6D4',
    secondaryColor: '#0E7490',
    rank: 7,
    form: ['L', 'L', 'W', 'L', 'W'],
    winRate: 45,
    rival: 'Monster Vicious',
    description: 'Former champions hungry to reclaim glory with revamped roster synergy.'
  },
  {
    id: 'jpn',
    name: 'JP NINJA',
    code: 'JPN',
    color: '#F97316',
    secondaryColor: '#C2410C',
    rank: 8,
    form: ['L', 'L', 'L', 'W', 'L'],
    winRate: 35,
    rival: 'Todak',
    description: 'Rapid skirmishers looking to disrupt the traditional top-table hierarchy.'
  }
];

export const SAMPLE_PLAYERS: Player[] = [
  // --- EXP LANERS ---
  {
    id: 'p-kramm',
    nickname: 'kramM',
    realName: 'Mark Rusiana',
    teamId: 'srg',
    role: 'EXP',
    price: 8.4,
    previousPrice: 8.2,
    ownershipPercent: 44.8,
    projectedPoints: 26.8,
    recentForm: 8.8,
    totalPoints: 172.4,
    kda: { kills: 3.4, deaths: 1.8, assists: 7.2, ratio: 5.89 },
    killParticipation: 73.5,
    recentHeroPool: [
      { heroName: 'Yu Zhong', games: 4, wins: 4, winRate: 100, kda: '6.2/1.5/8.0', icon: '🐲' },
      { heroName: 'Arlott', games: 3, wins: 2, winRate: 67, kda: '4.0/2.0/6.3', icon: '⚔️' },
      { heroName: 'Terizla', games: 2, wins: 2, winRate: 100, kda: '2.0/1.0/9.5', icon: '🔨' }
    ],
    recentProBuild: {
      hero: 'Yu Zhong',
      heroIcon: '🐲',
      battleSpell: 'Petrify',
      battleSpellIcon: '🗿',
      emblem: 'Fighter (Festival of Blood / Brave Smite)',
      emblemTalents: ['Thrill', 'Festival of Blood', 'Brave Smite'],
      finalBuild: [
        { id: 'i1', name: 'Warrior Boots', category: 'Movement', icon: '🥾', description: '+40 Movement, +22 Physical Defense' },
        { id: 'i2', name: 'War Axe', category: 'Attack', icon: '🪓', description: '+25 Phys ATK, +550 HP, +10% CDR' },
        { id: 'i3', name: 'Hunter Strike', category: 'Attack', icon: '🗡️', description: '+80 Phys ATK, +10% CDR, +15 Phys PEN' },
        { id: 'i4', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: '+500 Mana, +70 Phys DEF, -50% Anti-heal' },
        { id: 'i5', name: 'Athena Shield', category: 'Defense', icon: '🛡️', description: '+900 HP, +62 Magic DEF, Magic Burst shield' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: '+800 HP, +20 Phys DEF, Resurrection' }
      ],
      mostUsedBuild: [
        { id: 'i1', name: 'Warrior Boots', category: 'Movement', icon: '🥾', description: 'Armor boots' },
        { id: 'i2', name: 'War Axe', category: 'Attack', icon: '🪓', description: 'Sustained fighter core' },
        { id: 'i3', name: 'Brute Force Breastplate', category: 'Defense', icon: '🎽', description: 'Hybrid defense & CDR' }
      ],
      notes: 'Sample Pro Build recorded from MPL MY Regular Season Week 3 series.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 7, assists: 14, deaths: 3, bonusPoints: 2 },
      2: { mapsPlayed: 3, wins: 2, kills: 11, assists: 21, deaths: 5, bonusPoints: 3 },
      3: { mapsPlayed: 2, wins: 2, kills: 8, assists: 16, deaths: 2, bonusPoints: 4 },
      4: { mapsPlayed: 2, wins: 2, kills: 6, assists: 15, deaths: 3, bonusPoints: 2 }
    }
  },
  {
    id: 'p-sepat',
    nickname: 'Sepat',
    realName: 'Muhammad Danial',
    teamId: 'hb',
    role: 'EXP',
    price: 7.8,
    previousPrice: 7.9,
    ownershipPercent: 28.5,
    projectedPoints: 22.4,
    recentForm: 7.6,
    totalPoints: 148.0,
    kda: { kills: 2.8, deaths: 2.4, assists: 6.8, ratio: 4.0 },
    killParticipation: 68.0,
    recentHeroPool: [
      { heroName: 'Paquito', games: 3, wins: 2, winRate: 67, kda: '5.0/2.0/5.0', icon: '🥊' },
      { heroName: 'Benedetta', games: 2, wins: 2, winRate: 100, kda: '4.5/1.5/7.0', icon: '🗡️' },
      { heroName: 'Cici', games: 2, wins: 1, winRate: 50, kda: '2.5/2.5/6.0', icon: '🪀' }
    ],
    recentProBuild: {
      hero: 'Paquito',
      heroIcon: '🥊',
      battleSpell: 'Flicker',
      battleSpellIcon: '⚡',
      emblem: 'Assassin (Fatal / Master Assassin / Lethal Ignition)',
      emblemTalents: ['Rupture', 'Master Assassin', 'Lethal Ignition'],
      finalBuild: [
        { id: 'i1', name: 'Tough Boots', category: 'Movement', icon: '🥾', description: '+40 Move, +22 Magic DEF, -30% CC' },
        { id: 'i2', name: 'Hunter Strike', category: 'Attack', icon: '🗡️', description: '+80 Phys ATK, +15 Phys PEN' },
        { id: 'i3', name: 'Blade of Despair', category: 'Attack', icon: '⚔️', description: '+160 Phys ATK, +5% Move Speed' },
        { id: 'i4', name: 'Malefic Roar', category: 'Attack', icon: '🔫', description: '+60 Phys ATK, Armor penetration' },
        { id: 'i5', name: 'Brute Force Breastplate', category: 'Defense', icon: '🎽', description: '+600 HP, +23 DEF, CC reduction' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Resurrect with 16% HP' }
      ],
      mostUsedBuild: [
        { id: 'i1', name: 'Tough Boots', category: 'Movement', icon: '🥾', description: 'Boots' },
        { id: 'i2', name: 'Hunter Strike', category: 'Attack', icon: '🗡️', description: 'Burst item' }
      ],
      notes: 'Sample Pro Build: Aggressive flank initiator setup.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 6, assists: 11, deaths: 4 },
      2: { mapsPlayed: 3, wins: 1, kills: 8, assists: 14, deaths: 8 },
      3: { mapsPlayed: 2, wins: 2, kills: 7, assists: 13, deaths: 3 },
      4: { mapsPlayed: 2, wins: 2, kills: 5, assists: 12, deaths: 4 }
    }
  },
  {
    id: 'p-momo',
    nickname: 'Momo',
    realName: 'Danial Fuad',
    teamId: 'tdk',
    role: 'EXP',
    price: 7.2,
    previousPrice: 7.4,
    ownershipPercent: 19.1,
    projectedPoints: 19.5,
    recentForm: 7.1,
    totalPoints: 132.8,
    kda: { kills: 2.2, deaths: 2.1, assists: 6.4, ratio: 4.1 },
    killParticipation: 64.2,
    recentHeroPool: [
      { heroName: 'Uranus', games: 3, wins: 2, winRate: 67, kda: '1.5/2.0/8.0', icon: '🪐' },
      { heroName: 'Edith', games: 2, wins: 1, winRate: 50, kda: '3.0/2.0/5.5', icon: '🤖' }
    ],
    recentProBuild: {
      hero: 'Uranus',
      heroIcon: '🪐',
      battleSpell: 'Purify',
      battleSpellIcon: '✨',
      emblem: 'Tank (Firmness / Tenacity)',
      emblemTalents: ['Vitality', 'Tenacity', 'Brave Smite'],
      finalBuild: [
        { id: 'i1', name: 'Warrior Boots', category: 'Movement', icon: '🥾', description: 'Physical defense boots' },
        { id: 'i2', name: 'Flask of Oasis', category: 'Magic', icon: '🏺', description: 'Heal amplifier' },
        { id: 'i3', name: 'Oracle', category: 'Defense', icon: '🔮', description: 'Shield & HP regen boost' },
        { id: 'i4', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Anti-heal aura' },
        { id: 'i5', name: 'Radiant Armor', category: 'Defense', icon: '🛡️', description: 'Continuous magic damage counter' },
        { id: 'i6', name: 'Immortal', category: 'Defense', icon: '✨', description: 'Second chance' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Oracle', category: 'Defense', icon: '🔮', description: 'Core regen' }],
      notes: 'Sample Pro Build: Pure frontline space creator.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 3, assists: 12, deaths: 4 },
      2: { mapsPlayed: 2, wins: 2, kills: 5, assists: 14, deaths: 3 },
      3: { mapsPlayed: 3, wins: 1, kills: 6, assists: 15, deaths: 7 },
      4: { mapsPlayed: 2, wins: 1, kills: 4, assists: 11, deaths: 5 }
    }
  },
  {
    id: 'p-garyy',
    nickname: 'Garyy',
    realName: 'Muhammad Syafwan',
    teamId: 'ts',
    role: 'EXP',
    price: 6.8,
    previousPrice: 6.8,
    ownershipPercent: 12.0,
    projectedPoints: 18.0,
    recentForm: 6.9,
    totalPoints: 120.5,
    kda: { kills: 2.1, deaths: 2.6, assists: 5.5, ratio: 2.92 },
    killParticipation: 61.0,
    recentHeroPool: [
      { heroName: 'Gloo', games: 2, wins: 2, winRate: 100, kda: '1.0/1.5/9.0', icon: '🫧' },
      { heroName: 'Ruby', games: 2, wins: 1, winRate: 50, kda: '2.5/2.5/6.0', icon: '🪓' }
    ],
    recentProBuild: {
      hero: 'Ruby',
      heroIcon: '🪓',
      battleSpell: 'Flicker',
      battleSpellIcon: '⚡',
      emblem: 'Fighter',
      emblemTalents: ['Thrill', 'Festival of Blood', 'Concussive Blast'],
      finalBuild: [
        { id: 'i1', name: 'Tough Boots', category: 'Movement', icon: '🥾', description: 'CC reduction' },
        { id: 'i2', name: 'War Axe', category: 'Attack', icon: '🪓', description: 'True damage & heal' },
        { id: 'i3', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Attack speed slow' },
        { id: 'i4', name: 'Queen Wings', category: 'Defense', icon: '🪽', description: 'Damage reduction low HP' },
        { id: 'i5', name: 'Athena Shield', category: 'Defense', icon: '🛡️', description: 'Magic protection' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'War Axe', category: 'Attack', icon: '🪓', description: 'Essential core' }],
      notes: 'Sample Pro Build: Utility CC & teamfight disruption.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 4, assists: 9, deaths: 5 },
      2: { mapsPlayed: 2, wins: 1, kills: 3, assists: 11, deaths: 6 },
      3: { mapsPlayed: 2, wins: 2, kills: 5, assists: 12, deaths: 3 },
      4: { mapsPlayed: 2, wins: 1, kills: 3, assists: 10, deaths: 4 }
    }
  },
  {
    id: 'p-kaizer',
    nickname: 'Kaizer',
    realName: 'Amirul Asyraf',
    teamId: 'mv',
    role: 'EXP',
    price: 6.2,
    previousPrice: 6.0,
    ownershipPercent: 8.4,
    projectedPoints: 17.2,
    recentForm: 6.8,
    totalPoints: 112.0,
    kda: { kills: 2.0, deaths: 3.0, assists: 5.0, ratio: 2.33 },
    killParticipation: 58.5,
    recentHeroPool: [{ heroName: 'Dyrroth', games: 3, wins: 2, winRate: 67, kda: '3.5/2.5/4.0', icon: '👹' }],
    recentProBuild: {
      hero: 'Dyrroth',
      heroIcon: '👹',
      battleSpell: 'Vengeance',
      battleSpellIcon: '🔥',
      emblem: 'Assassin',
      emblemTalents: ['Rupture', 'Master Assassin', 'Quantum Charge'],
      finalBuild: [
        { id: 'i1', name: 'Warrior Boots', category: 'Movement', icon: '🥾', description: 'DEF' },
        { id: 'i2', name: 'Hunter Strike', category: 'Attack', icon: '🗡️', description: 'Penetration' },
        { id: 'i3', name: 'Blade of Despair', category: 'Attack', icon: '⚔️', description: 'Power' },
        { id: 'i4', name: 'Brute Force', category: 'Defense', icon: '🎽', description: 'Stamina' },
        { id: 'i5', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Anti-heal' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Hunter Strike', category: 'Attack', icon: '🗡️', description: 'Core' }],
      notes: 'Sample Pro Build: Early lane bully.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 0, kills: 2, assists: 6, deaths: 7 },
      2: { mapsPlayed: 3, wins: 2, kills: 7, assists: 13, deaths: 6 },
      3: { mapsPlayed: 2, wins: 1, kills: 4, assists: 9, deaths: 5 },
      4: { mapsPlayed: 2, wins: 1, kills: 3, assists: 8, deaths: 5 }
    }
  },

  // --- JUNGLERS ---
  {
    id: 'p-sekysss',
    nickname: 'Sekysss',
    realName: 'Muhammad Haqqullah',
    teamId: 'srg',
    role: 'Jungle',
    price: 9.6,
    previousPrice: 9.3,
    ownershipPercent: 62.4,
    projectedPoints: 34.5,
    recentForm: 9.6,
    totalPoints: 218.6,
    kda: { kills: 7.2, deaths: 1.4, assists: 5.6, ratio: 9.14 },
    killParticipation: 81.2,
    recentHeroPool: [
      { heroName: 'Joy', games: 4, wins: 4, winRate: 100, kda: '8.5/1.0/6.0', icon: '⚡' },
      { heroName: 'Fanny', games: 3, wins: 3, winRate: 100, kda: '9.0/1.2/4.5', icon: '🦅' },
      { heroName: 'Nolan', games: 2, wins: 2, winRate: 100, kda: '6.5/1.5/5.0', icon: '🌌' }
    ],
    recentProBuild: {
      hero: 'Joy',
      heroIcon: '⚡',
      battleSpell: 'Ice Retribution',
      battleSpellIcon: '❄️',
      emblem: 'Assassin (Agility / Seasoned Hunter / Lethal Ignition)',
      emblemTalents: ['Agility', 'Seasoned Hunter', 'Lethal Ignition'],
      finalBuild: [
        { id: 'i1', name: 'Arcane Boots (Ice Retri)', category: 'Movement', icon: '🥾', description: '+40 Move, +10 Magic PEN, Steals move speed' },
        { id: 'i2', name: 'Starlium Scythe', category: 'Magic', icon: '🌙', description: '+70 Magic Power, +10% CDR, True damage strike' },
        { id: 'i3', name: 'Holy Crystal', category: 'Magic', icon: '💎', description: '+100 Magic Power, +21-35% scaling Magic Power' },
        { id: 'i4', name: 'Divine Glaive', category: 'Magic', icon: '🔱', description: '+65 Magic Power, +40% Magic PEN vs high DEF' },
        { id: 'i5', name: 'Blood Wings', category: 'Magic', icon: '🪽', description: '+175 Magic Power, massive HP shield' },
        { id: 'i6', name: 'Winter Crown', category: 'Defense', icon: '👑', description: '+60 Magic Power, +25 DEF, 2s Frozen invulnerability' }
      ],
      mostUsedBuild: [
        { id: 'i1', name: 'Starlium Scythe', category: 'Magic', icon: '🌙', description: 'Core spellblade' },
        { id: 'i2', name: 'Holy Crystal', category: 'Magic', icon: '💎', description: 'Huge burst spike' },
        { id: 'i3', name: 'Winter Crown', category: 'Defense', icon: '👑', description: 'Clutch dive out' }
      ],
      notes: 'Sample Pro Build: Signature undefeated Joy build seen in Grand Finals.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 14, assists: 10, deaths: 2, bonusPoints: 6 },
      2: { mapsPlayed: 3, wins: 3, kills: 23, assists: 16, deaths: 4, bonusPoints: 8 },
      3: { mapsPlayed: 2, wins: 2, kills: 16, assists: 11, deaths: 2, bonusPoints: 6 },
      4: { mapsPlayed: 2, wins: 2, kills: 15, assists: 12, deaths: 3, bonusPoints: 6 }
    }
  },
  {
    id: 'p-chibi',
    nickname: 'Chibi',
    realName: 'Muhammad Nazhan',
    teamId: 'hb',
    role: 'Jungle',
    price: 8.6,
    previousPrice: 8.7,
    ownershipPercent: 32.1,
    projectedPoints: 26.2,
    recentForm: 8.2,
    totalPoints: 176.4,
    kda: { kills: 5.4, deaths: 2.2, assists: 6.0, ratio: 5.18 },
    killParticipation: 75.0,
    recentHeroPool: [
      { heroName: 'Baxia', games: 3, wins: 2, winRate: 67, kda: '3.0/1.5/9.0', icon: '🐢' },
      { heroName: 'Fredrinn', games: 2, wins: 2, winRate: 100, kda: '4.0/2.0/8.0', icon: '🗡️' },
      { heroName: 'Martis', games: 2, wins: 1, winRate: 50, kda: '7.0/3.0/4.0', icon: '⚔️' }
    ],
    recentProBuild: {
      hero: 'Baxia',
      heroIcon: '🐢',
      battleSpell: 'Flame Retribution',
      battleSpellIcon: '🔥',
      emblem: 'Tank (Vitality / Seasoned Hunter / Concussive Blast)',
      emblemTalents: ['Vitality', 'Seasoned Hunter', 'Concussive Blast'],
      finalBuild: [
        { id: 'i1', name: 'Tough Boots', category: 'Movement', icon: '🥾', description: 'CC reduction' },
        { id: 'i2', name: 'Cursed Helmet', category: 'Defense', icon: '🔥', description: '+1200 HP, AoE burning aura for fast jungle' },
        { id: 'i3', name: 'Guardian Helmet', category: 'Defense', icon: '⛑️', description: '+1550 HP, out of combat HP regen' },
        { id: 'i4', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Anti-heal and slow' },
        { id: 'i5', name: 'Radiant Armor', category: 'Defense', icon: '🛡️', description: 'Magic damage stacking defense' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Second life' }
      ],
      mostUsedBuild: [
        { id: 'i1', name: 'Cursed Helmet', category: 'Defense', icon: '🔥', description: 'Fast wave clear' },
        { id: 'i2', name: 'Guardian Helmet', category: 'Defense', icon: '⛑️', description: 'Roaming sustain' }
      ],
      notes: 'Sample Pro Build: Objective-securing heavy tank jungler.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 9, assists: 14, deaths: 3 },
      2: { mapsPlayed: 3, wins: 2, kills: 14, assists: 19, deaths: 7 },
      3: { mapsPlayed: 2, wins: 2, kills: 10, assists: 12, deaths: 4 },
      4: { mapsPlayed: 2, wins: 2, kills: 9, assists: 13, deaths: 3 }
    }
  },
  {
    id: 'p-cliveee',
    nickname: 'Cliveee',
    realName: 'Clive Andrew',
    teamId: 'ts',
    role: 'Jungle',
    price: 7.9,
    previousPrice: 7.8,
    ownershipPercent: 18.2,
    projectedPoints: 23.5,
    recentForm: 7.8,
    totalPoints: 154.2,
    kda: { kills: 5.0, deaths: 2.4, assists: 5.2, ratio: 4.25 },
    killParticipation: 71.4,
    recentHeroPool: [
      { heroName: 'Hayabusa', games: 3, wins: 2, winRate: 67, kda: '6.5/2.0/4.0', icon: '🥷' },
      { heroName: 'Ling', games: 2, wins: 1, winRate: 50, kda: '5.0/3.0/4.5', icon: '🦅' }
    ],
    recentProBuild: {
      hero: 'Hayabusa',
      heroIcon: '🥷',
      battleSpell: 'Ice Retribution',
      battleSpellIcon: '❄️',
      emblem: 'Assassin',
      emblemTalents: ['Rupture', 'Master Assassin', 'Killing Spree'],
      finalBuild: [
        { id: 'i1', name: 'Magic Shoes', category: 'Movement', icon: '🥾', description: '+10% CDR' },
        { id: 'i2', name: 'Hunter Strike', category: 'Attack', icon: '🗡️', description: 'CDR & Penetration' },
        { id: 'i3', name: 'Blade of Despair', category: 'Attack', icon: '⚔️', description: 'High base damage' },
        { id: 'i4', name: 'Malefic Roar', category: 'Attack', icon: '🔫', description: 'Tank shredding' },
        { id: 'i5', name: 'Rose Gold Meteor', category: 'Attack', icon: '🌹', description: 'Shield & Lifesteal' },
        { id: 'i6', name: 'Blade of the Heptaseas', category: 'Attack', icon: '🔱', description: 'First hit burst' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Hunter Strike', category: 'Attack', icon: '🗡️', description: 'Core CDR' }],
      notes: 'Sample Pro Build: Assassin shadow reset specialist.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 8, assists: 9, deaths: 5 },
      2: { mapsPlayed: 2, wins: 2, kills: 13, assists: 11, deaths: 3 },
      3: { mapsPlayed: 2, wins: 1, kills: 7, assists: 8, deaths: 6 },
      4: { mapsPlayed: 2, wins: 2, kills: 11, assists: 10, deaths: 4 }
    }
  },
  {
    id: 'p-flint',
    nickname: 'Flint',
    realName: 'Nur Ahmad',
    teamId: 'tdk',
    role: 'Jungle',
    price: 7.3,
    previousPrice: 7.5,
    ownershipPercent: 14.3,
    projectedPoints: 20.8,
    recentForm: 7.0,
    totalPoints: 138.0,
    kda: { kills: 4.2, deaths: 2.8, assists: 5.5, ratio: 3.46 },
    killParticipation: 67.8,
    recentHeroPool: [{ heroName: 'Akai', games: 3, wins: 2, winRate: 67, kda: '2.5/2.0/8.0', icon: '🐼' }],
    recentProBuild: {
      hero: 'Akai',
      heroIcon: '🐼',
      battleSpell: 'Flame Retribution',
      battleSpellIcon: '🔥',
      emblem: 'Tank',
      emblemTalents: ['Firmness', 'Seasoned Hunter', 'Concussive Blast'],
      finalBuild: [
        { id: 'i1', name: 'Tough Boots', category: 'Movement', icon: '🥾', description: 'Boots' },
        { id: 'i2', name: 'Cursed Helmet', category: 'Defense', icon: '🔥', description: 'Burn damage' },
        { id: 'i3', name: 'Guardian Helmet', category: 'Defense', icon: '⛑️', description: 'Sustain' },
        { id: 'i4', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Debuff' },
        { id: 'i5', name: 'Blade Armor', category: 'Defense', icon: '🛡️', description: 'Reflect damage' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Cursed Helmet', category: 'Defense', icon: '🔥', description: 'Core' }],
      notes: 'Sample Pro Build: Heavy pin CC jungler.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 6, assists: 12, deaths: 5 },
      2: { mapsPlayed: 2, wins: 2, kills: 9, assists: 13, deaths: 4 },
      3: { mapsPlayed: 3, wins: 1, kills: 8, assists: 15, deaths: 9 },
      4: { mapsPlayed: 2, wins: 1, kills: 5, assists: 10, deaths: 6 }
    }
  },
  {
    id: 'p-reyyy',
    nickname: 'Reyyy',
    realName: 'Raziq Reyhan',
    teamId: 'mv',
    role: 'Jungle',
    price: 6.4,
    previousPrice: 6.2,
    ownershipPercent: 9.0,
    projectedPoints: 18.2,
    recentForm: 7.2,
    totalPoints: 119.5,
    kda: { kills: 4.8, deaths: 3.2, assists: 4.5, ratio: 2.9 },
    killParticipation: 69.2,
    recentHeroPool: [{ heroName: 'Ling', games: 2, wins: 1, winRate: 50, kda: '6.0/3.5/4.0', icon: '🦅' }],
    recentProBuild: {
      hero: 'Ling',
      heroIcon: '🦅',
      battleSpell: 'Ice Retribution',
      battleSpellIcon: '❄️',
      emblem: 'Assassin',
      emblemTalents: ['Fatal', 'Master Assassin', 'Killing Spree'],
      finalBuild: [
        { id: 'i1', name: 'Berserker Fury', category: 'Attack', icon: '🪓', description: 'Crit damage' },
        { id: 'i2', name: 'Endless Battle', category: 'Attack', icon: '⚔️', description: 'True damage' },
        { id: 'i3', name: 'Windtalker', category: 'Attack', icon: '🌪️', description: 'Crit chance & speed' },
        { id: 'i4', name: 'Malefic Roar', category: 'Attack', icon: '🔫', description: 'Penetration' },
        { id: 'i5', name: 'Blade of Despair', category: 'Attack', icon: '🗡️', description: 'Damage' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Berserker Fury', category: 'Attack', icon: '🪓', description: 'Core crit' }],
      notes: 'Sample Pro Build: Aggressive wall-surfing carry.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 0, kills: 5, assists: 7, deaths: 7 },
      2: { mapsPlayed: 3, wins: 2, kills: 14, assists: 13, deaths: 8 },
      3: { mapsPlayed: 2, wins: 1, kills: 7, assists: 8, deaths: 6 },
      4: { mapsPlayed: 2, wins: 1, kills: 6, assists: 7, deaths: 6 }
    }
  },

  // --- MID LANERS ---
  {
    id: 'p-stormie',
    nickname: 'Stormie',
    realName: 'Hazziq Danish',
    teamId: 'srg',
    role: 'Mid',
    price: 8.8,
    previousPrice: 8.5,
    ownershipPercent: 51.2,
    projectedPoints: 29.2,
    recentForm: 9.2,
    totalPoints: 194.2,
    kda: { kills: 4.8, deaths: 1.2, assists: 8.5, ratio: 11.08 },
    killParticipation: 84.5,
    recentHeroPool: [
      { heroName: 'Novaria', games: 4, wins: 4, winRate: 100, kda: '4.0/0.8/10.5', icon: '🔮' },
      { heroName: 'Valentina', games: 3, wins: 3, winRate: 100, kda: '6.0/1.5/7.0', icon: '🎭' },
      { heroName: 'Faramis', games: 2, wins: 2, winRate: 100, kda: '3.0/1.0/11.0', icon: '⚰️' }
    ],
    recentProBuild: {
      hero: 'Novaria',
      heroIcon: '🔮',
      battleSpell: 'Flameshot',
      battleSpellIcon: '🔥',
      emblem: 'Mage (Inspire / Bargain Hunter / Impure Rage)',
      emblemTalents: ['Inspire', 'Bargain Hunter', 'Impure Rage'],
      finalBuild: [
        { id: 'i1', name: 'Magic Shoes', category: 'Movement', icon: '🥾', description: '+10% Cooldown Reduction, +40 Move' },
        { id: 'i2', name: 'Clock of Destiny', category: 'Magic', icon: '⏳', description: '+60 Magic Power, +615 HP, Mana & AP scaling' },
        { id: 'i3', name: 'Lightning Truncheon', category: 'Magic', icon: '⚡', description: '+75 Magic Power, +10% CDR, Echo burst damage' },
        { id: 'i4', name: 'Holy Crystal', category: 'Magic', icon: '💎', description: '+100 Magic Power, +21-35% Magic Power' },
        { id: 'i5', name: 'Divine Glaive', category: 'Magic', icon: '🔱', description: '+65 Magic Power, +40% Magic PEN' },
        { id: 'i6', name: 'Blood Wings', category: 'Magic', icon: '🪽', description: '+175 Magic Power, heavy shield' }
      ],
      mostUsedBuild: [
        { id: 'i1', name: 'Clock of Destiny', category: 'Magic', icon: '⏳', description: 'Mana & AP stack' },
        { id: 'i2', name: 'Lightning Truncheon', category: 'Magic', icon: '⚡', description: 'Long range snipe' }
      ],
      notes: 'Sample Pro Build: Vision-control and maximum range poke.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 9, assists: 18, deaths: 2, bonusPoints: 4 },
      2: { mapsPlayed: 3, wins: 3, kills: 16, assists: 26, deaths: 4, bonusPoints: 6 },
      3: { mapsPlayed: 2, wins: 2, kills: 10, assists: 19, deaths: 1, bonusPoints: 4 },
      4: { mapsPlayed: 2, wins: 2, kills: 9, assists: 17, deaths: 2, bonusPoints: 4 }
    }
  },
  {
    id: 'p-udil',
    nickname: 'Udil',
    realName: 'Muhammad Julian Ardiansyah',
    teamId: 'hb',
    role: 'Mid',
    price: 8.2,
    previousPrice: 8.4,
    ownershipPercent: 26.5,
    projectedPoints: 24.5,
    recentForm: 7.9,
    totalPoints: 162.0,
    kda: { kills: 3.8, deaths: 2.0, assists: 7.5, ratio: 5.65 },
    killParticipation: 76.5,
    recentHeroPool: [
      { heroName: 'Lylia', games: 3, wins: 2, winRate: 67, kda: '5.0/1.5/7.5', icon: '💣' },
      { heroName: 'Pharsa', games: 2, wins: 2, winRate: 100, kda: '4.5/2.0/8.0', icon: '🐦' },
      { heroName: 'Vexana', games: 2, wins: 1, winRate: 50, kda: '2.5/2.5/8.0', icon: '💀' }
    ],
    recentProBuild: {
      hero: 'Lylia',
      heroIcon: '💣',
      battleSpell: 'Purify',
      battleSpellIcon: '✨',
      emblem: 'Mage',
      emblemTalents: ['Inspire', 'Wilderness Blessing', 'Lethal Ignition'],
      finalBuild: [
        { id: 'i1', name: 'Magic Shoes', category: 'Movement', icon: '🥾', description: 'CDR boots' },
        { id: 'i2', name: 'Enchanted Talisman', category: 'Magic', icon: '📖', description: 'Mana regen & 20% CDR' },
        { id: 'i3', name: 'Ice Queen Wand', category: 'Magic', icon: '❄️', description: 'Continuous slow' },
        { id: 'i4', name: 'Glowing Wand', category: 'Magic', icon: '🪄', description: '% HP burn' },
        { id: 'i5', name: 'Divine Glaive', category: 'Magic', icon: '🔱', description: 'Magic PEN' },
        { id: 'i6', name: 'Winter Crown', category: 'Defense', icon: '👑', description: 'Freeze invulnerability' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Ice Queen Wand', category: 'Magic', icon: '❄️', description: 'Kiting master' }],
      notes: 'Sample Pro Build: High mobility zoning artillery.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 7, assists: 15, deaths: 4 },
      2: { mapsPlayed: 3, wins: 2, kills: 12, assists: 22, deaths: 6 },
      3: { mapsPlayed: 2, wins: 2, kills: 8, assists: 16, deaths: 3 },
      4: { mapsPlayed: 2, wins: 2, kills: 7, assists: 14, deaths: 3 }
    }
  },
  {
    id: 'p-moon',
    nickname: 'Moon',
    realName: 'Zikry Shamsuddin',
    teamId: 'tdk',
    role: 'Mid',
    price: 7.7,
    previousPrice: 7.7,
    ownershipPercent: 21.0,
    projectedPoints: 22.0,
    recentForm: 7.4,
    totalPoints: 146.4,
    kda: { kills: 3.5, deaths: 2.2, assists: 7.0, ratio: 4.77 },
    killParticipation: 72.8,
    recentHeroPool: [
      { heroName: 'Xavier', games: 3, wins: 2, winRate: 67, kda: '4.0/2.0/8.0', icon: '🌟' },
      { heroName: 'Kadita', games: 2, wins: 1, winRate: 50, kda: '5.0/2.5/5.0', icon: '🌊' }
    ],
    recentProBuild: {
      hero: 'Xavier',
      heroIcon: '🌟',
      battleSpell: 'Flicker',
      battleSpellIcon: '⚡',
      emblem: 'Mage',
      emblemTalents: ['Inspire', 'Bargain Hunter', 'Impure Rage'],
      finalBuild: [
        { id: 'i1', name: 'Demon Shoes', category: 'Movement', icon: '🥾', description: 'Mana sustain' },
        { id: 'i2', name: 'Clock of Destiny', category: 'Magic', icon: '⏳', description: 'Scaling HP & Mana' },
        { id: 'i3', name: 'Lightning Truncheon', category: 'Magic', icon: '⚡', description: 'Echo damage' },
        { id: 'i4', name: 'Holy Crystal', category: 'Magic', icon: '💎', description: 'Pure power' },
        { id: 'i5', name: 'Divine Glaive', category: 'Magic', icon: '🔱', description: 'Penetration' },
        { id: 'i6', name: 'Winter Crown', category: 'Defense', icon: '👑', description: 'Safety' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Clock of Destiny', category: 'Magic', icon: '⏳', description: 'Essential' }],
      notes: 'Sample Pro Build: Global laser map pressure.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 6, assists: 13, deaths: 4 },
      2: { mapsPlayed: 2, wins: 2, kills: 9, assists: 16, deaths: 3 },
      3: { mapsPlayed: 3, wins: 1, kills: 9, assists: 17, deaths: 8 },
      4: { mapsPlayed: 2, wins: 1, kills: 5, assists: 12, deaths: 4 }
    }
  },
  {
    id: 'p-zaim',
    nickname: 'Zaimsempoi',
    realName: 'Zaim Hafiz',
    teamId: 'ts',
    role: 'Mid',
    price: 7.0,
    previousPrice: 7.1,
    ownershipPercent: 11.2,
    projectedPoints: 19.5,
    recentForm: 7.0,
    totalPoints: 131.0,
    kda: { kills: 3.1, deaths: 2.5, assists: 6.2, ratio: 3.72 },
    killParticipation: 68.0,
    recentHeroPool: [{ heroName: 'Gord', games: 2, wins: 1, winRate: 50, kda: '3.0/3.0/8.0', icon: '🛹' }],
    recentProBuild: {
      hero: 'Gord',
      heroIcon: '🛹',
      battleSpell: 'Sprint',
      battleSpellIcon: '🏃',
      emblem: 'Mage',
      emblemTalents: ['Agility', 'Wilderness Blessing', 'Impure Rage'],
      finalBuild: [
        { id: 'i1', name: 'Magic Shoes', category: 'Movement', icon: '🥾', description: 'CDR' },
        { id: 'i2', name: 'Ice Queen Wand', category: 'Magic', icon: '❄️', description: 'Slow' },
        { id: 'i3', name: 'Glowing Wand', category: 'Magic', icon: '🪄', description: 'Burn' },
        { id: 'i4', name: 'Holy Crystal', category: 'Magic', icon: '💎', description: 'Power' },
        { id: 'i5', name: 'Divine Glaive', category: 'Magic', icon: '🔱', description: 'Pen' },
        { id: 'i6', name: 'Winter Crown', category: 'Defense', icon: '👑', description: 'Invulnerable' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Ice Queen Wand', category: 'Magic', icon: '❄️', description: 'Perma-slow' }],
      notes: 'Sample Pro Build: Wave clear and choke-point domination.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 5, assists: 11, deaths: 5 },
      2: { mapsPlayed: 2, wins: 1, kills: 6, assists: 13, deaths: 5 },
      3: { mapsPlayed: 2, wins: 2, kills: 7, assists: 14, deaths: 4 },
      4: { mapsPlayed: 2, wins: 1, kills: 4, assists: 10, deaths: 5 }
    }
  },
  {
    id: 'p-riyan',
    nickname: 'Riyan',
    realName: 'Riyan Hidayat',
    teamId: 'mv',
    role: 'Mid',
    price: 6.1,
    previousPrice: 6.0,
    ownershipPercent: 6.5,
    projectedPoints: 17.5,
    recentForm: 6.9,
    totalPoints: 114.2,
    kda: { kills: 3.0, deaths: 2.8, assists: 5.4, ratio: 3.0 },
    killParticipation: 64.0,
    recentHeroPool: [{ heroName: 'Nana', games: 3, wins: 2, winRate: 67, kda: '3.0/2.0/7.0', icon: '🐱' }],
    recentProBuild: {
      hero: 'Nana',
      heroIcon: '🐱',
      battleSpell: 'Flameshot',
      battleSpellIcon: '🔥',
      emblem: 'Mage',
      emblemTalents: ['Inspire', 'Bargain Hunter', 'Lethal Ignition'],
      finalBuild: [
        { id: 'i1', name: 'Arcane Boots', category: 'Movement', icon: '🥾', description: 'PEN' },
        { id: 'i2', name: 'Lightning Truncheon', category: 'Magic', icon: '⚡', description: 'Burst' },
        { id: 'i3', name: 'Holy Crystal', category: 'Magic', icon: '💎', description: 'AP' },
        { id: 'i4', name: 'Divine Glaive', category: 'Magic', icon: '🔱', description: 'Pierce' },
        { id: 'i5', name: 'Blood Wings', category: 'Magic', icon: '🪽', description: 'Shield' },
        { id: 'i6', name: 'Winter Crown', category: 'Defense', icon: '👑', description: 'Stasis' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Lightning Truncheon', category: 'Magic', icon: '⚡', description: 'Burst' }],
      notes: 'Sample Pro Build: Molina morph crowd control.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 0, kills: 4, assists: 8, deaths: 6 },
      2: { mapsPlayed: 3, wins: 2, kills: 10, assists: 16, deaths: 7 },
      3: { mapsPlayed: 2, wins: 1, kills: 5, assists: 10, deaths: 5 },
      4: { mapsPlayed: 2, wins: 1, kills: 4, assists: 9, deaths: 5 }
    }
  },

  // --- GOLD LANERS ---
  {
    id: 'p-innocent',
    nickname: 'Innocent',
    realName: 'John Banal',
    teamId: 'srg',
    role: 'Gold',
    price: 9.4,
    previousPrice: 9.1,
    ownershipPercent: 58.6,
    projectedPoints: 32.8,
    recentForm: 9.5,
    totalPoints: 212.0,
    kda: { kills: 6.8, deaths: 1.1, assists: 5.2, ratio: 10.9 },
    killParticipation: 78.4,
    recentHeroPool: [
      { heroName: 'Harith', games: 4, wins: 4, winRate: 100, kda: '7.5/0.8/6.0', icon: '🐱' },
      { heroName: 'Roger', games: 3, wins: 3, winRate: 100, kda: '8.0/1.5/4.5', icon: '🐺' },
      { heroName: 'Claude', games: 2, wins: 2, winRate: 100, kda: '5.5/1.0/6.0', icon: '🐒' }
    ],
    recentProBuild: {
      hero: 'Harith',
      heroIcon: '🐱',
      battleSpell: 'Purify',
      battleSpellIcon: '✨',
      emblem: 'Mage (Inspire / Bargain Hunter / Impure Rage)',
      emblemTalents: ['Inspire', 'Bargain Hunter', 'Impure Rage'],
      finalBuild: [
        { id: 'i1', name: 'Magic Shoes', category: 'Movement', icon: '🥾', description: '+10% Cooldown Reduction' },
        { id: 'i2', name: 'Starlium Scythe', category: 'Magic', icon: '🌙', description: 'Essential hybrid true damage proc' },
        { id: 'i3', name: 'Feather of Heaven', category: 'Magic', icon: '🪶', description: '+55 Magic Power, +30% ATK Speed' },
        { id: 'i4', name: 'Holy Crystal', category: 'Magic', icon: '💎', description: '+100 Magic Power, % scaling AP' },
        { id: 'i5', name: 'Concentrated Energy', category: 'Magic', icon: '🩸', description: '+70 Magic Power, +700 HP, Spell vamp' },
        { id: 'i6', name: 'Winter Crown', category: 'Defense', icon: '👑', description: 'Invulnerability during Chrono Dash' }
      ],
      mostUsedBuild: [
        { id: 'i1', name: 'Starlium Scythe', category: 'Magic', icon: '🌙', description: 'Core CDR' },
        { id: 'i2', name: 'Feather of Heaven', category: 'Magic', icon: '🪶', description: 'Rapid dash auto' }
      ],
      notes: 'Sample Pro Build: Dominant Harith Gold Lane standard build.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 13, assists: 9, deaths: 1, bonusPoints: 6 },
      2: { mapsPlayed: 3, wins: 3, kills: 22, assists: 14, deaths: 3, bonusPoints: 8 },
      3: { mapsPlayed: 2, wins: 2, kills: 15, assists: 10, deaths: 2, bonusPoints: 6 },
      4: { mapsPlayed: 2, wins: 2, kills: 14, assists: 11, deaths: 2, bonusPoints: 6 }
    }
  },
  {
    id: 'p-nets',
    nickname: 'Nets',
    realName: 'Kenneth Barro',
    teamId: 'hb',
    role: 'Gold',
    price: 8.5,
    previousPrice: 8.6,
    ownershipPercent: 30.4,
    projectedPoints: 25.5,
    recentForm: 8.0,
    totalPoints: 170.2,
    kda: { kills: 5.6, deaths: 2.1, assists: 4.8, ratio: 4.95 },
    killParticipation: 72.0,
    recentHeroPool: [
      { heroName: 'Beatrix', games: 3, wins: 2, winRate: 67, kda: '6.0/2.0/4.0', icon: '🔫' },
      { heroName: 'Brody', games: 2, wins: 2, winRate: 100, kda: '7.0/1.5/5.0', icon: '⚡' },
      { heroName: 'Natan', games: 2, wins: 1, winRate: 50, kda: '4.5/3.0/6.0', icon: '⌛' }
    ],
    recentProBuild: {
      hero: 'Beatrix',
      heroIcon: '🔫',
      battleSpell: 'Flicker',
      battleSpellIcon: '⚡',
      emblem: 'Assassin',
      emblemTalents: ['Fatal', 'Weapon Master', 'Quantum Charge'],
      finalBuild: [
        { id: 'i1', name: 'Warrior Boots', category: 'Movement', icon: '🥾', description: 'Defense' },
        { id: 'i2', name: 'Blade of Despair', category: 'Attack', icon: '⚔️', description: 'Massive early damage' },
        { id: 'i3', name: 'Hunter Strike', category: 'Attack', icon: '🗡️', description: 'Mobility & CDR' },
        { id: 'i4', name: 'Malefic Roar', category: 'Attack', icon: '🔫', description: 'Armor piercing' },
        { id: 'i5', name: 'Rose Gold Meteor', category: 'Attack', icon: '🌹', description: 'Emergency barrier' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Blade of Despair', category: 'Attack', icon: '⚔️', description: 'First item power spike' }],
      notes: 'Sample Pro Build: Sniper and rocket burst focus.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 10, assists: 9, deaths: 3 },
      2: { mapsPlayed: 3, wins: 2, kills: 16, assists: 13, deaths: 6 },
      3: { mapsPlayed: 2, wins: 2, kills: 11, assists: 10, deaths: 4 },
      4: { mapsPlayed: 2, wins: 2, kills: 10, assists: 9, deaths: 3 }
    }
  },
  {
    id: 'p-cikugais',
    nickname: 'CikuGais',
    realName: 'Muhammad Danial Mohamad',
    teamId: 'tdk',
    role: 'Gold',
    price: 7.9,
    previousPrice: 8.0,
    ownershipPercent: 23.5,
    projectedPoints: 23.0,
    recentForm: 7.5,
    totalPoints: 152.6,
    kda: { kills: 4.9, deaths: 2.3, assists: 4.4, ratio: 4.04 },
    killParticipation: 69.5,
    recentHeroPool: [
      { heroName: 'Claude', games: 3, wins: 2, winRate: 67, kda: '5.5/2.0/5.0', icon: '🐒' },
      { heroName: 'Wanwan', games: 2, wins: 1, winRate: 50, kda: '4.0/3.0/4.0', icon: '🐯' }
    ],
    recentProBuild: {
      hero: 'Claude',
      heroIcon: '🐒',
      battleSpell: 'Vengeance',
      battleSpellIcon: '🔥',
      emblem: 'Marksman',
      emblemTalents: ['Swift', 'Weapon Master', 'Weakness Finder'],
      finalBuild: [
        { id: 'i1', name: 'Tough Boots', category: 'Movement', icon: '🥾', description: 'CC reduction' },
        { id: 'i2', name: 'Demon Hunter Sword', category: 'Attack', icon: '🗡️', description: '% Current HP damage per hit' },
        { id: 'i3', name: 'Golden Staff', category: 'Attack', icon: '🦯', description: 'Converts crit to endless procs' },
        { id: 'i4', name: 'Corrosion Scythe', category: 'Attack', icon: '🌾', description: 'Attack speed and slow' },
        { id: 'i5', name: 'Brute Force Breastplate', category: 'Defense', icon: '🎽', description: 'Defensive durability' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [
        { id: 'i1', name: 'Demon Hunter Sword', category: 'Attack', icon: '🗡️', description: 'Trinity component' },
        { id: 'i2', name: 'Golden Staff', category: 'Attack', icon: '🦯', description: 'Trinity component' }
      ],
      notes: 'Sample Pro Build: Classic attack speed Trinity shredder.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 8, assists: 8, deaths: 4 },
      2: { mapsPlayed: 2, wins: 2, kills: 11, assists: 9, deaths: 3 },
      3: { mapsPlayed: 3, wins: 1, kills: 12, assists: 11, deaths: 8 },
      4: { mapsPlayed: 2, wins: 1, kills: 7, assists: 7, deaths: 5 }
    }
  },
  {
    id: 'p-atannn',
    nickname: 'ATANNN',
    realName: 'Ahmad Tarmizi',
    teamId: 'ts',
    role: 'Gold',
    price: 7.2,
    previousPrice: 7.2,
    ownershipPercent: 14.8,
    projectedPoints: 20.4,
    recentForm: 7.2,
    totalPoints: 137.8,
    kda: { kills: 4.4, deaths: 2.5, assists: 4.0, ratio: 3.36 },
    killParticipation: 66.2,
    recentHeroPool: [{ heroName: 'Moskov', games: 2, wins: 1, winRate: 50, kda: '5.0/3.0/4.0', icon: '🔱' }],
    recentProBuild: {
      hero: 'Moskov',
      heroIcon: '🔱',
      battleSpell: 'Inspire',
      battleSpellIcon: '⚡',
      emblem: 'Marksman',
      emblemTalents: ['Swift', 'Tenacity', 'Quantum Charge'],
      finalBuild: [
        { id: 'i1', name: 'Swift Boots', category: 'Movement', icon: '🥾', description: 'Attack speed' },
        { id: 'i2', name: 'Corrosion Scythe', category: 'Attack', icon: '🌾', description: 'Slow' },
        { id: 'i3', name: 'Demon Hunter Sword', category: 'Attack', icon: '🗡️', description: 'Tank shred' },
        { id: 'i4', name: 'Golden Staff', category: 'Attack', icon: '🦯', description: 'Triple strike' },
        { id: 'i5', name: 'Wind of Nature', category: 'Attack', icon: '🌬️', description: 'Physical immunity' },
        { id: 'i6', name: 'Malefic Roar', category: 'Attack', icon: '🔫', description: 'Armor pen' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Corrosion Scythe', category: 'Attack', icon: '🌾', description: 'First item' }],
      notes: 'Sample Pro Build: Abyss spear wall-stun DPS.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 7, assists: 7, deaths: 5 },
      2: { mapsPlayed: 2, wins: 1, kills: 8, assists: 9, deaths: 5 },
      3: { mapsPlayed: 2, wins: 2, kills: 10, assists: 8, deaths: 3 },
      4: { mapsPlayed: 2, wins: 1, kills: 6, assists: 7, deaths: 4 }
    }
  },
  {
    id: 'p-minik',
    nickname: 'Minik',
    realName: 'Muhammad Harith',
    teamId: 'mv',
    role: 'Gold',
    price: 6.3,
    previousPrice: 6.1,
    ownershipPercent: 7.8,
    projectedPoints: 18.0,
    recentForm: 7.0,
    totalPoints: 118.0,
    kda: { kills: 4.1, deaths: 3.1, assists: 3.8, ratio: 2.55 },
    killParticipation: 63.4,
    recentHeroPool: [{ heroName: 'Karrie', games: 2, wins: 1, winRate: 50, kda: '5.0/3.0/4.0', icon: '🎡' }],
    recentProBuild: {
      hero: 'Karrie',
      heroIcon: '🎡',
      battleSpell: 'Vengeance',
      battleSpellIcon: '🔥',
      emblem: 'Tank',
      emblemTalents: ['Swift', 'Tenacity', 'Brave Smite'],
      finalBuild: [
        { id: 'i1', name: 'Tough Boots', category: 'Movement', icon: '🥾', description: 'Resist' },
        { id: 'i2', name: 'Corrosion Scythe', category: 'Attack', icon: '🌾', description: 'Speed' },
        { id: 'i3', name: 'Golden Staff', category: 'Attack', icon: '🦯', description: 'Fast True Damage' },
        { id: 'i4', name: 'Thunder Belt', category: 'Defense', icon: '⚡', description: 'Mana & True DMG stack' },
        { id: 'i5', name: 'Radiant Armor', category: 'Defense', icon: '🛡️', description: 'Tankiness' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Golden Staff', category: 'Attack', icon: '🦯', description: 'Core proc' }],
      notes: 'Sample Pro Build: Semi-tank true damage shred.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 0, kills: 5, assists: 5, deaths: 7 },
      2: { mapsPlayed: 3, wins: 2, kills: 13, assists: 11, deaths: 8 },
      3: { mapsPlayed: 2, wins: 1, kills: 7, assists: 6, deaths: 6 },
      4: { mapsPlayed: 2, wins: 1, kills: 6, assists: 6, deaths: 5 }
    }
  },

  // --- ROAMERS ---
  {
    id: 'p-yums',
    nickname: 'YumS',
    realName: 'Muhammad Suhairi',
    teamId: 'srg',
    role: 'Roam',
    price: 8.6,
    previousPrice: 8.4,
    ownershipPercent: 49.2,
    projectedPoints: 27.5,
    recentForm: 9.4,
    totalPoints: 188.4,
    kda: { kills: 1.2, deaths: 1.8, assists: 11.5, ratio: 7.05 },
    killParticipation: 86.8,
    recentHeroPool: [
      { heroName: 'Tigreal', games: 4, wins: 4, winRate: 100, kda: '1.0/1.5/12.5', icon: '🛡️' },
      { heroName: 'Chou', games: 3, wins: 3, winRate: 100, kda: '2.0/2.0/10.0', icon: '🥋' },
      { heroName: 'Minotaur', games: 2, wins: 2, winRate: 100, kda: '0.5/1.0/13.0', icon: '🐂' }
    ],
    recentProBuild: {
      hero: 'Tigreal',
      heroIcon: '🛡️',
      battleSpell: 'Flicker',
      battleSpellIcon: '⚡',
      emblem: 'Tank (Firmness / Tenacity / Concussive Blast)',
      emblemTalents: ['Firmness', 'Tenacity', 'Concussive Blast'],
      finalBuild: [
        { id: 'i1', name: 'Tough Boots (Conceal)', category: 'Movement', icon: '🥾', description: 'Conceal active for surprise flicker ults' },
        { id: 'i2', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: '+70 Phys DEF, anti-heal and attack speed cut' },
        { id: 'i3', name: 'Athena Shield', category: 'Defense', icon: '🛡️', description: 'High burst magic damage soak' },
        { id: 'i4', name: 'Antique Cuirass', category: 'Defense', icon: '🎽', description: 'Reduces attacker physical damage by 8%' },
        { id: 'i5', name: 'Radiant Armor', category: 'Defense', icon: '🛡️', description: 'Sustained magic resist' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive to finish teamfight' }
      ],
      mostUsedBuild: [
        { id: 'i1', name: 'Tough Boots (Conceal)', category: 'Movement', icon: '🥾', description: 'Team stealth' },
        { id: 'i2', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Frontline aura' }
      ],
      notes: 'Sample Pro Build: 5-man Flicker Implosion initiator.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 2, assists: 22, deaths: 3, bonusPoints: 4 },
      2: { mapsPlayed: 3, wins: 3, kills: 4, assists: 34, deaths: 5, bonusPoints: 6 },
      3: { mapsPlayed: 2, wins: 2, kills: 2, assists: 24, deaths: 2, bonusPoints: 4 },
      4: { mapsPlayed: 2, wins: 2, kills: 2, assists: 21, deaths: 3, bonusPoints: 4 }
    }
  },
  {
    id: 'p-xorn',
    nickname: 'Xorn',
    realName: 'Mohamad Noor',
    teamId: 'hb',
    role: 'Roam',
    price: 8.3,
    previousPrice: 8.4,
    ownershipPercent: 35.8,
    projectedPoints: 24.8,
    recentForm: 8.4,
    totalPoints: 168.0,
    kda: { kills: 1.8, deaths: 2.5, assists: 9.8, ratio: 4.64 },
    killParticipation: 82.0,
    recentHeroPool: [
      { heroName: 'Franco', games: 3, wins: 2, winRate: 67, kda: '2.0/2.5/9.0', icon: '⚓' },
      { heroName: 'Khufra', games: 2, wins: 2, winRate: 100, kda: '1.5/2.0/11.0', icon: '🏺' },
      { heroName: 'Grock', games: 2, wins: 1, winRate: 50, kda: '2.5/2.5/8.0', icon: '🗿' }
    ],
    recentProBuild: {
      hero: 'Franco',
      heroIcon: '⚓',
      battleSpell: 'Flicker',
      battleSpellIcon: '⚡',
      emblem: 'Support (Agility / Pull Yourself Together / Focusing Mark)',
      emblemTalents: ['Agility', 'Pull Yourself Together', 'Focusing Mark'],
      finalBuild: [
        { id: 'i1', name: 'Rapid Boots (Encourage)', category: 'Movement', icon: '🥾', description: '+70 Movement speed for iron hook setups' },
        { id: 'i2', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Anti-heal and CDR' },
        { id: 'i3', name: 'Athena Shield', category: 'Defense', icon: '🛡️', description: 'Magic defense' },
        { id: 'i4', name: 'Thunder Belt', category: 'Defense', icon: '⚡', description: 'Slow on basic attack' },
        { id: 'i5', name: 'Blade Armor', category: 'Defense', icon: '🛡️', description: 'Crit damage deflection' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Rapid Boots', category: 'Movement', icon: '🥾', description: 'Roaming speed' }],
      notes: 'Sample Pro Build: High speed hook playmaking.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 2, kills: 3, assists: 18, deaths: 5 },
      2: { mapsPlayed: 3, wins: 2, kills: 5, assists: 28, deaths: 8 },
      3: { mapsPlayed: 2, wins: 2, kills: 3, assists: 20, deaths: 4 },
      4: { mapsPlayed: 2, wins: 2, kills: 3, assists: 19, deaths: 5 }
    }
  },
  {
    id: 'p-kuja',
    nickname: 'Kuja',
    realName: 'Ariff Izzuddin',
    teamId: 'ts',
    role: 'Roam',
    price: 7.4,
    previousPrice: 7.3,
    ownershipPercent: 16.4,
    projectedPoints: 21.0,
    recentForm: 7.4,
    totalPoints: 142.2,
    kda: { kills: 1.0, deaths: 2.6, assists: 8.8, ratio: 3.76 },
    killParticipation: 78.5,
    recentHeroPool: [
      { heroName: 'Mathilda', games: 3, wins: 2, winRate: 67, kda: '2.0/2.0/10.0', icon: '🪶' },
      { heroName: 'Diggie', games: 2, wins: 1, winRate: 50, kda: '1.0/3.0/9.0', icon: '⏰' }
    ],
    recentProBuild: {
      hero: 'Mathilda',
      heroIcon: '🪶',
      battleSpell: 'Flicker',
      battleSpellIcon: '⚡',
      emblem: 'Support',
      emblemTalents: ['Agility', 'Tenacity', 'Focusing Mark'],
      finalBuild: [
        { id: 'i1', name: 'Tough Boots (Favor)', category: 'Movement', icon: '🥾', description: 'Healing roamer blessing' },
        { id: 'i2', name: 'Flask of Oasis', category: 'Magic', icon: '🏺', description: 'Shield and heal boost' },
        { id: 'i3', name: 'Oracle', category: 'Defense', icon: '🔮', description: 'Enhances shield value' },
        { id: 'i4', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Anti-heal' },
        { id: 'i5', name: 'Athena Shield', category: 'Defense', icon: '🛡️', description: 'Magic protection' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Flask of Oasis', category: 'Magic', icon: '🏺', description: 'Burst shield core' }],
      notes: 'Sample Pro Build: Guiding Wind tactical disengage.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 2, assists: 16, deaths: 6 },
      2: { mapsPlayed: 2, wins: 1, kills: 2, assists: 18, deaths: 5 },
      3: { mapsPlayed: 2, wins: 2, kills: 3, assists: 20, deaths: 4 },
      4: { mapsPlayed: 2, wins: 1, kills: 2, assists: 15, deaths: 5 }
    }
  },
  {
    id: 'p-mali',
    nickname: 'Mali',
    realName: 'Amirul Mali',
    teamId: 'tdk',
    role: 'Roam',
    price: 7.1,
    previousPrice: 7.2,
    ownershipPercent: 12.5,
    projectedPoints: 19.8,
    recentForm: 7.1,
    totalPoints: 135.0,
    kda: { kills: 0.9, deaths: 2.8, assists: 8.2, ratio: 3.25 },
    killParticipation: 74.0,
    recentHeroPool: [{ heroName: 'Lolita', games: 2, wins: 1, winRate: 50, kda: '1.0/2.5/9.0', icon: '🛡️' }],
    recentProBuild: {
      hero: 'Lolita',
      heroIcon: '🛡️',
      battleSpell: 'Flicker',
      battleSpellIcon: '⚡',
      emblem: 'Tank',
      emblemTalents: ['Vitality', 'Tenacity', 'Brave Smite'],
      finalBuild: [
        { id: 'i1', name: 'Warrior Boots', category: 'Movement', icon: '🥾', description: 'Defense' },
        { id: 'i2', name: 'Athena Shield', category: 'Defense', icon: '🛡️', description: 'Shield' },
        { id: 'i3', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Anti-heal' },
        { id: 'i4', name: 'Antique Cuirass', category: 'Defense', icon: '🎽', description: 'Armor' },
        { id: 'i5', name: 'Radiant Armor', category: 'Defense', icon: '🛡️', description: 'Magic Def' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Athena Shield', category: 'Defense', icon: '🛡️', description: 'Core' }],
      notes: 'Sample Pro Build: Projectile block shield specialist.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 1, kills: 1, assists: 15, deaths: 6 },
      2: { mapsPlayed: 2, wins: 2, kills: 2, assists: 18, deaths: 4 },
      3: { mapsPlayed: 3, wins: 1, kills: 3, assists: 19, deaths: 9 },
      4: { mapsPlayed: 2, wins: 1, kills: 2, assists: 14, deaths: 5 }
    }
  },
  {
    id: 'p-panda',
    nickname: 'Panda',
    realName: 'Faiz Panda',
    teamId: 'mv',
    role: 'Roam',
    price: 6.2,
    previousPrice: 6.0,
    ownershipPercent: 6.8,
    projectedPoints: 17.0,
    recentForm: 6.8,
    totalPoints: 112.5,
    kda: { kills: 0.8, deaths: 3.2, assists: 7.2, ratio: 2.5 },
    killParticipation: 70.0,
    recentHeroPool: [{ heroName: 'Ruby', games: 2, wins: 1, winRate: 50, kda: '1.0/3.0/8.0', icon: '🪓' }],
    recentProBuild: {
      hero: 'Ruby',
      heroIcon: '🪓',
      battleSpell: 'Flicker',
      battleSpellIcon: '⚡',
      emblem: 'Tank',
      emblemTalents: ['Firmness', 'Tenacity', 'Brave Smite'],
      finalBuild: [
        { id: 'i1', name: 'Tough Boots', category: 'Movement', icon: '🥾', description: 'Boots' },
        { id: 'i2', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Anti-heal' },
        { id: 'i3', name: 'Oracle', category: 'Defense', icon: '🔮', description: 'Regen' },
        { id: 'i4', name: 'Antique Cuirass', category: 'Defense', icon: '🎽', description: 'Phys def' },
        { id: 'i5', name: 'Athena Shield', category: 'Defense', icon: '🛡️', description: 'Magic def' },
        { id: 'i6', name: 'Immortality', category: 'Defense', icon: '✨', description: 'Revive' }
      ],
      mostUsedBuild: [{ id: 'i1', name: 'Dominance Ice', category: 'Defense', icon: '❄️', description: 'Core' }],
      notes: 'Sample Pro Build: Aggressive hook-and-stun roamer.'
    },
    gwStats: {
      1: { mapsPlayed: 2, wins: 0, kills: 1, assists: 11, deaths: 8 },
      2: { mapsPlayed: 3, wins: 2, kills: 3, assists: 22, deaths: 9 },
      3: { mapsPlayed: 2, wins: 1, kills: 2, assists: 14, deaths: 6 },
      4: { mapsPlayed: 2, wins: 1, kills: 1, assists: 12, deaths: 6 }
    }
  }
];

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  jungleKill: 1.00,
  jungleAssist: 0.50,
  jungleDeath: -0.75,
  goldKill: 1.10,
  goldAssist: 0.50,
  goldDeath: -0.75,
  midKill: 1.00,
  midAssist: 0.50,
  midDeath: -0.75,
  expKill: 1.10,
  expAssist: 0.75,
  expDeath: -0.50,
  roamKill: 1.00,
  roamAssist: 0.60,
  roamDeath: -0.40,
  mapPlayed: 1.00,
  mapWin: 1.00
};

export const SAMPLE_FIXTURES: Fixture[] = [
  // Gameweek 4 (Current / Live)
  {
    id: 'f-gw4-1',
    gameweek: 4,
    day: 'Friday',
    date: 'Sep 25',
    time: '3:00 PM',
    homeTeamId: 'srg',
    awayTeamId: 'mv',
    homeScore: 2,
    awayScore: 0,
    status: 'COMPLETED',
    homeDifficulty: 1,
    awayDifficulty: 5,
    mvpPlayerId: 'p-sekysss'
  },
  {
    id: 'f-gw4-2',
    gameweek: 4,
    day: 'Friday',
    date: 'Sep 25',
    time: '5:30 PM',
    homeTeamId: 'hb',
    awayTeamId: 'ts',
    homeScore: 2,
    awayScore: 1,
    status: 'COMPLETED',
    homeDifficulty: 3,
    awayDifficulty: 4,
    mvpPlayerId: 'p-chibi'
  },
  {
    id: 'f-gw4-3',
    gameweek: 4,
    day: 'Saturday',
    date: 'Sep 26',
    time: '3:00 PM',
    homeTeamId: 'tdk',
    awayTeamId: 'rsg',
    status: 'LIVE',
    homeScore: 1,
    awayScore: 1,
    homeDifficulty: 3,
    awayDifficulty: 3
  },
  {
    id: 'f-gw4-4',
    gameweek: 4,
    day: 'Saturday',
    date: 'Sep 26',
    time: '5:30 PM',
    homeTeamId: 'haq',
    awayTeamId: 'jpn',
    status: 'UPCOMING',
    homeDifficulty: 2,
    awayDifficulty: 2
  },
  {
    id: 'f-gw4-5',
    gameweek: 4,
    day: 'Sunday',
    date: 'Sep 27',
    time: '3:00 PM',
    homeTeamId: 'srg',
    awayTeamId: 'hb',
    status: 'UPCOMING',
    homeDifficulty: 4,
    awayDifficulty: 5
  },
  {
    id: 'f-gw4-6',
    gameweek: 4,
    day: 'Sunday',
    date: 'Sep 27',
    time: '5:30 PM',
    homeTeamId: 'ts',
    awayTeamId: 'tdk',
    status: 'UPCOMING',
    homeDifficulty: 3,
    awayDifficulty: 3
  }
];

export const INITIAL_LEADERBOARD = [
  { rank: 1, manager: 'AimanMLBB', managerName: 'AimanMLBB', teamName: 'GigaChads MY', gwPoints: 168.5, totalPoints: 842.0, favTeam: 'SRG', favoriteTeamId: 'srg', captainPick: 'Sekysss' },
  { rank: 2, manager: 'DanialGamer', managerName: 'DanialGamer', teamName: 'Red Giants Fanatic', gwPoints: 162.2, totalPoints: 831.5, favTeam: 'SRG', favoriteTeamId: 'srg', captainPick: 'Innocent' },
  { rank: 3, manager: 'Farhan_Mythic', managerName: 'Farhan_Mythic', teamName: 'HomeBois Syndicate', gwPoints: 158.0, totalPoints: 820.4, favTeam: 'HB', favoriteTeamId: 'hb', captainPick: 'Nets' },
  { rank: 4, manager: 'SitiSyasya', managerName: 'SitiSyasya', teamName: 'Moonlight Squad', gwPoints: 154.5, totalPoints: 814.2, favTeam: 'TDK', favoriteTeamId: 'tdk', captainPick: 'Hijumee' },
  { rank: 5, manager: 'HafizNinja', managerName: 'HafizNinja', teamName: 'Secret Agents', gwPoints: 152.0, totalPoints: 808.0, favTeam: 'TS', favoriteTeamId: 'ts', captainPick: 'Cliveee' },
  { rank: 1324, manager: 'You (Dannial)', managerName: 'Dannial', teamName: 'Selangor Dynasty', gwPoints: 151.4, totalPoints: 804.2, favTeam: 'SRG', favoriteTeamId: 'srg', captainPick: 'Sekysss', isCurrentUser: true },
  { rank: 1325, manager: 'Bryan_Lee', managerName: 'Bryan_Lee', teamName: 'Klang Valley Allstars', gwPoints: 147.2, totalPoints: 803.9, favTeam: 'RSG', favoriteTeamId: 'rsg', captainPick: 'Loleaz' },
  { rank: 1326, manager: 'Khairul_99', managerName: 'Khairul_99', teamName: 'Tigreal Main', gwPoints: 144.0, totalPoints: 802.5, favTeam: 'MV', favoriteTeamId: 'mv', captainPick: 'Sepat' }
];

export const GLOBAL_LEADERBOARD = INITIAL_LEADERBOARD;

export const INITIAL_PRIVATE_LEAGUES: PrivateLeague[] = [
  {
    id: 'pl-1',
    name: 'Office MLBB',
    code: 'MPL-8F2K',
    creator: 'You (Dannial)',
    createdAt: 'Sep 1, 2026',
    membersCount: 12,
    myRank: 2,
    entries: [
      { rank: 1, manager: 'Farhan_Mythic', teamName: 'HomeBois Syndicate', gwPoints: 158.0, totalPoints: 820.4, favTeam: 'HB' },
      { rank: 2, manager: 'You (Dannial)', teamName: 'Selangor Dynasty', gwPoints: 151.4, totalPoints: 804.2, favTeam: 'SRG', isCurrentUser: true },
      { rank: 3, manager: 'Khairul_99', teamName: 'Tigreal Main', gwPoints: 144.0, totalPoints: 782.5, favTeam: 'MV' },
      { rank: 4, manager: 'Sarah_Shah', teamName: 'Angela Escort', gwPoints: 139.8, totalPoints: 765.0, favTeam: 'TDK' },
      { rank: 5, manager: 'Azman_HR', teamName: 'Corporate Pushers', gwPoints: 132.5, totalPoints: 742.0, favTeam: 'TS' }
    ]
  },
  {
    id: 'pl-2',
    name: 'Klang Valley Gamers',
    code: 'MPL-KV99',
    creator: 'Bryan_Lee',
    createdAt: 'Sep 5, 2026',
    membersCount: 28,
    myRank: 4,
    entries: [
      { rank: 1, manager: 'AimanMLBB', teamName: 'GigaChads MY', gwPoints: 168.5, totalPoints: 842.0, favTeam: 'SRG' },
      { rank: 2, manager: 'DanialGamer', teamName: 'Red Giants Fanatic', gwPoints: 162.2, totalPoints: 831.5, favTeam: 'SRG' },
      { rank: 3, manager: 'Bryan_Lee', teamName: 'Klang Valley Allstars', gwPoints: 147.2, totalPoints: 803.9, favTeam: 'RSG' },
      { rank: 4, manager: 'You (Dannial)', teamName: 'Selangor Dynasty', gwPoints: 151.4, totalPoints: 804.2, favTeam: 'SRG', isCurrentUser: true },
      { rank: 5, manager: 'SitiSyasya', teamName: 'Moonlight Squad', gwPoints: 154.5, totalPoints: 814.2, favTeam: 'TDK' }
    ]
  }
];
