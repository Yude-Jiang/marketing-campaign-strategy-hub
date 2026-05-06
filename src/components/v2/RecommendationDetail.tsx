/**
 * src/components/v2/RecommendationDetail.tsx
 * T13: Optimization Center — full detail and action panel (right side).
 */

import React from 'react';
import {
  FileText,
  Crosshair,
  Zap,
  GitBranch,
  CheckCircle,
  Edit3,
  XCircle,
  Clock,
  AlertCircle,
  Info,
} from 'lucide-react';
import type { OptimizationRecommendation, RecommendationStatus } from '../../types/optimization';

// ─── Priority meta ──────────────────────────────────────────────────────────────

const PRIORITY_META: Record<string, { label: string; color: string }> = {
  P1: { label: 'P1 — High', color: 'text-rose-600 bg-rose-50 border-rose-200' },
  P2: { label: 'P2 — Medium', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  P3: { label: 'P3 — Low', color: 'text-slate-500 bg-slate-100 border-slate-200' },
};

const TARGET_LABEL: Record<string, string> = {
  brief: 'Campaign Brief',
  strategy: 'Strategy Pack',
  asset: 'Asset',
  channel: 'Channel Configuration',
};

const TARGET_ICON: Record<string, React.ElementType> = {
  brief: FileText,
  strategy: Crosshair,
  asset: Zap,
  channel: GitBranch,
};

const STATUS_ACTIONS: { status: RecommendationStatus; label: string; icon: React.ElementType; color: string }[] = [
  { status: 'approved', label: 'Approve',   icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100' },
  { status: 'modified', label: 'Modify',    icon: Edit3,       color: 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100' },
  { status: 'rejected', label: 'Reject',    icon: XCircle,     color: 'text-slate-500 bg-slate-100 border-slate-200 hover:bg-slate-200' },
  { status: 'snoozed',  label: 'Snooze',    icon: Clock,       color: 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100' },
];

// ─── Format date ────────────────────────────────────────────────────────────────

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ─── Props ──────────────────────────────────────────────────────────────────────

interface RecommendationDetailProps {
  recommendation: OptimizationRecommendation | null;
  onStatusChange: (id: string, newStatus: RecommendationStatus) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────────

const RecommendationDetail: React.FC<RecommendationDetailProps> = ({
  recommendation,
  onStatusChange,
}) => {
  if (!recommendation) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Info className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
          No Recommendation Selected
        </p>
        <p className="text-[9px] text-slate-400 max-w-[240px] leading-relaxed">
          Select an item from the queue to view its full detail, suggested changes, and approval actions.
        </p>
      </div>
    );
  }

  const rec = recommendation;
  const pMeta = PRIORITY_META[rec.priority];
  const TargetIcon = TARGET_ICON[rec.targetObject.type] ?? FileText;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-1.5">
        <TargetIcon className="w-3.5 h-3.5 text-[#3cb4e6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          Recommendation Detail
        </span>
        <span className="text-[8px] text-slate-400 ml-auto">{rec.id}</span>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Title + badges */}
        <div>
          <div className="flex items-center gap-1.5 flex-wrap mb-2">
            <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${pMeta.color}`}>
              {pMeta.label}
            </span>
            <span className="text-[8px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
              {TARGET_LABEL[rec.targetObject.type]}
            </span>
          </div>
          <h3 className="text-sm font-black text-[#03234b] leading-relaxed">{rec.title}</h3>
        </div>

        {/* Reason */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Reason</p>
          <p className="text-[10px] text-slate-600 leading-relaxed bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
            {rec.reason}
          </p>
        </div>

        {/* Suggested Change */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Suggested Change</p>
          <p className="text-[10px] text-slate-700 leading-relaxed bg-indigo-50/50 rounded-xl px-3 py-2.5 border border-indigo-100">
            {rec.suggestedChange}
          </p>
        </div>

        {/* Impact Summary */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Impact Summary</p>
          <div className="flex items-start gap-2 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
            <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span>{rec.impactSummary}</span>
          </div>
        </div>

        {/* Affected Object */}
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Affected Object</p>
          <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5">
            <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
              <TargetIcon className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-700">{TARGET_LABEL[rec.targetObject.type]}</p>
              <p className="text-[8px] text-slate-400">Ref: {rec.targetObject.refId}</p>
            </div>
          </div>
        </div>

        {/* Meta */}
        <p className="text-[8px] text-slate-400 text-right">
          Created: {formatDate(rec.createdAt)}
        </p>

        {/* Action buttons */}
        <div className="border-t border-slate-100 pt-3">
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Actions
          </p>
          <div className="grid grid-cols-2 gap-2">
            {STATUS_ACTIONS.map(action => {
              const Icon = action.icon;
              const isActive = rec.status === action.status;
              return (
                <button
                  key={action.status}
                  onClick={() => onStatusChange(rec.id, action.status)}
                  className={`flex items-center justify-center gap-1.5 text-[8px] font-black uppercase tracking-wider px-3 py-2.5 rounded-lg border transition-all ${
                    isActive
                      ? action.color.replace('hover:', '')
                      : 'text-slate-400 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetail;
