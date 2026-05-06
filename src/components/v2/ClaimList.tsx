/**
 * src/components/v2/ClaimList.tsx
 * T11: Competitive War Room — key claims list for a selected competitor.
 */

import React from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';
import type { ClaimItem } from '../../types/competitor';

interface ClaimListProps {
  claims: ClaimItem[];
}

const formatDate = (iso?: string): string => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ClaimList: React.FC<ClaimListProps> = ({ claims }) => {
  if (claims.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
        <MessageSquare className="w-5 h-5 text-slate-300 mx-auto mb-2" />
        <p className="text-[10px] text-slate-400">No claims tracked.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-1.5">
        <MessageSquare className="w-3.5 h-3.5 text-[#3cb4e6]" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
          Key Claims
        </span>
        <span className="text-[8px] text-slate-400 ml-auto">{claims.length} claims</span>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-50">
        {claims.map((claim, i) => (
          <div key={i} className="px-4 py-3 hover:bg-slate-50/50 transition-colors">
            <p className="text-[10px] text-slate-700 leading-relaxed">{claim.text}</p>
            <div className="flex items-center gap-2 mt-1.5">
              {claim.source && (
                <span className="text-[8px] text-slate-400 flex items-center gap-0.5">
                  <ExternalLink className="w-2.5 h-2.5" />
                  {claim.source}
                </span>
              )}
              {claim.first_seen_at && (
                <span className="text-[8px] text-slate-400">
                  First seen: {formatDate(claim.first_seen_at)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimList;
