/**
 * src/components/v2/ConnectorDetail.tsx
 * T14: Integrations — selected connector detail panel with actions.
 */

import React from 'react';
import {
  Plug,
  Wifi,
  WifiOff,
  Play,
  Pause,
  Trash2,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react';
import type { IntegrationConnector, IntegrationStatus } from '../../types/integration';

// ─── Status meta ────────────────────────────────────────────────────────────────

const STATUS_META: Record<IntegrationStatus, { label: string; color: string; icon: React.ElementType }> = {
  connected:    { label: 'Connected',    color: 'text-emerald-600 bg-emerald-50 border-emerald-200', icon: Wifi },
  disconnected: { label: 'Disconnected', color: 'text-slate-500 bg-slate-100 border-slate-200',      icon: WifiOff },
  paused:       { label: 'Paused',       color: 'text-amber-600 bg-amber-50 border-amber-200',       icon: Pause },
  error:        { label: 'Error',        color: 'text-rose-600 bg-rose-50 border-rose-200',          icon: ShieldAlert },
  syncing:      { label: 'Syncing',      color: 'text-blue-600 bg-blue-50 border-blue-200',          icon: RefreshCw },
};

// ─── Category meta ──────────────────────────────────────────────────────────────

const CATEGORY_LABEL: Record<string, string> = {
  monitoring: 'Monitoring & Listening',
  search:     'Search Data',
  social:     'Social Media',
  crm:        'CRM',
  analytics:  'Web Analytics',
  custom:     'Custom Connector',
};

// ─── Format date ────────────────────────────────────────────────────────────────

const formatFullTime = (iso?: string): string => {
  if (!iso) return 'Never';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

// ─── Action config ──────────────────────────────────────────────────────────────

interface ActionDef {
  key: string;
  label: string;
  icon: React.ElementType;
  color: string;
  /** Conditions under which this action is shown */
  showFor: IntegrationStatus[];
}

const ACTIONS: ActionDef[] = [
  { key: 'connect',    label: 'Connect',    icon: Wifi,     color: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100',     showFor: ['disconnected', 'error'] },
  { key: 'disconnect', label: 'Disconnect', icon: WifiOff,  color: 'text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100',                 showFor: ['connected', 'paused'] },
  { key: 'resume',     label: 'Resume',     icon: Play,     color: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100',                  showFor: ['paused'] },
  { key: 'pause',      label: 'Pause',      icon: Pause,    color: 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100',              showFor: ['connected', 'syncing'] },
  { key: 'test',       label: 'Test',       icon: RefreshCw, color: 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100',          showFor: ['connected', 'paused', 'error'] },
  { key: 'remove',     label: 'Remove',     icon: Trash2,   color: 'text-slate-500 bg-slate-100 border-slate-200 hover:bg-slate-200',             showFor: ['disconnected', 'error', 'paused', 'connected'] },
];

// ─── Props ──────────────────────────────────────────────────────────────────────

interface ConnectorDetailProps {
  connector: IntegrationConnector | null;
  onAction: (id: string, action: string) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────────

const ConnectorDetail: React.FC<ConnectorDetailProps> = ({ connector, onAction }) => {
  if (!connector) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Plug className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
          No Connector Selected
        </p>
        <p className="text-[9px] text-slate-400 max-w-[240px] leading-relaxed">
          Select a connector from the grid to view its details, configuration, and management actions.
        </p>
      </div>
    );
  }

  const sMeta = STATUS_META[connector.status];
  const StatusIcon = sMeta.icon;
  const availableActions = ACTIONS.filter(a => a.showFor.includes(connector.status));

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-1.5">
        <Plug className="w-3.5 h-3.5 text-[#3cb4e6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          Connector Detail
        </span>
        <span className="text-[8px] text-slate-400 ml-auto">{connector.id}</span>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Name + Status */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#03234b]">{connector.name}</h3>
          <span className={`flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${sMeta.color}`}>
            <StatusIcon className="w-3 h-3" />
            {sMeta.label}
          </span>
        </div>

        {/* Category */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Category
          </p>
          <span className="text-[10px] font-bold text-slate-700">
            {CATEGORY_LABEL[connector.category] ?? connector.category}
          </span>
        </div>

        {/* Config note */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Configuration Note
          </p>
          <p className="text-[10px] text-slate-600 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100 leading-relaxed">
            {connector.configNote ?? 'No configuration notes.'}
          </p>
        </div>

        {/* Last sync */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Last Sync
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-700">
            <RefreshCw className={`w-3 h-3 ${connector.status === 'syncing' ? 'animate-spin text-blue-500' : 'text-slate-400'}`} />
            {formatFullTime(connector.lastSyncAt)}
          </div>
        </div>

        {/* Action buttons */}
        {availableActions.length > 0 && (
          <div className="border-t border-slate-100 pt-3">
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Actions
            </p>
            <div className="flex flex-wrap gap-2">
              {availableActions.map(action => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.key}
                    onClick={() => onAction(connector.id, action.key)}
                    className={`flex items-center gap-1.5 text-[8px] font-black uppercase tracking-wider px-3 py-2 rounded-lg border transition-all ${action.color}`}
                  >
                    <Icon className="w-3 h-3" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectorDetail;
