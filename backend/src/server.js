import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();

// Basic config
const port = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "CASAVOSTRA";
// Allow configuring the frontend origin explicitly for Render/Vercel
const FRONTEND_ORIGIN =
  process.env.FRONTEND_VERCEL_URL ||
  process.env.CLIENT_ORIGIN ||
  "*";

// Middlewares
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: false,
  }),
);
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/properties", propertyRoutes);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return;
  res
    .status(500)
    .json({ error: "Une erreur serveur est survenue. Veuillez réessayer." });
});

// DB connection + server start
const start = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error("MONGO_URL manquant dans les variables d'environnement.");
    }

    await mongoose.connect(MONGO_URL, {
      dbName: DB_NAME,
    });
    console.log("✅ Connecté à MongoDB Atlas (base:", DB_NAME, ")");

    app.listen(port, () => {
      console.log(`🚀 Backend CASAVOSTRA démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur :", error.message);
    process.exit(1);
  }
};

start();


