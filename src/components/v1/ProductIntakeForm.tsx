import React, { useState, useRef } from 'react';
import type { ProductMetaInput, ProductIntakeStatus } from '../../types/product';
import { Upload, Globe, X, Loader2, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ProductIntakeFormProps {
  meta: ProductMetaInput;
  onChange: (meta: ProductMetaInput) => void;
  status: ProductIntakeStatus;
  errorMessage: string | null;
  onParse: () => void;
  onReset: () => void;
}

const INDUSTRY_OPTIONS = [
  'Consumer Electronics',
  'Automotive',
  'Industrial',
  'Medical',
  'IoT / Smart Home',
  'Telecommunications',
  'Aerospace & Defense',
  'Energy',
];

const ProductIntakeForm: React.FC<ProductIntakeFormProps> = ({
  meta,
  onChange,
  status,
  errorMessage,
  onParse,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number }[]>([]);
  const [addedUrls, setAddedUrls] = useState<string[]>([]);
  const [industryInput, setIndustryInput] = useState('');

  const update = (patch: Partial<ProductMetaInput>) => onChange({ ...meta, ...patch });

  const isUploading = status === 'uploading';
  const isParsing = status === 'parsing';
  const isProcessing = isUploading || isParsing;
  const isConfirmed = status === 'confirmed';

  const canParse = meta.productName.trim().length > 0 && !isProcessing && !isConfirmed;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(f => {
      setUploadedFiles(prev => [...prev, { name: f.name, size: f.size }]);
    });
    e.target.value = '';
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setAddedUrls(prev => [...prev, trimmed]);
    setUrlInput('');
    update({ productUrl: trimmed });
  };

  const removeUrl = (idx: number) => {
    setAddedUrls(prev => {
      const next = prev.filter((_, i) => i !== idx);
      update({ productUrl: next[next.length - 1] || '' });
      return next;
    });
  };

  const addIndustry = (ind: string) => {
    const current = meta.targetIndustries ?? [];
    if (!current.includes(ind)) {
      update({ targetIndustries: [...current, ind] });
    }
    setIndustryInput('');
  };

  const removeIndustry = (idx: number) => {
    const current = meta.targetIndustries ?? [];
    update({ targetIndustries: current.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-5">
      {/* ── Product Name (required) ───────────────────────────── */}
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
          Product Name <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          value={meta.productName}
          onChange={e => update({ productName: e.target.value })}
          disabled={isConfirmed}
          placeholder="e.g. VL53L9, STM32WBA55"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#03234b] placeholder-slate-400 focus:bg-white focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* ── Product Family + Brand (2-col) ───────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
            Product Family
          </label>
          <input
            type="text"
            value={meta.productFamily ?? ''}
            onChange={e => update({ productFamily: e.target.value })}
            disabled={isConfirmed}
            placeholder="e.g. VL53Lx, STM32Wx"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-[#03234b] placeholder-slate-400 focus:bg-white focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
            Brand
          </label>
          <input
            type="text"
            value={meta.brand ?? ''}
            onChange={e => update({ brand: e.target.value })}
            disabled={isConfirmed}
            placeholder="e.g. STMicroelectronics"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-[#03234b] placeholder-slate-400 focus:bg-white focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* ── Target Region + Industries ───────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
            Target Region
          </label>
          <input
            type="text"
            value={meta.targetRegion ?? ''}
            onChange={e => update({ targetRegion: e.target.value })}
            disabled={isConfirmed}
            placeholder="e.g. Global, Greater China, EU"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-[#03234b] placeholder-slate-400 focus:bg-white focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
            Target Industries
          </label>
          <div className="relative">
            <input
              type="text"
              value={industryInput}
              onChange={e => setIndustryInput(e.target.value)}
              disabled={isConfirmed}
              placeholder="Type to add..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-[#03234b] placeholder-slate-400 focus:bg-white focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onKeyDown={e => {
                if (e.key === 'Enter' && industryInput.trim()) {
                  e.preventDefault();
                  addIndustry(industryInput.trim());
                }
              }}
            />
            {industryInput.trim().length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-40 overflow-y-auto">
                {INDUSTRY_OPTIONS.filter(i => i.toLowerCase().includes(industryInput.toLowerCase())).map(ind => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => addIndustry(ind)}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {ind}
                  </button>
                ))}
              </div>
            )}
          </div>
          {(meta.targetIndustries ?? []).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {meta.targetIndustries!.map((ind, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[9px] font-bold bg-[#3cb4e6]/10 text-[#0a3d7a] border border-[#3cb4e6]/20 px-2 py-0.5 rounded-full">
                  {ind}
                  {!isConfirmed && (
                    <button onClick={() => removeIndustry(i)} className="hover:text-rose-500 ml-0.5">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Business Goal ────────────────────────────────────── */}
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
          Business Goal
        </label>
        <textarea
          value={meta.businessGoal ?? ''}
          onChange={e => update({ businessGoal: e.target.value })}
          disabled={isConfirmed}
          placeholder="e.g. Establish cognitive sovereignty for VL53L9 in consumer ToF, displace competitor narrative in smartphone AF use cases..."
          rows={3}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-[#03234b] placeholder-slate-400 focus:bg-white focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* ── Datasheet Upload ──────────────────────────────────── */}
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
          Datasheet Upload
        </label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.txt,.md"
          onChange={handleFileUpload}
          disabled={isConfirmed}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isConfirmed}
          className="w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl py-6 hover:bg-slate-50 hover:border-[#3cb4e6]/30 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Upload className="w-6 h-6 text-slate-300 mb-2" />
          <span className="text-[10px] font-black uppercase text-slate-400">Upload .pdf / .txt / .md</span>
        </button>
        {uploadedFiles.length > 0 && (
          <div className="mt-2 space-y-1">
            {uploadedFiles.map((f, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-xs">
                <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="flex-1 font-medium text-slate-700 truncate">{f.name}</span>
                <span className="text-[10px] text-slate-400">{(f.size / 1024).toFixed(0)} KB</span>
                {!isConfirmed && (
                  <button onClick={() => removeFile(i)} className="text-slate-300 hover:text-rose-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── URL Input ─────────────────────────────────────────── */}
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
          Product URL
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              disabled={isConfirmed}
              placeholder="https://www.st.com/en/product/VL53L9..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onKeyDown={e => e.key === 'Enter' && handleAddUrl()}
            />
          </div>
          <button
            type="button"
            onClick={handleAddUrl}
            disabled={isConfirmed || !urlInput.trim()}
            className="px-4 py-2 bg-[#3cb4e6] text-white rounded-xl hover:bg-[#0a3d7a] disabled:opacity-30 transition-all shadow-sm text-xs font-black uppercase"
          >
            Add
          </button>
        </div>
        {addedUrls.length > 0 && (
          <div className="mt-2 space-y-1">
            {addedUrls.map((url, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-xs">
                <Globe className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span className="flex-1 font-medium text-slate-600 truncate">{url}</span>
                {!isConfirmed && (
                  <button onClick={() => removeUrl(i)} className="text-slate-300 hover:text-rose-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Error Message ──────────────────────────────────────── */}
      {errorMessage && (
        <div className="flex items-start gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs font-medium text-rose-700">{errorMessage}</p>
        </div>
      )}

      {/* ── Action Buttons ────────────────────────────────────── */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onParse}
          disabled={!canParse}
          className={`flex-1 font-black text-sm uppercase py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg ${
            isProcessing
              ? 'bg-slate-200 text-slate-400 cursor-wait'
              : isConfirmed
                ? 'bg-emerald-100 text-emerald-600 cursor-default'
                : 'bg-[#03234b] text-white hover:bg-[#0a3d7a] disabled:opacity-30'
          }`}
        >
          {isProcessing ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Parsing...</>
          ) : isConfirmed ? (
            <><CheckCircle2 className="w-5 h-5" /> Confirmed</>
          ) : (
            <><FileText className="w-5 h-5" /> Parse Product</>
          )}
        </button>

        {(isConfirmed || status === 'ready_to_confirm') && (
          <button
            type="button"
            onClick={onReset}
            className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-500 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductIntakeForm;
