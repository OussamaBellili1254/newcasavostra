import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  DoorOpen,
  Bed,
  Bath,
  Check,
  Phone,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import ContactModal from "@/components/ContactModal";
import { useProperties } from "@/context/PropertiesContext";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { getPropertyById } = useProperties();
  const property = id ? getPropertyById(Number(id)) : undefined;

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">
              Bien non trouvé
            </h1>
            <p className="text-muted-foreground mb-8">
              Le bien que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Retour aux annonces
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour aux annonces</span>
          </Link>
        </div>

        {/* Property Content */}
        <div className="container mx-auto px-4 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Gallery & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <ImageGallery images={property.gallery} title={property.title} />

              {/* Description Section */}
              <section className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.fullDescription}
                </p>
              </section>

              {/* Features Section */}
              <section className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Caractéristiques
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <div className="p-1 bg-accent/10 rounded-full">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Property Info Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Main Info Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-muted text-foreground text-xs font-semibold rounded-full">
                      {property.category}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        property.type === "vente"
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {property.type === "vente" ? "Vente" : "Location"}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {property.title}
                  </h1>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5" />
                    <span>
                      {property.location}, {property.city}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-3xl font-display font-bold text-accent mb-6">
                    {property.price}
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Ruler className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Surface</p>
                        <p className="font-semibold text-foreground">
                          {property.surface} m²
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <DoorOpen className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Pièces</p>
                        <p className="font-semibold text-foreground">
                          {property.rooms}
                        </p>
                      </div>
                    </div>
                    {property.bedrooms > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Bed className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Chambres</p>
                          <p className="font-semibold text-foreground">
                            {property.bedrooms}
                          </p>
                        </div>
                      </div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Bath className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Salles de bain
                          </p>
                          <p className="font-semibold text-foreground">
                            {property.bathrooms}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Button */}
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Contacter l'agence</span>
                  </button>
                </div>

                {/* Agency Info Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <p className="text-sm text-muted-foreground mb-2">
                    Proposé par
                  </p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    Casavostra
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Plus qu'une agence, un partenaire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        propertyTitle={property.title}
      />
    </div>
  );
};

export default PropertyDetails;
