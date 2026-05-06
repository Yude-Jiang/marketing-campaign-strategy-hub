/**
 * src/components/v2/ExperimentQueue.tsx
 * T12: Audience & Message Lab — experiment queue (backlog / running / done).
 */

import React from 'react';
import { FlaskConical, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import type { ExperimentItem } from '../../types/message';
import type { AudienceSegment, MessagePillar } from '../../types/message';

// ─── Priority meta ──────────────────────────────────────────────────────────────

const PRIORITY_META: Record<string, { label: string; color: string }> = {
  high:   { label: 'High',   color: 'text-rose-600 bg-rose-50 border-rose-200' },
  medium: { label: 'Medium', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  low:    { label: 'Low',    color: 'text-slate-500 bg-slate-100 border-slate-200' },
};

const STATUS_META: Record<string, { label: string; color: string }> = {
  backlog: { label: 'Backlog', color: 'text-slate-500 bg-slate-100 border-slate-200' },
  running: { label: 'Running', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  done:    { label: 'Done',    color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
};

// ─── Props ──────────────────────────────────────────────────────────────────────

interface ExperimentQueueProps {
  experiments: ExperimentItem[];
  audiences: AudienceSegment[];
  pillars: MessagePillar[];
  onAdd: () => void;
  onTogglePriority: (id: string) => void;
  onRemove: (id: string) => void;
}

// ─── Lookup helpers ─────────────────────────────────────────────────────────────

const findLabel = (list: { id: string; label?: string; name?: string }[], id: string): string =>
  list.find(x => x.id === id)?.label ?? list.find(x => x.id === id)?.name ?? id;

// ─── Component ──────────────────────────────────────────────────────────────────

const ExperimentQueue: React.FC<ExperimentQueueProps> = ({
  experiments,
  audiences,
  pillars,
  onAdd,
  onTogglePriority,
  onRemove,
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    {/* Header */}
    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <FlaskConical className="w-3.5 h-3.5 text-[#3cb4e6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          Experiment Queue
        </span>
        <span className="text-[8px] text-slate-400">
          {experiments.length} items
        </span>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-[#3cb4e6] hover:text-[#0a3d7a] transition-colors"
      >
        <Plus className="w-3 h-3" />
        Add
      </button>
    </div>

    {/* List */}
    {experiments.length === 0 ? (
      <div className="p-6 text-center">
        <FlaskConical className="w-5 h-5 text-slate-300 mx-auto mb-2" />
        <p className="text-[10px] text-slate-400">No experiments queued.</p>
        <button
          onClick={onAdd}
          className="mt-3 text-[9px] font-bold text-[#3cb4e6] hover:text-[#0a3d7a] transition-colors"
        >
          + Add your first experiment
        </button>
      </div>
    ) : (
      <div className="divide-y divide-slate-50">
        {experiments.map(exp => {
          const pMeta = PRIORITY_META[exp.priority];
          const sMeta = STATUS_META[exp.status];
          return (
            <div key={exp.id} className="px-4 py-3 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {/* Hypothesis */}
                  <p className="text-[10px] text-slate-700 font-medium leading-relaxed">
                    {exp.hypothesis}
                  </p>

                  {/* Meta tags */}
                  <div className="flex items-center flex-wrap gap-1.5 mt-1.5">
                    <span className={`text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${pMeta.color}`}>
                      {pMeta.label}
                    </span>
                    <span className={`text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${sMeta.color}`}>
                      {sMeta.label}
                    </span>
                    <span className="text-[8px] text-slate-400">
                      {findLabel(audiences, exp.audienceId)} · {findLabel(pillars, exp.pillarId)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => onTogglePriority(exp.id)}
                    className="p-1 rounded text-slate-300 hover:text-amber-600 transition-colors"
                    title="Toggle priority"
                  >
                    {exp.priority === 'high' ? (
                      <ArrowDown className="w-3 h-3" />
                    ) : (
                      <ArrowUp className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    onClick={() => onRemove(exp.id)}
                    className="p-1 rounded text-slate-300 hover:text-rose-500 transition-colors"
                    title="Remove"
                  >
                    <span className="text-[10px] font-bold">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default ExperimentQueue;
