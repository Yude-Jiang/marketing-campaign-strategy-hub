/**
 * src/pages/v2/SignalRadarPage.tsx
 * T10: Signal Radar — three-column layout: filters / feed / detail.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Radio } from 'lucide-react';
import { MOCK_SIGNALS } from '../../mock/signals';
import SignalFilterPanel, {
  type SignalFilters,
  DEFAULT_FILTERS,
} from '../../components/v2/SignalFilterPanel';
import SignalFeedList from '../../components/v2/SignalFeedList';
import SignalDetailPanel from '../../components/v2/SignalDetailPanel';

// ─── Filter helpers ────────────────────────────────────────────────────────────

const matchesText = (value: string | undefined, query: string): boolean =>
  !query || (value ?? '').toLowerCase().includes(query.toLowerCase());

const filterSignals = (signals: typeof MOCK_SIGNALS, filters: SignalFilters) =>
  signals.filter(s => {
    if (filters.types.length > 0 && !filters.types.includes(s.type)) return false;
    if (filters.severities.length > 0 && !filters.severities.includes(s.severity)) return false;
    if (!matchesText(s.entity, filters.entity)) return false;
    if (!matchesText(s.channel, filters.channel)) return false;
    if (!matchesText(s.audience, filters.audience)) return false;
    if (filters.dateFrom && s.createdAt < filters.dateFrom) return false;
    if (filters.dateTo) {
      // Include the full day: compare against start of next day
      const end = new Date(filters.dateTo);
      end.setDate(end.getDate() + 1);
      if (new Date(s.createdAt) > end) return false;
    }
    return true;
  });

// ─── Page Component ────────────────────────────────────────────────────────────

const SignalRadarPage: React.FC = () => {
  const navigate = useNavigate();

  // ── Local state ────────────────────────────────────────────────────
  const [filters, setFilters] = useState<SignalFilters>(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ── Derived ────────────────────────────────────────────────────────
  const filtered = useMemo(() => filterSignals(MOCK_SIGNALS, filters), [filters]);
  const selectedSignal = useMemo(
    () => (selectedId ? MOCK_SIGNALS.find(s => s.id === selectedId) ?? null : null),
    [selectedId],
  );

  const handleSelect = (id: string | null) => setSelectedId(id);

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
          Signal Radar
        </span>
      </div>

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5">
        <Radio className="w-4 h-4 text-[#3cb4e6]" />
        <h1 className="text-sm font-black text-[#03234b] uppercase tracking-widest">
          Signal Radar
        </h1>
        <span className="text-[8px] text-slate-400 ml-1">
          {MOCK_SIGNALS.length} signals monitored
        </span>
      </div>

      {/* ── Three-column layout ──────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Left: Filters (3 cols) */}
        <div className="col-span-3">
          <SignalFilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={() => {
              setFilters(DEFAULT_FILTERS);
              setSelectedId(null);
            }}
          />
        </div>

        {/* Center: Feed (6 cols) */}
        <div className="col-span-6">
          <SignalFeedList
            signals={filtered}
            selectedId={selectedId}
            onSelect={handleSelect}
            totalCount={MOCK_SIGNALS.length}
          />
        </div>

        {/* Right: Detail (3 cols) */}
        <div className="col-span-3">
          <SignalDetailPanel
            signal={selectedSignal}
            onClose={() => setSelectedId(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default SignalRadarPage;
