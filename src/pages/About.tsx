import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, ShieldCheck, Map, TrendingUp, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    const input = window.prompt("Veuillez entrer le mot de passe administrateur :");
    if (!input) return;

    // Mot de passe minimalement protégé (éviter la chaîne en clair)
    const expected = atob("Q0FTQVZPU1RSQTIwMjVUT1VUT1U=");

    if (input === expected) {
      navigate("/admin");
    } else {
      window.alert("Accès refusé. Mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="pt-24 md:pt-28 flex-1">
        {/* Hero / Page Title */}
        <section className="bg-gradient-to-b from-secondary to-background/80 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 lg:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                À Propos
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4">
                À Propos de CASAVOSTRA
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Votre partenaire immobilier de confiance en Tunisie
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 lg:px-8 py-12 md:py-16 lg:py-20 space-y-16 lg:space-y-20">
          {/* Notre Histoire */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            <div className="bg-card rounded-3xl p-6 md:p-8 lg:p-10 border border-border/60 shadow-[var(--shadow-card)]">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Notre Histoire
              </h2>
              <div className="h-1 w-16 bg-accent rounded-full mb-6" />
              <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>
                  CASAVOSTRA est une agence immobilière de premier plan en
                  Tunisie, spécialisée dans la vente et la location de biens
                  immobiliers de qualité. Depuis notre création, nous nous
                  engageons à offrir un service professionnel et personnalisé à
                  chacun de nos clients.
                </p>
                <p>
                  Notre équipe d&apos;experts possède une connaissance
                  approfondie du marché immobilier tunisien, couvrant les
                  principales villes telles que Tunis, Ariana, Sousse, Sfax,
                  Bizerte, Hammamet et Monastir. Nous mettons notre expertise
                  au service de votre projet immobilier, qu&apos;il s&apos;agisse
                  d&apos;un appartement moderne, d&apos;une villa de luxe, d&apos;un
                  local commercial ou d&apos;un terrain constructible.
                </p>
                <p>
                  Chez CASAVOSTRA, nous croyons que chaque client mérite une
                  attention particulière. C&apos;est pourquoi nous prenons le
                  temps de comprendre vos besoins et vos aspirations pour vous
                  proposer les meilleures opportunités immobilières du marché.
                </p>
              </div>
            </div>

            {/* Highlight Card */}
            <div className="space-y-6">
              <div className="bg-primary text-primary-foreground rounded-3xl p-6 md:p-7 lg:p-8 shadow-[var(--shadow-md)]">
                <h3 className="text-xl md:text-2xl font-semibold mb-3">
                  Une vision centrée sur l&apos;humain
                </h3>
                <p className="text-primary-foreground/90 leading-relaxed text-sm md:text-base mb-4">
                  Plus qu&apos;une simple transaction, chaque projet immobilier
                  est une histoire de vie. CASAVOSTRA vous accompagne à chaque
                  étape avec rigueur, discrétion et bienveillance.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-primary-foreground/80">
                  <li>• Accompagnement personnalisé de bout en bout</li>
                  <li>• Sélection rigoureuse des biens proposés</li>
                  <li>• Conseil stratégique sur la valeur de votre patrimoine</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nos Valeurs */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  Nos Valeurs
                </h2>
                <div className="h-1 w-16 bg-accent rounded-full" />
              </div>
              <p className="max-w-xl text-sm md:text-base text-muted-foreground">
                Les fondations de CASAVOSTRA reposent sur des valeurs fortes qui
                guident chacune de nos décisions et de nos relations avec nos
                clients.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Expertise */}
              <article className="bg-card rounded-2xl p-6 border border-border/70 shadow-[var(--shadow-card)] flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-accent/10 text-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Expertise
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Expertise – Une connaissance approfondie du marché immobilier
                  tunisien
                </p>
              </article>

              {/* Confiance */}
              <article className="bg-card rounded-2xl p-6 border border-border/70 shadow-[var(--shadow-card)] flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-accent/10 text-accent">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Confiance
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Confiance – Un accompagnement transparent et honnête à chaque
                  étape
                </p>
              </article>

              {/* Présence Nationale */}
              <article className="bg-card rounded-2xl p-6 border border-border/70 shadow-[var(--shadow-card)] flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-accent/10 text-accent">
                    <Map className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Présence Nationale
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Présence Nationale – Un réseau étendu sur tout le territoire
                  tunisien
                </p>
              </article>

              {/* Résultats */}
              <article className="bg-card rounded-2xl p-6 border border-border/70 shadow-[var(--shadow-card)] flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-accent/10 text-accent">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Résultats
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Résultats – Des solutions efficaces pour concrétiser vos
                  projets
                </p>
              </article>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-primary rounded-3xl px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 text-primary-foreground shadow-[var(--shadow-md)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
              <div className="space-y-3 max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-display font-semibold">
                  Prêt à démarrer votre projet ?
                </h2>
                <p className="text-primary-foreground/90 text-sm md:text-base leading-relaxed">
                  Prêt à démarrer votre projet ? Contactez-nous dès maintenant
                  pour discuter de vos besoins
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="btn-primary text-center text-base md:text-lg px-8 py-3"
                >
                  Contactez-nous
                </a>
                <button
                  type="button"
                  onClick={handleAdminClick}
                  className="btn-outline flex items-center justify-center gap-2 text-base md:text-lg px-8 py-3"
                >
                  <LockKeyhole className="w-5 h-5" />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          </section>

          {/* About-specific Footer Block */}
          <section className="bg-card rounded-3xl p-6 md:p-8 lg:p-10 border border-border/70 shadow-[var(--shadow-card)]">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  CASAVOSTRA – Votre agence immobilière de confiance en Tunisie.
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Villes couvertes : Tunis, Ariana, Sousse, Sfax, Bizerte,
                  Hammamet, Monastir
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Liens rapides
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Accueil</li>
                  <li>Biens</li>
                  <li>Catégories</li>
                  <li>À Propos</li>
                  <li>Contact</li>
                </ul>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Contact : +216 92 760 473, Tunisie</p>
                <p>Mentions légales / Politique de confidentialité</p>
              </div>
            </div>

            <div className="border-t border-border/60 mt-8 pt-4 text-center">
              <p className="text-xs md:text-sm text-muted-foreground">
                © 2025 CASAVOSTRA. Tous droits réservés.
              </p>
            </div>
          </section>
        </section>
      </main>

      {/* Global footer reused for site consistency */}
      <Footer />
    </div>
  );
};

export default About;


