import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  photos: [
    {
      type: String,
      trim: true,
    },
  ],
  description: {
    type: String,
    required: true,
    trim: true,
  },
  perks: [
    {
      types: String,
      trim: true,
    },
  ],
  extraInfo: {
    type: String,
    trim: true,
    default: "",
  },
  checkIn: {
    type: Number,
    required: true,
  },
  checkOut: {
    type: Number,
    required: true,
  },
  maxGuests: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Place = mongoose.model("Place", placeSchema);

export default Place;
