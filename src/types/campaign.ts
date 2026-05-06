/**
 * src/types/campaign.ts
 * Campaign list types for T08 (V2 entry).
 */

export type CampaignLifecycleStatus =
  | 'live'
  | 'monitoring'
  | 'optimizing'
  | 'archived'
  | 'draft';

export interface CampaignRecord {
  id: string;
  name: string;
  linkedBriefId: string;
  owner: string;
  healthScore: number;
  lastSignalAt: string;
  status: CampaignLifecycleStatus;
}
