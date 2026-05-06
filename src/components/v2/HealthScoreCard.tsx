/**
 * src/components/v2/HealthScoreCard.tsx
 * Hero health score with radial gauge and trend indicator.
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

interface HealthScoreCardProps {
  score: number;
  trend: 'up' | 'flat' | 'down';
}

const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score, trend }) => {
  const color =
    score >= 80 ? 'text-emerald-500'
      : score >= 50 ? 'text-amber-500'
        : 'text-rose-500';

  const ringColor =
    score >= 80 ? 'stroke-emerald-500'
      : score >= 50 ? 'stroke-amber-500'
        : 'stroke-rose-500';

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-500' : 'text-slate-400';
  const trendLabel = trend === 'up' ? 'Up from last week' : trend === 'down' ? 'Down from last week' : 'Flat';

  // SVG circular gauge
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-[#3cb4e6]" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          Campaign Health
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* SVG gauge */}
        <div className="relative flex-shrink-0">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle
              cx="64" cy="64" r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="10"
            />
            <circle
              cx="64" cy="64" r={radius}
              fill="none"
              className={ringColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 64 64)"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-black ${color}`}>{score}</span>
          </div>
        </div>

        {/* Trend info */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <TrendIcon className={`w-4 h-4 ${trendColor}`} />
            <span className={`text-[10px] font-bold ${trendColor}`}>{trendLabel}</span>
          </div>
          <p className="text-[9px] text-slate-400 leading-relaxed max-w-[180px]">
            Overall campaign health is based on share of voice, design-in velocity, signal volume, and risk-weighted adjustments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreCard;
