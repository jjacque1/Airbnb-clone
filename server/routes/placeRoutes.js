import express from "express";
import {
  createPlace,
  getUserPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
  patchPlace,
  getAllPlaces,
} from "../controllers/placeController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/", requireAuth, createPlace);
router.get("/user-places", requireAuth, getUserPlaces);
router.get("/:id", getPlaceById);
router.get("/", getAllPlaces);
router.put("/:id", requireAuth, updatePlace);
router.patch("/:id", requireAuth, patchPlace);
router.delete("/:id", requireAuth, deletePlace);

export default router;
