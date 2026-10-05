import React from 'react';
import { ShieldCheck, Cpu, Layers, Radio, Server, Activity, CheckCircle2 } from 'lucide-react';
import { useLab } from '../context/LabContext';
import HardwareStatusWidget from '../components/HardwareStatusWidget';

const HardwareStatusPage = () => {
  const { selectedController, connectedSensors, backendConnected, demoMode } = useLab();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Hardware & System Status Diagnostic</h2>
            <p className="text-xs text-slate-500">
              Detailed breakdown of controller processing platform, interface bus links, and sensor configuration status.
            </p>
          </div>
        </div>
      </div>

      {/* Main Status Widget */}
      <HardwareStatusWidget />

      {/* Technical Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="lab-card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
            <Cpu className="w-4 h-4 text-blue-600" />
            Controller Context Diagnostics
          </h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Selected Controller:</span>
              <span className="font-bold text-slate-900">{selectedController?.name || "None"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Platform Category:</span>
              <span className="font-bold text-slate-800">{selectedController?.category || "N/A"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Architecture:</span>
              <span className="font-bold text-slate-800">{selectedController?.architecture || "N/A"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Clock Speed:</span>
              <span className="font-bold text-slate-800">{selectedController?.clockSpeed || "N/A"}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Operating Voltage:</span>
              <span className="font-bold text-slate-800">{selectedController?.operatingVoltage || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="lab-card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
            <Radio className="w-4 h-4 text-purple-600" />
            Interface Bus & Backend Status
          </h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Backend Server API:</span>
              <span className={`font-bold ${backendConnected ? 'text-emerald-600' : 'text-amber-600'}`}>
                {backendConnected ? "Connected (REST Active)" : "Offline (Local Simulation Active)"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Telemetry Engine:</span>
              <span className="font-bold text-amber-600">
                {demoMode ? "DEMO MODE (Simulated Hardware Data)" : "LIVE HARDWARE BUS"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Configured Sensors:</span>
              <span className="font-bold text-blue-600">{connectedSensors.length} Attached</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Supported Protocols:</span>
              <span className="font-bold text-slate-800">UART, I2C, SPI, Wi-Fi, BLE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareStatusPage;
