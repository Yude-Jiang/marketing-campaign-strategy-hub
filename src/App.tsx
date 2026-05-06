/**
 * App.tsx — Route configuration only.
 *
 * All layout chrome lives in AppShell.
 * All business logic lives inside individual page components.
 * The legacy 3-step GEO wizard is preserved at /legacy via LegacyGeoFlow.
 */
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './layouts/AppShell';
import { ErrorBoundary } from './components/ErrorBoundary';

// ─── Route-level code splitting ───────────────────────────────────────────────
// V1 — Campaign OS
const Dashboard        = lazy(() => import('./pages/v1/Dashboard'));
const ProductIntake    = lazy(() => import('./pages/v1/ProductIntake'));
const MarketMapping    = lazy(() => import('./pages/v1/MarketMapping'));
const BriefBuilder     = lazy(() => import('./pages/v1/BriefBuilder'));
const StrategyStudio   = lazy(() => import('./pages/v1/StrategyStudio'));
const ActivationStudio = lazy(() => import('./pages/v1/ActivationStudio'));

// V2 — Intelligence Layer
const Campaigns    = lazy(() => import('./pages/v2/Campaigns'));
const ControlTower = lazy(() => import('./pages/v2/ControlTower'));
const SignalRadar   = lazy(() => import('./pages/v2/SignalRadar'));
const WarRoom      = lazy(() => import('./pages/v2/WarRoom'));
const MessageLab   = lazy(() => import('./pages/v2/MessageLab'));
const Optimization = lazy(() => import('./pages/v2/Optimization'));
const Integrations = lazy(() => import('./pages/v2/Integrations'));
const Reports      = lazy(() => import('./pages/v2/Reports'));

// Legacy
const LegacyGeoFlow = lazy(() => import('./pages/LegacyGeoFlow'));

// ─── Minimal loading fallback (shown while a lazy chunk is fetching) ──────────
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-6 h-6 border-2 border-[#3cb4e6] border-t-transparent rounded-full animate-spin" />
  </div>
);

// ─── Wrap a page in both Suspense + ErrorBoundary ────────────────────────────
const Page: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <ErrorBoundary label={label}>
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

const App: React.FC = () => (
  <Routes>
    {/* AppShell provides TopBar + LeftNav for every child route */}
    <Route path="/" element={<AppShell />}>

      {/* Default → Dashboard */}
      <Route index element={<Navigate to="/dashboard" replace />} />

      {/* V1 – Campaign OS */}
      <Route path="dashboard"         element={<Page label="Dashboard">        <Dashboard />       </Page>} />
      <Route path="product-intake"    element={<Page label="Product Intake">   <ProductIntake />   </Page>} />
      <Route path="market-mapping"    element={<Page label="Market Mapping">   <MarketMapping />   </Page>} />
      <Route path="brief-builder"     element={<Page label="Brief Builder">    <BriefBuilder />    </Page>} />
      <Route path="strategy-studio"   element={<Page label="Strategy Studio">  <StrategyStudio />  </Page>} />
      <Route path="activation-studio" element={<Page label="Activation Studio"><ActivationStudio /></Page>} />
      <Route path="campaigns"         element={<Page label="Campaigns">        <Campaigns />       </Page>} />

      {/* V2 – Intelligence Layer */}
      <Route path="control-tower"  element={<Page label="Control Tower"> <ControlTower /> </Page>} />
      <Route path="signal-radar"   element={<Page label="Signal Radar">  <SignalRadar />  </Page>} />
      <Route path="war-room"       element={<Page label="War Room">      <WarRoom />      </Page>} />
      <Route path="message-lab"    element={<Page label="Message Lab">   <MessageLab />   </Page>} />
      <Route path="optimization"   element={<Page label="Optimization">  <Optimization /> </Page>} />
      <Route path="integrations"   element={<Page label="Integrations">  <Integrations /> </Page>} />
      <Route path="reports"        element={<Page label="Reports">       <Reports />      </Page>} />

      {/* Legacy – original 3-step GEO wizard (business logic unchanged) */}
      <Route path="legacy" element={<Page label="Legacy GEO Flow"><LegacyGeoFlow /></Page>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Route>
  </Routes>
);

export default App;
