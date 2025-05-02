import React from "react";
import { ProductCard } from "./ProductCard";

export function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-center mt-4">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
