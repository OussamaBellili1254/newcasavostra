import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/casavostra-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <img
              src={logo}
              alt="Casavostra"
              className="h-16 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Plus qu'une agence, un partenaire. Votre expert immobilier de confiance en Tunisie.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {["Home", "Vente", "Location", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Catégories</h4>
            <ul className="space-y-3">
              {["Appartements", "Villas", "Bureaux", "Terrains"].map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  123 Avenue Habib Bourguiba, Tunis 1000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+21671000000"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm"
                >
                  +216 71 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:contact@casavostra.tn"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 text-sm"
                >
                  contact@casavostra.tn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Casavostra. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
