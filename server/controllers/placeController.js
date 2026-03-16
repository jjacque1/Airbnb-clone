import Place from "../models/Place.js";
import jwt from "jsonwebtoken";

export async function createPlace(req, res) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ messsage: "JWT_SECRET is missing from .env" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    if (
      !title ||
      !address ||
      !description ||
      checkIn === undefined ||
      checkOut === undefined ||
      maxGuests === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        message:
          "title, address, description, checkIn, checkOut, maxGuests, and price are required",
      });
    }

    const newPlace = await Place.create({
      owner: decoded.userId,
      title: title.trim(),
      address: address.trim(),
      photos: Array.isArray(photos) ? photos : [],
      description: description.trim(),
      perks: Array.isArray(perks) ? perks : [],
      extraInfo: extraInfo ? extraInfo.trim() : "",
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    return res.status(201).json({
      message: "Place created successfully",
      place: newPlace,
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getUserPlaces(req, res) {
    try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "JWT_SECRET is missing from .env" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const places = await Place.find({ owner: decoded.userId });

    return res.status(200).json({ places });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export async function getPlaceById(req, res) {
    try {
    const { id } = req.params;

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    return res.status(200).json({ place });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching place" });
  }
}