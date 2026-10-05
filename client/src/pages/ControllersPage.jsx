import React from 'react';
import { Cpu, CheckCircle2, Zap, Radio, Layers, ArrowRight } from 'lucide-react';
import { useLab } from '../context/LabContext';

const ControllersPage = () => {
  const { selectedControllerId, selectController, controllers, configuredSensors } = useLab();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Supported Controllers & Processing Platforms</h2>
            <p className="text-xs text-slate-500">
              Select your target hardware platform to switch application context. The live dashboard and sensors will immediately adapt.
            </p>
          </div>
        </div>
      </div>

      {/* Controllers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {controllers.map((ctrl) => {
          const isSelected = selectedControllerId === ctrl.id;
          const sensorsForCtrl = configuredSensors.filter(s => s.controller === ctrl.id);
          const isSBC = ctrl.category.includes("SBC");

          return (
            <div
              key={ctrl.id}
              className={`lab-card p-6 flex flex-col justify-between transition-all ${
                isSelected
                  ? 'border-2 border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/20'
                  : 'hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md border ${ctrl.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                    {isSBC ? "Single-Board Computer" : "Microcontroller"}
                  </span>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ACTIVE
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {ctrl.name}
                </h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                  {ctrl.description}
                </p>

                {/* Specs Box */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-2 text-xs font-mono mb-4">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">Architecture:</span>
                    <span className="font-semibold text-slate-800">{ctrl.architecture}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">Clock / Voltage:</span>
                    <span className="font-semibold text-slate-800">{ctrl.clockSpeed} • {ctrl.operatingVoltage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Configured Sensors:</span>
                    <span className="font-bold text-blue-600">{sensorsForCtrl.length} connected</span>
                  </div>
                </div>

                {/* Interfaces */}
                <div className="mb-4">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Supported Interfaces
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {ctrl.interfaces.map(iface => (
                      <span key={iface} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-mono font-semibold">
                        {iface}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => selectController(ctrl.id)}
                disabled={isSelected}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white cursor-default shadow-sm'
                    : 'bg-slate-900 hover:bg-blue-600 text-white shadow-sm'
                }`}
              >
                {isSelected ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Currently Selected Platform
                  </>
                ) : (
                  <>
                    <span>Select {ctrl.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ControllersPage;
