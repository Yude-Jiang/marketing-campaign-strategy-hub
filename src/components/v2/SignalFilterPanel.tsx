/**
 * src/components/v2/SignalFilterPanel.tsx
 * Left column: signal filters — type, severity, entity, channel, audience, date range.
 */

import React from 'react';
import { Filter, Search, X } from 'lucide-react';
import type { SignalType, SignalSeverity } from '../../types/signal';

// ─── Constants ───────────────────────────────────────────────────────────────────

const TYPE_OPTIONS: { key: SignalType; label: string }[] = [
  { key: 'competitor', label: 'Competitor' },
  { key: 'search',     label: 'Search' },
  { key: 'media',      label: 'Media' },
  { key: 'audience',   label: 'Audience' },
  { key: 'channel',    label: 'Channel' },
];

const SEVERITY_OPTIONS: { key: SignalSeverity; label: string; color: string }[] = [
  { key: 'critical', label: 'Critical', color: 'bg-rose-500' },
  { key: 'warning',  label: 'Warning',  color: 'bg-amber-500' },
  { key: 'info',     label: 'Info',     color: 'bg-blue-500' },
];

// ─── Filter interface ────────────────────────────────────────────────────────────

export interface SignalFilters {
  types: SignalType[];
  severities: SignalSeverity[];
  entity: string;
  channel: string;
  audience: string;
  dateFrom: string;
  dateTo: string;
}

export const DEFAULT_FILTERS: SignalFilters = {
  types: [],
  severities: [],
  entity: '',
  channel: '',
  audience: '',
  dateFrom: '',
  dateTo: '',
};

// ─── Toggle chip ─────────────────────────────────────────────────────────────────

const ToggleChip: React.FC<{
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ selected, onClick, children }) => (
  <button
    onClick={onClick}
    className={`text-[9px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
      selected
        ? 'bg-[#3cb4e6]/10 text-[#0a3d7a] border-[#3cb4e6]/30'
        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
    }`}
  >
    {children}
  </button>
);

// ─── Main component ──────────────────────────────────────────────────────────────

interface SignalFilterPanelProps {
  filters: SignalFilters;
  onChange: (filters: SignalFilters) => void;
  onReset: () => void;
}

const SignalFilterPanel: React.FC<SignalFilterPanelProps> = ({ filters, onChange, onReset }) => {
  const update = (patch: Partial<SignalFilters>) => onChange({ ...filters, ...patch });

  const toggleType = (t: SignalType) => {
    const next = filters.types.includes(t)
      ? filters.types.filter(x => x !== t)
      : [...filters.types, t];
    update({ types: next });
  };

  const toggleSeverity = (s: SignalSeverity) => {
    const next = filters.severities.includes(s)
      ? filters.severities.filter(x => x !== s)
      : [...filters.severities, s];
    update({ severities: next });
  };

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.severities.length > 0 ||
    filters.entity ||
    filters.channel ||
    filters.audience ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#3cb4e6]" />
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Filters</span>
        </div>
        {hasActiveFilters && (
          <button onClick={onReset} className="flex items-center gap-1 text-[8px] font-bold text-slate-400 hover:text-rose-500 transition-colors">
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <div className="px-4 py-3 space-y-4">
        {/* Signal Type */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Signal Type</p>
          <div className="flex flex-wrap gap-1.5">
            {TYPE_OPTIONS.map(opt => (
              <ToggleChip key={opt.key} selected={filters.types.includes(opt.key)} onClick={() => toggleType(opt.key)}>
                {opt.label}
              </ToggleChip>
            ))}
          </div>
        </div>

        {/* Severity */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Severity</p>
          <div className="flex flex-wrap gap-1.5">
            {SEVERITY_OPTIONS.map(opt => (
              <ToggleChip key={opt.key} selected={filters.severities.includes(opt.key)} onClick={() => toggleSeverity(opt.key)}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${opt.color}`} />
                {opt.label}
              </ToggleChip>
            ))}
          </div>
        </div>

        {/* Entity */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Entity</p>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
            <input
              type="text"
              value={filters.entity}
              onChange={e => update({ entity: e.target.value })}
              placeholder="Filter by entity…"
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-medium text-slate-700 placeholder-slate-400 outline-none focus:border-[#3cb4e6] transition-all"
            />
          </div>
        </div>

        {/* Channel */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Channel</p>
          <input
            type="text"
            value={filters.channel}
            onChange={e => update({ channel: e.target.value })}
            placeholder="Filter by channel…"
            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-medium text-slate-700 placeholder-slate-400 outline-none focus:border-[#3cb4e6] transition-all"
          />
        </div>

        {/* Audience */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Audience</p>
          <input
            type="text"
            value={filters.audience}
            onChange={e => update({ audience: e.target.value })}
            placeholder="Filter by audience…"
            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-medium text-slate-700 placeholder-slate-400 outline-none focus:border-[#3cb4e6] transition-all"
          />
        </div>

        {/* Date Range */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Date Range</p>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={e => update({ dateFrom: e.target.value })}
              className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[9px] font-medium text-slate-700 outline-none focus:border-[#3cb4e6] transition-all"
            />
            <span className="text-[9px] text-slate-400 self-center">—</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={e => update({ dateTo: e.target.value })}
              className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[9px] font-medium text-slate-700 outline-none focus:border-[#3cb4e6] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalFilterPanel;
