import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();

// Basic config
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

// Middlewares
app.use(
  cors({
    origin: CLIENT_ORIGIN,
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
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI manquant dans les variables d'environnement.");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connecté à MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`🚀 Backend CASAVOSTRA démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur :", error.message);
    process.exit(1);
  }
};

start();


