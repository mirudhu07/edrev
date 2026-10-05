import React from 'react';
import { Cpu, CheckCircle2, ChevronDown } from 'lucide-react';
import { useLab } from '../context/LabContext';

const ControllerSelector = ({ size = "normal" }) => {
  const { selectedControllerId, selectController, controllers } = useLab();

  return (
    <div className="relative inline-block text-left w-full sm:w-auto">
      <div className="flex items-center gap-2">
        <label htmlFor="controller-select" className="sr-only">
          Select Controller / Processing Platform
        </label>
        <div className="relative flex-1 sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-600">
            <Cpu className="w-4 h-4" />
          </div>
          <select
            id="controller-select"
            value={selectedControllerId || ""}
            onChange={(e) => selectController(e.target.value)}
            className={`block w-full pl-9 pr-10 ${
              size === "large" ? "py-3 text-base" : "py-2 text-sm"
            } bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer hover:border-slate-400 transition-colors`}
          >
            <option value="" disabled>-- Select Controller / Platform --</option>
            {controllers.map((ctrl) => (
              <option key={ctrl.id} value={ctrl.id}>
                {ctrl.name} ({ctrl.category.includes("SBC") ? "SBC Platform" : "MCU"})
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControllerSelector;
