/**
 * src/pages/v1/StrategyStudioPage.tsx
 * T06: Strategy Studio — strategic layer built from campaign brief.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Lock,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  ArrowRight,
  Target,
  Lightbulb,
  Radio,
  CalendarDays,
  Zap,
  BarChart3,
} from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { MOCK_STRATEGY_PACK } from '../../mock/strategy';
import type { StrategyPackModel, StrategyStatus, StrategicPriority, ChannelStrategyItem, MeasurementMetric } from '../../types/strategy';
import StrategyMatrix from '../../components/v1/StrategyMatrix';
import TacticPlayCard from '../../components/v1/TacticPlayCard';

// ─── Section wrapper ─────────────────────────────────────────────────────────────

const SectionFrame: React.FC<{
  icon: React.ElementType;
  label: string;
  locked: boolean;
  children: React.ReactNode;
}> = ({ icon: Icon, label, locked, children }) => (
  <div className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden ${
    locked ? 'border-emerald-200' : 'border-slate-100'
  }`}>
    <div className={`px-5 py-3 flex items-center gap-2 border-b ${
      locked ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'
    }`}>
      <Icon className={`w-4 h-4 ${locked ? 'text-emerald-600' : 'text-[#3cb4e6]'}`} />
      <span className={`text-[10px] font-black uppercase tracking-widest ${
        locked ? 'text-emerald-700' : 'text-slate-500'
      }`}>{label}</span>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

// ─── Priority card ───────────────────────────────────────────────────────────────

const PriorityCard: React.FC<{ priority: StrategicPriority; locked: boolean }> = ({ priority, locked }) => (
  <div className={`bg-white rounded-xl border shadow-sm p-4 ${
    locked ? 'border-emerald-200' : 'border-slate-100'
  }`}>
    <p className="text-xs font-black text-[#03234b] mb-1.5 leading-relaxed">{priority.title}</p>
    <p className="text-[10px] text-slate-500 leading-relaxed">{priority.rationale}</p>
  </div>
);

// ─── Channel item row ────────────────────────────────────────────────────────────

const ChannelItemRow: React.FC<{ item: ChannelStrategyItem; locked: boolean }> = ({ item }) => (
  <div className="pb-3 mb-3 border-b border-slate-50 last:border-0 last:pb-0 last:mb-0">
    <p className="text-xs font-black text-[#03234b] mb-0.5">{item.channel}</p>
    <p className="text-[10px] text-slate-500 mb-1.5 leading-relaxed">{item.role}</p>
    <div className="flex flex-wrap gap-1.5">
      {item.kpis.map((kpi, i) => (
        <span key={i} className="text-[8px] font-bold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">
          {kpi}
        </span>
      ))}
    </div>
  </div>
);

// ─── Launch phase timeline ───────────────────────────────────────────────────────

const LaunchPhaseBlock: React.FC<{ phase: { name: string; window: string; focus: string }; locked: boolean }> = ({ phase }) => (
  <div className="relative pl-6 pb-5 last:pb-0 border-l-2 border-[#3cb4e6]/30 last:border-l-0 last:pl-6">
    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-[#3cb4e6]" />
    <p className="text-xs font-black text-[#03234b]">{phase.name}</p>
    <p className="text-[9px] font-bold text-[#3cb4e6] uppercase tracking-wider mb-1">{phase.window}</p>
    <p className="text-[10px] text-slate-500 leading-relaxed">{phase.focus}</p>
  </div>
);

// ─── Measurement table ───────────────────────────────────────────────────────────

const MeasurementTable: React.FC<{ metrics: MeasurementMetric[]; locked: boolean }> = ({ metrics }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-slate-100">
          <th className="text-left px-3 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400">Metric</th>
          <th className="text-left px-3 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400">Definition</th>
          <th className="text-right px-3 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400">Target</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((m, i) => (
          <tr key={i} className="border-b border-slate-50 last:border-0">
            <td className="px-3 py-2.5 text-[10px] font-bold text-[#03234b]">{m.name}</td>
            <td className="px-3 py-2.5 text-[10px] text-slate-600 leading-relaxed">{m.definition}</td>
            <td className="px-3 py-2.5 text-[10px] font-bold text-emerald-600 text-right whitespace-nowrap">{m.target}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Empty state ─────────────────────────────────────────────────────────────────

const EmptyState: React.FC<{ onGoToBrief: () => void }> = ({ onGoToBrief }) => (
  <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center min-h-[500px]">
    <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-5">
      <Target className="w-6 h-6 text-slate-300" />
    </div>
    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
      No Campaign Brief Found
    </p>
    <p className="text-[11px] text-slate-400 max-w-md leading-relaxed mb-8">
      Strategy Studio requires a completed campaign brief. Go to{' '}
      <strong>Brief Builder</strong> to create and lock a brief first.
    </p>
    <button
      onClick={onGoToBrief}
      className="bg-[#03234b] text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-[#0a3d7a] transition-all"
    >
      Go to Brief Builder
    </button>
  </div>
);

// ─── Page component ──────────────────────────────────────────────────────────────

const StrategyStudioPage: React.FC = () => {
  const navigate = useNavigate();

  // ── Store ───────────────────────────────────────────────────────────
  const briefDraft = useWorkflowStore(s => s.briefDraft);
  const storedPack = useWorkflowStore(s => s.strategyPack);
  const storedStatus = useWorkflowStore(s => s.strategyStatus);
  const setStorePack = useWorkflowStore(s => s.setStrategyPack);
  const setStoreStatus = useWorkflowStore(s => s.setStrategyStatus);

  // ── Local state ─────────────────────────────────────────────────────
  const [pack, setPack] = useState<StrategyPackModel | null>(storedPack);
  const [status, setStatus] = useState<StrategyStatus>(storedStatus);
  const [generating, setGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const locked = status === 'locked';

  // ── Generate ────────────────────────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setStatus('generating');
    setErrorMessage(null);

    await new Promise(resolve => setTimeout(resolve, 1400));

    setPack(MOCK_STRATEGY_PACK);
    setStatus('ready');
    setGenerating(false);
  }, []);

  // ── Refine ──────────────────────────────────────────────────────────
  const handleRefine = useCallback(async () => {
    setStatus('refining');
    await new Promise(resolve => setTimeout(resolve, 800));
    // Mock: reload the same data with slight variation
    setPack(MOCK_STRATEGY_PACK);
    setStatus('ready');
  }, []);

  // ── Lock / Edit ─────────────────────────────────────────────────────
  const handleLock = useCallback(() => {
    if (!pack) return;
    setStatus('locked');
    setStorePack(pack);
    setStoreStatus('locked');
  }, [pack, setStorePack, setStoreStatus]);

  const handleEdit = useCallback(() => {
    setStatus('ready');
    setStoreStatus('ready');
  }, [setStoreStatus]);

  // ── Continue to Activation ──────────────────────────────────────────
  const handleContinue = useCallback(() => {
    navigate('/v1/activation-studio');
  }, [navigate]);

  // ── Guard: no brief → empty state ──────────────────────────────────
  if (!briefDraft) {
    return (
      <div className="min-h-full">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/v1/dashboard')} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#03234b] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Dashboard
          </button>
          <span className="text-slate-200 text-[10px]">/</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">Strategy Studio</span>
        </div>
        <EmptyState onGoToBrief={() => navigate('/v1/brief-builder')} />
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {/* ── Back nav ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/v1/dashboard')} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#03234b] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Dashboard
        </button>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brief Builder</span>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">Strategy Studio</span>
      </div>

      {/* ── Heading ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#03234b] tracking-tight">Strategy Studio</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Define strategic priorities, map audience×message resonance, plan channel tactics,
            and set measurable KPIs — all derived from the campaign brief.
          </p>
        </div>
        <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
          locked
            ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
            : status === 'generating' || status === 'refining'
              ? 'text-amber-600 bg-amber-50 border-amber-200'
              : status === 'ready'
                ? 'text-amber-600 bg-amber-50 border-amber-200'
                : 'text-slate-400 bg-slate-50 border-slate-200'
        }`}>
          {status === 'generating' && <Loader2 className="w-3 h-3 animate-spin" />}
          {status === 'locked' && <CheckCircle2 className="w-3 h-3" />}
          {status === 'ready' && <Lightbulb className="w-3 h-3" />}
          {status === 'empty' ? 'Empty'
            : status === 'generating' ? 'Generating…'
              : status === 'refining' ? 'Refining…'
                : status === 'locked' ? 'Locked'
                  : status === 'ready' ? 'Ready'
                    : 'Error'}
        </div>
      </div>

      {/* ── Error banner ────────────────────────────────────────── */}
      {errorMessage && (
        <div className="mb-6">
          <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-xl px-5 py-4">
            <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs font-medium text-rose-700">{errorMessage}</p>
            <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-rose-600 text-xs font-bold">Dismiss</button>
          </div>
        </div>
      )}

      {/* ── Generating state ────────────────────────────────────── */}
      {generating && (
        <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm p-16 text-center mb-6">
          <Loader2 className="w-8 h-8 text-[#3cb4e6] animate-spin mx-auto mb-4" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Building Strategy Pack</p>
          <p className="text-[10px] text-slate-400 mt-2">Deriving priorities, matrix, channels, and measurement plan from brief…</p>
        </div>
      )}

      {/* ── Content ─────────────────────────────────────────────── */}
      {pack && (
        <div className="space-y-6">
          {/* 1. Strategic Priorities */}
          <SectionFrame icon={Target} label="Strategic Priorities" locked={locked}>
            {pack.priorities.length === 0 ? (
              <p className="text-[10px] text-slate-400 text-center py-4">No priorities defined.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {pack.priorities.map((p, i) => (
                  <PriorityCard key={i} priority={p} locked={locked} />
                ))}
              </div>
            )}
          </SectionFrame>

          {/* 2. Audience × Message Matrix */}
          <StrategyMatrix data={pack.matrix} locked={locked} />

          {/* 3. Channel Strategy */}
          <SectionFrame icon={Radio} label="Channel Strategy" locked={locked}>
            {pack.channels.length === 0 ? (
              <p className="text-[10px] text-slate-400 text-center py-4">No channels defined.</p>
            ) : (
              pack.channels.map((c, i) => <ChannelItemRow key={i} item={c} locked={locked} />)
            )}
          </SectionFrame>

          {/* 4. Launch Phases */}
          <SectionFrame icon={CalendarDays} label="Launch Phases" locked={locked}>
            {pack.launchPhases.length === 0 ? (
              <p className="text-[10px] text-slate-400 text-center py-4">No launch phases defined.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {pack.launchPhases.map((ph, i) => (
                  <LaunchPhaseBlock key={i} phase={ph} locked={locked} />
                ))}
              </div>
            )}
          </SectionFrame>

          {/* 5. Tactical Plays */}
          <SectionFrame icon={Zap} label="Tactical Plays" locked={locked}>
            {pack.tactics.length === 0 ? (
              <p className="text-[10px] text-slate-400 text-center py-4">No tactics defined.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {pack.tactics.map((t, i) => (
                  <TacticPlayCard key={i} tactic={t} locked={locked} />
                ))}
              </div>
            )}
          </SectionFrame>

          {/* 6. Measurement Plan */}
          <SectionFrame icon={BarChart3} label="Measurement Plan" locked={locked}>
            {pack.measurement.length === 0 ? (
              <p className="text-[10px] text-slate-400 text-center py-4">No metrics defined.</p>
            ) : (
              <MeasurementTable metrics={pack.measurement} locked={locked} />
            )}
          </SectionFrame>
        </div>
      )}

      {/* ── Idle state ──────────────────────────────────────────── */}
      {!generating && !pack && status === 'empty' && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-16 text-center mb-6">
          <Target className="w-8 h-8 text-slate-300 mx-auto mb-4" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Ready to Generate Strategy</p>
          <p className="text-[10px] text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
            Click <strong>Generate Strategy Pack</strong> to derive strategic priorities, audience×message matrix,
            channel plans, and measurement KPIs from the campaign brief.
          </p>
          <button
            onClick={handleGenerate}
            className="bg-[#03234b] text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-[#0a3d7a] transition-all inline-flex items-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            Generate Strategy Pack
          </button>
        </div>
      )}

      {/* ── CTA Footer ──────────────────────────────────────────── */}
      {(pack || generating) && (
        <div className={`mt-8 px-6 py-4 rounded-2xl border-2 flex items-center justify-between gap-4 ${
          locked ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            {locked ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">Strategy pack locked and saved.</span>
              </>
            ) : (
              <span className="text-xs font-medium text-slate-500">
                {generating ? 'Generating…' : 'Review the strategy pack below, then lock to proceed.'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!locked && !generating && status !== 'empty' && (
              <>
                <button
                  onClick={handleRefine}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-3 py-2 rounded-lg hover:bg-white transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  Refine
                </button>
                <button
                  onClick={handleLock}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-all"
                >
                  <Lock className="w-3 h-3" />
                  Lock Strategy
                </button>
              </>
            )}
            {locked && (
              <>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-3 py-2 rounded-lg hover:bg-white transition-all"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={handleContinue}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white bg-[#03234b] px-3.5 py-2 rounded-lg hover:bg-[#0a3d7a] transition-all shadow-sm"
                >
                  Continue to Activation
                  <ArrowRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyStudioPage;
