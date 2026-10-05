import React from 'react';
import { Cpu, Layers, Network, Clock, ShieldCheck, Wifi, Radio } from 'lucide-react';
import { useLab } from '../context/LabContext';

const HardwareStatusWidget = () => {
  const { selectedController, connectedSensors, backendConnected, demoMode } = useLab();

  const controllerName = selectedController ? selectedController.name : "None Selected";
  const statusLabel = selectedController ? "Configured & Active" : "Unconfigured";
  const sensorCount = connectedSensors.length;
  
  const activeInterfaces = selectedController
    ? [...new Set(connectedSensors.map(s => s.interface))].join(', ') || selectedController.interfaces.slice(0, 3).join(', ')
    : "None";

  const lastUpdate = new Date().toLocaleTimeString();

  return (
    <div className="lab-card p-5 bg-white border border-slate-200">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-sm">Hardware & Telemetry Status Summary</h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
          selectedController ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
        }`}>
          {selectedController ? 'CONFIGURED' : 'SELECT CONTROLLER'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-slate-500 font-semibold block text-[10px] uppercase">Selected Controller</span>
          <span className="font-bold text-slate-900 font-mono text-sm mt-0.5 block truncate">
            {controllerName}
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-slate-500 font-semibold block text-[10px] uppercase">Controller Status</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="pulse-dot" />
            <span className="font-bold text-emerald-700 text-xs">{statusLabel}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-slate-500 font-semibold block text-[10px] uppercase">Connected Sensors</span>
          <span className="font-bold text-blue-700 font-mono text-sm mt-0.5 block">
            {sensorCount} Sensors
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-slate-500 font-semibold block text-[10px] uppercase">Communication Link</span>
          <span className="font-bold text-slate-800 font-mono text-xs mt-0.5 block truncate" title={activeInterfaces}>
            {activeInterfaces}
          </span>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-slate-500 font-semibold block text-[10px] uppercase">Last Data Sync</span>
          <span className="font-bold text-slate-800 font-mono text-xs mt-0.5 block">
            {lastUpdate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HardwareStatusWidget;
