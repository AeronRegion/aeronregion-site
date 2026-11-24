// ─────────────────────────────────────────────────────────────
//  TOURNAMENTS — slideshow photos and every tournament's results.
//  Add images to public/images/tournaments/ and list them here.
// ─────────────────────────────────────────────────────────────

export const challonge = 'https://challonge.com/communities/ARsmp';

// Slideshow, shown in this order.
export const slides = [
  { src: '/images/tournaments/group-1.webp', caption: 'Tournament night in the arena' },
  { src: '/images/tournaments/group-regionals-draw.webp', caption: 'The Regionals Draw lineup. Your team could be next.' },
  { src: '/images/tournaments/battle-mildflames-alkan55.webp', caption: 'MildFlames vs Alkan55' },
  { src: '/images/tournaments/group-3.webp', caption: 'Every finals ends with a photo. Be in the next one.' },
  { src: '/images/tournaments/battle-rain.webp', caption: 'MartinH2403 vs Neenocks' },
  { src: '/images/tournaments/group-2.webp', caption: 'A packed arena, cheering every match' },
  { src: '/images/tournaments/battle-trick-room.webp', caption: 'Kazuhiro75 vs toim08' },
  { src: '/images/tournaments/arena-stands.webp', caption: 'Front-row seats to every battle' },
  { src: '/images/tournaments/group-pink-hall.webp', caption: 'Come for the bracket, stay for the community' },
];

export type Tournament = {
  name: string;
  date: string;            // YYYY-MM-DD
  format: string;
  players: number;
  playersLabel?: string;   // e.g. 'teams' for team events (default 'players')
  bracket: string;         // image in public/images/tournaments/brackets/
  podium: { place: string; player: string }[];
  link?: string;           // the event's own Challonge URL, if you have it
};

// Newest first. The first entry is featured as the latest tournament.
// To add one: copy a block, put it at the top, and drop its bracket image in brackets/.
export const tournaments: Tournament[] = [
  {
    name: 'Regionals Draw',
    date: '2026-11-22',
    format: 'Single elimination, 2v2',
    players: 8,
    playersLabel: 'teams',
    bracket: '/images/tournaments/brackets/2026-11-22-regionals-draw.webp',
    link: 'https://challonge.com/rlzzk4nf',
    podium: [
      { place: '1st', player: 'The Swift Swamperts' },
      { place: '2nd', player: 'Paldea’s Finest Tacos & Adobo' },
      { place: '3rd', player: 'We Love Kalos!' },
    ],
  },
  {
    name: 'Double Trouble Multibattle',
    date: '2026-11-15',
    format: 'Single elimination',
    players: 8,
    playersLabel: 'teams',
    bracket: '/images/tournaments/brackets/2026-11-15-double-trouble.webp',
    podium: [
      { place: '1st', player: 'Team Ignition' },
      { place: '2nd', player: 'Five Nights At Trick Room' },
      { place: '3rd', player: 'Yin-Yang & idk man' },
    ],
  },
  {
    name: 'Monotype Scramble',
    date: '2026-11-07',
    format: 'Single elimination',
    players: 10,
    bracket: '/images/tournaments/brackets/2026-11-07-monotype-scramble.webp',
    podium: [
      { place: '1st', player: 'jemorpe1' },
      { place: '2nd', player: 'Scav' },
      { place: '3rd', player: 'DinoBug7278 & Sparklotix' },
    ],
  },
  {
    name: 'G-Max Battle',
    date: '2026-11-01',
    format: 'Single elimination',
    players: 13,
    bracket: '/images/tournaments/brackets/2026-11-01-gmax.webp',
    podium: [
      { place: '1st', player: 'bluetang' },
      { place: '2nd', player: 'Hydrah' },
      { place: '3rd', player: 'Scavarodka & DinoBug7278' },
    ],
  },
  {
    name: '[AR] Reg F',
    date: '2026-10-24',
    format: 'Double elimination',
    players: 12,
    bracket: '/images/tournaments/brackets/2026-10-24-reg-f.webp',
    podium: [
      { place: '1st', player: 'Jemorpe' },
      { place: '2nd', player: 'IgnacioWey' },
      { place: '3rd', player: 'Sparklotix' },
    ],
  },
  {
    name: 'VGC Reg H',
    date: '2026-09-12',
    format: 'Double elimination',
    players: 13,
    bracket: '/images/tournaments/brackets/2026-09-12-reg-h.webp',
    podium: [
      { place: '1st', player: 'devdragon14' },
      { place: '2nd', player: 'Sparklotix' },
      { place: '3rd', player: 'MildFlames' },
    ],
  },
  {
    name: 'VGC Modified Reg. F #2',
    date: '2026-08-29',
    format: 'Double elimination',
    players: 9,
    bracket: '/images/tournaments/brackets/2026-08-29-reg-f-2.webp',
    podium: [
      { place: '1st', player: 'JCDelirious' },
      { place: '2nd', player: 'Nyanatsu' },
      { place: '3rd', player: 'MildFlames' },
    ],
  },
  {
    name: '[AR] Mod. Regulation F',
    date: '2026-08-15',
    format: 'Double elimination',
    players: 13,
    bracket: '/images/tournaments/brackets/2026-08-15-mod-reg-f.webp',
    podium: [
      { place: '1st', player: 'adrift_gecko' },
      { place: '2nd', player: 'Sparklotix' },
      { place: '3rd', player: 'IgnacioWey' },
    ],
  },
  {
    name: 'Regulation F Tournament',
    date: '2026-07-18',
    format: 'Double elimination',
    players: 16,
    bracket: '/images/tournaments/brackets/2026-07-18-reg-f.webp',
    podium: [
      { place: '1st', player: 'ThinkWeird' },
      { place: '2nd', player: 'kaelreak' },
      { place: '3rd', player: 'Sparklotix' },
    ],
  },
  {
    name: '[AR] First Singles Tournament',
    date: '2026-07-05',
    format: 'Double elimination',
    players: 9,
    bracket: '/images/tournaments/brackets/2026-07-05-first-singles.webp',
    podium: [
      { place: '1st', player: 'monotropics' },
      { place: '2nd', player: 'IgnacioWey' },
      { place: '3rd', player: 'ThinkWeird' },
    ],
  },
];
