/**
 * AppShell.tsx
 *
 * Root layout for Campaign OS.
 * Structure: fixed TopBar (56 px) / fixed LeftNav (240 px expanded | 64 px collapsed) / scrollable content.
 * Uses react-router-dom <Outlet /> for page content so every child route
 * automatically gets the shell without importing it.
 *
 * Nav items are sourced from src/mock/navigation.ts — edit there, not here.
 */
import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useWorkflowStore } from '../store/workflowStore';
import type { UILang } from '../i18n/translations';
import { translations } from '../i18n/translations';
import type { Ecosystem } from '../store/workflowStore';
import ChatAssistant from '../components/ChatAssistant';
import {
  Cpu,
  Globe,
  Languages,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { NavGroup } from '../types/navigation';
import { NAV_ITEMS } from '../mock/navigation';

// ─── Nav section metadata ──────────────────────────────────────────────────────

const NAV_GROUPS: NavGroup[] = ['v1', 'v2', 'legacy'];

const NAV_GROUP_LABELS: Record<NavGroup, string> = {
  v1:     'Campaign OS',
  v2:     'Intelligence',
  legacy: 'Legacy',
};

const PHASE_BADGE: Record<NavGroup, string> = {
  v1:     'bg-blue-100   text-blue-600',
  v2:     'bg-violet-100 text-violet-600',
  legacy: 'bg-slate-100  text-slate-500',
};

// ─── Component ────────────────────────────────────────────────────────────────

const AppShell: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { uiLang, setUiLang, targetEcosystem, setTargetEcosystem } =
    useWorkflowStore();

  const t = translations[uiLang];

  const UI_LANGS: { id: UILang; label: string }[] = [
    { id: 'zh', label: '中文'   },
    { id: 'en', label: 'EN'     },
    { id: 'jp', label: '日本語' },
  ];

  const ECOSYSTEMS: { id: Ecosystem; label: string }[] = [
    { id: 'global', label: 'Global' },
    { id: 'cn',     label: 'CN'     },
    { id: 'jp',     label: 'JP'     },
    { id: 'kr',     label: 'KR'     },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/*  TOP BAR                                                     */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="h-14 flex-shrink-0 bg-[#03234b] text-white flex items-center px-4 gap-3 z-30 shadow-xl">

        {/* Sidebar collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="p-1.5 rounded hover:bg-white/10 transition-colors flex-shrink-0"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <ChevronLeft  className="w-4 h-4" />
          }
        </button>

        {/* Logo mark */}
        <div className="bg-[#3cb4e6] p-1.5 rounded-sm shadow-inner flex-shrink-0">
          <Cpu className="w-4 h-4 text-[#03234b]" />
        </div>

        {/* App title */}
        <div className="hidden sm:block flex-1 min-w-0">
          <h1 className="text-sm font-black tracking-tight leading-tight uppercase truncate">
            Campaign OS
          </h1>
          <p className="text-[9px] text-[#8191a5] font-bold uppercase tracking-[0.15em]">
            Powered by GEO Strategic Hub
          </p>
        </div>

        {/* ── Right-side global controls ─────────────────────────── */}
        <div className="flex items-center gap-2 ml-auto flex-shrink-0">

          {/* Language switcher */}
          <div className="flex items-center bg-[#2a4060] rounded p-0.5 border border-[#8191a5]/20">
            <Languages className="w-3.5 h-3.5 text-[#8191a5] mx-1.5" />
            {UI_LANGS.map(l => (
              <button
                key={l.id}
                onClick={() => setUiLang(l.id)}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                  uiLang === l.id
                    ? 'bg-white text-[#03234b] shadow-sm'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Ecosystem switcher */}
          <div className="flex items-center bg-[#425a78] rounded p-0.5 border border-[#8191a5]/30">
            <div className="px-2 text-[10px] font-black text-[#c0c8d2] uppercase flex items-center gap-1 border-r border-[#8191a5]/30 mr-0.5 pr-2">
              <Globe className="w-3 h-3" />
              {t.ecosystemLabel}
            </div>
            {ECOSYSTEMS.map(eco => (
              <button
                key={eco.id}
                onClick={() => setTargetEcosystem(eco.id)}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                  targetEcosystem === eco.id
                    ? 'bg-[#ffd200] text-[#03234b] shadow-md scale-105'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {eco.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/*  BODY  (Left Nav + Main Content)                             */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left Navigation ──────────────────────────────────────── */}
        <nav
          className={`
            flex-shrink-0 bg-white border-r border-slate-200
            flex flex-col overflow-y-auto overflow-x-hidden
            transition-[width] duration-200 ease-in-out
            ${collapsed ? 'w-16' : 'w-60'}
          `}
        >
          <div className="flex-1 py-3">
            {NAV_GROUPS.map((group, groupIdx) => {
              const items = NAV_ITEMS.filter(item => item.group === group);
              return (
                <div key={group}>

                  {/* Section header — expanded only */}
                  {!collapsed ? (
                    <div className="px-3 pt-5 pb-1 first:pt-3">
                      <span
                        className={`
                          inline-block text-[9px] font-black uppercase tracking-[0.15em]
                          px-2 py-0.5 rounded ${PHASE_BADGE[group]}
                        `}
                      >
                        {NAV_GROUP_LABELS[group]}
                      </span>
                    </div>
                  ) : (
                    /* Divider between sections in collapsed mode (skip first) */
                    groupIdx > 0 && (
                      <div className="mx-3 my-2 border-t border-slate-100" />
                    )
                  )}

                  {/* Nav items */}
                  <div className="px-2 space-y-0.5 mt-1">
                    {items.map(item => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          title={collapsed ? item.label : undefined}
                          className={({ isActive }) =>
                            [
                              'flex items-center gap-3 px-3 py-2 rounded-lg',
                              'text-sm font-medium transition-all duration-150',
                              collapsed ? 'justify-center' : '',
                              isActive
                                ? 'bg-[#03234b] text-white shadow-sm'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                            ].join(' ')
                          }
                        >
                          {/* Icon inherits text color via currentColor — active = white automatically */}
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          {!collapsed && (
                            <span className="truncate">{item.label}</span>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nav footer — visible only when expanded */}
          {!collapsed && (
            <div className="border-t border-slate-100 px-4 py-3 flex-shrink-0">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                Campaign OS v0.1
              </p>
            </div>
          )}
        </nav>

        {/* ── Main Content ─────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating Chat Assistant persists across all routes */}
      <ChatAssistant />
    </div>
  );
};

export default AppShell;
