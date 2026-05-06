/**
 * src/pages/v2/AudienceMessageLabPage.tsx
 * T12: Audience & Message Lab — resonance matrix, detail, objections,
 * improvements, and experiment queue.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MessageSquare,
  Zap,
  AlertTriangle,
  Lightbulb,
  Target,
} from 'lucide-react';
import {
  MOCK_PILLARS,
  MOCK_AUDIENCES,
  MOCK_RESONANCE,
  MOCK_OBJECTIONS,
  MOCK_IMPROVEMENTS,
} from '../../mock/messageLab';
import type { ExperimentItem } from '../../types/message';
import ResonanceMatrix from '../../components/v2/ResonanceMatrix';
import ExperimentQueue from '../../components/v2/ExperimentQueue';

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

// ─── Objection / proof gap item ───────────────────────────────────────────────────

const ObjectionCard: React.FC<{
  objection: string;
  proofGap: string;
}> = ({ objection, proofGap }) => (
  <div className="border border-slate-200 rounded-xl px-3 py-2.5">
    <p className="text-[10px] text-slate-700 leading-relaxed">
      <span className="font-bold text-rose-600">Objection: </span>
      {objection}
    </p>
    <div className="flex items-start gap-1.5 mt-1.5 text-[8px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5">
      <AlertTriangle className="w-2.5 h-2.5 flex-shrink-0 mt-0.5" />
      <span>
        <span className="font-bold">Proof gap: </span>
        {proofGap}
      </span>
    </div>
  </div>
);

// ─── Improvement item ─────────────────────────────────────────────────────────────

const ImprovementItem: React.FC<{ suggestion: string }> = ({ suggestion }) => (
  <div className="flex items-start gap-2 text-[10px] text-slate-700 leading-relaxed py-1.5 border-b border-slate-50 last:border-0">
    <Lightbulb className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
    <span>{suggestion}</span>
  </div>
);

// ─── Priority cycle helper ────────────────────────────────────────────────────────

const nextPriority = (p: 'high' | 'medium' | 'low'): 'high' | 'medium' | 'low' => {
  const cycle: ('high' | 'medium' | 'low')[] = ['low', 'medium', 'high'];
  return cycle[(cycle.indexOf(p) + 1) % cycle.length];
};

// ─── Page component ───────────────────────────────────────────────────────────────

const AudienceMessageLabPage: React.FC = () => {
  const navigate = useNavigate();

  // ── Local state ──────────────────────────────────────────────────────
  const [selectedCellKey, setSelectedCellKey] = useState<string | null>(null);
  const [experiments, setExperiments] = useState<ExperimentItem[]>([]);

  // ── Derived: selected cell detail ────────────────────────────────────
  const [selAudienceId, selPillarId] = selectedCellKey?.split(':') ?? [];
  const selectedCell = useMemo(
    () => MOCK_RESONANCE.find(
      c => c.audienceId === selAudienceId && c.pillarId === selPillarId,
    ) ?? null,
    [selAudienceId, selPillarId],
  );
  const selectedAudience = useMemo(
    () => MOCK_AUDIENCES.find(a => a.id === selAudienceId) ?? null,
    [selAudienceId],
  );
  const selectedPillar = useMemo(
    () => MOCK_PILLARS.find(p => p.id === selPillarId) ?? null,
    [selPillarId],
  );

  const cellObjections = useMemo(
    () => MOCK_OBJECTIONS.filter(o => o.cellKey === selectedCellKey),
    [selectedCellKey],
  );
  const cellImprovements = useMemo(
    () => MOCK_IMPROVEMENTS.filter(imp => imp.cellKey === selectedCellKey),
    [selectedCellKey],
  );

  // ── Handlers ─────────────────────────────────────────────────────────
  const handleSelectCell = useCallback((cellKey: string) => {
    setSelectedCellKey(prev => (prev === cellKey ? null : cellKey));
  }, []);

  const handleAddExperiment = useCallback(() => {
    // Add a mock experiment for the currently selected cell, or a default one
    const nextId = `exp-${Date.now()}`;
    const targetAudienceId = selAudienceId || MOCK_AUDIENCES[0].id;
    const targetPillarId = selPillarId || MOCK_PILLARS[0].id;
    const newExp: ExperimentItem = {
      id: nextId,
      hypothesis: selectedCell
        ? `Test "${selectedPillar?.name}" resonance with ${selectedAudience?.label}`
        : 'New A/B experiment: validate messaging hypothesis',
      audienceId: targetAudienceId,
      pillarId: targetPillarId,
      priority: 'medium',
      status: 'backlog',
    };
    setExperiments(prev => [...prev, newExp]);
  }, [selAudienceId, selPillarId, selectedCell, selectedPillar, selectedAudience]);

  const handleTogglePriority = useCallback((id: string) => {
    setExperiments(prev =>
      prev.map(exp =>
        exp.id === id
          ? { ...exp, priority: nextPriority(exp.priority) }
          : exp,
      ),
    );
  }, []);

  const handleRemoveExperiment = useCallback((id: string) => {
    setExperiments(prev => prev.filter(exp => exp.id !== id));
  }, []);

  // ── Score color for detail ───────────────────────────────────────────
  const scoreColor = (score: number): string => {
    if (score >= 5) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 4) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 3) return 'text-amber-600 bg-amber-50 border-amber-200';
    if (score >= 2) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

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
          Message Lab
        </span>
      </div>

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5">
        <MessageSquare className="w-4 h-4 text-[#3cb4e6]" />
        <h1 className="text-sm font-black text-[#03234b] uppercase tracking-widest">
          Audience &amp; Message Lab
        </h1>
        <span className="text-[8px] text-slate-400 ml-1">
          {MOCK_AUDIENCES.length} audiences × {MOCK_PILLARS.length} pillars
        </span>
      </div>

      {/* ── Matrix + Detail ──────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 items-start mb-4">
        {/* Left 7 cols: Resonance Matrix */}
        <div className="col-span-7">
          <ResonanceMatrix
            audiences={MOCK_AUDIENCES}
            pillars={MOCK_PILLARS}
            cells={MOCK_RESONANCE}
            selectedCellKey={selectedCellKey}
            onSelectCell={handleSelectCell}
          />
        </div>

        {/* Right 5 cols: selected cell detail */}
        <div className="col-span-5 space-y-4">
          {!selectedCell ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-10 text-center flex flex-col items-center justify-center min-h-[300px]">
              <Target className="w-6 h-6 text-slate-300 mb-3" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                No Cell Selected
              </p>
              <p className="text-[9px] text-slate-400 max-w-[220px] leading-relaxed">
                Click a score cell in the matrix to view resonance detail, objections, and improvement ideas.
              </p>
            </div>
          ) : (
            <>
              {/* Selected Cell Summary */}
              <SectionFrame icon={Target} title="Resonance Detail">
                <div className="space-y-3">
                  {/* Score badge */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-1 rounded border ${scoreColor(selectedCell.score)}`}>
                      Score: {selectedCell.score}/5
                    </span>
                    <span className="text-[9px] font-bold text-slate-500">
                      {selectedAudience?.label} · {selectedPillar?.name}
                    </span>
                  </div>

                  {/* Pillar core idea */}
                  {selectedPillar && (
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                        Pillar Core Idea
                      </p>
                      <p className="text-[10px] text-slate-700 leading-relaxed">
                        {selectedPillar.coreIdea}
                      </p>
                    </div>
                  )}

                  {/* Cell notes */}
                  {selectedCell.notes && (
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                        Notes
                      </p>
                      <p className="text-[10px] text-slate-600 italic">
                        {selectedCell.notes}
                      </p>
                    </div>
                  )}

                  {/* Add to experiment button */}
                  <button
                    onClick={handleAddExperiment}
                    className="flex items-center justify-center gap-1.5 text-[8px] font-black uppercase tracking-wider w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    <Zap className="w-3 h-3" />
                    Add to Experiment Queue
                  </button>
                </div>
              </SectionFrame>

              {/* Objections / Proof Gaps */}
              <SectionFrame icon={AlertTriangle} title="Objections &amp; Proof Gaps">
                {cellObjections.length === 0 ? (
                  <p className="text-[10px] text-slate-400 text-center py-4">
                    No objections recorded for this cell.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {cellObjections.map((o, i) => (
                      <ObjectionCard
                        key={i}
                        objection={o.objection}
                        proofGap={o.proofGap}
                      />
                    ))}
                  </div>
                )}
              </SectionFrame>

              {/* Suggested Improvements */}
              <SectionFrame icon={Lightbulb} title="Suggested Improvements">
                {cellImprovements.length === 0 ? (
                  <p className="text-[10px] text-slate-400 text-center py-4">
                    No improvements suggested for this cell.
                  </p>
                ) : (
                  <div>
                    {cellImprovements.map(imp => (
                      <ImprovementItem key={imp.id} suggestion={imp.suggestion} />
                    ))}
                  </div>
                )}
              </SectionFrame>
            </>
          )}
        </div>
      </div>

      {/* ── Experiment Queue (full width) ─────────────────────────── */}
      <div className="mb-6">
        <ExperimentQueue
          experiments={experiments}
          audiences={MOCK_AUDIENCES}
          pillars={MOCK_PILLARS}
          onAdd={handleAddExperiment}
          onTogglePriority={handleTogglePriority}
          onRemove={handleRemoveExperiment}
        />
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <div className="flex items-center gap-3 pb-8">
        <button
          onClick={() => alert('Send to Activation — forwarding selected messaging to Activation Studio.')}
          className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white bg-[#03234b] px-4 py-3 rounded-xl hover:bg-[#0a3d7a] transition-all shadow-sm"
        >
          <Zap className="w-3.5 h-3.5" />
          Send to Activation
        </button>
      </div>
    </div>
  );
};

export default AudienceMessageLabPage;
