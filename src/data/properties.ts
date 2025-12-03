import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";
import galleryBedroom from "@/assets/gallery-bedroom.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryTerrace from "@/assets/gallery-terrace.jpg";

export interface PropertyDetails {
  id: number;
  title: string;
  price: string;
  category: string;
  /**
   * Type de transaction : "vente" ou "location"
   * (équivaut à la propriété "transaction" décrite dans le cahier des charges)
   */
  type: "vente" | "location";
  description: string;
  image: string;
  location: string;
  city: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  fullDescription: string;
  features: string[];
  gallery: string[];
}

export const properties: PropertyDetails[] = [
  {
    id: 1,
    title: "Appartement S+2 à Tunis",
    price: "350 000 TND",
    category: "Appartements",
    type: "vente",
    description: "Magnifique appartement moderne avec vue panoramique, cuisine équipée et parking privé.",
    image: property1,
    location: "Lac 2, Tunis",
    city: "Tunis",
    surface: 120,
    rooms: 4,
    bedrooms: 2,
    bathrooms: 1,
    fullDescription: "Découvrez cet appartement d'exception situé au cœur du quartier prisé du Lac 2 à Tunis. Avec ses 120m² de surface habitable, ce bien offre un cadre de vie moderne et lumineux. Le séjour spacieux baigné de lumière naturelle s'ouvre sur un balcon avec vue panoramique sur la ville. La cuisine entièrement équipée répond aux standards les plus exigeants. Les deux chambres sont confortables et bien agencées, idéales pour une famille ou des professionnels. L'appartement dispose également d'un parking privé en sous-sol.",
    features: ["Parking privé", "Balcon", "Cuisine équipée", "Climatisation", "Ascenseur", "Interphone", "Double vitrage"],
    gallery: [property1, galleryBedroom, galleryKitchen, galleryBathroom],
  },
  {
    id: 2,
    title: "Villa avec Piscine à Hammamet",
    price: "1 200 000 TND",
    category: "Villas",
    type: "vente",
    description: "Superbe villa méditerranéenne avec piscine, jardin paysager et vue mer exceptionnelle.",
    image: property2,
    location: "Hammamet Nord",
    city: "Hammamet",
    surface: 350,
    rooms: 8,
    bedrooms: 4,
    bathrooms: 3,
    fullDescription: "Cette magnifique villa de style méditerranéen vous offre un cadre de vie d'exception à Hammamet Nord. Avec ses 350m² habitables sur un terrain de 800m², cette propriété dispose de tout le confort moderne. Le rez-de-chaussée comprend un grand salon avec cheminée, une salle à manger, une cuisine américaine entièrement équipée et une suite parentale. L'étage accueille trois chambres supplémentaires avec leurs salles de bain. À l'extérieur, profitez de la piscine chauffée, du jardin paysager avec système d'arrosage automatique et d'une terrasse couverte idéale pour les soirées d'été.",
    features: ["Piscine", "Jardin paysager", "Vue mer", "Terrasse", "Garage double", "Système d'alarme", "Climatisation centrale", "Cheminée"],
    gallery: [property2, galleryTerrace, galleryBedroom, galleryBathroom, galleryKitchen],
  },
  {
    id: 3,
    title: "Duplex de Standing à Sousse",
    price: "2 500 TND/mois",
    category: "Duplex & Triplex",
    type: "location",
    description: "Duplex luxueux sur deux niveaux avec terrasse privée et finitions haut de gamme.",
    image: property3,
    location: "Sahloul, Sousse",
    city: "Sousse",
    surface: 180,
    rooms: 6,
    bedrooms: 3,
    bathrooms: 2,
    fullDescription: "Ce duplex d'exception à Sahloul, Sousse, représente le summum du confort et de l'élégance. Réparti sur deux niveaux, il offre 180m² de surface habitable avec des finitions haut de gamme. Le premier niveau comprend un vaste séjour double hauteur, une cuisine design entièrement équipée et une chambre d'amis avec salle d'eau. L'étage privatif accueille la suite parentale avec dressing et salle de bain en marbre, ainsi que deux autres chambres. Une grande terrasse privée de 40m² complète ce bien rare sur le marché de la location.",
    features: ["Terrasse privée", "Double hauteur", "Dressing", "Marbre", "Cuisine équipée", "Parking", "Gardiennage 24h"],
    gallery: [property3, galleryBedroom, galleryBathroom, galleryKitchen, galleryTerrace],
  },
  {
    id: 4,
    title: "Bureau Modern Open Space",
    price: "1 800 TND/mois",
    category: "Bureaux",
    type: "location",
    description: "Espace de bureau moderne avec climatisation, fibre optique et salle de réunion.",
    image: property4,
    location: "Centre Urbain Nord",
    city: "Tunis",
    surface: 200,
    rooms: 5,
    bedrooms: 0,
    bathrooms: 2,
    fullDescription: "Situé au Centre Urbain Nord de Tunis, ce bureau moderne de 200m² est parfait pour les entreprises dynamiques. L'espace open space lumineux favorise la collaboration et la créativité. Il comprend une grande salle de réunion vitrée pouvant accueillir 12 personnes, deux bureaux privatifs pour la direction, un espace détente avec kitchenette et deux sanitaires. L'immeuble dispose d'un accès sécurisé, d'un parking sous-sol et d'une connexion fibre optique haut débit. Idéal pour une startup ou une PME en pleine croissance.",
    features: ["Open space", "Salle de réunion", "Fibre optique", "Climatisation", "Parking sous-sol", "Kitchenette", "Accès sécurisé", "Ascenseur"],
    gallery: [property4, galleryKitchen],
  },
  {
    id: 5,
    title: "Local Commercial Premium",
    price: "450 000 TND",
    category: "Locaux Commerciaux",
    type: "vente",
    description: "Local commercial bien situé avec grande vitrine et stationnement client disponible.",
    image: property5,
    location: "Avenue Habib Bourguiba",
    city: "Tunis",
    surface: 150,
    rooms: 3,
    bedrooms: 0,
    bathrooms: 1,
    fullDescription: "Opportunité rare sur l'Avenue Habib Bourguiba ! Ce local commercial de 150m² bénéficie d'un emplacement premium avec un flux piétonnier exceptionnel. La façade de 12 mètres linéaires avec double vitrine offre une visibilité maximale. L'intérieur modulable permet d'accueillir diverses activités commerciales : boutique, showroom, agence ou restaurant. Le local dispose d'une réserve de 30m², d'un bureau et de sanitaires. Places de stationnement disponibles à proximité pour la clientèle.",
    features: ["Emplacement premium", "Double vitrine", "Réserve", "Modulable", "Sanitaires", "Climatisation", "Rideau métallique"],
    gallery: [property5],
  },
  {
    id: 6,
    title: "Terrain Constructible 500m²",
    price: "180 000 TND",
    category: "Terrains Constructibles",
    type: "vente",
    description: "Terrain plat et viabilisé, idéal pour construction résidentielle ou commerciale.",
    image: property6,
    location: "Borj Cedria",
    city: "Ben Arous",
    surface: 500,
    rooms: 0,
    bedrooms: 0,
    bathrooms: 0,
    fullDescription: "Terrain constructible de 500m² idéalement situé à Borj Cedria, à proximité de la plage et des commodités. Ce terrain plat et viabilisé (eau, électricité, assainissement) est prêt à construire. Le coefficient d'occupation du sol (COS) autorise une construction R+2, parfait pour une villa familiale ou un petit immeuble résidentiel. L'environnement calme et résidentiel, combiné à la proximité de la mer (800m), en fait un investissement de choix pour votre projet immobilier.",
    features: ["Viabilisé", "Plat", "COS R+2", "Proche plage", "Titre foncier", "Accès goudronné"],
    gallery: [property6],
  },
];

// NOTE:
// Les fonctions de filtrage et de recherche par ID sont désormais gérées
// par le PropertiesContext pour permettre les mises à jour dynamiques
// (ajout / édition / suppression) et préparer une future intégration backend.
