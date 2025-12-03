import "dotenv/config";
import mongoose from "mongoose";
import { Property } from "./models/Property.js";

const MONGO_URL = process.env.MONGO_URL || process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "CASAVOSTRA";

const seedProperties = [
  {
    title: "Appartement S+2 moderne au Lac 2",
    city: "Tunis",
    transaction: "vente",
    category: "Appartements",
    price: 360000,
    surface: 120,
    rooms: 4,
    bathrooms: 2,
    description:
      "Appartement S+2 moderne situé au Lac 2 avec vue dégagée, cuisine équipée et place de parking sous-sol.",
    images: [
      "https://i.postimg.cc/8c8R1F0h/appartement-lac2-1.jpg",
      "https://i.postimg.cc/3N5pF3wZ/appartement-lac2-2.jpg",
    ],
  },
  {
    title: "Villa de luxe avec piscine à Hammamet Nord",
    city: "Hammamet",
    transaction: "vente",
    category: "Villas",
    price: 1250000,
    surface: 380,
    rooms: 8,
    bathrooms: 3,
    description:
      "Superbe villa de style contemporain avec piscine à débordement, jardin paysager et vue mer panoramique.",
    images: [
      "https://i.postimg.cc/fyF2dD4B/villa-hammamet-1.jpg",
      "https://i.postimg.cc/vTGf4d1j/villa-hammamet-2.jpg",
    ],
  },
  {
    title: "Duplex S+3 meublé à Sahloul",
    city: "Sousse",
    transaction: "location",
    category: "Duplex & Triplex",
    price: 2500,
    surface: 180,
    rooms: 6,
    bathrooms: 2,
    description:
      "Duplex S+3 entièrement meublé à Sahloul, Sousse, avec terrasse privative et finitions haut de gamme.",
    images: [
      "https://i.postimg.cc/3wN6cgtx/duplex-sahloul-1.jpg",
      "https://i.postimg.cc/0QmZ9xC4/duplex-sahloul-2.jpg",
    ],
  },
  {
    title: "Bureau open space au Centre Urbain Nord",
    city: "Tunis",
    transaction: "location",
    category: "Bureaux",
    price: 1800,
    surface: 200,
    rooms: 5,
    bathrooms: 2,
    description:
      "Bureau open space lumineux au Centre Urbain Nord, idéal pour startup ou PME, fibre optique et salle de réunion.",
    images: [
      "https://i.postimg.cc/XJ3F22ZC/bureau-cun-1.jpg",
      "https://i.postimg.cc/VvNQyP7C/bureau-cun-2.jpg",
    ],
  },
  {
    title: "Terrain constructible 500m² à Borj Cedria",
    city: "Ben Arous",
    transaction: "vente",
    category: "Terrains Constructibles",
    price: 190000,
    surface: 500,
    rooms: 0,
    bathrooms: 0,
    description:
      "Terrain constructible de 500m² viabilisé à Borj Cedria, proche plage et axes principaux, idéal pour villa ou petit immeuble.",
    images: [
      "https://i.postimg.cc/c4z6MsLk/terrain-borj-cedria-1.jpg",
    ],
  },
];

const run = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error("MONGO_URL ou MONGODB_URI manquant dans les variables d'environnement.");
    }

    await mongoose.connect(MONGO_URL, { dbName: DB_NAME });
    console.log("✅ Connecté à MongoDB pour le seed (base:", DB_NAME, ")");

    await Property.deleteMany({});
    console.log("🗑️  Collection 'properties' vidée.");

    const inserted = await Property.insertMany(seedProperties);
    console.log(`✅ ${inserted.length} propriétés insérées avec succès.`);
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();


