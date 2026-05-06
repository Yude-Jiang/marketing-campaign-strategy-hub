/**
 * src/types/optimization.ts
 * T13: Optimization Center — recommendation types.
 */

export type RecommendationPriority = 'P1' | 'P2' | 'P3';

export type RecommendationStatus = 'queued' | 'approved' | 'modified' | 'rejected' | 'snoozed';

export interface OptimizationRecommendation {
  id: string;
  title: string;
  reason: string;
  targetObject: {
    type: 'brief' | 'strategy' | 'asset' | 'channel';
    refId: string;
  };
  suggestedChange: string;
  impactSummary: string;
  priority: RecommendationPriority;
  status: RecommendationStatus;
  createdAt: string;
}
