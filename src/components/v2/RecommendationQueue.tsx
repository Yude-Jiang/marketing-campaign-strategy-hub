/**
 * src/components/v2/RecommendationQueue.tsx
 * T13: Optimization Center — scrollable recommendation queue (left panel).
 */

import React from 'react';
import { ListChecks, FileText, Crosshair, Zap, GitBranch } from 'lucide-react';
import type { OptimizationRecommendation } from '../../types/optimization';

// ─── Priority meta ──────────────────────────────────────────────────────────────

const PRIORITY_META: Record<string, { label: string; color: string }> = {
  P1: { label: 'P1', color: 'text-rose-600 bg-rose-50 border-rose-200' },
  P2: { label: 'P2', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  P3: { label: 'P3', color: 'text-slate-500 bg-slate-100 border-slate-200' },
};

const STATUS_META: Record<string, { label: string; color: string }> = {
  queued:   { label: 'Queued',   color: 'text-blue-600 bg-blue-50 border-blue-200' },
  approved: { label: 'Approved', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  modified: { label: 'Modified', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  rejected: { label: 'Rejected', color: 'text-slate-500 bg-slate-100 border-slate-200' },
  snoozed:  { label: 'Snoozed',  color: 'text-amber-600 bg-amber-50 border-amber-200' },
};

const TARGET_ICON: Record<string, React.ElementType> = {
  brief:   FileText,
  strategy: Crosshair,
  asset:   Zap,
  channel: GitBranch,
};

// ─── Relative time ──────────────────────────────────────────────────────────────

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

// ─── Props ──────────────────────────────────────────────────────────────────────

interface RecommendationQueueProps {
  recommendations: OptimizationRecommendation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────────

const RecommendationQueue: React.FC<RecommendationQueueProps> = ({
  recommendations,
  selectedId,
  onSelect,
}) => {
  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
        <ListChecks className="w-5 h-5 text-slate-300 mx-auto mb-2" />
        <p className="text-[10px] text-slate-400">No recommendations pending.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-1.5">
        <ListChecks className="w-3.5 h-3.5 text-[#3cb4e6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          Queue
        </span>
        <span className="text-[8px] text-slate-400 ml-auto">
          {recommendations.length} items
        </span>
      </div>

      {/* Scrollable list */}
      <div className="overflow-y-auto max-h-[600px]">
        {recommendations.map(rec => {
          const pMeta = PRIORITY_META[rec.priority];
          const sMeta = STATUS_META[rec.status];
          const TargetIcon = TARGET_ICON[rec.targetObject.type] ?? FileText;
          const isSelected = rec.id === selectedId;

          return (
            <button
              key={rec.id}
              onClick={() => onSelect(rec.id)}
              className={`w-full text-left px-4 py-3 border-b border-slate-50 transition-all ${
                isSelected
                  ? 'bg-[#3cb4e6]/5 border-l-2 border-l-[#3cb4e6]'
                  : 'hover:bg-slate-50 border-l-2 border-l-transparent'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {/* Target type icon */}
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isSelected ? 'bg-[#3cb4e6]/10' : 'bg-slate-100'
                }`}>
                  <TargetIcon className={`w-3 h-3 ${isSelected ? 'text-[#3cb4e6]' : 'text-slate-500'}`} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <p className={`text-[10px] font-bold leading-tight truncate ${
                    isSelected ? 'text-[#0a3d7a]' : 'text-slate-800'
                  }`}>
                    {rec.title}
                  </p>

                  {/* Reason preview */}
                  <p className="text-[8px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                    {rec.reason}
                  </p>

                  {/* Badge row */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className={`text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border ${pMeta.color}`}>
                      {pMeta.label}
                    </span>
                    <span className={`text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border ${sMeta.color}`}>
                      {sMeta.label}
                    </span>
                    <span className="text-[7px] text-slate-400 ml-auto">
                      {formatRelativeTime(rec.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationQueue;
