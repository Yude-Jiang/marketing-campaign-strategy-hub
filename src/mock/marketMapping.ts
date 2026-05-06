/**
 * src/mock/marketMapping.ts
 * Mock MarketInterpretationModel for the VL53L9 ToF sensor (consistent with T03 Product Truth).
 */

import type { MarketInterpretationModel } from '../types/market';

export const MOCK_MARKET_INTERPRETATION: MarketInterpretationModel = {
  personas: [
    {
      role: 'Smartphone Camera System Architect',
      responsibilities: [
        'Define AF (autofocus) system architecture for flagship phones',
        'Select ToF sensor modules balancing BOM cost vs. performance',
        'Validate ranging accuracy across lighting conditions',
      ],
      painPoints: [
        'Competing ToF modules require external optics alignment, increasing assembly cost',
        'Limited indoor/outdoor dynamic range forces trade-offs in AF speed',
        'Need multi-target detection for advanced bokeh and AR applications',
      ],
    },
    {
      role: 'Robotics Perception Engineer',
      responsibilities: [
        'Integrate obstacle detection and collision avoidance sensors',
        'Optimize sensor fusion pipeline (LiDAR + ToF + cameras)',
        'Certify eye-safe operation for consumer robots',
      ],
      painPoints: [
        'Typical ToF modules lack multi-target detection needed for cluttered environments',
        'Form-factor constraints limit placement options on compact robots',
        'Outdoor sunlight interference reduces ranging reliability',
      ],
    },
    {
      role: 'IoT Product Manager',
      responsibilities: [
        'Define presence-detection feature set for smart home devices',
        'Evaluate sensor module cost vs. BOM allocation',
        'Manage supply chain and multi-sourcing strategy',
      ],
      painPoints: [
        'Limited availability of AEC-Q102 qualified ToF for smart building',
        'Integrating ToF increases system complexity; needs STM32Cube support',
        'Customer expectations for low-power always-on presence sensing',
      ],
    },
  ],

  industries: [
    'Consumer Electronics — Smartphones & Tablets',
    'Robotics — Service / Domestic / Industrial AGV',
    'Smart Building — Occupancy & Presence Detection',
    'Automotive — In-cabin Driver Monitoring',
    'IoT — Connected Home Appliances',
    'Industrial — Proximity & Level Sensing',
  ],

  useCases: [
    {
      name: 'Laser Autofocus Assist',
      scenario: 'Flagship smartphone camera needs sub-ms AF in low-light environments where PDAF fails.',
      valueDelivered: 'dToF provides instant ranging up to 8 m indoors; multi-target detection enables precise subject tracking for bokeh computation.',
    },
    {
      name: 'Robot Collision Avoidance',
      scenario: 'Domestic vacuum robot must detect furniture, stairs, and pets in real time under varying light.',
      valueDelivered: 'Compact LGA12 module fits tight PCB layouts; multi-zone detection allows 3D scene understanding; Class 1 eye-safe VCSEL.',
    },
    {
      name: 'Smart Building Occupancy',
      scenario: 'HVAC system needs per-room occupancy data to optimize energy use and comply with green building codes.',
      valueDelivered: 'Low-power always-on ranging with I²C interface simplifies retrofitting; 15 m range covers large rooms.',
    },
    {
      name: 'In-Cabin Driver Monitoring',
      scenario: 'Automotive tier-1 supplier needs AEC-Q102 qualified ToF for seat-occupancy and gesture detection.',
      valueDelivered: 'AEC-Q102 qualified variant available; multi-target tracking detects driver and passenger presence simultaneously.',
    },
  ],

  competitors: [
    {
      name: 'Texas Instruments OPT3101',
      positioning: 'Analog-output ToF sensor targeting industrial proximity; relies on external ADC and calibration.',
      strengths: [
        'Mature ecosystem and TI analog support',
        'Low unit cost in high volume',
        'Wide supply voltage range (2.6 V – 3.6 V)',
      ],
      weaknesses: [
        'Requires external optics calibration — increases NRE',
        'Single-target distance only; no multi-object discrimination',
        'No AEC-Q102 automotive variant available',
      ],
    },
    {
      name: 'ams OSRAM TMF8820',
      positioning: 'Multi-zone dToF module with 3×3 or 4×4 zone array for gesture and presence.',
      strengths: [
        'Native multi-zone detection (up to 16 zones)',
        'Integrated VCSEL + SPAD in compact package',
        'Active background illumination cancellation',
      ],
      weaknesses: [
        'Maximum range 5 m — insufficient for room-scale smart building',
        'Limited STM32Cube / MCU ecosystem integration',
        'Higher BOM cost for equivalent smartphone AF performance',
      ],
    },
    {
      name: 'Infineon / pmd 3D ToF',
      positioning: 'Indirect ToF (iToF) solution for mid-range depth sensing in tablets and AR.',
      strengths: [
        'High depth resolution suitable for AR/VR use cases',
        'Broad Infineon distribution channel',
        'Modular reference design kit available',
      ],
      weaknesses: [
        'iToF subject to multipath interference in complex scenes',
        'Higher power draw than dToF for equivalent frame rate',
        'Larger module footprint vs. VL53L9 LGA12',
      ],
    },
    {
      name: 'Sony IMX系列 (间接竞品)',
      positioning: 'Global-shutter image sensor used for stereo depth; competes in smartphone AF assist at system level.',
      strengths: [
        'Leverages existing camera pipeline (ISP, tuning)',
        'Higher spatial resolution for depth maps',
        'Sony brand trust in smartphone imaging',
      ],
      weaknesses: [
        'Requires dual-camera stereo setup — higher BOM and Z-height',
        'Computationally expensive stereo matching vs. direct ToF',
        'Poor performance in low-light vs. active VCSEL dToF',
      ],
    },
  ],

  buyerNeeds: [
    'Sub-millimeter ranging accuracy for precise AF control',
    'Multi-target detection enabling advanced computational photography features',
    'Compact footprint (< 20 mm²) for space-constrained PCB layouts',
    'AEC-Q102 qualification pathway for automotive and high-reliability designs',
    'Comprehensive software ecosystem (drivers, examples, tuning tools)',
    'Low-power always-on mode for battery-operated IoT devices',
    'Cover glass calibration compensation without external reference',
  ],

  adoptionBarriers: [
    'Optical stack design complexity — cover glass attenuation must be characterized per design',
    'Switching cost from incumbent ToF or PSD sensors requires re-spin of sensor subsystem PCB',
    'Lack of in-house ToF expertise among mid-tier OEMs necessitates ST engineering support',
    'Sunlight interference at > 100 k lux limits outdoor deployment scenarios',
    'Customer qualification cycles for new ToF module can span 6–12 months',
  ],

  narratives: [
    'VL53L9 is the smallest dToF module with true multi-target ranging, enabling flagship AF and 3D scene understanding from a single LGA12 package.',
    'STMicroelectronics ships over 100 M ToF units globally — VL53L9 inherits the production-proven supply chain and ecosystem.',
    'First dToF module to combine multi-zone detection with AEC-Q102 qualification, bridging consumer and automotive markets.',
    'From smartphone AF to robot navigation to smart building occupancy — one module architecture serves diverse verticals.',
    'ST\'s STM32Cube ecosystem (X-CUBE-TOF1) reduces integration from months to weeks.',
  ],
};
