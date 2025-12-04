import { createContext, useContext, useEffect, useState } from "react";
import type { PropertyDetails } from "@/data/properties";

const API_URL = "https://casavostra.onrender.com/api/properties";

interface PropertiesContextType {
  properties: PropertyDetails[];
  loadProperties: () => Promise<void>;
  addProperty: (property: PropertyDetails) => Promise<PropertyDetails>;
  updateProperty: (id: number, property: PropertyDetails) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(
  undefined
);

export const PropertiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [properties, setProperties] = useState<PropertyDetails[]>([]);

  // Load on mount
  useEffect(() => {
    loadProperties();
  }, []);

  // GET all properties
  const loadProperties = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Erreur lors du chargement des propriétés :", error);
    }
  };

  // POST new property
  const addProperty = async (property: PropertyDetails) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });

      const created = await response.json();
      setProperties((prev) => [...prev, created]);

      return created;
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      throw error;
    }
  };

  // PUT update property
  const updateProperty = async (id: number, property: PropertyDetails) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });

      const updated = await response.json();

      setProperties((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      throw error;
    }
  };

  // DELETE property
  const deleteProperty = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      throw error;
    }
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        loadProperties,
        addProperty,
        updateProperty,
        deleteProperty,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error("useProperties must be used inside PropertiesProvider");
  }
  return context;
};