/**
 * src/mock/reports.ts
 * T15: Reports — 8 mock reports covering all types and statuses.
 */

import type { ReportRecord } from '../types/report';

export const MOCK_REPORTS: ReportRecord[] = [
  {
    id: 'rpt-001',
    title: 'Weekly Signal Digest — W19',
    campaignId: 'camp-001',
    type: 'weekly',
    generatedAt: '2026-05-04T23:00:00Z',
    owner: 'Alice Chen',
    status: 'ready',
  },
  {
    id: 'rpt-002',
    title: 'Monthly Campaign Performance — April',
    campaignId: 'camp-001',
    type: 'monthly',
    generatedAt: '2026-05-01T08:00:00Z',
    owner: 'Alice Chen',
    status: 'ready',
  },
  {
    id: 'rpt-003',
    title: 'Competitive Landscape Review — Q2 2026',
    campaignId: 'camp-001',
    type: 'monthly',
    generatedAt: '2026-04-15T10:00:00Z',
    owner: 'Bob Kim',
    status: 'ready',
  },
  {
    id: 'rpt-004',
    title: 'Roborock RFQ Opportunity Analysis',
    campaignId: 'camp-002',
    type: 'ad_hoc',
    generatedAt: '2026-05-05T11:00:00Z',
    owner: 'Alice Chen',
    status: 'ready',
  },
  {
    id: 'rpt-005',
    title: 'Weekly Signal Digest — W18',
    campaignId: 'camp-001',
    type: 'weekly',
    generatedAt: '2026-04-27T23:00:00Z',
    owner: 'Alice Chen',
    status: 'ready',
  },
  {
    id: 'rpt-006',
    title: 'Oppo Engagement Brief — Draft',
    campaignId: 'camp-001',
    type: 'ad_hoc',
    generatedAt: '2026-05-05T12:30:00Z',
    owner: 'Carlos Mendez',
    status: 'generating',
  },
  {
    id: 'rpt-007',
    title: 'Channel Partner Health Report',
    campaignId: 'camp-003',
    type: 'monthly',
    generatedAt: '2026-04-30T16:00:00Z',
    owner: 'Diana Wei',
    status: 'failed',
  },
  {
    id: 'rpt-008',
    title: 'Weekly Signal Digest — W17',
    campaignId: 'camp-001',
    type: 'weekly',
    generatedAt: '2026-04-20T23:00:00Z',
    owner: 'Alice Chen',
    status: 'ready',
  },
  {
    id: 'rpt-009',
    title: 'CES 2027 Booth Proposal — Early Assessment',
    campaignId: 'camp-001',
    type: 'ad_hoc',
    generatedAt: '2026-05-03T09:00:00Z',
    owner: 'Bob Kim',
    status: 'ready',
  },
];
