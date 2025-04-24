import createError from "../utils/error.js";

/**
 * Middleware for handling 404 Not Found errors
 * Creates a custom error when a route is not found
 * @param {Object} _req - Express request object (unused)
 * @param {Object} _res - Express response object (unused)
 * @param {Function} next - Express next middleware function
 */
export const notFoundHandler = (_req, _res, next) => {
  const err = createError("Not found!", 404);
  next(err); // Pass error to the next middleware (error handler)
};

/**
 * Global error handling middleware
 * Processes different types of errors and returns appropriate responses
 * @param {Object} err - Error object
 * @param {Object} _req - Express request object (unused)
 * @param {Object} res - Express response object
 * @param {Function} _next - Express next middleware function (unused)
 */
export const errorHandler = (err, _req, res, _next) => {
  let errorStatus = err.status || 500; // Default to 500 if no status provided
  let errorMessage = err.message || "Internal server error!";
  const errorType = err.name || "Unknown error!";

  // Handle MongoDB casting errors (invalid ObjectId, etc.)
  if (err.name === "CastError") {
    errorStatus = 400;
    errorMessage = `Invalid ${err.path}`;
  }

  // Handle JWT verification errors
  if (err.name === "JsonWebTokenError") {
    errorStatus = 400;
    errorMessage = "Something went wrong! Please try again.";
  }

  // Handle JWT expiration errors
  if (err.name === "TokenExpiredError") {
    errorStatus = 400;
    errorMessage = "Session expired! Please try again.";
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    errorStatus = 400;
    errorMessage = `This ${Object.keys(err.keyValue)} is already in use.`;
  }

  // Send error response
  res.status(errorStatus).json({
    success: false,
    type: errorType,
    message: errorMessage,
  });
};
