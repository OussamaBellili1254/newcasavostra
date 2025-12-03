import mongoose from "mongoose";
import { Property, TRANSACTIONS, CATEGORIES } from "../models/Property.js";

const buildFilters = (query) => {
  const filters = {};

  if (query.city) {
    // Case-insensitive, partial match on city
    filters.city = { $regex: query.city, $options: "i" };
  }

  if (query.transaction) {
    const tx = query.transaction.toLowerCase();
    if (TRANSACTIONS.includes(tx)) {
      filters.transaction = tx;
    }
  }

  if (query.category) {
    // Match against exact category label
    if (CATEGORIES.includes(query.category)) {
      filters.category = query.category;
    }
  }

  return filters;
};

export const getProperties = async (req, res, next) => {
  try {
    const filters = buildFilters(req.query);
    const properties = await Property.find(filters).sort({ createdAt: -1 });
    res.json({ data: properties });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "ID de propriété invalide." });
    }

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: "Propriété non trouvée." });
    }

    res.json({ data: property });
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req, res, next) => {
  try {
    const {
      title,
      city,
      transaction,
      category,
      price,
      surface,
      rooms,
      bathrooms,
      description,
      images,
    } = req.body || {};

    if (!title || !city || !transaction || !category || price == null) {
      return res.status(400).json({
        error:
          "Les champs title, city, transaction, category et price sont obligatoires.",
      });
    }

    const normalizedTransaction = String(transaction).toLowerCase();
    if (!TRANSACTIONS.includes(normalizedTransaction)) {
      return res.status(400).json({
        error: `Le champ transaction doit être l'une des valeurs suivantes : ${TRANSACTIONS.join(
          ", ",
        )}.`,
      });
    }

    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({
        error: `Le champ category doit être l'une des valeurs suivantes : ${CATEGORIES.join(
          ", ",
        )}.`,
      });
    }

    const numericPrice = Number(price);
    const numericSurface = surface != null ? Number(surface) : 0;
    const numericRooms = rooms != null ? Number(rooms) : 0;
    const numericBathrooms = bathrooms != null ? Number(bathrooms) : 0;

    if (Number.isNaN(numericPrice)) {
      return res
        .status(400)
      .json({ error: "Le champ price doit être un nombre." });
    }

    const property = await Property.create({
      title,
      city,
      transaction: normalizedTransaction,
      category,
      price: numericPrice,
      surface: numericSurface,
      rooms: numericRooms,
      bathrooms: numericBathrooms,
      description,
      images: Array.isArray(images) ? images : [],
    });

    res.status(201).json({ data: property });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "ID de propriété invalide." });
    }

    const updates = { ...req.body };

    if (updates.transaction) {
      const normalized = String(updates.transaction).toLowerCase();
      if (!TRANSACTIONS.includes(normalized)) {
        return res.status(400).json({
          error: `Le champ transaction doit être l'une des valeurs suivantes : ${TRANSACTIONS.join(
            ", ",
          )}.`,
        });
      }
      updates.transaction = normalized;
    }

    if (updates.category) {
      if (!CATEGORIES.includes(updates.category)) {
        return res.status(400).json({
          error: `Le champ category doit être l'une des valeurs suivantes : ${CATEGORIES.join(
            ", ",
          )}.`,
        });
      }
    }

    ["price", "surface", "rooms", "bathrooms"].forEach((field) => {
      if (updates[field] != null) {
        const numeric = Number(updates[field]);
        if (Number.isNaN(numeric)) {
          throw new Error(`Le champ ${field} doit être un nombre.`);
        }
        updates[field] = numeric;
      }
    });

    if (updates.images && !Array.isArray(updates.images)) {
      return res
        .status(400)
        .json({ error: "Le champ images doit être un tableau de chaînes." });
    }

    const property = await Property.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      return res.status(404).json({ error: "Propriété non trouvée." });
    }

    res.json({ data: property });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "ID de propriété invalide." });
    }

    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return res.status(404).json({ error: "Propriété non trouvée." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


