/**
 * src/components/v2/RebuttalList.tsx
 * T11: Competitive War Room — rebuttal suggestions for differentiation messaging.
 */

import React from 'react';
import { ShieldCheck, Lightbulb } from 'lucide-react';
import type { RebuttalSuggestion } from '../../types/competitor';

interface RebuttalListProps {
  rebuttals: RebuttalSuggestion[];
}

const RebuttalList: React.FC<RebuttalListProps> = ({ rebuttals }) => {
  if (rebuttals.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
        <ShieldCheck className="w-5 h-5 text-slate-300 mx-auto mb-2" />
        <p className="text-[10px] text-slate-400">No rebuttals generated.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#3cb4e6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          Rebuttal Suggestions
        </span>
        <span className="text-[8px] text-slate-400 ml-auto">{rebuttals.length} rebuttals</span>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-50">
        {rebuttals.map((r, i) => (
          <div key={i} className="px-4 py-3 hover:bg-slate-50/50 transition-colors">
            {/* Pillar badge */}
            <span className="inline-block text-[8px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded mb-2">
              {r.pillar}
            </span>

            {/* Angle */}
            <p className="text-[10px] text-slate-700 leading-relaxed mb-1.5">{r.angle}</p>

            {/* Evidence hint */}
            {r.evidenceHint && (
              <div className="flex items-start gap-1.5 text-[8px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5">
                <Lightbulb className="w-2.5 h-2.5 flex-shrink-0 mt-0.5" />
                <span>{r.evidenceHint}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RebuttalList;
