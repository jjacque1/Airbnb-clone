import express from "express"

import { requireAuth } from "../middleware/requireAuth.js"
import { createBooking } from "../controllers/bookingController.js"
import { getBookings } from "../controllers/bookingController.js";
import { getBookingById } from "../controllers/bookingController.js";
import { deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", requireAuth, createBooking)
router.get("/", requireAuth, getBookings)
router.get("/:id", requireAuth, getBookingById)
router.delete("/:id", requireAuth, deleteBooking)

export default router;