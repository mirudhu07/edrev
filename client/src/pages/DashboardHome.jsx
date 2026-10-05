import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Plus, Layers, Activity, History, TestTube2, Cpu, CheckCircle2 } from 'lucide-react';
import { useLab } from '../context/LabContext';
import ControllerSelector from '../components/ControllerSelector';
import DemoModeBadge from '../components/DemoModeBadge';
import EmptyState from '../components/EmptyState';
import ReadingCard from '../components/ReadingCard';
import ReadingChart from '../components/ReadingChart';
import HardwareStatusWidget from '../components/HardwareStatusWidget';

const DashboardHome = () => {
  const { 
    selectedControllerId, 
    selectedController, 
    connectedSensors, 
    activeReadings, 
    demoMode, 
    toggleDemoMode 
  } = useLab();
  
  const { onOpenAddSensor } = useOutletContext();

  return (
    <div className="space-y-6">

      {/* ==================================================
          1. CONTROLLER CONFIGURATION & DEMO MODE SECTION
          ================================================== */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          
          {/* Controller Selector Area */}
          <div className="space-y-1.5 flex-1">
            <label htmlFor="dashboard-controller-select" className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Connected Controller
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              <ControllerSelector size="large" />

              {selectedController && (
                <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-mono text-xs font-bold">
                  <span className="pulse-dot" />
                  <span>Status: Configured & Connected</span>
                </div>
              )}
            </div>
          </div>

          {/* Demo Mode Switch / Toggle near top */}
          <div className="flex flex-col sm:items-end space-y-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Demo Mode Control
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDemoMode}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
                  demoMode ? 'bg-amber-500' : 'bg-slate-300'
                }`}
                aria-label="Toggle Demo Mode"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    demoMode ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              
              <span className="font-mono text-xs font-bold text-slate-800">
                {demoMode ? "ON" : "OFF"}
              </span>

              <DemoModeBadge showToggle={false} />
            </div>
          </div>
        </div>

        {/* Selected Controller Metadata Overview (when selected) */}
        {selectedController && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] font-semibold uppercase block">Selected Platform</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{selectedController.name}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] font-semibold uppercase block">Category</span>
              <span className="font-bold text-slate-800">{selectedController.category}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] font-semibold uppercase block">Architecture</span>
              <span className="font-bold text-slate-800 font-mono">{selectedController.architecture}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] font-semibold uppercase block">Configured Sensors</span>
              <span className="font-bold text-blue-600 font-mono text-sm">{connectedSensors.length} Attached</span>
            </div>
          </div>
        )}
      </div>


      {/* ==================================================
          2. STRICT CONTENT VIEWPORT: CONNECTED SENSORS & READINGS
          ================================================== */}
      {!selectedControllerId ? (
        <EmptyState type="no-controller" />
      ) : connectedSensors.length === 0 ? (
        <EmptyState 
          type="no-sensors" 
          controllerName={selectedControllerId} 
          onAddSensor={onOpenAddSensor} 
        />
      ) : (
        <>
          {/* CONNECTED SENSORS SECTION */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  Connected Sensors
                </h3>
                <p className="text-xs text-slate-500">
                  Sensors currently configured for <strong className="text-slate-800 font-mono">{selectedControllerId}</strong>.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenAddSensor}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  + Add Sensor
                </button>
                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  {connectedSensors.length} Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeReadings.map(({ sensor, latestReading }) => (
                <ReadingCard
                  key={sensor.id}
                  sensor={sensor}
                  latestReading={latestReading}
                />
              ))}
            </div>
          </section>

          {/* LIVE MONITORING READINGS & GRAPHS SECTION */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Live Readings & Graphs
                </h3>
                <p className="text-xs text-slate-500">
                  Realtime data streams exclusively for {selectedControllerId}'s configured sensors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeReadings.map(({ sensor, history }) => (
                <ReadingChart
                  key={sensor.id}
                  sensor={sensor}
                  history={history}
                />
              ))}
            </div>
          </section>

          {/* HARDWARE STATUS SECTION */}
          <HardwareStatusWidget />
        </>
      )}
    </div>
  );
};

export default DashboardHome;
