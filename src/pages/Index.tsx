import { useState } from "react";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import PropertyGrid from "@/components/PropertyGrid";
import Footer from "@/components/Footer";

const Index = () => {
  const [city, setCity] = useState("");
  const [transaction, setTransaction] = useState<"" | "vente" | "location">("");
  const [category, setCategory] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <SearchBar
          city={city}
          transaction={transaction}
          category={category}
          onCityChange={setCity}
          onTransactionChange={setTransaction}
          onCategoryChange={setCategory}
        />
        <PropertyGrid
          cityFilter={city}
          transactionFilter={transaction}
          categoryFilter={category}
          onTransactionFilterChange={setTransaction}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
