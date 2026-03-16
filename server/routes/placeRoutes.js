import express from "express";
import {
  createPlace,
  getUserPlaces,
  getPlaceById,
} from "../controllers/placeController.js";

const router = express.Router();

router.post("/", createPlace);
router.get("/user-places", getUserPlaces);
router.get("/places/:id", getPlaceById);

export default router;
