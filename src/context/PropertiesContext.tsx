import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  properties as initialProperties,
  type PropertyDetails,
} from "@/data/properties";
import { API_URL } from "@/config/api";

type TransactionType = "" | "vente" | "location";

interface PropertiesContextValue {
  properties: PropertyDetails[];
  getPropertyById: (id: number) => PropertyDetails | undefined;
  filterProperties: (
    city: string,
    transaction: TransactionType,
    category: string,
  ) => PropertyDetails[];
  addProperty: (property: Omit<PropertyDetails, "id">) => Promise<PropertyDetails>;
  updateProperty: (id: number, updates: Partial<PropertyDetails>) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
}

const PropertiesContext = createContext<PropertiesContextValue | undefined>(
  undefined,
);

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<PropertyDetails[]>(
    initialProperties,
  );

  // Load properties from backend on first mount, falling back to seed data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${API_URL}/properties`);
        if (!res.ok) {
          throw new Error("Failed to fetch properties from backend");
        }
        const json = await res.json();
        if (Array.isArray(json.data)) {
          const mapped: PropertyDetails[] = json.data.map(
            (p: any, index: number) => ({
              id: index + 1,
              backendId: p._id,
              title: p.title ?? "",
              price:
                typeof p.price === "number"
                  ? `${p.price.toLocaleString("fr-FR")} TND`
                  : "",
              category: p.category ?? "",
              type: (p.transaction as "vente" | "location") ?? "vente",
              description: p.description ?? "",
              image:
                Array.isArray(p.images) && p.images.length > 0
                  ? p.images[0]
                  : "",
              location: p.city ?? "",
              city: p.city ?? "",
              surface: typeof p.surface === "number" ? p.surface : 0,
              rooms: typeof p.rooms === "number" ? p.rooms : 0,
              bedrooms: typeof p.bedrooms === "number" ? p.bedrooms : 0,
              bathrooms: typeof p.bathrooms === "number" ? p.bathrooms : 0,
              fullDescription: p.description ?? "",
              features: Array.isArray(p.features) ? p.features : [],
              gallery: Array.isArray(p.images) ? p.images : [],
            }),
          );
          setProperties(mapped);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, []);

  const getPropertyById = (id: number) =>
    properties.find((property) => property.id === id);

  const filterProperties = (
    city: string,
    transaction: TransactionType,
    category: string,
  ) => {
    const normalizedCity = city.trim().toLowerCase();
    const normalizedTransaction = transaction.trim() as TransactionType;
    const normalizedCategory = category.trim();

    return properties.filter((p) => {
      const cityOk =
        normalizedCity === "" ||
        (p.city && p.city.toLowerCase().includes(normalizedCity));

      const transactionOk =
        normalizedTransaction === "" || p.type === normalizedTransaction;

      const categoryOk =
        normalizedCategory === "" || p.category === normalizedCategory;

      return cityOk && transactionOk && categoryOk;
    });
  };

  const addProperty = async (property: Omit<PropertyDetails, "id">) => {
    const images =
      property.gallery && property.gallery.length > 0
        ? property.gallery
        : property.image
          ? [property.image]
          : [];

    const numericPrice = Number(
      typeof property.price === "string"
        ? property.price.replace(/[^\d]/g, "")
        : property.price,
    );

    const payload = {
      title: property.title,
      city: property.city,
      transaction: property.type,
      category: property.category,
      price: Number.isNaN(numericPrice) ? 0 : numericPrice,
      surface: property.surface,
      rooms: property.rooms,
      bathrooms: property.bathrooms,
      description: property.description,
      images,
    };

    const res = await fetch(`${API_URL}/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.error || "Impossible d'ajouter la propriété.");
    }

    const json = await res.json();
    const p = json.data;

    const nextId =
      properties.length > 0
        ? Math.max(...properties.map((prev) => prev.id)) + 1
        : 1;

    const newProperty: PropertyDetails = {
      ...property,
      id: nextId,
      backendId: p._id,
      price: `${(p.price ?? 0).toLocaleString("fr-FR")} TND`,
      image:
        Array.isArray(p.images) && p.images.length > 0
          ? p.images[0]
          : property.image,
      gallery: Array.isArray(p.images) ? p.images : property.gallery,
    };

    setProperties((prev) => [...prev, newProperty]);
    return newProperty;
  };

  const updateProperty = async (
    id: number,
    updates: Partial<PropertyDetails>,
  ) => {
    const existing = properties.find((p) => p.id === id);
    if (!existing || !existing.backendId) return;

    const images =
      updates.gallery && updates.gallery.length > 0
        ? updates.gallery
        : existing.gallery;

    const numericPrice = Number(
      typeof (updates.price ?? existing.price) === "string"
        ? String(updates.price ?? existing.price).replace(/[^\d]/g, "")
        : updates.price ?? existing.price,
    );

    const payload = {
      title: updates.title ?? existing.title,
      city: updates.city ?? existing.city,
      transaction: updates.type ?? existing.type,
      category: updates.category ?? existing.category,
      price: Number.isNaN(numericPrice) ? 0 : numericPrice,
      surface: updates.surface ?? existing.surface,
      rooms: updates.rooms ?? existing.rooms,
      bathrooms: updates.bathrooms ?? existing.bathrooms,
      description: updates.description ?? existing.description,
      images,
    };

    await fetch(`${API_URL}/properties/${existing.backendId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  };

  const deleteProperty = async (id: number) => {
    const existing = properties.find((p) => p.id === id);
    if (existing?.backendId) {
      await fetch(`${API_URL}/properties/${existing.backendId}`, {
        method: "DELETE",
      }).catch(() => {});
    }

    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const value: PropertiesContextValue = useMemo(
    () => ({
      properties,
      getPropertyById,
      filterProperties,
      addProperty,
      updateProperty,
      deleteProperty,
    }),
    [properties],
  );

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const ctx = useContext(PropertiesContext);
  if (!ctx) {
    throw new Error("useProperties must be used within a PropertiesProvider");
  }
  return ctx;
};


