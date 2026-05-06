/**
 * src/mock/brief.ts
 * Mock CampaignBriefModel for VL53L9 ToF sensor campaign.
 */

import type { CampaignBriefModel } from '../types/brief';

export const MOCK_CAMPAIGN_BRIEF: CampaignBriefModel = {
  campaignOverview: {
    name: 'VL53L9 — The Smallest Multi-Zone dToF Module',
    productFamily: 'VL53Lx',
    brand: 'STMicroelectronics',
    timing: 'Q3 2026 – Q2 2027',
  },
  objectives: [
    'Establish VL53L9 as the reference dToF module for flagship smartphone AF assist',
    'Grow mindshare among robotics perception engineers for collision avoidance designs',
    'Drive 200+ design-in evaluations within 12 months of launch',
    'Achieve 30 % reduction in BOM vs. competitor multi-sensor ToF solutions',
  ],
  audience: {
    primary: [
      'Smartphone Camera System Architects (OEM / ODM)',
      'Robotics Perception Engineers (service & domestic)',
      'IoT Product Managers (smart building / presence detection)',
    ],
    secondary: [
      'Automotive Tier-1 In-cabin Module Designers',
      'Industrial Automation Sensor Engineers',
      'ST Authorized Distributor FAEs',
    ],
  },
  competitors: [
    'Texas Instruments OPT3101 — analog ToF, single-target, no AEC-Q102',
    'ams OSRAM TMF8820 — multi-zone dToF but limited to 5 m range',
    'Infineon / pmd iToF — higher power draw, larger footprint',
    'Sony IMX global-shutter stereo — higher BOM, low-light weak',
  ],
  offer: {
    headline: 'Flagship dToF ranging in a 3.6 × 5.0 mm LGA12 package — multi-target, eye-safe, ecosystem-ready.',
    proofs: [
      'Smallest footprint dToF module with integrated SPAD + VCSEL',
      'Multi-target detection up to 4 zones in a single module',
      '15 m outdoor / 8 m indoor ranging with Class 1 eye-safe VCSEL',
      'AEC-Q102 qualified variant for automotive in-cabin',
      'STM32Cube ecosystem (X-CUBE-TOF1) reduces integration from months to weeks',
      'Over 100 million ST ToF modules shipped globally — proven supply chain',
    ],
  },
  keyUseCases: [
    'Laser Autofocus Assist — sub-ms ranging in low-light smartphone camera',
    'Robot Collision Avoidance — real-time multi-zone obstacle detection',
    'Smart Building Occupancy — low-power presence sensing for HVAC optimization',
    'In-Cabin Driver Monitoring — AEC-Q102 qualified seat occupancy & gesture',
  ],
  budget: {
    total: 1_200_000,
    splits: [
      { channel: 'Digital Advertising (LinkedIn / Google / Tech Pub)', amount: 350_000 },
      { channel: 'Technical Content & SEO (white papers / app notes)', amount: 200_000 },
      { channel: 'Trade Shows & Events (MWC / CES / electronica)', amount: 300_000 },
      { channel: 'Distributor Enablement & Collateral', amount: 150_000 },
      { channel: 'PR & Analyst Relations', amount: 100_000 },
      { channel: 'Sales Tools & Demo Kits', amount: 100_000 },
    ],
  },
  timing: {
    start: '2026-07-01',
    end: '2027-06-30',
  },
  tags: [
    'dToF',
    'Time-of-Flight',
    'Smartphone AF',
    'Robotics',
    'Smart Building',
    'Automotive In-Cabin',
    'STMicroelectronics',
    'VL53L9',
  ],
};
