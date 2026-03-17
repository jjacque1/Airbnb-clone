import express from "express";
import {
  createPlace,
  getUserPlaces,
  getPlaceById,
  updatePlace,
} from "../controllers/placeController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/", requireAuth, createPlace);
router.get("/user-places", requireAuth, getUserPlaces);
router.get("/:id", getPlaceById);
router.put("/:id", requireAuth, updatePlace)

export default router;
