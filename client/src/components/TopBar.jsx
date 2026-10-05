import React from 'react';
import { Menu, Plus, Sparkles } from 'lucide-react';
import ControllerSelector from './ControllerSelector';
import DemoModeBadge from './DemoModeBadge';
import { useLab } from '../context/LabContext';

const TopBar = ({ onToggleSidebar, onOpenAddSensor }) => {
  const { selectedControllerId } = useLab();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile menu & App Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="ByteForge" 
              className="w-9 h-9 rounded-lg object-cover border border-cyan-400 shadow-sm hidden sm:block" 
            />
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                EduSense IoT
              </h2>
              <p className="text-xs text-slate-500 hidden sm:block font-medium">
                Multi-MCU & Sensor Embedded Kit
              </p>
            </div>
          </div>
        </div>

        {/* Center: Team Name BYTEFORGE (Placed in center before controller selection & demo mode) */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-cyan-500/40 rounded-full shadow-sm">
            <img 
              src="/logo.jpg" 
              alt="ByteForge Logo" 
              className="w-5 h-5 rounded-full object-cover border border-cyan-400" 
            />
            <span className="text-xs font-black tracking-widest uppercase bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-200 bg-clip-text text-transparent">
              BYTEFORGE
            </span>
          </div>
        </div>

        {/* Right: Switch to Demo, Controller Selector & Actions */}
        <div className="flex items-center gap-3">
          <DemoModeBadge showToggle={true} />

          <ControllerSelector size="normal" />

          {selectedControllerId && (
            <button
              onClick={onOpenAddSensor}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">+ Add Sensor</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
