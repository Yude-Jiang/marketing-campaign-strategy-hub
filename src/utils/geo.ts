const EUROPE_KEYWORDS = [
  'europe', 'eu ', 'eu,', 'emea', '欧洲', '欧盟', 'europa',
  'france', 'germany', 'deutschland', 'united kingdom', 'britain',
  'netherlands', 'spain', 'italy', 'nordic', 'scandinavia',
  'benelux', 'swiss', 'austria', 'belgium', 'poland', 'czech',
];

export function isEuropeRegion(region?: string): boolean {
  if (!region) return false;
  const lower = region.toLowerCase();
  return EUROPE_KEYWORDS.some(kw => lower.includes(kw));
}
