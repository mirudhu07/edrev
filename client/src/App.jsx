import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LabProvider } from './context/LabContext';
import AppLayout from './components/AppLayout';

import DashboardHome from './pages/DashboardHome';
import ControllersPage from './pages/ControllersPage';
import SensorsPage from './pages/SensorsPage';
import SensorDetailPage from './pages/SensorDetailPage';
import LiveMonitoringPage from './pages/LiveMonitoringPage';
import ExperimentsPage from './pages/ExperimentsPage';
import DataHistoryPage from './pages/DataHistoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import HardwareStatusPage from './pages/HardwareStatusPage';
import CommunicationPage from './pages/CommunicationPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <LabProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="controllers" element={<ControllersPage />} />
            <Route path="sensors" element={<SensorsPage />} />
            <Route path="sensors/:id" element={<SensorDetailPage />} />
            <Route path="live" element={<LiveMonitoringPage />} />
            <Route path="experiments" element={<ExperimentsPage />} />
            <Route path="history" element={<DataHistoryPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="hardware" element={<HardwareStatusPage />} />
            <Route path="communication" element={<CommunicationPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<DashboardHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LabProvider>
  );
}

export default App;
