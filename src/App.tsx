/**
 * App.tsx — Route configuration only.
 *
 * All layout chrome lives in AppShell.
 * All business logic lives inside individual page components.
 * The legacy 3-step GEO wizard is preserved at /legacy via LegacyGeoFlow.
 */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './layouts/AppShell';

// V1 — Campaign OS
import Dashboard        from './pages/v1/Dashboard';
import ProductIntake    from './pages/v1/ProductIntake';
import MarketMapping    from './pages/v1/MarketMapping';
import BriefBuilder     from './pages/v1/BriefBuilder';
import StrategyStudio   from './pages/v1/StrategyStudio';
import ActivationStudio from './pages/v1/ActivationStudio';
import Campaigns        from './pages/v1/Campaigns';

// V2 — Intelligence Layer
import ControlTower  from './pages/v2/ControlTower';
import SignalRadar   from './pages/v2/SignalRadar';
import WarRoom       from './pages/v2/WarRoom';
import MessageLab    from './pages/v2/MessageLab';
import Optimization  from './pages/v2/Optimization';
import Integrations  from './pages/v2/Integrations';
import Reports       from './pages/v2/Reports';

// Legacy
import LegacyGeoFlow from './pages/LegacyGeoFlow';

const App: React.FC = () => (
  <Routes>
    {/* AppShell provides TopBar + LeftNav for every child route */}
    <Route path="/" element={<AppShell />}>

      {/* Default → Dashboard */}
      <Route index element={<Navigate to="/dashboard" replace />} />

      {/* V1 – Campaign OS */}
      <Route path="dashboard"         element={<Dashboard />}        />
      <Route path="product-intake"    element={<ProductIntake />}    />
      <Route path="market-mapping"    element={<MarketMapping />}    />
      <Route path="brief-builder"     element={<BriefBuilder />}     />
      <Route path="strategy-studio"   element={<StrategyStudio />}   />
      <Route path="activation-studio" element={<ActivationStudio />} />
      <Route path="campaigns"         element={<Campaigns />}        />

      {/* V2 – Intelligence Layer */}
      <Route path="control-tower"  element={<ControlTower />}  />
      <Route path="signal-radar"   element={<SignalRadar />}   />
      <Route path="war-room"       element={<WarRoom />}       />
      <Route path="message-lab"    element={<MessageLab />}    />
      <Route path="optimization"   element={<Optimization />}  />
      <Route path="integrations"   element={<Integrations />}  />
      <Route path="reports"        element={<Reports />}       />

      {/* Legacy – original 3-step GEO wizard (business logic unchanged) */}
      <Route path="legacy" element={<LegacyGeoFlow />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Route>
  </Routes>
);

export default App;
