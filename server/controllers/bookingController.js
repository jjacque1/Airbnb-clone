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

    const newBooking = await Booking.create({
      place,
      user: userId,
      checkIn,
      checkOut,
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
