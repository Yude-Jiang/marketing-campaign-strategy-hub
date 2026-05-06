/**
 * src/types/integration.ts
 * T14: Integrations — connector types.
 */

export type IntegrationStatus = 'connected' | 'disconnected' | 'paused' | 'error' | 'syncing';

export interface IntegrationConnector {
  id: string;
  name: string;
  category: 'monitoring' | 'search' | 'social' | 'crm' | 'analytics' | 'custom';
  status: IntegrationStatus;
  lastSyncAt?: string;
  configNote?: string;
}
