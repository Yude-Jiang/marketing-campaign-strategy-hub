/**
 * src/mock/competitors.ts
 * T11: Competitive War Room — mock competitor intelligence data.
 * 3 competitors spanning direct ToF rivals and adjacent depth-sensing threats.
 */

import type { CompetitorIntel } from '../types/competitor';

export const MOCK_COMPETITORS: CompetitorIntel[] = [
  // ──────────────────────────────────────────────────────────────────────────────
  // ams OSRAM — TMF8820 direct competitor
  // ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'comp-ams',
    name: 'ams OSRAM',
    summary:
      'ams OSRAM positions the TMF8820 as a drop-in alternative to VL53L9 with superior multi-zone sensing (9 vs 4 zones) at a 15 % lower BOM. Their go-to-market emphasises "production ready" qualification and existing design wins at tier-2 smartphone OEMs. Recent price action signals aggressive share capture in the mid-tier AF segment.',
    claims: [
      {
        text: 'TMF8820 supports 9 independent sensing zones vs 4 on VL53L9, enabling more granular AF decisions.',
        source: 'ams OSRAM product brief v2.3',
        first_seen_at: '2026-04-15',
      },
      {
        text: 'Qualified at 3 tier-2 smartphone OEMs with combined annual volume exceeding 50 M units.',
        source: 'ams OSRAM Q1 2026 earnings call',
        first_seen_at: '2026-04-28',
      },
      {
        text: 'BOM cost 15 % lower than VL53L9 at volumes above 10 K units.',
        source: 'Published price list Apr 2026',
        first_seen_at: '2026-05-04',
      },
      {
        text: 'Common API across TMF family reduces qualification effort when scaling across price tiers.',
        source: 'Distributor FAE briefing deck',
        first_seen_at: '2026-04-20',
      },
    ],
    narrativeShifts: [
      { date: '2026-04-01', change: 'Price focus: "lowest cost per zone" replaces earlier "premium performance" messaging.' },
      { date: '2026-04-15', change: 'Product brief updated to highlight multi-zone counts directly vs ST.' },
      { date: '2026-04-28', change: 'Earnings call emphasises "design-win velocity" — signalling volume over margin.' },
      { date: '2026-05-04', change: 'Aggressive price list published; 15 % reduction on TMF8820.' },
    ],
    gaps: [
      {
        area: 'Ambient light resilience',
        gapDescription:
          'TMF8820 spec sheet shows reduced accuracy above 80 klux. VL53L9 maintains linearity to 120 klux — a meaningful advantage for outdoor AF use cases.',
      },
      {
        area: 'Ecosystem & tools',
        gapDescription:
          'ST provides STM32CubeMX integration, reference drivers, and a larger FAE network. ams OSRAM tooling is proprietary and less widely adopted.',
      },
      {
        area: 'Power efficiency',
        gapDescription:
          'TMF8820 idle current is 45 µA vs VL53L9 at 22 µA. Battery-conscious OEMs may prefer ST for always-on AF scenarios.',
      },
    ],
    rebuttals: [
      {
        pillar: 'Zone count',
        angle:
          'Zone quantity alone does not improve AF accuracy without corresponding optics and algorithm investment. VL53L9 4-zone implementation with ST proprietary ML achieves equivalent or better real-world CEP.',
        evidenceHint: 'Internal benchmark data comparing CEP vs zone count across lighting conditions.',
      },
      {
        pillar: 'BOM cost',
        angle:
          'System-level BOM is narrower than component pricing suggests. VL53L9 eliminates need for external ambient light sensor and offers integrated EMI shielding, offsetting the unit price delta.',
        evidenceHint: 'System BOM comparison spreadsheet — engage product marketing.',
      },
      {
        pillar: 'Design-win velocity',
        angle:
          'Tier-2 design wins do not translate to tier-1 qualification cycles. VL53L9 is already in active evaluation at 3 of top 5 global smartphone OEMs with shorter remaining qualification runway.',
        evidenceHint: 'OEM engagement tracker in Salesforce — contact regional sales lead.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // Texas Instruments — OPT3101 indirect competitor (robotics / industrial)
  // ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'comp-ti',
    name: 'Texas Instruments',
    summary:
      'TI targets the robotics and industrial ToF segment with the OPT3101, emphasising long-range (up to 15 m) and ROS 2 integration. While not a direct smartphone AF competitor, TI is building mindshare in adjacent segments where VL53L9 is expanding. Their reference design ecosystem lowers switching costs for multi-segment customers.',
    claims: [
      {
        text: 'OPT3101 offers 15 m range with < 1 cm accuracy at 120 fps, exceeding dToF alternatives in robotics use cases.',
        source: 'TI OPT3101 datasheet Rev F',
        first_seen_at: '2026-03-20',
      },
      {
        text: 'New reference design includes ROS 2 drivers and Gazebo simulation models, reducing integration time to 2 weeks.',
        source: 'TI robotics blog post',
        first_seen_at: '2026-05-04',
      },
      {
        text: 'Pricing at $2.85/ku undercuts VL53L9 in industrial volumes by approximately 18 %.',
        source: 'TI.com published pricing May 2026',
        first_seen_at: '2026-05-01',
      },
    ],
    narrativeShifts: [
      { date: '2026-03-20', change: 'Datasheet refresh highlights 15 m range — positioning against dToF.' },
      { date: '2026-04-10', change: 'Ecosystem play: announces ROS 2 driver development partnership.' },
      { date: '2026-05-04', change: 'Reference design launch with full ROS 2 support and simulation toolkit.' },
    ],
    gaps: [
      {
        area: 'Smartphone AF fit',
        gapDescription:
          'OPT3101 is a lidar-style pulsed ToF not optimised for the short-range, low-latency AF use case. No smartphone design win history.',
      },
      {
        area: 'Multi-zone capability',
        gapDescription:
          'OPT3101 supports only a single zone. For applications requiring depth mapping across a field of view, VL53L9 multi-zone architecture is superior.',
      },
      {
        area: 'Package size',
        gapDescription:
          'OPT3101 comes in a 6.2 mm × 4.8 mm QFN vs VL53L9 at 4.9 mm × 2.5 mm. Space-constrained mobile designs favour ST.',
      },
    ],
    rebuttals: [
      {
        pillar: 'Range leadership',
        angle:
          '15 m range is relevant for robotics obstacle avoidance but exceeds smartphone AF requirements by 10×. The VL53L9 range is optimised for < 5 m with better power envelope at typical operating distances.',
        evidenceHint: 'Power vs range benchmark data — contact systems engineering.',
      },
      {
        pillar: 'ROS ecosystem',
        angle:
          'ST is investing in ROS 2 drivers for VL53L9 with a faster published roadmap. First beta expected Q3 2026 with support for all major ROS distributions.',
        evidenceHint: 'ST ROS 2 roadmap internal wiki page.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // Sony — IMX global-shutter depth sensor (technology substitution threat)
  // ──────────────────────────────────────────────────────────────────────────────
  {
    id: 'comp-sony',
    name: 'Sony Semiconductor',
    summary:
      'Sony promotes their IMX global-shutter image sensor as an alternative depth-sensing solution, leveraging existing camera module supply chains. A recent design win at a tier-1 OEM signals potential substitution risk for dedicated ToF in flagship smartphones. Sony messaging emphasises "dual-use" — depth sensing plus standard imaging from a single sensor.',
    claims: [
      {
        text: 'IMX global-shutter sensor secured depth-sensing design win at a major tier-1 smartphone OEM for 2027 flagship.',
        source: 'Industry analyst report (Moor Insights)',
        first_seen_at: '2026-04-29',
      },
      {
        text: 'Single sensor handles both RGB imaging and depth mapping, reducing module height by 0.3 mm vs separate camera + ToF.',
        source: 'Sony technical white paper CES 2026',
        first_seen_at: '2026-03-15',
      },
      {
        text: 'Global-shutter eliminates motion artifacts in depth capture, achieving < 0.5 % depth error in high-contrast scenes.',
        source: 'Sony ISC West 2026 presentation',
        first_seen_at: '2026-04-10',
      },
    ],
    narrativeShifts: [
      { date: '2026-03-15', change: 'CES white paper introduces "depth plus imaging" dual-use narrative.' },
      { date: '2026-04-10', change: 'ISC West presentation adds quantitative depth accuracy claims targeting ToF benchmarks.' },
      { date: '2026-04-29', change: 'Design win leak — Moor Insights report confirms tier-1 adoption.' },
    ],
    gaps: [
      {
        area: 'Low-light depth accuracy',
        gapDescription:
          'Global-shutter IMX sensors require active illumination for depth in low-light conditions, adding LED driver cost. VL53L9 active dToF works in complete darkness with integrated VCSEL.',
      },
      {
        area: 'Frame rate',
        gapDescription:
          'Sony IMX global-shutter achieves 30 fps depth at full resolution versus VL53L9 at 240 fps — a significant gap for fast AF tracking.',
      },
      {
        area: 'Module maturity',
        gapDescription:
          'Dual-use depth + RGB requires custom module integration not yet standardised across ODM supply chains. ToF modules are a mature, drop-in category.',
      },
    ],
    rebuttals: [
      {
        pillar: 'Dual-use value',
        angle:
          'Combined RGB + depth in one sensor introduces optical design trade-offs that degrade primary camera quality. Flagship OEMs remain unwilling to compromise imaging flagship camera scores (DXOMark) for depth capability.',
        evidenceHint: 'Engineering analysis comparing dual-use vs separate camera + ToF module — contact optical engineering team.',
      },
      {
        pillar: 'Design win',
        angle:
          'Standalone design win does not indicate platform-wide adoption. Sony may have won a single flagship model; VL53L9 is on track for multi-platform adoption across 3 OEMs with higher aggregate volume.',
        evidenceHint: 'OEM platform roadmap comparison — request from strategic accounts team.',
      },
    ],
  },
];
