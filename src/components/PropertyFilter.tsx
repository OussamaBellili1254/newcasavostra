interface PropertyFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "Tous nos biens" },
  { id: "vente", label: "Vente" },
  { id: "location", label: "Location" },
];

const PropertyFilter = ({ activeFilter, onFilterChange }: PropertyFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`filter-btn ${
            activeFilter === filter.id
              ? "filter-btn-active"
              : "filter-btn-inactive"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default PropertyFilter;
