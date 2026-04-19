/**
 * src/mock/index.ts
 * Placeholder mock data — will be populated as V1/V2 pages implement real data contracts.
 * Do NOT import real API services here; keep this purely static.
 */

export interface MockCampaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  ecosystem: string;
  updatedAt: string;
}

export interface MockSignal {
  id: string;
  keyword: string;
  volume: number;
  trend: 'up' | 'down' | 'stable';
}

export const MOCK_CAMPAIGNS: MockCampaign[] = [];

export const MOCK_SIGNALS: MockSignal[] = [];
