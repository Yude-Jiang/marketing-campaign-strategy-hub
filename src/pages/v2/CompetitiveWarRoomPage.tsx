/**
 * src/pages/v2/CompetitiveWarRoomPage.tsx
 * T11: Competitive War Room — competitor narrative intelligence.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Swords,
  BookOpen,
  GitCompare,
  MessageSquare,
  Zap,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';
import { MOCK_COMPETITORS } from '../../mock/competitors';
import CompetitorSwitcher from '../../components/v2/CompetitorSwitcher';
import ClaimList from '../../components/v2/ClaimList';
import RebuttalList from '../../components/v2/RebuttalList';
import type { CompetitorIntel } from '../../types/competitor';

// ─── Empty state ─────────────────────────────────────────────────────────────────

const EmptyState: React.FC = () => (
  <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
    <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-5">
      <Swords className="w-6 h-6 text-slate-300" />
    </div>
    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
      Select a Competitor
    </p>
    <p className="text-[11px] text-slate-400 max-w-md leading-relaxed">
      Choose a competitor above to view their claims, narrative shifts,
      differentiation gaps, and recommended rebuttals.
    </p>
  </div>
);

// ─── Section frame helper ─────────────────────────────────────────────────────────

const SectionFrame: React.FC<{
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5 text-[#3cb4e6]" />
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
        {title}
      </span>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// ─── Narrative Shift item ─────────────────────────────────────────────────────────

const NarrativeShiftItem: React.FC<{
  date: string;
  change: string;
}> = ({ date, change }) => {
  const d = new Date(date);
  const formatted = d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
  return (
    <div className="flex gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#3cb4e6] mt-1" />
        <div className="w-px flex-1 bg-slate-100 min-h-[24px]" />
      </div>
      <div className="flex-1 min-w-0 pb-1">
        <p className="text-[9px] font-bold text-slate-400">{formatted}</p>
        <p className="text-[10px] text-slate-700 leading-relaxed mt-0.5">{change}</p>
      </div>
    </div>
  );
};

// ─── Gap card ─────────────────────────────────────────────────────────────────────

const GapCard: React.FC<{
  area: string;
  description: string;
}> = ({ area, description }) => (
  <div className="bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-2.5">
    <span className="inline-block text-[8px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded mb-1.5">
      {area}
    </span>
    <p className="text-[10px] text-slate-700 leading-relaxed">{description}</p>
  </div>
);

// ─── Page component ───────────────────────────────────────────────────────────────

const CompetitiveWarRoomPage: React.FC = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ── Derived ─────────────────────────────────────────────────────────
  const competitor = useMemo<CompetitorIntel | null>(
    () => (selectedId ? MOCK_COMPETITORS.find(c => c.id === selectedId) ?? null : null),
    [selectedId],
  );

  // ── Handlers ────────────────────────────────────────────────────────
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <div className="min-h-full">
      {/* ── Back nav ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/v1/dashboard')}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#03234b] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Dashboard
        </button>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">
          War Room
        </span>
      </div>

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5">
        <Swords className="w-4 h-4 text-[#3cb4e6]" />
        <h1 className="text-sm font-black text-[#03234b] uppercase tracking-widest">
          Competitive War Room
        </h1>
        <span className="text-[8px] text-slate-400 ml-1">
          {MOCK_COMPETITORS.length} competitors monitored
        </span>
      </div>

      {/* ── Competitor Switcher ──────────────────────────────────── */}
      <div className="mb-5">
        <CompetitorSwitcher
          competitors={MOCK_COMPETITORS}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      {!competitor ? (
        <EmptyState />
      ) : (
        <>
          {/* ── Summary Card ──────────────────────────────────────── */}
          <SectionFrame icon={BookOpen} title="Competitor Summary">
            <p className="text-[10px] text-slate-700 leading-relaxed">
              {competitor.summary}
            </p>
          </SectionFrame>

          {/* ── Two-column content ────────────────────────────────── */}
          <div className="grid grid-cols-12 gap-4 mt-4">
            {/* Left 7 cols: Claims + Narrative Timeline */}
            <div className="col-span-7 space-y-4">
              {/* Key Claims */}
              <ClaimList claims={competitor.claims} />

              {/* Narrative Shift Timeline */}
              <SectionFrame icon={TrendingUp} title="Narrative Shift Timeline">
                {competitor.narrativeShifts.length === 0 ? (
                  <p className="text-[10px] text-slate-400 text-center py-4">
                    No narrative shifts recorded.
                  </p>
                ) : (
                  <div className="space-y-1">
                    {competitor.narrativeShifts.map((ns, i) => (
                      <NarrativeShiftItem
                        key={i}
                        date={ns.date}
                        change={ns.change}
                      />
                    ))}
                  </div>
                )}
              </SectionFrame>
            </div>

            {/* Right 5 cols: Gaps + Rebuttals */}
            <div className="col-span-5 space-y-4">
              {/* Differentiation Gaps */}
              <SectionFrame icon={Lightbulb} title="Differentiation Gaps">
                {competitor.gaps.length === 0 ? (
                  <p className="text-[10px] text-slate-400 text-center py-4">
                    No gaps identified.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {competitor.gaps.map((g, i) => (
                      <GapCard key={i} area={g.area} description={g.gapDescription} />
                    ))}
                  </div>
                )}
              </SectionFrame>

              {/* Rebuttal Suggestions */}
              <RebuttalList rebuttals={competitor.rebuttals} />
            </div>
          </div>

          {/* ── Bottom actions ────────────────────────────────────── */}
          <div className="flex items-center gap-3 mt-6 pb-8">
            <button
              onClick={() => alert('Send to Message Lab — opening messaging workspace.')}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white bg-[#03234b] px-4 py-3 rounded-xl hover:bg-[#0a3d7a] transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Send to Message Lab
            </button>
            <button
              onClick={() => alert('Create Action — this will open the War Room to act on this intelligence.')}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              Create Action
            </button>
            <button
              onClick={() => alert('Comparison Sheet — export not yet implemented.')}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all"
            >
              <GitCompare className="w-3.5 h-3.5" />
              Comparison Sheet
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CompetitiveWarRoomPage;
