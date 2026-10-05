import React from 'react';
import { BarChart3, TrendingUp, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { useLab } from '../context/LabContext';
import ReadingChart from '../components/ReadingChart';

const AnalyticsPage = () => {
  const { selectedControllerId, connectedSensors, activeReadings } = useLab();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Sensor Telemetry Analytics</h2>
            <p className="text-xs text-slate-500">
              Statistical analysis strictly scoped to <strong className="text-purple-700 font-mono">{selectedControllerId || "Unconfigured"}</strong> and its active sensor modules.
            </p>
          </div>
        </div>
      </div>

      {!selectedControllerId ? (
        <div className="lab-card p-12 text-center text-slate-500">
          Select a controller to view analytics.
        </div>
      ) : connectedSensors.length === 0 ? (
        <div className="lab-card p-12 text-center text-slate-500">
          No active sensors configured for {selectedControllerId} to compute analytics.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="lab-card p-5 bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Context Platform</span>
              <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{selectedControllerId}</span>
              <span className="text-xs text-slate-500 mt-1 block">Active Controller</span>
            </div>

            <div className="lab-card p-5 bg-gradient-to-br from-purple-50 to-white border-purple-200">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">Configured Channels</span>
              <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{connectedSensors.length} Sensors</span>
              <span className="text-xs text-slate-500 mt-1 block">Filtered Scoped Sensors</span>
            </div>

            <div className="lab-card p-5 bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Telemetry Stability</span>
              <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">99.98%</span>
              <span className="text-xs text-slate-500 mt-1 block">Nominal Buffer Flow</span>
            </div>
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeReadings.map(({ sensor, history }) => (
              <ReadingChart
                key={sensor.id}
                sensor={sensor}
                history={history}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
