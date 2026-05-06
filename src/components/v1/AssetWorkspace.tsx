/**
 * src/components/v1/AssetWorkspace.tsx
 * Right panel: workspace with tabs — Content / Preview / Versions / Approval.
 */

import React, { useState } from 'react';
import {
  FileText,
  Eye,
  History,
  CheckCircle,
  AlertCircle,
  Loader2,
  Send,
  ThumbsUp,
} from 'lucide-react';
import type { AssetRecord, AssetVersionRecord, AssetStatus } from '../../types/activation';

// ─── Status badges ───────────────────────────────────────────────────────────────

const STATUS_META: Record<AssetStatus, { label: string; color: string }> = {
  planning:         { label: 'Planning',       color: 'text-slate-500 bg-slate-100 border-slate-200' },
  generating:       { label: 'Generating…',    color: 'text-amber-600 bg-amber-50 border-amber-200' },
  ready_for_review: { label: 'Ready for Review', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  approved:         { label: 'Approved',       color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  handoff:          { label: 'Handoff',        color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  error:            { label: 'Error',          color: 'text-rose-600 bg-rose-50 border-rose-200' },
};

type Tab = 'content' | 'preview' | 'versions' | 'approval';

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'content',  label: 'Content',  icon: FileText },
  { key: 'preview',  label: 'Preview',  icon: Eye },
  { key: 'versions', label: 'Versions', icon: History },
  { key: 'approval', label: 'Approval', icon: CheckCircle },
];

// ─── Version Timeline ────────────────────────────────────────────────────────────

const VersionTimeline: React.FC<{ versions: AssetVersionRecord[] }> = ({ versions }) => {
  if (versions.length === 0) {
    return <p className="text-[10px] text-slate-400 text-center py-6">No version history yet.</p>;
  }

  return (
    <div className="space-y-0">
      {[...versions].reverse().map((v, i) => (
        <div key={v.version} className="relative pl-6 pb-4 last:pb-0">
          {/* Timeline dot + line */}
          <div className="absolute left-0 top-1 flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3cb4e6] border-2 border-white shadow-sm" />
            {i < versions.length - 1 && (
              <div className="w-px flex-1 bg-slate-200 mt-1" style={{ height: 'calc(100% + 8px)' }} />
            )}
          </div>
          {/* Content */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#03234b]">v{v.version}</span>
              <span className="text-[8px] text-slate-400">
                {new Date(v.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-[9px] text-slate-600 mt-0.5 leading-relaxed">{v.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Approval Section ────────────────────────────────────────────────────────────

const ApprovalSection: React.FC<{
  status: AssetStatus;
  onApprove: () => void;
  onHandoff: () => void;
}> = ({ status, onApprove, onHandoff }) => {
  if (status === 'approved') {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <ThumbsUp className="w-6 h-6 text-emerald-500" />
        </div>
        <p className="text-xs font-black text-emerald-700">Approved</p>
        <p className="text-[10px] text-emerald-600 mt-1">This asset has been approved and is ready for handoff.</p>
        <button
          onClick={onHandoff}
          className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3.5 py-2 rounded-lg hover:bg-indigo-100 transition-all"
        >
          <Send className="w-3 h-3" />
          Send to Handoff
        </button>
      </div>
    );
  }

  if (status === 'handoff') {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <Send className="w-6 h-6 text-indigo-500" />
        </div>
        <p className="text-xs font-black text-indigo-700">Handed Off</p>
        <p className="text-[10px] text-indigo-600 mt-1">This asset has been sent to the execution team.</p>
      </div>
    );
  }

  if (status === 'generating') {
    return (
      <div className="text-center py-8">
        <Loader2 className="w-8 h-8 text-[#3cb4e6] animate-spin mx-auto mb-3" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Generating…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-8 h-8 text-rose-400 mx-auto mb-3" />
        <p className="text-xs font-black text-rose-600">Generation Error</p>
        <p className="text-[10px] text-rose-500 mt-1">An error occurred during asset generation. Try again.</p>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Review & Approve</p>
      <p className="text-[10px] text-slate-500 mb-5 max-w-xs mx-auto leading-relaxed">
        Review the asset content and preview tabs above, then approve when ready.
      </p>
      <button
        onClick={onApprove}
        className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-lg hover:bg-emerald-100 transition-all"
      >
        <ThumbsUp className="w-3 h-3" />
        Approve Asset
      </button>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────────

interface AssetWorkspaceProps {
  asset: AssetRecord | null;
  onGenerate: () => void;
  onApprove: () => void;
  onHandoff: () => void;
  generating: boolean;
}

const AssetWorkspace: React.FC<AssetWorkspaceProps> = ({
  asset, onGenerate, onApprove, onHandoff, generating,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('content');

  if (!asset) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-10 text-center h-full flex flex-col items-center justify-center min-h-[600px]">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Asset Workspace</p>
        <p className="text-[10px] text-slate-400 mt-2 max-w-xs leading-relaxed">
          Select an asset from the left panel to view and manage it here.
        </p>
      </div>
    );
  }

  const s = STATUS_META[asset.status];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Asset header */}
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${s.color}`}>
                {s.label}
              </span>
              <span className="text-[8px] text-slate-400">ID: {asset.id}</span>
            </div>
            <h2 className="text-sm font-black text-[#03234b] truncate">{asset.title}</h2>
            {asset.owner && (
              <p className="text-[9px] text-slate-400 mt-0.5">Owner: {asset.owner}</p>
            )}
          </div>
          {/* Generate button for planning assets */}
          {asset.status === 'planning' && !generating && (
            <button
              onClick={onGenerate}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white bg-[#03234b] px-3 py-2 rounded-lg hover:bg-[#0a3d7a] transition-all shadow-sm flex-shrink-0"
            >
              <Loader2 className="w-3 h-3" />
              Generate
            </button>
          )}
          {generating && (
            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-amber-600 flex-shrink-0">
              <Loader2 className="w-3 h-3 animate-spin" />
              Generating…
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[9px] font-black uppercase tracking-widest border-b-2 transition-all ${
                isActive
                  ? 'text-[#3cb4e6] border-[#3cb4e6]'
                  : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              <Icon className="w-3 h-3" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="px-5 py-4 min-h-[300px]">
        {activeTab === 'content' && (
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Content</p>
            {asset.contentPreview ? (
              <pre className="text-[10px] text-slate-700 font-sans whitespace-pre-wrap leading-relaxed bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                {asset.contentPreview}
              </pre>
            ) : (
              <p className="text-[10px] text-slate-400 italic">No content preview available.</p>
            )}
          </div>
        )}

        {activeTab === 'preview' && (
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Preview</p>
            {asset.contentPreview ? (
              <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-prose shadow-sm">
                <div className="prose prose-xs text-slate-700 whitespace-pre-wrap text-xs leading-relaxed [&_h1]:text-base [&_h1]:font-black [&_h1]:text-[#03234b] [&_h1]:mb-3 [&_h2]:text-sm [&_h2]:font-black [&_h2]:text-[#03234b] [&_h2]:mb-2 [&_strong]:text-[#03234b] [&_table]:w-full [&_th]:text-left [&_th]:text-[10px] [&_th]:font-black [&_th]:text-slate-500 [&_th]:pb-1 [&_td]:text-[10px] [&_td]:text-slate-700 [&_td]:py-0.5">
                  {asset.contentPreview}
                </div>
              </div>
            ) : (
              <p className="text-[10px] text-slate-400 italic">No preview available.</p>
            )}
          </div>
        )}

        {activeTab === 'versions' && (
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Version History</p>
            <VersionTimeline versions={asset.versions} />
          </div>
        )}

        {activeTab === 'approval' && (
          <ApprovalSection status={asset.status} onApprove={onApprove} onHandoff={onHandoff} />
        )}
      </div>
    </div>
  );
};

export default AssetWorkspace;
