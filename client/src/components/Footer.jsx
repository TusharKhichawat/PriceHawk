import React from "react";

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 px-4 mt-10 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">© 2024 PriceHawk.</div>
        <div className="space-x-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}