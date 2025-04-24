/**
 * Utility function to create custom error objects with status codes
 * @param {string} msg - The error message
 * @param {number} status - The HTTP status code associated with the error
 * @returns {Error} - Enhanced Error object with status property
 */
const createError = (msg, status) => {
  const e = new Error(msg); // Create standard JavaScript Error object
  e.status = status; // Attach HTTP status code to the error
  return e;
};

export default createError;
