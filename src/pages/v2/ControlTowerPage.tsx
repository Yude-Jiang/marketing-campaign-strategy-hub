/**
 * src/pages/v2/ControlTowerPage.tsx
 * T09: Control Tower — V2 campaign intelligence dashboard.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  RefreshCw,
  Building2,
  Activity,
  Radio,
  BarChart3,
  FileText,
  Clock,
} from 'lucide-react';
import { MOCK_CAMPAIGNS } from '../../mock/campaigns';
import { MOCK_INTEL_SNAPSHOT } from '../../mock/intelSnapshot';
import type { CampaignIntelSnapshot } from '../../types/intel';
import HealthScoreCard from '../../components/v2/HealthScoreCard';
import KpiTile from '../../components/v2/KpiTile';
import OpportunityList from '../../components/v2/OpportunityList';
import RecommendedActionList from '../../components/v2/RecommendedActionList';

// ─── Empty state ─────────────────────────────────────────────────────────────────

const EmptyState: React.FC<{ onGoCampaigns: () => void }> = ({ onGoCampaigns }) => (
  <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center min-h-[500px]">
    <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-5">
      <Building2 className="w-6 h-6 text-slate-300" />
    </div>
    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
      No Campaign Selected
    </p>
    <p className="text-[11px] text-slate-400 max-w-md leading-relaxed mb-8">
      Select a campaign to view its intelligence snapshot — health score,
      KPIs, opportunities, risks, and recommended actions.
    </p>
    <button
      onClick={onGoCampaigns}
      className="bg-[#03234b] text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-[#0a3d7a] transition-all"
    >
      Browse Campaigns
    </button>
  </div>
);

// ─── Page Component ──────────────────────────────────────────────────────────────

const ControlTowerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaign') || 'camp-001';

  // ── Look up campaign info ──────────────────────────────────────────
  const campaign = MOCK_CAMPAIGNS.find(c => c.id === campaignId) ?? null;

  // ── Snapshot state ──────────────────────────────────────────────────
  const [snapshot, setSnapshot] = useState<CampaignIntelSnapshot>(MOCK_INTEL_SNAPSHOT);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString());

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    // Mock: re-load same data with updated timestamp
    setSnapshot({ ...MOCK_INTEL_SNAPSHOT });
    setLastRefreshed(new Date().toLocaleTimeString());
    setRefreshing(false);
  }, []);

  const handleNavigate = useCallback((target: string) => {
    navigate(target);
  }, [navigate]);

  // ── Guard: no campaign → empty state ────────────────────────────────
  if (!campaign) {
    return (
      <div className="min-h-full">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/v1/dashboard')} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#03234b] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Dashboard
          </button>
          <span className="text-slate-200 text-[10px]">/</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">Control Tower</span>
        </div>
        <EmptyState onGoCampaigns={() => navigate('/campaigns')} />
      </div>
    );
  }

  const { health, kpis, opportunities, risks, recommendedActions, weeklySummary, recentSignals } = snapshot;

  return (
    <div className="min-h-full">
      {/* ── Back nav ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/v1/dashboard')} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#03234b] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Dashboard
        </button>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Campaigns</span>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">Control Tower</span>
      </div>

      {/* ── Campaign Context Strip ───────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#03234b]/5 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#03234b]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-[#03234b]">{campaign.name}</h2>
                <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${
                  campaign.status === 'live' ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : campaign.status === 'monitoring' ? 'text-amber-700 bg-amber-50 border-amber-200'
                      : campaign.status === 'optimizing' ? 'text-indigo-700 bg-indigo-50 border-indigo-200'
                        : 'text-slate-500 bg-slate-100 border-slate-200'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5">
                Owner: {campaign.owner} · Brief: {campaign.linkedBriefId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[8px] text-slate-400">
              <Clock className="w-3 h-3 inline mr-1" />
              {lastRefreshed}
            </span>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-[#3cb4e6] hover:text-[#0a3d7a] transition-all disabled:opacity-30"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ── Health + KPIs ────────────────────────────────────────── */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {/* Health Score Hero */}
        <div className="col-span-2">
          <HealthScoreCard score={health.score} trend={health.trend} />
        </div>
        {/* KPI Tiles */}
        <div className="col-span-4 grid grid-cols-3 gap-3">
          {kpis.map((kpi, i) => (
            <KpiTile key={i} label={kpi.label} value={kpi.value} delta={kpi.delta} />
          ))}
        </div>
      </div>

      {/* ── Opportunities + Risks ────────────────────────────────── */}
      <div className="mb-6">
        <OpportunityList opportunities={opportunities} risks={risks} />
      </div>

      {/* ── Recommended Actions ──────────────────────────────────── */}
      <div className="mb-6">
        <RecommendedActionList actions={recommendedActions} onNavigate={handleNavigate} />
      </div>

      {/* ── Weekly Summary + Recent Signals ──────────────────────── */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Weekly Summary */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#3cb4e6]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                Weekly Summary
              </span>
            </div>
          </div>
          <div className="px-4 py-3">
            {weeklySummary.length === 0 ? (
              <p className="text-[10px] text-slate-400 text-center py-4">No summary available.</p>
            ) : (
              <ul className="space-y-2">
                {weeklySummary.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] leading-relaxed">
                    <span className="text-[#3cb4e6] mt-0.5 flex-shrink-0">•</span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Signals Feed */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#3cb4e6]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                Recent Signals
              </span>
            </div>
          </div>
          <div className="px-4 py-3">
            {recentSignals.length === 0 ? (
              <p className="text-[10px] text-slate-400 text-center py-4">No recent signals.</p>
            ) : (
              <div className="space-y-3">
                {recentSignals.map((sig, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3cb4e6] mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-700 leading-relaxed">{sig.title}</p>
                      <p className="text-[8px] text-slate-400 mt-0.5">{sig.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Action buttons ───────────────────────────────────────── */}
      <div className="flex items-center gap-3 pt-1 pb-8">
        <button
          onClick={() => navigate('/optimization')}
          className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white bg-[#03234b] px-4 py-3 rounded-xl hover:bg-[#0a3d7a] transition-all shadow-sm"
        >
          <Activity className="w-3.5 h-3.5" />
          Open Optimization Center
        </button>
        <button
          onClick={() => navigate('/signal-radar')}
          className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all"
        >
          <Radio className="w-3.5 h-3.5" />
          View Full Signals
        </button>
        <button
          onClick={() => navigate('/reports')}
          className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500 border border-slate-200 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          View Report
        </button>
      </div>
    </div>
  );
};

export default ControlTowerPage;
