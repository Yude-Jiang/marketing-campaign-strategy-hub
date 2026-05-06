/**
 * src/components/v2/ConnectorCard.tsx
 * T14: Integrations — single connector card in the grid.
 */

import React from 'react';
import { Plug, RefreshCw } from 'lucide-react';
import type { IntegrationConnector, IntegrationStatus } from '../../types/integration';

// ─── Status meta ────────────────────────────────────────────────────────────────

const STATUS_META: Record<IntegrationStatus, { label: string; dot: string }> = {
  connected:    { label: 'Connected',    dot: 'bg-emerald-500' },
  disconnected: { label: 'Disconnected', dot: 'bg-slate-300' },
  paused:       { label: 'Paused',       dot: 'bg-amber-400' },
  error:        { label: 'Error',        dot: 'bg-rose-500' },
  syncing:      { label: 'Syncing',      dot: 'bg-blue-500' },
};

// ─── Category color ─────────────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<string, string> = {
  monitoring: 'text-sky-600 bg-sky-50 border-sky-200',
  search:     'text-indigo-600 bg-indigo-50 border-indigo-200',
  social:     'text-orange-600 bg-orange-50 border-orange-200',
  crm:        'text-emerald-600 bg-emerald-50 border-emerald-200',
  analytics:  'text-purple-600 bg-purple-50 border-purple-200',
  custom:     'text-slate-600 bg-slate-50 border-slate-200',
};

// ─── Format date ────────────────────────────────────────────────────────────────

const formatRelativeTime = (iso?: string): string => {
  if (!iso) return 'Never';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

// ─── Props ──────────────────────────────────────────────────────────────────────

interface ConnectorCardProps {
  connector: IntegrationConnector;
  isSelected: boolean;
  onClick: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────────

const ConnectorCard: React.FC<ConnectorCardProps> = ({ connector, isSelected, onClick }) => {
  const sMeta = STATUS_META[connector.status];
  const catColor = CATEGORY_COLOR[connector.category] ?? CATEGORY_COLOR.custom;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white rounded-2xl border-2 p-4 transition-all hover:shadow-md ${
        isSelected
          ? 'border-[#3cb4e6] shadow-sm'
          : 'border-slate-100 shadow-sm hover:border-slate-200'
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="w-8 h-8 bg-[#03234b]/5 rounded-lg flex items-center justify-center flex-shrink-0">
          <Plug className="w-4 h-4 text-[#03234b]" />
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Status dot */}
          <span className={`w-2 h-2 rounded-full ${sMeta.dot}`} />
          <span className="text-[8px] text-slate-500">{sMeta.label}</span>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-[11px] font-black text-[#03234b] truncate mb-1">
        {connector.name}
      </h3>

      {/* Category badge */}
      <span className={`inline-block text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${catColor}`}>
        {connector.category}
      </span>

      {/* Config note preview */}
      {connector.configNote && (
        <p className="text-[8px] text-slate-400 mt-2 leading-relaxed line-clamp-2">
          {connector.configNote}
        </p>
      )}

      {/* Last sync */}
      <div className="flex items-center gap-1 mt-2 text-[7px] text-slate-400">
        <RefreshCw className={`w-2.5 h-2.5 ${connector.status === 'syncing' ? 'animate-spin text-blue-500' : ''}`} />
        {connector.status === 'syncing' ? 'Syncing…' : `Last sync: ${formatRelativeTime(connector.lastSyncAt)}`}
      </div>
    </button>
  );
};

export default ConnectorCard;
