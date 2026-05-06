/**
 * src/components/v2/SignalDetailPanel.tsx
 * Right column: signal detail view with action buttons.
 */

import React, { useState } from 'react';
import {
  Radio,
  X,
  Pin,
  BookmarkPlus,
  Zap,
  AlertTriangle,
  AlertCircle,
  Info,
  Calendar,
  Tag,
  Globe,
  Users,
} from 'lucide-react';
import type { SignalEvent, SignalType, SignalSeverity } from '../../types/signal';

// ─── Type meta ───────────────────────────────────────────────────────────────────

const TYPE_META: Record<SignalType, { label: string; color: string }> = {
  competitor: { label: 'Competitor', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  search:     { label: 'Search',     color: 'text-blue-600 bg-blue-50 border-blue-200' },
  media:      { label: 'Media',      color: 'text-purple-600 bg-purple-50 border-purple-200' },
  audience:   { label: 'Audience',   color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  channel:    { label: 'Channel',    color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
};

const SEVERITY_META: Record<SignalSeverity, { label: string; icon: React.ElementType; color: string }> = {
  critical: { label: 'Critical', icon: AlertCircle, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  warning:  { label: 'Warning',  icon: AlertTriangle, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  info:     { label: 'Info',     icon: Info,          color: 'text-blue-600 bg-blue-50 border-blue-200' },
};

// ─── Relative time ───────────────────────────────────────────────────────────────

const formatFullTime = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ─── Meta row helper ─────────────────────────────────────────────────────────────

const MetaRow: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({
  icon: Icon, label, value,
}) => (
  <div className="flex items-center gap-2">
    <Icon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
    <span className="text-[9px] text-slate-500">{label}:</span>
    <span className="text-[9px] font-medium text-slate-700">{value}</span>
  </div>
);

// ─── Detail Panel ────────────────────────────────────────────────────────────────

interface SignalDetailPanelProps {
  signal: SignalEvent | null;
  onClose: () => void;
}

const SignalDetailPanel: React.FC<SignalDetailPanelProps> = ({ signal, onClose }) => {
  const [pinned, setPinned] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);

  if (!signal) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-3">
          <Radio className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Signal Detail</p>
        <p className="text-[9px] text-slate-400 mt-2 max-w-[200px] leading-relaxed">
          Select a signal from the feed to view its full details.
        </p>
      </div>
    );
  }

  const tMeta = TYPE_META[signal.type];
  const sMeta = SEVERITY_META[signal.severity];
  const SevIcon = sMeta.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-[#3cb4e6]" />
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
            Signal Detail
          </span>
        </div>
        <button onClick={onClose} className="text-slate-300 hover:text-slate-500">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-4 space-y-4">
        {/* Badge row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${tMeta.color}`}>
            {tMeta.label}
          </span>
          <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${sMeta.color}`}>
            <SevIcon className="w-2.5 h-2.5 inline mr-0.5" />
            {sMeta.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-black text-[#03234b] leading-relaxed">{signal.title}</h3>

        {/* Summary */}
        <p className="text-[10px] text-slate-600 leading-relaxed bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
          {signal.summary}
        </p>

        {/* Meta grid */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3">
          <MetaRow icon={Tag} label="Entity" value={signal.entity} />
          {signal.channel && <MetaRow icon={Globe} label="Channel" value={signal.channel} />}
          {signal.audience && <MetaRow icon={Users} label="Audience" value={signal.audience} />}
          <MetaRow icon={Calendar} label="Detected at" value={formatFullTime(signal.createdAt)} />
          <MetaRow icon={Tag} label="Signal ID" value={signal.id} />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
          <button
            onClick={() => setPinned(prev => !prev)}
            className={`flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-wider w-full px-3 py-2 rounded-lg border transition-all ${
              pinned
                ? 'text-rose-600 bg-rose-50 border-rose-200'
                : 'text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Pin className={`w-3 h-3 ${pinned ? 'rotate-45' : ''}`} />
            {pinned ? 'Pinned' : 'Pin Signal'}
          </button>
          <button
            onClick={() => setWatchlisted(prev => !prev)}
            className={`flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-wider w-full px-3 py-2 rounded-lg border transition-all ${
              watchlisted
                ? 'text-indigo-600 bg-indigo-50 border-indigo-200'
                : 'text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BookmarkPlus className="w-3 h-3" />
            {watchlisted ? 'Watchlisted' : 'Add to Watchlist'}
          </button>
          <button
            onClick={() => alert('Create Action — this will open the War Room to act on this signal.')}
            className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-wider w-full px-3 py-2 rounded-lg bg-[#03234b] text-white hover:bg-[#0a3d7a] transition-all shadow-sm"
          >
            <Zap className="w-3 h-3" />
            Create Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignalDetailPanel;
