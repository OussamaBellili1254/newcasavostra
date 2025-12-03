import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, PlusCircle, ArrowLeft } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProperties } from "@/context/PropertiesContext";
import type { PropertyDetails } from "@/data/properties";

type TransactionType = "vente" | "location";

interface EditableProperty extends Omit<PropertyDetails, "gallery"> {
  gallery: string[];
}

const emptyProperty: EditableProperty = {
  id: 0,
  title: "",
  price: "",
  category: "",
  type: "vente",
  description: "",
  image: "",
  location: "",
  city: "",
  surface: 0,
  rooms: 0,
  bedrooms: 0,
  bathrooms: 0,
  fullDescription: "",
  features: [],
  gallery: [],
};

const Admin = () => {
  const { properties, addProperty, updateProperty, deleteProperty } =
    useProperties();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<EditableProperty>(emptyProperty);
  const [imageUrls, setImageUrls] = useState<string>("");

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyProperty);
    setImageUrls("");
  };

  const startEdit = (property: PropertyDetails) => {
    setEditingId(property.id);
    setForm({
      ...property,
      gallery: property.gallery,
    });
    setImageUrls(property.gallery.join("\n"));
  };

  const handleChange = (
    field: keyof EditableProperty,
    value: string | number,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const gallery = imageUrls
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    if (!form.title || !form.city || !form.category || !form.price) {
      window.alert(
        "Merci de renseigner au minimum le titre, la ville, la catégorie et le prix.",
      );
      return;
    }

    if (editingId === null) {
      const created = await addProperty({
        ...form,
        gallery,
        image: gallery[0] ?? form.image,
      });
      setEditingId(created.id);
      window.alert("Propriété ajoutée avec succès.");
      // Clear form after successful creation
      setForm(emptyProperty);
      setImageUrls("");
    } else {
      await updateProperty(editingId, {
        ...form,
        gallery,
        image: gallery[0] ?? form.image,
      });
      window.alert("Propriété mise à jour avec succès.");
    }
  };

  const handleDelete = (id: number) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette propriété ? Cette action est irréversible (dans cette session).",
      )
    ) {
      deleteProperty(id);
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyProperty);
        setImageUrls("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="pt-24 md:pt-28 flex-1">
        <section className="container mx-auto px-4 lg:px-8 py-8 md:py-12 space-y-10">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                Administration
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-foreground mb-1">
                Gestion des biens immobiliers
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
                Administrez les annonces visibles sur le site : ajoutez, modifiez
                ou supprimez des biens en temps réel. Les modifications sont
                appliquées uniquement côté frontend et prêtes pour une intégration
                backend ultérieure.
              </p>
            </div>
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au site</span>
            </Link>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] gap-8 lg:gap-10">
            {/* Properties List */}
            <section className="bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-foreground">
                  Biens existants
                </h2>
                <button
                  type="button"
                  onClick={startCreate}
                  className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Nouveau bien</span>
                </button>
              </div>

              <div className="border border-border rounded-xl divide-y divide-border max-h-[520px] overflow-y-auto">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        #{property.id} · {property.city} ·{" "}
                        {property.type === "vente" ? "Vente" : "Location"}
                      </p>
                      <p className="font-medium text-sm md:text-base text-foreground line-clamp-1">
                        {property.title}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                        {property.category} · {property.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(property)}
                        className="btn-outline flex items-center gap-1.5 text-xs md:text-sm px-3 py-1.5"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(property.id)}
                        className="inline-flex items-center justify-center rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 px-2.5 py-1.5 text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {properties.length === 0 && (
                  <div className="p-6 text-center text-sm text-muted-foreground">
                    Aucun bien n&apos;est actuellement configuré.
                  </div>
                )}
              </div>
            </section>

            {/* Form */}
            <section className="bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 border border-border shadow-[var(--shadow-card)]">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">
                {editingId === null ? "Ajouter un bien" : "Modifier le bien"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
                {/* Titre & Ville */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      className="search-input text-sm"
                      placeholder="Ex : Appartement S+2 à Tunis"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="search-input text-sm"
                      placeholder="Ex : Tunis"
                    />
                  </div>
                </div>

                {/* Transaction & Catégorie */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Transaction
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) =>
                        handleChange("type", e.target.value as TransactionType)
                      }
                      className="search-input text-sm cursor-pointer"
                    >
                      <option value="vente">Vente</option>
                      <option value="location">Location</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Catégorie
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        handleChange("category", e.target.value)
                      }
                      className="search-input text-sm cursor-pointer"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      <option value="Appartements">Appartements</option>
                      <option value="Villas">Villas</option>
                      <option value="Duplex & Triplex">Duplex & Triplex</option>
                      <option value="Bureaux">Bureaux</option>
                      <option value="Dépôts">Dépôts</option>
                      <option value="Locaux Commerciaux">Locaux Commerciaux</option>
                      <option value="Locaux Industriels">Locaux Industriels</option>
                      <option value="Terrains Agricoles">Terrains Agricoles</option>
                      <option value="Terrains Constructibles">Terrains Constructibles</option>
                    </select>
                  </div>
                </div>

                {/* Prix & Localisation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Prix
                    </label>
                    <input
                      type="text"
                      value={form.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="search-input text-sm"
                      placeholder="Ex : 350 000 TND"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Localisation détaillée
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      className="search-input text-sm"
                      placeholder="Ex : Lac 2, Tunis"
                    />
                  </div>
                </div>

                {/* Surface / Pièces / Salles de bain */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Surface (m²)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={form.surface}
                      onChange={(e) =>
                        handleChange("surface", Number(e.target.value) || 0)
                      }
                      className="search-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Pièces
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={form.rooms}
                      onChange={(e) =>
                        handleChange("rooms", Number(e.target.value) || 0)
                      }
                      className="search-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Salles de bain
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={form.bathrooms}
                      onChange={(e) =>
                        handleChange(
                          "bathrooms",
                          Number(e.target.value) || 0,
                        )
                      }
                      className="search-input text-sm"
                    />
                  </div>
                </div>

                {/* Description courte */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Description courte
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className="search-input text-sm min-h-[70px]"
                    placeholder="Résumé de l'annonce affiché dans les cartes de biens."
                  />
                </div>

                {/* Description complète */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Description complète
                  </label>
                  <textarea
                    value={form.fullDescription}
                    onChange={(e) =>
                      handleChange("fullDescription", e.target.value)
                    }
                    className="search-input text-sm min-h-[90px]"
                    placeholder="Texte détaillé affiché sur la page du bien."
                  />
                </div>

                {/* Images (URLs) */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Images (URLs, une par ligne)
                  </label>
                  <textarea
                    value={imageUrls}
                    onChange={(e) => setImageUrls(e.target.value)}
                    className="search-input text-sm min-h-[80px] font-mono"
                    placeholder="https://.../photo1.jpg&#10;https://.../photo2.jpg"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Dans une future version backend, ces URLs pourront être
                    générées automatiquement via un service comme Cloudinary.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="btn-primary px-6 py-2.5 text-sm font-semibold"
                  >
                    {editingId === null ? "Ajouter le bien" : "Enregistrer les modifications"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;


