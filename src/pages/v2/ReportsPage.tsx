/**
 * src/pages/v2/ReportsPage.tsx
 * T15: Reports — report list with tabs, preview drawer, and export placeholders.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Plus } from 'lucide-react';
import { MOCK_REPORTS } from '../../mock/reports';
import type { ReportType } from '../../types/report';
import ReportListTable from '../../components/v2/ReportListTable';
import ReportPreviewDrawer from '../../components/v2/ReportPreviewDrawer';

// ─── Page component ─────────────────────────────────────────────────────────────

const ReportsPage: React.FC = () => {
  const navigate = useNavigate();

  // ── Local state ──────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<ReportType | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ── Derived ─────────────────────────────────────────────────────────
  const selectedReport = useMemo(
    () => (selectedId ? MOCK_REPORTS.find(r => r.id === selectedId) ?? null : null),
    [selectedId],
  );

  // ── Handlers ─────────────────────────────────────────────────────────
  const handleSelect = useCallback((id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  }, []);

  const handleNewReport = useCallback(() => {
    alert('New Report — placeholder. Report creation wizard not implemented in this demo.');
  }, []);

  return (
    <div className="min-h-full">
      {/* ── Back nav ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#03234b] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Dashboard
        </button>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">
          Reports
        </span>
      </div>

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#3cb4e6]" />
          <h1 className="text-sm font-black text-[#03234b] uppercase tracking-widest">
            Reports
          </h1>
          <span className="text-[8px] text-slate-400 ml-1">
            {MOCK_REPORTS.length} reports
          </span>
        </div>
        <button
          onClick={handleNewReport}
          className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white bg-[#03234b] px-3 py-2 rounded-xl hover:bg-[#0a3d7a] transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          New Report
        </button>
      </div>

      {/* ── Two-column layout ────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Left 7 cols: Table */}
        <div className="col-span-7">
          <ReportListTable
            reports={MOCK_REPORTS}
            selectedId={selectedId}
            onSelect={handleSelect}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Right 5 cols: Preview drawer */}
        <div className="col-span-5">
          <ReportPreviewDrawer
            report={selectedReport}
            onClose={() => setSelectedId(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
