import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { CONTROLLERS_DATA } from '../data/controllerLibrary';
import { SENSOR_LIBRARY_DATA } from '../data/sensorLibrary';

const LabContext = createContext(null);

export const LabProvider = ({ children }) => {
  // Central State
  const [selectedControllerId, setSelectedControllerId] = useState("ESP32");
  
  // Sensors associated strictly with controllers
  // Default configured state: ESP32 has SHTC3, BH1750, BMP280; Arduino Nano has LM35
  const [configuredSensors, setConfiguredSensors] = useState([
    {
      id: "sensor-esp32-shtc3",
      controller: "ESP32",
      sensorType: "SHTC3",
      customName: "SHTC3 Temp & Humidity",
      interface: "I2C",
      pinAddress: "0x70",
      status: "connected",
      createdAt: new Date().toISOString()
    },
    {
      id: "sensor-esp32-bh1750",
      controller: "ESP32",
      sensorType: "BH1750",
      customName: "BH1750 Ambient Light",
      interface: "I2C",
      pinAddress: "0x23",
      status: "connected",
      createdAt: new Date().toISOString()
    },
    {
      id: "sensor-esp32-bmp280",
      controller: "ESP32",
      sensorType: "BMP280",
      customName: "BMP280 Barometer",
      interface: "I2C",
      pinAddress: "0x76",
      status: "connected",
      createdAt: new Date().toISOString()
    },
    {
      id: "sensor-nano-lm35",
      controller: "Arduino Nano",
      sensorType: "LM35",
      customName: "LM35 Temperature Sensor",
      interface: "Analog",
      pinAddress: "A0",
      status: "connected",
      createdAt: new Date().toISOString()
    }
  ]);

  // Readings map: sensorId -> { history: [...], latest: {...} }
  const [sensorReadings, setSensorReadings] = useState({});
  const [demoMode, setDemoMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [error, setError] = useState(null);

  // Active controller object
  const selectedController = useMemo(() => {
    if (!selectedControllerId) return null;
    return CONTROLLERS_DATA.find(c => c.id === selectedControllerId) || null;
  }, [selectedControllerId]);

  // Active connected sensors strictly belonging to the currently selected controller
  const connectedSensors = useMemo(() => {
    if (!selectedControllerId) return [];
    return configuredSensors.filter(s => s.controller === selectedControllerId);
  }, [configuredSensors, selectedControllerId]);

  // Generate simulated reading for a sensor
  const generateSimulatedReading = useCallback((sensorConfig) => {
    const meta = SENSOR_LIBRARY_DATA.find(s => s.type === sensorConfig.sensorType);
    if (!meta) return null;

    const values = {};
    meta.fields.forEach(field => {
      if (field.isDiscrete) {
        const opts = field.options;
        values[field.key] = opts[Math.floor(Math.random() * opts.length)];
      } else {
        const mid = (field.min + field.max) / 2;
        const currentEntry = sensorReadings[sensorConfig.id];
        const lastVal = currentEntry?.latest?.values?.[field.key] ?? mid;
        
        const delta = (Math.random() - 0.48) * (sensorConfig.sensorType === 'MPU6050' ? 0.05 : 0.8);
        let val = Math.max(field.min, Math.min(field.max, lastVal + delta));
        values[field.key] = Number(val.toFixed(field.max > 500 ? 0 : 2));
      }
    });

    return {
      id: `rdg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sensorId: sensorConfig.id,
      controller: sensorConfig.controller,
      sensorType: sensorConfig.sensorType,
      timestamp: new Date().toISOString(),
      values
    };
  }, [sensorReadings]);

  // Seed initial readings for a newly configured sensor
  const seedSensorHistory = useCallback((sensorConfig) => {
    const meta = SENSOR_LIBRARY_DATA.find(s => s.type === sensorConfig.sensorType);
    if (!meta) return;

    const history = [];
    const now = Date.now();
    for (let i = 15; i >= 0; i--) {
      const timeISO = new Date(now - i * 4000).toISOString();
      const values = {};
      meta.fields.forEach(field => {
        if (field.isDiscrete) {
          values[field.key] = field.options[0];
        } else {
          const mid = (field.min + field.max) / 2;
          const noise = (Math.sin(i / 2) * (field.max - field.min) * 0.05);
          values[field.key] = Number((mid + noise).toFixed(field.max > 500 ? 0 : 2));
        }
      });
      history.push({
        id: `rdg-seed-${sensorConfig.id}-${i}`,
        sensorId: sensorConfig.id,
        controller: sensorConfig.controller,
        sensorType: sensorConfig.sensorType,
        timestamp: timeISO,
        values
      });
    }

    setSensorReadings(prev => ({
      ...prev,
      [sensorConfig.id]: {
        latest: history[history.length - 1],
        history
      }
    }));
  }, []);

  // Sync / Seed readings on initial load or sensor addition
  useEffect(() => {
    configuredSensors.forEach(sensor => {
      if (!sensorReadings[sensor.id]) {
        seedSensorHistory(sensor);
      }
    });
  }, [configuredSensors, seedSensorHistory, sensorReadings]);

  // Live simulation tick (runs every 3s)
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      // DEMO MODE RULE:
      // Generate readings ONLY for configured sensors belonging to the SELECTED CONTROLLER
      setConfiguredSensors(prevSensors => {
        setSensorReadings(prevReadings => {
          const updated = { ...prevReadings };
          prevSensors.forEach(sensor => {
            const rdg = generateSimulatedReading(sensor);
            if (rdg) {
              const existing = updated[sensor.id]?.history || [];
              const newHistory = [...existing, rdg].slice(-25); // keep last 25 readings
              updated[sensor.id] = {
                latest: rdg,
                history: newHistory
              };
            }
          });
          return updated;
        });
        return prevSensors;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [demoMode, generateSimulatedReading]);

  // Backend Sync (polls REST API if server is up)
  const fetchBackendData = useCallback(async () => {
    try {
      const res = await fetch("/api/controllers");
      if (res.ok) {
        setBackendConnected(true);
        setError(null);
      }
    } catch (err) {
      setBackendConnected(false);
    }
  }, []);

  useEffect(() => {
    fetchBackendData();
  }, [fetchBackendData]);

  // Actions
  const selectController = (controllerId) => {
    setSelectedControllerId(controllerId);
    if (backendConnected && controllerId) {
      fetch("/api/controllers/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ controllerId })
      }).catch(() => {});
    }
  };

  const addSensor = async ({ sensorType, customName, interface: sensorInterface, pinAddress }) => {
    if (!selectedControllerId) {
      alert("Please select a controller first!");
      return null;
    }

    const libraryMeta = SENSOR_LIBRARY_DATA.find(s => s.type === sensorType);
    const newSensor = {
      id: `sensor-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      controller: selectedControllerId,
      sensorType,
      customName: customName || libraryMeta?.name || `${sensorType} Sensor`,
      interface: sensorInterface || libraryMeta?.defaultInterface || "I2C",
      pinAddress: pinAddress || "Default Pin",
      status: "connected",
      createdAt: new Date().toISOString()
    };

    setConfiguredSensors(prev => [...prev, newSensor]);
    seedSensorHistory(newSensor);

    if (backendConnected) {
      try {
        await fetch(`/api/controllers/${encodeURIComponent(selectedControllerId)}/sensors`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sensorType,
            customName: newSensor.customName,
            interface: newSensor.interface,
            pinAddress: newSensor.pinAddress
          })
        });
      } catch (err) {
        console.warn("Backend add sync warning:", err);
      }
    }

    return newSensor;
  };

  const removeSensor = async (sensorId) => {
    // 1. Remove from configuredSensors
    setConfiguredSensors(prev => prev.filter(s => s.id !== sensorId));

    // 2. Immediately remove its live reading entry & card state
    setSensorReadings(prev => {
      const copy = { ...prev };
      delete copy[sensorId];
      return copy;
    });

    if (backendConnected) {
      try {
        await fetch(`/api/sensors/${sensorId}`, { method: "DELETE" });
      } catch (err) {
        console.warn("Backend remove sync warning:", err);
      }
    }
  };

  // Filtered readings strictly for the CURRENTLY SELECTED CONTROLLER
  const activeReadings = useMemo(() => {
    if (!selectedControllerId) return [];
    
    // STRICT DATA VISIBILITY RULE:
    // Only return data where reading belongs to selectedController AND sensorId is in connectedSensors
    return connectedSensors.map(sensor => {
      const readingData = sensorReadings[sensor.id];
      return {
        sensor,
        latestReading: readingData?.latest || null,
        history: readingData?.history || []
      };
    });
  }, [selectedControllerId, connectedSensors, sensorReadings]);

  const value = {
    selectedControllerId,
    selectedController,
    controllers: CONTROLLERS_DATA,
    configuredSensors,
    connectedSensors, // Sensors for current controller ONLY
    activeReadings, // Readings for current controller ONLY
    sensorReadings,
    demoMode,
    backendConnected,
    loading,
    error,
    selectController,
    addSensor,
    removeSensor,
    setDemoMode,
    toggleDemoMode: () => setDemoMode(prev => !prev),
    refreshData: fetchBackendData
  };

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>;
};

export const useLab = () => {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error("useLab must be used within a LabProvider");
  }
  return context;
};
