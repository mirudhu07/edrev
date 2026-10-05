import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Layers, Plus, Trash2, Cpu, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { useLab } from '../context/LabContext';
import { SENSOR_LIBRARY_DATA } from '../data/sensorLibrary';
import SensorCard from '../components/SensorCard';
import RemoveSensorModal from '../components/RemoveSensorModal';

const SensorsPage = () => {
  const { selectedControllerId, connectedSensors, sensorReadings, removeSensor } = useLab();
  const { onOpenAddSensor } = useOutletContext();

  const [sensorToRemove, setSensorToRemove] = useState(null);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-700">
              {selectedControllerId || "No Controller Selected"}
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Active Controller Context</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sensor Management Center
          </h2>
          <p className="text-xs text-slate-500">
            Configure, manage, and inspect hardware sensor modules associated with {selectedControllerId}.
          </p>
        </div>

        {selectedControllerId && (
          <button
            onClick={onOpenAddSensor}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            + Add Sensor to {selectedControllerId}
          </button>
        )}
      </div>

      {/* SECTION 1: CONNECTED SENSORS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Connected Sensors ({connectedSensors.length})
            </h3>
            <p className="text-xs text-slate-500">
              Sensors currently configured and emitting telemetry for <strong className="text-slate-800 font-mono">{selectedControllerId}</strong>.
            </p>
          </div>
        </div>

        {!selectedControllerId ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            Please select a controller from the top menu to view or configure connected sensors.
          </div>
        ) : connectedSensors.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-600 text-sm">
            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-800 mb-1">No Sensors Connected to {selectedControllerId}</p>
            <p className="text-xs text-slate-500 mb-4">Click below to attach a sensor from the library.</p>
            <button
              onClick={onOpenAddSensor}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm"
            >
              + Add Sensor
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedSensors.map(sensor => (
              <SensorCard
                key={sensor.id}
                sensor={sensor}
                latestReading={sensorReadings[sensor.id]?.latest}
                onRemove={(s) => setSensorToRemove(s)}
              />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: SENSOR LIBRARY */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            EduSense Supported Sensor Library (12 Available Modules)
          </h3>
          <p className="text-xs text-slate-500">
            Comprehensive list of all sensors supported by the EduSense kit. Click "+ Add to Controller" to attach any sensor module.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SENSOR_LIBRARY_DATA.map(lib => {
            const isAlreadyConnected = connectedSensors.some(s => s.sensorType === lib.type);

            return (
              <div
                key={lib.type}
                className="lab-card p-4 flex flex-col justify-between hover:border-blue-300 transition-all bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {lib.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {lib.defaultInterface}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1" title={lib.name}>
                    {lib.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                    {lib.description}
                  </p>

                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-[11px] mb-3">
                    <span className="text-slate-400 font-semibold block text-[9px] uppercase">Telemetry Fields</span>
                    <span className="font-mono font-bold text-slate-700">
                      {lib.fields.map(f => `${f.label} (${f.unit || 'state'})`).join(', ')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenAddSensor}
                  className="w-full py-2 px-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + Add to {selectedControllerId || "Controller"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Confirmation Modal */}
      <RemoveSensorModal
        isOpen={Boolean(sensorToRemove)}
        sensor={sensorToRemove}
        onClose={() => setSensorToRemove(null)}
        onConfirm={(sensorId) => removeSensor(sensorId)}
      />
    </div>
  );
};

export default SensorsPage;
