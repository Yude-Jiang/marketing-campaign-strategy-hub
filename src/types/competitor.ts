/**
 * src/types/competitor.ts
 * T11: Competitive War Room — competitor intelligence types.
 */

export interface ClaimItem {
  text: string;
  source?: string;
  first_seen_at?: string;
}

export interface DifferentiationGap {
  area: string;
  gapDescription: string;
}

export interface RebuttalSuggestion {
  pillar: string;
  angle: string;
  evidenceHint?: string;
}

export interface CompetitorIntel {
  id: string;
  name: string;
  summary: string;
  claims: ClaimItem[];
  narrativeShifts: { date: string; change: string }[];
  gaps: DifferentiationGap[];
  rebuttals: RebuttalSuggestion[];
}
