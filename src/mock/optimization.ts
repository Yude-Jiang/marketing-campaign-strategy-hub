/**
 * src/mock/optimization.ts
 * T13: Optimization Center — 8 mock recommendations across all target types.
 */

import type { OptimizationRecommendation } from '../types/optimization';

export const MOCK_RECOMMENDATIONS: OptimizationRecommendation[] = [
  {
    id: 'opt-001',
    title: 'Refresh brief budget allocation: underweight on LinkedIn',
    reason:
      'Signal Radar detected rising "dToF" search intent from engineering audiences. Current brief allocates only 10 % to LinkedIn — below the 22 % industry benchmark for B2B semiconductor campaigns.',
    targetObject: { type: 'brief', refId: 'brief-vl53l9-001' },
    suggestedChange:
      'Increase LinkedIn allocation from 10 % to 20 %, offset by reducing print/events from 15 % to 10 %. Total budget unchanged at $1.2 M.',
    impactSummary:
      'Expected +18 % MQL from engineering segment based on historical LinkedIn CPC benchmarks. Reach an estimated 4 500 additional engineers per quarter.',
    priority: 'P1',
    status: 'queued',
    createdAt: '2026-05-05T09:00:00Z',
  },
  {
    id: 'opt-002',
    title: 'Update strategy messaging: add ambient-light pillar',
    reason:
      'War Room analysis shows ams OSRAM cannot counter VL53L9 ambient-light resilience. This is a clear differentiator not yet prominent in current strategy pack.',
    targetObject: { type: 'strategy', refId: 'strategy-vl53l9-001' },
    suggestedChange:
      'Add "Ambient-Light Leadership" as a 5th strategic priority with dedicated channel tactics and measurement targets.',
    impactSummary:
      'Strengthens differentiation vs TMF8820 in outdoor AF use cases. Estimated 15 % improvement in win rate for smartphone OEM RFQs citing outdoor camera performance.',
    priority: 'P1',
    status: 'queued',
    createdAt: '2026-05-05T08:30:00Z',
  },
  {
    id: 'opt-003',
    title: 'Replace outdated competitor benchmark in datasheet',
    reason:
      'Current VL53L9 datasheet Rev A references TMF8820 preliminary specs from 2025. Updated specs show 15 % lower pricing and 9-zone capability. Benchmarks need revision.',
    targetObject: { type: 'asset', refId: 'asset-ds-001' },
    suggestedChange:
      'Publish datasheet Rev B with updated competitive benchmark table, adding ambient-light comparison row and system-BOM analysis.',
    impactSummary:
      'Removes potential customer objection based on outdated competitor data. Prevents FAE time wasted explaining delta between published and current specs.',
    priority: 'P1',
    status: 'queued',
    createdAt: '2026-05-04T16:00:00Z',
  },
  {
    id: 'opt-004',
    title: 'Rebalance channel mix: boost DigiKey co-op marketing',
    reason:
      'Distributor eval-kit inventory below safety stock (Signal Radar sig-010). Co-op marketing spend with DigiKey is 30 % lower than Arrow despite similar revenue contribution.',
    targetObject: { type: 'channel', refId: 'channel-disty-001' },
    suggestedChange:
      'Increase DigiKey MDF from $12 K to $18 K per quarter, funded by reducing underperforming regional event spend.',
    impactSummary:
      'Estimated +25 % eval-kit velocity through DigiKey, improving inventory coverage to 4 weeks safety stock within 60 days.',
    priority: 'P2',
    status: 'queued',
    createdAt: '2026-05-04T14:00:00Z',
  },
  {
    id: 'opt-005',
    title: 'Create robotics-focused application note',
    reason:
      'TI OPT3101 ROS 2 reference design launch (sig-002) is gaining traction. ST lacks equivalent content for VL53L9 in robotics segment.',
    targetObject: { type: 'asset', refId: 'asset-an-001' },
    suggestedChange:
      'Develop 8-page application note: "VL53L9 for Robotics Obstacle Avoidance" with ROS 2 integration guide and range-benchmark vs OPT3101.',
    impactSummary:
      'Closes content gap identified in War Room. Provides FAEs with a rebuttal asset for robotics opportunities. Potential to influence 3+ active robotics RFQs.',
    priority: 'P2',
    status: 'queued',
    createdAt: '2026-05-04T11:00:00Z',
  },
  {
    id: 'opt-006',
    title: 'Adjust audience targeting: prioritize Roborock RFQ',
    reason:
      'Roborock RFQ for dToF obstacle detection (sig-008) matches VL53L9 capabilities. Current campaign does not explicitly target home robotics OEMs.',
    targetObject: { type: 'brief', refId: 'brief-vl53l9-001' },
    suggestedChange:
      'Add "Home Robotics OEM" as a secondary audience segment with dedicated messaging track targeting 8–12 m range requirement.',
    impactSummary:
      'Opens new revenue stream beyond smartphone AF. Roborock RFQ alone estimated at 500 K units/year at $2.15 ASP.',
    priority: 'P2',
    status: 'queued',
    createdAt: '2026-05-03T15:00:00Z',
  },
  {
    id: 'opt-007',
    title: 'Snooze CES 2027 booth decision until Q3 planning cycle',
    reason:
      'CES 2027 booth registration is open with early-bird pricing (sig-016), but Q3 2026 budget planning cycle is the appropriate time to evaluate.',
    targetObject: { type: 'channel', refId: 'channel-events-001' },
    suggestedChange:
      'Log CES 2027 as a Q3 planning agenda item. No action required before July 2026 early-bird deadline.',
    impactSummary:
      'Prevents premature budget commitment. Allows alignment with broader 2027 trade-show strategy being developed in Q3.',
    priority: 'P3',
    status: 'snoozed',
    createdAt: '2026-05-03T10:00:00Z',
  },
  {
    id: 'opt-008',
    title: 'Update Oppo engagement collateral with AF benchmark',
    reason:
      'Oppo camera team downloaded VL53L9 datasheet 3× this week (sig-007). Existing collateral lacks direct AF benchmark comparison vs Sony IMX global-shutter.',
    targetObject: { type: 'asset', refId: 'asset-collateral-001' },
    suggestedChange:
      'Create 2-page Oppo-specific AF benchmark brief: VL53L9 vs Sony IMX global-shutter, focusing on low-light AF speed and CEP.',
    impactSummary:
      'Capitalises on active evaluation window. Timely collateral could influence Oppo 2027 flagship AF sensor selection currently estimated at $3.2 M annual revenue.',
    priority: 'P1',
    status: 'queued',
    createdAt: '2026-05-05T07:00:00Z',
  },
];
