import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, Cpu, Radio, Clock, CheckCircle2, Trash2 } from 'lucide-react';
import { useLab } from '../context/LabContext';
import { SENSOR_LIBRARY_DATA } from '../data/sensorLibrary';
import ReadingCard from '../components/ReadingCard';
import ReadingChart from '../components/ReadingChart';

const SensorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { configuredSensors, sensorReadings, removeSensor } = useLab();

  const sensor = configuredSensors.find(s => s.id === id);

  if (!sensor) {
    return (
      <div className="lab-card p-12 text-center my-8">
        <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Sensor Not Found</h3>
        <p className="text-sm text-slate-500 mb-6">
          The requested sensor module ({id}) is not currently configured or was removed.
        </p>
        <Link
          to="/sensors"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl"
        >
          Back to Sensor Management
        </Link>
      </div>
    );
  }

  const meta = SENSOR_LIBRARY_DATA.find(s => s.type === sensor.sensorType);
  const readingData = sensorReadings[sensor.id];

  const handleRemove = async () => {
    if (window.confirm(`Are you sure you want to remove ${sensor.customName || sensor.sensorType}?`)) {
      await removeSensor(sensor.id);
      navigate('/sensors');
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation & Header */}
      <div>
        <Link
          to="/sensors"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sensors List
        </Link>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center font-mono font-black text-blue-700 text-lg">
              {sensor.sensorType}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {sensor.sensorType}
                </span>
                <span className="text-xs text-slate-400 font-semibold">• Controller Context: {sensor.controller}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                {sensor.customName || meta?.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {meta?.description}
              </p>
            </div>
          </div>

          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Remove Sensor
          </button>
        </div>
      </div>

      {/* Sensor Specs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="lab-card p-4">
          <span className="text-slate-400 font-semibold text-[10px] uppercase block">Associated Controller</span>
          <span className="font-mono font-bold text-slate-900 text-sm mt-1 block">{sensor.controller}</span>
        </div>
        <div className="lab-card p-4">
          <span className="text-slate-400 font-semibold text-[10px] uppercase block">Hardware Interface</span>
          <span className="font-mono font-bold text-slate-900 text-sm mt-1 block">{sensor.interface} ({sensor.pinAddress})</span>
        </div>
        <div className="lab-card p-4">
          <span className="text-slate-400 font-semibold text-[10px] uppercase block">Hardware Link Status</span>
          <span className="inline-flex items-center gap-1 font-bold text-emerald-700 text-xs mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Connected & Streaming
          </span>
        </div>
        <div className="lab-card p-4">
          <span className="text-slate-400 font-semibold text-[10px] uppercase block">Registered Date</span>
          <span className="font-mono text-xs font-semibold text-slate-700 mt-1 block">
            {new Date(sensor.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Live Metrics Card */}
      <ReadingCard sensor={sensor} latestReading={readingData?.latest} />

      {/* Dedicated Sensor Chart */}
      <ReadingChart sensor={sensor} history={readingData?.history} />
    </div>
  );
};

export default SensorDetailPage;
