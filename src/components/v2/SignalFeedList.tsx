/**
 * src/components/v2/SignalFeedList.tsx
 * Center column: time-ordered signal feed with severity highlights.
 */

import React from 'react';
import {
  Radio,
  Swords,
  Search,
  Newspaper,
  Users,
  GitBranch,
  AlertTriangle,
  AlertCircle,
  Info,
} from 'lucide-react';
import type { SignalEvent, SignalType, SignalSeverity } from '../../types/signal';

// ─── Type meta ───────────────────────────────────────────────────────────────────

const TYPE_META: Record<SignalType, { icon: React.ElementType; label: string }> = {
  competitor: { icon: Swords,     label: 'Competitor' },
  search:     { icon: Search,     label: 'Search' },
  media:      { icon: Newspaper,  label: 'Media' },
  audience:   { icon: Users,      label: 'Audience' },
  channel:    { icon: GitBranch,  label: 'Channel' },
};

// ─── Severity icon ───────────────────────────────────────────────────────────────

const SeverityIcon: React.FC<{ severity: SignalSeverity }> = ({ severity }) => {
  switch (severity) {
    case 'critical':
      return <AlertCircle className="w-3.5 h-3.5 text-rose-500" />;
    case 'warning':
      return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
    default:
      return <Info className="w-3.5 h-3.5 text-blue-500" />;
  }
};

// ─── Relative time ───────────────────────────────────────────────────────────────

const formatRelativeTime = (iso: string): string => {
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

// ─── Feed item ───────────────────────────────────────────────────────────────────

const FeedItem: React.FC<{
  signal: SignalEvent;
  isSelected: boolean;
  onClick: () => void;
}> = ({ signal, isSelected, onClick }) => {
  const TypeIcon = TYPE_META[signal.type].icon;
  const isCritical = signal.severity === 'critical';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-slate-50 transition-all ${
        isSelected
          ? 'bg-[#3cb4e6]/5 border-l-2 border-l-[#3cb4e6]'
          : isCritical
            ? 'bg-rose-50/50 hover:bg-slate-50 border-l-2 border-l-transparent'
            : 'hover:bg-slate-50 border-l-2 border-l-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Type icon */}
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isCritical ? 'bg-rose-100' : 'bg-slate-100'
        }`}>
          <TypeIcon className={`w-3.5 h-3.5 ${isCritical ? 'text-rose-600' : 'text-slate-500'}`} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title + severity */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <SeverityIcon severity={signal.severity} />
            <span className={`text-[10px] font-bold leading-tight truncate ${
              isCritical ? 'text-rose-800' : 'text-slate-800'
            }`}>
              {signal.title}
            </span>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 text-[8px] text-slate-400 mt-1">
            <span>{TYPE_META[signal.type].label}</span>
            <span>·</span>
            <span className="font-medium text-slate-500">{signal.entity}</span>
            <span>·</span>
            <span>{formatRelativeTime(signal.createdAt)}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────────

interface SignalFeedListProps {
  signals: SignalEvent[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  totalCount: number;
}

const SignalFeedList: React.FC<SignalFeedListProps> = ({
  signals, selectedId, onSelect, totalCount,
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
    {/* Header */}
    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Radio className="w-3.5 h-3.5 text-[#3cb4e6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Signal Feed</span>
      </div>
      <span className="text-[8px] text-slate-400">
        {signals.length} of {totalCount}
      </span>
    </div>

    {/* List */}
    <div className="flex-1 overflow-y-auto max-h-[700px]">
      {signals.length === 0 ? (
        <div className="p-8 text-center">
          <Radio className="w-6 h-6 text-slate-300 mx-auto mb-2" />
          <p className="text-[10px] text-slate-400">No signals match current filters.</p>
        </div>
      ) : (
        signals.map(sig => (
          <FeedItem
            key={sig.id}
            signal={sig}
            isSelected={sig.id === selectedId}
            onClick={() => onSelect(sig.id === selectedId ? null : sig.id)}
          />
        ))
      )}
    </div>
  </div>
);

export default SignalFeedList;
