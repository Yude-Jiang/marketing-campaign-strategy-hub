/**
 * src/components/v2/ResonanceMatrix.tsx
 * T12: Audience & Message Lab — resonance score matrix (audience × pillar).
 * Click a cell to select it; detail panel renders alongside.
 */

import React from 'react';
import { MessageSquare } from 'lucide-react';
import type { AudienceSegment, MessagePillar, ResonanceCell } from '../../types/message';

// ─── Score color map ────────────────────────────────────────────────────────────

const SCORE_COLORS: Record<number, { bg: string; text: string; border: string }> = {
  5: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
  4: { bg: 'bg-blue-100',   text: 'text-blue-700',    border: 'border-blue-300' },
  3: { bg: 'bg-amber-100',  text: 'text-amber-700',   border: 'border-amber-300' },
  2: { bg: 'bg-orange-100', text: 'text-orange-700',  border: 'border-orange-300' },
  1: { bg: 'bg-rose-100',   text: 'text-rose-700',    border: 'border-rose-300' },
};

const getScoreMeta = (score: number) =>
  SCORE_COLORS[score] ?? SCORE_COLORS[3];

// ─── Props ──────────────────────────────────────────────────────────────────────

interface ResonanceMatrixProps {
  audiences: AudienceSegment[];
  pillars: MessagePillar[];
  cells: ResonanceCell[];
  selectedCellKey: string | null;
  onSelectCell: (cellKey: string) => void;
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

const makeKey = (audienceId: string, pillarId: string) => `${audienceId}:${pillarId}`;

const findCell = (cells: ResonanceCell[], audienceId: string, pillarId: string) =>
  cells.find(c => c.audienceId === audienceId && c.pillarId === pillarId) ?? null;

// ─── Component ──────────────────────────────────────────────────────────────────

const ResonanceMatrix: React.FC<ResonanceMatrixProps> = ({
  audiences,
  pillars,
  cells,
  selectedCellKey,
  onSelectCell,
}) => {
  if (audiences.length === 0 || pillars.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
        <MessageSquare className="w-5 h-5 text-slate-300 mx-auto mb-2" />
        <p className="text-[10px] text-slate-400">
          No audience segments or message pillars configured.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-1.5">
        <MessageSquare className="w-3.5 h-3.5 text-[#3cb4e6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          Audience × Message Resonance
        </span>
      </div>

      {/* Scrollable matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-[9px]">
          {/* Header row */}
          <thead>
            <tr>
              <th className="text-left px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50 border-b border-slate-100 min-w-[120px]">
                Audience / Pillar
              </th>
              {pillars.map(p => (
                <th
                  key={p.id}
                  className="px-2 py-2 text-center text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50 border-b border-slate-100 border-l border-slate-50 min-w-[80px]"
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {audiences.map(a => (
              <tr key={a.id} className="border-b border-slate-50 last:border-0">
                {/* Audience label */}
                <td className="px-3 py-2.5 text-[9px] font-bold text-slate-700">
                  <span>{a.label}</span>
                  <span className="text-[8px] text-slate-400 block">{a.role}</span>
                </td>

                {/* Score cells */}
                {pillars.map(p => {
                  const cell = findCell(cells, a.id, p.id);
                  const key = makeKey(a.id, p.id);
                  const isSelected = key === selectedCellKey;
                  const score = cell?.score ?? 0;
                  const meta = score > 0 ? getScoreMeta(score) : null;

                  return (
                    <td
                      key={p.id}
                      className="px-2 py-2 text-center border-l border-slate-50"
                    >
                      <button
                        onClick={() => onSelectCell(key)}
                        className={`
                          w-full min-h-[40px] rounded-lg border-2 font-black text-xs
                          transition-all duration-150
                          ${score === 0
                            ? 'bg-slate-50 text-slate-300 border-transparent cursor-default'
                            : `
                              ${meta?.bg} ${meta?.text} ${meta?.border}
                              hover:shadow-md hover:scale-105
                              ${isSelected ? 'ring-2 ring-[#3cb4e6] ring-offset-1 scale-105 shadow-md' : ''}
                            `
                          }
                        `}
                        disabled={score === 0}
                      >
                        {score > 0 ? score : '—'}
                      </button>
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

export default ResonanceMatrix;
