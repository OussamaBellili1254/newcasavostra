import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();

// Basic config
const port = process.env.PORT || 5000;
const MONGO_URL =
  "mongodb+srv://casavostra:CASAVOSTRA2025TOUTOU@casavostra.f7qmkyf.mongodb.net/?appName=casavostra";
const DB_NAME = "casavostra";

// AUTHORIZED FRONTEND URLs
const allowedOrigins = [
  "http://localhost:8080",
  "https://newcasavostra-1kxkm5jzn-oussama-bellilis-projects.vercel.app",
  "https://newcasavostra.vercel.app"
];

// CORS
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

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
    await mongoose.connect(MONGO_URL, {
      dbName: DB_NAME,
    });
    console.log("✅ Connecté à MongoDB Atlas");

    app.listen(port, () => {
      console.log(`🚀 Backend CASAVOSTRA démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur :", error.message);
    process.exit(1);
  }
};

start();
