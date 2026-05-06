/**
 * src/pages/v2/OptimizationCenterPage.tsx
 * T13: Optimization Center — recommendation queue and detail panel.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { MOCK_RECOMMENDATIONS } from '../../mock/optimization';
import type {
  OptimizationRecommendation,
  RecommendationStatus,
} from '../../types/optimization';
import RecommendationQueue from '../../components/v2/RecommendationQueue';
import RecommendationDetail from '../../components/v2/RecommendationDetail';

const OptimizationCenterPage: React.FC = () => {
  const navigate = useNavigate();

  // ── Local state ──────────────────────────────────────────────────────
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>(
    () => MOCK_RECOMMENDATIONS,
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ── Derived ─────────────────────────────────────────────────────────
  const selectedRec = useMemo(
    () => (selectedId ? recommendations.find(r => r.id === selectedId) ?? null : null),
    [selectedId, recommendations],
  );

  // ── Handlers ─────────────────────────────────────────────────────────
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleStatusChange = useCallback((id: string, newStatus: RecommendationStatus) => {
    setRecommendations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: newStatus } : r)),
    );
    // Keep selected ID pointing to the same recommendation
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
          Optimization Center
        </span>
      </div>

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-4 h-4 text-[#3cb4e6]" />
        <h1 className="text-sm font-black text-[#03234b] uppercase tracking-widest">
          Optimization Center
        </h1>
        <span className="text-[8px] text-slate-400 ml-1">
          {recommendations.length} recommendations
        </span>
      </div>

      {/* ── Two-column layout ────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Left 4 cols: Queue */}
        <div className="col-span-4">
          <RecommendationQueue
            recommendations={recommendations}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>

        {/* Right 8 cols: Detail */}
        <div className="col-span-8">
          <RecommendationDetail
            recommendation={selectedRec}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OptimizationCenterPage;
