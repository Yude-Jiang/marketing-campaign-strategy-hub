import type { ProductTruthModel } from '../types/product';

export const MOCK_PRODUCT_TRUTH: ProductTruthModel = {
  category: 'Time-of-Flight (ToF) Ranging Sensor',
  coreFeatures: [
    'Direct ToF (dToF) with multi-target detection (up to 4 zones)',
    'Class 1 VCSEL with integrated SPAD array',
    'Up to 15 m ranging distance outdoors / 8 m indoors',
    'I²C Fast Mode Plus interface (1 MHz)',
    'Embedded ranging algorithm with cover glass compensation',
  ],
  keySpecs: [
    { label: 'Supply Voltage',          value: '2.6 V – 3.5 V' },
    { label: 'Operating Range',         value: '0 – 15 m (outdoor), 0 – 8 m (indoor)' },
    { label: 'Resolution',              value: '1 cm' },
    { label: 'I²C Bus Speed',           value: 'Up to 1 MHz (Fast Mode Plus)' },
    { label: 'Package',                 value: '3.6 × 5.0 × 1.2 mm (LGA12)' },
    { label: 'Operating Temperature',   value: '-30 °C to +85 °C' },
    { label: 'Supply Current (active)', value: 'Typ. 25 mA' },
    { label: 'VCSEL Wavelength',        value: '940 nm (invisible)' },
  ],
  differentiators: [
    'Smallest footprint dToF module in its class (3.6 × 5.0 mm)',
    'Multi-target distance detection — unique among single-module ToF sensors',
    'Integrated SPAD + VCSEL eliminates external optics alignment',
    'Proven in high-volume smartphone autofocus assist applications',
  ],
  proofPoints: [
    'STMicroelectronics: over 100 million ToF modules shipped globally',
    'Deployed in tier-1 smartphone brands for laser autofocus (AF)',
    'IEC 60825-1 Class 1 eye-safe certification',
    'AEC-Q102 qualified variants available for automotive',
    'Supported by STM32Cube ecosystem (X-CUBE-TOF1)',
  ],
  limitations: [
    'Outdoor performance degrades under direct sunlight (>100 k lux)',
    'Requires careful optical stack design for cover glass attenuation',
    'Max frame rate drops at longer distance due to integration time',
  ],
};
