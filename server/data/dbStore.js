const CONTROLLERS = require("./controllers");
const SENSOR_LIBRARY = require("./sensors");

// Initial configured state
let selectedControllerId = "ESP32"; // default selected context

// Sensors associated strictly with controllers
let configuredSensors = [
  {
    id: "sensor-esp32-shtc3",
    controller: "ESP32",
    sensorType: "SHTC3",
    customName: "SHTC3 Temp & Humidity",
    interface: "I2C",
    pinAddress: "0x70",
    status: "connected",
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "sensor-esp32-bh1750",
    controller: "ESP32",
    sensorType: "BH1750",
    customName: "BH1750 Ambient Light",
    interface: "I2C",
    pinAddress: "0x23",
    status: "connected",
    createdAt: new Date(Date.now() - 2400000).toISOString()
  },
  {
    id: "sensor-esp32-bmp280",
    controller: "ESP32",
    sensorType: "BMP280",
    customName: "BMP280 Barometer",
    interface: "I2C",
    pinAddress: "0x76",
    status: "connected",
    createdAt: new Date(Date.now() - 1200000).toISOString()
  },
  {
    id: "sensor-nano-lm35",
    controller: "Arduino Nano",
    sensorType: "LM35",
    customName: "LM35 Temperature Sensor",
    interface: "Analog",
    pinAddress: "A0",
    status: "connected",
    createdAt: new Date(Date.now() - 5000000).toISOString()
  }
];

// Historical readings store: maps sensorId -> Array of readings
let sensorReadingsMap = {};

// Helper to generate a reading for a sensor
function generateReading(sensorConfig) {
  const meta = SENSOR_LIBRARY.find(s => s.type === sensorConfig.sensorType);
  if (!meta) return null;

  const now = new Date();
  const timestamp = now.toISOString();
  const values = {};

  meta.fields.forEach(field => {
    if (field.isDiscrete) {
      // Pick random option or maintain state
      const opts = field.options;
      values[field.key] = opts[Math.floor(Math.random() * opts.length)];
    } else {
      // Generate realistic continuous reading with small random fluctuation
      const base = (field.min + field.max) / 2;
      const range = (field.max - field.min) * 0.15;
      const prevReadings = sensorReadingsMap[sensorConfig.id] || [];
      let prevVal = prevReadings.length > 0 ? prevReadings[prevReadings.length - 1].values[field.key] : base;
      
      if (typeof prevVal !== 'number') prevVal = base;

      let delta = (Math.random() - 0.48) * (field.step * 3);
      let newVal = Math.max(field.min, Math.min(field.max, prevVal + delta));
      values[field.key] = Number(newVal.toFixed(field.step < 1 ? 2 : 0));
    }
  });

  return {
    id: `rdg-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    sensorId: sensorConfig.id,
    controller: sensorConfig.controller,
    sensorType: sensorConfig.sensorType,
    timestamp,
    values
  };
}

// Seed initial history (15 data points each for configured sensors)
function seedInitialReadings() {
  configuredSensors.forEach(sensor => {
    sensorReadingsMap[sensor.id] = [];
    const baseTime = Date.now() - 15 * 5000;
    for (let i = 0; i < 15; i++) {
      const meta = SENSOR_LIBRARY.find(s => s.type === sensor.sensorType);
      const timeISO = new Date(baseTime + i * 5000).toISOString();
      const values = {};
      if (meta) {
        meta.fields.forEach(field => {
          if (field.isDiscrete) {
            values[field.key] = field.options[0];
          } else {
            const mid = (field.min + field.max) / 2;
            const variation = (Math.sin(i / 2) * (field.max - field.min) * 0.05);
            values[field.key] = Number((mid + variation).toFixed(field.step < 1 ? 2 : 0));
          }
        });
      }
      sensorReadingsMap[sensor.id].push({
        id: `rdg-seed-${sensor.id}-${i}`,
        sensorId: sensor.id,
        controller: sensor.controller,
        sensorType: sensor.sensorType,
        timestamp: timeISO,
        values
      });
    }
  });
}

seedInitialReadings();

// Periodic generator: generates live readings ONLY for configured sensors
setInterval(() => {
  configuredSensors.forEach(sensor => {
    const rdg = generateReading(sensor);
    if (rdg) {
      if (!sensorReadingsMap[sensor.id]) {
        sensorReadingsMap[sensor.id] = [];
      }
      sensorReadingsMap[sensor.id].push(rdg);
      // Keep last 100 readings max
      if (sensorReadingsMap[sensor.id].length > 100) {
        sensorReadingsMap[sensor.id].shift();
      }
    }
  });
}, 3000);

module.exports = {
  getControllers: () => CONTROLLERS,
  getSensorLibrary: () => SENSOR_LIBRARY,
  getSelectedControllerId: () => selectedControllerId,
  setSelectedControllerId: (id) => { selectedControllerId = id; },
  getConfiguredSensors: (controllerFilter = null) => {
    if (!controllerFilter) return configuredSensors;
    return configuredSensors.filter(s => s.controller === controllerFilter);
  },
  addConfiguredSensor: (sensorData) => {
    const newSensor = {
      id: `sensor-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      controller: sensorData.controller,
      sensorType: sensorData.sensorType,
      customName: sensorData.customName || `${sensorData.sensorType} Sensor`,
      interface: sensorData.interface || "I2C",
      pinAddress: sensorData.pinAddress || "Default Pin",
      status: "connected",
      createdAt: new Date().toISOString()
    };
    configuredSensors.push(newSensor);
    
    // Seed initial reading immediately
    const initialRdg = generateReading(newSensor);
    if (initialRdg) {
      sensorReadingsMap[newSensor.id] = [initialRdg];
    }
    return newSensor;
  },
  removeConfiguredSensor: (sensorId) => {
    const index = configuredSensors.findIndex(s => s.id === sensorId);
    if (index !== -1) {
      const removed = configuredSensors.splice(index, 1)[0];
      delete sensorReadingsMap[sensorId];
      return removed;
    }
    return null;
  },
  getReadingsForSensor: (sensorId) => {
    return sensorReadingsMap[sensorId] || [];
  },
  getReadingsForController: (controllerId) => {
    // STRICT DATA VISIBILITY RULE:
    // Only return readings where reading.controller === controllerId
    // AND reading.sensorId belongs to configuredSensors of that controller!
    const controllerSensors = configuredSensors.filter(s => s.controller === controllerId);
    const validSensorIds = new Set(controllerSensors.map(s => s.id));

    const result = [];
    Object.keys(sensorReadingsMap).forEach(sId => {
      if (validSensorIds.has(sId)) {
        const readings = sensorReadingsMap[sId];
        if (readings && readings.length > 0) {
          result.push({
            sensorId: sId,
            sensorConfig: controllerSensors.find(s => s.id === sId),
            latestReading: readings[readings.length - 1],
            history: readings.slice(-20)
          });
        }
      }
    });
    return result;
  }
};
