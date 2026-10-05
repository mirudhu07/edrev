import React, { useState } from 'react';
import { TestTube2, Play, Square, Download, Clock, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { useLab } from '../context/LabContext';

const ExperimentsPage = () => {
  const { selectedControllerId, connectedSensors, activeReadings } = useLab();
  const [recording, setRecording] = useState(false);
  const [samplesCount, setSamplesCount] = useState(0);
  const [experimentName, setExperimentName] = useState("Thermal & Atmospheric Run #1");
  const [experimentsLog, setExperimentsLog] = useState([
    {
      id: "exp-101",
      name: "ESP32 Ambient Telemetry Run",
      controller: "ESP32",
      sensorsCount: 3,
      duration: "05:00",
      samples: 100,
      timestamp: new Date(Date.now() - 3600000).toLocaleString(),
      status: "Completed"
    }
  ]);

  const toggleRecording = () => {
    if (!recording) {
      setRecording(true);
      setSamplesCount(0);
    } else {
      setRecording(false);
      const newExp = {
        id: `exp-${Date.now()}`,
        name: experimentName || "Hardware Experiment Run",
        controller: selectedControllerId || "Unconfigured",
        sensorsCount: connectedSensors.length,
        duration: "02:30",
        samples: samplesCount + 25,
        timestamp: new Date().toLocaleString(),
        status: "Completed"
      };
      setExperimentsLog(prev => [newExp, ...prev]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-700">
              {selectedControllerId || "No Controller"} Context
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Embedded Experimentation Suite
          </h2>
          <p className="text-xs text-slate-500">
            Record, capture, and export sensor telemetry runs for embedded systems education and lab reports.
          </p>
        </div>

        <button
          onClick={toggleRecording}
          disabled={!selectedControllerId || connectedSensors.length === 0}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
            recording
              ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {recording ? (
            <>
              <Square className="w-4 h-4 fill-current" />
              Stop Recording Experiment
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Start Experiment Recording
            </>
          )}
        </button>
      </div>

      {/* Active Run Status */}
      {recording && (
        <div className="lab-card p-6 border-2 border-rose-400 bg-rose-50/20 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-600 animate-ping" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">RECORDING IN PROGRESS</h4>
                <p className="text-xs text-slate-500 font-mono">
                  Capturing data streams for {connectedSensors.length} active sensor(s) on {selectedControllerId}...
                </p>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-2xl font-black text-slate-900">42</span>
              <span className="text-xs text-slate-500 block">Samples Captured</span>
            </div>
          </div>
        </div>
      )}

      {/* Logged Experiments Table */}
      <div className="lab-card p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <TestTube2 className="w-5 h-5 text-purple-600" />
          Experiment Telemetry Records
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <th className="pb-3">Experiment Name</th>
                <th className="pb-3">Controller Platform</th>
                <th className="pb-3">Sensors Included</th>
                <th className="pb-3">Samples Captured</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Export</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {experimentsLog.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50">
                  <td className="py-3 font-sans font-bold text-slate-900">{exp.name}</td>
                  <td className="py-3 text-blue-600 font-bold">{exp.controller}</td>
                  <td className="py-3 text-slate-700">{exp.sensorsCount} Sensors</td>
                  <td className="py-3 text-slate-800">{exp.samples} points</td>
                  <td className="py-3 text-slate-500">{exp.timestamp}</td>
                  <td className="py-3">
                    <button
                      onClick={() => alert(`Exporting JSON telemetry payload for ${exp.name}...`)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded font-sans flex items-center gap-1"
                    >
                      <Download className="w-3 h-3 text-slate-500" /> JSON
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExperimentsPage;
