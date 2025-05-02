import React from "react";

export function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-center mt-4">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-green-600 text-lg font-medium mb-1">
            {product.price}
          </p>
          <p className="text-gray-600 mb-4">Platform: {product.platform}</p>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Buy Now
          </a>
        </div>
      ))}
    </div>
  );
}
