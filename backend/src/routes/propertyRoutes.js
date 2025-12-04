import { Router } from "express";
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

const router = Router();

// GET /api/properties
router.get("/", getProperties);

// GET /api/properties/:id
router.get("/:id", getPropertyById);

// POST /api/properties
router.post("/", createProperty);

// PUT /api/properties/:id
router.put("/:id", updateProperty);

// DELETE /api/properties/:id
router.delete("/:id", deleteProperty);

export default router;