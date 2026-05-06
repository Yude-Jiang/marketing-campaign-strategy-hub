import type { ElementType } from 'react';

export interface DashboardQuickAction {
  key: string;
  label: string;
  description: string;
  icon: ElementType;
  path: string;
}

export interface RecentBriefSummary {
  id: string;
  title: string;
  productArea: string;
  updatedAt: string;
  status: 'draft' | 'in_review' | 'approved';
}

export interface RecentCampaignSummary {
  id: string;
  name: string;
  ecosystem: string;
  progress: number;
  updatedAt: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
}

export interface ActivityLogItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}
