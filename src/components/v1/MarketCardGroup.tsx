/**
 * src/components/v1/MarketCardGroup.tsx
 * 4-card grid: Buyer Personas / Industries / Use Cases / Competitors.
 */

import React from 'react';
import { Users, Building2, PlayCircle, Swords } from 'lucide-react';
import type { BuyerPersona, UseCase, CompetitorCard } from '../../types/market';

// ─── Icon map ────────────────────────────────────────────────────────────────────

const CARD_ICONS = [Users, Building2, PlayCircle, Swords] as const;

// ─── Shared card wrapper ─────────────────────────────────────────────────────────

const CardFrame: React.FC<{
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

// ─── Sub-component: Buyer Persona Card ───────────────────────────────────────────

const PersonaCard: React.FC<{ persona: BuyerPersona }> = ({ persona }) => (
  <div className="mb-3 last:mb-0 pb-3 border-b border-slate-50 last:border-0">
    <p className="text-xs font-black text-[#03234b] mb-2">{persona.role}</p>
    <div className="space-y-1.5">
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Responsibilities</p>
        <ul className="space-y-0.5">
          {persona.responsibilities.map((r, i) => (
            <li key={i} className="text-[10px] text-slate-600 flex items-start gap-1.5">
              <span className="text-[#3cb4e6] mt-0.5">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Pain Points</p>
        <ul className="space-y-0.5">
          {persona.painPoints.map((p, i) => (
            <li key={i} className="text-[10px] text-rose-600 flex items-start gap-1.5">
              <span className="text-rose-400 mt-0.5">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// ─── Sub-component: Use Case Card ────────────────────────────────────────────────

const UseCaseItem: React.FC<{ uc: UseCase }> = ({ uc }) => (
  <div className="mb-3 last:mb-0 pb-3 border-b border-slate-50 last:border-0">
    <p className="text-xs font-black text-[#03234b] mb-1">{uc.name}</p>
    <p className="text-[10px] text-slate-500 mb-1 leading-relaxed">
      <span className="font-bold text-slate-600">Scenario: </span>{uc.scenario}
    </p>
    <p className="text-[10px] text-slate-600 leading-relaxed">
      <span className="font-bold text-emerald-600">Value: </span>{uc.valueDelivered}
    </p>
  </div>
);

// ─── Sub-component: Competitor Card ──────────────────────────────────────────────

const CompetitorItem: React.FC<{ comp: CompetitorCard }> = ({ comp }) => (
  <div className="mb-3 last:mb-0 pb-3 border-b border-slate-50 last:border-0">
    <p className="text-xs font-black text-[#03234b] mb-0.5">{comp.name}</p>
    <p className="text-[9px] text-slate-400 italic mb-1.5">{comp.positioning}</p>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <p className="text-[8px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Strengths</p>
        <ul className="space-y-0.5">
          {comp.strengths.map((s, i) => (
            <li key={i} className="text-[9px] text-slate-600 flex items-start gap-1">
              <span className="text-emerald-400 mt-0.5">+</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[8px] font-black uppercase tracking-widest text-rose-600 mb-0.5">Weaknesses</p>
        <ul className="space-y-0.5">
          {comp.weaknesses.map((w, i) => (
            <li key={i} className="text-[9px] text-slate-600 flex items-start gap-1">
              <span className="text-rose-400 mt-0.5">−</span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// ─── Industry tags ───────────────────────────────────────────────────────────────

const IndustryTags: React.FC<{ industries: string[] }> = ({ industries }) => (
  <div className="flex flex-wrap gap-1.5">
    {industries.map((ind, i) => (
      <span
        key={i}
        className="inline-block text-[9px] font-bold bg-[#3cb4e6]/10 text-[#0a3d7a] border border-[#3cb4e6]/20 px-2.5 py-1 rounded-full"
      >
        {ind}
      </span>
    ))}
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────────

interface MarketCardGroupProps {
  personas: BuyerPersona[];
  industries: string[];
  useCases: UseCase[];
  competitors: CompetitorCard[];
  locked: boolean;
}

const MarketCardGroup: React.FC<MarketCardGroupProps> = ({
  personas,
  industries,
  useCases,
  competitors,
  locked,
}) => {
  const sections: {
    icon: React.ElementType;
    label: string;
    content: React.ReactNode;
  }[] = [
    {
      icon: CARD_ICONS[0],
      label: 'Buyer Personas',
      content: personas.length === 0
        ? <p className="text-[10px] text-slate-400 text-center py-4">No personas generated.</p>
        : personas.map((p, i) => <PersonaCard key={i} persona={p} />),
    },
    {
      icon: CARD_ICONS[1],
      label: 'Target Industries',
      content: industries.length === 0
        ? <p className="text-[10px] text-slate-400 text-center py-4">No industries listed.</p>
        : <IndustryTags industries={industries} />,
    },
    {
      icon: CARD_ICONS[2],
      label: 'Use Cases',
      content: useCases.length === 0
        ? <p className="text-[10px] text-slate-400 text-center py-4">No use cases defined.</p>
        : useCases.map((uc, i) => <UseCaseItem key={i} uc={uc} />),
    },
    {
      icon: CARD_ICONS[3],
      label: 'Competitors',
      content: competitors.length === 0
        ? <p className="text-[10px] text-slate-400 text-center py-4">No competitors identified.</p>
        : competitors.map((c, i) => <CompetitorItem key={i} comp={c} />),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5">
      {sections.map((s, i) => (
        <CardFrame key={i} icon={s.icon} label={s.label} locked={locked}>
          {s.content}
        </CardFrame>
      ))}
    </div>
  );
};

export default MarketCardGroup;
