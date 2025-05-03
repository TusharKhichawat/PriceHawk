import React from "react";
import ProductSearch from "../components/ProductSearch";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">
        <ProductSearch />
      </main>
      <Footer />
    </div>
  );
};
