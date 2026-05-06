/**
 * src/types/report.ts
 * T15: Reports — report record types.
 */

export type ReportType = 'weekly' | 'monthly' | 'ad_hoc';

export type ReportStatus = 'ready' | 'generating' | 'failed';

export interface ReportRecord {
  id: string;
  title: string;
  campaignId: string;
  type: ReportType;
  generatedAt: string;
  owner: string;
  status: ReportStatus;
}
