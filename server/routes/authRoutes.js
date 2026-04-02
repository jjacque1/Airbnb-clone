import express from "express";

import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser
} from "../controllers/authController.js";

import { requireAuth } from "../middleware/requireAuth.js"

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/profile", requireAuth, getProfile);

router.post("/logout", logoutUser);

export default router;
