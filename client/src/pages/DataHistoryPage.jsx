import React, { useState } from 'react';
import { History, Filter, Download, Calendar, Clock, Layers, Cpu } from 'lucide-react';
import { useLab } from '../context/LabContext';

const DataHistoryPage = () => {
  const { selectedControllerId, controllers, connectedSensors, activeReadings } = useLab();

  const [filterController, setFilterController] = useState(selectedControllerId || "ESP32");
  const [filterSensorId, setFilterSensorId] = useState("all");

  const filteredSensors = connectedSensors;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Historical Telemetry Log</h2>
            <p className="text-xs text-slate-500">
              Inspect historical sensor data records scoped strictly to the selected controller and sensor filters.
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
              Controller Context Filter
            </label>
            <select
              value={filterController}
              onChange={(e) => setFilterController(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800"
            >
              {controllers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
              Configured Sensor Filter
            </label>
            <select
              value={filterSensorId}
              onChange={(e) => setFilterSensorId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800"
            >
              <option value="all">All Configured Sensors ({filteredSensors.length})</option>
              {filteredSensors.map(s => (
                <option key={s.id} value={s.id}>{s.customName || s.sensorType} ({s.interface})</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => alert("Downloading CSV log file for active context...")}
              className="w-full py-2 px-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV Dataset
            </button>
          </div>
        </div>
      </div>

      {/* Historical Data Table */}
      <div className="lab-card p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 font-sans flex items-center justify-between">
          <span>Telemetry Stream Log ({selectedControllerId} Scoped)</span>
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            {selectedControllerId} Context
          </span>
        </h3>

        {activeReadings.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">
            No active readings available for {selectedControllerId}. Add sensors to begin logging data.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Controller</th>
                  <th className="pb-3">Sensor Type</th>
                  <th className="pb-3">Interface</th>
                  <th className="pb-3">Recorded Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {activeReadings.flatMap(({ sensor, history }) =>
                  history.slice(-10).map((rdg) => (
                    <tr key={rdg.id} className="hover:bg-slate-50">
                      <td className="py-2.5 text-slate-500">
                        {new Date(rdg.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-2.5 text-blue-600 font-bold">{sensor.controller}</td>
                      <td className="py-2.5 text-slate-900 font-bold">{sensor.sensorType}</td>
                      <td className="py-2.5 text-slate-600">{sensor.interface} ({sensor.pinAddress})</td>
                      <td className="py-2.5 text-slate-800">
                        {JSON.stringify(rdg.values)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataHistoryPage;
