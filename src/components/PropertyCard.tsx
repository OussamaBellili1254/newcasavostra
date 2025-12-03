import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import WatermarkedImage from "./WatermarkedImage";

export interface Property {
  id: number;
  title: string;
  price: string;
  category: string;
  type: "vente" | "location";
  description: string;
  image: string;
  location: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/property/${property.id}`} className="block">
      <article className="property-card group cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <WatermarkedImage
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold rounded-full">
              {property.category}
            </span>
          </div>
          {/* Type Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                property.type === "vente"
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {property.type === "vente" ? "Vente" : "Location"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-accent transition-colors">
            {property.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="font-display text-xl font-bold text-accent">
              {property.price}
            </span>
            <span className="btn-outline flex items-center gap-2 text-sm py-2 px-4">
              <span>Voir plus</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PropertyCard;
