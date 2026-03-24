import Booking from "../models/Booking.js";
import Place from "../models/Place.js";
import mongoose from "mongoose";

export async function createBooking(req, res) {
  try {
    const { userId } = req.user;

    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;

    if (
      !place ||
      !checkIn ||
      !checkOut ||
      !numberOfGuests ||
      !name ||
      !phone ||
      !price
    ) {
      return res.status(400).json({
        message:
          "place, checkIn, checkOut, numberOfGuests, name, phone, and price are required",
      });
    }

    const foundPlace = await Place.findById(place);

    if (!foundPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    if (foundPlace.owner.toString() === userId) {
      return res
        .status(403)
        .json({ message: "You cannot book your own place" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({
        message: "Invalid checkIn or checkOut date",
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        message: "checkOut date must be after checkIn date",
      });
    }

    const existingBooking = await Booking.findOne({
      place,
      status: "active",
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This place is already booked for the selected dates",
      });
    }

    const newBooking = await Booking.create({
      place,
      user: userId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      numberOfGuests,
      name: name.trim(),
      phone: phone.trim(),
      price,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getBookings(req, res) {
  try {
    const { userId } = req.user;

    const bookings = await Booking.find({ user: userId }).populate("place");

    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
}

export async function getBookingById(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findById(id).populate("place");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.json(booking);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch booking" });
  }
}

export async function cancelBooking(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (booking.status === "cancelled") {
      return res.status(409).json({ message: "Booking is already cancelled" });
    }

    booking.status = "cancelled";

    await booking.save();

    return res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    console.error("cancelBooking error:", err);
    return res.status(500).json({ message: "Failed to cancel booking" });
  }
}
