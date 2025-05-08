import React from "react";
import ProductSearch from "../components/ProductSearch";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <ProductSearch />
      </main>
      
      <Footer />
    </div>
  );
};
