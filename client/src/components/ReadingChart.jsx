import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SENSOR_LIBRARY_DATA } from '../data/sensorLibrary';

const COLOR_PALETTE = [
  { stroke: "#2563eb", fill: "#3b82f6" }, // Blue
  { stroke: "#06b6d4", fill: "#22d3ee" }, // Cyan
  { stroke: "#10b981", fill: "#34d399" }, // Emerald
  { stroke: "#8b5cf6", fill: "#a78bfa" }, // Purple
  { stroke: "#f59e0b", fill: "#fbbf24" }, // Amber
  { stroke: "#f43f5e", fill: "#fb7185" }, // Rose
];

const ReadingChart = ({ sensor, history }) => {
  const meta = SENSOR_LIBRARY_DATA.find(s => s.type === sensor.sensorType);

  if (!meta || !history || history.length === 0) {
    return (
      <div className="lab-card p-6 text-center text-slate-400 text-sm">
        Waiting for telemetry stream from {sensor.customName || sensor.sensorType}...
      </div>
    );
  }

  // Format data for Recharts
  const chartData = history.map((rdg, idx) => {
    const timeStr = new Date(rdg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const row = { time: timeStr, index: idx };
    meta.fields.forEach(field => {
      if (!field.isDiscrete) {
        row[field.key] = rdg.values[field.key] ?? 0;
      }
    });
    return row;
  });

  const numericFields = meta.fields.filter(f => !f.isDiscrete);

  if (numericFields.length === 0) {
    return (
      <div className="lab-card p-5 text-center text-slate-500 text-xs font-mono">
        {sensor.sensorType} produces discrete binary events ({meta.fields[0]?.options?.join(' / ')}). Visualized in Live Telemetry feed.
      </div>
    );
  }

  return (
    <div className="lab-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {sensor.sensorType} Telemetry History
          </span>
          <h4 className="text-sm font-bold text-slate-900 mt-1">
            {sensor.customName || meta.name} — Realtime Stream
          </h4>
        </div>
        <div className="flex items-center gap-3">
          {numericFields.map((field, idx) => (
            <div key={field.key} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLOR_PALETTE[idx % COLOR_PALETTE.length].stroke }}
              />
              <span>{field.label} ({field.unit})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {numericFields.map((field, idx) => {
                const color = COLOR_PALETTE[idx % COLOR_PALETTE.length];
                return (
                  <linearGradient key={field.key} id={`grad-${sensor.id}-${field.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color.fill} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color.fill} stopOpacity={0.0} />
                  </linearGradient>
                );
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 10 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#38bdf8' }}
            />
            {numericFields.map((field, idx) => {
              const color = COLOR_PALETTE[idx % COLOR_PALETTE.length];
              return (
                <Area
                  key={field.key}
                  type="monotone"
                  dataKey={field.key}
                  name={`${field.label} (${field.unit})`}
                  stroke={color.stroke}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#grad-${sensor.id}-${field.key})`}
                  isAnimationActive={false}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReadingChart;
