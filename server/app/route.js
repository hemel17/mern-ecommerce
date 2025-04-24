import { Router } from "express";
import mongoose from "mongoose";

/**
 * Express router for basic server routes
 */
const router = Router();

/**
 * Root endpoint
 * Simple route to verify the server is running
 * @route GET /
 * @returns {Object} 200 - Success message
 */
router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running.",
  });
});

/**
 * Health check endpoint
 * Provides information about server status and database connection
 * @route GET /health
 * @returns {Object} 200 - Status information including uptime and database state
 */
router.get("/health", (_req, res) => {
  // Check MongoDB connection state (1 = connected)
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  res.status(200).json({
    status: "Ok",
    uptime: process.uptime(), // How long the server has been running (in seconds)
    database: dbStatus, // MongoDB connection status
    timeStamp: new Date().toLocaleString(), // Current server time
  });
});

export default router;
