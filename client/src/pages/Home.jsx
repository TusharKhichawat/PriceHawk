import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { ProductList } from "../components/ProductList";
import { Footer } from "../components/Footer";
import { mockProducts } from "../data/mockProduct";

export const Home = () => {
  const [query, setQuery] = useState("");

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">
        <SearchBar onSearch={setQuery} />
        <ProductList products={filteredProducts} />
      </main>
      <Footer />
    </div>
  );
};
