/**
 * src/components/v1/StrategyMatrix.tsx
 * Audience × Message Pillar matrix with clickable resonance cells.
 */

import React, { useState } from 'react';
import { Target } from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────────

type Resonance = 'high' | 'medium' | 'low';

const RESONANCE_COLORS: Record<Resonance, string> = {
  high: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  medium: 'bg-amber-100 text-amber-800 border-amber-300',
  low: 'bg-slate-100 text-slate-500 border-slate-200',
};

const RESONANCE_LABELS: Record<Resonance, string> = {
  high: 'High',
  medium: 'Med',
  low: 'Low',
};

// ─── Component ───────────────────────────────────────────────────────────────────

interface StrategyMatrixProps {
  data: { audience: string; pillar: string; resonance: Resonance }[];
  locked: boolean;
}

const StrategyMatrix: React.FC<StrategyMatrixProps> = ({ data, locked }) => {
  // Derive unique audiences and pillars, preserving input order
  const audiences = [...new Set(data.map(d => d.audience))];
  const pillars = [...new Set(data.map(d => d.pillar))];

  // Selected cell tracking
  const [selected, setSelected] = useState<{ audience: string; pillar: string } | null>(null);

  // Build lookup map: "audience||pillar" → resonance
  const lookup = new Map<string, Resonance>();
  data.forEach(d => lookup.set(`${d.audience}||${d.pillar}`, d.resonance));

  const getResonance = (audience: string, pillar: string): Resonance | null =>
    lookup.get(`${audience}||${pillar}`) ?? null;

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-10 text-center">
        <Target className="w-6 h-6 text-slate-300 mx-auto mb-2" />
        <p className="text-[10px] text-slate-400">No matrix data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#3cb4e6]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Audience × Message Matrix
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50 border-b border-slate-100 min-w-[180px]">
                Audience
              </th>
              {pillars.map(p => (
                <th
                  key={p}
                  className="text-center px-3 py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50 border-b border-slate-100 min-w-[100px]"
                >
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {audiences.map(aud => (
              <tr key={aud} className="border-b border-slate-50 last:border-0">
                <td className="px-4 py-3 text-[10px] font-bold text-[#03234b]">{aud}</td>
                {pillars.map(p => {
                  const res = getResonance(aud, p);
                  const isSelected = selected?.audience === aud && selected?.pillar === p;
                  return (
                    <td key={p} className="px-3 py-3 text-center">
                      {res ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (!locked) {
                              setSelected(isSelected ? null : { audience: aud, pillar: p });
                            }
                          }}
                          className={`w-full text-[9px] font-bold px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
                            RESONANCE_COLORS[res]
                          } ${
                            isSelected ? 'ring-2 ring-[#3cb4e6] ring-offset-1 scale-105' : ''
                          } ${
                            locked ? 'cursor-default' : 'hover:opacity-80'
                          }`}
                        >
                          {RESONANCE_LABELS[res]}
                        </button>
                      ) : (
                        <span className="text-[9px] text-slate-200">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StrategyMatrix;
