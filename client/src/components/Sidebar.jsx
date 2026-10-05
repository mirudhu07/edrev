import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cpu, 
  Layers, 
  Activity, 
  TestTube2, 
  History, 
  BarChart3, 
  ShieldCheck, 
  Radio, 
  Settings
} from 'lucide-react';
import { useLab } from '../context/LabContext';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/controllers', label: 'Controllers', icon: Cpu },
  { path: '/sensors', label: 'Sensors', icon: Layers },
  { path: '/live', label: 'Live Monitoring', icon: Activity },
  { path: '/experiments', label: 'Experiments', icon: TestTube2 },
  { path: '/history', label: 'Data History', icon: History },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/hardware', label: 'Hardware Status', icon: ShieldCheck },
  { path: '/communication', label: 'Communication', icon: Radio },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { selectedControllerId, connectedSensors } = useLab();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-slate-900 text-slate-300 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-slate-800 shadow-xl lg:shadow-none shrink-0
      `}>
        {/* Brand / Logo Section */}
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="ByteForge Logo" 
              className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-400/60 shadow-md shrink-0" 
            />
            <div>
              <h1 className="font-extrabold text-base text-white tracking-tight leading-tight">
                EduSense IoT
              </h1>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 mt-0.5">
                Powered by BYTEFORGE
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                Multi-MCU & Sensor Kit
              </p>
            </div>
          </div>

          {/* Controller Context Indicator Pill */}
          <div className="mx-4 my-4 p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
              <span>ACTIVE CONTEXT</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="font-bold text-white font-mono text-sm truncate">
              {selectedControllerId || "None Selected"}
            </div>
            <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
              {connectedSensors.length} Connected Sensor{connectedSensors.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'}
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono">
          <p className="font-semibold text-slate-400">EduSense Lab Platform v2.4</p>
          <p className="text-[10px] text-cyan-400/80 font-bold mt-0.5">BYTEFORGE LABS</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
