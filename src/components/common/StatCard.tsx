import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { direction: 'up' | 'down' | 'neutral'; label: string };
}

const TREND_COLORS: Record<string, string> = {
  up:      'text-emerald-600',
  down:    'text-rose-500',
  neutral: 'text-slate-400',
};

const StatCard: React.FC<StatCardProps> = ({ label, value, trend }) => (
  <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-2xl font-black text-[#03234b] leading-none mb-2">
      {value}
    </p>
    {trend && (
      <p className={`text-[10px] font-bold flex items-center gap-1 ${TREND_COLORS[trend.direction] ?? 'text-slate-400'}`}>
        {trend.direction === 'up' && '↑'}
        {trend.direction === 'down' && '↓'}
        {trend.direction === 'neutral' && '→'}
        {trend.label}
      </p>
    )}
  </div>
);

export default StatCard;
