import React from "react";

export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center p-5 transition hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-contain mb-4"
      />
      <h3 className="text-base font-semibold text-gray-900 mb-1 text-center min-h-[48px] flex items-center justify-center">{product.name}</h3>
      <p className="text-gray-700 text-sm mb-4 text-center">Starting from<br /><span className="text-2xl font-bold text-black">${product.price}</span></p>
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        View Offers
      </a>
    </div>
  );
}
