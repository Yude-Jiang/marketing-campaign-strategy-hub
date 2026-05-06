/**
 * src/pages/v1/BriefBuilderPage.tsx
 * T05: Brief Builder — left editor / right preview dual-column layout.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Sparkles,
  Lock,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  Download,
} from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { MOCK_CAMPAIGN_BRIEF } from '../../mock/brief';
import type { CampaignBriefModel, BriefStatus } from '../../types/brief';
import BriefEditorSection, { TextField, ArrayField } from '../../components/v1/BriefEditorSection';
import BriefPreviewPanel from '../../components/v1/BriefPreviewPanel';

// ─── Default empty brief ─────────────────────────────────────────────────────────

const EMPTY_BRIEF: CampaignBriefModel = {
  campaignOverview: { name: '', productFamily: '', brand: '', timing: '' },
  objectives: [],
  audience: { primary: [], secondary: [] },
  competitors: [],
  offer: { headline: '', proofs: [] },
  keyUseCases: [],
  budget: { total: 0, splits: [] },
  timing: { start: '', end: '' },
  tags: [],
};

// ─── Channel split row ───────────────────────────────────────────────────────────

const ChannelSplitRow: React.FC<{
  channel: string;
  amount: number;
  locked: boolean;
  onChannelChange: (v: string) => void;
  onAmountChange: (v: number) => void;
  onRemove: () => void;
}> = ({ channel, amount, locked, onChannelChange, onAmountChange, onRemove }) => (
  <div className="flex items-center gap-2">
    <input
      type="text"
      value={channel}
      onChange={e => onChannelChange(e.target.value)}
      disabled={locked}
      placeholder="Channel name"
      className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-slate-700 placeholder-slate-300 outline-none focus:border-[#3cb4e6] transition-all disabled:opacity-40"
    />
    <div className="relative w-24">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-400">$</span>
      <input
        type="number"
        value={amount || ''}
        onChange={e => onAmountChange(Number(e.target.value))}
        disabled={locked}
        placeholder="0"
        className="w-full bg-white border border-slate-200 rounded-lg pl-5 pr-2 py-1.5 text-[10px] font-bold text-slate-700 outline-none focus:border-[#3cb4e6] transition-all disabled:opacity-40"
      />
    </div>
    {!locked && (
      <button onClick={onRemove} className="text-slate-300 hover:text-rose-500 text-xs flex-shrink-0">
        ×
      </button>
    )}
  </div>
);

// ─── Page component ──────────────────────────────────────────────────────────────

const BriefBuilderPage: React.FC = () => {
  const navigate = useNavigate();

  // ── Store ───────────────────────────────────────────────────────────
  const storedBrief = useWorkflowStore(s => s.briefDraft);
  const storedStatus = useWorkflowStore(s => s.briefStatus);
  const setStoreBrief = useWorkflowStore(s => s.setBriefDraft);
  const setStoreStatus = useWorkflowStore(s => s.setBriefStatus);

  // ── Local state ─────────────────────────────────────────────────────
  const [brief, setBrief] = useState<CampaignBriefModel>(storedBrief ?? EMPTY_BRIEF);
  const [status, setStatus] = useState<BriefStatus>(storedStatus);
  const [generating, setGenerating] = useState(false);
  const [regenSection, setRegenSection] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const locked = status === 'locked';
  const isReady = status === 'ready' || status === 'locked';

  // ── Update helpers ──────────────────────────────────────────────────
  const updateOverview = (patch: Partial<CampaignBriefModel['campaignOverview']>) =>
    setBrief(prev => ({ ...prev, campaignOverview: { ...prev.campaignOverview, ...patch } }));

  const updateAudience = (patch: Partial<CampaignBriefModel['audience']>) =>
    setBrief(prev => ({ ...prev, audience: { ...prev.audience, ...patch } }));

  const updateOffer = (patch: Partial<CampaignBriefModel['offer']>) =>
    setBrief(prev => ({ ...prev, offer: { ...prev.offer, ...patch } }));

  const updateBudget = (patch: Partial<CampaignBriefModel['budget']>) =>
    setBrief(prev => ({ ...prev, budget: { ...prev.budget, ...patch } }));

  const updateTiming = (patch: Partial<CampaignBriefModel['timing']>) =>
    setBrief(prev => ({ ...prev, timing: { ...prev.timing, ...patch } }));

  // ── Generate full brief ─────────────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setStatus('generating');
    setErrorMessage(null);

    await new Promise(resolve => setTimeout(resolve, 1200));

    setBrief(MOCK_CAMPAIGN_BRIEF);
    setStatus('ready');
    setGenerating(false);
  }, []);

  // ── Regenerate section ──────────────────────────────────────────────
  const regenDelay = (section: string) =>
    new Promise<void>(resolve => {
      setRegenSection(section);
      setTimeout(() => {
        // Fill the section from mock data
        setBrief(prev => {
          const mock = MOCK_CAMPAIGN_BRIEF;
          switch (section) {
            case 'overview':
              return { ...prev, campaignOverview: { ...mock.campaignOverview } };
            case 'objectives':
              return { ...prev, objectives: [...mock.objectives] };
            case 'audience':
              return { ...prev, audience: { primary: [...mock.audience.primary], secondary: [...mock.audience.secondary] } };
            case 'competitors':
              return { ...prev, competitors: [...mock.competitors] };
            case 'offer':
              return { ...prev, offer: { headline: mock.offer.headline, proofs: [...mock.offer.proofs] } };
            case 'useCases':
              return { ...prev, keyUseCases: [...mock.keyUseCases] };
            case 'budget':
              return { ...prev, budget: { total: mock.budget.total, splits: mock.budget.splits.map(s => ({ ...s })) } };
            case 'timing':
              return { ...prev, timing: { ...mock.timing } };
            case 'tags':
              return { ...prev, tags: [...mock.tags] };
            default:
              return prev;
          }
        });
        setRegenSection(null);
        resolve();
      }, 600);
    });

  // ── Lock / Edit / Save / Export ─────────────────────────────────────
  const handleLock = useCallback(() => {
    setStatus('locked');
    setStoreBrief(brief);
    setStoreStatus('locked');
  }, [brief, setStoreBrief, setStoreStatus]);

  const handleEdit = useCallback(() => {
    setStatus('ready');
    setStoreStatus('ready');
  }, [setStoreStatus]);

  const handleSaveDraft = useCallback(() => {
    setStoreBrief(brief);
    // Show brief toast feedback
    setStatus(prev => prev === 'locked' ? 'locked' : 'draft');
    setStoreStatus('draft');
  }, [brief, setStoreBrief, setStoreStatus]);

  const handleExport = useCallback(() => {
    alert('Export function placeholder — will generate PDF / DOCX in a future release.');
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
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Market Mapping
        </span>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">
          Brief Builder
        </span>
      </div>

      {/* ── Page heading ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#03234b] tracking-tight">Brief Builder</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Compose a structured campaign brief. Edit sections on the left, preview on the right.
            Generate the full brief from market data, or edit manually section by section.
          </p>
        </div>
        {/* Status chip */}
        <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
          locked
            ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
            : status === 'generating'
              ? 'text-amber-600 bg-amber-50 border-amber-200'
              : isReady
                ? 'text-amber-600 bg-amber-50 border-amber-200'
                : 'text-slate-400 bg-slate-50 border-slate-200'
        }`}>
          {status === 'generating' && <Loader2 className="w-3 h-3 animate-spin" />}
          {status === 'locked' && <CheckCircle2 className="w-3 h-3" />}
          {status === 'ready' && <FileText className="w-3 h-3" />}
          {status === 'draft' && <Edit3 className="w-3 h-3" />}
          {status === 'generating' ? 'Generating…'
            : status === 'locked' ? 'Locked'
              : status === 'ready' ? 'Ready'
                : status === 'error' ? 'Error'
                  : 'Draft'}
        </div>
      </div>

      {/* ── Error banner ────────────────────────────────────────── */}
      {errorMessage && (
        <div className="mb-6">
          <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-xl px-5 py-4">
            <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs font-medium text-rose-700">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-600 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── Dual-column layout ──────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* ── Left: Editor ──────────────────────────────────────── */}
        <div className="col-span-7 space-y-3">
          {/* Overview */}
          <BriefEditorSection
            label="Campaign Overview"
            locked={locked}
            onRegen={() => regenDelay('overview')}
            regenLoading={regenSection === 'overview'}
          >
            <TextField label="Campaign Name" value={brief.campaignOverview.name} locked={locked} onChange={v => updateOverview({ name: v })} placeholder="e.g. VL53L9 Flagship dToF Launch" />
            <div className="grid grid-cols-3 gap-3">
              <TextField label="Product Family" value={brief.campaignOverview.productFamily} locked={locked} onChange={v => updateOverview({ productFamily: v })} placeholder="e.g. VL53Lx" />
              <TextField label="Brand" value={brief.campaignOverview.brand} locked={locked} onChange={v => updateOverview({ brand: v })} placeholder="e.g. STMicroelectronics" />
              <TextField label="Campaign Timing" value={brief.campaignOverview.timing} locked={locked} onChange={v => updateOverview({ timing: v })} placeholder="e.g. Q3 2026 – Q2 2027" />
            </div>
          </BriefEditorSection>

          {/* Objectives */}
          <BriefEditorSection label="Objectives" locked={locked} onRegen={() => regenDelay('objectives')} regenLoading={regenSection === 'objectives'}>
            <ArrayField label="Objectives" items={brief.objectives} locked={locked} onChange={v => setBrief(prev => ({ ...prev, objectives: v }))} placeholder="Add objective…" />
          </BriefEditorSection>

          {/* Audience */}
          <BriefEditorSection label="Target Audience" locked={locked} onRegen={() => regenDelay('audience')} regenLoading={regenSection === 'audience'}>
            <ArrayField label="Primary" items={brief.audience.primary} locked={locked} onChange={v => updateAudience({ primary: v })} placeholder="Add primary audience…" />
            <ArrayField label="Secondary" items={brief.audience.secondary} locked={locked} onChange={v => updateAudience({ secondary: v })} placeholder="Add secondary audience…" />
          </BriefEditorSection>

          {/* Competitors */}
          <BriefEditorSection label="Competitors" locked={locked} onRegen={() => regenDelay('competitors')} regenLoading={regenSection === 'competitors'}>
            <ArrayField label="Competitors" items={brief.competitors} locked={locked} onChange={v => setBrief(prev => ({ ...prev, competitors: v }))} placeholder="Add competitor…" />
          </BriefEditorSection>

          {/* Offer */}
          <BriefEditorSection label="Offer & Proofs" locked={locked} onRegen={() => regenDelay('offer')} regenLoading={regenSection === 'offer'}>
            <TextField label="Headline" value={brief.offer.headline} locked={locked} onChange={v => updateOffer({ headline: v })} placeholder="e.g. Flagship dToF ranging in 3.6×5.0 mm…" />
            <ArrayField label="Proof Points" items={brief.offer.proofs} locked={locked} onChange={v => updateOffer({ proofs: v })} placeholder="Add proof…" />
          </BriefEditorSection>

          {/* Use Cases */}
          <BriefEditorSection label="Key Use Cases" locked={locked} onRegen={() => regenDelay('useCases')} regenLoading={regenSection === 'useCases'}>
            <ArrayField label="Use Cases" items={brief.keyUseCases} locked={locked} onChange={v => setBrief(prev => ({ ...prev, keyUseCases: v }))} placeholder="Add use case…" />
          </BriefEditorSection>

          {/* Budget & Channels */}
          <BriefEditorSection label="Budget & Channels" locked={locked} onRegen={() => regenDelay('budget')} regenLoading={regenSection === 'budget'}>
            <TextField label="Total Budget ($)" value={brief.budget.total ? String(brief.budget.total) : ''} locked={locked} onChange={v => updateBudget({ total: Number(v) || 0 })} placeholder="e.g. 1200000" />
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Channel Splits</label>
              {locked ? (
                brief.budget.splits.length === 0
                  ? <p className="text-xs text-slate-400 italic">None</p>
                  : brief.budget.splits.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] text-slate-700 mb-1">
                        <span className="font-medium flex-1">{s.channel}</span>
                        <span className="font-bold">${(s.amount / 1000).toFixed(0)}K</span>
                      </div>
                    ))
              ) : (
                <div className="space-y-1.5">
                  {brief.budget.splits.map((s, i) => (
                    <ChannelSplitRow
                      key={i}
                      channel={s.channel}
                      amount={s.amount}
                      locked={locked}
                      onChannelChange={v => {
                        const next = [...brief.budget.splits];
                        next[i] = { ...next[i], channel: v };
                        updateBudget({ splits: next });
                      }}
                      onAmountChange={v => {
                        const next = [...brief.budget.splits];
                        next[i] = { ...next[i], amount: v };
                        updateBudget({ splits: next });
                      }}
                      onRemove={() => {
                        updateBudget({ splits: brief.budget.splits.filter((_, j) => j !== i) });
                      }}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => updateBudget({ splits: [...brief.budget.splits, { channel: '', amount: 0 }] })}
                    className="text-[9px] font-bold text-[#3cb4e6] hover:text-[#0a3d7a] transition-colors"
                  >
                    + Add Channel
                  </button>
                </div>
              )}
            </div>
          </BriefEditorSection>

          {/* Timing */}
          <BriefEditorSection label="Timeline" locked={locked} onRegen={() => regenDelay('timing')} regenLoading={regenSection === 'timing'}>
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Start Date" value={brief.timing.start} locked={locked} onChange={v => updateTiming({ start: v })} placeholder="e.g. 2026-07-01" />
              <TextField label="End Date" value={brief.timing.end} locked={locked} onChange={v => updateTiming({ end: v })} placeholder="e.g. 2027-06-30" />
            </div>
          </BriefEditorSection>

          {/* Tags */}
          <BriefEditorSection label="Tags" locked={locked} onRegen={() => regenDelay('tags')} regenLoading={regenSection === 'tags'}>
            <ArrayField label="Tags" items={brief.tags} locked={locked} onChange={v => setBrief(prev => ({ ...prev, tags: v }))} placeholder="Add tag…" />
          </BriefEditorSection>
        </div>

        {/* ── Right: Preview ────────────────────────────────────── */}
        <div className="col-span-5 sticky top-6">
          <BriefPreviewPanel brief={brief} locked={locked} />
        </div>
      </div>

      {/* ── Generating overlay ──────────────────────────────────── */}
      {generating && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-xl p-10 text-center max-w-sm">
            <Loader2 className="w-10 h-10 text-[#3cb4e6] animate-spin mx-auto mb-4" />
            <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Generating Brief</p>
            <p className="text-[10px] text-slate-400 mt-2">Building campaign brief from market interpretation data…</p>
          </div>
        </div>
      )}

      {/* ── CTA Footer ──────────────────────────────────────────── */}
      <div className={`mt-8 px-6 py-4 rounded-2xl border-2 flex items-center justify-between gap-4 ${
        locked
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          {locked ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700">Brief locked and saved.</span>
            </>
          ) : (
            <span className="text-xs font-medium text-slate-500">
              {generating ? 'Generating…' : 'Edit the brief above, then lock it when ready.'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Generate (only when not ready) */}
          {!isReady && !generating && (
            <button
              onClick={handleGenerate}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white bg-[#03234b] px-3.5 py-2 rounded-lg hover:bg-[#0a3d7a] transition-all shadow-sm"
            >
              <Sparkles className="w-3 h-3" />
              Generate Brief
            </button>
          )}

          {/* Save Draft (always shown when editing) */}
          {!locked && !generating && (
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-3 py-2 rounded-lg hover:bg-white transition-all"
            >
              <Save className="w-3 h-3" />
              Save Draft
            </button>
          )}

          {/* Lock (only when ready) */}
          {status === 'ready' && !generating && (
            <button
              onClick={handleLock}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-all"
            >
              <Lock className="w-3 h-3" />
              Lock Brief
            </button>
          )}

          {/* Edit (when locked) */}
          {locked && (
            <>
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-3 py-2 rounded-lg hover:bg-white transition-all"
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </button>
            </>
          )}

          {/* Export (when content exists) */}
          {isReady && (
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-3 py-2 rounded-lg hover:bg-white transition-all"
            >
              <Download className="w-3 h-3" />
              Export
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BriefBuilderPage;
