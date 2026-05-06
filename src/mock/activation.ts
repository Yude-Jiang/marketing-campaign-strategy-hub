/**
 * src/mock/activation.ts
 * Mock asset records for Activation Studio — one of each type with varied statuses.
 */

import type { AssetRecord } from '../types/activation';

export const MOCK_ASSETS: AssetRecord[] = [
  {
    id: 'asset-lp-1',
    type: 'landing_page',
    title: 'VL53L9 Flagship dToF Module — Product Landing Page',
    owner: 'Product Marketing',
    status: 'approved',
    versions: [
      { version: 1, createdAt: '2026-05-10T09:00:00Z', summary: 'Initial draft from brief + strategy pack' },
      { version: 2, createdAt: '2026-05-14T14:30:00Z', summary: 'Revised headline and CTA per legal review' },
      { version: 3, createdAt: '2026-05-18T11:00:00Z', summary: 'Final sign-off by PMM director' },
    ],
    contentPreview: `# VL53L9 — The World's Smallest Multi-Zone dToF Module

**Flagship ranging performance in a 3.6 × 5.0 mm LGA12 package.**

- Multi-target detection up to 4 zones
- 15 m outdoor / 8 m indoor ranging
- Class 1 eye-safe VCSEL (940 nm)
- AEC-Q102 qualified variant available
- STM32Cube ecosystem ready (X-CUBE-TOF1)

[Request Eval Kit] · [Download Datasheet] · [Watch Demo]`,
  },
  {
    id: 'asset-pa-1',
    type: 'paid_ad',
    title: 'LinkedIn Sponsored — "dToF Redefined"',
    owner: 'Digital Marketing',
    status: 'ready_for_review',
    versions: [
      { version: 1, createdAt: '2026-05-12T10:00:00Z', summary: 'Initial ad copy and creative brief' },
      { version: 2, createdAt: '2026-05-16T16:00:00Z', summary: 'A/B variant B added — technical angle' },
    ],
    contentPreview: `Headline: dToF Ranging, Redefined.
Body: The VL53L9 packs multi-zone detection, 15 m range, and Class 1 eye safety into the industry's smallest dToF module. Designed for flagship smartphones, robotics, and smart building.
CTA: Learn more →`,
  },
  {
    id: 'asset-faq-1',
    type: 'faq',
    title: 'VL53L9 — FAQ for OEM Engineering Teams',
    owner: 'Applications Engineering',
    status: 'ready_for_review',
    versions: [
      { version: 1, createdAt: '2026-05-11T08:00:00Z', summary: 'FAQ compiled from top-tier OEM pre-release inquiries' },
    ],
    contentPreview: `Q1: What is the maximum ranging distance outdoors?
A1: The VL53L9 achieves up to 15 m outdoors under typical conditions. Performance degrades above 100 k lux direct sunlight.

Q2: Does the module require external calibration?
A2: No. The VL53L9 includes embedded cover glass compensation. No external optics alignment is required.

Q3: Which MCU platforms are supported?
A3: Full driver support is provided via STM32Cube (X-CUBE-TOF1). Linux drivers are also available for MPU-based systems.`,
  },
  {
    id: 'asset-bc-1',
    type: 'battlecard',
    title: 'VL53L9 vs. TMF8820 — Competitive Battlecard',
    owner: 'Product Marketing',
    status: 'approved',
    versions: [
      { version: 1, createdAt: '2026-05-09T13:00:00Z', summary: 'Initial competitive analysis and positioning' },
      { version: 2, createdAt: '2026-05-15T09:30:00Z', summary: 'Updated pricing and availability section' },
    ],
    contentPreview: `# VL53L9 vs. ams OSRAM TMF8820

| Dimension | VL53L9 (ST) | TMF8820 (ams OSRAM) |
|-----------|-------------|---------------------|
| Max Range | 15 m        | 5 m                 |
| Zones     | 4           | 9 (3×3)             |
| Package   | 3.6×5.0 mm  | 4.9×5.0 mm          |
| AEC-Q102  | Yes         | No                  |
| Ecosystem | STM32Cube   | Limited             |

**Key Takeaway:** VL53L9 wins on range and automotive qualification; TMF8820 offers more zones at shorter range.`,
  },
  {
    id: 'asset-deck-1',
    type: 'deck',
    title: 'VL53L9 — Investor & Partner Overview Deck',
    owner: 'Corporate Marketing',
    status: 'planning',
    versions: [
      { version: 1, createdAt: '2026-05-20T08:00:00Z', summary: 'Outline and slide structure approved' },
    ],
    contentPreview: `1. Cover: VL53L9 — Game Changer in ToF Ranging
2. Market Landscape: ToF TAM $2.8B by 2028
3. VL53L9 Advantage: Smallest dToF + Multi-Zone + AEC-Q102
4. Target Verticals: Smartphone / Robotics / Smart Building / Automotive
5. Go-to-Market: Q3 2026 Launch Cadence
6. Competitive Positioning: VL53L9 vs. OPT3101 vs. TMF8820`,
  },
  {
    id: 'asset-email-1',
    type: 'email_sequence',
    title: 'VL53L9 Launch Nurture — 4-Part Email Series',
    owner: 'Demand Generation',
    status: 'handoff',
    versions: [
      { version: 1, createdAt: '2026-05-08T10:00:00Z', summary: 'Draft sequence mapped to buyer journey' },
      { version: 2, createdAt: '2026-05-13T15:00:00Z', summary: 'Revised subject lines + CTAs per A/B test results' },
      { version: 3, createdAt: '2026-05-19T12:00:00Z', summary: 'Final handoff to Marketo ops team' },
    ],
    contentPreview: `Email 1 — Awareness: "Meet the World's Smallest Multi-Zone dToF Module"
Email 2 — Consideration: "VL53L9 vs. the Competition — Head-to-Head"
Email 3 — Intent: "Request Your VL53L9 Eval Kit Today"
Email 4 — Decision: "VL53L9 Design-In Support — STM32Cube Makes It Easy"`,
  },
  {
    id: 'asset-lp-2',
    type: 'landing_page',
    title: 'VL53L9 Robotics — Collision Avoidance Solution Page',
    owner: 'Product Marketing',
    status: 'planning',
    versions: [
      { version: 1, createdAt: '2026-05-21T09:00:00Z', summary: 'Initial outline from robotics vertical strategy' },
    ],
    contentPreview: `# VL53L9 for Robotics — Real-Time Collision Avoidance

**Multi-zone dToF in a robot-friendly LGA12 package.**

- 4-zone obstacle detection at 30 fps
- 15 m range for warehouse AGV applications
- Class 1 eye-safe — no special enclosure needed
- ROS 2 driver available on GitHub`,
  },
  {
    id: 'asset-pa-2',
    type: 'paid_ad',
    title: 'Google Ads — "dToF Sensor for Robotics" Campaign',
    owner: 'Digital Marketing',
    status: 'error',
    versions: [
      { version: 1, createdAt: '2026-05-22T14:00:00Z', summary: 'Initial keyword research and ad copy' },
    ],
    contentPreview: `Headline: dToF Sensors for Robotics — VL53L9
Description: Multi-zone obstacle detection with 15 m range. Eye-safe. ROS 2 ready. Request your eval kit today.
Error: Google Ads editorial policy — "dToF" flagged for technical jargon review.`,
  },
];
