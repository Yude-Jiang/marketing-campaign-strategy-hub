/**
 * src/types/activation.ts
 * Activation Studio asset types for T07.
 */

export type AssetType =
  | 'landing_page'
  | 'paid_ad'
  | 'faq'
  | 'battlecard'
  | 'deck'
  | 'email_sequence';

export type AssetStatus =
  | 'planning'
  | 'generating'
  | 'ready_for_review'
  | 'approved'
  | 'handoff'
  | 'error';

export interface AssetVersionRecord {
  version: number;
  createdAt: string;
  summary: string;
}

export interface AssetRecord {
  id: string;
  type: AssetType;
  title: string;
  owner?: string;
  status: AssetStatus;
  versions: AssetVersionRecord[];
  contentPreview?: string;
}
