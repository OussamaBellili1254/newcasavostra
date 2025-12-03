import mongoose from "mongoose";

const VALID_TRANSACTIONS = ["vente", "location"];

const VALID_CATEGORIES = [
  "Appartements",
  "Villas",
  "Duplex & Triplex",
  "Bureaux",
  "Dépôts",
  "Locaux Commerciaux",
  "Locaux Industriels",
  "Terrains Agricoles",
  "Terrains Constructibles",
];

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    transaction: {
      type: String,
      enum: VALID_TRANSACTIONS,
      required: true,
    },
    category: {
      type: String,
      enum: VALID_CATEGORIES,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    surface: {
      type: Number,
      required: true,
      min: 0,
    },
    rooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.every((u) => typeof u === "string"),
        message: "Images must be an array of string URLs.",
      },
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Property = mongoose.model("Property", propertySchema);
export const TRANSACTIONS = VALID_TRANSACTIONS;
export const CATEGORIES = VALID_CATEGORIES;


