import Place from "../models/Place.js";
import mongoose from "mongoose";

export async function createPlace(req, res) {
  try {
    const { userId } = req.user;

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
      owner: userId,
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
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getUserPlaces(req, res) {
  try {
    const { userId } = req.user;

    const places = await Place.find({ owner: userId }).populate(
      "owner",
      "fullName email",
    );

    return res.status(200).json({ places });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch user places" });
  }
}

export async function getPlaceById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid place id" });
    }

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    return res.status(200).json({ place });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching place" });
  }
}

export async function getAllPlaces(req, res) {
  try {
    const places = await Place.find();

    return res.status(200).json({ places });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updatePlace(req, res) {
  try {
    const { id } = req.params;

    const { userId } = req.user;

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid place id" });
    }

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    if (place.owner.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

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

    place.title = title.trim();
    place.address = address.trim();
    place.photos = Array.isArray(photos) ? photos : [];
    place.description = description.trim();
    place.perks = Array.isArray(perks) ? perks : [];
    place.extraInfo = extraInfo ? extraInfo.trim() : "";
    place.checkIn = checkIn;
    place.checkOut = checkOut;
    place.maxGuests = maxGuests;
    place.price = price;

    await place.save();

    return res
      .status(200)
      .json({ message: "Place updated successfully", place });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deletePlace(req, res) {
  try {
    const { id } = req.params;

    const { userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid place id" });
    }

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    if (place.owner.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await place.deleteOne();

    return res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function patchPlace(req, res) {
  try {
    const { id } = req.params;

    const { userId } = req.user;

    const {
      title,
      address,
      description,
      photos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid place id" });
    }

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    if (place.owner.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (title !== undefined) {
      place.title = title.trim();
    }
    if (address !== undefined) {
      place.address = address.trim();
    }

    if (photos !== undefined) {
      place.photos = Array.isArray(photos) ? photos : [];
    }

    if (description !== undefined) {
      place.description = description.trim();
    }

    if (perks !== undefined) {
      place.perks = Array.isArray(perks) ? perks : [];
    }

    if (extraInfo !== undefined) {
      place.extraInfo = extraInfo ? extraInfo.trim() : "";
    }

    if (checkIn !== undefined) {
      place.checkIn = checkIn;
    }

    if (checkOut !== undefined) {
      place.checkOut = checkOut;
    }

    if (maxGuests !== undefined) {
      place.maxGuests = maxGuests;
    }

    if (price !== undefined) {
      place.price = price;
    }

    await place.save();

    return res
      .status(200)
      .json({ message: "Place patched successfully", place });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}
