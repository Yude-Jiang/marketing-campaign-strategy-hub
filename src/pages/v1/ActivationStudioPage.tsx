/**
 * src/pages/v1/ActivationStudioPage.tsx
 * T07: Activation Studio — asset list (left) + workspace (right).
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { MOCK_ASSETS } from '../../mock/activation';
import type { AssetRecord } from '../../types/activation';
import AssetListPanel from '../../components/v1/AssetListPanel';
import AssetWorkspace from '../../components/v1/AssetWorkspace';

// ─── Empty state ─────────────────────────────────────────────────────────────────

const EmptyState: React.FC<{ onGoToStrategy: () => void }> = ({ onGoToStrategy }) => (
  <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center min-h-[500px]">
    <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-5">
      <Target className="w-6 h-6 text-slate-300" />
    </div>
    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
      No Strategy Pack Found
    </p>
    <p className="text-[11px] text-slate-400 max-w-md leading-relaxed mb-8">
      Activation Studio requires a locked strategy pack. Go to{' '}
      <strong>Strategy Studio</strong> to generate and lock your strategy first.
    </p>
    <button
      onClick={onGoToStrategy}
      className="bg-[#03234b] text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-[#0a3d7a] transition-all"
    >
      Go to Strategy Studio
    </button>
  </div>
);

// ─── Page component ──────────────────────────────────────────────────────────────

const ActivationStudioPage: React.FC = () => {
  const navigate = useNavigate();

  // ── Store ───────────────────────────────────────────────────────────
  const strategyPack = useWorkflowStore(s => s.strategyPack);
  const storedAssets = useWorkflowStore(s => s.assets);
  const storedActiveId = useWorkflowStore(s => s.activeAssetId);
  const setStoreAssets = useWorkflowStore(s => s.setAssets);
  const setStoreActiveId = useWorkflowStore(s => s.setActiveAssetId);

  // ── Local state ─────────────────────────────────────────────────────
  const [assets, setAssets] = useState<AssetRecord[]>(
    storedAssets.length > 0 ? storedAssets : MOCK_ASSETS
  );
  const [activeId, setActiveId] = useState<string | null>(storedActiveId);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const activeAsset = assets.find(a => a.id === activeId) ?? null;

  // ── Select asset ────────────────────────────────────────────────────
  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    setStoreActiveId(id);
  }, [setStoreActiveId]);

  // ── Generate asset ──────────────────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    if (!activeAsset) return;
    const id = activeAsset.id;
    setGeneratingId(id);

    // Optimistically set to generating
    setAssets(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'generating' as const } : a)
    );

    await new Promise(resolve => setTimeout(resolve, 1200));

    setAssets(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'ready_for_review' as const } : a)
    );
    setGeneratingId(null);
  }, [activeAsset]);

  // ── Approve asset ───────────────────────────────────────────────────
  const handleApprove = useCallback(() => {
    if (!activeAsset) return;
    const id = activeAsset.id;
    setAssets(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'approved' as const } : a)
    );
  }, [activeAsset]);

  // ── Handoff asset ───────────────────────────────────────────────────
  const handleHandoff = useCallback(() => {
    if (!activeAsset) return;
    const id = activeAsset.id;
    setAssets(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'handoff' as const } : a)
    );
    setStoreAssets(assets); // persist
  }, [activeAsset, assets, setStoreAssets]);

  // ── Guard: no strategy pack → empty state ──────────────────────────
  if (!strategyPack) {
    return (
      <div className="min-h-full">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/v1/dashboard')} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#03234b] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Dashboard
          </button>
          <span className="text-slate-200 text-[10px]">/</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">Activation Studio</span>
        </div>
        <EmptyState onGoToStrategy={() => navigate('/v1/strategy-studio')} />
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
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Strategy Studio</span>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">Activation Studio</span>
      </div>

      {/* ── Heading ──────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#03234b] tracking-tight">Activation Studio</h1>
        <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
          Manage campaign assets across formats. Generate content, review, approve, and hand off
          to execution teams.
        </p>
      </div>

      {/* ── Dual-column layout ──────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left: Asset list */}
        <div className="col-span-4">
          <AssetListPanel
            assets={assets}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </div>

        {/* Right: Asset workspace */}
        <div className="col-span-8 sticky top-6">
          <AssetWorkspace
            asset={activeAsset}
            onGenerate={handleGenerate}
            onApprove={handleApprove}
            onHandoff={handleHandoff}
            generating={generatingId === activeAsset?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivationStudioPage;
