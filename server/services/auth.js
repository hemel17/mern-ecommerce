import jwt from "jsonwebtoken";
import createError from "../utils/error.js";
import User from "../models/User.js";

/**
 * Generate access token
 * @param {Object} user - User object
 * @returns {String} Access token
 */
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE || "15m",
  });
};

/**
 * Generate refresh token
 * @param {Object} user - User object
 * @returns {String} Refresh token
 */
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
  });
};

/**
 * Set tokens in cookies
 * @param {Object} res - Response object
 * @param {String} accessToken - Access token
 * @param {String} refreshToken - Refresh token
 */
export const setTokenCookies = (res, accessToken, refreshToken) => {
  // Set access token cookie
  res.cookie("accessToken", accessToken, {
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

/**
 * Clear auth cookies
 * @param {Object} res - Response object
 */
export const clearTokenCookies = (res) => {
  res.cookie("accessToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.cookie("refreshToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
};

/**
 * Register a new user
 * @param {String} name - User name
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {Object} Created user
 */
export const register = async (name, email, password) => {
  // Check if all required fields are provided
  if (!name || !email || !password) {
    throw createError("Please provide all required fields", 400);
  }

  // Check if user with this email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError("Email already registered", 400);
  }

  // Create new user
  return await User.create({
    name,
    email,
    password,
  });
};

/**
 * Login user
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {Object} User object
 */
export const login = async (email, password) => {
  // Check if email and password are provided
  if (!email || !password) {
    throw createError("Please provide email and password", 400);
  }

  // Find user and include password field
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw createError("Invalid credentials", 401);
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw createError("Invalid credentials", 401);
  }

  return user;
};

/**
 * Get user profile
 * @param {String} userId - User ID
 * @returns {Object} User object
 */
export const getProfile = async (userId) => {
  return await User.findById(userId);
};
