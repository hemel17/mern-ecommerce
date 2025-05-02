import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

/**
 * Array of middleware functions for Express application
 * These will be applied in the order listed
 */
const middleware = [
  // HTTP request logger middleware for development
  morgan("dev"),

  // Cross-Origin Resource Sharing configuration
  cors({
    // Only allow requests from the specified frontend URL
    origin: process.env.FRONTEND_URL
      ? [process.env.FRONTEND_URL, "http://localhost:5173"]
      : ["http://localhost:5173"],

    // Allowed HTTP methods
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

    // Headers that the client is allowed to send
    allowedHeaders: [
      "Content-Type", // For request body format
      "Authorization", // For authentication tokens
      "Cache-Control", // For controlling browser caching
      "Expires", // For cache expiration
      "Pragma", // For HTTP/1.0 backward compatibility cache control
    ],

    // Allow cookies and authentication to be sent cross-origin
    credentials: true,
  }),

  // Parse cookies from request headers
  cookieParser(),

  // Parse JSON request bodies
  express.json(),

  // Parse URL-encoded form data (supports nested objects with extended: true)
  express.urlencoded({ extended: true }),
];

export default middleware;
