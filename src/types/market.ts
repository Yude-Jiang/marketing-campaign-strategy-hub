/**
 * src/types/market.ts
 * Market Mapping types for T04.
 */

export type MarketMappingStatus =
  | 'idle'
  | 'generating'
  | 'needs_review'
  | 'locked'
  | 'error';

export interface BuyerPersona {
  role: string;
  responsibilities: string[];
  painPoints: string[];
}

export interface UseCase {
  name: string;
  scenario: string;
  valueDelivered: string;
}

export interface CompetitorCard {
  name: string;
  positioning: string;
  strengths: string[];
  weaknesses: string[];
}

export interface MarketInterpretationModel {
  personas: BuyerPersona[];
  industries: string[];
  useCases: UseCase[];
  competitors: CompetitorCard[];
  buyerNeeds: string[];
  adoptionBarriers: string[];
  narratives: string[];
}
