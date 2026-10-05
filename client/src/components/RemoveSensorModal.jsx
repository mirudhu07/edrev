import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const RemoveSensorModal = ({ isOpen, onClose, onConfirm, sensor }) => {
  if (!isOpen || !sensor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 mb-2">Remove Sensor Confirmation</h3>

          <p className="text-sm text-slate-600 mb-4">
            Are you sure you want to remove <strong className="text-slate-900 font-bold">{sensor.customName || sensor.sensorType}</strong> ({sensor.sensorType}) from controller <strong className="text-blue-600 font-mono">{sensor.controller}</strong>?
          </p>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-500 mb-6 text-left space-y-1">
            <p className="font-semibold text-slate-700">Consequences of Removal:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Sensor card will be removed from Dashboard and Live Monitoring immediately.</li>
              <li>Live stream generation for this sensor will stop.</li>
              <li>Historical chart data will disappear from active context.</li>
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(sensor.id);
                onClose();
              }}
              className="px-5 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-md shadow-rose-500/20 transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove Sensor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveSensorModal;
