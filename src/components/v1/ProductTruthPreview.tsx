import React, { useState } from 'react';
import type { ProductTruthModel, ProductIntakeStatus } from '../../types/product';
import { CheckCircle2, Edit3, Lock } from 'lucide-react';

interface ProductTruthPreviewProps {
  truth: ProductTruthModel | null;
  status: ProductIntakeStatus;
  onConfirm: () => void;
  onEdit: (updated: ProductTruthModel) => void;
}

const ProductTruthPreview: React.FC<ProductTruthPreviewProps> = ({
  truth,
  status,
  onConfirm,
  onEdit,
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProductTruthModel | null>(null);

  if (!truth) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Product Truth</p>
        <p className="text-[10px] text-slate-400 mt-2 max-w-xs leading-relaxed">
          Fill in the product details on the left and click <strong>Parse Product</strong> to generate the Product Truth model.
        </p>
      </div>
    );
  }

  const isConfirmed = status === 'confirmed';
  const model = editing && draft ? draft : truth;

  const updateSection = <K extends keyof ProductTruthModel>(
    key: K,
    value: ProductTruthModel[K]
  ) => {
    setDraft(prev => prev ? { ...prev, [key]: value } : null);
  };

  const startEditing = () => {
    setDraft({ ...truth });
    setEditing(true);
  };

  const saveEdits = () => {
    if (draft) {
      onEdit(draft);
    }
    setEditing(false);
  };

  const cancelEditing = () => {
    setDraft(null);
    setEditing(false);
  };

  return (
    <div className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden transition-all ${
      isConfirmed ? 'border-emerald-200' : editing ? 'border-amber-200' : 'border-slate-100'
    }`}>
      {/* Header */}
      <div className={`px-6 py-4 flex items-center justify-between ${
        isConfirmed ? 'bg-emerald-50' : editing ? 'bg-amber-50' : 'bg-slate-50'
      }`}>
        <div className="flex items-center gap-2">
          {isConfirmed
            ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            : <Lock className={`w-4 h-4 ${editing ? 'text-amber-500' : 'text-slate-400'}`} />
          }
          <span className={`text-[10px] font-black uppercase tracking-widest ${
            isConfirmed ? 'text-emerald-700' : editing ? 'text-amber-700' : 'text-slate-500'
          }`}>
            Product Truth
            {isConfirmed && ' (Confirmed)'}
            {editing && ' (Editing)'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isConfirmed ? (
            <button
              onClick={startEditing}
              className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-white transition-all"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          ) : editing ? (
            <>
              <button
                onClick={saveEdits}
                className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-all"
              >
                <CheckCircle2 className="w-3 h-3" /> Save
              </button>
              <button
                onClick={cancelEditing}
                className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-white transition-all"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={startEditing}
              className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-lg hover:bg-amber-100 transition-all"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-5">
        {/* Category */}
        <Section
          label="Category"
          editing={editing}
          value={model.category}
          onChange={v => updateSection('category', v)}
        />

        {/* Core Features */}
        <ArraySection
          label="Core Features"
          editing={editing}
          items={model.coreFeatures}
          onChange={v => updateSection('coreFeatures', v)}
        />

        {/* Key Specs */}
        <div>
          <SectionLabel label="Key Specifications" />
          <div className="space-y-1.5 mt-2">
            {model.keySpecs.map((spec, i) => (
              <div key={i} className="grid grid-cols-2 gap-3 px-4 py-2.5 bg-slate-50 rounded-lg text-xs">
                {editing ? (
                  <>
                    <input
                      value={spec.label}
                      onChange={e => {
                        const next = [...model.keySpecs];
                        next[i] = { ...next[i], label: e.target.value };
                        updateSection('keySpecs', next);
                      }}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold text-slate-600 outline-none focus:border-[#3cb4e6]"
                    />
                    <input
                      value={spec.value}
                      onChange={e => {
                        const next = [...model.keySpecs];
                        next[i] = { ...next[i], value: e.target.value };
                        updateSection('keySpecs', next);
                      }}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold text-[#03234b] outline-none focus:border-[#3cb4e6]"
                    />
                  </>
                ) : (
                  <>
                    <span className="font-bold text-slate-500">{spec.label}</span>
                    <span className="font-bold text-[#03234b]">{spec.value}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Differentiators */}
        <ArraySection
          label="Differentiators"
          editing={editing}
          items={model.differentiators}
          onChange={v => updateSection('differentiators', v)}
        />

        {/* Proof Points */}
        <ArraySection
          label="Proof Points"
          editing={editing}
          items={model.proofPoints}
          onChange={v => updateSection('proofPoints', v)}
        />

        {/* Limitations */}
        {model.limitations && (
          <ArraySection
            label="Known Limitations"
            editing={editing}
            items={model.limitations}
            onChange={v => updateSection('limitations', v)}
          />
        )}
      </div>

      {/* Confirm footer (only when ready to confirm) */}
      {status === 'ready_to_confirm' && !editing && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onConfirm}
            className="w-full bg-emerald-600 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <CheckCircle2 className="w-4 h-4" /> Confirm Product Truth
          </button>
          <p className="text-[9px] text-slate-400 text-center mt-2">
            Once confirmed, this model will be stored and used in downstream steps.
          </p>
        </div>
      )}

      {/* Confirmed badge */}
      {isConfirmed && (
        <div className="px-6 py-3 border-t border-emerald-100 bg-emerald-50/50 flex items-center gap-2 justify-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-bold text-emerald-700">Product Truth confirmed and saved</span>
        </div>
      )}
    </div>
  );
};

// ─── Sub-components ─────────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
);

const Section: React.FC<{
  label: string;
  editing: boolean;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, editing, value, onChange }) => (
  <div>
    <SectionLabel label={label} />
    {editing ? (
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-[#03234b] outline-none focus:border-[#3cb4e6]"
      />
    ) : (
      <p className="text-sm font-bold text-[#03234b] mt-1.5">{value}</p>
    )}
  </div>
);

const ArraySection: React.FC<{
  label: string;
  editing: boolean;
  items: string[];
  onChange: (items: string[]) => void;
}> = ({ label, editing, items, onChange }) => (
  <div>
    <SectionLabel label={label} />
    <ul className="mt-2 space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
          {editing ? (
            <input
              value={item}
              onChange={e => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none focus:border-[#3cb4e6]"
            />
          ) : (
            <>
              <span className="text-[#3cb4e6] mt-0.5 flex-shrink-0">•</span>
              <span className="leading-relaxed">{item}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default ProductTruthPreview;
