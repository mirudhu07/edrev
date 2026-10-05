import React from 'react';
import { Settings, Sparkles, Sliders, RefreshCw, Cpu, Layers } from 'lucide-react';
import { useLab } from '../context/LabContext';

const SettingsPage = () => {
  const { demoMode, toggleDemoMode, selectedControllerId, connectedSensors } = useLab();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Lab & Telemetry Preferences</h2>
            <p className="text-xs text-slate-500">
              Configure telemetry sampling rates, simulated hardware modes, and default interface defaults.
            </p>
          </div>
        </div>
      </div>

      <div className="lab-card p-6 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Simulated Demo Mode Telemetry
            </h3>
            <p className="text-xs text-slate-500">
              When enabled, generates realistic telemetry streams exclusively for configured sensors of the active controller.
            </p>
          </div>

          <button
            onClick={toggleDemoMode}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              demoMode
                ? 'bg-amber-500 text-white shadow-sm hover:bg-amber-600'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {demoMode ? "DEMO MODE ACTIVE" : "LIVE HARDWARE ONLY"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Baud Rate (Serial UART Telemetry)
            </label>
            <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-semibold">
              <option value="115200">115200 baud (Default)</option>
              <option value="9600">9600 baud</option>
              <option value="921600">921600 baud (High Speed)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Telemetry Refresh Interval
            </label>
            <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-semibold">
              <option value="3000">3 Seconds (Standard)</option>
              <option value="1000">1 Second (Fast)</option>
              <option value="5000">5 Seconds (Low Power)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
