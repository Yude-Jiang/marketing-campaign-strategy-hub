/**
 * src/components/v1/BriefEditorSection.tsx
 * Reusable collapsible section wrapper for the Brief Builder editor.
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';

interface BriefEditorSectionProps {
  label: string;
  locked: boolean;
  onRegen?: () => void;
  regenLoading?: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const BriefEditorSection: React.FC<BriefEditorSectionProps> = ({
  label,
  locked,
  onRegen,
  regenLoading = false,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {open
            ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          }
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            {label}
          </span>
        </div>
        {onRegen && !locked && (
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onRegen(); }}
            disabled={regenLoading}
            className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-[#3cb4e6] hover:text-[#0a3d7a] transition-colors disabled:opacity-30"
          >
            <RefreshCw className={`w-3 h-3 ${regenLoading ? 'animate-spin' : ''}`} />
            Regen
          </button>
        )}
      </button>

      {/* Body */}
      {open && (
        <div className="px-5 pb-4 pt-1 space-y-2.5">
          {children}
        </div>
      )}
    </div>
  );
};

// ─── Field helpers ───────────────────────────────────────────────────────────────

interface TextFieldProps {
  label: string;
  value: string;
  locked: boolean;
  onChange: (v: string) => void;
  placeholder?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label, value, locked, onChange, placeholder,
}) => (
  <div>
    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
      {label}
    </label>
    {locked ? (
      <p className="text-xs font-medium text-[#03234b]">{value || '—'}</p>
    ) : (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-[#03234b] placeholder-slate-300 outline-none focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 transition-all"
      />
    )}
  </div>
);

interface TextAreaFieldProps {
  label: string;
  value: string;
  locked: boolean;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label, value, locked, onChange, placeholder, rows = 3,
}) => (
  <div>
    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
      {label}
    </label>
    {locked ? (
      <p className="text-xs font-medium text-slate-700 whitespace-pre-wrap">{value || '—'}</p>
    ) : (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 placeholder-slate-300 outline-none focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 transition-all resize-none"
      />
    )}
  </div>
);

interface ArrayFieldProps {
  label: string;
  items: string[];
  locked: boolean;
  onChange: (items: string[]) => void;
  placeholder?: string;
  emptyLabel?: string;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({
  label, items, locked, onChange, placeholder = 'Add item…', emptyLabel = 'None',
}) => {
  const [input, setInput] = useState('');

  const addItem = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setInput('');
  };

  const removeItem = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
        {label}
      </label>
      {locked ? (
        items.length === 0
          ? <p className="text-xs text-slate-400 italic">{emptyLabel}</p>
          : (
            <ul className="space-y-0.5">
              {items.map((item, i) => (
                <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                  <span className="text-[#3cb4e6] mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
      ) : (
        <div className="space-y-1.5">
          <div className="flex gap-1.5">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-[#03234b] placeholder-slate-300 outline-none focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 transition-all"
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addItem(); } }}
            />
            <button
              type="button"
              onClick={addItem}
              disabled={!input.trim()}
              className="px-3 py-2 text-[9px] font-black uppercase bg-[#3cb4e6] text-white rounded-lg hover:bg-[#0a3d7a] disabled:opacity-30 transition-all"
            >
              Add
            </button>
          </div>
          {items.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {items.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[9px] font-bold bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full">
                  {item}
                  <button type="button" onClick={() => removeItem(i)} className="text-slate-300 hover:text-rose-500">
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BriefEditorSection;
