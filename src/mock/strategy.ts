/**
 * src/mock/strategy.ts
 * Mock StrategyPackModel for VL53L9 campaign.
 */

import type { StrategyPackModel } from '../types/strategy';

export const MOCK_STRATEGY_PACK: StrategyPackModel = {
  priorities: [
    {
      title: 'Establish Cognitive Sovereignty in Smartphone ToF',
      rationale: 'VL53L9 is the smallest multi-zone dToF module; own the "flagship AF" narrative before competitors reposition.',
    },
    {
      title: 'Expand Mindshare in Robotics & Smart Building',
      rationale: 'Adjacent verticals offer 2× TAM expansion beyond smartphone AF; low incumbent ToF awareness creates first-mover advantage.',
    },
    {
      title: 'Accelerate Design-In Velocity via Ecosystem Lock-in',
      rationale: 'STM32Cube + X-CUBE-TOF1 reduces eval-to-production cycle; leverage installed base of 10 M+ STM32 developers.',
    },
    {
      title: 'Pre-empt Automotive Adjacency Play',
      rationale: 'AEC-Q102 qualified variant enables in-cabin presence detection; seed designs now for 2028 production programs.',
    },
  ],

  matrix: [
    { audience: 'Smartphone Camera Architect', pillar: 'Performance Leadership',    resonance: 'high' },
    { audience: 'Smartphone Camera Architect', pillar: 'Ecosystem Velocity',         resonance: 'medium' },
    { audience: 'Smartphone Camera Architect', pillar: 'Cost Competitiveness',       resonance: 'high' },
    { audience: 'Smartphone Camera Architect', pillar: 'Future-Proof Roadmap',       resonance: 'low' },
    { audience: 'Robotics Perception Engineer', pillar: 'Performance Leadership',    resonance: 'medium' },
    { audience: 'Robotics Perception Engineer', pillar: 'Ecosystem Velocity',         resonance: 'high' },
    { audience: 'Robotics Perception Engineer', pillar: 'Cost Competitiveness',       resonance: 'high' },
    { audience: 'Robotics Perception Engineer', pillar: 'Future-Proof Roadmap',       resonance: 'medium' },
    { audience: 'IoT Product Manager',          pillar: 'Performance Leadership',    resonance: 'low' },
    { audience: 'IoT Product Manager',          pillar: 'Ecosystem Velocity',         resonance: 'high' },
    { audience: 'IoT Product Manager',          pillar: 'Cost Competitiveness',       resonance: 'high' },
    { audience: 'IoT Product Manager',          pillar: 'Future-Proof Roadmap',       resonance: 'medium' },
  ],

  channels: [
    {
      channel: 'LinkedIn (Organic + Paid)',
      role: 'Build executive mindshare and target decision-makers in smartphone OEM and robotics.',
      kpis: ['Impressions: 500K+', 'CTR: ≥ 2.5 %', 'InMail engagement rate: ≥ 15 %'],
    },
    {
      channel: 'Technical Content (Blog / White Papers / GitHub)',
      role: 'Demonstrate VL53L9 performance data, integration guides, and STM32Cube reference designs.',
      kpis: ['White paper downloads: 2K+', 'GitHub stars: 500+', 'Avg. time on page: > 4 min'],
    },
    {
      channel: 'Trade Shows (MWC / CES / electronica)',
      role: 'Live demo of multi-zone dToF ranging; direct engagement with tier-1 OEM engineering teams.',
      kpis: ['Meetings booked: 50+ per show', 'Demo eval units distributed: 200+', 'Post-show MQLs: 100+'],
    },
    {
      channel: 'Distributor Enablement (FAE Training / Collateral)',
      role: 'Equip ST authorized distributor FAEs with VL53L9 eval kits and competitive battle cards.',
      kpis: ['FAEs trained: 150+', 'Joint design-in registrations: 75+', 'Distributor NPS: ≥ 60'],
    },
    {
      channel: 'PR & Analyst Relations',
      role: 'Secure tier-1 tech press coverage; brief Omdia / Yole on VL53L9 market positioning.',
      kpis: ['Press mentions: 20+ tier-1', 'Analyst inquiry calls: 10+', 'Share of voice: ≥ 25 %'],
    },
  ],

  launchPhases: [
    {
      name: 'Phase 1: Seed & Amp',
      window: 'Q3 2026',
      focus: 'Teaser content, press embargo, early eval kit deployment to 5 tier-1 smartphone OEMs.',
    },
    {
      name: 'Phase 2: Scale & Penetrate',
      window: 'Q4 2026 – Q1 2027',
      focus: 'Full campaign launch at electronica + CES; broad FAE training; robotics vertical push.',
    },
    {
      name: 'Phase 3: Dominate & Expand',
      window: 'Q2 2027',
      focus: 'Automotive in-cabin design-in seed; smart building occupancy case studies; analyst briefings.',
    },
  ],

  tactics: [
    {
      name: 'Flagship AF Benchmark Series',
      audience: 'Smartphone Camera Architects',
      channel: 'Technical Content',
      message: 'Publish head-to-head ranging accuracy benchmarks vs. OPT3101 and TMF8820 in low-light and multi-target scenarios.',
    },
    {
      name: 'Robot Collision Avoidance Demo Kit',
      audience: 'Robotics Perception Engineers',
      channel: 'Trade Shows + GitHub',
      message: 'Ship VL53L9 + STM32 eval kit with ROS 2 driver; demo at MWC and electronica.',
    },
    {
      name: 'STM32Cube Integration Sprint',
      audience: 'IoT Product Managers',
      channel: 'Technical Content + Distributor FAE',
      message: 'Release X-CUBE-TOF1 v2.0 with VL53L9 support, cover-glass calibration tool, and low-power example.',
    },
    {
      name: 'Analyst Briefing Program',
      audience: 'Industry Analysts (Omdia / Yole)',
      channel: 'PR & AR',
      message: 'Quarterly analyst briefings on VL53L9 design-win trajectory and market share capture.',
    },
  ],

  measurement: [
    { name: 'Design-In Registrations',    definition: 'Number of active OEM/ODM VL53L9 evaluation projects registered with ST sales.', target: '200+ within 12 months' },
    { name: 'Share of Voice (SoV)',        definition: '% of ToF sensor mentions in target press and analyst coverage vs. top 3 competitors.',       target: '≥ 25 %' },
    { name: 'Web Traffic (product page)',  definition: 'Unique visitors to VL53L9 product page and documentation hub.',                         target: '100K+ UV in launch quarter' },
    { name: 'MQL Velocity',               definition: 'Days from first touch to qualified lead hand-off to ST sales team.',                       target: '≤ 45 days' },
    { name: 'Eval Kit Conversion Rate',   definition: '% of eval kit shipments that convert to design-in registration within 90 days.',            target: '≥ 15 %' },
    { name: 'Net Promoter Score (FAE)',   definition: 'NPS survey of authorized distributor FAEs post VL53L9 training.',                         target: '≥ 60' },
  ],
};
