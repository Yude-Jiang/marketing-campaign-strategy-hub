/**
 * src/components/v2/KpiTile.tsx
 * Single KPI tile with label, value, and optional delta.
 */

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiTileProps {
  label: string;
  value: string;
  delta?: string;
}

const KpiTile: React.FC<KpiTileProps> = ({ label, value, delta }) => {
  const isPositive = delta?.startsWith('+');
  const isNegative = delta?.startsWith('-');

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3">
      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-lg font-black text-[#03234b] leading-none">{value}</span>
        {delta && (
          <span className={`flex items-center gap-0.5 text-[9px] font-bold leading-none mb-0.5 ${
            isPositive ? 'text-emerald-600' : isNegative ? 'text-rose-500' : 'text-slate-400'
          }`}>
            {isPositive && <TrendingUp className="w-2.5 h-2.5" />}
            {isNegative && <TrendingDown className="w-2.5 h-2.5" />}
            {delta}
          </span>
        )}
      </div>
    </div>
  );
};

export default KpiTile;
