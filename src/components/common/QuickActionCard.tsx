import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { DashboardQuickAction } from '../../types/dashboard';

interface QuickActionCardProps {
  action: DashboardQuickAction;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ action }) => {
  const navigate = useNavigate();
  const Icon = action.icon;

  return (
    <button
      onClick={() => navigate(action.path)}
      className="flex items-start gap-4 bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-[#3cb4e6]/30 hover:shadow-md hover:bg-[#f0f9ff] transition-all text-left group flex-1 min-w-0"
    >
      <div className="p-2.5 rounded-lg bg-[#03234b] group-hover:bg-[#0a3d7a] transition-colors flex-shrink-0 shadow-sm">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-black text-[#03234b] group-hover:text-[#0a3d7a] transition-colors truncate">
          {action.label}
        </p>
        <p className="text-[10px] text-slate-500 font-medium mt-0.5 leading-snug">
          {action.description}
        </p>
      </div>
    </button>
  );
};

export default QuickActionCard;
