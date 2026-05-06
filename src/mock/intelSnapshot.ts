/**
 * src/mock/intelSnapshot.ts
 * Mock CampaignIntelSnapshot for the VL53L9 flagship campaign.
 */

import type { CampaignIntelSnapshot } from '../types/intel';

export const MOCK_INTEL_SNAPSHOT: CampaignIntelSnapshot = {
  campaignId: 'camp-001',
  health: { score: 92, trend: 'up' },
  kpis: [
    { label: 'Share of Voice',        value: '28 %',   delta: '+3 pp' },
    { label: 'Design-In Reg.',        value: '47',     delta: '+12' },
    { label: 'MQL Velocity',          value: '38 d',   delta: '-7 d' },
    { label: 'Eval Kit Conv. Rate',   value: '18 %',   delta: '+2 pp' },
    { label: 'Press Mentions (WTD)',  value: '12',     delta: '+5' },
    { label: 'Web Traffic (WTD)',     value: '8.4 K',  delta: '+22 %' },
  ],
  opportunities: [
    { id: 'opp-001', title: 'Smartphone OEM Design Win — Oppo X6 Series', rationale: 'Oppo engineering team has requested VL53L9 eval kit; early engagement converting to design-in registration.' },
    { id: 'opp-002', title: 'Robot Vacuum Tier-2 — Roborock QY23', rationale: 'Roborock RFQ for dToF-based obstacle avoidance; VL53L9 lead on range and package size vs. TMF8820.' },
    { id: 'opp-003', title: 'Smart Building — Siemens BMS Pilot', rationale: 'Siemens smart building group evaluating VL53L9 for presence detection; pilot order of 500 units requested.' },
  ],
  risks: [
    { id: 'risk-001', title: 'Competitor TMF8820 price reduction by ams OSRAM (—15 %)', severity: 'high' },
    { id: 'risk-002', title: 'VL53L9 cover glass calibration support ticket spike (+40 % WoW)', severity: 'medium' },
    { id: 'risk-003', title: 'Key smartphone OEM (Xiaomi) delaying AF module decision to Q4', severity: 'medium' },
    { id: 'risk-004', title: 'ST distributor inventory of eval kits below safety stock (3 weeks)', severity: 'low' },
  ],
  recommendedActions: [
    { id: 'act-001', title: 'Expedite Oppo design-in engineering support', targetObject: '/signal-radar?focus=oppo', priority: 'P1' },
    { id: 'act-002', title: 'Create cover glass application note and publish', targetObject: '/message-lab?focus=tech-pub', priority: 'P1' },
    { id: 'act-003', title: 'Schedule competitive pricing review with product line', targetObject: '/war-room?topic=pricing', priority: 'P2' },
    { id: 'act-004', title: 'Replenish eval kit inventory at top 3 distributors', targetObject: '/integrations?focus=disti', priority: 'P2' },
  ],
  weeklySummary: [
    '3 new design-in registrations this week (Oppo, Roborock, Siemens)',
    'Share of voice increased to 28 % (+3 pp), now leading TMF8820 by 5 pp',
    'Support ticket volume up 40 % on cover glass calibration — action item opened',
    'Distributor FAE training completion rate reached 82 % this quarter',
    'Competitor ams OSRAM reduced TMF8820 pricing — competitive review initiated',
  ],
  recentSignals: [
    { title: 'Oppo camera team downloaded VL53L9 datasheet (3× this week)',      time: '2h ago' },
    { title: 'Roborock RFQ for dToF obstacle detection published on sourcing portal', time: '5h ago' },
    { title: 'ams OSRAM blog post: "TMF8820 multi-zone breakthrough" detected',    time: '12h ago' },
    { title: 'Siemens building technologies — VL53L9 pilot order placed',          time: '1d ago' },
    { title: 'Xiaomi AF module RFP timeline pushed to Q4 2026',                    time: '2d ago' },
  ],
};
