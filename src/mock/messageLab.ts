/**
 * src/mock/messageLab.ts
 * T12: Audience & Message Lab — mock resonance matrix data.
 * 4 audiences × 4 message pillars = 16 resonance cells.
 */

import type { MessagePillar, AudienceSegment, ResonanceCell } from '../types/message';

// ─── Message pillars ────────────────────────────────────────────────────────────

export const MOCK_PILLARS: MessagePillar[] = [
  {
    id: 'pillar-tech',
    name: 'Technical Leadership',
    coreIdea:
      'VL53L9 delivers superior ambient-light resilience (120 klux) and ML-enhanced AF accuracy vs. any single-zone or 4-zone competitor.',
  },
  {
    id: 'pillar-eco',
    name: 'Ecosystem Advantage',
    coreIdea:
      'STM32CubeMX integration, reference drivers, and 3× larger FAE network mean faster time-to-market than proprietary alternatives.',
  },
  {
    id: 'pillar-power',
    name: 'Power Efficiency',
    coreIdea:
      'Industry-leading 22 µA idle current enables always-on AF without battery penalty — critical for all-day flagship experience.',
  },
  {
    id: 'pillar-supply',
    name: 'Supply & Scale',
    coreIdea:
      'Dual-source manufacturing, 12-week lead time, and existing tier-1 qualification reduce supply-chain risk vs. single-source competitors.',
  },
];

// ─── Audience segments ──────────────────────────────────────────────────────────

export const MOCK_AUDIENCES: AudienceSegment[] = [
  {
    id: 'aud-smartphone',
    label: 'Smartphone OEMs',
    role: 'Product Engineering / Procurement',
  },
  {
    id: 'aud-robotics',
    label: 'Robotics Manufacturers',
    role: 'Systems Engineering',
  },
  {
    id: 'aud-distributor',
    label: 'Distributors & FAEs',
    role: 'Field Application Engineering',
  },
  {
    id: 'aud-analyst',
    label: 'Analysts & Media',
    role: 'Industry Analysts / Tech Press',
  },
];

// ─── Resonance matrix (score 1–5) ───────────────────────────────────────────────

export const MOCK_RESONANCE: ResonanceCell[] = [
  // Smartphone OEMs
  { audienceId: 'aud-smartphone', pillarId: 'pillar-tech',  score: 5, notes: 'Strongest resonance — ambient light resilience is key differentiator for outdoor AF.' },
  { audienceId: 'aud-smartphone', pillarId: 'pillar-eco',   score: 3, notes: 'Ecosystem valued but not decisive; OEMs have internal tooling.' },
  { audienceId: 'aud-smartphone', pillarId: 'pillar-power',  score: 4, notes: 'Critical for always-on AF flag. 22 µA vs 45 µA resonates with battery team.' },
  { audienceId: 'aud-smartphone', pillarId: 'pillar-supply', score: 4, notes: 'Dual-source is table stakes. Lead time advantage noted by procurement.' },

  // Robotics Manufacturers
  { audienceId: 'aud-robotics', pillarId: 'pillar-tech',  score: 3, notes: 'Range matters more than zone count. Multi-zone less relevant for obstacle avoidance.' },
  { audienceId: 'aud-robotics', pillarId: 'pillar-eco',   score: 5, notes: 'ROS 2 + STM32Cube is decisive. Closes gap with TI OPT3101 ecosystem.' },
  { audienceId: 'aud-robotics', pillarId: 'pillar-power',  score: 2, notes: 'Power less critical in mains-powered or large-battery robotics platforms.' },
  { audienceId: 'aud-robotics', pillarId: 'pillar-supply', score: 3, notes: 'Standard concern. No strong differentiation vs TI or ams OSRAM.' },

  // Distributors & FAEs
  { audienceId: 'aud-distributor', pillarId: 'pillar-tech',  score: 4, notes: 'Easy to demo — zone-count advantage is a clear sales hook for FAEs.' },
  { audienceId: 'aud-distributor', pillarId: 'pillar-eco',   score: 4, notes: 'FAEs value ST toolchain; reduces their customer-support overhead.' },
  { audienceId: 'aud-distributor', pillarId: 'pillar-power',  score: 3, notes: 'Moderate interest. Depends on customer segment they serve.' },
  { audienceId: 'aud-distributor', pillarId: 'pillar-supply', score: 5, notes: 'Top concern for distributors. Reliable supply = reliable revenue.' },

  // Analysts & Media
  { audienceId: 'aud-analyst', pillarId: 'pillar-tech',  score: 4, notes: 'Compelling narrative — "ML meets ToF" story works well in analyst briefings.' },
  { audienceId: 'aud-analyst', pillarId: 'pillar-eco',   score: 2, notes: 'Ecosystem differentiation is too technical for general tech press.' },
  { audienceId: 'aud-analyst', pillarId: 'pillar-power',  score: 3, notes: 'Moderate. Good for power-efficiency-focused publications.' },
  { audienceId: 'aud-analyst', pillarId: 'pillar-supply', score: 2, notes: 'Supply chain story is undifferentiated vs. broader ST narrative.' },
];

// ─── Objections / proof gaps per cell ───────────────────────────────────────────

export interface CellObjection {
  cellKey: string; // `audienceId:pillarId`
  objection: string;
  proofGap: string;
}

export const MOCK_OBJECTIONS: CellObjection[] = [
  {
    cellKey: 'aud-smartphone:pillar-tech',
    objection: 'Zone count advantage diminishes if competitor also adds ML with next-gen driver.',
    proofGap: 'No published third-party benchmark comparing CEP across lighting conditions.',
  },
  {
    cellKey: 'aud-smartphone:pillar-power',
    objection: 'System-level power depends on host processor, not just sensor idle current.',
    proofGap: 'Need system-level power model comparing VL53L9 + STM32 vs TMF8820 + Qualcomm.',
  },
  {
    cellKey: 'aud-robotics:pillar-eco',
    objection: 'TI OPT3101 ROS 2 support is production-ready now; ST ROS 2 drivers are still beta.',
    proofGap: 'ROS 2 beta roadmap not published externally. Need firm Q3 2026 commitment.',
  },
  {
    cellKey: 'aud-distributor:pillar-supply',
    objection: 'Dual-source is standard across the industry. Not a differentiator.',
    proofGap: 'Need data on competitor lead-time variability and allocation history to substantiate claim.',
  },
  {
    cellKey: 'aud-analyst:pillar-tech',
    objection: '"ML-enhanced AF" is a marketing term without published methodology.',
    proofGap: 'Need a technical white paper describing ML model architecture and training data.',
  },
];

// ─── Suggested improvements ─────────────────────────────────────────────────────

export interface ImprovementSuggestion {
  id: string;
  cellKey: string; // `audienceId:pillarId`
  suggestion: string;
}

export const MOCK_IMPROVEMENTS: ImprovementSuggestion[] = [
  {
    id: 'imp-001',
    cellKey: 'aud-smartphone:pillar-tech',
    suggestion: 'Commission third-party CEP benchmark with eLab / Fraunhofer to validate ambient-light claims.',
  },
  {
    id: 'imp-002',
    cellKey: 'aud-smartphone:pillar-power',
    suggestion: 'Develop system-level power model (Excel tool) for OEM system architects.',
  },
  {
    id: 'imp-003',
    cellKey: 'aud-robotics:pillar-eco',
    suggestion: 'Publish ROS 2 driver beta with firm GA timeline to counter TI narrative.',
  },
  {
    id: 'imp-004',
    cellKey: 'aud-distributor:pillar-supply',
    suggestion: 'Prepare supply-chain reliability datasheet with lead-time comparison vs top 3 competitors.',
  },
  {
    id: 'imp-005',
    cellKey: 'aud-analyst:pillar-tech',
    suggestion: 'Draft technical white paper on ML model architecture for analyst briefing.',
  },
  {
    id: 'imp-006',
    cellKey: 'aud-distributor:pillar-tech',
    suggestion: 'Create FAE demo script highlighting zone-count advantage in common sales scenarios.',
  },
];
