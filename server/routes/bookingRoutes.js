import express from "express"

import { requireAuth } from "../middleware/requireAuth.js"
import { createBooking } from "../controllers/bookingController.js"
import { getBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", requireAuth, createBooking)
router.get("/", requireAuth, getBookings)

export default router;