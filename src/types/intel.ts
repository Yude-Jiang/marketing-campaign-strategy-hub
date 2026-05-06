/**
 * src/types/intel.ts
 * V2 Control Tower intel types for T09.
 */

export interface OpportunityItem {
  id: string;
  title: string;
  rationale: string;
}

export interface RiskAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
}

export interface RecommendedAction {
  id: string;
  title: string;
  targetObject: string;
  priority: 'P1' | 'P2' | 'P3';
}

export interface CampaignIntelSnapshot {
  campaignId: string;
  health: { score: number; trend: 'up' | 'flat' | 'down' };
  kpis: { label: string; value: string; delta?: string }[];
  opportunities: OpportunityItem[];
  risks: RiskAlert[];
  recommendedActions: RecommendedAction[];
  weeklySummary: string[];
  recentSignals: { title: string; time: string }[];
}
