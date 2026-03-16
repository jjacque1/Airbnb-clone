import express from "express";

import {
  getProfile,
  loginUser,
  logoutUser,
  registersUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registersUser);

router.post("/login", loginUser);
router.get("/profile", getProfile);

router.post("/logout", logoutUser);

export default router;
