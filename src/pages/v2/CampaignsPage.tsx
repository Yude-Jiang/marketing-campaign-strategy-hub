/**
 * src/pages/v2/CampaignsPage.tsx
 * T08: Campaigns list (V2 entry) — tabs, filterable grid, detail drawer.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Plus,
  Search,
  Activity,
  Radio,
  TrendingUp,
  Archive,
  FileText,
  X,
  ExternalLink,
  Clock,
  User,
  BarChart3,
  Hash,
} from 'lucide-react';
import type { CampaignLifecycleStatus } from '../../types/campaign';
import { MOCK_CAMPAIGNS } from '../../mock/campaigns';
import CampaignCard from '../../components/v2/CampaignCard';

// ─── Tab config ──────────────────────────────────────────────────────────────────

interface TabDef {
  key: CampaignLifecycleStatus | 'all';
  label: string;
  icon: React.ElementType;
}

const TABS: TabDef[] = [
  { key: 'all',        label: 'All',         icon: Layers },
  { key: 'live',       label: 'Live',        icon: Activity },
  { key: 'monitoring', label: 'Monitoring',  icon: Radio },
  { key: 'optimizing', label: 'Optimizing',  icon: TrendingUp },
  { key: 'archived',   label: 'Archived',    icon: Archive },
  { key: 'draft',      label: 'Draft',       icon: FileText },
];

// ─── Relative time helper ────────────────────────────────────────────────────────

const formatRelativeTime = (iso: string): string => {
  if (!iso) return 'Never';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
};

// ─── Page Component ──────────────────────────────────────────────────────────────

const CampaignsPage: React.FC = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [activeTab, setActiveTab] = useState<CampaignLifecycleStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [drawerCampaign, setDrawerCampaign] = useState<string | null>(null);

  // ── Filtered list ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = campaigns;
    if (activeTab !== 'all') {
      list = list.filter(c => c.status === activeTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }
    return list;
  }, [campaigns, activeTab, search]);

  // ── Handlers ───────────────────────────────────────────────────────
  const handleArchive = useCallback((id: string) => {
    setCampaigns(prev =>
      prev.map(c => c.id === id ? { ...c, status: 'archived' as const } : c)
    );
  }, []);

  const handleOpenControlTower = useCallback((id: string) => {
    navigate(`/control-tower?campaign=${id}`);
  }, [navigate]);

  const handleCreate = useCallback(() => {
    // Placeholder — will open a creation flow in future
    alert('Create Campaign — this will open a new campaign creation flow.');
  }, []);

  // ── Drawer campaign ────────────────────────────────────────────────
  const drawerData = drawerCampaign
    ? campaigns.find(c => c.id === drawerCampaign)
    : null;

  // ── Counts for tabs ────────────────────────────────────────────────
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set('all', campaigns.length);
    for (const c of campaigns) {
      map.set(c.status, (map.get(c.status) || 0) + 1);
    }
    return map;
  }, [campaigns]);

  return (
    <div className="min-h-full">
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#03234b] tracking-tight">Campaigns</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Monitor and manage all live, monitoring, and optimizing campaigns.
            Each campaign is linked to a brief and tracked via signal health scores.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white bg-[#03234b] px-4 py-3 rounded-xl hover:bg-[#0a3d7a] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>

      {/* ── Search + Tabs ─────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search campaigns…"
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 outline-none focus:border-[#3cb4e6] focus:ring-4 focus:ring-[#3cb4e6]/10 transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-50 rounded-xl p-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            const count = counts.get(tab.key) ?? 0;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  isActive
                    ? 'bg-white text-[#03234b] shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className="w-3 h-3" />
                {tab.label}
                <span className={`text-[8px] ml-0.5 ${isActive ? 'text-slate-400' : 'text-slate-300'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Campaign grid ────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-3 gap-5">
          {filtered.map(c => (
            <div key={c.id} onClick={() => setDrawerCampaign(c.id)} className="cursor-pointer">
              <CampaignCard
                campaign={c}
                onArchive={handleArchive}
                onOpenControlTower={handleOpenControlTower}
              />
            </div>
          ))}
        </div>
      ) : (
        /* ── Empty / No match state ─────────────────────────────── */
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-16 text-center">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            {search ? (
              <Search className="w-5 h-5 text-slate-300" />
            ) : (
              <Layers className="w-5 h-5 text-slate-300" />
            )}
          </div>
          {search ? (
            <>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">No Matches</p>
              <p className="text-[10px] text-slate-400">
                No campaigns match "<strong className="text-slate-500">{search}</strong>". Try a different search term.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">
                No {activeTab === 'all' ? '' : activeTab} campaigns
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                {activeTab === 'all'
                  ? 'Create your first campaign to get started.'
                  : `No campaigns with "${activeTab}" status.`}
              </p>
            </>
          )}
        </div>
      )}

      {/* ── Detail Drawer ────────────────────────────────────────── */}
      {drawerCampaign && drawerData && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setDrawerCampaign(null)}
          />

          {/* Drawer panel */}
          <div className="relative w-[480px] bg-white border-l border-slate-200 shadow-2xl h-full overflow-y-auto animate-slide-in-right">
            {/* Drawer header */}
            <div className="px-6 py-5 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${
                  drawerData.status === 'live' ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : drawerData.status === 'monitoring' ? 'text-amber-700 bg-amber-50 border-amber-200'
                      : drawerData.status === 'optimizing' ? 'text-indigo-700 bg-indigo-50 border-indigo-200'
                        : drawerData.status === 'archived' ? 'text-slate-500 bg-slate-100 border-slate-200'
                          : 'text-slate-500 bg-slate-100 border-slate-200'
                }`}>
                  {drawerData.status.charAt(0).toUpperCase() + drawerData.status.slice(1)}
                </span>
                <button onClick={() => setDrawerCampaign(null)} className="text-slate-300 hover:text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-base font-black text-[#03234b]">{drawerData.name}</h2>
            </div>

            {/* Drawer body */}
            <div className="px-6 py-5 space-y-5">
              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-4">
                <MetaItem icon={Hash} label="Campaign ID" value={drawerData.id} />
                <MetaItem icon={User} label="Owner" value={drawerData.owner} />
                <MetaItem icon={FileText} label="Linked Brief" value={drawerData.linkedBriefId} />
                <MetaItem icon={Clock} label="Last Signal" value={drawerData.lastSignalAt ? formatRelativeTime(drawerData.lastSignalAt) : 'No signals'} />
              </div>

              {/* Health score */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Health Score</p>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4 text-slate-400" />
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        drawerData.healthScore >= 80 ? 'bg-emerald-500'
                          : drawerData.healthScore >= 50 ? 'bg-amber-500'
                            : drawerData.healthScore > 0 ? 'bg-rose-500'
                              : 'bg-slate-200'
                      }`}
                      style={{ width: `${Math.max(drawerData.healthScore, 4)}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-slate-600 min-w-[32px] text-right">
                    {drawerData.healthScore || '—'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => { setDrawerCampaign(null); handleOpenControlTower(drawerData.id); }}
                  className="w-full flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-white bg-[#03234b] px-4 py-3 rounded-xl hover:bg-[#0a3d7a] transition-all shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in Control Tower
                </button>
                {drawerData.status !== 'archived' && (
                  <button
                    onClick={() => { handleArchive(drawerData.id); setDrawerCampaign(null); }}
                    className="w-full flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    Archive Campaign
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Meta item helper ────────────────────────────────────────────────────────────

const MetaItem: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({
  icon: Icon, label, value,
}) => (
  <div className="flex items-start gap-2">
    <Icon className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-[10px] font-medium text-slate-700 break-all">{value}</p>
    </div>
  </div>
);

export default CampaignsPage;
