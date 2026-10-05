import React from 'react';
import { Layers, Cpu, Trash2, ExternalLink, Activity, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SENSOR_LIBRARY_DATA } from '../data/sensorLibrary';

const SensorCard = ({ sensor, latestReading, onRemove }) => {
  const meta = SENSOR_LIBRARY_DATA.find(s => s.type === sensor.sensorType);
  const values = latestReading?.values || {};

  const timeFormatted = latestReading?.timestamp
    ? new Date(latestReading.timestamp).toLocaleTimeString()
    : 'Just now';

  return (
    <div className="lab-card p-5 flex flex-col justify-between hover:border-blue-400 transition-all group">
      <div>
        {/* Top bar */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              {sensor.sensorType}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1.5 group-hover:text-blue-600 transition-colors">
              {sensor.customName || meta?.name || `${sensor.sensorType} Sensor`}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {sensor.status}
          </span>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80 mb-4">
          <div>
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Controller</span>
            <span className="font-mono font-bold text-slate-800">{sensor.controller}</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Interface</span>
            <span className="font-mono font-bold text-slate-800">{sensor.interface} ({sensor.pinAddress})</span>
          </div>
        </div>

        {/* Latest Reading Highlights */}
        {meta && (
          <div className="space-y-1.5 mb-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Latest Live Values
            </span>
            <div className="flex flex-wrap gap-2">
              {meta.fields.map(field => {
                const val = values[field.key];
                return (
                  <div key={field.key} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs flex items-center gap-1.5 font-mono shadow-2xs">
                    <span className="text-slate-500 font-medium">{field.label}:</span>
                    <span className="font-bold text-slate-900">
                      {val !== undefined && val !== null ? String(val) : '--'}
                    </span>
                    {field.unit && <span className="text-[10px] text-slate-400">{field.unit}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer & Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{timeFormatted}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/sensors/${sensor.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Details
          </Link>
          <button
            onClick={() => onRemove(sensor)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg transition-colors border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
