/**
 * src/components/v2/OpportunityList.tsx
 * Opportunities + Risks dual section for Control Tower.
 */

import React from 'react';
import { Lightbulb, ShieldAlert } from 'lucide-react';
import type { OpportunityItem, RiskAlert } from '../../types/intel';

// ─── Section frame ───────────────────────────────────────────────────────────────

const SectionFrame: React.FC<{
  icon: React.ElementType;
  label: string;
  accent: string;
  children: React.ReactNode;
}> = ({ icon: Icon, label, accent, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className={`px-4 py-2.5 flex items-center gap-2 ${accent}`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <div className="px-4 py-3 divide-y divide-slate-50">
      {children}
    </div>
  </div>
);

// ─── Severity badge ──────────────────────────────────────────────────────────────

const SeverityBadge: React.FC<{ severity: 'low' | 'medium' | 'high' }> = ({ severity }) => {
  const colors = {
    high: 'text-rose-600 bg-rose-50 border-rose-200',
    medium: 'text-amber-600 bg-amber-50 border-amber-200',
    low: 'text-slate-500 bg-slate-100 border-slate-200',
  };
  return (
    <span className={`text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border ${colors[severity]}`}>
      {severity}
    </span>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────────

interface OpportunityListProps {
  opportunities: OpportunityItem[];
  risks: RiskAlert[];
}

const OpportunityList: React.FC<OpportunityListProps> = ({ opportunities, risks }) => (
  <div className="grid grid-cols-2 gap-4">
    {/* Opportunities */}
    <SectionFrame icon={Lightbulb} label="Opportunities" accent="bg-emerald-50 text-emerald-700">
      {opportunities.length === 0 ? (
        <p className="text-[10px] text-slate-400 text-center py-4">No opportunities identified.</p>
      ) : (
        opportunities.map(opp => (
          <div key={opp.id} className="py-2 first:pt-0 last:pb-0">
            <p className="text-[10px] font-bold text-[#03234b] leading-relaxed">{opp.title}</p>
            <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">{opp.rationale}</p>
          </div>
        ))
      )}
    </SectionFrame>

    {/* Risks */}
    <SectionFrame icon={ShieldAlert} label="Risks & Alerts" accent="bg-rose-50 text-rose-700">
      {risks.length === 0 ? (
        <p className="text-[10px] text-slate-400 text-center py-4">No risks detected.</p>
      ) : (
        risks.map(risk => (
          <div key={risk.id} className="py-2 first:pt-0 last:pb-0 flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-medium text-slate-700 leading-relaxed">{risk.title}</p>
            </div>
            <SeverityBadge severity={risk.severity} />
          </div>
        ))
      )}
    </SectionFrame>
  </div>
);

export default OpportunityList;
