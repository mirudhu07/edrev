import React from 'react';
import { Cpu, Plus, Layers, AlertCircle } from 'lucide-react';
import ControllerSelector from './ControllerSelector';

const EmptyState = ({ type = "no-controller", controllerName = "", onAddSensor }) => {
  if (type === "no-controller") {
    return (
      <div className="lab-card p-12 text-center border-dashed border-2 border-slate-300 bg-slate-50/50 my-6">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-200 shadow-sm">
          <Cpu className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Controller</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          No controller or processing platform is currently selected. Please select a controller to view or configure its attached sensors.
        </p>
        <div className="flex justify-center">
          <ControllerSelector size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="lab-card p-12 text-center border-dashed border-2 border-slate-300 bg-slate-50/50 my-6">
      <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-200 shadow-sm">
        <Layers className="w-8 h-8" />
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 font-mono text-xs font-bold rounded-full mb-3">
        {controllerName} Context
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No Sensors Connected</h3>
      <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
        There are currently no sensors configured for <strong className="text-slate-900">{controllerName}</strong>. Click below to add sensors to this controller platform.
      </p>
      {onAddSensor && (
        <button
          onClick={onAddSensor}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          + Add Sensor to {controllerName}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
