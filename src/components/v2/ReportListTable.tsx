/**
 * src/components/v2/ReportListTable.tsx
 * T15: Reports — filterable report list table with type tabs.
 */

import React from 'react';
import { FileText, Loader2, AlertCircle } from 'lucide-react';
import type { ReportRecord, ReportType, ReportStatus } from '../../types/report';

// ─── Status meta ────────────────────────────────────────────────────────────────

const STATUS_META: Record<ReportStatus, { label: string; icon: React.ElementType; color: string }> = {
  ready:      { label: 'Ready',      icon: FileText, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  generating: { label: 'Generating', icon: Loader2,  color: 'text-blue-600 bg-blue-50 border-blue-200' },
  failed:     { label: 'Failed',     icon: AlertCircle, color: 'text-rose-600 bg-rose-50 border-rose-200' },
};

const TYPE_LABEL: Record<ReportType, string> = {
  weekly:  'Weekly',
  monthly: 'Monthly',
  ad_hoc:  'Ad-hoc',
};

// ─── Format date ────────────────────────────────────────────────────────────────

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ─── Props ──────────────────────────────────────────────────────────────────────

interface ReportListTableProps {
  reports: ReportRecord[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  activeTab: ReportType | 'all';
  onTabChange: (tab: ReportType | 'all') => void;
}

const TABS: { key: ReportType | 'all'; label: string }[] = [
  { key: 'all',     label: 'All' },
  { key: 'weekly',  label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
  { key: 'ad_hoc',  label: 'Ad-hoc' },
];

// ─── Component ──────────────────────────────────────────────────────────────────

const ReportListTable: React.FC<ReportListTableProps> = ({
  reports,
  selectedId,
  onSelect,
  activeTab,
  onTabChange,
}) => {
  const filtered = activeTab === 'all'
    ? reports
    : reports.filter(r => r.type === activeTab);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header + Tabs */}
      <div className="border-b border-slate-100">
        <div className="px-4 py-2.5 bg-slate-50/50 flex items-center gap-1.5 border-b border-slate-100">
          <FileText className="w-3.5 h-3.5 text-[#3cb4e6]" />
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
            Reports
          </span>
          <span className="text-[8px] text-slate-400 ml-auto">
            {filtered.length} of {reports.length}
          </span>
        </div>
        {/* Tabs */}
        <div className="flex px-4 pt-2 gap-1">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`text-[9px] font-bold px-3 py-1.5 rounded-t-lg border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'text-[#0a3d7a] border-b-[#3cb4e6] bg-[#3cb4e6]/5'
                  : 'text-slate-400 border-b-transparent hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="p-10 text-center">
          <FileText className="w-5 h-5 text-slate-300 mx-auto mb-2" />
          <p className="text-[10px] text-slate-400">No reports match this filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[9px]">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="text-left px-4 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Title</th>
                <th className="text-left px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Type</th>
                <th className="text-left px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Campaign</th>
                <th className="text-left px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Generated</th>
                <th className="text-left px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Owner</th>
                <th className="text-left px-3 py-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => {
                const sMeta = STATUS_META[r.status];
                const StatusIcon = sMeta.icon;
                const isSelected = r.id === selectedId;
                return (
                  <tr
                    key={r.id}
                    onClick={() => onSelect(r.id)}
                    className={`cursor-pointer border-b border-slate-50 transition-all ${
                      isSelected
                        ? 'bg-[#3cb4e6]/5'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className={`px-4 py-3 font-bold ${isSelected ? 'text-[#0a3d7a]' : 'text-slate-800'}`}>
                      <span className="text-[10px]">{r.title}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-[8px] text-slate-500 uppercase tracking-wider">
                        {TYPE_LABEL[r.type]}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-[8px] text-slate-500">{r.campaignId}</span>
                    </td>
                    <td className="px-3 py-3 text-[8px] text-slate-500">
                      {formatDate(r.generatedAt)}
                    </td>
                    <td className="px-3 py-3 text-[8px] text-slate-500">
                      {r.owner}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1 text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${sMeta.color}`}>
                        <StatusIcon className={`w-2.5 h-2.5 ${r.status === 'generating' ? 'animate-spin' : ''}`} />
                        {sMeta.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportListTable;
