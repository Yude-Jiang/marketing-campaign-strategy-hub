/**
 * src/components/v1/BuyerNeedsPanel.tsx
 * 3-section panel: Buyer Needs / Adoption Barriers / Market Narratives.
 */

import React from 'react';
import { ShoppingBag, ShieldAlert, MessageCircle } from 'lucide-react';

// ─── Section wrapper ─────────────────────────────────────────────────────────────

const SectionFrame: React.FC<{
  icon: React.ElementType;
  label: string;
  locked: boolean;
  children: React.ReactNode;
}> = ({ icon: Icon, label, locked, children }) => (
  <div className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden transition-all ${
    locked ? 'border-emerald-200' : 'border-slate-100'
  }`}>
    <div className={`px-5 py-3 flex items-center gap-2 ${
      locked ? 'bg-emerald-50' : 'bg-slate-50'
    }`}>
      <Icon className={`w-4 h-4 ${locked ? 'text-emerald-600' : 'text-[#3cb4e6]'}`} />
      <span className={`text-[10px] font-black uppercase tracking-widest ${
        locked ? 'text-emerald-700' : 'text-slate-500'
      }`}>{label}</span>
    </div>
    <div className="px-5 py-4">
      {children}
    </div>
  </div>
);

// ─── Bullet list helper ──────────────────────────────────────────────────────────

const BulletList: React.FC<{
  items: string[];
  emptyMessage: string;
  accent?: 'blue' | 'amber' | 'indigo';
}> = ({ items, emptyMessage, accent = 'blue' }) => {
  const dotColor = {
    blue: 'text-[#3cb4e6]',
    amber: 'text-amber-400',
    indigo: 'text-indigo-400',
  }[accent];

  if (items.length === 0) {
    return <p className="text-[10px] text-slate-400 text-center py-4">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[11px] leading-relaxed">
          <span className={`${dotColor} mt-0.5 flex-shrink-0`}>•</span>
          <span className="text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────────

interface BuyerNeedsPanelProps {
  buyerNeeds: string[];
  adoptionBarriers: string[];
  narratives: string[];
  locked: boolean;
}

const BuyerNeedsPanel: React.FC<BuyerNeedsPanelProps> = ({
  buyerNeeds,
  adoptionBarriers,
  narratives,
  locked,
}) => {
  const sections: {
    icon: React.ElementType;
    label: string;
    items: string[];
    emptyMessage: string;
    accent: 'blue' | 'amber' | 'indigo';
  }[] = [
    {
      icon: ShoppingBag,
      label: 'Buyer Needs',
      items: buyerNeeds,
      emptyMessage: 'No buyer needs identified.',
      accent: 'blue',
    },
    {
      icon: ShieldAlert,
      label: 'Adoption Barriers',
      items: adoptionBarriers,
      emptyMessage: 'No adoption barriers listed.',
      accent: 'amber',
    },
    {
      icon: MessageCircle,
      label: 'Market Narratives',
      items: narratives,
      emptyMessage: 'No narratives created.',
      accent: 'indigo',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-5">
      {sections.map((s, i) => (
        <SectionFrame key={i} icon={s.icon} label={s.label} locked={locked}>
          <BulletList items={s.items} emptyMessage={s.emptyMessage} accent={s.accent} />
        </SectionFrame>
      ))}
    </div>
  );
};

export default BuyerNeedsPanel;
