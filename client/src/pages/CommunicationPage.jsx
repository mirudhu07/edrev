import React from 'react';
import { Radio, Wifi, Bluetooth, Cable, Cpu, CheckCircle2 } from 'lucide-react';
import { useLab } from '../context/LabContext';

const CommunicationPage = () => {
  const { selectedController, connectedSensors } = useLab();

  const activeInterfaces = selectedController
    ? [...new Set(connectedSensors.map(s => s.interface))]
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Communication & Interface Bus Protocol</h2>
            <p className="text-xs text-slate-500">
              Hardware communication channels active for <strong className="text-cyan-700 font-mono">{selectedController?.name || "Unconfigured"}</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {["I2C", "SPI", "UART", "Digital", "Analog", "Wi-Fi", "Bluetooth"].map((iface) => {
          const isSupportedByController = selectedController?.interfaces?.includes(iface);
          const isUsedByConnectedSensor = activeInterfaces.includes(iface);

          return (
            <div
              key={iface}
              className={`lab-card p-5 space-y-3 ${
                isUsedByConnectedSensor
                  ? 'border-2 border-cyan-500 bg-cyan-50/10'
                  : isSupportedByController
                  ? 'border-slate-200 bg-white'
                  : 'opacity-50 border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                  {iface} Interface
                </span>
                {isUsedByConnectedSensor && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-100 text-cyan-800 border border-cyan-300">
                    ACTIVE IN USE
                  </span>
                )}
              </div>

              <div className="text-xs space-y-1 text-slate-600">
                <p>
                  Controller Support: <strong className={isSupportedByController ? 'text-emerald-600' : 'text-slate-400'}>
                    {isSupportedByController ? "Supported" : "Not Native"}
                  </strong>
                </p>
                <p>
                  Connected Sensors using {iface}: <strong className="text-slate-900 font-mono">
                    {connectedSensors.filter(s => s.interface === iface).length}
                  </strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunicationPage;
