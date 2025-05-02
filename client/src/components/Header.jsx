import React from "react";
import hawkLogo from "../assets/haw-logo.png.png";

export function Header() {
  return (
    <header className="bg-white px-8 py-4 flex justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <img src={hawkLogo} alt="PriceHawk Logo" className="w-8 h-8" />
        <span className="text-2xl font-bold text-blue-700">PriceHawk</span>
      </div>
      <nav className="flex items-center gap-8">
        <a href="#" className="text-base font-medium text-gray-700 hover:text-blue-700">Home</a>
        <a href="#" className="text-base font-medium text-gray-700 hover:text-blue-700">About</a>
      </nav>
      <a href="#" className="font-semibold text-black hover:text-blue-700">Sign In</a>
    </header>
  );
}
