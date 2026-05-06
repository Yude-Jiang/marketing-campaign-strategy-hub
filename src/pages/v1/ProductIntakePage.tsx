import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Globe, Database } from 'lucide-react';
import type { ProductMetaInput, ProductIntakeStatus, ProductTruthModel } from '../../types/product';
import { MOCK_PRODUCT_TRUTH } from '../../mock/productTruth';
import { useWorkflowStore } from '../../store/workflowStore';
import ProductIntakeForm from '../../components/v1/ProductIntakeForm';
import ProductTruthPreview from '../../components/v1/ProductTruthPreview';

// ─── Constants ───────────────────────────────────────────────────────────────────

const INITIAL_META: ProductMetaInput = {
  productName: '',
  productFamily: '',
  brand: '',
  targetRegion: '',
  targetIndustries: [],
  businessGoal: '',
  knownCompetitors: [],
  productUrl: '',
};

// ─── Page Component ──────────────────────────────────────────────────────────────

const ProductIntakePage: React.FC = () => {
  const navigate = useNavigate();

  // Store-bound persisted state
  const storeTruth = useWorkflowStore(s => s.productTruth);
  const storeStatus = useWorkflowStore(s => s.productIntakeStatus);
  const setStoreTruth = useWorkflowStore(s => s.setProductTruth);
  const setStoreStatus = useWorkflowStore(s => s.setProductIntakeStatus);

  // Local form state
  const [meta, setMeta] = useState<ProductMetaInput>(INITIAL_META);
  const [truth, setTruth] = useState<ProductTruthModel | null>(storeTruth);
  const [status, setStatus] = useState<ProductIntakeStatus>(storeStatus);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Keep local truth/status in sync when store changes (e.g. page revisit)
  useEffect(() => {
    if (storeTruth && !truth) setTruth(storeTruth);
    if (storeStatus !== 'empty' && status === 'empty') setStatus(storeStatus);
  }, [storeTruth, storeStatus]); // only on mount / store hydration

  // ── Parse handler (mock) ─────────────────────────────────────────────
  const [parsing, setParsing] = useState(false);

  const handleParse = useCallback(async () => {
    if (!meta.productName.trim()) return;
    setParsing(true);
    setStatus('parsing');
    setErrorMessage(null);

    // Simulate 800 ms API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock: always succeed with the mock product truth
    setTruth(MOCK_PRODUCT_TRUTH);
    setStatus('ready_to_confirm');
    setParsing(false);
  }, [meta.productName]);

  // ── Confirm handler ──────────────────────────────────────────────────
  const handleConfirm = useCallback(() => {
    if (!truth) return;
    setStatus('confirmed');
    setStoreTruth(truth);
    setStoreStatus('confirmed');
  }, [truth, setStoreTruth, setStoreStatus]);

  // ── Edit handler (called from ProductTruthPreview) ───────────────────
  const handleEdit = useCallback((updated: ProductTruthModel) => {
    setTruth(updated);
  }, []);

  // ── Reset handler ────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setMeta(INITIAL_META);
    setTruth(null);
    setStatus('empty');
    setErrorMessage(null);
    setStoreTruth(null);
    setStoreStatus('empty');
  }, [setStoreTruth, setStoreStatus]);

  // ── Combined parse trigger (also called from form) ───────────────────
  const onParse = useCallback(() => {
    handleParse();
  }, [handleParse]);

  // Derive effective status (loading overlay during mock parse)
  const effectiveStatus: ProductIntakeStatus = parsing ? 'parsing' : status;

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
          Product Intake
        </span>
      </div>

      {/* ── Page heading ─────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#03234b] tracking-tight">Product Intake</h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Provide product information — name, category, datasheets, and URLs — to generate
          a structured <strong className="text-[#03234b]">Product Truth</strong> model.
          This models feeds downstream steps: Market Mapping, Brief Builder, and Strategy Studio.
        </p>
      </div>

      {/* ── Dual-column layout ───────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left column — Form */}
        <div className="col-span-7">
          <ProductIntakeForm
            meta={meta}
            onChange={setMeta}
            status={effectiveStatus}
            errorMessage={errorMessage}
            onParse={onParse}
            onReset={handleReset}
          />

          {/* Source summary (only when confirmed) */}
          {effectiveStatus === 'confirmed' && (
            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                  Data Sources
                </span>
              </div>
              <div className="space-y-2 text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-medium">Mock datasheet: VL53L9_DS_v1.2.pdf</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-medium">st.com/en/product/VL53L9</span>
                </div>
              </div>
              <p className="text-[9px] text-emerald-600 mt-3">
                These sources were used to generate the Product Truth model.
              </p>
            </div>
          )}
        </div>

        {/* Right column — Preview */}
        <div className="col-span-5 sticky top-6">
          <ProductTruthPreview
            truth={truth}
            status={effectiveStatus}
            onConfirm={handleConfirm}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductIntakePage;
