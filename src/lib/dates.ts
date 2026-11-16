// '16 NOV' on top, '2026' underneath.
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
export const dayMonth = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
export const year = (d: Date) => String(d.getUTCFullYear());
export const toDate = (iso: string | Date) => (iso instanceof Date ? iso : new Date(iso + 'T00:00:00Z'));
