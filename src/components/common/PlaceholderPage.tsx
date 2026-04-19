import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  phase?: 'v1' | 'v2' | 'legacy';
}

const PHASE_CONFIG = {
  v1: {
    label: 'V1 · Campaign OS',
    badgeCls: 'bg-blue-100 text-blue-700',
    borderCls: 'border-blue-200',
    bgCls: 'bg-blue-50',
    accentCls: 'text-blue-400',
  },
  v2: {
    label: 'V2 · Intelligence Layer',
    badgeCls: 'bg-violet-100 text-violet-700',
    borderCls: 'border-violet-200',
    bgCls: 'bg-violet-50',
    accentCls: 'text-violet-400',
  },
  legacy: {
    label: 'Legacy',
    badgeCls: 'bg-slate-100 text-slate-500',
    borderCls: 'border-slate-200',
    bgCls: 'bg-slate-50',
    accentCls: 'text-slate-300',
  },
} as const;

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  phase = 'v1',
}) => {
  const cfg = PHASE_CONFIG[phase];

  return (
    <div className={`min-h-full ${cfg.bgCls} flex flex-col items-center justify-center p-12`}>
      <div className={`bg-white rounded-2xl border ${cfg.borderCls} shadow-sm p-10 max-w-lg w-full text-center`}>
        <Construction className={`w-10 h-10 ${cfg.accentCls} mx-auto mb-5`} />
        <span
          className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cfg.badgeCls} mb-4`}
        >
          {cfg.label}
        </span>
        <h2 className="text-2xl font-black text-slate-800 mb-2">{title}</h2>
        {description && (
          <p className="text-sm text-slate-500 leading-relaxed mt-2">{description}</p>
        )}
        <p className="text-xs text-slate-400 mt-8 italic">
          Scaffold ready — implementation incoming
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
