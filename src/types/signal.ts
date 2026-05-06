/**
 * src/types/signal.ts
 * Signal Radar types for T10.
 */

export type SignalType = 'competitor' | 'search' | 'media' | 'audience' | 'channel';

export type SignalSeverity = 'info' | 'warning' | 'critical';

export interface SignalEvent {
  id: string;
  type: SignalType;
  severity: SignalSeverity;
  entity: string;
  channel?: string;
  audience?: string;
  title: string;
  summary: string;
  createdAt: string;
}
