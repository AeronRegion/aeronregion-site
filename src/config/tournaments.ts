// ─────────────────────────────────────────────────────────────
//  TOURNAMENTS — slideshow photos and the latest bracket.
//  Add images to public/images/tournaments/ and list them here.
// ─────────────────────────────────────────────────────────────

export const challonge = 'https://challonge.com/communities/ARsmp';

// Slideshow, shown in this order.
export const slides = [
  { src: '/images/tournaments/group-1.webp', caption: 'Tournament night in the arena' },
  { src: '/images/tournaments/battle-mildflames-alkan55.webp', caption: 'MildFlames vs Alkan55' },
  { src: '/images/tournaments/group-3.webp', caption: 'Every finals ends with a photo. Be in the next one.' },
  { src: '/images/tournaments/battle-rain.webp', caption: 'MartinH2403 vs Neenocks' },
  { src: '/images/tournaments/group-2.webp', caption: 'A packed arena, cheering every match' },
  { src: '/images/tournaments/battle-trick-room.webp', caption: 'Kazuhiro75 vs toim08' },
  { src: '/images/tournaments/arena-stands.webp', caption: 'Front-row seats to every battle' },
  { src: '/images/tournaments/group-pink-hall.webp', caption: 'Come for the bracket, stay for the community' },
];

// Tournament shown under the slideshow (bracket + podium).
export const latest = {
  name: 'Regulation F Tournament',
  date: 'July 18, 2026',
  format: 'Double elimination',
  bracketImage: '/images/tournaments/bracket.webp',
  bracketLink: challonge,           // swap for the specific Challonge bracket URL
  podium: [
    { place: '1st', player: 'ThinkWeird' },
    { place: '2nd', player: 'kaelreak' },
    { place: '3rd', player: 'Sparklotix' },
  ],
};
