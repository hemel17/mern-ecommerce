import * as authService from "../services/auth.js";

// * Helper function to send response with tokens
const sendAuthResponse = (user, statusCode, res) => {
  // Generate tokens
  const accessToken = authService.generateAccessToken(user);
  const refreshToken = authService.generateRefreshToken(user);

  // Set tokens in cookies
  authService.setTokenCookies(res, accessToken, refreshToken);

  // Remove password from response
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    user,
  });
};

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Register user through service
    const user = await authService.register(name, email, password);

    sendAuthResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Login user through service
    const user = await authService.login(email, password);
    sendAuthResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 * @route GET /api/auth/logout
 */
export const logout = (_req, res) => {
  // Clear auth cookies through service
  authService.clearTokenCookies(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

/**
 * Get current user profile
 * @route GET /api/auth/me
 */
export const getProfile = async (req, res) => {
  const user = await authService.getProfile(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};
