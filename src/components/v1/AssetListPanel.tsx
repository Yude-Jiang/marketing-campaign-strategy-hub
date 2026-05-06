/**
 * src/components/v1/AssetListPanel.tsx
 * Left panel: asset list grouped by type with status chips.
 */

import React from 'react';
import {
  Globe,
  Megaphone,
  HelpCircle,
  Shield,
  Presentation,
  Mail,
  FileText,
} from 'lucide-react';
import type { AssetRecord, AssetType, AssetStatus } from '../../types/activation';

// ─── Asset type meta ─────────────────────────────────────────────────────────────

const ASSET_TYPE_META: Record<AssetType, { label: string; icon: React.ElementType }> = {
  landing_page:   { label: 'Landing Pages',  icon: Globe },
  paid_ad:        { label: 'Paid Ads',       icon: Megaphone },
  faq:            { label: 'FAQs',           icon: HelpCircle },
  battlecard:     { label: 'Battlecards',    icon: Shield },
  deck:           { label: 'Decks',          icon: Presentation },
  email_sequence: { label: 'Email Sequences', icon: Mail },
};

const ASSET_TYPE_ORDER: AssetType[] = [
  'landing_page',
  'paid_ad',
  'faq',
  'battlecard',
  'deck',
  'email_sequence',
];

const STATUS_META: Record<AssetStatus, { label: string; color: string }> = {
  planning:         { label: 'Planning',       color: 'text-slate-500 bg-slate-100 border-slate-200' },
  generating:       { label: 'Generating…',    color: 'text-amber-600 bg-amber-50 border-amber-200' },
  ready_for_review: { label: 'Ready',          color: 'text-amber-600 bg-amber-50 border-amber-200' },
  approved:         { label: 'Approved',       color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  handoff:          { label: 'Handoff',        color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  error:            { label: 'Error',          color: 'text-rose-600 bg-rose-50 border-rose-200' },
};

// ─── Component ───────────────────────────────────────────────────────────────────

interface AssetListPanelProps {
  assets: AssetRecord[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

const AssetListPanel: React.FC<AssetListPanelProps> = ({ assets, activeId, onSelect }) => {
  // Group assets by type
  const grouped = ASSET_TYPE_ORDER
    .map(type => ({
      type,
      meta: ASSET_TYPE_META[type],
      items: assets.filter(a => a.type === type),
    }))
    .filter(g => g.items.length > 0);

  // Count statuses
  const total = assets.length;
  const approvedCount = assets.filter(a => a.status === 'approved' || a.status === 'handoff').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2 mb-0.5">
          <FileText className="w-4 h-4 text-[#3cb4e6]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Assets
          </span>
        </div>
        <p className="text-[9px] text-slate-400">
          {total} assets · {approvedCount} approved
        </p>
      </div>

      {/* Groups */}
      <div className="divide-y divide-slate-50 max-h-[650px] overflow-y-auto">
        {grouped.map(group => {
          const Icon = group.meta.icon;
          return (
            <div key={group.type} className="px-3 py-2.5">
              <div className="flex items-center gap-1.5 mb-1.5 px-1">
                <Icon className="w-3 h-3 text-slate-400" />
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                  {group.meta.label}
                </span>
                <span className="text-[8px] text-slate-300 ml-auto">{group.items.length}</span>
              </div>
              <div className="space-y-0.5">
                {group.items.map(asset => {
                  const s = STATUS_META[asset.status];
                  const isActive = asset.id === activeId;
                  return (
                    <button
                      key={asset.id}
                      onClick={() => onSelect(asset.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#3cb4e6]/10 ring-1 ring-[#3cb4e6]/30'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`flex-1 text-[10px] font-medium truncate ${
                          isActive ? 'text-[#03234b]' : 'text-slate-700'
                        }`}>
                          {asset.title}
                        </span>
                        <span className={`text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border whitespace-nowrap ${s.color}`}>
                          {s.label}
                        </span>
                      </div>
                      {asset.owner && (
                        <p className="text-[8px] text-slate-400 mt-0.5">{asset.owner}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {assets.length === 0 && (
        <div className="p-8 text-center">
          <FileText className="w-6 h-6 text-slate-300 mx-auto mb-2" />
          <p className="text-[10px] text-slate-400">No assets yet.</p>
        </div>
      )}
    </div>
  );
};

export default AssetListPanel;
