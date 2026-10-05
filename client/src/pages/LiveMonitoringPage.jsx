import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Activity, Layers, Cpu, Radio, Sparkles } from 'lucide-react';
import { useLab } from '../context/LabContext';
import ReadingCard from '../components/ReadingCard';
import ReadingChart from '../components/ReadingChart';
import EmptyState from '../components/EmptyState';

const LiveMonitoringPage = () => {
  const { selectedControllerId, connectedSensors, activeReadings } = useLab();
  const { onOpenAddSensor } = useOutletContext();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="pulse-dot" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                REALTIME TELEMETRY FEED
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              Live Hardware Monitoring
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Streaming telemetry strictly for <strong className="text-cyan-300 font-mono">{selectedControllerId || "Unconfigured"}</strong> context.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div className="text-xs">
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">Active Stream Count</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">
                {connectedSensors.length} Sensor Channels
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Strict Context Viewport */}
      {!selectedControllerId ? (
        <EmptyState type="no-controller" />
      ) : connectedSensors.length === 0 ? (
        <EmptyState 
          type="no-sensors" 
          controllerName={selectedControllerId} 
          onAddSensor={onOpenAddSensor} 
        />
      ) : (
        <div className="space-y-8">
          {/* Live Telemetry Gauges */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Active Telemetry Cards ({connectedSensors.length})
            </h3>

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

          {/* Realtime Graphs */}
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              High-Frequency Graph Channels
            </h3>

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
        </div>
      )}
    </div>
  );
};

export default LiveMonitoringPage;
