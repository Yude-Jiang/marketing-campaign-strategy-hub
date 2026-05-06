/**
 * src/mock/integrations.ts
 * T14: Integrations — 6 mock connectors across all categories and statuses.
 */

import type { IntegrationConnector } from '../types/integration';

export const MOCK_CONNECTORS: IntegrationConnector[] = [
  {
    id: 'conn-mon-001',
    name: 'Brandwatch',
    category: 'monitoring',
    status: 'connected',
    lastSyncAt: '2026-05-05T10:30:00Z',
    configNote: 'Tracking VL53L9, ST ToF, and competitor keywords across 12 languages.',
  },
  {
    id: 'conn-src-001',
    name: 'Google Alerts',
    category: 'search',
    status: 'connected',
    lastSyncAt: '2026-05-05T09:15:00Z',
    configNote: 'Daily digest for "dToF", "ToF sensor", "VL53L9", "TMF8820".',
  },
  {
    id: 'conn-soc-001',
    name: 'LinkedIn Pages',
    category: 'social',
    status: 'paused',
    lastSyncAt: '2026-05-03T18:00:00Z',
    configNote: 'Paused due to API rate-limit changes. Awaiting re-authorisation.',
  },
  {
    id: 'conn-crm-001',
    name: 'Salesforce',
    category: 'crm',
    status: 'connected',
    lastSyncAt: '2026-05-05T11:00:00Z',
    configNote: 'Syncing opportunity stage changes and campaign-influence tracking.',
  },
  {
    id: 'conn-anl-001',
    name: 'Google Analytics 4',
    category: 'analytics',
    status: 'error',
    lastSyncAt: '2026-05-04T22:00:00Z',
    configNote: 'Authentication token expired. Re-authentication required.',
  },
  {
    id: 'conn-cus-001',
    name: 'Custom Webhook API',
    category: 'custom',
    status: 'disconnected',
    configNote: 'Not yet configured. Endpoint URL and secret key required.',
  },
  {
    id: 'conn-src-002',
    name: 'SEMrush',
    category: 'search',
    status: 'syncing',
    lastSyncAt: '2026-05-05T11:05:00Z',
    configNote: 'Full keyword-position export in progress. 2 400 of 12 000 keywords processed.',
  },
];
