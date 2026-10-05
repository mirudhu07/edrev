export const SENSOR_LIBRARY_DATA = [
  {
    type: "LM35",
    name: "LM35 Precision Centigrade Temperature Sensor",
    category: "Temperature",
    defaultInterface: "Analog",
    supportedInterfaces: ["Analog"],
    fields: [
      { key: "temperature", label: "Temperature", unit: "°C", min: 15, max: 50 }
    ],
    description: "Analog precision temperature sensor with direct linear voltage output (10mV/°C)."
  },
  {
    type: "SHTC3",
    name: "SHTC3 Digital Humidity & Temperature Sensor",
    category: "Environmental",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C"],
    fields: [
      { key: "temperature", label: "Temperature", unit: "°C", min: 18, max: 45 },
      { key: "humidity", label: "Humidity", unit: "%", min: 30, max: 90 }
    ],
    description: "Digital sensor designed for ambient temperature and relative humidity sensing via I2C."
  },
  {
    type: "IR Sensor",
    name: "IR Infrared Obstacle Sensor",
    category: "Proximity",
    defaultInterface: "Digital",
    supportedInterfaces: ["Digital", "Analog"],
    fields: [
      { key: "detectionStatus", label: "Proximity Status", unit: "", isDiscrete: true, options: ["Clear", "Object Detected"] },
      { key: "proximityValue", label: "Digital Signal", unit: "RAW", min: 0, max: 1 }
    ],
    description: "Infrared emitter-receiver pair for non-contact object detection."
  },
  {
    type: "LM393 Photosensitive LDR",
    name: "LM393 Photosensitive LDR Module",
    category: "Light",
    defaultInterface: "Analog",
    supportedInterfaces: ["Analog", "Digital"],
    fields: [
      { key: "lightIntensity", label: "Light Level", unit: "%", min: 0, max: 100 },
      { key: "digitalState", label: "Threshold Output", unit: "", isDiscrete: true, options: ["Dark", "Bright"] }
    ],
    description: "Photoresistor sensor module for ambient light detection."
  },
  {
    type: "PIR Motion Sensor",
    name: "PIR Passive Infrared Motion Sensor",
    category: "Motion",
    defaultInterface: "Digital",
    supportedInterfaces: ["Digital"],
    fields: [
      { key: "motionStatus", label: "Motion Status", unit: "", isDiscrete: true, options: ["No Motion", "Motion Detected"] },
      { key: "triggerCount", label: "Event Count", unit: "events", min: 0, max: 9999 }
    ],
    description: "Pyroelectric motion sensor used to detect movement of thermal bodies."
  },
  {
    type: "MQ-2",
    name: "MQ-2 Gas / Smoke Sensor",
    category: "Gas & Air Quality",
    defaultInterface: "Analog",
    supportedInterfaces: ["Analog", "Digital"],
    fields: [
      { key: "gasLevel", label: "Gas Level", unit: "ppm", min: 100, max: 2000 },
      { key: "smokeStatus", label: "Safety Alert", unit: "", isDiscrete: true, options: ["Normal", "Gas Detected!"] }
    ],
    description: "Semiconductor sensor for LPG, Smoke, Methane, and Propane detection."
  },
  {
    type: "Flame Sensor",
    name: "Infrared Flame Detection Sensor",
    category: "Safety",
    defaultInterface: "Digital",
    supportedInterfaces: ["Digital", "Analog"],
    fields: [
      { key: "flameStatus", label: "Flame Status", unit: "", isDiscrete: true, options: ["Safe", "FLAME DETECTED"] },
      { key: "signalValue", label: "Signal Level", unit: "mV", min: 0, max: 3300 }
    ],
    description: "Flame detector module sensitive to IR light wavelengths from fire sources."
  },
  {
    type: "MPU6050",
    name: "MPU6050 Accelerometer & Gyroscope",
    category: "Motion / Inertial",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C"],
    fields: [
      { key: "accelX", label: "Accel X", unit: "g", min: -2, max: 2 },
      { key: "accelY", label: "Accel Y", unit: "g", min: -2, max: 2 },
      { key: "accelZ", label: "Accel Z", unit: "g", min: -2, max: 2 },
      { key: "gyroX", label: "Gyro X", unit: "°/s", min: -250, max: 250 },
      { key: "gyroY", label: "Gyro Y", unit: "°/s", min: -250, max: 250 },
      { key: "gyroZ", label: "Gyro Z", unit: "°/s", min: -250, max: 250 }
    ],
    description: "Integrated 6-axis motion tracking sensor with 3D Accelerometer and Gyroscope."
  },
  {
    type: "BH1750",
    name: "BH1750 Ambient Light Sensor",
    category: "Optical",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C"],
    fields: [
      { key: "ambientLight", label: "Ambient Light", unit: "lux", min: 1, max: 65535 }
    ],
    description: "16-bit digital ambient light sensor with direct lux conversion."
  },
  {
    type: "BMP280",
    name: "BMP280 Barometric Pressure & Temp",
    category: "Atmospheric",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C", "SPI"],
    fields: [
      { key: "pressure", label: "Barometric Pressure", unit: "hPa", min: 900, max: 1100 },
      { key: "temperature", label: "Temperature", unit: "°C", min: 15, max: 45 }
    ],
    description: "Barometric pressure and ambient temperature sensor module."
  },
  {
    type: "SGP40",
    name: "SGP40 VOC Indoor Air Quality Sensor",
    category: "Gas & Air Quality",
    defaultInterface: "I2C",
    supportedInterfaces: ["I2C"],
    fields: [
      { key: "vocIndex", label: "VOC Air Quality Index", unit: "index", min: 1, max: 500 },
      { key: "airQualityStatus", label: "Air Quality Rating", unit: "", isDiscrete: true, options: ["Excellent", "Good", "Moderate", "Unhealthy"] }
    ],
    description: "Digital VOC index sensor for indoor air quality assessment."
  },
  {
    type: "Touch Sensor",
    name: "Capacitive Touch Switch Sensor",
    category: "User Input",
    defaultInterface: "Digital",
    supportedInterfaces: ["Digital"],
    fields: [
      { key: "touchStatus", label: "Touch State", unit: "", isDiscrete: true, options: ["Released", "TOUCHED"] },
      { key: "touchCount", label: "Touch Taps", unit: "taps", min: 0, max: 9999 }
    ],
    description: "Capacitive touch detector providing clean digital trigger signals."
  }
];
