import React from 'react';
import { Cpu, CheckCircle2, Network, ShieldCheck, Zap, HardDrive } from 'lucide-react';
import { useLab } from '../context/LabContext';

const ControllerStatusCard = () => {
  const { selectedController, connectedSensors } = useLab();

  if (!selectedController) {
    return (
      <div className="lab-card p-6 bg-gradient-to-br from-amber-500/5 via-white to-slate-50 border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Configuration Needed</p>
              <h3 className="text-lg font-bold text-slate-900">No Controller Selected</h3>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
            UNCONFIGURED
          </span>
        </div>
      </div>
    );
  }

  const isSBC = selectedController.category.includes("SBC");

  return (
    <div className="lab-card p-6 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg">
      {/* Decorative accent glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Connected Controller / Platform
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE CONTEXT
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              {selectedController.name}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {selectedController.description}
            </p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-slate-700/80 pt-4 md:pt-0 md:pl-6 shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Status</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="pulse-dot" />
              <span className="text-xs font-bold text-emerald-400">Configured</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Architecture</span>
            <span className="text-xs font-mono font-semibold text-slate-200 mt-0.5 block truncate max-w-[120px]" title={selectedController.architecture}>
              {selectedController.architecture}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Clock & Voltage</span>
            <span className="text-xs font-mono font-semibold text-slate-200 mt-0.5 block">
              {selectedController.clockSpeed} / {selectedController.operatingVoltage}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">Active Sensors</span>
            <span className="text-xs font-mono font-bold text-cyan-300 mt-0.5 block">
              {connectedSensors.length} configured
            </span>
          </div>

          <div className="col-span-2">
            <span className="text-[11px] text-slate-400 font-semibold block">Supported Interfaces</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedController.interfaces.map(iface => (
                <span key={iface} className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono text-cyan-200">
                  {iface}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControllerStatusCard;
