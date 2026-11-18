// ─────────────────────────────────────────────────────────────
//  GYM LEAGUE — rosters, standings and results for every season.
//  Use exact Minecraft usernames (IGN): player heads are loaded from them.
// ─────────────────────────────────────────────────────────────

import { s2Matches } from '../data/s2-matches';
import { uuids } from '../data/uuids';

export type Leader = { ign: string; type: string; format?: string };
// [date YYYY-MM-DD, gym type (or 'E4 1'..'E4 4', 'Champion'), challenger IGN, challenger won? 1 : 0]
export type Match = [string, string, string, 0 | 1];
export type Challenger = {
  ign: string;
  badges: string[];      // IGNs of the gym leaders they've beaten
  e4?: number;           // Elite Four members beaten (0-4)
  champion?: boolean;    // beat the Champion
};
export type Season = {
  id: string;
  name: string;
  status: 'current' | 'finished';
  start: string;         // YYYY-MM-DD
  end?: string;
  champion: Leader;
  elite4: Leader[];      // in order, E4 1 first
  groups: { name: string; note?: string; leaders: Leader[] }[];
  victors: string[];     // challengers who cleared the league
  standings: Challenger[];  // filled in automatically when `matches` is set
  matches?: Match[];        // battle log; standings are worked out from it
  standingsAsOf?: string;
};

export const resources = [
  { label: 'Season 2 rules (v1.4)', href: '/docs/AR_Gym_League_S2_v1.4.pdf', note: 'PDF' },
  { label: 'Season 1 rules (v1.7)', href: '/docs/AR_Gym_League_S1_v1.7.pdf', note: 'PDF' },
  { label: 'Smogon Ubers list', href: 'https://www.smogon.com/dex/sv/formats/uber/', note: 'Banned in Pool 3' },
];

export const seasons: Season[] = [
  {
    id: 's2',
    name: 'Season 2',
    status: 'current',
    start: '2026-10-12',
    champion: { ign: 'Sparklotix', type: '???', format: 'VGC Bring 6, Pick 4' },
    elite4: [
      { ign: 'IgnacioWey', type: 'Royal Court', format: 'Singles 6v6' },
      { ign: 'monotropics', type: 'Underworld', format: 'VGC Bring 6, Pick 4' },
      { ign: 'JCDelirious', type: 'Nightmare', format: 'Doubles 6v6' },
      { ign: 'Noibby', type: 'Marsh', format: 'Doubles 6v6' },
    ],
    groups: [
      {
        name: 'Group A',
        note: '6 of 7 badges unlocks Group B',
        leaders: [
          { ign: 'ChaosJokerHD', type: 'Ghost', format: 'Doubles 6v6' },
          { ign: 'Glambien', type: 'Poison', format: 'Doubles 6v6' },
          { ign: 'Jmmorfe', type: 'Ground', format: 'VGC Bring 6, Pick 4' },
          { ign: 'PandorasPadlock', type: 'Fighting', format: 'Singles 6v6' },
          { ign: 'devdragon14', type: 'Dark', format: 'VGC Bring 6, Pick 4' },
          { ign: 'Lousive', type: 'Bug', format: 'VGC Bring 6, Pick 4' },
          { ign: 'TsarHydrah', type: 'Electric', format: 'Doubles 6v6' },
        ],
      },
      {
        name: 'Group B',
        note: 'All 15 badges unlocks the Elite Four',
        leaders: [
          { ign: 'rxirei', type: 'Psychic', format: 'Singles 6v6' },
          { ign: 'Astolfo_0OC', type: 'Ice', format: 'Doubles 6v6' },
          { ign: 'The_Reaper289', type: 'Dragon', format: 'VGC Bring 6, Pick 4' },
          { ign: 'Scavarodka', type: 'Fairy', format: 'Doubles 6v6' },
          { ign: 'CatLoverSSB', type: 'Normal', format: 'Doubles 6v6' },
          { ign: 'EscanorOP', type: 'Rock', format: 'Doubles 6v6' },
          { ign: 'MilkFister69', type: 'Water', format: 'VGC Bring 6, Pick 4' },
          { ign: '_xdiad', type: 'Flying', format: 'VGC Bring 6, Pick 4' },
        ],
      },
    ],
    victors: [],
    matches: s2Matches,
    standings: [],
  },
  {
    id: 's1',
    name: 'Season 1',
    status: 'finished',
    start: '2026-08-03',
    end: '2026-09-25',
    champion: { ign: 'Sparklotix', type: 'Champion' },
    elite4: [
      { ign: 'Glambien', type: 'Spooky' },
      { ign: 'IgnacioWey', type: 'Order of the Iron Dragon' },
      { ign: 'monotropics', type: 'Tropical' },
      { ign: 'ThinkWeird', type: 'Carnival' },
    ],
    groups: [
      {
        name: 'Gyms 1-10',
        leaders: [
          { ign: 'BlueSeaChief', type: 'Rock', format: 'Doubles 6v6' },
          { ign: 'Kazuhiro75', type: 'Fairy', format: 'VGC' },
          { ign: 'Adrift_Gecko', type: 'Electric', format: 'Triples' },
          { ign: 'acemiller5', type: 'Steel', format: 'Singles' },
          { ign: 'rxirei', type: 'Psychic', format: 'Singles' },
          { ign: 'Jmmorfe', type: 'Grass', format: 'Singles, Doubles or Triples' },
          { ign: 'MildFlames', type: 'Water', format: 'Singles' },
          { ign: 'MilkFister69', type: 'Dark', format: 'Doubles' },
          { ign: 'MartinH2403', type: 'Ghost', format: 'Singles' },
          { ign: 'Astolfo_0OC', type: 'Ice', format: 'Singles' },
        ],
      },
    ],
    victors: ['JCDelirious', 'MildFlames'],
    standings: [],
  },
];

// Work out standings from a season's battle log.
for (const s of seasons) {
  if (!s.matches?.length) continue;
  const byType = new Map(s.groups.flatMap((g) => g.leaders.map((l) => [l.type, l.ign] as const)));
  const table = new Map<string, Challenger>();
  for (const [, gym, who, won] of s.matches) {
    const c = table.get(who) ?? { ign: who, badges: [], e4: 0 };
    table.set(who, c);
    if (!won) continue;
    if (gym.startsWith('E4')) c.e4 = Math.max(c.e4 ?? 0, Number(gym.slice(3)));
    else if (gym === 'Champion') c.champion = true;
    else {
      const leader = byType.get(gym);
      if (leader && !c.badges.includes(leader)) c.badges.push(leader);
    }
  }
  s.standings = [...table.values()];
  s.standingsAsOf ??= s.matches.reduce((d, m) => (m[0] > d ? m[0] : d), '');
}

// Pokémon type colors for the type chips. Custom E4 themes fall back to `theme`.
export const typeColors: Record<string, string> = {
  Normal: '#a8a77a', Fire: '#ee8130', Water: '#6390f0', Electric: '#f7d02c', Grass: '#7ac74c',
  Ice: '#96d9d6', Fighting: '#c22e28', Poison: '#a33ea1', Ground: '#e2bf65', Flying: '#a98ff3',
  Psychic: '#f95587', Bug: '#a6b91a', Rock: '#b6a136', Ghost: '#735797', Dragon: '#6f35fc',
  Dark: '#705746', Steel: '#b7b7ce', Fairy: '#d685ad', theme: '#5a2731',
};

// Player head images, by Minecraft username.
const id = (ign: string) => uuids[ign] ?? Object.entries(uuids).find(([k]) => k.toLowerCase() === ign.toLowerCase())?.[1] ?? encodeURIComponent(ign);
export const head = (ign: string, size = 64) => `https://mc-heads.net/avatar/${id(ign)}/${size}`;
export const body = (ign: string, size = 160) => `https://mc-heads.net/body/${id(ign)}/${size}`;
