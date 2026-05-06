/**
 * src/components/v1/BriefPreviewPanel.tsx
 * Right-column preview panel for Campaign Brief — live-synced from editor state.
 */

import React from 'react';
import {
  FileText,
  Target,
  Users,
  Swords,
  Gift,
  PlayCircle,
  DollarSign,
  Calendar,
  Tag,
} from 'lucide-react';
import type { CampaignBriefModel } from '../../types/brief';

// ─── Section block ───────────────────────────────────────────────────────────────

const SectionBlock: React.FC<{
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  locked: boolean;
}> = ({ icon: Icon, label, children, locked }) => (
  <div className={`border-b pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 ${
    locked ? 'border-emerald-100' : 'border-slate-100'
  }`}>
    <div className="flex items-center gap-1.5 mb-2.5">
      <Icon className={`w-3.5 h-3.5 ${locked ? 'text-emerald-500' : 'text-[#3cb4e6]'}`} />
      <span className={`text-[9px] font-black uppercase tracking-widest ${
        locked ? 'text-emerald-700' : 'text-slate-500'
      }`}>{label}</span>
    </div>
    {children}
  </div>
);

// ─── Bullet list ─────────────────────────────────────────────────────────────────

const BulletItems: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-[10px] leading-relaxed">
        <span className="text-[#3cb4e6] mt-0.5 flex-shrink-0">•</span>
        <span className="text-slate-700">{item}</span>
      </li>
    ))}
  </ul>
);

// ─── Audience display ────────────────────────────────────────────────────────────

const AudienceBlock: React.FC<{ primary: string[]; secondary: string[] }> = ({ primary, secondary }) => (
  <div className="space-y-2 text-[10px]">
    <div>
      <span className="font-bold text-slate-500">Primary: </span>
      <span className="text-slate-700">{primary.join('; ') || '—'}</span>
    </div>
    <div>
      <span className="font-bold text-slate-500">Secondary: </span>
      <span className="text-slate-700">{secondary.join('; ') || '—'}</span>
    </div>
  </div>
);

// ─── Offer block ─────────────────────────────────────────────────────────────────

const OfferBlock: React.FC<{ headline: string; proofs: string[] }> = ({ headline, proofs }) => (
  <div>
    <p className="text-[11px] font-bold text-[#03234b] mb-2 leading-relaxed">{headline || '—'}</p>
    {proofs.length > 0 && (
      <ul className="space-y-0.5">
        {proofs.map((p, i) => (
          <li key={i} className="text-[9px] text-slate-600 flex items-start gap-1.5">
            <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// ─── Channel split table ─────────────────────────────────────────────────────────

const ChannelTable: React.FC<{ splits: { channel: string; amount: number }[] }> = ({ splits }) => {
  const total = splits.reduce((sum, s) => sum + s.amount, 0);
  return (
    <div className="space-y-1">
      {splits.map((s, i) => {
        const pct = total > 0 ? ((s.amount / total) * 100).toFixed(0) : '0';
        return (
          <div key={i} className="flex items-center gap-2 text-[10px]">
            <span className="w-1/2 text-slate-600 truncate">{s.channel}</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3cb4e6] rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-16 text-right font-bold text-slate-600">
              ${(s.amount / 1000).toFixed(0)}K
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Tags ────────────────────────────────────────────────────────────────────────

const TagRow: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="flex flex-wrap gap-1">
    {tags.length === 0 ? (
      <span className="text-[10px] text-slate-400 italic">None</span>
    ) : (
      tags.map((t, i) => (
        <span key={i} className="text-[8px] font-bold bg-[#3cb4e6]/10 text-[#0a3d7a] border border-[#3cb4e6]/20 px-2 py-0.5 rounded-full">
          {t}
        </span>
      ))
    )}
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────────

interface BriefPreviewPanelProps {
  brief: CampaignBriefModel | null;
  locked: boolean;
}

const BriefPreviewPanel: React.FC<BriefPreviewPanelProps> = ({ brief, locked }) => {
  if (!brief) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-10 text-center h-full flex flex-col items-center justify-center min-h-[600px]">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Campaign Brief</p>
        <p className="text-[10px] text-slate-400 mt-2 max-w-xs leading-relaxed">
          Fill in the editor fields on the left, then click <strong>Generate Brief</strong> to see the preview.
        </p>
      </div>
    );
  }

  const { campaignOverview: co, objectives, audience, competitors, offer, keyUseCases, budget, timing, tags } = brief;

  return (
    <div className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden ${
      locked ? 'border-emerald-200' : 'border-slate-100'
    }`}>
      {/* Header */}
      <div className={`px-5 py-3 border-b ${
        locked ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'
      }`}>
        <div className="flex items-center gap-2 mb-0.5">
          <FileText className={`w-4 h-4 ${locked ? 'text-emerald-600' : 'text-slate-400'}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${
            locked ? 'text-emerald-700' : 'text-slate-500'
          }`}>Campaign Brief</span>
          {locked && <span className="text-[8px] font-bold text-emerald-600">(Locked)</span>}
        </div>
        <p className="text-[11px] font-black text-[#03234b]">{co.name || 'Untitled Campaign'}</p>
      </div>

      {/* Body */}
      <div className="px-5 py-5 max-h-[700px] overflow-y-auto">
        {/* Overview meta */}
        <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-slate-100 text-[9px] text-slate-500">
          <div><span className="font-bold">Family:</span> {co.productFamily || '—'}</div>
          <div><span className="font-bold">Brand:</span> {co.brand || '—'}</div>
          <div><span className="font-bold">Timing:</span> {co.timing || '—'}</div>
        </div>

        <SectionBlock icon={Target} label="Objectives" locked={locked}>
          <BulletItems items={objectives} />
        </SectionBlock>

        <SectionBlock icon={Users} label="Target Audience" locked={locked}>
          <AudienceBlock primary={audience.primary} secondary={audience.secondary} />
        </SectionBlock>

        <SectionBlock icon={Swords} label="Competitors" locked={locked}>
          <BulletItems items={competitors} />
        </SectionBlock>

        <SectionBlock icon={Gift} label="Offer & Proofs" locked={locked}>
          <OfferBlock headline={offer.headline} proofs={offer.proofs} />
        </SectionBlock>

        <SectionBlock icon={PlayCircle} label="Key Use Cases" locked={locked}>
          <BulletItems items={keyUseCases} />
        </SectionBlock>

        <SectionBlock icon={DollarSign} label="Budget & Channels" locked={locked}>
          <div className="mb-1 text-[10px] font-bold text-slate-600">
            Total: <span className="text-[#03234b]">${(budget.total / 1000).toLocaleString()}K</span>
          </div>
          <ChannelTable splits={budget.splits} />
        </SectionBlock>

        <SectionBlock icon={Calendar} label="Timeline" locked={locked}>
          <p className="text-[10px] text-slate-700">
            {timing.start || '—'} → {timing.end || '—'}
          </p>
        </SectionBlock>

        <SectionBlock icon={Tag} label="Tags" locked={locked}>
          <TagRow tags={tags} />
        </SectionBlock>
      </div>
    </div>
  );
};

export default BriefPreviewPanel;
