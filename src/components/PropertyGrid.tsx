import PropertyFilter from "./PropertyFilter";
import PropertyCard from "./PropertyCard";
import { useProperties } from "@/context/PropertiesContext";

interface PropertyGridProps {
  cityFilter: string;
  transactionFilter: "" | "vente" | "location";
  categoryFilter: string;
  onTransactionFilterChange: (value: "" | "vente" | "location") => void;
}

const PropertyGrid = ({
  cityFilter,
  transactionFilter,
  categoryFilter,
  onTransactionFilterChange,
}: PropertyGridProps) => {
  const activeFilter =
    transactionFilter === "" ? "all" : transactionFilter;

  const { filterProperties } = useProperties();

  const handleFilterChange = (filterId: string) => {
    const nextTransaction =
      filterId === "all" ? "" : (filterId as "vente" | "location");
    onTransactionFilterChange(nextTransaction);
  };

  const filteredProperties = filterProperties(
    cityFilter,
    transactionFilter,
    categoryFilter,
  );

  return (
    <section id="nos-biens" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Nos Biens</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Explorez notre sélection exclusive de propriétés soigneusement choisies pour vous
          </p>
          <PropertyFilter
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {filteredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Aucun résultat trouvé
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyGrid;
