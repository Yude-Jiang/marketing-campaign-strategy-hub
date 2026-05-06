/**
 * src/mock/campaigns.ts
 * Campaign records for V2 Campaigns list — all statuses represented.
 */

import type { CampaignRecord } from '../types/campaign';

export const MOCK_CAMPAIGNS: CampaignRecord[] = [
  {
    id: 'camp-001',
    name: 'VL53L9 Flagship dToF Launch — Global',
    linkedBriefId: 'brief-vl53l9-001',
    owner: 'Alice Chen',
    healthScore: 92,
    lastSignalAt: '2026-05-04T14:30:00Z',
    status: 'live',
  },
  {
    id: 'camp-002',
    name: 'VL53L9 Robotics Vertical Push — EU',
    linkedBriefId: 'brief-vl53l9-002',
    owner: 'Bob Martinez',
    healthScore: 78,
    lastSignalAt: '2026-05-03T09:15:00Z',
    status: 'live',
  },
  {
    id: 'camp-003',
    name: 'ST ToF Automotive In-Cabin Seed',
    linkedBriefId: 'brief-auto-001',
    owner: 'Carol Li',
    healthScore: 65,
    lastSignalAt: '2026-05-02T11:00:00Z',
    status: 'monitoring',
  },
  {
    id: 'camp-004',
    name: 'Smart Building Presence Detection — China',
    linkedBriefId: 'brief-smart-001',
    owner: 'David Park',
    healthScore: 45,
    lastSignalAt: '2026-04-28T16:45:00Z',
    status: 'optimizing',
  },
  {
    id: 'camp-005',
    name: 'VL53L9 Developer Campaign — H1 2026',
    linkedBriefId: 'brief-dev-001',
    owner: 'Eva Johansson',
    healthScore: 88,
    lastSignalAt: '2026-05-01T08:30:00Z',
    status: 'archived',
  },
  {
    id: 'camp-006',
    name: 'Competitive Displacement — TI OPT3101',
    linkedBriefId: 'brief-comp-001',
    owner: 'Frank Zhang',
    healthScore: 0,
    lastSignalAt: '',
    status: 'draft',
  },
  {
    id: 'camp-007',
    name: 'VL53L9 Japan Smartphone OEM Program',
    linkedBriefId: 'brief-jp-001',
    owner: 'Yuki Tanaka',
    healthScore: 71,
    lastSignalAt: '2026-05-04T07:00:00Z',
    status: 'live',
  },
  {
    id: 'camp-008',
    name: 'Q3 2026 Trade Show Campaign — MWC + CES',
    linkedBriefId: 'brief-event-001',
    owner: 'Alice Chen',
    healthScore: 30,
    lastSignalAt: '2026-04-25T13:20:00Z',
    status: 'optimizing',
  },
];
