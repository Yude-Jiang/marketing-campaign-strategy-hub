/**
 * src/pages/v2/IntegrationsPage.tsx
 * T14: Integrations — connector grid and detail panel.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plug, Plus } from 'lucide-react';
import { MOCK_CONNECTORS } from '../../mock/integrations';
import type { IntegrationConnector, IntegrationStatus } from '../../types/integration';
import ConnectorCard from '../../components/v2/ConnectorCard';
import ConnectorDetail from '../../components/v2/ConnectorDetail';

// ─── Action → status mapping ────────────────────────────────────────────────────

const ACTION_STATUS_MAP: Record<string, IntegrationStatus | 'REMOVE'> = {
  connect:    'connected',
  disconnect: 'disconnected',
  resume:     'connected',
  pause:      'paused',
  test:       'connected',        // test keeps connected status
  remove:     'REMOVE' as const,
};

// ─── Page component ─────────────────────────────────────────────────────────────

const IntegrationsPage: React.FC = () => {
  const navigate = useNavigate();

  // ── Local state ──────────────────────────────────────────────────────
  const [connectors, setConnectors] = useState<IntegrationConnector[]>(() => MOCK_CONNECTORS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ── Derived ─────────────────────────────────────────────────────────
  const selectedConnector = useMemo(
    () => (selectedId ? connectors.find(c => c.id === selectedId) ?? null : null),
    [selectedId, connectors],
  );

  // ── Handlers ─────────────────────────────────────────────────────────
  const handleSelect = useCallback((id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  }, []);

  const handleAction = useCallback((id: string, action: string) => {
    const nextStatus = ACTION_STATUS_MAP[action];
    if (nextStatus === 'REMOVE') {
      setConnectors(prev => {
        const next = prev.filter(c => c.id !== id);
        // If the removed connector was selected, deselect
        if (selectedId === id) setSelectedId(null);
        return next;
      });
      return;
    }
    if (nextStatus) {
      setConnectors(prev =>
        prev.map(c =>
          c.id === id
            ? { ...c, status: nextStatus, lastSyncAt: new Date().toISOString() }
            : c,
        ),
      );
    }
  }, [selectedId]);

  const handleAddIntegration = useCallback(() => {
    const nextId = `conn-cus-${Date.now()}`;
    const newConnector: IntegrationConnector = {
      id: nextId,
      name: 'New Connector',
      category: 'custom',
      status: 'disconnected',
      configNote: 'New connector — configure endpoint and authentication.',
    };
    setConnectors(prev => [...prev, newConnector]);
    setSelectedId(nextId);
  }, []);

  return (
    <div className="min-h-full">
      {/* ── Back nav ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/v1/dashboard')}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#03234b] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Dashboard
        </button>
        <span className="text-slate-200 text-[10px]">/</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#03234b]">
          Integrations
        </span>
      </div>

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Plug className="w-4 h-4 text-[#3cb4e6]" />
          <h1 className="text-sm font-black text-[#03234b] uppercase tracking-widest">
            Integrations
          </h1>
          <span className="text-[8px] text-slate-400 ml-1">
            {connectors.length} connectors
          </span>
        </div>
        <button
          onClick={handleAddIntegration}
          className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white bg-[#03234b] px-3 py-2 rounded-xl hover:bg-[#0a3d7a] transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Integration
        </button>
      </div>

      {/* ── Two-column layout ────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Left 8 cols: Connector grid */}
        <div className="col-span-8">
          {connectors.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
              <Plug className="w-6 h-6 text-slate-300 mb-3" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                No Connectors
              </p>
              <p className="text-[9px] text-slate-400 max-w-[220px] leading-relaxed mb-4">
                Add your first integration to connect external data sources.
              </p>
              <button
                onClick={handleAddIntegration}
                className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white bg-[#03234b] px-3 py-2 rounded-xl hover:bg-[#0a3d7a] transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Integration
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {connectors.map(c => (
                <ConnectorCard
                  key={c.id}
                  connector={c}
                  isSelected={c.id === selectedId}
                  onClick={() => handleSelect(c.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right 4 cols: Detail */}
        <div className="col-span-4">
          <ConnectorDetail
            connector={selectedConnector}
            onAction={handleAction}
          />
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
