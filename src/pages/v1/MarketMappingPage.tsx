/**
 * src/pages/v1/MarketMappingPage.tsx
 * T04: Market Mapping — transforms Product Truth into a market interpretation layer.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RefreshCw,
  Lock,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Package,
  Target,
} from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { MOCK_MARKET_INTERPRETATION } from '../../mock/marketMapping';
import type { MarketInterpretationModel, MarketMappingStatus } from '../../types/market';
import MarketCardGroup from '../../components/v1/MarketCardGroup';
import BuyerNeedsPanel from '../../components/v1/BuyerNeedsPanel';

// ─── Summary Card ────────────────────────────────────────────────────────────────

const SummaryCard: React.FC<{
  productName: string;
  productFamily?: string;
  brand?: string;
  category: string;
  status: MarketMappingStatus;
}> = ({ productName, productFamily, brand, category, status }) => {
  const statusLabel: Record<MarketMappingStatus, { text: string; color: string }> = {
    idle:          { text: 'Awaiting Generation', color: 'text-slate-400 bg-slate-50 border-slate-200' },
    generating:    { text: 'Generating…',         color: 'text-amber-600 bg-amber-50 border-amber-200' },
    needs_review:  { text: 'Needs Review',        color: 'text-amber-600 bg-amber-50 border-amber-200' },
    locked:        { text: 'Locked & Confirmed',  color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    error:         { text: 'Error',               color: 'text-rose-600 bg-rose-50 border-rose-200' },
  };
  const s = statusLabel[status];

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#03234b]/5 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Package className="w-5 h-5 text-[#03234b]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-base font-black text-[#03234b]">{productName}</h2>
              <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${s.color}`}>
                {s.text}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              {brand && <span>{brand}</span>}
              {productFamily && <span className="text-slate-200">|</span>}
              {productFamily && <span>{productFamily}</span>}
              <span className="text-slate-200">|</span>
              <span className="font-bold text-[#03234b]">{category}</span>
            </div>
          </div>
        </div>
        <Target className="w-5 h-5 text-[#3cb4e6] flex-shrink-0" />
      </div>
    </div>
  );
};

// ─── Empty State ─────────────────────────────────────────────────────────────────

const EmptyState: React.FC<{ onGoToIntake: () => void }> = ({ onGoToIntake }) => (
  <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-16 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
    <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-5">
      <Target className="w-6 h-6 text-slate-300" />
    </div>
    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
      No Product Truth Available
    </p>
    <p className="text-[11px] text-slate-400 max-w-md leading-relaxed mb-8">
      Market Mapping requires a confirmed Product Truth model. Go to{' '}
      <strong>Product Intake</strong> to enter product details and confirm the
      Product Truth first.
    </p>
    <button
      onClick={onGoToIntake}
      className="bg-[#03234b] text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-[#0a3d7a] transition-all"
    >
      Go to Product Intake
    </button>
  </div>
);

// ─── Error Banner ────────────────────────────────────────────────────────────────

const ErrorBanner: React.FC<{ message: string; onDismiss: () => void }> = ({ message, onDismiss }) => (
  <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-xl px-5 py-4">
    <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-xs font-bold text-rose-700 mb-0.5">Generation Failed</p>
      <p className="text-[11px] text-rose-600">{message}</p>
    </div>
    <button onClick={onDismiss} className="text-rose-400 hover:text-rose-600 text-xs font-bold">
      Dismiss
    </button>
  </div>
);

// ─── Page Component ──────────────────────────────────────────────────────────────

const MarketMappingPage: React.FC = () => {
  const navigate = useNavigate();

  // ── Store ───────────────────────────────────────────────────────────
  const productTruth = useWorkflowStore(s => s.productTruth);
  const storedInterpretation = useWorkflowStore(s => s.marketInterpretation);
  const storedStatus = useWorkflowStore(s => s.marketMappingStatus);
  const setStoreInterpretation = useWorkflowStore(s => s.setMarketInterpretation);
  const setStoreStatus = useWorkflowStore(s => s.setMarketMappingStatus);

  // ── Local state ─────────────────────────────────────────────────────
  const [interpretation, setInterpretation] = useState<MarketInterpretationModel | null>(storedInterpretation);
  const [status, setStatus] = useState<MarketMappingStatus>(storedStatus);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const locked = status === 'locked';

  // ── Handlers ────────────────────────────────────────────────────────

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setStatus('generating');
    setErrorMessage(null);

    // Simulate 1200 ms generation
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Mock: always succeed
    setInterpretation(MOCK_MARKET_INTERPRETATION);
    setStatus('needs_review');
    setGenerating(false);
  }, []);

  const handleLock = useCallback(() => {
    if (!interpretation) return;
    setStatus('locked');
    setStoreInterpretation(interpretation);
    setStoreStatus('locked');
  }, [interpretation, setStoreInterpretation, setStoreStatus]);

  const handleEdit = useCallback(() => {
    // Unlock to allow editing by moving back to needs_review
    if (status === 'locked') {
      setStatus('needs_review');
      setStoreStatus('needs_review');
    }
  }, [status, setStoreStatus]);

  const handleDismissError = useCallback(() => {
    setErrorMessage(null);
    setStatus('idle');
  }, []);

  // ── Guard: no Product Truth → empty state ──────────────────────────
  if (!productTruth) {
    return (
      <div className="min-h-full">
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
            Market Mapping
          </span>
        </div>
        <EmptyState onGoToIntake={() => navigate('/v1/product-intake')} />
      </div>
    );
  }

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
          Product Intake
        </span>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">
          Market Mapping
        </span>
      </div>

      {/* ── Page heading ─────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#03234b] tracking-tight">Market Mapping</h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Transform the{' '}
          <strong className="text-[#03234b]">Product Truth</strong> into a
          market-facing interpretation: buyer personas, target industries, use
          cases, competitive landscape, buyer needs, adoption barriers, and
          market narratives. Review and lock to proceed.
        </p>
      </div>

      {/* ── Summary Card ─────────────────────────────────────────── */}
      <div className="mb-6">
        <SummaryCard
          productName={productTruth?.category ?? ''}
          productFamily={''}
          brand={''}
          category={productTruth.category}
          status={status}
        />
      </div>

      {/* ── Error Banner ─────────────────────────────────────────── */}
      {errorMessage && (
        <div className="mb-6">
          <ErrorBanner message={errorMessage} onDismiss={handleDismissError} />
        </div>
      )}

      {/* ── Content (only when interpretation exists) ────────────── */}
      {interpretation && (
        <>
          {/* 4-card grid */}
          <div className="mb-6">
            <MarketCardGroup
              personas={interpretation.personas}
              industries={interpretation.industries}
              useCases={interpretation.useCases}
              competitors={interpretation.competitors}
              locked={locked}
            />
          </div>

          {/* 3-section panel */}
          <div className="mb-8">
            <BuyerNeedsPanel
              buyerNeeds={interpretation.buyerNeeds}
              adoptionBarriers={interpretation.adoptionBarriers}
              narratives={interpretation.narratives}
              locked={locked}
            />
          </div>
        </>
      )}

      {/* ── Generating state (shown when no content yet) ─────────── */}
      {generating && !interpretation && (
        <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm p-16 text-center">
          <Loader2 className="w-8 h-8 text-[#3cb4e6] animate-spin mx-auto mb-4" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Generating Market Interpretation…
          </p>
          <p className="text-[10px] text-slate-400 mt-2">
            Analyzing Product Truth against market data to produce personas, use cases, and competitive landscape.
          </p>
        </div>
      )}

      {/* ── Idle state (generate prompt) ─────────────────────────── */}
      {!generating && !interpretation && status === 'idle' && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-16 text-center">
          <Target className="w-8 h-8 text-slate-300 mx-auto mb-4" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
            Ready to Generate
          </p>
          <p className="text-[10px] text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
            Click <strong>Generate Market Interpretation</strong> to produce the
            full market mapping based on the confirmed Product Truth.
          </p>
          <button
            onClick={handleGenerate}
            className="bg-[#03234b] text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-[#0a3d7a] transition-all inline-flex items-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Market Interpretation
          </button>
        </div>
      )}

      {/* ── CTA Footer (when content exists or generating) ───────── */}
      {(interpretation || generating) && (
        <div className={`px-6 py-4 rounded-2xl border-2 flex items-center justify-between gap-4 ${
          locked
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            {locked ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">
                  Market interpretation locked and saved. Proceed to Brief Builder.
                </span>
              </>
            ) : (
              <span className="text-xs font-medium text-slate-500">
                {generating
                  ? 'Generation in progress…'
                  : 'Review the market interpretation below, then lock it to proceed.'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!locked && !generating && (
              <>
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-3 py-2 rounded-lg hover:bg-white transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  Regenerate
                </button>
                <button
                  onClick={handleLock}
                  disabled={!interpretation}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-all disabled:opacity-30"
                >
                  <Lock className="w-3 h-3" />
                  Lock &amp; Continue
                </button>
              </>
            )}
            {locked && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-3 py-2 rounded-lg hover:bg-white transition-all"
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketMappingPage;
