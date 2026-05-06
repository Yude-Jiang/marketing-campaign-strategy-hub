/**
 * src/components/v1/TacticPlayCard.tsx
 * Card component for individual tactical plays.
 */

import React from 'react';
import { Zap, Users, Radio, MessageSquare } from 'lucide-react';
import type { TacticalPlay } from '../../types/strategy';

interface TacticPlayCardProps {
  tactic: TacticalPlay;
  locked: boolean;
}

const TacticPlayCard: React.FC<TacticPlayCardProps> = ({ tactic, locked }) => (
  <div className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
    locked ? 'border-emerald-200' : 'border-slate-100'
  }`}>
    <div className={`px-4 py-2.5 flex items-center gap-2 border-b ${
      locked ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'
    }`}>
      <Zap className={`w-3.5 h-3.5 ${locked ? 'text-emerald-600' : 'text-[#3cb4e6]'}`} />
      <span className={`text-[10px] font-black text-[#03234b]`}>{tactic.name}</span>
    </div>
    <div className="px-4 py-3 space-y-2">
      <MetaRow icon={Users} label="Audience" value={tactic.audience} />
      <MetaRow icon={Radio} label="Channel" value={tactic.channel} />
      <MetaRow icon={MessageSquare} label="Message" value={tactic.message} />
    </div>
  </div>
);

const MetaRow: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({
  icon: Icon, label, value,
}) => (
  <div className="flex items-start gap-2">
    <Icon className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
    <div>
      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block">{label}</span>
      <span className="text-[10px] font-medium text-slate-700 leading-relaxed">{value}</span>
    </div>
  </div>
);

export default TacticPlayCard;
