import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/context/PropertiesContext";

const transactionOptions: { label: string; value: "" | "vente" | "location" }[] =
  [
    { label: "Tous", value: "" },
    { label: "Vente", value: "vente" },
    { label: "Location", value: "location" },
  ];

const categoryOptions = [
  "",
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

const AllProperties = () => {
  const [city, setCity] = useState("");
  const [transaction, setTransaction] = useState<"" | "vente" | "location">("");
  const [category, setCategory] = useState("");

  const { filterProperties } = useProperties();
  const filtered = filterProperties(city, transaction, category);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="pt-24 md:pt-28 flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary to-background/80 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8 py-10 md:py-14 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                Catalogue complet
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4">
                Tous nos biens
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Découvrez l&apos;ensemble des biens disponibles à la vente et à
                la location au sein de CASAVOSTRA, partout en Tunisie.
              </p>
            </div>
          </div>
        </section>

        {/* Filters + Grid */}
        <section className="container mx-auto px-4 lg:px-8 py-10 md:py-16 space-y-8 md:space-y-10">
          {/* Filters */}
          <div className="bg-card border border-border rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[var(--shadow-card)]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-end">
              {/* Ville */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  placeholder="Ex : Tunis, Sousse..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Transaction */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Transaction
                </label>
                <select
                  value={transaction}
                  onChange={(e) =>
                    setTransaction(
                      e.target.value as "" | "vente" | "location",
                    )
                  }
                  className="search-input cursor-pointer"
                >
                  {transactionOptions.map((opt) => (
                    <option key={opt.label} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="search-input cursor-pointer"
                >
                  <option value="">Toutes les catégories</option>
                  {categoryOptions
                    .filter((cat) => cat !== "")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              {/* Summary */}
              <div className="flex flex-col items-start justify-center gap-1 md:items-end text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {filtered.length} bien{filtered.length > 1 ? "s" : ""} trouvé
                  {filtered.length > 1 ? "s" : ""}
                </span>
                <span className="text-xs md:text-sm">
                  Ajustez les filtres pour affiner votre recherche.
                </span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((property) => (
              <div key={property.id} className="animate-fade-in-up">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="bg-card border border-dashed border-border rounded-2xl p-10 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Aucun bien trouvé
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                Aucune propriété ne correspond actuellement à vos critères.
                Modifiez vos filtres ou réinitialisez-les pour afficher tous
                les biens.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllProperties;


