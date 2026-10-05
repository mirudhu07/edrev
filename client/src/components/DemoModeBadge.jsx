import React from 'react';
import { Sparkles, Activity } from 'lucide-react';
import { useLab } from '../context/LabContext';

const DemoModeBadge = ({ showToggle = false, className = "" }) => {
  const { demoMode, toggleDemoMode } = useLab();

  if (!demoMode && !showToggle) return null;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {demoMode ? (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-700 font-mono text-xs font-semibold rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>DEMO MODE</span>
          <span className="text-[10px] text-amber-600/80 uppercase font-bold tracking-wider">(Simulated)</span>
        </div>
      ) : (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 font-mono text-xs font-semibold rounded-full shadow-sm">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>LIVE HARDWARE</span>
        </div>
      )}

      {showToggle && (
        <button
          onClick={toggleDemoMode}
          className="text-xs text-slate-500 hover:text-slate-800 underline font-medium transition-colors"
          title="Toggle between Live Hardware Telemetry and Simulated Demo Mode"
        >
          {demoMode ? "Switch to Hardware" : "Switch to Demo"}
        </button>
      )}
    </div>
  );
};

export default DemoModeBadge;
