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

const STORAGE_KEY = "casavostra_properties";

const PropertiesContext = createContext<PropertiesContextValue | undefined>(
  undefined,
);

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<PropertyDetails[]>(
    initialProperties,
  );

  // Load properties from localStorage on first mount, falling back to seed data
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setProperties(parsed);
        }
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProperties));
      }
    } catch {
      // Fail silently and keep initialProperties
    }
  }, []);

  const persist = (next: PropertyDetails[]) => {
    setProperties(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage errors (quota, etc.)
    }
  };

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
    const nextId =
      properties.length > 0
        ? Math.max(...properties.map((prev) => prev.id)) + 1
        : 1;

    const newProperty: PropertyDetails = {
      ...property,
      id: nextId,
    };

    const next = [...properties, newProperty];
    persist(next);

    return newProperty;
  };

  const updateProperty = async (
    id: number,
    updates: Partial<PropertyDetails>,
  ) => {
    const next = properties.map((p) =>
      p.id === id ? { ...p, ...updates } : p,
    );
    persist(next);
  };

  const deleteProperty = async (id: number) => {
    const next = properties.filter((p) => p.id !== id);
    persist(next);
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


