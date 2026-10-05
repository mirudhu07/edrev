require("./patchFs");
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

// Health Endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "EduSense IoT Hardware Backend Server",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production"
  });
});

// Static Client Files (Production Single Application Architecture)
const clientBuildPath = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

function startServer(portToUse) {
  const server = app.listen(portToUse, "0.0.0.0", () => {
    process.stdout.write(`[EduSense IoT Server] Running in production mode on 0.0.0.0:${portToUse}\n`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && !process.env.PORT) {
      process.stdout.write(`[EduSense IoT Server] Port ${portToUse} in use, trying ${Number(portToUse) + 1}...\n`);
      startServer(Number(portToUse) + 1);
    } else {
      process.stderr.write(`Server error: ${err.message}\n`);
    }
  });
}

startServer(PORT);
