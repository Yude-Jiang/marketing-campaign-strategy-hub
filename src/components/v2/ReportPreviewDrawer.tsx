/**
 * src/components/v2/ReportPreviewDrawer.tsx
 * T15: Reports — right-side report preview panel with export placeholders.
 */

import React from 'react';
import {
  FileText,
  X,
  Loader2,
  AlertCircle,
  Download,
  Share2,
  Calendar,
  User,
  Building2,
  Tag,
} from 'lucide-react';
import type { ReportRecord, ReportType, ReportStatus } from '../../types/report';
import { MOCK_CAMPAIGNS } from '../../mock/campaigns';

// ─── Status meta ────────────────────────────────────────────────────────────────

const STATUS_META: Record<ReportStatus, { label: string; icon: React.ElementType; color: string }> = {
  ready:      { label: 'Ready',      icon: FileText,   color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  generating: { label: 'Generating', icon: Loader2,    color: 'text-blue-600 bg-blue-50 border-blue-200' },
  failed:     { label: 'Failed',     icon: AlertCircle, color: 'text-rose-600 bg-rose-50 border-rose-200' },
};

const TYPE_LABEL: Record<ReportType, string> = {
  weekly:  'Weekly',
  monthly: 'Monthly',
  ad_hoc:  'Ad-hoc',
};

// ─── Format date ────────────────────────────────────────────────────────────────

const formatFullDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ─── Props ──────────────────────────────────────────────────────────────────────

interface ReportPreviewDrawerProps {
  report: ReportRecord | null;
  onClose: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────────

const ReportPreviewDrawer: React.FC<ReportPreviewDrawerProps> = ({ report, onClose }) => {
  if (!report) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-10 text-center flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-5 h-5 text-slate-300" />
        </div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
          No Report Selected
        </p>
        <p className="text-[9px] text-slate-400 max-w-[220px] leading-relaxed">
          Select a report from the list to preview its contents and export options.
        </p>
      </div>
    );
  }

  const sMeta = STATUS_META[report.status];
  const StatusIcon = sMeta.icon;
  const campaign = MOCK_CAMPAIGNS.find(c => c.id === report.campaignId);
  const isFailed = report.status === 'failed';
  const isGenerating = report.status === 'generating';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#3cb4e6]" />
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
            Preview
          </span>
        </div>
        <button onClick={onClose} className="text-slate-300 hover:text-slate-500">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Title + badges */}
        <div>
          <div className="flex items-center gap-1.5 flex-wrap mb-2">
            <span className={`inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${sMeta.color}`}>
              <StatusIcon className={`w-2.5 h-2.5 ${report.status === 'generating' ? 'animate-spin' : ''}`} />
              {sMeta.label}
            </span>
            <span className="text-[8px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
              {TYPE_LABEL[report.type]}
            </span>
          </div>
          <h3 className="text-sm font-black text-[#03234b] leading-relaxed">{report.title}</h3>
        </div>

        {/* Meta fields */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-[8px] text-slate-500">Campaign:</span>
            <span className="text-[8px] font-medium text-slate-700">
              {campaign?.name ?? report.campaignId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-[8px] text-slate-500">Generated:</span>
            <span className="text-[8px] font-medium text-slate-700">{formatFullDate(report.generatedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-[8px] text-slate-500">Owner:</span>
            <span className="text-[8px] font-medium text-slate-700">{report.owner}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-[8px] text-slate-500">Report ID:</span>
            <span className="text-[8px] font-medium text-slate-700">{report.id}</span>
          </div>
        </div>

        {/* Status-specific messages */}
        {isGenerating && (
          <div className="flex items-center gap-2 text-[10px] text-blue-700 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Report is being generated. This may take a few minutes.</span>
          </div>
        )}
        {isFailed && (
          <div className="flex items-center gap-2 text-[10px] text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2.5">
            <AlertCircle className="w-3 h-3" />
            <span>Report generation failed. Please try again or contact support.</span>
          </div>
        )}

        {/* Preview content placeholder */}
        <div className="border-t border-slate-100 pt-3">
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Preview
          </p>
          <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 min-h-[160px] flex items-center justify-center">
            <p className="text-[10px] text-slate-400 text-center italic">
              {isFailed
                ? 'Preview unavailable — report generation failed.'
                : isGenerating
                  ? 'Preview will appear once generation completes.'
                  : 'Full report preview rendering is not available in this demo. Export the report to view its complete contents.'
              }
            </p>
          </div>
        </div>

        {/* Export Actions (placeholders) */}
        <div className="border-t border-slate-100 pt-3">
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Export &amp; Share
          </p>
          <div className="flex flex-col gap-1.5">
            <button
              disabled={!isFailed && !isGenerating ? false : true}
              onClick={() => alert('Export PDF — placeholder. Real PDF export not implemented.')}
              className={`flex items-center justify-center gap-1.5 text-[8px] font-black uppercase tracking-wider w-full px-3 py-2.5 rounded-lg border transition-all ${
                !isFailed && !isGenerating
                  ? 'text-slate-500 border-slate-200 hover:bg-slate-50'
                  : 'text-slate-300 border-slate-100 cursor-not-allowed'
              }`}
            >
              <Download className="w-3 h-3" />
              Export PDF
            </button>
            <button
              disabled={!isFailed && !isGenerating ? false : true}
              onClick={() => alert('Share Link — placeholder. Real sharing not implemented.')}
              className={`flex items-center justify-center gap-1.5 text-[8px] font-black uppercase tracking-wider w-full px-3 py-2.5 rounded-lg border transition-all ${
                !isFailed && !isGenerating
                  ? 'text-slate-500 border-slate-200 hover:bg-slate-50'
                  : 'text-slate-300 border-slate-100 cursor-not-allowed'
              }`}
            >
              <Share2 className="w-3 h-3" />
              Share Link
            </button>
          </div>
          <p className="text-[7px] text-slate-400 text-center mt-2 italic">
            Export and sharing are placeholder actions in this demo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportPreviewDrawer;
