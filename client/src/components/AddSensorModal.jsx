import React, { useState } from 'react';
import { Plus, X, Cpu, Layers, Radio, Hash, CheckCircle2 } from 'lucide-react';
import { useLab } from '../context/LabContext';
import { SENSOR_LIBRARY_DATA } from '../data/sensorLibrary';

const INTERFACE_OPTIONS = [
  "I2C",
  "SPI",
  "UART",
  "Digital",
  "Analog",
  "Wi-Fi",
  "Bluetooth"
];

const AddSensorModal = ({ isOpen, onClose }) => {
  const { selectedControllerId, addSensor } = useLab();
  
  const [sensorType, setSensorType] = useState("SHTC3");
  const [customName, setCustomName] = useState("");
  const [sensorInterface, setSensorInterface] = useState("I2C");
  const [pinAddress, setPinAddress] = useState("0x70");
  const [status, setStatus] = useState("connected");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const selectedMeta = SENSOR_LIBRARY_DATA.find(s => s.type === sensorType);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSensorType(newType);
    const meta = SENSOR_LIBRARY_DATA.find(s => s.type === newType);
    if (meta) {
      setSensorInterface(meta.defaultInterface);
      if (meta.defaultInterface === 'I2C') {
        setPinAddress(newType === 'SHTC3' ? '0x70' : newType === 'BH1750' ? '0x23' : newType === 'BMP280' ? '0x76' : '0x68');
      } else if (meta.defaultInterface === 'Analog') {
        setPinAddress('A0');
      } else if (meta.defaultInterface === 'Digital') {
        setPinAddress('GPIO 4');
      } else {
        setPinAddress('TX/RX');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedControllerId) {
      alert("Please select a controller before adding a sensor!");
      return;
    }

    setIsSubmitting(true);
    await addSensor({
      sensorType,
      customName: customName.trim() || selectedMeta?.name || `${sensorType} Sensor`,
      interface: sensorInterface,
      pinAddress: pinAddress.trim() || "Default Pin",
      status
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Add Sensor to Hardware Kit</h3>
              <p className="text-xs text-slate-300">
                Context: <strong className="text-cyan-400">{selectedControllerId || "No Controller Selected"}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Target Controller Badge */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Target Controller Platform:</span>
            </div>
            <strong className="font-bold text-blue-700 font-mono px-2 py-0.5 bg-white rounded border border-blue-300">
              {selectedControllerId}
            </strong>
          </div>

          {/* Sensor Type Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sensor Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={sensorType}
              onChange={handleTypeChange}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              {SENSOR_LIBRARY_DATA.map(sensor => (
                <option key={sensor.type} value={sensor.type}>
                  {sensor.type} — {sensor.name}
                </option>
              ))}
            </select>
            {selectedMeta && (
              <p className="text-xs text-slate-500 mt-1 italic">
                {selectedMeta.description}
              </p>
            )}
          </div>

          {/* Sensor Custom Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sensor Label / Custom Name
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={selectedMeta?.name || "e.g. SHTC3 Ambient Sensor"}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Interface & Pin Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hardware Interface <span className="text-rose-500">*</span>
              </label>
              <select
                value={sensorInterface}
                onChange={(e) => setSensorInterface(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
              >
                {INTERFACE_OPTIONS.map(iface => (
                  <option key={iface} value={iface}>{iface}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Pin / I2C Address
              </label>
              <input
                type="text"
                value={pinAddress}
                onChange={(e) => setPinAddress(e.target.value)}
                placeholder="e.g. 0x70, A0, GPIO 4"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Initial Hardware Status
            </label>
            <div className="flex gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="radio"
                  name="status"
                  value="connected"
                  checked={status === "connected"}
                  onChange={() => setStatus("connected")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="radio"
                  name="status"
                  value="configured"
                  checked={status === "configured"}
                  onChange={() => setStatus("configured")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-600">Configured (Standby)</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {isSubmitting ? "Adding Sensor..." : `Add Sensor to ${selectedControllerId}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSensorModal;
