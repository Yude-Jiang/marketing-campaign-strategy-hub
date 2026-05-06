/**
 * src/components/v2/RecommendedActionList.tsx
 * Recommended action items with priority badges and navigation trigger.
 */

import React from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import type { RecommendedAction } from '../../types/intel';

interface RecommendedActionListProps {
  actions: RecommendedAction[];
  onNavigate: (target: string) => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  P1: 'text-rose-600 bg-rose-50 border-rose-200',
  P2: 'text-amber-600 bg-amber-50 border-amber-200',
  P3: 'text-slate-500 bg-slate-100 border-slate-200',
};

const RecommendedActionList: React.FC<RecommendedActionListProps> = ({ actions, onNavigate }) => {
  if (actions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
        <AlertCircle className="w-5 h-5 text-slate-300 mx-auto mb-2" />
        <p className="text-[10px] text-slate-400">No recommended actions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-4 py-2.5 bg-indigo-50 border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-700">
            Recommended Actions
          </span>
        </div>
      </div>
      <div className="divide-y divide-slate-50">
        {actions.map(action => {
          const pColor = PRIORITY_COLORS[action.priority] || PRIORITY_COLORS.P3;
          return (
            <button
              key={action.id}
              onClick={() => onNavigate(action.targetObject)}
              className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors group"
            >
              <span className={`text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border flex-shrink-0 ${pColor}`}>
                {action.priority}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-slate-700 leading-relaxed">{action.title}</p>
                <p className="text-[8px] text-slate-400 mt-0.5 truncate">{action.targetObject}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#3cb4e6] transition-colors flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedActionList;
