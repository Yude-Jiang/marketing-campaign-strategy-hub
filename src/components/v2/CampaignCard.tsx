/**
 * src/components/v2/CampaignCard.tsx
 * Campaign card for V2 Campaigns grid.
 */

import React from 'react';
import {
  Activity,
  Clock,
  User,
  BarChart3,
  ExternalLink,
  Archive,
} from 'lucide-react';
import type { CampaignRecord, CampaignLifecycleStatus } from '../../types/campaign';

// ─── Status meta ─────────────────────────────────────────────────────────────────

const STATUS_META: Record<CampaignLifecycleStatus, { label: string; color: string }> = {
  live:        { label: 'Live',        color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  monitoring:  { label: 'Monitoring',  color: 'text-amber-700 bg-amber-50 border-amber-200' },
  optimizing:  { label: 'Optimizing',  color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
  archived:    { label: 'Archived',    color: 'text-slate-500 bg-slate-100 border-slate-200' },
  draft:       { label: 'Draft',       color: 'text-slate-500 bg-slate-100 border-slate-200' },
};

// ─── Health bar ──────────────────────────────────────────────────────────────────

const HealthBar: React.FC<{ score: number }> = ({ score }) => {
  const color =
    score >= 80 ? 'bg-emerald-500'
      : score >= 50 ? 'bg-amber-500'
        : score > 0 ? 'bg-rose-500'
          : 'bg-slate-200';

  return (
    <div className="flex items-center gap-2">
      <BarChart3 className="w-3 h-3 text-slate-400" />
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${Math.max(score, 4)}%` }} />
      </div>
      <span className={`text-[9px] font-bold min-w-[28px] text-right ${
        score >= 80 ? 'text-emerald-600'
          : score >= 50 ? 'text-amber-600'
            : score > 0 ? 'text-rose-600'
              : 'text-slate-400'
      }`}>
        {score || '—'}
      </span>
    </div>
  );
};

// ─── Relative time ───────────────────────────────────────────────────────────────

const formatRelativeTime = (iso: string): string => {
  if (!iso) return 'Never';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
};

// ─── Component ───────────────────────────────────────────────────────────────────

interface CampaignCardProps {
  campaign: CampaignRecord;
  onArchive?: (id: string) => void;
  onOpenControlTower?: (id: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onArchive,
  onOpenControlTower,
}) => {
  const s = STATUS_META[campaign.status];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
      {/* Top bar */}
      <div className="px-4 py-3 border-b border-slate-50">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${s.color}`}>
                {s.label}
              </span>
              <span className="text-[8px] text-slate-300">ID: {campaign.id}</span>
            </div>
            <h3 className="text-xs font-black text-[#03234b] leading-relaxed truncate">
              {campaign.name}
            </h3>
          </div>
          <Activity className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
            campaign.status === 'live' ? 'text-emerald-500' : 'text-slate-300'
          }`} />
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-2.5">
        {/* Owner */}
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3 text-slate-400 flex-shrink-0" />
          <span className="text-[10px] text-slate-600 truncate">{campaign.owner}</span>
        </div>

        {/* Last signal */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-slate-400 flex-shrink-0" />
          <span className="text-[10px] text-slate-500">
            {campaign.lastSignalAt
              ? `Last signal ${formatRelativeTime(campaign.lastSignalAt)}`
              : 'No signals yet'}
          </span>
        </div>

        {/* Health score bar */}
        <HealthBar score={campaign.healthScore} />

        {/* Linked brief */}
        <div className="text-[8px] text-slate-400 truncate">
          Brief: <span className="font-mono">{campaign.linkedBriefId}</span>
        </div>
      </div>

      {/* Actions (visible on hover) */}
      <div className="px-4 py-2 border-t border-slate-50 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        {onOpenControlTower && (
          <button
            onClick={() => onOpenControlTower(campaign.id)}
            className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-[#3cb4e6] hover:text-[#0a3d7a] transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Control Tower
          </button>
        )}
        {onArchive && campaign.status !== 'archived' && (
          <button
            onClick={() => onArchive(campaign.id)}
            className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-slate-400 hover:text-rose-500 transition-colors ml-auto"
          >
            <Archive className="w-3 h-3" />
            Archive
          </button>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
