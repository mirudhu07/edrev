const SENSOR_LIBRARY = [
  {
    type: "LM35",
    name: "LM35 Precision Centigrade Temperature Sensor",
    category: "Temperature",
    defaultInterface: "Analog",
    supportedInterfaces: ["Analog"],
    fields: [
      { key: "temperature", label: "Temperature", unit: "°C", min: 15, max: 50, step: 0.1 }
    ],
    description: "Analog precision temperature sensor calibrated directly in degrees Celsius with 10mV/°C scale factor."
  },
  {
    type: "SHTC3",
    name: "SHTC3 High-Precision Temp & Humidity Sensor",
    category: "Environmental",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C"],
    fields: [
      { key: "temperature", label: "Temperature", unit: "°C", min: 18, max: 45, step: 0.1 },
      { key: "humidity", label: "Humidity", unit: "%", min: 30, max: 90, step: 0.5 }
    ],
    description: "Ultra-low power digital sensor designed for ambient temperature and relative humidity sensing via I2C."
  },
  {
    type: "IR Sensor",
    name: "IR Infrared Obstacle Proximity Sensor",
    category: "Proximity / Optical",
    defaultInterface: "Digital",
    supportedInterfaces: ["Digital", "Analog"],
    fields: [
      { key: "detectionStatus", label: "Proximity Status", unit: "", isDiscrete: true, options: ["Clear", "Object Detected"] },
      { key: "proximityValue", label: "Digital Signal", unit: "RAW", min: 0, max: 1, step: 1 }
    ],
    description: "Infrared emitter-receiver pair for non-contact object detection and distance thresholds."
  },
  {
    type: "LM393 Photosensitive LDR",
    name: "LM393 Light Dependent Resistor (LDR) Module",
    category: "Light Intensity",
    defaultInterface: "Analog",
    supportedInterfaces: ["Analog", "Digital"],
    fields: [
      { key: "lightIntensity", label: "Light Intensity", unit: "%", min: 0, max: 100, step: 1 },
      { key: "digitalState", label: "Threshold Output", unit: "", isDiscrete: true, options: ["Dark", "Bright"] }
    ],
    description: "Photoresistor sensor module for ambient light detection and light threshold switching."
  },
  {
    type: "PIR Motion Sensor",
    name: "HC-SR501 Passive Infrared (PIR) Motion Sensor",
    category: "Motion Detection",
    defaultInterface: "Digital",
    supportedInterfaces: ["Digital"],
    fields: [
      { key: "motionStatus", label: "Motion Detection", unit: "", isDiscrete: true, options: ["No Motion", "Motion Detected"] },
      { key: "triggerCount", label: "Trigger Count", unit: "events", min: 0, max: 9999, step: 1 }
    ],
    description: "Pyroelectric motion sensor used to detect movement of infrared emitting bodies."
  },
  {
    type: "MQ-2",
    name: "MQ-2 Gas & Smoke Detection Sensor",
    category: "Gas & Air Quality",
    defaultInterface: "Analog",
    supportedInterfaces: ["Analog", "Digital"],
    fields: [
      { key: "gasLevel", label: "Gas / Smoke Level", unit: "ppm", min: 100, max: 2000, step: 5 },
      { key: "smokeStatus", label: "Safety Alert", unit: "", isDiscrete: true, options: ["Normal", "Smoke Detected!"] }
    ],
    description: "Semiconductor gas sensor suitable for detecting LPG, i-butane, propane, methane, alcohol, and smoke."
  },
  {
    type: "Flame Sensor",
    name: "Infrared Flame Detection Module",
    category: "Safety / Flame",
    defaultInterface: "Digital",
    supportedInterfaces: ["Digital", "Analog"],
    fields: [
      { key: "flameStatus", label: "Flame Status", unit: "", isDiscrete: true, options: ["Safe", "FLAME DETECTED"] },
      { key: "signalValue", label: "IR Signal Voltage", unit: "mV", min: 0, max: 3300, step: 10 }
    ],
    description: "Flame detector module sensitive to light wavelengths in the 760nm - 1100nm infrared spectrum."
  },
  {
    type: "MPU6050",
    name: "MPU6050 6-Axis Motion Tracking (Gyro + Accelerometer)",
    category: "Inertial / Motion",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C"],
    fields: [
      { key: "accelX", label: "Accel X", unit: "g", min: -2, max: 2, step: 0.01 },
      { key: "accelY", label: "Accel Y", unit: "g", min: -2, max: 2, step: 0.01 },
      { key: "accelZ", label: "Accel Z", unit: "g", min: -2, max: 2, step: 0.01 },
      { key: "gyroX", label: "Gyro X", unit: "°/s", min: -250, max: 250, step: 0.5 },
      { key: "gyroY", label: "Gyro Y", unit: "°/s", min: -250, max: 250, step: 0.5 },
      { key: "gyroZ", label: "Gyro Z", unit: "°/s", min: -250, max: 250, step: 0.5 }
    ],
    description: "Integrated 3-axis accelerometer and 3-axis gyroscope with on-chip Digital Motion Processor (DMP)."
  },
  {
    type: "BH1750",
    name: "BH1750 Ambient Light Intensity Sensor",
    category: "Optical / Light",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C"],
    fields: [
      { key: "ambientLight", label: "Ambient Light", unit: "lux", min: 1, max: 65535, step: 1 }
    ],
    description: "Digital 16-bit ambient light sensor with direct lux output via I2C interface."
  },
  {
    type: "BMP280",
    name: "BMP280 Barometric Pressure & Temp Sensor",
    category: "Atmospheric",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C", "SPI"],
    fields: [
      { key: "pressure", label: "Barometric Pressure", unit: "hPa", min: 900, max: 1100, step: 0.1 },
      { key: "temperature", label: "Temperature", unit: "°C", min: 15, max: 45, step: 0.1 }
    ],
    description: "Absolute barometric pressure and temperature sensor engineered for altitude tracking and weather stations."
  },
  {
    type: "SGP40",
    name: "SGP40 Indoor Air Quality VOC Sensor",
    category: "Gas & Air Quality",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C"],
    fields: [
      { key: "vocIndex", label: "VOC Air Quality Index", unit: "index", min: 1, max: 500, step: 1 },
      { key: "airQualityStatus", label: "Air Quality Rating", unit: "", isDiscrete: true, options: ["Excellent", "Good", "Moderate", "Unhealthy"] }
    ],
    description: "CMOSens VOC sensor for indoor air quality measurement producing a standardized VOC index signal."
  },
  {
    type: "Touch Sensor",
    name: "TTP223 Capacitive Touch Switch Module",
    category: "User Input",
    defaultInterface: "Digital",
    supportedInterfaces: ["Digital"],
    fields: [
      { key: "touchStatus", label: "Touch State", unit: "", isDiscrete: true, options: ["Released", "TOUCHED"] },
      { key: "touchCount", label: "Touch Count", unit: "taps", min: 0, max: 9999, step: 1 }
    ],
    description: "Capacitive touch switch module providing clean momentary or latched digital trigger signals."
  }
];

module.exports = SENSOR_LIBRARY;
