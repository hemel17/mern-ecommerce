import { Router } from "express";
import { register, login, logout, getProfile } from "../controllers/auth.js";
import { authenticate, authorize } from "../middleware/authenticate.js";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticate, logout);

// Protected routes
router.get("/me", authenticate, getProfile);

// Admin routes
router.get("/users", authenticate, authorize("admin"), getProfile);

export default router;
