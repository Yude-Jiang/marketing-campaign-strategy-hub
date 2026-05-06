import React from 'react';
import type { ActivityLogItem } from '../../types/dashboard';
import { Clock, FileText, PlayCircle, PenTool, Target, BarChart3 } from 'lucide-react';

interface ActivityListProps {
  items: ActivityLogItem[];
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  brief_created:     <FileText className="w-3.5 h-3.5" />,
  campaign_launched: <PlayCircle className="w-3.5 h-3.5" />,
  content_generated: <PenTool className="w-3.5 h-3.5" />,
  strategy_updated:  <Target className="w-3.5 h-3.5" />,
  report_exported:   <BarChart3 className="w-3.5 h-3.5" />,
};

const TYPE_COLORS: Record<string, string> = {
  brief_created:     'bg-blue-100 text-blue-600',
  campaign_launched: 'bg-emerald-100 text-emerald-600',
  content_generated: 'bg-amber-100 text-amber-600',
  strategy_updated:  'bg-violet-100 text-violet-600',
  report_exported:   'bg-slate-100 text-slate-600',
};

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const ActivityList: React.FC<ActivityListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 text-center">
        <Clock className="w-8 h-8 text-slate-200 mx-auto mb-2" />
        <p className="text-xs text-slate-400 font-medium">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-50">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors">
          <div className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${TYPE_COLORS[item.type] ?? 'bg-slate-100 text-slate-500'}`}>
            {TYPE_ICONS[item.type] ?? <Clock className="w-3.5 h-3.5" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 leading-snug">{item.message}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">{formatRelativeTime(item.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
