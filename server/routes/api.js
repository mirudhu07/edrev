const express = require("express");
const router = express.Router();
const db = require("../data/dbStore");

// 1. Get all supported controllers / processing platforms
router.get("/controllers", (req, res) => {
  const controllers = db.getControllers().map(ctrl => {
    const sensors = db.getConfiguredSensors(ctrl.id);
    return {
      ...ctrl,
      configuredSensorsCount: sensors.length,
      sensors: sensors
    };
  });
  res.json({
    success: true,
    selectedControllerId: db.getSelectedControllerId(),
    data: controllers
  });
});

// 2. Get specific controller details
router.get("/controllers/:id", (req, res) => {
  const ctrlId = req.params.id;
  const controllers = db.getControllers();
  const controller = controllers.find(c => c.id.toLowerCase() === ctrlId.toLowerCase() || c.id === ctrlId);

  if (!controller) {
    return res.status(404).json({ success: false, error: `Controller '${ctrlId}' not found.` });
  }

  const configuredSensors = db.getConfiguredSensors(controller.id);
  res.json({
    success: true,
    data: {
      ...controller,
      configuredSensorsCount: configuredSensors.length,
      configuredSensors
    }
  });
});

// 3. Select active controller context
router.post("/controllers/select", (req, res) => {
  const { controllerId } = req.body;
  if (!controllerId) {
    return res.status(400).json({ success: false, error: "controllerId is required" });
  }
  db.setSelectedControllerId(controllerId);
  res.json({
    success: true,
    selectedControllerId: controllerId,
    message: `Selected controller set to ${controllerId}`
  });
});

// 4. Get configured sensors for a specific controller
router.get("/controllers/:id/sensors", (req, res) => {
  const ctrlId = req.params.id;
  const sensors = db.getConfiguredSensors(ctrlId);
  res.json({
    success: true,
    controller: ctrlId,
    count: sensors.length,
    data: sensors
  });
});

// 5. Add a new sensor to a controller
router.post("/controllers/:id/sensors", (req, res) => {
  const ctrlId = req.params.id;
  const { sensorType, customName, interface: sensorInterface, pinAddress } = req.body;

  if (!sensorType) {
    return res.status(400).json({ success: false, error: "sensorType is required" });
  }

  const library = db.getSensorLibrary();
  const validMeta = library.find(s => s.type === sensorType);
  if (!validMeta) {
    return res.status(400).json({ success: false, error: `Invalid sensor type '${sensorType}'` });
  }

  const newSensor = db.addConfiguredSensor({
    controller: ctrlId,
    sensorType,
    customName: customName || validMeta.name,
    interface: sensorInterface || validMeta.defaultInterface,
    pinAddress: pinAddress || "Default Pin"
  });

  res.status(201).json({
    success: true,
    message: `Sensor ${sensorType} added to ${ctrlId}`,
    data: newSensor
  });
});

// 6. Delete/Remove a sensor
router.delete("/sensors/:id", (req, res) => {
  const sensorId = req.params.id;
  const removed = db.removeConfiguredSensor(sensorId);

  if (!removed) {
    return res.status(404).json({ success: false, error: `Configured sensor '${sensorId}' not found.` });
  }

  res.json({
    success: true,
    message: `Sensor '${sensorId}' successfully removed`,
    data: removed
  });
});

// 7. Get sensor library (all 12 supported sensors)
router.get("/sensors/library", (req, res) => {
  res.json({
    success: true,
    data: db.getSensorLibrary()
  });
});

// 8. Get readings for a specific sensor
router.get("/sensors/:id/readings", (req, res) => {
  const sensorId = req.params.id;
  const readings = db.getReadingsForSensor(sensorId);
  res.json({
    success: true,
    sensorId,
    count: readings.length,
    data: readings
  });
});

// 9. Get live readings strictly for a specific controller (and its configured sensors only!)
router.get("/controllers/:id/readings", (req, res) => {
  const ctrlId = req.params.id;
  const readings = db.getReadingsForController(ctrlId);

  res.json({
    success: true,
    controller: ctrlId,
    data: readings
  });
});

// 10. Get Hardware / System Status
router.get("/hardware/status", (req, res) => {
  const selectedCtrlId = db.getSelectedControllerId();
  const configuredSensors = db.getConfiguredSensors(selectedCtrlId);

  res.json({
    success: true,
    data: {
      selectedController: selectedCtrlId,
      controllerStatus: selectedCtrlId ? "Configured & Connected" : "Not Selected",
      connectedSensorsCount: configuredSensors.length,
      activeInterfaces: [...new Set(configuredSensors.map(s => s.interface))],
      lastDataUpdate: new Date().toISOString(),
      baudRate: 115200,
      protocol: "EduSense Hardware Telemetry Bus (I2C / SPI / UART / Wi-Fi)",
      bufferStatus: "Nominal (0 drops)",
      demoModeActive: true
    }
  });
});

// 11. Experiments list / create mock
router.get("/experiments", (req, res) => {
  const selectedCtrlId = db.getSelectedControllerId();
  const configuredSensors = db.getConfiguredSensors(selectedCtrlId);

  res.json({
    success: true,
    data: [
      {
        id: "exp-001",
        title: "Ambient Thermal & Humidity Monitoring Run",
        controller: selectedCtrlId,
        sensorsUsed: configuredSensors.map(s => s.sensorType),
        durationSeconds: 300,
        samplesRecorded: 150,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: "Completed"
      },
      {
        id: "exp-002",
        title: "Multi-Sensor Environmental Telemetry Benchmark",
        controller: selectedCtrlId,
        sensorsUsed: configuredSensors.map(s => s.sensorType),
        durationSeconds: 600,
        samplesRecorded: 300,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        status: "Completed"
      }
    ]
  });
});

module.exports = router;
