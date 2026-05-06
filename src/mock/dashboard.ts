import type { DashboardQuickAction, RecentBriefSummary, RecentCampaignSummary, ActivityLogItem } from '../types/dashboard';
import { FileText, PlayCircle, Target, BarChart3 } from 'lucide-react';

export const MOCK_QUICK_ACTIONS: DashboardQuickAction[] = [
  {
    key: 'new-intake',
    label: 'New Product Intake',
    description: 'Upload datasheets and product specs',
    icon: FileText,
    path: '/product-intake',
  },
  {
    key: 'resume-draft',
    label: 'Resume Last Draft',
    description: 'Continue your last campaign brief',
    icon: PlayCircle,
    path: '/brief-builder',
  },
  {
    key: 'open-campaigns',
    label: 'Open Campaigns',
    description: 'View active campaign status',
    icon: Target,
    path: '/campaigns',
  },
  {
    key: 'view-reports',
    label: 'View Reports',
    description: 'Export and share strategic reports',
    icon: BarChart3,
    path: '/reports',
  },
];

export const MOCK_BRIEFS: RecentBriefSummary[] = [
  {
    id: 'brief-001',
    title: 'STM32WBA Matter Protocol Market Entry',
    productArea: 'Wireless MCU',
    updatedAt: '2026-05-04T10:30:00Z',
    status: 'approved',
  },
  {
    id: 'brief-002',
    title: 'BLE 5.4 Industrial Sensor Positioning',
    productArea: 'Bluetooth LE',
    updatedAt: '2026-05-03T14:15:00Z',
    status: 'in_review',
  },
  {
    id: 'brief-003',
    title: 'Cortex-M33 vs RISC-V Cost Analysis',
    productArea: 'Core Architecture',
    updatedAt: '2026-05-02T09:00:00Z',
    status: 'draft',
  },
];

export const MOCK_CAMPAIGNS: RecentCampaignSummary[] = [
  {
    id: 'camp-001',
    name: 'Matter Smart Lock GEO Campaign',
    ecosystem: 'global',
    progress: 65,
    updatedAt: '2026-05-04T08:00:00Z',
    status: 'active',
  },
  {
    id: 'camp-002',
    name: 'China BMS Battery Management Push',
    ecosystem: 'cn',
    progress: 30,
    updatedAt: '2026-05-03T16:45:00Z',
    status: 'active',
  },
  {
    id: 'camp-003',
    name: 'Japan Industrial BLE Mesh Series',
    ecosystem: 'jp',
    progress: 100,
    updatedAt: '2026-05-01T11:20:00Z',
    status: 'completed',
  },
];

export const MOCK_ACTIVITIES: ActivityLogItem[] = [
  { id: 'act-001', type: 'brief_created',      message: 'Brief "STM32WBA Matter Protocol" approved',                  timestamp: '2026-05-04T10:30:00Z' },
  { id: 'act-002', type: 'content_generated',  message: 'Content generated for "BLE 5.4 Industrial Sensor" campaign', timestamp: '2026-05-04T09:15:00Z' },
  { id: 'act-003', type: 'campaign_launched',  message: 'Campaign "Matter Smart Lock" moved to active',              timestamp: '2026-05-04T08:00:00Z' },
  { id: 'act-004', type: 'strategy_updated',   message: 'Strategy playbooks updated for China BMS campaign',         timestamp: '2026-05-03T16:45:00Z' },
  { id: 'act-005', type: 'report_exported',    message: 'GEO strategic report exported for Japan BLE series',        timestamp: '2026-05-01T11:20:00Z' },
];
