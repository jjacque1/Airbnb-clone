import Booking from "../models/Booking.js";
import Place from "../models/Place.js";

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
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate },
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "This place is already for the selected dates" });
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
      message: "Booking created successsfully",
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
