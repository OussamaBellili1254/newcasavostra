import { useEffect, useState } from "react";
import { Search, MapPin, Home, Tag } from "lucide-react";

import heroVilla1 from "@/assets/hero-villa-1.jpg";
import heroVilla2 from "@/assets/hero-villa-2.jpg";
import heroVilla3 from "@/assets/hero-villa-3.jpg";
import heroVilla4 from "@/assets/hero-villa-4.jpg";

const heroImages = [heroVilla1, heroVilla2, heroVilla3, heroVilla4];

const categories = [
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

interface SearchBarProps {
  city: string;
  transaction: "" | "vente" | "location";
  category: string;
  onCityChange: (value: string) => void;
  onTransactionChange: (value: "" | "vente" | "location") => void;
  onCategoryChange: (value: string) => void;
}

const SearchBar = ({
  city,
  transaction,
  category,
  onCityChange,
  onTransactionChange,
  onCategoryChange,
}: SearchBarProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // La recherche est appliquée en temps réel via les callbacks,
    // le bouton sert uniquement à respecter le design existant.
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Luxury villa ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-accent w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4 drop-shadow-lg">
            Trouvez votre bien idéal
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Découvrez notre sélection de biens immobiliers à vendre et à louer
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-card/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Ville Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Ville
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ex: Tunis, Sousse..."
                  value={city}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="search-input pl-10"
                />
              </div>
            </div>

            {/* Transaction Type */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Type de transaction
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                <select
                  value={transaction}
                  onChange={(e) =>
                    onTransactionChange(
                      e.target.value as "" | "vente" | "location",
                    )
                  }
                  className="search-input pl-10 appearance-none cursor-pointer bg-background"
                >
                  <option value="">Sélectionner</option>
                  <option value="vente">Vente</option>
                  <option value="location">Location</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Catégorie du bien
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                <select
                  value={category}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="search-input pl-10 appearance-none cursor-pointer bg-background"
                >
                  <option value="">Toutes catégories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Rechercher</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
