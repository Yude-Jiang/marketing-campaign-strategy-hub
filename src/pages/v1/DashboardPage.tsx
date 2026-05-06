import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlayCircle,
  Target,
  Globe,
  Clock,
  AlertCircle,
  RefreshCw,
  Layers,
} from 'lucide-react';

import type { RecentBriefSummary, RecentCampaignSummary, ActivityLogItem } from '../../types/dashboard';
import type { DashboardQuickAction } from '../../types/dashboard';
import { MOCK_QUICK_ACTIONS, MOCK_BRIEFS, MOCK_CAMPAIGNS, MOCK_ACTIVITIES } from '../../mock/dashboard';
import StatCard from '../../components/common/StatCard';
import QuickActionCard from '../../components/common/QuickActionCard';
import ActivityList from '../../components/common/ActivityList';

// ─── Loading Skeleton ──────────────────────────────────────────────────────────

const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-slate-100 rounded animate-pulse ${className}`} />
);

const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Quick actions skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <SkeletonBlock key={i} className="h-24 rounded-xl" />
      ))}
    </div>
    {/* 3-column skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <SkeletonBlock key={i} className="h-64 rounded-xl" />
      ))}
    </div>
    {/* Bottom skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2].map(i => (
        <SkeletonBlock key={i} className="h-28 rounded-xl" />
      ))}
    </div>
  </div>
);

// ─── Status Badge ───────────────────────────────────────────────────────────────

const BRIEF_STATUS: Record<string, { label: string; cls: string }> = {
  draft:     { label: 'Draft',     cls: 'bg-slate-100 text-slate-500 border-slate-200' },
  in_review: { label: 'In Review', cls: 'bg-amber-50  text-amber-600  border-amber-200' },
  approved:  { label: 'Approved',  cls: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
};

const CAMPAIGN_STATUS: Record<string, { label: string; cls: string }> = {
  draft:     { label: 'Draft',     cls: 'bg-slate-100 text-slate-500' },
  active:    { label: 'Active',    cls: 'bg-emerald-50 text-emerald-600' },
  paused:    { label: 'Paused',    cls: 'bg-amber-50  text-amber-600'  },
  completed: { label: 'Complete',  cls: 'bg-blue-50   text-blue-600'   },
};

// ─── Dashboard ──────────────────────────────────────────────────────────────────

interface DashboardData {
  statBriefs: number;
  statCampaigns: number;
  statActive: number;
  briefs: RecentBriefSummary[];
  campaigns: RecentCampaignSummary[];
  activities: ActivityLogItem[];
  quickActions: DashboardQuickAction[];
}

function loadMockData(): Promise<DashboardData> {
  const activeCount = MOCK_CAMPAIGNS.filter(c => c.status === 'active').length;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        statBriefs: MOCK_BRIEFS.length,
        statCampaigns: MOCK_CAMPAIGNS.length,
        statActive: activeCount,
        briefs: MOCK_BRIEFS,
        campaigns: MOCK_CAMPAIGNS,
        activities: MOCK_ACTIVITIES,
        quickActions: MOCK_QUICK_ACTIONS,
      });
    }, 800);
  });
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    loadMockData()
      .then(setData)
      .catch(e => setError(e?.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  // ── Loading state ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <SkeletonBlock className="h-7 w-48 mb-2" />
          <SkeletonBlock className="h-4 w-72" />
        </div>
        <DashboardSkeleton />
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-lg mx-auto mt-20">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-4" />
          <h3 className="text-base font-black text-rose-800 mb-2 uppercase tracking-widest">Load Failed</h3>
          <p className="text-sm text-rose-600 font-medium mb-6">{error}</p>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-rose-600 text-white px-6 py-3 rounded-xl hover:bg-rose-700 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </div>
    );
  }

  // ── Normal state ───────────────────────────────────────────────────────
  const isEmpty = !data || (data.briefs.length === 0 && data.campaigns.length === 0);
  const d = data!;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#03234b] shadow-sm">
          <LayoutDashboard className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black text-[#03234b] uppercase tracking-tight">Dashboard</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">
            Campaign overview and quick access
          </p>
        </div>
      </div>

      {/* ── Stat Cards Row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Briefs"    value={d.statBriefs}    trend={{ direction: 'up', label: `${d.statBriefs} this month` }} />
        <StatCard label="Total Campaigns" value={d.statCampaigns} trend={{ direction: 'up', label: `${d.statCampaigns} active` }} />
        <StatCard label="Active Now"      value={d.statActive}    trend={{ direction: d.statActive > 0 ? 'up' : 'neutral', label: d.statActive > 0 ? 'In progress' : 'None running' }} />
        <StatCard label="Ecosystems"      value="3"               trend={{ direction: 'neutral', label: 'Global / CN / JP' }} />
      </div>

      {/* ── Quick Actions ──────────────────────────────────────────────── */}
      <div>
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Layers className="w-3 h-3" /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {d.quickActions.map(action => (
            <QuickActionCard key={action.key} action={action} />
          ))}
        </div>
      </div>

      {/* ── 3-column: Briefs / Campaigns / Activity ────────────────────── */}
      {isEmpty ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <Target className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="text-base font-black text-slate-400 mb-2">No Campaigns Yet</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
            Start by creating a Product Intake from your datasheets, then build your first campaign brief.
          </p>
          <button
            onClick={() => navigate('/product-intake')}
            className="inline-flex items-center gap-2 bg-[#03234b] text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#0a3d7a] transition-all"
          >
            <FileText className="w-4 h-4" /> New Product Intake
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Briefs */}
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <FileText className="w-3 h-3" /> Recent Briefs
            </h2>
            <div className="space-y-2">
              {d.briefs.map(brief => {
                const s = BRIEF_STATUS[brief.status] ?? BRIEF_STATUS.draft;
                return (
                  <div key={brief.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:border-[#3cb4e6]/20 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-xs font-bold text-[#03234b] leading-snug line-clamp-2">{brief.title}</p>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border whitespace-nowrap ${s.cls}`}>{s.label}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                      <span>{brief.productArea}</span>
                      <span>·</span>
                      <span>{new Date(brief.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Campaigns */}
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <PlayCircle className="w-3 h-3" /> Recent Campaigns
            </h2>
            <div className="space-y-2">
              {d.campaigns.map(campaign => {
                const s = CAMPAIGN_STATUS[campaign.status] ?? CAMPAIGN_STATUS.draft;
                return (
                  <div key={campaign.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:border-[#3cb4e6]/20 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-xs font-bold text-[#03234b] leading-snug">{campaign.name}</p>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap ${s.cls}`}>{s.label}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#3cb4e6] transition-all duration-700"
                          style={{ width: `${campaign.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{campaign.progress}%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span className="text-[10px] text-slate-400 font-medium uppercase">{campaign.ecosystem}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Recent Activity
            </h2>
            <ActivityList items={d.activities} />
          </div>
        </div>
      )}

      {/* ── System Status + Templates ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3" /> System Status
          </h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <span className="text-xs font-medium text-slate-600">Gemini API</span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Operational</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-xs font-medium text-slate-600">DeepSeek API</span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Operational</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <span className="text-xs font-medium text-slate-600">RAG Indexer</span>
              <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Degraded</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-medium text-slate-600">Export Service</span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Operational</span>
            </div>
          </div>
        </div>

        {/* Templates / Shortcuts */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Layers className="w-3 h-3" /> Templates &amp; Shortcuts
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => navigate('/market-mapping')} className="text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#3cb4e6]/5 border border-slate-100 hover:border-[#3cb4e6]/20 transition-all">
              <p className="text-xs font-bold text-[#03234b]">Market Audit</p>
              <p className="text-[9px] text-slate-400 mt-0.5">AI perception scan</p>
            </button>
            <button onClick={() => navigate('/strategy-studio')} className="text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#3cb4e6]/5 border border-slate-100 hover:border-[#3cb4e6]/20 transition-all">
              <p className="text-xs font-bold text-[#03234b]">Strategy Studio</p>
              <p className="text-[9px] text-slate-400 mt-0.5">Playbook builder</p>
            </button>
            <button onClick={() => navigate('/activation-studio')} className="text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#3cb4e6]/5 border border-slate-100 hover:border-[#3cb4e6]/20 transition-all">
              <p className="text-xs font-bold text-[#03234b]">Activation</p>
              <p className="text-[9px] text-slate-400 mt-0.5">Content production</p>
            </button>
            <button onClick={() => navigate('/legacy')} className="text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-[#3cb4e6]/5 border border-slate-100 hover:border-[#3cb4e6]/20 transition-all">
              <p className="text-xs font-bold text-[#03234b]">GEO Wizard</p>
              <p className="text-[9px] text-slate-400 mt-0.5">Legacy 3-step flow</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
