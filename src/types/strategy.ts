/**
 * src/types/strategy.ts
 * Strategy Studio types for T06.
 */

export type StrategyStatus =
  | 'empty'
  | 'generating'
  | 'ready'
  | 'refining'
  | 'locked'
  | 'error';

export interface StrategicPriority {
  title: string;
  rationale: string;
}

export interface ChannelStrategyItem {
  channel: string;
  role: string;
  kpis: string[];
}

export interface TacticalPlay {
  name: string;
  audience: string;
  channel: string;
  message: string;
}

export interface MeasurementMetric {
  name: string;
  definition: string;
  target: string;
}

export interface StrategyPackModel {
  priorities: StrategicPriority[];
  matrix: { audience: string; pillar: string; resonance: 'high' | 'medium' | 'low' }[];
  channels: ChannelStrategyItem[];
  launchPhases: { name: string; window: string; focus: string }[];
  tactics: TacticalPlay[];
  measurement: MeasurementMetric[];
}
