// ─────────────────────────────────────────────────────────────
//  TOURNAMENTS — slideshow photos and the latest bracket.
//  Add images to public/images/tournaments/ and list them here.
// ─────────────────────────────────────────────────────────────

export const challonge = 'https://challonge.com/communities/ARsmp';

// Slideshow, shown in this order.
export const slides = [
  { src: '/images/tournaments/group-1.webp', caption: 'Tournament night in the arena' },
  { src: '/images/tournaments/battle-mildflames-alkan55.webp', caption: 'MildFlames vs Alkan55' },
  { src: '/images/tournaments/group-3.webp', caption: 'Players and their partners after the finals' },
  { src: '/images/tournaments/battle-rain.webp', caption: 'MartinH2403 vs Neenocks, under rain' },
  { src: '/images/tournaments/group-2.webp', caption: 'Group photo in the arena' },
  { src: '/images/tournaments/battle-trick-room.webp', caption: 'Kazuhiro75 vs toim08, Trick Room and snow' },
  { src: '/images/tournaments/arena-stands.webp', caption: 'The view from the stands' },
  { src: '/images/tournaments/group-pink-hall.webp', caption: 'The community in the blossom hall' },
];

// Most recent finished tournament. Update after each event.
export const latest = {
  name: 'Latest tournament',        // e.g. '[AR] Doubles Tournament'
  format: 'Double elimination',
  bracketImage: '/images/tournaments/bracket.webp',
  bracketLink: challonge,           // swap for the specific Challonge bracket URL
  podium: [
    { place: '1st', player: 'ThinkWeird' },
    { place: '2nd', player: 'kaelreak' },
    { place: '3rd', player: 'Sparklotix' },
  ],
};
