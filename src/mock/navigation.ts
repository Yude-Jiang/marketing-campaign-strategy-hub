/**
 * src/mock/navigation.ts
 * Single source of truth for left-nav items.
 * Import NAV_ITEMS in AppShell; do not import real services here.
 */
import type { NavItemConfig } from '../types/navigation';
import {
  LayoutDashboard,
  Package,
  Map as MapIcon,
  FileText,
  Crosshair,
  Zap,
  Target,
  Building2,
  Radio,
  Swords,
  MessageSquare,
  TrendingUp,
  Plug,
  BarChart3,
  History,
} from 'lucide-react';

export const NAV_ITEMS: NavItemConfig[] = [
  // ── V1 · Campaign OS ─────────────────────────────────────────────
  { key: 'dashboard',         label: 'Dashboard',         group: 'v1',     path: '/dashboard',         icon: LayoutDashboard },
  { key: 'product-intake',    label: 'Product Intake',    group: 'v1',     path: '/product-intake',    icon: Package         },
  { key: 'market-mapping',    label: 'Market Mapping',    group: 'v1',     path: '/market-mapping',    icon: MapIcon         },
  { key: 'brief-builder',     label: 'Brief Builder',     group: 'v1',     path: '/brief-builder',     icon: FileText        },
  { key: 'strategy-studio',   label: 'Strategy Studio',   group: 'v1',     path: '/strategy-studio',   icon: Crosshair       },
  { key: 'activation-studio', label: 'Activation Studio', group: 'v1',     path: '/activation-studio', icon: Zap             },
  { key: 'campaigns',         label: 'Campaigns',         group: 'v1',     path: '/campaigns',         icon: Target          },

  // ── V2 · Intelligence Layer ───────────────────────────────────────
  { key: 'control-tower',     label: 'Control Tower',     group: 'v2',     path: '/control-tower',     icon: Building2    },
  { key: 'signal-radar',      label: 'Signal Radar',      group: 'v2',     path: '/signal-radar',      icon: Radio        },
  { key: 'war-room',          label: 'War Room',          group: 'v2',     path: '/war-room',          icon: Swords       },
  { key: 'message-lab',       label: 'Message Lab',       group: 'v2',     path: '/message-lab',       icon: MessageSquare},
  { key: 'optimization',      label: 'Optimization',      group: 'v2',     path: '/optimization',      icon: TrendingUp   },
  { key: 'integrations',      label: 'Integrations',      group: 'v2',     path: '/integrations',      icon: Plug         },
  { key: 'reports',           label: 'Reports',           group: 'v2',     path: '/reports',           icon: BarChart3    },

  // ── Legacy ────────────────────────────────────────────────────────
  { key: 'legacy',            label: 'Legacy GEO Flow',   group: 'legacy', path: '/legacy',            icon: History      },
];
