import jwt from "jsonwebtoken";
import User from "../models/User.js";
import createError from "../utils/error.js";
import * as authService from "../services/auth.js";

/**
 * Middleware to authenticate user using access token
 * If access token is expired, tries to refresh using refresh token
 */
export const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // If no tokens present, user is not authenticated
    if (!accessToken && !refreshToken) {
      return next(createError("Please login to access this resource", 401));
    }

    try {
      // Try to verify access token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id);
      if (!req.user) {
        return next(createError("User not found", 401));
      }
      return next();
    } catch (error) {
      // Access token is invalid or expired, try refresh token
      if (!refreshToken) {
        return next(createError("Please login to access this resource", 401));
      }

      try {
        // Verify refresh token
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );
        const user = await User.findById(decoded._id);

        if (!user) {
          return next(createError("User not found", 401));
        }

        // Generate new tokens
        const newAccessToken = authService.generateAccessToken(user);
        const newRefreshToken = authService.generateRefreshToken(user);

        // Set new tokens in cookies
        authService.setTokenCookies(res, newAccessToken, newRefreshToken);

        req.user = user;
        next();
      } catch (refreshError) {
        return next(createError("Please login to access this resource", 401));
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to restrict access to specific roles
 * @param {...String} roles - Roles allowed to access the route
 */
export const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createError(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
