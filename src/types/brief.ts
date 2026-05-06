/**
 * src/types/brief.ts
 * Campaign Brief types for T05.
 */

export type BriefStatus =
  | 'draft'
  | 'generating'
  | 'ready'
  | 'locked'
  | 'error';

export interface CampaignOverview {
  name: string;
  productFamily: string;
  brand: string;
  timing: string;
}

export interface ChannelSplit {
  channel: string;
  amount: number;
}

export interface CampaignBriefModel {
  campaignOverview: CampaignOverview;
  objectives: string[];
  audience: { primary: string[]; secondary: string[]; };
  competitors: string[];
  offer: { headline: string; proofs: string[]; };
  keyUseCases: string[];
  budget: { total: number; splits: ChannelSplit[] };
  timing: { start: string; end: string; };
  tags: string[];
}
