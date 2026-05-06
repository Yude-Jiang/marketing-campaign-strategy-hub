/**
 * src/components/v2/CompetitorSwitcher.tsx
 * T11: Competitive War Room — competitor selector tabs.
 */

import React from 'react';
import { Swords } from 'lucide-react';
import type { CompetitorIntel } from '../../types/competitor';

interface CompetitorSwitcherProps {
  competitors: CompetitorIntel[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const CompetitorSwitcher: React.FC<CompetitorSwitcherProps> = ({
  competitors,
  selectedId,
  onSelect,
}) => {
  if (competitors.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
        <Swords className="w-5 h-5 text-slate-300 mx-auto mb-2" />
        <p className="text-[10px] text-slate-400">No competitors loaded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-1.5">
        <Swords className="w-3.5 h-3.5 text-[#3cb4e6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          Competitor
        </span>
      </div>

      {/* Tab list */}
      <div className="flex">
        {competitors.map(comp => (
          <button
            key={comp.id}
            onClick={() => onSelect(comp.id)}
            className={`flex-1 text-left px-3 py-2.5 text-[10px] font-bold transition-all border-r border-slate-100 last:border-r-0 ${
              comp.id === selectedId
                ? 'bg-[#3cb4e6]/5 text-[#0a3d7a] border-b-2 border-b-[#3cb4e6]'
                : 'text-slate-500 hover:bg-slate-50 border-b-2 border-b-transparent'
            }`}
          >
            <span className="truncate block">{comp.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompetitorSwitcher;
