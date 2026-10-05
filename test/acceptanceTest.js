const db = require('../server/data/dbStore');
const assert = require('assert');

console.log("=== EDU SENSE CRITICAL ACCEPTANCE TEST SUITE ===");

// 1. Reset state cleanly
db.setSelectedControllerId("ESP32");

// Clear existing sensors for clean test environment
while (db.getConfiguredSensors().length > 0) {
  db.removeConfiguredSensor(db.getConfiguredSensors()[0].id);
}

console.log("Test 1: Select ESP32 and Add SHTC3...");
db.setSelectedControllerId("ESP32");
const shtc3 = db.addConfiguredSensor({
  controller: "ESP32",
  sensorType: "SHTC3",
  customName: "SHTC3 Temp & Humidity",
  interface: "I2C"
});

let activeSensors = db.getConfiguredSensors("ESP32");
assert.strictEqual(activeSensors.length, 1);
assert.strictEqual(activeSensors[0].sensorType, "SHTC3");
assert.strictEqual(activeSensors[0].controller, "ESP32");
console.log("✓ TEST 1 PASSED: Only SHTC3 displayed under ESP32 context.");

console.log("Test 2: Add BH1750 to ESP32...");
const bh1750 = db.addConfiguredSensor({
  controller: "ESP32",
  sensorType: "BH1750",
  customName: "BH1750 Light",
  interface: "I2C"
});

activeSensors = db.getConfiguredSensors("ESP32");
assert.strictEqual(activeSensors.length, 2);
assert.deepStrictEqual(activeSensors.map(s => s.sensorType).sort(), ["BH1750", "SHTC3"].sort());
console.log("✓ TEST 2 PASSED: Shows SHTC3 + BH1750 under ESP32.");

console.log("Test 3: Add BMP280 to ESP32...");
const bmp280 = db.addConfiguredSensor({
  controller: "ESP32",
  sensorType: "BMP280",
  customName: "BMP280 Barometer",
  interface: "I2C"
});

activeSensors = db.getConfiguredSensors("ESP32");
assert.strictEqual(activeSensors.length, 3);
assert.deepStrictEqual(activeSensors.map(s => s.sensorType).sort(), ["BH1750", "BMP280", "SHTC3"].sort());
console.log("✓ TEST 3 PASSED: Shows SHTC3 + BH1750 + BMP280 under ESP32.");

console.log("Test 4: Remove BH1750...");
db.removeConfiguredSensor(bh1750.id);
activeSensors = db.getConfiguredSensors("ESP32");
assert.strictEqual(activeSensors.length, 2);
assert.strictEqual(activeSensors.some(s => s.sensorType === "BH1750"), false);
console.log("✓ TEST 4 PASSED: BH1750 immediately removed from active context.");

console.log("Test 5: Change Controller from ESP32 -> Arduino Nano (Empty)...");
db.setSelectedControllerId("Arduino Nano");
activeSensors = db.getConfiguredSensors("Arduino Nano");
assert.strictEqual(activeSensors.length, 0);

// Verify ESP32 readings do NOT appear when querying Arduino Nano
const nanoReadings = db.getReadingsForController("Arduino Nano");
assert.strictEqual(nanoReadings.length, 0);
console.log("✓ TEST 5 PASSED: Arduino Nano context displays 0 sensors. No ESP32 leakage!");

console.log("Test 6: Add LM35 to Arduino Nano...");
const lm35 = db.addConfiguredSensor({
  controller: "Arduino Nano",
  sensorType: "LM35",
  customName: "LM35 Temp",
  interface: "Analog"
});

activeSensors = db.getConfiguredSensors("Arduino Nano");
assert.strictEqual(activeSensors.length, 1);
assert.strictEqual(activeSensors[0].sensorType, "LM35");

// Verify switching back to ESP32 retains ESP32 sensors (SHTC3 + BMP280) and does not show LM35
const esp32Sensors = db.getConfiguredSensors("ESP32");
assert.strictEqual(esp32Sensors.length, 2);
assert.strictEqual(esp32Sensors.some(s => s.sensorType === "LM35"), false);
console.log("✓ TEST 6 PASSED: LM35 attached to Arduino Nano only. ESP32 context clean.");

console.log("\n==========================================");
console.log("ALL 6 CRITICAL ACCEPTANCE TESTS PASSED 100%");
console.log("==========================================\n");
process.exit(0);
