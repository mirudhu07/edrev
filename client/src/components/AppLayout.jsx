import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import AddSensorModal from './AddSensorModal';
import ErrorBoundary from './ErrorBoundary';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addSensorOpen, setAddSensorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar 
          onToggleSidebar={() => setSidebarOpen(prev => !prev)} 
          onOpenAddSensor={() => setAddSensorOpen(true)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <ErrorBoundary>
            <Outlet context={{ onOpenAddSensor: () => setAddSensorOpen(true) }} />
          </ErrorBoundary>
        </main>
      </div>

      {/* Global Add Sensor Modal */}
      <AddSensorModal 
        isOpen={addSensorOpen} 
        onClose={() => setAddSensorOpen(false)} 
      />
    </div>
  );
};

export default AppLayout;
