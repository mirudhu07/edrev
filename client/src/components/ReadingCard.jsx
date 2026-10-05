import React from 'react';
import { Activity, Thermometer, Droplets, Eye, Sun, Flame, Wind, Compass, Gauge, TouchpadIcon, ShieldAlert, Cpu } from 'lucide-react';
import { SENSOR_LIBRARY_DATA } from '../data/sensorLibrary';

// Helper to choose crisp icon by field key or sensor type
const getFieldIcon = (sensorType, fieldKey) => {
  if (fieldKey.includes('temp')) return <Thermometer className="w-5 h-5 text-rose-500" />;
  if (fieldKey.includes('humidity')) return <Droplets className="w-5 h-5 text-blue-500" />;
  if (fieldKey.includes('light') || fieldKey.includes('ambient')) return <Sun className="w-5 h-5 text-amber-500" />;
  if (fieldKey.includes('pressure')) return <Gauge className="w-5 h-5 text-indigo-500" />;
  if (fieldKey.includes('flame')) return <Flame className="w-5 h-5 text-rose-600" />;
  if (fieldKey.includes('gas') || fieldKey.includes('voc') || fieldKey.includes('air')) return <Wind className="w-5 h-5 text-teal-500" />;
  if (fieldKey.includes('motion') || fieldKey.includes('detection')) return <Eye className="w-5 h-5 text-purple-500" />;
  if (fieldKey.includes('accel') || fieldKey.includes('gyro')) return <Compass className="w-5 h-5 text-cyan-500" />;
  if (fieldKey.includes('touch')) return <TouchpadIcon className="w-5 h-5 text-emerald-500" />;
  return <Activity className="w-5 h-5 text-blue-500" />;
};

const ReadingCard = ({ sensor, latestReading }) => {
  const meta = SENSOR_LIBRARY_DATA.find(s => s.type === sensor.sensorType);

  if (!meta) return null;

  const values = latestReading?.values || {};

  return (
    <div className="lab-card p-5 hover:border-blue-300 transition-all">
      {/* Sensor Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            {getFieldIcon(sensor.sensorType, meta.fields[0]?.key || '')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                {sensor.sensorType}
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                {sensor.interface} ({sensor.pinAddress})
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mt-0.5">
              {sensor.customName || meta.name}
            </h4>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {/* Sensor Values Display Grid */}
      <div className={`grid ${meta.fields.length > 2 ? 'grid-cols-2 md:grid-cols-3' : meta.fields.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
        {meta.fields.map(field => {
          const rawVal = values[field.key];
          const isBoolOrDiscrete = field.isDiscrete || typeof rawVal === 'string';

          return (
            <div key={field.key} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold">{field.label}</span>
                {getFieldIcon(sensor.sensorType, field.key)}
              </div>

              {isBoolOrDiscrete ? (
                <div className="mt-1">
                  <span className={`inline-block font-bold text-sm px-2.5 py-1 rounded-lg ${
                    String(rawVal).toLowerCase().includes('detect') || String(rawVal).toLowerCase().includes('touch') || String(rawVal).toLowerCase().includes('bright')
                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {rawVal !== undefined && rawVal !== null ? String(rawVal) : 'Waiting...'}
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                    {rawVal !== undefined && rawVal !== null ? rawVal : '--'}
                  </span>
                  {field.unit && (
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      {field.unit}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingCard;
